let shoppingTally = localStorage.getItem("shoppingTally");

$("#shoppingCartBtn").click(() => {
	$("#shoppingCartBtn .material-symbols-outlined").toggleClass("unfilled");
});