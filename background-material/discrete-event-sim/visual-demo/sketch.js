// --- Simulation Constants ---
const WAITING_ROOM_SEATS = 8;
const WAITING_ROOM_CAPACITY = 20; // Seats + Standing
const RADIOLOGY_WAITING_CAPACITY = 2;
const NUM_DOCTORS = 2;

// --- Arrival Configuration ---
const AVG_INTER_ARRIVAL_TIME_MINUTES = 3; // <--- NEW: Average time between patient arrivals

// --- Patient Mix ---
const ELDERLY_PROBABILITY = 0.50; // Chance an arriving patient is elderly

// --- Service Time Averages (in Minutes) ---
const AVG_CONSULT_TIME_YOUNG_MINUTES = 10;   // <--- NEW
const AVG_CONSULT_TIME_ELDERLY_MINUTES = 15; // <--- NEW
const AVG_SCAN_TIME_MINUTES = 20;            // <--- NEW

// --- Radiology Configuration ---
const SCAN_PROBABILITY = 0.33; // Chance patient needs scan after consult

// --- Time Scale ---
const FRAME_RATE_ASSUMED = 30;    // Visual FPS and basis for time scale
// 30 frames = 1 simulated minute => 1 frame = 1 simulated second

// --- REMOVE OLD SERVICE TIME CONSTANTS ---
// const CONSULT_TIME_YOUNG_MIN = 600;
// const CONSULT_TIME_YOUNG_MAX = 1200;
// const CONSULT_TIME_ELDERLY_MIN = 900;
// const CONSULT_TIME_ELDERLY_MAX = 1200;
// const SCAN_TIME_MIN = 900;
// const SCAN_TIME_MAX = 1800;

// --- Simulation State ---
let simTime = 0;
let allPatients = [];
let patientIdCounter = 0;
let doctors = [];
let radiologyDept = {
    patient: null,
    waitingQueue: [],
    scanEndTime: 0,
    capacity: RADIOLOGY_WAITING_CAPACITY
};
let waitingRoom = {
    seats: new Array(WAITING_ROOM_SEATS).fill(null),
    standing: []
};
let stats = {
    rejectedWaitingRoom: 0,
    elderlyHadToStandEvent: 0,
    rejectedRadiology: 0,
    totalWaitingTimeToDoctor: 0, // <-- NEW: Sum of all wait times
    patientsSeenByDoctorCount: 0 // <-- NEW: Number of patients who finished waiting
};
let timeOfNextArrival = 0;
let arrivalLambdaPerFrame = 0; // Rate based on inter-arrival time

// --- Patient States ---
const STATE = {
    ARRIVING: 'Arriving', // Initial state, brief moment
    WAITING_CHECK_IN: 'Checking In', // Transition state
    WAITING_ROOM: 'Waiting Room', // Actively in waiting room (seated or standing)
    CONSULTING: 'Consulting',
    WAITING_RADIOLOGY: 'Waiting Radiology', // Decided needs scan, waiting for space
    IN_RADIOLOGY_QUEUE: 'In Radiology Queue',
    SCANNING: 'Scanning',
    GOING_HOME: 'Going Home',
    REJECTED_WR_FULL: 'Rejected (WR Full)',
    REJECTED_RAD_FULL: 'Rejected (Rad Full)'
};

