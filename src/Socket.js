import io from 'socket.io-client';


export const initSocket = async ()=>{
    const options = {
        "force new connection": true,
        reconnectionAttempt : "infinity",
        timeout : 100000,
        transports : ['WebSocket']
    };
    
    return io(process.env.REACT_APP_BACKEND_URL, options, {
        
    })
}