/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 12/6/12
 * Time: 11:57 AM
 * Controller for flames
 */

(function ($) {
  window.Fire = function (ctx) {
    var fire = this;
    this.flames = [];
    var W = window.innerWidth, H = window.innerHeight;



    this.addFlame = function (flame) {
      fire.flames.push(flame);
    }
    this.draw = function () {
      //particles are painted with "lighter"
      //In the next frame the background is painted normally without blending to the
      //previous frame
      ctx.globalCompositeOperation = "source-in";
//          ctx.globalCompositeOperation = "source-atop";
//          ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, W, H);







      ctx.globalCompositeOperation = "lighter";



      ctx.beginPath();

      //generate flicker
      var gradient = ctx.createRadialGradient(600, 400, 0, 600, 300, 600);
      gradient.addColorStop(0, "rgba(255,200,50, " + ((1 + Math.random() * 2.5) / 100) + ")");
      gradient.addColorStop(1, "rgba(255,200,150, 0)");
      ctx.fillStyle = gradient;
      ctx.fillStyle = gradient;
      ctx.arc(600, 400, 600, Math.PI * 2, false);
      ctx.fill();


      for (var i = 0; i < fire.flames.length; i++) {
        var flame = fire.flames[i];

        if (flame.active) {
          for (var ii = 0; ii < flame.particles.length; ii++) {
            var p = flame.particles[ii];
            ctx.beginPath();
            //changing opacity according to the life.
            //opacity goes to 0 at the end of life of a particle
            p.opacity = Math.round(p.remaining_life / p.life * 100) / 100
            //a gradient instead of white fill
            var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
            gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
            gradient.addColorStop(0.3, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
            gradient.addColorStop(0.6, "rgba(" + (p.r + 20) + ", " + (p.g - 40) + ", " + p.b + ", " + (p.opacity / 2) + ")");
            gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
            ctx.fillStyle = gradient;
            ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
            ctx.fill();

            //lets move the particles
            p.remaining_life--;
            p.radius--;
            p.location.x += p.speed.x;
            p.location.y += p.speed.y;




            //regenerate particles
            if (p.remaining_life < 0 || p.radius < 0) {
              flame.particles[ii] = new flame.particle();
            }

          }
        }
      }
    }

    this.start = function () {
      setInterval(function () {
        fire.draw();
      }, 32);
    }
  }
})(jQuery);