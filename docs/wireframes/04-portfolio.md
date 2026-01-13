# Portfolio Wireframe
> Systemic risk monitoring with PRI (Portfolio Risk Index)

## Primary Actions
```
┌─────────────────────────────────────────────────────────────────┐
│  ① VIEW CONCENTRATION        ② RUN STRESS TEST                 │
│     Breakdown by market          Simulate shock scenarios       │
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
│   Dash     │  Portfolio Risk                                                 │
│   Invest   │                                                                 │
│   Deals    │  ┌───────────────────────────────────────────────────────────┐  │
│ ┌────────┐ │  │                  PORTFOLIO RISK INDEX                     │  │
│ │■ Portf.│ │  │                                                           │  │
│ └────────┘ │  │        ┌─────────────────────────────────────┐            │  │
│   Payments │  │        │                                     │            │  │
│   Docs     │  │        │              38                     │            │  │
│            │  │        │            ───────                  │            │  │
│ ─────────  │  │        │           MODERATE                  │            │  │
│   Settings │  │        │                                     │            │  │
│   Help     │  │        └─────────────────────────────────────┘            │  │
│            │  │                                                           │  │
│            │  │   ░░░░░░░░░░░░░░░░████████████████░░░░░░░░░░░░░░░░░░░░░░  │  │
│            │  │   0    Conservative    Moderate    Elevated    High  100  │  │
│            │  │                           ▲                               │  │
│            │  │                       You are here                        │  │
│            │  └───────────────────────────────────────────────────────────┘  │
│            │                                                                 │
│            │  ┌────────────────────────────┐ ┌────────────────────────────┐  │
│            │  │ RISK COMPONENTS            │ │ CONCENTRATION          [①]│  │
│            │  │                            │ │                            │  │
│            │  │ Weighted Avg Risk    32    │ │ By Market                  │  │
│            │  │ ███████░░░░░░░░░    30%    │ │ ┌────────────────────────┐ │  │
│            │  │                            │ │ │ Phoenix      ████ 22%  │ │  │
│            │  │ Concentration Risk   45    │ │ │ Austin       ███░ 18%  │ │  │
│            │  │ █████████░░░░░░░    25%    │ │ │ Dallas       ███░ 15%  │ │  │
│            │  │                            │ │ │ Denver       ██░░ 12%  │ │  │
│            │  │ Duration Mismatch    28    │ │ │ Other        ████ 33%  │ │  │
│            │  │ ██████░░░░░░░░░░    15%    │ │ └────────────────────────┘ │  │
│            │  │                            │ │                            │  │
│            │  │ Correlation Risk     35    │ │ Threshold: 25%             │  │
│            │  │ ███████░░░░░░░░░    15%    │ │ ✓ No breaches              │  │
│            │  │                            │ │                            │  │
│            │  │ Liquidity Stress     42    │ └────────────────────────────┘  │
│            │  │ ████████░░░░░░░░    15%    │                                 │
│            │  │                            │ ┌────────────────────────────┐  │
│            │  └────────────────────────────┘ │ STRESS TEST            [②]│  │
│            │                                 │                            │  │
│            │                                 │ ┌──────────────────────┐   │  │
│            │                                 │ │ Run Scenario         │   │  │
│            │                                 │ └──────────────────────┘   │  │
│            │                                 │                            │  │
│            │                                 │ Last run: Never            │  │
│            │                                 └────────────────────────────┘  │
└────────────┴─────────────────────────────────────────────────────────────────┘
```

---

## PRI Band Visualization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   PORTFOLIO RISK BANDS                                                      │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   CONSERVATIVE     MODERATE      ELEVATED       HIGH      CRITICAL │   │
│   │      0-25           26-45         46-65        66-80       81-100  │   │
│   │                                                                     │   │
│   │   ░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│   │                        ▲                                            │   │
│   │                       38                                            │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   Your portfolio is in the MODERATE risk band.                              │
│   Concentration in Phoenix (22%) is approaching the 25% threshold.          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Concentration Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   CONCENTRATION ANALYSIS                                               [①] │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│   ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐   │
│   │    BY MARKET        │ │    BY BORROWER      │ │   BY ASSET TYPE     │   │
│   ├─────────────────────┤ ├─────────────────────┤ ├─────────────────────┤   │
│   │                     │ │                     │ │                     │   │
│   │ Phoenix     22%     │ │ Smith LLC   18%     │ │ SFR         45%     │   │
│   │ ████████░░░░░░░░    │ │ ██████░░░░░░░░░░    │ │ █████████░░░░░░     │   │
│   │ ⚠️ 88% of limit     │ │ ✓ Under 20%        │ │ ⚠️ Near 50%        │   │
│   │                     │ │                     │ │                     │   │
│   │ Austin      18%     │ │ Jones Corp  15%     │ │ Small MF    35%     │   │
│   │ ██████░░░░░░░░░░    │ │ █████░░░░░░░░░░░    │ │ ███████░░░░░░░░     │   │
│   │ ✓ Under limit       │ │ ✓ Under 20%        │ │ ✓ Under limit       │   │
│   │                     │ │                     │ │                     │   │
│   │ Dallas      15%     │ │ Park Inv    12%     │ │ Duplex      20%     │   │
│   │ █████░░░░░░░░░░░    │ │ ████░░░░░░░░░░░░    │ │ ████░░░░░░░░░░░     │   │
│   │ ✓ Under limit       │ │ ✓ Under 20%        │ │ ✓ Under limit       │   │
│   │                     │ │                     │ │                     │   │
│   │ ─────────────────── │ │ ─────────────────── │ │ ─────────────────── │   │
│   │ Threshold: 25%      │ │ Threshold: 20%      │ │ Threshold: 40%      │   │
│   │                     │ │                     │ │                     │   │
│   └─────────────────────┘ └─────────────────────┘ └─────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Stress Test Panel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   STRESS TEST SCENARIOS                                                [②] │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│   Select a scenario to simulate:                                            │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   ○  10% LOAN EXTENSIONS                                           │   │
│   │      What if 10% of loans extend past maturity?                    │   │
│   │                                                                     │   │
│   │   ○  90-DAY LIQUIDITY FREEZE                                       │   │
│   │      Can portfolio survive no new capital for 90 days?             │   │
│   │                                                                     │   │
│   │   ◉  15% ARV COMPRESSION                                           │   │
│   │      What happens if property values drop 15%?                     │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                           [ RUN STRESS TEST ]                               │
│                                                                             │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│   STRESS TEST RESULTS: 15% ARV Compression                                  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   Current PRI:     38 (Moderate)                                   │   │
│   │   Stressed PRI:    52 (Elevated)  ▲ +14 points                     │   │
│   │                                                                     │   │
│   │   ░░░░░░░░░░░░░░░░░░░░██████████████████████░░░░░░░░░░░░░░░░░░░░░  │   │
│   │                       ▲              ▲                              │   │
│   │                    Current       Stressed                           │   │
│   │                                                                     │   │
│   │   Impact Analysis:                                                  │   │
│   │   • 2 loans would breach 75% LTV cap                               │   │
│   │   • Total exposure at risk: $350,000 (7% of portfolio)             │   │
│   │   • Concentration risk would increase by 8 points                  │   │
│   │                                                                     │   │
│   │   This is a simulation. Your actual portfolio is unchanged.        │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## User Flow

