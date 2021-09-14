export interface IBowlingThrows {
  setThrows(throwScores: number[]): void;
}

export interface IBowlingScore {
  getScore(): number;
}

class FrameScoreList {
  readonly numberOfFrames = 10;
  readonly maxFrameScore = 10;
  readonly strikeSize = 1;
  readonly spareAndOpenFrameSize = 2;

  constructor(private throwScores: number[]) {}

  private isStrike = (throwIndex: number): boolean => this.throwScores[throwIndex] === this.maxFrameScore;

  private isSpareOrStrike = (throwIndex: number): boolean => this.getOpenFrameScore(throwIndex) >= this.maxFrameScore;

  private getOpenFrameScore = (throwIndex: number): number =>
    this.throwScores[throwIndex] + this.throwScores[throwIndex + 1];

  private getSpareOrStrikeScore = (throwIndex: number): number =>
    this.getOpenFrameScore(throwIndex) + this.throwScores[throwIndex + 2];

  private getFrameScore = (throwIndex: number): number =>
    this.isSpareOrStrike(throwIndex) ? this.getSpareOrStrikeScore(throwIndex) : this.getOpenFrameScore(throwIndex);

  private getFrameSize = (throwIndex: number): number =>
    this.isStrike(throwIndex) ? this.strikeSize : this.spareAndOpenFrameSize;

  *[Symbol.iterator](): Iterator<number> {
    for (
      let frameIndex = 0, throwIndex = 0;
      frameIndex < this.numberOfFrames;
      throwIndex += this.getFrameSize(throwIndex), frameIndex++
    )
      yield this.getFrameScore(throwIndex) || 0;
  }
}

export class Bowling implements IBowlingThrows, IBowlingScore {
  private frameScoreList = new FrameScoreList([]);

  setThrows(throwScores: number[]): void {
    this.frameScoreList = new FrameScoreList(throwScores);
  }

  getScore(): number {
    let sum = 0;

    for (const frameScore of this.frameScoreList) {
      sum += frameScore;
    }

    return sum;
  }
}
