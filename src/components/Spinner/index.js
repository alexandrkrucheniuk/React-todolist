import React from 'react';
import Styles from './styles.scss';
import { bool } from 'prop-types';


const Spinner = ({ loader }) =>
    loader ?
        <section className = { Styles.Spinner } />
        : null

    ;

Spinner.propTypes = {
    loader: bool.isRequired
};
export default Spinner;
