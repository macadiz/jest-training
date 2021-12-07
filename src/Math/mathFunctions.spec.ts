import { divide, minus, multiply, sum } from "@src/Math/mathFunctions";

describe("Math functions test", () => {
  it("should sum two numbers successfuly", () => {
    const result = sum(5, 5);
    const expected = 10;

    expect(result).toBe(expected);
  });

  it("should minus two numbers successfuly", () => {
    const result = minus(5, 5);
    const expected = 0;

    expect(result).toBe(expected);
  });


  it("should multiply two numbers successfuly", () => {
    const result = multiply(5, 5);
    const expected = 25;

    expect(result).toBe(expected);
  });


  it("should divide two numbers successfuly", () => {
    const result = divide(5, 5);
    const expected = 1;

    expect(result).toBe(expected);
  });
});
