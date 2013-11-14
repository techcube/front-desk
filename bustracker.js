


/* thanks bus tracker... no api access yet.... so hacks away! */
activeAjax = true;

function getJson(){
	//$.getJSON('http://api.livetravelmaps.com/data/techcube?jsoncallback=',{format:"json"}).done(function(data){console.log("done");})
	$.ajax({
		type : "GET",
		dataType : "jsonp",
		url : "http://api.livetravelmaps.com/data/techcube?callback=?", 
		success: function(data1){
			console.log(data1)
			updateBusTimes(data1)
			}
		})
}

function getBusTime(bus, stop, data)
{
	try {
		var val;
		for (k = 0; k < data.buses.length; k++) {
			if (data.buses[k].service == bus.toString() && data.buses[k].stop== stop.toString()) 
			{
				val = data.buses[k].time;
				break;
			}
		}
		console.log(val)
		if (val == "DUE" || val.indexOf(":") > 0) 
			return val;
		else if (val.trim().length == 0)
			return ""
		return val + " mins";
	}
	catch (err) {
		return "Done"
	}
}

function updateStop(element,stop,data)
{
	$(element + " > div").each(function() {
		var bus = $(this).attr('class'); 
		var time = getBusTime(bus,stop,data);
		var current = $(this).find("span").text()
		if (time.length == 0) {
			$(this).find("span").css('color','red');
		} else if (time == "Done") {
			$(this).find("span").text("Done");
			$(this).css('color','grey');
		}
		else
		{ 
			$(this).find("span").text(time);
			$(this).css('color','white');
		}
	});
}


function updateBusTimes(data)
{
	updateStop("#toTown","36236562",data);
	updateStop("#toMeadows","36238273",data);
	updateStop("#toMayfieldRoad","36238786",data);
	updateStop("#toCameronToll","36234823",data);
	updateStop("#toCommiePool","36234798",data);
}