/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 12/6/12
 * Time: 11:57 AM
 * Build a fire and light it!
 */

(function ($) {
  $(document).ready(function () {

    // Set sizes
    var wrapperH = $('#wrapper').height();
    var wrapperW = $('#wrapper').width();
    var wrapperRatio = wrapperH / wrapperW;
    var minWrapperH = 650;
    var minWrapperW = 954;


//    Adjust sizes on resize;
    $(window).on('load resize', function () {
      var windowH = $(this).height();
      var windowW = $(this).width();
      var windowRatio = windowH / windowW;
      if (wrapperRatio > windowRatio) {
        windowW = windowH / wrapperRatio;
      } else {
        windowH = windowW * wrapperRatio;
      }
//      if (minWrapperH > windowH || minWrapperW > windowW) {
//        windowH = minWrapperH;
//        windowW = minWrapperW;
//      }

      $('.wrapper, canvas').height(windowH);
      $('.wrapper, canvas').width(windowW);

    });


    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");
    canvas.width = canvas2.width = 1200;
    canvas.height = canvas2.height = 818;

//          $(window).on('load', function () {

    // Manually create fires(each fire is a different canvas layer currently)
    //@todo: build multiple layer system into fire class, so only one fire must be created, will need to figure out depth/wrappers
    //@todo: fires could automatically create their own canvas, we just assign them to a div instead.
    var go = new Fire(ctx);
    go.start();

    var go2 = new Fire(ctx2);  // Create second fire for back location
    go2.start();

    // var flicker = new Flicker(ctx);
    // flicker.start();

    //@todo: set initial size based on initial wrapper size/location.  Currently it's hardcoded.  Resizing works, but initial placement is off.


    // Manually create flames

    var flame3 = new Flame();
    flame3.properties.location.x = 850;
    flame3.properties.location.y = 480;
    flame3.properties.particleCount = 30;
    go.addFlame(flame3);
    flame3.start();


    var flame4 = new Flame();
    flame4.properties.location.x = 580;
    flame4.properties.location.y = 470;
    flame4.properties.radiusMin = 25;
    flame4.properties.radiusMax = 45;

    flame4.properties.lifeRadiusAdjust = false;
    go.addFlame(flame4);
    flame4.start();

    var flame4b = new Flame();
    flame4b.properties.location.x = 620;
    flame4b.properties.location.y = 470;
    flame4b.properties.particleCount = 30;
    flame4b.properties.gColorMin = 100;
    flame4b.properties.gColorMax = 150;
    go.addFlame(flame4b);
    flame4b.start();


    var flame5 = new Flame();
    flame5.properties.location.x = 630;
    flame5.properties.location.y = 420;
    flame5.properties.radiusMin = 25;
    flame5.properties.radiusMax = 75;
    flame5.properties.gColorMin = 70;
    flame5.properties.gColorMax = 150;

    flame5.properties.lifeRadiusAdjust = false;
    go2.addFlame(flame5);
    flame5.start();

    var flame6 = new Flame();
    flame6.properties.location.x = 580;
    flame6.properties.location.y = 390;
    flame6.properties.radiusMin = 25;
    flame6.properties.radiusMax = 75;
    flame6.properties.gColorMin = 70;
    flame6.properties.gColorMax = 180;

    flame6.properties.lifeRadiusAdjust = false;
    go2.addFlame(flame6);
    flame6.start();
//          });
  });


})(jQuery);