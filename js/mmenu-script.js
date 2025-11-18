document.addEventListener("click", (evnt) => {
    if (evnt.target?.closest?.('a[href^="#/"]')) {
        evnt.preventDefault();
        alert("Thank you for clicking, but that's a demo link.");
    }
});

document.addEventListener('DOMContentLoaded', () => {

    new Mmenu("#menu", {
        navbar: {
            title: "Menu"
        },        
        searchfield: {
            add: false,
            addTo: "#contacts"
        },
        offCanvas: {
            position: "right-front"
        }
    }, {});

});


