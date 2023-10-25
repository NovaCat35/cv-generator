import { useState } from "react";

interface ErrorProps {
   errorMessage: string;
   alertStatus: boolean;
   setAlert: (param:boolean) => void;
}

export default function Error({errorMessage, alertStatus, setAlert} : ErrorProps) {
   const handleAnimationEnd = () => {
      // Callback function to be executed after the animation ends, resets alertStatus back to false
      setTimeout(() => {
         setAlert(false);
      }, 100); 
    };

    return (
         <div className={`error ${alertStatus ? 'alert' : ''}`} onAnimationEnd={handleAnimationEnd}> {errorMessage} </div>
    )
}