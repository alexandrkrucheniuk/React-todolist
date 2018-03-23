import { getFullApiUrl, getUniqueID, getRandomColor } from '../';
const GROUP_ID = 'test';
const api = 'https://lab.lectrum.io/react/api';

describe('getFullApiUrl', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl should throw an err for wrong arguments', () => {
        const getFullApiNameWithError = () => {
            getFullApiUrl(null, 1);
        };

        expect(getFullApiNameWithError).toThrowError(
            `'api' and 'GROUP_ID' should be a string`
        );
    });

    test('getFullApiUrl should return full api URL', () => {
        expect(getFullApiUrl(api, GROUP_ID)).toBe(`${api}/${GROUP_ID}`);
    });

    test('getFullApiUrl result should be a string', () => {
        expect(typeof getFullApiUrl(api, GROUP_ID)).toBe('string');
    });

});

describe('getUniqueID', () => {

    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });
    test('getUniqueID result should be a string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });
    test('getUniqueID should throw an err for wrong arguments', () => {
        const getUniqueIDNameWithError = () => {
            getUniqueID(null, 1);
        };

        expect(getUniqueIDNameWithError).toThrowError(
            `The function argument should be a number!`
        );
    });


});


describe('getRandomColor', () => {


    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });
    test('getUniqueID result should be a string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });
    test('getUniqueID result should be a string', () => {
        expect(getRandomColor().startsWith('#')).toBeTruthy();
    });
    test('getUniqueID result should be a string', () => {
        expect(getRandomColor()).toHaveLength(7);
    });
    test('getRandomColor should return color', () => {
        const expected = expect.stringMatching(/^\x23[0-9A-F]{6}$/);
        expect(getRandomColor()).toEqual(expected);
    });
});
