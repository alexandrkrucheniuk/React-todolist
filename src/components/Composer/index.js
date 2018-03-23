import React, { Component } from 'react';
import Styles from './styles.scss';
import { string, func } from 'prop-types';

export default class Composer extends Component {

    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired

    }

    static propTypes = {
        createPost: func.isRequired
    };

    constructor () {
        super();
        this.handleSubmit = :: this._handleSubmit;
        this.handleTextArea = :: this._handleTextArea;
    }

    state = {
        comment:           '',
        avatarBorderColor: 'red'
    };

    _handleSubmit (e, boolean) {
        if (!boolean) {
            e.preventDefault();
        }

        const { createPost } = this.props;
        const { comment } = this.state;

        if (comment.length !== 0) {
            createPost({ comment });

            this.setState({
                comment: ''
            });
        }

    }

    _handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit(this, true);
        }
    }
    _handleTextArea ({ target }) {
        this.setState({
            comment: target.value

        });
    }

    render () {
        const { avatar, firstName } = this.context;
        const { comment, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'homer'
                    src = { avatar }
                    style = { { borderColor: avatarBorderColor } }
                />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's wrong with you ${firstName}?` } value = { comment }
                        onChange = { this.handleTextArea }
                        onCopy = { (e) => {
                            e.preventDefault();
                        } }
                        onKeyPress = {
                            this._handleKeyPress
                        }

                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
