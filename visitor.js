(function () {
  // Don't intercept the login page itself
  if (window.location.pathname.endsWith('login.html')) return;

  // A callsign is optional. Browsing also works when storage is unavailable.
  var username = null, rank = 'VISITOR';
  try {
    username = localStorage.getItem('xb_username');
    rank = localStorage.getItem('xb_rank') || rank;
  } catch (e) { /* Browser storage is optional. */ }

  // Logged in — inject visitor line beneath .site-meta once DOM is ready
  function inject() {
    var meta = document.querySelector('.site-meta');
    if (!meta) return;
    var terminal = document.createElement('a');
    terminal.href = 'login.html';
    terminal.className = 'btn';
    terminal.textContent = '[ ACCESS STATION TERMINAL ]';
    terminal.style.cssText = 'display:inline-block;margin-top:8px;';
    meta.insertAdjacentElement('afterend', terminal);
    if (!username) return;
    var d = document.createElement('div');
    d.style.cssText =
      'color:#00ff99;font-size:11px;letter-spacing:2px;margin-top:3px;' +
      'font-family:"Share Tech Mono",monospace;';
    d.innerHTML =
      'VISITOR: <span style="color:#ff66ff;">' + esc(rank) + '</span>' +
      ' &nbsp;|&nbsp; ' +
      '<span style="color:#ffff00;">' + esc(username.toUpperCase()) + '</span>';
    meta.insertAdjacentElement('afterend', d);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
