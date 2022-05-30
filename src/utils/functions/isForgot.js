import { getCookie } from './cookieFunctions/getCookie';

export function isForgot() {
    return getCookie('forgot') === undefined;
}
