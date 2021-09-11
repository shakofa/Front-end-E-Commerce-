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
}


function removeCartItem(event) {
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotall();
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || (input.value <= 0) ){
        input.value = 1;
    };
    updateCartTotall();
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
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total ;
}