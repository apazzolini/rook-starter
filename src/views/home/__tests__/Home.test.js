import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Home } from '../Home';
const renderer = ReactTestUtils.createRenderer();

describe('react', () => {
  describe('views', () => {
    describe('Home', () => {
      const state = {
        clientRequestCounter: {
          count: 0
        },
        random: {
          number: 0.1,
          time: '2016-02-16T01:46:47.096Z',
          loadedOnServer: false
        }
      };

      it('renders the random sample data', () => {
        renderer.render(React.createElement(Home, state));
        const result = renderer.getRenderOutput();
        const p = result.props.children[0];

        expect(p.type).to.equal('p');
        expect(p.props.children).to.include('Current Random Number: ');
        expect(p.props.children).to.include(state.random.number);
        expect(p.props.children).to.include('Generated at: ');
        expect(p.props.children).to.include(state.random.time);
        expect(p.props.children).to.include('Generated on server? ');
        expect(p.props.children).to.include('Number of client requests: ');
        expect(p.props.children).to.include(0);
      });
    });
  });
});
