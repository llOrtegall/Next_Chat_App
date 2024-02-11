export function Avatar ({ userId, username }) {
  return (
    <div className='w-8 h-8 bg-red-200 rounded-full'>
      {username[0]}
    </div>
  )
}
