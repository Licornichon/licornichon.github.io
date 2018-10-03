(function scrollTo() {
	const anchors = document.querySelectorAll('.link[href^="#"]');
	
	for(let i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', (e) => {
			e.preventDefault();
			const to = document.getElementById(anchors[i].href.split("#")[1]),
				toY = to.getBoundingClientRect().top + window.scrollY,
				currentAnchor = document.querySelector('.anchor.active');
			
			if(currentAnchor) currentAnchor.classList.remove('active');

			window.scrollTo(
				0, // x
				toY	- 50 // keep a bit of space on top for easier reading
			);

			//toggle quickly in succession to trigger the color transition
			document.getElementById('trigger').checked = false;
			to.classList.add('active');
		});
	}
})();