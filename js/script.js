//Global variables
const $name = $("#name");
const $email = $("#mail");
const $ccNum = $("#cc-num");
const $ccZip = $("#zip");
const $ccCVV = $("#cvv");
//Name Regex from https://andrewwoods.net/blog/2018/name-validation-regex/
const nameValid = /^[A-Za-z]+([\ A-Za-z]+)*/;
// Email Regex from https://www.emailregex.com
const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Credit Card Regex from https://www.regular-expressions.info/creditcard.html
const ccValid = /^\b\d{13,16}\b$/;

const zipValid = /^\d{5}$/;

const cvvValid = /^\d{3,4}$/;
//Set focus on Name input
$name.focus();

//Job Role Section//
$("#other-title").hide();
$("#title").change(function(){
  if($("#title").val() === "other"){
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

//T-Shirt//
  //Hide the 'Select Theme' option
  $("#design option:contains(Select Theme)").toggle();

  //Hide Color label and select until theme is selected//
  $("#colors-js-puns").hide();

  //Theme Selection//
  $("#design").change(function(){
    $("#colors-js-puns").show();
    if($('#design').val() === 'js puns'){
       $("#color option").hide();
       $("#color option:contains(JS Puns shirt only)").show();
       $("#color option").eq(0).attr('selected', true);
     }else if ($('#design').val() === 'heart js'){
       $("#color option").hide();
       $("#color option:contains(JS shirt only)").show();
       $("#color option").eq(3).attr('selected', true);
     }
})


//Register for Activities
let totalCost= $("<label>Total: $0</label>");
$(".activities").append($(totalCost));
let subTotal = 0;
$(".activities").change(function(e){
  //total cost//
  let dataCost = $(e.target).data("cost").slice(1);
  let costInteger = parseInt(dataCost);
  if($(e.target).prop('checked')){
    subTotal += costInteger;
  } else{
    subTotal -= costInteger;
  }
  totalCost.text("Total: $" + subTotal);
  //conflicting times//
  $('.activities input').each(function(){
    if($(e.target).data('day-and-time') === $(this).data('day-and-time') && e.target!==this && $(e.target).prop('checked')){
        $(this).prop('disabled', true);
      } else if($(e.target).prop('checked')===false){
        $(this).prop('disabled', false);
    }
  })

  //error message for activity section

  if($(".activities input:checkbox:checked").length >= 1){
  $("#activityError").remove();
  } else if($(".activities input:checkbox:checked").length < 1) {
    $(".activities legend").append("<label id='activityError' class = 'error'>Activity Selection Required<label>")
  }

});


//Payment Info
$("#payment option:contains(Select Payment Method)").toggle();
$("#payment option").eq(1).attr('selected', true);
$("#paypal").hide();
$("#bitcoin").hide();
$("#payment").change(function(e){
  function paymentOption(id){
    $("#payment").parent().children("div").hide();
    $(id).show();
  }
  if($("#payment").val() === "Credit Card"){
    paymentOption("#credit-card");
  } else if($("#payment").val() === "PayPal"){
    paymentOption("#paypal");
  } else if($("#payment").val() === "Bitcoin"){
    paymentOption("#bitcoin");
  }
})


//Form Validation

//form validation function
function inputValidation (element, regex, message, id){
  let $id ="#"+ id;
  if(regex.test($(element).val())){
    $($id).remove();
  } else if(regex.test($(element).val()) === false && element.prev().attr('id')!== id) {
    $(element).before("<label id = "+id+" class = 'error'></label>");
    $(element).prev().text(message);
  }
}

// validators passed into the form validation function
$name.on('input', function(){
  inputValidation($name, nameValid, "Name Required", "nameError")
});
$email.on('input', function(){
  inputValidation($email, emailValid, "Valid E-mail Address Required", "emailError")
});
$ccNum.on('input', function(){
  if($ccNum.val().length <1){
  $("#ccnError1").remove();
  inputValidation($ccNum, ccValid, "Please Enter Credit Card Number", "ccnError0");
}else{
  $("#ccnError0").remove();
  inputValidation($ccNum, ccValid, "Must Be 13-16 Characters", "ccnError1");
  }
});
$ccZip.on('input', function(){
  if($ccZip.val().length < 1){
  $("#zipError1").remove();
  inputValidation($ccZip, zipValid, "Zip Code Required", "zipError0")
  }else {
  $("#zipError0").remove();
  inputValidation($ccZip, zipValid, "Must Be 5 Digits", "zipError1")
  }
});
$ccCVV.on('input', function(){
  if($ccCVV.val().length < 1){
  $("#cvvError1").remove();
  inputValidation($ccCVV, cvvValid, "CVV Required", "cvvError0")
  }else{
  $("#cvvError0").remove();
  inputValidation($ccCVV, cvvValid, "Must Be 3-4 Digits", "cvvError1")
  }
});

// input check function

//prevent default on submit button
function validInput(inputElement, regex) {
  if(inputElement.val()==""|| regex.test(inputElement.val()) === false){
    return false;
  } else{
    return true;
  }
};

$("form").on('submit',function(event){
  if(validInput($name, nameValid) === false || validInput($email, emailValid) === false|| $(".activities input:checkbox:checked").length < 1 || ($("#payment").val() === "Credit Card" && (validInput($ccNum, ccValid) === false||validInput($ccZip, zipValid) === false||validInput($ccCVV, cvvValid) === false))){
    event.preventDefault();
    $("input:empty").addClass('border-error')
    if($(".activities:checkbox:checked").length < 1){
      $(".activities legend").addClass("error");
    }
  }
});
