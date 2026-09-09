document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("loginEmail");
    const roleInput = document.getElementById("loginRole");
    const passwordInput = document.getElementById("loginPassword");

    const emailError = document.getElementById("emailError");
    const roleError = document.getElementById("roleError");
    const passwordError = document.getElementById("passwordError");

    const loginMessage = document.getElementById("loginMessage");
    const loginBtn = document.getElementById("loginBtn");
    const passwordToggle = document.getElementById("passwordToggle");

    // ================================
    // FIXED ADMIN LOGIN
    // ================================

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    // ================================
    // PROJECT MANAGER EMAIL
    // Password NOT required
    // ================================

    const MANAGER_EMAIL = "projectmanager@gmail.com";


    // ================================
    // PASSWORD SHOW / HIDE
    // ================================

    if (passwordToggle) {

        passwordToggle.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

        });

    }


    // ================================
    // CLEAR ERRORS
    // ================================

    function clearErrors() {

        emailError.textContent = "";
        roleError.textContent = "";
        passwordError.textContent = "";

        emailInput.classList.remove("error-input");
        roleInput.classList.remove("error-input");
        passwordInput.classList.remove("error-input");

        loginMessage.textContent = "";
        loginMessage.className = "login-message";
    }


    // ================================
    // EMAIL VALIDATION
    // ================================

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    // ================================
    // LOGIN SUBMIT
    // ================================

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const role = roleInput.value;

        let isValid = true;
        let redirectPage = "";


        // ================================
        // EMAIL VALIDATION
        // ================================

        if (email === "") {

            emailError.textContent = "Please enter your Gmail.";
            emailInput.classList.add("error-input");

            isValid = false;

        } 
        else if (!validEmail(email)) {

            emailError.textContent = "Please enter a valid Gmail.";
            emailInput.classList.add("error-input");

            isValid = false;

        }


        // ================================
        // ROLE VALIDATION
        // ================================

        if (role === "") {

            roleError.textContent = "Please select your role.";
            roleInput.classList.add("error-input");

            isValid = false;

        }


        // ================================
        // PASSWORD VALIDATION
        // Only ADMIN requires password
        // ================================

        if (role === "admin" && password === "") {

            passwordError.textContent =
                "Please enter your admin password.";

            passwordInput.classList.add("error-input");

            isValid = false;

        }


        // Stop if validation failed

        if (!isValid) {
            return;
        }


        // ================================
        // ADMIN LOGIN
        // ================================

        if (
            role === "admin" &&
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            redirectPage = "admin.html";

        }


        // ================================
        // PROJECT MANAGER LOGIN
        // Gmail ONLY
        // No fixed password required
        // ================================

        else if (
            role === "viewer" &&
            email === MANAGER_EMAIL
        ) {

            redirectPage = "viewer.html";

        }


        // ================================
        // INVALID LOGIN
        // ================================

        else {

            loginMessage.textContent =
                "Invalid Gmail, password or selected role.";

            loginMessage.classList.add("error-message");

            return;

        }


        // ================================
        // LOGIN SUCCESS
        // ================================

        loginMessage.textContent =
            "Login successful! Redirecting...";

        loginMessage.classList.add("success-message");


        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span>Login Successful</span>
            <i class="fa-solid fa-check"></i>
        `;


        // ================================
        // SAVE LOGIN SESSION
        // ================================

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);


        // ================================
        // REDIRECT
        // ================================

        setTimeout(function () {

            window.location.href = redirectPage;

        }, 1200);

    });


    // ================================
    // INPUT FOCUS
    // ================================

    [emailInput, roleInput, passwordInput].forEach(function (input) {

        input.addEventListener("focus", function () {

            input.classList.remove("error-input");

        });

    });


    // ================================
    // AOS
    // ================================

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true
        });

    }


    console.log("Constructa Login JS Loaded");

});