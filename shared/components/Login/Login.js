import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      data: [1, 2, 3],
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <form action="/auth/login" method="POST">
          <input type="text" value={data[0]} />
          <input type="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default Login;