// --- P5.js Setup ---
// --- P5.js Setup ---
function setup() {
    createCanvas(1200, 600);
    frameRate(FRAME_RATE_ASSUMED);

    // --- TIME SCALE: 60 frames = 1 simulated minute ---
    const framesPerMinute = FRAME_RATE_ASSUMED; // = 60

    // Calculate average inter-arrival time in FRAMES (seconds)
    const avgInterArrivalFrames = AVG_INTER_ARRIVAL_TIME_MINUTES * framesPerMinute;

    // Calculate arrival rate lambda (arrivals per frame)
    // lambda = 1 / average_inter_arrival_time
    if (avgInterArrivalFrames <= 0) {
        console.error("Average inter-arrival time must be positive.");
        arrivalLambdaPerFrame = 0; // Prevent division by zero
    } else {
        arrivalLambdaPerFrame = 1.0 / avgInterArrivalFrames;
    }


    // Initialize Doctors
    for (let i = 0; i < NUM_DOCTORS; i++) {
        doctors.push({ id: i, patient: null, consultationEndTime: 0 });
    }

    // --- REMOVED THE FUNCTION DEFINITION FROM HERE ---

    // Schedule the first arrival using the calculated lambda (Keep this call)
    scheduleNextArrival(); // This now calls the global function

    // --- Console logs ---
    console.log("Simulation Started. Time Scale: 60 frames = 1 minute.");
    console.log("Waiting Room Seats:", WAITING_ROOM_SEATS, "Capacity:", WAITING_ROOM_CAPACITY);
    console.log("Radiology Capacity:", RADIOLOGY_WAITING_CAPACITY);
    console.log("Doctors:", NUM_DOCTORS);
    console.log(`Avg Inter-Arrival Time: ${AVG_INTER_ARRIVAL_TIME_MINUTES} min`);
    console.log(` -> Equivalent Avg Arrival Rate: ${(arrivalLambdaPerFrame * framesPerMinute).toFixed(2)}/min`);
    console.log(` -> Arrival Lambda/frame: ${arrivalLambdaPerFrame.toExponential(3)}`);
    console.log(`Avg Consult Young: ${AVG_CONSULT_TIME_YOUNG_MINUTES} min`);
    console.log(`Avg Consult Elderly: ${AVG_CONSULT_TIME_ELDERLY_MINUTES} min`);
    console.log(`Avg Scan Time: ${AVG_SCAN_TIME_MINUTES} min`);
    console.log(`DEBUG @ simTime=0: Scheduling first arrival.`);
} // --- End of setup() ---

// --- P5.js Draw Loop (Main Simulation Loop) ---
function draw() {
    background(240);
    simTime++;

    // 1. Patient Arrival (Poisson Process)
    handleArrivalsPoisson(); // <--- CORRECTED: Call the new function here

    // 2. Update Patients (State Transitions)
    updatePatients();

    // 3. Assign Waiting Patients to Free Doctors (FIFO & Elderly Seating Update)
    assignPatientsToDoctors(); // Includes logic to seat standing elderly if seat frees

    // 4. Assign Radiology Queue Patient to Free Scanner
    assignPatientToScanner();

    // 5. Visualization
    drawVisualization();

    // 6. Display Stats
    displayStats(); // Make sure this is updated later to show new parameter

    // Optional: Stop condition
    // if (simTime > 20000) {
    //    console.log("Stopping simulation.");
    //    noLoop();
    // }
}

// --- Simulation Logic Functions ---

function scheduleNextArrival() {
    // Generate time until next arrival using exponential distribution
    // Time = -ln(Uniform[0,1]) / lambda
    let uniformRandom = random(); // Get a random number between 0 (exclusive) and 1 (inclusive)
    // Avoid log(0) -> Infinity by ensuring uniformRandom is not exactly 0
    if (uniformRandom === 0) uniformRandom = 0.000001;

    // Use the arrival-specific lambda calculated in setup
    // *** THIS IS THE CORRECTED LINE ***
    let interArrivalTime = -log(uniformRandom) / arrivalLambdaPerFrame;

    // --- DEBUG LOG 1 ---
    console.log(`DEBUG @ simTime=${simTime}: Calculated interArrivalTime = ${ceil(interArrivalTime)} frames (using random=${uniformRandom.toFixed(5)})`);
    // --- END DEBUG ---

    // Schedule the next arrival time (add to current time)
    // Use ceil to ensure it happens *at* or *after* the calculated fraction of a frame
    timeOfNextArrival = simTime + ceil(interArrivalTime);

    // --- DEBUG LOG 2 ---
    console.log(`DEBUG @ simTime=${simTime}: Next arrival scheduled for time = ${timeOfNextArrival}`);
    // --- END DEBUG ---
} // --- End of scheduleNextArrival() ---

