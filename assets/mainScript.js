




const 
	headerTop = $("#headerTop"),
	nav = $("nav"),
	hamburgerMenu = $("#hamburgerMenu"),

	main = $("main"),

	aside = $("aside"),
		asideTrigger = $("aside > button"),
		asideClose = $("aside button.close"),

	pageDarken = $("#pageDarken");


let 
	headerHeight,
	scrollbarSize;


/* Set up shop. Adding these transitions now rather than in the CSS allows for them to *not* be seen when we first load the page. Some of these styles also rely on dynamic variables that CSS cannot handle.
Is there a more graceful way to do this directly through the CSS? Probably. */
$( () => {
	nav.css("transition", "transform var(--uniTrans_time_NoDel)");
	aside.css("transition", "transform var(--uniTrans_time_NoDel)");
	pageDarken.css("transition", "var(--uniTrans)");

	headerHeight = headerTop.innerHeight();

	/* nav.css( "top", headerTop.outerHeight() );
	main.css("margin-top", headerTop.outerHeight() ); */

	twemoji.parse(document.body);
} );




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




$("button.scrollDown").on("click", (event) => {
	headerHeight = headerTop.innerHeight();
	
	let 
		button = $(event.target),
		/* Rather than scrolling directly to the immediate start of the next section, this is resolved to scroll to the top end of the button. This helps avoid some edge cases on mobile devices.
		Yes, there's probably a more graceful way to do this <:) */
		scrollEnd = button.offset().top - headerHeight - Length.toPx(button, '1rem');
		console.debug({scrollEnd: scrollEnd});
		//scrollEnd = parent.position().top + parent.outerHeight();

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