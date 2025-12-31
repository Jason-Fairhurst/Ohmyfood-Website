let cartIcon = document.querySelector(".cart");
let cartTab = document.querySelector(".cart-tab");
let cartClose = document.querySelector(".cart-Close");
let listProductHTML = document.querySelector(".menu");
let listCartHTML = document.querySelector(".cart-list");
let listStarterHTML = document.querySelector(".starters");

let cart = [];
let listStarter = [];

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
            let positionProduct = listStarter.findIndex((value) => value.id == cartItem.product_ID);
            let info = listStarter[positionProduct];
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
    console.log("Number of items in the basket: " + totalItems);
}

const addCartToMemory = () => {
    localStorage.setItem('Cart', JSON.stringify(cart));
}


//Add items to menu on load and remembers cart options
const addDataToHTML = () => {
    listStarterHTML.innerHTML = `
        <h2 class="course-option">Starters</h2>
        <hr class="underline">
        `;
    if (listStarter.length > 0) {
        listStarter.forEach(product => {
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
            listStarterHTML.appendChild(newProduct);

        });
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
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listStarter = data;
            addDataToHTML();

            //Get cart from memory
            if (localStorage.getItem('Cart')) {
                cart = JSON.parse(localStorage.getItem('Cart'));
                addCartToHTML();
            }
        });
}

initApp();