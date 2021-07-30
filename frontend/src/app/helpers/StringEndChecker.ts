export class StringEndChecker {
  static endsWithAny = (suffixes : string[], string: string) => suffixes.some((suffix) => string.endsWith(suffix));
}