function handleArrivalsPoisson() {
    // Check if it's time for the scheduled arrival
    if (simTime >= timeOfNextArrival) {

        // --- DEBUG LOG 3 ---
        console.log(`!!! ARRIVAL !!! @ simTime=${simTime} (Scheduled time was ${timeOfNextArrival})`);
        // --- END DEBUG ---

        patientIdCounter++;
        const isElderly = random() < ELDERLY_PROBABILITY;
        const newPatient = {
            id: patientIdCounter,
            isElderly: isElderly,
            arrivalTime: simTime, // Actual arrival time
            state: STATE.ARRIVING,
            seatIndex: -1,
            doctor: null,
            consultationEndTime: 0,
            needsScan: false,
            radiologyArrivalTime: 0,
            scanEndTime: 0,
            color: isElderly ? color(150, 0, 0) : color(0, 0, 150),
            timeInState: 0,
            // Add waitingRoomArrivalTime when they enter the room in handleWaitingRoomEntry
        };
        allPatients.push(newPatient);
         // console.log(`Time ${simTime}: Patient ${newPatient.id} (${isElderly ? 'Elderly' : 'Young'}) arrived (Poisson).`);

        // Schedule the NEXT arrival
        scheduleNextArrival();
    }
    // Optional: Log current time vs next arrival time (can be noisy)
    // else if (simTime % 60 === 0) { // Log every second
    //    console.log(`DEBUG @ simTime=${simTime}: Waiting for next arrival scheduled at ${timeOfNextArrival}`);
    // }
}

// --- Helper Function for Exponential Time Generation ---
function generateExponentialTime(averageTimeInFrames) {
    if (averageTimeInFrames <= 0) return 1; // Avoid errors, return minimal time

    // lambda = 1 / average time
    let lambda = 1.0 / averageTimeInFrames;

    let uniformRandom = random();
    if (uniformRandom === 0) uniformRandom = 0.000001; // Avoid log(0)

    // Time = -ln(U) / lambda
    let generatedTime = -log(uniformRandom) / lambda;

    return ceil(generatedTime); // Return time in frames (integer)
}

function updatePatients() {
    for (let i = allPatients.length - 1; i >= 0; i--) {
        let p = allPatients[i];
        p.timeInState = (p.timeInState || 0) + 1;

        switch (p.state) {
            case STATE.ARRIVING:
                // Simple check-in transition
                p.state = STATE.WAITING_CHECK_IN;
                p.timeInState = 0;
                break;

            case STATE.WAITING_CHECK_IN:
                // Process entry into waiting room
                 handleWaitingRoomEntry(p);
                 p.timeInState = 0; // Reset timer for WAITING_ROOM state
                 break;

            case STATE.WAITING_ROOM:
                // Logic is handled by assignPatientsToDoctors
                // Patient just waits here. If they were standing and a seat frees up
                // (due to someone leaving for doctor), they don't automatically take it
                // in this simple model. Priority is given based on arrival + status.
                break;

            case STATE.CONSULTING:
                if (simTime >= p.consultationEndTime) {
                    // Consultation finished
                    const doctor = p.doctor;
                    if (doctor) doctor.patient = null; // Free the doctor
                    p.doctor = null;

                    p.needsScan = random() < SCAN_PROBABILITY;
                    if (p.needsScan) {
                        p.state = STATE.WAITING_RADIOLOGY;
                        // console.log(`Time ${simTime}: Patient ${p.id} finished consult, needs scan.`);
                    } else {
                        p.state = STATE.GOING_HOME;
                        // console.log(`Time ${simTime}: Patient ${p.id} finished consult, going home.`);
                    }
                    p.timeInState = 0;
                }
                break;

             case STATE.WAITING_RADIOLOGY:
                 handleRadiologyEntry(p);
                 p.timeInState = 0;
                 break;

            case STATE.IN_RADIOLOGY_QUEUE:
                // Waits here until assigned by assignPatientToScanner
                break;

            case STATE.SCANNING:
                if (simTime >= p.scanEndTime) {
                    radiologyDept.patient = null; // Free the scanner
                    p.state = STATE.GOING_HOME;
                    // console.log(`Time ${simTime}: Patient ${p.id} finished scan, going home.`);
                    p.timeInState = 0;
                }
                break;

            case STATE.GOING_HOME:
            case STATE.REJECTED_WR_FULL:
            case STATE.REJECTED_RAD_FULL:
                // Terminal states - could remove patient after some time for performance
                if(p.timeInState > 100) { // Fade out effect or removal
                     // For simplicity, just leave them in the list but don't process further
                     // Or remove: allPatients.splice(i, 1);
                }
                break;
        }
    }
}

