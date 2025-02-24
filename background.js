chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Kelimeyi Kaydet",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWord") {
    chrome.storage.sync.get({words: []}, (data) => {
      let words = data.words;
      words.push(info.selectionText);
      chrome.storage.sync.set({words: words});
    });
  }
});
