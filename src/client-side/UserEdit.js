import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import UserDataService from "./UserService";

class UserEdit extends Component {

  emptyUser = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    website: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyUser
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      // const user = await (await fetch(`/api/user/${this.props.match.params.id}`)).json();
       this.getUser(this.props.match.params.id);
    }
  }

  getUser = id => {
    UserDataService.get(id)
      .then(response => {
        this.setState({item: response.data})
      })
      .catch(e => {
        console.log(e);
      });
  };

  addUser= (data) => {
    UserDataService.add(data)
      .then(() => {
        this.props.history.push('/users');
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateUser= (id, data) => {
    UserDataService.update(id, data)
      .then(() => {
        this.props.history.push('/users');
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    console.log("🚀 ~ file: UserEdit.js ~ line 59 ~ UserEdit ~ handleChange ~ item", item)
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    console.log("🚀 ~ file: UserEdit.js ~ line 88 ~ UserEdit ~ handleSubmit ~  item.id ",  item.id )
    item.id ? this.updateUser(item.id, item) : this.addUser(item) ;
    // await fetch('/api/user', {
    //   method: (item._id) ? 'PUT' : 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(item),
    // });
    // this.props.history.push('/users');
  }


  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={item.username || ''}
                   onChange={this.handleChange} autoComplete="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">WebSite</Label>
            <Input type="text" name="website" id="website" value={item.website || ''}
                   onChange={this.handleChange} autoComplete="website"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" value={item.password || ''}
                   onChange={this.handleChange} autoComplete="password"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Phone</Label>
            <Input type="text" name="phone" id="phone" value={item.phone|| ''}
                   onChange={this.handleChange} autoComplete="phone"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserEdit);