function handleWaitingRoomEntry(patient) {
    const currentOccupancy = waitingRoom.seats.filter(s => s !== null).length + waitingRoom.standing.length;

    if (currentOccupancy >= WAITING_ROOM_CAPACITY) {
        patient.state = STATE.REJECTED_WR_FULL;
        stats.rejectedWaitingRoom++;
        // console.log(`Time ${simTime}: Patient ${patient.id} REJECTED (Waiting Room Full). Count: ${stats.rejectedWaitingRoom}`);
        return;
    }

    // Enter the waiting state
    patient.state = STATE.WAITING_ROOM;
    patient.waitingRoomArrivalTime = simTime; // Track arrival for fairness/priority

    let seated = false;
    // Try to find an empty seat
    for (let i = 0; i < WAITING_ROOM_SEATS; i++) {
        if (waitingRoom.seats[i] === null) {
            waitingRoom.seats[i] = patient;
            patient.seatIndex = i;
            seated = true;
            // console.log(`Time ${simTime}: Patient ${patient.id} (${patient.isElderly ? 'Elderly' : 'Young'}) sits in empty seat ${i}.`);
            break;
        }
    }

    // If no empty seat and patient is elderly, try to displace a young patient
    if (!seated && patient.isElderly) {
        let displacedYoungPatient = null;
        let displacedSeatIndex = -1;
        for (let i = 0; i < WAITING_ROOM_SEATS; i++) {
            if (waitingRoom.seats[i] && !waitingRoom.seats[i].isElderly) {
                displacedYoungPatient = waitingRoom.seats[i];
                displacedSeatIndex = i;
                break; // Displace the first young person found
            }
        }

        if (displacedYoungPatient) {
            // Move young patient to standing
            displacedYoungPatient.seatIndex = -1;
            waitingRoom.standing.push(displacedYoungPatient);
            // console.log(`Time ${simTime}: Patient ${displacedYoungPatient.id} (Young) gives up seat ${displacedSeatIndex} for elderly.`);

            // Seat the elderly patient
            waitingRoom.seats[displacedSeatIndex] = patient;
            patient.seatIndex = displacedSeatIndex;
            seated = true;
            // console.log(`Time ${simTime}: Patient ${patient.id} (Elderly) takes seat ${displacedSeatIndex}.`);
        }
    }

    // If still not seated (no empty seats, and either young OR only elderly seated)
    if (!seated) {
        waitingRoom.standing.push(patient);
        patient.seatIndex = -1; // Explicitly mark as standing
        if (patient.isElderly) {
            stats.elderlyHadToStandEvent++;
            // console.log(`Time ${simTime}: Patient ${patient.id} (Elderly) has to STAND. All seats occupied (possibly by other elderly). Stand Count: ${stats.elderlyHadToStandEvent}`);
        } else {
            // console.log(`Time ${simTime}: Patient ${patient.id} (Young) has to STAND. Seats full.`);
        }
    }
     // Verify room state (for debugging)
    //  let seatedCount = waitingRoom.seats.filter(s => s !== null).length;
    //  let standingCount = waitingRoom.standing.length;
    //  console.log(`Time ${simTime}: Room state - Seated: ${seatedCount}, Standing: ${standingCount}`);
}

function handleRadiologyEntry(patient) {
     if (radiologyDept.waitingQueue.length >= radiologyDept.capacity) {
        patient.state = STATE.REJECTED_RAD_FULL;
        stats.rejectedRadiology++;
        // console.log(`Time ${simTime}: Patient ${patient.id} REJECTED (Radiology Full). Count: ${stats.rejectedRadiology}`);
    } else {
        patient.state = STATE.IN_RADIOLOGY_QUEUE;
        patient.radiologyArrivalTime = simTime;
        radiologyDept.waitingQueue.push(patient);
        // console.log(`Time ${simTime}: Patient ${patient.id} added to radiology queue.`);
    }
}

