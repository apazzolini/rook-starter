import { expect } from 'chai';
import Immutable from 'immutable';
import { createReducer } from 'rook/lib/redux/createStore';
import reducers from '../modules';
const reducer = createReducer(reducers.random);

describe('redux', () => {
  describe('reducers', () => {
    describe('random', () => {
      const initialState = Immutable.fromJS({});

      it('handles loadOk', () => {
        const curDate = new Date().toString();
        const newState = reducer(initialState, {
          type: 'random/loadOk',
          result: {
            number: 0.5,
            time: curDate
          }
        });

        expect(newState.toJS()).to.deep.equal({
          number: 0.5,
          time: curDate
        });
      });
    });
  });
});

