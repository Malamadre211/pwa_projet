import { useNavigate } from "react-router-dom";
import './start.css'

export default function Start() {
    const navigate = useNavigate();
    
    const handleStartClick = () => {
        navigate('/game');
    }

    return (
        <>
        <div>
            <h1>MAG GAME</h1>
        <button className="startbutton" onClick={handleStartClick}>START</button>
        </div>
        </>
    )
}