import { useNavigate, useParams } from "react-router-dom";
import './start.css'

export default function Restart() {
    const navigate = useNavigate();
    const {time} = useParams();
    const timeValue = parseFloat(time || "0"); 
    const timeInSeconds = timeValue / 1000;
    
    const handleStartClick = () => {
        navigate('/game');
    }

    return (
        <>
        <div className="end">
            <h1>The End</h1>
        <button className="buttonstart" onClick={handleStartClick}>RESTART</button>
        <p>Vous avez mis {timeInSeconds}s à terminer la partie.</p>
        </div>
        </>
    )
}