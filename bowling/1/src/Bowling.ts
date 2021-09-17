class Bowling {
  static readonly numberOfFrames = 10;
  private score = 0;
  private throwScores: number[] = [];

  getScore = (): number => this.score;

  setThrows(throwScores: number[]): void {
    this.throwScores = throwScores;
    this.calculateScore();
  }

  private calculateScore(): void {
    let gameScore = 0;
    const frameStepper = new FrameStepper(this.throwScores);

    for (let frame = 0; frame < Bowling.numberOfFrames; frame++, frameStepper.next())
      gameScore += frameStepper.getCurrentFrameScore();

    this.score = gameScore;
  }
}

class FrameStepper {
  static readonly maxFrameScore = 10;
  static readonly strikeSize = 1;
  static readonly spareAndOpenFrameSize = 2;

  constructor(private throws: number[]) {}

  next = (): this => {
    this.throws = this.throws.slice(this.getCurrentFrameSize());
    return this;
  };

  getCurrentFrameScore = (): number =>
    this.isSpareOrStrike() ? this.getSpareOrStrikeScore() : this.getOpenFrameScore();

  private getCurrentFrameSize = (): number =>
    this.isStrike() ? FrameStepper.strikeSize : FrameStepper.spareAndOpenFrameSize;

  private isStrike = (): boolean => this.throws[0] === FrameStepper.maxFrameScore;

  private isSpareOrStrike = (): boolean => this.getOpenFrameScore() >= FrameStepper.maxFrameScore;

  private getOpenFrameScore = (): number => this.throws[0] + this.throws[1];

  private getSpareOrStrikeScore = (): number => this.getOpenFrameScore() + this.throws[2];
}

export { Bowling };
