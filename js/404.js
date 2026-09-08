
/* =========================================================
   CONSTRUCTA DEVELOPERS
   404 PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   AOS
========================================================= */

AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    const spans = menuToggle.querySelectorAll("span");

    if (mobileMenu.classList.contains("active")) {

        spans[0].style.transform = "translateY(3px) rotate(45deg)";
        spans[1].style.transform = "translateY(-4px) rotate(-45deg)";

    } else {

        spans[0].style.transform = "";
        spans[1].style.transform = "";

    }

});


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        const spans = menuToggle.querySelectorAll("span");

        spans[0].style.transform = "";
        spans[1].style.transform = "";

    });

});


/* =========================================================
   GSAP HERO ANIMATION
========================================================= */

window.addEventListener("load", () => {

    const tl = gsap.timeline();

    tl.from(".error-label", {
        y: 30,
        opacity: 0,
        duration: 0.7
    })

    .from(".digit-one", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3")

    .from(".digit-zero", {
        scale: 0.4,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5")

    .from(".digit-four", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")

    .from(".error-content h1", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.4")

    .from(".error-content p", {
        y: 25,
        opacity: 0,
        duration: 0.6
    }, "-=0.3")

    .from(".error-actions", {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, "-=0.3")

    .from(".blueprint-card", {
        x: 100,
        opacity: 0,
        rotation: 10,
        duration: 1.1,
        ease: "power3.out"
    }, "-=1");

});


/* =========================================================
   BLUEPRINT FLOATING ANIMATION
========================================================= */

gsap.to(".blueprint-card", {
    y: -12,
    rotation: 2,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


/* =========================================================
   FLOATING TAG ANIMATION
========================================================= */

gsap.to(".tag-one", {
    y: -12,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".tag-two", {
    y: 12,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


/* =========================================================
   BACKGROUND PARALLAX
========================================================= */

window.addEventListener("mousemove", (event) => {

    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    gsap.to(".error-bg", {
        x: x,
        y: y,
        duration: 1.2,
        ease: "power2.out"
    });

});


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        gsap.to(button, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.3
        });

    });


    button.addEventListener("mouseleave", () => {

        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1,0.4)"
        });

    });

});


/* =========================================================
   NUMBER HOVER
========================================================= */

document.querySelectorAll(".digit").forEach(digit => {

    digit.addEventListener("mouseenter", () => {

        gsap.to(digit, {
            y: -12,
            duration: 0.3,
            ease: "power2.out"
        });

    });


    digit.addEventListener("mouseleave", () => {

        gsap.to(digit, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
        });

    });

});

