import { expect } from 'chai';
import { server } from 'rook/lib/tests/setup';

describe('api', () => {
  describe('random', () => {
    it('responds with a random number', (done) => {
      server.inject({ method: 'GET', url: '/random' }, (res) => {
        expect(res.result).to.be.an('object');
        expect(res.result.number).to.be.within(0, 1);
        expect(res.result).to.have.property('time');
        done();
      });
    });
  });
});
