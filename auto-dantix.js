const guesses = [
  'c',
  'd',
  'e',
  'l',
  'm',
  'n',
  's',
  'à',
  'sa',
  'de',
  'là',
  'le',
  'un',
  'il',
  'ou',
  'où',
  'ce',
  'ne',
  'en',
  'du',
  'ci',
  'et',
  'son',
  'que',
  'via',
  'pas',
  'être',
  'avoir',
  'faire',
  'lire',
  'devenir',
  'sud',
  'est',
  'ouest',
  'pays',
  'ville',
  'Europe',
  'Amérique',
  'Asie',
  'Afrique',
  'Australie',
  'continent',
  'endroit',
  'lieu',
  'France',
  'Français',
  'Anglais',
  'Latin',
  'Grec',
  'mathématique',
  'physique',
  'astronomie',
  'science',
  'calcul',
  'invention',
  'étude',
  'texte',
  'mot',
  'oeuvre',
  'concept',
  'idée',
  'art',
  'architecture',
  'bâtiment',
  'religion',
  'dieu',
  'période',
  'histoire',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
  'XVI',
  'XVII',
  'XVIII',
  'XIX',
  'XX',
  'XXI',
  'siècle',
  'après',
  'avant',
  'petit',
  'grand',
  'moins',
  'plus',
  'bien',
  'mal',
  'début',
  'fin',
  'ancien',
  'nouveau',
  'ainsi',
  'alors',
  'pour',
  'encore',
  'ensemble',
];

// useful to use with 'await' keyword
function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function tryAllGuesses() {
  const inputField = document.getElementById('pedantix-guess');
  const inputButton = document.getElementById('pedantix-guess-btn');
  let curPlaceholder = '';
  let curIndex = 0;
  let shouldContinue;

  // go through all the guesses in the list
  while (curIndex < guesses.length) {
    inputField.value = guesses[curIndex];
    curPlaceholder = inputField.placeholder;
    shouldContinue = true;

    // make sure the guess is properly processed by trying again
    // until it is if necessary
    // this is necessary since there are misses sometimes (for asynchronous
    // timing reasons)
    while (shouldContinue) {
      if (inputField.placeholder !== curPlaceholder) {
        shouldContinue = false;
      } else{
        await sleep(50);
        inputField.value = guesses[curIndex];
        inputButton.click();
      }
    }

    curIndex += 1;
  }
}

// trigger everything once the page is fully loaded
window.addEventListener('load', () => {
  // create the button to trigger the process
  const autoDantixBtn = document.createElement('button');
  autoDantixBtn.innerHTML = 'Auto-Dantix';
  autoDantixBtn.style.marginTop = '1rem';
  // autoDantixBtn.addEventListener('click', tryAllGuesses);
  autoDantixBtn.addEventListener('click', () => {
    browser.runtime.sendMessage('showOptions');
  });

  document.getElementById('pedantix-summary').prepend(autoDantixBtn);
});
