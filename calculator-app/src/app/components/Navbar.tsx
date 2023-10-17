'use client'
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { UserData } from '../../../shared/model/UserData';

const NavbarComponent = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSignOut = async () => {
        const res = await signOut();
    }


    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => router.push("/")}>Calculator app</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => router.push("/login")}>Login</Nav.Link>
                    <Nav.Link onClick={() => handleSignOut()}>Sign out</Nav.Link>
                    <Nav.Link onClick={() => router.push("/register")}>Register</Nav.Link>
                </Nav>
                <Navbar.Toggle />

                {status === "authenticated" && (
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{(session?.user as UserData)?.user?.username}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
