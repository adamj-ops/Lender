# Deal Intelligence Wireframe
> Explainable, comparable deal metrics powered by IDS

## Primary Actions
```
┌─────────────────────────────────────────────────────────────────┐
│  ① COMPARE DEALS             ② VIEW SCORE BREAKDOWN            │
│     Side-by-side analysis       Understand the "why"            │
└─────────────────────────────────────────────────────────────────┘
```

---

## ASCII Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ┌────────┐                                                    ┌────────────┐ │
│ │   EL   │  Everyday Lending                          John D. │  ●  ▼     │ │
│ └────────┘                                                    └────────────┘ │
├────────────┬─────────────────────────────────────────────────────────────────┤
│            │                                                                 │
│   Dash     │  Deal Intelligence                                              │
│   Invest   │                                                                 │
│ ┌────────┐ │  ┌───────────────────────────────────────────────────────────┐  │
│ │■ Deals │ │  │  WHAT IS IDS?                                             │  │
│ └────────┘ │  │  Investor Deal Score (0-100) measures deal attractiveness │  │
│   Portf.   │  │  relative to other uses of your capital. Higher = better. │  │
│   Payments │  │                                               [ Learn More]│  │
│   Docs     │  └───────────────────────────────────────────────────────────┘  │
│            │                                                                 │
│ ─────────  │  ┌───────────────────────────────────────────────────────────┐  │
│   Settings │  │  AVAILABLE DEALS                    [Compare Mode ①]      │  │
│   Help     │  ├───────────────────────────────────────────────────────────┤  │
│            │  │                                                           │  │
│            │  │  ┌─────────────────────────────────────────────────────┐  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   Phoenix Multifamily                    IDS: 78    │  │  │
│            │  │  │   ─────────────────────────────────────────────     │  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   ┌────────────────────────────────────────────┐    │  │  │
│            │  │  │   │  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■░░░░░░░░░  │    │  │  │
│            │  │  │   │  ████████████████████████████░░░░░░░░░░░  │    │  │  │
│            │  │  │   └────────────────────────────────────────────┘    │  │  │
│            │  │  │                                          78/100     │  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   Fix & Flip · 12mo · $1.2M        11.5% Net Yield  │  │  │
│            │  │  │   LTV: 68% · LTC: 82%                               │  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   [View Breakdown ②]              [ □ Compare ]     │  │  │
│            │  │  └─────────────────────────────────────────────────────┘  │  │
│            │  │                                                           │  │
│            │  │  ┌─────────────────────────────────────────────────────┐  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   Austin Bridge Loan                     IDS: 72    │  │  │
│            │  │  │   ─────────────────────────────────────────────     │  │  │
│            │  │  │   ████████████████████████░░░░░░░░░░░░░░░░░░░░      │  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   Bridge · 24mo · $850K            10.2% Net Yield  │  │  │
│            │  │  │   LTV: 71% · LTC: 85%                               │  │  │
│            │  │  │                                                     │  │  │
│            │  │  │   [View Breakdown]                 [ □ Compare ]    │  │  │
│            │  │  └─────────────────────────────────────────────────────┘  │  │
│            │  │                                                           │  │
│            │  └───────────────────────────────────────────────────────────┘  │
└────────────┴─────────────────────────────────────────────────────────────────┘
```

---

## IDS Score Breakdown View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ← Back to Deals                                                           │
│                                                                             │
│   Phoenix Multifamily                                           IDS: 78    │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         SCORE BREAKDOWN                      [②]   │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │   Net Yield Score                    30% weight           82/100   │   │
│   │   ████████████████████████████████░░░░░░░░░░                       │   │
│   │   Net yield of 11.5% is strong (above 10% threshold)               │   │
│   │                                                                     │   │
│   │   ─────────────────────────────────────────────────────────────    │   │
│   │                                                                     │   │
│   │   Downside Protection                25% weight           75/100   │   │
│   │   ███████████████████████████░░░░░░░░░░░░░                         │   │
│   │   LTV 68% provides 7% equity cushion below 75% cap                 │   │
│   │                                                                     │   │
│   │   ─────────────────────────────────────────────────────────────    │   │
│   │                                                                     │   │
│   │   Risk Quality                       20% weight           70/100   │   │
│   │   ██████████████████████████░░░░░░░░░░░░░░                         │   │
│   │   Risk score of 30 indicates medium-low risk profile               │   │
│   │                                                                     │   │
│   │   ─────────────────────────────────────────────────────────────    │   │
│   │                                                                     │   │
│   │   Duration & Liquidity               15% weight           85/100   │   │
│   │   █████████████████████████████████░░░░░░░░░                       │   │
│   │   12-month term with contracted exit (purchase agreement)          │   │
│   │                                                                     │   │
│   │   ─────────────────────────────────────────────────────────────    │   │
│   │                                                                     │   │
│   │   Confidence Factor                  10% weight           80/100   │   │
│   │   ████████████████████████████████░░░░░░░░░░                       │   │
│   │   Complete data, reliable ARV appraisal, experienced borrower      │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  CALCULATION TRANSPARENCY                                           │   │
│   │                                                                     │   │
│   │  IDS = (0.30 × 82) + (0.25 × 75) + (0.20 × 70)                     │   │
│   │      + (0.15 × 85) + (0.10 × 80)                                   │   │
│   │      = 24.6 + 18.75 + 14 + 12.75 + 8 = 78.1                        │   │
│   │                                                                     │   │
│   │  All scores traceable to underlying metrics.                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Compare Mode

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   COMPARE DEALS                                    [Exit Compare Mode]  [①] │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│   ┌─────────────────────────┐  ┌─────────────────────────┐                  │
│   │   Phoenix Multifamily   │  │   Austin Bridge Loan    │                  │
│   │          IDS: 78        │  │          IDS: 72        │                  │
│   │   ████████████████░░░░  │  │   ██████████████░░░░░░  │                  │
│   └─────────────────────────┘  └─────────────────────────┘                  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  COMPONENT              PHOENIX           AUSTIN          WINNER   │   │
│   │  ─────────────────────────────────────────────────────────────────  │   │
│   │                                                                     │   │
│   │  Net Yield (30%)         82               68               ◀ PHX   │   │
│   │                      █████████░        ██████░░░                    │   │
│   │                                                                     │   │
│   │  Protection (25%)        75               78               AUS ▶   │   │
│   │                      ███████░░░       ████████░░                    │   │
│   │                                                                     │   │
│   │  Risk Quality (20%)      70               72               AUS ▶   │   │
│   │                      ███████░░░       ███████░░░                    │   │
│   │                                                                     │   │
│   │  Duration (15%)          85               65               ◀ PHX   │   │
│   │                      ████████░░       ██████░░░░                    │   │
│   │                                                                     │   │
│   │  Confidence (10%)        80               75               ◀ PHX   │   │
│   │                      ████████░░       ███████░░░                    │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  KEY DIFFERENCES                                                    │   │
│   │                                                                     │   │
│   │  • Phoenix has higher net yield (11.5% vs 10.2%)                   │   │
│   │  • Austin has stronger downside protection (LTV 71% vs 68%)        │   │
│   │  • Phoenix has clearer exit (contracted vs refinance dependent)    │   │
│   │                                                                     │   │
│   │  No recommendation - data presented for your decision.              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## AI Explanation Panel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  ✨ AI EXPLANATION                              Confidence: HIGH    │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │  WHAT CHANGED                                                       │   │
│   │  IDS increased from 72 to 78 (+6 points)                           │   │
│   │                                                                     │   │
│   │  WHY IT MATTERS                                                     │   │
│   │  The score improved primarily due to:                              │   │
│   │  • Borrower secured purchase agreement for exit (+10 duration)     │   │
│   │  • Updated appraisal confirmed ARV (+5 confidence)                 │   │
│   │  • LTV improved from 71% to 68% after additional equity (+3 prot.) │   │
│   │                                                                     │   │
│   │  CONSIDERATIONS                                                     │   │
│   │  • This deal now ranks in the top quartile of current offerings    │   │
│   │  • The contracted exit reduces refinance dependency risk           │   │
│   │  • Phoenix market concentration should be monitored (see PRI)      │   │
│   │                                                                     │   │
│   │  ─────────────────────────────────────────────────────────────────  │   │
│   │  ⚠️ AI explains scores but does not make recommendations.          │   │
│   │     Investment decisions are solely at your discretion.            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## User Flow

```
                      ┌──────────────────┐
                      │ DEAL INTELLIGENCE│
                      └────────┬─────────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │    BROWSE    │   │   COMPARE    │   │    FILTER    │
    │    DEALS     │   │    DEALS     │   │   BY TYPE    │
    └──────┬───────┘   │     [①]      │   └──────────────┘
           │           └──────┬───────┘
           ▼                  │
    ┌──────────────┐          │
    │     VIEW     │          │
    │  BREAKDOWN   │◀─────────┘
    │     [②]      │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │     SEE      │
    │  CALCULATION │
    │  TRANSPARENCY│
    └──────────────┘
