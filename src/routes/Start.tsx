import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import './start.css'

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 */
interface BeforeInstallPromptEvent extends Event {

    /**
     * Returns an array of DOMString items containing the platforms on which the event was dispatched.
     * This is provided for user agents that want to present a choice of versions to the user such as,
     * for example, "web" or "play" which would allow the user to chose between a web version or
     * an Android version.
     */
    readonly platforms: Array<string>;
  
    /**
     * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
     */
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: string
    }>;
  
    /**
     * Allows a developer to show the install prompt at a time of their own choosing.
     * This method returns a Promise.
     */
    prompt(): Promise<void>;
  
  }


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

export default function Start() {
    const navigate = useNavigate();
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    
    const handleStartClick = () => {
        navigate('/game');
    }

  useEffect(
    () => {
      
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault;
        setInstallPrompt(e as BeforeInstallPromptEvent);
      })
    }, [])

    const handleInstallButtonClick = useCallback(async() => {
        if(!installPrompt) {
        return
        }
        try {
        await installPrompt.prompt()
        } catch(error){
        
        }
    }, [installPrompt])

    return (
        <>
        <div className="start-container">
            <h1>MAG GAME</h1>
        <button className="installbutton" onClick={handleInstallButtonClick}>INSTALL</button>
        <button className="startbutton" onClick={handleStartClick}>START</button>
        <button onClick={share} className="sharebutton">SHARE</button>
        </div>
        </>
    )
}