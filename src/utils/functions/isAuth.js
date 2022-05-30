import { getCookie } from './cookieFunctions/getCookie';

export function isAuth() {
    return getCookie('accessToken') !== undefined;
}
