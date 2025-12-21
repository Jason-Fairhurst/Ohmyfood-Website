document.addEventListener("DOMContentLoaded", () => {

    // Select all meal cards
    const mealItem = document.querySelectorAll('.card');

    // Loop through each meal card
    mealItem.forEach(mealItem => {

        // Add a click event listener to each question
        mealItem.addEventListener('click', () => {

            // Toggle animation class when the meal card is clicked
            const meal = mealItem.querySelector('.meal')

            if (meal) {
                meal.classList.add("add-item");
                var timer = setTimeout(() => { meal.classList.remove("add-item"); }, 2000);

            }
        });
    });
});