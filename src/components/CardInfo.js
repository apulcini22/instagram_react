import React from 'react';

const CardInfo = ({ urlLink, text }) => {
    return (
        <div className="card">
            <img className="img-fluid"  src={ urlLink } alt="Card image cap" width="150" height="150"/>
            <div className="card-body">
                <h4 className="card-title">{ text }</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Button</a>
            </div>
        </div>
    );
}
export default CardInfo;


