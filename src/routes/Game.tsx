import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './start.css'

const son = new Audio("/mixkit-arcade-retro-changing-tab-206.wav")

const share = async () => {
  try {
    await navigator.share({
      title: 'Mag Game',
      text: 'Check out this game!',
      url: 'pwa-projet-zeta.vercel.app'
    });
    console.log('Shared successfully');
  } catch (error) {
    console.error('Error sharing:', error);
  }
};


export default function Game() {
    const [_, setTime] = useState(0);  
    const [dateDebut, setDateDebut] = useState<number | null>(null)
    const [count, setCount] = useState(0);
    const [countryName, setCountry] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getCountryName(latitude, longitude);
      });
    }, [])

    const getCountryName = async (latitude: number, longitude: number) => {
      console.log('latitude', latitude, 'longitude', longitude);
      const APICall = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const response = await fetch(APICall)
      const data = await response.json()
      const fetchedCountryName = data.countryName;
      console.log(data);
      
      setCountry(fetchedCountryName); 
    };

    useEffect(() => {
      setDateDebut(Date.now())
    }, [])
    
    const handleCompteurClick = () => {
      const time = Date.now() - dateDebut!
      if (count === 9) {
        navigate('/end/' + time);
      }
      
      son.pause()
      son.currentTime = 0
      son.play()

      if(navigator.vibrate){
        navigator.vibrate([100, 50, 100]);
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
      }, 133);
  
      return () => clearInterval(interval);
    }, []);
    

    return (
      <div className="game-container">
        <div className="country">{countryName}</div>
        <div className="count">{count} / 10</div>
        <div className="time">{dateDebut ? (Date.now() - dateDebut) / 1000 : 0}</div>
        <div className="ronde" style={divStyle} onClick={handleCompteurClick}></div>
        <button onClick={share} className="share-button">Share</button>
      </div>
    );
  };