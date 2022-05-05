import homeReducer, { State, setAddress } from '../slice';

describe('home reducer', () => {
  const initialState: State = {
    address: '',
  };

  test('should handle initial state', () => {
    expect(homeReducer(undefined, { type: 'unknown' })).toEqual({
      address: '',
    });
  });

  test('should handle setAddress', () => {
    const actual = homeReducer(initialState, setAddress('test'));
    expect(actual.address).toEqual('test');
  });
});
