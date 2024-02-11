import { useEffect, useState } from 'react'
import { SensIcon, ChatIcon } from './Icons'
import { Avatar } from './Avatar'

export function Chat() {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState({})

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3030')
    setWs(ws)
    ws.addEventListener('message', handleMessage)
  }, [])

  function ShowOnlinePeople(peopleArray) {
    const people = {}

    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username
    })

    setOnlinePeople(people)
  }

  function handleMessage(event) {
    const messageData = JSON.parse(event.data)
    if ('online' in messageData) {
      ShowOnlinePeople(messageData.online)
    }
  }

  return (
    <section className="flex h-screen">

      <main className="w-1/3 bg-white p-2 flex flex-col">
        <h3 className='mx-auto text-blue-700 font-semibold text-lg py-2 flex gap-2'>
          <ChatIcon />
          Chat Gane Multired
        </h3>
        {
          Object.keys(onlinePeople).map(userId => (
            <section key={userId} className='border-b border-gray-100 py-2 flex items-center gap-2'>
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span>{onlinePeople[userId]}</span>
            </section>
          ))
        }
      </main>

      <div className="flex flex-col bg-blue-100 w-2/3 p-2">
        <section className='flex-grow'>
          Messages with selected person
        </section>

        <article className="flex gap-2 mx-2">
          <input type="text" placeholder="Type your message"
            className="bg-white border p-2 rounded-md flex-grow" />
          <button
            className="bg-blue-500 p-2 text-white rounded-md">
            <SensIcon />
          </button>
        </article>
      </div>
    </section>
  )
}
