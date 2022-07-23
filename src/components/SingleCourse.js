import React from 'react'
import { useState } from "react"

function SingleCourse() {

    const [input, setInput] =useState("");
    const handleChange =(event) =>{
       // console.log(event.target.value)
       setInput(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(`submitting ${input}`)
        setInput("")

    }

    console.log(input, " <<<input state");
    return (
       <form className='form' onSubmit={handleSubmit}>
        <label>
                Add to Courses
                <input 
                value={input}
                className='input'
                 placeholder='New Course Here'
                 onChange={handleChange}
                 />
        </label>
        <button className='button'>Add Course</button>




       </form>
    )
}

export default SingleCourse