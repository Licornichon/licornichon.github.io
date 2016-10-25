function smoothy(evt) {
	evt.preventDefault();
	evt.stopPropagation();
	window.scrollTo(0, document.getElementById(evt.target.args.substr(1)).offsetTop);
}

window.onload = function init() {
	var n = document.getElementById("nav");
	var links = n.getElementsByClassName("link");

	for (var i = 0; i < links.length; i++) {
		var target = links[i].getAttribute("href");
		links[i].addEventListener("click", smoothy, false);
		links[i].args = target;
	}
}