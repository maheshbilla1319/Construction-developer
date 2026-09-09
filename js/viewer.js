/* =========================================================
   CONSTRUCTA DEVELOPERS
   PROJECT MANAGER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 70
        });
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");

    const navLinks =
        document.querySelectorAll(".nav-link[data-section]");

    const sections =
        document.querySelectorAll(".dashboard-section");

    const pageTitle =
        document.getElementById("pageTitle");


    /* =====================================================
       PAGE TITLES
    ===================================================== */

    const titleMap = {
        dashboard: "Manager Dashboard",
        projects: "All Projects",
        tasks: "Project Tasks",
        team: "Project Team",
        clients: "Clients",
        reports: "Project Reports",
        contact: "Contact Center",
        settings: "Settings"
    };


    /* =====================================================
       LOCAL STORAGE USER
    ===================================================== */

    const savedName =
        localStorage.getItem("userName") ||
        localStorage.getItem("managerName");

    const savedRole =
        localStorage.getItem("userRole");

    const managerName =
        savedName || "Project Manager";


    const managerNameElement =
        document.getElementById("managerName");

    const topManagerNameElement =
        document.getElementById("topManagerName");

    const settingName =
        document.getElementById("settingName");

    const settingEmail =
        document.getElementById("settingEmail");

    const settingRole =
        document.getElementById("settingRole");


    if (managerNameElement) {
        managerNameElement.textContent = managerName;
    }

    if (topManagerNameElement) {
        topManagerNameElement.textContent = managerName;
    }


    if (savedName && settingName) {
        settingName.value = savedName;
    }


    const savedEmail =
        localStorage.getItem("userEmail");

    if (savedEmail && settingEmail) {
        settingEmail.value = savedEmail;
    }


    if (savedRole && settingRole) {

        const optionExists =
            [...settingRole.options].some(
                option => option.value === savedRole
            );

        if (optionExists) {
            settingRole.value = savedRole;
        }
    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openMobileMenu() {

        if (sidebar) {
            sidebar.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");
    }


    function toggleMobileMenu() {

        if (
            sidebar &&
            sidebar.classList.contains("open")
        ) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    /* =====================================================
       MOBILE MENU TOGGLE
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener("click", event => {

            event.preventDefault();

            toggleMobileMenu();

        });

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeMenu) {

        closeMenu.addEventListener("click", event => {

            event.preventDefault();

            closeMobileMenu();

        });

    }


    /* =====================================================
       OVERLAY CLOSE
    ===================================================== */

    if (overlay) {

        overlay.addEventListener("click", () => {

            closeMobileMenu();

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =====================================================
       SECTION SWITCHING
    ===================================================== */

    function showSection(sectionName) {

        if (!document.getElementById(sectionName)) {
            sectionName = "dashboard";
        }


        /* Remove active sections */

        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        /* Remove active nav */

        navLinks.forEach(link => {

            link.classList.remove("active");

        });


        /* Selected section */

        const selectedSection =
            document.getElementById(sectionName);


        /* Selected navigation */

        const selectedLink =
            document.querySelector(
                `.nav-link[data-section="${sectionName}"]`
            );


        if (selectedSection) {

            selectedSection.classList.add(
                "active-section"
            );

        }


        if (selectedLink) {

            selectedLink.classList.add("active");

        }


        /* Page title */

        if (pageTitle) {

            pageTitle.textContent =
                titleMap[sectionName] ||
                "Manager Dashboard";

        }


        /* Scroll top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Close mobile sidebar */

        closeMobileMenu();


        /* Refresh AOS */

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();


            const sectionName =
                link.dataset.section;


            showSection(sectionName);


            history.replaceState(
                null,
                "",
                `#${sectionName}`
            );

        });

    });


    /* =====================================================
       DATA-GO BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-go]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    button.dataset.go;


                showSection(target);


                history.replaceState(
                    null,
                    "",
                    `#${target}`
                );

            });

        });


    /* =====================================================
       LOAD SECTION FROM URL
    ===================================================== */

    const hash =
        window.location.hash.replace("#", "");


    if (
        hash &&
        document.getElementById(hash)
    ) {

        showSection(hash);

    } else {

        showSection("dashboard");

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-count]");


    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.count,
                10
            );


        if (isNaN(target)) {
            return;
        }


        const duration = 1200;

        const startTime =
            performance.now();


        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    target * ease
                );


            element.textContent =
                String(current).padStart(2, "0");


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    String(target).padStart(2, "0");

            }

        }


        requestAnimationFrame(update);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !entry.target.dataset.animated
                        ) {

                            entry.target.dataset.animated =
                                "true";

                            animateCounter(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(counter => {

            animateCounter(counter);

        });

    }


    /* =====================================================
       GSAP INTRO
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".sidebar", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });


        gsap.from(".topbar", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        });


        gsap.from(".welcome-banner", {
            y: 35,
            opacity: 0,
            duration: 1,
            delay: 0.35,
            ease: "power3.out"
        });


        gsap.to(".circle-one", {
            rotation: 360,
            duration: 35,
            repeat: -1,
            ease: "none"
        });


        gsap.to(".circle-two", {
            y: -35,
            x: 20,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "You have 3 new project notifications."
                );

            }
        );

    }


    /* =====================================================
       SAVE SETTINGS
    ===================================================== */

    const saveSettings =
        document.getElementById(
            "saveSettings"
        );


    if (saveSettings) {

        saveSettings.addEventListener(
            "click",
            () => {

                const name =
                    settingName
                        ? settingName.value.trim()
                        : "";


                const email =
                    settingEmail
                        ? settingEmail.value.trim()
                        : "";


                const role =
                    settingRole
                        ? settingRole.value
                        : "";


                if (!name || !email) {

                    showToast(
                        "Please enter your name and email."
                    );

                    return;

                }


                localStorage.setItem(
                    "userName",
                    name
                );


                localStorage.setItem(
                    "userEmail",
                    email
                );


                localStorage.setItem(
                    "userRole",
                    role
                );


                if (managerNameElement) {

                    managerNameElement.textContent =
                        name;

                }


                if (topManagerNameElement) {

                    topManagerNameElement.textContent =
                        name;

                }


                showToast(
                    "Profile updated successfully."
                );

            }
        );

    }


    /* =====================================================
       GENERIC ACTION BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".primary-btn:not([data-go]), .contact-action"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const text =
                        button.textContent.trim();


                    if (
                        text.includes("Add") ||
                        text.includes("New") ||
                        button.classList.contains(
                            "contact-action"
                        )
                    ) {

                        showToast(
                            "Action selected. Connect this button to your backend."
                        );

                    }

                }
            );

        });


    /* =====================================================
       CONTACT ITEM ACTIVE STATE
    ===================================================== */

    document
        .querySelectorAll(".contact-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".contact-action"
                        )
                    ) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".contact-item"
                        )
                        .forEach(contact => {

                            contact.classList.remove(
                                "selected"
                            );

                        });


                    item.classList.add(
                        "selected"
                    );

                }
            );

        });


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "managerToast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "managerToast";


            Object.assign(
                toast.style,
                {

                    position: "fixed",

                    right: "25px",

                    bottom: "25px",

                    padding: "15px 20px",

                    background: "#0a0a0a",

                    color: "#ffffff",

                    borderLeft:
                        "4px solid #f59e0b",

                    fontSize: "13px",

                    fontWeight: "600",

                    boxShadow:
                        "0 15px 40px rgba(0,0,0,.2)",

                    zIndex: "9999",

                    transition:
                        ".3s ease",

                    transform:
                        "translateY(20px)",

                    opacity: "0"

                }
            );


            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;


        toast.style.transform =
            "translateY(0)";


        toast.style.opacity =
            "1";


        clearTimeout(
            toast.timer
        );


        toast.timer =
            setTimeout(
                () => {

                    toast.style.transform =
                        "translateY(20px)";

                    toast.style.opacity =
                        "0";

                },
                3000
            );

    }

});
