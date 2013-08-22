/**
*
* Name: htmlTT.js
* Version: 0.2
* Description: html tooltips
* Author: P. Envall (petter.envall@gmail.com, @npup)
* Date: 2013-08-17
*
*/

var htmlTT = (function () {
  var win = this, doc = win.document
    , viewClass = "html-tt"
    , ttDataAttr = "data-htmltt"
    , ttGroupAttr = ttDataAttr+"-group"
    , ttSrcAttr = ttDataAttr+"-src"
    , ttActiveAttr = ttDataAttr+"-active"
    , pause = false, register = {}
    , hoverName = "hover"
    , focusName = "focus"
    , strategies = {
      "mouseover": hoverName
      , "mouseout": hoverName
      , "focusin": focusName
      , "focusout": focusName
      , "focus": focusName
      , "blur": focusName
    };

  var listen = (function () { // le basic abstraction
    return "function" == typeof doc.body.addEventListener ?
      function (elem, name, handler, capture) {elem.addEventListener(name, handler, !!capture);} :
      function (elem, name, handler) {elem.attachEvent("on"+name, handler);};
  })();

  var supportsFocusin = (function () {
    var result = false, a = doc.createElement("a");
    a.href= "#";
    listen(a, "focusin", function () {result = true;});
    doc.body.appendChild(a);
    a.focus();
    doc.body.removeChild(a);
    return result;
  })();

  function isObj(o) {return "[object Object]" == {}.toString.call(o);}

  function init() {
    listen(doc.body, "mouseover", activate);
    listen(doc.body, "mouseout", inactivate);
    if (supportsFocusin) {
      listen(doc.body, "focusin", activate);
      listen(doc.body, "focusout", inactivate);
    }
    else {
      listen(doc.body, "focus", activate, true);
      listen(doc.body, "blur", inactivate, true);
    }
    listen(doc, "keyup", function (e) {
      if (27!==e.keyCode) {return;}
      pause = true;
      hideAll();
      setTimeout(function () {pause = false;}, 200);
    });
    function getGroupAndSrcId(elem) {
      var data = elem.getAttribute(ttDataAttr), parts;
      if (!data || !(parts=/^(.+)#(.+)$/.exec(data))) {return;}
      return {
        "group": parts[1]
        , "srcId": parts[2]
      };
    }
    function activate(e) {
      if (pause) {return;}
      var elem = e.target || e.srcElement
        , data = getGroupAndSrcId(elem);
      if (!data) {return;}
      var tt = register[data.group], src, strategy = strategies[e.type];
      if (!tt || !data.srcId || data.srcId==tt.currentSrcId) {return;}
      if (!tt.modes[strategy]) {return;}
      src = doc.getElementById(data.srcId);
      if (!src) {return;}
      show(tt, elem, src, data.srcId);
    }

    function inactivate(e) {
      var data = getGroupAndSrcId(e.target || e.srcElement);
      hideAll(strategies[e.type], 500, e.relatedTarget, data && data.group);
    }

    function hideAll(strategy, delay, rel, group) {
      var someStrategy = arguments.length > 0;
      for (var ttGroup in register) {
        if (group && ttGroup!=group) {continue;}
        var tt = register[ttGroup];
        if (!tt.currentSrcId || (someStrategy && !tt.modes[strategy]) || (rel && (tt.view==rel || tt.view.contains(rel)))) {continue;}
        hide(tt, delay || 0);
      }
    }
   init = null;
  }

  function HtmlTT(ttGroup, options) {
    var tt = this, view;
    if (ttGroup in register) {return;}
    tt.modes = {
      "hover": true
      , "focus": true
    };
    "hover" in options && (tt.modes.hover = !!options.hover);
    "focus" in options && (tt.modes.focus = !!options.focus);

    if (!(tt.modes.hover || tt.modes.focus)) {return;}
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
    else if (tt.pos && isObj(options.pos)) {
      "x" in options.pos && (tt.pos.x = options.pos.x);
      "y" in options.pos && (tt.pos.y = options.pos.y);
    }
    extraClass && (view.className += " " + extraClass);
    tt.view = view;
    init && init();
  }

  function show(tt, elem, src, srcId) {
    tt._timeout && (tt._timeout = clearTimeout(tt._timeout));
    clearData(tt);
    tt.currentSrcId = srcId;
    tt.view.innerHTML = src.innerHTML;
    tt.pos && positionViewFor(tt, elem);
    tt.view.setAttribute(ttGroupAttr, tt.group);
    tt.view.setAttribute(ttSrcAttr, tt.currentSrcId);
    elem.setAttribute(ttActiveAttr, tt.group);
    tt.currentElem = elem;
    tt.customView ? tt.view.style.visibility = "visible" : tt.view.style.display = "";
  }
  function hide(tt, delay) {
    tt.currentSrcId = null;
    tt._timeout = setTimeout(function () {
      tt.customView ? tt.view.style.visibility = "hidden" : tt.view.style.display = "none";
      clearData(tt);
    }, delay);
  }

  function clearData(tt) {
    if (!tt.currentElem) {return;}
    tt.view.removeAttribute(ttGroupAttr);
    tt.view.removeAttribute(ttSrcAttr);
    tt.currentElem.removeAttribute(ttActiveAttr);
    delete tt.currentElem;
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

  var getPageOffsets = (function () {
    var tmp, t;
    if ("undefined" != typeof win.pageXOffset) {
      return function () {return {"x": win.pageXOffset, "y": win.pageYOffset};};
    }
    else {
      t = (tmp = doc.documentElement || doc.body.parentNode) && "number" == typeof tmp.scrollLeft ? tmp : doc.body;
      return function () {return {"x": t.scrollLeft, "y": t.scrollTop};};
    }
  })();

  return {
    "create": function (ttGroup, options) {
      return void new HtmlTT(ttGroup, options || {});
    }
  };
})();
