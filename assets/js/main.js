$(document).ready(function(){
	//Local Storage
	loadSettings();
	loadCardNumber();

	//Initialize SideNav
	$("#activate-sideNav").sideNav();

	//INDEX VALIDATION
	$("#sign-in").on("click", validateForm);
	var email; //input email
	var pass; //input password

	function validateForm(event){
		event.preventDefault();
		email = $("#email").val();
		pass = $("#pass").val();

		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			$(".email-container").append("<label class='alert-label'>Verifique su email</label>");
		}else if(!/[0-9]/.test(pass) || pass.length >= 8){
			$(".password-container").append("<label class='alert-label'>Máximo 8 caracteres. Solo se permiten números</label>");
		}else{
			window.location.href="home.html";
			saveSettings(); //localStorage
		}
	}

	//ADD CARD NUMBER
	$("#addCard-btn").on("click", addCard);
	var cardNumber; //input card number
	var idCounter = 1; //li element id

	function addCard(){
		cardNumber = $("#card-number").val();
		//add cards to list on profile.html
		$(".collection").append("<li id='card-" + idCounter + "' class='collection-item left-align'>" + cardNumber + "</li>");
		idCounter ++;
		saveCardNumber(); //localStorage
		clear(); //clear input
		
	}

	//BIP CARD BALANCE CHECK
	$("#check-balance").on("click", checkCardBalance);

	function checkCardBalance(){
		var bipNumberSelect = $("#select-card option:selected").val(); //select
		var bipNumberInput = $("#card-number").val(); //input

		if(bipNumberSelect != 0){ //Select value Card Balance
			//$("#card-number").attr('disabled');
			$.ajax({
			url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?',
			type: 'GET',
			dataType: 'json',
			data: {bip: bipNumberSelect},
			})
			.done(function(response1) {
				console.log("success");
				$("#balance-container").append("<h6 class='grey darken-3'>SALDO TOTAL</h6><p class='amber darken-2'>" + response1.saldoTarjeta + "</p>")
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}else if(bipNumberInput != ""){ //Input value Card Balance
			$.ajax({
			url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?',
			type: 'GET',
			dataType: 'json',
			data: {bip: bipNumberInput},
			})
			.done(function(response2) {
				console.log("success");
				$("#balance-container").append("<h6 class='grey darken-3'>SALDO TOTAL</h6><p class='amber darken-2'>" + response2.saldoTarjeta + "</p>")
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}else{
			alert("Debe ingresar el número de su tarjeta Bip!");
		}
	}

	//CALCULATE BUS FARE
	$("#calculate-fare").on("click", calculate);

	function calculate(){
		var fare = $("#fare option:selected").val(); //bus fare
		var bipNumber = $("#select-card option:selected").val(); //card number

		if(fare != 0 && bipNumber != 0){
			$.ajax({
			url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?',
			type: 'GET',
			dataType: 'json',
			data: {bip: bipNumber},
			})
			.done(function(response) {
				console.log("success");
				$("#fare-container").append("<h6 class='grey darken-3'>COSTO PASAJE</h6><p class='amber darken-2'>$" + fare + "</p>");
				$("#price-container").append("<h6 class='grey darken-3'>SALDO FINAL</h6><p class='amber darken-2'>$" + ((response.saldoTarjeta.slice(1).replace(".", "")) - fare) + "</p>");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}else{
			alert("Debe seleccionar una opción");
		}
	}

	//function to clear inputs
	function clear(){
		$(":input").val("")
	}
})

//LOCAL STORAGE

//Email storage
function loadSettings(){
	//add email to profile.html
	$("#index-email").append("<span class='email white'>" + localStorage.email + "</span>");
	//$("#email").val(localStorage.correo);
}
function saveSettings(){
	localStorage.email = $("#email").val();
}

//Card number storage
function loadCardNumber(){
	//add cards to select on balance-check.html
	$("#select-card").append("<option value='" + localStorage.card + "'>" + localStorage.card + "</option>"); //añade al select solo el último número de tarjeta ingresado en el input
}
function saveCardNumber(){
	localStorage.card = $("#card-number").val();
}