export function Avatar ({ userId, username }) {
  const colors = ['bg-red-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-indigo-400']

  const userIdBase10 = parseInt(userId, 16)
  const colorIndex = userIdBase10 % colors.length
  const color = colors[colorIndex]

  return (
    <div className={`w-8 h-8 rounded-full flex items-center ${color}`}>
      <span className="text-center w-full uppercase font-semibold opacity-70">
        {username[0]}
      </span>
    </div>
  )
}
