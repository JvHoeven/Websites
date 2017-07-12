var tellerToevoegen = 1;

function newLine(){
	$("#plus").remove();
	$("#min").remove();
	$("#vacToe").remove();
	$("#update").append('<select id="werkvlakkenVac'+ tellerToevoegen +'" name="werkvlakkenVac'+ tellerToevoegen +'"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">administaratiefmedewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
	$("#update").append('<input type="button" id="plus" value="+" onclick="newLine()"/>')
	$("#update").append('<input type="button" id="min" value="-" onclick="wegLine()"/>')
	$("#update").append('<input type="button" id="vacToe" value="Zoeken" onclick="opslaan()"/>')
	tellerToevoegen += 1;
	
}

function opslaan(){
	var array = [];
	var teller;
	console.log("hoi1")
	teller = tellerToevoegen;
	teller -= 1;
		while(teller >= 0){
			array.push($("#werkvlakkenVac" + teller).val());
			teller -= 1;
		}
	arrayAsAString = array.join(",");
	$.ajax({
		url: "/restservices/data/zoek/" + arrayAsAString,
		method: "PUT",
		data: $("#update").serialize(),
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			console.log("hoi2")
			if(data.length == 0){
				$("#clear").empty();
				$("#clear").append("<div>Er zijn helaas geen interimmers met deze eisen</div>")
			}
			$("#vhead").empty();
			$("#vbody").empty();
			$("#vhead").append("<tr><th>Naam</th><th>Plaats</th><th>Functie</th><th>Aan</th></tr>")
			$.each(data, function(i, dat) {
				codes = '"' + dat.id + '"'
				$("#vbody").append("<tr id='info' class='tr' onclick='getInterimmer("+ codes +")'><td id='bedrijf' class='td1'>" + dat.voornaam +" "+ dat.achternaam + "</td><td id='plaats' class='td2'>"+ dat.woonplaats +"</td><td id='functie' class='td3'>"+ dat.postcode +"</td><td id='aan' class='td3'><a href='"+ dat.linkedin +"'>"+ dat.linkedin +"</a></td></tr>");
			});
				},
		
		error:function (data) {
			console.log("hoi3")
			},
	});
}

function wegLine(){
	if(tellerToevoegen != 0){
		tellerToevoegen -= 1;
		$("#werkvlakkenVac" + tellerToevoegen).remove()
	}else{
		$("#werkvlakkenVac" + tellerToevoegen).remove()
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
