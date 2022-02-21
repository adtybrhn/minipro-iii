import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

class navbar extends Component {

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home" style={{fontWeight:"700"}}>Mini Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                    <Nav.Link href="/catalog">Product</Nav.Link>
                    <Nav.Link eventKey={2} href="/dashboard">Dashboard </Nav.Link>
                    <NavDropdown title="Akun" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={(e) => {
                            sessionStorage.removeItem('logged')}}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
        )
    }
}

export default navbar