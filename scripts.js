/// <reference path="./globals/util.js" />

if (getCookie('access_token')) {
    GETJSON(`https://dusterthefirst.ddns.net:8080/me?token_type=${getCookie('token_type')}&access_token=${getCookie('access_token')}`, console.log);
} else {
    console.log('logged out');
}