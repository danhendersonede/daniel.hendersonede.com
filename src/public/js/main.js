document.body.className = document.body.className.replace("no-js", "js");

const menuButton = document.getElementById("menu-button");

menuButton.addEventListener("click", (e) => {
	menuButton.style.display = "none";

	const header = document.getElementById("header");

	header.classList.add("header__smallviewport");

	const firstNavLink = header.querySelector(".nav-item a");

	setTimeout(() => {
		if (firstNavLink) {
			firstNavLink.focus();
		}
	}, 0);
});

const tooltip = document.getElementById("tooltipDesignSystems");

tooltip.addEventListener("click", (e) => {
	document.getElementById("modal").showModal();
});

const modelClose = document.getElementById("modalClose");

modelClose.addEventListener("click", (e) => {
	document.getElementById("modal").close();
});
