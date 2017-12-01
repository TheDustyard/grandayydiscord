/**
 * get GET params from url
 */
function getGetParamsFromHash() {
    var query = location.hash.substr(1);
    var result = {};
    query.split("&").forEach((part) => {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

/**
 * Set a cookie
 * @param {string} cname Name of the cookie
 * @param {string} cvalue Value of the cookie
 * @param {number} exms Experation, in milliseconds
 */
function setCookie(cname, cvalue, exms) {
    var d = new Date();
    d.setTime(d.getTime() + exms);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get value of a cookie
 * @param {string} cname Name of the cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

/**
 * GET a url
 * @param {string} theUrl URL to GET
 * @param {(data) => void} callback Callback to call
 */
function GET(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send();
}

/**
 * GET a url
 * @param {string} theUrl URL to GET
 * @param {(data) => void} callback Callback to call
 */
function GETJSON(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send();
}

/**
 * GET a url
 * @param {string} theUrl URL to GET
 * @param {(document: Document) => void} callback Callback to call
 */
function GETHTML(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(new DOMParser().parseFromString(xmlHttp.responseText, "text/html"));
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send();
}

/**
 * GET a url
 * @param {string} theUrl URL to GET
 */
function injectCSS(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', theUrl);
            document.head.appendChild(link);
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send();
}

/**
 * Hide the element
 * @param {Element} elem Element to hide
 */
function hide(elem) {
    elem.classList.remove('show');
    elem.classList.add('hide');
}

/**
 * Show the element
 * @param {Element} elem Element to Show
 */
function show(elem) {
    elem.classList.add('show');
    elem.classList.remove('hide');
}

/**
 * If the element can be seen
 * @param {Element} elem Element to Show
 * @returns {Boolean}
 */
function showing(elem) {
    return elem.classList.contains('show');
}

/**
 * Apply a function to all items found by the query
 * @param {string} query Query selector
 * @param {(current: Element, all: Element[]) => void} callback Callback for each item
 */
function queryApplyAll(query, callback) {
    let all = Array.from(document.querySelectorAll(query)).filter((x, i, a) => a.indexOf(x) == i);
    for (let current of all) {
        callback(current, all);
    }
}

/**
 * Encode a string into Base 64
 * @param {String} string String to encode
 * @returns {String} Base 64 encoded string
 */
function toBase64(string) {
    return btoa(string);
}

/**
 * Decode a string from Base 64
 * @param {String} string String to decode
 * @returns {String} Decoded string
 */
function fromBase64(string) {
    return atob(string);
}