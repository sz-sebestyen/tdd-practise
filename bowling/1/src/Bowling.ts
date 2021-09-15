export interface IBowlingThrows {
  setThrows(throwScores: number[]): void;
}

export interface IBowlingScore {
  getScore(): number;
}

class IterableFrameScores {
  static readonly numberOfFrames = 10;
  static readonly maxFrameScore = 10;
  static readonly strikeSize = 1;
  static readonly spareAndOpenFrameSize = 2;

  constructor(private throwScores: number[]) {}

  private isStrike = (throwIndex: number): boolean =>
    this.throwScores[throwIndex] === IterableFrameScores.maxFrameScore;

  private isSpareOrStrike = (throwIndex: number): boolean =>
    this.getOpenFrameScore(throwIndex) >= IterableFrameScores.maxFrameScore;

  private getOpenFrameScore = (throwIndex: number): number =>
    this.throwScores[throwIndex] + this.throwScores[throwIndex + 1];

  private getSpareOrStrikeScore = (throwIndex: number): number =>
    this.getOpenFrameScore(throwIndex) + this.throwScores[throwIndex + 2];

  private getFrameScore = (throwIndex: number): number =>
    this.isSpareOrStrike(throwIndex) ? this.getSpareOrStrikeScore(throwIndex) : this.getOpenFrameScore(throwIndex);

  private getFrameSize = (throwIndex: number): number =>
    this.isStrike(throwIndex) ? IterableFrameScores.strikeSize : IterableFrameScores.spareAndOpenFrameSize;

  private isNotTheEnd = (frameIndex: number): boolean => frameIndex < IterableFrameScores.numberOfFrames;

  *[Symbol.iterator](): Iterator<number> {
    for (
      let frameIndex = 0, throwIndex = 0;
      this.isNotTheEnd(frameIndex);
      frameIndex++, throwIndex += this.getFrameSize(throwIndex)
    )
      yield this.getFrameScore(throwIndex) || 0;
  }
}

export class Bowling implements IBowlingThrows, IBowlingScore {
  private iterableFrameScores = new IterableFrameScores([]);

  setThrows(throwScores: number[]): void {
    this.iterableFrameScores = new IterableFrameScores(throwScores);
  }

  getScore(): number {
    let gameScore = 0;

    for (const frameScore of this.iterableFrameScores) gameScore += frameScore;

    return gameScore;
  }
}
