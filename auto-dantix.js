const guesses = [
  'c',
  'd',
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
  'mathématique',
  'physique',
  'astronomie',
  'science',
  'calcul',
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
  // wait a little at the start since the pedantix scripts take some time to setup
  await sleep(500);

  const inputField = document.getElementById('pedantix-guess');
  const inputButton = document.getElementById('pedantix-guess-btn');
  let curPlaceholder = '';
  let curIndex = 0;
  let shouldContinue;

  while (curIndex < guesses.length) {
    inputField.value = guesses[curIndex];
    curPlaceholder = inputField.placeholder;
    shouldContinue = true;

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
window.addEventListener('load', tryAllGuesses);
