# YiweiLi_yili0186_9103individualtask

## Final Project Individual Task

** I used ‘Time-based: animation using timers and events...’ based on the group source code, to add a flow effect to the waves. **

### Change Description for waves

** Animation looping: added > noLoop() to settings and > loop() to draw to ensure a continuous animation effect.
   Time-based animation: added > frameCount to > drawWave to create animation effects.
   Frame rate: set > frameRate(30) to control the animation speed.
   Background refresh: use > background(222,184,93) at the beginning of the draw function to clear the canvas at each frame to prevent traces of previous frames from appearing and matching the animation. **

** The drawWave function will now draw the wave animation over time, resulting in a dynamic effect. The sky and its reflection remain as a static gradient, while the waves move with each frame, simulating a natural wave effect. **

[Introduction to motion graphics in P5.js - Learn by Digital Harbor Foundation. (2020, March 10). Learn by Digital Harbor Foundation.] (http://learn.digitalharbor.org/courses/creative-programming/lessons/introduction-to-motion-graphics-in-p5-js/)


#### Change Description for Rainfalls

** Similarly, I added a rain animation effect to the group's original canvas.
   Construction function: set the position, length, speed and weight of the raindrops.
   Update method: Updates the position of the raindrop. If the raindrop leaves the bottom of the canvas, it is reset to the top.
   Show method: draws the raindrop.
   > drawRain function: loops over the > raindrops array, calls > update and > show methods on each raindrop to animate the falling raindrops.
   Setup function: initialise the > Raindrops object array. **

** This will animate the raindrops and waves to make the scene more animated and visually attractive. **





##### Tips
> This is a blockquote
[] () This is link to reference
! [] () This is link to image