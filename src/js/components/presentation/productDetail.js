import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DetailSection from './detailSection';
import HttpHelper from '../../Util/httpHelper';
import config from '../../config.js';
import {dealerData,populateDealerData} from '../../helper/index.js';
import {getProductList, setDefaultPackage, setUrlParams, setProducts,  setDefaultDealTerm,setDefaultDealTermRate,setDefaultDealTermApr }  from '../../actions/index';

class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.setInitialUrlParams();

  }

  setInitialUrlParams(){
   let queryparam =  function(){
       var vars = [], hash;
       var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
       {
           hash = hashes[i].split('=');
          vars[hash[0]] = hash[1];
       }
       return vars;
    }
    let params = {dealjacketid: queryparam().dealjacketid , dealid: queryparam().dealid, dealer_code: queryparam().dealer_code };
    this.props.actions.setUrlParams(params);
    this.setPackage(params);
    }

  setPackage(params){
    HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${params.dealjacketid}/deals/${params.dealid}/package-products/`, 'get','').then( function(data) {
        this.props.actions.setProducts(data.packages);
        let selectedOption = _.filter(data.packages[0].package_options,['is_option_selected',true]);
        if(selectedOption.length > 0){
        this.props.actions.setDefaultDealTerm(selectedOption[0].termrateoptions.term);
        }
        this.setDefaultPackage();
    }.bind(this))
  }

  setDefaultPackage(){
    let pkgs = {};
    var defaultNotSet = true;
    var sortedProducts = this.props.products.sort(function(a, b){
      return a.position - b.position;
    });

    sortedProducts.map((prod, index) =>{
      let slector = false;
      if(defaultNotSet && prod['products'].length > 0 ){
        slector = true;
        defaultNotSet = false;
      }

      pkgs[prod.package_name] = slector;
    });

    this.props.actions.setDefaultPackage(pkgs);
  }


  render() {
    return (
      <div>
      {this.props.initialRequestParams &&
              <div>
                <DetailSection />
              </div>
      }
      </div>
  );
}
}

function mapStateToProps(state) {
    return {
        defaultPackage: state.defaultPackage,
        products: state.products,
        initialRequestParams: state.initialRequestParams,
        dealTerms: state.dealTerms,
        defaultDealTerm: state.defaultDealTerm,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ getProductList: getProductList }, dispatch);
}

function matchDispatchToProps(dispatch){
  return {
   actions: {
     setProducts: bindActionCreators(setProducts, dispatch),
     getProductList: bindActionCreators(getProductList, dispatch),
     setDefaultPackage: bindActionCreators(setDefaultPackage, dispatch),
     setUrlParams: bindActionCreators(setUrlParams, dispatch),
     setDefaultDealTerm: bindActionCreators(setDefaultDealTerm, dispatch),
     setDefaultDealTermRate: bindActionCreators(setDefaultDealTermRate, dispatch),
     setDefaultDealTermApr: bindActionCreators(setDefaultDealTermApr, dispatch)
   }
};

}

export default connect(mapStateToProps, matchDispatchToProps)(ProductDetail);
