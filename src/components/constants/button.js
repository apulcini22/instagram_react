import React from 'react';

const Button = ({ buttonClass, eventHandler, height, width, urlLink, placeholder }) => {
    // This returns the specific props you put on the item. So if you want to return a state then you need ot put that state in a prop on the item. "onClick={}" click Events also go inside this button. Props only pass laong what needs to be.
    return (
        <button 
            className={buttonClass} 
            height={height} 
            width={width}
            link={urlLink}
            onClick={eventHandler}
        >
        { placeholder }
        </button>
    )
}
export default Button;

