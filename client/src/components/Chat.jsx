import { useContext, useEffect, useRef, useState } from 'react'
import { uniqBy } from 'lodash'
import { UserContext } from '../context/UserConterx'
import { SensIcon, ChatIcon } from './Icons'
import axios from 'axios'
import { Contact } from './Contact'

export function Chat () {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState({})
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [offLineContacts, setOfLineContacts] = useState({})
  const [messages, setMessages] = useState([])
  const { id } = useContext(UserContext)
  const divUnderMessages = useRef()

  useEffect(() => {
    connectToWs()
  }, [])

  function connectToWs () {
    const ws = new WebSocket('ws://localhost:3030')
    setWs(ws)
    ws.addEventListener('message', handleMessage)
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Trying to reconnect')
        connectToWs()
      }, 5000)
    })
  }

  function ShowOnlinePeople (peopleArray) {
    const people = {}

    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username
    })

    setOnlinePeople(people)
  }

  function handleMessage (event) {
    const messageData = JSON.parse(event.data)
    if ('online' in messageData) {
      ShowOnlinePeople(messageData.online)
    } else if ('text' in messageData) {
      setMessages(prev => ([...prev, { ...messageData }]))
    }
  }

  function sendMessage (e) {
    e.preventDefault()
    ws.send(
      JSON.stringify({
        message: {
          recipient: selectedUserId,
          text: newMessage
        }
      }))

    setNewMessage('')

    setMessages(prev => ([...prev, {
      text: newMessage,
      sender: id,
      recipient: selectedUserId,
      _id: Date.now()
    }]))
  }

  useEffect(() => {
    const div = divUnderMessages.current
    if (div) {
      div.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  useEffect(() => {
    axios.get('/people')
      .then(res => {
        const offLinePeopleArr = res.data
          .filter(p => p._id !== id)
          .filter(p => !Object.keys(onlinePeople).includes(p._id))

        const offLinePeople = {}

        offLinePeopleArr.forEach(p => {
          offLinePeople[p._id] = p
        })
        setOfLineContacts(offLinePeople)
      })
  }, [onlinePeople])

  useEffect(() => {
    if (selectedUserId) {
      axios.get('/messages/' + selectedUserId)
        .then(res => {
          setMessages(res.data)
        })
    }
  }, [selectedUserId])

  const onlinePeopleExcluOurUser = { ...onlinePeople }
  delete onlinePeopleExcluOurUser[id]

  const messageWithoutDuper = uniqBy(messages, '_id')

  return (
    <section className="flex h-screen">

      <main className="w-1/3 bg-white flex flex-col">
        <h3 className='mx-auto text-blue-700 font-semibold text-lg py-2 flex'>
          <ChatIcon />
          Chat Gane Multired
        </h3>
        {
          Object.keys(onlinePeopleExcluOurUser).map(userId => (

            < Contact
              key={userId}
              id={userId}
              online={true}
              username={onlinePeopleExcluOurUser[userId]}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
            />
          ))
        }
        {
          Object.keys(offLineContacts).map(userId => (
            <Contact
              key={userId}
              id={userId}
              online={false}
              username={offLineContacts[userId].username}
              onClick={() => setSelectedUserId(userId)}
              selected = {userId === selectedUserId}
            />
          ))
        }
      </main>

      <div className="flex flex-col bg-blue-100 w-2/3 p-2">
        <section className='flex-grow'>
          {
            !selectedUserId && (
              <div className='flex h-full items-center justify-center'>
                <span className='text-gray-500'>&larr; Select a user to start chatting</span>
              </div>
            )
          }
          {
            !!selectedUserId && (
              <section className='relative h-full'>
                <div className='overflow-y-scroll absolute top-0 left-0 right-0 bottom-4'>
                  {messageWithoutDuper.map((message, index) => (
                    <div key={index} className={`${message.sender === id ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-2 my-2 rounded-md text-sm ${message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}>
                        {/* sender:{message.sender}<br />
                        my id: {id}<br /> */}
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={divUnderMessages}></div>
                </div>
              </section>
            )
          }
        </section>

        {!!selectedUserId && (
          <form className="flex gap-2 mx-2" onSubmit={sendMessage}>
            <input type="text" placeholder="Type your message" value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="bg-white border p-2 rounded-md flex-grow" />
            <button type='submit'
              className="bg-blue-500 p-2 text-white rounded-md">
              <SensIcon />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
