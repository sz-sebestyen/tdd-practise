class Frame {
  static readonly maxFrameScore = 10;
  static readonly strikeSize = 1;
  static readonly spareAndOpenFrameSize = 2;

  constructor(private throws: number[]) {}

  private isStrike = (): boolean => this.throws[0] === Frame.maxFrameScore;

  private isSpareOrStrike = (): boolean => this.getOpenFrameScore() >= Frame.maxFrameScore;

  private getOpenFrameScore = (): number => this.throws[0] + this.throws[1];

  private getSpareOrStrikeScore = (): number => this.getOpenFrameScore() + this.throws[2];

  getScore = (): number => (this.isSpareOrStrike() ? this.getSpareOrStrikeScore() : this.getOpenFrameScore());

  getSize = (): number => (this.isStrike() ? Frame.strikeSize : Frame.spareAndOpenFrameSize);
}

class IterableFrameScores {
  static readonly numberOfFrames = 10;

  constructor(private throwScores: number[]) {}

  private isNotTheEnd = (frameIndex: number): boolean => frameIndex < IterableFrameScores.numberOfFrames;

  *[Symbol.iterator](): Iterator<number> {
    for (
      let frameIndex = 0, throwIndex = 0, frame = new Frame(this.throwScores);
      this.isNotTheEnd(frameIndex);
      frameIndex++, throwIndex += frame.getSize(), frame = new Frame(this.throwScores.slice(throwIndex))
    )
      yield frame.getScore();
  }
}

export class Bowling {
  private iterableFrameScores = new IterableFrameScores([]);
  private score = 0;

  private calculateScore(): void {
    let gameScore = 0;

    for (const frameScore of this.iterableFrameScores) gameScore += frameScore;

    this.score = gameScore;
  }

  setThrows(throwScores: number[]): void {
    this.iterableFrameScores = new IterableFrameScores(throwScores);
    this.calculateScore();
  }

  getScore = (): number => this.score;
}
