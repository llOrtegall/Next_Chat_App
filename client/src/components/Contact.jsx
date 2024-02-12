import { Avatar } from './Avatar'

export function Contact ({ id, username, online, onClick, selected }) {
  return (
    <div>
      <section key={id} onClick={() => onClick(id)}
        className={`border-b border-gray-100 flex items-center gap-2 cursor-pointer 
          ${selected ? 'bg-blue-50' : ''}`}>
        {selected && (
          <div className='w-1 bg-blue-500 h-full rounded-r-md'></div>
        )}
        <div className='flex gap-2 items-center py-2 pl-2'>
          <Avatar online={online} username={username} userId={id} />
          <span className='text-gray-800'>{username}</span>
        </div>
      </section>
    </div>
  )
}
