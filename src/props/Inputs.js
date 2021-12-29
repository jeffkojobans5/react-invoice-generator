import React from 'react'


const Inputs = (props , e) => {
    return (
        <input
            name = {props.name}
            type = {props.type}
            placeholder = {props.placeholder}
            value = {props.value}
            className = {props.className}
            onChange = { props.change }
        />
    )
}

export default Inputs





