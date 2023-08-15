export function crypt(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function encrypt(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}
