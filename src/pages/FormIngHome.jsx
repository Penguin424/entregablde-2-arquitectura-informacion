import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { db } from '../utils/firebase';
import { getMonth, getNombre, redirectNotUserLocal } from '../utils/localRef';

const FormIngHome = ({history}) => {

    useEffect(() => {
        redirectNotUserLocal(history);

        // eslint-disable-next-line
    }, []);

    const [dataAporte, setDataAporte] = useState({
        aporteEchoPor: getNombre(),
        descripcionDelAporte: '',
        montoDelAporte: '',
        fechaDelAporte:'',
    });

    const form = useRef();

    const handleChange = async(e) => 
    {
        if(e.target.name === 'montoDelAporte')
        {
            setDataAporte({
                ...dataAporte,
                [e.target.name]: parseInt(e.target.value)
            });
        }
        else
        {
            setDataAporte({
                ...dataAporte,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleSubmit = async(e) => 
    {
        try 
        {
            e.preventDefault();
    
            const mesDB = await db.collection('meses').doc(getMonth()).get();
            const dataMesDB = mesDB.data();
    
            dataMesDB.aportes.push(dataAporte);
            dataMesDB[`${getNombre()}TotalMes`] += dataAporte.montoDelAporte;
    
            await db.collection('meses').doc(getMonth()).update(dataMesDB);

            form.current.reset();
        } 
        catch (error) 
        {
            alert('Error al generar aporte');
        }
        
    }

    return (
        <Container>
            <h1>Ingreso de aporte al hogar</h1>
            
            <Card className="mt-5">
                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <Form ref={form} onSubmit={(e) => handleSubmit(e)}>
                                <FormGroup>
                                    <FormLabel>Descripcion del aporte</FormLabel>
                                    <FormControl 
                                        type="email" 
                                        as="select"
                                        multiple
                                        name="descripcionDelAporte"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="comida">Comida</option>
                                        <option value="servicio agua">Servicio agua</option>
                                        <option value="servicio gas">Servicio gas</option>
                                        <option value="servicio luz">Servicio luz</option>
                                        <option value="servicio internet">Servicio internet</option>
                                        <option value="servicio entretenimiento">Servicio entretenimiento</option>
                                        <option value="insumos de hogar">Insumos de hogar</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Monto del aporte</FormLabel>
                                    <FormControl 
                                        type="number" 
                                        placeholder="0$"
                                        name="montoDelAporte"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </FormGroup>
                                <Row>
                                    <Col md={6} >
                                        <FormGroup>
                                            <FormLabel>Fecha del aporte</FormLabel>
                                            <FormControl 
                                                type="date"
                                                name="fechaDelAporte"
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}  >
                                        <Button 
                                            className="mt-4" 
                                            variant="dark" 
                                            size="lg" 
                                            block
                                            type="submit"
                                        >
                                            Enviar aporte
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormIngHome;