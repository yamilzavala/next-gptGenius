'use client'
import { generatChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
    const [messagesState, setMessagesState] = useState('');
    const [text, setText] = useState('');
    const {mutate:createMessage} = useMutation({
        mutationFn: (msg) => generatChatResponse(msg),
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        createMessage(text)
    }

    return (
        <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto] w-full'>
            <div>
                <h2 className='text-5xl'>messages</h2>
            </div>            
            <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
                <div className='join w-full'>
                    <input type="text" name="text" placeholder="message" required value={text} onChange={e => setText(e.target.value)} className='input input-bordered join-item w-full'/>
                    <button type="submit" className='btn btn-primary join-item'>ask question</button>
                </div>
            </form>
        </div>
    );
};

export default Chat;