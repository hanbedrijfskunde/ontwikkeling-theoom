# Bijdragen aan THEOOM Ontwikkeling

Bedankt voor je interesse om bij te dragen aan de ontwikkeling van THEOOM lesmateriaal! 🎓

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Lesmateriaal Standards](#lesmateriaal-standards)

## 🚀 Getting Started

1. **Fork de repository**
2. **Clone je fork lokaal**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ontwikkeling-theoom.git
   cd ontwikkeling-theoom
   ```
3. **Maak een nieuwe branch**
   ```bash
   git checkout -b feature/jouw-feature-naam
   # of
   git checkout -b fix/issue-nummer
   ```

## 📝 Issue Guidelines

### Een Nieuw Issue Aanmaken

1. **Check eerst** of het issue al bestaat
2. **Gebruik de juiste template**:
   - 📝 Lesmateriaal Ontwikkeling
   - 🐛 Bug Report
   - 💡 Feature Request
   - 📖 Documentatie
   - 👀 Review Request
   - 🔧 Tool Development
   - ⚡ Quick Fix

3. **Geef duidelijke informatie**:
   - Beschrijvende titel
   - Alle verplichte velden ingevuld
   - Screenshots/voorbeelden waar relevant
   - Duidelijke acceptatiecriteria

### Labels

We gebruiken labels om issues te organiseren:

**Prioriteit:**
- `priority: critical` - Onmiddellijke actie vereist
- `priority: high` - Binnen 1 week
- `priority: medium` - Binnen 2 weken
- `priority: low` - Wanneer tijd is

**Type:**
- `type: bug` - Iets werkt niet
- `type: feature` - Nieuwe functionaliteit
- `type: documentation` - Documentatie
- `type: tool` - Interactieve tool/simulatie

**Status:**
- `status: review` - Wacht op review
- `status: in-progress` - In ontwikkeling
- `status: blocked` - Geblokkeerd
- `status: ready` - Klaar voor implementatie

**Lesweek:**
- `week: 1` t/m `week: 5`

## 🔄 Pull Request Process

### 1. Voordat je begint

- [ ] Issue bestaat en is toegewezen
- [ ] Branch naam is beschrijvend (`feature/lean-40-demo` of `fix/issue-123`)
- [ ] Je hebt de laatste `main` branch gepulled

### 2. Tijdens ontwikkeling

- [ ] Commits zijn klein en beschrijvend
- [ ] Commit messages zijn duidelijk
- [ ] Regelmatig pushen naar je fork

### 3. Pull Request indienen

- [ ] Gebruik de PR template
- [ ] Link naar gerelateerde issues
- [ ] Vul alle checklist items in
- [ ] Voeg screenshots/voorbeelden toe
- [ ] Request review van teamleden

### 4. Na review

- [ ] Verwerk feedback
- [ ] Update PR met wijzigingen
- [ ] Wacht op final approval

### 5. Merge

- Na approval zal een maintainer je PR mergen
- Je branch wordt automatisch verwijderd

## 💻 Coding Standards

### Markdown Bestanden

```markdown
# Gebruik H1 voor document titel
## H2 voor hoofdsecties
### H3 voor subsecties

- Gebruik `-` voor unordered lists
- Niet `*` of `+`

1. Gebruik cijfers voor ordered lists
2. Begin altijd bij 1

**Bold** voor emphasis
*Italic* voor definitions

[Links](url) met beschrijvende tekst
```

### Bestandsnaamconventies

```
✅ GOED:
- lrd-lesweek-4-lean-40.md
- presentatie-procesanalyse.pptx
- template-ishikawa-diagram.pdf
- demo-process-mining.html

❌ SLECHT:
- LRD Week 4.md (spaties, hoofdletters)
- pres_final_FINAL_v2.pptx (versiebeheer)
- Template1.pdf (onduidelijk)
```

### Directory Structuur

```
ontwikkeling-theoom/
├── project-documents/     # LRD's, planningen
├── background-material/   # Artikelen, cases
├── presentations/         # PowerPoint slides
├── workbooks/            # Student workbooks
├── templates/            # Werkbladen, templates
├── demos/                # Interactieve tools
└── assessments/          # Toetsmateriaal
```

## 📚 Lesmateriaal Standards

### Learning Requirement Document (LRD)

Elk LRD moet bevatten:

1. **Executive Summary**
   - Kern van de les
   - Unique value proposition
   - Positionering in curriculum

2. **Leerdoelen**
   - Hoofdleerdoel
   - Specifieke leerdoelen (SMART)
   - Kerncompetenties

3. **Lesstructuur**
   - Timing (totaal 120 min)
   - Fasen met duidelijke PURPOSE/AUTONOMY/MASTERY link
   - Activiteiten beschrijvingen

4. **Materialen & Tools**
   - Voor docent
   - Voor studenten
   - Technische requirements

5. **Assessment**
   - Formatieve toetsing
   - Summatieve toetsing
   - Rubric

### Purpose-Autonomy-Mastery Design

Alle lessen moeten scoren op:

**Purpose (Target: 5/5)**
- Duidelijke relevantie
- Real-world connecties
- Toekomstperspectief

**Autonomy (Target: 5/5)**
- Studentkeuzes
- Verschillende werkvormen
- "Overweeg" taalgebruik (niet "je moet")

**Mastery (Target: 5/5)**
- Goldilocks tasks (niet te makkelijk/moeilijk)
- Zichtbare voortgang
- Immediate feedback

### Presentaties

- **Max 20-25 slides** voor 2-uur sessie
- **10/20/30 regel**: 10 slides, 20 minuten, 30pt font minimum
- **Veel visuals**, weinig tekst
- **Consistent design** door alle weken
- **Toegankelijk**: Kleurenblindheid-vriendelijk, voldoende contrast

### Student Workbooks

- **Max 6-8 pagina's**
- **Printklaar** (A4, zwart-wit ok)
- **Duidelijke structuur**:
  - Leerdoelen
  - Theorie (compact)
  - Oefeningen met ruimte voor antwoorden
  - Reflectievragen
- **Templates** ingebouwd waar nodig

### Interactieve Tools/Demo's

- **Web-based** (geen installatie)
- **Cross-browser** compatible (Chrome, Firefox, Safari)
- **Mobile-friendly** (tablets)
- **Laadtijd < 3 sec**
- **Intuïtieve UI** (geen uitleg nodig)
- **Synthetische data** ingebouwd
- **Fallback** voor offline gebruik

## 🧪 Testing

### Voor Lesmateriaal

- [ ] Spelling & grammatica check
- [ ] Links werken allemaal
- [ ] Bestanden openen correct
- [ ] Templates zijn printklaar
- [ ] Demo's werken in minimaal 2 browsers
- [ ] Timing is realistisch (test met collega)

### Voor Tools

- [ ] Unit tests (indien van toepassing)
- [ ] Browser testing (Chrome, Firefox, Safari)
- [ ] Mobile testing (tablet)
- [ ] Load testing (20+ simultane gebruikers)
- [ ] Error handling werkt
- [ ] Backup data beschikbaar

## 📞 Contact

Vragen? Neem contact op via:

- **GitHub Issues**: Voor bugs en features
- **GitHub Discussions**: Voor algemene vragen
- **Email**: [team email]

## 📜 Licentie

Door bij te dragen ga je akkoord met de licentie van dit project.

---

**Bedankt voor je bijdrage! 🎉**
