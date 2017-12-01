/// <reference path="../globals/util.js" />

let querys = getGetParamsFromHash();
if (!querys.access_token || !querys.expires_in || !querys.token_type) {
    if (querys.logout) {
        setCookie('access_token', 'deletthis', -100);
        setCookie('scope', 'deletthis', -100);
        setCookie('token_type', 'deletthis', -100);
        window.location.replace(`/${fromBase64(querys.goto)}`);
    } else {
        window.location.replace("/");
    }
} else {
    setCookie('access_token', querys.access_token, parseInt(querys.expires_in));
    setCookie('scope', querys.scope, parseInt(querys.expires_in));
    setCookie('token_type', querys.token_type, parseInt(querys.expires_in));

    window.location.replace(`/${fromBase64(querys.state)}`);
}