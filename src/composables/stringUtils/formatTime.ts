export const formatTime = (time: string) => {
    const year = time.slice(0, 4)
    const semester = time.slice(4, 6)

    return `${year}-${semester}`
}