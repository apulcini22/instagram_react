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
import Button from './components/constants/Card';
import Card from './components/constants/Card';
import Cardinfo from './components/CardInfo';

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

 
    handleFirstSubmit = (e) => {
      e.preventDefault();
      if(this.state.access_token === '') {
        window.location.assign(FIRST_CALL);
        profile();
      }
    }


  /* This just makes a call to my personal insta account. */
  componentDidMount() {
    console.log('Logs on first Mount: ', this.state);
    if(window.location.href.indexOf("access_token=")>-1) {
      const token = window.location.href.split("access_token=")[1].trim();
      this.setState({ access_token: token });
      // console.log(this.state);
      jsonp(API_CALL + token, null, (error, data) => {
        if(error){
          console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error)
        } 
        else {
          this.setState(
            { username: data.data.username,
              profile_pic: data.data.profile_picture,
              bio: data.data.bio,
              numbOfImages: data.data.counts.media,
              follows: data.data.counts.follows,
              followers: data.data.counts.followed_by
            }
          )
        }
      })
    }
    
  }

  loadImages = () => {   
    var imageList = [];
    // console.log('imagelist:  ', imageList);
    this.state.imageData.forEach( 
      (imageInfo, index) => {
        imageList.push(<li key={index}><Card><Cardinfo /></Card></li>);
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
        loadImages();
      }
    });
  }

    // showHideButtonText = () => {
    //   if(this.state.access_token != '') {
    //     this.state.loading = true;
    //     const buttonText = this.state.loading ? "loading..." : "get User media";
    //     return <button onClick={ this.getUserMedia } >{ buttonText }</button>
    //   }
    //   return <p>Did not work</p>
    // }

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
            <Button className="btn btn-lg btn-default" onClick={this.getUserMedia}>Load User Images</Button>
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
          <Button 
            className="btn btn-outline-default waves-effect" 
            placeholder="Some text will state here" 
            // eventHandler={this.handleFirstSubmit} 
          />
          <div className="row">{ this.profile() }</div>
          <div className="row">{ this.loadImages() }</div>
        </div>
      );
    }
};
