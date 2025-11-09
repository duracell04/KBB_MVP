# Financial Mechanics

## Day-count & accrual
- Support 30E/360 and Actual/Actual (ISDA) in helpers.
- Accrual formula: `accrued = notional * rate * dayCountFraction`.

## Coupon example
- Notional: 1,000,000
- Rate: 6% p.a.
- DCF (30E/360): 0.5
- Gross coupon: `1_000_000 * 0.06 * 0.5 = 30_000`

**Rounding policy**
- Quantize to token decimals
- Emit `grossAmount`, `withholding`, `netAmount` in `CouponPaid`
- Test boundaries: odd period lengths, leap days, tiny balances
