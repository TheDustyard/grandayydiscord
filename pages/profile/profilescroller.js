window.onload = () => {
    let rolemenu = document.querySelector('div.pfp');
    let profile = document.querySelector('div.profile');
    let rolemenutop = rolemenu.getBoundingClientRect().top;

    window.onscroll = (e) => {
        let offset = Math.abs(document.body.getBoundingClientRect().top - 100);
        
        if ((offset) >= rolemenutop) {
            if ((offset - 50) + rolemenu.getBoundingClientRect().height < profile.getBoundingClientRect().height)
                rolemenu.style.top = `${offset - 100}px`;
            else {
                rolemenu.style.top = `${profile.getBoundingClientRect().height - rolemenu.getBoundingClientRect().height - 50}px`;
            }
        } else {
            rolemenu.removeAttribute('style');
        }
    }

    window.onscroll();
}