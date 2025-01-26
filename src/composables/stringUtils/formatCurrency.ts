export const formatCurrency = (currency: number) => {
    const curr = currency.toString().split('').reverse()
    const newCurr = []

    for (let i = 0; i < curr.length; i++) {
        if ((i % 3 === 0) && i != 0) {
            newCurr.push('.')
        }
        newCurr.push(curr[i])
    }
    
    return newCurr.reverse().join('');
}