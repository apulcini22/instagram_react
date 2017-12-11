import React from 'react';
import { emojify } from 'react-emojione';

const UserProfile = ({ username, profile_pic, bio,  numbOfImages, follows, followers }) => {
    const { info, biog } = styles;
    return (
        <div className="row justify-content-center " style={{marginTop: 10}}>
            <img className="row rounded-circle z-depth-6 hoverable" width={200} height={200} src={ profile_pic }></img>
            <div className="row d-block" style={info}>
                <h4>{ username }</h4>
                <div>
                    <span className="font-weight-bold" >{ follows }</span>
                    <span style={{paddingLeft: 5, paddingRight: 20}}>Following</span>
                    <span className="font-weight-bold" style={{paddingRight: 5}}>{ followers }</span>
                    <span>followers</span>
                </div>
            </div>
            <h5 className="text-center container" style={biog}>{ bio } </h5>
        </div>
    );
}

export default UserProfile;

const styles = { 
    info: {
        marginLeft: 50,
        marginTop: 30
    },
    biog: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    }
}