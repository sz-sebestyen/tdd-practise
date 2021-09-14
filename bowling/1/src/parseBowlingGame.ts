function parseThrow(char: string): number {
  return +char.replace("-", "0").replace("x", "10");
}

export function parseBowlingGame(input: string): number[] {
  const inputAsArray = input.split(" ");

  const frames = inputAsArray.slice(0, 10);
  const extraFrames = inputAsArray.slice(10);

  return [
    ...frames
      .map((frame) => {
        if (frame === "-") return [0, 0];
        else if (frame === "x") return [10];
        else if (frame[1] === "/") {
          const first = parseThrow(frame[0]);
          return [first, 10 - first];
        } else return [+frame[0], +frame[1]];
      })
      .flat(),
    ...extraFrames.map((frame) => parseThrow(frame)),
  ];
}
