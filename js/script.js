
/* =========================================================
   CONSTRUCTA DEVELOPERS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. WAIT FOR DOM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       02. AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 100,
            delay: 0
        });

    }


    /* =====================================================
       03. GSAP INITIALIZATION
    ===================================================== */

    if (typeof gsap !== "undefined") {

        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }


        /* =================================================
           HERO INTRO ANIMATION
        ================================================= */

        const heroItems = document.querySelectorAll(".gsap-hero-item");

        if (heroItems.length) {

            gsap.from(heroItems, {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.3
            });

        }


        /* =================================================
           HERO IMAGE ZOOM
        ================================================= */

        const heroImage = document.querySelector(".hero-image");

        if (heroImage) {

            gsap.to(heroImage, {
                scale: 1,
                duration: 1.8,
                ease: "power3.out"
            });

        }


        /* =================================================
           HERO IMAGE PARALLAX
        ================================================= */

        if (
            typeof ScrollTrigger !== "undefined" &&
            heroImage
        ) {

            gsap.to(heroImage, {

                yPercent: 12,

                ease: "none",

                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }

            });

        }


        /* =================================================
           SERVICE CARD ANIMATION
        ================================================= */

        const serviceCards =
            document.querySelectorAll(".service-card");

        if (
            serviceCards.length &&
            typeof ScrollTrigger !== "undefined"
        ) {

            gsap.from(serviceCards, {

                y: 80,
                opacity: 0,

                duration: 0.9,

                stagger: 0.15,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".services-bento",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }

            });

        }


        /* =================================================
           FEATURED PROJECT IMAGE REVEAL
        ================================================= */

        const projectImage =
            document.querySelector(".project-image");

        if (
            projectImage &&
            typeof ScrollTrigger !== "undefined"
        ) {

            gsap.from(projectImage, {

                clipPath: "inset(0 100% 0 0)",

                duration: 1.2,

                ease: "power3.inOut",

                scrollTrigger: {
                    trigger: projectImage,
                    start: "top 80%"
                }

            });

        }


        /* =================================================
           WHY US ITEMS
        ================================================= */

        const whyItems =
            document.querySelectorAll(".why-item");

        if (
            whyItems.length &&
            typeof ScrollTrigger !== "undefined"
        ) {

            gsap.from(whyItems, {

                x: 80,
                opacity: 0,

                duration: 0.8,

                stagger: 0.15,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".why-list",
                    start: "top 80%"
                }

            });

        }


        /* =================================================
           CTA ANIMATION
        ================================================= */

        const ctaTitle =
            document.querySelector(".cta-container h2");

        if (
            ctaTitle &&
            typeof ScrollTrigger !== "undefined"
        ) {

            gsap.from(ctaTitle, {

                y: 70,
                opacity: 0,

                duration: 1,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 75%"
                }

            });

        }

    }


    /* =====================================================
       04. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       05. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

        });


        /* ================================================
           CLOSE MOBILE MENU WHEN LINK IS CLICKED
        ================================================ */

        const navLinks =
            nav.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            });

        });

    }


    /* =====================================================
       06. COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        if (!target) return;


        /* ================================================
           GSAP COUNTER
        ================================================ */

        if (
            typeof gsap !== "undefined" &&
            typeof ScrollTrigger !== "undefined"
        ) {

            const counterObject = {
                value: 0
            };

            gsap.to(counterObject, {

                value: target,

                duration: 2.2,

                ease: "power2.out",

                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    once: true
                },

                onUpdate: () => {

                    counter.textContent =
                        Math.floor(
                            counterObject.value
                        );

                }

            });

        } else {

            /* ============================================
               FALLBACK COUNTER
            ============================================ */

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 80));

            const timer =
                setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    counter.textContent = current;

                }, 25);

        }

    });


    /* =====================================================
       07. TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(".testimonial");

    const prevButton =
        document.querySelector(".testimonial-btn.prev");

    const nextButton =
        document.querySelector(".testimonial-btn.next");

    let currentTestimonial = 0;


    function showTestimonial(index, direction = 1) {

        if (!testimonials.length) return;

        testimonials.forEach(item => {

            item.classList.remove("active");

        });

        currentTestimonial =
            (index + testimonials.length) %
            testimonials.length;

        const current =
            testimonials[currentTestimonial];

        current.classList.add("active");


        /* ================================================
           GSAP TESTIMONIAL ENTRANCE
        ================================================ */

        if (typeof gsap !== "undefined") {

            gsap.fromTo(
                current,

                {
                    opacity: 0,
                    x: direction * 60,
                    scale: 0.94,
                    rotate: direction * 1.5
                },

                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 0.65,
                    ease: "power3.out"
                }
            );


            /* ============================================
               QUOTE ANIMATION
            ============================================ */

            const quote =
                current.querySelector("blockquote");

            const client =
                current.querySelector(".client");

            if (quote) {

                gsap.from(quote, {

                    y: 25,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.15,
                    ease: "power2.out"

                });

            }

            if (client) {

                gsap.from(client, {

                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.25,
                    ease: "power2.out"

                });

            }

        }

    }


    if (testimonials.length) {

        showTestimonial(0);


        /* ================================================
           PREVIOUS
        ================================================ */

        if (prevButton) {

            prevButton.addEventListener(
                "click",
                () => {

                    showTestimonial(
                        currentTestimonial - 1,
                        -1
                    );

                }
            );

        }


        /* ================================================
           NEXT
        ================================================ */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    showTestimonial(
                        currentTestimonial + 1,
                        1
                    );

                }
            );

        }


        /* ================================================
           AUTO SLIDE
        ================================================ */

        let testimonialTimer =
            setInterval(() => {

                showTestimonial(
                    currentTestimonial + 1,
                    1
                );

            }, 6000);


        /* ================================================
           PAUSE AUTO SLIDER ON HOVER
        ================================================ */

        const slider =
            document.querySelector(
                ".testimonial-slider"
            );

        if (slider) {

            slider.addEventListener(
                "mouseenter",
                () => {
                    clearInterval(testimonialTimer);
                }
            );

            slider.addEventListener(
                "mouseleave",
                () => {

                    testimonialTimer =
                        setInterval(() => {

                            showTestimonial(
                                currentTestimonial + 1,
                                1
                            );

                        }, 6000);

                }
            );

        }

    }


    /* =====================================================
       08. BUTTON HOVER GSAP
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .signup-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                if (typeof gsap === "undefined") return;

                gsap.to(button, {

                    y: -3,

                    duration: 0.25,

                    ease: "power2.out"

                });

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                if (typeof gsap === "undefined") return;

                gsap.to(button, {

                    y: 0,

                    duration: 0.25,

                    ease: "power2.out"

                });

            }
        );

    });


    /* =====================================================
       09. SMOOTH IMAGE HOVER
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );

    projectImages.forEach(image => {

        image.addEventListener(
            "mouseenter",
            () => {

                if (typeof gsap === "undefined") return;

                gsap.to(image, {

                    scale: 1.05,

                    duration: 0.7,

                    ease: "power3.out"

                });

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                if (typeof gsap === "undefined") return;

                gsap.to(image, {

                    scale: 1,

                    duration: 0.7,

                    ease: "power3.out"

                });

            }
        );

    });


    /* =====================================================
       10. ESC KEY CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!menuToggle || !nav) return;

        menuToggle.classList.remove("active");

        nav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    });


    /* =====================================================
       11. PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        const preloader =
            document.querySelector(".preloader");

        if (!preloader) return;


        if (typeof gsap !== "undefined") {

            gsap.to(preloader, {

                opacity: 0,

                duration: 0.7,

                delay: 0.3,

                ease: "power2.out",

                onComplete: () => {

                    preloader.style.display = "none";

                }

            });

        } else {

            preloader.style.display = "none";

        }

    });


    /* =====================================================
       12. REFRESH AOS AFTER DYNAMIC CONTENT
    ===================================================== */

    window.addEventListener("load", () => {

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }

    });

});
/* =========================
   SERVICES AUTO SLIDER
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".services-bento");
    const cards = document.querySelectorAll(".service-card");

    if (!slider || cards.length === 0) return;

    let currentIndex = 0;
    let autoSlide;

    function slideServices() {

        currentIndex++;

        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        const card = cards[currentIndex];

        slider.scrollTo({
            left: card.offsetLeft - slider.offsetLeft,
            behavior: "smooth"
        });
    }

    function startSlider() {
        autoSlide = setInterval(slideServices, 3000);
    }

    function stopSlider() {
        clearInterval(autoSlide);
    }

    startSlider();

    /* Pause when mouse is over slider */
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);

    /* Pause while touching on mobile */
    slider.addEventListener("touchstart", stopSlider);
    slider.addEventListener("touchend", startSlider);

});


