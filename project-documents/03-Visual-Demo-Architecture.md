# Visual Demo - Architecture and Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      HTML5 Canvas (p5.js)                       │
│                   1200 x 600 pixels at 30 FPS                   │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ Renders to
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    Simulation Engine (sketch.js)                │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ draw() Main Loop (called at 30 FPS)                       │ │
│  │                                                           │ │
│  │ 1. handleArrivalsPoisson()  ← Generate new patients      │ │
│  │ 2. updatePatients()         ← Update state machines      │ │
│  │ 3. assignPatientsToDoctors()← Allocate resources         │ │
│  │ 4. assignPatientToScanner() ← Allocate scanner           │ │
│  │ 5. drawVisualization()      ← Render to canvas           │ │
│  │ 6. displayStats()           ← Show metrics               │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Global State:                                                  │
│  ├─ simTime (current simulation time)                           │
│  ├─ allPatients[] (entities)                                    │
│  ├─ doctors[] (resources)                                       │
│  ├─ waitingRoom (queue with seating)                            │
│  ├─ radiologyDept (queue with scanner)                          │
│  └─ stats (metrics)                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Patient Lifecycle State Machine

```
                        ┌─────────────────────┐
                        │   ARRIVING          │
                        │ (Initial state,     │
                        │  1 frame duration)  │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │  WAITING_CHECK_IN   │
                        │ (Transition,        │
                        │  1 frame duration)  │
                        └──────────┬──────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │   WAITING_ROOM               │
                    │ (Can be seated or standing)  │
                    │ Duration: Variable           │
                    │ Awaiting doctor availability │
                    └──────────┬───────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │ Doctor assigned?           │
                └──────────────┬──────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   CONSULTING        │
                    │ Duration:           │
                    │  - Young: ~10 min   │
                    │  - Elderly: ~15 min │
                    │ (Exponential dist.) │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │ Needs radiology?            │
                │ (33% probability)           │
                └──────────┬────┬────────────┘
                           │    │
            ┌──────────────┘    └──────────────┐
            │ No (67%)                         │ Yes (33%)
            ▼                                  ▼
    ┌─────────────────┐          ┌──────────────────────────┐
    │  GOING_HOME     │          │  WAITING_RADIOLOGY       │
    │ (Fades out over │          │ (Transition state,       │
    │  ~100 frames)   │          │  checks queue capacity)  │
    └─────────────────┘          └────────────┬─────────────┘
                                              │
                                    ┌─────────┴────────┐
                                    │ Radiology queue  │
                                    │ has capacity?    │
                                    │ (max 2 waiting)  │
                                    └─────────┬────────┘
                                              │
                        ┌─────────────────────┘
                        │
                ┌───────┴───────┐
                │               │
            Yes │               │ No
                ▼               ▼
    ┌──────────────────────┐  ┌──────────────────────┐
    │ IN_RADIOLOGY_QUEUE   │  │ REJECTED_RAD_FULL    │
    │ Duration: Variable   │  │ (Fades out,          │
    │ Awaiting scanner     │  │  terminal state)     │
    └──────────┬───────────┘  └──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │   SCANNING           │
    │ Duration: ~20 min    │
    │ (Exponential dist.)  │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │   GOING_HOME         │
    │ (Fades out over      │
    │  ~100 frames)        │
    └──────────────────────┘

Terminal States:
├─ GOING_HOME
├─ REJECTED_WR_FULL (waiting room capacity exceeded)
└─ REJECTED_RAD_FULL (radiology queue capacity exceeded)
```

---

