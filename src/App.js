import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 'My Name Is Nick'
    };
  }

	render() {
		return (
			<div>
        { this.state.value }
			</div>
		);
	}
}
