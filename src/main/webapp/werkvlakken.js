var tellerAanpassen = 0;
var tellerToevoegen = 0;
var data = null;

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
			var array = data.gewildeWerkvlakken.replace("{","")
			var arrayComp = array.replace("}","")
			var voorArray = data.voorgaandeWerkvlakken.replace("{","")
			var voorArrayComp = voorArray.replace("}","")
			if (voorArrayComp != ""){
				var voorArrays = voorArrayComp.split(",")
				for (var i = 0; i < voorArrays.length; i++) {
					if(voorArrays[i] == "webdeveloper"){
						$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend' + tellerAanpassen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(voorArrays[i] == "administaratiefmedewerker"){
						$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend' + tellerAanpassen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker" selected>Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(voorArrays[i] == "directie"){
						$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend' + tellerAanpassen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie" selected>Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(voorArrays[i] == "teamleider"){
						$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend' + tellerAanpassen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider" selected>teamleider</option></select>')
					}
					tellerAanpassen += 1;
				}
			}else{
				$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend' + tellerAanpassen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
				tellerAanpassen += 1;
			}
			$("#aanFoot").append('<tr><td class="td"><input type="button" value="+" id="plusAanpassen" onclick="aanpassenNewLine()"/></td><td class="td"><input type="button" value="-" id="minAanpassen" onclick="aanpassenWegLine()"/></td></tr>')
			$("#aanFoot").append('<tr><td colspan="2"><input type="button" value="Toevoegen" id="aanpassen" onclick="datas()"/></td></tr>')
			
			if (arrayComp != ""){
				var arrays = arrayComp.split(",")
				for (var i = 0; i < arrays.length; i++) {
					if(arrays[i] == "webdeveloper"){
						$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken' + tellerToevoegen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(arrays[i] == "administaratiefmedewerker"){
						$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken' + tellerToevoegen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker" selected>Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(arrays[i] == "directie"){
						$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken' + tellerToevoegen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie" selected>Directie</option><option value="teamleider">teamleider</option></select>')
					}
					if(arrays[i] == "teamleider"){
						$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken' + tellerToevoegen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider" selected>teamleider</option></select>')
					}
					tellerToevoegen += 1;
				}
			}else{
				$("#werkvlakkenToevoegen").append('<select name="werkvlak' + tellerToevoegen + '"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">Administaratief Medewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
				tellerToevoegen += 1;
			}

			$("#toeFoot").append('<tr><td class="td"><input type="button" value="+" id="plus" onclick="newLine()"/></td><td class="td"><input type="button" value="-" id="min" onclick="wegLine()"/></td></tr>')
			$("#toeFoot").append('<tr><td colspan="2"><input type="button" value="Toevoegen" id="toevoegend" onclick="changeData()"/></td></tr>')
			

				},
		
		error:function (data) {
			},
	});
}

function changeData(){
	data = "gewildewerkvlakken";
	aanpassen()
}

function datas(){
	data = "voorgaandewerkvlakken"
	aanpassen()
}

function aanpassen(){
	$("#modal").html('<div>weet u zeker dat u de werkvlakken op wilt slaan?</div><input type="button" id="Oke" onclick="opslaan()" value="Ja"><input type="button" id="Oke" onclick="modallenNo()" value="Nee">')
	modal.style.display = "block";
}

function opslaan(){
	var array = [];
	var teller;
	if(data == "gewildewerkvlakken"){
		teller = tellerToevoegen;
		teller -= 1;
		while(teller >= 0){
			array.push($("#werkvlakken" + teller).val());
			teller -= 1;
		}
	}
	
	if(data == "voorgaandewerkvlakken"){
		teller = tellerAanpassen;
		teller -= 1;
		while(teller >= 0){
			array.push($("#werkvlakkenAanpassend" + teller).val());
			teller -= 1;
		}
	}
	arrayAsAString = array.join(",");
	$.ajax({
		url: "/IPASS/restservices/data/werkvlakken/"+ data + "/" + window.sessionStorage.getItem("id") +"/"+ arrayAsAString,
		method: "POST",
		beforeSend: function (xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
		},
		success: function (data) {
			$("#modal").html('<div>de werkvlakken zijn opgeslagen</div><input type="button" id="Oke" onclick="away()" value="Oke">')
			modal.style.display = "block";
				},
		
		error:function (data) {
			},
	});
}

function newLine(){
	$("#werkvlakkenToevoegen").append('<select id="werkvlakken'+ tellerToevoegen +'" name="werkvlakken'+ tellerToevoegen +'"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">administaratiefmedewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
	tellerToevoegen += 1;
	
}

function wegLine(){
	if(tellerToevoegen != 0){
		tellerToevoegen -= 1;
		$("#werkvlakken" + tellerToevoegen).remove()
	}
}

function aanpassenWegLine(){
	if(tellerAanpassen != 0){
		tellerAanpassen -= 1;
		$("#werkvlakkenAanpassend" + tellerAanpassen).remove()
	}
}

function aanpassenNewLine(){
	$("#werkvlakkenAanpassen").append('<select id="werkvlakkenAanpassend'+ tellerAanpassen +'" name="werkvlakkenAanpassend'+ tellerAanpassen +'"><option value="webdeveloper">Webdeveloper</option><option value="administaratiefmedewerker">administaratiefmedewerker</option><option value="directie">Directie</option><option value="teamleider">teamleider</option></select>')
	tellerAanpassen += 1;
	
}

function modallenNo(){
	modal.style.display = "none";
}

function away(){
	window.location="http://localhost:8080/IPASS/" + window.sessionStorage.getItem("role") + ".html";
}

function red(){
	window.location="http://localhost:8080/IPASS/bewerken.html";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
