//this statement check if the page is loading before the js run the page.//
if (document.readyState == 'loading') {
    //if the page loading, do this//
    document.addEventListener('DOMContentLoaded', ready);
}else {
    //if the page does not loading then do the ready function no matter what//
    ready();
}


//the page is already loaded when the code reach to this point//
//add this function here is for hooking up the buttons.//

function ready() {

    /*this is the pop up login form part */
    var openModalButtons = document.querySelectorAll('[data-modal-target]')
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
           var modal = document.querySelector(button.dataset.modalTarget)
           openModal(modal)
       })
   });

   var overlay = document.getElementById('overlay')
   overlay.addEventListener('click', () => {
     const modals = document.querySelectorAll('.modal.active')
     modals.forEach(modal => {
       closeModal(modal)
     })
   })

   var closeModalButtons = document.querySelectorAll('[data-close-button]')
   closeModalButtons.forEach(button => {
     button.addEventListener('click', () => {
       var modal = button.closest('.modal')
       closeModal(modal)
     })
   })
   /*End of pop up form var*/

    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    var quantityInput = document.getElementsByClassName("cart-quantity-input")
    for( var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }

    //add to cart button//
    var addToCartButton = document.getElementsByClassName("shop-item-button")
    for( var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i];
        button.addEventListener("click", addToCartClicked, cardNumbers);
    }

    //purchase button//
    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}


function cardNumbers() {
    var prodctNumbers =localStorage.getItem("cardNumbers");

    prodctNumbers = parseInt(prodctNumbers);
    if(prodctNumbers){
        window.localStorage.setItem("cardNumbers", prodctNumbers + 1);
        document.querySelector(".cart span").textContent = prodctNumbers +1;
    }else{
        window.localStorage.setItem("cardNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    
}



function purchaseClicked() {
    alert("Thank you for you purchase");

    
    var prodctNumbers =localStorage.getItem("cardNumbers");

    prodctNumbers = parseInt(prodctNumbers);
    if(purchaseClicked){
        window.localStorage.setItem("cardNumbers", prodctNumbers = 0);
        document.querySelector(".cart span").textContent = prodctNumbers = 0;
    }

    //this part remove all rows and its items from cart when the purchace btn clicked.//
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotall();
}




function removeCartItem(event) {
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove();

            //this part set the card number to -1 when the remove btn clicked//
            var prodctNumbers =localStorage.getItem("cardNumbers");

    prodctNumbers = parseInt(prodctNumbers);
            if(removeCartItem){
                window.localStorage.setItem("cardNumbers", prodctNumbers - 1);
                document.querySelector(".cart span").textContent = prodctNumbers -1;
            }else{
                window.localStorage.setItem("cardNumbers", 0);
                document.querySelector(".cart span").textContent = 0; 
            }
            updateCartTotall();
}


function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || (input.value <= 0) ){
        input.value = 1;
    };
    updateCartTotall();
}


function addToCartClicked(event){
    var button1 = event.target
    var shopItem = button1.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src

    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    updateCartTotall();
    cardNumbers();
    
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName("cart-items")[0];   
    var cartItemsNames = cartItems.getElementsByClassName("cart-item-title")
    for(var i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title){
            alert("this item has already added to cart");
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            
        </div>
        <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">&times;</button>
            </div>`
     cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener("change", quantityChanged);

}


//this function update the cart total//
function updateCartTotall() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0;
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = priceElement.innerText.replace("$", "");
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    //to display the total parice without showing too many same nubmers after decimal//
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total ;
}



/*this is the pop up login form part */

    function openModal(modal) {
      if (modal == null) return
      modal.classList.add('active')
      overlay.classList.add('active')
    }
    
    function closeModal(modal) {
      if (modal == null) return
      modal.classList.remove('active')
      overlay.classList.remove('active')
    }
    