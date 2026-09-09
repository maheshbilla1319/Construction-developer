/* =========================================================
CONSTRUCTA DEVELOPERS
CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


/* =====================================================
   01. PRELOADER
====================================================== */

const preloader =
    document.querySelector(".preloader");

window.addEventListener("load", function () {

    setTimeout(function () {

        if (preloader) {

            preloader.classList.add("hide");

            setTimeout(function () {
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
        function (event) {

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


    /* Close menu after clicking link */

    navMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {
                    closeMenu();
                }
            );

        });

}


/* =====================================================
   05. ESCAPE KEY CLOSE MENU
====================================================== */

document.addEventListener(
    "keydown",
    function (event) {

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
    function () {

        if (window.innerWidth > 991) {
            closeMenu();
        }

    }
);


/* =====================================================
   07. ACTIVE NAVIGATION LINK
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


navLinks.forEach(function (link) {

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

const nextSlideBtn =
    document.getElementById(
        "nextSlide"
    );

const prevSlideBtn =
    document.getElementById(
        "prevSlide"
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


    slides.forEach(function (slide) {
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
        setInterval(function () {

            changeSlide(
                currentSlide + 1
            );

        }, 5000);

}


if (slides.length > 0) {

    changeSlide(0);

    startSlider();

}


/* NEXT BUTTON */

if (nextSlideBtn) {

    nextSlideBtn.addEventListener(
        "click",
        function () {

            changeSlide(
                currentSlide + 1
            );

            startSlider();

        }
    );

}


/* PREVIOUS BUTTON */

if (prevSlideBtn) {

    prevSlideBtn.addEventListener(
        "click",
        function () {

            changeSlide(
                currentSlide - 1
            );

            startSlider();

        }
    );

}


/* =====================================================
   09. GSAP HERO ANIMATION
====================================================== */

if (typeof gsap !== "undefined") {

    const heroLabel =
        document.querySelector(
            ".hero-label"
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
            ".hero-button"
        );

    const storyStats =
        document.querySelectorAll(
            ".story-stat strong"
        );


    if (heroLabel) {

        gsap.from(heroLabel, {

            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: 0.7,
            ease: "power3.out"

        });

    }


    if (heroTitle) {

        gsap.from(heroTitle, {

            opacity: 0,
            y: 80,
            duration: 1.1,
            delay: 0.9,
            ease: "power3.out"

        });

    }


    if (heroText) {

        gsap.from(heroText, {

            opacity: 0,
            y: 30,
            duration: 0.7,
            delay: 1.2,
            ease: "power3.out"

        });

    }


    if (heroButtons.length) {

        gsap.from(heroButtons, {

            opacity: 0,
            y: 25,
            duration: 0.6,
            delay: 1.4,
            stagger: 0.15,
            ease: "power3.out"

        });

    }


    /* Floating CTA / Stats */

    storyStats.forEach(function (stat) {

        gsap.to(stat, {

            y: -8,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"

        });

    });

}


/* =====================================================
   10. FAQ ACCORDION
====================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(function (item) {

    const button =
        item.querySelector(
            ".faq-question"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            const wasOpen =
                item.classList.contains(
                    "open"
                );


            /* Close all */

            faqItems.forEach(
                function (otherItem) {

                    otherItem.classList.remove(
                        "open"
                    );

                    const otherButton =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );


            /* Open selected */

            if (!wasOpen) {

                item.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});


/* =====================================================
   11. PROJECT ENQUIRY FORM
====================================================== */

const form =
    document.getElementById(
        "projectForm"
    );

const message =
    document.getElementById(
        "formMessage"
    );


if (form && message) {


    /* =================================================
       MESSAGE FUNCTIONS
    ================================================= */

    function showError(text) {

        message.textContent = text;

        message.className =
            "form-message error";

        message.style.color =
            "#dc2626";

        message.style.background =
            "#fef2f2";

        message.style.border =
            "1px solid #fecaca";

        message.style.padding =
            "12px 15px";

        message.style.marginTop =
            "15px";

        message.style.borderRadius =
            "6px";

    }


    function showSuccess(text) {

        message.textContent = text;

        message.className =
            "form-message success";

        message.style.color =
            "#15803d";

        message.style.background =
            "#f0fdf4";

        message.style.border =
            "1px solid #bbf7d0";

        message.style.padding =
            "12px 15px";

        message.style.marginTop =
            "15px";

        message.style.borderRadius =
            "6px";

    }


    function resetMessage() {

        message.textContent = "";

        message.className =
            "form-message";

        message.removeAttribute(
            "style"
        );

    }


    /* =================================================
       FORM SUBMIT
    ================================================= */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get fields */

            const nameInput =
                form.querySelector(
                    '[name="name"]'
                );

            const phoneInput =
                form.querySelector(
                    '[name="phone"]'
                );

            const emailInput =
                form.querySelector(
                    '[name="email"]'
                );

            const projectInput =
                form.querySelector(
                    '[name="project"]'
                );

            const budgetInput =
                form.querySelector(
                    '[name="budget"]:checked'
                );

            const detailsInput =
                form.querySelector(
                    '[name="message"]'
                );


            /* Check fields */

            if (
                !nameInput ||
                !phoneInput ||
                !emailInput ||
                !projectInput ||
                !detailsInput
            ) {

                console.error(
                    "Contact form fields are missing."
                );

                showError(
                    "Some form fields are missing. Please check your HTML."
                );

                return;

            }


            /* Get values */

            const name =
                nameInput.value.trim();

            const phone =
                phoneInput.value.trim();

            const email =
                emailInput.value.trim();

            const project =
                projectInput.value.trim();

            const details =
                detailsInput.value.trim();


            resetMessage();


            /* =================================================
               NAME VALIDATION
            ================================================= */

            if (name === "") {

                showError(
                    "Please enter your name."
                );

                nameInput.focus();

                return;

            }


            if (name.length < 3) {

                showError(
                    "Name must contain at least 3 characters."
                );

                nameInput.focus();

                return;

            }


            /* =================================================
               PHONE VALIDATION
            ================================================= */

            if (phone === "") {

                showError(
                    "Please enter your phone number."
                );

                phoneInput.focus();

                return;

            }


            let cleanPhone =
                phone.replace(/\D/g, "");


            /* Remove +91 */

            if (
                cleanPhone.length === 12 &&
                cleanPhone.startsWith("91")
            ) {

                cleanPhone =
                    cleanPhone.substring(2);

            }


            const phonePattern =
                /^[6-9]\d{9}$/;


            if (
                !phonePattern.test(
                    cleanPhone
                )
            ) {

                showError(
                    "Please enter a valid 10-digit Indian phone number."
                );

                phoneInput.focus();

                return;

            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            if (email === "") {

                showError(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showError(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /* =================================================
               PROJECT TYPE
            ================================================= */

            if (project === "") {

                showError(
                    "Please select your project type."
                );

                projectInput.focus();

                return;

            }


            /* =================================================
               BUDGET
            ================================================= */

            if (!budgetInput) {

                showError(
                    "Please select your estimated budget."
                );

                return;

            }


            /* =================================================
               PROJECT DETAILS
            ================================================= */

            if (details === "") {

                showError(
                    "Please enter your project details."
                );

                detailsInput.focus();

                return;

            }


            if (details.length < 10) {

                showError(
                    "Please provide at least 10 characters about your project."
                );

                detailsInput.focus();

                return;

            }


            /* =================================================
               CREATE ENQUIRY
            ================================================= */

            const enquiry = {

                id: Date.now(),

                name: name,

                phone: cleanPhone,

                email: email,

                project: project,

                budget: budgetInput.value,

                details: details,

                submittedAt:
                    new Date().toLocaleString(
                        "en-IN"
                    )

            };


            /* =================================================
               GET EXISTING DATA
            ================================================= */

            let enquiries = [];


            try {

                const storedData =
                    localStorage.getItem(
                        "projectEnquiries"
                    );


                if (storedData) {

                    const parsedData =
                        JSON.parse(
                            storedData
                        );


                    if (
                        Array.isArray(
                            parsedData
                        )
                    ) {

                        enquiries =
                            parsedData;

                    }

                }

            } catch (error) {

                console.error(
                    "Error reading enquiries:",
                    error
                );

                enquiries = [];

            }


            /* =================================================
               SAVE DATA
            ================================================= */

            enquiries.push(enquiry);


            try {

                localStorage.setItem(
                    "projectEnquiries",
                    JSON.stringify(
                        enquiries
                    )
                );

            } catch (error) {

                console.error(
                    "Unable to save enquiry:",
                    error
                );

                showError(
                    "Unable to save your enquiry. Please try again."
                );

                return;

            }


            /* =================================================
               SUCCESS
            ================================================= */
showSuccess(
    "Thank you! Your project enquiry has been submitted successfully."
);


/* Reset form ONCE */

form.reset();


/* Scroll to message */

setTimeout(function () {

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}, 100);


/* Remove success message */

setTimeout(function () {

    resetMessage();

}, 5000);


/* Redirect to 404 page after successful submission */

setTimeout(function () {

    window.location.href = "404.html";

}, 3000);
 
        }
    );


    /* =================================================
       PHONE INPUT
    ================================================= */

    const phoneInput =
        form.querySelector(
            '[name="phone"]'
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                /* Remove 91 prefix */

                if (
                    value.startsWith("91") &&
                    value.length > 10
                ) {

                    value =
                        value.substring(2);

                }


                /* Maximum 10 digits */

                this.value =
                    value.substring(
                        0,
                        10
                    );

            }
        );

    }


    /* =================================================
       NAME INPUT
    ================================================= */

    const nameInput =
        form.querySelector(
            '[name="name"]'
        );


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                    );

            }
        );

    }


    /* =================================================
       CLEAR ERROR WHILE TYPING
    ================================================= */

    form.querySelectorAll(
        "input, select, textarea"
    ).forEach(function (field) {

        field.addEventListener(
            "input",
            function () {

                if (
                    message.classList.contains(
                        "error"
                    )
                ) {

                    resetMessage();

                }

            }
        );


        field.addEventListener(
            "change",
            function () {

                if (
                    message.classList.contains(
                        "error"
                    )
                ) {

                    resetMessage();

                }

            }
        );

    });

}


/* =====================================================
   12. MAGNETIC BUTTON EFFECT
====================================================== */

const buttons =
    document.querySelectorAll(
        ".hero-button, " +
        ".nav-button, " +
        ".cta-button, " +
        ".map-button"
    );


buttons.forEach(function (button) {

    button.addEventListener(
        "mousemove",
        function (event) {

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
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        function () {

            button.style.transform = "";

        }
    );

});


/* =====================================================
   13. IMAGE PARALLAX
====================================================== */

const images =
    document.querySelectorAll(
        ".story-image img, " +
        ".form-image img, " +
        ".cta-image img"
    );


let ticking = false;


function updateParallax() {

    const scrollY =
        window.scrollY;


    images.forEach(
        function (image, index) {

            const speed =
                index % 2 === 0
                    ? 0.012
                    : 0.008;


            image.style.transform =
                `translateY(${scrollY * speed}px)`;

        }
    );


    ticking = false;

}


if (images.length) {

    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


/* =====================================================
   14. AOS REFRESH
====================================================== */

window.addEventListener(
    "load",
    function () {

        if (
            typeof AOS !== "undefined"
        ) {

            AOS.refresh();

        }

    }
);


});
