import React from 'react';

const CardInfo = ({ src, width, height, caption, postLink }) => {
    return (
        <div className="card col-md-4 z-depth-6 hoverable">
            <div className="view overlay hm-white-slight">
                <img className="img-fluid"  src={src} alt="Card image cap" width={width} height={height} />
            </div>
            <div className="card-body">
                <h6 className="card-title">{ caption }</h6>
                <a href={postLink} target="_blank">
                    <button className="btn btn-primary">Go to Post</button>
                </a>
            </div>
        </div>
    );
}
export default CardInfo;