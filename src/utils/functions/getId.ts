export function getId(url: string): string {
    if (url.split('/')[1] === 'feed') {
        return url.split('/')[2];
    } else {
        return url.split('/')[3];
    }
}
