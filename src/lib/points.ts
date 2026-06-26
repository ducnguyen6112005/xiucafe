// Loyalty rules. Every number that defines how points work lives HERE.
// Want to run a double-points day? Change ONE line in this file.

export const POINTS_PER_DOLLAR = 1;       // earn rate
export const SIGNUP_BONUS = 50;           // points granted on signup
export const REDEEM_POINTS_PER_DOLLAR = 100; // 100 points = $1 off (for future use)

// How many points an order earns, given its total in cents.
export function pointsForOrder(totalCents: number): number {
  return Math.floor((totalCents / 100) * POINTS_PER_DOLLAR);
}
