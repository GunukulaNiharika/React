import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav,NavbarToggler, Collapse, NavItem, Jumbotron,
Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false,
            isModalOpen:false
        };
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    toggleNav(){
        this.setState({isNavOpen:!this.state.isNavOpen});
    }
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
  render() {
    return(
    <>
        <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav}/>
                <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante con Fusion"></img>
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"></span>About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"></span>Menu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span>Contact Us</NavLink>
                        </NavItem>
                    </Nav> 
                </Collapse>
                <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg">Login</span>
                            </Button>
                        </NavItem>
                    </Nav>
            </div>
        </Navbar>
        <Jumbotron >
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
         </Jumbotron>
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
             <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
             <ModalBody>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup row className="mt-2">
                        <Label htmlFor="username" md={2}>Username</Label>
                        <Col md={10}>
                            <Input type="text" id="username" name="username" 
                            placeholder="Username" innerRef={(input) => this.username = input}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mt-2">
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Input type="password" id="password" name="password" 
                            placeholder="Password" innerRef={(input) => this.password = input}/>
                        </Col>
                    </FormGroup>
                    <FormGroup check className="mt-2">
                        <Label check>
                            <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>
                            Remember Me
                        </Label>
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary mt-2">Login</Button>
                </Form>
             </ModalBody>
         </Modal>
    </>
    );
  }
}

export default Header;