import React from "react";

const InformContent =({ aiIcon, informText, speechBubbleText, SubcustomerIcon }) => {
    return (
      <div className='inform-content'>
        <div className='inform-content-item'>
          <img src={aiIcon} alt="AI Icon" className='cail-inform-img' />
          <div className='speech-bubble'>
            <span>{informText}</span>
          </div>
        </div>
        <div className='inform-content-item'>
          <div className='speech-bubble'>
            {speechBubbleText.map((text, index) => (
              <span key={index}>{text}</span>
            ))}
          </div>
          <img src={SubcustomerIcon} alt="Worker Icon" className='cail-inform-img' />
        </div>
      </div>
    );
  };

export default InformContent;


