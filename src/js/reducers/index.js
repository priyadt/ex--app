import {combineReducers} from 'redux';
import ProductReducer from './reducer-product';
import ProductListReducer from './reducer-productList';
import VehicleReducer from './reducer-vehicle';
import CustomerReducer from './reducer-customer';
import DealFinanceReducer from './reducer-dealFinance';
import DealTermsReducer   from './reducer-dealTerms';
import DefaultDealTermReducer   from './reducer-defaultDealTerm';
import DefaultDealTermRateReducer   from './reducer-defaultDealTermRate';
import DefaultDealTermAprReducer   from './reducer-defaultDealTermApr';
import DefaultPackageReducer   from './reducer-defaultPackage';
import DefaultShowDealItemsReducer  from './reducer-defaultShowDealItems';
import InitialParamsReducer  from './reducer-initialParamsReducer';
import DealTradeInPayoffReducer from './reducer-dealTradeInPayoff';
import PackageProductReducer from './reducer-packageProduct';
import InviewPaymentReducer from './reducer-inview';
import DealerProductsReducer from './reducer-dealerProducts';


const productReducers = combineReducers({
    products: ProductReducer,
    productList: ProductListReducer,
    vehicleData: VehicleReducer,
    customerDetails: CustomerReducer,
    dealFinance: DealFinanceReducer,
    dealTerms: DealTermsReducer,
    defaultDealTerm: DefaultDealTermReducer,
    defaultDealTermRate:  DefaultDealTermRateReducer,
    defaultDealTermApr: DefaultDealTermAprReducer,
    dealTradeInPayoff: DealTradeInPayoffReducer,
    defaultPackage: DefaultPackageReducer,
    defaultShowDealItems: DefaultShowDealItemsReducer,
    initialRequestParams: InitialParamsReducer,
    selectedPackageProduct: PackageProductReducer,
    inviewPayment: InviewPaymentReducer,
    dealerProducts: DealerProductsReducer

});

export default productReducers
