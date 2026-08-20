const navLinks = document.querySelectorAll("nav ul a");
const sections = document.querySelectorAll("section");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 120) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});

lucide.createIcons();

const revealSections = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});

const mobileLinks = document.querySelectorAll("nav ul a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});

const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");

if (quoteForm) {
    quoteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = quoteForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "";

        const formData = new FormData(quoteForm);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            service: formData.get("service"),
            message: formData.get("message"),
            preferredContact: formData.get("preferredContact")
        };

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to submit request.");
            }

            formStatus.textContent =
                "Thanks! Your quote request has been received. Peter will get back to you shortly.";

            quoteForm.reset();

        } catch (error) {
            console.error("Quote form error:", error);

            formStatus.textContent =
                "Sorry, something went wrong. Please contact Peter directly.";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Request Quote";
        }
    });
}