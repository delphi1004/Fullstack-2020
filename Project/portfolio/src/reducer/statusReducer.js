import { global } from '../data/global'

const statusInfo = {
  currentMenu: global.menu.idle,
  currentWorksMenu: global.menu.idle,
  menuChanged: true,
  worksMenuChanged:true
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

export const setCurrentWorksMenu = (id) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_CURRENT_WORKS_MENU',
        currentWorksMenu : id
      }
    )
  }
}

const statusReducer = (state = statusInfo, action) => {

  console.log('---- current menu', state)
  console.log('---- current action', action)
  switch (action.type) {
    case 'SET_CURRENT_MENU':
    {
      return {
        ...state, currentMenu: action.currentMenu,
        menuChanged: state.currentMenu !== action.currentMenu ? true : false
      }
    }
    case 'SET_CURRENT_WORKS_MENU':
    {
      return {
        ...state, currentWorksMenu: action.currentWorksMenu,
        worksMenuChanged: state.currentWorksMenu !== action.currentWorksMenu ? true:false
      }
    }

    default:
  }

  return state
}

export default statusReducer