export default function (state = null, action) {
    switch (action.type) {
        case 'SET_INITIAL_URL_PARAMS':
            return action.payload;
            break;
    }
    return state;
}
