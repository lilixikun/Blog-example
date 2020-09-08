
const initState = {
    name: '席坤',
    age: 20
}
export default function userReducer(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: '改了'
            }
        case 'CHANGE_AGE':
            return {
                ...state,
                age: 22
            }
        default:
            return state
    }
}