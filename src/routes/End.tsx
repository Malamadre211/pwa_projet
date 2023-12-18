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
        <button className="startbutton" onClick={handleStartClick}>RESTART</button>
        <p>It took you {timeInSeconds}s to finish the game.</p>
        </div>
        </>
    )
}