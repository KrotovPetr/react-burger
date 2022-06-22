import { getCookie } from './cookieFunctions/getCookie';

export function isForgot(): boolean {
    return getCookie('forgot') === undefined;
}
