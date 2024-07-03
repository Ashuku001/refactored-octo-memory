'use client'
import { makeVar } from "@apollo/client";

export const useShowSearchList = makeVar<boolean>(false)
export const useIsSelected = makeVar([false])
export const useSelectedTemplate = makeVar([])
export const reactiveChatId = makeVar<number>(-100)
export const useCustomerId = makeVar<number[]>([-100])