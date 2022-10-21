import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';



var stompClient = null;
const WebMessage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receiverName: "",
        connected: false,
        message: ""
    });

    const handleUsername = (e) => {
        const { value } = e.target;
        setUserData({ ...userData, username: value })
    }

    const handleChangeMessage = (e) => {
        const { value } = e.target;
        setUserData({ ...userData, message: value });
    }

    const registerUser = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
        userJoin();
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case ("JOIN"): {
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            }
            case ("MESSAGE"): {
                publicChats.push(payloadData);
                setPublicChats([...publicChats])
                break;
            }
        }
    }

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData)
            setPrivateChats(new Map(privateChats))
        } else {
            let list = [];
            list.push(payloadData);

            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    }
    const sendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };
            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    }

    useEffect(() => {
        if (isAuth) {
            setChecking(false)
        } else {
            setChecking(true)
            navigate("/login")
        }
    }, [])


    return (
        <>
            {
                checking ?
                    (
                        <>
                            loading...
                        </>
                    )
                    :
                    (
                        <>
                            <div className='container'>
                                {
                                    userData.connected ?
                                        <div className='chat-box'>
                                            <div className="member-list">
                                                <ul>
                                                    <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>
                                                        Chatroom
                                                    </li>
                                                    {[...privateChats.keys()].map((item, index) => (
                                                        <li onClick={() => { setTab(item) }} className={`member ${tab === item && "active"}`} key={index}>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {
                                                tab === "CHATROOM" &&
                                                <div className="chat-content">
                                                    <ul className='chat-messages'>
                                                        {publicChats.map((chat, index) => (
                                                            <li ky={index} className='message'>
                                                                {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                                                                <div className="message-date">{chat.message}</div>
                                                                {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="send-message">
                                                        <input type="text" className='input-message' placeholder='enter public message' value={userData.message} name="message" onChange={handleChangeMessage} />
                                                        <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                tab !== "CHATROOM" &&
                                                <div className="chat-content">
                                                    <ul className='chat-messages'>
                                                        {
                                                            [...privateChats.get(tab)].map((chat, index) => (
                                                                <li className='message' key={index}>
                                                                    {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                                                                    <div className="message-date">{chat.message}</div>
                                                                    {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    <div className="send-message">
                                                        <input type="text" className='input-message' placeholder={`enter private message for ${tab} `} value={userData.message} name="message" onChange={handleChangeMessage} />
                                                        <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div className="register">
                                            <input type="text" id='user-name' placeholder='Enter the username' value={userData.username} onChange={handleUsername} />
                                            <button type='button' onClick={registerUser}>connect</button>
                                        </div>
                                }
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default WebMessage