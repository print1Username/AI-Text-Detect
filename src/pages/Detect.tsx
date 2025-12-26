import { useLocation, useNavigate } from 'react-router-dom'

import BackButton from './components/back_button';
import DetectImage from './components/detect_image';
import ThemeToggle from './components/theme_toggle';

export default function Detect() {
    const { state } = useLocation()
    const navigate = useNavigate()

    if (!state?.link){
        navigate('/')
        return null
    }

    return (
        <>
            <BackButton/>
            <h1>Image</h1>
            <DetectImage 
                link={state?.link}
                file={state?.file}
            />
            <ThemeToggle/>

        </>
    )
}