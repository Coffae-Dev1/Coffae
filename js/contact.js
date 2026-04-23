// Contact Page - Osemdi Nwabuzor

// Fade in form on load
const contactLeft = document.getElementById("contactMain");

window.addEventListener("load", function() {
    setTimeout(function() {
        contactLeft.classList.add("visible");
    }, 200);
});

// Form submit
function handleSubmit(event) {
    event.preventDefault();

    const body = document.querySelector(".contact-body");

    body.style.transition = "opacity 0.8s ease";
    body.style.opacity = "0";

    setTimeout(function() {
        body.innerHTML = `
            <div class="contact-thankyou" style="display:block">
                <h2 class="contact-thankyou-title schoolbell-regular">Thank you.</h2>
                <p class="contact-thankyou-sub">We'll get back to you shortly.</p>
            </div>
        `;
        body.style.opacity = "1";
    }, 800);
}
