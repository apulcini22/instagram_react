import React from 'react';

const CardInfo = ({ src, width, height, postLink, imgLikes }) => {
    const { img, likes } = styles;
    return (
        <div className="card align-items-center z-depth-10 hoverable">
            <div className="view overlay hm-white-slight">
                <img className="img" style={img} src={src} alt="Card image cap" width="100%" />
            </div>
            <div className="card-body align-items-center">
                <span className="row justify-content-center align-middle" style={likes}><i className="fa fa-thumbs-up"> { imgLikes }</i></span>
                <a href={postLink} target="_blank">
                    <button className="btn btn-primary justify-content-center">Go to Post</button>
                </a>
            </div>
        </div>
    );  
}
export default CardInfo;

const styles = {
    img: {
        padding: 5
    }
}