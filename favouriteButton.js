document.addEventListener("DOMContentLoaded", () => {
    // Select all like Buttons
    let likeButtons = document.querySelectorAll('.like-outline');

    // Loop through each like button
    likeButtons.forEach(likeButtons => {
        // Add a click event listener to each question
        likeButtons.addEventListener('click', () => {

            // Toggle fade class when the like button is clicked
            likeButtons.classList.toggle('like-outline-fade');
            let blank = likeButtons.nextElementSibling;
            if (blank) {
                blank.classList.toggle("blank-tansformY");
            }
        });
    });
});