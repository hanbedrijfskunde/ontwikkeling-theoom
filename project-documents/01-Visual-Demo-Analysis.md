# Discrete Event Simulation Visual Demo - Comprehensive Analysis

## Overview
The visual-demo folder contains a working hospital simulation implemented with **p5.js** - a JavaScript library for creative coding with visual animations. This is a fully functional healthcare system simulator that animates patient flow through a hospital system.

---

## What the Simulation Does

### Domain: Healthcare Hospital System
The simulation models a **hospital outpatient clinic** with:

1. **Waiting Room** - Patients arrive and wait for available doctors
   - 8 comfortable seats
   - 20 total capacity (8 seated + 12 standing)
   - Elderly patients get priority seating (can displace young patients)

2. **Doctor Consultation** - 2 doctors provide medical consultations
   - Young patients: average 10 minutes consultation
   - Elderly patients: average 15 minutes consultation
   - Consultation times follow exponential distribution (realistic variability)

3. **Radiology Department** - Some patients need medical scans
   - 33% chance a patient needs a scan after consultation
   - 1 scanner machine
   - Waiting queue capacity: 2 patients
   - Average scan time: 20 minutes

### Patient Flow Path
```
Arrival → Waiting Room (seated/standing) → Doctor Consultation → 
  [33% chance] → Radiology Waiting → Scanner → Home
  [67% chance] → Home (no scan needed)
```

### Arrival Pattern
- **Poisson Process**: Patients arrive randomly with exponential inter-arrival times
- **Average inter-arrival time**: 3 minutes
- **Patient Mix**: 50% elderly, 50% young (configurable)

---

## How It's Implemented

### Framework Stack
- **Frontend**: HTML5 + CSS3 (Materialize CSS for Material Design)
- **Visualization**: **p5.js 1.4.0** (Processing-like JavaScript library)
- **Simulation Logic**: Vanilla JavaScript (no external simulation library)
- **Canvas Size**: 1200 x 600 pixels

### Architecture

#### 1. **State Machine Pattern**
Each patient has a finite state with clear transitions:
```javascript
STATE = {
    ARRIVING,
    WAITING_CHECK_IN,
    WAITING_ROOM,
    CONSULTING,
    WAITING_RADIOLOGY,
    IN_RADIOLOGY_QUEUE,
    SCANNING,
    GOING_HOME,
    REJECTED_WR_FULL,
    REJECTED_RAD_FULL
}
```

#### 2. **Core Simulation Components**

**Global Variables** (lines 2-56):
- Constants: room capacities, doctor count, service times
- Simulation state: current time (simTime), all patients, doctors, queues
- Statistics: rejections, wait times, events

**Main Simulation Loop** (draw function, lines 119-146):
1. Advance simulation time (1 frame = 1 simulated second)
2. Handle Poisson arrivals
3. Update patient states
4. Assign patients to doctors (FIFO with elderly priority)
5. Assign radiology patients to scanner
6. Render visualization
7. Display statistics

#### 3. **Key Algorithms**

**Poisson Arrival Process** (lines 150-209):
```
- Uses exponential inter-arrival times
- Lambda = 1 / (average inter-arrival time in frames)
- scheduleNextArrival() calculates when next patient arrives
- Prevents artificial clustering of arrivals
```

**Exponential Time Generation** (lines 212-225):
- Used for consultation times and scan times
- Formula: Time = -ln(U) / lambda (where U = random[0,1])
- Provides realistic variability (some quick, some long)

**Queue Management** (lines 384-453):
- FIFO priority for waiting room patients
- Elderly-aware seating (elderly get displaced young patients for seats)
- Auto-seats standing elderly when a seat becomes free

**State Transitions** (lines 227-300):
- Each state has specific update logic
- Patients transition between states based on time/events
- Terminal states: GOING_HOME, REJECTED (tracked in stats)

#### 4. **Data Structure**

**Patient Object**:
```javascript
{
    id: number,
    isElderly: boolean,
    arrivalTime: number,
    state: string,
    seatIndex: number (-1 if standing),
    doctor: object reference,
    consultationEndTime: number,
    needsScan: boolean,
    radiologyArrivalTime: number,
    scanEndTime: number,
    color: p5.color,
    timeInState: number,
    waitingRoomArrivalTime: number
}
```

