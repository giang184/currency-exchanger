import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function displayRates(response, amount, currency1, currency2) {
  if (response.result === "success") {
    if(!response.conversion_rates[currency1] && !response.conversion_rates[currency2]) {
      $('#showRates').text("");
      $('#showErrors').text(`Sorry, we don't have a conversion rate for ${currency1} or ${currency2}`);
    } else if(!response.conversion_rates[currency1]) {
      $('#showRates').text("");
      $('#showErrors').text(`Sorry, we don't have a conversion rate for ${currency1}`);
    } else if (!response.conversion_rates[currency2]) {
      $('#showRates').text("");
      $('#showErrors').text(`Sorry, we don't have a conversion rate for ${currency2}`);
    } else {
      if(!amount) {
        $('#showRates').text("");
        $('#showErrors').text(`Please enter a currency amount`);
      }
      else{
        $('#showErrors').text("");
        $('#showRates').text(`$${amount} ${currency1} is equal to $${(amount/response.conversion_rates[currency1]*response.conversion_rates[currency2]).toFixed(2)} ${currency2}`);
        $('#outputAmount').html(`$${(amount/response.conversion_rates[currency1]*response.conversion_rates[currency2]).toFixed(2)}`);
        $('#outputAmount').show();
      }
    }
  } else {
    $('#showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(amount, currency1, currency2) {
  const response = await CurrencyService.getCurrency();
  displayRates(response, amount, currency1, currency2);
}

$(document).ready(function() {
  $('#convert').click(function(event) {
    event.preventDefault();
    const amount = $('#amount').val();
    const currency1 = $("#currency1").val();
    const currency2 = $("#currency2").val();
    // clearFields();
    makeApiCall(amount, currency1, currency2);
  });
});