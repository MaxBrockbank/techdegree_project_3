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
let subTotal = 0;
let totalCost= $("<label>Total: $"0"</label>");
$(".activities").append($(totalCost));

$(".activities").change(function(e){
  var clicked = e.target;
  let dataCost = e.target.getAttribute("data-cost").slice(1);
  let costInteger = parseInt(dataCost);
  if($("clicked:checked")){
    subTotal += costInteger
  } else{
    subTotal-costInteger
  }
totalCost.append(subTotal);
})


//Payment Info

//Form Validation

//Validation Messages

//Extra Credit
