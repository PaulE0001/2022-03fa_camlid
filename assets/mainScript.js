const headerTop = $("#headerTop");
const nav = $("nav");
const hamburgerMenu = $("#hamburgerMenu");

nav.css("transition", "transform var(--uniTrans_time_NoDel)")
hamburgerMenu.click( () => {
	nav.toggleClass("foldOut_top");
} );

nav.css( "top", headerTop.outerHeight() );


const shoppingBtn_graphic = $("#shoppingCartBtn .material-symbols-outlined");
const shoppingBtn_badge = $("#shoppingCartBtn .badge");

let shoppingTally = Number( localStorage.getItem("shoppingTally") );
shoppingBtn_badge.text(shoppingTally);

if (shoppingTally > 0) {
	shoppingBtn_graphic.removeClass("unfilled");
	shoppingBtn_badge.removeClass("setNone");
}

function addToCart(toAdd) {
	shoppingBtn_graphic.removeClass("unfilled");
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


$("#shoppingCartBtn").click( () => {
	shoppingBtn_graphic.toggleClass("unfilled");
} );