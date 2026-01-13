# Everyday Lending Wireframes
> ASCII wireframes and system flows for the investor portal

## Overview

These wireframes define the user interface for Everyday Lending's investor-facing portal. Each page is designed with **simplicity** and **innovation** in mind, focusing on explainable metrics and transparent calculations.

---

## Design Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   1. EXPLAINABILITY                                                         │
│      Every number traces back to a formula. No black boxes.                │
│                                                                             │
│   2. COMPARE, NEVER RECOMMEND                                               │
│      System surfaces data. Investor makes decisions.                       │
│                                                                             │
│   3. PROACTIVE ALERTS                                                       │
│      Surface problems early. Warning at 80%, critical at breach.           │
│                                                                             │
│   4. GOAL-DRIVEN PERSONALIZATION                                            │
│      Dashboard adapts to investor's stated objectives.                     │
│                                                                             │
│   5. MOBILE-FIRST SIMPLICITY                                                │
│      Core actions accessible on any device.                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Page Index

| # | Page | Primary Actions | File |
|---|------|-----------------|------|
| 1 | [Dashboard](./01-dashboard.md) | View Portfolio Summary, Quick Invest | Goal-based variants |
| 2 | [Investments](./02-investments.md) | Start New Investment, Track Notes | Multi-step investment flow |
| 3 | [Deal Intelligence](./03-deal-intelligence.md) | Compare Deals, View IDS Breakdown | Explainable scoring |
| 4 | [Portfolio Risk](./04-portfolio.md) | View Concentration, Run Stress Test | PRI monitoring |
| 5 | [Payments](./05-payments.md) | View History, Update Bank | Payment tracking |
| 6 | [Documents](./06-documents.md) | Download Docs, Upload Required | Compliance vault |

---

## Information Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           EVERYDAY LENDING PORTAL                           │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          NAVIGATION                                 │   │
│   │                                                                     │   │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │   │
│   │   │  DASH   │  │ INVEST  │  │  DEALS  │  │ PORTF.  │  │  PYMTS  │  │   │
│   │   │         │  │         │  │         │  │         │  │         │  │   │
│   │   │ Summary │  │  Notes  │  │   IDS   │  │   PRI   │  │ History │  │   │
│   │   │ Alerts  │  │   New   │  │ Compare │  │ Stress  │  │  Bank   │  │   │
│   │   └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  │   │
│   │                                                                     │   │
│   │   ┌─────────┐  ┌─────────────────────────────────────────────────┐  │   │
│   │   │  DOCS   │  │                  SETTINGS                       │  │   │
│   │   │         │  │                                                 │  │   │
│   │   │  Vault  │  │  Profile · Goals · Notifications · Security    │  │   │
│   │   │ Upload  │  │                                                 │  │   │
│   │   └─────────┘  └─────────────────────────────────────────────────┘  │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## User Journey Map

```
                              ┌────────────────┐
                              │   ONBOARDING   │
                              │   (7 steps)    │
                              └───────┬────────┘
                                      │
                                      ▼
                              ┌────────────────┐
                              │   DASHBOARD    │
                              │ (personalized) │
                              └───────┬────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
   ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
   │   RESEARCH   │           │    INVEST    │           │   MONITOR    │
   │              │           │              │           │              │
   │ Deal Intel   │           │ New Note     │           │ Portfolio    │
   │ Compare IDS  │           │ Term Select  │           │ Risk (PRI)   │
   │              │           │ Confirm      │           │ Payments     │
   └──────────────┘           └──────────────┘           └──────────────┘
          │                           │                           │
          └───────────────────────────┼───────────────────────────┘
                                      │
                                      ▼
                              ┌────────────────┐
                              │   DOCUMENTS    │
                              │   & REPORTS    │
                              └────────────────┘
```

---

## Key Metrics Display

### IDS (Investor Deal Score)

```
IDS Score: 0-100

Display Format:
┌─────────────────────────────────────────┐
│   Phoenix Multifamily         IDS: 78   │
│   ████████████████████████████░░░░░░░░  │
│                            (78/100)     │
└─────────────────────────────────────────┘

Components (visible on breakdown):
- Net Yield Score (30%)
- Downside Protection (25%)
- Risk Quality (20%)
- Duration & Liquidity (15%)
- Confidence Factor (10%)
```

### PRI (Portfolio Risk Index)

```
PRI Score: 0-100 (lower is better)

Display Format:
┌─────────────────────────────────────────┐
│   Portfolio Risk Index                  │
│                                         │
│         38                              │
│       ──────                            │
│      MODERATE                           │
│                                         │
│   ░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░  │
│   0    25    45    65    80    100     │
│        Cons  Mod   Elev  High          │
└─────────────────────────────────────────┘

Bands:
- 0-25: Conservative (green)
- 26-45: Moderate (blue)
- 46-65: Elevated (yellow)
- 66-80: High (orange)
- 81-100: Critical (red)
```

---

## Common Components

### Progress Indicators

```
Linear Progress:
████████████████░░░░░░░░░░░░  65%

Countdown:
●━━━━━━━━━━━━━━━━━━━━━○
Jan 1              Feb 1
         19 days

Score Gauge:
     ┌─────────────────┐
     │       78        │
     │     ───────     │
     │    ABOVE AVG    │
     └─────────────────┘
```

### Action States

```
Primary Button:   [ Start New Investment ]
Secondary:        [ View Details ]
Disabled:         [ Submit ] (grayed)
Loading:          [ ◐ Processing... ]
Success:          [ ✓ Completed ]
```

### Alert Levels

```
Info:     ℹ️  Informational message
Warning:  ⚠️  Approaching threshold (80%)
Critical: 🔴 Threshold breached
Success:  ✓  Action completed
```

---

## Responsive Breakpoints

| Viewport | Width | Layout |
|----------|-------|--------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640-1024px | Two column, collapsible sidebar |
| Desktop | > 1024px | Full sidebar, multi-column grids |

---

## Interaction Patterns

### Drill-Down Pattern
```
Summary Card → Detail View → Raw Calculation
   (click)        (click)
```

### Compare Pattern
```
Select Item A → Select Item B → View Side-by-Side
   (check)          (check)        (auto)
```

### Progressive Disclosure
```
Collapsed View (default) → Expanded Details (on demand)
      [ View More ]           [ Show Less ]
```

---

## AI Integration Points

AI explanations appear contextually when:

1. **Score Changes**: IDS or PRI moves significantly
2. **Comparisons**: Natural language summarizing differences
3. **Alerts**: Explaining why a threshold was triggered
4. **On Request**: User clicks "Explain" on any metric

```
┌─────────────────────────────────────────────────────────────────┐
│  AI EXPLANATION                                                  │
│                                                                  │
│  "Your IDS score increased 6 points primarily because the       │
│   borrower secured a purchase agreement, reducing exit risk."   │
│                                                                  │
│  ⚠️ AI explains. AI never recommends.                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

1. **Prototype**: Convert ASCII wireframes to interactive Figma/Sketch
2. **User Testing**: Validate flows with target investors
3. **Component Library**: Build shadcn/ui components matching wireframes
4. **Implementation**: Develop pages following these specifications

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-13 | Initial wireframes for all 6 core pages |
