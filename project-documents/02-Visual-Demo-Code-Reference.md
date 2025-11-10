# Visual Demo - Key Code Reference

## File Locations
- **Main HTML**: `/workspaces/ontwikkeling-theoom/background-material/discrete-event-sim/visual-demo/index.html` (83 lines)
- **Simulation Code**: `/workspaces/ontwikkeling-theoom/background-material/discrete-event-sim/visual-demo/sketch.js` (826 lines)

---

## Critical Code Sections

### 1. Configuration Constants (Lines 2-22)

```javascript
// Hospital Capacity
const WAITING_ROOM_SEATS = 8;
const WAITING_ROOM_CAPACITY = 20;      // Total capacity
const RADIOLOGY_WAITING_CAPACITY = 2;
const NUM_DOCTORS = 2;

// Arrival Process
const AVG_INTER_ARRIVAL_TIME_MINUTES = 3;  // Poisson arrival
const ELDERLY_PROBABILITY = 0.50;          // Demographics

// Service Times (Minutes, using Exponential Distribution)
const AVG_CONSULT_TIME_YOUNG_MINUTES = 10;
const AVG_CONSULT_TIME_ELDERLY_MINUTES = 15;
const AVG_SCAN_TIME_MINUTES = 20;
const SCAN_PROBABILITY = 0.33;

// Time Scale
const FRAME_RATE_ASSUMED = 30;  // 30 frames = 1 simulated minute
```

**Key Insight**: All parameters are at the top for easy tweaking. Change these to experiment with different scenarios.

---

### 2. Main Simulation Loop (Lines 119-146)

```javascript
function draw() {
    background(240);
    simTime++;

    // 1. Patient Arrival (Poisson Process)
    handleArrivalsPoisson();

    // 2. Update Patients (State Transitions)
    updatePatients();

    // 3. Assign Waiting Patients to Free Doctors
    assignPatientsToDoctors();

    // 4. Assign Radiology Queue Patient to Free Scanner
    assignPatientToScanner();

    // 5. Visualization
    drawVisualization();

    // 6. Display Stats
    displayStats();
}
```

**Key Insight**: Separation of concerns - arrivals, updates, assignments, visualization all isolated. Easy to understand flow.

---

### 3. Poisson Arrival Process (Lines 150-172)

```javascript
function scheduleNextArrival() {
    // Exponential inter-arrival time: Time = -ln(U) / lambda
    let uniformRandom = random();
    if (uniformRandom === 0) uniformRandom = 0.000001; // Avoid log(0)
    
    let interArrivalTime = -log(uniformRandom) / arrivalLambdaPerFrame;
    timeOfNextArrival = simTime + ceil(interArrivalTime);
}

// Calculate arrival rate (in setup):
// lambda = 1 / (average_inter_arrival_time_in_frames)
arrivalLambdaPerFrame = 1.0 / (AVG_INTER_ARRIVAL_TIME_MINUTES * FRAME_RATE_ASSUMED);
```

**Key Insight**: Uses proper exponential distribution, not simple deterministic intervals. More realistic patient arrivals.

---

### 4. Patient State Machine (Lines 59-70)

```javascript
const STATE = {
    ARRIVING: 'Arriving',
    WAITING_CHECK_IN: 'Checking In',
    WAITING_ROOM: 'Waiting Room',
    CONSULTING: 'Consulting',
    WAITING_RADIOLOGY: 'Waiting Radiology',
    IN_RADIOLOGY_QUEUE: 'In Radiology Queue',
    SCANNING: 'Scanning',
    GOING_HOME: 'Going Home',
    REJECTED_WR_FULL: 'Rejected (WR Full)',
    REJECTED_RAD_FULL: 'Rejected (Rad Full)'
};
```

**Key Insight**: Clear enumeration of all states. Easy to add new states (e.g., payment, lab work, discharge).

---

### 5. State Update Logic (Lines 227-300)

```javascript
function updatePatients() {
    for (let i = allPatients.length - 1; i >= 0; i--) {
        let p = allPatients[i];
        p.timeInState = (p.timeInState || 0) + 1;

        switch (p.state) {
            case STATE.ARRIVING:
                p.state = STATE.WAITING_CHECK_IN;
                p.timeInState = 0;
                break;

            case STATE.WAITING_ROOM:
                // Logic handled by assignPatientsToDoctors
                break;

            case STATE.CONSULTING:
                if (simTime >= p.consultationEndTime) {
                    const doctor = p.doctor;
                    if (doctor) doctor.patient = null;  // Free doctor
                    p.doctor = null;
                    
                    p.needsScan = random() < SCAN_PROBABILITY;
                    if (p.needsScan) {
                        p.state = STATE.WAITING_RADIOLOGY;
                    } else {
                        p.state = STATE.GOING_HOME;
                    }
                    p.timeInState = 0;
                }
                break;
            
            // ... more cases ...
        }
    }
}
```

**Key Insight**: Event-driven transitions. When service ends (simTime >= endTime), patient transitions to next state.

---

### 6. Queue Management - FIFO with Priority (Lines 384-453)

