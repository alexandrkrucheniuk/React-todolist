import React, { Component } from 'react';
import Composer from '../../components/Composer';
import Post from '../../components/Post/index';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Postman from '../../components/Postman';
import withState from '../../components/withState';
import { array, func } from 'prop-types';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import Styles from './styles.scss';
import { fromTo } from 'gsap';

@withState

export default class Feed extends Component {

    static propTypes = {
        createPost: func.isRequired,
        deletePost: func.isRequired,
        likePost:   func.isRequired,
        posts:      array.isRequired
    };
    _handleComposerAppear (composer) {
        fromTo(
            composer,
            1, {
                y:         -200,
                x:         500,
                opacity:   0,
                rotationY: 360
            }, {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    }
    _handleCounterAppear (counter) {
        fromTo(
            counter,
            1, {
                y:         -1000,
                x:         300,
                opacity:   0,
                rotationY: 360
            }, {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    }

    _handlePostmanAppear (postman) {
        fromTo(
            postman,
            1, {
                y:         -1000,
                x:         300,
                opacity:   0,
                rotationY: 360
            }, {
                y:          0,
                x:          0,
                opacity:    1,
                rotationY:  0,
                onComplete: () => {
                    setTimeout(() => {
                        fromTo(
                            postman,
                            1,
                            {
                                y:         0,
                                x:         0,
                                opacity:   1,
                                rotationY: 0
                            },
                            {
                                y:         -1000,
                                x:         300,
                                opacity:   0,
                                rotationY: 360
                            }
                        );
                    }, 4000);

                }
            }
        );
    }


    render () {
        const { posts: postsData, deletePost, likePost, createPost } = this.props;
        const posts = postsData.map((post) => (

            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postInEnd,
                    exitActive:  Styles.postInStart
                } }
                key = { post.id }
                timeout = { 700 } >
                <Catcher >
                    <TransitionGroup>
                        <Post
                            { ...post }
                            deletePost = { deletePost }
                            key = { post.id }
                            likePost = { likePost }
                        />
                    </TransitionGroup>

                </Catcher>
            </CSSTransition >
        ));


        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleComposerAppear }>
                    <Composer
                        createPost = { createPost }
                    />
                </Transition>

                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleCounterAppear }>
                    <Counter
                        length = { postsData.length }
                    />
                </Transition>
                <TransitionGroup>
                    {posts}
                </TransitionGroup>

                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handlePostmanAppear }>
                    <Postman />
                </Transition>

            </section>
        );
    }
}


//export default withState(Feed);