function assignPatientsToDoctors() {
    const framesPerMinute = FRAME_RATE_ASSUMED; // Should be 30 based on your code

    for (let doctor of doctors) {
        if (!doctor.patient) { // If doctor is free
            let patientToAssign = findNextPatientForDoctor();

            if (patientToAssign) {
                // *** NEW: Calculate and record waiting time START ***
                if (patientToAssign.waitingRoomArrivalTime !== undefined) {
                    let waitTimeFrames = simTime - patientToAssign.waitingRoomArrivalTime;
                    stats.totalWaitingTimeToDoctor += waitTimeFrames;
                    stats.patientsSeenByDoctorCount++;
                    // Optional log:
                    // console.log(`DEBUG @ simTime=${simTime}: Patient ${patientToAssign.id} waited ${waitTimeFrames} frames.`);
                } else {
                    // This should ideally not happen if logic is correct
                    console.warn(`WARN @ simTime=${simTime}: Patient ${patientToAssign.id} assigned to doctor without a waitingRoomArrivalTime!`);
                }
                // *** NEW: Calculate and record waiting time END ***


                // Assign patient to doctor (existing code)
                doctor.patient = patientToAssign;
                patientToAssign.doctor = doctor;
                patientToAssign.state = STATE.CONSULTING;
                patientToAssign.timeInState = 0;

                // Calculate consultation end time using Exponential Distribution (existing code)
                let avgConsultFrames;
                if (patientToAssign.isElderly) {
                    avgConsultFrames = AVG_CONSULT_TIME_ELDERLY_MINUTES * framesPerMinute;
                } else {
                    avgConsultFrames = AVG_CONSULT_TIME_YOUNG_MINUTES * framesPerMinute;
                }
                let consultTime = generateExponentialTime(avgConsultFrames);
                patientToAssign.consultationEndTime = simTime + consultTime;

                // Logic for freeing seat & seating standing elderly (existing code)
                let freedSeatIndex = -1;
                if (patientToAssign.seatIndex !== -1) {
                    freedSeatIndex = patientToAssign.seatIndex;
                    waitingRoom.seats[freedSeatIndex] = null;
                    patientToAssign.seatIndex = -1;
                } else {
                    const standingIndex = waitingRoom.standing.findIndex(p => p.id === patientToAssign.id);
                    if (standingIndex > -1) {
                        waitingRoom.standing.splice(standingIndex, 1);
                    }
                }

                if (freedSeatIndex !== -1) {
                    let elderlyStanding = waitingRoom.standing.filter(p => p.isElderly);
                    if (elderlyStanding.length > 0) {
                        elderlyStanding.sort((a, b) => a.waitingRoomArrivalTime - b.waitingRoomArrivalTime);
                        let patientToSeat = elderlyStanding[0];
                        const standingIndexToRemove = waitingRoom.standing.findIndex(p => p.id === patientToSeat.id);
                        if (standingIndexToRemove > -1) {
                            waitingRoom.standing.splice(standingIndexToRemove, 1);
                            waitingRoom.seats[freedSeatIndex] = patientToSeat;
                            patientToSeat.seatIndex = freedSeatIndex;
                        } else {
                             console.error(`Time ${simTime}: Error - Could not find patient ${patientToSeat.id} in standing array.`);
                        }
                    }
                }
            }
        }
    }
}

function findNextPatientForDoctor() {
    // Collect all patients currently waiting in the WAITING_ROOM state
    let candidates = [];

    // Add seated patients
    waitingRoom.seats.forEach(p => {
        if (p && p.state === STATE.WAITING_ROOM) {
            candidates.push(p);
        }
    });

    // Add standing patients
    waitingRoom.standing.forEach(p => {
        if (p.state === STATE.WAITING_ROOM) { // Double check state just in case
             candidates.push(p);
        }
    });


    // Sort candidates strictly by FIFO based on when they entered the waiting room
    // The patient with the smallest waitingRoomArrivalTime is first.
    candidates.sort((a, b) => {
        return a.waitingRoomArrivalTime - b.waitingRoomArrivalTime;
    });

    // Return the patient who arrived earliest, or null if no one is waiting
    return candidates.length > 0 ? candidates[0] : null;
}

function assignPatientToScanner() {
    const framesPerMinute = FRAME_RATE_ASSUMED; // 60

    // If scanner is free AND there are patients waiting
    if (!radiologyDept.patient && radiologyDept.waitingQueue.length > 0) {
        const patientToScan = radiologyDept.waitingQueue.shift();

        radiologyDept.patient = patientToScan;
        patientToScan.state = STATE.SCANNING;
        patientToScan.timeInState = 0;

        // --- Calculate scan end time using Exponential Distribution ---
        const avgScanFrames = AVG_SCAN_TIME_MINUTES * framesPerMinute;
        const scanTime = generateExponentialTime(avgScanFrames); // Use helper
        patientToScan.scanEndTime = simTime + scanTime;
        // --- End Exponential Time Calc ---

        // console.log(`Time ${simTime}: Patient ${patientToScan.id} starts scan. Scan time: ${scanTime} frames. Ends at ${patientToScan.scanEndTime}.`);
    }
}

