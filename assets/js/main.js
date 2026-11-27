/* =========================================================
   ABATIRO — comportamento do site
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var DATA = window.ABATIRO_DATA || { coletivos: [], atos: [] };
  var FOTOS = window.ABATIRO_FOTOS || {};

  /* ---------- utilidades ---------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  var ICONS = {
    arrow: '<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="3" fill="currentColor"/><rect x="5" y="9" width="14" height="9" rx="1.5" fill="#F7F1E6"/><rect x="7" y="2.5" width="2.4" height="5" rx="1" fill="currentColor"/><rect x="14.6" y="2.5" width="2.4" height="5" rx="1" fill="currentColor"/></svg>',
    group: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="8" r="4" fill="currentColor"/><circle cx="17" cy="8" r="4" fill="currentColor"/><circle cx="12" cy="17" r="4" fill="currentColor"/></svg>',
    tag: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="3" fill="currentColor"/><circle cx="13" cy="10" r="3" fill="currentColor"/><circle cx="8" cy="17" r="3" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/></svg>',
    cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" fill="currentColor"/><rect x="5" y="10" width="14" height="9" rx="1.5" fill="#590909"/><rect x="7" y="2.5" width="2.4" height="5" rx="1" fill="currentColor"/><rect x="14.6" y="2.5" width="2.4" height="5" rx="1" fill="currentColor"/></svg>'
  };
  window.ABATIRO_ICONS = ICONS;

  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var MES3 = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  var DIA3 = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

  function parseDate(a) {
    var p = a.data.split("-").map(Number), h = (a.hora || "00:00").split(":").map(Number);
    return new Date(p[0], p[1] - 1, p[2], h[0], h[1]);
  }
  function horaTxt(h) { var p = h.split(":"); return Number(p[0]) + "h" + (p[1] !== "00" ? p[1] : ""); }
  function today0() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function isPast(a) { var d = parseDate(a); d.setHours(0, 0, 0, 0); return d < today0(); }
  function daysUntil(a) { var d = parseDate(a); d.setHours(0, 0, 0, 0); return Math.round((d - today0()) / 86400000); }
  function faltam(a) {
    var n = daysUntil(a);
    if (n < 0) return "Realizado";
    if (n === 0) return "É hoje";
    if (n === 1) return "É amanhã";
    return "Faltam " + n + " dias";
  }
  function coletivoById(id) { return DATA.coletivos.filter(function (c) { return c.id === id; })[0]; }
  function atoById(id) { return DATA.atos.filter(function (a) { return a.id === id; })[0]; }
  function upcoming() { return DATA.atos.filter(function (a) { return !isPast(a); }).sort(function (a, b) { return parseDate(a) - parseDate(b); }); }
  function past() { return DATA.atos.filter(isPast).sort(function (a, b) { return parseDate(b) - parseDate(a); }); }

  /* ---------- toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  function copyText(text, okMsg) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      toast(ok ? okMsg : "Não foi possível copiar. Copie manualmente: " + text);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, fallback);
    } else { fallback(); }
  }

  /* ---------- fotos ---------- */
  function fotoHTML(slot, label, extraClass) {
    var f = FOTOS[slot] || {}, has = !!f.arquivo;
    var img = has ? '<img src="assets/img/' + esc(f.arquivo) + '" alt="' + esc(f.alt || "") + '" loading="lazy" decoding="async"' + (f.pos ? ' style="object-position:' + esc(f.pos) + '"' : "") + ">" : "";
    return '<div class="photo ' + (extraClass || "") + (has ? " has-img" : "") + '" data-foto="' + esc(slot) + '"' + (has ? "" : ' role="img" aria-label="' + esc(f.alt || label || "Espaço para foto") + '"') + ">" + img + '<span class="ph-label" aria-hidden="true">' + esc(label || "Foto") + "</span></div>";
  }
  function applyPhotos(root) {
    $$(".photo[data-foto]", root).forEach(function (el) {
      if (el.classList.contains("has-img")) return;
      var f = FOTOS[el.getAttribute("data-foto")];
      if (!f || !f.arquivo) return;
      var img = new Image();
      img.alt = f.alt || ""; img.loading = el.hasAttribute("data-eager") ? "eager" : "lazy"; img.decoding = "async";
      if (f.pos) img.style.objectPosition = f.pos;
      img.onerror = function () { el.classList.remove("has-img"); if (img.parentNode) img.parentNode.removeChild(img); };
      img.src = "assets/img/" + f.arquivo;
      el.insertBefore(img, el.firstChild);
      el.classList.add("has-img");
      el.removeAttribute("role"); el.removeAttribute("aria-label");
    });
  }

  /* ---------- decorações dos cards ---------- */
  var CARD_DECOS = [
    '<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M30 150 C 20 70, 90 20, 150 40 S 200 120, 170 150" fill="none" stroke="#E87324" stroke-width="22" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M40 160 C 40 90, 100 60, 160 80 C 200 95, 210 140, 200 160 Z" fill="#E87324"/></svg>',
    '<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M10 120 C 60 60, 150 50, 200 110" fill="none" stroke="#590909" stroke-width="12" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 200 160" aria-hidden="true"><g fill="none" stroke="#E87324" stroke-width="4"><path d="M20 160 C 30 80, 120 50, 190 90"/><path d="M38 160 C 48 96, 120 70, 190 106"/><path d="M56 160 C 66 112, 120 90, 190 122"/></g></svg>'
  ];
  var TAG_COLOR = { vinho: "tag-laranja", verde: "tag-laranja", laranja: "tag-laranja", creme: "tag-laranja", vermelho: "tag-laranja" };

  function cardHTML(c, i) {
    return '<a class="card c-' + esc(c.cor) + ' reveal" href="coletivo.html?id=' + encodeURIComponent(c.id) + '">' +
      '<div class="card-top">' + fotoHTML(c.foto, "Foto do coletivo") +
      '<div class="card-deco deco">' + CARD_DECOS[i % CARD_DECOS.length] + "</div>" +
      '<div class="card-tags"><span class="tag ' + TAG_COLOR[c.cor] + '">' + esc(c.causa) + "</span>" +
      (c.demo ? '<span class="tag tag-vinho">Demonstração</span>' : "") + "</div></div>" +
      '<div class="card-body"><h3>' + esc(c.nome) + "</h3>" +
      "<p>" + (c.demo ? "[Exemplo fictício] " : "") + esc(c.resumo) + "</p>" +
      '<div class="meta">' + ICONS.pin + "<span>" + esc(c.local) + "</span></div>" +
      '<span class="more">Conhecer mais ' + ICONS.arrow + "</span></div></a>";
  }

  function eventHTML(a) {
    var d = parseDate(a), p = isPast(a), col = coletivoById(a.coletivo);
    return '<article class="event' + (p ? " past" : "") + ' reveal">' +
      '<div class="date" aria-hidden="true"><span class="d">' + d.getDate() + '</span><span class="m">' + MES3[d.getMonth()] + '</span><span class="w">' + DIA3[d.getDay()] + "</span></div>" +
      '<div class="info"><div class="tags">' +
      (p ? '<span class="tag tag-outline">Realizado</span>' : '<span class="tag tag-laranja">Próximo</span>') +
      '<span class="tag tag-vinho">' + esc(a.causa) + "</span>" +
      (a.demo ? '<span class="tag tag-plain">Demonstração</span>' : "") + "</div>" +
      '<h3><a href="ato.html?id=' + encodeURIComponent(a.id) + '" style="text-decoration:none">' + esc(a.titulo) + "</a></h3>" +
      "<p>" + (a.demo ? "[Exemplo fictício] " : "") + esc(a.resumo) + "</p>" +
      '<div class="ev-meta"><span class="sr-only">Data: ' + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear() + ".</span>" +
      "<span>" + ICONS.clock + horaTxt(a.hora) + "</span>" +
      "<span>" + ICONS.pin + esc(a.local) + "</span>" +
      (col ? "<span>" + ICONS.group + esc(col.nome) + "</span>" : "") + "</div></div>" +
      '<div class="actions"><a class="btn btn-vinho btn-sm" href="ato.html?id=' + encodeURIComponent(a.id) + '" aria-label="Ver detalhes: ' + esc(a.titulo) + '">Ver detalhes ' + ICONS.arrow + "</a></div></article>";
  }

  /* ---------- menu mobile ---------- */
  function initMenu() {
    var btn = $(".menu-toggle"), nav = $("#main-nav");
    if (!btn || !nav) return;
    function close() { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = $("a", nav); if (first) first.focus(); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { close(); btn.focus(); } });
    document.addEventListener("click", function (e) { if (nav.classList.contains("open") && !nav.contains(e.target) && !btn.contains(e.target)) close(); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) close(); });
  }

  /* ---------- revelação ao rolar ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }) : null;
  function observeReveal(root) {
    $$(".reveal:not(.in)", root).forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  }

  /* ---------- filtros genéricos ---------- */
  function buildChips(container, items, allLabel, onChange) {
    var counts = {};
    items.forEach(function (i) { counts[i.causa] = (counts[i.causa] || 0) + 1; });
    var causas = Object.keys(counts).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); });
    var html = '<button type="button" class="chip" data-causa="" aria-pressed="true">' + allLabel + ' <span class="count">' + items.length + "</span></button>";
    causas.forEach(function (c) { html += '<button type="button" class="chip" data-causa="' + esc(c) + '" aria-pressed="false">' + esc(c) + ' <span class="count">' + counts[c] + "</span></button>"; });
    container.innerHTML = html;
    container.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", container).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      onChange(b.getAttribute("data-causa"));
    });
  }
  function setChip(container, causa) {
    var found = false;
    $$(".chip", container).forEach(function (x) { var on = x.getAttribute("data-causa") === causa; if (on) found = true; x.setAttribute("aria-pressed", on ? "true" : "false"); });
    if (!found) { var all = $('.chip[data-causa=""]', container); if (all) all.setAttribute("aria-pressed", "true"); return ""; }
    return causa;
  }
  function updateURL(params) {
    var u = new URL(location.href);
    Object.keys(params).forEach(function (k) { if (params[k]) u.searchParams.set(k, params[k]); else u.searchParams.delete(k); });
    history.replaceState(null, "", u.pathname + u.search + u.hash);
  }

  /* ---------- PÁGINA: início ---------- */
  function initHome() {
    var cards = $("#home-coletivos");
    if (cards) { cards.innerHTML = DATA.coletivos.slice(0, 3).map(cardHTML).join(""); }
    var ev = $("#home-atos");
    if (ev) {
      var list = upcoming().slice(0, 3);
      if (list.length < 3) list = list.concat(past().slice(0, 3 - list.length));
      ev.innerHTML = list.length ? list.map(eventHTML).join("") : '<p class="empty">Nenhum ato cadastrado no momento.</p>';
    }
  }

  /* ---------- PÁGINA: coletivos ---------- */
  function initColetivos() {
    var grid = $("#lista-coletivos"); if (!grid) return;
    var chips = $("#chips-coletivos"), input = $("#busca-coletivos"), count = $("#count-coletivos"), form = $("#form-busca-coletivos");
    var state = { q: param("q") || "", causa: param("causa") || "" };
    $("#stat-coletivos").textContent = DATA.coletivos.length;
    var areas = {}; DATA.coletivos.forEach(function (c) { areas[c.causa] = 1; });
    $("#stat-areas").textContent = Object.keys(areas).length;

    function render() {
      var q = norm(state.q);
      var list = DATA.coletivos.filter(function (c) {
        if (state.causa && c.causa !== state.causa) return false;
        if (!q) return true;
        return norm([c.nome, c.causa, c.resumo, c.local].join(" ")).indexOf(q) > -1;
      });
      count.textContent = list.length + (list.length === 1 ? " coletivo encontrado" : " coletivos encontrados");
      grid.innerHTML = list.length ? list.map(cardHTML).join("") :
        '<div class="empty" style="grid-column:1/-1">Nenhum coletivo encontrado para essa busca.<br><button type="button" class="btn btn-vinho btn-sm" id="limpar-coletivos">Limpar filtros</button></div>';
      var clr = $("#limpar-coletivos");
      if (clr) clr.addEventListener("click", function () { state.q = ""; state.causa = ""; input.value = ""; setChip(chips, ""); render(); updateURL({ q: "", causa: "" }); input.focus(); });
      applyPhotos(grid); observeReveal(grid);
    }
    buildChips(chips, DATA.coletivos, "Todos", function (c) { state.causa = c; render(); updateURL({ causa: c }); });
    state.causa = setChip(chips, state.causa);
    input.value = state.q;
    input.addEventListener("input", function () { state.q = input.value; render(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); state.q = input.value; render(); updateURL({ q: state.q }); grid.scrollIntoView({ behavior: "smooth", block: "start" }); });
    render();
  }

  /* ---------- PÁGINA: atos ---------- */
  function initAtos() {
    var listEl = $("#lista-atos"); if (!listEl) return;
    var chips = $("#chips-atos"), input = $("#busca-atos"), count = $("#count-atos"), form = $("#form-busca-atos"), tabs = $$("#tabs-atos .tab");
    var state = { q: param("q") || "", causa: param("causa") || "", aba: param("aba") || "proximos" };
    var up = upcoming(), pa = past();
    $("#stat-proximos").textContent = up.length;
    $("#stat-realizados").textContent = pa.length;

    // destaque
    var fe = $("#destaque-ato"), next = up[0];
    if (fe && next) {
      var d = parseDate(next), col = coletivoById(next.coletivo);
      fe.innerHTML =
        '<div class="deco" style="right:-6%;top:-10%;width:46%;height:120%;"><svg viewBox="0 0 300 400" aria-hidden="true"><path d="M260 0 C 80 60, 60 300, 220 400" fill="none" stroke="#761816" stroke-width="60" stroke-linecap="round"/></svg></div>' +
        '<div class="big-date" aria-hidden="true"><span class="d">' + d.getDate() + '</span><span class="m">' + MES3[d.getMonth()].toUpperCase() + '</span><span class="w">' + DIA3[d.getDay()].toUpperCase() + " · " + horaTxt(next.hora).toUpperCase() + "</span></div>" +
        '<div style="position:relative"><div class="tags"><span class="tag tag-laranja">Próximo ato</span><span class="tag tag-plain">' + faltam(next) + "</span>" + (next.demo ? '<span class="tag tag-plain">Demonstração</span>' : "") + "</div>" +
        "<h2>" + esc(next.titulo) + "</h2>" +
        '<p class="sr-only">' + DIAS[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()] + ", às " + horaTxt(next.hora) + ".</p>" +
        "<p>" + (next.demo ? "[Exemplo fictício] " : "") + esc(next.resumo) + "</p>" +
        '<ul class="fe-meta"><li>' + ICONS.pin + esc(next.local) + "</li>" + (col ? "<li>" + ICONS.group + esc(col.nome) + "</li>" : "") + "</ul>" +
        '<a class="btn btn-laranja" href="ato.html?id=' + encodeURIComponent(next.id) + '">Ver detalhes do ato ' + ICONS.arrow + "</a></div>";
    } else if (fe) { fe.style.display = "none"; }

    function inTab(a) {
      var p = isPast(a), now = new Date(), d = parseDate(a);
      if (state.aba === "proximos") return !p;
      if (state.aba === "mes") return !p && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (state.aba === "realizados") return p;
      return true;
    }
    function render() {
      var q = norm(state.q);
      var list = DATA.atos.filter(function (a) {
        if (!inTab(a)) return false;
        if (state.causa && a.causa !== state.causa) return false;
        if (!q) return true;
        var col = coletivoById(a.coletivo);
        return norm([a.titulo, a.causa, a.resumo, a.local, a.endereco, col ? col.nome : ""].join(" ")).indexOf(q) > -1;
      });
      var ups = list.filter(function (a) { return !isPast(a); }).sort(function (a, b) { return parseDate(a) - parseDate(b); });
      var pas = list.filter(isPast).sort(function (a, b) { return parseDate(b) - parseDate(a); });
      count.textContent = list.length + (list.length === 1 ? " ato encontrado" : " atos encontrados");
      var html = "", lastKey = "";
      ups.forEach(function (a) {
        var d = parseDate(a), key = d.getFullYear() + "-" + d.getMonth();
        if (key !== lastKey) { html += '<h2 class="month-label">' + MESES[d.getMonth()] + " " + d.getFullYear() + "</h2>"; lastKey = key; }
        html += eventHTML(a);
      });
      if (pas.length) { html += '<h2 class="month-label">Já aconteceu</h2>'; pas.forEach(function (a) { html += eventHTML(a); }); }
      if (!list.length) html = '<div class="empty">Nenhum ato encontrado para esse filtro.<br><button type="button" class="btn btn-vinho btn-sm" id="limpar-atos">Ver todos os atos</button></div>';
      listEl.innerHTML = html;
      var clr = $("#limpar-atos");
      if (clr) clr.addEventListener("click", function () { state.q = ""; state.causa = ""; state.aba = "todos"; input.value = ""; setChip(chips, ""); syncTabs(); render(); updateURL({ q: "", causa: "", aba: "todos" }); });
      observeReveal(listEl);
    }
    function syncTabs() {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-aba") === state.aba;
        t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { state.aba = t.getAttribute("data-aba"); syncTabs(); render(); updateURL({ aba: state.aba === "proximos" ? "" : state.aba }); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); n.focus(); n.click(); }
      });
    });
    if (["proximos", "mes", "realizados", "todos"].indexOf(state.aba) < 0) state.aba = "proximos";
    if (!up.length && !param("aba")) state.aba = "todos";
    syncTabs();
    buildChips(chips, DATA.atos, "Todas as causas", function (c) { state.causa = c; render(); updateURL({ causa: c }); });
    state.causa = setChip(chips, state.causa);
    input.value = state.q;
    input.addEventListener("input", function () { state.q = input.value; render(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); state.q = input.value; render(); updateURL({ q: state.q }); });
    render();
  }

  /* ---------- PÁGINA: detalhe do coletivo ---------- */
  function initColetivo() {
    var root = $("#coletivo-root"); if (!root) return;
    var c = coletivoById(param("id"));
    if (!c) {
      root.innerHTML = '<section class="sec sec-bege sec-pad"><div class="container"><span class="eyebrow">Coletivo não encontrado</span><h1 class="display display-l" style="margin-bottom:24px">Esse coletivo não está aqui.</h1><p class="lead">O endereço pode estar incompleto ou o coletivo pode ter saído do diretório.</p><a class="btn btn-vinho" href="coletivos.html">Ver todos os coletivos ' + ICONS.arrow + "</a></div></section>";
      document.title = "Coletivo não encontrado · Abatirô";
      return;
    }
    document.title = c.nome + " · Coletivos · Abatirô";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", c.nome + " — " + c.resumo);
    var atos = DATA.atos.filter(function (a) { return a.coletivo === c.id; }).sort(function (a, b) { return parseDate(a) - parseDate(b); });
    var outros = DATA.coletivos.filter(function (x) { return x.id !== c.id; });
    var start = DATA.coletivos.indexOf(c) % outros.length;
    var sugestoes = outros.slice(start).concat(outros.slice(0, start)).slice(0, 3);
    var heroBg = { vinho: "sec-vinho", verde: "sec-verde", laranja: "sec-laranja", creme: "sec-creme", vermelho: "sec-vinho" }[c.cor] || "sec-laranja";
    var blobColor = c.cor === "laranja" ? "#590909" : "#E87324";

    root.innerHTML =
      '<section class="detail-hero ' + heroBg + '"><div class="pat ' + (c.cor === "laranja" ? "pat-vinho" : "pat-laranja") + ' pat-fade" style="left:-60px;bottom:-60px;width:420px;height:380px;opacity:' + (c.cor === "laranja" ? ".16" : ".35") + '" aria-hidden="true"></div><div class="container">' +
      '<nav class="breadcrumb" aria-label="Você está em"><ol><li><a href="coletivos.html">Coletivos</a></li><li aria-current="page">' + esc(c.causa) + "</li></ol></nav>" +
      '<div class="detail-grid"><div><div class="tags"><span class="tag ' + (/vinho|verde|vermelho/.test(c.cor) ? "tag-laranja" : "tag-vinho") + '">' + esc(c.causa) + "</span>" + (c.demo ? '<span class="tag tag-plain">Demonstração</span>' : "") + "</div>" +
      "<h1>" + esc(c.nome) + "</h1>" +
      '<p class="lead">' + (c.demo ? "[Exemplo fictício] " : "") + esc(c.resumo) + "</p></div>" +
      '<div class="detail-art">' +
      '<div class="deco float slow" style="inset:0"><svg viewBox="0 0 400 340" aria-hidden="true"><path d="M60 300 C -10 200, 40 40, 170 30 C 260 22, 330 60, 360 120" fill="none" stroke="' + blobColor + '" stroke-width="34" stroke-linecap="round"/><path d="M300 250 C 380 250, 420 300, 400 340" fill="none" stroke="' + blobColor + '" stroke-width="20" stroke-linecap="round"/></svg></div>' +
      fotoHTML(c.foto, "Foto do coletivo", "blob") + "</div></div></div></section>" +

      '<section class="sec sec-bege sec-pad"><div class="container"><div class="detail-body"><div>' +
      '<h2 class="k">Sobre o coletivo</h2><div class="txt">' + (c.demo ? "<p>[Exemplo fictício.]</p>" : "") + "<p>" + esc(c.sobre) + "</p></div>" +
      '<div class="btn-row"><a class="btn btn-vinho" href="coletivos.html">Voltar aos coletivos ' + ICONS.arrow + '</a><button type="button" class="btn btn-laranja tilt-r" data-copy-link>Copiar link</button></div></div>' +
      '<aside class="summary-box" aria-labelledby="como-chegar"><h2 id="como-chegar">Como chegar até eles</h2><dl>' +
      '<div class="row">' + ICONS.pin + "<div><dt>Local de atuação</dt><dd>" + esc(c.local) + "</dd></div></div>" +
      '<div class="row">' + ICONS.tag + "<div><dt>Área de atuação</dt><dd>" + esc(c.causa) + "</dd></div></div>" +
      (c.contato ? '<div class="row">' + ICONS.group + "<div><dt>Contato</dt><dd>" + (/^https?:/.test(c.contato) ? '<a href="' + esc(c.contato) + '" target="_blank" rel="noopener">' + esc(c.contato) + "</a>" : esc(c.contato)) + "</dd></div></div>" : "") +
      "</dl>" + (c.contato ? "" : '<p class="note">Este coletivo ainda não informou contatos.</p>') + "</aside></div>" +
      (atos.length ? '<div style="margin-top:64px"><h2 class="display display-s" style="margin-bottom:24px">Atos deste coletivo</h2><div class="event-list">' + atos.map(eventHTML).join("") + "</div></div>" : "") +
      "</div></section>" +

      '<section class="sec sec-creme sec-pad"><div class="container"><span class="eyebrow">Continue explorando</span><h2 class="display display-m" style="margin-bottom:44px">Outros coletivos</h2><div class="cards">' + sugestoes.map(cardHTML).join("") + "</div></div></section>";
  }

  /* ---------- PÁGINA: detalhe do ato ---------- */
  function icsDate(d) {
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "T" + p(d.getHours()) + p(d.getMinutes()) + "00";
  }
  function icsEscape(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function downloadICS(a) {
    var start = parseDate(a), end = new Date(start.getTime() + 2 * 3600000);
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Abatiro//Agenda//PT-BR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE", "TZID:America/Sao_Paulo", "BEGIN:STANDARD", "DTSTART:19700101T000000", "TZOFFSETFROM:-0300", "TZOFFSETTO:-0300", "TZNAME:-03", "END:STANDARD", "END:VTIMEZONE",
      "BEGIN:VEVENT",
      "UID:" + a.id + "@abatiro",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""),
      "DTSTART;TZID=America/Sao_Paulo:" + icsDate(start),
      "DTEND;TZID=America/Sao_Paulo:" + icsDate(end),
      "SUMMARY:" + icsEscape(a.titulo),
      "DESCRIPTION:" + icsEscape((a.demo ? "[Exemplo fictício] " : "") + a.resumo + "\n" + location.href),
      "LOCATION:" + icsEscape(a.local + " — " + a.endereco),
      "URL:" + location.href,
      "END:VEVENT", "END:VCALENDAR"
    ];
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = slug(a.titulo) + ".ics"; document.body.appendChild(link); link.click();
    setTimeout(function () { URL.revokeObjectURL(url); document.body.removeChild(link); }, 500);
    toast("Arquivo de calendário baixado. Abra-o para salvar o ato na sua agenda.");
  }
  function initAto() {
    var root = $("#ato-root"); if (!root) return;
    var a = atoById(param("id"));
    if (!a) {
      root.innerHTML = '<section class="sec sec-bege sec-pad"><div class="container"><span class="eyebrow">Ato não encontrado</span><h1 class="display display-l" style="margin-bottom:24px">Esse ato não está na agenda.</h1><p class="lead">O endereço pode estar incompleto ou o ato pode ter sido removido.</p><a class="btn btn-vinho" href="atos.html">Ver a agenda ' + ICONS.arrow + "</a></div></section>";
      document.title = "Ato não encontrado · Abatirô";
      return;
    }
    document.title = a.titulo + " · Atos · Abatirô";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", a.titulo + " — " + a.resumo);
    var d = parseDate(a), col = coletivoById(a.coletivo), p = isPast(a);
    var gmaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a.local + " " + a.endereco);
    root.innerHTML =
      '<section class="detail-hero sec-laranja"><div class="pat pat-vinho pat-fade" style="left:-60px;bottom:-60px;width:440px;height:400px;opacity:.15" aria-hidden="true"></div><div class="container">' +
      '<div class="deco" style="right:-4%;bottom:-6%;width:34%;height:44%"><svg viewBox="0 0 300 200" aria-hidden="true"><path d="M20 200 C 60 60, 200 20, 300 60" fill="none" stroke="#590909" stroke-width="40" stroke-linecap="round"/></svg></div>' +
      '<nav class="breadcrumb" aria-label="Você está em"><ol><li><a href="atos.html">Atos</a></li><li aria-current="page">' + esc(a.causa) + "</li></ol></nav>" +
      '<div class="detail-grid"><div><div class="tags"><span class="tag tag-vinho">' + faltam(a) + '</span><span class="tag tag-plain">' + esc(a.causa) + "</span>" + (a.demo ? '<span class="tag tag-plain">Demonstração</span>' : "") + "</div>" +
      "<h1>" + esc(a.titulo) + "</h1>" +
      '<p class="lead">' + (a.demo ? "[Exemplo fictício] " : "") + esc(a.resumo) + "</p></div>" +
      '<div class="detail-art"><div class="deco float slow" style="inset:0"><svg viewBox="0 0 400 340" aria-hidden="true"><path d="M70 90 C 60 20, 150 10, 160 70" fill="none" stroke="#590909" stroke-width="22" stroke-linecap="round"/><circle cx="345" cy="300" r="12" fill="#590909"/></svg></div>' +
      fotoHTML(a.foto, "Imagem do ato", "blob-2") + "</div></div>" +
      '<div class="info-cards">' +
      '<div class="info-card"><div class="k">Data</div><div class="v">' + d.getDate() + " de " + MESES[d.getMonth()] + '</div><div class="s">' + DIAS[d.getDay()] + ", " + d.getFullYear() + "</div></div>" +
      '<div class="info-card"><div class="k">Horário</div><div class="v">' + horaTxt(a.hora) + '</div><div class="s">Horário de Brasília</div></div>' +
      '<div class="info-card"><div class="k">Local</div><div class="v">' + esc(a.local) + '</div><div class="s">' + esc(a.endereco) + "</div></div>" +
      "</div></div></section>" +

      '<section class="sec sec-bege sec-pad"><div class="container"><div class="detail-body"><div>' +
      '<h2 class="k">Sobre o ato</h2><p class="txt">' + (a.demo ? "[Exemplo fictício] " : "") + esc(a.resumo) + "</p>" +
      '<h2 class="k">Causa ou reivindicação</h2><p class="txt">' + esc(a.reivindicacao) + "</p>" +
      '<div class="btn-row">' + (p ? "" : '<button type="button" class="btn btn-vinho" data-ics>Adicionar ao calendário</button>') +
      '<button type="button" class="btn btn-laranja tilt-r" data-copy-link>Copiar link</button>' +
      '<a class="btn btn-creme" href="atos.html">Voltar à agenda ' + ICONS.arrow + "</a></div></div>" +
      '<aside class="summary-box" aria-labelledby="resumo-ato"><h2 id="resumo-ato">Resumo</h2><dl>' +
      '<div class="row">' + ICONS.cal + "<div><dt>Quando</dt><dd>" + DIAS[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear() + "<br>" + horaTxt(a.hora) + "</dd></div></div>" +
      '<div class="row">' + ICONS.pin + "<div><dt>Onde</dt><dd>" + esc(a.local) + "<br>" + esc(a.endereco) + '<br><a href="' + gmaps + '" target="_blank" rel="noopener">Abrir no mapa ↗</a></dd></div></div>' +
      (col ? '<div class="row">' + ICONS.group + '<div><dt>Organização</dt><dd><a href="coletivo.html?id=' + encodeURIComponent(col.id) + '">' + esc(col.nome) + "</a></dd></div></div>" : "") +
      "</dl></aside></div></div></section>";
    var b = $("[data-ics]", root); if (b) b.addEventListener("click", function () { downloadICS(a); });
  }

  /* ---------- copiar link (todas as páginas) ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy-link]");
    if (b) copyText(location.href, "Link copiado!");
  });

  /* ---------- PÁGINA: manifesto ---------- */
  function initManifesto() {
    var text = $("#mf-text"); if (!text) return;
    var bar = $(".mf-progress");
    var links = $$(".mf-toc a");
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
    var select = $("#mf-select");

    function onScroll() {
      var r = text.getBoundingClientRect(), h = r.height - window.innerHeight * 0.6;
      var pct = Math.max(0, Math.min(1, (-r.top + window.innerHeight * 0.2) / h));
      if (bar) { bar.style.width = (pct * 100).toFixed(1) + "%"; bar.setAttribute("aria-valuenow", Math.round(pct * 100)); }
      var cur = targets[0];
      targets.forEach(function (t) { if (t.getBoundingClientRect().top < window.innerHeight * 0.3) cur = t; });
      links.forEach(function (a) { var on = cur && a.getAttribute("href") === "#" + cur.id; a.classList.toggle("active", on); if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      if (select && cur && select.value !== cur.id && document.activeElement !== select) select.value = cur.id;
    }
    var ticking = false;
    window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; } }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    if (select) select.addEventListener("change", function () {
      var t = document.getElementById(select.value);
      if (t) { t.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", "#" + t.id); }
    });

    // "Eu faço parte porque ___"
    var form = $("#form-frase");
    if (form) {
      var inp = $("#frase-input"), prev = $("#frase-preview");
      function frase() { var v = inp.value.trim().replace(/[.!]+$/, ""); return v ? "\u201cEu faço parte porque " + v + ".\u201d" : ""; }
      function upd() { prev.textContent = frase() || "Sua frase aparece aqui."; }
      inp.addEventListener("input", upd); upd();
      form.addEventListener("submit", function (e) { e.preventDefault(); if (!frase()) { toast("Complete a frase primeiro."); inp.focus(); return; } copyText(frase() + " — Abatirô · Do caos ao coletivo", "Frase copiada! Cole onde quiser compartilhar."); });
      var share = $("#frase-share");
      share.addEventListener("click", function () {
        var t = frase(); if (!t) { toast("Complete a frase primeiro."); inp.focus(); return; }
        var data = { title: "Abatirô · Do caos ao coletivo", text: t, url: location.href.split("#")[0] };
        if (navigator.share) { navigator.share(data).catch(function () {}); }
        else { copyText(t + " " + data.url, "Seu navegador não abre o compartilhamento direto. A frase e o link foram copiados."); }
      });
    }
  }

  /* ---------- início ---------- */
  function boot() {
    initMenu();
    initHome(); initColetivos(); initAtos(); initColetivo(); initAto(); initManifesto();
    applyPhotos(document); observeReveal(document);
    var y = $("#ano"); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
