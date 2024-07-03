'use client'
import Link from 'next/link'
import React from 'react'

type Props = {
    path: string;
    name: string;
    is_active: boolean;
}

function NavLink({path, name, is_active}: Props) {
  return (
    <Link href={`/${path}`} className={`navLink ${is_active && "underline decoration-orange-400"} uppercase p-0`} onClick={() => localStorage.removeItem('activeChat')}>
        {name}
    </Link>
  )
}

export default NavLink