import { Avatar } from './Avatar'

export function Contact ({ id, username, online, onClick, selected }) {
  return (
    <section key={id} onClick={() => onClick(id)} className={`flex cursor-pointer ${selected ? 'bg-blue-50' : ''}`}>
      {selected && (<div className='w-1 h-full bg-blue-500 rounded-r-md'></div>)}
      <div className='flex gap-2 items-center py-2 pl-2'>
        <Avatar online={online} username={username} userId={id} />
        <span className='text-gray-800 font-semibold'>{
          username.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
        }</span>
      </div>
    </section>
  )
}
