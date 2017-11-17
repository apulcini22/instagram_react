import React, { Component, cloneElement } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import UserProfile from './components/UserProfile';

const API_CALL = 'https://api.instagram.com/v1/users/self/?access_token=';

const CLIENT_ID = '594a8a930ed74c64b1250334bb8465d0';

const FIRST_CALL = 'https://api.instagram.com/oauth/authorize/?client_id=594a8a930ed74c64b1250334bb8465d0&redirect_uri=http://localhost:3000/&response_type=token';

const USER_MEDIA = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

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
      hashtags: ''
    };
  }


  handleFirstSubmit = (e) => {
    e.preventDefault();
    window.location.assign(FIRST_CALL);
    profile();
  }


  /* This just makes a call to my personal insta account. */
  componentDidMount() {
    console.log(this.state);
    if(window.location.href.indexOf("access_token=")>-1) {
      const token = window.location.href.split("access_token=")[1].trim();
      this.setState({ access_token: token });
      // console.log(this.state);
      jsonp(API_CALL + token, null, (error, data) => {
        if(error){
          console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error)
        }else{
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
  

   // console.log('map_image_url', imageInfo.images.thumbnail.url, 'map_image_width', imageInfo.images.thumbnail.width, 'map_image_height', imageInfo.images.thumbnail.height);
   loadImages = () => {   
    var imageList = [];
    console.log('imagelist:  ', imageList);
    this.state.imageData.forEach( 
      (imageInfo, index) => {
        imageList.push(<li key={index}><img src={imageInfo.images.thumbnail.url} width={imageInfo.images.thumbnail.width} height={imageInfo.images.thumbnail.height}/></li>);
        console.log('imageListArray', imageList);
      }
    );
    return <ul>{ imageList }</ul>
  };
  
  getUserMedia = (event) => {
    event.preventDefault();
    //this.setState({loading: true}) // happens when user clicks button = 
    jsonp(USER_MEDIA + this.state.access_token, null, (error, data) => {
      if(error){
        console.log('Holllyyyyy ssshhhhhiiiitttttttt: ', error);
        //this.setState({loading: false})
      }else{ 
        this.setState({imageData: data.data });// gets set after data comes back
        console.log('imageDateState: ', this.state.imageData);
        // console.log('images: ', this.state.imageData[4].images.standard_resolution.url);
        // console.log('height: ', this.state.imageData[4].images.standard_resolution.height);
        // console.log('width: ', this.state.imageData[4].images.standard_resolution.width);
        // console.log('image_URL: ', this.state.imageData[4].images.standard_resolution.url);
        loadImages();
      }
    });
  }



  renderItems() {
    let list = [];
    let colorIndex = 0;

    this.state.items.forEach((item, index) => {
      colorIndex = colorIndex >= this.colors.length ? 0 : colorIndex;
      const styles = { color: this.colors[colorIndex] };
      list.push(<li key={index} style={styles}>{ item }</li>);
      colorIndex++;
    });

    return <ul>{ list }</ul>;
  }



    // showHideButton = () => {
    //   if(this.state.access_token != '') {
    //     const buttonText = this.state.loading ? "loading..." : "get User media"
    //     return <button onClick={ this.getUserMedia } >{ buttonText }</button>

    //   }
    //   return <p>Did not work</p>
    //}

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
            <button onClick={this.getUserMedia}>Load User Images</button>
          </div>
        );
      }
      else {
          <p>Nope</p>
      }
    };


	render() {
    console.log('Props: ', this.props);
      return (
        <div> 
          <button target="_blank" onClick={this.handleFirstSubmit}>Click to make Insta submit</button>
          { this.profile() }
          { this.loadImages() }
        </div>
      );
    }
}


