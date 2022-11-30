// # GENERIC ACTION DISABLE
function actionDisabled(event) {
	event.preventDefault();
	toggleAside();
}


// # DISABLE NAV LINKS
$("header a").on("click", actionDisabled);


// # DISABLE SHOPPING CART
$("#shoppingCartBtn").on("click", actionDisabled);


// # DISABLE CTA BUTTONS
$("button.callToAction").on("click", actionDisabled);