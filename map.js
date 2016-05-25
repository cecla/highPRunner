// L.mapbox.accessToken = 'pk.eyJ1IjoiY2VjbGEiLCJhIjoiY2lsODN2eHp3MDAxdXc2a3FtOXZqcHB1ZiJ9.J7JCFDWFUsbAJvnbZ5iOuw';
// 		var map = L.mapbox.map('map', 'cecla.78ec09d6')

var map = L.map('map',{
	center: [46.53,6.5],
	zoom: 12,
	maxZoom: 16,
	minZoom: 5
});

L.tileLayer('https://api.mapbox.com/styles/v1/cecla/cinzy9cwz0026bgnmxrixt9f4/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VjbGEiLCJhIjoiY2lsODN2eHp3MDAxdXc2a3FtOXZqcHB1ZiJ9.J7JCFDWFUsbAJvnbZ5iOuw').addTo(map);

var route1 = null;
var route2 = null;

var coordHR = [];

var speedOrHeart = 0;
var drawAgain = false;

var i = 0;
var count = 0;
var radiusLimit = 0.00000005;
var startLogging = 900000;
//var r = 0.005;
//var hr1 = [];

var dataArray = [];
var indexArray = [];

var index = 0;
var k = 0;

var speed = [];
var hr = [];

var dist = 0;

var singelRoute = [];

$(document).ready ( function(){

   for(var l = 1; l < 11; l++) {
   		$('#data'+l).removeAttr('disabled');
   }
});

$('#data1').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data2').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data3').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data4').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data5').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data6').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data7').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data8').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data9').click(function() {
	$(this).attr('disabled', 'disabled');
});

$('#data10').click(function() {
	$(this).attr('disabled', 'disabled');
});

function loadCoord (data) {
	var coordLength = coordHR.length;
	$.ajax({
	type: 'GET',
	url: data,
	dataType: 'xml',
		success: function (xml) {
			//console.log(xml);
			//console.log($(xml).find('trkpt')[0].childNodes[3].innerHTML)
			var tempDate = new Date($(xml).find('trkpt')[0].childNodes[3].innerHTML);
			var startTime = tempDate.getTime();

			var q = 0;
			var sRoute = [];
			var c = k;
			
			//console.log(startTime)

			$(xml).find('trkpt').each(function () {
				// take out time
				var d = new Date($(this)[0].childNodes[3].innerHTML);
				var t = d.getTime(d);
				var timeDifference = t - startTime;

				if(((count%5) == 0 || count == 0)  && timeDifference > startLogging) {
					// coordinates
					var lat = $(this).attr("lat");
					var lon = $(this).attr("lon");

					$(this).find('extensions').each(function () {
						var j = 0;
						var check = false;
						
						while(j < (dataArray.length - 1)) {
							var tempR1 = Math.pow((lat - dataArray[j][1]),2) + Math.pow((lon - dataArray[j][2]),2);
							var tempR2 = Math.pow((lat - dataArray[(j+1)][1]),2) + Math.pow((lon - dataArray[(j+1)][2]),2);

							// check if coord. is too close, then merge instead
							if(tempR1 < radiusLimit && tempR1 < tempR2) {
								// add index
								dataArray[j][0].push(index);

								// heartrate
								dataArray[j][3].push($(this)[0].childNodes[1].childNodes[1].firstChild.data);
								dataArray[j][4] = math.sum(dataArray[j][3])/dataArray[j][3].length;

								//speed
								dataArray[j][5].push($(this)[0].childNodes[13].firstChild.data);
								dataArray[j][6] = math.sum(dataArray[j][5])/dataArray[j][5].length;

								check = true;
								dist = $(this)[0].childNodes[7].firstChild.data;
								break;
							}
							j++;
						}

						speed[k] = $(this)[0].childNodes[13].firstChild.data;
						hr[k] = $(this)[0].childNodes[1].childNodes[1].firstChild.data;
						sRoute[q] = [lat, lon, $(this)[0].childNodes[13].firstChild.data];
						k++;
						q++;

						// index, coord, array hr, hr, array speed, speed, array eve, eve
						if(!check) {
							//hr[i] = [lat, lon, [$(this)[0].childNodes[1].childNodes[1].firstChild.data], $(this)[0].childNodes[1].childNodes[1].firstChild.data];
							dataArray[i] = [[index], lat, lon, [$(this)[0].childNodes[1].childNodes[1].firstChild.data], $(this)[0].childNodes[1].childNodes[1].firstChild.data,
							[$(this)[0].childNodes[13].firstChild.data], $(this)[0].childNodes[13].firstChild.data];
							dist = $(this)[0].childNodes[7].firstChild.data;
							i++;
						}
					});
				}
				count++;
			});

			var avgHr = math.sum(hr.slice(c,k+1))/(k-c);
			var avgSpeed = math.sum(speed.slice(c,k+1))/(k-c);

			indexArray[index] = [tempDate, dist, avgHr, avgSpeed];

			singelRoute[index] = sRoute;

			var x = document.getElementById("pickTrack");
			var option = document.createElement("option");
			option.text = index;
			x.add(option);

			var x = document.getElementById("pickTrack1");
			var option = document.createElement("option");
			option.text = index;
			x.add(option);

			var x = document.getElementById("pickTrack2");
			var option = document.createElement("option");
			option.text = index;
			x.add(option);

			index++;

			map.setView([dataArray[0][1] ,dataArray[0][2]]);
		}
	});
}