```

---

## Key Notes

1. **Explainability First**: Every score component explained in plain English

2. **No Black Box**: Full formula transparency with "show your work"

3. **Compare, Don't Recommend**: System surfaces data, never tells investor what to do

4. **AI Guardrails**: AI only explains, never recommends or prescribes action

5. **Visual Hierarchy**: IDS score is prominent, breakdown on demand

---

## Score Visualization

```
IDS Score Visual Encoding:

  0-40        41-60       61-80        81-100
  ────────    ────────    ────────     ────────
  ░░░░░░░░    ████░░░░    ██████░░     ████████

  Lower       Average     Above Avg    Excellent
  Quartile    Range       Range        Range
```

---

## Mobile Considerations

```
┌─────────────────────────┐
│ Deal Intelligence       │
│                         │
│ ┌─────────────────────┐ │
│ │ Phoenix Multifamily │ │
│ │         IDS: 78     │ │
│ │ ████████████████░░  │ │
│ │                     │ │
│ │ Fix & Flip · 12mo   │ │
│ │ 11.5% Net Yield     │ │
│ │                     │ │
│ │ [View] [+ Compare]  │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Austin Bridge       │ │
│ │         IDS: 72     │ │
│ │ ██████████████░░░░  │ │
│ │                     │ │
│ │ Bridge · 24mo       │ │
│ │ 10.2% Net Yield     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Compare (2 selected)│ │
│ └─────────────────────┘ │
└─────────────────────────┘
```
