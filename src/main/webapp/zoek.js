var tellerToevoegen = 1;

function newLine(){
	$("#plus").remove();
	$("#min").remove();
	$("#vacToe").remove();
	$("#update").append('<select id="werkvlakkenVac'+ tellerToevoegen +'" name="werkvlakkenVac'+ tellerToevoegen +'"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">administaratiefmedewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
	$("#update").append('<input type="button" id="plus" value="+" onclick="newLine()"/>')
	$("#update").append('<input type="button" id="min" value="-" onclick="wegLine()"/>')
	$("#update").append('<input type="button" id="vacToe" value="Toevoegen" onclick="vacToe()"/>')
	tellerToevoegen += 1;
	
}

function opslaan(){
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
					$("#clear").append("<div>Er zijn nog geen vacatures die je hebt aangeboden</div>")
				}
				$("#vhead").empty();
				$("#vbody").empty();
				$("#vhead").append("<tr><th>Bedrijf</th><th>Plaats</th><th>Functie</th><th>Aan</th></tr>")
				$.each(data, function(i, dat) {
					codes = '"' + dat.id + '"'
					$("#vbody").append("<tr id='info' class='tr' onclick='getVacature("+ codes +")'><td id='bedrijf' class='td1'>" + dat.bedrijf + "</td><td id='plaats' class='td2'>"+ dat.plaats +"</td><td id='functie' class='td3'>"+ dat.functie +"</td><td id='aan' class='td3'>"+ dat.intVoornaam +" "+ dat.intAchternaam +"</td></tr>");
				});
		},
	});
}

function wegLine(){
	if(tellerToevoegen >= 0){
		tellerToevoegen -= 1;
		$("#werkvlakken" + tellerToevoegen).remove()
	}
}

function loggedin() {
	$.ajax({
		url: "/restservices/data/loggedin",
		method: "GET",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
		},
		error: function (data) {
			window.location="https://ipasswebservice.herokuapp.com/";
		},
	});
}

function logout(){
	window.sessionStorage.clear();
	window.location="https://ipasswebservice.herokuapp.com/";
}

function modallenNo(){
	modal.style.display = "none";
}

function vacature(){
	window.location="vacToe.html";
}

function away(){
	window.location=window.sessionStorage.getItem("role") + ".html";
}

function red(){
	window.location="zoek.html";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
