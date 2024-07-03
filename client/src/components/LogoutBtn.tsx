'use client'
import { isLoggedInVar } from "./AuthGuard"
import { makeClient } from "@/lib/graphql/ApolloWrapper"
import secureLocalStorage from "react-secure-storage"
import { deleteCookie } from "cookies-next"


function LogoutBtn() {
  const client = makeClient()
  const logout = () => {
    localStorage.removeItem('jwt')

    // evict and garbage collect the cached user object
    client.resetStore()

    // Remove user details from localStorage
    localStorage.removeItem("jwt")
    deleteCookie('jwt')
    secureLocalStorage.removeItem("merchantId")

    isLoggedInVar(false)

  }
  return (
    <button className="font-bold" onClick={logout}>logout</button>
  )
}

export default LogoutBtn