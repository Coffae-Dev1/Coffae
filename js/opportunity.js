const fadeSections = document.querySelectorAll(".opp-fade");

window.addEventListener("scroll", function() {
    fadeSections.forEach(function(section) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
            section.classList.add("visible");
        }
    });
});

function toggleBlock(block) {
    block.classList.toggle("active");
}

function switchChart(tab, imgSrc) {
    const img = document.getElementById("compImg");
    img.style.opacity = "0";
    setTimeout(function() {
        img.src = imgSrc;
        img.style.opacity = "1";
    }, 300);
    document.querySelectorAll(".opp-tab").forEach(function(t) {
        t.classList.remove("active");
    });
    tab.classList.add("active");
}
