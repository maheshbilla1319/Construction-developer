/* =========================================================
CONSTRUCTA DEVELOPERS
SERVICES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   01. PRELOADER
====================================================== */

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {
            preloader.classList.add("hide");

            /* Fallback display none */
            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);
        }

    }, 500);

});


/* =====================================================
   02. AOS ANIMATION
====================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

}


/* =====================================================
   03. HEADER SCROLL EFFECT
====================================================== */

const header =
    document.getElementById("header") ||
    document.querySelector(".header");

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =====================================================
   04. MOBILE MENU
====================================================== */

const menuToggle =
    document.getElementById("menuToggle") ||
    document.querySelector(".menu-toggle");

const navMenu =
    document.querySelector(".nav-menu") ||
    document.querySelector(".nav");

function closeMenu() {

    if (navMenu) {
        navMenu.classList.remove("open");
        navMenu.classList.remove("active");
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


function openMenu() {

    if (!navMenu) return;

    navMenu.classList.add("open");
    navMenu.classList.add("active");

    if (menuToggle) {

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }

    document.body.classList.add("menu-open");

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", (event) => {

        event.preventDefault();

        const isOpen =
            navMenu.classList.contains("open") ||
            navMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close when clicking navigation links */

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    closeMenu();
                }
            );

        });

}


/* =====================================================
   05. CLOSE MENU ON ESCAPE
====================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =====================================================
   06. CLOSE MENU ON RESIZE
====================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {
        closeMenu();
    }

});


/* =====================================================
   07. ACTIVE NAV LINK
====================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

const navLinks =
    document.querySelectorAll(
        ".nav-menu a, .nav-link"
    );

navLinks.forEach(link => {

    const href =
        link.getAttribute("href");

    if (!href || href.startsWith("#")) {
        return;
    }

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
   08. HERO SLIDER
====================================================== */

const slides =
    document.querySelectorAll(".hero-slide");

let currentSlide = 0;
let sliderInterval = null;


function showSlide(index) {

    if (!slides.length) return;

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    currentSlide = index;

}


function startHeroSlider() {

    if (slides.length <= 1) return;

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {

        showSlide(currentSlide + 1);

    }, 5000);

}


if (slides.length > 0) {

    showSlide(0);

    startHeroSlider();

}


/* =====================================================
   09. HERO SLIDER BUTTONS
====================================================== */

const nextButton =
    document.getElementById("nextSlide");

const prevButton =
    document.getElementById("prevSlide");


if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            showSlide(currentSlide + 1);

            startHeroSlider();

        }
    );

}


if (prevButton) {

    prevButton.addEventListener(
        "click",
        () => {

            showSlide(currentSlide - 1);

            startHeroSlider();

        }
    );

}


/* =====================================================
   10. COUNTERS
====================================================== */

const counters =
    document.querySelectorAll(".counter");


if (
    counters.length &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    if (
                        isNaN(target) ||
                        target <= 0
                    ) {

                        counter.textContent = "0";

                        observer.unobserve(
                            counter
                        );

                        return;

                    }

                    let current = 0;

                    const increment =
                        Math.max(
                            1,
                            Math.ceil(target / 80)
                        );


                    function updateCounter() {

                        current += increment;

                        if (
                            current >= target
                        ) {
                            current = target;
                        }

                        counter.textContent =
                            current.toLocaleString();

                        if (
                            current < target
                        ) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                    }


                    updateCounter();

                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

} else {

    /* Fallback for old browsers */

    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );

        if (!isNaN(target)) {
            counter.textContent =
                target.toLocaleString();
        }

    });

}


/* =====================================================
   11. GSAP HERO ANIMATION
====================================================== */

if (typeof gsap !== "undefined") {

    const heroTag =
        document.querySelector(
            ".hero-content .hero-tag"
        );

    const heroTitle =
        document.querySelector(
            ".hero-content h1"
        );

    const heroText =
        document.querySelector(
            ".hero-content p"
        );

    const heroButtons =
        document.querySelectorAll(
            ".hero-btn"
        );

    const experienceBox =
        document.querySelector(
            ".experience-box"
        );


    if (heroTag) {

        gsap.from(heroTag, {
            opacity: 0,
            x: -50,
            duration: 1,
            delay: 0.8,
            ease: "power3.out"
        });

    }


    if (heroTitle) {

        gsap.from(heroTitle, {
            opacity: 0,
            y: 70,
            duration: 1.2,
            delay: 1,
            ease: "power3.out"
        });

    }


    if (heroText) {

        gsap.from(heroText, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.3,
            ease: "power3.out"
        });

    }


    if (heroButtons.length) {

        gsap.from(heroButtons, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.5,
            stagger: 0.15,
            ease: "power3.out"
        });

    }


    /* Floating experience box */

    if (experienceBox) {

        gsap.to(experienceBox, {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

    }

}


/* =====================================================
   12. IMAGE PARALLAX
====================================================== */

const images =
    document.querySelectorAll(
        ".about-image img, " +
        ".why-image img, " +
        ".process-image img"
    );


if (images.length) {

    function updateParallax() {

        const scrollValue =
            window.scrollY;

        images.forEach((image, index) => {

            const speed =
                index % 2 === 0
                    ? 0.015
                    : 0.01;

            image.style.transform =
                `translateY(${scrollValue * speed}px)`;

        });

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );

}


/* =====================================================
   13. SMOOTH ANCHOR SCROLL
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

                let target = null;

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

                closeMenu();

            }
        );

    });


/* =====================================================
   14. AOS REFRESH AFTER LOAD
====================================================== */

window.addEventListener("load", () => {

    if (typeof AOS !== "undefined") {
        AOS.refresh();
    }

});


/* =====================================================
   15. HERO SLIDER PAUSE ON HOVER
====================================================== */

const heroSlider =
    document.querySelector(".hero-slider");

if (heroSlider && slides.length > 1) {

    heroSlider.addEventListener(
        "mouseenter",
        () => {
            clearInterval(sliderInterval);
        }
    );

    heroSlider.addEventListener(
        "mouseleave",
        () => {
            startHeroSlider();
        }
    );

}


/* =====================================================
   16. KEYBOARD SLIDER CONTROL
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (!slides.length) return;

        if (event.key === "ArrowRight") {

            showSlide(currentSlide + 1);
            startHeroSlider();

        }

        if (event.key === "ArrowLeft") {

            showSlide(currentSlide - 1);
            startHeroSlider();

        }

    }
);


});
