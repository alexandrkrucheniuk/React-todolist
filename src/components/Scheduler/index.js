import React, { Component } from 'react';
import { string } from 'prop-types';
import Styles from './styles';
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../Task';

export default class Scheduler extends Component {

    static contextTypes = {
        api:       string.isRequired,
        token:     string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
    };

    state = {
        message:       '',
        todoList:      [],
        search:        '',
        markAllAsDone: false,
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
            this._filterToDo([...data]);
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
        const { message, todoList } = this.state;
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

                    this.setState(() => ({
                        message: ''
                    }));

                    this._filterToDo([data, ...todoList]);


                }).catch((error) => {
                    console.error(error);
                });
        }
    };


    _updateComplete = (id, message, favorite, completed) => {

        const { api, token } = this.context;
        const { todoList } = this.state;

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


                this._filterToDo([data, ...todoList.filter((task) => task.id !== id)]);


            }).catch((error) => {
                console.error(error);
            });
    }

    _filterToDo = (todoList) => {

        const todoListFav = todoList.filter((task) => task.favorite);
        const todoListFavDone = todoListFav.filter((task) => task.completed);
        const todoListFavNotDone = todoListFav.filter((task) => !task.completed);

        const todoListNotFav = todoList.filter((task) => !task.favorite);
        const todoListNotFavDone = todoListNotFav.filter((task) => task.completed);
        const todoListNotFavNotDone = todoListNotFav.filter((task) => !task.completed);


        this.setState(() => ({
            todoList: [...todoListFavNotDone, ...todoListNotFavNotDone,...todoListFavDone, ...todoListNotFavDone],
        }));
    };

    _updateFavorite = (id, message, favorite, completed) => {

        const { api, token } = this.context;
        const { todoList } = this.state;

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

            this._filterToDo([data, ...todoList.filter((task) => task.id !== id)]);

            }).catch((error) => {
                console.error(error);
            });
    };

    _updateMessage = (id, message, favorite, completed) => {
        const { api, token } = this.context;

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
                completed,
            }),
        })
            .then((response) => {
                if (response.status > 299) {
                    throw new Error(`Error with status ${response.status}`);
                }

                return response.json();
            }).then(({ data }) => {


                this.setState(({ todoList }) => ({
                    todoList: todoList.map((task) => {
                        if (task.id === id) {
                            return data;
                        }

                        return task;

                    }),
                }));
            }).catch((error) => {
                console.error(error);
            });
    }

    _deleteTask = (id) => {

        const { api, token } = this.context;

        fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
        })
            .then((response) => response).then((date) => {
            console.log(date);
            this.setState(({ todoList }) => ({
                    todoList: [...todoList.filter((task) => task.id !== id)],
                }));
            }).catch((error) => {
                console.error(error);
            });
    };

    _handleSearch = ({ target }) => {
        this.setState(() => ({
            search: target.value,
        }));
    };

    _handleMarkAllAsDone = () => {
        this.setState(() => ({
            markAllAsDone: true,
        }));
        const { todoList } = this.state;

        const { api, token } = this.context;

        todoList.forEach((task) => {


            fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    message:   task.message,
                    favorite:  task.favorite,
                    id:        task.id,
                    completed: true,
                }),
            })
                .then((response) => {
                    if (response.status > 299) {
                        throw new Error(`Error with status ${response.status}`);
                    }

                    return response.json();
                }).then(({ data }) => {
                    console.log(data);

                }).catch((error) => {
                    console.error(error);
                });
        });
        this.setState(() => ({
            todoList: [...todoList.map((task) => ({
                message:   task.message,
                id:        task.id,
                favorite:  task.favorite,
                completed: true,
                created:   task.created,
            }))],
        }));

        setTimeout(() => {
            this.setState(() => ({
                markAllAsDone: false,
            }));
        }, 1000);


    };

    render () {

        const { message, todoList, search, markAllAsDone } = this.state;

        const filteredToDoList = search !== '' ? todoList.filter((task) => task.message.startsWith(search)) : todoList;
        const taskElement = filteredToDoList.map((task) => (

            <Task
                deleteTask = { this._deleteTask }
                key = { task.id }
                task = { task.id }
                updateFavorite = { this._updateFavorite }
                updateMessage = { this._updateMessage }
                updateTask = { this._updateComplete }
                { ...task }

            />
        ));

        return (
            <div className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>To do list</h1>
                        <input placeholder = 'Search' type = 'text' value = { search } onChange = { this._handleSearch } />
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
                    <ul>
                        {taskElement}
                    </ul>
                    <footer>

                        <span>
                            <Checkbox
                                checked = { markAllAsDone }
                                color1 = { '#000' }
                                color2 = { '#fff' }
                                onClick = { this._handleMarkAllAsDone }
                            />
                            <code> Mark all as done</code>
                        </span>
                    </footer>
                </main>

            </div>
        );
    }
}
