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
			url: "/restservices/data/vacature/" + window.sessionStorage.getItem("id") + "/" + window.sessionStorage.getItem("role") + "/" + window.sessionStorage.getItem("vacatureID"),
			method: "GET",
			beforeSend: function (xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
			},
			success: function (data) {
					$("#vacaturen").empty();
					var array = data.werkvlakken.replace("{","")
					var arrayComp = array.replace("}","")
					var arrays = arrayComp.split(",");
					$("#vacaturen").append("<tr id='info' class='tr'><td>Bedrijf:</td><td>" + data.bedrijf + "</td><td>Functie:</td><td> "+ data.functie +"</td></tr>");		
					$("#vacaturen").append("<tr id='info' class='tr'><td>Postcode:</td><td> "+ data.postcode +"</td><td>Plaats: </td><td>"+ data.plaats +"</td></tr>");
					$("#vacaturen").append("<tr id='info' class='tr'><td>Aangeboden door:</td><td> "+ data.parVoornaam + " "+ data.parAchternaam +"</td></tr>");
					if(data.uitleg != "" ){
						$("#vacaturen").append("<tr id='info' class='tr'><td>Uitleg:</td><td colspan='3'>" + data.uitleg + "</td></tr>");
					}
					$("#vacaturen").append("<tr id='info' class='tr'><td>Werkvlakken: </td><td>" + arrays[0] + "</td><td>" + arrays[1] + "</td><td>" + arrays[2] + "</td></tr>");
					for (var i = 3; i < arrays.length;) {
						$("#vacaturen").append("<tr><td></td><td>" + arrays[i] + "</td><td></td>>" + arrays[i + 1] + "</td><td></td><td>" + arrays[i + 2] + "</td></tr>");
						i = i + 3
					};
					if(data.reactie != ""){
						$("#vacaturen").append('<tr><td>Reactie:</td><td colspan="3"><form><textarea placeholder="Reactie" id="reactie" name="reactie" onkeyup="auto_grow(this)">'+ data.reactie +'</textarea></form></td></tr>');
					}else{
						$("#vacaturen").append('<tr><td>Reactie:</td><td colspan="3"><form><textarea placeholder="Reactie" id="reactie" name="reactie" onkeyup="auto_grow(this)"></textarea></form></td></tr>');
					}
					$("#vacaturen").append('<tr><td></td><td colspan="3"><input type="button" value="Reactie Plaatsen" id="reactiePlaatsen" onclick="reactieplaatsen()"/></td></tr>');
					
					$("#vacaturenMob").empty(); //mobiel
					var array = data.werkvlakken.replace("{","")
					var arrayComp = array.replace("}","")
					var arrays = arrayComp.split(",");
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Bedrijf:</td><td>" + data.bedrijf + "</td></tr><tr><td>Functie:</td><td> "+ data.functie +"</td></tr>");		
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Postcode:</td><td> "+ data.postcode +"</td></tr><tr><td>Plaats: </td><td>"+ data.plaats +"</td></tr>");
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Aangeboden door:</td><td> "+ data.parVoornaam + " "+ data.parAchternaam +"</td></tr>");
					if(data.uitleg != "" ){
						$("#vacaturenMob").append("<tr id='info' class='tr'><td>Uitleg:</td><td colspan='3'>" + data.uitleg + "</td></tr>");
					}
					$("#vacaturenMob").append("<tr id='info' class='tr'><td>Werkvlakken: </td><td>" + arrays[0] + "</td></tr>");
					for (var i = 1; i < arrays.length; i++) {
						$("#vacaturenMob").append("<tr><td></td><td>" + arrays[i] + "</td></tr>");
					};
					if(data.reactie != ""){
						$("#vacaturenMob").append('<tr><td>Reactie:</td><td><form><textarea placeholder="Reactie" id="reactie" name="reactie" onkeyup="auto_grow(this)">'+ data.reactie +'</textarea></form></td></tr>');
					}else{
						$("#vacaturenMob").append('<tr><td>Reactie:</td><td><form><textarea placeholder="Reactie" id="reactie" name="reactie" onkeyup="auto_grow(this)"></textarea></form></td></tr>');
					}
					$("#vacaturenMob").append('<tr><td></td><td><input type="button" value="Reactie Plaatsen" id="reactiePlaatsen" onclick="reactieplaatsen()"/></td></tr>');
			},
			
			error:function (data) {
				console.log("hoi");
				},
		});
}

function red(){
	window.location="bewerken.html";
}

function werkvlakken(){
	window.location="werkvlakken.html";
}

function reactieplaatsen(){
	if($("#reactie").val() == ""){
		$("#modal").html('<div>Er is geen reactie ingevuld</div><input type="button" id="Oke" onclick="nee()" value="oke">')
		modal.style.display = "block";
	}else{
		$("#modal").html('<div>Weet u zeker dat u deze reactie wil plaatsen?</div><div> ' + $("#reactie").val() + '</div><input type="button" id="Oke" onclick="plaats()" value="Ja"><input type="button" id="nee" onclick="nee()" value="nee">')
		modal.style.display = "block";
	}
}

function nee(){
	modal.style.display = "none";
}

function plaats(){
	var uri = "/IPASS/restservices/data/reactie/" + window.sessionStorage.getItem("id") + "/" + window.sessionStorage.getItem("role") + "/" + window.sessionStorage.getItem("vacatureID") + "/" + $("#reactie").val();
	$.ajax(uri, {
		type: "put",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function(response) {
			$("#modal").html('<div>De reactie is opgeslagen</div><input type="button" id="Oke" onclick="away()" value="oke">')
		},
		error: function(response) {
			$("#modal").html('<div>er ging iet fout bij het opslaan</div><input type="button" id="Oke" onclick="nee" value="oke">')
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
