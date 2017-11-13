/// <reference path="../globals/util.js" />

window.onload = () => {
    let spacer = document.createElement('div');
    spacer.classList.add('headerspacer');

    document.body.insertAdjacentElement('afterbegin', spacer);

    injectCSS('/nav/styles.css');
}