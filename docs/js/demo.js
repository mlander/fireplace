/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 12/6/12
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */

window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //Make the canvas occupy the full page
  var W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var particles = [];
  var mouse = {};

  //Lets create some particles now
  var particle_count = 100;
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle(300 + Math.random() * 10, 300 + Math.random() * 10, 'small'));
  }

  function particle(x, y, type) {
    //speed, life, location, life, colors
    //speed.x range = -2.5 to 2.5
    //speed.y range = -15 to -5 to make it move upwards
    //lets change the Y speed to make it look like a flame
    var lifeMin = 50;
    if(type == 'large') {
      this.speed = {x:-2.5 + Math.random() * 5, y:-15 + Math.random() * 10};
      this.location = {x:x, y:y};
      this.radius = 10 + Math.random() * 20;
      this.life = 20 + Math.random() * 10;
      this.remaining_life = this.life;
      this.r = Math.round(155 + Math.random() * 100);
      this.g = Math.round(100 + Math.random() * 40);
      this.b = Math.round(10 + Math.random() * 40);
    } else {
//      this.speed = {x:-3.5 + Math.random() * 6, y:-7 + Math.random() * 4};
      this.speed = {x:-1.5 + Math.random() * 2, y:-7 + Math.random() * 4};
      this.location = {x:x, y:y};
      this.radius = 5 + Math.random() * 30;
      lifeMin = lifeMin - (this.radius * 1.5);

      this.life = lifeMin + Math.random() * 20;
      this.remaining_life = this.life;
      this.r = Math.round(155 + Math.random() * 100);
      this.g = Math.round(120 + Math.random() * 80);
      this.b = Math.round(10 + Math.random() * 40);
    }
// original flame
//    this.speed = {x:-1.5 + Math.random() * 2, y:-7 + Math.random() * 4};
//    this.location = {x:x, y:y};
//    this.radius = 10 + Math.random() * 20;
//    this.life = 50 + Math.random() * 10;
//    this.remaining_life = this.life;
//    this.r = Math.round(155 + Math.random() * 100);
//    this.g = Math.round(140 + Math.random() * 60);
//    this.b = Math.round(10 + Math.random() * 40);


    //colors
//    this.r = Math.round(Math.random() * 255);
//    this.g = Math.round(Math.random() * 255);
//    this.b = Math.round(Math.random() * 255);


  }



  function addFlame(x, y, duration, type) {
    setInterval(function () { draw(x, y, type); }, 32);
  }

  function draw(x, y, type) {
    //Painting the canvas black
    //Time for lighting magic
    //particles are painted with "lighter"
    //In the next frame the background is painted normally without blending to the
    //previous frame
//    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      //changing opacity according to the life.
      //opacity goes to 0 at the end of life of a particle
      p.opacity = Math.round(p.remaining_life / p.life * 100) / 100
      //a gradient instead of white fill
      var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
      gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
      gradient.addColorStop(0.3, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
      gradient.addColorStop(0.6, "rgba(" + (p.r + 20) + ", " + (p.g - 40) + ", " + p.b + ", " + (p.opacity/2) + ")");
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
        //a brand new particle replacing the dead one
        particles[i] = new particle(x + Math.random() * 10, y + Math.random() * 10, type);
      }
    }
  }


  addFlame(300, 300, 10, 'small');
//  addFlame(300, 300, 10, 'large');
}