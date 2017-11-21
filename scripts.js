/// <reference path="./globals/util.js" />

// HEADER SHID
window.onload = () => {
    console.log('loading');

    let loggedin = document.querySelectorAll('.loggedin');
    let loggedout = document.querySelectorAll('.loggedout');

    if (getCookie('access_token')) {
        GETJSON(`https://dusterthefirst.ddns.net:8080/me?token_type=${getCookie('token_type')}&access_token=${getCookie('access_token')}`, (data) => {
            console.log(data);

            if (data.code === 0) {
                location.replace(`/auth/#logout&goto=${toBase64(location.hash)}`);
                return;
            }

            Array.from(document.querySelectorAll('.currentuser.username')).forEach((x) => {
                x.innerHTML = data.username;
            });
            Array.from(document.querySelectorAll('.currentuser.discriminator')).forEach((x) => {
                x.innerHTML = data.discriminator;
            });

            Array.from(document.querySelectorAll('img.currentuserpfp')).forEach((x) => {
                x.src = data.avatar;
            });

            console.log('loaded user data')
        });

        for (let index of loggedin) {
            show(loggedin.item(index));
        }
        for (let index of loggedout) {
            hide(loggedout.item(index));
        }
        console.log('logged in');
    } else {
        for (let index of loggedin) {
            hide(loggedin.item(index));
        }
        for (let index of loggedout) {
            show(loggedout.item(index));
        }
        console.log('logged out');
    }

    queryApplyAll(".opendropdown", (current, all) => {
        let dropdown = document.querySelector(current.getAttribute('dropdown'))
        current.addEventListener('click', (e) => {
            if (showing(dropdown))
                hide(dropdown);
            else
                show(dropdown);
            e.stopPropagation();
        });
        dropdown.addEventListener('click', (e) => {
            show(dropdown);
            e.stopPropagation();
        });
        window.addEventListener('click', () => {
            hide(dropdown);
        });
    });

    queryApplyAll(".openmenu", (current, all) => {
        let menu = document.querySelector(current.getAttribute('menu'))
        current.addEventListener('click', (e) => {
            if (showing(menu))
                hide(menu);
            else
                show(menu);
            e.stopPropagation();
        });
        menu.addEventListener('click', (e) => {
            show(menu);
            e.stopPropagation();
        });
        window.addEventListener('click', () => {
            hide(menu);
        });
    })

    queryApplyAll(".hideparent", (current, all) => {
        parent = current.parentElement
        current.addEventListener('click', (e) => {
            hide(parent);
            e.stopPropagation();
        });
    });

    queryApplyAll(".searchbar", (current, all) => {
        current.addEventListener('keyup', (e) => {
            if (e.keyCode == 13) {
                location.hash = `#/search?q=${current.value}`;
                current.value = "";
            }
        });
    });

    for (let frame of document.querySelectorAll('iframe')) {
        let links = frame.contentWindow.document.querySelectorAll('a');
        for (let link of links) {
            if (link.hasAttribute('external')) {
                link.onclick = (e) => {
                    location.href = link.href;
                    e.preventDefault();
                };
                continue;
            }

            link.setAttribute('page', link.hash);
            link.removeAttribute('href');
            link.onclick = (e) => {
                location.hash = link.getAttribute('page');
                e.preventDefault();
            };
        }
    }

    console.log('loaded all synchronaoussss')
}

window.onhashchange = () => {
    let dropdown;
    let dropdowns = Array.from(document.getElementsByClassName('opendropdown')).filter((x, i, a) => a.indexOf(x) == i);
    for (let dropdownopener of dropdowns) {
        dropdown = document.querySelector(dropdownopener.getAttribute('dropdown'))
        hide(dropdown);
    }
}