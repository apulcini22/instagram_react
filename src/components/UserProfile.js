import React from 'react';
import { emojify } from 'react-emojione';

const UserProfile = ({ username, profile_pic, bio,  numbOfImages, follows, followers }) => {
    const { left, img } = styles;
    return (
        <div>
            <img style={img} width={200} height={200} src={ profile_pic }></img>
            <br />
            <div style={left}>Username is: { username } </div>
            <div style={{marginLeft: 45, paddingBottom: 20}}>{ emojify(':wink: 😸 :D  ^__^') }</div>
            <div style={left} >Biography: { bio } </div>
            <div style={left}>Following: { follows } </div>
            <div style={left}>followers are: { followers } </div>
        </div>
    );
}

export default UserProfile;

const styles = {
    left: {
      marginTop: 20,
      marginLeft: 20
    },
    img: {
      marginLeft: 30, 
      borderTopLeftRadius:20, 
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20 
    }
  }
 