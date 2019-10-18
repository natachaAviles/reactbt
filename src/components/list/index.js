import React from "react";
import  "./styles.css";

class List extends React.Component {

	renderNotUsers = () => {
		const { userInfo = [] } = this.props;
		const usersEmpty = userInfo.length > 0;

		return (
			<React.Fragment>
				{!usersEmpty ?
					<tbody className="not_found"> 
						<tr>
							<td>No existen registros para esta busqueda.</td>
						</tr>
					</tbody>
					:
					null
				}
			</React.Fragment>
		)
	}

	render() {
		const {
			userInfo = [],
			deleteUser
		} = this.props;

		return (
			<table>
				<thead className="user_table_header">
					<tr>
						<th>Nombre</th>
						<th>Descripción</th>
					</tr>
				</thead>
				{this.renderNotUsers()}
				<tbody>
					{userInfo.map(user => (
						<tr key={user.id}>
							<td>
								<img className="list_user_photo" src={user.photo} />
								<div>
									<span className="list_user_name">{user.name}</span>
									<span
										className="list_delete_user"
										onClick={() => deleteUser(user.id)}>
										Eliminar
										</span>
								</div>
							</td>
							<td>
								<span>{user.description}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}


export default List;