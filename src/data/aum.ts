// Combined client AUM, built only from figures each client reports publicly.
// Update a figure by changing its number, source and date. The total and the
// displayed label are computed automatically (rounded DOWN to the nearest $50B).
//
// Left out of the total on purpose:
// - "A private investment fund" (current, unnamed client).
// - CF Private Equity and Core Industrial Partners: exact firm names still
//   [VERIFY], so no AUM figure can be sourced yet. Add them here once confirmed.

export interface AumFigure {
  client: string;
  billions: number;
  source: string;
  asOf: string;
}

export const aumFigures: AumFigure[] = [
  {
    client: 'Bain Capital',
    // ~$225B firm-wide AUM, stated in Bain Capital's August 2026 press release
    // and its June 2026 Sustainability Report (cdn-east2.baincapital.com/2026-07/Bain-Capital-Sustainability-Report-June2026_1.pdf).
    billions: 225,
    source: 'https://baincapital.com/news/bain-capitals-private-credit-group-announces-6-billion-financing-investments-first-half-2026',
    asOf: '2026-08',
  },
  {
    client: 'HarbourVest Partners',
    // $167.9B AUM "as of June 30, 2026", harbourvest.com homepage (checked 2026-11-25).
    billions: 167.9,
    source: 'https://www.harbourvest.com/us/en/general-public.html',
    asOf: '2026-06-30',
  },
  {
    client: 'Cambridge Associates',
    // $326,699,000,000 Regulatory Assets Under Management (discretionary $106.7B +
    // non-discretionary $220.0B) as of Dec 31, 2025, Cambridge Associates LLC
    // Form ADV Part 2A (2026), Item 4.
    billions: 326.7,
    source: 'https://www.cambridgeassociates.com/wp-content/uploads/2026/04/CA-LLC-Form-ADV-Part-2A-2026.pdf',
    asOf: '2025-12-31',
  },
  {
    client: 'Tufts Investment Office',
    // ~$3.1B endowment, Tufts Now, "Rishad Sadikot Named Chief Investment Officer" (2026-05-05).
    billions: 3.1,
    source: 'https://now.tufts.edu/2026/05/05/rishad-sadikot-named-chief-investment-officer',
    asOf: '2026-05-05',
  },
];

export const aumTotalBillions = aumFigures.reduce((sum, f) => sum + f.billions, 0); // 722.7

const roundStep = 50;
const roundedDown = Math.floor(aumTotalBillions / roundStep) * roundStep;

// "$700B+"
export const aumLabel = roundedDown >= 1000
  ? `$${(roundedDown / 1000).toFixed(roundedDown % 1000 === 0 ? 0 : 1)}T+`
  : `$${roundedDown}B+`;
