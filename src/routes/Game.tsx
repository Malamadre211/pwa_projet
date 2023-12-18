import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './start.css'

export default function Game() {
    const [time, setTime] = useState(0);  
    const [dateDebut, setDateDebut] = useState(Date.now())
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    
    const handleCompteurClick = () => {
      const time = Date.now() - dateDebut
      if (count === 9) {
        navigate('/end/' + time);
      }
      setPosition({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      });
      setCount((prevCount) => prevCount + 1);
    };

    const [position, setPosition] = 
    useState({ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) });
  
    const divStyle = {
      top: `${position.y}%`,
      left: `${position.x}%`
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 120);
  
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="game-container">
        <div className="count">{count}/10</div>
        <div className="time">{(Date.now() - dateDebut) / 1000}</div>
        <div className="ronde" style={divStyle} onClick={handleCompteurClick}></div>
      </div>
    );
  };