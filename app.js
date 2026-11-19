(function () {
  "use strict";

  if (!document.body.classList.contains("access-granted")) return;

  var allPages = Array.isArray(window.PAGE_MANIFEST) ? window.PAGE_MANIFEST : [];
  var pages = allPages.filter(function (page) {
    return page.visible !== false;
  });
  var list = document.getElementById("page-list");
  var frame = document.getElementById("page-frame");
  var emptyState = document.getElementById("empty-state");
  var root = document.documentElement;
  var resizer = document.getElementById("sidebar-resizer");
  var sidebarWidthStorage = "arquivo-sidebar-width";
  var sidebarCollapsedStorage = "arquivo-sidebar-collapsed";
  var pageQueryParameter = "page";

  var sidebarCollapse = document.getElementById("sidebar-collapse");
  var sidebarReveal = document.getElementById("sidebar-reveal");

  function setSidebarCollapsed(collapsed) {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    sidebarCollapse.setAttribute("aria-expanded", String(!collapsed));
    sidebarCollapse.setAttribute("aria-label", collapsed ? "Mostrar sidebar" : "Esconder sidebar");
    sidebarReveal.hidden = !collapsed;
    window.localStorage.setItem(sidebarCollapsedStorage, String(collapsed));
  }

  if (window.localStorage.getItem(sidebarCollapsedStorage) === "true") {
    setSidebarCollapsed(true);
  }

  sidebarCollapse.addEventListener("click", function () {
    setSidebarCollapsed(true);
  });

  sidebarReveal.addEventListener("click", function () {
    setSidebarCollapsed(false);
  });

  function shellUrl(path) {
    var url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set(pageQueryParameter, path);
    return url.href;
  }

  function requestedPagePath() {
    var path = new URL(window.location.href).searchParams.get(pageQueryParameter);
    return path && pages.some(function (page) {
      return page.path === path;
    }) ? path : "";
  }

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

  var shell = document.querySelector(".site-shell");
  var menuToggle = document.getElementById("menu-toggle");
  var backdrop = document.getElementById("sidebar-backdrop");
  var mobileTitle = document.getElementById("mobile-title");

  function setMenuOpen(open) {
    shell.classList.toggle("sidebar-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  menuToggle.addEventListener("click", function () {
    setMenuOpen(!shell.classList.contains("sidebar-open"));
  });

  backdrop.addEventListener("click", function () {
    setMenuOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenuOpen(false);
  });

  var textStorageKey = "arquivo-local-text-v1";
  var textModal = document.getElementById("text-storage-modal");
  var openTextModal = document.getElementById("open-text-storage");
  var closeTextModal = document.getElementById("close-text-storage");
  var storedText = document.getElementById("stored-text");
  var textStatus = document.getElementById("text-storage-status");
  var copyTextButton = document.getElementById("copy-stored-text");
  var saveTextButton = document.getElementById("save-stored-text");
  var deleteTextButton = document.getElementById("delete-stored-text");
  var textModalPreviouslyFocused = null;

  function setTextStatus(message) {
    textStatus.textContent = message;
  }

  function openTextStorage() {
    textModalPreviouslyFocused = document.activeElement;
    storedText.value = window.localStorage.getItem(textStorageKey) || "";
    setTextStatus(storedText.value ? "Texto carregado do armazenamento local." : "");
    textModal.hidden = false;
    document.body.classList.add("text-modal-open");
    storedText.focus();
  }

  function closeTextStorage() {
    textModal.hidden = true;
    document.body.classList.remove("text-modal-open");
    if (textModalPreviouslyFocused) textModalPreviouslyFocused.focus();
  }

  openTextModal.addEventListener("click", openTextStorage);
  closeTextModal.addEventListener("click", closeTextStorage);

  textModal.addEventListener("click", function (event) {
    if (event.target === textModal) closeTextStorage();
  });

  saveTextButton.addEventListener("click", function () {
    window.localStorage.setItem(textStorageKey, storedText.value);
    setTextStatus("Texto salvo neste navegador.");
  });

  deleteTextButton.addEventListener("click", function () {
    window.localStorage.removeItem(textStorageKey);
    storedText.value = "";
    setTextStatus("Texto apagado deste navegador.");
  });

  copyTextButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(storedText.value);
      setTextStatus("Texto copiado.");
    } catch (error) {
      storedText.select();
      var copied = document.execCommand("copy");
      setTextStatus(copied ? "Texto copiado." : "Não foi possível copiar. Selecione o texto e copie manualmente.");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !textModal.hidden) closeTextStorage();
  });

  function selectPage(link) {
    document.querySelectorAll(".page-link").forEach(function (item) {
      item.removeAttribute("aria-current");
    });
    link.setAttribute("aria-current", "page");
    mobileTitle.textContent = link.textContent;
    setMenuOpen(false);
    frame.src = link.dataset.path;
    var url = new URL(window.location.href);
    url.searchParams.set(pageQueryParameter, link.dataset.path);
    window.history.replaceState(null, "", url.href);
  }

  if (!pages.length) {
    frame.hidden = true;
    emptyState.hidden = false;
    return;
  }

  pages.forEach(function (page, index) {
    var link = document.createElement("a");
    link.className = "page-link";
    link.href = shellUrl(page.path);
    link.dataset.path = page.path;
    link.textContent = page.title || page.path;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      selectPage(link);
    });
    list.appendChild(link);

    if (page.path === requestedPagePath() || (!requestedPagePath() && index === 0)) {
      selectPage(link);
    }
  });

  window.addEventListener("popstate", function () {
    var path = requestedPagePath();
    var link = Array.from(document.querySelectorAll(".page-link")).find(function (item) {
      return item.dataset.path === path;
    });
    if (link) selectPage(link);
  });
}());
