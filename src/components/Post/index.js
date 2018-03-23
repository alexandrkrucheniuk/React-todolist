import React, { Component } from 'react';
import Styles from './styles.scss';
import moment from 'moment';
import Like from '../../components/Like';

import { string, func, number, array } from 'prop-types';
import { getUniqueID } from '../../helpers';


export default class Post extends Component {

    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired,
        likePost:   func.isRequired,
        likes:      array.isRequired
    };
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static defaultProps = {
        avatar:    '',
        comment:   'default comment',
        firstName: 'name',
        id:        getUniqueID(),
        lastName:  'lastname'
    }
    shouldComponentUpdate () {

        return true;
    }

    _deletePost = () => {
        const { id, deletePost } = this.props;

        deletePost(id);
    }

    render () {
        const { avatar, firstName, lastName, comment, created, likes, id, likePost } = this.props;
        const { firstName:selfFirstName, lastName:selfLastName } = this.context;
        const deleteButton =  firstName === selfFirstName && lastName === selfLastName ?
            <i className = { Styles.cross } onClick = { this._deletePost } />
            : null;

        return (
            <section className = { Styles.post }>
                <img
                    alt = 'homer'
                    src = { avatar }
                />
                <a>
                    { `${firstName} ${lastName}` }
                </a>
                <time>
                    { moment.unix(created).format('MMMM D h:mm:ss a') }
                </time>
                <p>
                    { comment }
                </p>
                { deleteButton }
                <Like
                    id = { id }
                    likePost = { likePost }
                    likes = { likes }
                />
            </section>
        );
    }
}
