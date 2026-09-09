/* =========================================================
CONSTRUCTA DEVELOPERS
BLOG / JOURNAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   01. PRELOADER
====================================================== */

const preloader =
    document.querySelector(".preloader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add("hide");

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
   03. HEADER SCROLL
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

    document.body.classList.remove(
        "menu-open"
    );

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

    document.body.classList.add(
        "menu-open"
    );

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const isOpen =
                navMenu.classList.contains("open") ||
                navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );


    /* Close after clicking nav link */

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
   05. ESCAPE KEY
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =====================================================
   06. CLOSE MENU ON RESIZE
====================================================== */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 991) {
            closeMenu();
        }

    }
);


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
    document.querySelectorAll(
        ".hero-slide"
    );

const slideNumber =
    document.getElementById(
        "slideNumber"
    );

let currentSlide = 0;
let sliderInterval = null;


function changeSlide(index) {

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


    if (slideNumber) {

        slideNumber.textContent =
            String(index + 1)
                .padStart(2, "0");

    }


    currentSlide = index;

}


function startSlider() {

    if (slides.length <= 1) return;

    clearInterval(sliderInterval);

    sliderInterval =
        setInterval(() => {

            changeSlide(
                currentSlide + 1
            );

        }, 5000);

}


if (slides.length > 0) {

    changeSlide(0);

    startSlider();

}


/* =====================================================
   09. HERO SLIDER BUTTONS
====================================================== */

const nextSlideBtn =
    document.getElementById(
        "nextSlide"
    );

const prevSlideBtn =
    document.getElementById(
        "prevSlide"
    );


if (nextSlideBtn) {

    nextSlideBtn.addEventListener(
        "click",
        () => {

            changeSlide(
                currentSlide + 1
            );

            startSlider();

        }
    );

}


if (prevSlideBtn) {

    prevSlideBtn.addEventListener(
        "click",
        () => {

            changeSlide(
                currentSlide - 1
            );

            startSlider();

        }
    );

}


/* =====================================================
   10. PAUSE SLIDER ON HOVER
====================================================== */

const heroSlider =
    document.querySelector(
        ".hero-slider"
    );


if (
    heroSlider &&
    slides.length > 1
) {

    heroSlider.addEventListener(
        "mouseenter",
        () => {
            clearInterval(
                sliderInterval
            );
        }
    );


    heroSlider.addEventListener(
        "mouseleave",
        () => {
            startSlider();
        }
    );

}


/* =====================================================
   11. KEYBOARD SLIDER CONTROL
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (!slides.length) return;

        if (event.key === "ArrowRight") {

            changeSlide(
                currentSlide + 1
            );

            startSlider();

        }


        if (event.key === "ArrowLeft") {

            changeSlide(
                currentSlide - 1
            );

            startSlider();

        }

    }
);


/* =====================================================
   12. GSAP HERO ANIMATION
====================================================== */

if (typeof gsap !== "undefined") {

    const heroSmall =
        document.querySelector(
            ".hero-small"
        );

    const heroTitle =
        document.querySelector(
            ".hero-inner h1"
        );

    const heroText =
        document.querySelector(
            ".hero-inner p"
        );

    const heroLink =
        document.querySelectorAll(
            ".hero-link"
        );

    const ctaNumber =
        document.querySelector(
            ".cta-number"
        );


    /* Small hero text */

    if (heroSmall) {

        gsap.from(heroSmall, {

            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: 0.7,
            ease: "power3.out"

        });

    }


    /* Hero title */

    if (heroTitle) {

        gsap.from(heroTitle, {

            opacity: 0,
            y: 80,
            duration: 1.1,
            delay: 0.9,
            ease: "power3.out"

        });

    }


    /* Hero paragraph */

    if (heroText) {

        gsap.from(heroText, {

            opacity: 0,
            y: 30,
            duration: 0.7,
            delay: 1.2,
            ease: "power3.out"

        });

    }


    /* Hero button */

    if (heroLink.length) {

        gsap.from(heroLink, {

            opacity: 0,
            y: 25,
            duration: 0.6,
            delay: 1.4,
            stagger: 0.15,
            ease: "power3.out"

        });

    }


    /* CTA floating effect */

    if (ctaNumber) {

        gsap.to(ctaNumber, {

            y: -12,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"

        });

    }

}


/* =====================================================
   13. IMAGE PARALLAX
====================================================== */

const parallaxImages =
    document.querySelectorAll(
        ".featured-image img, " +
        ".split-image img, " +
        ".trend-image img"
    );


if (parallaxImages.length) {

    function updateParallax() {

        const scrollPosition =
            window.scrollY;

        parallaxImages.forEach(
            (image, index) => {

                const speed =
                    index % 2 === 0
                        ? 0.015
                        : 0.01;

                image.style.transform =
                    `translateY(${scrollPosition * speed}px)`;

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );

}


/* =====================================================
   14. NEWSLETTER
====================================================== */

const newsletter = document.querySelector(".newsletter-form");

if (newsletter) {
    newsletter.addEventListener("submit", function (event) {
        event.preventDefault();

        const input = newsletter.querySelector("input");
        const button = newsletter.querySelector("button");

        if (!input || !button) return;

        const email = input.value.trim();

        // Empty email
        if (!email) {
            input.focus();
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            input.focus();
            return;
        }

        // Success message
        button.innerHTML =
            'Subscribed <i class="fa-solid fa-check"></i>';

        button.classList.add("subscribed");
        button.disabled = true;

        input.value = "";

        // Redirect after 3 seconds
        setTimeout(function () {
            window.location.href = "404.html";
        }, 3000);
    });
}



/* =====================================================
   15. MAGNETIC HOVER BUTTONS
====================================================== */

const magneticElements =
    document.querySelectorAll(
        ".hero-link, " +
        ".nav-button, " +
        ".read-more, " +
        ".dark-read"
    );


magneticElements.forEach(
    element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    }
);


/* =====================================================
   16. SMOOTH ANCHOR SCROLL
====================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


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
   17. AOS REFRESH
====================================================== */

window.addEventListener(
    "load",
    () => {

        if (
            typeof AOS !== "undefined"
        ) {

            AOS.refresh();

        }

    }
);


});
