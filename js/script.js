$('#name').focus();//focus in on the first input value 
$('#other-title').hide();//started out here by creating this element in html and hiding it
//this way if JavaScript is disabled on browser, the box will still show up in HTML


$('#title').change(function () {
    if ($(this).val() === 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });///function to show "other title" input field when someone selects it from the list


                //////////////////////////T-SHIRT SECTION/////////////////////////////////////////////////

$('#color').prepend('<option value="selecttheme">Please select a T-shirt theme</option>');//prepended option to not say "select t-shirt"
$('#color').val('selecttheme');//set the value of the dropdownbox to be "select t-shirt"
$('#color option').hide();//hide all the children of the 'color' option which only left the actual title of the box

$('#design').children().eq(0).hide();//once someone clicks on a design option, this removes the "select theme" field from list
//makes it a bit more user friendly! 


  // 2. Attach a 'change' event listener to the 'Design' menu
  $('#design').change(function () {
    // if the value is js puns, run this code
    if ($("#design").val() === "js puns") {
      $('#color').show();
      $('#color option').eq(1).show();
      $('#color option').eq(2).show();
      $('#color option').eq(3).show();
      // shows the shirts that line up with that course
      $('#color option').eq(4).hide();
      $('#color option').eq(5).hide();
      $('#color option').eq(6).hide();
      $('#color option').eq(0).hide();//since i prepended this item earlier, i need to hide and remove it 
      $('#color').val('cornflowerblue');//default it back to option number1
    }
    // else if heart js is selected, run this
    else if ($("#design").val() === "heart js") {
      $('#color').show();
      $('#color option').eq(4).show();
      $('#color option').eq(5).show();
      $('#color option').eq(6).show();
      // show the shirts that line up with 'heart js'
      $('#color option').eq(1).hide();
      $('#color option').eq(2).hide();
      $('#color option').eq(3).hide();
      $('#color option').eq(0).hide();
      $('#color').val('tomato');
    }
  });



                //////////////////////////PAYMENT INFO/////////////////////////////////////////////////


$('#payment').val('credit card');//defaults to CC info

$('#credit-card').next().hide();//hide the paypal message
$('#credit-card').next().next().hide();//hide the bitcoin message

$('#payment').change(function () {
  if ($("#payment").val() === "paypal") {
    $('#credit-card').next().show();
    $('#credit-card').next().next().hide();
    $('#credit-card').hide();   
  } else if ($("#payment").val() === "bitcoin") {
    $('#credit-card').next().next().show();
    $('#credit-card').next().hide();
    $('#credit-card').hide(); 
  } else if ($("#payment").val() === "credit card") {
    $('#credit-card').show();
    $('#credit-card').next().hide();
    $('#credit-card').next().next().hide();
  }
});
  //FORM VALIDATION:

let nameInput = document.getElementById('name');
let emailInput = document.getElementById('mail');

nameInput.addEventListener('blur', () => {
  validName = /^[a-zA-Z\s]+$/.test(nameInput.value)
  if (validName) {
    nameInput.style.backgroundColor = '#00CC00'
  } else {
    nameInput.style.backgroundColor = '#FF0000'
    $('#name').change('<input placeholder = "Must Be Valid Name"></input>');
  }
});

emailInput.addEventListener('blur', () => {
  validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)
  if (validEmail) {
    emailInput.style.backgroundColor = '#00CC00'
  } else {
    emailInput.style.backgroundColor = '#FF0000'
  }
});