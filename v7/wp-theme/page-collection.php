<?php
/**
 * Template Name: Collection v7
 */
get_header();
?>

<main id="primary" class="site-main">
  <div class="container">
    <h1><?php the_title(); ?></h1>
  </div>

  <?php get_template_part('template-parts/calculator'); ?>

  <div class="container">
    <?php
    if (have_posts()) {
      while (have_posts()) {
        the_post();
        the_content();
      }
    }
    ?>
  </div>
</main>

<?php
get_footer();
