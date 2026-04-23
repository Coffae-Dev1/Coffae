const heroTitle = document.getElementById("heroTitle");
const titles = ["New Arrivals", "The Coffee Table"];
let currentIndex = 0;

setInterval(function() {
    heroTitle.style.opacity = "0";

    setTimeout(function() {
        currentIndex = (currentIndex + 1) % titles.length;
        heroTitle.textContent = titles[currentIndex];
        heroTitle.style.opacity = "1";
    }, 500);

}, 3000);

const nav = document.querySelector(".home-nav");

window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        nav.style.background = "rgba(180, 175, 168, 0.45)";
    } else {
        nav.style.background = "rgba(180, 175, 168, 0.45)";
    }
});
// Draggable reviews scroll
const track = document.getElementById("reviewsTrack");
const wrapper = track.parentElement;

let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener("mousedown", function(e) {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener("mouseleave", function() {
    isDown = false;
});

wrapper.addEventListener("mouseup", function() {
    isDown = false;
});

wrapper.addEventListener("mousemove", function(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
});

const footer = document.querySelector(".home-footer");

window.addEventListener("scroll", function() {
    if (!footer) return;
    
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - 100) {
        footer.classList.add("visible");
    }
});
function handleWaitlist() {
    const input = document.querySelector(".home-footer-input");
    const success = document.getElementById("waitlistSuccess");

    if (input.value !== "") {
        success.style.display = "block";
        input.value = "";

        setTimeout(function() {
            success.style.display = "none";
        }, 4000);
    }
}
