$('a[href^="#"]').click(function(){
	var section_id = $(this).attr("href");

	$('html, body').animate({
		scrollTop:$(section_id).offset().top
	}, 'slow');
	return false;
});

$(window).scroll(function(){
	//adds a darker background to the navbar as we scroll down
	if($(window).scrollTop() > 0) $('header').addClass('opaque');
	else  $('header').removeClass('opaque');

		$('#heroSection .container').css({
			'opacity': function(){
				//opacity lowers as we scroll down
				return 1 - ($(window).scrollTop() / $(window).height() * 2);
			}
		});
});