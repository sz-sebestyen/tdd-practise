import { Bowling } from "../Bowling";

describe("Bowling", () => {
  const bowling = new Bowling();

  it("should implement IBowlingThrows interface", () => {
    expect(bowling.setThrows).toBeInstanceOf(Function);
  });

  it("should implement IBowlingScore interface", () => {
    expect(bowling.getScore).toBeInstanceOf(Function);
  });
});

describe("Bowling.getScore()", () => {
  describe("when no throws are set", () => {
    it("should return 0", () => {
      const bowling = new Bowling();

      const score = bowling.getScore();

      expect(score).toBe(0);
    });
  });

  describe("when the throws are set to", () => {
    const bowling = new Bowling();

    describe("all miss", () => {
      it("should return 0", () => {
        const throws = Array.from({ length: 20 }, () => 0);
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(0);
      });
    });

    describe("all 3", () => {
      it("should return the sum of the throw scores", () => {
        const throws = Array.from({ length: 20 }, () => 3);
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(60);
      });
    });

    describe("at least one spare", () => {
      it("should return the sum of the throw scores plus the throw score after the spare", () => {
        const throws = [5, 5, 1, ...Array.from({ length: 17 }, () => 0)];
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(12);
      });
    });

    describe("at least two spares", () => {
      it("should return the sum of the throw scores plus the throw score after the spare", () => {
        const throws = [5, 5, 5, 5, 1, ...Array.from({ length: 15 }, () => 0)];
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(27);
      });
    });

    describe("at least one strike", () => {
      it("should return the sum of the throw scores plus the two scores after the strike", () => {
        const throws = [10, 1, 2, ...Array.from({ length: 17 }, () => 0)];
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(16);
      });
    });

    describe("at least one strike and one spare", () => {
      it("should return the sum of the throw scores plus the extra scores from strike and spare", () => {
        const throws = [10, 5, 5, 1, ...Array.from({ length: 16 }, () => 0)];
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(32);
      });
    });

    describe("all spare", () => {
      it("should return the correct score", () => {
        const throws = Array.from({ length: 21 }, () => 5);
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(150);
      });
    });

    describe("all strike", () => {
      it("should return the correct score", () => {
        const throws = Array.from({ length: 22 }, () => 10);
        bowling.setThrows(throws);

        const score = bowling.getScore();

        expect(score).toBe(300);
      });
    });
  });
});
