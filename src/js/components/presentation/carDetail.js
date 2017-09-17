import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HttpHelper from '../../Util/httpHelper.js';
import config from '../../config.js';
import {getVehicleData, setVehicleData , setCustomerDetails, setDealFinance, setDealTerms, setDefaultDealTerm, setDefaultDealTermRate, setDefaultDealTermApr, setDefaultDealApr, setDefaultPackage, setProducts, setDefaultShowDealItems, setDealTradeInPayoff, setDealerProducts, setInviewPayment }  from '../../actions/index';
import {dealerData,populateDealerData} from '../../helper/index.js';

class CarDetail extends React.Component {
 constructor(props){
   super(props);
   populateDealerData();
   this.updateDefaultPkg = this.updateDefaultPkg.bind(this);
   this.checkValidPackage = this.checkValidPackage.bind(this);
 }
 componentDidMount(){
   this.getVehicleData();
   this.getCustomerDetails();
   this.getDealFinance();
   this.getDealTerms();
   this.getDealTradeInPayoff();
   this.getDealerProducts();
   this.props.actions.setDefaultShowDealItems({showDealTrades: false});


 }

 getVehicleData(){
     HttpHelper(`${config.dealMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/vehicle/`, 'get','').then( function(data) {
           this.props.actions.setVehicleData(data.results[0])
     }.bind(this));

 }

 getCustomerDetails(){

   HttpHelper(`${config.dealMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/simple-customer/`, 'get','').then( function(data) {
           this.props.actions.setCustomerDetails(data.results[0])
   }.bind(this));

 }

 getDealFinance(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-finance-summary/`, 'get','').then( function(data) {
           this.props.actions.setDealFinance(data)
   }.bind(this));

 }

 getDealTerms(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-term-rate-options/`, 'get','').then( function(data) {
           this.props.actions.setDefaultDealTerm(data.termrateoptions[0].term);
           this.props.actions.setDealTerms(data);
   }.bind(this));

 }
 getDealTradeInPayoff(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/tradein-vehicles/`, 'get','').then( function(data) {
     this.props.actions.setDealTradeInPayoff(data)
   }.bind(this));

 }
 getDealerProducts(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/dealer-products/  `, 'get','').then( function(data) {
     this.props.actions.setDealerProducts(data.results)
   }.bind(this));

 }


 updateDefaulDealTerm(eve){

   let termRate = eve.target.value.split('-');
   this.props.actions.setDefaultDealTerm(termRate[0]);

   let apr= _.filter(this.props.dealTerms.termrateoptions,['term',parseInt(termRate[0])]);
   let dealFinance = this.props.dealFinance;
   dealFinance['term']=termRate[0];
   dealFinance['apr']=apr[0].apr;
   dealFinance['monthly_payment']=apr[0].payment;

     let selPkg = this.props.selectedPackageProduct;
	     selPkg.payment_options.map((prod, i)=>{
	         if(prod.termrateoptions.term == termRate[0]){
	           this.props.actions.setInviewPayment(prod)
	         }
     })

     setTimeout(function(){
       let rateEle = document.getElementsByClassName('prodSpans');
       for(let i = 0; i<rateEle.length ; i++){
       let children = rateEle[i].childNodes;
       let childrenArray = [ ...children ]; //Adding all childern(43) in to an array ES6 way

       for(let k = 0; k< childrenArray.length ; k++){
       childrenArray[k].style.display = 'none'
       }

       let isPrinted = false;
       for(let k = 0; k< childrenArray.length ; k++){
         if(!isPrinted && childrenArray[k].innerHTML !='' ){
           childrenArray[k].style.display = 'block';
           isPrinted = true;
         }else {
            childrenArray[k].style.display = 'none'
         }
       }
     }
   }, 200)
 }

 updateDefaulDealApr(eve){
     this.props.actions.setDefaultDealApr(eve.target.value);
     let selPkg = this.props.selectedPackageProduct;
	     selPkg.payment_options.map((prod, i)=>{
	         if(prod.termrateoptions.apr == eve.target.value){
	           this.props.actions.setInviewPayment(prod)
	         }
         })
 }
 updateDefaultPkg(name,eve){
   let pkgs = {};
   for (var property in this.props.defaultPackage ) {
     if (this.props.defaultPackage.hasOwnProperty(property))
               pkgs[property] =  this.props.defaultPackage[property];
   }
   pkgs[name] = eve.target.checked;
   this.props.actions.setDefaultPackage(pkgs);
 }
 showDealTradesSection(){
   this.props.actions.setDefaultShowDealItems({showDealTrades: true})
 }

 checkValidPackage(packageList, packageIndex){ //returns true if the package at the given index in the list has products in it, false otherwise
   let thisPackage = packageList.find(p => p.position == packageIndex);
   if (thisPackage.products.length > 0){
     return true;
   }
   else{
     return false;
   }
 }

