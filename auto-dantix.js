let guesses = []; 

// useful to use with 'await' keyword
function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function tryAllGuesses() {
  // gather the list from local storage only here because it might be modified
  // by the user in between several tries
  browser.storage.local.get('listWord').then(
    (res) => guesses = res.listWord,
    (err) => console.error(err)
  );

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

    // make sure the guess is properly processed by trying again until it is.
    // this is necessary since it might miss for asynchronous timing reasons
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
  const autoDantixStartBtn = document.createElement('button');
  autoDantixStartBtn.innerHTML = 'Start Auto-Dantix';
  autoDantixStartBtn.style.marginTop = '1rem';
  autoDantixStartBtn.style.marginRight = '1rem';

  // create the button to trigger the process
  const autoDantixOptionsBtn = document.createElement('button');
  autoDantixOptionsBtn.innerHTML = 'A-D Options';
  autoDantixOptionsBtn.style.marginTop = '1rem';

  autoDantixStartBtn.addEventListener('click', tryAllGuesses);
  autoDantixOptionsBtn.addEventListener('click', () => {
    browser.runtime.sendMessage('showOptions');
  });

  document.getElementById('pedantix-summary').prepend(autoDantixOptionsBtn);
  document.getElementById('pedantix-summary').prepend(autoDantixStartBtn);
});
