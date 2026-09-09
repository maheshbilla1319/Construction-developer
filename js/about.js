/* =========================================================
CONSTRUCTA DEVELOPERS
ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   01. PRELOADER
====================================================== */

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add("loaded");

            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);

        }

    }, 500);

});


/* =====================================================
   02. HEADER SCROLL EFFECT
====================================================== */

const header = document.querySelector(".header");

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();


/* =====================================================
   03. MOBILE MENU
====================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function closeMobileMenu() {

    if (nav) {
        nav.classList.remove("active");
    }

    if (menuToggle) {

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

    document.body.classList.remove("menu-open");

}


if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Close menu when clicking navigation link */

    const mobileNavLinks =
        nav.querySelectorAll(".nav-link");

    mobileNavLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });

}


/* =====================================================
   04. ACTIVE NAVIGATION LINK
====================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

const allNavLinks =
    document.querySelectorAll(".nav-link");

allNavLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage =
        href
            .split("/")
            .pop()
            .split("#")[0]
            .toLowerCase();

    link.classList.remove("active");

    if (
        linkPage === currentPage ||
        (
            currentPage === "" &&
            linkPage === "index.html"
        )
    ) {

        link.classList.add("active");

    }

});


/* =====================================================
   05. CLOSE MOBILE MENU ON RESIZE
====================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {
        closeMobileMenu();
    }

});


/* =====================================================
   06. ESCAPE KEY CLOSE MENU
====================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMobileMenu();
    }

});


/* =====================================================
   07. AOS ANIMATION
====================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        delay: 0

    });

}


/* =====================================================
   08. SMOOTH SCROLL
====================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                let target;

                try {
                    target =
                        document.querySelector(
                            targetId
                        );
                } catch (error) {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,
                    behavior: "smooth"

                });

                /* Close mobile menu */

                closeMobileMenu();

            }

        );

    });


/* =====================================================
   09. NAV CTA HOVER MICRO INTERACTION
====================================================== */

const navCta =
    document.querySelector(".nav-cta");

if (navCta) {

    navCta.addEventListener(
        "mouseenter",
        () => {
            navCta.classList.add("hovered");
        }
    );

    navCta.addEventListener(
        "mouseleave",
        () => {
            navCta.classList.remove("hovered");
        }
    );

}


/* =====================================================
   10. HERO IMAGE SLIDER
====================================================== */

const slides =
    document.querySelectorAll(".hero-slide");

const prevBtn =
    document.getElementById("prevSlide");

const nextBtn =
    document.getElementById("nextSlide");

const currentSlide =
    document.getElementById("currentSlide");

let currentIndex = 0;

let autoSlide;


/* Only initialize slider when slides exist */

if (slides.length > 0) {

    function showSlide(index) {

        /* Safety check */

        if (
            index < 0 ||
            index >= slides.length
        ) {
            return;
        }

        /* Remove active class */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        /* Add active class */

        slides[index].classList.add("active");

        /* Update counter */

        if (currentSlide) {

            currentSlide.textContent =
                String(index + 1)
                    .padStart(2, "0");

        }

    }


    /* NEXT SLIDE */

    function nextSlide() {

        currentIndex++;

        if (
            currentIndex >=
            slides.length
        ) {

            currentIndex = 0;

        }

        showSlide(currentIndex);

    }


    /* PREVIOUS SLIDE */

    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                slides.length - 1;

        }

        showSlide(currentIndex);

    }


    /* NEXT BUTTON */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoSlider();

            }
        );

    }


    /* PREVIOUS BUTTON */

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoSlider();

            }
        );

    }


    /* =================================================
       AUTO SLIDER
    ================================================== */

    function startAutoSlider() {

        autoSlide =
            setInterval(
                nextSlide,
                5000
            );

    }


    function restartAutoSlider() {

        clearInterval(autoSlide);

        startAutoSlider();

    }


    /* Start slider */

    showSlide(currentIndex);

    startAutoSlider();


    /* =================================================
       PAUSE SLIDER ON HOVER
    ================================================== */

    const heroSlider =
        document.querySelector(".hero-slider");

    if (heroSlider) {

        heroSlider.addEventListener(
            "mouseenter",
            () => {
                clearInterval(autoSlide);
            }
        );

        heroSlider.addEventListener(
            "mouseleave",
            () => {
                restartAutoSlider();
            }
        );

    }


    /* =================================================
       KEYBOARD SLIDER CONTROL
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowRight") {

                nextSlide();
                restartAutoSlider();

            }

            if (event.key === "ArrowLeft") {

                previousSlide();
                restartAutoSlider();

            }

        }
    );

}


/* =====================================================
   11. REFRESH AOS AFTER PAGE LOAD
====================================================== */

window.addEventListener("load", () => {

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }

});


});
