import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        username: '',
        password: ''
      }
    };
  }

  updateProfile(attr, event) {
    let updated = Object.assign({}, this.state.profile);
    updated[attr] = event.target.value;

    this.setState({
      profile: updated
    });
  }

  registerProfile(event) {
    this.props
      .register(this.state.profile)
      .then(() => {
        this.props.history.push('/admin');
        return null;
      })
      .catch(err => {
        alert(`ERROR: ${err}`);
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <Link to={`/admin`}>
            <button>Admin Page</button>
          </Link>
        </div>
        <h1>Welcome to FB-App</h1>
        <input onChange={this.updateProfile.bind(this, 'username')} type="text" placeholder="Username" />
        <br />
        <input onChange={this.updateProfile.bind(this, 'password')} type="password" placeholder="Password" />
        <br />
        <button onClick={this.registerProfile.bind(this)}>Join</button>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    register: params => dispatch(actions.register(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Home);
