/**
 * Orchestrator (placeholder)
 * Intention: In-memory DvP happy path (subscribe -> fund -> settle).
 * Why: Demonstrate "bank-settled, token-registered" flow without integrating real bank/chain yet.
 *
 * Minimal surface (later):
 *  - POST /subscriptions        -> create order after KYC
 *  - POST /subscriptions/:id/fund (attach camt.054 or stablecoin tx ref)
 *  - POST /settle/:id           -> mint/transfer if fully funded
 *  - POST /refund/:id           -> unwind if late/partial
 */
export {}