render(){
 let curentState = this.props;
 let carDetailObj = this;
 let checkboxNum = -1;
 if(curentState.defaultPackage)
 var PackageOptions = Object.keys(curentState.defaultPackage).map(function(key,i) {
   if (curentState.products && !carDetailObj.checkValidPackage(curentState.products,i+1)){
     return null;
   }
   checkboxNum = checkboxNum + 1;

   return (
       <div key={i} className={"form-" + checkboxNum + "-opts tx--lightgray tx--normal"}>
         <span className="chk">
         <input type="checkbox" className="chk-box"
             checked={curentState.defaultPackage && curentState.defaultPackage[key]}
             onChange={(eve)=>carDetailObj.updateDefaultPkg(key,eve)} />
         </span>
         {key}</div>
  )
});

console.log('curentState.products', curentState.products);
 return(
   <div className="col-lg-2 col-md-12 col-smd border-right">
     {(curentState.customerDetails && curentState.vehicleData && curentState.dealFinance)  &&
     <div className="headerSec">
     <span className="tx--gray tx--title"><p>{curentState.customerDetails.first_name+' '+ curentState.customerDetails.last_name} &nbsp; &nbsp; </p></span>
     <span className="carDetails tx--desc">{curentState.vehicleData.year},<span> {curentState.vehicleData.make}</span> {curentState.vehicleData.model}, {curentState.vehicleData.trim} | {curentState.dealFinance.finance_method}</span>
     </div>
     }
     <div className="dtlSec border-bottom">
       <div className="hide--dis">
        <div className="form-group">
         { curentState.dealFinance &&
           <div className="dtlSec ddls smlFont lineEx">
             <p className="hide--me mbtm-zero dd-sum">Deal Details</p>
             {curentState.dealTradeInPayoff &&
             <div>
               <div className="abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></div>
               <div className="abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></div>
             </div>
             }
             <div className="abs-pos tx--lightgray tx--normal">Rate: <span className="tx--amt">{curentState.dealFinance.apr}%</span></div>

             <div className="abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Payment: <span className="tx--amt">$ {curentState.dealFinance.monthly_payment ? curentState.dealFinance.monthly_payment : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Rebate: <span className="tx--amt">$ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Cash Down: <span className="tx--amt"> $ {curentState.dealFinance.cash_down_amount ? curentState.dealFinance.cash_down_amount.toFixed(2) : '0.00'}</span></div>

           </div>
           }

           <div className="termInp">
             <label className="t-lbl" htmlFor="term">Term</label>
             {curentState.dealTerms &&
             <select className="t-inp form-control" id="term" onChange={(eve)=> this.updateDefaulDealTerm(eve)} value={curentState.defaultDealTerm}>
                {curentState.dealTerms.termrateoptions.map((item,i) =>
                    <option key={i} value={item.term}>{item.term} months</option>
                )}
              </select>
             }
          </div>
         </div>

       </div>

       <form className="hide-out">
         <span className="tc--form form-group">
         { curentState.dealFinance &&
           <label className="tx--normal tx--lightgray" htmlFor="term">Term: <span className="tx--amt">{curentState.dealFinance.term} months</span></label>
         }
         </span>

         <span className="cd--form form-group">
           <label className="tx--normal tx--lightgray" htmlFor="cash">Cash Down:</label>
           {curentState.dealFinance &&
            <span className="tx--amt"> $ {curentState.dealFinance.cash_down_amount ? curentState.dealFinance.cash_down_amount.toFixed(2) : '0.00'}</span>
          }
         </span>

         {curentState.dealFinance &&
         <span className="">
           <span className="ra--form abs-pos tx--lightgray tx--normal">Rate: <span className="tx--amt">{curentState.dealFinance.apr}%</span></span>
           { curentState.dealTradeInPayoff &&
             <span>
               <span className="ti--form abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></span>
               <span className="po--form abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></span>
             </span>
           }
           <span className="bp--form abs-pos tx--lightgray tx--normal">Payment: <span className="tx--amt">$ {curentState.dealFinance.monthly_payment ? curentState.dealFinance.monthly_payment : '0.00'}</span></span>
           <span className="bp--form abs-pos tx--lightgray tx--normal">Rebate: <span className="tx--amt">$ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount : '0.00'}</span></span>
           <span className="taf--form abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></span>

           <div>
             <span className="pp--form abs-pos tx--lightgray tx--normal">Payment: <span className="tx--amt">$ {curentState.dealFinance.monthly_payment ? curentState.dealFinance.monthly_payment : '0.00'}</span></span>
             <span className="rb--form abs-pos tx--lightgray tx--normal">Rebate: <span className="tx--amt">$ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount : '0.00'}</span></span>
             <span className="taf1--form abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></span>
           </div>
           { curentState.dealTradeInPayoff &&
           <span>
             <span className="p-ti--form abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></span>
             <span className="p-po--form abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></span>
           </span>
           }
           <span className="p-taf--form abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></span>
             <div className="dp--form tx--lightgray tx--normal">Display Options:</div>
             {curentState.defaultPackage &&
               <span className="defPkg-sel">
               {PackageOptions}
               </span>
             }

         </span>
         }

       </form>
     </div>

     <div className="hide--dis">
       <div className="dtlSec border-bottom lineEx">

         <div className="hide--me mbtm hide-me-dp"><span className="dd-sum">Display Options</span>
         { curentState.defaultPackage &&
           <div className="defPkg-sel">
           {PackageOptions}
           </div>
         }
         </div>
       </div>
     </div>

     <div className="hide-out">

     </div>
   </div>

 )
}
}

