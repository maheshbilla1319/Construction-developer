/* =========================================================
   CONSTRUCTA DEVELOPERS
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initAOS();
    initSidebar();
    initNavigation();
    initHashNavigation();
    initCounters();
    initProgressBars();
    initProfile();
    initNotifications();
    initLogout();
    initQuickActions();
    initChart();
    updateDate();
});


/* =========================================================
   02. AOS
========================================================= */

function initAOS() {

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 40
        });

    }
}


/* =========================================================
   03. SIDEBAR
========================================================= */

function initSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");

    if (!sidebar || !overlay) {
        return;
    }


    function openSidebar() {

        sidebar.classList.add("active");
        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
        }
    }


    function closeMenu() {

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        document.body.style.overflow = "";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            if (sidebar.classList.contains("active")) {
                closeMenu();
            } else {
                openSidebar();
            }

        });

    }


    if (closeSidebar) {
        closeSidebar.addEventListener("click", closeMenu);
    }


    overlay.addEventListener("click", closeMenu);


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {
            closeMenu();
        }

    });


    window.closeAdminSidebar = closeMenu;
}


/* =========================================================
   04. NAVIGATION
========================================================= */

function initNavigation() {

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".dashboard-section");
    const pageTitle = document.getElementById("pageTitle");


    const titleMap = {

        dashboard: "Dashboard",
        projects: "Projects",
        team: "Team",
        reports: "Reports",
        clients: "Clients",
        contact: "Contact",
        messages: "Messages",
        settings: "Settings"

    };


    function showSection(sectionId, updateHash = true) {

        const target = document.getElementById(sectionId);

        if (!target) {
            sectionId = "dashboard";
        }


        sections.forEach((section) => {

            section.classList.remove("active-section");

        });


        const activeSection =
            document.getElementById(sectionId);

        if (activeSection) {
            activeSection.classList.add("active-section");
        }


        navLinks.forEach((link) => {

            link.classList.toggle(
                "active",
                link.dataset.section === sectionId
            );

        });


        if (pageTitle) {

            pageTitle.textContent =
                titleMap[sectionId] || "Dashboard";

        }


        if (updateHash) {

            const newUrl =
                `${window.location.pathname}#${sectionId}`;

            history.replaceState(
                null,
                "",
                newUrl
            );

        }


        if (typeof AOS !== "undefined") {
            setTimeout(() => AOS.refresh(), 100);
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const sectionId =
                link.dataset.section;

            if (!sectionId) {
                return;
            }

            showSection(sectionId);


            if (
                window.innerWidth <= 992 &&
                typeof window.closeAdminSidebar === "function"
            ) {

                window.closeAdminSidebar();

            }

        });

    });


    document.querySelectorAll("[data-go]").forEach((button) => {

        button.addEventListener("click", () => {

            const sectionId = button.dataset.go;

            if (sectionId) {
                showSection(sectionId);
            }

        });

    });


    window.showAdminSection = showSection;
}


/* =========================================================
   05. HASH NAVIGATION
========================================================= */

function initHashNavigation() {

    const hash =
        window.location.hash.replace("#", "").trim();

    if (!hash) {
        return;
    }


    const target =
        document.getElementById(hash);

    if (target) {

        setTimeout(() => {

            if (typeof window.showAdminSection === "function") {

                window.showAdminSection(
                    hash,
                    false
                );

            }

        }, 50);

    }
}


/* =========================================================
   06. COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll("[data-count]");

    if (!counters.length) {
        return;
    }


    const animateCounter = (counter) => {

        const target =
            Number(counter.dataset.count);

        if (!Number.isFinite(target)) {
            return;
        }


        let start = 0;

        const duration = 1200;

        const startTime = performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            start =
                Math.floor(target * eased);

            counter.textContent =
                start.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString("en-IN");

            }

        }


        requestAnimationFrame(update);
    };


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        obs.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    counters.forEach((counter) => {

        observer.observe(counter);

    });
}


/* =========================================================
   07. PROGRESS BARS
========================================================= */

function initProgressBars() {

    const bars =
        document.querySelectorAll(
            ".progress span"
        );

    if (!bars.length) {
        return;
    }


    bars.forEach((bar) => {

        const inlineWidth =
            bar.style.width;

        bar.style.width = "0";


        requestAnimationFrame(() => {

            setTimeout(() => {

                bar.style.width =
                    inlineWidth || "0%";

            }, 250);

        });

    });
}


/* =========================================================
   08. PROFILE / LOCAL STORAGE
========================================================= */

