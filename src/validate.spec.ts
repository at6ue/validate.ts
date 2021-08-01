import { validate } from "./validate";

describe("Validates that the string is an integer", () => {
  it("unsigned integer", () => {
    expect(validate("1234567890").isInteger()).toBeTruthy();
  });
  it("positive signed integer", () => {
    expect(validate("+1234567890").isInteger()).toBeTruthy();
  });
  it("negative signed integer", () => {
    expect(validate("-1234567890").isInteger()).toBeTruthy();
  });
  it("zero", () => {
    expect(validate("0").isInteger()).toBeTruthy();
  });
  it("positive signed zero", () => {
    expect(validate("+0").isInteger()).toBeTruthy();
  });
  it("negative signed zero", () => {
    expect(validate("-0").isInteger()).toBeTruthy();
  });

  describe("with the minimum value constraint", () => {
    it("equal to the input", () => {
      expect(validate("100").isInteger({ min: 100 })).toBeTruthy();
    });
    it("less than the input", () => {
      expect(validate("99").isInteger({ min: 100 })).toBeFalsy();
    });
  });

  describe("with the maximum value constraint", () => {
    it("equal to the input", () => {
      expect(validate("100").isInteger({ max: 100 })).toBeTruthy();
    });
    it("greater than the input", () => {
      expect(validate("101").isInteger({ max: 100 })).toBeFalsy();
    });
  });

  describe("with or conditions", () => {
    it("within the range", () => {
      expect(
        validate("25").isInteger({
          or: [
            { min: 0, max: 10 },
            { min: 20, max: 30 },
          ],
        })
      ).toBeTruthy();
    });
    it("out of ranges", () => {
      expect(
        validate("15").isInteger({
          or: [
            { min: 0, max: 10 },
            { min: 20, max: 30 },
          ],
        })
      ).toBeFalsy();
    });
  });

  describe("with and conditions", () => {
    it("within the range", () => {
      expect(
        validate("5").isInteger({
          and: [
            { min: 0, max: 10 },
            { min: 5, max: 15 },
          ],
        })
      ).toBeTruthy();
    });
    it("out of ranges", () => {
      expect(
        validate("4").isInteger({
          and: [
            { min: 0, max: 10 },
            { min: 5, max: 15 },
          ],
        })
      ).toBeFalsy();
    });
  });
});
