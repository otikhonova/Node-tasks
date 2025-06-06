import stringToBoolean from '../../src/utils/booleanUtils';

describe('stringToBoolean', () => {
  it('returns true for "true"', () => {
    expect(stringToBoolean('true')).toBe(true);
  });

  it('returns false for "false"', () => {
    expect(stringToBoolean('false')).toBe(false);
  });

  it('returns false for any other string', () => {
    expect(stringToBoolean('other')).toBe(false);
  });
});