function mapStateToProps(state) {
   return {
         vehicleData: state.vehicleData,
         products: state.products,
         customerDetails: state.customerDetails,
         dealFinance: state.dealFinance,
         dealTerms: state.dealTerms,
         defaultDealTerm: state.defaultDealTerm,
         defaultDealTermRate: state.defaultDealTermRate,
         defaultDealTermApr: state.defaultDealTermApr,
         defaultDealApr: state.defaultDealApr,
         dealTradeInPayoff: state.dealTradeInPayoff,
         defaultPackage: state.defaultPackage,
         defaultShowDealItems: state.defaultShowDealItems,
         initialRequestParams: state.initialRequestParams,
         dealerProducts: state.dealerProducts,
         selectedPackageProduct: state.selectedPackageProduct

   };
}

function matchDispatchToProps(dispatch){
 return {
  actions: {

    setVehicleData: bindActionCreators(setVehicleData, dispatch),
    setCustomerDetails: bindActionCreators(setCustomerDetails, dispatch),
    setDealFinance: bindActionCreators(setDealFinance, dispatch),
    setDealTerms: bindActionCreators(setDealTerms, dispatch),
    setDefaultDealTerm: bindActionCreators(setDefaultDealTerm, dispatch),
    setDefaultDealTermRate: bindActionCreators(setDefaultDealTermRate, dispatch),
    setDefaultDealTermApr: bindActionCreators(setDefaultDealTermApr, dispatch),
    setDefaultDealApr: bindActionCreators(setDefaultDealApr, dispatch),
    setDealTradeInPayoff: bindActionCreators(setDealTradeInPayoff, dispatch),
    setDefaultPackage: bindActionCreators(setDefaultPackage, dispatch),
    setDefaultShowDealItems: bindActionCreators(setDefaultShowDealItems, dispatch),
    setDealerProducts: bindActionCreators(setDealerProducts, dispatch),
    setInviewPayment: bindActionCreators(setInviewPayment, dispatch)

  }
};

}

export default connect(mapStateToProps, matchDispatchToProps)(CarDetail);
