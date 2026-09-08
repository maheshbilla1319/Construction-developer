
/* =========================================================
   CONSTRUCTA DEVELOPERS
   SERVICES PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            document.querySelector(".preloader")
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
       HEADER SCROLL
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

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }


    if (slides.length > 1) {

        setInterval(() => {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            showSlide(currentSlide);

        }, 5000);

    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 80));

            function updateCounter() {

                current += increment;

                if (current >= target) {
                    current = target;
                }

                counter.textContent = current;

                if (current < target) {
                    requestAnimationFrame(updateCounter);
                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       GSAP HERO ANIMATION
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".hero-content .hero-tag", {
            opacity: 0,
            x: -50,
            duration: 1,
            delay: 1
        });

        gsap.from(".hero-content h1", {
            opacity: 0,
            y: 70,
            duration: 1.2,
            delay: 1.1,
            ease: "power3.out"
        });

        gsap.from(".hero-content p", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.4
        });

        gsap.from(".hero-btn", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.6
        });


        /* Floating experience box */

        gsap.to(".experience-box", {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

    }


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const images = document.querySelectorAll(
        ".about-image img, .why-image img, .process-image img"
    );

    window.addEventListener("scroll", () => {

        const scrollValue = window.scrollY;

        images.forEach((image, index) => {

            const speed = index % 2 === 0 ? 0.015 : 0.01;

            image.style.transform =
                `translateY(${scrollValue * speed}px)`;

        });

    });


    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

