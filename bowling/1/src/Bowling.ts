export interface IBowlingThrows {
  setThrows(throwScores: number[]): void;
}

export interface IBowlingScore {
  getScore(): number;
}

const maxFrameScore = 10;
const numberOfFrames = 10;

export class Bowling implements IBowlingThrows, IBowlingScore {
  private throwScores: number[] = [];
  private frameScores: number[] = Array.from({ length: numberOfFrames }, () => 0);

  setThrows(throwScores: number[]): void {
    this.throwScores = throwScores;
    this.countFrameScores();
  }

  private isStrike(throwScore: number): boolean {
    return throwScore === maxFrameScore;
  }

  private isSpareOrStrike(score: number): boolean {
    return score >= maxFrameScore;
  }

  private countFrameScores(): void {
    let throwIndex = 0;

    this.frameScores = this.frameScores.map<number>((): number => {
      let score = this.throwScores[throwIndex] + this.throwScores[throwIndex + 1];

      if (this.isSpareOrStrike(score)) {
        score += this.throwScores[throwIndex + 2];
      }

      throwIndex += this.isStrike(this.throwScores[throwIndex]) ? 1 : 2;

      return score;
    });
  }

  getScore(): number {
    return this.frameScores.reduce((sum, cur) => sum + cur);
  }
}
