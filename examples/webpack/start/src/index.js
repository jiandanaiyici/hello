function createList() {
  const element = document.getElementById("ul");
  const fragment = document.createDocumentFragment();
  const browsers = [
    "Firefox",
    "Chrome",
    "Opera",
    "Safari",
    "Internet Explorer",
  ];

  browsers.forEach(function (browser) {
    const li = document.createElement("li");
    li.textContent = browser;
    fragment.appendChild(li);
  });

  element.appendChild(fragment);
}

createList();
