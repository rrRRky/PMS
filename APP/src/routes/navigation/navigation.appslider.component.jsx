import React, { useState } from "react";
import './navigation.appslider.styles.css';
import Tooltip from '@mui/material/Tooltip';

const AppIconSlider = ({ icons, tooltipTitle }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleClick = (index) => {
      setActiveIndex(index);
    };

  return (
    <div className="app-icon-slider">
      {icons.map((icon, index) => (
        <Tooltip key={index} title={tooltipTitle[index]}>
            <div className={`app-icon ${activeIndex === index ? "active" : ""}`} onClick={() => handleClick(index)}>
                <img src={icon}  alt={`App Icon ${index + 1}`} />
            </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default AppIconSlider;
