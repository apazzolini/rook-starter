import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Home } from '../Home';
const renderer = ReactTestUtils.createRenderer();

describe('react', () => {
  describe('views', () => {
    describe('Home', () => {
      const state = {
        random: {
          number: 0.1,
          time: '2016-02-16T01:46:47.096Z'
        }
      };

      it('renders the random number and timestamp', () => {
        renderer.render(React.createElement(Home, state));
        const result = renderer.getRenderOutput();
        const p = result.props.children[0];

        expect(p.type).to.equal('p');
        expect(p.props.children).to.include('Current Random Number: ');
        expect(p.props.children).to.include(state.random.number);
        expect(p.props.children).to.include('Generated at: ');
        expect(p.props.children).to.include(state.random.time);
      });
    });
  });
});
