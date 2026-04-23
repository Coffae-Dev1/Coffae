const contactMain = document.getElementById("contactMain");

window.addEventListener("scroll", function() {
    if (!contactMain) return;
    const top = contactMain.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
        contactMain.classList.add("visible");
    }
});

// Form submit
function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    const thankyou = document.getElementById("contactThankyou");

    form.style.display = "none";
    thankyou.style.display = "block";
}
