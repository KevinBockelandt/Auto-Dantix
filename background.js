browser.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    browser.runtime.openOptionsPage();
  }
});
