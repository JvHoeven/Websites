function register(){
	if($("#username").val() == "" || $("#password").val() == "" || $("#password2").val() == "" || $("#voornaam").val() == "" || $("#achternaam").val() == "" || $("#geboortedatum").val() == "" || $("#woonplaats").val() == "" || $("#Postcode").val() == "" || $("#email").val() == "" || $("#minimumloon").val() == "" || $("#telefoonnummer").val() == ""){
		$("#modal").html('<div>vul alle velden met een * in</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
		modal.style.display = "block";
	}else{
	if($("#password").val() != $("#password2").val()){
		$("#modal").html('<div>De wachtwoorden komen niet overeen</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
		modal.style.display = "block";
	}else{
		$.ajax({
			url: "/restservices/data/geb",
			type: "post",
			data : $("#register").serialize(),

			success: function (data) {
				if(data == null){
					$.ajax({
						url: "/restservices/data",
						type: "post",
						data : $("#register").serialize(),

						success: function (data) {
							var link = "'https://ipasswebservice.herokuapp.com/'"
							$("#modal").html('<div>Het account is aangemaakt</div><input type="button" id="Oke" onclick="window.location=' + link + '" value="Oke">')
							modal.style.display = "block";
						},
						error: function(response) {
							$("#modal").html('<div>Er is iets fout gegaan</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
							modal.style.display = "block";
						}
					});
				}else{
					$("#modal").html('<div>'+ data + '</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
					modal.style.display = "block";
				}
			},
			error: function(response) {
				$("#modal").html('<div>Er is iets fout gegaan</div><input type="button" id="Oke" onclick="modallenNo()" value="Oke">')
				modal.style.display = "block";
			}
		});
	}
	}
};

function modallenNo(){
	modal.style.display = "none";
}

function away(){
	window.location="https://ipasswebservice.herokuapp.com/";
}

//Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
