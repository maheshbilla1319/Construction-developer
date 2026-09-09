/* =========================================================
   CONSTRUCTA ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".dashboard-section");
    const pageTitle = document.getElementById("pageTitle");


    /* =====================================================
       SIDEBAR OPEN
    ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("show");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close menu");
        }

        document.body.classList.add("sidebar-open");
    }


    /* =====================================================
       SIDEBAR CLOSE
    ===================================================== */

    function closeSide() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("show");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        }

        document.body.classList.remove("sidebar-open");
    }


    /* =====================================================
       MENU TOGGLE
       ☰ = OPEN
       ☰ = CLOSE
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            if (sidebar.classList.contains("open")) {
                closeSide();
            } else {
                openSidebar();
            }

        });

    }


    /* =====================================================
       X BUTTON
       X = CLOSE
    ===================================================== */

    if (closeSidebar) {

        closeSidebar.addEventListener("click", () => {
            closeSide();
        });

    }


    /* =====================================================
       OVERLAY
       CLICK OUTSIDE = CLOSE
    ===================================================== */

    if (overlay) {

        overlay.addEventListener("click", () => {
            closeSide();
        });

    }


    /* =====================================================
       SECTION NAVIGATION
    ===================================================== */

    function showSection(sectionId) {

        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        const target = document.getElementById(sectionId);

        if (target) {
            target.classList.add("active-section");
        }


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.dataset.section === sectionId) {
                link.classList.add("active");
            }

        });


        const activeLink = document.querySelector(
            `.nav-link[data-section="${sectionId}"]`
        );


        if (activeLink && pageTitle) {

            const text = activeLink.querySelector("span");

            if (text) {
                pageTitle.textContent = text.textContent;
            }

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Close sidebar after menu click */
        closeSide();


        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    }


    /* =====================================================
       NAV LINKS
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const section = link.dataset.section;

            if (section) {

                showSection(section);

                history.replaceState(
                    null,
                    "",
                    `#${section}`
                );

            }

        });

    });


    /* =====================================================
       DATA-GO BUTTONS
    ===================================================== */

    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            const section = button.dataset.go;

            if (section) {

                showSection(section);

                history.replaceState(
                    null,
                    "",
                    `#${section}`
                );

            }

        });

    });


    /* =====================================================
       LOAD SECTION FROM URL
    ===================================================== */

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }


    /* =====================================================
       LOCAL STORAGE USER
    ===================================================== */

    const storedName =
        localStorage.getItem("userName") ||
        "Admin User";

    const storedEmail =
        localStorage.getItem("userEmail") ||
        "admin@constructa.com";

    const storedRole =
        localStorage.getItem("userRole") ||
        "admin";


    const roleNames = {

        admin: "Administrator",

        manager: "Project Manager",

        "project manager": "Project Manager",

        viewer: "Viewer",

        developer: "Developer"

    };


    const displayRole =
        roleNames[storedRole.toLowerCase()] ||
        storedRole;


    const sidebarName =
        document.getElementById("sidebarName");

    const sidebarRole =
        document.getElementById("sidebarRole");

    const topName =
        document.getElementById("topName");

    const topRole =
        document.getElementById("topRole");

    const welcomeName =
        document.getElementById("welcomeName");

    const settingName =
        document.getElementById("settingName");

    const settingEmail =
        document.getElementById("settingEmail");

    const settingRole =
        document.getElementById("settingRole");


    if (sidebarName) {
        sidebarName.textContent = storedName;
    }

    if (sidebarRole) {
        sidebarRole.textContent = displayRole;
    }

    if (topName) {
        topName.textContent = storedName;
    }

    if (topRole) {
        topRole.textContent = displayRole;
    }

    if (welcomeName) {
        welcomeName.textContent =
            storedName.split(" ")[0];
    }

    if (settingName) {
        settingName.textContent = storedName;
    }

    if (settingEmail) {
        settingEmail.textContent = storedEmail;
    }

    if (settingRole) {
        settingRole.textContent = displayRole;
    }


    /* =====================================================
       GSAP
       IMPORTANT:
       Sidebar animation ONLY DESKTOP
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".topbar", {
            y: -40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });


        /* Do NOT animate sidebar on mobile */

        if (window.innerWidth > 1100) {

            gsap.from(".sidebar", {
                x: -80,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

        }


        gsap.from(".welcome-banner", {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });


        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            delay: 0.5,
            ease: "power3.out"
        });


        gsap.to(".shape-1", {
            rotation: 405,
            duration: 18,
            repeat: -1,
            ease: "none"
        });


        gsap.to(".shape-2", {
            rotation: -320,
            duration: 14,
            repeat: -1,
            ease: "none"
        });

    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    document.querySelectorAll("[data-count]").forEach(counter => {

        const target =
            parseInt(counter.dataset.count);

        let current = 0;

        const duration = 1400;

        const increment =
            target / (duration / 16);


        function updateCounter() {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                return;
            }


            counter.textContent =
                Math.floor(current);

            requestAnimationFrame(updateCounter);

        }


        updateCounter();

    });


    /* =====================================================
       PROGRESS ANIMATION
    ===================================================== */

    setTimeout(() => {

        document
            .querySelectorAll(".progress span")
            .forEach(progress => {

                const width =
                    progress.style.width;

                progress.style.width = "0%";

                setTimeout(() => {

                    progress.style.width = width;

                }, 300);

            });

    }, 500);


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationBtn =
        document.getElementById("notificationBtn");


    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            const dot =
                notificationBtn.querySelector(
                    ".notification-dot"
                );


            if (dot) {
                dot.style.display = "none";
            }


            alert(
                "You have 4 new notifications."
            );

        });

    }


    /* =====================================================
       CONTACT ENQUIRY
    ===================================================== */

    document
        .querySelectorAll(".view-enquiry")
        .forEach(button => {

            button.addEventListener("click", () => {

                /* HTML onclick already redirects to 404 */
                window.location.href = "404.html";

            });

        });


    /* =====================================================
       ADD CONTACT
    ===================================================== */

    const addContactBtn =
        document.getElementById("addContactBtn");


    if (addContactBtn) {

        addContactBtn.addEventListener("click", () => {

            window.location.href = "404.html";

        });

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) return;


            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");


            window.location.href =
                "login.html";

        });

    }


    /* =====================================================
       ESC = CLOSE SIDEBAR
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSide();
        }

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    document
        .querySelectorAll(
            ".welcome-image, .contact-hero-image"
        )
        .forEach(container => {

            container.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        container.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left) /
                        rect.width;


                    const y =
                        (event.clientY - rect.top) /
                        rect.height;


                    const image =
                        container.querySelector("img");


                    if (!image) return;


                    const moveX =
                        (x - 0.5) * 10;


                    const moveY =
                        (y - 0.5) * 10;


                    image.style.transform =
                        `scale(1.04) translate(${moveX}px, ${moveY}px)`;

                }
            );


            container.addEventListener(
                "mouseleave",
                () => {

                    const image =
                        container.querySelector("img");


                    if (image) {

                        image.style.transform =
                            "scale(1) translate(0,0)";

                    }

                }
            );

        });


    /* =====================================================
       CARD HOVER
    ===================================================== */

    document
        .querySelectorAll(
            ".large-project-card, .contact-info-card, .team-card"
        )
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    if (typeof gsap !== "undefined") {

                        gsap.to(card, {
                            y: -5,
                            duration: 0.25,
                            ease: "power2.out"
                        });

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (typeof gsap !== "undefined") {

                        gsap.to(card, {
                            y: 0,
                            duration: 0.25,
                            ease: "power2.out"
                        });

                    }

                }
            );

        });

});
