import React, { Component } from 'react';
import { string } from 'prop-types';
import Styles from './styles.scss';

export default class Postman extends Component {

    static contextTypes = {
        firstName: string.isRequired,
        avatar:    string.isRequired
    }
    state = {
        show: false
    }
    componentWillMount () {

        if (new Date().getMinutes() > new Date(sessionStorage.getItem('Show_postman') * 1000).getMinutes() + 2) {
            this.setState(() => ({
                show: true
            }));
            sessionStorage.removeItem('Show_postman');
        }
    }
    render () {
        this.state.show ? sessionStorage.setItem('Show_postman', Math.round(Number(new Date())/1000)) : null;
        const { firstName, avatar } = this.context;

        return (
            this.state.show ?
                <section className = { Styles.postman }>
                    <img src = { avatar } />
                    <h1> Hi,{firstName}! </h1>
                </section> : ''
        );
    }
}
