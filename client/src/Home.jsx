import { useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket"
import throttle from "lodash.throttle"
import { Cursor } from "./components/CUrsor"


const renderCursors=users=>{
    return Object.keys(users).map(uuid=>{
        const user=users[uuid]
        return (<Cursor key={uuid} point={[user.state.x,user.state.y]} />)
    })
}

const renderUserList=users=>{
    return Object.keys(users).map(uuid=>{
        return (<li key={uuid}>{JSON.stringify(users[uuid])}</li>)
    })
}

export const Home=({username})=>{
    const WS_URL="ws://localhost:8000"
    const {sendJsonMessage,lastJsonMessage}=useWebSocket(WS_URL,{
        queryParams:{username}
    })
    console.log(sendJsonMessage,lastJsonMessage,"...")
    const Throttle=50
    const sendJSONMsgThrottled=useRef(throttle(sendJsonMessage,Throttle))

    useEffect(()=>{
        sendJsonMessage({
            x:0,
            y:0
        })
        window.addEventListener("mousemove",e=>{
            sendJSONMsgThrottled.current({
                x:e.clientX,
                y:e.clientY
            })
        })
    },[])

    if(lastJsonMessage){
        return <>
        {renderCursors(lastJsonMessage)}
        {renderUserList(lastJsonMessage)}
        </>
    }
    console.log(sendJsonMessage,lastJsonMessage,"222")
    console.log(username,"11")
    return (
        <>
        <h1>{username}</h1>
        </>
    )
}