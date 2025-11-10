# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Process Mining Simulator - THEOOM Week 4 Educational Tool

**Product Name:** Process Mining Simulator (Multi-Scenario)
**Version:** 2.0 (adapted from Excellentie door Design v1.0)
**Document Owner:** Witek
**Created:** 2025-11-10
**Status:** Ready for Implementation
**Related:** [LRD Week 4 - Lean 4.0](lrd.md) | [GitHub Issue #1](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/1)
**Base Implementation:** [programma-deel2-process-mining.html](../background-material/process-mining/programma-deel2-process-mining.html)

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [User Stories](#3-user-stories)
4. [Functional Requirements](#4-functional-requirements)
5. [Scenario Specifications](#5-scenario-specifications)
6. [Technical Architecture](#6-technical-architecture)
7. [User Interface Design](#7-user-interface-design)
8. [Integration with Week 4 Lesson](#8-integration-with-week-4-lesson)
9. [Implementation Roadmap](#9-implementation-roadmap)
10. [Testing & Validation](#10-testing--validation)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Problem Statement

Students learning Lean 4.0 need to **experience** how process mining works—not just read about it. They need to:
- See how digital traces (ERP logs) reveal actual process flows
- Discover hidden inefficiencies (bottlenecks, waste, deviations)
- Understand the connection between traditional Lean (Value Stream Mapping) and Industry 4.0 (AI-powered process analytics)

Current challenges:
- Commercial process mining tools (Celonis, Disco) are expensive and complex
- Static examples don't show the "discovery" aspect
- No educational tools tailored to Lean 4.0 curriculum

### 1.2 Proposed Solution

**Adapt existing Process Mining Simulator** (from "Excellentie door Design" course) to THEOOM Week 4 with:
- **3 generic business scenarios** (instead of single Procurement focus)
- **TIM WOOD waste identification** (link to Lean principles)
- **Table VII integration** (Process Mapping Software + VSM)
- **THEOOM branding and context** (Week 4 lesson alignment)

### 1.3 Success Criteria

**Educational (Week 4 Lesson):**
- 90%+ students successfully run process mining analysis
- Students identify minimum 2 waste types (TIM WOOD) per scenario
- Students articulate connection to Table VII (Lean × Industry 4.0)

**Technical:**
- All 3 scenarios work without errors
- Scenario switching takes <2 seconds
- Works on student laptops (Chrome, Firefox, Safari)
- Zero crashes during 30-student classroom session

**Engagement:**
- Students express "aha!" moment about process discovery
- Questions about "Can I use this for my internship company?"
- Post-lesson: >4.0/5 rating on tool usefulness

---

## 2. PRODUCT OVERVIEW

### 2.1 Product Vision

> "The most intuitive educational process mining tool that makes the invisible visible—showing students exactly how processes really work through digital footprints."

### 2.2 Base Implementation Analysis

**Existing tool strengths** (from `programma-deel2-process-mining.html`):

| Component | Implementation | Status | Reuse? |
|-----------|---------------|--------|--------|
| **UI Framework** | TailwindCSS, responsive design | ✅ Excellent | ✅ Yes |
| **Data Generation** | Synthetic log creation (500 entries) | ✅ Solid | ✅ Yes |
| **Process Discovery** | Path frequency, activity counts | ✅ Works well | ✅ Yes |
| **Visualizations** | Mermaid flowchart, Chart.js bars | ✅ Professional | ✅ Yes |
| **Error Handling** | CDN fallbacks, graceful degradation | ✅ Robust | ✅ Yes |
| **UX Flow** | 3-phase progression | ✅ Pedagogically sound | ✅ Yes |

**Current limitations:**
- ❌ Single scenario only (Procurement)
- ❌ No explicit TIM WOOD mapping
- ❌ Branding for different course ("Excellentie door Design")
- ❌ No connection to Lean 4.0 / Table VII

### 2.3 Key Enhancements

**Version 2.0 adds:**

1. **Multi-Scenario Support**
   - Dropdown selector
   - 3 business process presets
   - Dynamic scenario loading

2. **Lean 4.0 Integration**
   - TIM WOOD waste identification per scenario
   - Explicit link to Table VII (#6: Process Mapping + VSM)
   - Comparison: Manual VSM vs. AI-powered process mining

3. **THEOOM Contextualization**
   - Week 4 branding
   - Instructor demo script
   - Student assignment integration

---

## 3. USER STORIES

### 3.1 Primary Persona: "Student Sophie"

**Background:**
- 20-year-old Operations Management student
- Week 4 of THEOOM course
- Has learned Ishikawa and VSM in previous sessions
- Internship at logistics company, interested in digitalization

**Goals:**
- Understand how process mining works (not just theory)
- See practical application of Table VII concepts
- Get ideas for internship project
- Complete Week 4 assignment with concrete evidence

**Pain Points:**
- Finds traditional VSM manual and time-consuming
- Wonders "How do companies actually do this at scale?"
- Needs evidence-based insights for assignment (not guesses)

---

### 3.2 User Stories - Must-Have (MVP)

**US-01: Select Business Scenario**
> "As a student, I want to choose from different business scenarios (Procurement, Customer Service, Order-to-Cash) so that I can explore a domain relevant to my interests."

**Acceptance Criteria:**
- Dropdown with 3 scenario options
- Selecting a scenario updates:
  - Ideal process diagram (Mermaid)
  - Activity names in data generation
  - Context description
- Load time <2 seconds

---

**US-02: Generate Synthetic Process Data**
> "As a student, I want to generate realistic ERP log data for my chosen scenario so that I can simulate process mining on authentic-looking data."

**Acceptance Criteria:**
- Button: "Genereer Log Data"
- Generates 500 log entries
- Shows preview (first 10 entries)
- Data includes: Case ID, Activity, Timestamp, Resource, Metadata
- Generation completes in <3 seconds

---

**US-03: Discover Actual Process Flow**
> "As a student, I want to run process mining analysis so that I can see how the process actually flows (vs. the ideal diagram)."

**Acceptance Criteria:**
- Button: "Start Process Mining" (enabled after data generation)
- Displays discovered process variants:
  - Most common paths (top 10)
  - Frequency per path
  - Color-coding: Green (happy), Yellow (deviation), Red (critical)
- Activity frequency statistics
- Lead time analysis with chart

---

**US-04: Identify TIM WOOD Waste**
> "As a student, I want to see which types of waste (TIM WOOD) are visible in the process data so that I can connect process mining to Lean principles."

**Acceptance Criteria:**
- For each scenario, results section shows:
  - Identified waste types (e.g., "⏳ Waiting: 15% of cases exceed norm")
  - Specific examples from data
  - Link to TIM WOOD definition
- Minimum 2 waste types identified per scenario

---

**US-05: Connect to Table VII**
> "As a student, I want to understand how this tool relates to Lean 4.0 concepts so that I see the link between traditional and digital methods."

**Acceptance Criteria:**
- Info box displayed after mining results:
  - "This is an example of **Process Mapping Software + Value Stream Mapping** (Table VII #6)"
  - Comparison: Manual VSM (hours) vs. Process Mining (seconds)
  - "Industry 4.0 enables continuous process discovery from live data"
- Link to LRD Table VII section

---

**US-06: Export Results**
> "As a student, I want to export analysis results so that I can include them in my Week 4 assignment."

**Acceptance Criteria:**
- Export button generates PNG screenshot of results
- Includes: discovered paths, waste analysis, chart
- Filename: `ProcessMining_{Scenario}_{Timestamp}.png`

---

### 3.3 Secondary Persona: "Teacher Tom"

**User Stories:**

**US-07: Demo-Ready Scenarios**
> "As a teacher, I want pre-configured scenarios that work reliably so that I can demonstrate process mining live without technical issues."

**Acceptance Criteria:**
- All 3 scenarios generate valid data every time
- Consistent discovery results (same data → same analysis)
- No crashes or errors during demo

---

**US-08: Clear Pedagogical Flow**
> "As a teacher, I want the tool to guide students through the discovery process step-by-step so that they understand the methodology, not just see results."

**Acceptance Criteria:**
- 3 distinct phases clearly labeled:
  1. "Ideal Process" (theory)
  2. "Digital Traces" (data generation)
  3. "Process Discovery" (mining results)
- Progressive disclosure (can't skip ahead)
- Help text at each phase

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Core Features

#### FR-01: Scenario Selection

**FR-01.1: Scenario Dropdown**
- Location: Top of page, above "Fase 1: Het Ideale Proces"
- Label: "Kies een bedrijfsproces:"
- Options:
  1. Procurement (Inkoop - Zuivelhandel)
  2. Customer Service (Klantenservice - IT Support)
  3. Order-to-Cash (Order-tot-Betaling - E-commerce)
- Default: Procurement (existing scenario)

**FR-01.2: Dynamic Content Loading**

When scenario changes:

| Element | Action |
|---------|--------|
| **Page title** | Update to scenario name |
| **Mermaid diagram** | Load scenario-specific flowchart |
| **Context description** | Update explanatory text |
| **Activity constants** | Reload ACTIVITIES object |
| **Master data** | Reload MASTER_DATA (products, resources, etc.) |
| **Results section** | Clear previous results |

**FR-01.3: State Management**
- If user switches scenario after generating data: warn + confirm
- "Weet je zeker? Huidige data wordt gewist."
- Reset all phases (data + results)

---

#### FR-02: Data Generation

**FR-02.1: Synthetic Log Creation**

Per scenario, generate 500 log entries with:

```javascript
{
  case_id: "CASE-0001",
  activity: "Order Ontvangen",
  timestamp: "2023-05-12T10:23:45Z",
  resource: "Systeem/Medewerker",
  metadata: {
    // Scenario-specific fields
    // e.g., product, customer, priority, etc.
  }
}
```

**FR-02.2: Probability-Based Path Generation**

Each scenario defines:
- **Happy path** (60-80% of cases)
- **Deviation path** (15-30% - problems handled correctly)
- **Critical path** (5-10% - severe issues, waste)

Example (Customer Service):
```javascript
const PATHS = {
  HAPPY: 0.70,      // Ticket → L1 → Resolved → Closed
  ESCALATED: 0.20,  // Ticket → L1 → L2 → Resolved → Closed
  REOPENED: 0.10    // Ticket → L1 → Closed → Reopened → L2 → Resolved → Closed
};
```

**FR-02.3: Realistic Timing**

- Inter-event times: Based on scenario (hours, days, weeks)
- Variability: +/- 20-50% randomness
- Business hours: Events during work hours (9-17h), some exceptions

**FR-02.4: Data Preview**

After generation, display:
- Total entries: 500
- Unique cases: ~80-120 (depending on path length)
- Time span: Full year 2023
- First 10 entries (formatted)
- Master data summary (products/customers/resources used)

---

#### FR-03: Process Mining Analysis

**FR-03.1: Process Discovery**

**Input:** Array of log entries
**Output:**
```javascript
{
  pathFrequencies: {
    "Activity A → Activity B → Activity C": 45,
    "Activity A → Activity B → Activity D → Activity C": 12,
    ...
  },
  activityCounts: {
    "Activity A": 100,
    "Activity B": 100,
    "Activity C": 88,
    "Activity D": 12,
    ...
  },
  leadTimes: [12.3, 15.7, 8.9, ...], // days
  casesAnalyzed: 95
}
```

**Algorithm:**
1. Group logs by `case_id`
2. Sort events per case by `timestamp`
3. Extract activity sequence → path string
4. Count path occurrences
5. Calculate lead time (start activity → end activity)
6. Aggregate statistics

**FR-03.2: Lead Time Calculation**

**Definition:** Time between two key milestones

Per scenario:
- **Procurement:** "PO Gemaakt" → "Factuur Betaald"
- **Customer Service:** "Ticket Created" → "Ticket Closed"
- **Order-to-Cash:** "Order Ontvangen" → "Betaling Ontvangen"

**Metrics:**
- Mean lead time
- Min/Max
- Cases within norm (e.g., <20 days)
- Cases exceeding norm

**FR-03.3: Bottleneck Detection**

**Definition:** Activity with disproportionately high waiting time

**Calculation:**
- For each activity, calculate:
  - Average time in queue (arrival at activity - finish of previous activity)
  - Frequency of occurrence
- Bottleneck = activity with highest avg wait time × frequency

**Output:** "⚠️ Bottleneck: [Activity Name] - gemiddeld X dagen wachttijd"

---

#### FR-04: Waste Identification (TIM WOOD)

**FR-04.1: Waste Type Mapping**

Per scenario, analyze and display:

| Waste Type | Detection Method | Display Example |
|------------|------------------|-----------------|
| **T - Transportation** | Unnecessary hand-offs (>X steps in path) | "15% of cases have >6 hand-offs" |
| **I - Inventory** | High WIP (cases in progress) | "Gemiddeld 35 cases tegelijk in systeem" |
| **M - Motion** | Reassignments (resource changes mid-case) | "22% of cases switched resources 3+ times" |
| **W - Waiting** | High lead times, queue times | "35% exceeds lead time norm (>20 days)" |
| **O - Overproduction** | Premature actions (steps before needed) | N/A for service processes |
| **O - Overprocessing** | Unnecessary rework loops | "12% of cases have rework cycles" |
| **D - Defects** | Error paths, rejections | "8% of cases fail quality check" |

**FR-04.2: Waste Analysis Section**

After mining results, display:

```
┌────────────────────────────────────────────────┐
│ 🗑️ LEAN WASTE ANALYSIS (TIM WOOD)             │
├────────────────────────────────────────────────┤
│                                                 │
│ ⏳ WAITING (W):                                │
│    • 35% of cases exceed lead time norm        │
│    • Average waiting time: 6.3 days            │
│    • Bottleneck: [Activity X]                  │
│                                                 │
│ 🔄 OVERPROCESSING (O):                         │
│    • 12% of cases have rework loops            │
│    • Identified paths: [Path details]          │
│                                                 │
│ ❌ DEFECTS (D):                                │
│    • 8% of cases encounter errors/rejections   │
│    • Most common: [Error type]                 │
│                                                 │
│ 💡 Lean Opportunity:                           │
│    Focus on reducing waiting time at           │
│    bottleneck activity for 35% improvement     │
└────────────────────────────────────────────────┘
```

---

#### FR-05: Visualization

**FR-05.1: Ideal Process Diagram (Mermaid.js)**

Per scenario, show flowchart with:
- Start/end nodes (rounded rectangles)
- Process steps (rectangles)
- Decision points (diamonds)
- Flow arrows
- Color-coding:
  - Blue: Start
  - Light blue: Normal steps
  - Orange: Decision/quality check
  - Yellow: Problem handling
  - Green: End

**FR-05.2: Discovered Process Paths**

Display top 10 paths as:
```
#1  [Step A] → [Step B] → [Step C]  (45x)  ✅ Happy path
#2  [Step A] → [Step D] → [Step B] → [Step C]  (12x)  ⚠️ Deviation
#3  [Step A] → [Step B] → [Error] → [Step B] → [Step C]  (8x)  ❌ Critical
```

Color-coded borders:
- Green: Happy path (no issues)
- Yellow: Deviation (handled correctly)
- Red: Critical (waste/errors)

**FR-05.3: Activity Frequency Grid**

Card-style display:

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Activity A  │ │ Activity B  │ │ Activity C  │
│ 100 keer    │ │ 88 keer     │ │ 95 keer     │
└─────────────┘ └─────────────┘ └─────────────┘
```

**FR-05.4: Lead Time Chart (Chart.js)**

Horizontal bar chart:
- X-axis: Number of cases
- Y-axis: Within norm / Exceeded norm
- Colors: Green (within) / Red (exceeded)
- Title: "Doorlooptijd Performance vs. Norm (X dagen)"

---

#### FR-06: Export Functionality

**FR-06.1: Screenshot Export**

- Button: "📸 Exporteer Resultaten (PNG)"
- Uses: `html2canvas` library
- Captures: Full results section (paths + waste + chart)
- Filename: `ProcessMining_{Scenario}_{Date}.png`
- Download automatically

**FR-06.2: Data Export (Optional)**

- Button: "📊 Download Ruwe Data (CSV)"
- CSV columns: Case ID, Activity, Timestamp, Resource, Lead Time
- Useful for advanced students who want to analyze in Excel

---

### 4.2 User Interface Requirements

#### UI-01: Three-Phase Progressive Disclosure

**Phase 1: Ideal Process (Always visible)**
- Section title: "Fase 1: Het Ideale [Scenario] Proces"
- Mermaid diagram
- Explanation text
- Scenario selector here

**Phase 2: Digital Traces (Unlocked immediately)**
- Section title: "Fase 2: De Digitale Sporen (ERP Logfiles)"
- Button: "Genereer Log Data"
- Data preview (collapsed until generated)

**Phase 3: Process Mining (Unlocked after data generation)**
- Section title: "Fase 3: Process Mining in Actie"
- Button: "Start Process Mining" (disabled until data exists)
- Results (collapsed until mining complete)

#### UI-02: Status Feedback

**Loading States:**
- Spinner during data generation (2-3 sec)
- Spinner during mining analysis (0.5-1 sec)
- Progress indicators

**Success States:**
- ✅ "Log data succesvol gegenereerd!"
- ✅ "Process mining analyse voltooid!"

**Error States:**
- ⚠️ "Fout bij het genereren van data" (with retry option)
- 🔧 "Mermaid.js niet beschikbaar - statische diagram geladen"

---

## 5. SCENARIO SPECIFICATIONS

### 5.1 Scenario 1: Procurement (Inkoop - Zuivelhandel)

**Context:**
> "Een Europees zuivelhandelsbedrijf koopt dagelijks melkpoeder, lactose en boterolie in van leveranciers in Nederland, Duitsland, Frankrijk, Polen en Ierland."

**Domain:** Supply Chain Management
**Ideal Cycle Time:** 20 dagen (norm)

---

**Process Activities:**

```javascript
const PROCUREMENT_ACTIVITIES = {
  BASE: [
    "Aanvraag PR Gemaakt",
    "PO Gemaakt & Goedgekeurd",
    "PO Verzonden",
    "Goederen Ontvangen",
    "Factuur Ontvangen",
    "Factuur Betaald",
    "Procurement Afgerond"
  ],
  SPECIAL: {
    QUALITY_CHECK: "Kwaliteitscontrole",
    PROBLEM_REPORTED: "Probleem Gemeld",
    BLOCK_INVOICE: "Instructie: Factuur Blokkeren",
    SOLVE_PROBLEM: "Procurement Lost Probleem Op",
    RELEASE_INVOICE: "Signaal: Factuur Vrijgeven",
    INCORRECT_PAYMENT: "!! Onterechte Betaling na Kwaliteitsprobleem !!",
    PAYMENT_REMINDER: "Betalingsherinnering Ontvangen"
  }
};
```

**Process Paths:**

| Path Type | Probability | Activities | TIM WOOD Waste |
|-----------|-------------|------------|----------------|
| **Happy Path** | 60% | PR → PO → Verzonden → Goederen → QC (OK) → Factuur → Betaald → Afgerond | None |
| **Quality Issue (Fixed)** | 30% | ... → QC (NOK) → Probleem → Blokkeer → Opgelost → Vrijgeven → Factuur → Betaald → Afgerond | **W** (wachten op probleem oplossing) |
| **Payment Delay** | 5% | ... → Factuur → Herinnering → Betaald → Afgerond | **W** (late payment) |
| **Critical: Wrong Payment** | 5% | ... → QC (NOK) → Probleem → **Onterechte Betaling** → ... | **D** (defect - proces fout) |

**Master Data:**
```javascript
const PROCUREMENT_MASTER = {
  PRODUCTS: ["Volle Melkpoeder", "Magere Melkpoeder", "Weipoeder", "Lactose", "Boterolie"],
  SUPPLIERS: ["NL Zuivel BV", "DE MilchKontor", "FR Laiterie SA", "PL Mleko Sp", "IE Dairy Ltd."],
  RESOURCES: ["P. Jansen", "S. de Vries", "AutoSysteem", "M. Kowalski", "L. Dupont"]
};
```

**Identified Waste (TIM WOOD):**
- **W - Waiting:** 35% cases exceed 20-day norm (avg 6.3 days wait at problem solving)
- **O - Overprocessing:** 5% incorrect payment despite block instruction (rework)
- **D - Defects:** 30% quality issues (though handled correctly in most cases)

**Bottleneck:** "Procurement Lost Probleem Op" (6-10 dagen gemiddeld)

**Table VII Link:** #6 - Process Mapping Software + Value Stream Mapping

---

### 5.2 Scenario 2: Customer Service (Klantenservice - IT Support)

**Context:**
> "Een IT service desk behandelt dagelijks support tickets van medewerkers. Tickets variëren van wachtwoord resets tot complexe systeem problemen."

**Domain:** Customer Service / IT Operations
**Ideal Cycle Time:** 5 dagen (norm voor resolution)

---

**Process Activities:**

```javascript
const CUSTOMER_SERVICE_ACTIVITIES = {
  BASE: [
    "Ticket Aangemaakt",
    "Ticket Geopend",
    "Triage Uitgevoerd",
    "L1 Support Start",
    "L1 Support Afgerond",
    "Ticket Opgelost",
    "Ticket Gesloten"
  ],
  SPECIAL: {
    ESCALATE_L2: "Escalatie naar L2",
    L2_INVESTIGATION: "L2 Onderzoek",
    L2_RESOLUTION: "L2 Oplossing",
    REOPEN: "Ticket Heropend",
    PREMATURE_CLOSE: "Voortijdig Gesloten (zonder oplossing)",
    SLA_BREACH: "⚠️ SLA Overschrijding",
    CUSTOMER_FOLLOWUP: "Klant Follow-up Vraag"
  }
};
```

**Process Paths:**

| Path Type | Probability | Activities | TIM WOOD Waste |
|-----------|-------------|------------|----------------|
| **Quick Fix (L1)** | 50% | Aangemaakt → Geopend → Triage → L1 Start → L1 Afgerond → Opgelost → Gesloten | None (efficient) |
| **L2 Escalation** | 30% | ... → Triage → L1 Start → Escalate L2 → L2 Onderzoek → L2 Oplossing → Opgelost → Gesloten | **W** (waiting for L2), **M** (hand-off motion) |
| **Reopened Ticket** | 15% | ... → L1 Afgerond → Gesloten → Heropend → L2 ... → Opgelost → Gesloten | **O** (overprocessing - premature close), **W** (waiting) |
| **SLA Breach** | 5% | ... → (delay) → SLA Overschrijding → ... (any path) | **W** (waiting - critical) |

**Master Data:**
```javascript
const CUSTOMER_SERVICE_MASTER = {
  TICKET_TYPES: ["Wachtwoord Reset", "Software Installatie", "Netwerk Probleem", "Hardware Defect", "Toegang Rechten"],
  DEPARTMENTS: ["Finance", "HR", "Sales", "Operations", "IT"],
  RESOURCES: ["Bot (AutoResolve)", "J. Smith (L1)", "K. Johnson (L1)", "M. Lee (L2)", "S. Patel (L2)"],
  PRIORITIES: ["Low", "Medium", "High", "Critical"]
};
```

**Identified Waste:**
- **W - Waiting:**
  - 30% escalated to L2 (avg +3 days)
  - 5% SLA breach (>5 days)
- **M - Motion:** 30% hand-off from L1 → L2 (unnecessary if L1 skilled better)
- **O - Overprocessing:** 15% premature close + reopen (duplicate work)

**Bottleneck:** "L2 Onderzoek" (avg 2-4 days when escalated)

**Table VII Link:** #6 - Process Mapping + VSM (discover actual resolution paths vs. assumed)

---

### 5.3 Scenario 3: Order-to-Cash (Order-tot-Betaling - E-commerce)

**Context:**
> "Een online retail bedrijf verwerkt dagelijks honderden bestellingen. Van order ontvangst tot betaling lopen meerdere systemen en afdelingen."

**Domain:** E-commerce / Supply Chain
**Ideal Cycle Time:** 10 dagen (order → betaling)

---

**Process Activities:**

```javascript
const ORDER_TO_CASH_ACTIVITIES = {
  BASE: [
    "Order Ontvangen",
    "Order Gevalideerd",
    "Credit Check Uitgevoerd",
    "Order Goedgekeurd",
    "Picking Gestart",
    "Picking Afgerond",
    "Verpakking",
    "Verzending",
    "Leverbewijs Ontvangen",
    "Factuur Verzonden",
    "Betaling Ontvangen",
    "Order Afgerond"
  ],
  SPECIAL: {
    CREDIT_HOLD: "⚠️ Credit Hold (betaalrisico)",
    CREDIT_APPROVED_MANUAL: "Credit Handmatig Goedgekeurd",
    STOCK_OUT: "⚠️ Artikelen Niet op Voorraad",
    BACKORDER: "Backorder Aangemaakt",
    PICKING_ERROR: "Picking Fout (verkeerd artikel)",
    REPICK: "Herpick Uitgevoerd",
    DELIVERY_FAILED: "Bezorging Mislukt",
    REDELIVERY: "Herbezorging",
    PAYMENT_REMINDER: "Betalingsherinnering",
    PAYMENT_OVERDUE: "⚠️ Betaling Te Laat (>30 dagen)"
  }
};
```

**Process Paths:**

| Path Type | Probability | Activities | TIM WOOD Waste |
|-----------|-------------|------------|----------------|
| **Perfect Order** | 40% | Ontvangen → Gevalideerd → Credit OK → Goedgekeurd → Picking → Verpakking → Verzending → Leverbewijs → Factuur → Betaling → Afgerond | None |
| **Credit Hold** | 20% | ... → Credit Hold → Manual Approval → ... (rest normal) | **W** (waiting 2-5 days for approval) |
| **Stock-Out** | 15% | ... → Goedgekeurd → Stock Out → Backorder → (wait) → Picking → ... | **W** (waiting for stock), **I** (inventory issue) |
| **Picking Error** | 10% | ... → Picking → Picking Fout → Repick → ... | **D** (defect), **O** (overprocessing - rework) |
| **Delivery Failure** | 10% | ... → Verzending → Delivery Failed → Redelivery → ... | **T** (extra transportation), **M** (motion) |
| **Late Payment** | 5% | ... → Factuur → Reminder → (wait) → Betaling Overdue → Betaling → Afgerond | **W** (waiting for payment - cash flow impact) |

**Master Data:**
```javascript
const ORDER_TO_CASH_MASTER = {
  PRODUCT_CATEGORIES: ["Electronics", "Kleding", "Huishouden", "Speelgoed", "Boeken"],
  CUSTOMER_TYPES: ["Particulier", "Zakelijk (klein)", "Zakelijk (groot)", "VIP", "Nieuw"],
  WAREHOUSES: ["DC Nederland", "DC België", "DC Duitsland", "Dropship"],
  CARRIERS: ["PostNL", "DHL", "UPS", "DPD", "Eigen Bezorging"],
  RESOURCES: ["OrderBot", "Finance Team", "Warehouse A", "Warehouse B", "Logistics Coord"]
};
```

**Identified Waste:**
- **W - Waiting:**
  - 20% credit hold (avg 3 days)
  - 15% stock-out (avg 5-7 days)
  - 5% late payment (>30 days)
- **I - Inventory:** Stock-outs indicate inventory management issue
- **T - Transportation:** 10% delivery failures → extra transport cost
- **D - Defects:** 10% picking errors
- **O - Overprocessing:** Rework (repick, redelivery)

**Bottleneck:** "Backorder" process (avg 5-7 days when out of stock)

**Table VII Link:** #6 - Process Mapping + VSM (discover actual order flow complexity)

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Code Structure Refactoring

**Current (Single Scenario):**
```javascript
// Hardcoded in ProcessMiningSimulator class
const ACTIVITIES = { ... };
const MASTER_DATA = { ... };
```

**New (Multi-Scenario):**
```javascript
const SCENARIOS = {
  procurement: {
    id: "procurement",
    name: "Procurement (Inkoop - Zuivelhandel)",
    description: "Een Europees zuivelhandelsbedrijf...",
    leadTimeNorm: 20, // days
    activities: PROCUREMENT_ACTIVITIES,
    masterData: PROCUREMENT_MASTER,
    pathProbabilities: {
      happy: 0.60,
      qualityIssue: 0.30,
      paymentDelay: 0.05,
      wrongPayment: 0.05
    },
    mermaidDiagram: `
      graph TD
        A["Aanvraag PR"] --> B["PO Gemaakt"];
        ...
    `,
    wasteAnalysis: {
      waiting: { threshold: 20, description: "Cases exceeding 20-day norm" },
      defects: { activity: "Onterechte Betaling", description: "Payment errors" }
    }
  },

  customerService: { ... },
  orderToCash: { ... }
};
```

---

### 6.2 Scenario Loader Module

**New JavaScript Module:**

```javascript
class ScenarioManager {
  constructor() {
    this.currentScenario = null;
    this.scenarios = SCENARIOS;
  }

  loadScenario(scenarioId) {
    if (!this.scenarios[scenarioId]) {
      throw new Error(`Scenario ${scenarioId} not found`);
    }

    this.currentScenario = this.scenarios[scenarioId];
    this.updateUI();
    return this.currentScenario;
  }

  updateUI() {
    // Update page title
    document.getElementById('scenario-title').textContent =
      this.currentScenario.name;

    // Update description
    document.getElementById('scenario-description').textContent =
      this.currentScenario.description;

    // Re-render Mermaid diagram
    this.renderMermaidDiagram(this.currentScenario.mermaidDiagram);

    // Clear previous data and results
    this.clearDataAndResults();
  }

  renderMermaidDiagram(diagramCode) {
    const container = document.querySelector('.mermaid');
    container.textContent = diagramCode;

    if (window.mermaidLoaded && typeof mermaid !== 'undefined') {
      mermaid.init(undefined, container);
    } else {
      // Fallback to static diagram
      container.innerHTML = createStaticDiagram(this.currentScenario.id);
    }
  }

  getCurrentActivities() {
    return this.currentScenario.activities;
  }

  getCurrentMasterData() {
    return this.currentScenario.masterData;
  }

  getPathProbabilities() {
    return this.currentScenario.pathProbabilities;
  }

  clearDataAndResults() {
    // Clear generated data
    window.processMiningSimulator.rawLogData = [];

    // Hide data preview
    document.getElementById('log-data-output')?.classList.add('hidden');

    // Hide results
    document.getElementById('mining-results-container')?.classList.add('hidden');

    // Disable mining button
    const miningButton = document.getElementById('run-mining-button');
    if (miningButton) {
      miningButton.disabled = true;
      miningButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }
}
```

---

### 6.3 Data Generation Updates

**Updated `generateProcessPath()` function:**

```javascript
generateProcessPath() {
  const scenario = this.scenarioManager.currentScenario;
  const activities = scenario.activities;
  const probabilities = scenario.pathProbabilities;
  const path = [];

  // Scenario-specific path logic
  switch(scenario.id) {
    case 'procurement':
      return this.generateProcurementPath(activities, probabilities);

    case 'customerService':
      return this.generateCustomerServicePath(activities, probabilities);

    case 'orderToCash':
      return this.generateOrderToCashPath(activities, probabilities);

    default:
      throw new Error(`Unknown scenario: ${scenario.id}`);
  }
}

generateCustomerServicePath(activities, prob) {
  const path = [];
  const {BASE, SPECIAL} = activities;

  // Start
  path.push(BASE[0], BASE[1], BASE[2]); // Ticket Created → Opened → Triage

  // Decision: L1 only vs. L2 escalation
  if (Math.random() < prob.escalateL2) {
    // L2 path
    path.push(BASE[3], SPECIAL.ESCALATE_L2, SPECIAL.L2_INVESTIGATION,
              SPECIAL.L2_RESOLUTION, BASE[5], BASE[6]);
  } else {
    // L1 path
    path.push(BASE[3], BASE[4], BASE[5]);

    // Possible premature close + reopen
    if (Math.random() < prob.reopen) {
      path.push(SPECIAL.PREMATURE_CLOSE, SPECIAL.REOPEN,
                SPECIAL.ESCALATE_L2, SPECIAL.L2_RESOLUTION, BASE[5]);
    }

    path.push(BASE[6]); // Closed
  }

  // SLA breach (overlay on any path)
  if (Math.random() < prob.slaBreach) {
    path.splice(3, 0, SPECIAL.SLA_BREACH); // Insert after Triage
  }

  return path;
}

generateOrderToCashPath(activities, prob) {
  const path = [];
  const {BASE, SPECIAL} = activities;

  // Start
  path.push(BASE[0], BASE[1]); // Order Ontvangen → Gevalideerd

  // Credit check
  path.push(BASE[2]); // Credit Check
  if (Math.random() < prob.creditHold) {
    path.push(SPECIAL.CREDIT_HOLD, SPECIAL.CREDIT_APPROVED_MANUAL);
  }
  path.push(BASE[3]); // Goedgekeurd

  // Stock check
  if (Math.random() < prob.stockOut) {
    path.push(SPECIAL.STOCK_OUT, SPECIAL.BACKORDER);
    // Simulate wait for stock (add delay in timestamp generation)
  }

  // Picking
  path.push(BASE[4]); // Picking Gestart
  if (Math.random() < prob.pickingError) {
    path.push(SPECIAL.PICKING_ERROR, SPECIAL.REPICK);
  }
  path.push(BASE[5]); // Picking Afgerond

  // Packing & Shipping
  path.push(BASE[6], BASE[7]); // Verpakking → Verzending

  // Delivery
  if (Math.random() < prob.deliveryFailure) {
    path.push(SPECIAL.DELIVERY_FAILED, SPECIAL.REDELIVERY);
  }
  path.push(BASE[8]); // Leverbewijs

  // Invoicing & Payment
  path.push(BASE[9]); // Factuur Verzonden
  if (Math.random() < prob.latePayment) {
    path.push(SPECIAL.PAYMENT_REMINDER, SPECIAL.PAYMENT_OVERDUE);
  }
  path.push(BASE[10], BASE[11]); // Betaling → Afgerond

  return path;
}
```

---

### 6.4 Waste Analysis Engine

**New Component:**

```javascript
class WasteAnalyzer {
  constructor(scenario, analysisResults) {
    this.scenario = scenario;
    this.analysis = analysisResults;
  }

  identifyWaste() {
    const waste = {
      waiting: this.detectWaiting(),
      overprocessing: this.detectOverprocessing(),
      defects: this.detectDefects(),
      motion: this.detectMotion(),
      inventory: this.detectInventory()
    };

    return this.formatWasteReport(waste);
  }

  detectWaiting() {
    const norm = this.scenario.leadTimeNorm;
    const exceededCount = this.analysis.leadTimes.filter(lt => lt > norm).length;
    const totalCases = this.analysis.leadTimes.length;
    const percentage = ((exceededCount / totalCases) * 100).toFixed(1);

    if (exceededCount > 0) {
      return {
        detected: true,
        severity: percentage > 30 ? 'high' : (percentage > 15 ? 'medium' : 'low'),
        description: `${percentage}% of cases exceed lead time norm (${norm} dagen)`,
        details: {
          exceededCount,
          totalCases,
          avgExcess: this.calculateAvgExcess(norm)
        }
      };
    }
    return { detected: false };
  }

  detectOverprocessing() {
    // Look for rework patterns in paths
    const reworkKeywords = ['Heropend', 'Repick', 'Rework', 'Herpick', 'Onterechte'];
    const reworkPaths = Object.keys(this.analysis.pathFrequencies).filter(path =>
      reworkKeywords.some(keyword => path.includes(keyword))
    );

    if (reworkPaths.length > 0) {
      const reworkCount = reworkPaths.reduce((sum, path) =>
        sum + this.analysis.pathFrequencies[path], 0
      );
      const percentage = ((reworkCount / this.analysis.totalCases) * 100).toFixed(1);

      return {
        detected: true,
        severity: percentage > 20 ? 'high' : (percentage > 10 ? 'medium' : 'low'),
        description: `${percentage}% of cases have rework loops`,
        details: {
          reworkCount,
          paths: reworkPaths
        }
      };
    }
    return { detected: false };
  }

  detectDefects() {
    // Look for error/problem activities
    const errorKeywords = ['Fout', 'Error', 'Probleem', 'Defect', 'Mislukt', '!!'];
    const errorActivities = Object.keys(this.analysis.activityCounts).filter(activity =>
      errorKeywords.some(keyword => activity.includes(keyword))
    );

    if (errorActivities.length > 0) {
      const errorCount = errorActivities.reduce((sum, activity) =>
        sum + this.analysis.activityCounts[activity], 0
      );
      const percentage = ((errorCount / this.analysis.totalCases) * 100).toFixed(1);

      return {
        detected: true,
        severity: percentage > 15 ? 'high' : (percentage > 5 ? 'medium' : 'low'),
        description: `${percentage}% of cases encounter errors/defects`,
        details: {
          errorCount,
          activities: errorActivities,
          mostCommon: errorActivities[0]
        }
      };
    }
    return { detected: false };
  }

  formatWasteReport(waste) {
    const report = [];

    if (waste.waiting.detected) {
      report.push({
        type: 'W - Waiting',
        icon: '⏳',
        severity: waste.waiting.severity,
        description: waste.waiting.description,
        recommendation: `Focus on bottleneck: ${this.analysis.bottleneck?.stepName}`
      });
    }

    if (waste.overprocessing.detected) {
      report.push({
        type: 'O - Overprocessing',
        icon: '🔄',
        severity: waste.overprocessing.severity,
        description: waste.overprocessing.description,
        recommendation: 'Eliminate rework by improving first-time-right quality'
      });
    }

    if (waste.defects.detected) {
      report.push({
        type: 'D - Defects',
        icon: '❌',
        severity: waste.defects.severity,
        description: waste.defects.description,
        recommendation: `Investigate root cause of: ${waste.defects.details.mostCommon}`
      });
    }

    return report;
  }
}
```

---

### 6.5 Libraries & Dependencies

**Unchanged (reuse existing):**
- TailwindCSS (via CDN)
- Chart.js 3.9.1 (with fallback CDNs)
- Mermaid.js 10.6.1 (with static fallback)

**No new dependencies needed.**

---

## 7. USER INTERFACE DESIGN

### 7.1 Updated Page Structure

```html
<main class="container mx-auto px-6 py-12">

  <!-- NEW: Scenario Selector -->
  <section class="mb-8">
    <label for="scenario-select" class="block text-lg font-semibold mb-2">
      Kies een bedrijfsproces:
    </label>
    <select id="scenario-select" class="w-full md:w-1/2 p-3 border rounded-lg">
      <option value="procurement">Procurement (Inkoop - Zuivelhandel)</option>
      <option value="customerService">Customer Service (IT Support)</option>
      <option value="orderToCash">Order-to-Cash (E-commerce)</option>
    </select>
    <p class="text-sm text-gray-600 mt-2">
      Elk scenario toont hoe process mining werkt in verschillende bedrijfscontexten.
    </p>
  </section>

  <!-- Fase 1: Ideaal Proces (dynamic title) -->
  <section class="content-section">
    <h2 id="scenario-title">
      Fase 1: Het Ideale Procurement Proces
    </h2>
    <p id="scenario-description" class="text-lg mb-6">
      <!-- Dynamic description loaded from scenario -->
    </p>

    <div class="mermaid-container">
      <pre class="mermaid">
        <!-- Dynamic Mermaid diagram -->
      </pre>
    </div>
  </section>

  <!-- Fase 2: Digital Traces (unchanged structure) -->
  <section class="content-section">
    <h2>Fase 2: De Digitale Sporen (ERP Logfiles)</h2>
    <!-- Existing data generation UI -->
  </section>

  <!-- Fase 3: Process Mining (NEW: Waste Analysis Section) -->
  <section class="content-section">
    <h2>Fase 3: Process Mining in Actie</h2>

    <!-- Existing: Paths, Activities, Lead Time -->
    ...

    <!-- NEW: Waste Analysis Section -->
    <div id="waste-analysis-container" class="mt-8 result-block">
      <h4>🗑️ LEAN WASTE ANALYSIS (TIM WOOD)</h4>
      <p class="text-sm text-gray-600 mb-4">
        Process mining maakt verschillende types van verspilling (waste) zichtbaar.
        Hieronder zie je welke TIM WOOD waste types in dit proces voorkomen.
      </p>

      <div id="waste-report" class="space-y-4">
        <!-- Waste items dynamically inserted -->
      </div>

      <!-- Table VII Connection -->
      <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h5 class="font-semibold text-blue-800 mb-2">
          🔗 Link naar Lean 4.0 (Table VII)
        </h5>
        <p class="text-sm text-blue-700">
          Dit is een voorbeeld van <strong>Process Mapping Software + Value Stream Mapping</strong>
          (Table VII combinatie #6).<br/>
          <strong>Traditioneel:</strong> Handmatige VSM met observatie en interviews (uren werk).<br/>
          <strong>Lean 4.0:</strong> Geautomatiseerde process discovery uit ERP logs (seconden).
        </p>
        <a href="lrd.md#appendix-table-vii" class="text-blue-600 underline text-sm">
          → Bekijk volledige Table VII
        </a>
      </div>
    </div>
  </section>

</main>
```

---

### 7.2 Waste Report Display

**HTML Template:**

```html
<div class="waste-item p-4 rounded-lg border-l-4 mb-3"
     data-severity="high"
     style="border-color: #EF4444; background: #FEF2F2;">

  <div class="flex items-start">
    <span class="text-3xl mr-3">⏳</span>
    <div class="flex-1">
      <h5 class="font-bold text-gray-800 mb-1">
        W - WAITING (Wachten)
      </h5>
      <p class="text-sm text-gray-700 mb-2">
        35% of cases exceed lead time norm (20 dagen).
        Gemiddelde wachttijd: 6.3 dagen.
      </p>
      <p class="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
        💡 <strong>Lean Opportunity:</strong>
        Focus on reducing waiting time at bottleneck activity
        "Procurement Lost Probleem Op" for significant improvement.
      </p>
    </div>
  </div>

</div>
```

**Severity Color Coding:**

| Severity | Border Color | Background | Use When |
|----------|-------------|------------|----------|
| **High** | Red (#EF4444) | Light red (#FEF2F2) | >30% cases affected |
| **Medium** | Yellow (#F59E0B) | Light yellow (#FFFBEB) | 10-30% cases |
| **Low** | Blue (#3B82F6) | Light blue (#EFF6FF) | <10% cases |

---

### 7.3 Scenario Switching Flow

**User Action:** Select different scenario from dropdown

**Confirmation Dialog:**

```javascript
if (hasGeneratedData) {
  const confirmed = confirm(
    '⚠️ Weet je zeker dat je van scenario wilt wisselen?\n\n' +
    'Huidige log data en resultaten worden gewist.'
  );

  if (!confirmed) {
    // Revert dropdown selection
    scenarioSelect.value = previousScenario;
    return;
  }
}

// Proceed with scenario switch
scenarioManager.loadScenario(newScenarioId);
```

**Loading State:**

```html
<div id="scenario-loading" class="hidden">
  <div class="flex items-center justify-center p-6">
    <div class="loading-spinner mr-3"></div>
    <span class="text-gray-600">Scenario wordt geladen...</span>
  </div>
</div>
```

---

## 8. INTEGRATION WITH WEEK 4 LESSON

### 8.1 Lesson Placement (from LRD)

**Tijdslot:** Minuut 50-60 (10 min in demo phase)

**Position in Lesson Flow:**
- **Voor demo:** Studenten hebben Ishikawa en VSM geleerd (conventionele Lean)
- **Demo moment:** Process mining demo (Industry 4.0 enhancement)
- **Na demo:** Studenten experimenteren zelf + hybride opdracht

### 8.2 Instructor Demo Script (5 min)

**Setup:**
- Open tool on projector
- Pre-select: **Customer Service** scenario (most relatable for students)

**Script:**

> **[00:00-00:30] Context Setting**
>
> "We hebben VSM met de hand gedaan. Jullie tekenden processtappen, telden doorlooptijden.
> Dat werkt, maar is tijdrovend. Wat als je 10,000 transacties per maand hebt?
> Dan gebruik je **Process Mining** - automatisch processen ontdekken uit data."

> **[00:30-01:30] Fase 1 - Ideaal Proces**
>
> "Hier zie je het ideale IT support proces. Ticket komt binnen → L1 lost op → Klaar.
> Simpel, toch? Laten we eens kijken hoe het écht gaat..."
>
> *[Scroll naar Fase 2]*

> **[01:30-02:30] Fase 2 - Data Genereren**
>
> "Ik klik op 'Genereer Log Data'. Dit simuleert ERP logs - elke keer dat een ticket
> van status verandert, schrijft het systeem een regel. 500 entries in seconden."
>
> *[Click button, wait 2 sec]*
>
> "Kijk - 500 log entries voor ~95 tickets. Eerste 10 zie je hier: timestamp, activiteit, wie het deed."

> **[02:30-04:00] Fase 3 - Process Mining**
>
> "Nu komt de magie. Process mining analyseert deze logs en **ontdekt** het echte proces."
>
> *[Click "Start Process Mining", wait 1 sec]*
>
> "En kijk! Het ontdekte proces heeft meer varianten dan het ideaal:
> - **#1 Happy path** (50%): Direct opgelost door L1 - groen
> - **#2 Escalatie** (30%): Moet naar L2 - geel (kost extra tijd)
> - **#3 Heropend** (15%): Voortijdig gesloten, klant belt terug - rood!
>
> Dit hadden we NIET voorgeprogrammeerd - het **ontdekte** dit uit de data."

> **[04:00-05:00] TIM WOOD Waste**
>
> *[Scroll to Waste Analysis]*
>
> "En hier zien we **TIM WOOD waste**:
> - **W - Waiting**: 30% moet wachten op L2 (gem. +3 dagen)
> - **M - Motion**: Hand-off van L1 naar L2 (onnodige overdrach t?)
> - **O - Overprocessing**: 15% heropend - voortijdig afgesloten zonder echte oplossing
>
> Dit is precies waar Lean zich op richt: waste elimineren!"

> **[05:00-05:30] Table VII Link**
>
> "En dit is **Table VII combinatie #6**: Process Mapping Software + Value Stream Mapping.
> - **Traditioneel VSM**: Uren observeren, interviews, handmatig tekenen
> - **Lean 4.0 Process Mining**: Seconden, automatisch, uit bestaande data
>
> Beide tonen dezelfde dingen - maar Lean 4.0 is continu, real-time mogelijk."

**Key Teaching Points:**
- Process mining **ontdekt** wat er echt gebeurt (niet wat we denken)
- Waste wordt **automatisch zichtbaar** uit data
- **Lean 4.0** = Lean principes + digital tools = sneller + schaalbaarder

---

### 8.3 Student Hands-On Activity (15-20 min)

**Assignment:**

> "In groepen van 3: Kies één van de 3 scenarios. Run process mining.
> Identificeer minimum 2 TIM WOOD waste types. Presenteer straks jullie bevindingen."

**Student Workflow:**

1. **Kies scenario** (1 min)
   - Discussie: Welke is interessant voor ons?
   - Select from dropdown

2. **Genereer data** (1 min)
   - Click button
   - Bekijk preview - "Ah, zo zien ERP logs eruit!"

3. **Run mining** (1 min)
   - Click button
   - Wait for results

4. **Analyseer resultaten** (7 min)
   - Bekijk process variants
   - Identificeer waste in Waste Analysis section
   - Screenshot results (export button)

5. **Beantwoord vragen** (5 min)
   - Welke waste types gevonden?
   - Wat is de grootste bottleneck?
   - Hoe zou je dit in Lean termen aanpakken?
   - Link naar Table VII: Welke combinatie is dit?

6. **Bereid presentatie voor** (5 min)
   - Noteer bevindingen op flipover
   - Wie presenteert?

**Output per groep:**
- Screenshot van discovered paths
- Lijst van 2-3 waste types met % impact
- Verbetervoorstel (Lean actie)

---

### 8.4 Gallery Walk Integration

**Poster Template:**

```
┌────────────────────────────────────────────────┐
│  PROCESS MINING ANALYSE                        │
│  Scenario: [Customer Service / Procurement /   │
│            Order-to-Cash]                      │
├────────────────────────────────────────────────┤
│                                                 │
│  📊 ONTDEKTE PROCES VARIANTEN:                 │
│  • Happy path (50%): [kort pad]                │
│  • Deviation (30%): [langer pad]               │
│  • Critical (15%): [probleem pad]              │
│                                                 │
│  🗑️ TIM WOOD WASTE GEÏDENTIFICEERD:            │
│  1. W - Waiting: 30% cases wacht op L2         │
│  2. O - Overprocessing: 15% heropend tickets   │
│                                                 │
│  🎯 BOTTLENECK:                                │
│  L2 Onderzoek (gemiddeld +3 dagen)             │
│                                                 │
│  💡 LEAN 4.0 VERBETERING:                      │
│  • Train L1 beter → minder escalaties          │
│  • Automatische routing (AI) → juiste expert   │
│  • Real-time dashboards → bottleneck signalen  │
│                                                 │
│  🔗 TABLE VII: Process Mapping Software (#6)   │
│                                                 │
│  [Screenshot van tool resultaten]              │
└────────────────────────────────────────────────┘
```

---

### 8.5 Assignment Integration

**Week 4 Individual Assignment** (from LRD Section 5.2)

**Part 2: Industry 4.0 Tool Usage**

> "Use the Process Mining tool to analyze one of the three scenarios. Include in your report:
>
> **A. Process Discovery (3 points)**
> - Screenshot of discovered process variants
> - Compare: Ideal process (diagram) vs. Actual process (discovered paths)
> - Percentage of cases following happy path vs. deviations
>
> **B. Waste Identification (4 points)**
> - List minimum 2 TIM WOOD waste types identified
> - Quantify impact (e.g., "30% of cases affected")
> - Screenshot of Waste Analysis section
>
> **C. Lean 4.0 Connection (3 points)**
> - Explain how this relates to Table VII (#6: Process Mapping + VSM)
> - Compare: How would you do this analysis manually with traditional VSM?
> - Advantage of process mining: What can you see here that you can't with manual observation?"

**Grading Rubric:**

| Criterium | Onvoldoende (0-5) | Voldoende (6-7) | Goed (8-10) |
|-----------|------------------|-----------------|-------------|
| **Process Discovery** | Incomplete/wrong paths | Correct paths identified | Insightful comparison ideal vs. actual |
| **Waste ID** | <2 waste types or wrong | 2 waste types correctly identified | 3+ waste types with quantification |
| **Lean 4.0 Link** | No Table VII connection | Basic explanation of #6 | Deep comparison manual vs. digital |

---

## 9. IMPLEMENTATION ROADMAP

### 9.1 Development Phases

#### Phase 1: Code Refactoring (2 hours)

**Goal:** Extract scenario logic from hardcoded implementation

**Tasks:**
1. Create `SCENARIOS` configuration object (1h)
   - Define all 3 scenarios with activities, master data, probabilities
   - Write Mermaid diagram code for each
   - Add waste analysis config

2. Implement `ScenarioManager` class (1h)
   - `loadScenario(id)` method
   - `updateUI()` method
   - `getCurrentActivities()` helper
   - `clearDataAndResults()` method

**Validation:**
- Procurement scenario still works exactly as before
- Can switch scenarios programmatically
- UI updates correctly

---

#### Phase 2: Customer Service Scenario (2 hours)

**Goal:** Add second scenario with full functionality

**Tasks:**
1. Define Customer Service activities & paths (30 min)
   - Write `CUSTOMER_SERVICE_ACTIVITIES`
   - Write `CUSTOMER_SERVICE_MASTER`
   - Define path probabilities

2. Implement `generateCustomerServicePath()` (45 min)
   - L1 vs. L2 decision logic
   - Reopen scenario logic
   - SLA breach overlay

3. Create Mermaid diagram (30 min)
   - Design flowchart
   - Match activities to nodes
   - Style with colors

4. Test & validate (15 min)
   - Generate 500 logs
   - Run mining
   - Verify waste detection

---

#### Phase 3: Order-to-Cash Scenario (1.5 hours)

**Goal:** Add third scenario

**Tasks:**
1. Define O2C activities & paths (20 min)
2. Implement `generateOrderToCashPath()` (40 min)
   - Credit hold logic
   - Stock-out + backorder
   - Picking errors + delivery failures
3. Create Mermaid diagram (20 min)
4. Test & validate (10 min)

---

#### Phase 4: Waste Analysis Engine (1.5 hours)

**Goal:** Implement TIM WOOD waste detection & display

**Tasks:**
1. Create `WasteAnalyzer` class (45 min)
   - `detectWaiting()` - lead time exceeding norm
   - `detectOverprocessing()` - rework loops in paths
   - `detectDefects()` - error activities
   - `formatWasteReport()` - HTML generation

2. Integrate into results display (30 min)
   - Add waste analysis section after lead time chart
   - Style waste items with severity colors
   - Add Table VII connection box

3. Test all 3 scenarios (15 min)
   - Verify each scenario shows relevant waste
   - Check severity calculations
   - Validate recommendations

---

#### Phase 5: THEOOM Integration (1 hour)

**Goal:** Rebrand and contextualize for Week 4

**Tasks:**
1. Update header & branding (15 min)
   - Change title: "Process Mining Simulator - THEOOM Week 4"
   - Update navigation (remove "Excellentie door Design" links)
   - Add THEOOM color scheme (optional)

2. Add scenario selector UI (20 min)
   - Dropdown with 3 options
   - Help text explaining scenarios
   - Confirmation dialog for switching

3. Update copy & instructions (15 min)
   - Add TIM WOOD explanation in help text
   - Update Fase 1/2/3 titles
   - Add instructor notes (HTML comments or separate doc)

4. Table VII integration (10 min)
   - Add info box linking to Table VII #6
   - Explain manual VSM vs. process mining
   - Link to LRD document

---

#### Phase 6: Testing & Validation (1 hour)

**Goal:** Ensure production-ready quality

**Test Matrix:**

| Test Case | Procurement | Customer Service | Order-to-Cash | Status |
|-----------|-------------|------------------|---------------|--------|
| **Data generation** | ✓ | ✓ | ✓ | 🟡 To test |
| **Process discovery** | ✓ | ✓ | ✓ | 🟡 To test |
| **Waste detection** | ✓ | ✓ | ✓ | 🟡 To test |
| **Lead time calc** | ✓ | ✓ | ✓ | 🟡 To test |
| **Chart rendering** | ✓ | ✓ | ✓ | 🟡 To test |
| **Export PNG** | ✓ | ✓ | ✓ | 🟡 To test |
| **Scenario switching** | N/A | ✓ | ✓ | 🟡 To test |

**Browser Testing:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Error Scenarios:**
- Mermaid.js fails to load → Static diagram shows
- Chart.js fails → Fallback text stats shown
- No data generated → Mining button disabled
- Switch scenario with data → Confirmation works

---

### 9.2 Development Timeline

**Total Estimated Time: 9 hours** (vs. 12-16 from scratch)

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1. Refactoring | 2h | Scenario infrastructure |
| 2. Customer Service | 2h | Second working scenario |
| 3. Order-to-Cash | 1.5h | Third working scenario |
| 4. Waste Analysis | 1.5h | TIM WOOD detection |
| 5. THEOOM Integration | 1h | Branded, contextualized |
| 6. Testing | 1h | Production-ready |

**Suggested Sprint:**
- **Day 1 (4h):** Phase 1 + 2
- **Day 2 (3h):** Phase 3 + 4
- **Day 3 (2h):** Phase 5 + 6

---

### 9.3 Deployment Plan

**Hosting:** GitHub Pages

**Deployment Steps:**

```bash
# 1. Development
cd /workspaces/ontwikkeling-theoom/demos/process-mining/
# Create index.html (adapted from programma-deel2-process-mining.html)

# 2. Local testing
# Open index.html in browser, test all scenarios

# 3. Commit
git add demos/process-mining/
git commit -m "Add Process Mining tool with 3 scenarios for Week 4"

# 4. Deploy to GitHub Pages
git push origin main

# 5. Verify
# https://hanbedrijfskunde.github.io/ontwikkeling-theoom/demos/process-mining/
```

**Pre-Launch Checklist:**
- [ ] All 3 scenarios generate data
- [ ] All 3 scenarios run mining analysis
- [ ] Waste detection works for each
- [ ] Charts render (or fallback shows)
- [ ] Export functionality works
- [ ] Scenario switching with confirmation works
- [ ] Table VII link is correct
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile/tablet responsive (at least tablets)
- [ ] No console errors during normal use

---

## 10. TESTING & VALIDATION

### 10.1 Functional Testing

**Test Scenario: Procurement (Baseline)**

```
Input:
- Scenario: Procurement
- Action: Generate 500 logs → Run mining

Expected Output:
- ~95 unique cases
- Top path: "PR → PO → ... → Betaald → Afgerond" (60% frequency)
- Waste detected:
  - W - Waiting: ~35% exceed 20-day norm
  - D - Defects: ~5% "Onterechte Betaling"
- Bottleneck: "Procurement Lost Probleem Op"
- Lead time chart: Green bar (within) + Red bar (exceeded)
```

**Test Scenario: Customer Service**

```
Input:
- Scenario: Customer Service
- Action: Generate 500 logs → Run mining

Expected Output:
- ~100 unique tickets
- Top path: "Created → Triage → L1 → Resolved → Closed" (50%)
- Waste detected:
  - W - Waiting: ~30% escalated to L2 (+3 days)
  - O - Overprocessing: ~15% reopened tickets
- Bottleneck: "L2 Onderzoek"
- Chart shows distribution
```

**Test Scenario: Order-to-Cash**

```
Input:
- Scenario: Order-to-Cash
- Action: Generate 500 logs → Run mining

Expected Output:
- ~85 unique orders
- Happy path: "Order → Credit OK → Picking → ... → Payment → Afgerond" (40%)
- Waste detected:
  - W - Waiting: 20% credit hold, 15% stock-out
  - D - Defects: 10% picking errors
  - T - Transportation: 10% delivery failures
- Bottleneck: "Backorder" (5-7 days)
```

---

### 10.2 Scenario Switching Test

**Test Case: Switch with Data**

```
Steps:
1. Select Procurement
2. Generate logs
3. Run mining
4. Switch to Customer Service
   → Expect: Confirmation dialog
5. Confirm
   → Expect:
     - Previous data cleared
     - New Mermaid diagram loaded
     - Mining results hidden
     - Generate button enabled
```

---

### 10.3 Error Handling Tests

**Test Case: Library Failures**

```
Scenario: Mermaid.js CDN blocked

Steps:
1. Block mermaid CDN in browser DevTools
2. Load page
3. Wait 3 seconds

Expected:
- Fallback message shows: "Diagram wordt geladen met statische weergave"
- Static SVG diagram renders
- Rest of tool functional
```

```
Scenario: Chart.js unavailable

Steps:
1. Run mining analysis
2. Chart.js fails to load

Expected:
- Chart area shows fallback message
- Lead time statistics still displayed as text
- Tool continues to work
```

---

### 10.4 User Acceptance Testing

**Participants:** 3-5 students (THEOOM cohort or similar)

**Task List:**

1. **Task 1: Explore scenarios**
   - "Browse the 3 scenarios. Which one is most interesting to you?"
   - Success: Participant can switch scenarios and understand context

2. **Task 2: Generate and analyze**
   - "Choose one scenario, generate data, and run process mining."
   - Success: Completes within 5 minutes without help

3. **Task 3: Identify waste**
   - "Find at least 2 types of waste in your chosen scenario."
   - Success: Correctly identifies waste types from analysis

4. **Task 4: Export**
   - "Export your results to include in a report."
   - Success: Successfully downloads PNG screenshot

5. **Task 5: Connection**
   - "Explain how this relates to Lean 4.0 and Table VII."
   - Success: Can articulate connection (process mapping + VSM)

**Success Criteria:**
- 80%+ participants complete all tasks
- Average time <15 minutes
- Positive feedback: "This helped me understand process mining"
- No major confusion points

---

### 10.5 Performance Testing

**Metrics:**

| Operation | Target | Actual | Status |
|-----------|--------|--------|--------|
| **Page load** | <3 sec | TBD | 🟡 To test |
| **Generate 500 logs** | <3 sec | TBD | 🟡 To test |
| **Run mining analysis** | <2 sec | TBD | 🟡 To test |
| **Render Mermaid** | <2 sec | TBD | 🟡 To test |
| **Render Chart.js** | <1 sec | TBD | 🟡 To test |
| **Scenario switch** | <2 sec | TBD | 🟡 To test |
| **Export PNG** | <3 sec | TBD | 🟡 To test |

**Stress Test:**
- Run 30 concurrent browser sessions (classroom simulation)
- Each session generates data + runs mining
- Monitor: No crashes, performance degradation acceptable

---

## APPENDICES

### A. Code Snippets - Scenario Configuration

**Complete Procurement Scenario Object:**

```javascript
const SCENARIOS = {
  procurement: {
    id: "procurement",
    name: "Procurement (Inkoop - Zuivelhandel)",
    description: "Een Europees zuivelhandelsbedrijf koopt dagelijks melkpoeder, lactose en boterolie in van leveranciers in Nederland, Duitsland, Frankrijk, Polen en Ierland.",
    leadTimeNorm: 20,

    activities: {
      BASE: [
        "Aanvraag PR Gemaakt",
        "PO Gemaakt & Goedgekeurd",
        "PO Verzonden",
        "Goederen Ontvangen",
        "Factuur Ontvangen",
        "Factuur Betaald",
        "Procurement Afgerond"
      ],
      SPECIAL: {
        QUALITY_CHECK: "Kwaliteitscontrole",
        PROBLEM_REPORTED: "Probleem Gemeld",
        BLOCK_INVOICE: "Instructie: Factuur Blokkeren",
        SOLVE_PROBLEM: "Procurement Lost Probleem Op",
        RELEASE_INVOICE: "Signaal: Factuur Vrijgeven",
        INCORRECT_PAYMENT: "!! Onterechte Betaling na Kwaliteitsprobleem !!",
        PAYMENT_REMINDER: "Betalingsherinnering Ontvangen"
      }
    },

    masterData: {
      PRODUCTS: ["Volle Melkpoeder", "Magere Melkpoeder", "Weipoeder", "Lactose", "Boterolie"],
      SUPPLIERS: ["NL Zuivel BV", "DE MilchKontor", "FR Laiterie SA", "PL Mleko Sp", "IE Dairy Ltd."],
      RESOURCES: ["P. Jansen", "S. de Vries", "AutoSysteem", "M. Kowalski", "L. Dupont"]
    },

    pathProbabilities: {
      qualityOK: 0.60,
      qualityIssueFixed: 0.30,
      paymentDelay: 0.05,
      wrongPayment: 0.05,
      poSend: 0.95,
      paymentReminder: 0.10
    },

    mermaidDiagram: `
graph TD
    A["Aanvraag PR Gemaakt<br/>(Intern)"] --> B["PO Gemaakt &<br/>Goedgekeurd"];
    B --> C["PO Verzonden"];
    C --> D["Goederen Ontvangen<br/>(Logistiek)"];
    D --> QC{"Kwaliteitscontrole<br/>OK?"};

    QC -->|"✓ Ja"| E_OK["Factuur Verwerken<br/>(OK Pad)"];
    E_OK --> FPAY_OK["Factuur Betaald<br/>(OK Pad)"];
    FPAY_OK --> G_OK["Procurement<br/>Afgerond ✓"];

    QC -->|"✗ Nee"| PM["Probleem Gemeld<br/>(Procurement)"];
    PM --> FB["Instructie:<br/>Factuur Blokkeren"];
    FB --> PRSLV["Procurement Lost<br/>Probleem Op"];
    PRSLV --> SFV["Signaal:<br/>Factuur Vrijgeven"];
    SFV --> E_NOK["Factuur Verwerken<br/>(na Fix)"];
    E_NOK --> FPAY_NOK["Factuur Betaald<br/>(na Fix)"];
    FPAY_NOK --> G_NOK["Procurement<br/>Afgerond ✓"];

    classDef default fill:#E0F2FE,stroke:#C6E7FF,stroke-width:2px;
    classDef decision fill:#FFF7ED,stroke:#FB923C,stroke-width:3px;
    classDef problemPath fill:#FEFCE8,stroke:#FDE047,stroke-width:2px;
    classDef endNode fill:#D1FAE5,stroke:#6EE7B7,stroke-width:3px;
    classDef startNode fill:#DBEAFE,stroke:#60A5FA,stroke-width:3px;

    class A startNode;
    class QC decision;
    class PM,FB,PRSLV,SFV,E_NOK,FPAY_NOK problemPath;
    class G_OK,G_NOK endNode;
    `,

    wasteAnalysis: {
      waiting: {
        threshold: 20,
        description: "Cases exceeding 20-day procurement cycle norm",
        bottleneckActivity: "Procurement Lost Probleem Op"
      },
      defects: {
        activities: ["!! Onterechte Betaling na Kwaliteitsprobleem !!"],
        description: "Payment made despite quality block instruction"
      },
      overprocessing: {
        reworkKeywords: ["Onterechte", "Blokkeren", "Vrijgeven"],
        description: "Extra process steps due to quality issues"
      }
    }
  },

  // customerService: { ... },
  // orderToCash: { ... }
};
```

---

### B. Migration Checklist (from v1.0 to v2.0)

**Files to Modify:**

- [ ] Copy `programma-deel2-process-mining.html` → `demos/process-mining/index.html`
- [ ] Extract ACTIVITIES to SCENARIOS object
- [ ] Extract MASTER_DATA to SCENARIOS object
- [ ] Add ScenarioManager class
- [ ] Refactor generateProcessPath() to scenario-specific functions
- [ ] Add scenario selector HTML
- [ ] Add WasteAnalyzer class
- [ ] Update results display to include waste section
- [ ] Add Table VII info box
- [ ] Update header/branding
- [ ] Test all scenarios
- [ ] Update documentation

---

### C. Glossary

| Term | Definition |
|------|------------|
| **Process Mining** | Data science technique to discover, monitor, and improve processes by extracting knowledge from event logs |
| **Event Log** | Collection of timestamped records of activities performed in a business process |
| **Case ID** | Unique identifier for a process instance (e.g., order number, ticket ID) |
| **Activity** | Single step or action in a business process |
| **Process Variant** | Unique path/sequence of activities that cases follow |
| **Lead Time** | Total time from process start to end (cycle time) |
| **Bottleneck** | Activity that constrains overall process throughput |
| **TIM WOOD** | Mnemonic for 7 types of waste in Lean: Transportation, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects |
| **Table VII** | Matrix from Lean 4.0 article showing integration of Lean Tools × Industry 4.0 Technologies |
| **Happy Path** | Ideal process flow without deviations or errors |
| **Rework** | Repeating activities due to errors or incomplete work |

---

### D. References

**Original Implementation:**
- [programma-deel2-process-mining.html](../background-material/process-mining/programma-deel2-process-mining.html)

**Related Documents:**
- [LRD Week 4 - Lean 4.0](lrd.md)
- [GitHub Issue #1: Process Mining Tool](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/1)
- [Lean 4.0 Article](../background-material/lean-40.pdf) - Table VII source

**Technical Documentation:**
- [Mermaid.js](https://mermaid.js.org/)
- [Chart.js](https://www.chartjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

---

**END OF PRD**

*This document serves as the complete specification for adapting the Process Mining Simulator for THEOOM Week 4. Implementation ready - all scenarios, waste detection logic, and UI designs are fully specified.*
