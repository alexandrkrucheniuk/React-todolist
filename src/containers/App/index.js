// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string } from 'prop-types';

import Feed from '../../components/Feed/index';
import avatar from '../../theme/assets/homer.png';

const options = {
    avatar,
    api:       'https://lab.lectrum.io/react/api/1fwfsc9M9A',
    firstName: 'Александр',
    lastName:  'Крученюк',
    token:     'sz2n58ekiu'
};

export default class App extends Component {
    static childContextTypes={
        api:       string.isRequired,
        token:     string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired

    }
    getChildContext () {
        return {
            api:       options.api,
            token:     options.token,
            avatar:    options.avatar,
            firstName: options.firstName,
            lastName:  options.lastName
        };
    }
    render () {
        return (
            <section className = { Styles.app }>
                <Feed />
            </section>
        );
    }
}
