(function () {
  "use strict";

  function normalizeHeader() {
    var main = document.querySelector("main");
    if (!main || main.querySelector(":scope > header")) return;

    var title = main.querySelector(":scope > h1");
    if (!title) return;

    var subtitle = title.nextElementSibling;
    var header = document.createElement("header");
    header.className = "study-header";

    if (title.previousElementSibling &&
        title.previousElementSibling.classList.contains("eyebrow")) {
      header.appendChild(title.previousElementSibling);
    }
    header.appendChild(title);

    if (subtitle && subtitle.tagName === "P") {
      header.appendChild(subtitle);
    }

    main.insertBefore(header, main.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", normalizeHeader);
  } else {
    normalizeHeader();
  }
}());
