export interface IBowlingThrows {
  setThrows(throwScores: number[]): void;
}

export class Bowling implements IBowlingThrows {
  private throwScores: number[] = [];
  private frameScores: number[] = Array.from({ length: 10 }, () => 0);

  setThrows(throwScores: number[]): void {
    this.throwScores = throwScores;
    this.countFrameScores();
  }

  private isStrike(throwScore: number): boolean {
    return throwScore === 10;
  }

  private isSpareOrStrike(score: number): boolean {
    return score >= 10;
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
