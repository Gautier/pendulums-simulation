function PendulumsSystem () {
  var canvas = document.getElementById("c"),
      width = canvas.width = window.innerWidth - 1,
      height = canvas.height = .9 * window.innerHeight,
      ctx = canvas.getContext("2d"),
      theta0 = rad(25),
      rad_90 = rad(90);

  function period (L) {
    return 2 * Math.PI * Math.sqrt(L/9.807)
  }

  function unperiod (T) {
    return (T / (2 * Math.PI)) * (T / (2 * Math.PI)) * 9.807
  }

  function targetOscillation (count) {
    return 60 / count
  }

  function rad(deg) {
    return deg * (Math.PI/180);
  }

  function oscillate(t, T) {
    return theta0 * Math.cos((2 * Math.PI * t) / T)
  }

  function draw (Ls, t, x, y, h) {
    // only for in the program, needed?
    for (var i = 0; i < Ls.length; i++) {
      var L = Ls[i]

      ctx.save()

      ctx.translate(x, y)
      ctx.rotate(rad_90)
      ctx.rotate(oscillate(t, L))

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(h * L, 0)
      ctx.stroke()

      ctx.restore()
    }
  }

  this.start = function (speed) {
    var oneThirdWidth = width / 3,
        twoThirdWidth = (width * 2) / 3,
        twoThirdHeight = (height * 2) / 3,
        t0 = new Date().getTime() / speed,
        lengths = _.map(_.range(51, 66), targetOscillation);
        lengths2 = _.map(_.range(51, 66, .5), targetOscillation);

    ctx.strokeStyle = 'rgb(255, 255, 255)'
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.lineWidth = 1;

    this.timer = setInterval (function () {
      ctx.clearRect(0, 0, width, height)

      var t = (new Date().getTime() / speed) - t0;
      ctx.fillText("t = " + Math.ceil(t) + "s", 10, 50);

      draw(lengths, t, oneThirdWidth, 50, twoThirdHeight)
      draw(lengths2, t, twoThirdWidth, 50, twoThirdHeight)
    }, 30);
  }

  this.stop = function () {
    clearInterval(this.timer)
  }
}
