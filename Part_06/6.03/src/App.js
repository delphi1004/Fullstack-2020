import React from 'react'
import Notes from './components/Notes'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notes/>
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App