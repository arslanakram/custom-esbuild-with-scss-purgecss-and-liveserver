(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@popperjs/core/dist/cjs/popper.js
  var require_popper = __commonJS({
    "node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getWindow(node) {
        if (node == null) {
          return window;
        }
        if (node.toString() !== "[object Window]") {
          var ownerDocument = node.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
      }
      function isElement(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
      }
      function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
      }
      function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") {
          return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
      }
      var max = Math.max;
      var min = Math.min;
      var round = Math.round;
      function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
          includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
          var offsetHeight = element.offsetHeight;
          var offsetWidth = element.offsetWidth;
          if (offsetWidth > 0) {
            scaleX = round(rect.width) / offsetWidth || 1;
          }
          if (offsetHeight > 0) {
            scaleY = round(rect.height) / offsetHeight || 1;
          }
        }
        return {
          width: rect.width / scaleX,
          height: rect.height / scaleY,
          top: rect.top / scaleY,
          right: rect.right / scaleX,
          bottom: rect.bottom / scaleY,
          left: rect.left / scaleX,
          x: rect.left / scaleX,
          y: rect.top / scaleY
        };
      }
      function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
          scrollLeft,
          scrollTop
        };
      }
      function getHTMLElementScroll(element) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        };
      }
      function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
          return getWindowScroll(node);
        } else {
          return getHTMLElementScroll(node);
        }
      }
      function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
      }
      function getDocumentElement(element) {
        return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
      }
      function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
      }
      function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
      }
      function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
      }
      function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
      }
      function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
          isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
          scrollLeft: 0,
          scrollTop: 0
        };
        var offsets = {
          x: 0,
          y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
          if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
          }
          if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
          } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
          }
        }
        return {
          x: rect.left + scroll.scrollLeft - offsets.x,
          y: rect.top + scroll.scrollTop - offsets.y,
          width: rect.width,
          height: rect.height
        };
      }
      function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
          width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
          height = clientRect.height;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width,
          height
        };
      }
      function getParentNode(element) {
        if (getNodeName(element) === "html") {
          return element;
        }
        return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
      }
      function getScrollParent(node) {
        if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
          return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
          return node;
        }
        return getScrollParent(getParentNode(node));
      }
      function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
          list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
      }
      function isTableElement(element) {
        return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
      }
      function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
          return null;
        }
        return element.offsetParent;
      }
      function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
          var elementCss = getComputedStyle2(element);
          if (elementCss.position === "fixed") {
            return null;
          }
        }
        var currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
          var css = getComputedStyle2(currentNode);
          if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }
        return null;
      }
      function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
          offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
          return window2;
        }
        return offsetParent || getContainingBlock(element) || window2;
      }
      var top = "top";
      var bottom = "bottom";
      var right = "right";
      var left = "left";
      var auto = "auto";
      var basePlacements = [top, bottom, right, left];
      var start = "start";
      var end = "end";
      var clippingParents = "clippingParents";
      var viewport = "viewport";
      var popper = "popper";
      var reference = "reference";
      var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([placement + "-" + start, placement + "-" + end]);
      }, []);
      var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
        return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
      }, []);
      var beforeRead = "beforeRead";
      var read = "read";
      var afterRead = "afterRead";
      var beforeMain = "beforeMain";
      var main = "main";
      var afterMain = "afterMain";
      var beforeWrite = "beforeWrite";
      var write = "write";
      var afterWrite = "afterWrite";
      var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
      function order(modifiers) {
        var map = /* @__PURE__ */ new Map();
        var visited = /* @__PURE__ */ new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
          map.set(modifier.name, modifier);
        });
        function sort(modifier) {
          visited.add(modifier.name);
          var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
          requires.forEach(function(dep) {
            if (!visited.has(dep)) {
              var depModifier = map.get(dep);
              if (depModifier) {
                sort(depModifier);
              }
            }
          });
          result.push(modifier);
        }
        modifiers.forEach(function(modifier) {
          if (!visited.has(modifier.name)) {
            sort(modifier);
          }
        });
        return result;
      }
      function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
          return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
          }));
        }, []);
      }
      function debounce(fn) {
        var pending;
        return function() {
          if (!pending) {
            pending = new Promise(function(resolve) {
              Promise.resolve().then(function() {
                pending = void 0;
                resolve(fn());
              });
            });
          }
          return pending;
        };
      }
      function format(str) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return [].concat(args).reduce(function(p, c) {
          return p.replace(/%s/, c);
        }, str);
      }
      var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
      var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
      var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
          [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
            return self2.indexOf(value) === index;
          }).forEach(function(key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                }
                break;
              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                }
                break;
              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                }
                break;
              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "effect":
                if (modifier.effect != null && typeof modifier.effect !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "requires":
                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                }
                break;
              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                }
                break;
              case "options":
              case "data":
                break;
              default:
                console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                  return '"' + s + '"';
                }).join(", ") + '; but "' + key + '" was provided.');
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
              if (modifiers.find(function(mod) {
                return mod.name === requirement;
              }) == null) {
                console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
              }
            });
          });
        });
      }
      function uniqueBy(arr, fn) {
        var identifiers = /* @__PURE__ */ new Set();
        return arr.filter(function(item) {
          var identifier = fn(item);
          if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
          }
        });
      }
      function getBasePlacement(placement) {
        return placement.split("-")[0];
      }
      function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
          var existing = merged2[current.name];
          merged2[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
          }) : current;
          return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
          return merged[key];
        });
      }
      function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
          width = visualViewport.width;
          height = visualViewport.height;
          if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
          }
        }
        return {
          width,
          height,
          x: x + getWindowScrollBarX(element),
          y
        };
      }
      function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle2(body || html).direction === "rtl") {
          x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
          width,
          height,
          x,
          y
        };
      }
      function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) {
          return true;
        } else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            }
            next = next.parentNode || next.host;
          } while (next);
        }
        return false;
      }
      function rectToClientRect(rect) {
        return Object.assign({}, rect, {
          left: rect.x,
          top: rect.y,
          right: rect.x + rect.width,
          bottom: rect.y + rect.height
        });
      }
      function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
      }
      function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
      }
      function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement(clipperElement)) {
          return [];
        }
        return clippingParents2.filter(function(clippingParent) {
          return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body" && (canEscapeClipping ? getComputedStyle2(clippingParent).position !== "static" : true);
        });
      }
      function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
          var rect = getClientRectFromMixedType(element, clippingParent);
          accRect.top = max(rect.top, accRect.top);
          accRect.right = min(rect.right, accRect.right);
          accRect.bottom = min(rect.bottom, accRect.bottom);
          accRect.left = max(rect.left, accRect.left);
          return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
      }
      function getVariation(placement) {
        return placement.split("-")[1];
      }
      function getMainAxisFromPlacement(placement) {
        return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
      }
      function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case top:
            offsets = {
              x: commonX,
              y: reference2.y - element.height
            };
            break;
          case bottom:
            offsets = {
              x: commonX,
              y: reference2.y + reference2.height
            };
            break;
          case right:
            offsets = {
              x: reference2.x + reference2.width,
              y: commonY
            };
            break;
          case left:
            offsets = {
              x: reference2.x - element.width,
              y: commonY
            };
            break;
          default:
            offsets = {
              x: reference2.x,
              y: reference2.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
          var len = mainAxis === "y" ? "height" : "width";
          switch (variation) {
            case start:
              offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
              break;
            case end:
              offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
              break;
          }
        }
        return offsets;
      }
      function getFreshSideObject() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
      }
      function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
          hashMap[key] = value;
          return hashMap;
        }, {});
      }
      function detectOverflow(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets2 = computeOffsets({
          reference: referenceClientRect,
          element: popperRect,
          strategy: "absolute",
          placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
          top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
          bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
          left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
          right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
          var offset2 = offsetData[placement];
          Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
            overflowOffsets[key] += offset2[axis] * multiply;
          });
        }
        return overflowOffsets;
      }
      var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
      var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
      var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };
      function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return !args.some(function(element) {
          return !(element && typeof element.getBoundingClientRect === "function");
        });
      }
      function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
          generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper2(reference2, popper2, options) {
          if (options === void 0) {
            options = defaultOptions;
          }
          var state = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
              reference: reference2,
              popper: popper2
            },
            attributes: {},
            styles: {}
          };
          var effectCleanupFns = [];
          var isDestroyed = false;
          var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
              var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
              cleanupModifierEffects();
              state.options = Object.assign({}, defaultOptions, state.options, options2);
              state.scrollParents = {
                reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                popper: listScrollParents(popper2)
              };
              var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
              state.orderedModifiers = orderedModifiers.filter(function(m) {
                return m.enabled;
              });
              if (true) {
                var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                  var name = _ref.name;
                  return name;
                });
                validateModifiers(modifiers);
                if (getBasePlacement(state.options.placement) === auto) {
                  var flipModifier = state.orderedModifiers.find(function(_ref2) {
                    var name = _ref2.name;
                    return name === "flip";
                  });
                  if (!flipModifier) {
                    console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
                  }
                }
                var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                  return parseFloat(margin);
                })) {
                  console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
                }
              }
              runModifierEffects();
              return instance.update();
            },
            forceUpdate: function forceUpdate() {
              if (isDestroyed) {
                return;
              }
              var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
              if (!areValidElements(reference3, popper3)) {
                if (true) {
                  console.error(INVALID_ELEMENT_ERROR);
                }
                return;
              }
              state.rects = {
                reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                popper: getLayoutRect(popper3)
              };
              state.reset = false;
              state.placement = state.options.placement;
              state.orderedModifiers.forEach(function(modifier) {
                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
              });
              var __debug_loops__ = 0;
              for (var index = 0; index < state.orderedModifiers.length; index++) {
                if (true) {
                  __debug_loops__ += 1;
                  if (__debug_loops__ > 100) {
                    console.error(INFINITE_LOOP_ERROR);
                    break;
                  }
                }
                if (state.reset === true) {
                  state.reset = false;
                  index = -1;
                  continue;
                }
                var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                if (typeof fn === "function") {
                  state = fn({
                    state,
                    options: _options,
                    name,
                    instance
                  }) || state;
                }
              }
            },
            update: debounce(function() {
              return new Promise(function(resolve) {
                instance.forceUpdate();
                resolve(state);
              });
            }),
            destroy: function destroy() {
              cleanupModifierEffects();
              isDestroyed = true;
            }
          };
          if (!areValidElements(reference2, popper2)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return instance;
          }
          instance.setOptions(options).then(function(state2) {
            if (!isDestroyed && options.onFirstUpdate) {
              options.onFirstUpdate(state2);
            }
          });
          function runModifierEffects() {
            state.orderedModifiers.forEach(function(_ref3) {
              var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
              if (typeof effect2 === "function") {
                var cleanupFn = effect2({
                  state,
                  name,
                  instance,
                  options: options2
                });
                var noopFn = function noopFn2() {
                };
                effectCleanupFns.push(cleanupFn || noopFn);
              }
            });
          }
          function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
              return fn();
            });
            effectCleanupFns = [];
          }
          return instance;
        };
      }
      var passive = {
        passive: true
      };
      function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.addEventListener("resize", instance.update, passive);
        }
        return function() {
          if (scroll) {
            scrollParents.forEach(function(scrollParent) {
              scrollParent.removeEventListener("scroll", instance.update, passive);
            });
          }
          if (resize) {
            window2.removeEventListener("resize", instance.update, passive);
          }
        };
      }
      var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {
        },
        effect: effect$2,
        data: {}
      };
      function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
          reference: state.rects.reference,
          element: state.rects.popper,
          strategy: "absolute",
          placement: state.placement
        });
      }
      var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
      };
      var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
          x: round(x * dpr) / dpr || 0,
          y: round(y * dpr) / dpr || 0
        };
      }
      function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
          var offsetParent = getOffsetParent(popper2);
          var heightProp = "clientHeight";
          var widthProp = "clientWidth";
          if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
              heightProp = "scrollHeight";
              widthProp = "scrollWidth";
            }
          }
          offsetParent = offsetParent;
          if (placement === top || (placement === left || placement === right) && variation === end) {
            sideY = bottom;
            var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
          }
          if (placement === left || (placement === top || placement === bottom) && variation === end) {
            sideX = right;
            var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
          }
        }
        var commonStyles = Object.assign({
          position
        }, adaptive && unsetSides);
        if (gpuAcceleration) {
          var _Object$assign;
          return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
      }
      function computeStyles(_ref4) {
        var state = _ref4.state, options = _ref4.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        if (true) {
          var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
          if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
          })) {
            console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
          }
        }
        var commonStyles = {
          placement: getBasePlacement(state.placement),
          variation: getVariation(state.placement),
          popper: state.elements.popper,
          popperRect: state.rects.popper,
          gpuAcceleration,
          isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) {
          state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
          })));
        }
        if (state.modifiersData.arrow != null) {
          state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
          })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-placement": state.placement
        });
      }
      var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
      };
      function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
          var style = state.styles[name] || {};
          var attributes = state.attributes[name] || {};
          var element = state.elements[name];
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(name2) {
            var value = attributes[name2];
            if (value === false) {
              element.removeAttribute(name2);
            } else {
              element.setAttribute(name2, value === true ? "" : value);
            }
          });
        });
      }
      function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
          popper: {
            position: state.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
          Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function() {
          Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            var style = styleProperties.reduce(function(style2, property) {
              style2[property] = "";
              return style2;
            }, {});
            if (!isHTMLElement(element) || !getNodeName(element)) {
              return;
            }
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(attribute) {
              element.removeAttribute(attribute);
            });
          });
        };
      }
      var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: ["computeStyles"]
      };
      function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
          placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
          x: distance,
          y: skidding
        } : {
          x: skidding,
          y: distance
        };
      }
      function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function(acc, placement) {
          acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
          return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
          state.modifiersData.popperOffsets.x += x;
          state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
      }
      var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: ["popperOffsets"],
        fn: offset
      };
      var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
          return hash$1[matched];
        });
      }
      var hash = {
        start: "end",
        end: "start"
      };
      function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
          return hash[matched];
        });
      }
      function computeAutoPlacement(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
          return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
          return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
          allowedPlacements = placements$1;
          if (true) {
            console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
          }
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
          acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding
          })[getBasePlacement(placement2)];
          return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
          return overflows[a] - overflows[b];
        });
      }
      function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
          return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
      }
      function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
          return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
          return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
          }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = /* @__PURE__ */ new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for (var i = 0; i < placements2.length; i++) {
          var placement = placements2[i];
          var _basePlacement = getBasePlacement(placement);
          var isStartVariation = getVariation(placement) === start;
          var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
          var len = isVertical ? "width" : "height";
          var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
          });
          var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
          if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
          }
          var altVariationSide = getOppositePlacement(mainVariationSide);
          var checks = [];
          if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
          }
          if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
          }
          if (checks.every(function(check) {
            return check;
          })) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
          }
          checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
          var numberOfChecks = flipVariations ? 3 : 1;
          var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function(placement2) {
              var checks2 = checksMap.get(placement2);
              if (checks2) {
                return checks2.slice(0, _i2).every(function(check) {
                  return check;
                });
              }
            });
            if (fittingPlacement) {
              firstFittingPlacement = fittingPlacement;
              return "break";
            }
          };
          for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === "break")
              break;
          }
        }
        if (state.placement !== firstFittingPlacement) {
          state.modifiersData[name]._skip = true;
          state.placement = firstFittingPlacement;
          state.reset = true;
        }
      }
      var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: ["offset"],
        data: {
          _skip: false
        }
      };
      function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
      }
      function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
      }
      function withinMaxClamp(min2, value, max2) {
        var v = within(min2, value, max2);
        return v > max2 ? max2 : v;
      }
      function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
          boundary,
          rootBoundary,
          padding,
          altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
          placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue
        } : Object.assign({
          mainAxis: 0,
          altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
          x: 0,
          y: 0
        };
        if (!popperOffsets2) {
          return;
        }
        if (checkMainAxis) {
          var _offsetModifierState$;
          var mainSide = mainAxis === "y" ? top : left;
          var altSide = mainAxis === "y" ? bottom : right;
          var len = mainAxis === "y" ? "height" : "width";
          var offset2 = popperOffsets2[mainAxis];
          var min$1 = offset2 + overflow[mainSide];
          var max$1 = offset2 - overflow[altSide];
          var additive = tether ? -popperRect[len] / 2 : 0;
          var minLen = variation === start ? referenceRect[len] : popperRect[len];
          var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
          var arrowElement = state.elements.arrow;
          var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
            width: 0,
            height: 0
          };
          var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
          var arrowPaddingMin = arrowPaddingObject[mainSide];
          var arrowPaddingMax = arrowPaddingObject[altSide];
          var arrowLen = within(0, referenceRect[len], arrowRect[len]);
          var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
          var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
          var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
          var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
          var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
          var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
          var tetherMax = offset2 + maxOffset - offsetModifierValue;
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets2[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset2;
        }
        if (checkAltAxis) {
          var _offsetModifierState$2;
          var _mainSide = mainAxis === "x" ? top : left;
          var _altSide = mainAxis === "x" ? bottom : right;
          var _offset = popperOffsets2[altAxis];
          var _len = altAxis === "y" ? "height" : "width";
          var _min = _offset + overflow[_mainSide];
          var _max = _offset - overflow[_altSide];
          var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
          var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
          var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
          var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
          var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
          popperOffsets2[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
      }
      var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: ["offset"]
      };
      var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
          placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      };
      function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) {
          return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
      }
      function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) {
          return;
        }
        if (typeof arrowElement === "string") {
          arrowElement = state.elements.popper.querySelector(arrowElement);
          if (!arrowElement) {
            return;
          }
        }
        if (true) {
          if (!isHTMLElement(arrowElement)) {
            console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
          }
        }
        if (!contains(state.elements.popper, arrowElement)) {
          if (true) {
            console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
          }
          return;
        }
        state.elements.arrow = arrowElement;
      }
      var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };
      function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
          preventedOffsets = {
            x: 0,
            y: 0
          };
        }
        return {
          top: overflow.top - rect.height - preventedOffsets.y,
          right: overflow.right - rect.width + preventedOffsets.x,
          bottom: overflow.bottom - rect.height + preventedOffsets.y,
          left: overflow.left - rect.width - preventedOffsets.x
        };
      }
      function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function(side) {
          return overflow[side] >= 0;
        });
      }
      function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
          elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
          altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
          referenceClippingOffsets,
          popperEscapeOffsets,
          isReferenceHidden,
          hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-reference-hidden": isReferenceHidden,
          "data-popper-escaped": hasPopperEscaped
        });
      }
      var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: hide
      };
      var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
      var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
      });
      var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
      var createPopper = /* @__PURE__ */ popperGenerator({
        defaultModifiers
      });
      exports.applyStyles = applyStyles$1;
      exports.arrow = arrow$1;
      exports.computeStyles = computeStyles$1;
      exports.createPopper = createPopper;
      exports.createPopperLite = createPopper$1;
      exports.defaultModifiers = defaultModifiers;
      exports.detectOverflow = detectOverflow;
      exports.eventListeners = eventListeners;
      exports.flip = flip$1;
      exports.hide = hide$1;
      exports.offset = offset$1;
      exports.popperGenerator = popperGenerator;
      exports.popperOffsets = popperOffsets$1;
      exports.preventOverflow = preventOverflow$1;
    }
  });

  // node_modules/bootstrap/dist/js/bootstrap.js
  var require_bootstrap = __commonJS({
    "node_modules/bootstrap/dist/js/bootstrap.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper()) : typeof define === "function" && define.amd ? define(["@popperjs/core"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.bootstrap = factory(global.Popper));
      })(exports, function(Popper) {
        "use strict";
        function _interopNamespace(e) {
          if (e && e.__esModule)
            return e;
          const n = Object.create(null);
          if (e) {
            for (const k in e) {
              if (k !== "default") {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                  enumerable: true,
                  get: () => e[k]
                });
              }
            }
          }
          n.default = e;
          return Object.freeze(n);
        }
        const Popper__namespace = /* @__PURE__ */ _interopNamespace(Popper);
        const MAX_UID = 1e6;
        const MILLISECONDS_MULTIPLIER = 1e3;
        const TRANSITION_END = "transitionend";
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getUID = (prefix) => {
          do {
            prefix += Math.floor(Math.random() * MAX_UID);
          } while (document.getElementById(prefix));
          return prefix;
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getSelectorFromElement = (element) => {
          const selector = getSelector(element);
          if (selector) {
            return document.querySelector(selector) ? selector : null;
          }
          return null;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const getTransitionDurationFromElement = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const findShadowRoot = (element) => {
          if (!document.documentElement.attachShadow) {
            return null;
          }
          if (typeof element.getRootNode === "function") {
            const root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
          }
          if (element instanceof ShadowRoot) {
            return element;
          }
          if (!element.parentNode) {
            return null;
          }
          return findShadowRoot(element.parentNode);
        };
        const noop = () => {
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const execute = (callback) => {
          if (typeof callback === "function") {
            callback();
          }
        };
        const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
          };
          transitionElement.addEventListener(TRANSITION_END, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd(transitionElement);
            }
          }, emulatedDuration);
        };
        const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
          let index = list.indexOf(activeElement);
          if (index === -1) {
            return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
          }
          const listLength = list.length;
          index += shouldGetNext ? 1 : -1;
          if (isCycleAllowed) {
            index = (index + listLength) % listLength;
          }
          return list[Math.max(0, Math.min(index, listLength - 1))];
        };
        const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
        const stripNameRegex = /\..*/;
        const stripUidRegex = /::\d+$/;
        const eventRegistry = {};
        let uidEvent = 1;
        const customEvents = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        };
        const customEventsRegex = /^(mouseenter|mouseleave)/i;
        const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function getUidEvent(element, uid) {
          return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
        }
        function getEvent(element) {
          const uid = getUidEvent(element);
          element.uidEvent = uid;
          eventRegistry[uid] = eventRegistry[uid] || {};
          return eventRegistry[uid];
        }
        function bootstrapHandler(element, fn) {
          return function handler(event) {
            event.delegateTarget = element;
            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
          };
        }
        function bootstrapDelegationHandler(element, selector, fn) {
          return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for (let {
              target
            } = event; target && target !== this; target = target.parentNode) {
              for (let i = domElements.length; i--; ) {
                if (domElements[i] === target) {
                  event.delegateTarget = target;
                  if (handler.oneOff) {
                    EventHandler.off(element, event.type, selector, fn);
                  }
                  return fn.apply(target, [event]);
                }
              }
            }
            return null;
          };
        }
        function findHandler(events, handler, delegationSelector = null) {
          const uidEventList = Object.keys(events);
          for (let i = 0, len = uidEventList.length; i < len; i++) {
            const event = events[uidEventList[i]];
            if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
              return event;
            }
          }
          return null;
        }
        function normalizeParams(originalTypeEvent, handler, delegationFn) {
          const delegation = typeof handler === "string";
          const originalHandler = delegation ? delegationFn : handler;
          let typeEvent = getTypeEvent(originalTypeEvent);
          const isNative = nativeEvents.has(typeEvent);
          if (!isNative) {
            typeEvent = originalTypeEvent;
          }
          return [delegation, originalHandler, typeEvent];
        }
        function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          if (!handler) {
            handler = delegationFn;
            delegationFn = null;
          }
          if (customEventsRegex.test(originalTypeEvent)) {
            const wrapFn = (fn2) => {
              return function(event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                  return fn2.call(this, event);
                }
              };
            };
            if (delegationFn) {
              delegationFn = wrapFn(delegationFn);
            } else {
              handler = wrapFn(handler);
            }
          }
          const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
          const events = getEvent(element);
          const handlers = events[typeEvent] || (events[typeEvent] = {});
          const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
          if (previousFn) {
            previousFn.oneOff = previousFn.oneOff && oneOff;
            return;
          }
          const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
          const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
          fn.delegationSelector = delegation ? handler : null;
          fn.originalHandler = originalHandler;
          fn.oneOff = oneOff;
          fn.uidEvent = uid;
          handlers[uid] = fn;
          element.addEventListener(typeEvent, fn, delegation);
        }
        function removeHandler(element, events, typeEvent, handler, delegationSelector) {
          const fn = findHandler(events[typeEvent], handler, delegationSelector);
          if (!fn) {
            return;
          }
          element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
          delete events[typeEvent][fn.uidEvent];
        }
        function removeNamespacedHandlers(element, events, typeEvent, namespace) {
          const storeElementEvent = events[typeEvent] || {};
          Object.keys(storeElementEvent).forEach((handlerKey) => {
            if (handlerKey.includes(namespace)) {
              const event = storeElementEvent[handlerKey];
              removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
          });
        }
        function getTypeEvent(event) {
          event = event.replace(stripNameRegex, "");
          return customEvents[event] || event;
        }
        const EventHandler = {
          on(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, false);
          },
          one(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, true);
          },
          off(element, originalTypeEvent, handler, delegationFn) {
            if (typeof originalTypeEvent !== "string" || !element) {
              return;
            }
            const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getEvent(element);
            const isNamespace = originalTypeEvent.startsWith(".");
            if (typeof originalHandler !== "undefined") {
              if (!events || !events[typeEvent]) {
                return;
              }
              removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
              return;
            }
            if (isNamespace) {
              Object.keys(events).forEach((elementEvent) => {
                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
              });
            }
            const storeElementEvent = events[typeEvent] || {};
            Object.keys(storeElementEvent).forEach((keyHandlers) => {
              const handlerKey = keyHandlers.replace(stripUidRegex, "");
              if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                const event = storeElementEvent[keyHandlers];
                removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
              }
            });
          },
          trigger(element, event, args) {
            if (typeof event !== "string" || !element) {
              return null;
            }
            const $ = getjQuery();
            const typeEvent = getTypeEvent(event);
            const inNamespace = event !== typeEvent;
            const isNative = nativeEvents.has(typeEvent);
            let jQueryEvent;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            let evt = null;
            if (inNamespace && $) {
              jQueryEvent = $.Event(event, args);
              $(element).trigger(jQueryEvent);
              bubbles = !jQueryEvent.isPropagationStopped();
              nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
              defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            if (isNative) {
              evt = document.createEvent("HTMLEvents");
              evt.initEvent(typeEvent, bubbles, true);
            } else {
              evt = new CustomEvent(event, {
                bubbles,
                cancelable: true
              });
            }
            if (typeof args !== "undefined") {
              Object.keys(args).forEach((key) => {
                Object.defineProperty(evt, key, {
                  get() {
                    return args[key];
                  }
                });
              });
            }
            if (defaultPrevented) {
              evt.preventDefault();
            }
            if (nativeDispatch) {
              element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
              jQueryEvent.preventDefault();
            }
            return evt;
          }
        };
        const elementMap = /* @__PURE__ */ new Map();
        const Data = {
          set(element, key, instance) {
            if (!elementMap.has(element)) {
              elementMap.set(element, /* @__PURE__ */ new Map());
            }
            const instanceMap = elementMap.get(element);
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
              console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
              return;
            }
            instanceMap.set(key, instance);
          },
          get(element, key) {
            if (elementMap.has(element)) {
              return elementMap.get(element).get(key) || null;
            }
            return null;
          },
          remove(element, key) {
            if (!elementMap.has(element)) {
              return;
            }
            const instanceMap = elementMap.get(element);
            instanceMap.delete(key);
            if (instanceMap.size === 0) {
              elementMap.delete(element);
            }
          }
        };
        const VERSION = "5.1.3";
        class BaseComponent {
          constructor(element) {
            element = getElement(element);
            if (!element) {
              return;
            }
            this._element = element;
            Data.set(this._element, this.constructor.DATA_KEY, this);
          }
          dispose() {
            Data.remove(this._element, this.constructor.DATA_KEY);
            EventHandler.off(this._element, this.constructor.EVENT_KEY);
            Object.getOwnPropertyNames(this).forEach((propertyName) => {
              this[propertyName] = null;
            });
          }
          _queueCallback(callback, element, isAnimated = true) {
            executeAfterTransition(callback, element, isAnimated);
          }
          static getInstance(element) {
            return Data.get(getElement(element), this.DATA_KEY);
          }
          static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
          }
          static get VERSION() {
            return VERSION;
          }
          static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
        }
        const enableDismissTrigger = (component, method = "hide") => {
          const clickEvent = `click.dismiss${component.EVENT_KEY}`;
          const name = component.NAME;
          EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
            if (["A", "AREA"].includes(this.tagName)) {
              event.preventDefault();
            }
            if (isDisabled(this)) {
              return;
            }
            const target = getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
          });
        };
        const NAME$d = "alert";
        const DATA_KEY$c = "bs.alert";
        const EVENT_KEY$c = `.${DATA_KEY$c}`;
        const EVENT_CLOSE = `close${EVENT_KEY$c}`;
        const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
        const CLASS_NAME_FADE$5 = "fade";
        const CLASS_NAME_SHOW$8 = "show";
        class Alert extends BaseComponent {
          static get NAME() {
            return NAME$d;
          }
          close() {
            const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
            if (closeEvent.defaultPrevented) {
              return;
            }
            this._element.classList.remove(CLASS_NAME_SHOW$8);
            const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
            this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
          }
          _destroyElement() {
            this._element.remove();
            EventHandler.trigger(this._element, EVENT_CLOSED);
            this.dispose();
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Alert.getOrCreateInstance(this);
              if (typeof config !== "string") {
                return;
              }
              if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](this);
            });
          }
        }
        enableDismissTrigger(Alert, "close");
        defineJQueryPlugin(Alert);
        const NAME$c = "button";
        const DATA_KEY$b = "bs.button";
        const EVENT_KEY$b = `.${DATA_KEY$b}`;
        const DATA_API_KEY$7 = ".data-api";
        const CLASS_NAME_ACTIVE$3 = "active";
        const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
        const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
        class Button extends BaseComponent {
          static get NAME() {
            return NAME$c;
          }
          toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Button.getOrCreateInstance(this);
              if (config === "toggle") {
                data[config]();
              }
            });
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
          event.preventDefault();
          const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
          const data = Button.getOrCreateInstance(button);
          data.toggle();
        });
        defineJQueryPlugin(Button);
        function normalizeData(val) {
          if (val === "true") {
            return true;
          }
          if (val === "false") {
            return false;
          }
          if (val === Number(val).toString()) {
            return Number(val);
          }
          if (val === "" || val === "null") {
            return null;
          }
          return val;
        }
        function normalizeDataKey(key) {
          return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
        }
        const Manipulator = {
          setDataAttribute(element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
          },
          removeDataAttribute(element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
          },
          getDataAttributes(element) {
            if (!element) {
              return {};
            }
            const attributes = {};
            Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
              let pureKey = key.replace(/^bs/, "");
              pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
              attributes[pureKey] = normalizeData(element.dataset[key]);
            });
            return attributes;
          },
          getDataAttribute(element, key) {
            return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
          },
          offset(element) {
            const rect = element.getBoundingClientRect();
            return {
              top: rect.top + window.pageYOffset,
              left: rect.left + window.pageXOffset
            };
          },
          position(element) {
            return {
              top: element.offsetTop,
              left: element.offsetLeft
            };
          }
        };
        const NODE_TEXT = 3;
        const SelectorEngine = {
          find(selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
          },
          findOne(selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
          },
          children(element, selector) {
            return [].concat(...element.children).filter((child) => child.matches(selector));
          },
          parents(element, selector) {
            const parents = [];
            let ancestor = element.parentNode;
            while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
              if (ancestor.matches(selector)) {
                parents.push(ancestor);
              }
              ancestor = ancestor.parentNode;
            }
            return parents;
          },
          prev(element, selector) {
            let previous = element.previousElementSibling;
            while (previous) {
              if (previous.matches(selector)) {
                return [previous];
              }
              previous = previous.previousElementSibling;
            }
            return [];
          },
          next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
              if (next.matches(selector)) {
                return [next];
              }
              next = next.nextElementSibling;
            }
            return [];
          },
          focusableChildren(element) {
            const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
            return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
          }
        };
        const NAME$b = "carousel";
        const DATA_KEY$a = "bs.carousel";
        const EVENT_KEY$a = `.${DATA_KEY$a}`;
        const DATA_API_KEY$6 = ".data-api";
        const ARROW_LEFT_KEY = "ArrowLeft";
        const ARROW_RIGHT_KEY = "ArrowRight";
        const TOUCHEVENT_COMPAT_WAIT = 500;
        const SWIPE_THRESHOLD = 40;
        const Default$a = {
          interval: 5e3,
          keyboard: true,
          slide: false,
          pause: "hover",
          wrap: true,
          touch: true
        };
        const DefaultType$a = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          slide: "(boolean|string)",
          pause: "(string|boolean)",
          wrap: "boolean",
          touch: "boolean"
        };
        const ORDER_NEXT = "next";
        const ORDER_PREV = "prev";
        const DIRECTION_LEFT = "left";
        const DIRECTION_RIGHT = "right";
        const KEY_TO_DIRECTION = {
          [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
          [ARROW_RIGHT_KEY]: DIRECTION_LEFT
        };
        const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
        const EVENT_SLID = `slid${EVENT_KEY$a}`;
        const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
        const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
        const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
        const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
        const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
        const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
        const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
        const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
        const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
        const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
        const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
        const CLASS_NAME_CAROUSEL = "carousel";
        const CLASS_NAME_ACTIVE$2 = "active";
        const CLASS_NAME_SLIDE = "slide";
        const CLASS_NAME_END = "carousel-item-end";
        const CLASS_NAME_START = "carousel-item-start";
        const CLASS_NAME_NEXT = "carousel-item-next";
        const CLASS_NAME_PREV = "carousel-item-prev";
        const CLASS_NAME_POINTER_EVENT = "pointer-event";
        const SELECTOR_ACTIVE$1 = ".active";
        const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
        const SELECTOR_ITEM = ".carousel-item";
        const SELECTOR_ITEM_IMG = ".carousel-item img";
        const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
        const SELECTOR_INDICATORS = ".carousel-indicators";
        const SELECTOR_INDICATOR = "[data-bs-target]";
        const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
        const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
        const POINTER_TYPE_TOUCH = "touch";
        const POINTER_TYPE_PEN = "pen";
        class Carousel extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config);
            this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
            this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent);
            this._addEventListeners();
          }
          static get Default() {
            return Default$a;
          }
          static get NAME() {
            return NAME$b;
          }
          next() {
            this._slide(ORDER_NEXT);
          }
          nextWhenVisible() {
            if (!document.hidden && isVisible(this._element)) {
              this.next();
            }
          }
          prev() {
            this._slide(ORDER_PREV);
          }
          pause(event) {
            if (!event) {
              this._isPaused = true;
            }
            if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
              triggerTransitionEnd(this._element);
              this.cycle(true);
            }
            clearInterval(this._interval);
            this._interval = null;
          }
          cycle(event) {
            if (!event) {
              this._isPaused = false;
            }
            if (this._interval) {
              clearInterval(this._interval);
              this._interval = null;
            }
            if (this._config && this._config.interval && !this._isPaused) {
              this._updateInterval();
              this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
          }
          to(index) {
            this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeIndex = this._getItemIndex(this._activeElement);
            if (index > this._items.length - 1 || index < 0) {
              return;
            }
            if (this._isSliding) {
              EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
              return;
            }
            if (activeIndex === index) {
              this.pause();
              this.cycle();
              return;
            }
            const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, this._items[index]);
          }
          _getConfig(config) {
            config = {
              ...Default$a,
              ...Manipulator.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$b, config, DefaultType$a);
            return config;
          }
          _handleSwipe() {
            const absDeltax = Math.abs(this.touchDeltaX);
            if (absDeltax <= SWIPE_THRESHOLD) {
              return;
            }
            const direction = absDeltax / this.touchDeltaX;
            this.touchDeltaX = 0;
            if (!direction) {
              return;
            }
            this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
          }
          _addEventListeners() {
            if (this._config.keyboard) {
              EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
            }
            if (this._config.pause === "hover") {
              EventHandler.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
              EventHandler.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
            }
            if (this._config.touch && this._touchSupported) {
              this._addTouchEventListeners();
            }
          }
          _addTouchEventListeners() {
            const hasPointerPenTouch = (event) => {
              return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
            };
            const start = (event) => {
              if (hasPointerPenTouch(event)) {
                this.touchStartX = event.clientX;
              } else if (!this._pointerEvent) {
                this.touchStartX = event.touches[0].clientX;
              }
            };
            const move = (event) => {
              this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
            };
            const end = (event) => {
              if (hasPointerPenTouch(event)) {
                this.touchDeltaX = event.clientX - this.touchStartX;
              }
              this._handleSwipe();
              if (this._config.pause === "hover") {
                this.pause();
                if (this.touchTimeout) {
                  clearTimeout(this.touchTimeout);
                }
                this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
              }
            };
            SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
              EventHandler.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
            });
            if (this._pointerEvent) {
              EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => start(event));
              EventHandler.on(this._element, EVENT_POINTERUP, (event) => end(event));
              this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            } else {
              EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => start(event));
              EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
              EventHandler.on(this._element, EVENT_TOUCHEND, (event) => end(event));
            }
          }
          _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) {
              return;
            }
            const direction = KEY_TO_DIRECTION[event.key];
            if (direction) {
              event.preventDefault();
              this._slide(direction);
            }
          }
          _getItemIndex(element) {
            this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
            return this._items.indexOf(element);
          }
          _getItemByOrder(order, activeElement) {
            const isNext = order === ORDER_NEXT;
            return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
          }
          _triggerSlideEvent(relatedTarget, eventDirectionName) {
            const targetIndex = this._getItemIndex(relatedTarget);
            const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
            return EventHandler.trigger(this._element, EVENT_SLIDE, {
              relatedTarget,
              direction: eventDirectionName,
              from: fromIndex,
              to: targetIndex
            });
          }
          _setActiveIndicatorElement(element) {
            if (this._indicatorsElement) {
              const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
              activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
              activeIndicator.removeAttribute("aria-current");
              const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
              for (let i = 0; i < indicators.length; i++) {
                if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
                  indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
                  indicators[i].setAttribute("aria-current", "true");
                  break;
                }
              }
            }
          }
          _updateInterval() {
            const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            if (!element) {
              return;
            }
            const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
            if (elementInterval) {
              this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
              this._config.interval = elementInterval;
            } else {
              this._config.interval = this._config.defaultInterval || this._config.interval;
            }
          }
          _slide(directionOrOrder, element) {
            const order = this._directionToOrder(directionOrOrder);
            const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeElementIndex = this._getItemIndex(activeElement);
            const nextElement = element || this._getItemByOrder(order, activeElement);
            const nextElementIndex = this._getItemIndex(nextElement);
            const isCycling = Boolean(this._interval);
            const isNext = order === ORDER_NEXT;
            const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            const eventDirectionName = this._orderToDirection(order);
            if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
              this._isSliding = false;
              return;
            }
            if (this._isSliding) {
              return;
            }
            const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (slideEvent.defaultPrevented) {
              return;
            }
            if (!activeElement || !nextElement) {
              return;
            }
            this._isSliding = true;
            if (isCycling) {
              this.pause();
            }
            this._setActiveIndicatorElement(nextElement);
            this._activeElement = nextElement;
            const triggerSlidEvent = () => {
              EventHandler.trigger(this._element, EVENT_SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
              });
            };
            if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
              nextElement.classList.add(orderClassName);
              reflow(nextElement);
              activeElement.classList.add(directionalClassName);
              nextElement.classList.add(directionalClassName);
              const completeCallBack = () => {
                nextElement.classList.remove(directionalClassName, orderClassName);
                nextElement.classList.add(CLASS_NAME_ACTIVE$2);
                activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
                this._isSliding = false;
                setTimeout(triggerSlidEvent, 0);
              };
              this._queueCallback(completeCallBack, activeElement, true);
            } else {
              activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
              nextElement.classList.add(CLASS_NAME_ACTIVE$2);
              this._isSliding = false;
              triggerSlidEvent();
            }
            if (isCycling) {
              this.cycle();
            }
          }
          _directionToOrder(direction) {
            if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
              return direction;
            }
            if (isRTL()) {
              return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            }
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
          }
          _orderToDirection(order) {
            if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
              return order;
            }
            if (isRTL()) {
              return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
          }
          static carouselInterface(element, config) {
            const data = Carousel.getOrCreateInstance(element, config);
            let {
              _config
            } = data;
            if (typeof config === "object") {
              _config = {
                ..._config,
                ...config
              };
            }
            const action = typeof config === "string" ? config : _config.slide;
            if (typeof config === "number") {
              data.to(config);
            } else if (typeof action === "string") {
              if (typeof data[action] === "undefined") {
                throw new TypeError(`No method named "${action}"`);
              }
              data[action]();
            } else if (_config.interval && _config.ride) {
              data.pause();
              data.cycle();
            }
          }
          static jQueryInterface(config) {
            return this.each(function() {
              Carousel.carouselInterface(this, config);
            });
          }
          static dataApiClickHandler(event) {
            const target = getElementFromSelector(this);
            if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
              return;
            }
            const config = {
              ...Manipulator.getDataAttributes(target),
              ...Manipulator.getDataAttributes(this)
            };
            const slideIndex = this.getAttribute("data-bs-slide-to");
            if (slideIndex) {
              config.interval = false;
            }
            Carousel.carouselInterface(target, config);
            if (slideIndex) {
              Carousel.getInstance(target).to(slideIndex);
            }
            event.preventDefault();
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
        EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
          const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
          for (let i = 0, len = carousels.length; i < len; i++) {
            Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
          }
        });
        defineJQueryPlugin(Carousel);
        const NAME$a = "collapse";
        const DATA_KEY$9 = "bs.collapse";
        const EVENT_KEY$9 = `.${DATA_KEY$9}`;
        const DATA_API_KEY$5 = ".data-api";
        const Default$9 = {
          toggle: true,
          parent: null
        };
        const DefaultType$9 = {
          toggle: "boolean",
          parent: "(null|element)"
        };
        const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
        const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
        const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
        const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
        const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
        const CLASS_NAME_SHOW$7 = "show";
        const CLASS_NAME_COLLAPSE = "collapse";
        const CLASS_NAME_COLLAPSING = "collapsing";
        const CLASS_NAME_COLLAPSED = "collapsed";
        const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
        const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
        const WIDTH = "width";
        const HEIGHT = "height";
        const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
        const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
        class Collapse extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._isTransitioning = false;
            this._config = this._getConfig(config);
            this._triggerArray = [];
            const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
            for (let i = 0, len = toggleList.length; i < len; i++) {
              const elem = toggleList[i];
              const selector = getSelectorFromElement(elem);
              const filterElement = SelectorEngine.find(selector).filter((foundElem) => foundElem === this._element);
              if (selector !== null && filterElement.length) {
                this._selector = selector;
                this._triggerArray.push(elem);
              }
            }
            this._initializeChildren();
            if (!this._config.parent) {
              this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
            }
            if (this._config.toggle) {
              this.toggle();
            }
          }
          static get Default() {
            return Default$9;
          }
          static get NAME() {
            return NAME$a;
          }
          toggle() {
            if (this._isShown()) {
              this.hide();
            } else {
              this.show();
            }
          }
          show() {
            if (this._isTransitioning || this._isShown()) {
              return;
            }
            let actives = [];
            let activesData;
            if (this._config.parent) {
              const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
              actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
            }
            const container = SelectorEngine.findOne(this._selector);
            if (actives.length) {
              const tempActiveData = actives.find((elem) => container !== elem);
              activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;
              if (activesData && activesData._isTransitioning) {
                return;
              }
            }
            const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
            if (startEvent.defaultPrevented) {
              return;
            }
            actives.forEach((elemActive) => {
              if (container !== elemActive) {
                Collapse.getOrCreateInstance(elemActive, {
                  toggle: false
                }).hide();
              }
              if (!activesData) {
                Data.set(elemActive, DATA_KEY$9, null);
              }
            });
            const dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING);
              this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
              this._element.style[dimension] = "";
              EventHandler.trigger(this._element, EVENT_SHOWN$5);
            };
            const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            const scrollSize = `scroll${capitalizedDimension}`;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = `${this._element[scrollSize]}px`;
          }
          hide() {
            if (this._isTransitioning || !this._isShown()) {
              return;
            }
            const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
            if (startEvent.defaultPrevented) {
              return;
            }
            const dimension = this._getDimension();
            this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
            const triggerArrayLength = this._triggerArray.length;
            for (let i = 0; i < triggerArrayLength; i++) {
              const trigger = this._triggerArray[i];
              const elem = getElementFromSelector(trigger);
              if (elem && !this._isShown(elem)) {
                this._addAriaAndCollapsedClass([trigger], false);
              }
            }
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING);
              this._element.classList.add(CLASS_NAME_COLLAPSE);
              EventHandler.trigger(this._element, EVENT_HIDDEN$5);
            };
            this._element.style[dimension] = "";
            this._queueCallback(complete, this._element, true);
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW$7);
          }
          _getConfig(config) {
            config = {
              ...Default$9,
              ...Manipulator.getDataAttributes(this._element),
              ...config
            };
            config.toggle = Boolean(config.toggle);
            config.parent = getElement(config.parent);
            typeCheckConfig(NAME$a, config, DefaultType$9);
            return config;
          }
          _getDimension() {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
          }
          _initializeChildren() {
            if (!this._config.parent) {
              return;
            }
            const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
            SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
              const selected = getElementFromSelector(element);
              if (selected) {
                this._addAriaAndCollapsedClass([element], this._isShown(selected));
              }
            });
          }
          _addAriaAndCollapsedClass(triggerArray, isOpen) {
            if (!triggerArray.length) {
              return;
            }
            triggerArray.forEach((elem) => {
              if (isOpen) {
                elem.classList.remove(CLASS_NAME_COLLAPSED);
              } else {
                elem.classList.add(CLASS_NAME_COLLAPSED);
              }
              elem.setAttribute("aria-expanded", isOpen);
            });
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const _config = {};
              if (typeof config === "string" && /show|hide/.test(config)) {
                _config.toggle = false;
              }
              const data = Collapse.getOrCreateInstance(this, _config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
          if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
            event.preventDefault();
          }
          const selector = getSelectorFromElement(this);
          const selectorElements = SelectorEngine.find(selector);
          selectorElements.forEach((element) => {
            Collapse.getOrCreateInstance(element, {
              toggle: false
            }).toggle();
          });
        });
        defineJQueryPlugin(Collapse);
        const NAME$9 = "dropdown";
        const DATA_KEY$8 = "bs.dropdown";
        const EVENT_KEY$8 = `.${DATA_KEY$8}`;
        const DATA_API_KEY$4 = ".data-api";
        const ESCAPE_KEY$2 = "Escape";
        const SPACE_KEY = "Space";
        const TAB_KEY$1 = "Tab";
        const ARROW_UP_KEY = "ArrowUp";
        const ARROW_DOWN_KEY = "ArrowDown";
        const RIGHT_MOUSE_BUTTON = 2;
        const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
        const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
        const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
        const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
        const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
        const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
        const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
        const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
        const CLASS_NAME_SHOW$6 = "show";
        const CLASS_NAME_DROPUP = "dropup";
        const CLASS_NAME_DROPEND = "dropend";
        const CLASS_NAME_DROPSTART = "dropstart";
        const CLASS_NAME_NAVBAR = "navbar";
        const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
        const SELECTOR_MENU = ".dropdown-menu";
        const SELECTOR_NAVBAR_NAV = ".navbar-nav";
        const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
        const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
        const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
        const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
        const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
        const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
        const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
        const Default$8 = {
          offset: [0, 2],
          boundary: "clippingParents",
          reference: "toggle",
          display: "dynamic",
          popperConfig: null,
          autoClose: true
        };
        const DefaultType$8 = {
          offset: "(array|string|function)",
          boundary: "(string|element)",
          reference: "(string|element|object)",
          display: "string",
          popperConfig: "(null|object|function)",
          autoClose: "(boolean|string)"
        };
        class Dropdown extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();
          }
          static get Default() {
            return Default$8;
          }
          static get DefaultType() {
            return DefaultType$8;
          }
          static get NAME() {
            return NAME$9;
          }
          toggle() {
            return this._isShown() ? this.hide() : this.show();
          }
          show() {
            if (isDisabled(this._element) || this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
            if (showEvent.defaultPrevented) {
              return;
            }
            const parent = Dropdown.getParentFromElement(this._element);
            if (this._inNavbar) {
              Manipulator.setDataAttribute(this._menu, "popper", "none");
            } else {
              this._createPopper(parent);
            }
            if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
              [].concat(...document.body.children).forEach((elem) => EventHandler.on(elem, "mouseover", noop));
            }
            this._element.focus();
            this._element.setAttribute("aria-expanded", true);
            this._menu.classList.add(CLASS_NAME_SHOW$6);
            this._element.classList.add(CLASS_NAME_SHOW$6);
            EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
          }
          hide() {
            if (isDisabled(this._element) || !this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
          }
          dispose() {
            if (this._popper) {
              this._popper.destroy();
            }
            super.dispose();
          }
          update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper) {
              this._popper.update();
            }
          }
          _completeHide(relatedTarget) {
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
            if (hideEvent.defaultPrevented) {
              return;
            }
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((elem) => EventHandler.off(elem, "mouseover", noop));
            }
            if (this._popper) {
              this._popper.destroy();
            }
            this._menu.classList.remove(CLASS_NAME_SHOW$6);
            this._element.classList.remove(CLASS_NAME_SHOW$6);
            this._element.setAttribute("aria-expanded", "false");
            Manipulator.removeDataAttribute(this._menu, "popper");
            EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
          }
          _getConfig(config) {
            config = {
              ...this.constructor.Default,
              ...Manipulator.getDataAttributes(this._element),
              ...config
            };
            typeCheckConfig(NAME$9, config, this.constructor.DefaultType);
            if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
              throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            }
            return config;
          }
          _createPopper(parent) {
            if (typeof Popper__namespace === "undefined") {
              throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            }
            let referenceElement = this._element;
            if (this._config.reference === "parent") {
              referenceElement = parent;
            } else if (isElement(this._config.reference)) {
              referenceElement = getElement(this._config.reference);
            } else if (typeof this._config.reference === "object") {
              referenceElement = this._config.reference;
            }
            const popperConfig = this._getPopperConfig();
            const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
            this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
            if (isDisplayStatic) {
              Manipulator.setDataAttribute(this._menu, "popper", "static");
            }
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW$6);
          }
          _getMenuElement() {
            return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
          }
          _getPlacement() {
            const parentDropdown = this._element.parentNode;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
              return PLACEMENT_RIGHT;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
              return PLACEMENT_LEFT;
            }
            const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
              return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            }
            return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
          }
          _detectNavbar() {
            return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
          }
          _getOffset() {
            const {
              offset
            } = this._config;
            if (typeof offset === "string") {
              return offset.split(",").map((val) => Number.parseInt(val, 10));
            }
            if (typeof offset === "function") {
              return (popperData) => offset(popperData, this._element);
            }
            return offset;
          }
          _getPopperConfig() {
            const defaultBsPopperConfig = {
              placement: this._getPlacement(),
              modifiers: [{
                name: "preventOverflow",
                options: {
                  boundary: this._config.boundary
                }
              }, {
                name: "offset",
                options: {
                  offset: this._getOffset()
                }
              }]
            };
            if (this._config.display === "static") {
              defaultBsPopperConfig.modifiers = [{
                name: "applyStyles",
                enabled: false
              }];
            }
            return {
              ...defaultBsPopperConfig,
              ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
            };
          }
          _selectMenuItem({
            key,
            target
          }) {
            const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
            if (!items.length) {
              return;
            }
            getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Dropdown.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            });
          }
          static clearMenus(event) {
            if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1)) {
              return;
            }
            const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
            for (let i = 0, len = toggles.length; i < len; i++) {
              const context = Dropdown.getInstance(toggles[i]);
              if (!context || context._config.autoClose === false) {
                continue;
              }
              if (!context._isShown()) {
                continue;
              }
              const relatedTarget = {
                relatedTarget: context._element
              };
              if (event) {
                const composedPath = event.composedPath();
                const isMenuTarget = composedPath.includes(context._menu);
                if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
                  continue;
                }
                if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                  continue;
                }
                if (event.type === "click") {
                  relatedTarget.clickEvent = event;
                }
              }
              context._completeHide(relatedTarget);
            }
          }
          static getParentFromElement(element) {
            return getElementFromSelector(element) || element.parentNode;
          }
          static dataApiKeydownHandler(event) {
            if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
              return;
            }
            const isActive = this.classList.contains(CLASS_NAME_SHOW$6);
            if (!isActive && event.key === ESCAPE_KEY$2) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (isDisabled(this)) {
              return;
            }
            const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
            const instance = Dropdown.getOrCreateInstance(getToggleButton);
            if (event.key === ESCAPE_KEY$2) {
              instance.hide();
              return;
            }
            if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
              if (!isActive) {
                instance.show();
              }
              instance._selectMenuItem(event);
              return;
            }
            if (!isActive || event.key === SPACE_KEY) {
              Dropdown.clearMenus();
            }
          }
        }
        EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
        EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
        EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
        EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
        EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
          event.preventDefault();
          Dropdown.getOrCreateInstance(this).toggle();
        });
        defineJQueryPlugin(Dropdown);
        const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
        const SELECTOR_STICKY_CONTENT = ".sticky-top";
        class ScrollBarHelper {
          constructor() {
            this._element = document.body;
          }
          getWidth() {
            const documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
          }
          hide() {
            const width = this.getWidth();
            this._disableOverFlow();
            this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
          }
          _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow");
            this._element.style.overflow = "hidden";
          }
          _setElementAttributes(selector, styleProp, callback) {
            const scrollbarWidth = this.getWidth();
            const manipulationCallBack = (element) => {
              if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                return;
              }
              this._saveInitialAttribute(element, styleProp);
              const calculatedValue = window.getComputedStyle(element)[styleProp];
              element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          reset() {
            this._resetElementAttributes(this._element, "overflow");
            this._resetElementAttributes(this._element, "paddingRight");
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
          }
          _saveInitialAttribute(element, styleProp) {
            const actualValue = element.style[styleProp];
            if (actualValue) {
              Manipulator.setDataAttribute(element, styleProp, actualValue);
            }
          }
          _resetElementAttributes(selector, styleProp) {
            const manipulationCallBack = (element) => {
              const value = Manipulator.getDataAttribute(element, styleProp);
              if (typeof value === "undefined") {
                element.style.removeProperty(styleProp);
              } else {
                Manipulator.removeDataAttribute(element, styleProp);
                element.style[styleProp] = value;
              }
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          _applyManipulationCallback(selector, callBack) {
            if (isElement(selector)) {
              callBack(selector);
            } else {
              SelectorEngine.find(selector, this._element).forEach(callBack);
            }
          }
          isOverflowing() {
            return this.getWidth() > 0;
          }
        }
        const Default$7 = {
          className: "modal-backdrop",
          isVisible: true,
          isAnimated: false,
          rootElement: "body",
          clickCallback: null
        };
        const DefaultType$7 = {
          className: "string",
          isVisible: "boolean",
          isAnimated: "boolean",
          rootElement: "(element|string)",
          clickCallback: "(function|null)"
        };
        const NAME$8 = "backdrop";
        const CLASS_NAME_FADE$4 = "fade";
        const CLASS_NAME_SHOW$5 = "show";
        const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;
        class Backdrop {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isAppended = false;
            this._element = null;
          }
          show(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._append();
            if (this._config.isAnimated) {
              reflow(this._getElement());
            }
            this._getElement().classList.add(CLASS_NAME_SHOW$5);
            this._emulateAnimation(() => {
              execute(callback);
            });
          }
          hide(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$5);
            this._emulateAnimation(() => {
              this.dispose();
              execute(callback);
            });
          }
          _getElement() {
            if (!this._element) {
              const backdrop = document.createElement("div");
              backdrop.className = this._config.className;
              if (this._config.isAnimated) {
                backdrop.classList.add(CLASS_NAME_FADE$4);
              }
              this._element = backdrop;
            }
            return this._element;
          }
          _getConfig(config) {
            config = {
              ...Default$7,
              ...typeof config === "object" ? config : {}
            };
            config.rootElement = getElement(config.rootElement);
            typeCheckConfig(NAME$8, config, DefaultType$7);
            return config;
          }
          _append() {
            if (this._isAppended) {
              return;
            }
            this._config.rootElement.append(this._getElement());
            EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
              execute(this._config.clickCallback);
            });
            this._isAppended = true;
          }
          dispose() {
            if (!this._isAppended) {
              return;
            }
            EventHandler.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
          }
          _emulateAnimation(callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
          }
        }
        const Default$6 = {
          trapElement: null,
          autofocus: true
        };
        const DefaultType$6 = {
          trapElement: "element",
          autofocus: "boolean"
        };
        const NAME$7 = "focustrap";
        const DATA_KEY$7 = "bs.focustrap";
        const EVENT_KEY$7 = `.${DATA_KEY$7}`;
        const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
        const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
        const TAB_KEY = "Tab";
        const TAB_NAV_FORWARD = "forward";
        const TAB_NAV_BACKWARD = "backward";
        class FocusTrap {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isActive = false;
            this._lastTabNavDirection = null;
          }
          activate() {
            const {
              trapElement,
              autofocus
            } = this._config;
            if (this._isActive) {
              return;
            }
            if (autofocus) {
              trapElement.focus();
            }
            EventHandler.off(document, EVENT_KEY$7);
            EventHandler.on(document, EVENT_FOCUSIN$1, (event) => this._handleFocusin(event));
            EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
            this._isActive = true;
          }
          deactivate() {
            if (!this._isActive) {
              return;
            }
            this._isActive = false;
            EventHandler.off(document, EVENT_KEY$7);
          }
          _handleFocusin(event) {
            const {
              target
            } = event;
            const {
              trapElement
            } = this._config;
            if (target === document || target === trapElement || trapElement.contains(target)) {
              return;
            }
            const elements = SelectorEngine.focusableChildren(trapElement);
            if (elements.length === 0) {
              trapElement.focus();
            } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
              elements[elements.length - 1].focus();
            } else {
              elements[0].focus();
            }
          }
          _handleKeydown(event) {
            if (event.key !== TAB_KEY) {
              return;
            }
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
          }
          _getConfig(config) {
            config = {
              ...Default$6,
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$7, config, DefaultType$6);
            return config;
          }
        }
        const NAME$6 = "modal";
        const DATA_KEY$6 = "bs.modal";
        const EVENT_KEY$6 = `.${DATA_KEY$6}`;
        const DATA_API_KEY$3 = ".data-api";
        const ESCAPE_KEY$1 = "Escape";
        const Default$5 = {
          backdrop: true,
          keyboard: true,
          focus: true
        };
        const DefaultType$5 = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean"
        };
        const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
        const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
        const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
        const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
        const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
        const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
        const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
        const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
        const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
        const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
        const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
        const CLASS_NAME_OPEN = "modal-open";
        const CLASS_NAME_FADE$3 = "fade";
        const CLASS_NAME_SHOW$4 = "show";
        const CLASS_NAME_STATIC = "modal-static";
        const OPEN_SELECTOR$1 = ".modal.show";
        const SELECTOR_DIALOG = ".modal-dialog";
        const SELECTOR_MODAL_BODY = ".modal-body";
        const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
        class Modal extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._isShown = false;
            this._ignoreBackdropClick = false;
            this._isTransitioning = false;
            this._scrollBar = new ScrollBarHelper();
          }
          static get Default() {
            return Default$5;
          }
          static get NAME() {
            return NAME$6;
          }
          toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          }
          show(relatedTarget) {
            if (this._isShown || this._isTransitioning) {
              return;
            }
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
              relatedTarget
            });
            if (showEvent.defaultPrevented) {
              return;
            }
            this._isShown = true;
            if (this._isAnimated()) {
              this._isTransitioning = true;
            }
            this._scrollBar.hide();
            document.body.classList.add(CLASS_NAME_OPEN);
            this._adjustDialog();
            this._setEscapeEvent();
            this._setResizeEvent();
            EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
              EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
                if (event.target === this._element) {
                  this._ignoreBackdropClick = true;
                }
              });
            });
            this._showBackdrop(() => this._showElement(relatedTarget));
          }
          hide() {
            if (!this._isShown || this._isTransitioning) {
              return;
            }
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
            if (hideEvent.defaultPrevented) {
              return;
            }
            this._isShown = false;
            const isAnimated = this._isAnimated();
            if (isAnimated) {
              this._isTransitioning = true;
            }
            this._setEscapeEvent();
            this._setResizeEvent();
            this._focustrap.deactivate();
            this._element.classList.remove(CLASS_NAME_SHOW$4);
            EventHandler.off(this._element, EVENT_CLICK_DISMISS);
            EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
            this._queueCallback(() => this._hideModal(), this._element, isAnimated);
          }
          dispose() {
            [window, this._dialog].forEach((htmlElement) => EventHandler.off(htmlElement, EVENT_KEY$6));
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
          }
          handleUpdate() {
            this._adjustDialog();
          }
          _initializeBackDrop() {
            return new Backdrop({
              isVisible: Boolean(this._config.backdrop),
              isAnimated: this._isAnimated()
            });
          }
          _initializeFocusTrap() {
            return new FocusTrap({
              trapElement: this._element
            });
          }
          _getConfig(config) {
            config = {
              ...Default$5,
              ...Manipulator.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$6, config, DefaultType$5);
            return config;
          }
          _showElement(relatedTarget) {
            const isAnimated = this._isAnimated();
            const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
              document.body.append(this._element);
            }
            this._element.style.display = "block";
            this._element.removeAttribute("aria-hidden");
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.scrollTop = 0;
            if (modalBody) {
              modalBody.scrollTop = 0;
            }
            if (isAnimated) {
              reflow(this._element);
            }
            this._element.classList.add(CLASS_NAME_SHOW$4);
            const transitionComplete = () => {
              if (this._config.focus) {
                this._focustrap.activate();
              }
              this._isTransitioning = false;
              EventHandler.trigger(this._element, EVENT_SHOWN$3, {
                relatedTarget
              });
            };
            this._queueCallback(transitionComplete, this._dialog, isAnimated);
          }
          _setEscapeEvent() {
            if (this._isShown) {
              EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
                if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
                  event.preventDefault();
                  this.hide();
                } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
                  this._triggerBackdropTransition();
                }
              });
            } else {
              EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
            }
          }
          _setResizeEvent() {
            if (this._isShown) {
              EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
            } else {
              EventHandler.off(window, EVENT_RESIZE);
            }
          }
          _hideModal() {
            this._element.style.display = "none";
            this._element.setAttribute("aria-hidden", true);
            this._element.removeAttribute("aria-modal");
            this._element.removeAttribute("role");
            this._isTransitioning = false;
            this._backdrop.hide(() => {
              document.body.classList.remove(CLASS_NAME_OPEN);
              this._resetAdjustments();
              this._scrollBar.reset();
              EventHandler.trigger(this._element, EVENT_HIDDEN$3);
            });
          }
          _showBackdrop(callback) {
            EventHandler.on(this._element, EVENT_CLICK_DISMISS, (event) => {
              if (this._ignoreBackdropClick) {
                this._ignoreBackdropClick = false;
                return;
              }
              if (event.target !== event.currentTarget) {
                return;
              }
              if (this._config.backdrop === true) {
                this.hide();
              } else if (this._config.backdrop === "static") {
                this._triggerBackdropTransition();
              }
            });
            this._backdrop.show(callback);
          }
          _isAnimated() {
            return this._element.classList.contains(CLASS_NAME_FADE$3);
          }
          _triggerBackdropTransition() {
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
            if (hideEvent.defaultPrevented) {
              return;
            }
            const {
              classList,
              scrollHeight,
              style
            } = this._element;
            const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
            if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
              return;
            }
            if (!isModalOverflowing) {
              style.overflowY = "hidden";
            }
            classList.add(CLASS_NAME_STATIC);
            this._queueCallback(() => {
              classList.remove(CLASS_NAME_STATIC);
              if (!isModalOverflowing) {
                this._queueCallback(() => {
                  style.overflowY = "";
                }, this._dialog);
              }
            }, this._dialog);
            this._element.focus();
          }
          _adjustDialog() {
            const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            const scrollbarWidth = this._scrollBar.getWidth();
            const isBodyOverflowing = scrollbarWidth > 0;
            if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
              this._element.style.paddingLeft = `${scrollbarWidth}px`;
            }
            if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
              this._element.style.paddingRight = `${scrollbarWidth}px`;
            }
          }
          _resetAdjustments() {
            this._element.style.paddingLeft = "";
            this._element.style.paddingRight = "";
          }
          static jQueryInterface(config, relatedTarget) {
            return this.each(function() {
              const data = Modal.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](relatedTarget);
            });
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
          const target = getElementFromSelector(this);
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          EventHandler.one(target, EVENT_SHOW$3, (showEvent) => {
            if (showEvent.defaultPrevented) {
              return;
            }
            EventHandler.one(target, EVENT_HIDDEN$3, () => {
              if (isVisible(this)) {
                this.focus();
              }
            });
          });
          const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
          if (allReadyOpen) {
            Modal.getInstance(allReadyOpen).hide();
          }
          const data = Modal.getOrCreateInstance(target);
          data.toggle(this);
        });
        enableDismissTrigger(Modal);
        defineJQueryPlugin(Modal);
        const NAME$5 = "offcanvas";
        const DATA_KEY$5 = "bs.offcanvas";
        const EVENT_KEY$5 = `.${DATA_KEY$5}`;
        const DATA_API_KEY$2 = ".data-api";
        const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
        const ESCAPE_KEY = "Escape";
        const Default$4 = {
          backdrop: true,
          keyboard: true,
          scroll: false
        };
        const DefaultType$4 = {
          backdrop: "boolean",
          keyboard: "boolean",
          scroll: "boolean"
        };
        const CLASS_NAME_SHOW$3 = "show";
        const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
        const OPEN_SELECTOR = ".offcanvas.show";
        const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
        const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
        const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
        const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
        const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
        const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
        const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
        class Offcanvas extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._isShown = false;
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._addEventListeners();
          }
          static get NAME() {
            return NAME$5;
          }
          static get Default() {
            return Default$4;
          }
          toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          }
          show(relatedTarget) {
            if (this._isShown) {
              return;
            }
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
              relatedTarget
            });
            if (showEvent.defaultPrevented) {
              return;
            }
            this._isShown = true;
            this._element.style.visibility = "visible";
            this._backdrop.show();
            if (!this._config.scroll) {
              new ScrollBarHelper().hide();
            }
            this._element.removeAttribute("aria-hidden");
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.classList.add(CLASS_NAME_SHOW$3);
            const completeCallBack = () => {
              if (!this._config.scroll) {
                this._focustrap.activate();
              }
              EventHandler.trigger(this._element, EVENT_SHOWN$2, {
                relatedTarget
              });
            };
            this._queueCallback(completeCallBack, this._element, true);
          }
          hide() {
            if (!this._isShown) {
              return;
            }
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
            if (hideEvent.defaultPrevented) {
              return;
            }
            this._focustrap.deactivate();
            this._element.blur();
            this._isShown = false;
            this._element.classList.remove(CLASS_NAME_SHOW$3);
            this._backdrop.hide();
            const completeCallback = () => {
              this._element.setAttribute("aria-hidden", true);
              this._element.removeAttribute("aria-modal");
              this._element.removeAttribute("role");
              this._element.style.visibility = "hidden";
              if (!this._config.scroll) {
                new ScrollBarHelper().reset();
              }
              EventHandler.trigger(this._element, EVENT_HIDDEN$2);
            };
            this._queueCallback(completeCallback, this._element, true);
          }
          dispose() {
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
          }
          _getConfig(config) {
            config = {
              ...Default$4,
              ...Manipulator.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$5, config, DefaultType$4);
            return config;
          }
          _initializeBackDrop() {
            return new Backdrop({
              className: CLASS_NAME_BACKDROP,
              isVisible: this._config.backdrop,
              isAnimated: true,
              rootElement: this._element.parentNode,
              clickCallback: () => this.hide()
            });
          }
          _initializeFocusTrap() {
            return new FocusTrap({
              trapElement: this._element
            });
          }
          _addEventListeners() {
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
              if (this._config.keyboard && event.key === ESCAPE_KEY) {
                this.hide();
              }
            });
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Offcanvas.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](this);
            });
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
          const target = getElementFromSelector(this);
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          EventHandler.one(target, EVENT_HIDDEN$2, () => {
            if (isVisible(this)) {
              this.focus();
            }
          });
          const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
          if (allReadyOpen && allReadyOpen !== target) {
            Offcanvas.getInstance(allReadyOpen).hide();
          }
          const data = Offcanvas.getOrCreateInstance(target);
          data.toggle(this);
        });
        EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach((el) => Offcanvas.getOrCreateInstance(el).show()));
        enableDismissTrigger(Offcanvas);
        defineJQueryPlugin(Offcanvas);
        const uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
        const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
        const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
        const allowedAttribute = (attribute, allowedAttributeList) => {
          const attributeName = attribute.nodeName.toLowerCase();
          if (allowedAttributeList.includes(attributeName)) {
            if (uriAttributes.has(attributeName)) {
              return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
            }
            return true;
          }
          const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
          for (let i = 0, len = regExp.length; i < len; i++) {
            if (regExp[i].test(attributeName)) {
              return true;
            }
          }
          return false;
        };
        const DefaultAllowlist = {
          "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
          a: ["target", "href", "title", "rel"],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src", "srcset", "alt", "title", "width", "height"],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: []
        };
        function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
          if (!unsafeHtml.length) {
            return unsafeHtml;
          }
          if (sanitizeFn && typeof sanitizeFn === "function") {
            return sanitizeFn(unsafeHtml);
          }
          const domParser = new window.DOMParser();
          const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
          const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
          for (let i = 0, len = elements.length; i < len; i++) {
            const element = elements[i];
            const elementName = element.nodeName.toLowerCase();
            if (!Object.keys(allowList).includes(elementName)) {
              element.remove();
              continue;
            }
            const attributeList = [].concat(...element.attributes);
            const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
            attributeList.forEach((attribute) => {
              if (!allowedAttribute(attribute, allowedAttributes)) {
                element.removeAttribute(attribute.nodeName);
              }
            });
          }
          return createdDocument.body.innerHTML;
        }
        const NAME$4 = "tooltip";
        const DATA_KEY$4 = "bs.tooltip";
        const EVENT_KEY$4 = `.${DATA_KEY$4}`;
        const CLASS_PREFIX$1 = "bs-tooltip";
        const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
        const DefaultType$3 = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(array|string|function)",
          container: "(string|element|boolean)",
          fallbackPlacements: "array",
          boundary: "(string|element)",
          customClass: "(string|function)",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          allowList: "object",
          popperConfig: "(null|object|function)"
        };
        const AttachmentMap = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: isRTL() ? "left" : "right",
          BOTTOM: "bottom",
          LEFT: isRTL() ? "right" : "left"
        };
        const Default$3 = {
          animation: true,
          template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: false,
          selector: false,
          placement: "top",
          offset: [0, 0],
          container: false,
          fallbackPlacements: ["top", "right", "bottom", "left"],
          boundary: "clippingParents",
          customClass: "",
          sanitize: true,
          sanitizeFn: null,
          allowList: DefaultAllowlist,
          popperConfig: null
        };
        const Event$2 = {
          HIDE: `hide${EVENT_KEY$4}`,
          HIDDEN: `hidden${EVENT_KEY$4}`,
          SHOW: `show${EVENT_KEY$4}`,
          SHOWN: `shown${EVENT_KEY$4}`,
          INSERTED: `inserted${EVENT_KEY$4}`,
          CLICK: `click${EVENT_KEY$4}`,
          FOCUSIN: `focusin${EVENT_KEY$4}`,
          FOCUSOUT: `focusout${EVENT_KEY$4}`,
          MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
          MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
        };
        const CLASS_NAME_FADE$2 = "fade";
        const CLASS_NAME_MODAL = "modal";
        const CLASS_NAME_SHOW$2 = "show";
        const HOVER_STATE_SHOW = "show";
        const HOVER_STATE_OUT = "out";
        const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
        const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
        const EVENT_MODAL_HIDE = "hide.bs.modal";
        const TRIGGER_HOVER = "hover";
        const TRIGGER_FOCUS = "focus";
        const TRIGGER_CLICK = "click";
        const TRIGGER_MANUAL = "manual";
        class Tooltip extends BaseComponent {
          constructor(element, config) {
            if (typeof Popper__namespace === "undefined") {
              throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            }
            super(element);
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = "";
            this._activeTrigger = {};
            this._popper = null;
            this._config = this._getConfig(config);
            this.tip = null;
            this._setListeners();
          }
          static get Default() {
            return Default$3;
          }
          static get NAME() {
            return NAME$4;
          }
          static get Event() {
            return Event$2;
          }
          static get DefaultType() {
            return DefaultType$3;
          }
          enable() {
            this._isEnabled = true;
          }
          disable() {
            this._isEnabled = false;
          }
          toggleEnabled() {
            this._isEnabled = !this._isEnabled;
          }
          toggle(event) {
            if (!this._isEnabled) {
              return;
            }
            if (event) {
              const context = this._initializeOnDelegatedTarget(event);
              context._activeTrigger.click = !context._activeTrigger.click;
              if (context._isWithActiveTrigger()) {
                context._enter(null, context);
              } else {
                context._leave(null, context);
              }
            } else {
              if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
                this._leave(null, this);
                return;
              }
              this._enter(null, this);
            }
          }
          dispose() {
            clearTimeout(this._timeout);
            EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this.tip) {
              this.tip.remove();
            }
            this._disposePopper();
            super.dispose();
          }
          show() {
            if (this._element.style.display === "none") {
              throw new Error("Please use show on visible elements");
            }
            if (!(this.isWithContent() && this._isEnabled)) {
              return;
            }
            const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
            const shadowRoot = findShadowRoot(this._element);
            const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
            if (showEvent.defaultPrevented || !isInTheDom) {
              return;
            }
            if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
              this._disposePopper();
              this.tip.remove();
              this.tip = null;
            }
            const tip = this.getTipElement();
            const tipId = getUID(this.constructor.NAME);
            tip.setAttribute("id", tipId);
            this._element.setAttribute("aria-describedby", tipId);
            if (this._config.animation) {
              tip.classList.add(CLASS_NAME_FADE$2);
            }
            const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
            const attachment = this._getAttachment(placement);
            this._addAttachmentClass(attachment);
            const {
              container
            } = this._config;
            Data.set(tip, this.constructor.DATA_KEY, this);
            if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
              container.append(tip);
              EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
            }
            if (this._popper) {
              this._popper.update();
            } else {
              this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
            }
            tip.classList.add(CLASS_NAME_SHOW$2);
            const customClass = this._resolvePossibleFunction(this._config.customClass);
            if (customClass) {
              tip.classList.add(...customClass.split(" "));
            }
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((element) => {
                EventHandler.on(element, "mouseover", noop);
              });
            }
            const complete = () => {
              const prevHoverState = this._hoverState;
              this._hoverState = null;
              EventHandler.trigger(this._element, this.constructor.Event.SHOWN);
              if (prevHoverState === HOVER_STATE_OUT) {
                this._leave(null, this);
              }
            };
            const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
            this._queueCallback(complete, this.tip, isAnimated);
          }
          hide() {
            if (!this._popper) {
              return;
            }
            const tip = this.getTipElement();
            const complete = () => {
              if (this._isWithActiveTrigger()) {
                return;
              }
              if (this._hoverState !== HOVER_STATE_SHOW) {
                tip.remove();
              }
              this._cleanTipClass();
              this._element.removeAttribute("aria-describedby");
              EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);
              this._disposePopper();
            };
            const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            tip.classList.remove(CLASS_NAME_SHOW$2);
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((element) => EventHandler.off(element, "mouseover", noop));
            }
            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;
            const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
            this._queueCallback(complete, this.tip, isAnimated);
            this._hoverState = "";
          }
          update() {
            if (this._popper !== null) {
              this._popper.update();
            }
          }
          isWithContent() {
            return Boolean(this.getTitle());
          }
          getTipElement() {
            if (this.tip) {
              return this.tip;
            }
            const element = document.createElement("div");
            element.innerHTML = this._config.template;
            const tip = element.children[0];
            this.setContent(tip);
            tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
            this.tip = tip;
            return this.tip;
          }
          setContent(tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
          }
          _sanitizeAndSetContent(template, content, selector) {
            const templateElement = SelectorEngine.findOne(selector, template);
            if (!content && templateElement) {
              templateElement.remove();
              return;
            }
            this.setElementContent(templateElement, content);
          }
          setElementContent(element, content) {
            if (element === null) {
              return;
            }
            if (isElement(content)) {
              content = getElement(content);
              if (this._config.html) {
                if (content.parentNode !== element) {
                  element.innerHTML = "";
                  element.append(content);
                }
              } else {
                element.textContent = content.textContent;
              }
              return;
            }
            if (this._config.html) {
              if (this._config.sanitize) {
                content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
              }
              element.innerHTML = content;
            } else {
              element.textContent = content;
            }
          }
          getTitle() {
            const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
            return this._resolvePossibleFunction(title);
          }
          updateAttachment(attachment) {
            if (attachment === "right") {
              return "end";
            }
            if (attachment === "left") {
              return "start";
            }
            return attachment;
          }
          _initializeOnDelegatedTarget(event, context) {
            return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
          }
          _getOffset() {
            const {
              offset
            } = this._config;
            if (typeof offset === "string") {
              return offset.split(",").map((val) => Number.parseInt(val, 10));
            }
            if (typeof offset === "function") {
              return (popperData) => offset(popperData, this._element);
            }
            return offset;
          }
          _resolvePossibleFunction(content) {
            return typeof content === "function" ? content.call(this._element) : content;
          }
          _getPopperConfig(attachment) {
            const defaultBsPopperConfig = {
              placement: attachment,
              modifiers: [{
                name: "flip",
                options: {
                  fallbackPlacements: this._config.fallbackPlacements
                }
              }, {
                name: "offset",
                options: {
                  offset: this._getOffset()
                }
              }, {
                name: "preventOverflow",
                options: {
                  boundary: this._config.boundary
                }
              }, {
                name: "arrow",
                options: {
                  element: `.${this.constructor.NAME}-arrow`
                }
              }, {
                name: "onChange",
                enabled: true,
                phase: "afterWrite",
                fn: (data) => this._handlePopperPlacementChange(data)
              }],
              onFirstUpdate: (data) => {
                if (data.options.placement !== data.placement) {
                  this._handlePopperPlacementChange(data);
                }
              }
            };
            return {
              ...defaultBsPopperConfig,
              ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
            };
          }
          _addAttachmentClass(attachment) {
            this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
          }
          _getAttachment(placement) {
            return AttachmentMap[placement.toUpperCase()];
          }
          _setListeners() {
            const triggers = this._config.trigger.split(" ");
            triggers.forEach((trigger) => {
              if (trigger === "click") {
                EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
              } else if (trigger !== TRIGGER_MANUAL) {
                const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
                const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                EventHandler.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
                EventHandler.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
              }
            });
            this._hideModalHandler = () => {
              if (this._element) {
                this.hide();
              }
            };
            EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this._config.selector) {
              this._config = {
                ...this._config,
                trigger: "manual",
                selector: ""
              };
            } else {
              this._fixTitle();
            }
          }
          _fixTitle() {
            const title = this._element.getAttribute("title");
            const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
            if (title || originalTitleType !== "string") {
              this._element.setAttribute("data-bs-original-title", title || "");
              if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
                this._element.setAttribute("aria-label", title);
              }
              this._element.setAttribute("title", "");
            }
          }
          _enter(event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
              context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            }
            if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
              context._hoverState = HOVER_STATE_SHOW;
              return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_SHOW;
            if (!context._config.delay || !context._config.delay.show) {
              context.show();
              return;
            }
            context._timeout = setTimeout(() => {
              if (context._hoverState === HOVER_STATE_SHOW) {
                context.show();
              }
            }, context._config.delay.show);
          }
          _leave(event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
              context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            }
            if (context._isWithActiveTrigger()) {
              return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_OUT;
            if (!context._config.delay || !context._config.delay.hide) {
              context.hide();
              return;
            }
            context._timeout = setTimeout(() => {
              if (context._hoverState === HOVER_STATE_OUT) {
                context.hide();
              }
            }, context._config.delay.hide);
          }
          _isWithActiveTrigger() {
            for (const trigger in this._activeTrigger) {
              if (this._activeTrigger[trigger]) {
                return true;
              }
            }
            return false;
          }
          _getConfig(config) {
            const dataAttributes = Manipulator.getDataAttributes(this._element);
            Object.keys(dataAttributes).forEach((dataAttr) => {
              if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
                delete dataAttributes[dataAttr];
              }
            });
            config = {
              ...this.constructor.Default,
              ...dataAttributes,
              ...typeof config === "object" && config ? config : {}
            };
            config.container = config.container === false ? document.body : getElement(config.container);
            if (typeof config.delay === "number") {
              config.delay = {
                show: config.delay,
                hide: config.delay
              };
            }
            if (typeof config.title === "number") {
              config.title = config.title.toString();
            }
            if (typeof config.content === "number") {
              config.content = config.content.toString();
            }
            typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
            if (config.sanitize) {
              config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
            }
            return config;
          }
          _getDelegateConfig() {
            const config = {};
            for (const key in this._config) {
              if (this.constructor.Default[key] !== this._config[key]) {
                config[key] = this._config[key];
              }
            }
            return config;
          }
          _cleanTipClass() {
            const tip = this.getTipElement();
            const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
            const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
            if (tabClass !== null && tabClass.length > 0) {
              tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
            }
          }
          _getBasicClassPrefix() {
            return CLASS_PREFIX$1;
          }
          _handlePopperPlacementChange(popperData) {
            const {
              state
            } = popperData;
            if (!state) {
              return;
            }
            this.tip = state.elements.popper;
            this._cleanTipClass();
            this._addAttachmentClass(this._getAttachment(state.placement));
          }
          _disposePopper() {
            if (this._popper) {
              this._popper.destroy();
              this._popper = null;
            }
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Tooltip.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        defineJQueryPlugin(Tooltip);
        const NAME$3 = "popover";
        const DATA_KEY$3 = "bs.popover";
        const EVENT_KEY$3 = `.${DATA_KEY$3}`;
        const CLASS_PREFIX = "bs-popover";
        const Default$2 = {
          ...Tooltip.Default,
          placement: "right",
          offset: [0, 8],
          trigger: "click",
          content: "",
          template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        };
        const DefaultType$2 = {
          ...Tooltip.DefaultType,
          content: "(string|element|function)"
        };
        const Event$1 = {
          HIDE: `hide${EVENT_KEY$3}`,
          HIDDEN: `hidden${EVENT_KEY$3}`,
          SHOW: `show${EVENT_KEY$3}`,
          SHOWN: `shown${EVENT_KEY$3}`,
          INSERTED: `inserted${EVENT_KEY$3}`,
          CLICK: `click${EVENT_KEY$3}`,
          FOCUSIN: `focusin${EVENT_KEY$3}`,
          FOCUSOUT: `focusout${EVENT_KEY$3}`,
          MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
          MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
        };
        const SELECTOR_TITLE = ".popover-header";
        const SELECTOR_CONTENT = ".popover-body";
        class Popover extends Tooltip {
          static get Default() {
            return Default$2;
          }
          static get NAME() {
            return NAME$3;
          }
          static get Event() {
            return Event$1;
          }
          static get DefaultType() {
            return DefaultType$2;
          }
          isWithContent() {
            return this.getTitle() || this._getContent();
          }
          setContent(tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
            this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
          }
          _getContent() {
            return this._resolvePossibleFunction(this._config.content);
          }
          _getBasicClassPrefix() {
            return CLASS_PREFIX;
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Popover.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        defineJQueryPlugin(Popover);
        const NAME$2 = "scrollspy";
        const DATA_KEY$2 = "bs.scrollspy";
        const EVENT_KEY$2 = `.${DATA_KEY$2}`;
        const DATA_API_KEY$1 = ".data-api";
        const Default$1 = {
          offset: 10,
          method: "auto",
          target: ""
        };
        const DefaultType$1 = {
          offset: "number",
          method: "string",
          target: "(string|element)"
        };
        const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
        const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
        const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
        const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
        const CLASS_NAME_ACTIVE$1 = "active";
        const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
        const SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group";
        const SELECTOR_NAV_LINKS = ".nav-link";
        const SELECTOR_NAV_ITEMS = ".nav-item";
        const SELECTOR_LIST_ITEMS = ".list-group-item";
        const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
        const SELECTOR_DROPDOWN$1 = ".dropdown";
        const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
        const METHOD_OFFSET = "offset";
        const METHOD_POSITION = "position";
        class ScrollSpy extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._scrollElement = this._element.tagName === "BODY" ? window : this._element;
            this._config = this._getConfig(config);
            this._offsets = [];
            this._targets = [];
            this._activeTarget = null;
            this._scrollHeight = 0;
            EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
            this.refresh();
            this._process();
          }
          static get Default() {
            return Default$1;
          }
          static get NAME() {
            return NAME$2;
          }
          refresh() {
            const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
            const offsetMethod = this._config.method === "auto" ? autoMethod : this._config.method;
            const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = this._getScrollHeight();
            const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
            targets.map((element) => {
              const targetSelector = getSelectorFromElement(element);
              const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
              if (target) {
                const targetBCR = target.getBoundingClientRect();
                if (targetBCR.width || targetBCR.height) {
                  return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
                }
              }
              return null;
            }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
              this._offsets.push(item[0]);
              this._targets.push(item[1]);
            });
          }
          dispose() {
            EventHandler.off(this._scrollElement, EVENT_KEY$2);
            super.dispose();
          }
          _getConfig(config) {
            config = {
              ...Default$1,
              ...Manipulator.getDataAttributes(this._element),
              ...typeof config === "object" && config ? config : {}
            };
            config.target = getElement(config.target) || document.documentElement;
            typeCheckConfig(NAME$2, config, DefaultType$1);
            return config;
          }
          _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
          }
          _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          }
          _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
          }
          _process() {
            const scrollTop = this._getScrollTop() + this._config.offset;
            const scrollHeight = this._getScrollHeight();
            const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
            if (this._scrollHeight !== scrollHeight) {
              this.refresh();
            }
            if (scrollTop >= maxScroll) {
              const target = this._targets[this._targets.length - 1];
              if (this._activeTarget !== target) {
                this._activate(target);
              }
              return;
            }
            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
              this._activeTarget = null;
              this._clear();
              return;
            }
            for (let i = this._offsets.length; i--; ) {
              const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);
              if (isActiveTarget) {
                this._activate(this._targets[i]);
              }
            }
          }
          _activate(target) {
            this._activeTarget = target;
            this._clear();
            const queries = SELECTOR_LINK_ITEMS.split(",").map((selector) => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
            const link = SelectorEngine.findOne(queries.join(","), this._config.target);
            link.classList.add(CLASS_NAME_ACTIVE$1);
            if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
              SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
            } else {
              SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach((listGroup) => {
                SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
                SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach((navItem) => {
                  SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
                });
              });
            }
            EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
              relatedTarget: target
            });
          }
          _clear() {
            SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter((node) => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach((node) => node.classList.remove(CLASS_NAME_ACTIVE$1));
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = ScrollSpy.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            });
          }
        }
        EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
          SelectorEngine.find(SELECTOR_DATA_SPY).forEach((spy) => new ScrollSpy(spy));
        });
        defineJQueryPlugin(ScrollSpy);
        const NAME$1 = "tab";
        const DATA_KEY$1 = "bs.tab";
        const EVENT_KEY$1 = `.${DATA_KEY$1}`;
        const DATA_API_KEY = ".data-api";
        const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
        const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
        const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
        const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
        const CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
        const CLASS_NAME_ACTIVE = "active";
        const CLASS_NAME_FADE$1 = "fade";
        const CLASS_NAME_SHOW$1 = "show";
        const SELECTOR_DROPDOWN = ".dropdown";
        const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
        const SELECTOR_ACTIVE = ".active";
        const SELECTOR_ACTIVE_UL = ":scope > li > .active";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
        const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
        const SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active";
        class Tab extends BaseComponent {
          static get NAME() {
            return NAME$1;
          }
          show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              return;
            }
            let previous;
            const target = getElementFromSelector(this._element);
            const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
            if (listElement) {
              const itemSelector = listElement.nodeName === "UL" || listElement.nodeName === "OL" ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
              previous = SelectorEngine.find(itemSelector, listElement);
              previous = previous[previous.length - 1];
            }
            const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
              relatedTarget: this._element
            }) : null;
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
              relatedTarget: previous
            });
            if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
              return;
            }
            this._activate(this._element, listElement);
            const complete = () => {
              EventHandler.trigger(previous, EVENT_HIDDEN$1, {
                relatedTarget: this._element
              });
              EventHandler.trigger(this._element, EVENT_SHOWN$1, {
                relatedTarget: previous
              });
            };
            if (target) {
              this._activate(target, target.parentNode, complete);
            } else {
              complete();
            }
          }
          _activate(element, container, callback) {
            const activeElements = container && (container.nodeName === "UL" || container.nodeName === "OL") ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
            const active = activeElements[0];
            const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
            const complete = () => this._transitionComplete(element, active, callback);
            if (active && isTransitioning) {
              active.classList.remove(CLASS_NAME_SHOW$1);
              this._queueCallback(complete, element, true);
            } else {
              complete();
            }
          }
          _transitionComplete(element, active, callback) {
            if (active) {
              active.classList.remove(CLASS_NAME_ACTIVE);
              const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
              if (dropdownChild) {
                dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
              }
              if (active.getAttribute("role") === "tab") {
                active.setAttribute("aria-selected", false);
              }
            }
            element.classList.add(CLASS_NAME_ACTIVE);
            if (element.getAttribute("role") === "tab") {
              element.setAttribute("aria-selected", true);
            }
            reflow(element);
            if (element.classList.contains(CLASS_NAME_FADE$1)) {
              element.classList.add(CLASS_NAME_SHOW$1);
            }
            let parent = element.parentNode;
            if (parent && parent.nodeName === "LI") {
              parent = parent.parentNode;
            }
            if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
              const dropdownElement = element.closest(SELECTOR_DROPDOWN);
              if (dropdownElement) {
                SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) => dropdown.classList.add(CLASS_NAME_ACTIVE));
              }
              element.setAttribute("aria-expanded", true);
            }
            if (callback) {
              callback();
            }
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Tab.getOrCreateInstance(this);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const data = Tab.getOrCreateInstance(this);
          data.show();
        });
        defineJQueryPlugin(Tab);
        const NAME = "toast";
        const DATA_KEY = "bs.toast";
        const EVENT_KEY = `.${DATA_KEY}`;
        const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
        const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
        const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
        const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_HIDE = "hide";
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_SHOWING = "showing";
        const DefaultType = {
          animation: "boolean",
          autohide: "boolean",
          delay: "number"
        };
        const Default = {
          animation: true,
          autohide: true,
          delay: 5e3
        };
        class Toast extends BaseComponent {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._timeout = null;
            this._hasMouseInteraction = false;
            this._hasKeyboardInteraction = false;
            this._setListeners();
          }
          static get DefaultType() {
            return DefaultType;
          }
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          show() {
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
            if (showEvent.defaultPrevented) {
              return;
            }
            this._clearTimeout();
            if (this._config.animation) {
              this._element.classList.add(CLASS_NAME_FADE);
            }
            const complete = () => {
              this._element.classList.remove(CLASS_NAME_SHOWING);
              EventHandler.trigger(this._element, EVENT_SHOWN);
              this._maybeScheduleHide();
            };
            this._element.classList.remove(CLASS_NAME_HIDE);
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW);
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
          }
          hide() {
            if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
              return;
            }
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            const complete = () => {
              this._element.classList.add(CLASS_NAME_HIDE);
              this._element.classList.remove(CLASS_NAME_SHOWING);
              this._element.classList.remove(CLASS_NAME_SHOW);
              EventHandler.trigger(this._element, EVENT_HIDDEN);
            };
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
          }
          dispose() {
            this._clearTimeout();
            if (this._element.classList.contains(CLASS_NAME_SHOW)) {
              this._element.classList.remove(CLASS_NAME_SHOW);
            }
            super.dispose();
          }
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator.getDataAttributes(this._element),
              ...typeof config === "object" && config ? config : {}
            };
            typeCheckConfig(NAME, config, this.constructor.DefaultType);
            return config;
          }
          _maybeScheduleHide() {
            if (!this._config.autohide) {
              return;
            }
            if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
              return;
            }
            this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay);
          }
          _onInteraction(event, isInteracting) {
            switch (event.type) {
              case "mouseover":
              case "mouseout":
                this._hasMouseInteraction = isInteracting;
                break;
              case "focusin":
              case "focusout":
                this._hasKeyboardInteraction = isInteracting;
                break;
            }
            if (isInteracting) {
              this._clearTimeout();
              return;
            }
            const nextElement = event.relatedTarget;
            if (this._element === nextElement || this._element.contains(nextElement)) {
              return;
            }
            this._maybeScheduleHide();
          }
          _setListeners() {
            EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
            EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
            EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
            EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
          }
          _clearTimeout() {
            clearTimeout(this._timeout);
            this._timeout = null;
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Toast.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config](this);
              }
            });
          }
        }
        enableDismissTrigger(Toast);
        defineJQueryPlugin(Toast);
        const index_umd = {
          Alert,
          Button,
          Carousel,
          Collapse,
          Dropdown,
          Modal,
          Offcanvas,
          Popover,
          ScrollSpy,
          Tab,
          Toast,
          Tooltip
        };
        return index_umd;
      });
    }
  });

  // node_modules/feather-icons/dist/feather.js
  var require_feather = __commonJS({
    "node_modules/feather-icons/dist/feather.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["feather"] = factory();
        else
          root["feather"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              i: moduleId,
              l: false,
              exports: {}
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, {
                configurable: false,
                enumerable: true,
                get: getter
              });
            }
          };
          __webpack_require__.r = function(exports2) {
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? function getDefault() {
              return module2["default"];
            } : function getModuleExports() {
              return module2;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 0);
        }({
          "./dist/icons.json": function(module2) {
            module2.exports = { "activity": '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', "airplay": '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>', "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', "align-center": '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>', "align-justify": '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>', "align-left": '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>', "align-right": '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>', "anchor": '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>', "aperture": '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>', "archive": '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>', "arrow-down-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>', "arrow-down-left": '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>', "arrow-down-right": '<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>', "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>', "arrow-left-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>', "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', "arrow-right-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>', "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>', "arrow-up-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>', "arrow-up-left": '<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>', "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>', "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>', "at-sign": '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>', "award": '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>', "bar-chart-2": '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>', "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>', "battery-charging": '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>', "battery": '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>', "bell-off": '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "bell": '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>', "bluetooth": '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>', "bold": '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>', "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>', "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', "bookmark": '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>', "box": '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', "briefcase": '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>', "calendar": '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', "camera-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>', "camera": '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>', "cast": '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>', "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', "check-square": '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>', "check": '<polyline points="20 6 9 17 4 12"></polyline>', "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>', "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>', "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>', "chevron-up": '<polyline points="18 15 12 9 6 15"></polyline>', "chevrons-down": '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>', "chevrons-left": '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>', "chevrons-right": '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>', "chevrons-up": '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>', "chrome": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>', "circle": '<circle cx="12" cy="12" r="10"></circle>', "clipboard": '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>', "clock": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', "cloud-drizzle": '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-lightning": '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>', "cloud-off": '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "cloud-rain": '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-snow": '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>', "cloud": '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>', "code": '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>', "codepen": '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>', "codesandbox": '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', "coffee": '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>', "columns": '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>', "command": '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>', "compass": '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>', "copy": '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>', "corner-down-left": '<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>', "corner-down-right": '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>', "corner-left-down": '<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>', "corner-left-up": '<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>', "corner-right-down": '<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>', "corner-right-up": '<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>', "corner-up-left": '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>', "corner-up-right": '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>', "cpu": '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>', "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>', "crop": '<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>', "crosshair": '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>', "database": '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>', "delete": '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>', "disc": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>', "divide-circle": '<line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><circle cx="12" cy="12" r="10"></circle>', "divide-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line>', "divide": '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>', "dollar-sign": '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>', "download-cloud": '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>', "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>', "dribbble": '<circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>', "droplet": '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>', "edit-2": '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>', "edit-3": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>', "edit": '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>', "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>', "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "eye": '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>', "facebook": '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>', "fast-forward": '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>', "feather": '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>', "figma": '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>', "file-minus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>', "file-plus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>', "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', "file": '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>', "film": '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>', "filter": '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>', "flag": '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>', "folder-minus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>', "folder-plus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>', "folder": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>', "framer": '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>', "frown": '<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', "gift": '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>', "git-branch": '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>', "git-commit": '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>', "git-merge": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>', "git-pull-request": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>', "github": '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>', "gitlab": '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>', "globe": '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>', "grid": '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>', "hard-drive": '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>', "hash": '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>', "headphones": '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>', "heart": '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>', "help-circle": '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>', "hexagon": '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>', "home": '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', "image": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>', "inbox": '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>', "info": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', "instagram": '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>', "italic": '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>', "key": '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>', "layers": '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', "layout": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>', "life-buoy": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>', "link-2": '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>', "link": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>', "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>', "list": '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>', "loader": '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>', "lock": '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>', "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>', "mail": '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>', "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>', "map": '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>', "maximize-2": '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>', "maximize": '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>', "meh": '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', "menu": '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>', "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>', "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', "mic-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', "mic": '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', "minimize-2": '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>', "minimize": '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>', "minus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>', "minus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>', "minus": '<line x1="5" y1="12" x2="19" y2="12"></line>', "monitor": '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>', "moon": '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>', "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>', "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>', "mouse-pointer": '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>', "move": '<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>', "music": '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>', "navigation-2": '<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>', "navigation": '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>', "octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>', "package": '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', "paperclip": '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>', "pause-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>', "pause": '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>', "pen-tool": '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>', "percent": '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>', "phone-call": '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-forwarded": '<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-incoming": '<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-missed": '<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-off": '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>', "phone-outgoing": '<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "pie-chart": '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>', "play-circle": '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>', "play": '<polygon points="5 3 19 12 5 21 5 3"></polygon>', "plus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', "plus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', "plus": '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>', "pocket": '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>', "power": '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>', "printer": '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>', "radio": '<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>', "refresh-ccw": '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>', "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', "repeat": '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>', "rewind": '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>', "rotate-ccw": '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>', "rotate-cw": '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>', "rss": '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>', "save": '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>', "scissors": '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>', "search": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>', "send": '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>', "server": '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>', "settings": '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>', "share-2": '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>', "share": '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>', "shield-off": '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>', "shopping-cart": '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>', "shuffle": '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>', "sidebar": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>', "skip-back": '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>', "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>', "slack": '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>', "slash": '<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>', "sliders": '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>', "smartphone": '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', "smile": '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', "speaker": '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>', "square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>', "star": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>', "stop-circle": '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>', "sun": '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>', "sunrise": '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>', "sunset": '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>', "tablet": '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', "tag": '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>', "target": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>', "terminal": '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>', "thermometer": '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>', "thumbs-down": '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>', "thumbs-up": '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>', "toggle-left": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>', "toggle-right": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>', "tool": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>', "trash-2": '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>', "trash": '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', "trello": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>', "trending-down": '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>', "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>', "triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>', "truck": '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>', "tv": '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>', "twitch": '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>', "twitter": '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>', "type": '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>', "umbrella": '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>', "underline": '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>', "unlock": '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>', "upload-cloud": '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>', "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>', "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>', "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>', "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>', "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>', "user": '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', "users": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', "video-off": '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "video": '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>', "voicemail": '<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>', "volume-1": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-2": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>', "volume": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>', "watch": '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>', "wifi-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', "wifi": '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', "wind": '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>', "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>', "x": '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', "youtube": '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>', "zap-off": '<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>', "zap": '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', "zoom-in": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>', "zoom-out": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>' };
          },
          "./node_modules/classnames/dedupe.js": function(module2, exports2, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function() {
              "use strict";
              var classNames = function() {
                function StorageObject() {
                }
                StorageObject.prototype = Object.create(null);
                function _parseArray(resultSet, array) {
                  var length = array.length;
                  for (var i = 0; i < length; ++i) {
                    _parse(resultSet, array[i]);
                  }
                }
                var hasOwn = {}.hasOwnProperty;
                function _parseNumber(resultSet, num) {
                  resultSet[num] = true;
                }
                function _parseObject(resultSet, object) {
                  for (var k in object) {
                    if (hasOwn.call(object, k)) {
                      resultSet[k] = !!object[k];
                    }
                  }
                }
                var SPACE = /\s+/;
                function _parseString(resultSet, str) {
                  var array = str.split(SPACE);
                  var length = array.length;
                  for (var i = 0; i < length; ++i) {
                    resultSet[array[i]] = true;
                  }
                }
                function _parse(resultSet, arg) {
                  if (!arg)
                    return;
                  var argType = typeof arg;
                  if (argType === "string") {
                    _parseString(resultSet, arg);
                  } else if (Array.isArray(arg)) {
                    _parseArray(resultSet, arg);
                  } else if (argType === "object") {
                    _parseObject(resultSet, arg);
                  } else if (argType === "number") {
                    _parseNumber(resultSet, arg);
                  }
                }
                function _classNames() {
                  var len = arguments.length;
                  var args = Array(len);
                  for (var i = 0; i < len; i++) {
                    args[i] = arguments[i];
                  }
                  var classSet = new StorageObject();
                  _parseArray(classSet, args);
                  var list = [];
                  for (var k in classSet) {
                    if (classSet[k]) {
                      list.push(k);
                    }
                  }
                  return list.join(" ");
                }
                return _classNames;
              }();
              if (typeof module2 !== "undefined" && module2.exports) {
                module2.exports = classNames;
              } else if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                  return classNames;
                }.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
              } else {
              }
            })();
          },
          "./node_modules/core-js/es/array/from.js": function(module2, exports2, __webpack_require__) {
            __webpack_require__("./node_modules/core-js/modules/es.string.iterator.js");
            __webpack_require__("./node_modules/core-js/modules/es.array.from.js");
            var path = __webpack_require__("./node_modules/core-js/internals/path.js");
            module2.exports = path.Array.from;
          },
          "./node_modules/core-js/internals/a-function.js": function(module2, exports2) {
            module2.exports = function(it) {
              if (typeof it != "function") {
                throw TypeError(String(it) + " is not a function");
              }
              return it;
            };
          },
          "./node_modules/core-js/internals/an-object.js": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("./node_modules/core-js/internals/is-object.js");
            module2.exports = function(it) {
              if (!isObject(it)) {
                throw TypeError(String(it) + " is not an object");
              }
              return it;
            };
          },
          "./node_modules/core-js/internals/array-from.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var bind = __webpack_require__("./node_modules/core-js/internals/bind-context.js");
            var toObject = __webpack_require__("./node_modules/core-js/internals/to-object.js");
            var callWithSafeIterationClosing = __webpack_require__("./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
            var isArrayIteratorMethod = __webpack_require__("./node_modules/core-js/internals/is-array-iterator-method.js");
            var toLength = __webpack_require__("./node_modules/core-js/internals/to-length.js");
            var createProperty = __webpack_require__("./node_modules/core-js/internals/create-property.js");
            var getIteratorMethod = __webpack_require__("./node_modules/core-js/internals/get-iterator-method.js");
            module2.exports = function from(arrayLike) {
              var O = toObject(arrayLike);
              var C = typeof this == "function" ? this : Array;
              var argumentsLength = arguments.length;
              var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
              var mapping = mapfn !== void 0;
              var index = 0;
              var iteratorMethod = getIteratorMethod(O);
              var length, result, step, iterator;
              if (mapping)
                mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
              if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
                iterator = iteratorMethod.call(O);
                result = new C();
                for (; !(step = iterator.next()).done; index++) {
                  createProperty(result, index, mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value);
                }
              } else {
                length = toLength(O.length);
                result = new C(length);
                for (; length > index; index++) {
                  createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
                }
              }
              result.length = index;
              return result;
            };
          },
          "./node_modules/core-js/internals/array-includes.js": function(module2, exports2, __webpack_require__) {
            var toIndexedObject = __webpack_require__("./node_modules/core-js/internals/to-indexed-object.js");
            var toLength = __webpack_require__("./node_modules/core-js/internals/to-length.js");
            var toAbsoluteIndex = __webpack_require__("./node_modules/core-js/internals/to-absolute-index.js");
            module2.exports = function(IS_INCLUDES) {
              return function($this, el, fromIndex) {
                var O = toIndexedObject($this);
                var length = toLength(O.length);
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                if (IS_INCLUDES && el != el)
                  while (length > index) {
                    value = O[index++];
                    if (value != value)
                      return true;
                  }
                else
                  for (; length > index; index++)
                    if (IS_INCLUDES || index in O) {
                      if (O[index] === el)
                        return IS_INCLUDES || index || 0;
                    }
                return !IS_INCLUDES && -1;
              };
            };
          },
          "./node_modules/core-js/internals/bind-context.js": function(module2, exports2, __webpack_require__) {
            var aFunction = __webpack_require__("./node_modules/core-js/internals/a-function.js");
            module2.exports = function(fn, that, length) {
              aFunction(fn);
              if (that === void 0)
                return fn;
              switch (length) {
                case 0:
                  return function() {
                    return fn.call(that);
                  };
                case 1:
                  return function(a) {
                    return fn.call(that, a);
                  };
                case 2:
                  return function(a, b) {
                    return fn.call(that, a, b);
                  };
                case 3:
                  return function(a, b, c) {
                    return fn.call(that, a, b, c);
                  };
              }
              return function() {
                return fn.apply(that, arguments);
              };
            };
          },
          "./node_modules/core-js/internals/call-with-safe-iteration-closing.js": function(module2, exports2, __webpack_require__) {
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            module2.exports = function(iterator, fn, value, ENTRIES) {
              try {
                return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
              } catch (error) {
                var returnMethod = iterator["return"];
                if (returnMethod !== void 0)
                  anObject(returnMethod.call(iterator));
                throw error;
              }
            };
          },
          "./node_modules/core-js/internals/check-correctness-of-iteration.js": function(module2, exports2, __webpack_require__) {
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var ITERATOR = wellKnownSymbol("iterator");
            var SAFE_CLOSING = false;
            try {
              var called = 0;
              var iteratorWithReturn = {
                next: function() {
                  return { done: !!called++ };
                },
                "return": function() {
                  SAFE_CLOSING = true;
                }
              };
              iteratorWithReturn[ITERATOR] = function() {
                return this;
              };
              Array.from(iteratorWithReturn, function() {
                throw 2;
              });
            } catch (error) {
            }
            module2.exports = function(exec, SKIP_CLOSING) {
              if (!SKIP_CLOSING && !SAFE_CLOSING)
                return false;
              var ITERATION_SUPPORT = false;
              try {
                var object = {};
                object[ITERATOR] = function() {
                  return {
                    next: function() {
                      return { done: ITERATION_SUPPORT = true };
                    }
                  };
                };
                exec(object);
              } catch (error) {
              }
              return ITERATION_SUPPORT;
            };
          },
          "./node_modules/core-js/internals/classof-raw.js": function(module2, exports2) {
            var toString = {}.toString;
            module2.exports = function(it) {
              return toString.call(it).slice(8, -1);
            };
          },
          "./node_modules/core-js/internals/classof.js": function(module2, exports2, __webpack_require__) {
            var classofRaw = __webpack_require__("./node_modules/core-js/internals/classof-raw.js");
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var TO_STRING_TAG = wellKnownSymbol("toStringTag");
            var CORRECT_ARGUMENTS = classofRaw(function() {
              return arguments;
            }()) == "Arguments";
            var tryGet = function(it, key) {
              try {
                return it[key];
              } catch (error) {
              }
            };
            module2.exports = function(it) {
              var O, tag, result;
              return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
            };
          },
          "./node_modules/core-js/internals/copy-constructor-properties.js": function(module2, exports2, __webpack_require__) {
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var ownKeys = __webpack_require__("./node_modules/core-js/internals/own-keys.js");
            var getOwnPropertyDescriptorModule = __webpack_require__("./node_modules/core-js/internals/object-get-own-property-descriptor.js");
            var definePropertyModule = __webpack_require__("./node_modules/core-js/internals/object-define-property.js");
            module2.exports = function(target, source) {
              var keys = ownKeys(source);
              var defineProperty = definePropertyModule.f;
              var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (!has(target, key))
                  defineProperty(target, key, getOwnPropertyDescriptor(source, key));
              }
            };
          },
          "./node_modules/core-js/internals/correct-prototype-getter.js": function(module2, exports2, __webpack_require__) {
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            module2.exports = !fails(function() {
              function F() {
              }
              F.prototype.constructor = null;
              return Object.getPrototypeOf(new F()) !== F.prototype;
            });
          },
          "./node_modules/core-js/internals/create-iterator-constructor.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var IteratorPrototype = __webpack_require__("./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
            var create = __webpack_require__("./node_modules/core-js/internals/object-create.js");
            var createPropertyDescriptor = __webpack_require__("./node_modules/core-js/internals/create-property-descriptor.js");
            var setToStringTag = __webpack_require__("./node_modules/core-js/internals/set-to-string-tag.js");
            var Iterators = __webpack_require__("./node_modules/core-js/internals/iterators.js");
            var returnThis = function() {
              return this;
            };
            module2.exports = function(IteratorConstructor, NAME, next) {
              var TO_STRING_TAG = NAME + " Iterator";
              IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
              setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
              Iterators[TO_STRING_TAG] = returnThis;
              return IteratorConstructor;
            };
          },
          "./node_modules/core-js/internals/create-property-descriptor.js": function(module2, exports2) {
            module2.exports = function(bitmap, value) {
              return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value
              };
            };
          },
          "./node_modules/core-js/internals/create-property.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var toPrimitive = __webpack_require__("./node_modules/core-js/internals/to-primitive.js");
            var definePropertyModule = __webpack_require__("./node_modules/core-js/internals/object-define-property.js");
            var createPropertyDescriptor = __webpack_require__("./node_modules/core-js/internals/create-property-descriptor.js");
            module2.exports = function(object, key, value) {
              var propertyKey = toPrimitive(key);
              if (propertyKey in object)
                definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
              else
                object[propertyKey] = value;
            };
          },
          "./node_modules/core-js/internals/define-iterator.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var $ = __webpack_require__("./node_modules/core-js/internals/export.js");
            var createIteratorConstructor = __webpack_require__("./node_modules/core-js/internals/create-iterator-constructor.js");
            var getPrototypeOf = __webpack_require__("./node_modules/core-js/internals/object-get-prototype-of.js");
            var setPrototypeOf = __webpack_require__("./node_modules/core-js/internals/object-set-prototype-of.js");
            var setToStringTag = __webpack_require__("./node_modules/core-js/internals/set-to-string-tag.js");
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            var redefine = __webpack_require__("./node_modules/core-js/internals/redefine.js");
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var IS_PURE = __webpack_require__("./node_modules/core-js/internals/is-pure.js");
            var Iterators = __webpack_require__("./node_modules/core-js/internals/iterators.js");
            var IteratorsCore = __webpack_require__("./node_modules/core-js/internals/iterators-core.js");
            var IteratorPrototype = IteratorsCore.IteratorPrototype;
            var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
            var ITERATOR = wellKnownSymbol("iterator");
            var KEYS = "keys";
            var VALUES = "values";
            var ENTRIES = "entries";
            var returnThis = function() {
              return this;
            };
            module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
              createIteratorConstructor(IteratorConstructor, NAME, next);
              var getIterationMethod = function(KIND) {
                if (KIND === DEFAULT && defaultIterator)
                  return defaultIterator;
                if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
                  return IterablePrototype[KIND];
                switch (KIND) {
                  case KEYS:
                    return function keys() {
                      return new IteratorConstructor(this, KIND);
                    };
                  case VALUES:
                    return function values() {
                      return new IteratorConstructor(this, KIND);
                    };
                  case ENTRIES:
                    return function entries() {
                      return new IteratorConstructor(this, KIND);
                    };
                }
                return function() {
                  return new IteratorConstructor(this);
                };
              };
              var TO_STRING_TAG = NAME + " Iterator";
              var INCORRECT_VALUES_NAME = false;
              var IterablePrototype = Iterable.prototype;
              var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
              var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
              var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
              var CurrentIteratorPrototype, methods, KEY;
              if (anyNativeIterator) {
                CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
                if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                  if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                    if (setPrototypeOf) {
                      setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                    } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                      hide(CurrentIteratorPrototype, ITERATOR, returnThis);
                    }
                  }
                  setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                  if (IS_PURE)
                    Iterators[TO_STRING_TAG] = returnThis;
                }
              }
              if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                INCORRECT_VALUES_NAME = true;
                defaultIterator = function values() {
                  return nativeIterator.call(this);
                };
              }
              if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                hide(IterablePrototype, ITERATOR, defaultIterator);
              }
              Iterators[NAME] = defaultIterator;
              if (DEFAULT) {
                methods = {
                  values: getIterationMethod(VALUES),
                  keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                  entries: getIterationMethod(ENTRIES)
                };
                if (FORCED)
                  for (KEY in methods) {
                    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                      redefine(IterablePrototype, KEY, methods[KEY]);
                    }
                  }
                else
                  $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
              }
              return methods;
            };
          },
          "./node_modules/core-js/internals/descriptors.js": function(module2, exports2, __webpack_require__) {
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            module2.exports = !fails(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          },
          "./node_modules/core-js/internals/document-create-element.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var isObject = __webpack_require__("./node_modules/core-js/internals/is-object.js");
            var document2 = global.document;
            var exist = isObject(document2) && isObject(document2.createElement);
            module2.exports = function(it) {
              return exist ? document2.createElement(it) : {};
            };
          },
          "./node_modules/core-js/internals/enum-bug-keys.js": function(module2, exports2) {
            module2.exports = [
              "constructor",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "toLocaleString",
              "toString",
              "valueOf"
            ];
          },
          "./node_modules/core-js/internals/export.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var getOwnPropertyDescriptor = __webpack_require__("./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            var redefine = __webpack_require__("./node_modules/core-js/internals/redefine.js");
            var setGlobal = __webpack_require__("./node_modules/core-js/internals/set-global.js");
            var copyConstructorProperties = __webpack_require__("./node_modules/core-js/internals/copy-constructor-properties.js");
            var isForced = __webpack_require__("./node_modules/core-js/internals/is-forced.js");
            module2.exports = function(options, source) {
              var TARGET = options.target;
              var GLOBAL = options.global;
              var STATIC = options.stat;
              var FORCED, target, key, targetProperty, sourceProperty, descriptor;
              if (GLOBAL) {
                target = global;
              } else if (STATIC) {
                target = global[TARGET] || setGlobal(TARGET, {});
              } else {
                target = (global[TARGET] || {}).prototype;
              }
              if (target)
                for (key in source) {
                  sourceProperty = source[key];
                  if (options.noTargetGet) {
                    descriptor = getOwnPropertyDescriptor(target, key);
                    targetProperty = descriptor && descriptor.value;
                  } else
                    targetProperty = target[key];
                  FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                  if (!FORCED && targetProperty !== void 0) {
                    if (typeof sourceProperty === typeof targetProperty)
                      continue;
                    copyConstructorProperties(sourceProperty, targetProperty);
                  }
                  if (options.sham || targetProperty && targetProperty.sham) {
                    hide(sourceProperty, "sham", true);
                  }
                  redefine(target, key, sourceProperty, options);
                }
            };
          },
          "./node_modules/core-js/internals/fails.js": function(module2, exports2) {
            module2.exports = function(exec) {
              try {
                return !!exec();
              } catch (error) {
                return true;
              }
            };
          },
          "./node_modules/core-js/internals/function-to-string.js": function(module2, exports2, __webpack_require__) {
            var shared = __webpack_require__("./node_modules/core-js/internals/shared.js");
            module2.exports = shared("native-function-to-string", Function.toString);
          },
          "./node_modules/core-js/internals/get-iterator-method.js": function(module2, exports2, __webpack_require__) {
            var classof = __webpack_require__("./node_modules/core-js/internals/classof.js");
            var Iterators = __webpack_require__("./node_modules/core-js/internals/iterators.js");
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var ITERATOR = wellKnownSymbol("iterator");
            module2.exports = function(it) {
              if (it != void 0)
                return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
            };
          },
          "./node_modules/core-js/internals/global.js": function(module2, exports2, __webpack_require__) {
            (function(global) {
              var O = "object";
              var check = function(it) {
                return it && it.Math == Math && it;
              };
              module2.exports = check(typeof globalThis == O && globalThis) || check(typeof window == O && window) || check(typeof self == O && self) || check(typeof global == O && global) || Function("return this")();
            }).call(this, __webpack_require__("./node_modules/webpack/buildin/global.js"));
          },
          "./node_modules/core-js/internals/has.js": function(module2, exports2) {
            var hasOwnProperty = {}.hasOwnProperty;
            module2.exports = function(it, key) {
              return hasOwnProperty.call(it, key);
            };
          },
          "./node_modules/core-js/internals/hidden-keys.js": function(module2, exports2) {
            module2.exports = {};
          },
          "./node_modules/core-js/internals/hide.js": function(module2, exports2, __webpack_require__) {
            var DESCRIPTORS = __webpack_require__("./node_modules/core-js/internals/descriptors.js");
            var definePropertyModule = __webpack_require__("./node_modules/core-js/internals/object-define-property.js");
            var createPropertyDescriptor = __webpack_require__("./node_modules/core-js/internals/create-property-descriptor.js");
            module2.exports = DESCRIPTORS ? function(object, key, value) {
              return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
            } : function(object, key, value) {
              object[key] = value;
              return object;
            };
          },
          "./node_modules/core-js/internals/html.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var document2 = global.document;
            module2.exports = document2 && document2.documentElement;
          },
          "./node_modules/core-js/internals/ie8-dom-define.js": function(module2, exports2, __webpack_require__) {
            var DESCRIPTORS = __webpack_require__("./node_modules/core-js/internals/descriptors.js");
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            var createElement = __webpack_require__("./node_modules/core-js/internals/document-create-element.js");
            module2.exports = !DESCRIPTORS && !fails(function() {
              return Object.defineProperty(createElement("div"), "a", {
                get: function() {
                  return 7;
                }
              }).a != 7;
            });
          },
          "./node_modules/core-js/internals/indexed-object.js": function(module2, exports2, __webpack_require__) {
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            var classof = __webpack_require__("./node_modules/core-js/internals/classof-raw.js");
            var split = "".split;
            module2.exports = fails(function() {
              return !Object("z").propertyIsEnumerable(0);
            }) ? function(it) {
              return classof(it) == "String" ? split.call(it, "") : Object(it);
            } : Object;
          },
          "./node_modules/core-js/internals/internal-state.js": function(module2, exports2, __webpack_require__) {
            var NATIVE_WEAK_MAP = __webpack_require__("./node_modules/core-js/internals/native-weak-map.js");
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var isObject = __webpack_require__("./node_modules/core-js/internals/is-object.js");
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            var objectHas = __webpack_require__("./node_modules/core-js/internals/has.js");
            var sharedKey = __webpack_require__("./node_modules/core-js/internals/shared-key.js");
            var hiddenKeys = __webpack_require__("./node_modules/core-js/internals/hidden-keys.js");
            var WeakMap = global.WeakMap;
            var set, get, has;
            var enforce = function(it) {
              return has(it) ? get(it) : set(it, {});
            };
            var getterFor = function(TYPE) {
              return function(it) {
                var state;
                if (!isObject(it) || (state = get(it)).type !== TYPE) {
                  throw TypeError("Incompatible receiver, " + TYPE + " required");
                }
                return state;
              };
            };
            if (NATIVE_WEAK_MAP) {
              var store = new WeakMap();
              var wmget = store.get;
              var wmhas = store.has;
              var wmset = store.set;
              set = function(it, metadata) {
                wmset.call(store, it, metadata);
                return metadata;
              };
              get = function(it) {
                return wmget.call(store, it) || {};
              };
              has = function(it) {
                return wmhas.call(store, it);
              };
            } else {
              var STATE = sharedKey("state");
              hiddenKeys[STATE] = true;
              set = function(it, metadata) {
                hide(it, STATE, metadata);
                return metadata;
              };
              get = function(it) {
                return objectHas(it, STATE) ? it[STATE] : {};
              };
              has = function(it) {
                return objectHas(it, STATE);
              };
            }
            module2.exports = {
              set,
              get,
              has,
              enforce,
              getterFor
            };
          },
          "./node_modules/core-js/internals/is-array-iterator-method.js": function(module2, exports2, __webpack_require__) {
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var Iterators = __webpack_require__("./node_modules/core-js/internals/iterators.js");
            var ITERATOR = wellKnownSymbol("iterator");
            var ArrayPrototype = Array.prototype;
            module2.exports = function(it) {
              return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
            };
          },
          "./node_modules/core-js/internals/is-forced.js": function(module2, exports2, __webpack_require__) {
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            var replacement = /#|\.prototype\./;
            var isForced = function(feature, detection) {
              var value = data[normalize(feature)];
              return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
            };
            var normalize = isForced.normalize = function(string) {
              return String(string).replace(replacement, ".").toLowerCase();
            };
            var data = isForced.data = {};
            var NATIVE = isForced.NATIVE = "N";
            var POLYFILL = isForced.POLYFILL = "P";
            module2.exports = isForced;
          },
          "./node_modules/core-js/internals/is-object.js": function(module2, exports2) {
            module2.exports = function(it) {
              return typeof it === "object" ? it !== null : typeof it === "function";
            };
          },
          "./node_modules/core-js/internals/is-pure.js": function(module2, exports2) {
            module2.exports = false;
          },
          "./node_modules/core-js/internals/iterators-core.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var getPrototypeOf = __webpack_require__("./node_modules/core-js/internals/object-get-prototype-of.js");
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var IS_PURE = __webpack_require__("./node_modules/core-js/internals/is-pure.js");
            var ITERATOR = wellKnownSymbol("iterator");
            var BUGGY_SAFARI_ITERATORS = false;
            var returnThis = function() {
              return this;
            };
            var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
            if ([].keys) {
              arrayIterator = [].keys();
              if (!("next" in arrayIterator))
                BUGGY_SAFARI_ITERATORS = true;
              else {
                PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
                  IteratorPrototype = PrototypeOfArrayIteratorPrototype;
              }
            }
            if (IteratorPrototype == void 0)
              IteratorPrototype = {};
            if (!IS_PURE && !has(IteratorPrototype, ITERATOR))
              hide(IteratorPrototype, ITERATOR, returnThis);
            module2.exports = {
              IteratorPrototype,
              BUGGY_SAFARI_ITERATORS
            };
          },
          "./node_modules/core-js/internals/iterators.js": function(module2, exports2) {
            module2.exports = {};
          },
          "./node_modules/core-js/internals/native-symbol.js": function(module2, exports2, __webpack_require__) {
            var fails = __webpack_require__("./node_modules/core-js/internals/fails.js");
            module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
              return !String(Symbol());
            });
          },
          "./node_modules/core-js/internals/native-weak-map.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var nativeFunctionToString = __webpack_require__("./node_modules/core-js/internals/function-to-string.js");
            var WeakMap = global.WeakMap;
            module2.exports = typeof WeakMap === "function" && /native code/.test(nativeFunctionToString.call(WeakMap));
          },
          "./node_modules/core-js/internals/object-create.js": function(module2, exports2, __webpack_require__) {
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            var defineProperties = __webpack_require__("./node_modules/core-js/internals/object-define-properties.js");
            var enumBugKeys = __webpack_require__("./node_modules/core-js/internals/enum-bug-keys.js");
            var hiddenKeys = __webpack_require__("./node_modules/core-js/internals/hidden-keys.js");
            var html = __webpack_require__("./node_modules/core-js/internals/html.js");
            var documentCreateElement = __webpack_require__("./node_modules/core-js/internals/document-create-element.js");
            var sharedKey = __webpack_require__("./node_modules/core-js/internals/shared-key.js");
            var IE_PROTO = sharedKey("IE_PROTO");
            var PROTOTYPE = "prototype";
            var Empty = function() {
            };
            var createDict = function() {
              var iframe = documentCreateElement("iframe");
              var length = enumBugKeys.length;
              var lt = "<";
              var script = "script";
              var gt = ">";
              var js = "java" + script + ":";
              var iframeDocument;
              iframe.style.display = "none";
              html.appendChild(iframe);
              iframe.src = String(js);
              iframeDocument = iframe.contentWindow.document;
              iframeDocument.open();
              iframeDocument.write(lt + script + gt + "document.F=Object" + lt + "/" + script + gt);
              iframeDocument.close();
              createDict = iframeDocument.F;
              while (length--)
                delete createDict[PROTOTYPE][enumBugKeys[length]];
              return createDict();
            };
            module2.exports = Object.create || function create(O, Properties) {
              var result;
              if (O !== null) {
                Empty[PROTOTYPE] = anObject(O);
                result = new Empty();
                Empty[PROTOTYPE] = null;
                result[IE_PROTO] = O;
              } else
                result = createDict();
              return Properties === void 0 ? result : defineProperties(result, Properties);
            };
            hiddenKeys[IE_PROTO] = true;
          },
          "./node_modules/core-js/internals/object-define-properties.js": function(module2, exports2, __webpack_require__) {
            var DESCRIPTORS = __webpack_require__("./node_modules/core-js/internals/descriptors.js");
            var definePropertyModule = __webpack_require__("./node_modules/core-js/internals/object-define-property.js");
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            var objectKeys = __webpack_require__("./node_modules/core-js/internals/object-keys.js");
            module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
              anObject(O);
              var keys = objectKeys(Properties);
              var length = keys.length;
              var i = 0;
              var key;
              while (length > i)
                definePropertyModule.f(O, key = keys[i++], Properties[key]);
              return O;
            };
          },
          "./node_modules/core-js/internals/object-define-property.js": function(module2, exports2, __webpack_require__) {
            var DESCRIPTORS = __webpack_require__("./node_modules/core-js/internals/descriptors.js");
            var IE8_DOM_DEFINE = __webpack_require__("./node_modules/core-js/internals/ie8-dom-define.js");
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            var toPrimitive = __webpack_require__("./node_modules/core-js/internals/to-primitive.js");
            var nativeDefineProperty = Object.defineProperty;
            exports2.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPrimitive(P, true);
              anObject(Attributes);
              if (IE8_DOM_DEFINE)
                try {
                  return nativeDefineProperty(O, P, Attributes);
                } catch (error) {
                }
              if ("get" in Attributes || "set" in Attributes)
                throw TypeError("Accessors not supported");
              if ("value" in Attributes)
                O[P] = Attributes.value;
              return O;
            };
          },
          "./node_modules/core-js/internals/object-get-own-property-descriptor.js": function(module2, exports2, __webpack_require__) {
            var DESCRIPTORS = __webpack_require__("./node_modules/core-js/internals/descriptors.js");
            var propertyIsEnumerableModule = __webpack_require__("./node_modules/core-js/internals/object-property-is-enumerable.js");
            var createPropertyDescriptor = __webpack_require__("./node_modules/core-js/internals/create-property-descriptor.js");
            var toIndexedObject = __webpack_require__("./node_modules/core-js/internals/to-indexed-object.js");
            var toPrimitive = __webpack_require__("./node_modules/core-js/internals/to-primitive.js");
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var IE8_DOM_DEFINE = __webpack_require__("./node_modules/core-js/internals/ie8-dom-define.js");
            var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            exports2.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
              O = toIndexedObject(O);
              P = toPrimitive(P, true);
              if (IE8_DOM_DEFINE)
                try {
                  return nativeGetOwnPropertyDescriptor(O, P);
                } catch (error) {
                }
              if (has(O, P))
                return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
            };
          },
          "./node_modules/core-js/internals/object-get-own-property-names.js": function(module2, exports2, __webpack_require__) {
            var internalObjectKeys = __webpack_require__("./node_modules/core-js/internals/object-keys-internal.js");
            var enumBugKeys = __webpack_require__("./node_modules/core-js/internals/enum-bug-keys.js");
            var hiddenKeys = enumBugKeys.concat("length", "prototype");
            exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
              return internalObjectKeys(O, hiddenKeys);
            };
          },
          "./node_modules/core-js/internals/object-get-own-property-symbols.js": function(module2, exports2) {
            exports2.f = Object.getOwnPropertySymbols;
          },
          "./node_modules/core-js/internals/object-get-prototype-of.js": function(module2, exports2, __webpack_require__) {
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var toObject = __webpack_require__("./node_modules/core-js/internals/to-object.js");
            var sharedKey = __webpack_require__("./node_modules/core-js/internals/shared-key.js");
            var CORRECT_PROTOTYPE_GETTER = __webpack_require__("./node_modules/core-js/internals/correct-prototype-getter.js");
            var IE_PROTO = sharedKey("IE_PROTO");
            var ObjectPrototype = Object.prototype;
            module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
              O = toObject(O);
              if (has(O, IE_PROTO))
                return O[IE_PROTO];
              if (typeof O.constructor == "function" && O instanceof O.constructor) {
                return O.constructor.prototype;
              }
              return O instanceof Object ? ObjectPrototype : null;
            };
          },
          "./node_modules/core-js/internals/object-keys-internal.js": function(module2, exports2, __webpack_require__) {
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var toIndexedObject = __webpack_require__("./node_modules/core-js/internals/to-indexed-object.js");
            var arrayIncludes = __webpack_require__("./node_modules/core-js/internals/array-includes.js");
            var hiddenKeys = __webpack_require__("./node_modules/core-js/internals/hidden-keys.js");
            var arrayIndexOf = arrayIncludes(false);
            module2.exports = function(object, names) {
              var O = toIndexedObject(object);
              var i = 0;
              var result = [];
              var key;
              for (key in O)
                !has(hiddenKeys, key) && has(O, key) && result.push(key);
              while (names.length > i)
                if (has(O, key = names[i++])) {
                  ~arrayIndexOf(result, key) || result.push(key);
                }
              return result;
            };
          },
          "./node_modules/core-js/internals/object-keys.js": function(module2, exports2, __webpack_require__) {
            var internalObjectKeys = __webpack_require__("./node_modules/core-js/internals/object-keys-internal.js");
            var enumBugKeys = __webpack_require__("./node_modules/core-js/internals/enum-bug-keys.js");
            module2.exports = Object.keys || function keys(O) {
              return internalObjectKeys(O, enumBugKeys);
            };
          },
          "./node_modules/core-js/internals/object-property-is-enumerable.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
            var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
            exports2.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
              var descriptor = getOwnPropertyDescriptor(this, V);
              return !!descriptor && descriptor.enumerable;
            } : nativePropertyIsEnumerable;
          },
          "./node_modules/core-js/internals/object-set-prototype-of.js": function(module2, exports2, __webpack_require__) {
            var validateSetPrototypeOfArguments = __webpack_require__("./node_modules/core-js/internals/validate-set-prototype-of-arguments.js");
            module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
              var correctSetter = false;
              var test = {};
              var setter;
              try {
                setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
                setter.call(test, []);
                correctSetter = test instanceof Array;
              } catch (error) {
              }
              return function setPrototypeOf(O, proto) {
                validateSetPrototypeOfArguments(O, proto);
                if (correctSetter)
                  setter.call(O, proto);
                else
                  O.__proto__ = proto;
                return O;
              };
            }() : void 0);
          },
          "./node_modules/core-js/internals/own-keys.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var getOwnPropertyNamesModule = __webpack_require__("./node_modules/core-js/internals/object-get-own-property-names.js");
            var getOwnPropertySymbolsModule = __webpack_require__("./node_modules/core-js/internals/object-get-own-property-symbols.js");
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            var Reflect2 = global.Reflect;
            module2.exports = Reflect2 && Reflect2.ownKeys || function ownKeys(it) {
              var keys = getOwnPropertyNamesModule.f(anObject(it));
              var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
              return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
            };
          },
          "./node_modules/core-js/internals/path.js": function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__("./node_modules/core-js/internals/global.js");
          },
          "./node_modules/core-js/internals/redefine.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var shared = __webpack_require__("./node_modules/core-js/internals/shared.js");
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var setGlobal = __webpack_require__("./node_modules/core-js/internals/set-global.js");
            var nativeFunctionToString = __webpack_require__("./node_modules/core-js/internals/function-to-string.js");
            var InternalStateModule = __webpack_require__("./node_modules/core-js/internals/internal-state.js");
            var getInternalState = InternalStateModule.get;
            var enforceInternalState = InternalStateModule.enforce;
            var TEMPLATE = String(nativeFunctionToString).split("toString");
            shared("inspectSource", function(it) {
              return nativeFunctionToString.call(it);
            });
            (module2.exports = function(O, key, value, options) {
              var unsafe = options ? !!options.unsafe : false;
              var simple = options ? !!options.enumerable : false;
              var noTargetGet = options ? !!options.noTargetGet : false;
              if (typeof value == "function") {
                if (typeof key == "string" && !has(value, "name"))
                  hide(value, "name", key);
                enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
              }
              if (O === global) {
                if (simple)
                  O[key] = value;
                else
                  setGlobal(key, value);
                return;
              } else if (!unsafe) {
                delete O[key];
              } else if (!noTargetGet && O[key]) {
                simple = true;
              }
              if (simple)
                O[key] = value;
              else
                hide(O, key, value);
            })(Function.prototype, "toString", function toString() {
              return typeof this == "function" && getInternalState(this).source || nativeFunctionToString.call(this);
            });
          },
          "./node_modules/core-js/internals/require-object-coercible.js": function(module2, exports2) {
            module2.exports = function(it) {
              if (it == void 0)
                throw TypeError("Can't call method on " + it);
              return it;
            };
          },
          "./node_modules/core-js/internals/set-global.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var hide = __webpack_require__("./node_modules/core-js/internals/hide.js");
            module2.exports = function(key, value) {
              try {
                hide(global, key, value);
              } catch (error) {
                global[key] = value;
              }
              return value;
            };
          },
          "./node_modules/core-js/internals/set-to-string-tag.js": function(module2, exports2, __webpack_require__) {
            var defineProperty = __webpack_require__("./node_modules/core-js/internals/object-define-property.js").f;
            var has = __webpack_require__("./node_modules/core-js/internals/has.js");
            var wellKnownSymbol = __webpack_require__("./node_modules/core-js/internals/well-known-symbol.js");
            var TO_STRING_TAG = wellKnownSymbol("toStringTag");
            module2.exports = function(it, TAG, STATIC) {
              if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
                defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
              }
            };
          },
          "./node_modules/core-js/internals/shared-key.js": function(module2, exports2, __webpack_require__) {
            var shared = __webpack_require__("./node_modules/core-js/internals/shared.js");
            var uid = __webpack_require__("./node_modules/core-js/internals/uid.js");
            var keys = shared("keys");
            module2.exports = function(key) {
              return keys[key] || (keys[key] = uid(key));
            };
          },
          "./node_modules/core-js/internals/shared.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var setGlobal = __webpack_require__("./node_modules/core-js/internals/set-global.js");
            var IS_PURE = __webpack_require__("./node_modules/core-js/internals/is-pure.js");
            var SHARED = "__core-js_shared__";
            var store = global[SHARED] || setGlobal(SHARED, {});
            (module2.exports = function(key, value) {
              return store[key] || (store[key] = value !== void 0 ? value : {});
            })("versions", []).push({
              version: "3.1.3",
              mode: IS_PURE ? "pure" : "global",
              copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
            });
          },
          "./node_modules/core-js/internals/string-at.js": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("./node_modules/core-js/internals/to-integer.js");
            var requireObjectCoercible = __webpack_require__("./node_modules/core-js/internals/require-object-coercible.js");
            module2.exports = function(that, pos, CONVERT_TO_STRING) {
              var S = String(requireObjectCoercible(that));
              var position = toInteger(pos);
              var size = S.length;
              var first, second;
              if (position < 0 || position >= size)
                return CONVERT_TO_STRING ? "" : void 0;
              first = S.charCodeAt(position);
              return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
            };
          },
          "./node_modules/core-js/internals/to-absolute-index.js": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("./node_modules/core-js/internals/to-integer.js");
            var max = Math.max;
            var min = Math.min;
            module2.exports = function(index, length) {
              var integer = toInteger(index);
              return integer < 0 ? max(integer + length, 0) : min(integer, length);
            };
          },
          "./node_modules/core-js/internals/to-indexed-object.js": function(module2, exports2, __webpack_require__) {
            var IndexedObject = __webpack_require__("./node_modules/core-js/internals/indexed-object.js");
            var requireObjectCoercible = __webpack_require__("./node_modules/core-js/internals/require-object-coercible.js");
            module2.exports = function(it) {
              return IndexedObject(requireObjectCoercible(it));
            };
          },
          "./node_modules/core-js/internals/to-integer.js": function(module2, exports2) {
            var ceil = Math.ceil;
            var floor = Math.floor;
            module2.exports = function(argument) {
              return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
            };
          },
          "./node_modules/core-js/internals/to-length.js": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("./node_modules/core-js/internals/to-integer.js");
            var min = Math.min;
            module2.exports = function(argument) {
              return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
            };
          },
          "./node_modules/core-js/internals/to-object.js": function(module2, exports2, __webpack_require__) {
            var requireObjectCoercible = __webpack_require__("./node_modules/core-js/internals/require-object-coercible.js");
            module2.exports = function(argument) {
              return Object(requireObjectCoercible(argument));
            };
          },
          "./node_modules/core-js/internals/to-primitive.js": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("./node_modules/core-js/internals/is-object.js");
            module2.exports = function(it, S) {
              if (!isObject(it))
                return it;
              var fn, val;
              if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
                return val;
              if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it)))
                return val;
              if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
                return val;
              throw TypeError("Can't convert object to primitive value");
            };
          },
          "./node_modules/core-js/internals/uid.js": function(module2, exports2) {
            var id = 0;
            var postfix = Math.random();
            module2.exports = function(key) {
              return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + postfix).toString(36));
            };
          },
          "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("./node_modules/core-js/internals/is-object.js");
            var anObject = __webpack_require__("./node_modules/core-js/internals/an-object.js");
            module2.exports = function(O, proto) {
              anObject(O);
              if (!isObject(proto) && proto !== null) {
                throw TypeError("Can't set " + String(proto) + " as a prototype");
              }
            };
          },
          "./node_modules/core-js/internals/well-known-symbol.js": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("./node_modules/core-js/internals/global.js");
            var shared = __webpack_require__("./node_modules/core-js/internals/shared.js");
            var uid = __webpack_require__("./node_modules/core-js/internals/uid.js");
            var NATIVE_SYMBOL = __webpack_require__("./node_modules/core-js/internals/native-symbol.js");
            var Symbol2 = global.Symbol;
            var store = shared("wks");
            module2.exports = function(name) {
              return store[name] || (store[name] = NATIVE_SYMBOL && Symbol2[name] || (NATIVE_SYMBOL ? Symbol2 : uid)("Symbol." + name));
            };
          },
          "./node_modules/core-js/modules/es.array.from.js": function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__("./node_modules/core-js/internals/export.js");
            var from = __webpack_require__("./node_modules/core-js/internals/array-from.js");
            var checkCorrectnessOfIteration = __webpack_require__("./node_modules/core-js/internals/check-correctness-of-iteration.js");
            var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
              Array.from(iterable);
            });
            $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
              from
            });
          },
          "./node_modules/core-js/modules/es.string.iterator.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var codePointAt = __webpack_require__("./node_modules/core-js/internals/string-at.js");
            var InternalStateModule = __webpack_require__("./node_modules/core-js/internals/internal-state.js");
            var defineIterator = __webpack_require__("./node_modules/core-js/internals/define-iterator.js");
            var STRING_ITERATOR = "String Iterator";
            var setInternalState = InternalStateModule.set;
            var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
            defineIterator(String, "String", function(iterated) {
              setInternalState(this, {
                type: STRING_ITERATOR,
                string: String(iterated),
                index: 0
              });
            }, function next() {
              var state = getInternalState(this);
              var string = state.string;
              var index = state.index;
              var point;
              if (index >= string.length)
                return { value: void 0, done: true };
              point = codePointAt(string, index, true);
              state.index += point.length;
              return { value: point, done: false };
            });
          },
          "./node_modules/webpack/buildin/global.js": function(module2, exports2) {
            var g;
            g = function() {
              return this;
            }();
            try {
              g = g || Function("return this")() || (1, eval)("this");
            } catch (e) {
              if (typeof window === "object")
                g = window;
            }
            module2.exports = g;
          },
          "./src/default-attrs.json": function(module2) {
            module2.exports = { "xmlns": "http://www.w3.org/2000/svg", "width": 24, "height": 24, "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
          },
          "./src/icon.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _extends = Object.assign || function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            };
            var _createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _dedupe = __webpack_require__("./node_modules/classnames/dedupe.js");
            var _dedupe2 = _interopRequireDefault(_dedupe);
            var _defaultAttrs = __webpack_require__("./src/default-attrs.json");
            var _defaultAttrs2 = _interopRequireDefault(_defaultAttrs);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var Icon = function() {
              function Icon2(name, contents) {
                var tags = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
                _classCallCheck(this, Icon2);
                this.name = name;
                this.contents = contents;
                this.tags = tags;
                this.attrs = _extends({}, _defaultAttrs2.default, { class: "feather feather-" + name });
              }
              _createClass(Icon2, [{
                key: "toSvg",
                value: function toSvg() {
                  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  var combinedAttrs = _extends({}, this.attrs, attrs, { class: (0, _dedupe2.default)(this.attrs.class, attrs.class) });
                  return "<svg " + attrsToString(combinedAttrs) + ">" + this.contents + "</svg>";
                }
              }, {
                key: "toString",
                value: function toString() {
                  return this.contents;
                }
              }]);
              return Icon2;
            }();
            function attrsToString(attrs) {
              return Object.keys(attrs).map(function(key) {
                return key + '="' + attrs[key] + '"';
              }).join(" ");
            }
            exports2.default = Icon;
          },
          "./src/icons.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _icon = __webpack_require__("./src/icon.js");
            var _icon2 = _interopRequireDefault(_icon);
            var _icons = __webpack_require__("./dist/icons.json");
            var _icons2 = _interopRequireDefault(_icons);
            var _tags = __webpack_require__("./src/tags.json");
            var _tags2 = _interopRequireDefault(_tags);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.default = Object.keys(_icons2.default).map(function(key) {
              return new _icon2.default(key, _icons2.default[key], _tags2.default[key]);
            }).reduce(function(object, icon) {
              object[icon.name] = icon;
              return object;
            }, {});
          },
          "./src/index.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            var _icons = __webpack_require__("./src/icons.js");
            var _icons2 = _interopRequireDefault(_icons);
            var _toSvg = __webpack_require__("./src/to-svg.js");
            var _toSvg2 = _interopRequireDefault(_toSvg);
            var _replace = __webpack_require__("./src/replace.js");
            var _replace2 = _interopRequireDefault(_replace);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            module2.exports = { icons: _icons2.default, toSvg: _toSvg2.default, replace: _replace2.default };
          },
          "./src/replace.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _extends = Object.assign || function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            };
            var _dedupe = __webpack_require__("./node_modules/classnames/dedupe.js");
            var _dedupe2 = _interopRequireDefault(_dedupe);
            var _icons = __webpack_require__("./src/icons.js");
            var _icons2 = _interopRequireDefault(_icons);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function replace() {
              var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (typeof document === "undefined") {
                throw new Error("`feather.replace()` only works in a browser environment.");
              }
              var elementsToReplace = document.querySelectorAll("[data-feather]");
              Array.from(elementsToReplace).forEach(function(element) {
                return replaceElement(element, attrs);
              });
            }
            function replaceElement(element) {
              var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              var elementAttrs = getAttrs(element);
              var name = elementAttrs["data-feather"];
              delete elementAttrs["data-feather"];
              var svgString = _icons2.default[name].toSvg(_extends({}, attrs, elementAttrs, { class: (0, _dedupe2.default)(attrs.class, elementAttrs.class) }));
              var svgDocument = new DOMParser().parseFromString(svgString, "image/svg+xml");
              var svgElement = svgDocument.querySelector("svg");
              element.parentNode.replaceChild(svgElement, element);
            }
            function getAttrs(element) {
              return Array.from(element.attributes).reduce(function(attrs, attr) {
                attrs[attr.name] = attr.value;
                return attrs;
              }, {});
            }
            exports2.default = replace;
          },
          "./src/tags.json": function(module2) {
            module2.exports = { "activity": ["pulse", "health", "action", "motion"], "airplay": ["stream", "cast", "mirroring"], "alert-circle": ["warning", "alert", "danger"], "alert-octagon": ["warning", "alert", "danger"], "alert-triangle": ["warning", "alert", "danger"], "align-center": ["text alignment", "center"], "align-justify": ["text alignment", "justified"], "align-left": ["text alignment", "left"], "align-right": ["text alignment", "right"], "anchor": [], "archive": ["index", "box"], "at-sign": ["mention", "at", "email", "message"], "award": ["achievement", "badge"], "aperture": ["camera", "photo"], "bar-chart": ["statistics", "diagram", "graph"], "bar-chart-2": ["statistics", "diagram", "graph"], "battery": ["power", "electricity"], "battery-charging": ["power", "electricity"], "bell": ["alarm", "notification", "sound"], "bell-off": ["alarm", "notification", "silent"], "bluetooth": ["wireless"], "book-open": ["read", "library"], "book": ["read", "dictionary", "booklet", "magazine", "library"], "bookmark": ["read", "clip", "marker", "tag"], "box": ["cube"], "briefcase": ["work", "bag", "baggage", "folder"], "calendar": ["date"], "camera": ["photo"], "cast": ["chromecast", "airplay"], "circle": ["off", "zero", "record"], "clipboard": ["copy"], "clock": ["time", "watch", "alarm"], "cloud-drizzle": ["weather", "shower"], "cloud-lightning": ["weather", "bolt"], "cloud-rain": ["weather"], "cloud-snow": ["weather", "blizzard"], "cloud": ["weather"], "codepen": ["logo"], "codesandbox": ["logo"], "code": ["source", "programming"], "coffee": ["drink", "cup", "mug", "tea", "cafe", "hot", "beverage"], "columns": ["layout"], "command": ["keyboard", "cmd", "terminal", "prompt"], "compass": ["navigation", "safari", "travel", "direction"], "copy": ["clone", "duplicate"], "corner-down-left": ["arrow", "return"], "corner-down-right": ["arrow"], "corner-left-down": ["arrow"], "corner-left-up": ["arrow"], "corner-right-down": ["arrow"], "corner-right-up": ["arrow"], "corner-up-left": ["arrow"], "corner-up-right": ["arrow"], "cpu": ["processor", "technology"], "credit-card": ["purchase", "payment", "cc"], "crop": ["photo", "image"], "crosshair": ["aim", "target"], "database": ["storage", "memory"], "delete": ["remove"], "disc": ["album", "cd", "dvd", "music"], "dollar-sign": ["currency", "money", "payment"], "droplet": ["water"], "edit": ["pencil", "change"], "edit-2": ["pencil", "change"], "edit-3": ["pencil", "change"], "eye": ["view", "watch"], "eye-off": ["view", "watch", "hide", "hidden"], "external-link": ["outbound"], "facebook": ["logo", "social"], "fast-forward": ["music"], "figma": ["logo", "design", "tool"], "file-minus": ["delete", "remove", "erase"], "file-plus": ["add", "create", "new"], "file-text": ["data", "txt", "pdf"], "film": ["movie", "video"], "filter": ["funnel", "hopper"], "flag": ["report"], "folder-minus": ["directory"], "folder-plus": ["directory"], "folder": ["directory"], "framer": ["logo", "design", "tool"], "frown": ["emoji", "face", "bad", "sad", "emotion"], "gift": ["present", "box", "birthday", "party"], "git-branch": ["code", "version control"], "git-commit": ["code", "version control"], "git-merge": ["code", "version control"], "git-pull-request": ["code", "version control"], "github": ["logo", "version control"], "gitlab": ["logo", "version control"], "globe": ["world", "browser", "language", "translate"], "hard-drive": ["computer", "server", "memory", "data"], "hash": ["hashtag", "number", "pound"], "headphones": ["music", "audio", "sound"], "heart": ["like", "love", "emotion"], "help-circle": ["question mark"], "hexagon": ["shape", "node.js", "logo"], "home": ["house", "living"], "image": ["picture"], "inbox": ["email"], "instagram": ["logo", "camera"], "key": ["password", "login", "authentication", "secure"], "layers": ["stack"], "layout": ["window", "webpage"], "life-bouy": ["help", "life ring", "support"], "link": ["chain", "url"], "link-2": ["chain", "url"], "linkedin": ["logo", "social media"], "list": ["options"], "lock": ["security", "password", "secure"], "log-in": ["sign in", "arrow", "enter"], "log-out": ["sign out", "arrow", "exit"], "mail": ["email", "message"], "map-pin": ["location", "navigation", "travel", "marker"], "map": ["location", "navigation", "travel"], "maximize": ["fullscreen"], "maximize-2": ["fullscreen", "arrows", "expand"], "meh": ["emoji", "face", "neutral", "emotion"], "menu": ["bars", "navigation", "hamburger"], "message-circle": ["comment", "chat"], "message-square": ["comment", "chat"], "mic-off": ["record", "sound", "mute"], "mic": ["record", "sound", "listen"], "minimize": ["exit fullscreen", "close"], "minimize-2": ["exit fullscreen", "arrows", "close"], "minus": ["subtract"], "monitor": ["tv", "screen", "display"], "moon": ["dark", "night"], "more-horizontal": ["ellipsis"], "more-vertical": ["ellipsis"], "mouse-pointer": ["arrow", "cursor"], "move": ["arrows"], "music": ["note"], "navigation": ["location", "travel"], "navigation-2": ["location", "travel"], "octagon": ["stop"], "package": ["box", "container"], "paperclip": ["attachment"], "pause": ["music", "stop"], "pause-circle": ["music", "audio", "stop"], "pen-tool": ["vector", "drawing"], "percent": ["discount"], "phone-call": ["ring"], "phone-forwarded": ["call"], "phone-incoming": ["call"], "phone-missed": ["call"], "phone-off": ["call", "mute"], "phone-outgoing": ["call"], "phone": ["call"], "play": ["music", "start"], "pie-chart": ["statistics", "diagram"], "play-circle": ["music", "start"], "plus": ["add", "new"], "plus-circle": ["add", "new"], "plus-square": ["add", "new"], "pocket": ["logo", "save"], "power": ["on", "off"], "printer": ["fax", "office", "device"], "radio": ["signal"], "refresh-cw": ["synchronise", "arrows"], "refresh-ccw": ["arrows"], "repeat": ["loop", "arrows"], "rewind": ["music"], "rotate-ccw": ["arrow"], "rotate-cw": ["arrow"], "rss": ["feed", "subscribe"], "save": ["floppy disk"], "scissors": ["cut"], "search": ["find", "magnifier", "magnifying glass"], "send": ["message", "mail", "email", "paper airplane", "paper aeroplane"], "settings": ["cog", "edit", "gear", "preferences"], "share-2": ["network", "connections"], "shield": ["security", "secure"], "shield-off": ["security", "insecure"], "shopping-bag": ["ecommerce", "cart", "purchase", "store"], "shopping-cart": ["ecommerce", "cart", "purchase", "store"], "shuffle": ["music"], "skip-back": ["music"], "skip-forward": ["music"], "slack": ["logo"], "slash": ["ban", "no"], "sliders": ["settings", "controls"], "smartphone": ["cellphone", "device"], "smile": ["emoji", "face", "happy", "good", "emotion"], "speaker": ["audio", "music"], "star": ["bookmark", "favorite", "like"], "stop-circle": ["media", "music"], "sun": ["brightness", "weather", "light"], "sunrise": ["weather", "time", "morning", "day"], "sunset": ["weather", "time", "evening", "night"], "tablet": ["device"], "tag": ["label"], "target": ["logo", "bullseye"], "terminal": ["code", "command line", "prompt"], "thermometer": ["temperature", "celsius", "fahrenheit", "weather"], "thumbs-down": ["dislike", "bad", "emotion"], "thumbs-up": ["like", "good", "emotion"], "toggle-left": ["on", "off", "switch"], "toggle-right": ["on", "off", "switch"], "tool": ["settings", "spanner"], "trash": ["garbage", "delete", "remove", "bin"], "trash-2": ["garbage", "delete", "remove", "bin"], "triangle": ["delta"], "truck": ["delivery", "van", "shipping", "transport", "lorry"], "tv": ["television", "stream"], "twitch": ["logo"], "twitter": ["logo", "social"], "type": ["text"], "umbrella": ["rain", "weather"], "unlock": ["security"], "user-check": ["followed", "subscribed"], "user-minus": ["delete", "remove", "unfollow", "unsubscribe"], "user-plus": ["new", "add", "create", "follow", "subscribe"], "user-x": ["delete", "remove", "unfollow", "unsubscribe", "unavailable"], "user": ["person", "account"], "users": ["group"], "video-off": ["camera", "movie", "film"], "video": ["camera", "movie", "film"], "voicemail": ["phone"], "volume": ["music", "sound", "mute"], "volume-1": ["music", "sound"], "volume-2": ["music", "sound"], "volume-x": ["music", "sound", "mute"], "watch": ["clock", "time"], "wifi-off": ["disabled"], "wifi": ["connection", "signal", "wireless"], "wind": ["weather", "air"], "x-circle": ["cancel", "close", "delete", "remove", "times", "clear"], "x-octagon": ["delete", "stop", "alert", "warning", "times", "clear"], "x-square": ["cancel", "close", "delete", "remove", "times", "clear"], "x": ["cancel", "close", "delete", "remove", "times", "clear"], "youtube": ["logo", "video", "play"], "zap-off": ["flash", "camera", "lightning"], "zap": ["flash", "camera", "lightning"], "zoom-in": ["magnifying glass"], "zoom-out": ["magnifying glass"] };
          },
          "./src/to-svg.js": function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _icons = __webpack_require__("./src/icons.js");
            var _icons2 = _interopRequireDefault(_icons);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function toSvg(name) {
              var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead.");
              if (!name) {
                throw new Error("The required `key` (icon name) parameter is missing.");
              }
              if (!_icons2.default[name]) {
                throw new Error("No icon matching '" + name + "'. See the complete list of icons at https://feathericons.com");
              }
              return _icons2.default[name].toSvg(attrs);
            }
            exports2.default = toSvg;
          },
          0: function(module2, exports2, __webpack_require__) {
            __webpack_require__("./node_modules/core-js/es/array/from.js");
            module2.exports = __webpack_require__("./src/index.js");
          }
        });
      });
    }
  });

  // src/scripts/_1_third_party_setup/_1_bootstrap.js
  window.bootstrap = require_bootstrap();
  var BSSetup = class {
    constructor() {
      this.tooltipsEl = '[data-bs-toggle="tooltip"]';
      this.popoversEl = '[data-bs-toggle="popover"]';
      this.toastsEl = ".toast";
    }
    tooltips() {
      new bootstrap.Tooltip(document.body, {
        selector: this.tooltipsEl
      });
    }
    popovers() {
      document.querySelectorAll(this.popoversEl).forEach(function(popover) {
        new bootstrap.Popover(popover);
      });
    }
    toasts() {
      document.querySelectorAll(this.toastsEl).forEach(function(toastNode) {
        var toast = new bootstrap.Toast(toastNode, {
          autohide: false
        });
        toast.show();
      });
    }
    init() {
      this.tooltips();
      this.popovers();
      this.toasts();
    }
  };
  var bootstrap_default = new BSSetup();

  // src/scripts/script.js
  "use strict";
  window.feather = require_feather();
  bootstrap_default.init();
  feather.replace();
})();
/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/**
 * Bootstrap JS Setup File
 *
 * This serves as the global bootstrap setup
 *
 * @version 1.0.0
 * @author Arslan Akram <arslan@pixelative.co>
 * @copyright 2021, Pixelative <pixelative.co>
 * @license MIT (https://opensource.org/licenses/MIT)
 */
/**
 * Custom ESBuild with PurgeCSS & LiveServer
 *
 * This serves as the global JS file
 *
 * @version 1.0.0
 * @author Arslan Akram <arslan@pixelative.co>
 * @copyright 2021, Pixelative <pixelative.co>
 * @license MIT (https://opensource.org/licenses/MIT)
 */
