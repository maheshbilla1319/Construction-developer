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

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =====================================================
       03. MOBILE MENU
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

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

            document.body.classList.toggle("menu-open", isOpen);
        });


        /* Close menu when clicking nav link */

        const navLinks = nav.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                document.body.classList.remove("menu-open");
            });

        });
    }


    /* =====================================================
       04. ACTIVE NAV LINK
    ====================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop()
            .toLowerCase();

        link.classList.remove("active");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       05. CLOSE MOBILE MENU ON RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 991) {

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

    });


    /* =====================================================
       06. ESCAPE KEY CLOSE MENU
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       09. NAV CTA HOVER MICRO INTERACTION
    ====================================================== */

    const navCta = document.querySelector(".nav-cta");

    if (navCta) {

        navCta.addEventListener("mouseenter", () => {
            navCta.classList.add("hovered");
        });

        navCta.addEventListener("mouseleave", () => {
            navCta.classList.remove("hovered");
        });

    }


    /* =====================================================
       10. REFRESH AOS AFTER PAGE LOAD
    ====================================================== */

    window.addEventListener("load", () => {

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    });

});






