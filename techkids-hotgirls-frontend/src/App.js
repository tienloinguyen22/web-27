import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';
import CreatePostScreen from './pages/CreatePostScreen';

class App extends React.Component {
	state = {
		currentUser: ''
	};

	componentWillMount() {
		const currentUser = window.localStorage.getItem('email');
		this.setState({
			currentUser: currentUser
		});
	}

	handleLogout = async () => {
		// fetch
		// clear localStorage
		// setstate
	};

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="/">
						Techkids Hotgirls
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{this.state.currentUser ? (
							<div
								className="navbar-nav mr-auto"
								style={{ diplay: 'flex', alignItems: 'center' }}
							>
								Welcome {this.state.currentUser},{' '}
								<a className="nav-link" onClick={this.handleLogout}>
									Log out!
								</a>
							</div>
						) : (
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="/login">
										Login <span className="sr-only">(current)</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/register">
										Register
									</a>
								</li>
							</ul>
						)}

						<form className="form-inline my-2 my-lg-0">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button
								className="btn btn-outline-success my-2 my-sm-0"
								type="submit"
							>
								Search
							</button>
						</form>

            <a
              href='/create-post'
              className="btn btn-outline-primary my-2 my-sm-0 ml-3"
            >
              + New post
            </a>
					</div>
				</nav>

				<div className="container">
					<BrowserRouter>
						<Switch>
							<Route path="/" exact={true} component={HomeScreen} />
							<Route path="/register" component={RegisterScreen} />
							<Route path="/login" component={LoginScreen} />
              <Route path="/create-post" component={CreatePostScreen} />
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default App;
