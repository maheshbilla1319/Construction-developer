
/* =========================================================
   CONSTRUCTA DEVELOPERS
   SIGNUP JAVASCRIPT
========================================================= */


/* =========================================================
   AOS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }

});


/* =========================================================
   GSAP PAGE ANIMATION
========================================================= */

window.addEventListener("load", () => {

    if (typeof gsap === "undefined") {
        return;
    }

    const tl = gsap.timeline();

    tl.from(".brand", {
        opacity: 0,
        y: -25,
        duration: 0.7
    })

    .from(".eyebrow", {
        opacity: 0,
        x: -30,
        duration: 0.6
    })

    .from(".visual-content h1", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3")

    .from(".visual-content p", {
        opacity: 0,
        y: 20,
        duration: 0.5
    }, "-=0.4")

    .from(".visual-icons div", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.5
    }, "-=0.2")

    .from(".signup-card", {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: "power3.out"
    }, "-=0.8");

});


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", () => {

        if (input.type === "password") {

            input.type = "text";

            button.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            input.type = "password";

            button.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}

setupPasswordToggle(
    "passwordToggle",
    "password"
);

setupPasswordToggle(
    "confirmToggle",
    "confirmPassword"
);


/* =========================================================
   FORM
========================================================= */

const signupForm = document.getElementById("signupForm");

const formMessage = document.getElementById("formMessage");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Values */

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const role =
        document.getElementById("role").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;


    /* Error elements */

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const roleError =
        document.getElementById("roleError");

    const passwordError =
        document.getElementById("passwordError");

    const confirmError =
        document.getElementById("confirmError");


    /* Clear */

    nameError.textContent = "";
    emailError.textContent = "";
    roleError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";

    formMessage.textContent = "";

    formMessage.className = "form-message";


    let valid = true;


    /* =====================================================
       NAME
    ===================================================== */

    if (name.length < 3) {

        nameError.textContent =
            "Please enter your full name.";

        valid = false;

    }


    /* =====================================================
       EMAIL
    ===================================================== */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Enter a valid email address.";

        valid = false;

    }


    /* =====================================================
       ROLE
    ===================================================== */

    if (!role) {

        roleError.textContent =
            "Please select your role.";

        valid = false;

    }


    /* =====================================================
       PASSWORD
    ===================================================== */

    if (password.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    /* =====================================================
       CONFIRM PASSWORD
    ===================================================== */

    if (password !== confirmPassword) {

        confirmError.textContent =
            "Passwords do not match.";

        valid = false;

    }


    /* =====================================================
       TERMS
    ===================================================== */

    if (!terms) {

        formMessage.textContent =
            "Please accept the Terms & Conditions.";

        formMessage.classList.add("error");

        valid = false;

    }


    if (!valid) {
        return;
    }


    /* =====================================================
       SAVE USER
    ===================================================== */

    const user = {
        name: name,
        email: email,
        role: role,
        password: password
    };


    localStorage.setItem(
        "constructaUser",
        JSON.stringify(user)
    );


    /* Dashboard values */

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


    /* =====================================================
       SUCCESS
    ===================================================== */

    formMessage.textContent =
        "Account created successfully! Redirecting...";

    formMessage.classList.add("success");


    /* Button animation */

    const button =
        document.querySelector(".signup-btn");

    button.innerHTML =
        '<span>Account Created</span><i class="fa-solid fa-check"></i>';

    button.style.background = "#ffffff";


    /* Redirect */

    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1500);

});

