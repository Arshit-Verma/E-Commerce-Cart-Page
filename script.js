document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {id: 1, name: "Product 1", price: 29.99 },
        {id: 2, name: "Product 2", price: 19.99 },
        {id: 3, name: "Product 3", price: 39.99 },
    ]

    const cart = []

    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalMessage = document.getElementById("cart-total")
    const totalPriceDisplay = document.getElementById("total-price")
    const checkoutBtn = document.getElementById("checkout-btn")

    // Render all the products

    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')

        productDiv.innerHTML = `
        <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id = "${product.id}">Add to cart</button>
        `
        productList.appendChild(productDiv)
    })

    productList.addEventListener("click", (e) => {
        if(e.target.tagName === 'BUTTON'){
            const productId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p => p.id === productId)
            addToCart(product)
            renderCart(cart)
        }
    })

    function addToCart(product){
        cart.push(product)
    }

    function renderCart(){
        cartItems.innerText = "" // use innerText and not innerHtml because cartitems jjad one para only which comes under text category
        let totalPrice = 0
        if(cart.length){
            emptyCartMessage.classList.add('hidden')
            cart.forEach((item,index) =>{
                totalPrice += item.price
                const cartItem = document.createElement("div")
                // const removebtn = document.createElement("div")
                // removebtn.innerHTML = `
                
                // `
                cartItem.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)}
                <button id= "removeBtn">Remove</button>
                `
                cartItem.setAttribute("id","cart-item")
                cartItems.appendChild(cartItem)

                cartItem.querySelector("button").addEventListener('click', (e) => {
                    e.stopPropagation();
                    const itemIndex = index; // Use the index from the forEach loop
                    cart.splice(itemIndex, 1); // Remove the item from the cart array
                    cartItem.remove(); // Remove the DOM element
                    renderCart(); // Re-render the cart to update the UI
                })
            })
            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`
            cartTotalMessage.classList.remove('hidden')
            
        }
        else{
            emptyCartMessage.classList.remove('hidden'); // will be usefull if you change the about code and add the hidden class instead of making innertext to ""
            totalPriceDisplay.textContent = `$0.00`
        }

    }

    checkoutBtn.addEventListener('click',() => {
        cart.length = 0
        alert("Checkout successfully")
        renderCart()
    })

})