import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  // hooks
  const navigate = useNavigate();
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate('/login-register');
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
    <b>not authorized</b>: redirecting to home page in {count} seconds
    {/* can be used any kind of gif file here so that it shows animation */}
    {/* can use fullscreenLoader.md file*/}
    </div>
  );
}
