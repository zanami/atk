<?php 
/** 
 * @file 
 * Primary pre/preprocess functions and alterations.
 */ 


/**
 * Override or insert variables into the page template.
 *
 * Implements template_process_page().
 */
function atk_process_page(&$variables) {

	 // If panels arent being used at all. From kalatheme
   $variables['no_panels'] = !(module_exists('page_manager') && page_manager_get_current_page());
	 $variables['no_panels'] = !($variables['no_panels'] && isset($variables['node']->type) && $variables['node']->type == 'product');

}