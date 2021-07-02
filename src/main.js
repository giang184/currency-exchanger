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

function displayRates(response, amount, currency) {
  if (response.result === "success") {
    $('.showRates').text(`${amount} U.S. dollars is equal to ${(amount*response.conversion_rates[currency]).toFixed(2)} ${currency}!`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

//make the api call to fetch rates
async function makeApiCall(amount, currency) {
  const response = await CurrencyService.getCurrency();
  console.log(response);
  displayRates(response, amount, currency);
}

$(document).ready(function() {
  $('#convert').click(function() {
    const amount = $('#amount').val();
    const currency = $("#currency").val();
    clearFields();
    makeApiCall(amount, currency);
  });
});