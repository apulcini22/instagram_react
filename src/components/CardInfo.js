import React from 'react';

const Card = ({ urlLink }) => {
    return (
        <div>
            <div>
                <img src={urlLink}/> 
            </div>
            <div>
                <div> User likes will go here</div>
                <div> Caption will go here</div>
            </div>
        </div>
    );
}
export default Card;


