loadImages = () => {
    userMedia.images.standard_resolution.map((image) => {
    let imageList = [];
    imagelist.push(<li key={image key}> <img src={image.url}></img></li> );
    }
    return ( //// this goes outside of the map function.. 
        //// The map function loops through the "thing" then you return it into a ul or ol list.
    <ul>
    { imageList }
    </ul>
    );
}



this.state.imageData.forEach( (image, index) => {
    let imageList = [];
    console.log('map_image', image[index].images.standard_resolution.url, 'index_num: ', index);
    imagelist.push(<li key={index}> <img src={image.url}></img></li>);
    });



    for(let image of this.state.imageData){
        console.log('looped id: ', image.images.standard_resolution.url);
       }