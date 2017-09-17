export const getProductList = (products) => {
    return {
        type: 'GET_PRODUCTS',
        payload: products
    }
};

export const getVehicleData = () => {
    return {
        type: 'SET_VEHICLE_DATA',
        payload: vehicleData
    }
};

export const setVehicleData = (vehicleData) => {
    return {
        type: 'SET_VEHICLE_DATA',
        payload: vehicleData
    }
};

export const getSelectedPackageProduct = (selectedPackageProduct) => {
    return {
        type: 'SET_PACKAGE_PRODUCT',
        payload: selectedPackageProduct
    }
};

export const setCustomerDetails = (customerDetails) => {
    return {
        type: 'SET_CUSTOMER_DETAILS',
        payload: customerDetails
    }
};


export const setDealFinance = (deal) => {
    return {
        type: 'SET_DEAL_FINANCE',
        payload: deal

    }
};

export const setDealTerms = (deal) => {
    return {
        type: 'SET_DEAL_TERMS',
        payload: deal
    }
};
export const setDealTradeInPayoff = (deal) => {
    return {
        type: 'SET_DEAL_TRADEIN_PAYOFF',
        payload: deal
    }
};

export const setDefaultDealTerm = (deal) => {
  console.log('deal',deal);
    return {
        type: 'SET_DEFAULT_DEAL_TERM',
        payload: deal
    }
};

export const setDefaultDealTermRate = (deal) => {

    return {
        type: 'SET_DEFAULT_DEAL_TERM_RATE',
        payload: deal
    }
};

export const setDefaultDealTermApr = (deal) => {

    return {
        type: 'SET_DEFAULT_DEAL_TERM_APR',
        payload: deal
    }
};


export const setDefaultDealApr = (deal) => {
  return{
    type: 'SET_DEFAULT_DEAL_APR',
    payload :deal
  }
};

export const setDefaultPackage = (pkg) => {
    return {
        type: 'SET_DEFAULT_PACKAGE',
        payload: pkg
    }
};
export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products
    }
};
export const setDefaultShowDealItems = (delTrades) => {
    return {
        type: 'SET_DEFAULT_SHOW_DEAL_ITEMS',
        payload: delTrades
    }
};

export const setUrlParams = (urlParams) => {
    return {
        type: 'SET_INITIAL_URL_PARAMS',
        payload: urlParams
    }
};

export const selectedPackageProduct = (selectedPackage) => {
    return {
        type: 'SET_PACKAGE_PRODUCT',
        payload: selectedPackage
    }
};
export const setInviewPayment = (inviewPayment) => {
    return {
        type: 'SET_INVIEW_PAYMENT',
        payload: inviewPayment
    }
};

export const setDealerProducts = (dealerProducts) => {
    return {
        type: 'SET_DEALER_PRODUCTS',
        payload: dealerProducts
    }
};
