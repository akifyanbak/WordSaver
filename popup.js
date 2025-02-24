document.addEventListener('DOMContentLoaded', () => {
  const wordList = document.getElementById('wordList');
  const exportBtn = document.getElementById('exportBtn');

  function updateWordList() {
    chrome.storage.sync.get({words: []}, (data) => {
      wordList.innerHTML = '';
      data.words.forEach((word, index) => {
        const li = document.createElement('li');
        li.textContent = word;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Sil';
        deleteBtn.onclick = () => deleteWord(index);
        li.appendChild(deleteBtn);
        wordList.appendChild(li);
      });
    });
  }

  function deleteWord(index) {
    chrome.storage.sync.get({words: []}, (data) => {
      let words = data.words;
      words.splice(index, 1);
      chrome.storage.sync.set({words: words}, updateWordList);
    });
  }

  exportBtn.addEventListener('click', () => {
    chrome.storage.sync.get({words: []}, (data) => {
      const blob = new Blob([JSON.stringify(data.words)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      chrome.tabs.create({url: url});
    });
  });

  updateWordList();
});
