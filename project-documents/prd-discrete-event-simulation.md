# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Discrete Event Simulation - Web-Based Educational Tool

**Product Name:** DES Simulator (Discrete Event Simulation Educational Platform)
**Version:** 1.0
**Document Owner:** Witek
**Created:** 2025-11-10
**Status:** Draft for Development
**Related:** [LRD Week 4 - Lean 4.0](lrd.md) | [GitHub Issue #2](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/2)

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [User Stories & Personas](#3-user-stories--personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Technical Requirements](#5-technical-requirements)
6. [User Interface Design](#6-user-interface-design)
7. [Data Model & Algorithms](#7-data-model--algorithms)
8. [Success Metrics](#8-success-metrics)
9. [Implementation Roadmap](#9-implementation-roadmap)
10. [Integration with Week 4 Lesson](#10-integration-with-week-4-lesson)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Problem Statement

Students learning Operations Management and Lean principles need to **experience** how process design decisions (resource allocation, buffer sizes, service time variability) impact system performance (throughput, waiting times, bottlenecks). Current teaching methods rely on static examples or complex commercial software that is:
- Expensive and requires installation
- Too complex for 2-hour educational sessions
- Not aligned with Lean 4.0 curriculum
- Lacks transparency in calculations (black box)

### 1.2 Proposed Solution

A **web-based, interactive Discrete Event Simulation tool** that:
- Runs entirely in the browser (no installation, no backend)
- Builds on proven spreadsheet-based pedagogy (transparent calculations)
- Allows students to design processes with 3-5 steps and configure all parameters
- Provides real-time visual feedback (animations + metrics)
- Supports both Healthcare and Manufacturing scenarios
- Enables "what-if" analysis for Lean improvements (line balancing, resource optimization)
- Generates actionable insights (bottleneck detection, utilization analysis)

### 1.3 Success Criteria

**During Week 4 Lesson:**
- 90%+ students successfully run minimum 3 simulations
- Students identify bottlenecks correctly in given scenarios
- Students propose and test Lean improvements (measurable impact)

**Technical:**
- Simulation of 1000 entities completes in <5 seconds
- Works on student laptops/tablets (Chrome, Firefox, Safari)
- Zero crashes during 2-hour classroom session with 30 students

**Educational:**
- Students understand relationship between variability → waiting time → waste
- Students can explain trade-offs in resource allocation decisions
- Students connect DES insights to Table VII (Lean × Industry 4.0)

---

## 2. PRODUCT OVERVIEW

### 2.1 Product Vision

> "The simplest, most transparent discrete event simulation tool that makes complex queuing theory concepts tangible and actionable for Operations Management students."

### 2.2 Target Users

**Primary:** Bachelor students in Operations Management (THEOOM course, Week 4)
- Age: 18-22 years old
- Tech-savvy but no programming background
- Learning Lean Manufacturing and Industry 4.0 concepts
- Need to complete assignment using simulation insights

**Secondary:** Educators teaching process optimization
- Need demo-ready tool for live classroom use
- Require configurable scenarios for different teaching contexts
- Want students to learn by experimentation, not memorization

### 2.3 Key Differentiators

| Feature | Commercial Tools (Simul8, Arena) | Excel/Spreadsheet | **Our DES Simulator** |
|---------|----------------------------------|-------------------|----------------------|
| **Cost** | €€€ (licenses) | Free | ✅ Free |
| **Installation** | Required | Required | ✅ Web-based |
| **Learning Curve** | Hours-Days | Moderate | ✅ Minutes |
| **Transparency** | Black box | ✅ Visible formulas | ✅ Step-by-step explanation |
| **Interactivity** | ✅ Real-time | Manual recalc | ✅ Real-time |
| **Scalability** | ✅ Unlimited | Limited (~100 entities) | ✅ 1000+ entities |
| **Lean 4.0 Aligned** | Generic | Generic | ✅ Purpose-built |
| **Visual Animation** | ✅ Advanced | ❌ None | ✅ Simple but effective |

### 2.4 Out of Scope (Version 1.0)

- ❌ Advanced features: Priority queues, resource scheduling, batching
- ❌ 3D visualization or complex animations
- ❌ Cost/financial modeling (focus on time/throughput only)
- ❌ Multi-product/multi-variant simulations
- ❌ Integration with real data sources or APIs
- ❌ Collaborative/multiplayer features
- ❌ Mobile phone support (tablets OK, phones too small)

---

## 3. USER STORIES & PERSONAS

### 3.1 Primary Persona: "Student Sara"

**Background:**
- 20-year-old student in Bedrijfskunde
- Attending Week 4 of THEOOM course
- Has learned Ishikawa diagrams and Value Stream Mapping in previous sessions
- Comfortable with web apps but not technical/programming
- Needs to complete assignment comparing process scenarios

**Goals:**
- Understand how bottlenecks emerge in multi-step processes
- Test "what-if" scenarios (e.g., "What if we add a second machine?")
- Get concrete data to support improvement proposals
- Complete assignment with evidence-based recommendations

**Pain Points:**
- Finds theory abstract without hands-on experience
- Gets confused by complex software with too many options
- Limited time in class (30 min for demos)
- Needs exportable results for assignment writeup

### 3.2 User Stories

#### Must-Have (MVP)

**US-01: Load Preset Scenario**
> "As a student, I want to load a pre-configured scenario (Healthcare or Manufacturing) so that I can immediately start experimenting without setup overhead."

**Acceptance Criteria:**
- Dropdown with minimum 2 scenarios (Healthcare, Manufacturing)
- Each scenario loads with sensible defaults (3-5 steps, realistic parameters)
- Load happens instantly (<1 second)

---

**US-02: Configure Process Steps**
> "As a student, I want to adjust the number of processing steps (3-5) and configure each step's parameters so that I can model different process designs."

**Acceptance Criteria:**
- Can add/remove steps (min 3, max 5)
- For each step, can configure:
  - Step name (text input)
  - Number of parallel resources (1-5)
  - Service time distribution (mean + std dev or discrete probability)
  - Buffer capacity before this step (0-20 units)
- Changes persist during session
- Visual preview of process flow updates dynamically

---

**US-03: Set Arrival Parameters**
> "As a student, I want to configure how entities arrive (inter-arrival time distribution, total number) so that I can simulate different demand patterns."

**Acceptance Criteria:**
- Can set total entities to simulate (50 / 100 / 500 / 1000)
- Can configure inter-arrival distribution:
  - Option 1: Fixed interval (deterministic)
  - Option 2: Exponential distribution (parameter λ)
  - Option 3: Discrete probability table (like spreadsheet)
- Clear explanation of what each distribution means

---

**US-04: Run Simulation**
> "As a student, I want to run the simulation and see results within seconds so that I can iterate quickly through multiple scenarios."

**Acceptance Criteria:**
- Single "Run Simulation" button
- Progress indicator during run
- Completes 1000 entities in <5 seconds
- Animation shows entities moving through process (optional toggle on/off for speed)
- Results appear immediately after completion

---

**US-05: View Key Metrics**
> "As a student, I want to see the most important performance metrics (throughput, lead time, waiting time, utilization) so that I can evaluate process performance."

**Acceptance Criteria:**
- Dashboard displays:
  - **Throughput:** entities/hour
  - **Mean Time In System (TIS):** average end-to-end time
  - **Mean Total Waiting Time:** average time spent waiting
  - **Resource Utilization %** for each step
  - **Bottleneck identification:** which step is constraining throughput
- Metrics update after each simulation run
- Clear definitions/tooltips for each metric

---

**US-06: Visualize Distributions**
> "As a student, I want to see histograms of Time In System and Waiting Time so that I can understand variability and not just averages."

**Acceptance Criteria:**
- Histogram 1: Time In System (binned distribution)
- Histogram 2: Total Waiting Time (binned distribution)
- X-axis shows time ranges, Y-axis shows frequency
- Visually clear (color-coded, labeled axes)
- Updates after each simulation run

---

**US-07: Identify Bottleneck Automatically**
> "As a student, I want the tool to automatically identify which process step is the bottleneck so that I know where to focus Lean improvements."

**Acceptance Criteria:**
- Bottleneck = step with highest utilization OR longest queue
- Clearly highlighted in UI (red border, warning icon, or label)
- Tooltip explains: "This step processes X% of the time and causes Y min average wait"
- Suggestion displayed: "Consider adding resources here or reducing service time"

---

**US-08: Compare Scenarios**
> "As a student, I want to run a simulation, modify parameters, run again, and compare before/after results so that I can quantify the impact of improvements."

**Acceptance Criteria:**
- After first run, results are saved as "Scenario A"
- After modifying and running again, results shown as "Scenario B"
- Side-by-side comparison table shows:
  - Throughput (A vs B, % change)
  - Mean TIS (A vs B, % change)
  - Mean WT (A vs B, % change)
  - Bottleneck (A vs B, did it change?)
- Can reset comparison and start fresh

---

**US-09: Export Results**
> "As a student, I want to export simulation results (metrics + charts) so that I can include them in my assignment report."

**Acceptance Criteria:**
- Export button generates:
  - Option 1: PNG screenshot of dashboard
  - Option 2: CSV file with raw data (each entity's times)
- Files download to browser (no upload to server needed)
- Filename includes scenario name and timestamp

---

**US-10: Reset to Defaults**
> "As a student, I want to reset the entire configuration to default values so that I can start fresh if I get confused or want to try a different scenario."

**Acceptance Criteria:**
- "Reset" button returns to initial state
- Confirmation dialog: "Are you sure? Current configuration will be lost."
- After reset, loads default Healthcare scenario

---

#### Should-Have (Post-MVP)

**US-11: Save/Load Custom Scenarios**
> "As a student, I want to save my current configuration and reload it later so that I can continue my work across sessions."

**US-12: Step-by-Step Calculation View**
> "As a student, I want to see detailed calculations for a single entity (like the spreadsheet rows) so that I understand exactly how the simulation works."

**US-13: Animated Process Visualization**
> "As a student, I want to see a live animation of entities moving through the process so that I can visually understand the flow and queues building up."

**US-14: Statistical Analysis Across Multiple Runs**
> "As a student, I want to run the simulation 10 times automatically and see confidence intervals so that I understand simulation variability."

---

### 3.3 Secondary Persona: "Teacher Tom"

**Background:**
- Educator teaching THEOOM Week 4
- Needs tools that work reliably in classroom setting
- Limited time for troubleshooting during live session
- Wants students to discover insights themselves (constructivist pedagogy)

**User Stories:**

**US-15: Pre-load Multiple Scenarios**
> "As a teacher, I want to pre-configure 3-5 scenarios with different characteristics (balanced line, bottleneck, high variability) so that students can explore different cases quickly."

**US-16: Demo Mode**
> "As a teacher, I want a full-screen demo mode with minimal UI clutter so that I can project the simulation clearly for the entire class to see."

**US-17: Reliable Performance**
> "As a teacher, I need the tool to work consistently without crashes so that I don't lose credibility or lesson time troubleshooting."

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Core Features

#### FR-01: Scenario Management

**FR-01.1: Preset Scenarios**
- Minimum 2 preset scenarios included:
  1. **Healthcare Clinic:** Patient → Nurse → Doctor (based on existing spreadsheet)
  2. **Manufacturing Line:** Raw Material → Machining → Quality Control → Assembly → Packaging
- Each preset includes:
  - Process flow (steps)
  - Resource counts
  - Service time distributions
  - Arrival patterns
  - Buffer sizes

**FR-01.2: Scenario Selector**
- Dropdown menu: "Select Scenario"
- Options: Healthcare | Manufacturing | Custom
- Selecting a preset populates all configuration fields
- "Custom" starts with blank/minimal configuration

---

#### FR-02: Process Configuration

**FR-02.1: Process Flow Builder**
- Visual representation of process steps (boxes connected by arrows)
- Add step: `[+ Add Step]` button (max 5 steps)
- Remove step: `[X]` button on each step (min 3 steps)
- Drag to reorder steps (optional nice-to-have)

**FR-02.2: Step Configuration Panel**

For each step, editable fields:

| Parameter | Input Type | Range/Options | Default (Healthcare) |
|-----------|-----------|---------------|---------------------|
| **Step Name** | Text input | 1-30 characters | "Nurse Service" |
| **Number of Resources** | Number input (slider) | 1-5 | 1 |
| **Service Time Type** | Dropdown | Fixed / Normal / Exponential / Discrete | Discrete |
| **Service Time Mean** | Number input | 0.1-60 minutes | 7 |
| **Service Time Std Dev** | Number input | 0-30 minutes | 0 (if fixed) |
| **Buffer Capacity** | Number input (slider) | 0-20 | 10 |

**Service Time Distribution Details:**

- **Fixed:** Every entity takes exactly `mean` time
- **Normal:** Mean ± Std Dev (N(μ, σ))
- **Exponential:** Average = mean, highly variable
- **Discrete:** Custom probability table (like spreadsheet)
  - Example: 30% chance 4 min, 50% chance 8 min, 20% chance 12 min
  - UI: Simple table with (value, probability %) rows

---

#### FR-03: Arrival Configuration

**FR-03.1: Entity Arrival Settings**

| Parameter | Input Type | Options | Default |
|-----------|-----------|---------|---------|
| **Total Entities** | Radio buttons | 50 / 100 / 500 / 1000 | 100 |
| **Arrival Pattern** | Dropdown | Fixed Interval / Exponential / Discrete | Discrete |
| **Inter-Arrival Mean** | Number input | 0.1-60 minutes | 8.5 |
| **Inter-Arrival Std Dev** | Number input | 0-30 minutes | varies |

**FR-03.2: Arrival Distribution Table** (if Discrete selected)
- Table editor with columns: [Interval (min), Probability (%)]
- Pre-filled with spreadsheet example:
  - 5 min → 50%
  - 10 min → 30%
  - 15 min → 20%
- Can add/edit/remove rows
- Total probability must sum to 100% (validation)

---

#### FR-04: Simulation Engine

**FR-04.1: Core Simulation Algorithm**

Implements discrete event simulation following the spreadsheet logic:

```
For each entity i:
  1. Calculate arrival_time[i] based on inter-arrival distribution
  2. For each step s:
     a. Determine start_time[i,s] = MAX(arrival_at_step, earliest_resource_available)
     b. Sample service_time[i,s] from configured distribution
     c. Calculate finish_time[i,s] = start_time[i,s] + service_time[i,s]
     d. Update resource availability
     e. Calculate wait_time[i,s] = start_time[i,s] - arrival_at_step
  3. Calculate total_time_in_system[i] = finish_time[i, last_step] - arrival_time[i]
  4. Calculate total_wait_time[i] = SUM(wait_time[i,s] for all steps)
```

**FR-04.2: Performance Requirements**
- Simulate 50 entities in <1 second
- Simulate 1000 entities in <5 seconds
- Support up to 5 steps × 5 resources = 25 total resources

**FR-04.3: Random Number Generation**
- Use Web Crypto API for quality randomness (or Math.random() as fallback)
- Support seeding for reproducibility (optional)

**FR-04.4: Edge Cases Handling**
- If buffer full: entity waits before entering step (blocking)
- If resource busy: entity joins queue (FIFO)
- If service time < 0 sampled: resample or set to minimum (0.1 min)

---

#### FR-05: Results Dashboard

**FR-05.1: Key Metrics Display**

Display in prominent card-style layout:

```
┌─────────────────────────────────────────────────┐
│  SIMULATION RESULTS                             │
├─────────────────────────────────────────────────┤
│  ⏱️  Simulation Time: 443.2 minutes             │
│  📈 Throughput: 13.6 entities/hour              │
│  ⌛ Mean Time In System: 20.6 minutes           │
│  ⏳ Mean Total Wait Time: 6.3 minutes           │
│  🎯 Bottleneck: Step 2 (Doctor) - 87% util      │
└─────────────────────────────────────────────────┘
```

**FR-05.2: Resource Utilization Table**

| Step | Resource Count | Utilization % | Avg Queue Length | Avg Wait Time |
|------|----------------|---------------|------------------|---------------|
| 1. Nurse | 1 | 65% | 0.4 | 1.8 min |
| 2. Doctor | 1 | **87%** ⚠️ | 2.1 | 4.5 min |

- Bottleneck highlighted (red/bold)
- Tooltip on utilization: "% of time resources are busy"

**FR-05.3: Histograms**

**Histogram 1: Time In System**
- X-axis: Time bins (e.g., 10-15, 15-20, 20-25, ...)
- Y-axis: Frequency (count of entities)
- Bins calculated dynamically based on data range
- Color: Blue

**Histogram 2: Total Wait Time**
- X-axis: Time bins
- Y-axis: Frequency
- Color: Red

Both charts:
- Responsive (scale to container)
- Labeled axes with units
- Grid lines for readability
- Rendered using Chart.js or similar library

---

#### FR-06: Bottleneck Detection

**FR-06.1: Automatic Identification**

Bottleneck = step with **highest utilization %**

Alternative criteria (if utilization similar):
- Longest average queue length
- Highest average wait time at that step

**FR-06.2: Visual Indicators**
- In process flow diagram: Highlight bottleneck step with red border
- In metrics table: Red warning icon + bold text
- In results summary: Explicit statement: "Bottleneck: Step X"

**FR-06.3: Improvement Suggestions**

Display context-aware suggestions:

| If Bottleneck Utilization | Suggestion |
|---------------------------|------------|
| >90% | "⚠️ Critical bottleneck! Consider adding resources or reducing service time." |
| 75-90% | "⚡ Moderate bottleneck. Line balancing may improve flow." |
| <75% | "✅ No severe bottleneck detected. Process is relatively balanced." |

---

#### FR-07: Scenario Comparison

**FR-07.1: Before/After Tracking**

After first simulation run:
- Store results as "Scenario A"
- Button appears: `[Compare with New Run]`

After second run:
- Results stored as "Scenario B"
- Comparison table displays

**FR-07.2: Comparison Table**

| Metric | Scenario A | Scenario B | Change | % Improvement |
|--------|-----------|-----------|--------|---------------|
| Throughput | 13.6 /hr | 18.2 /hr | +4.6 | +34% ✅ |
| Mean TIS | 20.6 min | 16.4 min | -4.2 | -20% ✅ |
| Mean Wait | 6.3 min | 2.8 min | -3.5 | -56% ✅ |
| Bottleneck | Step 2 | Step 3 | Changed | - |

- Green ✅ for improvements
- Red ❌ for degradations
- Yellow ⚠️ for minor changes (<5%)

**FR-07.3: Reset Comparison**
- `[Clear Comparison]` button
- Returns to single-run mode

---

#### FR-08: Export Functionality

**FR-08.1: Export Options**

Button: `[Export Results ▼]` with dropdown:
1. **Download Screenshot (PNG)** - Captures dashboard area
2. **Download Data (CSV)** - Entity-level details
3. **Download Summary (PDF)** - Metrics + charts (nice-to-have)

**FR-08.2: CSV Export Format**

```csv
Entity,ArrivalTime,Step1_Start,Step1_Service,Step1_Finish,Step1_Wait,...,TotalTIS,TotalWait
1,0.0,0.0,7.0,7.0,0.0,...,25.3,5.2
2,5.0,7.0,7.0,14.0,2.0,...,30.1,8.5
...
```

**FR-08.3: PNG Screenshot**
- Use html2canvas or similar library
- Capture full results section (metrics + charts)
- Filename: `DES_Results_{ScenarioName}_{Timestamp}.png`
- Auto-download to browser

---

#### FR-09: Help & Guidance

**FR-09.1: Tooltips**
- Hover over any parameter label → tooltip with definition
- Hover over metrics → tooltip with formula/explanation

Examples:
- **Utilization:** "% of time this resource is busy (not idle)"
- **Mean TIS:** "Average time from arrival to completion (processing + waiting)"
- **Bottleneck:** "The step that limits overall system throughput"

**FR-09.2: Info Icons**
- `[i]` icon next to complex sections
- Click → modal/popover with detailed explanation

**FR-09.3: Help Section (Optional)**
- `[?]` button in header
- Opens overlay with:
  - Quick start guide
  - Parameter explanations
  - Example use cases
  - Link to full documentation

---

### 4.2 User Interface Requirements

#### UI-01: Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: DES Simulator | [Help] [Reset] [Export▼]          │
├─────────────────────────────────────────────────────────────┤
│  CONFIGURATION PANEL (Left 40%)  │  RESULTS PANEL (Right 60%)│
│                                    │                          │
│  [Select Scenario ▼]              │  [Run Simulation]        │
│                                    │                          │
│  Process Flow:                     │  ⏱️ Results:             │
│  ┌──┐ → ┌──┐ → ┌──┐              │  - Throughput: ...       │
│  │S1│   │S2│   │S3│              │  - Mean TIS: ...         │
│  └──┘   └──┘   └──┘              │  - Bottleneck: ...       │
│   [Edit] [Edit] [Edit]            │                          │
│                                    │  📊 Histogram: TIS       │
│  Arrival Settings:                 │  [Chart]                │
│  - Entities: [100 ▼]              │                          │
│  - Pattern: [Discrete ▼]          │  📊 Histogram: Wait Time │
│  - [Configure Distribution]        │  [Chart]                │
│                                    │                          │
│  [Advanced Settings ▼]            │  📋 Resource Utilization │
│                                    │  [Table]                │
│                                    │                          │
└────────────────────────────────────┴──────────────────────────┘
```

#### UI-02: Responsive Design
- **Desktop (>1024px):** Side-by-side layout (Config | Results)
- **Tablet (768-1024px):** Stacked layout (Config on top, Results below)
- **Min supported:** 768px width (iPad landscape)

#### UI-03: Visual Design Principles
- **Clean & minimal:** No unnecessary decoration
- **High contrast:** Accessible color scheme (WCAG AA compliant)
- **Dutch language** (primary), English toggle (optional)
- **Consistent spacing:** 8px grid system
- **Clear hierarchy:** Headings, sections, cards

#### UI-04: Interaction Patterns
- **Immediate feedback:** Parameter changes show preview instantly
- **Progressive disclosure:** Advanced options hidden by default
- **Confirmation dialogs:** For destructive actions (Reset, Clear)
- **Loading states:** Spinner during simulation run
- **Success states:** Green checkmark when simulation completes

---

### 4.3 Non-Functional Requirements

#### NFR-01: Performance
- Simulation runtime: <5 sec for 1000 entities
- UI responsiveness: <100ms for parameter changes
- Chart rendering: <500ms
- Export PNG: <2 sec
- Total page load: <3 sec (including libraries)

#### NFR-02: Compatibility
- **Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Devices:** Laptops (Windows/Mac), Tablets (iPad/Android)
- **Screen:** Minimum 1024×768 resolution

#### NFR-03: Reliability
- **Crash rate:** <0.1% (should not crash during normal use)
- **Data validation:** All inputs validated before simulation
- **Error handling:** Graceful degradation with user-friendly messages
- **Edge cases:** Handle extreme inputs (e.g., service time = 0)

#### NFR-04: Usability
- **Learnability:** Students can run first simulation within 5 minutes
- **Efficiency:** Experienced users can configure custom scenario in <2 min
- **Memorability:** Students remember how to use after 1-week gap
- **Error prevention:** Validation prevents invalid configurations

#### NFR-05: Accessibility
- **Keyboard navigation:** Full functionality without mouse
- **Screen reader:** Semantic HTML, ARIA labels
- **Color blindness:** Don't rely solely on color for information
- **Font size:** Minimum 14px, scalable

#### NFR-06: Maintainability
- **Code quality:** Well-commented, modular JavaScript
- **Documentation:** README with setup/deployment instructions
- **Testing:** Unit tests for simulation engine (nice-to-have)
- **Version control:** Git with meaningful commit messages

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 Technology Stack

#### Frontend Framework
**Option 1: Vanilla JavaScript** (Recommended for MVP)
- ✅ No build process needed
- ✅ Easy to understand and modify
- ✅ Fast load times
- ✅ No framework lock-in
- ❌ More verbose code

**Option 2: React** (If familiar)
- ✅ Component reusability
- ✅ Better state management for complex UI
- ❌ Requires build process (Webpack/Vite)
- ❌ Larger bundle size

**Decision:** Start with **Vanilla JS + Web Components** for simplicity. Can refactor to React later if needed.

---

#### Libraries & Dependencies

| Library | Purpose | Version | Size | License |
|---------|---------|---------|------|---------|
| **Chart.js** | Histograms & charts | 4.4+ | ~200KB | MIT |
| **html2canvas** | Screenshot export | 1.4+ | ~150KB | MIT |
| **PapaParse** | CSV export | 5.4+ | ~50KB | MIT |
| **Draggable** (optional) | Drag-to-reorder steps | - | ~20KB | MIT |

**Total bundle:** ~420KB (acceptable for web app)

**CDN vs. Bundled:**
- Use CDN for faster development
- Can bundle later for offline capability

---

### 5.2 Architecture

#### File Structure

```
/demos/discrete-event-sim/
├── index.html              # Main page
├── css/
│   ├── style.css          # Global styles
│   └── components.css     # Component-specific styles
├── js/
│   ├── main.js            # App initialization
│   ├── simulation.js      # Core simulation engine
│   ├── ui.js              # UI interactions
│   ├── chart.js           # Chart rendering
│   ├── export.js          # Export functionality
│   └── utils.js           # Helper functions
├── data/
│   ├── healthcare.json    # Healthcare preset scenario
│   └── manufacturing.json # Manufacturing preset scenario
└── assets/
    ├── logo.png
    └── icons/
```

---

#### Core Modules

**1. Simulation Engine (`simulation.js`)**

```javascript
class DiscreteEventSimulation {
  constructor(config) {
    this.steps = config.steps;
    this.arrivalConfig = config.arrival;
    this.entities = [];
    this.resources = [];
  }

  run(numEntities) {
    // Initialize
    this.entities = [];

    // Generate arrivals
    for (let i = 0; i < numEntities; i++) {
      const entity = new Entity(i);
      entity.arrivalTime = this.generateArrivalTime(i);
      this.entities.push(entity);
    }

    // Process each entity through each step
    for (const entity of this.entities) {
      for (let s = 0; s < this.steps.length; s++) {
        this.processEntityAtStep(entity, s);
      }
    }

    // Calculate metrics
    return this.calculateMetrics();
  }

  processEntityAtStep(entity, stepIndex) {
    const step = this.steps[stepIndex];

    // Determine arrival at this step
    const arrivalAtStep = (stepIndex === 0)
      ? entity.arrivalTime
      : entity.stepFinish[stepIndex - 1];

    // Find earliest available resource
    const resourceAvailable = this.getEarliestAvailableResource(step);

    // Start time = max(arrival, resource available)
    const startTime = Math.max(arrivalAtStep, resourceAvailable);

    // Sample service time from distribution
    const serviceTime = this.sampleServiceTime(step);

    // Finish time
    const finishTime = startTime + serviceTime;

    // Record times
    entity.stepStart[stepIndex] = startTime;
    entity.stepService[stepIndex] = serviceTime;
    entity.stepFinish[stepIndex] = finishTime;
    entity.stepWait[stepIndex] = startTime - arrivalAtStep;

    // Update resource availability
    this.updateResourceAvailability(step, finishTime);
  }

  sampleServiceTime(step) {
    switch(step.distributionType) {
      case 'fixed':
        return step.mean;
      case 'normal':
        return this.sampleNormal(step.mean, step.stdDev);
      case 'exponential':
        return this.sampleExponential(step.mean);
      case 'discrete':
        return this.sampleDiscrete(step.probabilityTable);
    }
  }

  calculateMetrics() {
    const metrics = {
      simulationTime: Math.max(...this.entities.map(e => e.stepFinish[e.stepFinish.length - 1])),
      throughput: 0,
      meanTIS: 0,
      meanWait: 0,
      utilizationByStep: [],
      bottleneck: null
    };

    // Calculate TIS and Wait for each entity
    for (const entity of this.entities) {
      entity.totalTIS = entity.stepFinish[entity.stepFinish.length - 1] - entity.arrivalTime;
      entity.totalWait = entity.stepWait.reduce((sum, w) => sum + w, 0);
    }

    metrics.meanTIS = this.mean(this.entities.map(e => e.totalTIS));
    metrics.meanWait = this.mean(this.entities.map(e => e.totalWait));
    metrics.throughput = (this.entities.length / metrics.simulationTime) * 60; // per hour

    // Calculate utilization per step
    for (let s = 0; s < this.steps.length; s++) {
      const totalServiceTime = this.entities.reduce((sum, e) => sum + e.stepService[s], 0);
      const utilization = (totalServiceTime / (metrics.simulationTime * this.steps[s].resources)) * 100;
      metrics.utilizationByStep.push({
        stepName: this.steps[s].name,
        utilization: utilization,
        avgQueueLength: this.calculateAvgQueueLength(s),
        avgWaitTime: this.mean(this.entities.map(e => e.stepWait[s]))
      });
    }

    // Identify bottleneck
    const maxUtil = Math.max(...metrics.utilizationByStep.map(u => u.utilization));
    metrics.bottleneck = metrics.utilizationByStep.find(u => u.utilization === maxUtil);

    return metrics;
  }

  // Statistical sampling functions
  sampleNormal(mean, stdDev) {
    // Box-Muller transform
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.max(0.1, mean + z * stdDev); // Ensure positive
  }

  sampleExponential(mean) {
    return -mean * Math.log(1 - Math.random());
  }

  sampleDiscrete(table) {
    const rand = Math.random();
    let cumulative = 0;
    for (const row of table) {
      cumulative += row.probability;
      if (rand <= cumulative) {
        return row.value;
      }
    }
    return table[table.length - 1].value; // fallback
  }
}

class Entity {
  constructor(id) {
    this.id = id;
    this.arrivalTime = 0;
    this.stepStart = [];
    this.stepService = [];
    this.stepFinish = [];
    this.stepWait = [];
    this.totalTIS = 0;
    this.totalWait = 0;
  }
}
```

---

**2. UI Controller (`ui.js`)**

Handles:
- Loading presets from JSON
- Populating configuration forms
- Event listeners for buttons (Run, Reset, Export)
- Updating results display after simulation
- Parameter validation

---

**3. Chart Renderer (`chart.js`)**

```javascript
class ChartRenderer {
  renderTISHistogram(entities, canvasId) {
    const tisValues = entities.map(e => e.totalTIS);
    const bins = this.createBins(tisValues, 10); // 10 bins

    new Chart(document.getElementById(canvasId), {
      type: 'bar',
      data: {
        labels: bins.labels,
        datasets: [{
          label: 'Frequency',
          data: bins.counts,
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Time In System Distribution' }
        },
        scales: {
          x: { title: { display: true, text: 'Time (minutes)' }},
          y: { title: { display: true, text: 'Number of Entities' }}
        }
      }
    });
  }

  createBins(values, numBins) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / numBins;

    const bins = Array(numBins).fill(0);
    const labels = [];

    for (let i = 0; i < numBins; i++) {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      labels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);

      bins[i] = values.filter(v => v >= binStart && v < binEnd).length;
    }

    return { labels, counts: bins };
  }
}
```

---

### 5.3 Data Model

#### Scenario Configuration Schema

```json
{
  "name": "Healthcare Clinic",
  "description": "Patient flow through nurse and doctor",
  "steps": [
    {
      "id": 1,
      "name": "Nurse Service",
      "resources": 1,
      "serviceTime": {
        "type": "fixed",
        "mean": 7,
        "stdDev": 0
      },
      "bufferCapacity": 10
    },
    {
      "id": 2,
      "name": "Doctor Consultation",
      "resources": 1,
      "serviceTime": {
        "type": "discrete",
        "mean": 8.5,
        "probabilityTable": [
          { "value": 4, "probability": 0.30 },
          { "value": 8, "probability": 0.50 },
          { "value": 12, "probability": 0.20 }
        ]
      },
      "bufferCapacity": 10
    }
  ],
  "arrival": {
    "totalEntities": 100,
    "pattern": {
      "type": "discrete",
      "mean": 8.5,
      "probabilityTable": [
        { "value": 5, "probability": 0.50 },
        { "value": 10, "probability": 0.30 },
        { "value": 15, "probability": 0.20 }
      ]
    }
  }
}
```

---

#### Manufacturing Scenario Example

```json
{
  "name": "Manufacturing Production Line",
  "description": "Product assembly through multiple workstations",
  "steps": [
    {
      "id": 1,
      "name": "Raw Material Prep",
      "resources": 2,
      "serviceTime": { "type": "normal", "mean": 5, "stdDev": 1 },
      "bufferCapacity": 5
    },
    {
      "id": 2,
      "name": "Machining",
      "resources": 1,
      "serviceTime": { "type": "normal", "mean": 12, "stdDev": 3 },
      "bufferCapacity": 3
    },
    {
      "id": 3,
      "name": "Quality Control",
      "resources": 1,
      "serviceTime": { "type": "exponential", "mean": 6 },
      "bufferCapacity": 2
    },
    {
      "id": 4,
      "name": "Assembly",
      "resources": 2,
      "serviceTime": { "type": "normal", "mean": 8, "stdDev": 2 },
      "bufferCapacity": 5
    },
    {
      "id": 5,
      "name": "Packaging",
      "resources": 3,
      "serviceTime": { "type": "fixed", "mean": 3 },
      "bufferCapacity": 10
    }
  ],
  "arrival": {
    "totalEntities": 500,
    "pattern": {
      "type": "exponential",
      "mean": 10
    }
  }
}
```

---

### 5.4 Validation Rules

| Field | Validation Rule | Error Message |
|-------|----------------|---------------|
| Step Name | 1-30 chars, alphanumeric + spaces | "Name must be 1-30 characters" |
| Resources | Integer 1-5 | "Must be between 1 and 5" |
| Service Time Mean | Float >0, <999 | "Must be positive number" |
| Std Dev | Float ≥0, ≤mean | "Cannot exceed mean" |
| Buffer Capacity | Integer 0-20 | "Must be 0-20" |
| Total Entities | One of: 50/100/500/1000 | "Select valid option" |
| Probability Table | Sum = 1.0 (100%) | "Probabilities must sum to 100%" |

---

### 5.5 Error Handling

**Common Errors & Solutions:**

| Error | Cause | Solution |
|-------|-------|----------|
| "Simulation stuck" | Infinite loop (buffer blocking) | Add timeout (max iterations) |
| "Negative time calculated" | Bad random sample | Resample or clamp to min (0.1) |
| "Chart not rendering" | Invalid data | Validate bins before rendering |
| "Export failed" | Browser compatibility | Fallback to alert with CSV text |
| "Out of memory" | Too many entities (>10k) | Limit to max 1000 |

---

## 6. USER INTERFACE DESIGN

### 6.1 Wireframes

#### Main Screen (Desktop Layout)

```
┌──────────────────────────────────────────────────────────────────┐
│  DES SIMULATOR                    [?Help] [Reset] [Export ▼]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────┐  ┌────────────────────────────────┐│
│  │ CONFIGURATION           │  │ RESULTS                        ││
│  │                          │  │                                ││
│  │ Scenario: [Healthcare ▼]│  │  [▶ Run Simulation]            ││
│  │                          │  │                                ││
│  │ ┌────PROCESS FLOW────┐  │  │  Status: Ready                 ││
│  │ │                     │  │  │                                ││
│  │ │  ┌─────┐  ┌──────┐ │  │  │  ⏱️ METRICS                    ││
│  │ │  │Nurse│→ │Doctor│ │  │  │  ────────────────              ││
│  │ │  │ (1) │  │ (1)  │ │  │  │  Throughput: -- /hr            ││
│  │ │  └─────┘  └──────┘ │  │  │  Mean TIS: -- min              ││
│  │ │                     │  │  │  Mean Wait: -- min             ││
│  │ │ [Edit Steps]        │  │  │  Bottleneck: --                ││
│  │ └─────────────────────┘  │  │                                ││
│  │                          │  │  📊 TIME IN SYSTEM             ││
│  │ ARRIVAL SETTINGS         │  │  ┌────────────────────┐       ││
│  │ ────────────────         │  │  │  [Histogram]       │       ││
│  │ Entities: ● 100 ○ 500    │  │  │                    │       ││
│  │ Pattern: [Discrete ▼]    │  │  └────────────────────┘       ││
│  │                          │  │                                ││
│  │ ▼ Advanced Settings      │  │  📊 WAITING TIME               ││
│  │   [Collapsed]            │  │  ┌────────────────────┐       ││
│  │                          │  │  │  [Histogram]       │       ││
│  │                          │  │  │                    │       ││
│  │                          │  │  └────────────────────┘       ││
│  │                          │  │                                ││
│  └─────────────────────────┘  └────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Step Configuration Modal

```
┌─────────────────────────────────────────────┐
│  EDIT STEP: Nurse Service            [X]    │
├─────────────────────────────────────────────┤
│                                              │
│  Step Name:  [Nurse Service________]        │
│                                              │
│  Number of Resources:                        │
│  ├──●──┤  1  [Parallel resources]           │
│   1   5                                      │
│                                              │
│  Service Time Distribution:                  │
│  [Fixed ▼]  [Normal]  [Exponential]          │
│              [Discrete]                      │
│                                              │
│  Mean (minutes):  [7___]                    │
│  Std Dev:         [0___] (N/A for Fixed)    │
│                                              │
│  Buffer Capacity Before This Step:           │
│  ├─────●─────┤  10                          │
│   0         20                               │
│                                              │
│  ℹ️ Tip: Higher buffer = less blocking but   │
│     more inventory (waste!)                  │
│                                              │
│                 [Cancel]  [Save Changes]     │
└─────────────────────────────────────────────┘
```

---

#### Results - Comparison Mode

```
┌──────────────────────────────────────────────────────────────┐
│  SCENARIO COMPARISON                                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Metric             │ Scenario A  │ Scenario B │ Change      │
│  ───────────────────┼─────────────┼────────────┼───────────  │
│  Throughput         │ 13.6 /hr    │ 18.2 /hr   │ +34% ✅     │
│  Mean TIS           │ 20.6 min    │ 16.4 min   │ -20% ✅     │
│  Mean Wait Time     │ 6.3 min     │ 2.8 min    │ -56% ✅     │
│  Bottleneck         │ Doctor (87%)│ Nurse (72%)│ Changed     │
│                                                               │
│  💡 Insights:                                                │
│  • Adding second doctor significantly improved throughput    │
│  • Bottleneck shifted from Doctor to Nurse                   │
│  • Consider balancing: add nurse OR reduce nurse time        │
│                                                               │
│                                    [Clear Comparison]         │
└──────────────────────────────────────────────────────────────┘
```

---

### 6.2 Visual Design System

#### Color Palette

| Use Case | Color | Hex | Purpose |
|----------|-------|-----|---------|
| Primary | Blue | `#3b82f6` | Buttons, headers, TIS histogram |
| Secondary | Green | `#10b981` | Success states, improvements |
| Accent | Purple | `#8b5cf6` | Interactive elements |
| Warning | Orange | `#f59e0b` | Moderate issues |
| Danger | Red | `#ef4444` | Bottlenecks, errors, wait time histogram |
| Neutral 100 | Light Gray | `#f3f4f6` | Backgrounds |
| Neutral 900 | Dark Gray | `#111827` | Text |

#### Typography

```css
/* Headings */
h1 { font-size: 24px; font-weight: 700; }
h2 { font-size: 20px; font-weight: 600; }
h3 { font-size: 18px; font-weight: 600; }

/* Body */
body { font-size: 16px; font-family: 'Inter', -apple-system, sans-serif; }
p { line-height: 1.6; }

/* Small text */
.caption { font-size: 14px; color: #6b7280; }
```

#### Spacing

- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

#### Components

**Button Styles:**

```css
.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2563eb;
}
```

**Card Styles:**

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

### 6.3 Interaction States

| Element | State | Visual Change |
|---------|-------|---------------|
| Button | Hover | Darken color, cursor pointer |
| Button | Active | Scale 0.98, darken further |
| Button | Disabled | Opacity 0.5, cursor not-allowed |
| Input | Focus | Blue border, subtle shadow |
| Input | Error | Red border, error message below |
| Slider | Dragging | Larger thumb, color change |
| Tooltip | Hover | Fade in 200ms, position near element |

---

### 6.4 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
  .container { display: grid; grid-template-columns: 40% 60%; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .container { display: block; }
  .config-panel { margin-bottom: 24px; }
}

/* Mobile (not supported, show warning) */
@media (max-width: 767px) {
  .app { display: none; }
  .mobile-warning { display: block; }
}
```

---

## 7. DATA MODEL & ALGORITHMS

### 7.1 Entity Lifecycle

```
Entity Creation
  ↓
[Generate Arrival Time] ← Based on inter-arrival distribution
  ↓
For each Step s in Process:
  ↓
  [Arrival at Step s]
    ↓
    ├─ If buffer full → Wait until space available
    │
    ├─ [Enter Queue for Resource]
    │    ↓
    │    ├─ If resource available → Start immediately
    │    └─ Else → Wait in queue (FIFO)
    │
    ├─ [Start Service]
    │    ↓
    │    ├─ Record start_time[s]
    │    └─ Calculate wait_time[s] = start_time - arrival_at_step
    │
    ├─ [Sample Service Time] ← Based on step's distribution
    │    ↓
    │    └─ service_time[s] ~ Distribution(params)
    │
    ├─ [Finish Service]
    │    ↓
    │    ├─ Record finish_time[s] = start_time + service_time
    │    └─ Release resource
    │
    └─ [Move to Next Step]
         ↓
  Next Step s+1
  ↓
[Exit System]
  ↓
Calculate Total Metrics:
  - TIS = finish_time[last_step] - arrival_time
  - Total_Wait = Σ wait_time[s]
```

---

### 7.2 Resource Allocation Algorithm

**Pseudocode:**

```
function getEarliestAvailableResource(step, arrivalTime):
  resources = step.resourcePool
  earliestAvailable = infinity

  for each resource in resources:
    if resource.availableAt <= arrivalTime:
      return arrivalTime  # Resource free when entity arrives
    else:
      earliestAvailable = min(earliestAvailable, resource.availableAt)

  return earliestAvailable

function updateResourceAvailability(step, finishTime):
  # Find least-busy resource and assign
  resources = step.resourcePool
  leastBusyResource = resources.min(r => r.availableAt)
  leastBusyResource.availableAt = finishTime
```

**Data Structure:**

```javascript
class Resource {
  constructor(id, stepId) {
    this.id = id;
    this.stepId = stepId;
    this.availableAt = 0;  // Time when resource becomes free
    this.totalBusyTime = 0;
  }
}
```

---

### 7.3 Statistical Distributions

#### Normal Distribution (Box-Muller Transform)

```javascript
function sampleNormal(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  const sample = mean + z0 * stdDev;
  return Math.max(0.1, sample);  // Ensure positive service times
}
```

#### Exponential Distribution

```javascript
function sampleExponential(mean) {
  const u = Math.random();
  return -mean * Math.log(1 - u);
}
```

#### Discrete Distribution (Inverse Transform)

```javascript
function sampleDiscrete(probabilityTable) {
  // probabilityTable = [{value: 4, probability: 0.3}, {value: 8, probability: 0.5}, ...]

  const rand = Math.random();
  let cumulative = 0;

  for (const entry of probabilityTable) {
    cumulative += entry.probability;
    if (rand <= cumulative) {
      return entry.value;
    }
  }

  return probabilityTable[probabilityTable.length - 1].value;
}
```

---

### 7.4 Metrics Calculation

#### Utilization

```
Utilization[step] = (Total Service Time at Step) / (Simulation Duration × Number of Resources)

Example:
  - Step has 1 resource
  - 100 entities, each takes 7 min
  - Total service time = 700 min
  - Simulation duration = 800 min

  Utilization = 700 / (800 × 1) = 87.5%
```

#### Throughput

```
Throughput = (Number of Entities Completed) / (Simulation Duration) × 60

Units: entities per hour

Example:
  - 100 entities completed
  - Duration = 443 minutes

  Throughput = 100 / 443 × 60 = 13.6 entities/hour
```

#### Mean Time In System (TIS)

```
Mean TIS = Σ(TIS[i]) / N

where TIS[i] = finish_time[i] - arrival_time[i]
```

#### Little's Law (Validation Check)

```
L = λ × W

L = Average number of entities in system (WIP)
λ = Arrival rate (entities/hour)
W = Average time in system (hours)

Use this to validate simulation results!
```

---

## 8. SUCCESS METRICS

### 8.1 Educational Success Metrics

**During Week 4 Lesson (Immediate):**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| % Students complete 3+ simulations | >90% | Tool usage analytics (localStorage count) |
| % Students correctly identify bottleneck | >85% | Quick in-class poll or quiz |
| % Students propose Lean improvement | >80% | Gallery walk review |
| Average time to first successful run | <5 min | Timestamp tracking |
| Tool crash rate | <1% | Error logging |

**Post-Lesson (Assignment Quality):**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| % Students include DES results in assignment | >75% | Assignment review |
| Average grade on DES-related questions | >7.0/10 | Grading rubric |
| % Students quantify improvement impact | >70% | "X% reduction in wait time" statements |
| Student satisfaction with tool | >4.0/5 | Retrospective survey |

**Long-Term (Transfer):**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Students mention DES in stage reflections | >30% | Qualitative analysis of reports |
| Questions about DES in later courses | >5 | Instructor feedback |
| Alumni use DES concepts in jobs | >10% | Alumni survey (1-year post-grad) |

---

### 8.2 Technical Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Performance** |  |  |  |
| Simulation runtime (1000 entities) | <5 sec | TBD | 🟡 To test |
| Page load time | <3 sec | TBD | 🟡 To test |
| Chart render time | <500ms | TBD | 🟡 To test |
| **Compatibility** |  |  |  |
| Chrome 90+ support | 100% | TBD | 🟡 To test |
| Firefox 88+ support | 100% | TBD | 🟡 To test |
| Safari 14+ support | 100% | TBD | 🟡 To test |
| iPad (landscape) support | 100% | TBD | 🟡 To test |
| **Reliability** |  |  |  |
| Crash rate during session | <0.1% | TBD | 🟡 To monitor |
| Calculation accuracy vs. spreadsheet | >99% | TBD | 🟡 Validate |
| **Usability** |  |  |  |
| Time to run first simulation (novice) | <5 min | TBD | 🟢 User testing |
| Completion rate (start → export results) | >85% | TBD | 🟡 Analytics |

---

### 8.3 Acceptance Criteria Checklist

#### Must-Have for Launch

- [ ] 2 preset scenarios load correctly (Healthcare, Manufacturing)
- [ ] All parameter inputs validate properly
- [ ] Simulation runs without errors for 50, 100, 500, 1000 entities
- [ ] Metrics displayed match manual calculation (spot-check 10 entities)
- [ ] TIS histogram renders correctly
- [ ] Wait time histogram renders correctly
- [ ] Bottleneck detection works (identify max utilization step)
- [ ] Export PNG generates valid image file
- [ ] Export CSV contains correct data structure
- [ ] Works in Chrome, Firefox, Safari (latest versions)
- [ ] Responsive on tablet (iPad landscape, 1024×768)
- [ ] No console errors during normal use
- [ ] Help tooltips display on hover
- [ ] Reset button returns to initial state

#### Should-Have (Post-Launch)

- [ ] Scenario comparison table displays correctly
- [ ] Advanced settings (distributions) editable
- [ ] Animation toggle works (show/hide entity movement)
- [ ] Dark mode support
- [ ] English language toggle
- [ ] Save/load custom scenarios (localStorage)
- [ ] Statistical analysis (multiple runs, confidence intervals)

---

## 9. IMPLEMENTATION ROADMAP

### 9.1 Development Phases

#### Phase 1: MVP Core (Week 1-2, ~20 hours)

**Goal:** Basic functional simulation with preset scenarios

**Tasks:**
1. ✅ **Project setup** (2h)
   - File structure
   - HTML skeleton
   - Load Chart.js from CDN
   - Basic CSS framework

2. ✅ **Simulation engine** (8h)
   - `simulation.js` core logic
   - Entity class
   - Resource allocation algorithm
   - Service time distributions (Fixed, Normal, Discrete)
   - Metrics calculation
   - **Validation:** Match spreadsheet results exactly

3. ✅ **Preset scenarios** (2h)
   - `healthcare.json` configuration
   - `manufacturing.json` configuration
   - Scenario loader function

4. ✅ **Basic UI** (6h)
   - Configuration panel (read-only for presets)
   - Run button
   - Results display (metrics only, no charts yet)
   - Loading spinner

5. ✅ **Testing & validation** (2h)
   - Run both presets with 100 entities
   - Verify metrics match expected values
   - Cross-browser check (Chrome, Firefox)

**Deliverable:** Working simulation that runs preset scenarios and displays correct metrics.

---

#### Phase 2: Visualization & Interactivity (Week 3, ~12 hours)

**Goal:** Add charts and make parameters editable

**Tasks:**
1. ✅ **Chart integration** (4h)
   - TIS histogram with Chart.js
   - Wait time histogram
   - Binning algorithm
   - Responsive sizing

2. ✅ **Editable parameters** (6h)
   - Step configuration form
   - Add/remove steps
   - Edit service times
   - Edit resource counts
   - Input validation

3. ✅ **Bottleneck detection** (2h)
   - Identify max utilization
   - Visual highlighting
   - Suggestion text

**Deliverable:** Interactive tool where students can configure scenarios and see visual results.

---

#### Phase 3: Advanced Features (Week 4, ~10 hours)

**Goal:** Comparison, export, polish

**Tasks:**
1. ✅ **Scenario comparison** (4h)
   - Store first run results
   - Compare mode UI
   - % change calculations
   - Insights generation

2. ✅ **Export functionality** (3h)
   - PNG screenshot with html2canvas
   - CSV export with PapaParse
   - Download triggers

3. ✅ **Help & tooltips** (2h)
   - Tooltip component
   - Help text for all parameters
   - Quick start guide overlay

4. ✅ **Polish & testing** (1h)
   - Accessibility improvements
   - Error messages
   - Final cross-browser testing

**Deliverable:** Production-ready tool for classroom use.

---

#### Phase 4: Optional Enhancements (Future)

**If time permits or post-launch:**

- [ ] Animation (entities moving through process)
- [ ] Save/load custom scenarios
- [ ] Multiple simulation runs (statistical analysis)
- [ ] English language toggle
- [ ] Dark mode
- [ ] Exponential distribution for service times
- [ ] Priority queues
- [ ] Resource scheduling
- [ ] Tutorial walkthrough for first-time users

---

### 9.2 Testing Strategy

#### Unit Testing (Optional but Recommended)

```javascript
// Example: Test normal distribution sampling
test('sampleNormal produces values near mean', () => {
  const samples = [];
  for (let i = 0; i < 1000; i++) {
    samples.push(sampleNormal(10, 2));
  }
  const mean = samples.reduce((a,b) => a+b) / samples.length;
  expect(mean).toBeCloseTo(10, 0.5); // Within 0.5 of expected mean
});
```

#### Integration Testing

**Test Scenarios:**

1. **Healthcare Baseline Test**
   - Load healthcare preset
   - Run 50 entities
   - Expected metrics (from spreadsheet):
     - Mean TIS ≈ 20.6 min (±2 min due to randomness)
     - Bottleneck = Doctor
     - Utilization ≈ 85-90%

2. **Manufacturing Baseline Test**
   - Load manufacturing preset
   - Run 100 entities
   - Verify no crashes
   - Bottleneck identified correctly

3. **Parameter Change Test**
   - Load healthcare
   - Change doctor resources: 1 → 2
   - Run simulation
   - Verify:
     - Throughput increases
     - Mean TIS decreases
     - Bottleneck may shift to Nurse

4. **Edge Case Tests**
   - 0 buffer capacity (no queue)
   - Very high service time variability
   - 1000 entities (stress test)
   - Identical service times (deterministic)

#### User Acceptance Testing (UAT)

**Participants:** 3-5 students (not from target class)

**Tasks:**
1. Load healthcare scenario and run simulation (no instruction)
2. Identify the bottleneck
3. Modify parameters to improve throughput by 20%
4. Export results

**Success Criteria:**
- All participants complete tasks within 10 minutes
- No requests for external help
- No confusion about what metrics mean
- Positive feedback on usability

---

### 9.3 Deployment Plan

#### Hosting Options

**Option 1: GitHub Pages** (Recommended)
- ✅ Free
- ✅ Simple deployment (push to gh-pages branch)
- ✅ HTTPS by default
- ✅ Fast CDN
- ❌ Static only (fine for our use case)

**Deployment steps:**
```bash
# Build
cd /workspaces/ontwikkeling-theoom/demos/discrete-event-sim/

# Deploy to GitHub Pages
git checkout -b gh-pages
git add .
git commit -m "Deploy DES tool"
git push origin gh-pages
```

**URL:** `https://hanbedrijfskunde.github.io/ontwikkeling-theoom/demos/discrete-event-sim/`

**Option 2: Netlify/Vercel** (Alternative)
- Similar benefits to GitHub Pages
- Better for custom domains

---

#### Pre-Launch Checklist

**1 Week Before Class:**
- [ ] Final testing in all target browsers
- [ ] Performance test: 30 students × 10 simulations = 300 concurrent runs
- [ ] Backup plan ready (offline version + screenshots)
- [ ] URL shared with instructor (Tom) for testing

**1 Day Before Class:**
- [ ] Verify URL is accessible on school WiFi
- [ ] Test on classroom projector/beamer
- [ ] Have offline ZIP backup on USB drive
- [ ] Screenshot key results as fallback slides

**During Class:**
- [ ] Monitor for errors (error logging to console)
- [ ] Note any student confusion points
- [ ] Gather informal feedback

**After Class:**
- [ ] Review error logs (if any)
- [ ] Collect student feedback via retrospective
- [ ] Prioritize fixes/improvements

---

### 9.4 Maintenance & Updates

**Immediate Post-Launch (Week 5):**
- Fix any critical bugs discovered during class
- Address usability issues raised by students
- Add most-requested feature (if quick win)

**Mid-Term (Month 2-3):**
- Add scenario comparison feature (if not in MVP)
- Implement save/load functionality
- Performance optimizations based on real usage

**Long-Term (Semester 2+):**
- Add animation
- Multi-language support
- Integration with other THEOOM tools
- Consider mobile support (phone-sized screens)

---

## 10. INTEGRATION WITH WEEK 4 LESSON

### 10.1 Lesson Context (from LRD)

**Week 4: Process Analysis & Improvement - Lean 4.0**

**Timing:**
- **Demo Phase:** Minutes 50-80 (30 min total for 3 demos)
- **DES Demo:** ~10 minutes presentation + student experimentation

**Learning Objectives Supported:**
1. Understand how bottlenecks emerge in multi-step processes
2. Apply Lean principles (line balancing, waste reduction)
3. Connect to Table VII: "Digital Twin + Gemba Walk" / "Simulation + Kaizen"
4. Experience data-driven decision making

---

### 10.2 DES Tool Usage in Lesson

#### 10.2.1 Instructor Demo (5 min)

**Script:**

> "We've seen conventional Lean tools like VSM. Now let's see how **Digital Twins** and **Simulation** enhance this. I'm opening our DES tool..."

1. **Load Healthcare Preset**
   - "This is a clinic with a nurse and doctor. 100 patients arriving."
   - Point out key parameters: service times, resources, buffers

2. **Run Baseline Simulation**
   - Click "Run Simulation"
   - While running: "Simulating 100 patients in seconds, what would take hours manually!"

3. **Analyze Results**
   - "Mean time in system: 20.6 minutes"
   - "Bottleneck: Doctor at 87% utilization ← This is our constraint"
   - Show histogram: "See the variability? Not all patients have same experience."

4. **Test Improvement**
   - "What if we add a second doctor? Let's test instantly..."
   - Edit: Doctor resources 1 → 2
   - Run again
   - Compare: "Throughput up 34%! This is **what-if analysis**."

5. **Connect to Lean 4.0**
   - "In Table VII: This is **Digital Twin** + **Simulation**"
   - "Without building physical changes, we can test improvements!"
   - "Traditional Lean: trial-and-error. Lean 4.0: simulate first, implement second."

---

#### 10.2.2 Student Hands-On Activity (15-20 min)

**Assignment:**

> "In groups of 3: Use the DES tool to optimize the **Manufacturing** scenario. Your goal: Increase throughput by minimum 20%. Document your changes and results."

**Student Workflow:**

1. **Load Scenario** (1 min)
   - Select "Manufacturing Production Line"
   - Run baseline to understand current state

2. **Identify Bottleneck** (2 min)
   - Note which step has highest utilization
   - Check wait times at each step

3. **Propose Lean Improvement** (5 min)
   - Brainstorm as group:
     - Add resources at bottleneck? (Kaizen)
     - Reduce service time? (SMED, standardization)
     - Rebalance line? (Load leveling)
     - Reduce buffer waste? (JIT)

4. **Test in Simulation** (5 min)
   - Make changes in tool
   - Run multiple configurations
   - Compare results

5. **Document Best Solution** (5 min)
   - Export results (screenshot + CSV)
   - Record:
     - What changed?
     - Impact: % improvement in throughput/TIS
     - Which Lean principle applied?

**Output:** Each group has evidence-based improvement plan

---

#### 10.2.3 Gallery Walk Integration (10 min)

Students present their DES results on posters:

**Poster Template:**

```
┌────────────────────────────────────────┐
│  MANUFACTURING LINE OPTIMIZATION       │
├────────────────────────────────────────┤
│                                         │
│  BASELINE (Before):                     │
│  • Throughput: 12.3 /hr                │
│  • Mean TIS: 45.2 min                  │
│  • Bottleneck: Machining (92% util)    │
│                                         │
│  IMPROVEMENT APPLIED:                   │
│  ✓ Added 2nd machining resource        │
│  ✓ Reduced buffer waste (10 → 3)       │
│                                         │
│  RESULTS (After):                       │
│  • Throughput: 16.8 /hr (+37%) ✅      │
│  • Mean TIS: 32.1 min (-29%) ✅        │
│  • Bottleneck: Assembly (now 78%)      │
│                                         │
│  LEAN 4.0 CONNECTION:                   │
│  Table VII #12: Simulation Tools       │
│  + Bottleneck Analysis                 │
│                                         │
│  [DES Screenshot attached]             │
└────────────────────────────────────────┘
```

---

### 10.3 Assignment Integration

**Week 4 Individual Assignment** (from LRD Section 5.2)

**Part 3: Industry 4.0 Enhancement**

> "Use the DES tool to analyze a process (your choice or provided case). Run minimum 2 scenarios (baseline + improved). Include in your report:
>
> 1. **Baseline Analysis:**
>    - Screenshot of initial configuration
>    - Key metrics: throughput, TIS, bottleneck
>    - Identified waste types (link to TIM WOOD)
>
> 2. **Improvement Scenario:**
>    - What changes did you make? (parameters + rationale)
>    - Which Lean principle(s) applied?
>    - Quantified impact (% improvement)
>
> 3. **Reflection:**
>    - When is simulation useful vs. overkill?
>    - Trade-offs: cost of digital twin vs. benefits
>    - Would you recommend this for small/large companies?"

**Grading Rubric (30% of assignment):**

| Criterion | Weak (0-5) | Adequate (6-7) | Strong (8-10) |
|-----------|-----------|----------------|---------------|
| **Baseline Analysis** | Missing metrics or bottleneck unclear | Correct metrics, bottleneck identified | Deep analysis, linked to waste types |
| **Improvement Strategy** | Random changes, no rationale | Logical changes, basic explanation | Strategic approach, Lean principles explicit |
| **Quantification** | No comparison or % wrong | Correct before/after comparison | Clear impact + business case |
| **Reflection** | Superficial | Considers trade-offs | Critical analysis, context-aware |

---

### 10.4 Backup Plan (If Tool Fails)

**Scenario:** WiFi down, browser crashes, site unreachable

**Fallback 1: Offline Version**
- Pre-downloaded ZIP file on USB
- Open `index.html` locally in browser
- Distribute to students via shared folder

**Fallback 2: Spreadsheet**
- Use original Google Sheets version
- Students manually recalculate (slower but educational)
- Focus on understanding logic vs. speed

**Fallback 3: Instructor-Led Demo**
- Pre-recorded video of tool usage
- Screenshots of before/after scenarios
- Discussion-based activity (no hands-on)

---

### 10.5 Success Indicators During Lesson

**Green Flags (Going Well):**
- ✅ Students load scenarios within 1 minute
- ✅ Multiple groups test 3+ configurations
- ✅ Students ask "What if we..." questions (curiosity)
- ✅ Groups debate which improvement is better (engagement)
- ✅ No technical support requests (tool intuitive)

**Red Flags (Needs Intervention):**
- ⚠️ Students stare at screen confused (unclear UI)
- ⚠️ Groups only run baseline, no experimentation (lack of motivation)
- ⚠️ Multiple crashes/errors (technical issues)
- ⚠️ Students ask "What does TIS mean?" (missing definitions)
- ⚠️ Groups finish in 5 min and look bored (too simple)

**Instructor Adjustments:**

| Red Flag | Fix |
|----------|-----|
| Confusion on UI | Quick 2-min re-demo of workflow |
| Lack of experimentation | Give explicit challenge: "Reach 18/hr throughput" |
| Technical issues | Switch to backup plan immediately |
| Missing definitions | Pause and explain metrics on board |
| Too simple | Add constraint: "Improve without adding resources" |

---

## 11. APPENDICES

### A. Glossary

| Term | Definition |
|------|------------|
| **Discrete Event Simulation (DES)** | Modeling technique where system state changes at discrete points in time (events), used to analyze process behavior |
| **Entity** | Individual unit flowing through the system (patient, product, order) |
| **Resource** | Server or processor that performs work on entities (nurse, machine, worker) |
| **Queue** | Waiting line of entities before a resource |
| **Buffer** | Storage capacity in queue (limited or unlimited) |
| **Service Time** | Duration required for resource to process one entity |
| **Inter-Arrival Time** | Time between consecutive entity arrivals |
| **Time In System (TIS)** | Total time from entity arrival to exit (processing + waiting) |
| **Utilization** | % of time a resource is busy (not idle) |
| **Bottleneck** | Resource with highest utilization, limiting system throughput |
| **Throughput** | Rate of entities completing the system (units/hour) |
| **Lead Time** | Synonym for Time In System |
| **Little's Law** | L = λW (avg entities in system = arrival rate × avg time in system) |
| **FIFO** | First-In-First-Out queue discipline |

---

### B. References & Inspiration

**Academic:**
- Lean 4.0 article (background-material/lean-40.pdf)
- Quality 4.0 papers (background-material/quality-40.pdf)
- Digital Process Engineering curriculum

**Commercial Tools:**
- Simul8 (www.simul8.com) - Professional DES software
- Arena (www.arenasimulation.com) - Rockwell Automation tool
- AnyLogic (www.anylogic.com) - Multi-method simulation

**Educational Resources:**
- Tutorial: "Discrete Event Simulation in Spreadsheets" (basis for this tool)
- MIT OpenCourseWare: Introduction to Operations Management
- Khan Academy: Probability & Statistics

**JavaScript Libraries:**
- Chart.js documentation (www.chartjs.org)
- html2canvas (html2canvas.hertzen.com)
- Web Crypto API (MDN)

---

### C. Future Feature Backlog

**Priority 2 (Post-MVP):**
- [ ] Animated visualization (entities moving through process)
- [ ] Save/load custom scenarios to localStorage
- [ ] Statistical analysis (run simulation 10× automatically)
- [ ] Confidence intervals for metrics
- [ ] Gantt chart timeline view
- [ ] English language toggle

**Priority 3 (Nice-to-Have):**
- [ ] Dark mode
- [ ] Keyboard shortcuts (Run = Enter, Reset = Ctrl+R)
- [ ] Tutorial walkthrough for first-time users
- [ ] Preset "challenges" (e.g., "Achieve 20/hr throughput")
- [ ] Leaderboard (who achieves best optimization?)
- [ ] Export to PDF report (formatted)

**Priority 4 (Advanced):**
- [ ] Priority queues (entities have urgency)
- [ ] Resource scheduling (shifts, breaks)
- [ ] Batch processing
- [ ] Multi-product variants
- [ ] Cost modeling (holding cost, setup cost)
- [ ] Real data import (CSV upload)
- [ ] Collaborative mode (multiple users editing same scenario)

---

### D. Contact & Support

**Development Lead:** Witek
**Course:** THEOOM Week 4 - Operations Management
**Institution:** HAN Bedrijfskunde
**GitHub:** https://github.com/hanbedrijfskunde/ontwikkeling-theoom
**Issues:** https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/2

**For Questions:**
- Technical issues → GitHub Issues
- Educational content → Witek (instructor)
- Feature requests → GitHub Issues with label "enhancement"

---

## DOCUMENT CHANGELOG

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-10 | Witek | Initial PRD based on spreadsheet analysis and LRD requirements |

---

**END OF PRD**

*This is a living document. Update after MVP launch based on real classroom usage and student feedback.*
