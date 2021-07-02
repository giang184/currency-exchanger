import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

//clear input and output fields
function clearFields() {
  $('#amount').val("");
  $('.showErrors').text("");
  $('.showRates').text("");
}

function displayRates(response, rate) {
  if (response.result === "success") {
    $('.showRates').text(`The rate in ${rate} is ${response.conversion_rates.AED}`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

//make the api call to fetch rates
async function makeApiCall(rate) {
  const response = await CurrencyService.getCurrency();
  console.log(response);
  displayRates(response, rate);
}

$(document).ready(function() {
  $('#convert').click(function() {
    let city = $('#amount').val();
    clearFields();
    makeApiCall(city);
  });
});