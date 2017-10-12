import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props
      .currentUser()
      .then(data => {
        console.log(`Current User: ${JSON.stringify(data)}`);
      })
      .catch(err => {
        alert(err);
      });
  }

  updateCurrentUser(attr, event) {}

  render() {
    const { currentUser } = this.props.user;
    return (
      <div className="container">
        {currentUser == null ? null : (
          <div>
            <h2>Welcome {currentUser.username}</h2>
            <hr />
            <input onChange={this.updateCurrentUser.bind(this, 'firstName')} style={{ marginBottom: 12 }} type="text" placeholder="First Name" />
            <br />
            <input onChange={this.updateCurrentUser.bind(this, 'lastName')} style={{ marginBottom: 12 }} type="text" placeholder="Last Name" />
            <br />
            <input onChange={this.updateCurrentUser.bind(this, 'email')} style={{ marginBottom: 12 }} type="text" placeholder="Email" />
            <br />
          </div>
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    currentUser: () => dispatch(actions.currentUser())
  };
};

export default connect(stateToProps, dispatchToProps)(Admin);
