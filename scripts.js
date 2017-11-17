/// <reference path="./globals/util.js" />

// HEADER SHID
window.onload = () => {
    console.log('loading');

    let loggedin = document.querySelectorAll('.loggedin');
    let loggedout = document.querySelectorAll('.loggedout');

    if (getCookie('access_token')) {
        GETJSON(`https://dusterthefirst.ddns.net:8080/me?token_type=${getCookie('token_type')}&access_token=${getCookie('access_token')}`, (data) => {
            console.log(data);

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

    let dropdown;
    let dropdowns = Array.from(document.getElementsByClassName('opendropdown')).filter((x, i, a) => a.indexOf(x) == i);
    for (let dropdownopener of dropdowns) {
        dropdown = document.querySelector(dropdownopener.getAttribute('dropdown'))
        dropdownopener.addEventListener('click', (e) => {
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
    }

    let searchbars = document.querySelectorAll('.searchbar');
    for (let searchbar of searchbars) {
        searchbar.addEventListener('keyup', (e) => {
            if (e.keyCode == 13) {
                location.hash = `#/search?q=${searchbar.value}`;
                searchbar.value = "";
            }
        });
    }

    let base = document.createElement('base');
    base.target = "_parent";
    for (let frame of document.querySelectorAll('iframe')) {
        frame.contentWindow.document.body.appendChild(base);
    }

    console.log('loaded all synchronaoussss')
}