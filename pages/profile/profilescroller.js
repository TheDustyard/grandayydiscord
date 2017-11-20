window.onload = () => {
    let rolemenu = document.querySelector('div.pfp');
    let rolemenutop = rolemenu.getBoundingClientRect().top;

    parent.window.onscroll = (e) => {
        let offset = Math.abs(parent.document.body.getBoundingClientRect().top);
        if (offset >= rolemenutop) {
            rolemenu.style.top = `${offset - 100}px`;;
        } else {
            rolemenu.removeAttribute('style');
        }
    }
}