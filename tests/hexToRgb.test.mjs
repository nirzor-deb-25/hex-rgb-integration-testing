import { expect } from 'chai';
import converter from '../src/hexToRgb.js';

const { hexToRgb } = converter;

describe('hexToRgb unit tests', () => {
  it('converts black to the minimum channel values', () => {
    expect(hexToRgb('#000000')).to.deep.equal({ r: 0, g: 0, b: 0 });
  });

  it('converts white to the maximum channel values', () => {
    expect(hexToRgb('#FFFFFF')).to.deep.equal({ r: 255, g: 255, b: 255 });
  });

  it('converts red correctly', () => {
    expect(hexToRgb('#FF0000')).to.deep.equal({ r: 255, g: 0, b: 0 });
  });

  it('converts green correctly', () => {
    expect(hexToRgb('#00FF00')).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  it('converts blue correctly', () => {
    expect(hexToRgb('#0000FF')).to.deep.equal({ r: 0, g: 0, b: 255 });
  });

  it('converts a colour with three different channel values', () => {
    expect(hexToRgb('#123456')).to.deep.equal({ r: 18, g: 52, b: 86 });
  });

  it('accepts input without a hash prefix', () => {
    expect(hexToRgb('123456')).to.deep.equal({ r: 18, g: 52, b: 86 });
  });

  it('accepts lowercase and mixed-case hexadecimal digits', () => {
    expect(hexToRgb('#abcdef')).to.deep.equal({ r: 171, g: 205, b: 239 });
    expect(hexToRgb('#aBcDeF')).to.deep.equal({ r: 171, g: 205, b: 239 });
  });

  it('rejects strings with invalid hexadecimal characters', () => {
    expect(() => hexToRgb('#GG0000')).to.throw(
      'Hex colour must contain exactly six hexadecimal digits, optionally prefixed with #.'
    );
  });

  it('rejects unsupported lengths and empty strings', () => {
    for (const value of ['', '#FFF', '12345', '1234567', '#12345678']) {
      expect(() => hexToRgb(value), `Input: ${value}`).to.throw(Error);
    }
  });

  it('rejects whitespace and extra hash prefixes', () => {
    for (const value of [' #123456', '#123456 ', '##123456']) {
      expect(() => hexToRgb(value), `Input: ${value}`).to.throw(Error);
    }
  });

  it('rejects non-string inputs', () => {
    for (const value of [undefined, null, 123456, true, {}, []]) {
      expect(() => hexToRgb(value)).to.throw(
        TypeError,
        'Hex colour must be a string.'
      );
    }
  });
});
