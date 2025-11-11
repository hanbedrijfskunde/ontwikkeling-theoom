# LEARNING REQUIREMENT DOCUMENT (LRD)
## Lesweek 4: Procesanalyse & Verbeteren - LEAN 4.0
### THEOOM Periode 2 - Operations Management

**Versie**: 2.0 - Lean 4.0 Integratie
**Ontwikkelaar**: Witek
**Review**: Anne (week 47)
**Duur**: 2 uur contacttijd

---

## 1. EXECUTIVE SUMMARY

### 1.1 Kern van de Les
Studenten leren bedrijfsprocessen analyseren en optimaliseren met **zowel conventionele Lean methoden als moderne Industry 4.0 technologieën**. Door deze hybride benadering (Lean 4.0) krijgen studenten inzicht in traditionele procesverbetering én de transformatieve rol van AI, IoT en data analytics in moderne manufacturing.

### 1.2 Unique Value Proposition
- **50/50 balans**: Klassieke Lean tools (Ishikawa, VSM, TIM WOOD) + Industry 4.0 tech (IoT, AI, Digital Twins)
- **Hands-on experimenteren**: Interactieve web-based simulaties (process mining, discrete event simulation)
- **Studentkeuze**: Uit Table VII kiezen studenten welke technologie ze toepassen
- **Praktijkgericht**: Synthetische maar realistische data, direct toepasbaar

### 1.3 Conceptueel Framework: Digital Process Engineering

De les is gestructureerd rondom het **Digital Process Engineering** framework, dat de brug vormt tussen traditionele Lean en Industry 4.0:

![Digital Process Engineering Framework](../background-material/Digital%20Process%20Engineering.jpg)

**Drie pijlers van het framework:**

1. **Process Discovery (Links)**: Data → Process Mining → Process Model
   - *Vraag*: "Wat gebeurt er NU in ons proces?"
   - *Tool*: Process Mining Simulator
   - *Lean link*: Digitale variant van Gemba Walk en VSM
   - Ontdekt automatisch procesvarianten, bottlenecks en waste uit logs

2. **Process Optimization (Rechts)**: Process Model → Discrete Event Simulation → Process Design
   - *Vraag*: "Wat ALS we X veranderen?"
   - *Tool*: DES Simulator
   - *Lean link*: Virtuele Kaizen - test verbeteringen zonder risico
   - Simuleert impact van changes (resources, buffers, service times)

3. **Digital Twin (Centrum)**: Real-time integratie van discovery + optimization
   - Verbindt "wat is" (mining) met "wat kan" (simulation)
   - Continuous monitoring + predictive analytics
   - **Lean 4.0 = Traditionele Lean + Digital Process Engineering**

Dit framework maakt abstract Industry 4.0 jargon concreet en laat studenten zien hoe tools elkaar aanvullen.

### 1.4 Positionering
- **Voor**: Week 3 - Procesvisualisatie (BPMN, flowcharts)
- **Na**: Week 5 - Recht & Structuur
- **Link**: Brugfunctie tussen traditionele methoden en digitale transformatie

---

## 2. LEERDOELEN

### 2.1 Hoofdleerdoel
Na deze les kunnen studenten bedrijfsprocessen analyseren met **conventionele Lean tools** én beoordelen wanneer **Industry 4.0 technologieën** toegevoegde waarde bieden, en beide benaderingen integreren in een verbeterplan.

### 2.2 Specifieke Leerdoelen

#### Conventionele Lean (Foundation)
1. **Ishikawa-diagram** maken om oorzaken van procesknelpunten te identificeren (6M-methode)
2. **Value Stream Map** opstellen met bewerkingstijd, doorlooptijd en wachttijd
3. **7 verspillingen** (TIM WOOD) herkennen en elimineren
4. **Value-added ratio** berekenen en interpreteren

#### Industry 4.0 Enhancement
5. **IoT sensor data** interpreteren voor real-time procesmonitoring
6. **AI-powered analytics** gebruiken om bottlenecks en patronen te detecteren
7. **Digital Twin simulaties** begrijpen en toepassen voor procesoptimalisatie
8. **Predictive maintenance** concept uitleggen met data-gedreven voorbeelden

#### Lean 4.0 Integratie
9. **Trade-offs analyseren**: Wanneer kies je voor low-tech Lean vs. high-tech Industry 4.0?
10. **Hybride verbeterplan** ontwerpen dat beide benaderingen combineert

### 2.3 Kerncompetenties
- **Analytisch denken**: Van handmatige analyse tot data-gedreven insights
- **Technologisch bewustzijn**: Kansen en beperkingen van digitalisering herkennen
- **Pragmatisch beslissen**: Juiste tool voor de juiste situatie kiezen
- **Toekomstgericht**: Voorbereid op smart manufacturing trends

### 2.4 Koppeling aan DOVE-cyclus Leeruitkomsten

