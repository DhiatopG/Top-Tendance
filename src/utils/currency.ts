/**
 * Formats a numeric price into Tunisian Dinar currency format (TND)
 * e.g. formatPrice(129) => "129.000 TND"
 *      formatPrice(129.5) => "129.500 TND"
 */
export function formatPrice(amount: number, options?: { showDecimals?: boolean; suffix?: string }): string {
  const { showDecimals = true, suffix = 'TND' } = options || {};
  
  if (isNaN(amount)) return `0.000 ${suffix}`;

  const formatted = showDecimals
    ? amount.toLocaleString('fr-TN', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    : Math.round(amount).toLocaleString('fr-TN');

  return `${formatted} ${suffix}`;
}

/**
 * Calculates discount percentage
 */
export function getDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

