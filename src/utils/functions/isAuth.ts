import { getCookie } from './cookieFunctions/getCookie';

export function isAuth(): boolean {
    return getCookie('accessToken') !== undefined;
}
