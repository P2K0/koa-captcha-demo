function randomText(size = 4): string {
  const START_INDEX = 2;

  return Math.random().toString(36).slice(START_INDEX, size + START_INDEX);
}

function randomHexColor():string {
  const randomComponent = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

  const rHex:string = randomComponent();
  const gHex:string = randomComponent();
  const bHex:string = randomComponent();

  return `#${rHex}${gHex}${bHex}`;
}

export { randomText ,randomHexColor};
