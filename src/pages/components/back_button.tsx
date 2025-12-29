import { useNavigate } from "react-router-dom";
import Button from "./button";
import { ArrowBigLeft } from 'lucide-react';

export default function BackButton(){
    const navigate = useNavigate()

    return (
        <div>
            <Button
                onClick={() => {navigate('/')}}
                className="back-button">
                <ArrowBigLeft />
                Back
            </Button>
        </div>
    )
}