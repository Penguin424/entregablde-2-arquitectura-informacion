import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, FormGroup, FormLabel, Row, Button } from 'react-bootstrap';
import { dataBaseUsers } from '../utils/dataBaseUser';
import { redirectNotUser } from '../utils/localRef';

const Login = ({history}) => {

    const [globalState, setGlobalState] = useState({
        dataFormLogin: {
            name: '',
            password: '',
        }
    });

    useEffect(() => {
        redirectNotUser(history);

        // eslint-disable-next-line
    }, []);

    const handleChangeFormLogin = (e) => 
    {
        setGlobalState({
            ...globalState,
            dataFormLogin:
            {
                ...globalState.dataFormLogin,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async(e) => 
    {
        try 
        {
            e.preventDefault();

            let userExist = dataBaseUsers.filter(a => (a.name === globalState.dataFormLogin.name && a.password === globalState.dataFormLogin.password))[0];

            if(userExist !== undefined)
            {
                history.push('/inicio');
                sessionStorage.setItem('nameUser', userExist.name);
            }
            else
            {
                alert('Usuario no registrado permiso negado');
            }
            
        } 
        catch (error) 
        {
            
        }
    }

    return (
        <Container>

            <h1 className="text-center">Sistema de control de ingresos al hogar</h1>

            <Card className="mt-5">
                <Card.Body>
                    <Row >
                        <Col md={12}>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <FormGroup controlId="Email">
                                    <FormLabel>Correo Electronico</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresar Correo Electronico"
                                        name="name"
                                        onChange={(e) => handleChangeFormLogin(e)}
                                    />
                                </FormGroup>
                                <Form.Group controlId="Password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        onChange={(e) => handleChangeFormLogin(e)}
                                    />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    INGRESAR
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;