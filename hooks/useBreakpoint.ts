import { useEffect, useState } from 'react';
import { Size, screenSizes } from '../utils/getScreenSizes';

//  returns true if chosen breakpoint is larger than window  
const useBreakpoint = (size: Size) => {

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth: 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return  screenSizes[size] > windowWidth;
};

export default useBreakpoint;
