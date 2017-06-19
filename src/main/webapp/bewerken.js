function loggedin() {
	$.ajax({
		url: "/IPASS/restservices/data/loggedin",
		method: "GET",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			getInterimmer();
		},
		error: function (data) {
			window.location="http://localhost:8080/IPASS/";
		},
	});
}

function getInterimmer(){
	$.ajax({
		url: "/IPASS/restservices/data/interimmer/" + window.sessionStorage.getItem("id"),
		method: "POST",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
				$("#voornaam").val(data.voornaam);
				$("#achternaam").val(data.achternaam);
				$("#geboortedatum").val(data.geboortedatum);
				$("#woonplaats").val(data.woonplaats);
				$("#postcode").val(data.postcode);
				$("#email").val(data.email);
				$("#linkedinLink").val(data.link);
				$("#minimumloon").val(data.minimumloon);
				$("#telefoonnummer").val(data.telefoonnummer);
				
				},
		
		error:function (data) {
			},
	});
}

function update(){
	if($("#voornaam").val() == "" || $("#achternaam").val() == "" || $("#geboortedatum").val() == "" || $("#woonplaats").val() == "" || $("#Postcode").val() == "" || $("#email").val() == "" || $("#minimumloon").val() == ""){
		$("#modal").html('<div>er is een verplicht veld leeg</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
		modal.style.display = "block";
	}else{
		$("#modal").html('<div>weet u zeker dat u de gegeven wilt bijwerken</div><input type="button" id="Oke" onclick="opslaan()" value="Ja"><input type="button" id="Oke" onclick="modallenNo()" value="Nee">')
		modal.style.display = "block";
	}
};

function opslaan(){
	$.ajax({
		url: "/IPASS/restservices/data/interimmer/update/" + window.sessionStorage.getItem("id"),
		type: "post",
		data : $("#update").serialize(),

		success: function (data) {
			$("#modal").html('<div>de wijzigingen zijn opgeslagen</div><input type="button" id="Oke" onclick="away()" value="Oke">')
		},
		error: function(response) {
			$("#modal").html('<div>Er is iets fout gegaan</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
			modal.style.display = "block";
		}
	});
}
	

function modallenNo(){
	modal.style.display = "none";
}

function away(){
	window.location="http://localhost:8080/IPASS/" + window.sessionStorage.getItem("role") + ".html";
}

function werkvlakken(){
	window.location="http://localhost:8080/IPASS/werkvlakken.html";
}

function red(){
	window.location="http://localhost:8080/IPASS/bewerken.html";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