function vizCoordHeart() {
	// clear the layer before updating
	removeCircleLayer();

	speedOrHeart = 0;

	console.log(dataArray.length);
	var color = '#fff';
	len = dataArray.length;

	var i = 0;

	while(i < len) {

		//if (hr[i][2].length > 1) {
		//	color = '#0000FF';
		//} else {
			if(dataArray[i][4] < 152) {
				color = '#40ff00'; //green
			} else if (dataArray[i][4] >= 152 && dataArray[i][4] < 166) {
				color = '#ffff00'; //yeloow
			} else if (dataArray[i][4] >= 166 && dataArray[i][4] < 179) {
				color = '#ff9900'; //orange
			} else {
				color = '#FF0000'; //red
			}
		//}


		circle =	L.circle([dataArray[i][1], dataArray[i][2]], 20, {
							color: color,
							opacity: 0.4,
							stroke: false
						}).addTo(map);

		i++;
	}
}

$('#pickTrack').change(function() {
	drawAgain = true;
    var val = parseInt($("#pickTrack option:selected").text());
    
    removeCircleLayer();	
	console.log(val);

	len = dataArray.length;

	var o = 1 / index;

	var i = 0;

	while(i < len) {
		
		if ($.inArray(val,dataArray[i][0]) != -1 ) {
			L.circle([dataArray[i][1], dataArray[i][2]], 20, {
				opacity: o,
				stroke: false,
				blur: 0.3
			}).addTo(map);
		}
		i++;
	}
});

var marker;
var maxSingle = 0;
function createTrackMarker() {
	removeCircleLayer();	

	for (var r = 0; r < singelRoute.length; r++) {
		if (maxSingle < singelRoute[r].length) {
			maxSingle = singelRoute[r].length;
		}
	}
	console.log(maxSingle);
	/*marker = L.marker([singelRoute[0][0], singelRoute[0][1]], {
		title: singelRoute[0][2]
	}).addTo(map);*/

	moveMarker();
}

var t = 0;
var y = 0;
var updateSpeed = 0;
var maxSpeed;

