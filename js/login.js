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


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    if (passwordToggle && passwordInput) {

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


    /* =====================================================
       CLEAR ERRORS
    ===================================================== */

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (roleError) {
            roleError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (emailInput) {
            emailInput.classList.remove("error-input");
        }

        if (roleInput) {
            roleInput.classList.remove("error-input");
        }

        if (passwordInput) {
            passwordInput.classList.remove("error-input");
        }

        if (loginMessage) {
            loginMessage.textContent = "";
            loginMessage.className = "login-message";
        }

    }


    /* =====================================================
       LOGIN SUBMIT
       
       ANY EMAIL + ANY PASSWORD
       ROLE BASED REDIRECT
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            clearErrors();


            const email =
                emailInput
                    ? emailInput.value.trim().toLowerCase()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value.trim()
                    : "";

            const role =
                roleInput
                    ? roleInput.value
                    : "";


            let isValid = true;
            let redirectPage = "";


            /* =================================================
               EMAIL REQUIRED
            ================================================= */

            if (email === "") {

                if (emailError) {
                    emailError.textContent =
                        "Please enter your email.";
                }

                if (emailInput) {
                    emailInput.classList.add(
                        "error-input"
                    );
                }

                isValid = false;

            }


            /* =================================================
               ROLE REQUIRED
            ================================================= */

            if (role === "") {

                if (roleError) {
                    roleError.textContent =
                        "Please select your role.";
                }

                if (roleInput) {
                    roleInput.classList.add(
                        "error-input"
                    );
                }

                isValid = false;

            }


            /*
             * PASSWORD IS NOT VALIDATED.
             *
             * User can enter any password.
             * Even empty password is allowed.
             */


            /* =================================================
               STOP IF REQUIRED FIELDS ARE EMPTY
            ================================================= */

            if (!isValid) {
                return;
            }


            /* =================================================
               ROLE BASED REDIRECT
            ================================================= */

            if (role === "admin") {

                redirectPage = "admin.html";

            }

            else if (role === "viewer") {

                redirectPage = "viewer.html";

            }

            else {

                if (loginMessage) {

                    loginMessage.textContent =
                        "Please select a valid role.";

                    loginMessage.classList.add(
                        "error-message"
                    );

                }

                return;

            }


            /* =================================================
               LOGIN SUCCESS
            ================================================= */

            if (loginMessage) {

                loginMessage.textContent =
                    "Login successful! Redirecting...";

                loginMessage.classList.add(
                    "success-message"
                );

            }


            if (loginBtn) {

                loginBtn.disabled = true;

                loginBtn.innerHTML = `
                    <span>Login Successful</span>
                    <i class="fa-solid fa-check"></i>
                `;

            }


            /* =================================================
               SAVE LOGIN SESSION
            ================================================= */

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            localStorage.setItem(
                "userRole",
                role
            );


            /*
             * Optional:
             * Save entered password if your application
             * needs it later.
             *
             * NOT recommended for real production apps.
             */

            // localStorage.setItem("userPassword", password);


            /* =================================================
               REDIRECT
            ================================================= */

            setTimeout(function () {

                window.location.href =
                    redirectPage;

            }, 800);

        });

    }


    /* =====================================================
       INPUT FOCUS
    ===================================================== */

    [
        emailInput,
        roleInput,
        passwordInput
    ].forEach(function (input) {

        if (!input) {
            return;
        }

        input.addEventListener(
            "focus",
            function () {

                input.classList.remove(
                    "error-input"
                );

            }
        );

    });


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true
        });

    }


    console.log(
        "Constructa Login JS Loaded"
    );

});
