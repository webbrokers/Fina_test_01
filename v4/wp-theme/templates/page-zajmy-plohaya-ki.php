<?php
/* Template Name: Займы с плохой КИ */
get_header(); ?>
<main class="container">
  <h1><?php the_title(); ?></h1>
  <section class="mfo-list">
    <?php $q=new WP_Query(['post_type'=>'mfo','posts_per_page'=>20]); while($q->have_posts()):$q->the_post(); ?>
      <article class="mfo-card"><h2><?php the_title(); ?></h2><div><?php the_excerpt(); ?></div></article>
    <?php endwhile; wp_reset_postdata(); ?>
  </section>
</main>
<?php get_footer();
