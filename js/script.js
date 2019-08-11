//////////////////////////////////////////////////////////////FOCUS ON THE FIRST FIELD SECTION/////////////////////////////////////////////////////////////////////////// 

$('#name').focus();
$('#other-title').hide();//started out here by creating this element in html and hiding it
//this way if JavaScript is disabled on browser, the box will still show up in HTML

/////////////////////////////////////////////////////////////////////JOB ROLE SECTION//////////////////////////////////////////////////////////////////////////////////////////////
$('#title').change(function () {
    if ($(this).val() === 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });///function to show "other title" input field when someone selects it from the list

///////////////////////////////////////////////////////////////////////T-SHIRT SECTION///////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////ACTIVITY REGISTRATION SECTION//////////////////////////////////////////////////////////////////////
let totalCost = 0;    ///start by letting the total cost be '0'
$('.activities').append("<span id= 'totalCost'></span>"); //append this span element which will later be used to show total cost of classes

$(":checkbox").on("change", function() {///event listener for checking of box

    let parentText = $(this)[0].parentElement.innerText; //returns parent label text of checkbox selected 
    let dollarAmount = parentText.indexOf("$");  //returns the dollar index of the box selected 
    let activityCost = parentText.slice(dollarAmount + 1);  //gets the actual cost of the activity to be stored and later used 

   
        if ($(this)[0].checked) { //if selected
      totalCost += parseInt(activityCost);//returns back a number value and adds it to total cost
    }   else {
      totalCost -= parseInt(activityCost);//if unchecked, it removes it from the total cost, returns it to be a number as well to avoid NaN
    }
      let showTotalCost = $('#totalCost');//create variable to store the total cost in 

    showTotalCost.text("Total Cost: $ " + totalCost);  //Assign the total activity cost to the show the totcal cost in the span element above

    let boxCheckedDashIndex = parentText.indexOf("\u2014");  
    let boxCheckedCommaIndex = parentText.indexOf(",");
    let boxCheckedDateAndTime = parentText.slice(boxCheckedDashIndex + 1, boxCheckedCommaIndex);
  

    //a loop designed to go through all the activities. Add it to the total if it doesn't conflict. 
    //disable if time is conflicting and don't add to total amount displayed. 

      for (let i = 0; i < $(":checkbox").length; i++) {
      let checkBoxParentText = $(":checkbox")[i].parentElement.innerText;
      let checkBoxDashIndex = checkBoxParentText.indexOf("\u2014");
      let checkBoxCommaIndex = checkBoxParentText.indexOf(",");
      let dateAndTime = checkBoxParentText.slice(checkBoxDashIndex + 1, checkBoxCommaIndex);
     
        if (boxCheckedDateAndTime == dateAndTime && parentText != checkBoxParentText) {
        if ($(this)[0].checked) {
          $(":checkbox")[i].disabled = true;
        } else {
         $(":checkbox")[i].disabled = false;
        }
     }
      }
});

/////////////////////////////////////////////////////////////////////////DISPLAYING PAYMENT SECTION////////////////////////////////////////////////////////////////////////


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
  ////////////////////////////////////////////////////////FORM VALIDATION:///////////////////////////////////////////////////////////////////////////////////

//created these to call on later and manipulate to give users real time confirmation if what they have put in each field is valid 
let emailInput = document.getElementById('mail');
let nameInput = document.getElementById('name');
let ccInput = document.getElementById('cc-num');
let zipInput = document.getElementById('zip');
let cvvInput = document.getElementById('cvv');


//name validation
const validName = () => {
  const name = $('#name').val();
  const checkName = /^[a-zA-Z\s]+$/.test(name);//regex for checking name
  return checkName;
}

const nameValidation = () => {
  if (validName()) {
    nameInput.style.borderColor = '#00CC00'//change real time when input is valid to make box green
    return true
  } else {
    nameInput.style.borderColor = '#FF0000'//change real time when input is valid to make box red
    return false
  }
}

$('#name').on('change', function () {//event listener for name
  nameValidation();
});


///email validation
const validEmail = () => {
  const email = $('#mail').val();
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);//regex for checking email
  return checkEmail;
}
const emailValidation = () => {
  if (validEmail()) {
    emailInput.style.borderColor = '#00CC00'//change real time when input is valid to make box green
    return true
  } else {
    emailInput.style.borderColor = '#FF0000'//change real time when input is valid to make box red
    return false
  }
}
$('#mail').on('change', function() {//event listener for email
  emailValidation();
});

//cc number validation

const validCreditCard = () => {
  const creditCard = $('#cc-num').val();
  const checkCreditCard = /^[0-9]{13,16}$/.test(creditCard);//regex for checking cc number
  return checkCreditCard;
}

const creditCardValidation = () => {
  if (validCreditCard()) {
    ccInput.style.borderColor = '#00CC00'//change real time when input is valid to make box green
    return true
  } else {
    ccInput.style.borderColor = '#FF0000'//change real time when input is valid to make box red
    return false
  }
}

$('#cc-num').on('change', function () {//event listener for cc number
  creditCardValidation();
});

//zip code validation
const validZipCode = () => {
  const zipCode = $('#zip').val();
  const checkZipCode = /^\d{5}(-\d{4})?$/.test(zipCode);//regex for checking zip code 
  return checkZipCode;
}

const zipCodeValidation = () => {
  if (validZipCode()) {
    zipInput.style.borderColor = '#00CC00'//change real time when input is valid to make box green
    return true
  } else {
    zipInput.style.borderColor = '#FF0000'//change real time when input is valid to make box red
    return false
  }
}

$('#zip').on('change', function() {//event listener for zip code
  zipCodeValidation();
});

//cvv code validation
const validCvv = () => {
  const cvv = $('#cvv').val();
  const checkCvv = /^[0-9]{3}$/i.test(cvv);//regex for checking cvv
  return checkCvv;
}

const cvvValidation = () => {
  if (validCvv()) {
    cvvInput.style.borderColor = '#00CC00'//change real time when input is valid to make box green
    return true
  } else {
    cvvInput.style.borderColor = '#FF0000'//change real time when input is valid to make box red
    return false
  }
}

$('#cvv').on('change', function () {//event listener for cvv
  cvvValidation();
});
// check to see which payment someone has selected. if paypal or bitcoin, this will now be 'true' and allow to be submitted. if cc, it loops through validations and checks to see if valid
const confirmedPayment = () => {
  const selectedPayment = $('#payment :selected').text();
  if (selectedPayment === 'PayPal' || selectedPayment === 'Bitcoin') {
    return true;
  }
  if (selectedPayment === 'Credit Card') {
    if(validCreditCard() && validZipCode() && validCvv()) {
    return true;
  } else {
    return false;
  }
}
}
//checking ot make sure at least 1 activity has been selected
const validActivitiesChecked = () => {
  const activityCheck = $('.activities input:checkbox:checked').length;
  const activtyTitle = $('.activities legend');
  if (activityCheck >= 1) {
    return true;
  } else {
    activtyTitle.css('color', 'red');//onced submitted and if there is no selection of activity, title of doc section will turn red! 
    return false;
  }
}


//////loops through all the validations created above and ensures that each one of them are filled out accordingly before submitting 
$('button').on('click', function(e) {
  if (confirmedPayment() && nameValidation() && emailValidation() && validActivitiesChecked()) {
  } else {
    e.preventDefault();
    alert('Please review fields in red and/or blank. Thanks! ');///if an error/doesn't meet formatting rules, throws up messsage to check those fields in red or blank
  }
});