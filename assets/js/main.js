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

function clear(){
		$(":input").val("")
	}
	

	/*
//Balance check
	$("#check-balance").on("click", checkCardBalance);
	function checkCardBalance(){
		cardNumber = $("#card-number").val();
		
	}
	*/
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
	$("#select-card").append("<option value='" + localStorage.card + "'>card</option>"); //añade al select solo el último número de tarjeta ingresado en el input 
function saveCardNumber(){
	localStorage.card = $("#card-number").val();
}