## Data Flow During Simulation Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                        START OF FRAME                           │
│                  (simTime incremented)                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 1. HANDLE ARRIVALS           │
            │                              │
            │ Check: simTime >= nextArrival│
            │ If yes:                      │
            │  - Create new patient       │
            │  - Add to allPatients[]      │
            │  - Schedule next arrival    │
            │  - Arrival rate: Poisson    │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 2. UPDATE PATIENTS           │
            │                              │
            │ For each patient:            │
            │  - Increment timeInState     │
            │  - Process state transitions │
            │  - Check end conditions      │
            │  - Free resources if done    │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 3. ASSIGN TO DOCTORS         │
            │                              │
            │ For each free doctor:        │
            │  - Find next waiting patient │
            │  - FIFO order                │
            │  - Calculate service time    │
            │  - Update statistics         │
            │  - Free seat if seating      │
            │  - Try to seat elderly       │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 4. ASSIGN TO SCANNER         │
            │                              │
            │ If scanner free:             │
            │  - Dequeue patient           │
            │  - Calculate scan time       │
            │  - Schedule completion       │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 5. RENDER TO CANVAS          │
            │                              │
            │ drawVisualization():         │
            │  - Clear canvas              │
            │  - Draw waiting room         │
            │  - Draw doctor areas         │
            │  - Draw radiology area       │
            │  - Draw patient circles      │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 6. DISPLAY STATISTICS        │
            │                              │
            │ displayStats():              │
            │  - Show configuration        │
            │  - Show real-time metrics    │
            │  - Show event counters       │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │    END OF FRAME              │
            │  (Wait for next FPS tick)    │
            └──────────────────────────────┘
```

---

## Queue Management: Waiting Room

```
WAITING ROOM CAPACITY: 20 total
├─ SEATS: 8 (physical seats, visible)
│  └─ Elderly get priority (can displace young)
└─ STANDING: 12 max (overflow area)

PATIENT ARRIVAL AT WAITING ROOM:
┌─────────────────────────────────────┐
│ Is waiting room full (20/20)?        │
└────────────────┬────────────────────┘
     ┌───────────┴───────────┐
  No │                       │ Yes
     ▼                       ▼
  ┌──────────────────┐  ┌──────────────────────┐
  │ Try to find seat │  │ REJECTED             │
  └────────┬─────────┘  │ (patient rejected)   │
           │            │ stats.rejected++     │
    ┌──────┴──────┐     └──────────────────────┘
  No│             │Yes
    ▼             ▼
  ┌─────────────┐ ┌──────────┐
  │ Empty seat? │ │ SEATED   │
  │             │ │ (seatIdx │
  └──┬────┬─────┘ │  >= 0)   │
     │    │       └──────────┘
  No │    │ Yes
     │    └──────────────┐
     │                  │
     ▼                  │
  ┌──────────────────┐  │
  │ Patient elderly? │  │
  └────────┬─────────┘  │
        ┌──┴──┐         │
      No│     │Yes      │
        │     ▼         │
        │  ┌──────────────────────────┐
        │  │ Find young seated patient│
        │  │ Displace to standing     │
        │  │ Seat elderly             │
        │  │ Return SEATED            │
        │  └──────────────────────────┘
        │         │
        ▼         ▼
      ┌────────────────────┐
      │ STANDING           │
      │ (no seat available)│
      │ [Stats recorded if │
      │  elderly standing] │
      └────────────────────┘

FREED SEAT HANDLING:
When patient leaves for doctor consultation:
┌─────────────────────────────────────┐
│ Patient had seat (seatIdx >= 0)?     │
└────────────────┬────────────────────┘
              No │                 Yes
                 │                  ▼
                 │        ┌──────────────────────────┐
                 │        │ Free that seat           │
                 │        │ Any elderly standing?    │
                 │        └────────┬────────────────┘
                 │              ┌──┴──┐
                 │            No│     │Yes
                 │              │     ▼
                 │              │  ┌─────────────────┐
                 │              │  │ Seat first      │
                 │              │  │ elderly (FIFO)  │
                 │              │  └─────────────────┘
                 │              │
                 └──────────────┴───────────────┐
                                               │
                                               ▼
                                    ┌─────────────────┐
                                    │ Continue next   │
                                    │ patient         │
                                    └─────────────────┘
```

---

## Resource Allocation: Doctors

```
DOCTORS: 2 parallel servers
Each doctor has independent state

