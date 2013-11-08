
function loadEvents() {
	var data = new Array();
	// get techcube data
	$.ajax({
		type : "GET",
		dataType : "jsonp",
		url : "http://techcubehouseevents.hasacalendar.co.uk/api1/event/jsonp?callback=?", 
		success: function(data1){
			// add url for logo for this source
			for(i in data1.data) {
				if (!data1.data[i].deleted) {
					data1.data[i].sourcelogo="techcube.png";
					data.push(data1.data[i]);
				}
			}
			// get Open Tech Calendar data
			$.ajax({
				type : "GET",
				dataType : "jsonp",
				url : "http://opentechcalendar.co.uk/index.php/location/1/jsonp?callback=?", 
				success: function(data2){
					// add url for logo for this source, mix 2 data sources
					for(i in data2.data) {
						if (!data2.data[i].deleted) {
							data2.data[i].sourcelogo="opentechcalendar.png";
							data.push(data2.data[i]);
						}
					}
					// sort by start time
					data = data.sort(function(a,b) {
						if (a.start.timestamp == b.start.timestamp) {
							return 0;
						} else if (a.start.timestamp > b.start.timestamp) {
							return 1;
						} else {
							return -1;
						}
					});
					// draw the data!
					var today = new Date();
					var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
					for (var i=0;i<6;i++) {
						var start =  new Date(data[i].start.timestamp * 1000);
						var when;
						if (start.getMonth() == today.getMonth() && start.getDate() == today.getDate() && start.getYear() == today.getYear()) {
							when = "Today";
						} else {
							when = daysOfWeek[start.getDay()];
						}
						var html = ""
						html += '<div class="logo"><img src="'+data[i].sourcelogo+'"></div>';
						html += '<div class="title"><span class="when">'+when+'</span> <a href="'+data[i].siteurl+'">'+escapeHTML(data[i].summaryDisplay)+'</a></div>';
						html += '<div class="description">'+escapeHTMLNewLine(data[i].description)+'</div>';
						$('#Panel'+i).html(html);
					}
				}
		   });
		}
   });
	
	
}


function escapeHTML(str) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}
function escapeHTMLNewLine(str) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	var out =  div.innerHTML;
	return out.replace(/\n/g,'<br>');
}

// rotate between all screens... thanks stackoverflow!
var divs = $('.fade');

function fade() {
    var current = $('.current');
    var currentIndex = divs.index(current),
        nextIndex = currentIndex + 1;

    if (nextIndex >= divs.length) {
        nextIndex = 0;
    }

    var next = divs.eq(nextIndex);

    next.stop().fadeIn(2000, function() {
        $(this).addClass('current');
    });

    current.stop().fadeOut(2000, function() {
        $(this).removeClass('current');
        setTimeout(fade, 5*1000);
    });
}

fade();



// Reload the whole page every hour to get new data
setTimeout(function () {
	location.reload(true);
},60*60*60*1000);

// All right, let's go!
loadEvents();


