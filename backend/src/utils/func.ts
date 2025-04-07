export function randomString() {
  const letter = "123456789qwertyuiop";
  const size = letter.length;
  let randomString = "";
  for (let i = 0; i < 10; i++) {
    randomString = randomString + letter[Math.floor(Math.random() * size)];
  }

  return randomString;
}
