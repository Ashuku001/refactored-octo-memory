'use client'
import { gql, makeVar, useQuery } from '@apollo/client';
import { LandingPage } from './logInRegister'
import useLocalStorage from '@/hooks/useLocalStorage';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

interface GuardProps {
  children: React.ReactNode
}
export const isLoggedInVar = makeVar<boolean>(false)
export const merchantId = makeVar<number>(-100)


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function AuthGuard({ children }: GuardProps) {
  const [isMounted, setIsMounted] = useState(false)
  const {data} = useQuery(IS_LOGGED_IN)
  const localStorage = useLocalStorage()
  isLoggedInVar(!!getCookie('jwt'))
  merchantId(parseInt(secureLocalStorage.getItem('merchantId') as string))

  useEffect(() => {
    setIsMounted(true)
  },[])
  if(!isMounted) return null
  
  return (
    <div className='w-full h-full'>
    {data.isLoggedIn ? (
      children
    ) : <LandingPage/>}
    </div>
  )
}

export default AuthGuard