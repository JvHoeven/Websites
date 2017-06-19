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

function getInterimmer(){
	$.ajax({
		url: "/restservices/data/interimmer/" + window.sessionStorage.getItem("id"),
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

function logout(){
	window.sessionStorage.clear();
	window.location="https://ipasswebservice.herokuapp.com/";
}


function opslaan(){
	$.ajax({
		url: "/restservices/data/interimmer/update/" + window.sessionStorage.getItem("id"),
		type: "post",
		data : $("#update").serialize(),
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},

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
	window.location=window.sessionStorage.getItem("role") + ".html";
}

function werkvlakken(){
	window.location="werkvlakken.html";
}

function red(){
	window.location="bewerken.html";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
