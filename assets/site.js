(function () {
  /* CONGELATO 23.09.2026. Apertura dall'alto.
     Ogni pagina di Sicura parte da scroll 0, anche con un hash in mezzo.
     Il clic, il tasto o la rotella sulla pagina già aperta sbloccano lo scorrimento.
     Non togliere arrivo, inCima, libera. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  var aperto = true;
  function inCima() {
    if (aperto && window.scrollY !== 0) window.scrollTo(0, 0);
  }
  function libera() { aperto = false; }
  window.addEventListener("scroll", inCima, { passive: true });
  window.addEventListener("pointerdown", libera, { capture: true });
  window.addEventListener("keydown", libera);
  window.addEventListener("wheel", libera, { passive: true });
  function arrivo() {
    aperto = true;
    inCima();
  }
  arrivo();
  window.addEventListener("pageshow", arrivo);

  var pagina = (location.pathname.split("/").pop() || "index.html").split("?")[0];
  if (!pagina) pagina = "index.html";
  if (pagina === "servizi.html") pagina = "corsi.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("?")[0];
    a.classList.toggle("active", href === pagina);
  });

  var locale = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  if (locale) {
    document.querySelectorAll('a[aria-label="AncheCasa, vai al sito"]').forEach(function (a) {
      a.href = "http://127.0.0.1:4688/sito/index.html";
    });
  }

  var navBar = document.querySelector(".site-header .nav");
  var burger = document.getElementById("burger");
  if (navBar && burger && !document.getElementById("profilo-btn")) {
    var base = locale ? "http://127.0.0.1:4688" : "https://sito-preview.vercel.app";
    var profilo = document.createElement("div");
    profilo.className = "profilo";
    profilo.innerHTML =
      '<button class="profilo-btn" id="profilo-btn" type="button" aria-label="Profilo" aria-expanded="false" aria-controls="profilo-menu">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">' +
      '<circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M5.5 19.2c1.2-3.2 3.5-4.7 6.5-4.7s5.3 1.5 6.5 4.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      "</svg></button>" +
      '<div class="profilo-menu" id="profilo-menu" hidden>' +
      '<a href="' + base + '/index.html">Accedi</a>' +
      '<a href="' + base + '/sito/iscriviti.html">Iscriviti</a>' +
      "</div>";
    navBar.insertBefore(profilo, burger);
    var profiloBtn = document.getElementById("profilo-btn");
    var profiloMenu = document.getElementById("profilo-menu");
    profiloBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = profiloMenu.hidden;
      profiloMenu.hidden = !open;
      profiloBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function () {
      profiloMenu.hidden = true;
      profiloBtn.setAttribute("aria-expanded", "false");
    });
    profiloMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

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
    "rete@anchecasa.it",
    "Anche Casa — richiesta offerta rapida / urgenza"
  );
  wireForm(
    "contact-form",
    "contact-ok",
    "rete@anchecasa.it",
    "Sicura — richiesta offerta"
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

  /* CONGELATO 23.09.2026. Footer Sicura: una fascia.
     Logo AncheCasa, «Una piazza sola per tutti» su una riga a 11px,
     Privacy Note legali Cookie Gestione verso AncheCasa, copyright.
     Pagine: Home, Chi siamo, Corsi, Settori. Contatti: solo «Scrivi a Sicura».
     Niente mail, niente indirizzo, niente seconda fascia. */
  var footMount = document.getElementById("ac-footer");
  if (footMount) {
    var root = (locale ? "http://127.0.0.1:4688" : "https://sito-preview.vercel.app") + "/sito/";
    function voce(href, label) {
      return '<a href="' + root + href + '">' + label + "</a>";
    }
    footMount.outerHTML =
      '<footer class="ac-foot"><div class="wrap"><div class="ac-foot-grid">' +
      '<div class="ac-foot-brand"><a class="ac-foot-logo" href="' + root + 'index.html" aria-label="AncheCasa, vai alla home">' +
      '<img src="assets/anchecasa-orizzontale.png?v=1" alt="AncheCasa"></a>' +
      '<p class="ac-foot-claim">Una piazza sola <span>per tutti</span></p>' +
      '<nav class="ac-foot-legal" aria-label="Informazioni legali">' +
      voce("privacy.html", "Privacy") +
      voce("note-legali.html", "Note legali") +
      voce("cookie.html", "Cookie") +
      voce("gestione.html", "Gestione") +
      "</nav>" +
      '<p class="ac-foot-copy">AncheCasa. Tutti i diritti riservati.</p></div>' +
      "<div><h4>Pagine</h4>" +
      '<a href="index.html">Home</a>' +
      '<a href="chi-siamo.html">Chi siamo</a>' +
      '<a href="corsi.html">Corsi</a>' +
      '<a href="progetti.html">Settori</a>' +
      "</div><div><h4>Contatti</h4>" +
      '<a href="contatti.html">Scrivi a Sicura</a>' +
      "</div></div></div></footer>";
  }
})();
