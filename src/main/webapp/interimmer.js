function loggedin() {
	$.ajax({
		url: "/restservices/data/loggedin",
		method: "GET",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			getVacatures();
		},
		error: function (data) {
			window.location="https://ipasswebservice.herokuapp.com/";
		},
	});
}

function getVacatures(){
	$.ajax({
		url: "/restservices/data/vacatures/" + window.sessionStorage.getItem("id") + "/" + window.sessionStorage.getItem("role") + "/" + "IS NOT NULL",
		method: "GET",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
				if(data.length == 0){
					$("#clear").empty();
					$("#clear").append("<div>Er zijn helaas nog geen vacatures aangeboden</div>")
				}
				$("#vhead").empty();
				$("#vbody").empty();
				$("#vhead").append("<tr><th>Bedrijf</th><th>Plaats</th><th>Functie</th></tr>")
				$.each(data, function(i, dat) {
					codes = '"' + dat.id + '"'
					$("#vbody").append("<tr id='info' class='tr' onclick='getVacature("+ codes +")'><td id='bedrijf' class='td1'>" + dat.bedrijf + "</td><td id='plaats' class='td2'>"+ dat.plaats +"</td><td id='functie' class='td3'>"+ dat.functie +"</td></tr>");
				});
		},
	});
}

function getVacature(va_id){
	window.sessionStorage.setItem("vacatureID", va_id)
	window.location="vacature.html";
}

function away(){
	var data = window.sessionStorage.getItem("role")
	window.location=data +".html";
}

function logout(){
	window.sessionStorage.clear();
	window.location="https://ipasswebservice.herokuapp.com/";
}

function red(){
	window.location="bewerken.html";
}

function werkvlakken(){
	window.location="werkvlakken.html";
}

//Get the modal
var modal = document.getElementById('myModal');
