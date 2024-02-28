const listWordInput = document.getElementById('list-word-input');
const listWordBtn = document.getElementById('list-word-btn');
const listWord = document.getElementById('list-word');

browser.storage.local.get('listWord')
  .then((res) => {
    listWordInput.value = res.listWord;
    populateListDisplay(res.listWord);
  }, (err) => {
    console.error(err);
  });

function populateListDisplay(arr) {
  while (listWord.firstChild) {
    listWord.removeChild(listWord.firstChild);
  }

  arr.forEach(e => {
    if (e.trim().length > 0) {
      const newItem = document.createElement('li');
      newItem.innerHTML = e;
      listWord.appendChild(newItem);
    }
  });
}

listWordBtn.addEventListener('click', () => {
  const newListArr = listWordInput.value.split(',');
  const newListArrUnique = [...new Set(newListArr)];

  // eliminate duplicates in the list as it will pose problems
  browser.storage.local.set({ listWord: newListArrUnique });
  populateListDisplay(newListArrUnique);
});
