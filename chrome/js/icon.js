!(function(c) {
  var l,
    a,
    h,
    t,
    v,
    i,
    o =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="63 164 256 256" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" preserveAspectRatio="none"  version="1.2"><g clip-path="url(#prefix__b)">< g clip-path="url(#prefix__c)" ><g clip-path="url(#prefix__d)"><path style="fill-opactity:0"d="M65.285 166.246c.414-.27 3.313-2.14 3.313-2.14s34.851 19.378 37.304 23.132c1.293 1.98-18.836 7.512-18.836 7.512s-8.59 12.676-13.582 17.297c-1.101 1.02-3.59 2.476-4.015 2.387-4.43-.942-7.922-45.774-4.184-48.188zm0 0"fill="#69be28" /></g></g ></g ><g clip-path="url(#prefix__e)"><g clip-path="url(#prefix__f)"><g clip-path="url(#prefix__g)"><path style="fill-opactity:0"d="M95.719 226.305c5.11 1.617 12.547-6.364 13.523-8.743.977-2.375-18.031-26.406-18.031-26.406l-13.52 8.739c-.004 0 12.922 24.789 18.028 26.41zm0 0"fill="#69be28" /></g></g></g><g clip-path="url(#prefix__h)"><g clip-path="url(#prefix__i)"><g clip-path="url(#prefix__j)"><path style="fill-opactity:0"d="M68.598 164.105c3.734-2.417 40.215 18.891 42.972 23.114 1.465 2.242-24.504 7.531-24.504 7.531s-12.207 17.98-14.285 17.543c-4.43-.941-7.922-45.773-4.183-48.188zm0 0"fill="#4289c1" /></g></g></g><g clip-path="url(#prefix__k)"><g clip-path="url(#prefix__l)"><g clip-path="url(#prefix__m)"><path style="fill-opactity:0"d="M98.945 224.023c5.274 1.88 12.602-6.27 13.52-8.738.918-2.469-19.711-28.976-19.711-28.976l-13.52 8.738s14.434 27.101 19.711 28.976zm0 0"fill="#4289c1" /></g></g></g></svg >',
    s = (s = document.getElementsByTagName('script'))[s.length - 1].getAttribute('data-injectcss');
  if (s && !c.__iconfont__svg__cssinject__) {
    c.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (c) {
      console && console.log(c);
    }
  }
  function m() {
    v || ((v = !0), h());
  }
  (l = function() {
    var c, l, a;
    ((a = document.createElement('div')).innerHTML = o),
      (o = null),
      (l = a.getElementsByTagName('svg')[0]) &&
        (l.setAttribute('aria-hidden', 'true'),
        (l.style.position = 'absolute'),
        (l.style.width = 0),
        (l.style.height = 0),
        (l.style.overflow = 'hidden'),
        (c = l),
        (a = document.body).firstChild
          ? (l = a.firstChild).parentNode.insertBefore(c, l)
          : a.appendChild(c));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(l, 0)
        : ((a = function() {
            document.removeEventListener('DOMContentLoaded', a, !1), l();
          }),
          document.addEventListener('DOMContentLoaded', a, !1))
      : document.attachEvent &&
        ((h = l),
        (t = c.document),
        (v = !1),
        (i = function() {
          try {
            t.documentElement.doScroll('left');
          } catch (c) {
            return void setTimeout(i, 50);
          }
          m();
        })(),
        (t.onreadystatechange = function() {
          'complete' == t.readyState && ((t.onreadystatechange = null), m());
        }));
})(window);
