import {DateUtils} from './date-utils';

describe('DateUtils', () => {
  it('should return date from seconds and nanos', () => {
    const initDate = new Date();
    const seconds: number = Math.floor(initDate.getTime() / 1000);
    const nanos: number = initDate.getMilliseconds() * 1000;

    const date = DateUtils.toDateFromSecondsAndNanos(seconds, nanos);
    expect(date.getTime()).toEqual(initDate.getTime());
  });
});
