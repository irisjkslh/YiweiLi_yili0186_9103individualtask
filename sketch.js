let noiseScale = 0.02;
let raindrops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(99);
  noLoop();
  background(222, 184, 93);
  draw();
  frameRate(30);
  loop();

  // Create initial set of raindrops
  for (let i = 0; i < 100; i++) {
    raindrops.push(new Raindrop());
  }
}

function draw() {
  background(222, 184, 93);
  drawSky();
  drawSkyReflection();
  drawBuilding();
  drawWave();
  drawRain();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawBuilding() {
  fill(0);
  stroke(0);

  linearGradient(
    182, 450, // Start point
    182, 19, // End point
    color(92, 54, 53), // Start color
    color(32, 58, 75) // End color
  );

  beginShape();
  vertex(219, 450);
  vertex(219, 614);
  vertex(194, 671);
  vertex(182, 755);
  vertex(172, 671);
  vertex(153, 614);
  vertex(153, 450);
  endShape();

  beginShape();
  vertex(width, 455);
  vertex(width - 800, 455);
  vertex(width - 563, 435);
  vertex(width - 524, 428);
  vertex(width - 480, 440);
  vertex(width - 332, 440);
  vertex(width - 300, 400);
  vertex(width - 290, 357);
  vertex(width - 270, 323);
  vertex(width - 250, 357);
  vertex(width - 224, 400);
  vertex(width - 220, 344);
  vertex(width - 204, 333);
  vertex(width - 200, 300);
  vertex(width - 187, 327);
  vertex(width - 170, 400);
  vertex(width - 155, 366);
  vertex(width, 418);
  endShape();

  filter(BLUR, 10);

  beginShape();
  noStroke();
  vertex(567, 450);
  vertex(548, 416);
  vertex(520, 400);
  vertex(433, 398);
  vertex(425, 374);
  vertex(435, 374);
  vertex(395, 345);
  vertex(386, 317);
  vertex(383, 345);
  vertex(365, 347);
  vertex(332, 327);
  vertex(290, 325);
  vertex(290, 300);
  vertex(262, 268);
  vertex(249, 234);
  vertex(241, 268);
  vertex(219, 300);
  vertex(219, 140);
  vertex(194, 103);
  vertex(182, 19);
  vertex(172, 103);
  vertex(153, 140);
  vertex(153, 335);
  vertex(132, 348);
  vertex(65, 345);
  vertex(35, 370);
  vertex(28, 416);
  vertex(0, 416);
  vertex(0, 450);
  endShape();
}

function linearGradient(sX, sY, eX, eY, colorS, colorE) {
  let gradient = drawingContext.createLinearGradient(sX, sY, eX, eY);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}

function drawSky() {
  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c;
    if (inter < 0.5) {
      c = lerpColor(color(135, 206, 250), color(255, 255, 0), inter * 2);
    } else {
      c = lerpColor(color(255, 255, 0), color(255, 165, 0), (inter - 0.5) * 2);
    }
    stroke(c);
    line(0, y, width, y);
  }
}

function drawSkyReflection() {
  for (let y = height / 2; y < height; y++) {
    let inter = map(y, height / 2, height, 0, 1);
    let c;
    if (inter < 0.5) {
      c = lerpColor(color(255, 165, 0), color(255, 255, 0), inter * 2);
    } else {
      c = lerpColor(color(255, 255, 0), color(135, 206, 250), (inter - 0.5) * 2);
    }
    stroke(c);
    line(0, y, width, y);
  }
}

// Function to draw animated waves
function drawWave() {
  let waveCount = 20; // Number of wave layers
  let startY = 450; // Starting Y position of the waves
  let waveHeight = 20; // Height of each wave layer

  // Loop through each wave layer
  for (let i = 0; i < waveCount; i++) {
    let y = startY + i * waveHeight; // Calculate Y position for the current layer
    let randomAmplitude = random(5, 20); // Random amplitude for wave motion
    let randomFrequency = random(0.01, 0.05); // Random frequency for wave motion

    // Calculate colors for the current wave layer
    let c1 = lerpColor(color(173, 216, 230), color(0, 0, 139), i / waveCount);
    let c2 = lerpColor(color(173, 216, 230), color(0, 0, 139), (i + 1) / waveCount);

    noFill(); // No fill for the wave shapes
    strokeWeight(2); // Set stroke weight for wave lines

    // Loop through each horizontal line in the current wave layer
    for (let j = 0; j < waveHeight; j++) {
      let inter = map(j, 0, waveHeight, 0, 1); // Interpolation factor
      let c = lerpColor(c1, c2, inter); // Interpolate color
      stroke(c); // Set stroke color
      beginShape(); // Begin a new shape
      // Loop through the width of the canvas to draw the wave
      for (let x = 0; x <= width + 9; x += 10) {
        let wave = sin(x * randomFrequency + frameCount * 0.1) * randomAmplitude * (waveHeight - j) / waveHeight; // Calculate wave displacement
        vertex(x, y + wave); // Set vertex position
      }
      endShape(); // End the shape
    }
  }
}

// Raindrop class to handle individual raindrop properties and behavior
class Raindrop {
  constructor() {
    this.x = random(width); // Random horizontal position
    this.y = random(-height, 0); // Random vertical position (above canvas)
    this.length = random(10, 20); // Random length of the raindrop
    this.speed = random(10, 20); // Set faster falling speed of the raindrop
    this.weight = random(1, 3); // Random stroke weight (thickness) of the raindrop
  }

  // Update the position of the raindrop
  update() {
    this.y += this.speed; // Move raindrop down by its speed
    if (this.y > height) { // If raindrop goes off the bottom of the canvas
      this.y = random(-height, 0); // Reset to a random position above the canvas
      this.x = random(width); // Randomize horizontal position
    }
  }

  // Draw the raindrop
  show() {
    stroke(138, 43, 226); // Set stroke color for the raindrop
    strokeWeight(this.weight); // Set stroke weight for the raindrop
    line(this.x, this.y, this.x, this.y + this.length); // Draw the raindrop as a line
  }
}

// Function to draw and animate raindrops
function drawRain() {
  for (let drop of raindrops) {
    drop.update(); // Update the position of the raindrop
    drop.show(); // Draw the raindrop
  }
}
