# highPRunner
An EPFL project in the course Personal Interaction Studio.

**Links to different parts of the project:**
- [Web-app](http://cecilialagerwall.se/highprunner/)
- [Prototype Mobile UI](http://cecilialagerwall.se/highprunner/prototype) (All the buttons are not in function)
- [Demo of prototype](http://cecilialagerwall.se/highprunner/demo/)
- [Abstract](http://cecilialagerwall.se/highprunner/abstract.pdf)
- [Genealogy of Ideas](http://cecilialagerwall.se/highprunner/genealogy/)
- [Storyboard](http://cecilialagerwall.se/highprunner/storyboard/) (The old one. The real persona can be find in the slides and the latest storyboard can be found further down)
- [Presentation slides](http://slides.com/luvan1/highprunner/fullscreen)

The web-app uses a map from MapBox. For some calculations in the JavaScript file, the math.js library is used. jquery is also used.

How the web-app works:
--------------
1. Load gpx-data files (each data-file can maximum be loaded once)
	1. Every 5th gps-point is loaded
	2. Merge points if close to each other
	3. Saves individual tracks with IDs
2. When at least one file is loaded. Can click on "VIZ HEART" or "VIZ SPEED"
	1. For heart: Taking the average rate in each point and compare it to the heart rate zones: red > 179, orange > 166, yellow > 152, green < 152.
	2. For speed: First is the maximum-speed of all tracks found. The color represents a percentage of the maximum-speed. red > 80%, orange > 60%, yellow > 40%, green < 40%
3. With the sliders it's possible to filter the tracks on which one are going to be displayed. The sliders filter on each tracks average hear rate and speed.
4. Can highlight one specific track. The order in the drop-down is the same order the data was loaded minus 1.
5. For the animation, pick two tracks. The animation is animated on the speed.
	1. The application draws one or two points at the time
	2. One point for track one if in that moment the speed is slower than track two and vice versa.
	3. If one track has finished, the other track updates one point at the time.

**Images:**
Start page
![start](http://cecilialagerwall.se/highprunner/img/start.png)
View all data, colored by avg. heart rate
![heart](http://cecilialagerwall.se/highprunner/img/heart.png)
View all data, colored by avg. speed
![speed](http://cecilialagerwall.se/highprunner/img/speed.png)
Highlight one track
![highlight](http://cecilialagerwall.se/highprunner/img/select.png)
Filter tracks by either avg. speed or avg. heart rate. Each track get different color.
![filter](http://cecilialagerwall.se/highprunner/img/filter.png)
Animation of two tracks. The fastest in each point updates in double speed.
![animation1](http://cecilialagerwall.se/highprunner/img/animation1.png)
![animation2](http://cecilialagerwall.se/highprunner/img/animation.png)

The storyboard
![storyboard](http://cecilialagerwall.se/highprunner/img/storyboard.png)