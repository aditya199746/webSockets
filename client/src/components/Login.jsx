import { useCallback, useState } from "react"

export const Login =({onSubmit})=>{
    const [username,setUsername]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        onSubmit(username)
    }

    return (
        <>
            <h1>Welcome</h1>
            <p>What should people call u?</p>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={username}
                onChange={useCallback((e)=>setUsername(e.target.value),[])}
                />
                <input type="submit" />
            </form>
        </>
    )
}