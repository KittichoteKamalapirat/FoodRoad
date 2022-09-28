import { formatphoneNumber } from "./formatphoneNumber";

describe("formatphoneNumber", () => {
  test("do nothing", () => {
    const input = "+66961234567";

    const countryCode = "66";
    const output = formatphoneNumber(input, countryCode);
    const expectedResult = "+66961234567";

    expect(output).toEqual(expectedResult);
  });
  test("turn 0 to +66", () => {
    const input = "0961234567";

    const countryCode = "66";
    const output = formatphoneNumber(input, countryCode);
    const expectedResult = "+66961234567";

    expect(output).toEqual(expectedResult);
  });

  test("Add + to 66", () => {
    const input = "66961234567";

    const countryCode = "66";
    const output = formatphoneNumber(input, countryCode);
    const expectedResult = "+66961234567";

    expect(output).toEqual(expectedResult);
  });
});
