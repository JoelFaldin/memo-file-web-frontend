export const formatRut = (rut: string) => {
    const rutArr = rut.split('-')
    const reversedRut = rutArr[0].split('').reverse()
    const firstPartArr = []

    for (let i = 0; i < reversedRut.length; i++) {
        if ((i % 3 === 0) && i != 0) {
            firstPartArr.push('.')
        }
        firstPartArr.push(reversedRut[i])
    }

    return firstPartArr.reverse().join('').concat('-').concat(rutArr[1])
}