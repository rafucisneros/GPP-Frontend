import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@material-ui/core';
import moment from 'moment';

const Footer = props => {
    const { className, ...rest } = props;
    let year = moment().year();

    return (
        <div
            {...rest}
            style={{padding : '32px', textAlign : 'center'}}
        >
            <Typography variant="body1">
                &copy;{' '}
                <Link
                    // component="a"
                    href="#"
                >
                    GPI
                </Link>
            {`. ${year}`}
        </Typography>
        <Typography variant="caption">
            Creado por{' '}
            <Link
                // component="a"
                href="https://www.linkedin.com/in/andr%C3%A9s-buelvas-678993183/"
            >
                Andrés Buelvas
            </Link>
            {', '}
            <Link
                // component="a"
                href="#"
            >
                Donato Bracuto
            </Link>
            {', '}
            <Link
                // component="a"
                href="https://www.linkedin.com/in/migcanedo/"
            >
                Miguel Canedo
            </Link>
            {' y '}
            <Link
                // component="a"
                href="#"
            >
                Rafael Cisneros
            </Link>
            {'.'}
        </Typography>
        </div>
    );
};

Footer.propTypes = {
    className: PropTypes.string
};

export default Footer;