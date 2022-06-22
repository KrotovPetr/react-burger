export function deleteCookie(name: string): void {
    document.cookie = name + '=;max-age=-1';
}
