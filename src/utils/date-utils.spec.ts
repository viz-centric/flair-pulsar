import {DateUtils} from './date-utils';

describe('DateUtils', () => {

  it('should return date from seconds and nanos', () => {
    let initDate = new Date();
    let seconds: number = Math.floor(initDate.getTime() / 1000);
    let nanos: number = initDate.getMilliseconds() * 1000;

    let date = DateUtils.toDateFromSecondsAndNanos(seconds, nanos);
    expect(date.getTime()).toEqual(initDate.getTime());
  });

});
