import React, { Component } from 'react';
import { string } from 'prop-types';
import Styles from './styles';

import Task from '../Task';

export default class Scheduler extends Component {

    static contextTypes = {
        api:       string.isRequired,
        token:     string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
    };

    state = {
        message:  '',
        todoList: [],
    };

    componentDidMount () {
        this._getTodoList();
    }

    _getTodoList () {

        const { api, token } = this.context;

        fetch(`${api}?size=5`, {
            method:  'GET',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                if (response.status > 299) {
                    throw new Error(`Error with status ${response.status}`);
                }

                return response.json();
            }).then(({ data }) => {

                this.setState(() => ({
                    todoList: data,
                }));
            }).catch((error) => {
                console.error(error);
            });
    }

    _handleInput = ({ target }) => {
        this.setState({
            message: target.value,
        });
    };
    _handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this._handleSubmitForm(this, true);
        }
    }
    _handleSubmitForm = (e, boolean) => {
        if (!boolean) {
            e.preventDefault();
        }
        const { message } = this.state;
        const { api, token } = this.context;

        if (message && message.length > 0) {

            fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    message,
                }),
            })
                .then((response) => {
                    if (response.status > 299) {
                        throw new Error(`Error with status ${response.status}`);
                    }

                    return response.json();
                }).then(({ data }) => {


                    this.setState(({ todoList }) => ({
                        todoList: [data, ...todoList],
                    }));
                }).catch((error) => {
                    console.error(error);
                });
        }
    };


    _updateComplete =(id, message, favorite, completed) => {

        const { api, token } = this.context;

        console.log(id);
        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                message,
                favorite,
                id,
                completed: !completed,
            }),
        })
            .then((response) => {
                if (response.status > 299) {
                    throw new Error(`Error with status ${response.status}`);
                }

                return response.json();
            }).then(({ data }) => {

                if (completed) {
                    this.setState(({ todoList }) => ({
                        todoList: [data, ...todoList.filter((task) => task.id !==id)],
                    }));
                } else {
                    this.setState(({ todoList }) => ({
                        todoList: [...todoList.filter((task) => task.id !==id), data],
                    }));
                }


            }).catch((error) => {
                console.error(error);
            });
    }

    _updateFavorite =(id, message, favorite, completed) => {

        const { api, token } = this.context;

        console.log(id);
        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                message,
                favorite: !favorite,
                id,
                completed,
            }),
        })
            .then((response) => {
                if (response.status > 299) {
                    throw new Error(`Error with status ${response.status}`);
                }

                return response.json();
            }).then(({ data }) => {

                if (!favorite) {
                    this.setState(({ todoList }) => ({
                        todoList: [data, ...todoList.filter((task) => task.id !==id)],
                    }));
                } else {
                    this.setState(({ todoList }) => ({
                        todoList: [...todoList.filter((task) => task.id !==id), data],
                    }));
                }


            }).catch((error) => {
                console.error(error);
            });
    };


    _deleteTask = (id) => {

        const { api, token } = this.context;

        console.log(id);
        fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
        })
            .then((response) => response.text()).then(() => {
                this.setState(({ todoList }) => ({
                    todoList: [...todoList.filter((task) => task.id !==id)],
                }));


            }).catch((error) => {
                console.error(error);
            });
    };
    render () {

        const { message, todoList } = this.state;


        const taskElement = todoList.map((task) => (

            <Task
                deleteTask = { this._deleteTask }
                key = { task.id }
                task = { task.id }
                updateFavorite = { this._updateFavorite }
                updateTask = { this._updateComplete }
                { ...task }

            />

        ));

        return (
            <div className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>To do list</h1>
                        <input placeholder = 'Search' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input
                                placeholder = 'Type here your new task' type = 'text' value = { message }
                                onChange = { this._handleInput } onKeyPress = { this._handleKeyPress }
                            />
                            <button onClick = { this._handleSubmitForm }>Create task</button>
                        </form>
                    </section>

                    {taskElement}
                </main>

            </div>
        );
    }
}
