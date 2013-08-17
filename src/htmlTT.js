/**
*
* Name: htmlTT.js
* Version: 0.1
* Description: html tooltips
* Author: P. Envall (petter.envall@gmail.com, @npup)
* Date: 2013-08-17
*
*/

var htmlTT = (function () {
  var win = this, doc = win.document
    , viewClass = "html-tt"
    , ttDataAttr = "data-htmltt"
    , pause = false;

  var listen = (function () { // le basic abstraction
    return "function" == typeof doc.body.addEventListener ?
      function (elem, name, handler) {elem.addEventListener(name, handler, false);} :
      function (elem, name, handler) {elem.attachEvent("on"+name, handler);};
  })();

  function init() {
    if (init.done) {return;}

    listen(doc.body, "mouseover", function (e) {
      if (pause) {return;}
      var elem = e.target || e.srcElement
        , data = elem.getAttribute(ttDataAttr), parts;
      if (!data || !(parts=/^(.+)#(.+)$/.exec(data))) {return;}
      var ttGroup = parts[1], srcId = parts[2]
        , tt = tts[ttGroup], src;
      if (!tt || !srcId || srcId==tt.currentSrcId) {return;}
      src = doc.getElementById(srcId);
      if (!src) {return;}
      show(tt, elem, src, srcId);
    });

    listen(doc.body, "mouseout", function (e) {
      var rel = e.relatedTarget;
      hideAll(500, rel);
    });

    listen(doc, "keyup", function (e) {
      if (27!==e.keyCode) {return;}
      pause = true;
      hideAll();
      setTimeout(function () {pause = false;}, 200);
    });

    function hideAll(delay, rel) {
      for (var ttGroup in tts) {
        var tt = tts[ttGroup];
        if (!tt.currentSrcId || (rel && tt.view==rel || tt.view.contains(rel))) {continue;}
        hide(tt, delay || 0);
      }
    }

    init.done = true;
  }
  init.done = false;

  var tts = {};

  function HtmlTT(ttGroup, options) {
    var tt = this, view;
    if (ttGroup in tts) {return;}
    tt.group = ttGroup;
    tts[ttGroup] = tt;
    tt.currentSrcId = null;
    if (options.view) {
      if ("string" == typeof options.view) {view = doc.getElementById(options.view);}
      else if (1 === options.view.nodeType) {view = options.view;}
    }
    if (!view) {
      view = doc.createElement("div");
      view.className = viewClass;
      view.style.position = "absolute";
      view.style.zIndex = "1";
      view.style.display = "none";
      doc.body.appendChild(view);
    }
    "string" == typeof options["class"] && (view.className += " " + options["class"]);
    tt.pos = {"x": 0, "y": 0};
    if ("pos" in options) {
      if ("[object Object]" == {}.toString.call(options.pos)) {
        "x" in options.pos && (tt.pos.x = options.pos.x);
        "y" in options.pos && (tt.pos.y = options.pos.y);
      }
      else {tt.pos = false;}
    }
    tt.view = view;
    init();
  }

  function show(tt, elem, src, srcId) {
    tt._timeout && (tt._timeout = clearTimeout(tt._timeout));
    tt.currentSrcId = srcId;
    tt.view.innerHTML = src.innerHTML;
    tt.pos && positionViewFor(tt, elem);
    tt.view.style.display = "";
  }
  function hide(tt, delay) {
    tt.currentSrcId = null;
    tt._timeout = setTimeout(function () {tt.view.style.display = "none";}, delay);
  }

  function positionViewFor(tt, elem) {
    var rect = elem.getBoundingClientRect()
      , pos = {
      "top": Math.floor(rect.top)
      , "left":  Math.floor(rect.left)
    };
    var pageOffsets = getPageOffsets();
    tt.view.style.top = tt.pos.y + pageOffsets.y + pos.top+"px";
    tt.view.style.left = tt.pos.x + pageOffsets.x + pos.left+"px";
  }

  function getPageOffsets() {
    var x = win.pageXOffset, y = win.pageYOffset, t;
    if (void 0 === x) {
      x = (((t = doc.documentElement) || (t = doc.body.parentNode)) && typeof t.ScrollLeft == "number" ? t : doc.body).ScrollLeft;
    }
    if (void 0 === y) {
      y = (((t = doc.documentElement) || (t = doc.body.parentNode)) && typeof t.ScrollTop == "number" ? t : doc.body).ScrollTop;
    }
    return {"x": x, "y": y};
  }

  return {
    "create": function (ttGroup, options) {
      return void new HtmlTT(ttGroup, options || {});
    }
  };
})();
