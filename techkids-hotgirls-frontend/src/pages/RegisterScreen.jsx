import React from 'react';

const emailRegex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class RegisterScreen extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    errMessage: '',
    isSuccess: false,
    counter: 3,
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

  handleConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  handleFullnameChange = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();

    // validate
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        errMessage: 'Invalid email address'
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        errMessage: 'Password must be more than 6 characters'
      });
    } else if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        errMessage: 'Confirm password didnt match'
      });
    } else if (!this.state.fullName) {
      this.setState({
        errMessage: 'Please input full name'
      });
    } else {
      this.setState({
        errMessage: '',
        loading: true,
      });

      // fetch
      try {
        const data = await fetch(`http://localhost:3001/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
          }),
        }).then((res) => {return res.json();});

        if (!data.success) {
          this.setState({
            errMessage: data.message,
          });
        } else {
          this.setState({
            isSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              counter: 2,
            });
          }, 1000);
          setTimeout(() => {
            this.setState({
              counter: 1,
            });
          }, 2000);
          setTimeout(() => {
            this.setState({
              counter: 0,
            });
            window.location.href = '/login';
          }, 3000);
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
    }
  };

	render() {
		return (
			<div className="row">
				<div className="col-4"></div>
				<div className="col-4">
          <h2 style={{marginTop: '50px', textAlign: 'center'}}>
            Register Account
          </h2>

					<form onSubmit={this.handleFormSubmit} style={{marginTop: '50px'}}>
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

            <div className="form-group">
              <label for="exampleInputPassword2">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputFullname">Full name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputFullname"
                placeholder="Enter fullname"
                value={this.state.fullName}
                onChange={this.handleFullnameChange}
              />
            </div>

            {this.state.errMessage ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errMessage}
              </div>
            ) : null}

            {this.state.isSuccess ? (
              <div class="alert alert-success" role="alert">
                Login success, redirect in {this.state.counter}s
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
                  value="Register"
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

export default RegisterScreen;
