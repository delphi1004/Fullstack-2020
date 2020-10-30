import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(
      {
        type: 'INIT_NOTES',
        anecdotes,
      }
    )
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.addAnecdote(anecdote)
    dispatch(
      {
        type: 'ADD_ANECDOTE',
        addedAnecdote
      }
    )
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const vottedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(
      {
        type: 'VOTE_ANECDOTE',
        vottedAnecdote
      }
    )
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.anecdotes
    case 'ADD_ANECDOTE': {
      return state.concat(action.addedAnecdote)
    }
    case 'VOTE_ANECDOTE': {
      const id = action.vottedAnecdote.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.vottedAnecdote)
    }
    default:
  }

  return state
}

export default anecdoteReducer