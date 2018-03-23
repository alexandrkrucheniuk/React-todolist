import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import Styles from './styles';

import Checkbox from '../../theme/assets/Checkbox';
import DeleteIcon from '../../theme/assets/Delete';
import StartIcon from '../../theme/assets/Star';

export default class Task extends Component {
    static contextTypes = {
        api:       string.isRequired,
        token:     string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
    };
    static propTypes = {
        completed:      bool.isRequired,
        created:        string.isRequired,
        deleteTask:     func.isRequired,
        favorite:       bool.isRequired,
        id:             string.isRequired,
        message:        string.isRequired,
        updateFavorite: func.isRequired,
        updateTask:     func.isRequired,
    };

    _handleCheckboxClick = () => {
        const { id, message, favorite, completed, updateTask } = this.props;

        updateTask(id, message, favorite, completed);
    };


    _handleDeleteBtn = () => {
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    _handleFavoriteBtn = () => {
        const { id, message, favorite, completed, updateFavorite } = this.props;

        updateFavorite(id, message, favorite, completed);
    };
    render () {

        const { message, favorite, completed } = this.props;

        const ClassName = completed ? Styles.completed : Styles.task;

        return (
            <section className = { ClassName }>
                <div>
                    <Checkbox checked = { completed } color1 = { '#fff000' } color2 = { '#111573' } onClick = { this._handleCheckboxClick } />
                    <span />
                    <input placeholder = { message } />

                    <StartIcon checked = { favorite } color1 = { '#ffd700' } onClick = { this._handleFavoriteBtn } />
                    <DeleteIcon
                        onClick = { this._handleDeleteBtn }
                    />
                </div>
            </section>
        );
    }
}
