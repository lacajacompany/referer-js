(function () {
  const querySearch = new URLSearchParams(window.location.search);

  [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_channel'
  ].forEach((key) => {
    if (!Cookies.get(key) && querySearch.has(key)) {
      Cookies.set(key, querySearch.get(key), { domain: '.contegy.io', expires: 90 });
    }
  });

  var refererUrl = Cookies.get('referer_url');

  if (!refererUrl || refererUrl === '') {
    var refererUrl = document.referrer;

    if (refererUrl !== '') {
      Cookies.set('referer_url', refererUrl, { domain: '.contegy.io', expires: 90 });
    }
  }
})();
