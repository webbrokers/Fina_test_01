<?php
/**
 * FinaBank Theme v7 Functions
 */

function finbank_v7_enqueue_styles() {
    $version = filemtime(get_template_directory() . '/assets/css/main.css');

    wp_enqueue_style('finbank-style', get_template_directory_uri() . '/assets/css/style.css', [], $version);
    wp_enqueue_style('finbank-main', get_template_directory_uri() . '/assets/css/main.css', ['finbank-style'], $version);
    wp_enqueue_style('finbank-codes', get_template_directory_uri() . '/assets/css/codes.css', ['finbank-main'], $version);
    wp_enqueue_style('finbank-danil', get_template_directory_uri() . '/assets/css/danil.css', ['finbank-main'], $version);
}
add_action('wp_enqueue_scripts', 'finbank_v7_enqueue_styles');

function finbank_v7_enqueue_scripts() {
    $version = filemtime(get_template_directory() . '/assets/js/main.js');

    wp_enqueue_script('finbank-tabs', get_template_directory_uri() . '/assets/js/components/tabs.js', [], $version, true);
    wp_enqueue_script('finbank-calculator', get_template_directory_uri() . '/assets/js/components/calculator.js', [], $version, true);
    wp_enqueue_script('finbank-loadmore', get_template_directory_uri() . '/assets/js/components/loadMore.js', [], $version, true);
    wp_enqueue_script('finbank-filter', get_template_directory_uri() . '/assets/js/components/filter.js', [], $version, true);
    wp_enqueue_script('finbank-tags-scroll', get_template_directory_uri() . '/assets/js/components/tags-scroll.js', [], $version, true);
    wp_enqueue_script('finbank-layout-toggle', get_template_directory_uri() . '/assets/js/components/layout-toggle.js', [], $version, true);
    wp_enqueue_script('finbank-main', get_template_directory_uri() . '/assets/js/main.js', [], $version, true);
}
add_action('wp_enqueue_scripts', 'finbank_v7_enqueue_scripts');

function finbank_v7_svg_sprite() {
    $sprite_path = get_template_directory() . '/assets/img/icons.svg';
    if (file_exists($sprite_path)) {
        include $sprite_path;
    }
}
add_action('wp_body_open', 'finbank_v7_svg_sprite');

function finbank_v7_theme_support() {
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('html5', ['search-form', 'gallery', 'caption']);
}
add_action('after_setup_theme', 'finbank_v7_theme_support');
