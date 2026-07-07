document.addEventListener("DOMContentLoaded", () => {
    const reviews = document.querySelectorAll(".review__item");
    const button = document.querySelector(".comments .btn");

    const step = 8; 
    let visible = step;

    function updateReviews() {
        reviews.forEach((review, index) => {
            review.classList.toggle("visible", index < visible);
        });

        if (visible >= reviews.length) {
            button.style.display = "none";
        }
    }

    updateReviews();

    button.addEventListener("click", () => {
        visible += step;
        updateReviews();
    });
});