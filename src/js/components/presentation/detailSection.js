import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getProductList from '../../actions/index';
import CarDetail from './carDetail';
import PackageDetails from './packageDetails';
import PackageInview from './packageInview';

class DetailSection extends React.Component {
  render() {
    return (
    <div className="row">
        <CarDetail />
        <PackageDetails />
        <PackageInview />
    </div>
  );
}
}


function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ getProductList: getProductList }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DetailSection);
