
export default function (state = null, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return action.payload;
            break;
    }
    return state;
}
