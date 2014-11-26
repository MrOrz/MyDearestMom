var skrollr = require('../../vendor/bower_components/skrollr/dist/skrollr.min');
require('../styl/main.styl'); // Just trigger CSS compilation & text extraction...

skrollr.init();

window.addEventListener('load', function(){
  document.body.classList.add('is-loaded');
  setTimeout(function(){
    document.querySelector('.loading').remove();
  }, 500);
});