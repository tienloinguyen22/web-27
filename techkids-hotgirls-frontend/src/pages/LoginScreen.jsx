import React from 'react';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errMessage: '',
    loading: false,
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      errMessage: '',
      loading: true,
    });

    try {
      const data = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      }).then((res) => {return res.json();});

      if (!data.success) {
        this.setState({
          errMessage: data.message,
        });
      } else {
        // save data to localStorage
        window.localStorage.setItem('email', data.data.email);

        window.location.href = '/';
      }
    } catch (error) {
      this.setState({
        errMessage: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className='row'>
        <div className="col-4"></div>
        <div className="col-4">
          <h2 style={{marginTop: '50px', textAlign: 'center'}}>
            Login
          </h2>

          <form onSubmit={this.handleSubmit} style={{marginTop: '50px'}}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>

            {this.state.errMessage ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errMessage}
              </div>
            ) : null}

            <div style={{display: 'flex', justifyContent: 'center'}}>
              {this.state.loading ? (
                <button className='btn btn-primary'>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </button>
              ) : (
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                />
              )}
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    );
  }
}

export default LoginScreen;