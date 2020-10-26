import React, { useState, useImperativeHandle } from 'react'

const ToggLabel = React.forwardRef((props, ref) => {
    const [visible, setVislble] = useState(false)
    const hidenWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVislble(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hidenWhenVisible}>
                <button id = 'toogleButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

ToggLabel.displayName = 'Togglable'

export default ToggLabel