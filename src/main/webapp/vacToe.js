var tellerToevoegen = 1;

function newLine(){
	$("#plus").remove();
	$("#min").remove();
	$("#vacToe").remove();
	$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken'+ tellerToevoegen +'"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">administaratiefmedewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
	$("#werkvlakkenToevoegen").append('<input type="button" id="plus" value="+" onclick="newLine()"/>')
	$("#werkvlakkenToevoegen").append('<input type="button" id="min" value="-" onclick="wegLine()"/>')
	$("#werkvlakkenToevoegen").append('<input type="button" id="vacToe" value="Toevoegen" onclick="vacToe()"/>')
	tellerToevoegen += 1;
	
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
			getInterimmer();
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
