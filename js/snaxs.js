
var prices = {
	'Snack Friends': { Small: 222, Medium: 333, Large: 444 },
	'Snack Lovers': { Small: 322, Medium: 433, Large: 544 },
	'Snack Enthusiasts': { Small: 422, Medium: 533, Large: 644 }
};

function sendMessage() {
	var contact = $('#contact');
	var info = contact.find('.info');
	var name = contact.find('#name').val();
	var email = contact.find('#email').val();
	var message = contact.find('#message').val();
	info.html("");
	if ( name === "" || email === "" || message === "" ) {
		info.html('<p>Please fill out all the fields.</p>');
	} else if ( email.indexOf('@') < 1 || email.lastIndexOf('.') < email.indexOf('@')+2 ) {
		info.html('<p>Your email address seems to be invalid!</p>');
	} else {
		$.get('mail.php',{subject:'Nachricht von '+name,email:email,message:message},function(s){
			if ( s === "sent" ) {
				contact.html('Thank you for your message. We have sent a copy of your message to you ('+email+').');
			} else {
				info.html("<p>We are sorry :( Your message could not be sent. Please try again later.</p>");
			}
		}).fail(function(){
			info.html("<p>We are sorry :( Your message could not be sent. Please try again later.</p>");
		});
	}
}

function sendSubscription() {
	var contact = $('#myModal');
	var info = contact.find('.info');
	var values = {};
	$('select,input:not([type="checkbox"]),textarea',contact).each(function(){
		values[$(this).attr('id')] = $(this).val();
	});
	$('input[type="checkbox"]:checked',contact).each(function(){
		values[$(this).attr('id')] = $(this).val();
	});
	
	info.html("");
	if ( values.first === "" || values.last === "" || values.email === "" || values.address === "" || values.city === "" || values.zipcode === "" || values.box === "" || values.freq === "" || values.start === "" ) {
		info.html('<p>Please fill out all the fields (comment is optional)!</p>');
	} else if ( values.email.indexOf('@') < 1 || values.email.lastIndexOf('.') < values.email.indexOf('@')+2 ) {
		info.html('<p>Your email address seems to be invalid!</p>');
	} else if ( values.email !== values.email2 ) {
		info.html('<p>The email addresses do not match!</p>');
	} else if ( values.agb === undefined ) {
		info.html('<p>Please accept the AGB before subscribing.</p>');
	} else {
		var nice = JSON.stringify(values).replace(/,/g, ",\n").replace(/{|}|",/g, "").replace(/":"/g, ":\t\t").replace(/"/g, "");
		console.log(nice);
		$.get('subscribe.php',{subject:'Subscription from '+values.first+' '+values.last,email:values.email,message:JSON.stringify(values)+"\n\n"+nice},function(s){
			if ( s === "sent" ) {
				$('.modal-body',contact).html('<p>Thank you for your subscription. You will receive a confirmation soon.</p>');
			} else {
				info.html("<p>We are sorry :( Your ubscription could not be completed. Please try again later.</p>");
			}
		}).fail(function(){
			info.html("We are sorry :( Your ubscription could not be completed. Please try again later.</p>");
		});
	}
}

function load(i,cb) {
	$.get('sections/'+sections[i]+'.html',function(data){
		$('article').append(data);
		if ( ++i < sections.length ) {
    		load(i,cb);
    	} else {
    		cb.call(document);
    	}
	});
}
var sections = ['header','zero','one','two','three','four','five','six','footer'];

function ready() {
	$.get('modals/subscribe.html',function(template){
		$('body').append(template);
		$('#send-subscription').on('click',sendSubscription);
		
		$('#myModal').on('show.bs.modal', function(e) {
			var bType = $('#five .active h3:first').text();
			var bSize = $('#five .active h2').text();
			var bPrice = $('#five .active h3:last').text();
			$('#start',this).val((new Date(Date.now() + 1000*60*60*24*7)).toLocaleDateString());
			$('#box',this).val(bType.substr(6).toLowerCase() + bSize);
			$('#box',this).selectpicker('refresh');
			$('#freq',this).selectpicker('refresh');
			$('#agb',this).attr('checked', false);
		});
	});
	
	$('#five .box-type').on('click',function(){
		$('#five .box-type.active').removeClass('active').addClass('inactive');
		$(this).removeClass('inactive').addClass('active');
		var bType = $('#five .active h3:first').text();
		$('.box-size .box-small').text(prices[bType]['Small']+' CHF');
		$('.box-size .box-medium').text(prices[bType]['Medium']+' CHF');
		$('.box-size .box-large').text(prices[bType]['Large']+' CHF');
	});
	$('#five .box-size').on('click',function(){
		$('#five .box-size.active').removeClass('active').addClass('inactive');
		$(this).removeClass('inactive').addClass('active');
	});
	
	$('#three .badges .badge').on('click',function(){
		$('#three .carousel').carousel($(this).data('slide-to'));
		$('#three .badges .badge').removeClass('active');
		$(this).addClass('active');
	});
	$("#carousel-lifestyle").on('slid.bs.carousel', function () {
        $('#three .badges .badge').removeClass('active');
        $('#three .badges .badge[data-slide-to="'+$("#carousel-lifestyle .carousel-indicators li.active").data('slide-to')+'"]').addClass('active');
    });
    
    var snackboxI = 0;
    window.setInterval(function(){
    	snackboxI = snackboxI % 15 + 1;
    	$('#snackbox').attr('src',"images/snackbox/Box_content_"+snackboxI+".png");
    }, 1000)
}

$(document).ready(function(){
	load(0,ready);
});
