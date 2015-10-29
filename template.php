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
	 $variables['no_panels'] = !((isset($variables['node']->type) && $variables['node']->type == 'product') || (module_exists('page_manager') && page_manager_get_current_page()));
	 $variables['always_show_page_title'] = ($variables['node']->type == 'product');
	 // menu depth override kalatheme
	 // Get the entire main menu tree.
	  $main_menu_tree = array();
	  $main_menu_tree = menu_tree_all_data('main-menu', NULL, 1);
	  // Add the rendered output to the $main_menu_expanded variable.
	  $variables['main_menu_expanded'] = menu_tree_output($main_menu_tree);
}