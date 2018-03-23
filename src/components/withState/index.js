import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import { string } from 'prop-types';
import io from 'socket.io-client';


const withState = (Injectable) => {
    class Enchancer extends Component {
        static contextTypes = {
            api:       string.isRequired,
            token:     string.isRequired,
            firstName: string.isRequired,
            lastName:  string.isRequired,
            avatar:    string.isRequired

        }

        state = {
            posts:  [],
            loader: true
        }
        componentDidMount () {

            const socket = io('https://lab.lectrum.io', {
                path: '/react/ws'
            });

            socket.on('connect', () => {
                console.log('connect');
            });

            socket.emit('join', '1fwfsc9M9A');

            socket.on('join_error', (message) => {
                console.log(message);
            });

            socket.on('create', (post) => {
                this._showLoader(true);
                this.setState(({ posts }) => ({
                    posts: [JSON.parse(post), ...posts]
                }));
                this._showLoader(false);

            });
            socket.on('disconnect', () => {
                console.log('disconnect');
            });

            socket.on('remove', (postId) => {
                this._showLoader(true);
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !==postId)
                }));
                this._showLoader(false);
            });
            socket.on('like', (postData) => {
                this._showLoader(true);
                this.setState(({ posts }) => ({
                    posts: posts.map((post) =>
                        post.id === JSON.parse(postData).id ? JSON.parse(postData) : post
                    )
                }));
                this._showLoader(false);
            });

            this._fetchGetPost();
        }

        _showLoader (boolean) {
            this.setState(() => ({
                loader: boolean
            }));
        }
        _fetchGetPost () {
            const { api } = this.context;

            fetch(api).then((response) => {
                if (response.status !== 200) {
                    throw new Error('create post error');
                }

                return response.json();
            }).then(({ data }) => {
                this.setState(({ posts }) => ({
                    posts: [...posts, ...data]
                }));
                this._showLoader(false);

            }).catch((error) => {
                this._showLoader(false);

                console.log(error);
            });
        }

        _fetchCreatePost = (comment) => {
            const { api, token } = this.context;

            this._showLoader(true);

            fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(comment)
            }).catch((error) => {
                console.log(error);
            });


        }

        _deletePost = async (id) => {
            const { api, token } = this.context;

            try {
                this._showLoader(true);
                const responce = await fetch(`${api}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        'Authorization': token
                    }
                });

                if (responce.status !== 204) {
                    throw new Error('delete failed');
                }
            } catch (error) {
                console.log(error);
            }
        }

        _likePost = (id) => {
            const { api, token } = this.context;

            this._showLoader(true);
            fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    'Authorization': token
                }
            }).catch((error) => {
                console.log(error);
            });
            this._showLoader(false);
        }


        render () {

            return (
                <div>
                    <Injectable
                        createPost = { this._fetchCreatePost }
                        deletePost = { this._deletePost }
                        fetchGetPost = { this._fetchGetPost }
                        likePost = { this._likePost }
                        showloader = { this._showLoader }
                        { ...this.state }
                    />
                    <Spinner loader = { this.state.loader } />

                </div>
            );
        }
    }

    return Enchancer;
};

export default withState;
