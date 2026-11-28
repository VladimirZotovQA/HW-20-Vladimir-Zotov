export const paths = {
  smallLoan: '/small-loan',
  loanDecision: '/loan-decision',
};

// Any non-empty pair enables Continue. The app does not check these values.
export const user = {
  username: 'testuser',
  password: 'testpassword',
};

// Limits and defaults read from the calculator on /small-loan.
export const loan = {
  minAmount: 500,
  maxAmount: 10000,
  defaultAmount: '500',
  minPeriodMonths: 12,
  maxPeriodMonths: 36,
  defaultPeriodMonths: '12',
  defaultMonthlyPayment: '42.8 €',
  // 2500 for 12 months, read from the page after filling the amount field.
  updatedAmount: '2500',
  updatedMonthlyPayment: '214.02 €',
  mockSeedAmount: '1609',
  mockSeedMonthlyPayment: 137.74,
};

export const apiRoutes = {
  loanCalc: '**/api/loan-calc*',
};