PATIENT-DOCTOR ASSIGNMENT:
┌─────────────────────────────────┐
│ When doctor becomes free         │
│ (after consultation ends)        │
└────────────────┬────────────────┘
                 │
                 ▼
    ┌─────────────────────────────┐
    │ findNextPatientForDoctor()  │
    │                             │
    │ Collect from:               │
    │  - Waiting room seats[]      │
    │  - Waiting room standing[]   │
    │                             │
    │ Filter: state == WAITING_ROOM
    │                             │
    │ Sort by arrival time (FIFO) │
    │ Return first (or null)      │
    └─────────┬───────────────────┘
              │
        ┌─────┴──────┐
      No│             │Yes (patient found)
        │             ▼
        │  ┌──────────────────────────────┐
        │  │ Record wait time stats       │
        │  │ Assign to doctor             │
        │  │ Set state = CONSULTING       │
        │  │ Generate service time        │
        │  │  - Elderly: avg 15 min       │
        │  │  - Young: avg 10 min         │
        │  │ (Exponential distribution)   │
        │  │ Calculate end time           │
        │  └──────────┬───────────────────┘
        │             │
        │             ▼
        │  ┌──────────────────────────────┐
        │  │ If patient was seated:       │
        │  │  - Free that seat            │
        │  │  - Try seat standing elderly │
        │  └──────────────────────────────┘
        │
        └──────────────┬──────────────────┐
                       ▼                  ▼
                   Doctor waiting    (Continue)
```

---

## Resource Allocation: Radiology Scanner

```
RADIOLOGY SYSTEM:
├─ Scanner: 1 unit (resources=1)
├─ Queue: max 2 patients waiting
└─ Utilization pattern affects patient rejection

PATIENT FLOW TO RADIOLOGY:
After consultation, if needsScan (33% chance):
┌─────────────────────────────────┐
│ Patient state = WAITING_RADIOLOGY│
└────────────────┬────────────────┘
                 │
                 ▼
    ┌──────────────────────────────────┐
    │ handleRadiologyEntry()           │
    │                                  │
    │ Is radiology queue full (2/2)?   │
    └────────┬────────────────┬────────┘
           No│                │Yes
             ▼                ▼
    ┌────────────────┐  ┌────────────────────┐
    │ Add to queue   │  │ REJECTED_RAD_FULL  │
    │ state = IN_RAD │  │ Patient rejected   │
    │ _QUEUE         │  │ stats.rejectedRad++
    └────────┬───────┘  └────────────────────┘
             │
             ▼
    ┌────────────────────────────────────┐
    │ assignPatientToScanner()           │
    │                                    │
    │ When scanner becomes free:         │
    │  - Dequeue patient (FIFO)         │
    │  - state = SCANNING               │
    │  - Generate scan time (~20 min)   │
    │  - Calculate end time             │
    └────────┬───────────────────────────┘
             │
             ▼
    ┌────────────────────────────────────┐
    │ Scan completes                     │
    │ state = GOING_HOME                 │
    │ (then fades out)                   │
    └────────────────────────────────────┘
```

---

## Time Scaling

```
FRAME RATE: 30 FPS (configured)

MAPPING:
1 second wall-clock = 1 second real-time (no speed-up/slow-down by default)
30 frames = 1 simulated minute = 60 simulated seconds
1 frame = 1 simulated second

PARAMETERS IN MINUTES (converted to frames):
┌──────────────────────────────────────────┐
│ AVG_INTER_ARRIVAL_TIME = 3 minutes       │
│ → 3 * 30 = 90 frames average             │
│                                          │
│ AVG_CONSULT_TIME_YOUNG = 10 minutes      │
│ → 10 * 30 = 300 frames average           │
│                                          │
│ AVG_SCAN_TIME = 20 minutes               │
│ → 20 * 30 = 600 frames average           │
└──────────────────────────────────────────┘

DISPLAY CONVERSION:
simTime (frames) → minutes + seconds
┌──────────────────────────────────────────┐
│ totalFrames = simTime                    │
│ displayMinutes = floor(simTime / 30)     │
│ displaySeconds = simTime % 30            │
│                                          │
│ Example: simTime = 125 frames            │
│ → 4 minutes 5 seconds                    │
└──────────────────────────────────────────┘
```

---

## Visualization Coordinate System

```
Canvas: 1200 x 600 pixels

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  WAITING ROOM          DOCTORS AREA        STATS PANEL           │
│  (top-left)            (middle)            (right side)          │
│  ┌──────────────────┐  ┌──────────┐  ┌─────────────────┐       │
│  │ [Seat Grid 8x1] │  │ Doctor 1 │  │ CONFIGURATION:  │       │
│  │ @@@@@@@@         │  │ ┌──────┐ │  │ - Arrivals      │       │
│  │ [Standing Area] │  │ │ (busy)│ │  │ - Service times │       │
│  │ ●●●●●●●●●●●●   │  │ └──────┘ │  │ - Capacity      │       │
│  │                  │  │ Doctor 2 │  │                 │       │
│  └──────────────────┘  │ ┌──────┐ │  │ CURRENT STATE:  │       │
│                        │ │(free)│ │  │ - Wait time     │       │
│  RADIOLOGY AREA        │ └──────┘ │  │ - Queue lengths │       │
│  (bottom-left)         │          │  │ - Event counts  │       │
│  ┌──────────┐          └──────────┘  │                 │       │
│  │ Scanner  │                        └─────────────────┘       │
│  │┌────────┐│                                                   │
│  ││ ●      ││                                                   │
│  │└────────┘│                                                   │
│  │ Queue: ● │                                                   │
│  └──────────┘                                                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

