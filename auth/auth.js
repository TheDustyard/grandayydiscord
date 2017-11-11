/// <reference path="../globals/util.js" />

let querys = getGetParams();
if (!querys.access_token || !querys.expires_in || !querys.scope || !querys.token_type) {
    window.location.replace("/?login=fail");
} else {
    setCookie('access_token', querys.access_token, parseInt(querys.expires_in));
    setCookie('scope'       , querys.scope       , parseInt(querys.expires_in));
    setCookie('token_type'  , querys.token_type  , parseInt(querys.expires_in));
    
    window.location.replace("/?login=success");
}