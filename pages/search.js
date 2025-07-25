// Get the input element and the search button
var searchInput = document.getElementById('search-input');
var userSearchBtn = document.getElementById('user-search-btn');
var levelSelect = document.getElementById('select-level');
var fromAmount = document.getElementById('from-amount');
var toAmount = document.getElementById('to-amount');

var inputValue = "";

userSearchBtn.addEventListener('click', function() {
  inputValue = searchInput.value;
  localStorage.setItem('UserInput', inputValue);
});

if (localStorage.getItem('UserInput') != null){
  searchInput.value = localStorage.getItem("UserInput");
}

levelSelect.onchange = function() {
  localStorage.setItem('SelectedLevel', levelSelect.value);
};

if (localStorage.getItem('SelectedLevel') != null){
  levelSelect.value = localStorage.getItem("SelectedLevel");
}

fromAmount.onchange = function() {
  localStorage.setItem('FromAmount', fromAmount.value);
};

if (localStorage.getItem('FromAmount') != null){
  fromAmount.value = localStorage.getItem("FromAmount");
}

toAmount.onchange = function() {
  localStorage.setItem('ToAmount', toAmount.value);
};

if (localStorage.getItem('ToAmount') != null){
  toAmount.value = localStorage.getItem("ToAmount");
}




