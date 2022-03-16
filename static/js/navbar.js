const toggler = document.querySelector(".toggler");
const links = document.querySelector(".navbar__links");

let isToggled = false;

toggler.addEventListener("click", (event) => {

    links.classList.toggle("show");

    toggler.classList.toggle("show");
});

