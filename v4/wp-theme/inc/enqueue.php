<?php
function finbank_enqueue_assets(){
  $critical=get_template_directory().'/assets/css/critical.css';
  if(file_exists($critical)){wp_register_style('finbank-critical',false);wp_enqueue_style('finbank-critical');wp_add_inline_style('finbank-critical',file_get_contents($critical));}
  wp_enqueue_style('finbank-main',get_template_directory_uri().'/assets/css/main.css',[],'4.0.0');
  if(is_page_template('templates/page-zajmy-plohaya-ki.php')){
    wp_enqueue_script('finbank-main',get_template_directory_uri().'/assets/js/main.js',[],'4.0.0',true);
    wp_enqueue_script('finbank-calculator',get_template_directory_uri().'/assets/js/components/calculator.js',[],'4.0.0',true);
  }
}
add_action('wp_enqueue_scripts','finbank_enqueue_assets');
