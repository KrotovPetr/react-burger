export function getDate(date: string): string {
    let time: Date | string = new Date(Date.parse(date));
    time = time.toString();
    let array: string[] = time.split(' ');
    let str: string =
        array[2] + ' ' + array[1] + ' ' + array[3] + ' ' + array[4];
    return str;
}