Deze lesweek draagt bij aan de vier leeruitkomsten van Operations Management (propedeuseniveau):

#### **Leeruitkomst 1: Diagnosticeren**
*"Analyseren en diagnosticeren van bedrijfskundige vraagstukken en ontwikkelingen"*

**Hoe Week 4 hieraan bijdraagt:**
- **Ishikawa-diagram**: Identificeren oorzaken van procesknelpunten (6M-methode)
- **Value Stream Mapping**: Diagnosticeren waar tijd verloren gaat (wachttijd vs. bewerkingstijd)
- **TIM WOOD waste analyse**: Herkennen van 7 verspillingstypen in processen
- **Process Mining**: Automatisch ontdekken van bottlenecks en procesvarianten uit event logs
- **Bottleneck detectie**: Via DES simulatie het kritieke pad identificeren

**Assessment**: Studenten diagnosticeren procesknelpunten in hun case met min. 2 Lean tools

#### **Leeruitkomst 2: Ontwerpen**
*"(Her)ontwerpen van bedrijfskundige oplossingen met oog voor meervoudige waardencreatie"*

**Hoe Week 4 hieraan bijdraagt:**
- **TO-BE Value Stream Map**: Ontwerpen verbeterd proces met lagere doorlooptijd
- **Discrete Event Simulation**: Virtueel testen van ontwerpkeuzes (meer resources, andere service tijden)
- **Hybride Lean 4.0 plan**: Combineren traditionele + digitale oplossingen uit Table VII
- **Meervoudige waarde**: Trade-off analyse (kosten vs. baten, MKB vs. corporate)
- **Borgingsplan**: Ontwerpen monitoring (KPI's + digital dashboards)

#### **Meervoudige waardencreatie in Lean 4.0 context**

Cases illustreren dat "waarde" voor verschillende stakeholders verschilt:

| Stakeholder | Uber Example | Amazon Example | Microsoft Example |
|-------------|--------------|----------------|-------------------|
| **Shareholders** | Efficient matching, surge pricing | 25% more efficient warehouses | 4× accuracy at fraction of cost |
| **Workers** | Flexibility (claimed) vs. 80h weeks (reality) | Upskilling (300k trained) vs. flat employment | Job security → "Will AI replace me?" |
| **Customers** | Fast, reliable rides | Fast delivery (1-2 day Prime) | Accessible diagnosis (Bing search) |
| **Society** | Congestion, gig economy precarity | 32h week alternative (Convictional) | Healthcare cost reduction vs. trust |

**Ontwerp challenge**: Hoe design je Lean 4.0 systemen die **alle** stakeholders dienen, niet alleen shareholders?

**Link naar Table VII**: Elke Lean Tool × Industry 4.0 combinatie heeft impliciete waardekeuzes:

- #7 (JIT + Automated Inventory): Efficient voor bedrijf, maar job displacement voor workers?
- #10 (Jidoka + AI Monitoring): Quality gains, maar eliminates human judgment?
- #13 (TPM + Predictive Maintenance): Cost savings, maar reduces maintenance jobs?

**Assessment**: Studenten ontwerpen TO-BE scenario met kwantitatieve impact (tijd/kosten reductie) + reflecteren op stakeholder impact

#### **Leeruitkomst 3: Veranderen**
*"Begeleiden van een bedrijfskundige verandering"*

**Hoe Week 4 hieraan bijdraagt** (beperkt, niet hoofdfocus):
- **Borgingsstrategieën**: Hoe borg je verbeteringen? (procedures, training, monitoring)
- **Change management impliciete kennis**: Van handmatig naar geautomatiseerd proces
- **Implementatie-uitdagingen**: Reflectie op weerstanden en adoptieproblemen

**Assessment**: Studenten beschrijven borgingsplan in hun assignment (10% van rubric)

#### **Leeruitkomst 4: Evalueren**
*"Evalueren van proces en resultaat"*

**Hoe Week 4 hieraan bijdraagt** (substantieel versterkt door case studies):
- **KPI's berekenen**: Value-added ratio, utilization, lead time
- **Waste detectie**: Evalueren hoeveel verspilling er is (TIM WOOD %)
- **Simulatie resultaten interpreteren**: Is verbetering significant? (confidence intervals)
- **Reflectie**: Evalueren trade-offs en business case

#### **Case Studies voor diepere evaluatie**

De 4 case studies bieden concrete context voor kritische evaluatie:

- **Uber case**: Evalueren wanneer operational quality ≠ operational excellence
  - 99% uptime + 15M trips/dag = quality metrics
  - Maar: 60-80h werkweken, minimum wage na kosten = excellence vraagstuk
  - **Evaluatie skill**: Onderscheid maken tussen efficiency metrics en holistische success criteria

- **Amazon case**: Evalueren van corporate narratives vs. systemic data
  - Claim: "300k employees trained for new roles" (success metric = # trained)
  - Reality: Employment flat at 1.5M since 2022 (alternative metric = # employed)
  - **Evaluatie skill**: Kritisch beoordelen welke metrieken relevant zijn

- **Microsoft case**: Evalueren van test methodology
  - Claim: "AI 4× more accurate than doctors"
  - Context: Doctors tested WITHOUT usual tools (unfair comparison)
  - **Evaluatie skill**: Methodologische validiteit beoordelen

- **Dark Factories case**: Evalueren van speed vs. organizational learning trade-off
  - ZEEKR: 300k cars/jaar in 3 jaar (speed)
  - Tesla: 10+ jaar voor zelfde volume (learning curve)
  - **Evaluatie skill**: Long-term vs. short-term waarde afwegen

**Assessment**: Studenten evalueren impact van hun TO-BE scenario met metrieken + reflecteren op case trade-offs

---

### 2.5 "Respect for People" - Kritische Reflectie

Traditionele Lean heeft twee pijlers:

1. **Continuous Improvement** (Kaizen)
2. **Respect for People**

Week 4 confronteert studenten met fundamentele vraag: **Kan "Respect for People" bestaan in Lean 4.0?**

#### **Case-based reflectie**

**Uber case**:

- Traditional Lean: Operators stop production line, suggest improvements, job security through contribution
- Uber's Lean 4.0: Algorithms optimize, drivers accept changes, job security through... flexibility?
- **Vraag**: Is algorithmic management "respectful"?

**Dark Factories case**:

- Toyota's motto: "Build people before building products"
- Dark Factories: "Eliminate people, build products 24/7"
- **Vraag**: Kun je "respect for people" hebben in factory zonder people?

**Amazon case**:

- Aaron Martin (upskilled worker): "This isn't Terminator"
- Jacob Ward (analyst): "They're NOT going to be that technical. Just say 'Hey robot, grab this.'"
- **Vraag**: Is "upskilling" genuine respect, of PR narrative voor job displacement?

**Microsoft case**:

- If AI diagnoses 4× better than doctors, what's the moral case for keeping humans?
- Is efficiency **always** the ultimate value?
- **Vraag**: Where does "respect for people" actually mean something?

#### **Synthesis vraag voor studenten**

> *"In an economy optimized by AI for maximum efficiency, what is the role of people? Are we partners (man with machine)? Supervisors (humans manage robots)? Beneficiaries (efficiency gains → better life)? Or temporary (until AI is good enough)?"*

Deze vraag verbindt **alle vier** DOVE-leeruitkomsten:

- **D**: Diagnosticeren van automation impact across skill levels
- **O**: Ontwerpen van systemen die efficiency EN wellbeing balanceren
- **V**: Veranderen van organisaties en society-level policies
- **E**: Evalueren van success metrics (GDP? Employment? Worker happiness? All three?)

**Assessment**: Studenten reflecteren op deze vraag in hun assignment (onderdeel van Criterium E: Evalueren, 20% van rubric)

---

**Focus van Week 4**:

- **Diagnosticeren** (40%): Tools + techniques (Ishikawa, VSM, TIM WOOD, Process Mining)
- **Ontwerpen** (30%): Hybride Lean 4.0 solutions met meervoudige waardencreatie
- **Evalueren** (25%): Case-based kritische reflectie op trade-offs en stakeholder impact
- **Veranderen** (5%): Borgingsstrategieën en implementatie-uitdagingen

**Verschuiving t.o.v. versie 1.0**: Evalueren sterker (10% → 25%) door toevoeging case studies, waardoor studenten diepere kritische analyse ontwikkelen.

---

## 3. LESSTRUCTUUR (120 minuten)

### Fase 1: FOUNDATION - Conventionele Lean (0-45 min)

#### Opening (0-10 min) - PURPOSE
**Activiteit**: "The Waiting Room Challenge"
- Video: Ziekenhuis wachtrij probleem
- Vraag: "Waarom 3 uur wachten voor 10 min consult?"
- Brainstorm: Mogelijke oorzaken
- Reveal: 40% reductie door Lean + IoT sensoren

**Leerdoel link**: "Jullie leren vandaag beide benaderingen"

#### Conventionele Tools (10-45 min) - MASTERY
**Block 1: Ishikawa Diagram (10 min instructie + 10 min oefening)**
- **Wat**: Visgraatdiagram voor oorzaak-analyse
- **Hoe**: 6M-methode (Man, Machine, Method, Material, Measurement, Mother Nature)
- **Demo**: Live voorbeeld studentenrestaurant ("Lange rijen kassa")
- **Oefening**: Duo's maken Ishikawa voor pakketbezorging
- **Template**: Voorgestructureerd werkblad

**Block 2: Value Stream Mapping (15 min instructie + 10 min oefening)**
- **Wat**: Visualisatie processtappen + tijden
- **Key metrics**:
  ```
  Doorlooptijd = Bewerkingstijd + Wachttijd
  Value-added ratio = (Bewerkingstijd / Doorlooptijd) × 100%
  ```
- **Demo**: Online bestelproces (klik tot bezorging)
- **Oefening**: VSM voor zelfde pakketbezorging proces
- **Focus**: Value-adding vs. non-value-adding stappen identificeren

**Checkpoint**: "Begrijpen jullie het principe?" (thumbs up/down)

---

### Fase 2: ENHANCEMENT - Industry 4.0 Technologies (45-75 min)

#### Intro Industry 4.0 (5 min) - PURPOSE
**Wat verandert er?**
- Van handmatige analyse → Real-time data
- Van reactief → Predictief (voorspellen problemen)
- Van statisch → Dynamisch (continuous monitoring)

**Table VII Preview**: Toon matrix Lean Tools × Industry 4.0 Tech
- "Straks kiezen jullie zelf welke combinatie je wil uitwerken"

#### Interactieve Demo's (2 × 15 min = 30 min) - MASTERY

**Demo 1: Process Mining - "Wat gebeurt er NU?" (15 min)**
- **Positie in framework**: Linker pijler (Process Discovery)
- **Web-based tool**: Simulatie met synthetische ERP logs
- **Studenten zien**:
  - Real-time processtappen tracking uit event logs
  - Automatische bottleneck detectie
  - Afwijkingen van standaard proces (varianten)
  - TIM WOOD waste detection (Waiting, Rework)
- **Interactie**: Studenten kiezen scenario (Procurement / Customer Service / Order-to-Cash)
- **Vergelijk**: "Wat zie je hier dat je NIET zag in handmatige VSM?"
- **Lean 4.0 link**: VSM + IoT sensors = automatische procesontdekking

**Demo 2: Discrete Event Simulation - "Wat ALS we dit veranderen?" (15 min)**
- **Positie in framework**: Rechter pijler (Process Optimization)
- **Tool**: Interactieve simulatie (Healthcare clinic / Manufacturing line)
- **Studenten experimenteren**:
  - Wijzig parameters (aantal resources, service tijden, arrival rate)
  - Zie direct impact op wachttijden en doorlooptijd
  - Test verbeterscenario's zonder risico (virtual Kaizen)
- **Inzicht**: "What-if" analyses in seconden vs. uren handwerk
- **Gebruik**: Simuleer "meer verpleegkundigen" of "snellere machine" VOOR investering
- **Lean 4.0 link**: Kaizen + Digital Twin = risicovrij testen

#### Reflectiemoment (5-10 min)

**Optie A: Tool-Focused Reflectie (5 min - basis)**

**Vraag**: "Hoe vullen deze twee tools elkaar aan?"

- **Process Mining** (links): Ontdekt huidige werkelijkheid uit data
- **DES** (rechts): Test verbeteringen in virtuele omgeving
- **Digital Twin** (centrum): Combinatie = real-time optimalisatie
- **Trade-off discussie**:
  - **Kosten**: Sensoren, software, data-infrastructure
  - **Baten**: Snelheid, nauwkeurigheid, schaalbaarheid
  - **Conclusie**: Niet altijd beter, maar vaak complementair aan traditionele Lean

**Optie B: Case-Based Reflectie (10 min - recommended voor rijkere discussie)**

- **2 min**: Video fragment (docent kiest 1 case uit 4: Uber/Amazon/Microsoft/Dark Factories)
- **5 min**: Duo-discussie met 2-3 discussievragen uit gekozen case
- **3 min**: Plenaire debrief - "Wat maakt deze trade-off moeilijk? Welke stakeholders winnen/verliezen?"

**Case selectie guidance** (zie Student Workbook + Issue #4):

- **Uber/Amazon**: Relateerbaar (iedereen kent deze bedrijven), concrete worker impact
- **Microsoft**: Escalatie naar professional work, synthesis vraag over role of people
- **Dark Factories**: Visueel impressive, manufacturing focus
- **Timing trade-off**: +5 min hier → -5 min uit Fase 3 Borging intro (wordt leesmateriaal)

---

### Fase 3: INTEGRATION - Lean 4.0 in Actie (75-110 min)

#### Opdracht: "Hybride Procesverbetering" (35 min) - AUTONOMY + MASTERY

**Setup**:
Groepen van 3-4 studenten krijgen een case (keuze uit 3):
1. **Klantenservice callcenter**: Lange wachttijden, frustratie
2. **E-commerce warehouse**: Inefficiënte picking routes
3. **Productielijn bakkerij**: Inconsistente output kwaliteit

**Stap 1: Analyse met Table VII (15 min)**
- **Kies uit matrix**: Welke Lean tool + welke Industry 4.0 tech?
  - Bijv: VSM + Digital Twin simulation
  - Of: Ishikawa + AI-powered root cause analysis
  - Of: TIM WOOD + IoT sensor monitoring
- **Rationale**: Waarom past deze combinatie bij jullie case?
- **Werk uit**:
  - AS-IS analyse (huidige situatie)
  - TO-BE ontwerp (met jullie gekozen tools)
  - Impact inschatting (tijd/kosten besparing)

**Stap 2: Gallery Walk Presentatie (15 min)**
- Groepen hangen posters/flipovers op
- Studenten lopen rond, geven feedback op post-its
- Peer learning: "Welke andere combinaties zien we?"

**Stap 3: Borging & Implementatie (5 min instructie)**
- **Hoe borg je verbeteringen?**
  - Traditioneel: Procedures, training, KPI monitoring
  - Digital: Real-time dashboards, automated alerts, continuous feedback loops
- **Vraag aan groepen**: "Hoe ga je jouw verbetering borgen?"

#### Wrap-up Discussie (5 min)
**Trade-offs herbekijken**:
- Wanneer is simple Lean genoeg?
- Wanneer investeer je in Industry 4.0?
- MKB vs. grote corporates: verschillende strategieën?

---

### Fase 4: REFLECTIE & AFSLUITING (110-120 min)

#### Skill Progression Check (5 min) - MASTERY
**Zelfevaluatie checklist**:
- ✅ Ik kan een Ishikawa-diagram maken
- ✅ Ik kan een Value Stream Map opstellen
- ✅ Ik kan TIM WOOD verspillingen identificeren
- ✅ Ik begrijp hoe IoT/AI procesanalyse versterkt
- ✅ Ik kan kiezen tussen conventional vs. digital aanpak
- ✅ Ik kan een hybride Lean 4.0 verbeterplan maken

**Reflectievraag**: "Welke skill heb je vandaag het meest ontwikkeld?"

#### Purpose Closing (3 min)
- "Deze hybride benadering is precies wat bedrijven zoeken"
- "Jullie zijn nu klaar voor zowel traditionele als smart manufacturing omgevingen"
- "Stage tip: Vraag naar digitaliseringsprojecten, toon jullie Lean 4.0 kennis"

#### Vooruitblik (2 min)
- **Volgende week**: Recht & Structuur (andere kant van organisaties)
- **Thuisopdracht**: Optioneel verdiepen in één Industry 4.0 tech naar keuze
- **Extra materiaal**: Links naar video's, artikelen over Lean 4.0 cases

**Retrospective**: https://hanbedrijfskunde.github.io/retrospective/?workshop=ECONAN%20WK4
- Studenten scoren Purpose, Autonomy, Mastery (target: 5/5)

---

## 4. MATERIALEN & TOOLS

### 4.1 Voor Docent

**Presentatie** (max 20 slides):
1. Opening: Waiting Room Challenge video
2. Ishikawa uitleg + demo (3 slides)
3. VSM uitleg + demo (3 slides)
4. TIM WOOD overzicht (1 slide)
5. **Table VII: Lean Tools × Industry 4.0 Matrix** (1 slide - KERN)
6. Industry 4.0 intro (2 slides)
7. Demo screenshots (3 slides)
8. Opdracht uitleg (2 slides)
9. Reflectie + closing (2 slides)

**Docentenhandleiding** (1 pagina):
- Timing per activiteit (strikte time-boxing!)
- Antwoorden oefeningen
- Tips: "Wat als studenten vastlopen bij X?"
- Tech troubleshooting: "Als demo niet werkt, gebruik screenshots"

**Demo's** (web-based, vooraf testen!):
- Process Mining simulator (3 scenario's: Procurement, Customer Service, Order-to-Cash)
- Discrete Event Simulation tool (2 scenario's: Healthcare, Manufacturing)
- Digital Process Engineering diagram (printable A4)

**Backup**: Screenshots/video recordings als tech faalt

### 4.2 Voor Studenten

**Student Workbook** (7-8 pagina's PDF):
1. **Leerdoelen** + DOVE-cyclus mapping (waar draagt Week 4 aan bij?)
2. **Conventionele Lean cheat sheet**:
   - Ishikawa template (blank)
   - VSM symbolen
   - TIM WOOD uitleg + voorbeelden
   - Formules (doorlooptijd, value-added ratio)
3. **Digital Process Engineering framework** (diagram met uitleg 3 pijlers)
4. **Table VII: Lean × Industry 4.0 Matrix** (full page)
5. **Opdracht template**: AS-IS (D) / TO-BE (O) / Borging (V) / Impact (E)
6. **Skill Progression Checklist** (met DOVE-labels)
7. **Reflectievragen**
8. **Case Studies Pagina** (2-3 pagina's):
   - **4 case studies** (files: background-material/case-*.md):
     - Uber: "Quality vs. Excellence" (1 video, 5 discussie secties)
     - Dark Factories: "Gemba Walk in the Dark" (1 video, 6 discussie secties)
     - Amazon: "The 6th S: Substitute" (3 videos, 6 discussie secties)
     - Microsoft: "Genchi Genbutsu by Algorithm" (1 video, 6 discussie secties)
   - **Per case**: Executive summary (150-200 woorden) + 5-6 discussie secties + video links/QR codes
   - **Cross-case synthesis**: Automation Escalation table (low-skill → high-skill progression)
   - **Video totaal**: 6 videos (totale speeltijd ~30 min, fragmenten 2-4 min)
   - **Synthesis vraag**: "In an economy optimized by AI, what is the role of people?"
   - **Instructie**: "Kies 1-2 cases voor assignment reflectie (Criterium E: Evalueren, 20%)"

**Templates** (printbaar):
- Ishikawa diagram (A3 format)
- Value Stream Map (A3 format)
- Hybride verbeterplan canvas

**Digitale Resources**:
- Links naar demo tools
- Video tutorials (5-10 min):
  - "Ishikawa in 5 minuten"
  - "VSM basics"
  - "Intro to Digital Twins" (YouTube)
- **Lean Evolution Background** (optioneel verdiepingsmateriaal):
  - [lean-evolution.md](../background-material/lean-evolution.md) - Compacte samenvatting (Lean 1.0 → 5.0+)
  - Focus: "Respect for People" evolutie, Research gaps (Human/Sustainability/Technology)
  - Bruikbaar voor studenten die context willen bij "Waarom Lean 4.0?"

### 4.3 Interactieve Tools Specificaties

**Requirements**:
- Web-based (geen installatie)
- Werkt op studenten laptops/tablets
- Synthetische data ingebouwd
- Intuïtieve UI (geen training nodig)
- Nederlandse én Engelse interface

**Alternatieven als custom tools niet klaar**:
- Process mining: Disco (Fluxicon) free trial
- Simulation: Simul8 online demo / AnyLogic Cloud

---

## 5. ASSESSMENT

### 5.1 Formatieve Toetsing (tijdens les)

**Tussentijdse checks**:
- Na Ishikawa: "Thumbs check" + 2-3 groepen delen output
- Na VSM: Peer review met checklist
- Na demo's: "Welke technologie vind je het interessantst?" (poll)
- Gallery walk: Peer feedback op post-its

**Self-assessment**: Skill Progression Checklist aan eind les

### 5.2 Summatieve Toetsing (na les)

**Optie A: Individual Assignment** (aanbevolen, 1 week deadline)

**Opdracht**: "Lean 4.0 Procesverbetering Plan"

**Deliverables** (4-6 pagina's PDF):
1. **Kies een proces** (eigen stage/werk, of gegeven case)
2. **Conventionele analyse**:
   - Ishikawa diagram (min. 8 oorzaken)
   - Value Stream Map AS-IS
   - TIM WOOD analyse (identificeer min. 3 verspillingen)
3. **Industry 4.0 enhancement**:
   - Kies 2 technologieën uit Table VII die passen bij dit proces
   - Leg uit WAAROM deze keuze
   - Beschrijf hoe je ze zou implementeren
4. **TO-BE scenario**:
   - Verbeterde VSM met impact (tijd/kosten reductie)
   - Borgingsplan (traditionele KPI's + digital monitoring)
5. **Reflectie**: Trade-offs en implementatie-uitdagingen

**Optie B: Quiz** (Edumundo, 20 min)
- 10 meerkeuzevragen:
  - 5 over conventionele Lean (definities, formules, concepten)
  - 3 over Industry 4.0 technologieën (wanneer toepassen?)
  - 2 over Lean 4.0 integratie (trade-offs, beslissingen)

### 5.3 Beoordelingscriteria (Rubric voor Assignment)

| Criterium | DOVE | Gewicht | Onvoldoende | Voldoende | Goed | Excellent |
|-----------|------|---------|-------------|-----------|------|-----------|
| **Conventionele Lean Analyse** | **D** | 30% | Incomplete/onjuist | Correcte toepassing basis tools (Ishikawa, VSM, TIM WOOD) | Grondige diagnose, duidelijke inzichten | Innovatieve analyse, patronen ontdekt |
| **Industry 4.0 Keuze & Rationale** | **D** | 10% | Geen rationale | Keuze onderbouwd | Strategisch passend, goed uitgelegd | Perfect match met probleem |
| **TO-BE Ontwerp** | **O** | 30% | Geen echte verbetering | Realistische verbeteringen | Kwantitatieve impact (tijd/kosten), hybride aanpak | Overtuigende business case, meervoudige waardencreatie |
| **Borgingsplan** | **V** | 10% | Ontbreekt of vaag | Basis KPI's + monitoring benoemd | Concreet plan (procedures + digital dashboards) | Duurzame borging, change management |
| **Evaluatie & Reflectie** | **E** | 20% | Oppervlakkig | Trade-offs benoemd, impact geschat | Kritische analyse, metrieken gebruikt | Genuanceerd, strategisch inzicht, **case studies gebruikt voor diepere analyse**, lessons learned |

**DOVE-cyclus verdeling**: Diagnosticeren (40%), Ontwerpen (30%), Veranderen (10%), Evalueren (20%)

**Target**: 75% studenten haalt 6+ (propedeuseniveau)

---

## 6. APPENDIX: TABLE VII - LEAN × INDUSTRY 4.0 MATRIX

Deze tabel is het **hart van de les**. Studenten gebruiken dit als menu om hun eigen Lean 4.0 aanpak samen te stellen.

| # | Lean Tool | Industry 4.0 Technology | Doel van Integratie |
|---|-----------|-------------------------|---------------------|
| 1 | Gemba Walk | **Digital Twin** | Real-time monitoring van processen op afstand |
| 2 | 5S | **IoT Sensors** | Geautomatiseerde workplace conditie monitoring |
| 3 | Standardized Work | **Workflow Automation Software** | Digitale procescontrole en consistentie |
| 4 | Waste Analysis | **Big Data Analytics** | Verborgen inefficiënties ontdekken in datasets |
| 5 | Kaizen | **Collaborative Platforms** | Cross-functionele continuous improvement faciliteren |
| 6 | Value Stream Mapping | **Process Mapping Software** | Live procesvisualisatie met real-time data |
| 7 | Just-In-Time | **Automated Inventory Systems** | Demand-driven productie met IoT tracking |
| 8 | Kanban | **Digital Kanban Boards** | Real-time workflow visibility en scheduling |
| 9 | Poka-Yoke | **Sensor-Based Error Detection** | Automatische defect preventie en correctie |
| 10 | Jidoka | **AI-Powered Monitoring** | Autonome kwaliteitscontrole en anomalie detectie |
| 11 | Root Cause Analysis | **Machine Learning Algorithms** | Predictive RCA op basis van historische data |
| 12 | Bottleneck Analysis | **Simulation & Modeling Tools** | Virtuele testing van proces-optimalisaties |
| 13 | TPM | **Predictive Maintenance Tools** | Voorspel storingen voordat ze gebeuren |
| 14 | Takt Time | **Production Planning Tools** | Dynamische sync met real-time demand |
| 15 | Andon | **Real-Time Alert Systems** | Instant notificaties en rapid response |

**Gebruik in les**:
- Studenten krijgen deze tabel als handout
- In Fase 3 kiezen zij 1-2 combinaties voor hun case
- Discussie: "Welke combinaties zijn het meest krachtig?"
- Reflectie: "Welke zijn overkill voor kleine bedrijven?"

---

## 7. IMPLEMENTATIE TIPS VOOR WITEK

### 7.1 Voorbereiding (2-3 uur)
- [ ] Test alle web-based demo's (2 tools: Process Mining + DES)
- [ ] Print templates (1 set per 4 studenten) + Digital Process Engineering diagram
- [ ] **[Als cases gebruikt]** Test/download video fragments (6 videos: Uber 8:28, Dark Factories 5:14, Amazon 3×2-4min, Microsoft 3:30)
- [ ] **[Als cases gebruikt]** Kies welke case(s) voor reflectiemoment (zie case selection guidance H3)
- [ ] Check: Beamer, WiFi, toegang tot demo sites **+ YouTube/streaming toegang**
- [ ] Bereid backup plan: screenshots als tech faalt **+ video fallback (prepared screenshots + verbal summary)**
- [ ] Lees Lean 4.0 artikel door voor eigen verdieping

### 7.2 Tijdens Les - Time Management
**Strikte time-boxing essentieel!**
- Stel timer voor elke fase
- Bij uitloop: schrap verdieping, behoud kern
- Prioriteit: Studenten moeten demo's echt GEBRUIKEN (niet alleen zien)

**Rolgedrag**:
- Facilitator, niet lecturer (max 15 min praten achter elkaar)
- Rondlopen tijdens oefeningen, individuele feedback
- Bij demo's: Laat studenten buttons klikken, niet alleen showcase

### 7.3 Differentiatie on-the-fly
**Voor snelle studenten**:
- "Probeer ook combinatie X uit Table VII"
- "Kan je kwantitatieve ROI berekenen?"
- "Design een dashboard voor deze case"

**Voor studenten die vastlopen**:
- "Begin met alleen Ishikawa, VSM toevoegen is optioneel"
- "Kies de simpelste tech: IoT Sensors + basic monitoring"
- Buddy system: Koppel aan sterkere groep voor peer learning

### 7.4 Na de Les
- Check retrospective scores (target: 5/5 op P-A-M)
- Als Purpose < 5: Versterken opening volgende keer
- Als Autonomy < 5: Meer keuzes inbouwen
- Als Mastery < 5: Demo's interactiever maken, meer hands-on tijd

### 7.5 Troubleshooting
| Probleem | Oplossing |
|----------|-----------|
| Demo site crashed | → Gebruik backup screenshots + storytelling |
| Studenten begrijpen Table VII niet | → Extra voorbeeld live doorlopen |
| Tijdnood | → Skip Borging (wordt leesmateriaal), focus op core |
| Lage engagement | → Verklein groepen, geef individuele challenges |

---

## 8. SUCCESS METRICS

**Tijdens les**:
- ✅ 80%+ studenten werkt actief mee met demo's
- ✅ Alle groepen kiezen zelfstandig uit Table VII
- ✅ Gallery walk genereert min. 3 feedback items per poster

**Na les**:
- ✅ Retrospective scores: gemiddeld 4.5+ op P-A-M
- ✅ Assignment/quiz: 75%+ haalt 6 of hoger
- ✅ Student feedback: "Ik snap nu wanneer digitalisering zinvol is"
- ✅ **[Als cases gebruikt]** 50%+ studenten gebruikt minimaal 1 case in assignment reflectie
- ✅ **[Als cases gebruikt]** Reflecties zijn genuanceerd ("het hangt ervan af...") ipv simplistisch
- ✅ **[Als cases gebruikt]** Poll na reflectie: 70%+ vindt case "eye-opening" of "relevant"

**Long-term**:
- Studenten passen Lean 4.0 denken toe in stages
- Vragen in Q&A: "Hoe implementeer ik dit bij bedrijf X?"
- Alumni feedback: "Deze les was super relevant voor mijn werk"

---

## 9. DEVELOPMENT TRACKING

### GitHub Issues - Week 4 Components

**Tools** (Priority: High):

- [Issue #1](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/1): Process Mining Simulator
  - Status: OPEN | PRD: [prd-process-mining.md](prd-process-mining.md)
  - 3 scenarios: Procurement, Customer Service, Order-to-Cash

- [Issue #2](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/2): Discrete Event Simulation
  - Status: OPEN | PRD: [prd-discrete-event-simulation.md](prd-discrete-event-simulation.md)
  - 2 scenarios: Healthcare, Manufacturing

**Content** (Priority: Medium):

- [Issue #4](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/4): Case Studies
  - Status: OPEN | Case Files: background-material/case-*.md (4 files completed ✅)
  - Deliverables: Student Workbook pagina (⏳), Docentenhandleiding keuzewijzer (⏳), Video fragments (⏳)

**Enhancement** (Priority: Low):

- [Issue #3](https://github.com/hanbedrijfskunde/ontwikkeling-theoom/issues/3): Monte Carlo Simulation
  - Status: OPEN | Optional advanced tool

### Case Study Files Status

| Case | File | Lines | Videos | Discussion Sections | Status |
|------|------|-------|--------|---------------------|--------|
| Uber | case-uber.md | 348 | 1 | 5 | ✅ Complete |
| Dark Factories | case-dark-factories.md | 301 | 1 | 6 | ✅ Complete |
| Amazon | case-amazon-robots.md | 933 | 3 | 6 | ✅ Complete |
| Microsoft | case-microsoft-ai-diagnosis.md | 427 | 1 | 6 | ✅ Complete |

**Total**: 2009 lines, 6 videos, 23 discussion sections with DOVE/Table VII/TIM WOOD links

### Background Materials

- **Lean Evolution**: [lean-evolution.md](../background-material/lean-evolution.md) (232 lines) - Lean 1.0 → 5.0+ progression
- **Digital Process Engineering**: Framework diagram (JPG + SVG formats)
- **PRDs**: 2 complete product requirement documents (4172 lines total)

---

## 10. REFERENTIES

Gomaa, A. H. (2025). Lean 4.0: A Strategic Roadmap for Operational Excellence and Innovation in Smart Manufacturing. *International Journal of Emerging Science and Engineering (IJESE)*, *13*(4), 1-14.

---

**EINDE LEARNING REQUIREMENT DOCUMENT**

*Dit is een levend document. Na eerste uitvoering updaten op basis van ervaringen en student feedback.*

---

## QUICK REFERENCE CARD VOOR WITEK

**Lesopbouw in 1 oogopslag**:

```
0-10:   Opening (Waiting Room Challenge)
10-25:  Ishikawa (instructie + oefening)
25-45:  VSM (instructie + oefening)
45-50:  Industry 4.0 intro + Table VII
50-80:  Demo's (2× 15 min: Process Mining + DES) - studenten experimenteren!
80-105: Hybride opdracht (Table VII toepassen)
105-110: Borging intro
110-120: Reflectie + closing
```

**Materialen checklist**:
- [ ] Presentatie (20 slides)
- [ ] Student Workbook (6 pagina's)
- [ ] Templates geprint (Ishikawa, VSM, Table VII)
- [ ] Demo URLs getest
- [ ] Backup screenshots klaar

**Mantra**: KISS, Time-box, Hands-on, Hybrid!
