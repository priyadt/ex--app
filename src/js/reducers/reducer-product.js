export default function (state = null, action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
            break;
    }
    return state;
}
