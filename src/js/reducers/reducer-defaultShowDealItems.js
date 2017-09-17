export default function (state = null, action) {
    switch (action.type) {
        case 'SET_DEFAULT_SHOW_DEAL_ITEMS':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
