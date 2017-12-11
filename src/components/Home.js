import React from 'react';
import Button from './constants/button';

const Home = () => {
    return (
        <div style={{ width: 100, height: 100 }}>
            <img className="hoverable" src="https://dummyimage.com/2000x2000/000/fff.jpg&text=Welcome+to+Instagram"></img>
            <Button 
            className="btn btn-outline-default waves-effect" 
            placeholder={buttonText} 
            eventHandler={this.handleFirstSubmit} 
            />
        </div>
    )
}
 
export default Home;