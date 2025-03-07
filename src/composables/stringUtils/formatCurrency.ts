export const formatCurrency = (currency: number) => {
    return new Intl.NumberFormat("es-CL", {
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(currency)
}
