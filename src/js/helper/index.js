export let dealerData = {};

export function populateDealerData() {
  dealerData = {
    deal_type: (window.dealerData) ? window.dealerData.deal_type : 'RETL',
    // dealer_code: (window.dealer_code) ? window.dealer_code : '1111132',
    user_first: (window.dealerData) ? window.dealerData.user_first : 'First',
    user_last: (window.dealerData) ? window.dealerData.user_last : 'Last'
  }
}
