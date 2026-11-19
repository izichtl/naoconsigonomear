(function () {
  "use strict";

  var storageKey = "openrouter-response-history-v1";

  function load() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function save(item) {
    var saved = load();
    var record = {
      id: item.id || (Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9)),
      type: item.type === "imagem" ? "imagem" : "texto",
      source: item.source || "openrouter",
      prompt: String(item.prompt || "").trim(),
      content: item.content == null ? "" : String(item.content),
      model: String(item.model || "").trim(),
      savedAt: item.savedAt || new Date().toISOString()
    };
    saved.unshift(record);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
      return record;
    } catch (error) {
      while (saved.length > 1) {
        saved.pop();
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(saved));
          return record;
        } catch (retryError) {
          // Continue removing older responses until the current record fits.
        }
      }
      if (record.type === "imagem") {
        record.content = "";
        record.imageError = "Imagem grande demais para o armazenamento local.";
        try {
          window.localStorage.setItem(storageKey, JSON.stringify([record]));
        } catch (finalError) {
          return record;
        }
      }
      return record;
    }
  }

  function remove(id) {
    var saved = load().filter(function (item) {
      return item.id !== id;
    });
    window.localStorage.setItem(storageKey, JSON.stringify(saved));
  }

  function clear() {
    window.localStorage.removeItem(storageKey);
  }

  function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || "");
    var weekDays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    return weekDays[date.getDay()] + ", " + day + "/" + month + "/" + year + " às " + hours + ":" + minutes;
  }

  function preview(value, length) {
    var text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) return "(sem texto)";
    var limit = length || 100;
    return text.length > limit ? text.slice(0, limit) + "…" : text;
  }

  window.OpenRouterHistory = {
    key: storageKey,
    load: load,
    save: save,
    remove: remove,
    clear: clear,
    formatDate: formatDate,
    preview: preview
  };
}());
