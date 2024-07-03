import React from 'react'
import { MainMenu } from '@/components/NavigationMenu/MainMenu'

import DarkModeButton from '@/components/DarkModeButton'
import LogoutBtn from '@/components/LogoutBtn'
import { MessageNotification } from './Notification'
function Header() {
    return (
        <header className='h-10 py-2 sticky top-0 bg-slate-100/90 dark:bg-black/90 z-40 px-2 flex flex-row items-center'>
            <DarkModeButton />
            <MainMenu navigationClass='h-8'/>
           
            <div className='ml-auto flex item-center space-x-2'>
                <MessageNotification/>
                <LogoutBtn/>
            </div>
        </header>
    )
}

export default Header