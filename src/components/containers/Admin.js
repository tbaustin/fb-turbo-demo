import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
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

  updateCurrentUser(attr, event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.profile);
    updated[attr] = event.target.value;

    this.setState({
      profile: updated
    });
  }

  sendUpdates(event) {
    event.preventDefault();
    const { currentUser } = this.props.user;
    if (currentUser == null) {
      return;
    }

    this.props
      .updateCurrentUser(currentUser, this.state.profile)
      .then(data => {
        console.log(`User UPDATED: ${JSON.stringify(data)}`);
      })
      .catch(err => {
        alert(err);
      });
  }

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
            <button onClick={this.sendUpdates.bind(this)}>Update Profile</button>
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
    currentUser: () => dispatch(actions.currentUser()),
    updateCurrentUser: (currentUser, params) => dispatch(actions.updateCurrentUser(currentUser, params))
  };
};

export default connect(stateToProps, dispatchToProps)(Admin);