```javascript
function assignPatientsToDoctors() {
    for (let doctor of doctors) {
        if (!doctor.patient) {  // If doctor is free
            let patientToAssign = findNextPatientForDoctor();

            if (patientToAssign) {
                // Track waiting time for statistics
                let waitTimeFrames = simTime - patientToAssign.waitingRoomArrivalTime;
                stats.totalWaitingTimeToDoctor += waitTimeFrames;
                stats.patientsSeenByDoctorCount++;

                // Assign patient
                doctor.patient = patientToAssign;
                patientToAssign.doctor = doctor;
                patientToAssign.state = STATE.CONSULTING;

                // Calculate service time (exponential)
                let avgConsultFrames = patientToAssign.isElderly ? 
                    AVG_CONSULT_TIME_ELDERLY_MINUTES * FRAME_RATE_ASSUMED :
                    AVG_CONSULT_TIME_YOUNG_MINUTES * FRAME_RATE_ASSUMED;
                let consultTime = generateExponentialTime(avgConsultFrames);
                patientToAssign.consultationEndTime = simTime + consultTime;

                // Handle seat (if seated) - free it for standing patient
                if (patientToAssign.seatIndex !== -1) {
                    let freedSeatIndex = patientToAssign.seatIndex;
                    waitingRoom.seats[freedSeatIndex] = null;
                    
                    // Try to seat a standing elderly patient
                    let elderlyStanding = waitingRoom.standing.filter(p => p.isElderly);
                    if (elderlyStanding.length > 0) {
                        // Sort by arrival time for fairness
                        elderlyStanding.sort((a, b) => 
                            a.waitingRoomArrivalTime - b.waitingRoomArrivalTime);
                        let patientToSeat = elderlyStanding[0];
                        // Move to seat...
                    }
                }
            }
        }
    }
}

function findNextPatientForDoctor() {
    // Collect all waiting patients (seated and standing)
    let candidates = [];
    waitingRoom.seats.forEach(p => {
        if (p && p.state === STATE.WAITING_ROOM) {
            candidates.push(p);
        }
    });
    waitingRoom.standing.forEach(p => {
        if (p.state === STATE.WAITING_ROOM) {
            candidates.push(p);
        }
    });

    // Sort by arrival time for strict FIFO
    candidates.sort((a, b) => 
        a.waitingRoomArrivalTime - b.waitingRoomArrivalTime);

    return candidates.length > 0 ? candidates[0] : null;
}
```

**Key Insight**: 
- Multiple doctors can work in parallel (each has own `patient` reference)
- FIFO priority based on `waitingRoomArrivalTime` (not seatIndex)
- Elderly get preferential seating (can displace young patients)

---

### 7. Exponential Distribution Helper (Lines 212-225)

```javascript
function generateExponentialTime(averageTimeInFrames) {
    if (averageTimeInFrames <= 0) return 1;
    
    // lambda = 1 / average
    let lambda = 1.0 / averageTimeInFrames;
    
    let uniformRandom = random();
    if (uniformRandom === 0) uniformRandom = 0.000001;  // Avoid log(0)
    
    // Time = -ln(U) / lambda
    let generatedTime = -log(uniformRandom) / lambda;
    
    return ceil(generatedTime);  // Return in frames (integer)
}
```

**Key Insight**: Reusable for any service time (consultations, scans, etc.). Produces realistic variability (some fast, some slow).

---

### 8. Visualization Approach (Lines 505-732)

```javascript
function drawVisualization() {
    drawWaitingRoom();      // Seats + standing area
    drawDoctorsArea();      // Doctor boxes
    drawRadiologyArea();    // Scanner + queue
    drawPatients();         // Patient circles
}

function drawPatients() {
    for (const p of allPatients) {
        let x = -100, y = -100;  // Off-screen default

        // Position based on STATE
        switch (p.state) {
            case STATE.WAITING_ROOM:
                if (p.seatIndex !== -1) {  // Seated
                    x = wrX + p.seatIndex * (seatSize + seatSpacing) + seatSize / 2;
                    y = wrY + seatSpacing + seatSize / 2;
                } else {  // Standing
                    let standingIdx = waitingRoom.standing.findIndex(sp => sp.id === p.id);
                    // Arrange in grid within standing area...
                }
                break;

            case STATE.CONSULTING:
                if (p.doctor) {
                    const docIdx = p.doctor.id;
                    x = docAreaX + docIdx * (docWidth + docSpacing) + docWidth / 2;
                    y = docAreaY + 70 / 2;
                }
                break;

            case STATE.SCANNING:
                x = radX + radWidth / 2;
                y = radY + 80 / 2;
                break;

            case STATE.GOING_HOME:
                x = width - 30;
                y = height - 30;
                let alpha = map(p.timeInState, 0, 100, 255, 0, true);
                p.color.setAlpha(alpha);  // Fade out
                break;
            // ... more cases ...
        }

        if (x > -100) {  // Only draw if on-screen
            fill(p.color);  // Red=elderly, Blue=young
            noStroke();
            ellipse(x, y, patientRadius * 2, patientRadius * 2);
        }
        p.color.setAlpha(255);  // Reset alpha
    }
}
```

