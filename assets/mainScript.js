const shoppingBtn_graphic = $("#shoppingCartBtn .material-symbols-outlined");
const shoppingBtn_badge = $("#shoppingCartBtn .badge");

let shoppingTally = Number( localStorage.getItem("shoppingTally") );
shoppingBtn_badge.text(shoppingTally);

function addToCart(toAdd) {
	shoppingBtn_badge.removeClass("setNone");
	shoppingTally = shoppingTally + toAdd;
	shoppingBtn_badge.text(shoppingTally);
	localStorage.setItem("shoppingTally", shoppingTally);
}

function clearCart() {
	shoppingBtn_graphic.addClass("unfilled");
	shoppingBtn_badge.addClass("setNone");
	shoppingTally = 0;
	localStorage.removeItem("shoppingTally");
}


$("#shoppingCartBtn").click(() => {
	shoppingBtn_graphic.toggleClass("unfilled");
});