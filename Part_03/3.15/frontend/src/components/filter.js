import React from 'react'

const Filter = ({nameFilter,handleNameFilterChange}) =>{
    return(
      <form>
        filter shown with: <input value = {nameFilter} onChange = {handleNameFilterChange}/>
      </form>
    )
}

export default Filter
