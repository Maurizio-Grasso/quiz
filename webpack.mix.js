let mix = require('laravel-mix');
mix.sass('sass/style.scss', 'css/style.css');

mix.options({
    processCssUrls: false
  });