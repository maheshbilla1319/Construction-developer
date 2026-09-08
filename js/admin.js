
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
       MOBILE SIDEBAR
    ===================================================== */

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("show");
    }

    function closeSide() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", openSidebar);
    }

    if (closeSidebar) {
        closeSidebar.addEventListener("click", closeSide);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSide);
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

        if (activeLink) {
            const text = activeLink.querySelector("span");

            if (text) {
                pageTitle.textContent = text.textContent;
            }
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        closeSide();

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }
    }


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
       ALL data-go BUTTONS
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
       GSAP INTRO
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".topbar", {
            y: -40,
            opacity: 0,
            duration: .8,
            ease: "power3.out"
        });

        gsap.from(".sidebar", {
            x: -80,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".welcome-banner", {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: .2,
            ease: "power3.out"
        });

        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            duration: .7,
            stagger: .1,
            delay: .5,
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

    const counters =
        document.querySelectorAll("[data-count]");

    counters.forEach(counter => {

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

        document.querySelectorAll(".progress span")
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

            alert("You have 4 new notifications.");

        });

    }


    /* =====================================================
       CONTACT ENQUIRY BUTTONS
    ===================================================== */

    document.querySelectorAll(".view-enquiry")
        .forEach(button => {

            button.addEventListener("click", () => {

                const enquiry =
                    button.closest(".enquiry-item");

                if (!enquiry) return;

                const name =
                    enquiry.querySelector(
                        ".enquiry-details strong"
                    )?.textContent || "Client";

                alert(
                    `Opening enquiry details for ${name}.`
                );

            });

        });


    /* =====================================================
       ADD CONTACT
    ===================================================== */

    const addContactBtn =
        document.getElementById("addContactBtn");

    if (addContactBtn) {

        addContactBtn.addEventListener("click", () => {

            alert(
                "Add Contact form can be connected here."
            );

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
       KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSide();
        }

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    document.querySelectorAll(
        ".welcome-image, .contact-hero-image"
    ).forEach(container => {

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
                    (x - .5) * 10;

                const moveY =
                    (y - .5) * 10;

                image.style.transform =
                    `scale(1.04)
                     translate(${moveX}px, ${moveY}px)`;

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
       PROJECT CARD HOVER
    ===================================================== */

    document.querySelectorAll(
        ".large-project-card, .contact-info-card, .team-card"
    ).forEach(card => {

        card.addEventListener("mouseenter", () => {

            if (typeof gsap !== "undefined") {

                gsap.to(card, {
                    y: -5,
                    duration: .25,
                    ease: "power2.out"
                });

            }

        });

        card.addEventListener("mouseleave", () => {

            if (typeof gsap !== "undefined") {

                gsap.to(card, {
                    y: 0,
                    duration: .25,
                    ease: "power2.out"
                });

            }

        });

    });

});

