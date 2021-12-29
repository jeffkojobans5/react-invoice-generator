import React from 'react'


const Textareas = (props , e) => {
    return (
        <textarea
            name = {props.name}
            type = {props.type}
            placeholder = {props.placeholder}
            value = {props.value}
            className = {props.className}
            onChange = { props.change }
        ></textarea>
    )
}

export default Textareas