**Doctor Object**:
```javascript
{
    id: number,
    patient: patient reference,
    consultationEndTime: number
}
```

**Radiology Department**:
```javascript
{
    patient: patient or null,
    waitingQueue: array,
    scanEndTime: number,
    capacity: number
}
```

---

## Visualization Features

### What Gets Animated

1. **Waiting Room Section** (top-left)
   - Grid of 8 seats shown as gray rectangles
   - Standing area below
   - Patients shown as colored circles:
     - **Red circles** = elderly patients
     - **Blue circles** = young patients
   - Patients move between seats/standing positions

2. **Doctors Section** (middle)
   - Two boxes labeled "Doctor 1" and "Doctor 2"
   - **Green fill** = doctor is free
   - **Red fill** = doctor is consulting (busy)
   - Patient circles appear inside doctor boxes when consulting

3. **Radiology Section** (bottom)
   - Scanner machine box (blue when free, orange when scanning)
   - Queue slots for waiting patients
   - Patient circles appear in queue or inside scanner

4. **Patient Movement**
   - Smooth positioning based on state
   - Standing patients distributed in standing area grid
   - Patients fade out when leaving (GOING_HOME state)

### Statistics Display Panel (right side)

**Simulation Parameters** shown:
- Avg inter-arrival time
- Elderly proportion
- Consultation times (young/elderly)
- Scan probability and time

**Real-time Metrics**:
- Simulated time (minutes:seconds)
- Average wait time to see doctor
- Waiting room occupancy (seated/standing breakdown)
- Radiology queue state
- Counters: rejected patients, elderly standing events

---

## Configuration/Parameters (Easily Modifiable)

All parameters are defined as constants at the top of sketch.js (lines 2-22):

### Capacity Parameters
```javascript
WAITING_ROOM_SEATS = 8              // Comfortable seating
WAITING_ROOM_CAPACITY = 20          // Total (seats + standing)
RADIOLOGY_WAITING_CAPACITY = 2      // Queue for scanner
NUM_DOCTORS = 2                     // Number of consultation doctors
```

### Arrival Configuration
```javascript
AVG_INTER_ARRIVAL_TIME_MINUTES = 3  // Patient arrival rate
ELDERLY_PROBABILITY = 0.50          // 50% elderly patients
```

### Service Times (Averages)
```javascript
AVG_CONSULT_TIME_YOUNG_MINUTES = 10
AVG_CONSULT_TIME_ELDERLY_MINUTES = 15
AVG_SCAN_TIME_MINUTES = 20
SCAN_PROBABILITY = 0.33             // % needing radiology
```

### Time Scale
```javascript
FRAME_RATE_ASSUMED = 30             // FPS
// 30 frames = 1 simulated minute
// 1 frame = 1 simulated second
```

### Visualization Constants
```javascript
seatSize = 20
seatSpacing = 10
patientRadius = 8
margin = 20
```

---

## Code Quality Assessment

### Strengths
1. **Well-documented**: Comments explain logic, debug logs provided
2. **Modular functions**: Clear separation of concerns
   - State updates separate from visualization
   - Arrival handling isolated
   - Queue management encapsulated
3. **Realistic simulation**: Uses exponential distributions for arrival/service
4. **Rich state machine**: Comprehensive state transitions
5. **Proper time scaling**: Consistent frame-to-time mapping
6. **Statistics tracking**: Captures important metrics
7. **Error handling**: Some defensive checks (division by zero, log(0))

### Areas for Improvement
1. **Code organization**: All code in single sketch.js file
   - Could benefit from class-based structure
   - Visualization could be separate module
2. **Magic numbers**: Some coordinates hardcoded in drawing functions
   - Could use layout configuration object
3. **Statistics**: Limited to basic metrics
   - Could track more (service times, queue lengths over time)
4. **Scalability**: Drawing assumes fixed canvas size
   - Responsive design would help on different screens
5. **Performance**: Large patient arrays not cleaned up
   - Could remove completed patients after animation
6. **Testing**: No unit tests or test framework

### Code Style
- Inconsistent indentation (mix of spaces/tabs)
- Some long functions (drawPatients ~100 lines)
- Good naming conventions mostly followed
- Comments somewhat verbose but helpful

---

