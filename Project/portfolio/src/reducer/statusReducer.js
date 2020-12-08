import { global } from '../data/global'

const statusInfo = {
  currentMenu: global.menu.idle,
  menuChanged:true
}

export const setCurrentMenu = (id) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_CURRENT_MENU',
        currentMenu : id
      }
    )
  }
}

const statusReducer = (state = statusInfo, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MENU':
    {
      console.log(`current menu is ${action.currentMenu}`)
      return {
        ...action, currentMenu: action.currentMenu,
        menuChanged: state.currentMenu !== action.currentMenu ? true:false
      }
    }

    default:
  }

  return state
}

export default statusReducer