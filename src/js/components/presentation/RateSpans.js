import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class RateSpans extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      paymentOptions: this.props.paymentOptions,
      ddTerm: this.props.ddTerm,
      prodName: this.props.prodName
    };

  }
  componentWillMount(){
  let termArr = [];
  this.props.paymentOptions.map((payOption, i)=>{
    if(payOption.termrateoptions.term == this.props.defaultDealTerm)
      termArr.push(payOption);

    this.setState({termArr})
  })


  }
  componentWillUpdate(nextProps){

  }
  componentDidMount(){

  }

  render(){
    return(
      <span>
      {this.state.paymentOptions &&


        <span  className={"pm--spacing payRateCls"+this.state.prodName}>
           {
            (this.state.termArr) &&
            '$' + (this.state.termArr[0].payment_monthly ? parseFloat(this.state.termArr[0].payment_monthly).toFixed(2) : '0.00') + '/mo'
            }


      </span>

      }
      </span>
    )
  }
}

  function mapStateToProps(state) {
      return {
            products: state.products,
            productList: state.productList,
            dealTerms: state.dealTerms,
            defaultPackage: state.defaultPackage,
            selectedPackageProduct: state.selectedPackageProduct,
            inviewPayment: state.inviewPayment,
            dealerProducts: state.dealerProducts,
            defaultDealTerm: state.defaultDealTerm,

      };
  }

  function matchDispatchToProps(dispatch){
    return {

   };

}

export default connect(mapStateToProps, matchDispatchToProps)(RateSpans);
