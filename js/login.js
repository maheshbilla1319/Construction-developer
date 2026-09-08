
/* =========================================================
   CONSTRUCTA DEVELOPERS
   LOGIN JAVASCRIPT
========================================================= */


/* =========================================================
   AOS
========================================================= */

AOS.init({
    duration: 900,
    once: true,
    offset: 80
});


/* =========================================================
   GSAP BACKGROUND / PAGE ANIMATION
========================================================= */

window.addEventListener("load", () => {

    if (typeof gsap !== "undefined") {

        gsap.from(".logo", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".back-home", {
            y: -20,
            opacity: 0,
            duration: 0.7,
            delay: 0.2
        });

        gsap.to(".floating-icon", {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            stagger: 0.7,
            ease: "sine.inOut"
        });

        gsap.to(".shape-1", {
            rotation: 405,
            duration: 25,
            repeat: -1,
            ease: "none"
        });

    }

});


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("loginEmail");
const roleInput = document.getElementById("loginRole");
const passwordInput = document.getElementById("loginPassword");

const passwordToggle = document.getElementById("passwordToggle");

const emailError = document.getElementById("emailError");
const roleError = document.getElementById("roleError");
const passwordError = document.getElementById("passwordError");

const loginMessage = document.getElementById("loginMessage");

const loginBtn = document.getElementById("loginBtn");

const forgotPassword = document.getElementById("forgotPassword");


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

if (passwordToggle) {

    passwordToggle.addEventListener("click", () => {

        const icon = passwordToggle.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


/* =========================================================
   CLEAR ERRORS
========================================================= */

function clearErrors() {

    emailError.textContent = "";
    roleError.textContent = "";
    passwordError.textContent = "";

    loginMessage.style.display = "none";
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const email = emailInput.value.trim();
        const role = roleInput.value;
        const password = passwordInput.value.trim();

        let valid = true;


        /* EMAIL */

        if (!email) {

            emailError.textContent =
                "Please enter your email address.";

            valid = false;

        } else if (!validEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* ROLE */

        if (!role) {

            roleError.textContent =
                "Please select your role.";

            valid = false;

        }


        /* PASSWORD */

        if (!password) {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        /* =================================================
           GET SIGNUP USER
        ================================================= */

        const savedUser =
            JSON.parse(
                localStorage.getItem("constructaUser")
            );


        /* =================================================
           CHECK USER
        ================================================= */

        if (!savedUser) {

            showMessage(
                "No account found. Please create an account first."
            );

            return;
        }


        /* =================================================
           VALIDATE USER
        ================================================= */

        const emailMatch =
            savedUser.email.toLowerCase() === email.toLowerCase();

        const passwordMatch =
            savedUser.password === password;

        const roleMatch =
            savedUser.role === role;


        if (!emailMatch) {

            emailError.textContent =
                "Email address does not match.";

            return;
        }


        if (!roleMatch) {

            roleError.textContent =
                "Selected role does not match your account.";

            return;
        }


        if (!passwordMatch) {

            passwordError.textContent =
                "Incorrect password.";

            return;
        }


        /* =================================================
           LOGIN SUCCESS
        ================================================= */

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "userName",
            savedUser.name
        );

        localStorage.setItem(
            "userEmail",
            savedUser.email
        );

        localStorage.setItem(
            "userRole",
            savedUser.role
        );


        /* Remember Me */

        const rememberMe =
            document.getElementById("rememberMe");

        if (rememberMe && rememberMe.checked) {

            localStorage.setItem(
                "rememberLogin",
                "true"
            );

        }


        /* Button Animation */

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span>Login Successful</span>
            <i class="fa-solid fa-check"></i>
        `;


        if (typeof gsap !== "undefined") {

            gsap.to(loginBtn, {
                scale: 1.03,
                duration: 0.15,
                yoyo: true,
                repeat: 1
            });

        }


        showMessage(
            "Login successful. Redirecting..."
        );


        /* Redirect Dashboard */

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1000);

    });

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(message) {

    loginMessage.textContent = message;

    loginMessage.style.display = "block";

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

if (forgotPassword) {

    forgotPassword.addEventListener("click", (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {

            emailError.textContent =
                "Enter your email first.";

            emailInput.focus();

            return;
        }


        if (!validEmail(email)) {

            emailError.textContent =
                "Enter a valid email address.";

            return;
        }


        const savedUser =
            JSON.parse(
                localStorage.getItem("constructaUser")
            );


        if (!savedUser) {

            showMessage(
                "No account found for this email."
            );

            return;
        }


        if (
            savedUser.email.toLowerCase()
            !== email.toLowerCase()
        ) {

            showMessage(
                "Email address is not registered."
            );

            return;
        }


        showMessage(
            "Password reset option is available. Please contact the administrator."
        );

    });

}


/* =========================================================
   INPUT ANIMATION
========================================================= */

document.querySelectorAll(
    ".input-box input, .input-box select"
).forEach(input => {

    input.addEventListener("focus", () => {

        const box = input.closest(".input-box");

        if (box) {

            const icon =
                box.querySelector(
                    "> i:first-child"
                );

            if (icon) {
                icon.style.color = "#f59e0b";
            }

        }

    });


    input.addEventListener("blur", () => {

        const box = input.closest(".input-box");

        if (box) {

            const icon =
                box.querySelector(
                    "> i:first-child"
                );

            if (icon) {
                icon.style.color = "#737373";
            }

        }

    });

});


/* =========================================================
   ENTER KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        if (
            document.activeElement === emailInput ||
            document.activeElement === roleInput ||
            document.activeElement === passwordInput
        ) {

            loginForm.requestSubmit();

        }

    }

});

