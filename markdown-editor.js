(function () {
  "use strict";

  var input = document.getElementById("markdownInput");
  var preview = document.getElementById("markdownPreview");
  var file = document.getElementById("markdownFile");
  var status = document.getElementById("markdownStatus");

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function inlineMarkdown(value) {
    var text = escapeHtml(value);
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    text = text.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, "<strong>$1$2</strong>");
    text = text.replace(/(^|[^*])\*([^*]+)\*(?!\*)|(^|[^_])_([^_]+)_(?!_)/g, "$1$2$3$4<em>$2$4</em>");
    return text;
  }

  function renderMarkdown(markdown) {
    var lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    var html = [];
    var paragraph = [];
    var listType = "";
    var code = null;

    function flushParagraph() {
      if (paragraph.length) {
        html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
        paragraph = [];
      }
    }

    function closeList() {
      if (listType) {
        html.push("</" + listType + ">");
        listType = "";
      }
    }

    lines.forEach(function (line) {
      if (line.indexOf("```") === 0) {
        flushParagraph();
        closeList();
        if (code === null) {
          code = [];
        } else {
          html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
          code = null;
        }
        return;
      }
      if (code !== null) {
        code.push(line);
        return;
      }

      var heading = line.match(/^(#{1,6})\s+(.+)$/);
      var unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      var ordered = line.match(/^\s*\d+\.\s+(.+)$/);
      var quote = line.match(/^\s*>\s?(.*)$/);

      if (!line.trim()) {
        flushParagraph();
        closeList();
      } else if (heading) {
        flushParagraph();
        closeList();
        var level = heading[1].length;
        html.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
      } else if (unordered || ordered) {
        flushParagraph();
        var nextType = unordered ? "ul" : "ol";
        if (listType !== nextType) {
          closeList();
          listType = nextType;
          html.push("<" + listType + ">");
        }
        html.push("<li>" + inlineMarkdown((unordered || ordered)[1]) + "</li>");
      } else if (quote) {
        flushParagraph();
        closeList();
        html.push("<blockquote>" + inlineMarkdown(quote[1]) + "</blockquote>");
      } else {
        closeList();
        paragraph.push(line.trim());
      }
    });

    flushParagraph();
    closeList();
    if (code !== null) html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
    return html.join("\n");
  }

  function updatePreview() {
    preview.innerHTML = renderMarkdown(input.value);
  }

  input.addEventListener("input", updatePreview);

  file.addEventListener("change", function () {
    var selected = file.files[0];
    if (!selected) return;
    var reader = new FileReader();
    reader.onload = function () {
      input.value = String(reader.result || "");
      updatePreview();
      status.textContent = "Arquivo carregado: " + selected.name;
    };
    reader.onerror = function () {
      status.textContent = "Não foi possível ler o arquivo Markdown.";
    };
    reader.readAsText(selected);
  });

  document.getElementById("clearMarkdown").addEventListener("click", function () {
    input.value = "";
    file.value = "";
    status.textContent = "";
    updatePreview();
  });

  document.getElementById("downloadHtml").addEventListener("click", function () {
    var documentHtml = [
      "<!doctype html>",
      '<html lang="pt-BR">',
      "<head>",
      '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      "  <title>Documento renderizado</title>",
      "  <style>",
      "    body { max-width: 860px; margin: 40px auto; padding: 0 20px; color: #111; font: 16px/1.6 Arial, sans-serif; }",
      "    pre { overflow: auto; padding: 14px; background: #eee; white-space: pre-wrap; }",
      "    code { padding: 2px 4px; background: #eee; }",
      "    blockquote { margin: 16px 0; padding-left: 14px; border-left: 3px solid #999; color: #555; }",
      "  </style>",
      "</head>",
      "<body>" + preview.innerHTML + "</body>",
      "</html>"
    ].join("\n");
    var url = URL.createObjectURL(new Blob([documentHtml], { type: "text/html;charset=utf-8" }));
    var link = document.createElement("a");
    link.href = url;
    link.download = "documento-renderizado.html";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
      link.remove();
    }, 1000);
    status.textContent = "Renderização baixada como HTML.";
  });

  updatePreview();
}());
