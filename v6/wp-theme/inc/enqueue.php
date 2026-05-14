<?php
function finbank_enqueue_assets(){
  $version = '5.0.0';
  $critical = get_template_directory() . '/assets/css/critical.css';

  if (file_exists($critical)) {
    wp_register_style('finbank-critical', false, [], $version);
    wp_enqueue_style('finbank-critical');
    wp_add_inline_style('finbank-critical', file_get_contents($critical));
  }

  wp_enqueue_style('finbank-main', get_template_directory_uri() . '/assets/css/main.css', [], $version);

  if (is_page_template('templates/page-zajmy-plohaya-ki.php')) {
    wp_script_add_data('finbank-main-js', 'defer', true);
    wp_enqueue_script('finbank-main-js', get_template_directory_uri() . '/assets/js/main.js', [], $version, true);
    wp_enqueue_script('finbank-tabs-js', get_template_directory_uri() . '/assets/js/components/tabs.js', ['finbank-main-js'], $version, true);
    wp_enqueue_script('finbank-accordion-js', get_template_directory_uri() . '/assets/js/components/accordion.js', ['finbank-main-js'], $version, true);
    wp_enqueue_script('finbank-filters-js', get_template_directory_uri() . '/assets/js/components/filters.js', ['finbank-main-js'], $version, true);
    wp_enqueue_script('finbank-loadmore-js', get_template_directory_uri() . '/assets/js/components/loadMore.js', ['finbank-main-js'], $version, true);
    wp_enqueue_script('finbank-theme-js', get_template_directory_uri() . '/assets/js/components/themeToggle.js', ['finbank-main-js'], $version, true);
    wp_enqueue_script('finbank-calculator-js', get_template_directory_uri() . '/assets/js/components/calculator.js', [], $version, true);
  }
}
add_action('wp_enqueue_scripts', 'finbank_enqueue_assets');
