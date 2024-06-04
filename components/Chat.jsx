'use client'
import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
    const [messagesState, setMessagesState] = useState([]);
    const [text, setText] = useState('');
    const {mutate:createMessage, isPending} = useMutation({
        mutationFn: (query) => generateChatResponse([...messagesState, query]),
        onSuccess: (data) => {
            if(!data) {
                toast.error('Somethig went wrong...');
                return;
            }
            setMessagesState((prev) => [...prev, data])
        },
        onError: (error) => {
            toast.error('Somethig went wrong...');
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = {
            role: 'user',
            content: text
        }
        createMessage(query)
        setMessagesState((prev) => [...prev, query])
        setText('');
    }

    console.log(messagesState)

    const renderedMessages = messagesState.map(({role, content}, idx) => {
        const avatar = role === 'user' ? '👤' : '🤖';
        const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';
        return (
            <div key={idx} className={`${bcg} flex py-6 -mx-8 px-8
            text-xl leading-loose border-b border-base-300`}>
                <span className='mr-4 '>{avatar}</span>
                <p className='max-w-3xl'>{content}</p>
            </div>
        )
    })

    return (
        <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto] w-full'>
            <div>
                <h2 className='text-5xl'>
                    {renderedMessages}
                    {isPending && <span className='loading'></span>}
                </h2>
            </div>            
            <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
                <div className='join w-full'>
                    <input type="text" name="text" placeholder="message" required value={text} onChange={e => setText(e.target.value)} className='input input-bordered join-item w-full'/>
                    <button disabled={isPending} type="submit" className='btn btn-primary join-item'>{isPending ? 'please wait...' : 'ask question'}</button>
                </div>
            </form>
        </div>
    );
};

export default Chat;