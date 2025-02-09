import { greet } from '../src/index';

describe('greet function', () => {
  it('should return a greeting message', () => {
    const result: string = greet('Node Forge Contributor');
    expect(result).toBe('Hello, Node Forge Contributor!');
  });
});
