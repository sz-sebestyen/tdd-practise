import { calculateScore } from "../calculateScore";

describe("calculateScore", () => {
  it("should return the correct score", () => {
    const game = "x x x x x x x x x x x x";
    const expectedScore = 300;

    const score = calculateScore(game);

    expect(score).toBe(expectedScore);
  });

  it("should return the correct score", () => {
    const game = "x 35 9/ -7 -/ x 12 51 - 4/ x";
    const expectedScore = 105;

    const score = calculateScore(game);

    expect(score).toBe(expectedScore);
  });
});
