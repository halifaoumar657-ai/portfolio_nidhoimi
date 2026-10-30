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
   3. FORMULAIRE DE CONTACT FORMSPREE
========================================= */

const contactForm = document.querySelector("#email-contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Vérifier les champs obligatoires.
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Éviter les doubles soumissions.
        if (submitButton && submitButton.disabled) {
            return;
        }

        const originalButtonText = submitButton
            ? submitButton.innerHTML
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Envoi en cours...";
        }

        // Créer ou récupérer la zone de retour du formulaire.
        let statusMessage = contactForm.querySelector(".form-status");

        if (!statusMessage) {
            statusMessage = document.createElement("p");
            statusMessage.className = "form-status";
            statusMessage.setAttribute("role", "status");
            statusMessage.setAttribute("aria-live", "polite");

            const formNote = contactForm.querySelector(".form-note");

            if (formNote) {
                formNote.insertAdjacentElement("afterend", statusMessage);
            } else {
                contactForm.appendChild(statusMessage);
            }
        }

        statusMessage.textContent = "";
        statusMessage.style.color = "";

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            let result = {};

            try {
                result = await response.json();
            } catch {
                result = {};
            }

            if (response.ok) {
                statusMessage.textContent =
                    "Votre demande a bien été transmise. Merci !";

                statusMessage.style.color = "#15803d";

                contactForm.reset();
            } else {
                const errorDetails = Array.isArray(result.errors)
                    ? result.errors
                        .map((error) => error.message)
                        .filter(Boolean)
                        .join(" ")
                    : "";

                throw new Error(
                    errorDetails ||
                    "Formspree n'a pas accepté l'envoi. Veuillez réessayer."
                );
            }
        } catch (error) {
            console.error("Erreur d'envoi Formspree :", error);

            statusMessage.textContent =
                error.message ||
                "Impossible d'envoyer votre demande. Vérifiez votre connexion et réessayez.";

            statusMessage.style.color = "#b91c1c";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }
    });
}
