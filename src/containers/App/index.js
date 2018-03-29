// Core
import React, { Component } from 'react';

// Components
import Scheduler from 'components/Scheduler';
import { string } from 'prop-types';

const options = {
    api:       'https://lab.lectrum.io/hw/todo/api',
    firstName: 'Александр',
    lastName:  'Крученюк',
    token:     'Rmu3OveUWo2Fsiy1',
};


export default class App extends Component {

    static childContextTypes={
        api:       string.isRequired,
        token:     string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,

    };

    getChildContext () {
        return {
            api:       options.api,
            token:     options.token,
            firstName: options.firstName,
            lastName:  options.lastName,
        };
    }


    render () {
        return (
            <section>
                <Scheduler />
            </section>
        );
    }
}