// --- Visualization Functions ---

const margin = 20;
const seatSize = 20;
const seatSpacing = 10;
const patientRadius = 8;

function drawVisualization() {
    drawWaitingRoom();
    drawDoctorsArea();
    drawRadiologyArea();
    drawPatients();
}

function drawWaitingRoom() {
    const wrX = margin;
    const wrY = margin;
    const wrWidth = (seatSize + seatSpacing) * WAITING_ROOM_SEATS - seatSpacing;
    const wrHeight = seatSize * 2 + seatSpacing * 3; // Make room for standing area

    push();
    translate(wrX, wrY);
    stroke(150);
    noFill();
    rect(0, 0, wrWidth + 50, wrHeight + 50); // Box for the whole area
    fill(180);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Waiting Room", (wrWidth + 50) / 2, -textSize());


    // Draw Seats
    for (let i = 0; i < WAITING_ROOM_SEATS; i++) {
        const x = i * (seatSize + seatSpacing);
        const y = seatSpacing;
        fill(200);
        stroke(100);
        rect(x, y, seatSize, seatSize); // Draw the empty seat
    }

    // Draw Standing Area (conceptual)
     const standingY = seatSize + 2 * seatSpacing;
     fill(220);
     noStroke();
     rect(0, standingY, wrWidth, wrHeight - standingY);
     fill(150);
     textSize(12);
     textAlign(LEFT, TOP);
     text("Standing Area", 5, standingY + 5 );

    pop();
}

function drawDoctorsArea() {
    const docAreaX = margin + (seatSize + seatSpacing) * WAITING_ROOM_SEATS + 50 + margin;
    const docAreaY = margin;
    const docWidth = 100;
    const docHeight = 70;
    const docSpacing = 20;

    push();
    translate(docAreaX, docAreaY);
     fill(180);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Doctors", (docWidth * NUM_DOCTORS + docSpacing * (NUM_DOCTORS - 1))/2, -textSize());


    for (let i = 0; i < NUM_DOCTORS; i++) {
        const x = i * (docWidth + docSpacing);
        stroke(100);
        fill(doctors[i].patient ? color(255, 200, 200) : color(200, 255, 200)); // Redish if busy, Greenish if free
        rect(x, 0, docWidth, docHeight);
        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(`Doctor ${i + 1}`, x + docWidth / 2, docHeight / 2);
    }
    pop();
}

function drawRadiologyArea() {
    const radX = margin;
    const radY = margin + seatSize * 2 + seatSpacing * 3 + 50 + margin + 40; // Below waiting room
    const radWidth = 120;
    const radHeight = 80;
    const radQueueX = radX + radWidth + margin;
    const radQueueY = radY;
    const queueSlotSize = patientRadius * 2 + 5;

     push();
    translate(radX, radY);
    fill(180);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Radiology", radWidth/2, -textSize());


    // Scanner machine
    stroke(100);
    fill(radiologyDept.patient ? color(255, 220, 150) : color(180, 220, 255)); // Orangeish if busy, Bluish if free
    rect(0, 0, radWidth, radHeight);
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Scanner", radWidth / 2, radHeight / 2);
    pop();

    // Radiology Waiting Queue Slots
    push();
    translate(radQueueX, radQueueY);
     fill(180);
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Rad Queue", 0, -textSize());
    for(let i = 0; i < RADIOLOGY_WAITING_CAPACITY; i++){
         const qx = i * (queueSlotSize + 5);
         const qy = 0;
         stroke(150);
         fill(230);
         rect(qx, qy, queueSlotSize, queueSlotSize);
    }

    pop();
}


