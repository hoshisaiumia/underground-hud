import LogoImage from '../assets/logo.png'
import { useState } from 'react'
import { useNuiEvent } from '../utils/useNuiEvent'

const positionClasses = {
    tl: 'top-5 left-5',
    tc: 'top-5 left-1/2 -translate-x-1/2',
    tr: 'top-5 right-5',
    bl: 'bottom-5 left-5',
    bc: 'bottom-5 left-1/2 -translate-x-1/2',
    br: 'bottom-5 right-5',
};

type LogoPosition = keyof typeof positionClasses;

export function Logo() {
    const [position, setPosition] = useState<LogoPosition>('tc')
    const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);

    useNuiEvent<{ position: LogoPosition }>('setLogoPosition', (data) => {
        setPosition(data.position)
    })

    useNuiEvent('setLogoVisibility', (data: boolean) => {
        setIsLogoVisible(data)
    })

    if (!isLogoVisible) return null 

    return (
        <div className={`absolute w-30 opacity-60 pointer-events-none ${positionClasses[position]}`}>
            <img src={LogoImage} alt="" />
        </div>
    )
}