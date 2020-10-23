import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MenuOptions from '../components/MenuOptions';
import { redirectNotUserLocal } from '../utils/localRef';

const HomePage = ({history}) => {

    useEffect(() => {
        redirectNotUserLocal(history);

        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <h1 className="text-center">Menu de inicio</h1>
            <Row className="mt-5">
                <Col md={6}>
                    <MenuOptions 
                        router={history} 
                        url="/regIng"
                        nameMod="Ingresos de gastos"
                        title="Ingresos de gastos para el hogar"
                        text="Aqui puedes ingresar los gastos generados en el mes"
                        desButton="INGRESOS"    
                    />
                </Col>
                <Col md={6}>
                    <MenuOptions 
                        router={history} 
                        url="/reportesMes"
                        nameMod="Reportes de gastos"
                        title="Reportes de gastos para el hogar"
                        text="Aqui puedes consultar los gastos realizados durante el mes"
                        desButton="REPORTES"
                    />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={3}>
                </Col>
                <Col md={6}>
                    <MenuOptions 
                        router={history} 
                        url="/incioMes"
                        nameMod="Inicio de mes"
                        title="Inicio de mes para equilibrar salarios"
                        text="Aqui puedes equilibrar los salrios para saber los porcentajes de cada mes"
                        desButton="INICIO MES"
                    />
                </Col>
                <Col md={3}>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;