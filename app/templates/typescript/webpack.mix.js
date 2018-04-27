let mix = require('laravel-mix');

mix.options({
        extractVueStyles: true
    })
    .ts('app.ts', 'js')
    .sass('app.scss', 'css');