# highPRunner
An EPFL project in the course Personal Interaction Studio

Check out the [storyboard](http://cecilialagerwall.se/highprunner/storyboard/)

How the web-app works:
--------------
1. Load gpx-data files (each data-file can maximum be loaded once)
	a) Every 5th gps-point is loaded
	b) Merge points if close to each other
	c) Saves individual tracks with IDs
2. When at least one file is loaded. Can click on "VIZ HEART" or "VIZ SPEED"
	a) For heart: Taking the average rate in each point and compare it to the heartrate zones: red > 179, orange > 166, yellow > 152, green < 152.
	b) 