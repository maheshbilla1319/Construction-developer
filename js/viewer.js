
/* =========================================================
   CONSTRUCTA DEVELOPERS
   PROJECT MANAGER VIEWER DASHBOARD
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initAOS();
    initSidebar();
    initNavigation();
    initCounters();
    initProgressBars();
    initNotifications();
    initSettings();
    initManager();
    initProjectButtons();
    initTaskInteractions();
    initBackgroundAnimation();

    handleInitialHash();

});


/* =========================================================
   AOS
========================================================= */

function initAOS() {

    if (typeof AOS === "undefined") {
        return;
    }

    AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 40
    });

}


/* =========================================================
   ELEMENT HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


/* =========================================================
   SIDEBAR
========================================================= */

function initSidebar() {

    const sidebar = $("#sidebar");
    const menuToggle = $("#menuToggle");
    const closeSidebar = $("#closeSidebar");
    const overlay = $("#sidebarOverlay");

    if (!sidebar) {
        return;
    }

    const openSidebar = () => {

        sidebar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
        }

    };


    const closeSidebarMenu = () => {

        sidebar.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.style.overflow = "";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

    };


    if (menuToggle) {

        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            if (sidebar.classList.contains("active")) {
                closeSidebarMenu();
            } else {
                openSidebar();
            }

        });

    }


    if (closeSidebar) {

        closeSidebar.addEventListener("click", closeSidebarMenu);

    }


    if (overlay) {

        overlay.addEventListener("click", closeSidebarMenu);

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSidebarMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeSidebarMenu();
        }

    });


    window.closeViewerSidebar = closeSidebarMenu;

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const navLinks = $$(".nav-link[data-section]");
    const sections = $$(".dashboard-section");

    if (!navLinks.length || !sections.length) {
        return;
    }


    const pageTitles = {

        dashboard: "Manager Dashboard",
        projects: "All Projects",
        tasks: "Project Tasks",
        team: "Project Team",
        clients: "Clients",
        reports: "Project Reports",
        contact: "Contact Center",
        settings: "Settings"

    };


    function activateSection(sectionId, updateHash = true) {

        const target = document.getElementById(sectionId);

        if (!target) {
            activateSection("dashboard", updateHash);
            return;
        }


        sections.forEach(section => {

            section.classList.remove("active-section");

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

        });


        target.classList.add("active-section");


        const activeLink = $(
            `.nav-link[data-section="${sectionId}"]`
        );


        if (activeLink) {
            activeLink.classList.add("active");
        }


        const pageTitle = $("#pageTitle");

        if (pageTitle) {
            pageTitle.textContent =
                pageTitles[sectionId] || "Manager Dashboard";
        }


        if (updateHash) {

            history.replaceState(
                null,
                "",
                `#${sectionId}`
            );

        }


        if (
            window.innerWidth <= 900 &&
            typeof window.closeViewerSidebar === "function"
        ) {

            window.closeViewerSidebar();

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        refreshAnimations(target);

    }


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const sectionId =
                link.getAttribute("data-section");

            if (!sectionId) {
                return;
            }

            event.preventDefault();

            activateSection(sectionId);

        });

    });


    $$("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            const sectionId =
                button.getAttribute("data-go");

            if (sectionId) {
                activateSection(sectionId);
            }

        });

    });


    window.addEventListener("hashchange", () => {

        const hash =
            window.location.hash.replace("#", "").trim();

        if (hash) {
            activateSection(hash, false);
        }

    });


    window.activateViewerSection = activateSection;

}


/* =========================================================
   INITIAL HASH
========================================================= */

function handleInitialHash() {

    const hash =
        window.location.hash.replace("#", "").trim();

    if (
        hash &&
        document.getElementById(hash) &&
        typeof window.activateViewerSection === "function"
    ) {

        window.activateViewerSection(hash, false);

    } else {

        const dashboard = $("#dashboard");

        if (dashboard) {
            dashboard.classList.add("active-section");
        }

    }

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters = $$("[data-count]");

    if (!counters.length) {
        return;
    }


    const animateCounter = element => {

        if (element.dataset.animated === "true") {
            return;
        }

        const target =
            parseInt(element.dataset.count, 10);

        if (Number.isNaN(target)) {
            return;
        }

        element.dataset.animated = "true";

        const duration = 1100;
        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            const current =
                Math.floor(target * eased);

            element.textContent =
                String(current).padStart(
                    String(target).length,
                    "0"
                );


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent =
                    String(target).padStart(
                        String(target).length,
                        "0"
                    );

            }

        }


        requestAnimationFrame(updateCounter);

    };


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .4
                }
            );


        counters.forEach(counter => {
            observer.observe(counter);
        });

    } else {

        counters.forEach(animateCounter);

    }

}


/* =========================================================
   PROGRESS BARS
========================================================= */

function initProgressBars() {

    const progressBars =
        $$(".progress span, .large-progress span");

    if (!progressBars.length) {
        return;
    }


    progressBars.forEach(bar => {

        const inlineWidth =
            bar.style.width || "0%";

        bar.dataset.width = inlineWidth;

        bar.style.width = "0%";

    });


    const animateBar = bar => {

        if (bar.dataset.animated === "true") {
            return;
        }

        bar.dataset.animated = "true";

        setTimeout(() => {

            bar.style.width =
                bar.dataset.width || "0%";

        }, 100);

    };


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateBar(entry.target);

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .3
                }
            );


        progressBars.forEach(bar => {
            observer.observe(bar);
        });

    } else {

        progressBars.forEach(animateBar);

    }

}


