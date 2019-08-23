export const FETCH_DETAILS ='FETCH_DETAILS';

function receiveCustomerDetails(json)
{
    return{
        type: FETCH_DETAILS,
        json
    }
}

function fetchCustomerDetailsJson(fromCurrency, toCurrency, amount)
{
    const url = `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/${amount}?format=json`;
     return fetch(url)
    .then(response => response.json())
}

export function fetchCustomerDetails(fromCurrency, toCurrency, amount)
{
    return function(disptach)
    {
        return fetchCustomerDetailsJson(fromCurrency, toCurrency, amount)
        .then(json => disptach(receiveCustomerDetails(json)))
    } 
}