import React, { Component } from 'react';
import jsonp from 'jsonp';
import UserProfile from './components/UserProfile';
import Button from './components/constants/button';
import Card from './components/constants/Card';


const AUTH_CALL = 'https://www.instagram.com/oauth/authorize/?client_id=756c7ecbce2643f99345c90dd9a769ff&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content+likes';

const SELF = 'https://api.instagram.com/v1/users/self/?access_token=';

const MEDIA = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

const TOKEN = '1140263199.756c7ec.0319c734e3de411db3fdddeaf33c5092';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      profile_pic: '',
      numbOfImages: 0,
      bio: '',
      follows: 0,
      followers: 0,
      loading: false,
      userMedia: [],
      access_token: '',
      cardData: [],
      hashtags: '',
      loaded: false
    };
  }

  /****************************************************************************************************
  Loads up once component has mounted and invoked StartApp function which shows  a button to enter
  ****************************************************************************************************/
  componentDidMount() {
    this.StartApp();
    if(window.location.href.indexOf("access_token=")>-1) {
      const token = window.location.href.split("access_token=")[1].trim();
      this.setState({ access_token: token });
      jsonp(SELF + token, null, (error, data) => {
        if(error){
          console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error)
        } 
        else {
          this.setState({ 
            username: data.data.username,
            profile_pic: data.data.profile_picture,
            bio: data.data.bio,
            numbOfImages: data.data.counts.media,
            follows: data.data.counts.follows,
            followers: data.data.counts.followed_by
          })
        }
        console.log(`DATA: `, data.data.counts.followed_by);
      });
    } 
  }

  /**********************************************************************
  This just makes a call to my personal instagram account.
  ***********************************************************************/
  StartApp = () => {
    /* Access_token should be '' on start up */ 
    if(this.state.access_token === '') { 
      let buttonText = !this.state.loading ? "Get User Profile" : "Get User Media";
      return (
        // TODO: Move this button and make a new homepage
        <Button 
        className="btn btn-outline-default waves-effect" 
        placeholder={buttonText} 
        eventHandler={this.handleFirstSubmit} 
        />
      );  
    }
  }

  /****************************************************************
  You have to sign into Instagram and get an access key to proceed.
  *****************************************************************/  
  handleFirstSubmit = (e) => {
    e.preventDefault();
    window.location.assign(AUTH_CALL);
    this.profile();
  }

  /**********************************************************************
  Loads user Profile once you have clicked on "Get User Profile" 
  ***********************************************************************/
  profile = () => {
    if(this.state.access_token != '') { 
      const { username, profile_pic, bio, follows, followers } = this.state;
      return (
        <div className="text-center" >
          <UserProfile 
            profile_pic={profile_pic}
            username={username}
            follows={follows}
            followers={followers}
            bio={bio}
          />
          <Button 
            className="btn btn-outline-default waves-effect" 
            placeholder="Get User Media"
            eventHandler={this.getUserMedia} 
          />
        </div>
      );
    }
  };

  /******************************************************************************
  This event occurs (function runs) once the user has clicked "Get User Media"
  *******************************************************************************/
  getUserMedia = (event) => {
    event.preventDefault();
    // const userId = this.state.access_token.split(".")[0];
    jsonp( MEDIA + this.state.access_token, null, (error, data) => {
      if(error){
    console.log('ERROR GETTING MEDIA STATE TO LOAD: ', error);
        this.setState({loading: false});
      }else{ 
        this.setState({cardData: data.data, loaded: true }); // gets set after data comes back
        // TODO: hide button once clicked on  
        this.loadImages();
      }
    });
  }

  /**************************************************************************
  loadImages function Renders Image List
  ***************************************************************************/
  loadImages = () => {   
    var imageList = [];
    this.state.cardData.forEach( 
      (imageInfo, index) => {
         const { link, images: { low_resolution: { url, width, height } }, likes: { count } } = imageInfo;
        imageList.push(
          <li className="col-md-4" style={{ listStyle: 'none', padding: 10 }}  key={index}>
            <Card src={url} postLink={link} imgLikes={count}/>
          </li>
        );
      });
      return <ul className="row" >{ imageList } </ul>
  };

	render() {
      return (
        <div className="container">  
          <div className="row">{ this.StartApp() }</div>
          <div className="row">{ this.profile() }</div>
          <div>{ this.loadImages() }</div>
        </div>
      );
    }
};