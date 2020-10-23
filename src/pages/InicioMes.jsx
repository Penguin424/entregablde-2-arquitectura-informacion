import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { dataBaseUsers } from '../utils/dataBaseUser';
import moment from 'moment';
import { redirectNotUserLocal, redirectNotUser } from '../utils/localRef';
import { db } from '../utils/firebase';

const InicioMes = ({history}) => {

    useEffect(() => {
        redirectNotUserLocal(history);

        getMonth();

        // eslint-disable-next-line
    }, []);

    const [dataMes, setDataMes] = useState({
        mes: moment().subtract(0, "month").startOf("month").format('MMMM'),
        pabloSueldo: 0,
        sariSueldo: 0,
        totalSueldos: 0,
        pabloTotalMes: 0,
        sariTotalMes: 0,
        aportes: [],
        pabloPorcentaje: '0 %',
        sariPorcentaje: '0 %',
    });

    const form = useRef();

    const getMonth = async() => 
    {
        let moes = await db
            .collection('meses')
            .doc(`${moment().subtract(0, "month").startOf("month").format('MMMM')}-${new Date().getFullYear()}`)
            .get();
        
        if(moes.exists)
        {
            alert('El mes ya a sido generado');
            redirectNotUser(history);
        }
        
    }

    const handleChangeDataMes = (e) => 
    {
        setDataMes({
            ...dataMes,
            [e.target.name]: parseInt(e.target.value)
        });
    }

    // const handleChangeDataMesPor = (e) => 
    // {
    //     setDataMes({
    //         ...dataMes,
    //         [e.target.name]: `${parseInt(e.target.value)} %`
    //     });
    // }

    const handleSubmit = async(e) => 
    {
        try 
        {
            e.preventDefault();
    
            let newDataMes = dataMes;
    
            newDataMes.totalSueldos = newDataMes.sariSueldo + newDataMes.pabloSueldo;
            newDataMes.sariPorcentaje = `${Math.round((newDataMes.sariSueldo / newDataMes.totalSueldos) * 100)} %`;
            newDataMes.pabloPorcentaje = `${Math.round((newDataMes.pabloSueldo / newDataMes.totalSueldos) * 100)} %`;
    
            console.log(newDataMes);
    
            await db.collection('meses').doc(`${newDataMes.mes}-${new Date().getFullYear()}`).set(newDataMes);
            form.current.reset();
        } 
        catch (error) 
        {
            alert('Error al generar el mes');
        }
    }

    return (
        <Container>
            <h1 className="text-center" >Inicio de mes</h1>

            <Card className="mt-5">
                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <Form ref={form} onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <FormLabel>Sueldo de {dataBaseUsers[0].name} </FormLabel>
                                            <FormControl 
                                                type="number" 
                                                placeholder="0$"
                                                min="0"
                                                name={`${dataBaseUsers[0].name}Sueldo`}
                                                required
                                                onChange={(e) => handleChangeDataMes(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    {/* <Col md={6}>
                                        <FormGroup>
                                            <FormLabel>Porcentaje {dataBaseUsers[0].name} </FormLabel>
                                            <FormControl 
                                                type="number" 
                                                placeholder="0%"
                                                min="0"
                                                max="100"
                                                name={`${dataBaseUsers[0].name}Porcentaje`}
                                                required
                                                onChange={(e) => handleChangeDataMesPor(e)}
                                            />
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col md={12}>        
                                        <FormGroup>
                                            <FormLabel>Sueldo de {dataBaseUsers[1].name} </FormLabel>
                                            <FormControl 
                                                type="number" 
                                                placeholder="0$"
                                                min="0"
                                                name={`${dataBaseUsers[1].name}Sueldo`}
                                                required
                                                onChange={(e) => handleChangeDataMes(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    {/* <Col md={6}>
                                        <FormGroup>
                                            <FormLabel>Porcentaje {dataBaseUsers[1].name} </FormLabel>
                                            <FormControl 
                                                type="number" 
                                                placeholder="0%"
                                                min="0"
                                                max="100"
                                                name={`${dataBaseUsers[1].name}Porcentaje`}
                                                required
                                                onChange={(e) => handleChangeDataMesPor(e)}
                                            />
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col md={6} >
                                        <FormGroup>
                                            <FormLabel>Mes</FormLabel>
                                            <FormControl 
                                                type="text"
                                                disabled={true} 
                                                value={moment().subtract(0, "month").startOf("month").format('MMMM')}
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
                                            Inciar
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

export default InicioMes;