import axios from 'axios';
import config from '../config.js';

let queryparam = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

if (window.location.href.indexOf('dealer_code') > -1 ) {

  if(queryparam().dealer_code !== null && queryparam().dealer_code !== undefined)
  window.dealer_code = queryparam().dealer_code;
}

const HttpHelper = (url, method, reqData) => {
          if (`${config.credentialsFlag}` == 'false'){
            var credentialsFlag = false;
          }else{
            var credentialsFlag = true;
          }

        if (method.toLowerCase() == 'post') {
            if (reqData == undefined) {
                reqData = {};
            }
            var header_config = {
                headers: { 'Content-Type': 'application/json', 'Dealer-Code': (window.dealer_code) },
                'withCredentials' : credentialsFlag
            };
            return axios.post(url, reqData, header_config)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        return response.data
                    } else {
                        alert("Error while Fetching data");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            var header_config = {
              headers: { 'Content-Type': 'application/json', 'Dealer-Code': (window.dealer_code)},
              'withCredentials' : credentialsFlag
            };
            return axios.get(url, header_config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data);
                        return response.data;
                    } else {
                        alert("Error while Fetching data");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

}

export default HttpHelper;
