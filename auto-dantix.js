const guesses = [
  'le',
  'du',
  'un',
  'ce',
  'ne',
  'en',
  'il',
  'si',
  'de',
  'ni',
];

// useful to use with 'await' keyword
function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function tryAllGuesses() {
  // not sure why this is needed. In theory we already wait for the page to be fully loaded
  await sleep(1000);

  let curIndex = 0;
  const inputField = document.getElementById('pedantix-guess');
  const inputButton = document.getElementById('pedantix-guess-btn');

  while (curIndex < guesses.length) {
    inputField.value = guesses[curIndex];
    inputButton.click();
    await sleep(1000);
    curIndex += 1;
  }
}

// trigger everything once the page is fully loaded
window.addEventListener('load', tryAllGuesses);