function drawPatients() {
    const wrX = margin;
    const wrY = margin;
    const docAreaX = margin + (seatSize + seatSpacing) * WAITING_ROOM_SEATS + 50 + margin;
    const docAreaY = margin;
    const docWidth = 100;
    const docSpacing = 20;
    const radX = margin;
    const radY = margin + seatSize * 2 + seatSpacing * 3 + 50 + margin + 40; // Below waiting room
    const radWidth = 120;
    const radQueueX = radX + radWidth + margin;
    const radQueueY = radY;
    const queueSlotSize = patientRadius * 2 + 5;


    for (const p of allPatients) {
        let x = -100, y = -100; // Default off-screen

        switch (p.state) {
            case STATE.WAITING_ROOM:
                if (p.seatIndex !== -1) { // Seated
                    x = wrX + p.seatIndex * (seatSize + seatSpacing) + seatSize / 2;
                    y = wrY + seatSpacing + seatSize / 2;
                } else { // Standing
                    // Distribute standing patients somewhat randomly in the standing area
                    const standingAreaY = wrY + seatSize + 2 * seatSpacing;
                    const standingAreaHeight = seatSize * 2 + seatSpacing * 3 + 50 - (seatSize + 2 * seatSpacing);
                     const standingAreaWidth = (seatSize + seatSpacing) * WAITING_ROOM_SEATS - seatSpacing;

                    // Simple positioning - find index in standing array
                    let standingIdx = waitingRoom.standing.findIndex(sp => sp.id === p.id);
                    if (standingIdx !== -1) {
                         // Arrange in a rough grid within the standing area
                        const itemsPerRow = floor(standingAreaWidth / (patientRadius * 2 + 5));
                        const row = floor(standingIdx / itemsPerRow);
                        const col = standingIdx % itemsPerRow;
                        x = wrX + col * (patientRadius * 2 + 5) + patientRadius + 5;
                        y = standingAreaY + row * (patientRadius*2 + 10) + patientRadius + 5; // Add vertical spacing too
                    } else {
                        // Should not happen if logic is correct, but place somewhere as fallback
                         x = wrX + 10;
                         y = standingAreaY + 10;
                    }
                }
                break;
            case STATE.CONSULTING:
                if (p.doctor) {
                    const docIdx = p.doctor.id;
                    x = docAreaX + docIdx * (docWidth + docSpacing) + docWidth / 2;
                    y = docAreaY + 70 / 2; // Middle of doctor's office box
                }
                break;
             case STATE.IN_RADIOLOGY_QUEUE:
                 let queueIdx = radiologyDept.waitingQueue.findIndex(qp => qp.id === p.id);
                 if(queueIdx !== -1) {
                    x = radQueueX + queueIdx * (queueSlotSize + 5) + queueSlotSize / 2;
                    y = radQueueY + queueSlotSize / 2;
                 }
                 break;
            case STATE.SCANNING:
                 x = radX + radWidth / 2;
                 y = radY + 80 / 2; // Middle of scanner box
                break;
            case STATE.GOING_HOME:
                // Could animate them moving off screen
                 x = width - 30; // Right edge
                 y = height - 30; // Bottom right corner
                 // Fade out?
                 let alpha = map(p.timeInState, 0, 100, 255, 0, true);
                 p.color.setAlpha(alpha);
                break;
            case STATE.REJECTED_WR_FULL:
                 x = width/2;
                 y = height - 30; // Bottom middle
                 let alphaWR = map(p.timeInState, 0, 100, 255, 0, true);
                 p.color.setAlpha(alphaWR);
                break;
             case STATE.REJECTED_RAD_FULL:
                 x = width/2 + 50;
                 y = height - 30; // Bottom middle slightly offset
                 let alphaRad = map(p.timeInState, 0, 100, 255, 0, true);
                 p.color.setAlpha(alphaRad);
                break;
            // Other states (ARRIVING, WAITING_CHECK_IN, WAITING_RADIOLOGY) are transitional and usually too brief to visualize distinctly
            // Or draw them near the entrance/target area
        }

         if (x > -100) { // Only draw if position is set
            fill(p.color);
            noStroke();
            ellipse(x, y, patientRadius * 2, patientRadius * 2);

            // Optional: Draw patient ID
            // fill(255);
            // textSize(8);
            // textAlign(CENTER, CENTER);
            // text(p.id, x, y);
        }
         p.color.setAlpha(255); // Reset alpha for next frame if not fading
    }
}