**Key Insight**: 
- Position = f(state, properties)
- Easy to adapt: change drawing logic without touching simulation
- Elegant fade-out for departing patients

---

### 9. Statistics Collection (Lines 48-54, 392-403)

```javascript
let stats = {
    rejectedWaitingRoom: 0,
    elderlyHadToStandEvent: 0,
    rejectedRadiology: 0,
    totalWaitingTimeToDoctor: 0,
    patientsSeenByDoctorCount: 0
};

// When patient assigned to doctor:
if (patientToAssign.waitingRoomArrivalTime !== undefined) {
    let waitTimeFrames = simTime - patientToAssign.waitingRoomArrivalTime;
    stats.totalWaitingTimeToDoctor += waitTimeFrames;
    stats.patientsSeenByDoctorCount++;
}

// Calculation (lines 786-793):
let avgWaitText = "Avg Wait (Doctor): N/A";
if (stats.patientsSeenByDoctorCount > 0) {
    let avgWaitFrames = stats.totalWaitingTimeToDoctor / stats.patientsSeenByDoctorCount;
    let avgWaitMinutes = floor(avgWaitFrames / 60);
    let avgWaitSeconds = floor(avgWaitFrames % 60);
    avgWaitText = `Avg Wait (Doctor): ${avgWaitMinutes}m ${nf(avgWaitSeconds, 2)}s`;
}
```

**Key Insight**: Running averages computed real-time. Easy to add more metrics (utilization, throughput, etc.).

---

### 10. Statistics Display (Lines 734-826)

```javascript
function displayStats() {
    const statX = width - 300;
    let currentY = margin;

    // Title
    fill(50);
    textSize(14);
    textStyle(BOLD);
    text("SIMULATION PARAMETERS", statX, currentY);
    currentY += 27;

    // Show configuration
    textStyle(NORMAL);
    textSize(12);
    text(`Avg Inter-Arrival: ${AVG_INTER_ARRIVAL_TIME_MINUTES} min`, statX, currentY);
    currentY += 18;
    text(`Elderly Proportion: ${(ELDERLY_PROBABILITY * 100).toFixed(0)}%`, statX, currentY);
    currentY += 18;
    // ... more parameters ...

    // Show real-time state
    textSize(14);
    textStyle(BOLD);
    text("CURRENT STATE & STATS", statX, currentY);
    currentY += 27;
    textStyle(NORMAL);
    textSize(12);

    // Simulation time
    let displayMinutes = floor(simTime / FRAME_RATE_ASSUMED);
    text(`Simulated Time: ${displayMinutes}m ${simTime % FRAME_RATE_ASSUMED}s`, statX, currentY);
    currentY += 18;

    // Metrics
    text(`Avg Wait (Doctor): ${avgWaitMinutes}m ${avgWaitSeconds}s`, statX, currentY);
    currentY += 18;
    
    let currentWaiting = waitingRoom.seats.filter(s => s !== null).length + waitingRoom.standing.length;
    text(`Waiting Room: ${currentWaiting} / ${WAITING_ROOM_CAPACITY}`, statX, currentY);
    currentY += 18;

    // Counters (rejection events)
    fill(200, 0, 0);
    text(`Rejected (WR Full): ${stats.rejectedWaitingRoom}`, statX, currentY);
    currentY += 18;
}
```

**Key Insight**: Right-side panel shows both configuration (static) and real-time metrics. Clean information hierarchy.

---

## Patient Object Structure (Lines 184-198)

```javascript
const newPatient = {
    id: patientIdCounter,
    isElderly: isElderly,
    arrivalTime: simTime,
    state: STATE.ARRIVING,
    seatIndex: -1,                      // -1 = standing, 0-7 = seat index
    doctor: null,                       // Reference to assigned doctor
    consultationEndTime: 0,
    needsScan: false,
    radiologyArrivalTime: 0,
    scanEndTime: 0,
    color: isElderly ? color(150, 0, 0) : color(0, 0, 150),  // Red vs Blue
    timeInState: 0,
    waitingRoomArrivalTime: 0           // Set when entering waiting room
};
```

**Key Insight**: All patient state captured in single object. Easy to add properties (e.g., priority, pathology, cost).

---

## Key Learnings for THEOOM Implementation

### 1. Use State Machines
Entity behavior should be defined as state transitions, not imperative procedures.

### 2. Decouple Simulation from Visualization
Simulation updates values; visualization reads values. Easy to swap visualizations or run headless.

### 3. Use Exponential Distributions
For arrivals and service times. More realistic than fixed intervals.

### 4. Collect Statistics During Simulation
Track metrics as events happen, compute aggregates on display.

### 5. P5.js is Suitable for DES
Lightweight, performant, good for real-time animation. No heavy framework overhead.

### 6. Parameterize Everything
Move magic numbers to top. Makes experimentation easy.

### 7. Separate Concerns
Arrivals, Updates, Assignments, Visualization all independent. Easier to debug and extend.

