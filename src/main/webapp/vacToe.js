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

function vacToe(){
	var array = [];
	var teller;
	teller = tellerToevoegen;
		while(teller >= 0){
			array.push($("#werkvlakken" + teller).val());
			teller -= 1;
		}
	arrayAsAString = array.join(",");
	$.ajax({
		url: "/restservices/data/saveVac/" + window.sessionStorage.getItem("id") +"/"+ arrayAsAString,
		method: "POST",
		data: $("#update").serialize(),
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			$("#modal").html('<div>de vacature is opgeslagen</div><input type="button" id="Oke" onclick="away()" value="Oke">')
			modal.style.display = "block";
				},
		
		error:function (data) {
			},
	});
}

function wegLine(){
	if(tellerToevoegen != 0){
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
	window.location="bewerken.html";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
