export const formatRut = (rut: string) => {
    const rutArr = rut.split('-');
    const first = rutArr[0];
    const second = rutArr[1];

    let newRut = '';
    let count = 0;

    for (let i = first.length - 1; i >= 0; i--) {
        if ((count % 3 === 0) && count > 0) {
            newRut = '.' + newRut;
        }

        newRut = first[i] + newRut;
        count++;
    }

    return newRut + '-' + second;
}

export const reFormatRut = (rut: string) => {
    return rut.split('').filter(char => char != '.').join('');
}