function displayStats() {
    const statX = width - 300;
    const statY = margin;
    const lineH = 18;
    let currentY = statY;
    const framesPerMinute = FRAME_RATE_ASSUMED; // Should be 30 based on your code

    // --- Simulation Parameters ---
    fill(50);
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text("SIMULATION PARAMETERS", statX, currentY);
    currentY += lineH * 1.5;
    textStyle(NORMAL);
    textSize(12);

    // Arrival & Age
    text(`Avg Inter-Arrival: ${AVG_INTER_ARRIVAL_TIME_MINUTES} min (Exp. Distr.)`, statX, currentY); // <-- Updated
    currentY += lineH;
    text(`Elderly Proportion: ${(ELDERLY_PROBABILITY * 100).toFixed(0)}% of arrivals`, statX, currentY);
    currentY += lineH;

    // Consultation Times (Averages using Exponential Distribution)
    text(`Avg Consult (Young): ${AVG_CONSULT_TIME_YOUNG_MINUTES} min (Exp. Distr.)`, statX, currentY); // <-- Updated
    currentY += lineH;
    text(`Avg Consult (Elderly): ${AVG_CONSULT_TIME_ELDERLY_MINUTES} min (Exp. Distr.)`, statX, currentY); // <-- Updated
    currentY += lineH;

    // Radiology Referral & Time (Average using Exponential Distribution)
    text(`Radiology Scan Need: ${(SCAN_PROBABILITY * 100).toFixed(1)}% chance`, statX, currentY); // Allow one decimal
    currentY += lineH;
    text(`Avg Scan Time: ${AVG_SCAN_TIME_MINUTES} min (Exp. Distr.)`, statX, currentY); // <-- Updated
    currentY += lineH * 1.5;

    // --- Current State & Statistics ---
    fill(0);
    textSize(14);
    textStyle(BOLD);
    text("CURRENT STATE & STATS", statX, currentY);
    currentY += lineH * 1.5;
    textStyle(NORMAL);
    textSize(12);

    // Simulation Time (existing code)
    let totalSeconds = simTime;
    let displayMinutes = floor(totalSeconds / framesPerMinute);
    let displaySeconds = totalSeconds % framesPerMinute;
    text(`Simulated Time: ${displayMinutes}m ${nf(displaySeconds, 2)}s`, statX, currentY);
    currentY += lineH;

    // --- NEW: Average Wait Time Calculation & Display START ---
    let avgWaitText = "Avg Wait (Doctor): N/A";
    if (stats.patientsSeenByDoctorCount > 0) {
        let avgWaitFrames = stats.totalWaitingTimeToDoctor / stats.patientsSeenByDoctorCount;
        let avgWaitTotalSeconds = avgWaitFrames; // Since 1 frame = 1 second
        let avgWaitMinutes = floor(avgWaitTotalSeconds / 60);
        let avgWaitSeconds = floor(avgWaitTotalSeconds % 60); // Use floor to avoid fractional seconds display
        avgWaitText = `Avg Wait (Doctor): ${avgWaitMinutes}m ${nf(avgWaitSeconds, 2)}s`;
    }
    text(avgWaitText, statX, currentY);
    currentY += lineH;
    // --- NEW: Average Wait Time Calculation & Display END ---


    // Waiting Room State (existing code)
    let currentWaiting = waitingRoom.seats.filter(s => s !== null).length + waitingRoom.standing.length;
    text(`Waiting Room: ${currentWaiting} / ${WAITING_ROOM_CAPACITY}`, statX, currentY);
    currentY += lineH;
    let seatedCount = waitingRoom.seats.filter(s => s !== null).length;
    text(`  Seated: ${seatedCount} / ${WAITING_ROOM_SEATS}`, statX + 10, currentY);
    currentY += lineH;
    text(`  Standing: ${waitingRoom.standing.length}`, statX + 10, currentY);
    currentY += lineH;

    // Radiology State (existing code)
    text(`Radiology Queue: ${radiologyDept.waitingQueue.length} / ${RADIOLOGY_WAITING_CAPACITY}`, statX, currentY);
    currentY += lineH;
    text(`Scanner Busy: ${radiologyDept.patient ? 'Yes' : 'No'}`, statX, currentY);
    currentY += lineH * 1.5;


    // --- Counters --- (existing code)
    textSize(14);
    fill(200, 0, 0);
    textAlign(LEFT, TOP);

    text(`Rejected (WR Full): ${stats.rejectedWaitingRoom}`, statX, currentY);
    currentY += lineH;
    text(`Elderly Stand Events: ${stats.elderlyHadToStandEvent}`, statX, currentY);
    currentY += lineH;
    text(`Rejected (Rad Full): ${stats.rejectedRadiology}`, statX, currentY);
}