## Adaptation for THEOOM DES Tool

### What Can Be Reused

1. **p5.js Framework**
   - Proven lightweight visualization approach
   - Good for real-time animation
   - Can run in browser without build tools

2. **State Machine Pattern**
   - Clean architecture for entity-based simulation
   - Easy to extend for different entity types

3. **Exponential Distribution Utilities**
   - generateExponentialTime() function
   - Poisson arrival scheduling
   - Both directly applicable to DES

4. **Statistics Collection**
   - Wait time tracking structure
   - Rejection/event counters
   - Real-time display format

5. **Queue Management Logic**
   - FIFO implementation
   - Priority seating (could generalize to any priority rule)
   - Queue length monitoring

### Adaptations Needed for Generic DES Tool

1. **Parameterization**
   - Need configuration file or UI for defining:
     - Entity types (not just patients)
     - Resources (not just doctors/scanner)
     - Process flows (not just healthcare specific)
     - Arrival patterns (different distributions)
   - Move from hardcoded constants to dynamic configuration

2. **Visualization Generalization**
   - Replace healthcare-specific labels
   - Generic "Queue" and "Resource" boxes
   - Flexible layout engine
   - Support multiple entity types with different colors

3. **Process Definition**
   - Instead of hard-coded patient flow
   - Need flowchart/DSL parser
   - Dynamic state definitions
   - Flexible routing logic

4. **Statistics Collection**
   - Generic metrics (utilization, wait times, throughput)
   - Export/charting capabilities
   - Performance analysis features

5. **Scalability**
   - Handle 1000s of entities smoothly
   - Camera/zoom capabilities
   - Simulation speed controls
   - Pause/resume functionality

6. **Data Persistence**
   - Save/load simulations
   - Export results
   - Compare runs

---

## Specific Features Worth Extracting

### 1. P5.js Integration Pattern
The integration of p5.js with HTML/CSS is clean:
- HTML defines container with id
- sketch.js instantiated automatically
- Materialize CSS for UI elements
- Good separation of concerns

### 2. State Display Visualization
The approach of drawing entities based on their state is elegant:
- Position = f(state, entity properties)
- Color = f(state, type)
- Can be generalized to any entity type

### 3. Statistics Display
Right-side panel with:
- Parameter documentation
- Real-time metrics
- Key counters
- Easy to add/remove metrics

### 4. Queue Visualization
Simple but effective:
- Slots represent queue capacity
- Circles represent entities in queue
- Color-coding for context

---

## Performance Characteristics

### Tested Scenario
The code supports:
- ~1-2 arrivals per minute (3-minute average)
- Patient survival through system: ~45-60 minutes on average
- Real simulation time: typically 100s of simulated minutes visible

### Potential Limits
- Canvas drawing: ~500-1000 active patients before slowdown
- Array management: No cleanup, so long runs accumulate patients
- No explicit optimization (spatial hashing, dirty flag updates, etc.)

### Improvements for Scale
- Remove completed patients from allPatients array
- Use requestAnimationFrame instead of fixed frameRate
- Implement dirty flag pattern for rendering
- Consider WebGL for large-scale entity rendering

---

## Dependencies

### External Libraries
1. **p5.js 1.4.0** (CDN) - visualization and graphics
2. **Materialize 1.0.0** (CDN) - Material Design UI
3. **Material Icons** (Google Fonts) - icon set

### No Dependencies On
- No simulation libraries (logic implemented from scratch)
- No database
- No backend services
- Pure frontend implementation

### Advantages
- Zero build tools needed
- Can run from simple static hosting
- Fast load times
- Easy to understand and modify

---

## Summary

The visual-demo is a **well-crafted hospital simulation** that effectively demonstrates discrete-event simulation concepts with engaging real-time visualization. It's a solid foundation for understanding DES and could serve as:

1. **Educational Reference** - Shows how to implement DES in JavaScript/p5.js
2. **Code Template** - Patterns for state machines, queue management, statistics
3. **Starting Point** - Could be evolved into a generic DES visualization tool
4. **Proof of Concept** - Demonstrates that p5.js is suitable for simulation visualization

The main limitation is domain-specificity (healthcare), which would need to be abstracted for a general-purpose DES tool. However, the core simulation logic is domain-agnostic and highly reusable.