document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PROJECT NAVIGATION
    ========================== */

    // All Projects button
    const allProjectsBtn = document.querySelector(
        '.projects-showcase .text-link'
    );

    if (allProjectsBtn) {
        allProjectsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "404.html";
        });
    }


    // View Project buttons
    const projectLinks = document.querySelectorAll(
        ".project-card-content a"
    );

    projectLinks.forEach((link) => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const projectCard = link.closest(".project-card");
            const projectTitle = projectCard
                ?.querySelector("h3")
                ?.textContent
                .trim();

            // Save selected project
            if (projectTitle) {
                localStorage.setItem(
                    "selectedProject",
                    projectTitle
                );
            }

            // Open projects page
            window.location.href = "404.html";

        });

    });

});



document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOVING PROJECT BANNER SLIDER
    ===================================================== */

    const movingBanner = document.querySelector(".moving-banner");

    if (movingBanner) {

        const slides = movingBanner.querySelectorAll(".moving-slide");
        const prevButton = movingBanner.querySelector(".moving-prev");
        const nextButton = movingBanner.querySelector(".moving-next");
        const dots = movingBanner.querySelectorAll(".moving-dot");
        const progressBar = movingBanner.querySelector(".moving-progress span");

        let currentSlide = 0;
        let autoPlay;
        const slideTime = 5000;


        /* ---------------------------------------------
           SHOW SLIDE
        --------------------------------------------- */

        function showSlide(index) {

            if (index >= slides.length) {
                index = 0;
            }

            if (index < 0) {
                index = slides.length - 1;
            }

            currentSlide = index;


            /* Remove active from all slides */
            slides.forEach((slide) => {
                slide.classList.remove("active");
                slide.setAttribute("aria-hidden", "true");
            });


            /* Add active to selected slide */
            slides[currentSlide].classList.add("active");
            slides[currentSlide].setAttribute(
                "aria-hidden",
                "false"
            );


            /* Update dots */
            dots.forEach((dot, i) => {

                dot.classList.remove("active");
                dot.removeAttribute("aria-current");

                if (i === currentSlide) {

                    dot.classList.add("active");

                    dot.setAttribute(
                        "aria-current",
                        "true"
                    );
                }

            });


            /* -----------------------------------------
               PROGRESS BAR
            ----------------------------------------- */

            if (progressBar) {

                progressBar.style.transition = "none";
                progressBar.style.width = "0%";

                void progressBar.offsetWidth;

                progressBar.style.transition =
                    `width ${slideTime}ms linear`;

                progressBar.style.width = "100%";
            }


            /* -----------------------------------------
               GSAP ANIMATION
            ----------------------------------------- */

            if (typeof gsap !== "undefined") {

                const activeSlide =
                    slides[currentSlide];

                const image =
                    activeSlide.querySelector("img");

                const content =
                    activeSlide.querySelector(".moving-content");


                if (image) {

                    gsap.fromTo(
                        image,
                        {
                            scale: 1.1
                        },
                        {
                            scale: 1,
                            duration: 1.5,
                            ease: "power2.out"
                        }
                    );

                }


                if (content) {

                    gsap.fromTo(
                        content,
                        {
                            opacity: 0,
                            y: 40
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out"
                        }
                    );

                }

            }

        }


        /* =================================================
           NEXT BUTTON
        ================================================= */

        if (nextButton) {

            nextButton.addEventListener("click", function () {

                showSlide(currentSlide + 1);

                restartAutoPlay();

            });

        }


        /* =================================================
           PREVIOUS BUTTON
        ================================================= */

        if (prevButton) {

            prevButton.addEventListener("click", function () {

                showSlide(currentSlide - 1);

                restartAutoPlay();

            });

        }


        /* =================================================
           DOT BUTTONS
        ================================================= */

        dots.forEach((dot) => {

            dot.addEventListener("click", function () {

                const slideNumber =
                    parseInt(
                        dot.getAttribute("data-slide"),
                        10
                    );

                if (!isNaN(slideNumber)) {

                    showSlide(slideNumber);

                    restartAutoPlay();

                }

            });

        });


        /* =================================================
           AUTO PLAY
        ================================================= */

        function startAutoPlay() {

            stopAutoPlay();

            autoPlay = setInterval(function () {

                showSlide(currentSlide + 1);

            }, slideTime);

        }


        function stopAutoPlay() {

            if (autoPlay) {

                clearInterval(autoPlay);

                autoPlay = null;
            }

        }


        function restartAutoPlay() {

            stopAutoPlay();

            startAutoPlay();

        }


        /* =================================================
           PAUSE ON HOVER
        ================================================= */

        movingBanner.addEventListener(
            "mouseenter",
            function () {

                stopAutoPlay();

            }
        );


        movingBanner.addEventListener(
            "mouseleave",
            function () {

                startAutoPlay();

            }
        );


        /* =================================================
           KEYBOARD CONTROL
        ================================================= */

        movingBanner.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "ArrowRight") {

                    showSlide(currentSlide + 1);

                    restartAutoPlay();

                }


                if (event.key === "ArrowLeft") {

                    showSlide(currentSlide - 1);

                    restartAutoPlay();

                }

            }
        );


        /* =================================================
           TOUCH SWIPE
        ================================================= */

        let touchStartX = 0;
        let touchEndX = 0;


        movingBanner.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        movingBanner.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;


                if (Math.abs(difference) < 50) {
                    return;
                }


                if (difference > 0) {

                    showSlide(currentSlide + 1);

                } else {

                    showSlide(currentSlide - 1);

                }


                restartAutoPlay();

            },
            { passive: true }
        );


        /* =================================================
           START SLIDER
        ================================================= */

        showSlide(0);
        startAutoPlay();


        /* =================================================
           STOP WHEN TAB IS NOT ACTIVE
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    stopAutoPlay();

                } else {

                    restartAutoPlay();

                }

            }
        );

    }


    /* =====================================================
       PROJECT BUTTONS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(function (card, index) {

        const viewButton =
            card.querySelector(
                ".project-card-content a"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function () {

                    const title =
                        card.querySelector("h3");

                    const category =
                        card.querySelector(
                            ".project-card-content > span"
                        );

                    const location =
                        card.querySelector(
                            ".project-card-content p"
                        );


                    const projectData = {

                        id: index + 1,

                        title: title
                            ? title.textContent.trim()
                            : "",

                        category: category
                            ? category.textContent.trim()
                            : "",

                        location: location
                            ? location.textContent.trim()
                            : ""

                    };


                    /* Save selected project */

                    localStorage.setItem(
                        "selectedProject",
                        JSON.stringify(projectData)
                    );

                }
            );

        }

    });


    /* =====================================================
       ALL PROJECTS BUTTON
    ===================================================== */

    const allProjects =
        document.querySelector(
            ".projects-showcase .text-link"
        );


    if (allProjects) {

        allProjects.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "selectedProject"
                );

            }
        );

    }


    /* =====================================================
       PROJECT IMAGE HOVER
    ===================================================== */

    document
        .querySelectorAll(".project-card-image")
        .forEach(function (imageBox) {

            const image =
                imageBox.querySelector("img");


            if (!image) return;


            imageBox.addEventListener(
                "mouseenter",
                function () {

                    if (typeof gsap !== "undefined") {

                        gsap.to(image, {
                            scale: 1.08,
                            duration: 0.5,
                            ease: "power2.out"
                        });

                    } else {

                        image.style.transform =
                            "scale(1.08)";

                    }

                }
            );


            imageBox.addEventListener(
                "mouseleave",
                function () {

                    if (typeof gsap !== "undefined") {

                        gsap.to(image, {
                            scale: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });

                    } else {

                        image.style.transform =
                            "scale(1)";

                    }

                }
            );

        });


    /* =====================================================
       MOVING BUTTON HOVER
    ===================================================== */

    document
        .querySelectorAll(".moving-btn")
        .forEach(function (button) {

            button.addEventListener(
                "mouseenter",
                function () {

                    const icon =
                        button.querySelector("i");


                    if (typeof gsap !== "undefined") {

                        gsap.to(button, {
                            x: 5,
                            duration: 0.25
                        });


                        if (icon) {

                            gsap.to(icon, {
                                x: 5,
                                duration: 0.25
                            });

                        }

                    }

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    const icon =
                        button.querySelector("i");


                    if (typeof gsap !== "undefined") {

                        gsap.to(button, {
                            x: 0,
                            duration: 0.25
                        });


                        if (icon) {

                            gsap.to(icon, {
                                x: 0,
                                duration: 0.25
                            });

                        }

                    }

                }
            );


            /* Save selected service */

            button.addEventListener(
                "click",
                function () {

                    const slide =
                        button.closest(".moving-slide");


                    if (!slide) return;


                    const service =
                        slide.querySelector(
                            ".moving-eyebrow"
                        );


                    if (service) {

                        localStorage.setItem(
                            "selectedService",
                            service.textContent.trim()
                        );

                    }

                }
            );

        });


    /* =====================================================
       PROJECT CARD HOVER
    ===================================================== */

    projectCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                if (typeof gsap !== "undefined") {

                    gsap.to(card, {
                        y: -8,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                if (typeof gsap !== "undefined") {

                    gsap.to(card, {
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                }

            }
        );

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    if (counters.length) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const counter =
                            entry.target;


                        if (
                            counter.dataset.animated ===
                            "true"
                        ) {
                            return;
                        }


                        counter.dataset.animated =
                            "true";


                        const target =
                            parseInt(
                                counter.dataset.target,
                                10
                            );


                        if (isNaN(target)) return;


                        if (typeof gsap !== "undefined") {

                            const value = {
                                number: 0
                            };


                            gsap.to(value, {

                                number: target,

                                duration: 2,

                                ease: "power2.out",

                                onUpdate: function () {

                                    counter.textContent =
                                        Math.floor(
                                            value.number
                                        );

                                }

                            });

                        }

                        observer.unobserve(counter);

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(function (counter) {

            observer.observe(counter);

        });

    }


    /* =====================================================
       AOS REFRESH
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }


    /* =====================================================
       SCROLLTRIGGER REFRESH
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        ScrollTrigger.refresh();

    }

});

