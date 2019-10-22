//Set focus on Name input
$("#name").focus();

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
      } else {
        $(this).prop('disabled', false);
    }
  })
});
//Payment Info
$("#payment option:contains(Select Payment Method)").toggle();
$("#payment option").eq(1).attr('selected', true);
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


//Validation Messages

//Extra Credit
