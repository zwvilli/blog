import Cookies from 'js-cookie'

export function getCookie(CookieName: String) {
    return Cookies.get(CookieName)
}

export function removeCookie(CookieName: String,) {
    return Cookies.remove(CookieName)
}