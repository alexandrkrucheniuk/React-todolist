import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import Styles from './styles';

import Checkbox from '../../theme/assets/Checkbox';
import DeleteIcon from '../../theme/assets/Delete';
import StartIcon from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';

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
        updateMessage:  func.isRequired,
        updateTask:     func.isRequired,
    };

    state = {
        editable:      false,
        editedMessage: this.props.message,
    }

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

    _handleEditBtn = () => {
        const { editedMessage } = this.state;
        const { id, favorite, completed, updateMessage, message } = this.props;

        this.setState(({ editable }) => ({
            editable: !editable,
        }));

        if (editedMessage !== message) {
            updateMessage(id, editedMessage, favorite, completed);
        }
    }
    _handleEditInput = ({ target }) => {
        const editValue = target.value;

        if (editValue.length < 47) {
            this.setState(() => ({
                editedMessage: editValue,
            }));
        }

    };

    _handleEditInputEnterPress = (event) => {

        const { id, favorite, completed, updateMessage, message } = this.props;

        if (event.key === 'Enter') {
            updateMessage(id, this.state.editedMessage, favorite, completed);
            this.setState(() => ({
                editable: false,
            }));
        } else if (event.key === 'Escape') {
            this.setState(() => ({
                editedMessage: message,
                editable:      false,
            }));
        }


    };

    render () {

        const { message, favorite, completed } = this.props;

        const messageBox = this.state.editable && !completed ?
            (<input placeholder = { message } value = { this.state.editedMessage } onChange = { this._handleEditInput } onKeyDown = { this._handleEditInputEnterPress } />)
            : (<span>{message}</span>);


        const ClassName = completed ? Styles.completed : null;

        return (
            <section className = { `${Styles.task} ${ClassName}` }>
                <div>
                    <Checkbox
                        checked = { completed } color1 = { '#3B8EF3' }
                        color2 = { '#FFF' } onClick = { this._handleCheckboxClick }
                    />
                    <div
                        style = { {
                            flex:   '2',
                            border: this.state.editable && !completed ? '1px dashed #3B8EF3' : 'none',
                        } }>
                        {messageBox}
                    </div>

                    <div style = { { display: 'flex', justifyContent: 'space-between' } }>
                        <StartIcon checked = { favorite } color1 = { '#ffd700' } onClick = { this._handleFavoriteBtn } />
                        <Edit color1 = { !completed ? '#3B8EF3' : '#FF0000' } onClick = { this._handleEditBtn } />
                        <DeleteIcon
                            onClick = { this._handleDeleteBtn }
                        />
                    </div>
                </div>
            </section>
        );
    }
}