function initProfile() {

    const userName =
        localStorage.getItem("userName");

    const userEmail =
        localStorage.getItem("userEmail");

    const userRole =
        localStorage.getItem("userRole");


    const finalName =
        userName && userName.trim()
            ? userName.trim()
            : "Admin User";


    const finalEmail =
        userEmail && userEmail.trim()
            ? userEmail.trim()
            : "admin@constructa.com";


    const finalRole =
        userRole && userRole.trim()
            ? userRole.trim()
            : "Administrator";


    const elements = {

        sidebarName:
            document.getElementById("sidebarName"),

        sidebarRole:
            document.getElementById("sidebarRole"),

        topName:
            document.getElementById("topName"),

        topRole:
            document.getElementById("topRole"),

        welcomeName:
            document.getElementById("welcomeName"),

        settingName:
            document.getElementById("settingName"),

        settingEmail:
            document.getElementById("settingEmail"),

        settingRole:
            document.getElementById("settingRole")

    };


    if (elements.sidebarName) {
        elements.sidebarName.textContent =
            finalName;
    }


    if (elements.sidebarRole) {
        elements.sidebarRole.textContent =
            finalRole;
    }


    if (elements.topName) {
        elements.topName.textContent =
            finalName;
    }


    if (elements.topRole) {
        elements.topRole.textContent =
            finalRole;
    }


    if (elements.welcomeName) {
        elements.welcomeName.textContent =
            finalName.split(" ")[0];
    }


    if (elements.settingName) {
        elements.settingName.textContent =
            finalName;
    }


    if (elements.settingEmail) {
        elements.settingEmail.textContent =
            finalEmail;
    }


    if (elements.settingRole) {
        elements.settingRole.textContent =
            finalRole;
    }
}


/* =========================================================
   09. NOTIFICATIONS
========================================================= */

function initNotifications() {

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    if (!notificationBtn) {
        return;
    }


    notificationBtn.addEventListener(
        "click",
        () => {

            const dot =
                notificationBtn.querySelector(
                    ".notification-dot"
                );


            if (dot) {
                dot.style.display = "none";
            }


            showToast(
                "You have 4 new notifications."
            );

        }
    );
}


/* =========================================================
   10. TOAST
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "adminToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "adminToast";

        Object.assign(
            toast.style,
            {
                position: "fixed",
                right: "25px",
                bottom: "25px",
                zIndex: "9999",
                maxWidth: "320px",
                padding: "14px 18px",
                borderRadius: "12px",
                color: "#ffffff",
                background: "#0a0a0a",
                boxShadow:
                    "0 15px 40px rgba(0,0,0,.2)",
                fontSize: "12px",
                fontWeight: "600",
                opacity: "0",
                transform: "translateY(15px)",
                transition: ".3s ease"
            }
        );


        document.body.appendChild(toast);
    }


    toast.textContent = message;


    requestAnimationFrame(() => {

        toast.style.opacity = "1";
        toast.style.transform =
            "translateY(0)";

    });


    clearTimeout(
        window.adminToastTimer
    );


    window.adminToastTimer =
        setTimeout(() => {

            toast.style.opacity = "0";
            toast.style.transform =
                "translateY(15px)";

        }, 2800);
}


/* =========================================================
   11. LOGOUT
========================================================= */

function initLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    if (!logoutBtn) {
        return;
    }


    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmLogout =
                window.confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");


            window.location.href =
                "login.html";

        }
    );
}


/* =========================================================
   12. QUICK ACTIONS
========================================================= */

function initQuickActions() {

    const buttons =
        document.querySelectorAll(
            ".quick-actions button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "mouseenter",
            () => {

                if (typeof gsap !== "undefined") {

                    gsap.to(button, {
                        duration: 0.25,
                        y: -3,
                        ease: "power2.out"
                    });

                }

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                if (typeof gsap !== "undefined") {

                    gsap.to(button, {
                        duration: 0.25,
                        y: 0,
                        ease: "power2.out"
                    });

                }

            }
        );

    });
}


/* =========================================================
   13. GSAP INTRO ANIMATION
========================================================= */

function initChart() {

    if (
        typeof gsap === "undefined"
    ) {
        return;
    }


    const chartBars =
        document.querySelectorAll(
            ".chart-bars span"
        );


    if (chartBars.length) {

        gsap.fromTo(
            chartBars,
            {
                scaleY: 0,
                transformOrigin: "bottom"
            },
            {
                scaleY: 1,
                duration: 0.8,
                stagger: 0.07,
                ease: "power3.out",
                delay: 0.3
            }
        );

    }
}


/* =========================================================
   14. DATE
========================================================= */

function updateDate() {

    const dateElement =
        document.querySelector(
            ".welcome-content > span"
        );

    if (!dateElement) {
        return;
    }


    const now = new Date();


    const formatted =
        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    dateElement.textContent =
        `ADMIN DASHBOARD · ${formatted.toUpperCase()}`;
}


/* =========================================================
   15. ACTIVE SECTION ON HASH CHANGE
========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        if (
            hash &&
            typeof window.showAdminSection ===
            "function"
        ) {

            window.showAdminSection(
                hash,
                false
            );

        }

    }
);


/* =========================================================
   16. GLOBAL HELPERS
========================================================= */

window.showToast = showToast;


/* =========================================================
   17. PREVENT BROKEN EMPTY LINKS
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const link =
            event.target.closest(
                'a[href="#"]'
            );


        if (link) {
            event.preventDefault();
        }

    }
);