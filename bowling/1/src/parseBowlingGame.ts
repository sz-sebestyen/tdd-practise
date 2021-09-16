const numberOfFrames = 10;

function parseBowlingGame(input: string): number[] {
  const inputAsArray = input.split(" ");

  const frames = inputAsArray.slice(0, numberOfFrames);
  const extraFrames = inputAsArray.slice(numberOfFrames);

  return [...parseFrames(frames), ...extraFrames.map(parseThrow)];
}

function parseFrames(frames: string[]): number[] {
  return frames.map(parseFrame).flat();
}

const maxFrameScore = 10;

function parseFrame(frame: string): number[] {
  if (frame === "-") return [0, 0];
  else if (frame === "x") return [maxFrameScore];
  else if (frame[1] === "/") {
    const first = parseThrow(frame[0]);
    return [first, maxFrameScore - first];
  } else return frame.split("").map(parseThrow);
}

function parseThrow(char: string): number {
  return +char.replace("-", "0").replace("x", "10");
}

export { parseBowlingGame };
