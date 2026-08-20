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


document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById("quote-form");
    const formStatus = document.getElementById("form-status");

    if (!quoteForm) {
        console.error("Quote form not found!");
        return;
    }

    quoteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = quoteForm.querySelector('button[type="submit"]');

        // Check if button exists before using it
        if (!submitButton) {
            console.error("Submit button not found inside the form!");
            formStatus.textContent = "Something went wrong. Please refresh and try again.";
            formStatus.style.color = "red";
            return;
        }

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";
        formStatus.style.color = "";

        // Get form data
        const formData = new FormData(quoteForm);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            service: formData.get("service"),
            location: formData.get("location"),
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

            // Check if response is OK before trying to parse JSON
            if (!response.ok) {
                let errorMessage = `Server error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Server error: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            // Now safely parse the JSON response
            const result = await response.json();

            //SUCCESS - Friendly and professional
            formStatus.textContent =
                "Thanks! Your quote request has been received. Peter will get back to you shortly.";
            formStatus.style.color = "green";

            quoteForm.reset();

        } catch (error) {
            console.error("Quote form error:", error);

            //CUSTOMER-FRIENDLY ERROR MESSAGES
            let userMessage = "We're having trouble submitting your request right now. Please contact Peter directly or try again in a few minutes.";

            // Log technical details for admin
            console.log("Error type:", error.message);

            formStatus.textContent = userMessage;
            formStatus.style.color = "#d9534f";

        } finally {
            // Re-enable the button
            submitButton.disabled = false;
            submitButton.textContent = "Request Quote";
        }
    });
});