(function () {
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  function wireForm(id, noteId, mailAddress, subjectText) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        lines.push(key + ": " + value);
      });
      var body = encodeURIComponent(lines.join("\n"));
      var subject = encodeURIComponent(subjectText || "Anche Casa × Sicura S.r.l. — richiesta");
      if (mailAddress) {
        window.location.href = "mailto:" + mailAddress + "?subject=" + subject + "&body=" + body;
      }
      var note = document.getElementById(noteId);
      if (note) note.style.display = "block";
    });
  }

  wireForm(
    "quote-form",
    "quote-ok",
    "sicura@anchecasa.it",
    "Anche Casa — richiesta offerta rapida / urgenza"
  );
  wireForm(
    "contact-form",
    "contact-ok",
    "rete@anchecasa.it",
    "Anche Casa × Sicura S.r.l. — richiesta"
  );

  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "back-top";
  topBtn.setAttribute("aria-label", "Torna su");
  topBtn.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(topBtn);

  function syncTopBtn() {
    topBtn.classList.toggle("show", window.scrollY > 420);
  }
  window.addEventListener("scroll", syncTopBtn, { passive: true });
  syncTopBtn();

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
