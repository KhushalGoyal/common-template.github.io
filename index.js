function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    if (this.id === "myInputThird") {
      b = document.createElement("DIV");
      b.innerHTML = `<div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-plus"></i></span>
        <input value="Add Customer"
          class="form-control" type="button"/>
      </div>`;
      b.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        debugger;
        // inp.value = this.getE("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
      });
      a.appendChild(b);
    }
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
var registrationForm = undefined;
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
setTimeout(() => {
  autocomplete(document.getElementById("myInput"), countries);
  autocomplete(document.getElementById("myInputSecond"), countries);
  autocomplete(document.getElementById("myInputThird"), countries);

}, 1000)

function submitCustomer() {
  var errorHTML = `
  <div class="helper-block">
    <div class="help-block with-errors">
      <ul class="list-unstyled">
        <li>Please fill in this field.</li>
      </ul>
    </div>
  </div>`;
  var contactForm = document.getElementById('contact_form').getElementsByClassName('form-group');
  let firstName = contactForm[0];
  let lastName = contactForm[1];
  let firstNameValue = firstName.getElementsByTagName('input')[0].value;
  let lastNameValue = lastName.getElementsByTagName('input')[0].value;
  debugger
  if (firstNameValue === "") {
    if (firstName.classList.contains("has-feedback")) {
      firstName.classList.remove("has-feedback", "has-error", "has-danger");
      firstName.removeChild(firstName.getElementsByClassName('helper-block')[0])
    }
    firstName.classList.add("has-feedback", "has-error", "has-danger");
    firstName.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (firstName.classList.contains("has-feedback")) {
      firstName.classList.remove("has-feedback", "has-error", "has-danger");
      firstName.removeChild(firstName.getElementsByClassName('helper-block')[0])
    }
  }
  if (lastNameValue === "") {
    if (lastName.classList.contains("has-feedback")) {
      lastName.classList.remove("has-feedback", "has-error", "has-danger");
      lastName.removeChild(lastName.getElementsByClassName('helper-block')[0])
    }
    lastName.classList.add("has-feedback", "has-error", "has-danger");
    lastName.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (lastName.classList.contains("has-feedback")) {
      lastName.classList.remove("has-feedback", "has-error", "has-danger");
      lastName.removeChild(lastName.getElementsByClassName('helper-block')[0])
    }
  }
  if (firstNameValue !== "" && lastNameValue !== "") {
    debugger;
  }
}

function submitProduct() {
  var errorHTML = `
  <div class="helper-block">
    <div class="help-block with-errors">
      <ul class="list-unstyled">
        <li>Please fill in this field.</li>
      </ul>
    </div>
  </div>`;
  var productForm = document.getElementById('product_form').getElementsByClassName('form-group');
  let productName = productForm[0];
  let productDescription = productForm[1];
  let productNameValue = productName.getElementsByTagName('input')[0].value;
  let productDesValue = productDescription.getElementsByTagName('textarea')[0].value;
  debugger
  if (productNameValue === "") {
    if (productName.classList.contains("has-feedback")) {
      productName.classList.remove("has-feedback", "has-error", "has-danger");
      productName.removeChild(productName.getElementsByClassName('helper-block')[0])
    }
    productName.classList.add("has-feedback", "has-error", "has-danger");
    productName.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (productName.classList.contains("has-feedback")) {
      productName.classList.remove("has-feedback", "has-error", "has-danger");
      productName.removeChild(productName.getElementsByClassName('helper-block')[0])
    }
  }
  if (productDesValue === "") {
    if (productDescription.classList.contains("has-feedback")) {
      productDescription.classList.remove("has-feedback", "has-error", "has-danger");
      productDescription.removeChild(productDescription.getElementsByClassName('helper-block')[0])
    }
    productDescription.classList.add("has-feedback", "has-error", "has-danger");
    productDescription.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (productDescription.classList.contains("has-feedback")) {
      productDescription.classList.remove("has-feedback", "has-error", "has-danger");
      productDescription.removeChild(productDescription.getElementsByClassName('helper-block')[0])
    }
  }
  if (productNameValue !== "" && productDesValue !== "") {
    debugger;
  }
}

