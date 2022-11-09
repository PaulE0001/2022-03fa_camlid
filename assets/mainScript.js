twemoji.parse(document.body);


const 
	headerTop = $("#headerTop"),
	nav = $("nav"),
	hamburgerMenu = $("#hamburgerMenu"),

	main = $("main"),

	aside = $("aside"),
		asideTrigger = $("aside > button"),
		asideClose = $("aside button.close"),

	pageDarken = $("#pageDarken");


/* Set up shop. Adding these transitions now rather than in the CSS allows for them to *not* be seen when we first load the page. Some of these styles also rely on dynamic variables that CSS cannot handle.
Is there a more graceful way to do this directly through the CSS? Probably. */
nav.css("transition", "transform var(--uniTrans_time_NoDel)");
aside.css("transition", "transform var(--uniTrans_time_NoDel)");
pageDarken.css("transition", "var(--uniTrans)");

nav.css( "top", headerTop.outerHeight() );
main.css("margin-top", headerTop.outerHeight() );




/* We want the Hamburger and Prototype disclaimer to operate in sync. By checking if both are disabled at *both* the start and end of the switch-arounds, we can ensure this.
I know, there's probably a more graceful way to do this. */
function toggleDarken() {
	if ( nav.hasClass("foldIn_top") && aside.hasClass("foldIn_bottom") ) {
		pageDarken.toggleClass("disabled");
	}
}

hamburgerMenu.on("click", () => {
	toggleDarken();

	aside.addClass("foldIn_bottom");
	aside.removeClass("overlaid");

	nav.addClass("overlaid");
	nav.toggleClass("foldIn_top");

	toggleDarken();
} );

function toggleAside() {
	toggleDarken();

	nav.addClass("foldIn_top");
	nav.removeClass("overlaid");

	aside.addClass("overlaid");
	aside.toggleClass("foldIn_bottom");

	toggleDarken();
}
asideTrigger.on("click", toggleAside );
asideClose.on("click", toggleAside );

pageDarken.on("click", () => {
	nav.addClass("foldIn_top");
	aside.addClass("foldIn_bottom");
	pageDarken.addClass("disabled");
} );




$(".scrollDown").on("click", (event) => {
	let 
		parent = $(event.target).parent(),
		scrollEnd = parent.position().top + parent.outerHeight();

	$('html,body').animate({
		scrollTop: scrollEnd
		},'slow', 'swing');
} );




const 
	shoppingBtn_graphic = $("#shoppingCartBtn .material-symbols-outlined"),
	shoppingBtn_badge = $("#shoppingCartBtn .badge");

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