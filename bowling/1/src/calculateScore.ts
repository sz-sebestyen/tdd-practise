import { Bowling } from "./Bowling";
import { parseBowlingGame } from "./parseBowlingGame";

export function calculateScore(bowlingGame: string): number {
  const throwScores = parseBowlingGame(bowlingGame);

  const bowling = new Bowling();

  bowling.setThrows(throwScores);

  return bowling.getScore();
}