function activateTab(activateTab, navClass, tabCon) {
  debugger
  let activeIndex = parseInt(activateTab.split("_")[0]) - 1
  var navClass = navClass;
  var tabContent = tabCon;
  let liEle = document.getElementsByClassName(navClass)[0].getElementsByTagName('li');
  let tabsEle = document.getElementsByClassName(tabContent)[0].getElementsByClassName('tab-pane');
  for (let index = 0; index < liEle.length; index++) {
    const element = liEle[index];
    element.classList.remove('active')
  }
  for (let index = 0; index < tabsEle.length; index++) {
    const element = tabsEle[index];
    element.classList.remove('active')
  }
  liEle[activeIndex].classList.add('active')
  tabsEle[activeIndex].classList.add('active')
}

function addBill() {
  var errorHTML = `
  <div class="helper-block">
    <div class="help-block with-errors">
      <ul class="list-unstyled">
        <li>Please fill in this field.</li>
      </ul>
    </div>
  </div>`;
  let billingForm = document.getElementById('billing_form');

  var billingFormGroup = document.getElementById('billing_form').getElementsByClassName('form-group');

  let productName = billingFormGroup[2];
  let customer = billingFormGroup[0];
  let quantity = billingFormGroup[3];
  let type = billingFormGroup[1];
  let price = billingFormGroup[4];

  let productNameValue = productName.getElementsByTagName('input')[0].value;
  let customerValue = customer.getElementsByTagName('input')[0].value;
  let quantityValue = quantity.getElementsByTagName('input')[0].value;
  let typeValue = type.getElementsByTagName('select')[0].value;
  let priceValue = price.getElementsByTagName('input')[0].value;

  if (productNameValue === "") {
    if (productName.classList.contains("has-feedback")) {
      productName.classList.remove("has-feedback", "has-error", "has-danger");
      productName.removeChild(productName.getElementsByClassName('helper-block')[0])
    }
    productName.classList.add("has-feedback", "has-error", "has-danger");
    productName.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (productName.classList.contains("has-feedback")) {
      productName.classList.remove("has-feedback", "has-error", "has-danger");
      productName.removeChild(productName.getElementsByClassName('helper-block')[0])
    }
  }

  if (customerValue === "") {
    if (customer.classList.contains("has-feedback")) {
      customer.classList.remove("has-feedback", "has-error", "has-danger");
      customer.removeChild(customer.getElementsByClassName('helper-block')[0])
    }
    customer.classList.add("has-feedback", "has-error", "has-danger");
    customer.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (customer.classList.contains("has-feedback")) {
      customer.classList.remove("has-feedback", "has-error", "has-danger");
      customer.removeChild(customer.getElementsByClassName('helper-block')[0])
    }
  }

  if (quantityValue === "") {
    if (quantity.classList.contains("has-feedback")) {
      quantity.classList.remove("has-feedback", "has-error", "has-danger");
      quantity.removeChild(quantity.getElementsByClassName('helper-block')[0])
    }
    quantity.classList.add("has-feedback", "has-error", "has-danger");
    quantity.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (quantity.classList.contains("has-feedback")) {
      quantity.classList.remove("has-feedback", "has-error", "has-danger");
      quantity.removeChild(quantity.getElementsByClassName('helper-block')[0])
    }
  }

  if (priceValue === "") {
    if (price.classList.contains("has-feedback")) {
      price.classList.remove("has-feedback", "has-error", "has-danger");
      price.removeChild(price.getElementsByClassName('helper-block')[0])
    }
    price.classList.add("has-feedback", "has-error", "has-danger");
    price.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    if (price.classList.contains("has-feedback")) {
      price.classList.remove("has-feedback", "has-error", "has-danger");
      price.removeChild(price.getElementsByClassName('helper-block')[0])
    }
  }
  if (productNameValue !== "" && customerValue !== "" && quantityValue !== "" && priceValue) {
    let tableBody = document.getElementById('billingTableBody');
    let totalNumberofRows = tableBody.getElementsByTagName('tr').length
    let row = `
      <td>${totalNumberofRows + 1}</td>
      <td>${productNameValue}</td>
      <td>${quantityValue}</td>
      <td>${priceValue}</td>
      <td><button class="btn"><i class="glyphicon glyphicon-minus"></i></button></td>`;
    let b = document.createElement("TR");
    b.innerHTML = row

    tableBody.appendChild(b)

    productName.getElementsByTagName('input')[0].value = ""
    quantity.getElementsByTagName('input')[0].value = ""
    price.getElementsByTagName('input')[0].value = ""

    let rows = tableBody.getElementsByTagName('tr')
    let totalPrice = 0;
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      let td = element.getElementsByTagName("td")
      let price = td[td.length-2].innerHTML;
      totalPrice += parseInt(price);
    }
    document.getElementById("totalPrice").innerHTML = totalPrice;
  }
}