/* =========================================================
   REFRESH ANIMATIONS
========================================================= */

function refreshAnimations(section) {

    if (!section) {
        return;
    }


    const bars =
        $$(".progress span, .large-progress span", section);


    bars.forEach(bar => {

        bar.dataset.animated = "false";

        bar.style.width =
            bar.dataset.width ||
            bar.style.width ||
            "0%";

    });


    const counters =
        $$("[data-count]", section);


    counters.forEach(counter => {

        counter.dataset.animated = "false";

    });


    setTimeout(() => {

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    }, 100);

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initNotifications() {

    const notificationBtn =
        $("#notificationBtn");

    if (!notificationBtn) {
        return;
    }


    notificationBtn.addEventListener("click", () => {

        showToast(
            "You have 3 new project notifications."
        );

    });

}


/* =========================================================
   SETTINGS
========================================================= */

function initSettings() {

    const saveButton =
        $("#saveSettings");

    const nameInput =
        $("#settingName");

    const emailInput =
        $("#settingEmail");

    const roleInput =
        $("#settingRole");

    if (!saveButton) {
        return;
    }


    loadSettings(
        nameInput,
        emailInput,
        roleInput
    );


    saveButton.addEventListener("click", () => {

        const name =
            nameInput?.value.trim() ||
            "Project Manager";

        const email =
            emailInput?.value.trim() ||
            "manager@constructa.com";

        const role =
            roleInput?.value ||
            "Project Manager";


        localStorage.setItem(
            "constructaManagerName",
            name
        );

        localStorage.setItem(
            "constructaManagerEmail",
            email
        );

        localStorage.setItem(
            "constructaManagerRole",
            role
        );


        updateManagerUI(
            name,
            role
        );


        showToast(
            "Settings saved successfully."
        );

    });

}


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings(
    nameInput,
    emailInput,
    roleInput
) {

    const savedName =
        localStorage.getItem(
            "constructaManagerName"
        );

    const savedEmail =
        localStorage.getItem(
            "constructaManagerEmail"
        );

    const savedRole =
        localStorage.getItem(
            "constructaManagerRole"
        );


    if (savedName && nameInput) {
        nameInput.value = savedName;
    }

    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
    }

    if (savedRole && roleInput) {
        roleInput.value = savedRole;
    }

}


/* =========================================================
   MANAGER NAME
========================================================= */

function initManager() {

    const savedName =
        localStorage.getItem(
            "constructaManagerName"
        );

    const savedRole =
        localStorage.getItem(
            "constructaManagerRole"
        );


    const name =
        savedName || "Project Manager";

    const role =
        savedRole || "Project Manager";


    updateManagerUI(
        name,
        role
    );

}


function updateManagerUI(
    name,
    role
) {

    const managerName =
        $("#managerName");

    const topManagerName =
        $("#topManagerName");


    if (managerName) {
        managerName.textContent = name;
    }

    if (topManagerName) {
        topManagerName.textContent = name;
    }


    const managerRole =
        $(".manager-profile span");

    const topRole =
        $(".top-profile small");


    if (managerRole) {

        managerRole.innerHTML =
            `<i class="fa-solid fa-circle"></i> ${escapeHTML(role)}`;

    }


    if (topRole) {
        topRole.textContent = role;
    }

}


/* =========================================================
   PROJECT BUTTONS
========================================================= */

function initProjectButtons() {

    const redirectButtons =
        $$("[onclick*='404.html']");

    redirectButtons.forEach(button => {

        button.addEventListener("click", event => {

            /*
             * Existing inline onclick already redirects
             * to 404.html. This listener only provides
             * accessibility feedback.
             */

            button.setAttribute(
                "aria-label",
                button.textContent.trim()
            );

        });

    });

}


/* =========================================================
   TASK INTERACTIONS
========================================================= */

function initTaskInteractions() {

    const taskRows =
        $$(".task-row");

    taskRows.forEach(row => {

        const check =
            $(".task-check", row);

        const status =
            $(".task-status", row);


        if (!check || !status) {
            return;
        }


        check.addEventListener("click", () => {

            const isCompleted =
                check.classList.contains("completed");


            if (isCompleted) {

                check.classList.remove("completed");

                status.className =
                    "task-status pending-status";

                status.textContent =
                    "Pending";

            } else {

                check.classList.add("completed");

                status.className =
                    "task-status completed-status";

                status.textContent =
                    "Completed";

            }

        });

    });

}


/* =========================================================
   BACKGROUND ANIMATION
========================================================= */

function initBackgroundAnimation() {

    const circles =
        $$(".bg-circle");

    if (!circles.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    circles.forEach((circle, index) => {

        const direction =
            index % 2 === 0 ? 1 : -1;

        circle.animate(
            [
                {
                    transform: "translate3d(0, 0, 0)"
                },
                {
                    transform:
                        `translate3d(${40 * direction}px, ${25 * direction}px, 0)`
                },
                {
                    transform: "translate3d(0, 0, 0)"
                }
            ],
            {
                duration: 8000 + index * 1200,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

    let toast =
        $(".viewer-toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "viewer-toast";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   GLOBAL API
========================================================= */

window.viewerDashboard = {

    goTo: section => {

        if (
            typeof window.activateViewerSection ===
            "function"
        ) {

            window.activateViewerSection(section);

        }

    },

    toast: showToast

};

