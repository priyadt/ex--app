const ENV = process.env.NODE_ENV;
var config = {};
const appConfigLocal = require('../../config/local.js');
const appConfigTs = require('../../config/ts.js');
const appConfigProduction = require('../../config/production.js');
const appConfigQA = require('../../config/qa.js');
const appConfigDevTest = require('../../config/devTest.js');
const appConfigDevInt = require('../../config/devInt.js');

let queryparam = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

if (window.location.href.indexOf('deploy_env') > -1 ) {

  if(queryparam().deploy_env !== null && queryparam().deploy_env !== undefined)
  window.deploy_env = queryparam().deploy_env;

  window.configs = {};

  if( window.deploy_env !== null ){

      if (window.deploy_env === 'dev_local') {
        config =  appConfigTs;
      }
      if (window.deploy_env === 'local') {
        config =  appConfigLocal;
      }

      if (window.deploy_env === 'prod') {
        config =  appConfigProduction;
      }
      if (window.deploy_env === 'qa') {
        config =   appConfigQA;
      }
      if (window.deploy_env === 'dev_test') {
        config = appConfigDevTest;
      }
      if (window.deploy_env === 'dev_int') {
        config = appConfigDevInt;
      }
  }
  console.log('config...', config);

}
console.log('InConfigs',config);
export default config;
