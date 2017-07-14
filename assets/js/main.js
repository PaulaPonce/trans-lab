$(document).ready(function(){
	//localStorage
	loadSettings();

	//Initialize SideNav
	$("#activate-sideNav").sideNav();

	//Index validation
	$("#sign-in").on("click", validateForm);
	var email;
	var pass;

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
			saveSettings();
		}
	}

	//Add Card
	$("#addCard-btn").on("click", addCard);
	var cardNumber;

	function addCard(){
		cardNumber = $("#card-number").val();
		$(".collection").append("<li class='collection-item left-align'>" + cardNumber + "</li>");
		clear();
	}
	function clear(){
		$(":input").val("")
	}
})

//localStorage
function loadSettings(){
	$("#index-email").append("<span class='email white'>" + localStorage.email + "</span>");
	//$("#email").val(localStorage.correo);
}

function saveSettings(){
	localStorage.email = $("#email").val();
}