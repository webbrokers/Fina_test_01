<?php
add_action('init', function(){
  register_post_type('mfo',['label'=>'МФО','public'=>true,'supports'=>['title','thumbnail','editor','custom-fields']]);
  register_taxonomy('mfo-category','mfo',['label'=>'Категории МФО','public'=>true,'hierarchical'=>true]);
});
