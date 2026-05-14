<?php
/* Template Name: Займы с плохой КИ */
get_header();
?>
<main class="page page-template-zajmy-plohaya-ki">
  <section class="container">
    <h1><?php the_title(); ?></h1>
    <section class="mfo-list" aria-label="Список МФО">
      <?php
      $q = new WP_Query([
        'post_type'      => 'mfo',
        'posts_per_page' => 20,
      ]);
      while ($q->have_posts()) : $q->the_post();
      ?>
        <article class="mfo-card" itemscope itemtype="https://schema.org/Organization">
          <h2 itemprop="name"><?php the_title(); ?></h2>
          <div itemprop="description"><?php the_excerpt(); ?></div>
          <a class="btn btn-primary" href="<?php the_permalink(); ?>" itemprop="url">Получить займ</a>
        </article>
      <?php endwhile; wp_reset_postdata(); ?>
    </section>
  </section>
</main>
<?php
get_footer();
