export const fixStringLength = (str: string) => {
    if (str.length < 15) {
        return { newString: str, fullText: '' }
    } else {
        const newString = str.slice(0, 15)
    
        return { newString: `${newString}...`, fullText: str }
    }
}