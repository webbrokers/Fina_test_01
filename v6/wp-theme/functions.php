<?php
require_once get_template_directory() . '/inc/enqueue.php';
require_once get_template_directory() . '/inc/cpt-mfo.php';
require_once get_template_directory() . '/inc/acf-fields.php';

add_theme_support('post-thumbnails');
add_theme_support('title-tag');
register_nav_menus(['primary' => 'Основное меню']);
