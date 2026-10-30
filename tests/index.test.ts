import * as api from '../src';
import { isUrlLive } from '../src/isUrlLive';
import { validateUrl } from '../src/validateUrl';

describe('public API', () => {
  test('exports exactly validateUrl and isUrlLive', () => {
    expect(Object.keys(api).sort()).toEqual(['isUrlLive', 'validateUrl']);
    expect(api.validateUrl).toBe(validateUrl);
    expect(api.isUrlLive).toBe(isUrlLive);
  });
});
