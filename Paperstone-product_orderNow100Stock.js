// CGIT Optimizely Boilerplate - version 0.1.4
//
// Wrap the experiment code in an IIFE, this creates a local scope and allows us to
// pass in jQuery to use as $. Other globals could be passed in if required.
var exp = (function($) {

	// Add exception for pages that meet RegEx but are not PDPs
	if (!$('body').hasClass('page-type-ProductDetail')) {
		return;
	}

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
	exp.log('AWA - Paperstone- PDP - v1');


	// Variables
	// Object containing variables, generally these would be strings or jQuery objects
	exp.vars = {
			bestSellerBanner : '<div id="AWA-bestSellerBanner"><span>BESTSELLER</span></div>',
			lowPricePopup : "<div id='AWA-lowPricePopup'><div id='AWA-modalContent'><span class='AWA-close'>&times;</span><br><h1><span class='LPPcheck'>&#10004;</span> Low price promise</h1><h1>0345 567 4000</h1><p>We're constantly reviewing our prices against competitors, but if you find a lower price <a href='http://www.paperstone.co.uk/help_91_The-Paperstone-Price-Promise.aspx' target='_blank'>we'll happily price match.</a></div></div>",
			exDesCheck : '<br><span class="AWA-checkmark">&#10004;</span>',
			productBullets: 0,
			stockQty: 0,
			alreadySelected: false
		};

	// Styles
	// String containing the CSS for the experiment
	exp.css = '\
		#add-to-basket-box div.stock-message {\
			display: none;\
		}\
		.stock-qty {\
			display: none;\
			text-align: center;\
		}\
		#product-box {\
			border: none;\
		}\
		#add-to-basket-box {\
			border: none;\
			height: auto;\
		}\
		div.has-multi-images.has-comp-prices #add-to-basket-box {\
			height: auto;\
		}\
		div.has-comp-prices #add-to-basket-box {\
			height: auto;\
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
			top: 200px;\
			left: 50%;\
			margin-left: -150px;\
			z-index: 1;\
			width: 300px;\
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
		#AWA-modalContent a {\
			color: white;\
			text-decoration: underline;\
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
		.AWA-exDes {\
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
		#add-to-basket-box .rrp-savings-container {\
			font-size: 100%;\
		}\
		#sliding-module.slide {\
			position: static;\
		}\
		#sliding-holder {\
			position: static !important;\
		}\
		#livechat-eye-catcher {\
			display: none !important;\
		}\
		#mp-basket-checkout-button-wide {\
			background: #ff69b4;\
		}\
		.page-type-ProductDetail .breadcrumb-box, .page-type-PrinterProductDetail .breadcrumb-box {\
			padding-left: 10px;\
		}\
		div#expected-delivery-box {\
			height: 30px !important;\
			margin-top: 0px;\
		}\
		.rrp-container {\
			margin-right: 5px;\
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
		// Mark experiment
		$('head').addClass('AWA-PDP-v1');

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
		if ($('#mp-header-login-links').text().indexOf('Login') > -1) {
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
    
        var productCode = $('.prod-code').children('span').text();

    	function lowPricePopup() {
    		var selectedText = getSelectedText();
        	if (selectedText.indexOf(productCode) > -1 && exp.vars.alreadySelected === false) {
             	$lowPriceModal.css('display', 'block');
        	}
    	}

    	document.onmouseup = lowPricePopup;

    	function checkIfSelected() {
    		var selectedText = getSelectedText();
    		if (selectedText.indexOf(productCode) > -1) {
    			exp.vars.alreadySelected = true;
    		}
    		else {
    			exp.vars.alreadySelected = false;
    		}
    	}

    	document.onmousedown = checkIfSelected;

    	$closeButton.on('click', function() {
		    $lowPriceModal.css('display', 'none');
		});

		closeModal = function() {
			if (event.target !== $lowPriceModal) {
				$lowPriceModal.css('display', 'none');
			}
		}

		window.onmousedown = closeModal;

		// Make extended description less obvious
		$('.prod-extended-description').addClass('AWA-exDes');
		var $productDesUl = $('#prod-description').children('ul');
		$productDesUl.after($('#prod-description .AWA-exDes'));
		// Add checkmark
		$('#prod-description .AWA-exDes').before(exp.vars.exDesCheck);

		// Give product description list class for styling
		$productDesUl.addClass('AWA-prod-description-ul');

		// Move Product Variant Collections beneath Product Description list
		$('#desc-links').before($('#prod-variant-collections'));

		// Change chat now message - DELETE PER AWA COMMENTS 4/12/17
		// function poll() {
		// 	var $chatIframe = $('#livechat-compact-view');
		// 	if ($chatIframe.contents().find('#open-label').length) {
		// 		setTimeout(function() {
		// 			if ($chatIframe.contents().find('#open-label').text() === 'Leave a message') {
		// 				$chatIframe.contents().find('#open-label').text('Chat now');
		// 			}
		// 		}, 1000); 
		// 	} else {
		// 		setTimeout(poll, 50);
		// 	}
		// }

		// poll();

		// Limit product description to 7 bullets
		exp.vars.productBullets = $('.AWA-prod-description-ul').children('li');
		if (exp.vars.productBullets.length > 7) {
			$('.AWA-prod-description-ul').html(exp.vars.productBullets.slice(0, 7));
		};

		// Limit stock qty to 100 or less
		var $stockQty = $('.stock-qty').first();
		var $stockQtyText = $stockQty.text();
		$('#expected-delivery-box').before($stockQty);
		exp.vars.stockQty = $stockQtyText.replace('(','');
		exp.vars.stockQty = parseInt(exp.vars.stockQty);
		if (exp.vars.stockQty < 100) {
			$stockQty.css('display', 'block');
		};
		$stockQty.text('(Only ' + $stockQtyText.replace('(',''));

		// Move RRP to same line as savings
		var $productRRPContainer = $('#add-to-basket-box .rrp-container').first();
		var $rrpSavings = $('.rrp-savings-container');
		$rrpSavings.before($productRRPContainer);
		// Re-cache RRP Container location
		$productRRPContainer = $('#add-to-basket-box .rrp-container').first();
		// Resize RRP font if necessary
		var maxWidth = parseInt($('#price-line').css('width'), 10);
		var rrpSavingsWidth = parseInt($rrpSavings.css('width'), 10);
		var productRRPContainerWidth = parseInt($productRRPContainer.css('width'), 10);
		var totalFontWidth = rrpSavingsWidth + productRRPContainerWidth;
		var RRPFontSize = parseInt($productRRPContainer.css('font-size'), 10);
		var RRPSavingsFontSize = parseInt($rrpSavings.css('font-size'), 10);
		while (totalFontWidth > maxWidth) {
			if ($rrpSavings.css('font-size') === '8px') {
				$('#add-to-basket-box .price-box').css('width', 'auto');
				break;
			}
			$rrpSavings.css('font-size', RRPSavingsFontSize - 1 + 'px');
			$productRRPContainer.css('font-size', RRPFontSize - 1 + 'px');
			rrpSavingsWidth = parseInt($rrpSavings.css('width'), 10);
			productRRPContainerWidth = parseInt($productRRPContainer.css('width'), 10);
			totalFontWidth = rrpSavingsWidth + productRRPContainerWidth;
		}
	};

	exp.init();
	// Return the experiment object so we can access it later if required
	return exp;

	// Close the IIFE, passing in jQuery and any other global variables as required
	// if jQuery is not already used on the site use optimizely.$ instead
})(window.jQuery);