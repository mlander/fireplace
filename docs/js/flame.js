/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 12/6/12
 * Time: 11:57 AM
 * flame class for controlling individual flames
 */
(function ($) {
  //@todo: create means for passing properties as an argument array on creation
  window.Flame = function () {
    var flame = this;
    this.properties = [], this.properties.location = [];

    //defaults
    this.properties.particleCount = 100;
    this.properties.location.x = 300;
    this.properties.location.y = 300;
    this.properties.radiusMin = 5;
    this.properties.radiusMax = 35;
    this.properties.lifeMin = 50;
    this.properties.lifeMax = 70;
    this.properties.lifeRadiusAdjust = true;
    this.properties.xOffsetMin = -1.5;
    this.properties.xOffsetRange = 2;
    this.properties.yOffsetMin = -7;
    this.properties.yOffsetRange = 4;
    this.properties.rColorMin = 155;
    this.properties.rColorMax = 255;
    this.properties.gColorMin = 120;
    this.properties.gColorMax = 200;
    this.properties.bColorMin = 10;
    this.properties.bColorMax = 50;




    this.particles  = [];
    this.active = false;

    this.particle = function() {

      this.speed = {x:flame.properties.xOffsetMin + Math.random() * flame.properties.xOffsetRange, y:flame.properties.yOffsetMin + Math.random() * flame.properties.yOffsetRange};
      this.location = {x:flame.properties.location.x, y: flame.properties.location.y};
      this.radius = flame.properties.radiusMin + Math.random() * (flame.properties.radiusMax - flame.properties.radiusMin);
      var lifeMin = flame.properties.lifeMin;
      var lifeMax = flame.properties.lifeMax;
      if(flame.properties.lifeRadiusAdjust) {
        lifeMin = flame.properties.lifeMin - (this.radius * 1.5);
        lifeMax = flame.properties.lifeMax - (this.radius * 1.5);
      }
      this.life = lifeMin + Math.random() * (lifeMax - lifeMin);
      this.remaining_life = this.life;
      this.r = Math.round(flame.properties.rColorMin + Math.random() * (flame.properties.rColorMax - flame.properties.rColorMin));
      this.g = Math.round(flame.properties.gColorMin + Math.random() * (flame.properties.gColorMax - flame.properties.gColorMin));
      this.b = Math.round(flame.properties.bColorMin + Math.random() * (flame.properties.bColorMax - flame.properties.bColorMin));

    }


    this.start = function() {
      for (var i = 0; i < flame.properties.particleCount; i++) {
        flame.particles.push(new flame.particle());
      }
      this.active = true;
    }

    this.stop = function() {
      flame.particles = [];
      this.active = false;
    }

  }
})(jQuery);