COORDINATE CALCULATION FOR PATIENT DRAWING:
state = WAITING_ROOM
  ├─ seated (seatIdx != -1):
  │  x = wrX + seatIdx * (20 + 10) + 10
  │  y = wrY + 15
  └─ standing:
     x = wrX + col * (20) + 10   [grid layout]
     y = wrY + row * (30) + 25   [staggered rows]

state = CONSULTING:
  x = docAreaX + docIdx * (100 + 20) + 50
  y = docAreaY + 35

state = SCANNING:
  x = radX + 60
  y = radY + 40

state = GOING_HOME:
  x = width - 30   (right edge)
  y = height - 30  (bottom right)
  alpha fade: 255 → 0 over 100 frames
```

---

## Statistics Collection Pipeline

```
DURING SIMULATION:
┌──────────────────────────────────────────────────────────────┐
│ When patient assigned to doctor:                             │
│                                                              │
│  waitTimeFrames = simTime - waitingRoomArrivalTime          │
│  stats.totalWaitingTimeToDoctor += waitTimeFrames           │
│  stats.patientsSeenByDoctorCount++                          │
└──────────────────────────────────────────────────────────────┘

DISPLAY TIME:
┌──────────────────────────────────────────────────────────────┐
│ Each frame in displayStats():                               │
│                                                              │
│  if (patientsSeenByDoctorCount > 0) {                       │
│    avgWaitFrames = totalWaitingTimeToDoctor /               │
│                   patientsSeenByDoctorCount                 │
│    avgWaitMinutes = floor(avgWaitFrames / 30)               │
│    avgWaitSeconds = floor(avgWaitFrames % 30)               │
│    display: "Avg Wait (Doctor): Xm XXs"                    │
│  }                                                          │
└──────────────────────────────────────────────────────────────┘

ADDITIONAL METRICS TRACKED:
├─ rejectedWaitingRoom        (total count)
├─ elderlyHadToStandEvent     (total count)
├─ rejectedRadiology          (total count)
├─ current waiting room count (calculated each frame)
├─ current radiology queue    (calculated each frame)
├─ doctor utilization         (calculated implicitly)
└─ simulated time elapsed     (calculated from simTime)
```

---

## Key Algorithms

### Exponential Distribution Generation
```
generateExponentialTime(averageFrames):
  INPUT: averageFrames (e.g., 300 for 10 minutes)
  OUTPUT: random number of frames until next event
  
  lambda = 1.0 / averageFrames
  U = random() in [0, 1]
  if U == 0: U = 0.000001        [avoid log(0)]
  time = -ln(U) / lambda
  return ceil(time)
  
  Properties:
  - Memoryless (no dependency on past)
  - Most events happen ~average
  - Some very fast, some very slow (realistic)
```

### Poisson Arrival Scheduling
```
scheduleNextArrival():
  INPUT: none (uses global arrivalLambdaPerFrame)
  OUTPUT: sets timeOfNextArrival
  
  interArrivalTime = generateExponentialTime(1/arrivalLambdaPerFrame)
  timeOfNextArrival = simTime + ceil(interArrivalTime)
  
  [Next frame checks: if simTime >= timeOfNextArrival]
```

### FIFO Patient Selection
```
findNextPatientForDoctor():
  INPUT: none (reads from waitingRoom data structure)
  OUTPUT: next patient (or null)
  
  candidates = []
  for each seat in waitingRoom.seats:
    if patient exists and state == WAITING_ROOM:
      add to candidates
  for each patient in waitingRoom.standing:
    if state == WAITING_ROOM:
      add to candidates
  
  sort candidates by waitingRoomArrivalTime (ascending)
  return candidates[0] or null
```

