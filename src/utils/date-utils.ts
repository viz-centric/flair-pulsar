export class DateUtils {
  static toDateFromSecondsAndNanos(seconds: number, nanos: number) {
    return new Date(seconds * 1000 + nanos / 1000);
  }
}
