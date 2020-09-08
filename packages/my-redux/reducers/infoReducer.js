
const initState = {
    info: '我是info'
}
export default function userReducer(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_INFO':
            return {
                ...state,
                name: 'info改了'
            }
        default:
            return state
    }
}