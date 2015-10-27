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

	 $variables['no_panels'] = !(isset($variables['node']->type) && $variables['node']->type == 'product');

}