import { createContext, useContext } from 'react'


import { CONTEXT_ERR } from '@/errors/context'

interface Value {
    follow: boolean
    setFollow: (follow: boolean) => void
}

const HeadBarContext = createContext<Value | null>(null)

export const HeadBarProvider = HeadBarContext.Provider

export const useHeadBarContext = () => {
    const context = useContext(HeadBarContext)
    if (!context) {
        throw CONTEXT_ERR.notFound('AccountProvider')
    }

    return context
}
