


/* thanks bus tracker... no api access yet.... so hacks away! */
activeAjax = true;
function _ajaxJson(url) {
	// Test if ajax is enabled © (if we do anything)
	//if (showCursor)
	//	document.getElementsByTagName ('body') [0] = style.cursor LoadCursor.;
	if (activeAjax) {	
		var form = $(document).find('form');
		$.ajax ({
		    type: 'POST',
		    dataType: 'xml',
		    data: form.serialize(),
		    cache: 'false',
		    url: url,
		    timeout: 20000,
		    success: function (data) {	
		    	//console.log(data);
		    	console.log($(data).find('updateElement').text())
		    	$("#resultOutput").html($(data).find('updateElement').text());
		    },
		    error: function (XMLHttpRequest, textStatus, errorThrown) {
		    	// do something...
		    },
		    complete: function (jqXHR, textStatus) {
		    	updateBusTimes();
		    }
//		    beforeSend: function (jqXHR, settings) {
		    	//if (preQueryCallBack! preQueryCallBack = null &&! ='')
		    	//	beforeSendFunctionCall (preQueryCallBack, jqXHR, settings);
//		    }
		});
	}
}

function getBusTime(bus, stop)
{
	try {
		console.log("bus=" + bus + "; stop = " + stop);
		var service = $("td:contains("+stop+")").parent().next("tr.tblanc").find(".service").filter(function()
			{
				return $(this).text() == bus;
			});
		console.log(service);

		//var val= $("td:contains("+stop+")").parent().next("tr.tblanc").find(".service:contains("+bus+")").next().next().children().first().text();
		var val= $("td:contains("+stop+")").parent().next("tr.tblanc").find(".service").filter(function()
			{
				return $(this).text() == bus;
			}).next().next().children().first().text();

		console.log(val);
		//return val;
		if (val == "DUE" || val.indexOf(":") != -1) 
			return val;
		else if (val.trim().length == 0)
			return ""
		return val + " mins";
	}
	catch (err) {
		return "ERR!"
	}
}

function updateStop(element,stop)
{
	$(element + " > div").each(function() {
		var bus = $(this).attr('class'); 
		var time = getBusTime(bus,stop);
		var current = $(this).find("span").text()
		if (time.length == 0) {
			$(this).find("span").css('color','red');
		} else if (current == time) {
			$(this).find("span").css('color','white');
			$(this).find("span").css('text-decoration','none');
		}
		else
		{ 
			$(this).find("span").text(time);
			$(this).find("span").css('text-decoration','underline');
			$(this).find("span").css('color','white');
		}
	});
}


function updateBusTimes()
{
	updateStop("#toTown","36236562");
	updateStop("#toMeadows","36238273");
	updateStop("#toMayfieldRoad","36238786");
	updateStop("#toCameronToll","36234823");
	updateStop("#toCommiePool","36234798");
}