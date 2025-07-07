import Image from 'next/image';

interface HeaderProps {
  name?: string | null;
  image?: string | null;
  username?: string | null;
}

export const Header = async ({ name, image, username }: HeaderProps) => {
  return (
    <>
      <aside className='flex items-center gap-3 py-2'>
        <Image
          className='rounded-full shadow-md'
          src={image ?? '/avatar.svg'}
          alt={name ?? 'User Avatar'}
          width={50}
          height={50}
        />
        <article className='font-semibold'>
          <p>{username}</p>
          <h1>{name}</h1>
        </article>
      </aside>
    </>
  )
}