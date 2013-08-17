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
    , pause = false, register = {};

  var listen = (function () { // le basic abstraction
    return "function" == typeof doc.body.addEventListener ?
      function (elem, name, handler) {elem.addEventListener(name, handler, false);} :
      function (elem, name, handler) {elem.attachEvent("on"+name, handler);};
  })();

  function init() {
    listen(doc.body, "mouseover", function (e) {
      if (pause) {return;}
      var elem = e.target || e.srcElement
        , data = elem.getAttribute(ttDataAttr), parts;
      if (!data || !(parts=/^(.+)#(.+)$/.exec(data))) {return;}
      var ttGroup = parts[1], srcId = parts[2]
        , tt = register[ttGroup], src;
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
      for (var ttGroup in register) {
        var tt = register[ttGroup];
        if (!tt.currentSrcId || (rel && tt.view==rel || tt.view.contains(rel))) {continue;}
        hide(tt, delay || 0);
      }
    }
   init = null;
  }

  function HtmlTT(ttGroup, options) {
    var tt = this, view;
    if (ttGroup in register) {return;}
    tt.group = ttGroup;
    register[ttGroup] = tt;
    tt.currentSrcId = null;
    tt.pos = {"x": 0, "y": 0};
    tt.customView = false;
    var extraClass = "string" == typeof options["class"] ? options["class"] : "";
    if (options.view) {
      if ("string" == typeof options.view) {view = doc.getElementById(options.view);}
      else if (1 === options.view.nodeType) {view = options.view;}
    }
    if (!view) {
      view = doc.createElement("div");
      view.className = viewClass;
      extraClass || (view.style.position = "absolute");
      view.style.display = "none";
      doc.body.appendChild(view);
    }
    else {
      view.style.visibility = "hidden";
      tt.customView = true;
    }
    if (tt.customView || ("pos" in options && !options.pos)) {
      tt.pos = false;
    }
    else if (tt.pos && "[object Object]" == {}.toString.call(options.pos)) {
      "x" in options.pos && (tt.pos.x = options.pos.x);
      "y" in options.pos && (tt.pos.y = options.pos.y);
    }
    extraClass && (view.className += " " + extraClass);
    tt.view = view;
    init && init();
  }

  function show(tt, elem, src, srcId) {
    tt._timeout && (tt._timeout = clearTimeout(tt._timeout));
    tt.currentSrcId = srcId;
    tt.view.innerHTML = src.innerHTML;
    tt.pos && positionViewFor(tt, elem);
    tt.customView ? tt.view.style.visibility = "visible" : tt.view.style.display = "";
  }
  function hide(tt, delay) {
    tt.currentSrcId = null;
    tt._timeout = setTimeout(function () {
      tt.customView ? tt.view.style.visibility = "hidden" : tt.view.style.display = "none";
    }, delay);
  }

  function positionViewFor(tt, elem) {
    var rect = elem.getBoundingClientRect()
      , pos = {
      "top": Math.floor(rect.top)
      , "left":  Math.floor(rect.left)
    };
    var offsets = getPageOffsets();
    tt.view.style.top = tt.pos.y + offsets.y + pos.top+"px";
    tt.view.style.left = tt.pos.x + offsets.x + pos.left+"px";
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
