import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { db } from '../utils/firebase';
import { getMonth, redirectNotUserLocal } from '../utils/localRef';
import { Bar, Pie } from 'react-chartjs-2';

const ReportMonth = ({history}) => {

    const [dataReport, setDataReport] = useState({
        mes: '',
        pabloSueldo: 0,
        sariSueldo: 0,
        totalSueldos: 0,
        pabloTotalMes: 0,
        sariTotalMes: 0,
        aportes: [],
        pabloPorcentaje: '0 %',
        sariPorcentaje: '0 %',
        usuarios: []
    });

    useEffect(() => {

        getDataReport();

        redirectNotUserLocal(history);

        // eslint-disable-next-line
    }, [])

    const getDataReport = () => 
    {
        db.collection('meses').doc(getMonth()).onSnapshot((a) => {
            setDataReport(a.data());
        });
    }

    const genDataUniversal = (service, usr) => 
    {
        if(usr)
        {
            return dataReport.aportes.filter(b => b.descripcionDelAporte === service && b.aporteEchoPor === usr);
        }
        else
        {
            return dataReport.aportes.filter(b => b.descripcionDelAporte === service);
        }
    }

    const genTotalUniversales = (service) => 
    {
        return genDataUniversal(service).map(a => a.montoDelAporte);
    }

    const calPorcentaje = (total, usrMes) => 
    {
        return `${Math.round((usrMes / total) * 100)} %`;
    }

    const genDataGraph = () => {
        return  {
            labels:[
                'comida',
                'servicio agua',
                'servicio gas',
                'servicio luz',
                'servicio internet',
                'servicio entretenimiento',
                'insumos de hogar'
            ],
            datasets: [
                {
                    label: 'Gastos Generales',
                    data: 
                    [
                        genTotalUniversales('comida').reduce((c,d) => c + d, 0),
                        genTotalUniversales('servicio agua').reduce((c,d) => c + d, 0),
                        genTotalUniversales('servicio gas').reduce((c,d) => c + d, 0),
                        genTotalUniversales('servicio luz').reduce((c,d) => c + d, 0),
                        genTotalUniversales('servicio internet').reduce((c,d) => c + d, 0),
                        genTotalUniversales('servicio entretenimiento').reduce((c,d) => c + d, 0),
                        genTotalUniversales('insumos de hogar').reduce((c,d) => c + d, 0),
                    ],
                    backgroundColor:
                    [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ]
                }
            ],
        }
    }

    return (
        <Container>
            <h1 className="text-center">Reporte de aportes del mes {getMonth()} </h1>
            <h2 className="text-center"> Total sumado del mes de: {dataReport.totalSueldos} </h2>

            <Row className="mt-5">
                <Col md={6} className="mb-5">
                    <div style={{maxHeight: '300px', overflowY: 'scroll'}}>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th scope="col">Fecha del aporte</th>
                                    <th scope="col">Monto del aporte</th>
                                    <th scope="col">Descripcion del aporte</th>
                                    <th scope="col">Responsable del aporte</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataReport.aportes.length > 0 ?
                                    dataReport.aportes.map((apt, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{apt.fechaDelAporte}</td>
                                                <td>{apt.montoDelAporte}$</td>
                                                <td>{apt.descripcionDelAporte}</td>
                                                <td>{apt.aporteEchoPor}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td>#</td>
                                        <td>#</td>
                                        <td>#</td>
                                        <td>#</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col md={6} className="mt-5">
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th scope="col"> Usuario </th>
                                <th scope="col"> Porcentaje Mensual </th>
                                <th scope="col"> Recabado </th>
                                <th scope="col"> Diferencia a favor </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataReport.usuarios.length > 0 ?
                                dataReport.usuarios.map((a) => {
                                    return(
                                        <tr key={a}>
                                            <td> {a} </td>
                                            <td> {dataReport[`${a}Porcentaje`]} </td>
                                            <td> {dataReport[`${a}TotalMes`]}$ - {calPorcentaje(dataReport.totalSueldos, dataReport[`${a}TotalMes`])} </td>
                                            <td>
                                                {
                                                    dataReport[`${a}TotalMes`] - dataReport.totalSueldos < 0 ?
                                                    0 + "$"
                                                    :
                                                    dataReport[`${a}TotalMes`] - dataReport.totalSueldos + "$"
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                </tr>
                            }
                            <tr>
                                <td>Total</td>
                                <td> 
                                    {
                                        parseInt(dataReport.sariPorcentaje.split(" ")[0]) + parseInt(dataReport.pabloPorcentaje.split(" ")[0])
                                    } % 
                                </td>
                                <td> 
                                    {
                                        dataReport.sariTotalMes + dataReport.pabloTotalMes
                                    }$ - {
                                        parseInt(calPorcentaje(dataReport.totalSueldos, dataReport[`${dataReport.usuarios[0]}TotalMes`])) + parseInt(calPorcentaje(dataReport.totalSueldos, dataReport[`${dataReport.usuarios[1]}TotalMes`])) + ' %'
                                    } 
                                </td>
                                <td>
                                    #
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={12}>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th scope="col">Usuario</th>
                                <th scope="col">Comida</th>
                                <th scope="col">Servicio agua</th>
                                <th scope="col">Servicio gas</th>
                                <th scope="col">Servicio luz</th>
                                <th scope="col">Servicio internet</th>
                                <th scope="col">Servicio entretenimiento</th>
                                <th scope="col">Insumos de hogar</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataReport.aportes.length > 0 ?
                                dataReport.usuarios.map(a => {
                                    return(
                                        <tr>
                                            <td> {a} </td>
                                            <td> {genDataUniversal("comida", a).length} </td>
                                            <td> {genDataUniversal("servicio agua", a).length} </td>
                                            <td> {genDataUniversal("servicio gas", a).length} </td>
                                            <td> {genDataUniversal("servicio luz", a).length} </td>
                                            <td> {genDataUniversal("servicio internet", a).length} </td>
                                            <td> {genDataUniversal("servicio entretenimiento", a).length} </td>
                                            <td> {genDataUniversal("insumos de hogar", a).length} </td>
                                            <td> {dataReport[`${a}TotalMes`]}$ </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                    <td>#</td>
                                </tr>
                            }
                            <tr>
                                <td> Total:  </td>
                                <td> {genTotalUniversales('comida').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('servicio agua').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('servicio gas').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('servicio luz').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('servicio internet').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('servicio entretenimiento').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {genTotalUniversales('insumos de hogar').reduce((c,d) => c + d, 0)}$ </td>
                                <td> {dataReport.pabloTotalMes + dataReport.sariTotalMes}$ </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="mt-5 mb-5">
                <Col md={6}>
                    <Bar
                        data={
                            genDataGraph()
                        } 
                        options={{
                            title:
                            {
                                display: true,
                                text: 'Consumos totales',
                                fontSize: 25
                            }
                        }}
                    />
                </Col>
                <Col md={6}>
                    <Pie
                        data={
                            genDataGraph()
                        }
                        options={{
                            title:
                            {
                                display: true,
                                text: 'Consumos totales',
                                fontSize: 25
                            },
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ReportMonth;