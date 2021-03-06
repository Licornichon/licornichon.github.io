(function tldr() {
	const catchphrases = [
		'If you like unicorns, we can be friends.',
		'Dark theme. Always.',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		'You will hear me singing, badly.',
		'Black coffee. Black metal. Black... website ?',
		'I need you to scroll down now.',
		'No really, you would do me a great favor.',
		'I\'m out.',
	];
	const tldr = document.querySelector('.tldr'),
		elem = tldr.querySelector('.tldr__content');

	const _changeCatchphrase = () => {
		tldr.classList.add('hidden');
		setTimeout(function() {
			elem.innerHTML = catchphrases.splice(0,1);
		},250);
		setTimeout(function() {
			tldr.classList.remove('hidden');
		},500);
	};

	// Change catchphrase every 4s
	const intrvl = setInterval(() => {
		_changeCatchphrase();
		if (!catchphrases.length) {
			clearInterval(intrvl);
		};
	}, 4000);
})();
