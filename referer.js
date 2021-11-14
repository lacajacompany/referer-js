(function () {
  function ready(callbackFunction) {
    if (document.readyState !== 'loading') {
      callbackFunction()
    } else {
      document.addEventListener("DOMContentLoaded", callbackFunction)
    }
  }

  ready(event => {
    function setCookie(name, value, days) {
      var expires = "";

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }

      document.cookie = name + "=" + (value || "") + expires + "; path=/;domain=contery.com";
    }

    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }

      return null;
    }

    var queryParams = new URLSearchParams(window.location.search);

    var utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_channel'
    ];

    // Store utm query params in cookies
    utmKeys.forEach(key => {
      if (!getCookie(key) && queryParams.has(key)) {
        setCookie(key, queryParams.get(key), 90);
      }
    });

    if (!getCookie('referer_url')) {
      var referer_url = document.referrer;

      if (!referer_url) {
        return
      }

      if (window.location && referer_url.indexOf(window.location) !== -1) {
        return
      }

      setCookie('referer_url', referer_url, 90);
    }
  })
})()
