document.addEventListener("DOMContentLoaded", (likeButtonAnimation));

//Like button function
function likeButtonAnimation() {
    // Select all like Buttons
    let likebuttonContainer = document.querySelectorAll('.favourite');

    // Loop through each like button
    likebuttonContainer.forEach(likeButton => {
        let likeButtonOutline = likeButton.querySelector('.like-outline');

        // Add a input event listener to each question
        ['click', 'keypress'].forEach(evnt => {
            likeButton.addEventListener(evnt, (event) => {
                if (event.key === 'Enter' || event.type == 'click') {
                    // Toggle fade class when the like button is selected
                    likeButtonOutline.classList.toggle('like-outline-fade');

                    let blank = likeButtonOutline.nextElementSibling;
                    if (blank) {
                        blank.classList.toggle("blank-tansformY");
                    }
                }
            });
        });
    });
}