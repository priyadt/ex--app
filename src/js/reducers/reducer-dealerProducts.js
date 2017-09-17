export default function (state = null, action) {
    switch (action.type) {
        case 'SET_DEALER_PRODUCTS':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
