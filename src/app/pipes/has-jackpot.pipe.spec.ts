import { HasJackpotPipe } from './has-jackpot.pipe';

describe('HasJackpotPipe', () => {
  it('create an instance', () => {
    const pipe = new HasJackpotPipe();
    expect(pipe).toBeTruthy();
  });
});
