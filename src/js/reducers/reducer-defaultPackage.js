export default function (state = null, action) {
    switch (action.type) {
        case 'SET_DEFAULT_PACKAGE':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
