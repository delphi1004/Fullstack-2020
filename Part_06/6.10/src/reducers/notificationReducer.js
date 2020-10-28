export const setNotification = (msg) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { msg }
    }
}

const initMessage = 'Initial notification message... excercise 6.10'
const notificationReducer = (state = initMessage, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return state = action.data
        }

        default:
    }
    return state
}

export default notificationReducer