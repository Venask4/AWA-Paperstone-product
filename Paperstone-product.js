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
			bestSellerBanner : '<div id="bestSellerBanner"><span>BESTSELLER</span></div>'
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
		#bestSellerBanner {\
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
		#bestSellerBanner span {\
			line-height: 25px;\
			vertical-align: middle;\
		}\
		#add-to-basket-box .add-to-basket-button {\
			background: #ff69b4;\
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
	';


	// Init function
	// Called to run the actual experiment, DOM manipulation, event listeners, etc
	exp.init = function() {
		// Add styles
		$('head').append('<style>' + exp.css + '</style>');

		// Add Bestseller banner if applicable
		if ($('#product-box .product-icons-holder span:contains("Bestselling")').length > 0) {
			$('#product-box .img-wrap img').before(exp.vars.bestSellerBanner);
		};

		// Move product code above image after product title
		var $productTitle = $('#product-box .item').children('h1');
		$productTitle.after($('#prod-description-top-left'));
	};

	exp.init();
	// Return the experiment object so we can access it later if required
	return exp;

	// Close the IIFE, passing in jQuery and any other global variables as required
	// if jQuery is not already used on the site use optimizely.$ instead
})(window.jQuery);