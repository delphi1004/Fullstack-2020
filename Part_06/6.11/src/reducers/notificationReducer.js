
export const setNotification = (msg) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { msg }
    }
}

export const resetNotification = (msg) => {
    return {
        type: 'RESET_NOTIFICATION',
    }
}

const initMessage = ''
const notificationReducer = (state = initMessage, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return action.data.msg
        }

        case 'RESET_NOTIFICATION': {
            return initMessage
        }

        default:
    }
    return state
}

export default notificationReducer