function moveMarker() {
	maxSpeed = math.max(speed);

	var r1 = parseInt($("#pickTrack1 option:selected").text());
	var r2 = parseInt($("#pickTrack2 option:selected").text());

	//var y = 0;
	if (t < singelRoute[r1].length && y < singelRoute[r2].length) {
		if(singelRoute[r1][t][2] > singelRoute[r2][y][2]) {
			if (t < singelRoute[0].length) {

				if(singelRoute[r1][t][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.4) && singelRoute[r1][t][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.6) && singelRoute[r1][t][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r1][t][0], singelRoute[r1][t][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}
			t++;
			if (t < singelRoute[r1].length) {
				if(singelRoute[r1][t][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.4) && singelRoute[r1][t][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.6) && singelRoute[r1][t][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r1][t][0], singelRoute[r1][t][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}

			if (y < singelRoute[r2].length) {
				if(singelRoute[r2][y][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.4) && singelRoute[r2][y][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.6) && singelRoute[r2][y][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r2][y][0], singelRoute[r2][y][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}
		} else {
			if (t < singelRoute[r1].length) {
				if(singelRoute[r1][t][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.4) && singelRoute[r1][t][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r1][t][2] >= (maxSpeed * 0.6) && singelRoute[r1][t][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r1][t][0], singelRoute[r1][t][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}

			if (t < singelRoute[r2].length) {
				if(singelRoute[r2][y][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.4) && singelRoute[r2][y][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.6) && singelRoute[r2][y][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r2][y][0], singelRoute[r2][y][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}
			y++;
			if (y < singelRoute[r2].length) {
				if(singelRoute[r2][y][2] < (maxSpeed * 0.4)) {
					color = '#40ff00'; //green
					//updateSpeed = 300;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.4) && singelRoute[r2][y][2] < (maxSpeed * 0.6)) {
					color = '#ffff00'; //yeloow
					//updateSpeed = 200;
				} else if (singelRoute[r2][y][2] >= (maxSpeed * 0.6) && singelRoute[r2][y][2] < (maxSpeed * 0.8)) {
					color = '#ff9900'; //orange
					//updateSpeed = 100;
				} else {
					color = '#FF0000'; //red
					//updateSpeed = 10;
				}
					//}


				circle =	L.circle([singelRoute[r2][y][0], singelRoute[r2][y][1]], 20, {
									color: color,
									opacity: 0.4,
									stroke: false
								}).addTo(map);
			}
		}
	} else {
		if (t < singelRoute[r1].length) {
			vizCoord(singelRoute[r1][t][0], singelRoute[r1][t][1],singelRoute[r1][t][2]);
		}

		if (y < singelRoute[r2].length) {
			vizCoord(singelRoute[r2][y][0], singelRoute[r2][y][1],singelRoute[r2][y][2]);
		}
	}

	/*marker.setLatLng(L.latLng(
        singelRoute[t][0],
        singelRoute[t][1]));*/
	if (++t < maxSingle && ++y < maxSingle) setTimeout(moveMarker, 10);
}

function vizCoord(lat, lon, s){

	if(s < (maxSpeed * 0.4)) {
		color = '#40ff00'; //green
		//updateSpeed = 300;
	} else if (s >= (maxSpeed * 0.4) && s < (maxSpeed * 0.6)) {
		color = '#ffff00'; //yeloow
		//updateSpeed = 200;
	} else if (s >= (maxSpeed * 0.6) && s < (maxSpeed * 0.8)) {
		color = '#ff9900'; //orange
		//updateSpeed = 100;
	} else {
		color = '#FF0000'; //red
		//updateSpeed = 10;
	}
		//}


	circle =	L.circle([lat, lon], 20, {
						color: color,
						opacity: 0.4,
						stroke: false
					}).addTo(map);
}

function vizCoordSpeed() {
	// clear the layer before updating
	speedOrHeart = 1;
	removeCircleLayer();	

	console.log(dataArray.length);
	var color = '#fff';
	len = dataArray.length;

	var i = 0;

	var maxSpeed = math.max(speed);
	console.log(maxSpeed);

	while(i < len) {

		//if (dataArray[i][5].length > 1) {
		//	color = '#0000FF';
		//} else {
			if(dataArray[i][6] < (maxSpeed * 0.4)) {
				color = '#40ff00'; //green
			} else if (dataArray[i][6] >= (maxSpeed * 0.4) && dataArray[i][6] < (maxSpeed * 0.6)) {
				color = '#ffff00'; //yeloow
			} else if (dataArray[i][6] >= (maxSpeed * 0.6) && dataArray[i][6] < (maxSpeed * 0.8)) {
				color = '#ff9900'; //orange
			} else {
				color = '#FF0000'; //red
			}
		//}


		circle =	L.circle([dataArray[i][1], dataArray[i][2]], 20, {
							color: color,
							opacity: 0.4,
							stroke: false
						}).addTo(map);

		i++;
	}
}

function removeCircleLayer() {
	map.eachLayer(function(layer) {
		
		if (layer instanceof L.Circle) {
			map.removeLayer(layer);
		}
	});

	if(drawAgain == true) {
		if (speedOrHeart == 0) {
			drawAgain = false;
			vizCoordHeart();
		} else {
			drawAgain = false;
			vizCoordSpeed();
		}
	}
}

function heartRateSlider(value) {
	// clear the layer before updating
	document.getElementById("heart").textContent = value;

	removeCircleLayer();	
	console.log(value);

	len = dataArray.length;

	var o = 1 / index;

	var i = 0;

	while(i < len) {
		var j = 0;
		while(j < index) {
			if ($.inArray(j,dataArray[i][0]) != -1 && indexArray[j][2] > value) {
				L.circle([dataArray[i][1], dataArray[i][2]], 20, {
					opacity: o,
					stroke: false,
					blur: 0.3
				}).addTo(map);

			}
			j++;
		}
		i++;
	}
}

function speedSlider(value) {
	// clear the layer before updating
	removeCircleLayer();	
	console.log(value);

	document.getElementById("speed").textContent = value;

	len = dataArray.length;

	var o = 1 / index;

	var i = 0;

	while(i < len) {
		var j = 0;
		while(j < index) {
			if ($.inArray(j,dataArray[i][0]) != -1 && indexArray[j][3] > value) {
				L.circle([dataArray[i][1], dataArray[i][2]], 20, {
					opacity: o,
					stroke: false,
					blur: 0.3
				}).addTo(map);

			}
			j++;
		}
		i++;
	}
}

function speedHour(time) {
	// clear the layer before updating
	removeCircleLayer();	
	var temp = new Date(indexArray[0][0]);
	console.log(indexArray[0][0]);

	// len = dataArray.length;

	// var o = 1 / index;

	// var i = 0;

	// while(i < len) {
	// 	var j = 0;
	// 	while(j < index) {
	// 		if ($.inArray(j,dataArray[i][0]) != -1 && indexArray[j][3] > value) {
	// 			L.circle([dataArray[i][1], dataArray[i][2]], 20, {
	// 				opacity: o,
	// 				stroke: false,
	// 				blur: 0.3
	// 			}).addTo(map);

	// 		}
	// 		j++;
	// 	}
	// 	i++;
	// }
}