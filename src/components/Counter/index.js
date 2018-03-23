import React from 'react';
import Styles from './styles.scss';
import { number } from 'prop-types';


const Counter = ({ length }) => (
    <section className = { Styles.Counter }>
        Posts count:  { length }
    </section>
);

Counter.propTypes = {
    length: number.isRequired
};

export default Counter;
