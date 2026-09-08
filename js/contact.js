
/* =========================================================
   CONSTRUCTA DEVELOPERS
   CONTACT PAGE JS
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

    function changeSlide(index) {

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

            changeSlide(currentSlide);

        }, 5000);

    }


    /* =====================================================
       GSAP HERO ANIMATION
    ===================================================== */

    if (typeof gsap !== "undefined") {

        const timeline = gsap.timeline({
            delay: .8
        });

        timeline
            .from(".hero-label", {
                opacity: 0,
                x: -50,
                duration: .8
            })
            .from(".hero-content h1", {
                opacity: 0,
                y: 80,
                duration: 1.1,
                ease: "power3.out"
            })
            .from(".hero-content p", {
                opacity: 0,
                y: 30,
                duration: .7
            })
            .from(".hero-button", {
                opacity: 0,
                y: 25,
                duration: .6
            });


        /* Floating CTA animation */

        gsap.to(".story-stat strong", {

            y: -8,

            duration: 1.8,

            repeat: -1,

            yoyo: true,

            ease: "power1.inOut"

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const button =
            item.querySelector(".faq-question");

        button.addEventListener("click", () => {

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("open");

                }

            });

            item.classList.toggle("open");

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form = document.getElementById("projectForm");
    const formMessage = document.getElementById("formMessage");

    form?.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            form.querySelector('[name="name"]').value.trim();

        const email =
            form.querySelector('[name="email"]').value.trim();

        const message =
            form.querySelector('[name="message"]').value.trim();


        if (!name || !email || !message) {

            formMessage.textContent =
                "Please complete the required fields.";

            return;

        }


        formMessage.textContent =
            "Thank you! Your project enquiry has been received.";

        form.reset();

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(
        ".hero-button, .nav-button, .cta-button, .map-button"
    );

    buttons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * .08}px, ${y * .08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const images = document.querySelectorAll(
        ".story-image img, .form-image img, .cta-image img"
    );

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        images.forEach((image, index) => {

            const speed =
                index % 2 === 0 ? .012 : .008;

            image.style.transform =
                `translateY(${scrollY * speed}px)`;

        });

    });


});

