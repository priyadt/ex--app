export default function (state = null, action) {
    switch (action.type) {
        case 'GET_VEHICLE_DATA':
            return action.payload;
        break;
        case 'SET_VEHICLE_DATA':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
