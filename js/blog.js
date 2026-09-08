
/* =========================================================
   CONSTRUCTA DEVELOPERS
   BLOG / JOURNAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            document
                .querySelector(".preloader")
                ?.classList.add("hide");

        }, 500);

    });


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle?.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        menuToggle.classList.toggle("active");

    });


    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

        });

    });


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides = document.querySelectorAll(".hero-slide");
    const slideNumber = document.getElementById("slideNumber");

    let currentSlide = 0;

    function changeSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        slides[index].classList.add("active");

        if (slideNumber) {

            slideNumber.textContent =
                String(index + 1).padStart(2, "0");

        }

    }


    if (slides.length > 1) {

        setInterval(() => {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            changeSlide(currentSlide);

        }, 5000);

    }


    /* =====================================================
       GSAP HERO ANIMATION
    ===================================================== */

    if (typeof gsap !== "undefined") {

        const heroTimeline = gsap.timeline({
            delay: 0.9
        });

        heroTimeline
            .from(".hero-small", {
                opacity: 0,
                x: -50,
                duration: .8
            })
            .from(".hero-inner h1", {
                opacity: 0,
                y: 80,
                duration: 1.1,
                ease: "power3.out"
            })
            .from(".hero-inner p", {
                opacity: 0,
                y: 30,
                duration: .7
            })
            .from(".hero-link", {
                opacity: 0,
                y: 25,
                duration: .6
            });


        /* CTA floating effect */

        gsap.to(".cta-number", {
            y: -12,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

    }


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const parallaxImages = document.querySelectorAll(
        ".featured-image img, .split-image img, .trend-image img"
    );

    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY;

        parallaxImages.forEach((image, index) => {

            const speed = index % 2 === 0
                ? 0.015
                : 0.01;

            image.style.transform =
                `translateY(${scrollPosition * speed}px)`;

        });

    });


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletter = document.querySelector(".newsletter-form");

    newsletter?.addEventListener("submit", event => {

        event.preventDefault();

        const input = newsletter.querySelector("input");
        const button = newsletter.querySelector("button");

        if (!input.value.trim()) return;

        button.innerHTML =
            'Subscribed <i class="fa-solid fa-check"></i>';

        button.style.background = "#ffffff";

        input.value = "";

    });


    /* =====================================================
       MAGNETIC HOVER BUTTONS
    ===================================================== */

    const magneticElements = document.querySelectorAll(
        ".hero-link, .nav-button, .read-more, .dark-read"
    );

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", event => {

            const rect = element.getBoundingClientRect();

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

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform = "";

        });

    });

});

