<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HighPRunner</title>
    <link rel='stylesheet' href='/highprunner/style.css' />

    <link rel="stylesheet" href="/highprunner/map.css">
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
  <link href='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.css' rel='stylesheet' />
  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet' />

  </head>
  <body>
  <div id="map"></div>

  <p>Load data:
  <button id="data1" onclick="loadCoord('./data/run1.gpx')">DATA1</button>
  <button id="data2" onclick="loadCoord('./data/run2.gpx')">DATA2</button>
  <button id="data3" onclick="loadCoord('./data/run3.gpx')">DATA3</button>
  <button id="data4" onclick="loadCoord('./data/run4.gpx')">DATA4</button>
  <button id="data5" onclick="loadCoord('./data/run5.gpx')">DATA5</button>
  <button id="data6" onclick="loadCoord('./data/run6.gpx')">DATA6</button>
  <button id="data7" onclick="loadCoord('./data/run7.gpx')">DATA7</button>
  <button id="data8" onclick="loadCoord('./data/run8.gpx')">DATA8</button>
  <button id="data9" onclick="loadCoord('./data/run9.gpx')">DATA9</button>
  <button id="data10" onclick="loadCoord('./data/run10.gpx')">DATA10</button>
  </p>

  <div id="viz">
    <button onclick="vizCoordHeart()">VIZ HEART</button>
    <button onclick="vizCoordSpeed()">VIZ SPEED</button>
  </div>

  <div id="theBox">
    <p>Minimum heart rate: 
    <input type="range" id="range" name="heartBeatChange" min="100" max="192" value="0" step="5" onchange='heartRateSlider(this.value)' />
    </p>
  </div>
  <div id="heart"> </div>
  <div id="theBox">
    <p>Minimum speed: 
    <input type="range" id="range" name="speedChange" min="0" max="5" value="0" step="0.1" onchange='speedSlider(this.value)' />
    <!--<input type="range" id="range" name="hourChange" min="0" max="24" value="0" step="1" onchange='speedHour(this.value)' />-->
    </p>
  </div>
  <div id="speed"> </div>

  <div id="highlight">
    <p>Highlight one track:
    <select id="pickTrack">
    </select>
    </p>
  </div>

  <div id="animtion">
    <p>Select two tracks for animation:
    <select id="pickTrack1">
    </select>
    <select id="pickTrack2">
    </select>
    <button onclick="createTrackMarker()">ANIMATION</button>
    </p>
  </div>

  </body>


  <script src='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js'></script>
  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>
  <script src='/highprunner/jquery.js' type="text/javascript"></script>
  <script src="/highprunner/mathjs/dist/math.js" type="text/javascript"></script>
  <script src='/highprunner/map.js' type="text/javascript"></script>
</html>
