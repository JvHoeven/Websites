function loggedin() {
	$.ajax({
		url: "/restservices/data/loggedin",
		method: "GET",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			getVacature();
		},
		error: function (data) {
			window.location="https://ipasswebservice.herokuapp.com/";
		},
	});
}

function getVacature(){
		$.ajax({
			url: "/restservices/data/interimmer/" + window.sessionStorage.getItem("indID"),
			method: "POST",
			beforeSend: function (xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
			},
			success: function (data) {
					$("#vacaturen").empty();
					var array = data.gewildeWerkvlakken.replace("{","")
					var arrayComp = array.replace("}","")
					var arrays = arrayComp.split(",");
					
					var array1 = data.voorgaandeWerkvlakken.replace("{","")
					var arrayComp1 = array1.replace("}","")
					var arrays1 = arrayComp1.split(",");
					
					$("#vacaturen").append("<tr id='info' class='tr'><td>Naam:</td><td>" + data.voornaam + " " + data.achternaam + "</td><td>Geboortedatum:</td><td> "+ data.geboortedatum +"</td></tr>");		
					$("#vacaturen").append("<tr id='info' class='tr'><td>Postcode:</td><td> "+ data.postcode +"</td><td>Plaats: </td><td>"+ data.woonplaats +"</td></tr>");
					$("#vacaturen").append("<tr id='info' class='tr'><td>Email:</td><td> "+ data.email +"</td><td>Minimumloon:</td><td> "+ data.minimumloon +"</td></tr>");
					$("#vacaturen").append("<tr id='info' class='tr'><td>Linkedin:</td><td> "+ data.link +"</td><td>Telefoonnummer:</td><td> 0"+ data.telefoonnummer +"</td></tr>");
					
					$("#vacaturen").append("<tr id='info' class='tr'><td>Gewilde Werkvlakken: </td><td>" + arrays[0] + "</td><td>" + arrays[1] + "</td><td>" + arrays[2] + "</td></tr>");
					for (var i = 3; i < arrays.length;) {
						$("#vacaturen").append("<tr><td></td><td>" + arrays[i] + "</td><td>" + arrays[i + 1] + "</td><td>" + arrays[i + 2] + "</td></tr>");
						i = i + 3
					};
					
					$("#vacaturen").append("<tr id='info' class='tr'><td>voorgaande Werkvlakken: </td><td>" + arrays1[0] + "</td><td>" + arrays1[1] + "</td><td>" + arrays1[2] + "</td></tr>");
					for (var i = 3; i < arrays1.length;) {
						$("#vacaturen").append("<tr><td></td><td>" + arrays1[i] + "</td><td>" + arrays1[i + 1] + "</td><td>" + arrays1[i + 2] + "</td></tr>");
						i = i + 3
					};

					$("#vacaturen").append('<tr><td>Uitleg:</td><td colspan="3"><form><textarea placeholder="Uitleg" id="uitleg" name="uitleg" onkeyup="auto_grow(this)"></textarea></form></td></tr>');
						
					$("#vacaturen").append('<tr><td></td><td colspan="3"><input type="button" value="Uitleg Plaatsen" id="uitlegPlaatsen" onclick="uitlegplaatsen()"/></td></tr>');
					
					
					
					
					$("#vacaturenMob").empty(); //mobiel
					var array = data.gewildeWerkvlakken.replace("{","")
					var arrayComp = array.replace("}","")
					var arrays = arrayComp.split(",");
					
					var array1 = data.voorgaandeWerkvlakken.replace("{","")
					var arrayComp1 = array1.replace("}","")
					var arrays1 = arrayComp1.split(",");
					
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Naam:</td><td>" + data.voornaam + " " + data.achternaam + "</td><td>Geboortedatum:</td><td> "+ data.geboortedatum +"</td></tr>");		
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Postcode:</td><td> "+ data.postcode +"</td><td>Plaats: </td><td>"+ data.woonplaats +"</td></tr>");
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Email:</td><td> "+ data.email +"</td><td>Minimumloon:</td><td> "+ data.minimumloon +"</td></tr>");
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Linkedin:</td><td> "+ data.link +"</td><td>Telefoonnummer:</td><td> 0"+ data.telefoonnummer +"</td></tr>");
					
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>gewilde Werkvlakken: </td><td>" + arrays[0] + "</td></tr>");
					for (var i = 1; i < arrays.length; i++) {
						$("#vacaturenMob").append("<tr><td></td><td>" + arrays[i] + "</td></tr>");
					};
					
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Voorgaande Werkvlakken: </td><td>" + arrays1[0] + "</td></tr>");
					for (var i = 1; i < arrays1.length; i++) {
						$("#vacaturenMob").append("<tr><td></td><td>" + arrays1[i] + "</td></tr>");
					};
					
					$("#vacaturenMob").append('<tr><td>Uitleg:</td><td><form><textarea placeholder="Uitleg" id="uitleg" name="uitleg" onkeyup="auto_grow(this)"></textarea></form></td></tr>');
	
					$("#vacaturenMob").append('<tr><td></td><td><input type="button" value="Uitleg Plaatsen" id="uitlegPlaatsen" onclick="uitlegplaatsen()"/></td></tr>');
			},
			
			error:function (data) {
				console.log("hoi");
				},
		});
}

function red(){
	window.location="zoek.html";
}

function werkvlakken(){
	window.location="werkvlakken.html";
}

function uitlegplaatsen(){
	if($("#uitleg").val() == ""){
		$("#modal").html('<div>Er is geen uitleg ingevuld</div><input type="button" id="Oke" onclick="nee()" value="oke">')
		modal.style.display = "block";
	}else{
		$("#modal").html('<div>Weet u zeker dat u deze uiteg wil plaatsen?</div><div> ' + $("#uitleg").val() + '</div><input type="button" id="Oke" onclick="plaats()" value="Ja"><input type="button" id="nee" onclick="nee()" value="nee">')
		modal.style.display = "block";
	}
}

function nee(){
	modal.style.display = "none";
}

function plaats(){
	var uri = "/restservices/data/reactie/" + window.sessionStorage.getItem("id") + "/" + window.sessionStorage.getItem("role") + "/" + window.sessionStorage.getItem("vacatureID") + "/" + $("#uitleg").val();
	$.ajax(uri, {
		type: "put",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function(response) {
			$("#modal").html('<div>De uitleg is opgeslagen</div><input type="button" id="Oke" onclick="away()" value="oke">')
		},
		error: function(response) {
			$("#modal").html('<div>er ging iet fout bij het opslaan</div><input type="button" id="Oke" onclick="nee()" value="oke">')
		},
	});
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function away(){
	var data = window.sessionStorage.getItem("role")
	window.location= data +".html";
}

function logout(){
	window.sessionStorage.clear();
	window.location="https://ipasswebservice.herokuapp.com/";
}

//Get the modal
var modal = document.getElementById('myModal');
