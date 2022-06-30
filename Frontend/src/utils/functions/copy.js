export function copy(id) {
	var copyText = document.getElementById(id);
	navigator.clipboard.writeText(copyText.textContent || copyText.innerText);
}
