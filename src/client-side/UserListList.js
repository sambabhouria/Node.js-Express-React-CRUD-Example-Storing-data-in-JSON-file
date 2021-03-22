import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import UserDataService from "./UserService";

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
     this.getUsers();

    // fetch('user/list')
    //   .then(response => response.json())
    //   .then(data => this.setState({users: data, isLoading: false}));
  }

  getUsers = () => {
    UserDataService.getAll()
      .then(response => {
        this.setState({users: response.data, isLoading: false})
      })
      .catch(e => {
        console.log(e);
      });
  };

  async remove(id) {
    this.deleteUser(id);
    // await fetch(`/api/user/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // }).then(() => {
    //   console.log("Remove Done!");
    //   let updatedUsers = [...this.state.users].filter(i => i._id !== id);
    //   this.setState({users: updatedUsers});
    // });
  }

  deleteUser = (id) => {
    UserDataService.remove(id)
      .then(() => {
        console.log("Remove Done!");
        let updatedUsers = [...this.state.users].filter(i => i.id !== id);
        this.setState({users: updatedUsers});
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map(user => {
      return <tr key={user.id}>
        <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td><a href={user.website}>{user.website}</a></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">Add User</Button>
          </div>
          <h3>User List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Firstname</th>
                <th width="20%">Lastname</th>
                <th>email</th>
                <th width="10%">Web Site</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;
