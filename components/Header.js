import React from 'react'
import Image from 'next/image';
import {BellIcon,ChatBubbleBottomCenterTextIcon,ChevronDownIcon,HomeIcon,ViewColumnsIcon,
UserGroupIcon,} from '@heroicons/react/24/solid'
import {FlagIcon,PlayIcon,MagnifyingGlassIcon,ShoppingCartIcon} from '@heroicons/react/24/outline'
import HeaderIcon from '../components/HeaderIcon'
import {useSession} from 'next-auth/react'
import {signOut} from 'next-auth/react'

const Header = () => {
  // const[session]  = useSession()
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
      <div className='flex items-center'>
      <Image 
        src="https://links.papareact.com/5me"
        width={40} 
        height={40}
        layout="fixed"
      />
        <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
          <MagnifyingGlassIcon className='h-6 text-gray-600'/>
          <input type="text"
          className='hidden md:inline-flex outline-none flex flex-shrink ml-2 items-center bg-transparent placeholder-gray-500'
          placeholder='Search facebook' />
        </div>
      </div>
      <div className='flex justify-center flex-grow'>
        <div className='flex space-x-6 md:space-x-2'>
          <HeaderIcon Icon={HomeIcon}/>
          <HeaderIcon Icon={FlagIcon}/>
          <HeaderIcon Icon={PlayIcon}/>
          <HeaderIcon Icon={ShoppingCartIcon}/>
          <HeaderIcon Icon={UserGroupIcon}/>
        </div>
      </div>
      <div className='flex items-center sm:space-x-7 justify-end'>
        <Image
        onClick={signOut}
        className="rounded-full cursor-pointer"
        src={session.user.image}
        width="40"
        height="40"
        layout='fixed'
        />
        
        <p className='whitespace-nowrap font-semibold pr-3'>{session.user.name}</p>
        <ViewColumnsIcon className="icon"/>
        <ChatBubbleBottomCenterTextIcon className="icon"/>
        <BellIcon className='icon'/>
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  )
}

export default Header
