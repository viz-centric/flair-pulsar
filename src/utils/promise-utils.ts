export class PromiseUtils {
  static wait(millis: number) {
    return new Promise(r => setTimeout(r, millis));
  }
}
