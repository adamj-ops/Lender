# Dashboard Wireframe
> The investor's command center - everything at a glance

## Primary Actions
```
┌─────────────────────────────────────────────────────────────────┐
│  ① NEW INVESTMENT        ② VIEW PAYMENT CALENDAR               │
│     Add capital             See upcoming payments               │
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
│ ┌────────┐ │  Good morning, John                    ┌──────────────────────┐ │
│ │ ■ Dash │ │                                        │ + NEW INVESTMENT [①] │ │
│ └────────┘ │  Here's your portfolio at a glance     └──────────────────────┘ │
│            │                                                                 │
│   Invest   │  ┌─────────────────────────────────────────────────────────────┐│
│   Deals    │  │                    HERO METRIC                              ││
│   Portf.   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐││
│   Payments │  │  │ $500,000 │ │  $42.5K  │ │  $4,167  │ │    9.4% APY      │││
│   Docs     │  │  │ Invested │ │  Earned  │ │ Next Pmt │ │ Blended Return   │││
│            │  │  │          │ │  +8.5%▲  │ │  Feb 1   │ │ ████████████░░   │││
│ ─────────  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘││
│   Settings │  └─────────────────────────────────────────────────────────────┘│
│   Help     │                                                                 │
│            │  ┌─────────────────────────────────┐ ┌─────────────────────────┐│
│            │  │ ACTIVE NOTES                    │ │ UPCOMING PAYMENTS   [②]││
│            │  │                                 │ │                         ││
│            │  │ ┌─────────────────────────────┐ │ │  Feb 1   $4,166.67  ──● ││
│            │  │ │ EL-2025-001    ████████░░░░ │ │ │  Mar 1   $4,166.67  ──○ ││
│            │  │ │ $200K · 12mo · 10%    6/12  │ │ │  Apr 1   $4,166.67  ──○ ││
│            │  │ └─────────────────────────────┘ │ │                         ││
│            │  │ ┌─────────────────────────────┐ │ │  ┌───────────────────┐  ││
│            │  │ │ EL-2025-002    █████░░░░░░░ │ │ │  │ View Full Calendar│  ││
│            │  │ │ $150K · 6mo · 8.4%    3/6   │ │ │  └───────────────────┘  ││
│            │  │ └─────────────────────────────┘ │ │                         ││
│            │  │ ┌─────────────────────────────┐ │ └─────────────────────────┘│
│            │  │ │ EL-2025-003    ██░░░░░░░░░░ │ │                            │
│            │  │ │ $150K · 12mo · 10%    2/12  │ │ ┌─────────────────────────┐│
│            │  │ └─────────────────────────────┘ │ │ GOAL PROGRESS           ││
│            │  │                                 │ │                         ││
│            │  │  [View All Notes →]             │ │  Monthly Income         ││
│            │  └─────────────────────────────────┘ │  ████████████░░░░ 78%   ││
│            │                                      │                         ││
│            │                                      │  Target: $5K/mo         ││
│            │                                      │  Current: $3.9K/mo      ││
│            │                                      └─────────────────────────┘│
└────────────┴─────────────────────────────────────────────────────────────────┘
```

---

## Layout Variants by Goal Type

### Income-Focused Dashboard
```
┌──────────────────────────────────────────────────────────────┐
│  HERO: Monthly Income        │  HERO: Next Payment Date     │
│         $4,166/mo            │         Feb 1, 2026          │
├──────────────────────────────┼──────────────────────────────┤
│  Payment Calendar (Large)    │  Recent Payments             │
│  ┌─────────────────────────┐ │  ✓ Jan 1  +$4,166           │
│  │ Jan  Feb  Mar  Apr  May │ │  ✓ Dec 1  +$4,166           │
│  │  ●    ○    ○    ○    ○  │ │  ✓ Nov 1  +$2,916           │
│  └─────────────────────────┘ │                              │
├──────────────────────────────┴──────────────────────────────┤
│  YTD Earnings: $12,500                                      │
└─────────────────────────────────────────────────────────────┘
```

### Growth-Focused Dashboard
```
┌──────────────────────────────────────────────────────────────┐
│  HERO: Projected Value       │  HERO: Compound Growth       │
│         $847,500             │         +69.5% (5yr)         │
├──────────────────────────────┴──────────────────────────────┤
│  Growth Projection Chart                                     │
│  $1M ┤                                              ╭────   │
│      │                                        ╭─────╯       │
│ $750K┤                                  ╭─────╯             │
│      │                            ╭─────╯                   │
│ $500K┤──────────────────────╭─────╯                         │
│      └──────────────────────────────────────────────────────│
│        Now    Y1     Y2     Y3     Y4     Y5                │
├─────────────────────────────────────────────────────────────┤
│  Reinvestment Strategy: Full Compound                        │
└─────────────────────────────────────────────────────────────┘
```

---

## User Flow

```
                    ┌─────────────┐
                    │   LOGIN     │
                    └──────┬──────┘
                           │
                           ▼
              ┌────────────────────────┐
              │      DASHBOARD         │
              │  (Goal-Based Layout)   │
              └───────────┬────────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │    NEW     │ │   VIEW     │ │   QUICK    │
    │ INVESTMENT │ │  PAYMENTS  │ │   LINKS    │
    │     [①]    │ │    [②]     │ │            │
    └────────────┘ └────────────┘ └────────────┘
```

---

## Component Breakdown

| Component | Purpose | Data Source |
|-----------|---------|-------------|
| Hero Metrics | At-a-glance KPIs | Portfolio aggregate |
| Active Notes | Note status & progress | Investment notes |
| Payment Calendar | Upcoming payment dates | Payment schedule |
| Goal Progress | Track toward objectives | Investor goals |

---

## Key Notes

1. **Personalized Layout**: Dashboard layout adapts based on investor goals
   - Income-focused: Emphasizes payment calendar and monthly earnings
   - Growth-focused: Shows projections and compound charts
   - Balanced: Mix of both with goal progress

2. **Progressive Disclosure**: Show summary first, details on click

3. **Single Glance Value**: Investor should understand portfolio health in <3 seconds

4. **Mobile-First**: Stack cards vertically on mobile, hero metrics scroll horizontally

---

## Micro-Interactions

```
┌─────────────────────────────────────────┐
│  Hover on Note Card:                    │
│  ┌───────────────────────────────────┐  │
│  │ ████████░░░░  →  Expand details   │  │
│  │               →  Show IDS score   │  │
│  │               →  Quick actions    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Hover on Payment Date:                 │
│  ○ Feb 1 → Show breakdown tooltip       │
│         → $833 (Note 1)                 │
│         → $700 (Note 2)                 │
│         → $833 (Note 3)                 │
└─────────────────────────────────────────┘
```

---

## States

| State | Display |
|-------|---------|
| Empty (No Notes) | CTA: "Make Your First Investment" |
| Loading | Skeleton cards with shimmer |
| Has Notes | Full dashboard |
| Payment Today | Highlight banner |
| Maturity Near | Warning indicator on note |
