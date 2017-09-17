export default function (state = null, action) {
    switch (action.type) {
        case 'SET_DEAL_TERMS':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
