import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Composer from './';

configure({ adapter: new Adapter() });

const options = {
    firstName: 'Alex',
    lastName:  'Alex',
    avatar:    'avatarURL'
};

const props ={
    createPost: jest.fn()
};

const message = 'Hello ';
const state = {
    comment:           '',
    avatarBorderColor: 'red'
};

const mutatedState = {
    comment:           message,
    avatarBorderColor: 'red'
};
const result = mount(<Composer createPost = { props.createPost } />, {
    context: options
});


describe('Composer: ', () => {
    test(`Should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test(`Should have 1 'textarea' element`, () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test(`Should have 1 'img' element`, () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test(`Should have a valid initial state`, () => {
        expect(result.state()).toEqual(state);
    });

    test(`'textarea' should be empty`, () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test(`'textarea' responce to state change`, () => {
        result.setState(() => ({
            comment: mutatedState.comment
        }));
        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);
        result.setState(() => ({
            comment: state.comment
        }));
        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe(state.comment);
    });

    test(`state and text`, () => {
        result.find('textarea').simulate('change', {
            target: {
                value: mutatedState.comment
            }
        });
    });

    test(`component state and textarea reflect according to submit post`, () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(state);
    });

    test(`create post methdo should be called once`, () => {
        expect(props.createPost.mock.calls).toHaveLength(1);
    });

});
