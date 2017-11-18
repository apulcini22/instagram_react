import React, { Component, cloneElement } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import UserProfile from './components/UserProfile';
import {
  API_CALL,
  CLIENT_ID,
  FIRST_CALL,
  USER_MEDIA
} from '../config';
import Button from './components/constants/button';
import Card from './components/constants/Card';
import CardInfo from './components/CardInfo';

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
      imageData: [],
      hashtags: '',
    };
  }

  

  StartApp = () => {
    if(this.state.access_token === '') { 
      let buttonText = !this.state.loading ? "Get User Profile" : "Get User Media";
      return (
        <Button 
        className="btn btn-outline-default waves-effect" 
        placeholder={buttonText} 
        eventHandler={this.handleFirstSubmit} 
        />
      );  
    }
  }
 
    handleFirstSubmit = (e) => {
      e.preventDefault();
      window.location.assign(FIRST_CALL);
      this.profile();
    }

  /* This just makes a call to my personal insta account. */
  componentDidMount() {
    this.StartApp();
    if(window.location.href.indexOf("access_token=")>-1) {
      const token = window.location.href.split("access_token=")[1].trim();
      this.setState({ access_token: token });
      jsonp(API_CALL + token, null, (error, data) => {
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
      })
    }
    
  }

  loadImages = () => {   
    var imageList = [];
    this.state.imageData.forEach( 
      (imageInfo, index) => {
        imageList.push(<li key={index}><CardInfo urlLink="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" text={ index }/></li>);
      }
    );
    return <ul>{ imageList }</ul>
  };

  getUserMedia = (event) => {
    event.preventDefault();
    jsonp(USER_MEDIA + this.state.access_token, null, (error, data) => {
      if(error){
        console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error);
        this.setState({loading: false});
      }else{ 
        this.setState({imageData: data.data }); // gets set after data comes back
        console.log('Logs the imageDateState: ', this.state.imageData);
        this.loadImages();
      }
    });
  }

  profile = () => {
    if(this.state.access_token != '') { 
      const { username, profile_pic, bio, follows, following } = this.state;
      return (
        <div>
          <UserProfile 
            profile_pic={profile_pic}
            username={username}
            follows={follows}
            following={following}
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
    else {
      <p>Nope</p>
    }
  };

	render() {
    console.log('Log Props: ', this.props);
      return (
        <div className="container" >  
          <div className="row">{ this.StartApp() }</div>
          <div className="row">{ this.profile() }</div>
          <div className="row">{ this.loadImages() }</div>
        </div>
      );
    }
};