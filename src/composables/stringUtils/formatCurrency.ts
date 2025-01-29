export const formatCurrency = (currency: number) => {
    return currency.toLocaleString(
        undefined,
        { minimumFractionDigits: 0 }
    );
}