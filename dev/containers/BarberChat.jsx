import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// import { connect } from 'react-redux';

// barber component joins room automatically when view is loaded
// this way the user view can grab the corresponding barber email
// when trying to chat and user view will emit a message to that room

class BarberChat extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      email: 'snypper@io.com',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    socket.emit('join', { email: this.state.email });
  }
  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('private-message', { email: this.state.email, msg: this.state.term });
    this.setState({ term: '' });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.term} onChange={this.handleChange} />
      </form>
    );
  }
}


export default BarberChat;
