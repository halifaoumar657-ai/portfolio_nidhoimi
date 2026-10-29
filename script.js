
/* =========================================
   1. MENU MOBILE
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        });
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        }
    });
}


/* =========================================
   2. ANNÉE AUTOMATIQUE
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   3. FORMULAIRE WHATSAPP
========================================= */

// IMPORTANT : remplace ce numéro par ton numéro WhatsApp.
// Format international : indicatif du pays + numéro,
// sans espaces, sans + et sans tirets.

const whatsappNumber = "221763623959";

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#name")?.value.trim();
        const phone = document.querySelector("#phone")?.value.trim();
        const service = document.querySelector("#service")?.value;
        const message = document.querySelector("#message")?.value.trim();

        if (!name || !phone || !service || !message) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }

        if (whatsappNumber.includes("X")) {
            alert(
                "Le formulaire est presque prêt. Ajoutez votre numéro WhatsApp dans script.js."
            );
            return;
        }

        const whatsappMessage = [
            "Bonjour, je souhaite demander un devis.",
            "",
            `Nom : ${name}`,
            `Téléphone : ${phone}`,
            `Service souhaité : ${service}`,
            "",
            "Description du projet :",
            message
        ].join("\n");

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}
