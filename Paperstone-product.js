// CGIT Optimizely Boilerplate - version 0.1.4
//
// Wrap the experiment code in an IIFE, this creates a local scope and allows us to
// pass in jQuery to use as $. Other globals could be passed in if required.
var exp = (function($) {

	// Initialise the experiment object
	var exp = {};

	// Wrapper for console.log, to prevent the exp breaking on browsers which don't
	// (always) have 'console' set (e.g. IE9)
	exp.log = function (str) {
	    if (typeof window.console !== 'undefined') {
	        console.log(str);
	    }
	};

	// Log the experiment, useful when multiple experiments are running
	exp.log('AWA - Paperstone- Product');


	// Variables
	// Object containing variables, generally these would be strings or jQuery objects
	exp.vars = {
			bestSellerBanner : '<div id="AWA-bestSellerBanner"><span>BESTSELLER</span></div>',
			lowPricePopup : "<div id='AWA-lowPricePopup'><div id='AWA-modalContent'><span class='AWA-close'>&times;</span><br><h1><span class='LPPcheck'>&#10004;</span> Low price promise</h1><h1>0345 567 4000</h1><p>We're constantly reviewing our prices against competitors, but if you find a lower price <a href='http://www.paperstone.co.uk/help_91_The-Paperstone-Price-Promise.aspx' target='_blank'>we'll happily price match.</a></div></div>",
			exDesCheck : '<br><span class="AWA-checkmark">&#10004;</span>'
		};

	// Styles
	// String containing the CSS for the experiment
	exp.css = '\
		#product-box {\
			border: none;\
		}\
		#add-to-basket-box {\
			border: none;\
		}\
		#expected-delivery-box {\
			border: none !important;\
		}\
		#back-arrow {\
			display: none;\
		}\
		.breadcrumb-box a, .breadcrumb-box span {\
			font-size: 12px !important;\
		}\
		#product-box .product-icons-holder {\
			display: none;\
		}\
		#AWA-bestSellerBanner {\
			width: 300px;\
			height: 25px;\
			background-color: #CC0000;\
			color: white;\
			text-align: center;\
			font-size: 16px;\
			font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;\
			font-weight: 700;\
			margin-left: 9px;\
		}\
		#AWA-bestSellerBanner span {\
			line-height: 25px;\
			vertical-align: middle;\
		}\
		#add-to-basket-box .add-to-basket-button {\
			background: #ff69b4;\
			color: white;\
		}\
		#mp-basket-checkout-button {\
			background: #ff69b4;\
		}\
		#product-box h1 {\
			float: none;\
			width: 765px;\
		}\
		#prod-description-top-left {\
			display: block;\
			margin-bottom: 8px;\
		}\
		#product-box {\
			display: table;\
		}\
		#AWA-lowPricePopup {\
			display: none;\
			position: fixed;\
			top: 0;\
			left: 0;\
			z-index: 1;\
			width: 100%;\
		}\
		#AWA-modalContent {\
			width: 300px;\
			height: 150px;\
			display: block;\
			margin: 15% auto;\
			background: #ff69b4;\
			border-radius: 15px;\
			color: white;\
			text-align: center;\
			font-size: 16px;\
			font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;\
			font-weight: 700;\
		}\
		#AWA-modalContent h1 {\
			font-size: 24px;\
			margin-bottom: 8px;\
		}\
		.LPPcheck {\
			color: #ff69b4;\
			background: white;\
			border-radius: 50%;\
			letter-spacing: 5px;\
			padding-left: 3px;\
		}\
		.AWA-close {\
		    color: white;\
		    float: right;\
		    margin-right: 5px;\
		    font-size: 28px;\
		    font-weight: bold;\
		    cursor: pointer;\
		}\
		div#product-box .brand-image {\
			float: left;\
		}\
		.prod-extended-description-icon {\
			display: none;\
		}\
		#prod-description-window {\
			max-height: none !important;\
			height: 100% !important;\
			overflow: visible;\
		}\
		#AWA-exDes {\
			color: #444;\
			border: 0;\
			background: none;\
			padding: 0;\
			margin: 15px 0 0 0;\
			display: inline;\
		}\
		#prod-description ul li, #full-description ul li, .admin-info ul li {\
			background: none;\
			padding-left: 1em;\
		}\
		.AWA-prod-description-ul ul {\
			font-size: 16px;\
			margin-left: 0;\
			padding-left: 0;\
		}\
		.AWA-prod-description-ul li {\
			margin-left: -14px;\
			display: flex;\
		}\
		.AWA-prod-description-ul li:before {\
			content: "\u2714";\
			color: #3BBA00;\
			font-size: 18px;\
			padding-right: 5px;\
			font-weight: 800;\
		}\
		.AWA-checkmark {\
			color: #3BBA00;\
			font-size: 18px;\
			font-weight: 800;\
		}\
		.prod-extended-description p {\
			display: inline;\
		}\
		@media screen and (max-width: 670px) {\
			#product-box h1 {\
				width: auto;\
			}\
			#product-box .prod-img .img-wrap img {\
				float: left;\
			}\
			#product-box #img-carousel {\
				float: left;\
			}\
			#product-box {\
				display: block;\
			}\
		}\
	';


	// Init function
	// Called to run the actual experiment, DOM manipulation, event listeners, etc
	exp.init = function() {
		// Add styles
		$('head').append('<style>' + exp.css + '</style>');

		// Add Bestseller banner if applicable
		if ($('#product-box .product-icons-holder span:contains("Bestselling")').length) {
			$('#product-box .img-wrap img').before(exp.vars.bestSellerBanner);
		};

		// Move product code above image after product title
		var $productTitle = $('#product-box .item').children('h1');
		$productTitle.after($('#prod-description-top-left'));

		// Remove add favourite button for guest customers
		if ($('body').text().indexOf('Login') > -1) {
			$('.fav-btns').css('display', 'none');
		};

		// Low Price Promise pop-up when product code is selected
		$('body').append(exp.vars.lowPricePopup);
		var $lowPriceModal = $('#AWA-lowPricePopup');
		var $closeButton = $('.AWA-close');

		function getSelectedText() {
        	var text = "";
        	if (typeof window.getSelection != "undefined") {
            	text = window.getSelection().toString();
        	}
        	else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            	text = document.selection.createRange().text;
        	}
        	return text;
    	};
    
    	function lowPricePopup() {
        	var selectedText = getSelectedText();
        	var productCode = $('.prod-code').children('span').text();
        	if (selectedText.indexOf(productCode) > -1) {
             	$lowPriceModal.css('display', 'block');
        	};
    	};

    	document.onmouseup = lowPricePopup;

    	$closeButton.on('click', function() {
		    $lowPriceModal.css('display', 'none');
		});

		// Make extended description less obvious
		$('.prod-extended-description').attr('id', 'AWA-exDes');
		var $productDesUl = $('#prod-description').children('ul');
		$productDesUl.after($('#AWA-exDes'));
		// Add checkmark
		$('#AWA-exDes').before(exp.vars.exDesCheck);

		// Give product description list class for styling
		$productDesUl.addClass('AWA-prod-description-ul');

		// Move Product Variant Collections beneath Product Description list
		$('#desc-links').before($('#prod-variant-collections'));

		// Change chat now message
		var chatTitle = $('#livechat-compact-view').contents().find('#open-label');
		if (chatTitle.text() === 'Leave a message') {
			chatTitle.text('Chat now');
		};
	};

	exp.init();
	// Return the experiment object so we can access it later if required
	return exp;

	// Close the IIFE, passing in jQuery and any other global variables as required
	// if jQuery is not already used on the site use optimizely.$ instead
})(window.jQuery);