export default function (state = null, action) {
    switch (action.type) {
        case 'SET_CUSTOMER_DETAILS':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
