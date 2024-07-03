'use client'
import { useEffect } from "react"
import { useStoreModal } from "@/hooks/useStoreModal"
export function ReactiveStoreModal() {
const [onOpen, isOpen] = useStoreModal((state) => [state.onOpen, state.isOpen])

  useEffect(() => {
    if (!isOpen) {
      onOpen() // The modal will always be open
    }
  }, [isOpen, onOpen])
  return null
}
