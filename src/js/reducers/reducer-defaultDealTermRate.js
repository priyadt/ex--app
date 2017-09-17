export default function (state = null, action) {
    switch (action.type) {
           case 'SET_DEFAULT_DEAL_TERM_RATE':
                return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
