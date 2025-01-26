export const formatPayTime = (day: number, month: number, year: number) => {
    const newDay = day.toString().length === 1 ? `0${day}` : day;
    const newMonth = month.toString().length === 1 ? `0${month}` : month;

    return `${newDay}-${newMonth}-${year}`;
}