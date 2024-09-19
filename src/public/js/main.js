const menuButtonOpen = document.getElementById("menu-button--open");
const menuButtonClose = document.getElementById("menu-button--close");
const header = document.getElementById("header");

menuButtonOpen.addEventListener("click", (e) => {
	menuButtonOpen.style.display = "none";
	menuButtonClose.style.display = "block";

	header.classList.add("header__smallviewport");

	setTimeout(() => {
		if (menuButtonClose) {
			menuButtonClose.focus();
		}
	}, 0);
});

menuButtonClose.addEventListener("click", (e) => {
	menuButtonOpen.style.display = "block";
	menuButtonClose.style.display = "none";

	header.classList.remove("header__smallviewport");

	setTimeout(() => {
		if (menuButtonOpen) {
			menuButtonOpen.focus();
		}
	}, 0);
});
