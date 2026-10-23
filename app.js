(function () {
  "use strict";

  var pages = Array.isArray(window.PAGE_MANIFEST) ? window.PAGE_MANIFEST : [];
  var list = document.getElementById("page-list");
  var frame = document.getElementById("page-frame");
  var emptyState = document.getElementById("empty-state");
  var root = document.documentElement;
  var resizer = document.getElementById("sidebar-resizer");
  var sidebarWidthStorage = "arquivo-sidebar-width";

  function setSidebarWidth(width) {
    var boundedWidth = Math.max(136, Math.min(window.innerWidth * 0.35, width));
    root.style.setProperty("--sidebar-width", boundedWidth + "px");
    return boundedWidth;
  }

  var savedSidebarWidth = Number(window.localStorage.getItem(sidebarWidthStorage));
  if (Number.isFinite(savedSidebarWidth) && savedSidebarWidth > 0) {
    setSidebarWidth(savedSidebarWidth);
  }

  if (resizer) {
    var dragging = false;

    resizer.addEventListener("pointerdown", function (event) {
      dragging = true;
      resizer.dataset.dragging = "true";
      resizer.setPointerCapture(event.pointerId);
    });

    resizer.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      var width = setSidebarWidth(event.clientX);
      window.localStorage.setItem(sidebarWidthStorage, String(width));
    });

    resizer.addEventListener("pointerup", function (event) {
      dragging = false;
      delete resizer.dataset.dragging;
      resizer.releasePointerCapture(event.pointerId);
    });

    resizer.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var currentWidth = root.getBoundingClientRect().width;
      var change = event.key === "ArrowRight" ? 16 : -16;
      var width = setSidebarWidth(currentWidth + change);
      window.localStorage.setItem(sidebarWidthStorage, String(width));
    });
  }

  function selectPage(link) {
    document.querySelectorAll(".page-link").forEach(function (item) {
      item.removeAttribute("aria-current");
    });
    link.setAttribute("aria-current", "page");
    frame.src = link.dataset.path;
  }

  if (!pages.length) {
    frame.hidden = true;
    emptyState.hidden = false;
    return;
  }

  pages.forEach(function (page, index) {
    var link = document.createElement("a");
    link.className = "page-link";
    link.href = page.path;
    link.dataset.path = page.path;
    link.textContent = page.title || page.path;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      selectPage(link);
    });
    list.appendChild(link);

    if (index === 0) {
      selectPage(link);
    }
  });
}());
