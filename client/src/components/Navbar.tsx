'use client'
import MainNav from '@/components/MainNav'
import StoreSwitcher from './StoreSwitcher'
import { useSuspenseQuery } from '@apollo/client'
import { GetAllStoresDocument } from '@/graphql'

const Navbar = () => {
  const { data } = useSuspenseQuery(GetAllStoresDocument)
  const stores = data?.stores

  return (
    <div className='border-b my-1 sticky px-2'>
      <div className="flex h-10 items-center ">
        <div>
          <StoreSwitcher items={stores} />
        </div>
        {/* Dashbords navbar */}
        <MainNav className='mx-6' /> 
      </div>
    </div>
  )
}

export default Navbar