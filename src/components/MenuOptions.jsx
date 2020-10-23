import React from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const MenuOptions = ({title, text, url, nameMod, desButton, router}) => {
    return (
        <Card className="text-center">
            <Card.Header>{nameMod}</Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <Link className="btn btn-dark" to={url} >{desButton}</Link>
            </Card.Body>
        </Card>
    );
};

export default MenuOptions;