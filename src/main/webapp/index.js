var worked = false;

function loging(){
	$.ajax({
		url: "/restservices/authentication",
		type: "post",
		data : $("#tryLogin").serialize(),

		success: function (response) {
			window.sessionStorage.setItem("sessionToken", response);
			getIdRole();
		},
		error: function(data) {
			modal.style.display = "block";
		}
	});
};

function getIdRole(){
	
	var data = $("#tryLogin").serialize();
	$.post("/restservices/data/idRole", data, function(response) {
		window.sessionStorage.setItem("id", response.id);
		window.sessionStorage.setItem("role", response.role);
		var rol = window.sessionStorage.getItem("role");
		window.location= rol +".html";
	});
}

function modallenNo(){
	modal.style.display = "none";
}

function register(){
	window.location="registreren.html";
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
			var rol = window.sessionStorage.getItem("role");
			window.location=rol +".html";
		},
	});
}

//Get the modal
var modal = document.getElementById('myModal');
