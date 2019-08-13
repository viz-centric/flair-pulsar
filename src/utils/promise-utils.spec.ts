import {PromiseUtils} from './promise-utils';

describe('PromiseUtils', () => {
  it('should wait specified amount of time before continues', async () => {
    const startTime: Date = new Date();
    await PromiseUtils.wait(1000);
    const endTime: Date = new Date();

    expect(endTime.getTime() - startTime.getTime()).toBeGreaterThanOrEqual(
      1000,
    );
  });
});
