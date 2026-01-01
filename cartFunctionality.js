let cartIcon = document.querySelector(".cart");
let cartTab = document.querySelector(".cart-tab");
let cartClose = document.querySelector(".cart-Close");
let listProductHTML = document.querySelector(".menu");
let listCartHTML = document.querySelector(".cart-list");
let iconCartSpan = document.querySelector(".iconCartSpan");
let restaurantName = document.querySelector("h1").innerText.replace(" ", "_");

let cart = [];
let listAllItems = [];
let courseOptions = [];
let courseLookup = {};

//Used for opening and closing the cart
cartIcon.addEventListener('click', () => {
    cartTab.classList.toggle('showCart');
});

cartClose.addEventListener('click', () => {
    cartTab.classList.remove('showCart');
});


//Adds items to cart
listProductHTML.addEventListener('click', (event) => {
    let foodItemClicked = event.target;
    if (foodItemClicked.classList.contains('select')) {
        let product_ID = foodItemClicked.parentElement.dataset.id;
        addToCart(product_ID);
    }
});

const addToCart = (product_ID) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_ID == product_ID);
    if (cart.length <= 0) {
        cart = [{
            "product_ID": product_ID,
            "quantity": 1
        }]
    } else if (positionThisProductInCart < 0) {
        cart.push({
            "product_ID": product_ID,
            "quantity": 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToHTML = () => {
    let totalItems = 0;
    listCartHTML.innerHTML = '';
    if (cart.length > 0) {
        cart.forEach(cartItem => {
            totalItems += cartItem.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('cart-item');
            newCart.dataset.id = cartItem.product_ID;
            let positionProduct = listAllItems.findIndex((value) => value.id == cartItem.product_ID);
            let info = listAllItems[positionProduct];
            newCart.innerHTML = `
                <div class="item-name">
                    ${info.name}
                </div>
                <div class="item-price">
                    £${info.price * cartItem.quantity}
                </div>
                <div class="item-quant">
                    <span class="quant-minus">-</span>
                    <span>${cartItem.quantity}</span>
                    <span class="quant-add">+</span>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerHTML = totalItems;
}

const addCartToMemory = () => {
    localStorage.setItem(`${restaurantName}Cart`, JSON.stringify(cart));
}


//Add items to menu on load and remembers cart options
const addDataToHTML = () => {
    if (listAllItems.length > 0) {
        //Gets a list of all courseOptions
        for (let i = 0; i < listAllItems.length; i++) {
            var name = listAllItems[i].courseOption;
            if (!(name in courseLookup)) {
                courseLookup[name] = 1;
                courseOptions.push(name);
            }
        }

        courseOptions.forEach(course => {
            listProductHTML.innerHTML += `
            <article class="course ${course}">
            </article>
            `;
            let listCourseHTML = document.querySelector(`.${course}`);
            listCourseHTML.innerHTML = `
            <h2 class="course-option">${course}</h2>
            <hr class="underline">
            `;
            listAllItems.forEach(product => {
                if (product.courseOption == course) {
                    let newProduct = document.createElement('div');
                    newProduct.classList.add('card');
                    newProduct.dataset.id = product.id;
                    newProduct.innerHTML = `
                    <div class="meal">
                        <div class="food-accompaniment">
                            <h3 class="primary-food">${product.name}</h3>
                            <p class="accompaniment">${product.accompaniment}</p>
                        </div>
                        <p class="price">£${product.price}</p>
                    </div>
                    <div class="select">
                        <p class="check">+</p>
                    </div>
                    `;
                    listCourseHTML.appendChild(newProduct);

                }
            });
        });
        likeButtonAnimation();
    }

}

listCartHTML.addEventListener('click', (event) => {
    let cartQuantChange = event.target;
    if (cartQuantChange.classList.contains('quant-add') || cartQuantChange.classList.contains('quant-minus')) {
        let product_ID = cartQuantChange.parentElement.parentElement.dataset.id;
        let cartQuantChangeType = 'minus';
        if (cartQuantChange.classList.contains('quant-add')) {
            cartQuantChangeType = 'add';
        }
        changeQuantity(product_ID, cartQuantChangeType);
    }
})

const changeQuantity = (product_ID, cartQuantChangeType) => {
    let positionItemInCart = cart.findIndex((value) => value.product_ID == product_ID);
    if (positionItemInCart >= 0) {
        switch (cartQuantChangeType) {
            case 'add':
                cart[positionItemInCart].quantity += 1;
                break;

            default:
                let valueChange = cart[positionItemInCart].quantity - 1
                if (valueChange > 0) {
                    cart[positionItemInCart].quantity = valueChange
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    fetch(`${restaurantName}_Products.json`)
        .then(response => response.json())
        .then(data => {
            listAllItems = data;
            addDataToHTML();

            //Get cart from memory
            if (localStorage.getItem(`${restaurantName}Cart`)) {
                cart = JSON.parse(localStorage.getItem(`${restaurantName}Cart`));
            }
        });
}

initApp();

//Like button function
function likeButtonAnimation() {
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
}