(function () {
  "use strict";

  var openRouterModels = [
    "google/gemini-2.5-flash",
    "google/gemini-2.5-pro",
    "google/gemini-2.5-flash-image-preview",
    "openai/gpt-4o-mini",
    "openai/gpt-5-image",
    "openai/gpt-6.1-terra-pro",
    "openai/gpt-6.1-terra",
    "mistralai/voxtral-mini-transcribe-3-0",
    "perplexity/pplx-decider-v1.2",
    "qwen/qwen-image-2.1-turbo",
    "black-forest-labs/flux.2-klein-4b"
  ];

  function populateOpenRouterModels() {
    document.querySelectorAll("select[data-openrouter-model]").forEach(function (select) {
      var selectedValue = select.dataset.defaultModel || select.value;
      select.replaceChildren();
      openRouterModels.forEach(function (model) {
        var option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        select.appendChild(option);
      });
      if (openRouterModels.includes(selectedValue)) {
        select.value = selectedValue;
      }
    });
  }

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
    document.addEventListener("DOMContentLoaded", function () {
      normalizeHeader();
      populateOpenRouterModels();
    });
  } else {
    normalizeHeader();
    populateOpenRouterModels();
  }
}());
