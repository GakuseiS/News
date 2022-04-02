import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

interface IContainer {
    setAuthModal: Function;
    isAuthenticated: boolean;
}

export const Container:React.FC<IContainer> = ({setAuthModal, isAuthenticated}) => {
    return (
        <>
            <Header setAuthModal={setAuthModal} isAuthenticated={isAuthenticated}/>
            <Outlet />
            <Footer />
        </>
    )
}