```
                      ┌──────────────────┐
                      │     PORTFOLIO    │
                      │       RISK       │
                      └────────┬─────────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │     VIEW     │   │     VIEW     │   │     RUN      │
    │     PRI      │   │CONCENTRATION │   │   STRESS     │
    │   BREAKDOWN  │   │     [①]      │   │    TEST      │
    └──────────────┘   └──────┬───────┘   │     [②]      │
                              │           └──────┬───────┘
                              ▼                  │
                       ┌──────────────┐          │
                       │   BY MARKET  │          │
                       │ BY BORROWER  │          ▼
                       │ BY ASSET TYPE│   ┌──────────────┐
                       └──────────────┘   │   SELECT     │
                                          │  SCENARIO    │
                                          └──────┬───────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │    VIEW      │
                                          │   RESULTS    │
                                          └──────────────┘
```

---

## PRI Component Details

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   PRI COMPONENT BREAKDOWN                                                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   WEIGHTED AVERAGE RISK (30% of PRI)                       32/100  │   │
│   │   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│   │                                                                     │   │
│   │   Formula: Σ(LoanRisk × Exposure) / TotalExposure                  │   │
│   │   Your portfolio's exposure-weighted average risk is 32.           │   │
│   │   This is in the low-medium range.                                 │   │
│   │                                                                     │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │   CONCENTRATION RISK (25% of PRI)                          45/100  │   │
│   │   █████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│   │                                                                     │   │
│   │   Penalties applied when thresholds approached:                    │   │
│   │   • Phoenix at 22% (88% of 25% limit) = No penalty yet            │   │
│   │   • No single borrower over 20%                                    │   │
│   │   • SFR at 45% (approaching 50% soft limit)                       │   │
│   │                                                                     │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │   DURATION MISMATCH (15% of PRI)                           28/100  │   │
│   │   ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│   │                                                                     │   │
│   │   Avg Loan Term: 10 months                                         │   │
│   │   Avg Capital Commitment: 12 months                                │   │
│   │   Mismatch: -2 months (loans mature before commitments end) ✓      │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Notes

1. **System View**: PRI measures portfolio as a system, not individual loans

2. **Proactive Alerts**: Warning at 80% of threshold, critical at breach

3. **Simulation, Not Prediction**: Stress tests are scenarios, not forecasts

4. **No Automation**: System surfaces risk, never auto-rebalances

5. **Audit Trail**: All PRI calculations snapshotted for compliance

---

## Alert States

```
┌─────────────────────────────────────────────────────────────────┐
│  NORMAL STATE                                                   │
│  PRI: 38 (Moderate)                                             │
│  All concentrations under threshold                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  WARNING STATE                                                  │
│  ⚠️ Phoenix concentration at 23% (92% of 25% threshold)        │
│  Consider this before adding more Phoenix exposure              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CRITICAL STATE                                                 │
│  🔴 Phoenix concentration BREACHED at 27%                       │
│  PRI increased by 15 points due to concentration penalty        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout

```
┌─────────────────────────┐
│ Portfolio Risk          │
│                         │
│ ┌─────────────────────┐ │
│ │        38           │ │
│ │     ─────────       │ │
│ │     MODERATE        │ │
│ │                     │ │
│ │ ░░░░░████░░░░░░░░░  │ │
│ └─────────────────────┘ │
│                         │
│ Components              │
│ ┌─────────────────────┐ │
│ │ Weighted Risk    32 │ │
│ │ Concentration    45 │ │
│ │ Duration         28 │ │
│ │ Correlation      35 │ │
│ │ Liquidity        42 │ │
│ └─────────────────────┘ │
│                         │
│ [Concentration Details] │
│ [Run Stress Test]       │
└─────────────────────────┘
```
