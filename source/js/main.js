/**
 * @file
 * A JavaScript file for the theme.
 *
 * This JavaScript file is loaded on all Pages.
 */

(function($) {
  Drupal.behaviors.atk_main = {
			attach: function (context, settings) {
				// bootstrap tooltips and popovers must be activated
				$('[data-toggle="tooltip"]').tooltip();
				$('[data-toggle="popover"]').popover();
			
			$(window).scroll(function() {
				if ($('.navbar').length && $('.navbar').offset().top > 50) {
				            $('.navbar').addClass('top-nav-collapse');
        } else {
            $('.navbar').removeClass('top-nav-collapse');
        }
			});
    }
  };
})(jQuery);
