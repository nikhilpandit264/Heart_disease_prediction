function redirectToApp() {
    window.location.href = "/index";
}



    function scrollToFeatures() {
        document.getElementById("features").scrollIntoView({ behavior: 'smooth' });
    }

        // Optional: Sticky header behavior
        window.addEventListener("scroll", function () {
            const header = document.getElementById("header");
            if (window.scrollY > 50) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        });
 