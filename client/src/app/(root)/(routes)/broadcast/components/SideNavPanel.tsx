'use client'
import MainNav from './MainNav'
import { MessageSwitcher } from './MessageSwitcher'
import { SidePanel } from "@/components/ui/SidePanel";
import { useBulkNav } from '@/hooks/useSideNav';

const SidePanelNav = () => {
  const bulkNav = useBulkNav()
  return (
      <SidePanel
        title=""
        description=""
        isOpen={bulkNav.isOpen}
        onClose={bulkNav.onClose}
        className='z-70 px-2 pt-8'
        side='left'
      >
        <div className="flex flex-col ">
          <MessageSwitcher />
          <MainNav className='' />
        </div>
      </SidePanel>
  )
}

export default SidePanelNav