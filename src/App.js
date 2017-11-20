import React, { Component, cloneElement } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import UserProfile from './components/UserProfile';
import {
  API_CALL,
  FIRST_CALL,
  USER_MEDIA
} from '../config';
import Button from './components/constants/button';
import Card from './components/constants/Card';

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

  /**********************************************************************
  This just makes a call to my personal instagram account.
  ***********************************************************************/
  StartApp = () => {
    /* Access_token should be '' on start up */ 
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

  /****************************************************************
  You have to sign into Instagram adn get an access key to proceed.
  *****************************************************************/  
  handleFirstSubmit = (e) => {
    e.preventDefault();
    window.location.assign(FIRST_CALL);
    this.profile();
  }

  /**********************************************************************
  Loads user Profile once you have clicked on "Get User Profile" 
  ***********************************************************************/
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

  /**********************************************************************
  This event occurs (function runs) once the user has clicked "Get User Media"
  ***********************************************************************/
  getUserMedia = (event) => {
    event.preventDefault();
    jsonp(USER_MEDIA + this.state.access_token, null, (error, data) => {
      if(error){
        console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error);
        this.setState({loading: false});
      }else{ 
        this.setState({cardData: data.data }); // gets set after data comes back
        console.log('Log Card State: ', this.state.cardData);
        this.loadImages();
      }
    });
  }

  /**********************************************************************
  loadImages function Renders Image List
  ***********************************************************************/
  loadImages = () => {   
    var imageList = [];
    this.state.cardData.forEach( 
      (imageInfo, index) => {
         const { link, caption: {text}, images: { low_resolution: { url, width, height } } } = imageInfo;
         let words = text.split("#")[0];
         !words ? "No caption here" : words;
         console.log(words);
        imageList.push(
          <li style={styles.list} key={index}>
            <Card src={url} width={width} height={height} caption={words} postLink={link}/>
          </li>
        );
      });
      return <ul>{ imageList } </ul>
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

const styles = {
  list: {
    listStyle: 'none', 
    padding: 10
  }
}