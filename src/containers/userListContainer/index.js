import React from "react";
import List from "../../components/list";

class UserListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	//GETS ALL USERS WITTH LIMIT OF 10 
	getUsers = () => {
		fetch("http://localhost:3000/api/users?_page=1&_limit=10")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	// DELETE USER BY GIVEN ID 
	deleteUser = (id) => {
		fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'DELETE'
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.getAllUsers();
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	// SEARCH USER WITH TEXT AS PARAMETER
	searchUserByName = (e) => {
		const searchedUser = e.target.value; 
		
		fetch(`http://localhost:3000/api/users?q=${searchedUser}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					items:result
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	//PAGINATION WITH FILTERS
	nextPage = () => {
		const currentPage = 2;

		fetch(`http://localhost:3000/api/users?_page=${currentPage}&_limit=10`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					items:result
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	renderHeader = () => (
		<React.Fragment>
			<div className="title_container">
				<h1 className="main_title">Test <span className="hightlighted">beetrack</span></h1>
			</div>
			<div className="main_search_bar">
				<input placeholder="buscar contacto..." 
					type="text"
					onKeyUp={this.searchUserByName}/>
				<button className="main_button">Nuevo contacto</button>
			</div>
		</React.Fragment>
	)

	renderPaginator = () => (
		<React.Fragment>
			<div className="main_paginator">
					<a onClick={this.nextPage}>
						Siguiente Página
					</a>
			</div>
		</React.Fragment>
	)

	render() {
		const { 
			error = '', 
			isLoaded = false , 
			items = []
		} = this.state;

		return (
			<div>
				{this.renderHeader()}
				<div className="main_list_container">
					<div className="list_box">
						{!isLoaded ? 
							<div>Loading...</div> 
						:
							<List
								userInfo={items}
								deleteUser={this.deleteUser}
							/>
						}
					</div>
				</div>
				{this.renderPaginator()}
			</div>
		);
	}
}

export default UserListContainer;