import { parseBowlingGame } from "../parseBowlingGame";

describe("parseBowlingGame", () => {
  describe("when the input string is", () => {
    describe("all miss", () => {
      it("should return an array of 20 zeros", () => {
        const input = "- - - - - - - - - -";
        const expected = Array.from({ length: 20 }, () => 0);

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all strike", () => {
      it("should return an array of 12 10s", () => {
        const input = "x x x x x x x x x x x x";
        const expected = Array.from({ length: 12 }, () => 10);

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all number 4", () => {
      it("should return an array of 20 4s", () => {
        const input = "44 44 44 44 44 44 44 44 44 44";
        const expected = Array.from({ length: 20 }, () => 4);

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all miss except first strike", () => {
      it("should return an array of 19, first 10, next 18 as 0s", () => {
        const input = "x - - - - - - - - -";
        const expected = [10, ...Array.from({ length: 18 }, () => 0)];

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all numbers", () => {
      it("should return the numbers a an array", () => {
        const input = "12 23 34 45 54 43 32 21 12 23";
        const expected = input
          .split(" ")
          .join("")
          .split("")
          .map((char) => +char);

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all miss except the first is a spare", () => {
      it("should return zeros with the first the being numbers (their sum is 10)", () => {
        const input = "4/ - - - - - - - - -";
        const expected = [4, 6, ...Array.from({ length: 18 }, () => 0)];

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all strikes except the extra balls are misses", () => {
      it("should return an array of 10 10s plus two zeros", () => {
        const input = "x x x x x x x x x x - -";
        const expected = [...Array.from({ length: 10 }, () => 10), 0, 0];

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all spares", () => {
      it("should return an array of the numbers", () => {
        const input = "-/ 3/ 3/ 3/ 3/ 3/ 3/ 3/ 3/ 3/ x";
        const expected = [0, 10, ...Array.from({ length: 9 }, () => [3, 7]).flat(), 10];

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });

    describe("all misses but some mixed number and miss", () => {
      it("should return an array of the numbers", () => {
        const input = "-3 - - - - - - - - -";
        const expected = [0, 3, ...Array.from({ length: 18 }, () => 0)];

        const result = parseBowlingGame(input);

        expect(result).toEqual(expected);
      });
    });
  });
});
