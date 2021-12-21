const Workshop = require('../workshop.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () => {
  it('should throw an error if no args', () => {
    const wshop = new Workshop({});
    wshop.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if args aren\'t strings', () => {
    const cases = [{}, []];

    for(let name of cases){
      const wshop = new Workshop({ name });
      wshop.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
    for(let concertId of cases){
      const wshop = new Workshop({ concertId });
      wshop.validate(err => {
        expect(err.errors.concertId).to.exist;
        });
    }
  });

  it('should not throw an error if args are okay', () => {
    const wshop = new Workshop({ name: 'Pour your soul into music', concertId: '9dq98wqe08xs45' });
    wshop.validate(err => {
      expect(err).to.not.exist;
    });
  });
});