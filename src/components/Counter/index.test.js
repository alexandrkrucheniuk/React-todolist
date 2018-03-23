import React from 'react';
import Counter from './index';
import dom from 'react-test-renderer';

const rendererTree = dom.create(<Counter length = { 3 } />).toJSON();

test('Counter should correspond to its snapshot', () => {
    expect(rendererTree).toMatchSnapshot();
});