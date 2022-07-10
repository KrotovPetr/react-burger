export function getDate(date: string): string {
    let time: Date = new Date(Date.parse(date));
    return time.toString();
}
