import React from 'react'
import {
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'

import {
    CalendarIcon,
    ClockIcon,
    ComputerDesktopIcon,
    UsersIcon
} from '@heroicons/react/24/solid'
import {useSession} from 'next-auth/react'

import SidebarRow from './SidebarRow'

const Sidebar = () => {
  const { data: session, status } = useSession()

  return (
    <div className='mt-5 p-2 max-w-[600px] xl:min-width-[300px]'>
      
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="MarketPlace" />
      <SidebarRow Icon={ComputerDesktopIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  )
}

export default Sidebar
