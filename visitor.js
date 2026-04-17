(function () {
  // Don't intercept the login page itself
  if (window.location.pathname.endsWith('login.html')) return;

  var username = localStorage.getItem('xb_username');
  var rank     = localStorage.getItem('xb_rank');

  // Not logged in — redirect immediately (runs in <head>, before page renders)
  if (!username) {
    window.location.replace('login.html');
    return;
  }

  // Logged in — inject visitor line beneath .site-meta once DOM is ready
  function inject() {
    var meta = document.querySelector('.site-meta');
    if (!meta) return;
    var d = document.createElement('div');
    d.style.cssText =
      'color:#00ff99;font-size:11px;letter-spacing:2px;margin-top:3px;' +
      'font-family:"Share Tech Mono",monospace;';
    d.innerHTML =
      'VISITOR: <span style="color:#ff66ff;">' + rank + '</span>' +
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
