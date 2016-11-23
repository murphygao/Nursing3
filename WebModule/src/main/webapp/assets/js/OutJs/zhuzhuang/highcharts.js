/*
 Highcharts JS v5.0.3 (2016-11-18)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (L, a) {
    "object" === typeof module && module.exports ? module.exports = L.document ? a(L) : a : L.Highcharts = a(L)
})("undefined" !== typeof window ? window : this, function (L) {
    L = function () {
        var a = window, A = a.document, B = a.navigator && a.navigator.userAgent || "", F = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, E = /(edge|msie|trident)/i.test(B) && !window.opera, k = !F, d = /Firefox/.test(B), h = d && 4 > parseInt(B.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.3",
            deg2rad: 2 * Math.PI / 360,
            doc: A,
            hasBidiBug: h,
            hasTouch: A && void 0 !== A.documentElement.ontouchstart,
            isMS: E,
            isWebKit: /AppleWebKit/.test(B),
            isFirefox: d,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: F,
            vml: k,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            }
        }
    }();
    (function (a) {
        var A = [], B = a.charts, F = a.doc, E = a.win;
        a.error = function (a, d) {
            a = "Highcharts error #" +
                a + ": www.highcharts.com/errors/" + a;
            if (d)throw Error(a);
            E.console && console.log(a)
        };
        a.Fx = function (a, d, h) {
            this.options = d;
            this.elem = a;
            this.prop = h
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], d = this.paths[1], h = [], g = this.now, n = a.length, t;
                if (1 === g)h = this.toD; else if (n === d.length && 1 > g)for (; n--;)t = parseFloat(a[n]), h[n] = isNaN(t) ? a[n] : g * parseFloat(d[n] - t) + t; else h = d;
                this.elem.attr("d", h)
            }, update: function () {
                var a = this.elem, d = this.prop, h = this.now, g = this.options.step;
                if (this[d + "Setter"])this[d + "Setter"]();
                else a.attr ? a.element && a.attr(d, h) : a.style[d] = h + this.unit;
                g && g.call(a, h, this)
            }, run: function (a, d, h) {
                var g = this, k = function (a) {
                    return k.stopped ? !1 : g.step(a)
                }, t;
                this.startTime = +new Date;
                this.start = a;
                this.end = d;
                this.unit = h;
                this.now = this.start;
                this.pos = 0;
                k.elem = this.elem;
                k() && 1 === A.push(k) && (k.timerId = setInterval(function () {
                    for (t = 0; t < A.length; t++)A[t]() || A.splice(t--, 1);
                    A.length || clearInterval(k.timerId)
                }, 13))
            }, step: function (a) {
                var d = +new Date, k, g = this.options;
                k = this.elem;
                var n = g.complete, t = g.duration,
                    c = g.curAnim, e;
                if (k.attr && !k.element)k = !1; else if (a || d >= t + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = c[this.prop] = !0;
                    for (e in c)!0 !== c[e] && (a = !1);
                    a && n && n.call(k);
                    k = !1
                } else this.pos = g.easing((d - this.startTime) / t), this.now = this.start + (this.end - this.start) * this.pos, this.update(), k = !0;
                return k
            }, initPath: function (k, d, h) {
                function g(a) {
                    for (p = a.length; p--;)"M" !== a[p] && "L" !== a[p] || a.splice(p + 1, 0, a[p + 1], a[p + 2], a[p + 1], a[p + 2])
                }

                function n(a, f) {
                    for (; a.length < b;) {
                        a[0] = f[b - a.length];
                        var c = a.slice(0,
                            C);
                        [].splice.apply(a, [0, 0].concat(c));
                        v && (c = a.slice(a.length - C), [].splice.apply(a, [a.length, 0].concat(c)), p--)
                    }
                    a[0] = "M"
                }

                function t(a, c) {
                    for (var e = (b - a.length) / C; 0 < e && e--;)f = a.slice().splice(a.length / H - C, C * H), f[0] = c[b - C - e * C], w && (f[C - 6] = f[C - 2], f[C - 5] = f[C - 1]), [].splice.apply(a, [a.length / H, 0].concat(f)), v && e--
                }

                d = d || "";
                var c, e = k.startX, q = k.endX, w = -1 < d.indexOf("C"), C = w ? 7 : 3, b, f, p;
                d = d.split(" ");
                h = h.slice();
                var v = k.isArea, H = v ? 2 : 1, m;
                w && (g(d), g(h));
                if (e && q) {
                    for (p = 0; p < e.length; p++)if (e[p] === q[0]) {
                        c = p;
                        break
                    } else if (e[0] ===
                        q[q.length - e.length + p]) {
                        c = p;
                        m = !0;
                        break
                    }
                    void 0 === c && (d = [])
                }
                d.length && a.isNumber(c) && (b = h.length + c * H * C, m ? (n(d, h), t(h, d)) : (n(h, d), t(d, h)));
                return [d, h]
            }
        };
        a.extend = function (a, d) {
            var k;
            a || (a = {});
            for (k in d)a[k] = d[k];
            return a
        };
        a.merge = function () {
            var k, d = arguments, h, g = {}, n = function (d, c) {
                var e, q;
                "object" !== typeof d && (d = {});
                for (q in c)c.hasOwnProperty(q) && (e = c[q], a.isObject(e, !0) && "renderTo" !== q && "number" !== typeof e.nodeType ? d[q] = n(d[q] || {}, e) : d[q] = c[q]);
                return d
            };
            !0 === d[0] && (g = d[1], d = Array.prototype.slice.call(d,
                2));
            h = d.length;
            for (k = 0; k < h; k++)g = n(g, d[k]);
            return g
        };
        a.pInt = function (a, d) {
            return parseInt(a, d || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (k, d) {
            return k && "object" === typeof k && (!d || !a.isArray(k))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, d) {
            for (var k = a.length; k--;)if (a[k] === d) {
                a.splice(k, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !==
                a && null !== a
        };
        a.attr = function (k, d, h) {
            var g, n;
            if (a.isString(d))a.defined(h) ? k.setAttribute(d, h) : k && k.getAttribute && (n = k.getAttribute(d)); else if (a.defined(d) && a.isObject(d))for (g in d)k.setAttribute(g, d[g]);
            return n
        };
        a.splat = function (k) {
            return a.isArray(k) ? k : [k]
        };
        a.syncTimeout = function (a, d, h) {
            if (d)return setTimeout(a, d, h);
            a.call(0, h)
        };
        a.pick = function () {
            var a = arguments, d, h, g = a.length;
            for (d = 0; d < g; d++)if (h = a[d], void 0 !== h && null !== h)return h
        };
        a.css = function (k, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter =
                "alpha(opacity\x3d" + 100 * d.opacity + ")");
            a.extend(k.style, d)
        };
        a.createElement = function (k, d, h, g, n) {
            k = F.createElement(k);
            var t = a.css;
            d && a.extend(k, d);
            n && t(k, {padding: 0, border: "none", margin: 0});
            h && t(k, h);
            g && g.appendChild(k);
            return k
        };
        a.extendClass = function (k, d) {
            var h = function () {
            };
            h.prototype = new k;
            a.extend(h.prototype, d);
            return h
        };
        a.pad = function (a, d, h) {
            return Array((d || 2) + 1 - String(a).length).join(h || 0) + a
        };
        a.relativeLength = function (a, d) {
            return /%$/.test(a) ? d * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a,
                           d, h) {
            var g = a[d];
            a[d] = function () {
                var a = Array.prototype.slice.call(arguments), d = arguments, c = this;
                c.proceed = function () {
                    g.apply(c, arguments.length ? arguments : d)
                };
                a.unshift(g);
                a = h.apply(this, a);
                c.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (k) {
            var d = a.Date;
            return 6E4 * (d.hcGetTimezoneOffset && d.hcGetTimezoneOffset(k) || d.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (k, d, h) {
            if (!a.defined(d) || isNaN(d))return a.defaultOptions.lang.invalidDate || "";
            k = a.pick(k, "%Y-%m-%d %H:%M:%S");
            var g = a.Date, n = new g(d - a.getTZOffset(d)),
                t, c = n[g.hcGetHours](), e = n[g.hcGetDay](), q = n[g.hcGetDate](), w = n[g.hcGetMonth](), C = n[g.hcGetFullYear](), b = a.defaultOptions.lang, f = b.weekdays, p = b.shortWeekdays, v = a.pad, g = a.extend({
                    a: p ? p[e] : f[e].substr(0, 3),
                    A: f[e],
                    d: v(q),
                    e: v(q, 2, " "),
                    w: e,
                    b: b.shortMonths[w],
                    B: b.months[w],
                    m: v(w + 1),
                    y: C.toString().substr(2, 2),
                    Y: C,
                    H: v(c),
                    k: c,
                    I: v(c % 12 || 12),
                    l: c % 12 || 12,
                    M: v(n[g.hcGetMinutes]()),
                    p: 12 > c ? "AM" : "PM",
                    P: 12 > c ? "am" : "pm",
                    S: v(n.getSeconds()),
                    L: v(Math.round(d % 1E3), 3)
                }, a.dateFormats);
            for (t in g)for (; -1 !== k.indexOf("%" + t);)k =
                k.replace("%" + t, "function" === typeof g[t] ? g[t](d) : g[t]);
            return h ? k.substr(0, 1).toUpperCase() + k.substr(1) : k
        };
        a.formatSingle = function (k, d) {
            var h = /\.([0-9])/, g = a.defaultOptions.lang;
            /f$/.test(k) ? (h = (h = k.match(h)) ? h[1] : -1, null !== d && (d = a.numberFormat(d, h, g.decimalPoint, -1 < k.indexOf(",") ? g.thousandsSep : ""))) : d = a.dateFormat(k, d);
            return d
        };
        a.format = function (k, d) {
            for (var h = "{", g = !1, n, t, c, e, q = [], w; k;) {
                h = k.indexOf(h);
                if (-1 === h)break;
                n = k.slice(0, h);
                if (g) {
                    n = n.split(":");
                    t = n.shift().split(".");
                    e = t.length;
                    w = d;
                    for (c =
                             0; c < e; c++)w = w[t[c]];
                    n.length && (w = a.formatSingle(n.join(":"), w));
                    q.push(w)
                } else q.push(n);
                k = k.slice(h + 1);
                h = (g = !g) ? "}" : "{"
            }
            q.push(k);
            return q.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (k, d, h, g, n) {
            var t, c = k;
            h = a.pick(h, 1);
            t = k / h;
            d || (d = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === g && (1 === h ? d = a.grep(d, function (a) {
                return 0 === a % 1
            }) : .1 >= h && (d = [1 / h])));
            for (g = 0; g < d.length && !(c = d[g], n && c * h >= k || !n && t <= (d[g] + (d[g + 1] || d[g])) /
            2); g++);
            return c * h
        };
        a.stableSort = function (a, d) {
            var h = a.length, g, n;
            for (n = 0; n < h; n++)a[n].safeI = n;
            a.sort(function (a, c) {
                g = d(a, c);
                return 0 === g ? a.safeI - c.safeI : g
            });
            for (n = 0; n < h; n++)delete a[n].safeI
        };
        a.arrayMin = function (a) {
            for (var d = a.length, h = a[0]; d--;)a[d] < h && (h = a[d]);
            return h
        };
        a.arrayMax = function (a) {
            for (var d = a.length, h = a[0]; d--;)a[d] > h && (h = a[d]);
            return h
        };
        a.destroyObjectProperties = function (a, d) {
            for (var h in a)a[h] && a[h] !== d && a[h].destroy && a[h].destroy(), delete a[h]
        };
        a.discardElement = function (k) {
            var d =
                a.garbageBin;
            d || (d = a.createElement("div"));
            k && d.appendChild(k);
            d.innerHTML = ""
        };
        a.correctFloat = function (a, d) {
            return parseFloat(a.toPrecision(d || 14))
        };
        a.setAnimation = function (k, d) {
            d.renderer.globalAnimation = a.pick(k, d.options.chart.animation, !0)
        };
        a.animObject = function (k) {
            return a.isObject(k) ? a.merge(k) : {duration: k ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (k, d, h, g) {
            k = +k || 0;
            d = +d;
            var n = a.defaultOptions.lang,
                t = (k.toString().split(".")[1] || "").length, c, e, q = Math.abs(k);
            -1 === d ? d = Math.min(t, 20) : a.isNumber(d) || (d = 2);
            c = String(a.pInt(q.toFixed(d)));
            e = 3 < c.length ? c.length % 3 : 0;
            h = a.pick(h, n.decimalPoint);
            g = a.pick(g, n.thousandsSep);
            k = (0 > k ? "-" : "") + (e ? c.substr(0, e) + g : "");
            k += c.substr(e).replace(/(\d{3})(?=\d)/g, "$1" + g);
            d && (g = Math.abs(q - c + Math.pow(10, -Math.max(d, t) - 1)), k += h + g.toFixed(d).slice(2));
            return k
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (k, d) {
            return "width" === d ? Math.min(k.offsetWidth,
                k.scrollWidth) - a.getStyle(k, "padding-left") - a.getStyle(k, "padding-right") : "height" === d ? Math.min(k.offsetHeight, k.scrollHeight) - a.getStyle(k, "padding-top") - a.getStyle(k, "padding-bottom") : (k = E.getComputedStyle(k, void 0)) && a.pInt(k.getPropertyValue(d))
        };
        a.inArray = function (a, d) {
            return d.indexOf ? d.indexOf(a) : [].indexOf.call(d, a)
        };
        a.grep = function (a, d) {
            return [].filter.call(a, d)
        };
        a.map = function (a, d) {
            for (var h = [], g = 0, n = a.length; g < n; g++)h[g] = d.call(a[g], a[g], g, a);
            return h
        };
        a.offset = function (a) {
            var d = F.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (E.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: a.left + (E.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        a.stop = function (a) {
            for (var d = A.length; d--;)A[d].elem === a && (A[d].stopped = !0)
        };
        a.each = function (a, d, h) {
            return Array.prototype.forEach.call(a, d, h)
        };
        a.addEvent = function (k, d, h) {
            function g(a) {
                a.target = a.srcElement || E;
                h.call(k, a)
            }

            var n = k.hcEvents = k.hcEvents || {};
            k.addEventListener ? k.addEventListener(d, h, !1) : k.attachEvent && (k.hcEventsIE || (k.hcEventsIE = {}),
                k.hcEventsIE[h.toString()] = g, k.attachEvent("on" + d, g));
            n[d] || (n[d] = []);
            n[d].push(h);
            return function () {
                a.removeEvent(k, d, h)
            }
        };
        a.removeEvent = function (k, d, h) {
            function g(a, c) {
                k.removeEventListener ? k.removeEventListener(a, c, !1) : k.attachEvent && (c = k.hcEventsIE[c.toString()], k.detachEvent("on" + a, c))
            }

            function n() {
                var a, e;
                if (k.nodeName)for (e in d ? (a = {}, a[d] = !0) : a = c, a)if (c[e])for (a = c[e].length; a--;)g(e, c[e][a])
            }

            var t, c = k.hcEvents, e;
            c && (d ? (t = c[d] || [], h ? (e = a.inArray(h, t), -1 < e && (t.splice(e, 1), c[d] = t), g(d, h)) : (n(),
                c[d] = [])) : (n(), k.hcEvents = {}))
        };
        a.fireEvent = function (k, d, h, g) {
            var n;
            n = k.hcEvents;
            var t, c;
            h = h || {};
            if (F.createEvent && (k.dispatchEvent || k.fireEvent))n = F.createEvent("Events"), n.initEvent(d, !0, !0), a.extend(n, h), k.dispatchEvent ? k.dispatchEvent(n) : k.fireEvent(d, n); else if (n)for (n = n[d] || [], t = n.length, h.target || a.extend(h, {
                preventDefault: function () {
                    h.defaultPrevented = !0
                }, target: k, type: d
            }), d = 0; d < t; d++)(c = n[d]) && !1 === c.call(k, h) && h.preventDefault();
            g && !h.defaultPrevented && g(h)
        };
        a.animate = function (k, d, h) {
            var g,
                n = "", t, c, e;
            a.isObject(h) || (g = arguments, h = {duration: g[2], easing: g[3], complete: g[4]});
            a.isNumber(h.duration) || (h.duration = 400);
            h.easing = "function" === typeof h.easing ? h.easing : Math[h.easing] || Math.easeInOutSine;
            h.curAnim = a.merge(d);
            for (e in d)c = new a.Fx(k, h, e), t = null, "d" === e ? (c.paths = c.initPath(k, k.d, d.d), c.toD = d.d, g = 0, t = 1) : k.attr ? g = k.attr(e) : (g = parseFloat(a.getStyle(k, e)) || 0, "opacity" !== e && (n = "px")), t || (t = d[e]), t.match && t.match("px") && (t = t.replace(/px/g, "")), c.run(g, t, n)
        };
        a.seriesType = function (k, d, h,
                                 g, n) {
            var t = a.getOptions(), c = a.seriesTypes;
            t.plotOptions[k] = a.merge(t.plotOptions[d], h);
            c[k] = a.extendClass(c[d] || function () {
                }, g);
            c[k].prototype.type = k;
            n && (c[k].prototype.pointClass = a.extendClass(a.Point, n));
            return c[k]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), d = 0;
            return function () {
                return "highcharts-" + a + "-" + d++
            }
        }();
        E.jQuery && (E.jQuery.fn.highcharts = function () {
            var k = [].slice.call(arguments);
            if (this[0])return k[0] ? (new (a[a.isString(k[0]) ? k.shift() : "Chart"])(this[0], k[0],
                k[1]), this) : B[a.attr(this[0], "data-highcharts-chart")]
        });
        F && !F.defaultView && (a.getStyle = function (k, d) {
            var h = {width: "clientWidth", height: "clientHeight"}[d];
            if (k.style[d])return a.pInt(k.style[d]);
            "opacity" === d && (d = "filter");
            if (h)return k.style.zoom = 1, Math.max(k[h] - 2 * a.getStyle(k, "padding"), 0);
            k = k.currentStyle[d.replace(/\-(\w)/g, function (a, d) {
                return d.toUpperCase()
            })];
            "filter" === d && (k = k.replace(/alpha\(opacity=([0-9]+)\)/, function (a, d) {
                return d / 100
            }));
            return "" === k ? 1 : a.pInt(k)
        });
        Array.prototype.forEach ||
        (a.each = function (a, d, h) {
            for (var g = 0, n = a.length; g < n; g++)if (!1 === d.call(h, a[g], g, a))return g
        });
        Array.prototype.indexOf || (a.inArray = function (a, d) {
            var h, g = 0;
            if (d)for (h = d.length; g < h; g++)if (d[g] === a)return g;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, d) {
            for (var h = [], g = 0, n = a.length; g < n; g++)d(a[g], g) && h.push(a[g]);
            return h
        })
    })(L);
    (function (a) {
        var A = a.each, B = a.isNumber, F = a.map, E = a.merge, k = a.pInt;
        a.Color = function (d) {
            if (!(this instanceof a.Color))return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype =
        {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [k(a[1]), k(a[2]), k(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function (a) {
                    return [k(a[1], 16), k(a[2], 16), k(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
                    return [k(a[1]), k(a[2]), k(a[3]), 1]
                }
            }], names: {white: "#ffffff", black: "#000000"}, init: function (d) {
            var h, g, n,
                t;
            if ((this.input = d = this.names[d] || d) && d.stops)this.stops = F(d.stops, function (c) {
                return new a.Color(c[1])
            }); else for (n = this.parsers.length; n-- && !g;)t = this.parsers[n], (h = t.regex.exec(d)) && (g = t.parse(h));
            this.rgba = g || []
        }, get: function (a) {
            var d = this.input, g = this.rgba, n;
            this.stops ? (n = E(d), n.stops = [].concat(n.stops), A(this.stops, function (d, c) {
                n.stops[c] = [n.stops[c][0], d.get(a)]
            })) : n = g && B(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : d;
            return n
        }, brighten: function (a) {
            var d,
                g = this.rgba;
            if (this.stops)A(this.stops, function (d) {
                d.brighten(a)
            }); else if (B(a) && 0 !== a)for (d = 0; 3 > d; d++)g[d] += k(255 * a), 0 > g[d] && (g[d] = 0), 255 < g[d] && (g[d] = 255);
            return this
        }, setOpacity: function (a) {
            this.rgba[3] = a;
            return this
        }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(L);
    (function (a) {
        var A, B, F = a.addEvent, E = a.animate, k = a.attr, d = a.charts, h = a.color, g = a.css, n = a.createElement, t = a.defined, c = a.deg2rad, e = a.destroyObjectProperties, q = a.doc, w = a.each, C = a.extend, b = a.erase, f = a.grep, p = a.hasTouch, v = a.isArray, H = a.isFirefox,
            m = a.isMS, D = a.isObject, I = a.isString, z = a.isWebKit, J = a.merge, r = a.noop, y = a.pick, G = a.pInt, M = a.removeEvent, l = a.splat, u = a.stop, Q = a.svg, R = a.SVG_NS, O = a.symbolSizes, N = a.win;
        A = a.SVGElement = function () {
            return this
        };
        A.prototype = {
            opacity: 1,
            SVG_NS: R,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? n(b) : q.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (a, b, l) {
                b = y(b, this.renderer.globalAnimation,
                    !0);
                u(this);
                b ? (l && (b.complete = l), E(this, a, b)) : this.attr(a, null, l);
                return this
            },
            colorGradient: function (x, b, l) {
                var u = this.renderer, K, f, c, e, r, p, P, d, m, y, q, g = [], N;
                x.linearGradient ? f = "linearGradient" : x.radialGradient && (f = "radialGradient");
                if (f) {
                    c = x[f];
                    r = u.gradients;
                    P = x.stops;
                    y = l.radialReference;
                    v(c) && (x[f] = c = {x1: c[0], y1: c[1], x2: c[2], y2: c[3], gradientUnits: "userSpaceOnUse"});
                    "radialGradient" === f && y && !t(c.gradientUnits) && (e = c, c = J(c, u.getRadialAttr(y, e), {gradientUnits: "userSpaceOnUse"}));
                    for (q in c)"id" !==
                    q && g.push(q, c[q]);
                    for (q in P)g.push(P[q]);
                    g = g.join(",");
                    r[g] ? y = r[g].attr("id") : (c.id = y = a.uniqueKey(), r[g] = p = u.createElement(f).attr(c).add(u.defs), p.radAttr = e, p.stops = [], w(P, function (x) {
                        0 === x[1].indexOf("rgba") ? (K = a.color(x[1]), d = K.get("rgb"), m = K.get("a")) : (d = x[1], m = 1);
                        x = u.createElement("stop").attr({offset: x[0], "stop-color": d, "stop-opacity": m}).add(p);
                        p.stops.push(x)
                    }));
                    N = "url(" + u.url + "#" + y + ")";
                    l.setAttribute(b, N);
                    l.gradient = g;
                    x.toString = function () {
                        return N
                    }
                }
            },
            applyTextOutline: function (a) {
                var x =
                    this.element, l, u, f;
                -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(x.style.fill)));
                this.fakeTS = !0;
                this.ySetter = this.xSetter;
                l = [].slice.call(x.getElementsByTagName("tspan"));
                a = a.split(" ");
                u = a[a.length - 1];
                (f = a[0]) && "none" !== f && (f = f.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, b) {
                    return 2 * x + b
                }), w(l, function (a) {
                    "highcharts-text-outline" === a.getAttribute("class") && b(l, x.removeChild(a))
                }), this.realBox = x.getBBox(), w(l, function (a, b) {
                    0 === b && (a.setAttribute("x", x.getAttribute("x")),
                        b = x.getAttribute("y"), a.setAttribute("y", b || 0), null === b && x.setAttribute("y", 0));
                    a = a.cloneNode(1);
                    k(a, {
                        "class": "highcharts-text-outline",
                        fill: u,
                        stroke: u,
                        "stroke-width": f,
                        "stroke-linejoin": "round"
                    });
                    x.insertBefore(a, x.firstChild)
                }))
            },
            attr: function (a, b, l) {
                var x, u = this.element, f, K = this, c;
                "string" === typeof a && void 0 !== b && (x = a, a = {}, a[x] = b);
                if ("string" === typeof a)K = (this[a + "Getter"] || this._defaultGetter).call(this, a, u); else {
                    for (x in a)b = a[x], c = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(x) &&
                    (f || (this.symbolAttr(a), f = !0), c = !0), !this.rotation || "x" !== x && "y" !== x || (this.doTransform = !0), c || (c = this[x + "Setter"] || this._defaultSetter, c.call(this, b, x, u));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                l && l();
                return K
            },
            addClass: function (a, b) {
                var x = this.attr("class") || "";
                -1 === x.indexOf(a) && (b || (a = (x + (x ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== k(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                k(this.element, "class", (k(this.element,
                    "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var x = this;
                w("x y r start end width height innerR anchorX anchorY".split(" "), function (b) {
                    x[b] = y(a[b], x[b])
                });
                x.attr({d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var x, l = {}, u;
                b = b || a.strokeWidth || 0;
                u = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + u;
                a.y = Math.floor(a.y || this.y || 0) + u;
                a.width = Math.floor((a.width ||
                    this.width || 0) - 2 * u);
                a.height = Math.floor((a.height || this.height || 0) - 2 * u);
                t(a.strokeWidth) && (a.strokeWidth = b);
                for (x in a)this[x] !== a[x] && (this[x] = l[x] = a[x]);
                return l
            },
            css: function (a) {
                var x = this.styles, b = {}, l = this.element, u, f, c = "";
                u = !x;
                a && a.color && (a.fill = a.color);
                if (x)for (f in a)a[f] !== x[f] && (b[f] = a[f], u = !0);
                if (u) {
                    u = this.textWidth = a && a.width && "text" === l.nodeName.toLowerCase() && G(a.width) || this.textWidth;
                    x && (a = C(x, b));
                    this.styles = a;
                    u && !Q && this.renderer.forExport && delete a.width;
                    if (m && !Q)g(this.element,
                        a); else {
                        x = function (a, x) {
                            return "-" + x.toLowerCase()
                        };
                        for (f in a)c += f.replace(/([A-Z])/g, x) + ":" + a[f] + ";";
                        k(l, "style", c)
                    }
                    this.added && (u && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            getStyle: function (a) {
                return N.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                var a = this.getStyle("stroke-width"), b;
                a.indexOf("px") === a.length - 2 ? a = G(a) : (b = q.createElementNS(R, "rect"), k(b, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(b),
                    a = b.getBBox().width, b.parentNode.removeChild(b));
                return a
            },
            on: function (a, b) {
                var x = this, l = x.element;
                p && "click" === a ? (l.ontouchstart = function (a) {
                    x.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(l, a)
                }, l.onclick = function (a) {
                    (-1 === N.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && b.call(l, a)
                }) : l["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var x = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                x && x.radAttr && x.animate(this.renderer.getRadialAttr(a,
                    x.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({translateX: a, translateY: b})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, b = this.translateY || 0, l = this.scaleX, u = this.scaleY, f = this.inverted, c = this.rotation, e = this.element;
                f && (a += this.attr("width"), b += this.attr("height"));
                a = ["translate(" + a + "," + b + ")"];
                f ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (e.getAttribute("x") || 0) + " " + (e.getAttribute("y") ||
                    0) + ")");
                (t(l) || t(u)) && a.push("scale(" + y(l, 1) + " " + y(u, 1) + ")");
                a.length && e.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, l, u) {
                var x, f, c, e, K = {};
                f = this.renderer;
                c = f.alignedObjects;
                var r, p;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = l, !u || I(u))this.alignTo = x = u || "renderer", b(c, this), c.push(this), u = null
                } else a = this.alignOptions, l = this.alignByTranslate, x = this.alignTo;
                u = y(u, f[x], f);
                x = a.align;
                f = a.verticalAlign;
                c =
                    (u.x || 0) + (a.x || 0);
                e = (u.y || 0) + (a.y || 0);
                "right" === x ? r = 1 : "center" === x && (r = 2);
                r && (c += (u.width - (a.width || 0)) / r);
                K[l ? "translateX" : "x"] = Math.round(c);
                "bottom" === f ? p = 1 : "middle" === f && (p = 2);
                p && (e += (u.height - (a.height || 0)) / p);
                K[l ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](K);
                this.placed = !0;
                this.alignAttr = K;
                return this
            },
            getBBox: function (a, b) {
                var x, l = this.renderer, u, f = this.element, e = this.styles, K, r = this.textStr, p, d = l.cache, v = l.cacheKeys, g;
                b = y(b, this.rotation);
                u = b * c;
                K = f && A.prototype.getStyle.call(f,
                        "font-size");
                void 0 !== r && (g = r.toString(), -1 === g.indexOf("\x3c") && (g = g.replace(/[0-9]/g, "0")), g += ["", b || 0, K, f.style.width, f.style["text-overflow"]].join());
                g && !a && (x = d[g]);
                if (!x) {
                    if (f.namespaceURI === this.SVG_NS || l.forExport) {
                        try {
                            (p = this.fakeTS && function (a) {
                                    w(f.querySelectorAll(".highcharts-text-outline"), function (x) {
                                        x.style.display = a
                                    })
                                }) && p("none"), x = f.getBBox ? C({}, f.getBBox()) : {
                                width: f.offsetWidth,
                                height: f.offsetHeight
                            }, p && p("")
                        } catch (U) {
                        }
                        if (!x || 0 > x.width)x = {width: 0, height: 0}
                    } else x = this.htmlGetBBox();
                    l.isSVG && (a = x.width, l = x.height, m && e && "11px" === e.fontSize && "16.9" === l.toPrecision(3) && (x.height = l = 14), b && (x.width = Math.abs(l * Math.sin(u)) + Math.abs(a * Math.cos(u)), x.height = Math.abs(l * Math.cos(u)) + Math.abs(a * Math.sin(u))));
                    if (g && 0 < x.height) {
                        for (; 250 < v.length;)delete d[v.shift()];
                        d[g] || v.push(g);
                        d[g] = x
                    }
                }
                return x
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var x = this;
                x.animate({opacity: 0}, {
                    duration: a ||
                    150, complete: function () {
                        x.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var x = this.renderer, b = this.element, l;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && x.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)l = this.zIndexSetter();
                l || (a ? a.element : x.box).appendChild(b);
                if (this.onAdd)this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var x = a.parentNode;
                x && x.removeChild(a)
            },
            destroy: function () {
                var a = this.element || {}, l = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
                    f, c;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                u(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (c = 0; c < this.stops.length; c++)this.stops[c] = this.stops[c].destroy();
                    this.stops = null
                }
                for (this.safeRemoveChild(a); l && l.div && 0 === l.div.childNodes.length;)a = l.parentGroup, this.safeRemoveChild(l.div), delete l.div, l = a;
                this.alignTo && b(this.renderer.alignedObjects, this);
                for (f in this)delete this[f];
                return null
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName &&
                ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = y(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, l) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                l.setAttribute(b, a);
                this[b] = a
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, b, l) {
                this[b] = a;
                l.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b =
                    this.element.getElementsByTagName("title")[0];
                b || (b = q.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(q.createTextNode(String(y(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, l) {
                "string" === typeof a ? l.setAttribute(b, a) : a && this.colorGradient(a, b, l)
            },
            visibilitySetter: function (a, b, l) {
                "inherit" === a ? l.removeAttribute(b) :
                    l.setAttribute(b, a)
            },
            zIndexSetter: function (a, b) {
                var l = this.renderer, x = this.parentGroup, u = (x || l).element || l.box, f, c = this.element, e;
                f = this.added;
                var r;
                t(a) && (c.zIndex = a, a = +a, this[b] === a && (f = !1), this[b] = a);
                if (f) {
                    (a = this.zIndex) && x && (x.handleZ = !0);
                    b = u.childNodes;
                    for (r = 0; r < b.length && !e; r++)x = b[r], f = x.zIndex, x !== c && (G(f) > a || !t(a) && t(f) || 0 > a && !t(f) && u !== l.box) && (u.insertBefore(c, x), e = !0);
                    e || u.appendChild(c)
                }
                return e
            },
            _defaultSetter: function (a, b, l) {
                l.setAttribute(b, a)
            }
        };
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter = A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        B = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        B.prototype = {
            Element: A, SVG_NS: R, init: function (a, b, l, u, f, c) {
                var x;
                u = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                x = u.element;
                a.appendChild(x);
                -1 === a.innerHTML.indexOf("xmlns") && k(x, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = x;
                this.boxWrapper = u;
                this.alignedObjects = [];
                this.url = (H || z) && q.getElementsByTagName("base").length ? N.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(q.createTextNode("Created with Highcharts 5.0.3"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = f;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, l, !1);
                var e;
                H && a.getBoundingClientRect &&
                (b = function () {
                    g(a, {left: 0, top: 0});
                    e = a.getBoundingClientRect();
                    g(a, {left: Math.ceil(e.left) - e.left + "px", top: Math.ceil(e.top) - e.top + "px"})
                }, b(), this.unSubPixelFix = F(N, "resize", b))
            }, definition: function (a) {
                function b(a, u) {
                    var f;
                    w(l(a), function (a) {
                        var l = x.createElement(a.tagName), c, e = {};
                        for (c in a)"tagName" !== c && "children" !== c && "textContent" !== c && (e[c] = a[c]);
                        l.attr(e);
                        l.add(u || x.defs);
                        a.textContent && l.element.appendChild(q.createTextNode(a.textContent));
                        b(a.children || [], l);
                        f = l
                    });
                    return f
                }

                var x = this;
                return b(a)
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            }, draw: r, getRadialAttr: function (a, b) {
                return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
            }, buildText: function (a) {
                for (var b =
                    a.element, l = this, x = l.forExport, u = y(a.textStr, "").toString(), c = -1 !== u.indexOf("\x3c"), e = b.childNodes, r, p, d, m, v = k(b, "x"), N = a.styles, t = a.textWidth, n = N && N.lineHeight, h = N && N.textOutline, z = N && "ellipsis" === N.textOverflow, D = e.length, I = t && !a.added && this.box, H = function (a) {
                    return n ? G(n) : l.fontMetrics(void 0, a.getAttribute("style") ? a : b).h
                }; D--;)b.removeChild(e[D]);
                c || h || z || t || -1 !== u.indexOf(" ") ? (r = /<.*class="([^"]+)".*>/, p = /<.*style="([^"]+)".*>/, d = /<.*href="(http[^"]+)".*>/, I && I.appendChild(b), u = c ? u.replace(/<(b|strong)>/g,
                    '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [u], u = f(u, function (a) {
                    return "" !== a
                }), w(u, function (u, f) {
                    var c, e = 0;
                    u = u.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                    c = u.split("|||");
                    w(c, function (u) {
                        if ("" !== u || 1 === c.length) {
                            var y = {}, K = q.createElementNS(l.SVG_NS, "tspan"), w, n;
                            r.test(u) && (w = u.match(r)[1],
                                k(K, "class", w));
                            p.test(u) && (n = u.match(p)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), k(K, "style", n));
                            d.test(u) && !x && (k(K, "onclick", 'location.href\x3d"' + u.match(d)[1] + '"'), g(K, {cursor: "pointer"}));
                            u = (u.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                            if (" " !== u) {
                                K.appendChild(q.createTextNode(u));
                                e ? y.dx = 0 : f && null !== v && (y.x = v);
                                k(K, y);
                                b.appendChild(K);
                                !e && f && (!Q && x && g(K, {display: "block"}), k(K, "dy", H(K)));
                                if (t) {
                                    y = u.replace(/([^\^])-/g, "$1- ").split(" ");
                                    w = "nowrap" === N.whiteSpace;
                                    for (var h = 1 < c.length || f || 1 < y.length && !w, P, D, G = [], I = H(K), C = a.rotation, M = u, O = M.length; (h || z) && (y.length || G.length);)a.rotation = 0, P = a.getBBox(!0), D = P.width, !Q && l.forExport && (D = l.measureSpanWidth(K.firstChild.data, a.styles)), P = D > t, void 0 === m && (m = P), z && m ? (O /= 2, "" === M || !P && .5 > O ? y = [] : (M = u.substring(0, M.length + (P ? -1 : 1) * Math.ceil(O)), y = [M + (3 < t ? "\u2026" : "")], K.removeChild(K.firstChild))) : P && 1 !== y.length ? (K.removeChild(K.firstChild), G.unshift(y.pop())) : (y = G, G = [], y.length && !w && (K = q.createElementNS(R, "tspan"),
                                        k(K, {
                                            dy: I,
                                            x: v
                                        }), n && k(K, "style", n), b.appendChild(K)), D > t && (t = D)), y.length && K.appendChild(q.createTextNode(y.join(" ").replace(/- /g, "-")));
                                    a.rotation = C
                                }
                                e++
                            }
                        }
                    })
                }), m && a.attr("title", a.textStr), I && I.removeChild(b), h && a.applyTextOutline && a.applyTextOutline(h)) : b.appendChild(q.createTextNode(u.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            }, getContrast: function (a) {
                a = h(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a, b, l, u, f, c, e, r, p) {
                var x = this.label(a, b, l, p, null, null, null, null,
                    "button"), d = 0;
                x.attr(J({padding: 8, r: 2}, f));
                F(x.element, m ? "mouseover" : "mouseenter", function () {
                    3 !== d && x.setState(1)
                });
                F(x.element, m ? "mouseout" : "mouseleave", function () {
                    3 !== d && x.setState(d)
                });
                x.setState = function (a) {
                    1 !== a && (x.state = d = a);
                    x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0])
                };
                return x.on("click", function (a) {
                    3 !== d && u.call(x, a)
                })
            }, crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            }, path: function (a) {
                var b = {};
                v(a) ? b.d = a : D(a) && C(b, a);
                return this.createElement("path").attr(b)
            }, circle: function (a, b, l) {
                a = D(a) ? a : {x: a, y: b, r: l};
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, l) {
                    l.setAttribute("c" + b, a)
                };
                return b.attr(a)
            }, arc: function (a, b, l, u, f, c) {
                D(a) && (b = a.y, l = a.r, u = a.innerR, f = a.start, c = a.end, a = a.x);
                a = this.symbol("arc", a || 0, b || 0, l || 0, l || 0, {innerR: u || 0, start: f || 0, end: c || 0});
                a.r = l;
                return a
            }, rect: function (a, b, l, u,
                               f, c) {
                f = D(a) ? a.r : f;
                c = this.createElement("rect");
                a = D(a) ? a : void 0 === a ? {} : {x: a, y: b, width: Math.max(l, 0), height: Math.max(u, 0)};
                f && (a.r = f);
                c.rSetter = function (a, b, l) {
                    k(l, {rx: a, ry: a})
                };
                return c.attr(a)
            }, setSize: function (a, b, l) {
                var u = this.alignedObjects, f = u.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({width: a, height: b}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: y(l, !0) ? void 0 : 0
                }); f--;)u[f].align()
            }, g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({"class": "highcharts-" + a}) : b
            }, image: function (a, b, l, u, f) {
                var x = {preserveAspectRatio: "none"};
                1 < arguments.length && C(x, {x: b, y: l, width: u, height: f});
                x = this.createElement("image").attr(x);
                x.element.setAttributeNS ? x.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : x.element.setAttribute("hc-svg-href", a);
                return x
            }, symbol: function (a, b, l, u, f, c) {
                var x = this, e, r = this.symbols[a], p = t(b) && r && r(Math.round(b), Math.round(l), u, f, c), m = /^url\((.*?)\)$/, v, N;
                r ? (e = this.path(p), C(e, {
                    symbolName: a,
                    x: b, y: l, width: u, height: f
                }), c && C(e, c)) : m.test(a) && (v = a.match(m)[1], e = this.image(v), e.imgwidth = y(O[v] && O[v].width, c && c.width), e.imgheight = y(O[v] && O[v].height, c && c.height), N = function () {
                    e.attr({width: e.width, height: e.height})
                }, w(["width", "height"], function (a) {
                    e[a + "Setter"] = function (a, b) {
                        var l = {}, u = this["img" + b], f = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        t(u) && (this.element && this.element.setAttribute(b, u), this.alignByTranslate || (l[f] = ((this[b] || 0) - u) / 2, this.attr(l)))
                    }
                }), t(b) && e.attr({x: b, y: l}),
                    e.isImg = !0, t(e.imgwidth) && t(e.imgheight) ? N() : (e.attr({
                    width: 0,
                    height: 0
                }), n("img", {
                    onload: function () {
                        var a = d[x.chartIndex];
                        0 === this.width && (g(this, {position: "absolute", top: "-999em"}), q.body.appendChild(this));
                        O[v] = {width: this.width, height: this.height};
                        e.imgwidth = this.width;
                        e.imgheight = this.height;
                        e.element && N();
                        this.parentNode && this.parentNode.removeChild(this);
                        x.imgCount--;
                        if (!x.imgCount && a && a.onload)a.onload()
                    }, src: v
                }), this.imgCount++));
                return e
            }, symbols: {
                circle: function (a, b, l, u) {
                    var f = .166 * l;
                    return ["M",
                        a + l / 2, b, "C", a + l + f, b, a + l + f, b + u, a + l / 2, b + u, "C", a - f, b + u, a - f, b, a + l / 2, b, "Z"]
                }, square: function (a, b, l, u) {
                    return ["M", a, b, "L", a + l, b, a + l, b + u, a, b + u, "Z"]
                }, triangle: function (a, b, l, u) {
                    return ["M", a + l / 2, b, "L", a + l, b + u, a, b + u, "Z"]
                }, "triangle-down": function (a, b, l, u) {
                    return ["M", a, b, "L", a + l, b, a + l / 2, b + u, "Z"]
                }, diamond: function (a, b, l, u) {
                    return ["M", a + l / 2, b, "L", a + l, b + u / 2, a + l / 2, b + u, a, b + u / 2, "Z"]
                }, arc: function (a, b, l, u, f) {
                    var c = f.start;
                    l = f.r || l || u;
                    var x = f.end - .001;
                    u = f.innerR;
                    var e = f.open, r = Math.cos(c), p = Math.sin(c), d = Math.cos(x),
                        x = Math.sin(x);
                    f = f.end - c < Math.PI ? 0 : 1;
                    return ["M", a + l * r, b + l * p, "A", l, l, 0, f, 1, a + l * d, b + l * x, e ? "M" : "L", a + u * d, b + u * x, "A", u, u, 0, f, 0, a + u * r, b + u * p, e ? "" : "Z"]
                }, callout: function (a, b, l, u, f) {
                    var c = Math.min(f && f.r || 0, l, u), e = c + 6, x = f && f.anchorX;
                    f = f && f.anchorY;
                    var r;
                    r = ["M", a + c, b, "L", a + l - c, b, "C", a + l, b, a + l, b, a + l, b + c, "L", a + l, b + u - c, "C", a + l, b + u, a + l, b + u, a + l - c, b + u, "L", a + c, b + u, "C", a, b + u, a, b + u, a, b + u - c, "L", a, b + c, "C", a, b, a, b, a + c, b];
                    x && x > l ? f > b + e && f < b + u - e ? r.splice(13, 3, "L", a + l, f - 6, a + l + 6, f, a + l, f + 6, a + l, b + u - c) : r.splice(13, 3, "L", a + l, u /
                        2, x, f, a + l, u / 2, a + l, b + u - c) : x && 0 > x ? f > b + e && f < b + u - e ? r.splice(33, 3, "L", a, f + 6, a - 6, f, a, f - 6, a, b + c) : r.splice(33, 3, "L", a, u / 2, x, f, a, u / 2, a, b + c) : f && f > u && x > a + e && x < a + l - e ? r.splice(23, 3, "L", x + 6, b + u, x, b + u + 6, x - 6, b + u, a + c, b + u) : f && 0 > f && x > a + e && x < a + l - e && r.splice(3, 3, "L", x - 6, b, x, b - 6, x + 6, b, l - c, b);
                    return r
                }
            }, clipRect: function (b, l, u, f) {
                var c = a.uniqueKey(), e = this.createElement("clipPath").attr({id: c}).add(this.defs);
                b = this.rect(b, l, u, f, 0).add(e);
                b.id = c;
                b.clipPath = e;
                b.count = 0;
                return b
            }, text: function (a, b, l, u) {
                var f = !Q && this.forExport,
                    c = {};
                if (u && (this.allowHTML || !this.forExport))return this.html(a, b, l);
                c.x = Math.round(b || 0);
                l && (c.y = Math.round(l));
                if (a || 0 === a)c.text = a;
                a = this.createElement("text").attr(c);
                f && a.css({position: "absolute"});
                u || (a.xSetter = function (a, b, l) {
                    var u = l.getElementsByTagName("tspan"), f, c = l.getAttribute(b), e;
                    for (e = 0; e < u.length; e++)f = u[e], f.getAttribute(b) === c && f.setAttribute(b, a);
                    l.setAttribute(b, a)
                });
                return a
            }, fontMetrics: function (a, b) {
                a = b && A.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? G(a) : /em/.test(a) ?
                parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: b, b: Math.round(.8 * b), f: a}
            }, rotCorr: function (a, b, l) {
                var u = a;
                b && l && (u = Math.max(u * Math.cos(b * c), 4));
                return {x: -a / 3 * Math.sin(b * c), y: u}
            }, label: function (a, b, l, u, f, c, e, r, p) {
                var x = this, d = x.g("button" !== p && "label"), m = d.text = x.text("", 0, 0, e).attr({zIndex: 1}), y, v, g = 0, q = 3, N = 0, n, h, D, z, G, I = {}, R, H = /^url\((.*?)\)$/.test(u), Q = H, k, K, P, O;
                p && d.addClass("highcharts-" + p);
                Q = !0;
                k = function () {
                    return y.strokeWidth() % 2 / 2
                };
                K = function () {
                    var a =
                        m.element.style, b = {};
                    v = (void 0 === n || void 0 === h || G) && t(m.textStr) && m.getBBox();
                    d.width = (n || v.width || 0) + 2 * q + N;
                    d.height = (h || v.height || 0) + 2 * q;
                    R = q + x.fontMetrics(a && a.fontSize, m).b;
                    Q && (y || (d.box = y = x.symbols[u] || H ? x.symbol(u) : x.rect(), y.addClass(("button" === p ? "" : "highcharts-label-box") + (p ? " highcharts-" + p + "-box" : "")), y.add(d), a = k(), b.x = a, b.y = (r ? -R : 0) + a), b.width = Math.round(d.width), b.height = Math.round(d.height), y.attr(C(b, I)), I = {})
                };
                P = function () {
                    var a = N + q, b;
                    b = r ? 0 : R;
                    t(n) && v && ("center" === G || "right" === G) && (a +=
                        {center: .5, right: 1}[G] * (n - v.width));
                    if (a !== m.x || b !== m.y)m.attr("x", a), void 0 !== b && m.attr("y", b);
                    m.x = a;
                    m.y = b
                };
                O = function (a, b) {
                    y ? y.attr(a, b) : I[a] = b
                };
                d.onAdd = function () {
                    m.add(d);
                    d.attr({text: a || 0 === a ? a : "", x: b, y: l});
                    y && t(f) && d.attr({anchorX: f, anchorY: c})
                };
                d.widthSetter = function (a) {
                    n = a
                };
                d.heightSetter = function (a) {
                    h = a
                };
                d["text-alignSetter"] = function (a) {
                    G = a
                };
                d.paddingSetter = function (a) {
                    t(a) && a !== q && (q = d.padding = a, P())
                };
                d.paddingLeftSetter = function (a) {
                    t(a) && a !== N && (N = a, P())
                };
                d.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5, right: 1
                    }[a];
                    a !== g && (g = a, v && d.attr({x: D}))
                };
                d.textSetter = function (a) {
                    void 0 !== a && m.textSetter(a);
                    K();
                    P()
                };
                d["stroke-widthSetter"] = function (a, b) {
                    a && (Q = !0);
                    this["stroke-width"] = a;
                    O(b, a)
                };
                d.rSetter = function (a, b) {
                    O(b, a)
                };
                d.anchorXSetter = function (a, b) {
                    f = a;
                    O(b, Math.round(a) - k() - D)
                };
                d.anchorYSetter = function (a, b) {
                    c = a;
                    O(b, a - z)
                };
                d.xSetter = function (a) {
                    d.x = a;
                    g && (a -= g * ((n || v.width) + 2 * q));
                    D = Math.round(a);
                    d.attr("translateX", D)
                };
                d.ySetter = function (a) {
                    z = d.y = Math.round(a);
                    d.attr("translateY", z)
                };
                var T = d.css;
                return C(d, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = J(a);
                            w(d.textProps, function (l) {
                                void 0 !== a[l] && (b[l] = a[l], delete a[l])
                            });
                            m.css(b)
                        }
                        return T.call(d, a)
                    }, getBBox: function () {
                        return {width: v.width + 2 * q, height: v.height + 2 * q, x: v.x - q, y: v.y - q}
                    }, destroy: function () {
                        M(d.element, "mouseenter");
                        M(d.element, "mouseleave");
                        m && (m = m.destroy());
                        y && (y = y.destroy());
                        A.prototype.destroy.call(d);
                        d = x = K = P = O = null
                    }
                })
            }
        };
        a.Renderer = B
    })(L);
    (function (a) {
        var A = a.attr, B = a.createElement, F = a.css, E = a.defined, k = a.each, d = a.extend, h = a.isFirefox,
            g = a.isMS, n = a.isWebKit, t = a.pInt, c = a.SVGRenderer, e = a.win, q = a.wrap;
        d(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c = a && "SPAN" === c.tagName && a.width)delete a.width, this.textWidth = c, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = d(this.styles, a);
                F(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth,
                    height: a.offsetHeight
                }
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, c = this.element, b = this.x || 0, f = this.y || 0, e = this.textAlign || "left", d = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[e], g = this.styles;
                    F(c, {marginLeft: this.translateX || 0, marginTop: this.translateY || 0});
                    this.inverted && k(c.childNodes, function (b) {
                        a.invertChild(b, c)
                    });
                    if ("SPAN" === c.tagName) {
                        var m = this.rotation, q = t(this.textWidth), h = g && g.whiteSpace, z = [m, e, c.innerHTML, this.textWidth, this.textAlign].join();
                        z !== this.cTT && (g = a.fontMetrics(c.style.fontSize).b,
                        E(m) && this.setSpanRotation(m, d, g), F(c, {
                            width: "",
                            whiteSpace: h || "nowrap"
                        }), c.offsetWidth > q && /[ \-]/.test(c.textContent || c.innerText) && F(c, {
                            width: q + "px",
                            display: "block",
                            whiteSpace: h || "normal"
                        }), this.getSpanCorrection(c.offsetWidth, g, d, m, e));
                        F(c, {left: b + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                        n && (g = c.offsetHeight);
                        this.cTT = z
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, c, b) {
                var f = {}, d = g ? "-ms-transform" : n ? "-webkit-transform" : h ? "MozTransform" : e.opera ? "-o-transform" : "";
                f[d] = f.transform =
                    "rotate(" + a + "deg)";
                f[d + (h ? "Origin" : "-origin")] = f.transformOrigin = 100 * c + "% " + b + "px";
                F(this.element, f)
            }, getSpanCorrection: function (a, c, b) {
                this.xCorr = -a * b;
                this.yCorr = -c
            }
        });
        d(c.prototype, {
            html: function (a, c, b) {
                var f = this.createElement("span"), e = f.element, v = f.renderer, g = v.isSVG, m = function (a, b) {
                    k(["opacity", "visibility"], function (f) {
                        q(a, f + "Setter", function (a, f, c, e) {
                            a.call(this, f, c, e);
                            b[c] = f
                        })
                    })
                };
                f.textSetter = function (a) {
                    a !== e.innerHTML && delete this.bBox;
                    e.innerHTML = this.textStr = a;
                    f.htmlUpdateTransform()
                };
                g && m(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    f[b] = a;
                    f.htmlUpdateTransform()
                };
                f.attr({text: a, x: Math.round(c), y: Math.round(b)}).css({position: "absolute"});
                e.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                g && (f.add = function (a) {
                    var b, c = v.box.parentNode, p = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;)p.push(a), a = a.parentGroup;
                            k(p.reverse(), function (a) {
                                var f, e = A(a.element, "class");
                                e && (e = {className: e});
                                b = a.div = a.div || B("div", e, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, b || c);
                                f = b.style;
                                d(a, {
                                    translateXSetter: function (b, l) {
                                        f.left = b + "px";
                                        a[l] = b;
                                        a.doTransform = !0
                                    }, translateYSetter: function (b, l) {
                                        f.top = b + "px";
                                        a[l] = b;
                                        a.doTransform = !0
                                    }
                                });
                                m(a, f)
                            })
                        }
                    } else b = c;
                    b.appendChild(e);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    })(L);
    (function (a) {
        function A() {
            var h = a.defaultOptions.global, g, n = h.useUTC, t = n ? "getUTC" : "get",
                c = n ? "setUTC" : "set";
            a.Date = g = h.Date || d.Date;
            g.hcTimezoneOffset = n && h.timezoneOffset;
            g.hcGetTimezoneOffset = n && h.getTimezoneOffset;
            g.hcMakeTime = function (a, c, d, t, b, f) {
                var e;
                n ? (e = g.UTC.apply(0, arguments), e += F(e)) : e = (new g(a, c, k(d, 1), k(t, 0), k(b, 0), k(f, 0))).getTime();
                return e
            };
            B("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                g["hcGet" + a] = t + a
            });
            B("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                g["hcSet" + a] = c + a
            })
        }

        var B = a.each, F = a.getTZOffset, E = a.merge, k = a.pick,
            d = a.win;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0},
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ?
                    25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (d) {
            a.defaultOptions = E(!0, a.defaultOptions, d);
            A();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        A()
    })(L);
    (function (a) {
        var A = a.arrayMax, B = a.arrayMin, F = a.defined, E = a.destroyObjectProperties, k = a.each, d = a.erase, h = a.merge, g = a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this, d = a.axis, c = d.horiz, e = a.options, q = e.label, w = a.label, k = e.to, b = e.from, f = e.value, p = F(b) && F(k), v = F(f), H = a.svgElem, m = !H, D = [], I, z = g(e.zIndex, 0), J = e.events, D = {
                    "class": "highcharts-plot-" + (p ? "band " :
                        "line ") + (e.className || "")
                }, r = {}, y = d.chart.renderer, G = p ? "bands" : "lines", M;
                M = d.log2lin;
                d.isLog && (b = M(b), k = M(k), f = M(f));
                r.zIndex = z;
                G += "-" + z;
                (M = d[G]) || (d[G] = M = y.g("plot-" + G).attr(r).add());
                m && (a.svgElem = H = y.path().attr(D).add(M));
                if (v)D = d.getPlotLinePath(f, H.strokeWidth()); else if (p)D = d.getPlotBandPath(b, k, e); else return;
                if (m && D && D.length) {
                    if (H.attr({d: D}), J)for (I in e = function (b) {
                        H.on(b, function (l) {
                            J[b].apply(a, [l])
                        })
                    }, J)e(I)
                } else H && (D ? (H.show(), H.animate({d: D})) : (H.hide(), w && (a.label = w = w.destroy())));
                q && F(q.text) && D && D.length && 0 < d.width && 0 < d.height && !D.flat ? (q = h({
                    align: c && p && "center",
                    x: c ? !p && 4 : 10,
                    verticalAlign: !c && p && "middle",
                    y: c ? p ? 16 : 10 : p ? 6 : -4,
                    rotation: c && !p && 90
                }, q), this.renderLabel(q, D, p, z)) : w && w.hide();
                return a
            }, renderLabel: function (a, d, c, e) {
                var g = this.label, h = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = e, this.label = g = h.text(a.text, 0, 0, a.useHTML).attr(g).add());
                e = [d[1], d[4],
                    c ? d[6] : d[1]];
                d = [d[2], d[5], c ? d[7] : d[2]];
                c = B(e);
                h = B(d);
                g.align(a, !1, {x: c, y: h, width: A(e) - c, height: A(d) - h});
                g.show()
            }, destroy: function () {
                d(this.axis.plotLinesAndBands, this);
                delete this.axis;
                E(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, d) {
                d = this.getPlotLinePath(d, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && d ? (a.flat = a.toString() === d.toString(), a.push(d[4], d[5], d[1], d[2], "z")) : a = null;
                return a
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotLines")
            }, addPlotBandOrLine: function (d, g) {
                var c = (new a.PlotLineOrBand(this, d)).render(), e = this.userOptions;
                c && (g && (e[g] = e[g] || [], e[g].push(d)), this.plotLinesAndBands.push(c));
                return c
            }, removePlotBandOrLine: function (a) {
                for (var g = this.plotLinesAndBands, c = this.options, e = this.userOptions, q = g.length; q--;)g[q].id === a && g[q].destroy();
                k([c.plotLines || [], e.plotLines || [], c.plotBands || [], e.plotBands || []], function (c) {
                    for (q = c.length; q--;)c[q].id === a && d(c, c[q])
                })
            }
        }
    })(L);
    (function (a) {
        var A = a.correctFloat, B =
            a.defined, F = a.destroyObjectProperties, E = a.isNumber, k = a.pick, d = a.stop, h = a.deg2rad;
        a.Tick = function (a, d, h, c) {
            this.axis = a;
            this.pos = d;
            this.type = h || "";
            this.isNew = !0;
            h || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, d = a.options, h = a.chart, c = a.categories, e = a.names, q = this.pos, w = d.labels, C = a.tickPositions, b = q === C[0], f = q === C[C.length - 1], e = c ? k(c[q], e[q], q) : q, c = this.label, C = C.info, p;
                a.isDatetimeAxis && C && (p = d.dateTimeLabelFormats[C.higherRanks[q] || C.unitName]);
                this.isFirst = b;
                this.isLast =
                    f;
                d = a.labelFormatter.call({
                    axis: a,
                    chart: h,
                    isFirst: b,
                    isLast: f,
                    dateTimeLabelFormat: p,
                    value: a.isLog ? A(a.lin2log(e)) : e
                });
                B(c) ? c && c.attr({text: d}) : (this.labelLength = (this.label = c = B(d) && w.enabled ? h.renderer.text(d, 0, 0, w.useHTML).add(a.labelGroup) : null) && c.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var d = this.axis, g = a.x, c = d.chart.chartWidth, e = d.chart.spacing, q = k(d.labelLeft, Math.min(d.pos,
                    e[3])), e = k(d.labelRight, Math.max(d.pos + d.len, c - e[1])), w = this.label, C = this.rotation, b = {
                    left: 0,
                    center: .5,
                    right: 1
                }[d.labelAlign], f = w.getBBox().width, p = d.getSlotWidth(), v = p, H = 1, m, D = {};
                if (C)0 > C && g - b * f < q ? m = Math.round(g / Math.cos(C * h) - q) : 0 < C && g + b * f > e && (m = Math.round((c - g) / Math.cos(C * h))); else if (c = g + (1 - b) * f, g - b * f < q ? v = a.x + v * (1 - b) - q : c > e && (v = e - a.x + v * b, H = -1), v = Math.min(p, v), v < p && "center" === d.labelAlign && (a.x += H * (p - v - b * (p - Math.min(f, v)))), f > v || d.autoRotation && (w.styles || {}).width)m = v;
                m && (D.width = m, (d.options.labels.style ||
                {}).textOverflow || (D.textOverflow = "ellipsis"), w.css(D))
            }, getPosition: function (a, d, h, c) {
                var e = this.axis, g = e.chart, w = c && g.oldChartHeight || g.chartHeight;
                return {
                    x: a ? e.translate(d + h, null, null, c) + e.transB : e.left + e.offset + (e.opposite ? (c && g.oldChartWidth || g.chartWidth) - e.right - e.left : 0),
                    y: a ? w - e.bottom + e.offset - (e.opposite ? e.height : 0) : w - e.translate(d + h, null, null, c) - e.transB
                }
            }, getLabelPosition: function (a, d, k, c, e, q, w, C) {
                var b = this.axis, f = b.transA, p = b.reversed, v = b.staggerLines, g = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, m = e.y;
                B(m) || (m = 0 === b.side ? k.rotation ? -8 : -k.getBBox().height : 2 === b.side ? g.y + 8 : Math.cos(k.rotation * h) * (g.y - k.getBBox(!1, 0).height / 2));
                a = a + e.x + g.x - (q && c ? q * f * (p ? -1 : 1) : 0);
                d = d + m - (q && !c ? q * f * (p ? 1 : -1) : 0);
                v && (k = w / (C || 1) % v, b.opposite && (k = v - k - 1), d += b.labelOffset / v * k);
                return {x: a, y: Math.round(d)}
            }, getMarkPath: function (a, d, h, c, e, q) {
                return q.crispLine(["M", a, d, "L", a + (e ? 0 : -h), d + (e ? h : 0)], c)
            }, render: function (a, h, t) {
                var c = this.axis, e = c.options, g = c.chart.renderer, w = c.horiz, n = this.type, b = this.label, f = this.pos, p = e.labels, v = this.gridLine,
                    H = c.tickSize(n ? n + "Tick" : "tick"), m = this.mark, D = !m, I = p.step, z = {}, J = !0, r = c.tickmarkOffset, y = this.getPosition(w, f, r, h), G = y.x, y = y.y, M = w && G === c.pos + c.len || !w && y === c.pos ? -1 : 1;
                t = k(t, 1);
                this.isActive = !0;
                v || (n || (z.zIndex = 1), h && (z.opacity = 0), this.gridLine = v = g.path().attr(z).addClass("highcharts-" + (n ? n + "-" : "") + "grid-line").add(c.gridGroup));
                if (!h && v && (f = c.getPlotLinePath(f + r, v.strokeWidth() * M, h, !0)))v[this.isNew ? "attr" : "animate"]({
                    d: f,
                    opacity: t
                });
                H && (c.opposite && (H[0] = -H[0]), D && (this.mark = m = g.path().addClass("highcharts-" +
                    (n ? n + "-" : "") + "tick").add(c.axisGroup)), m[D ? "attr" : "animate"]({
                    d: this.getMarkPath(G, y, H[0], m.strokeWidth() * M, w, g),
                    opacity: t
                }));
                b && E(G) && (b.xy = y = this.getLabelPosition(G, y, b, w, p, r, a, I), this.isFirst && !this.isLast && !k(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !k(e.showLastLabel, 1) ? J = !1 : !w || c.isRadial || p.step || p.rotation || h || 0 === t || this.handleOverflow(y), I && a % I && (J = !1), J && E(y.y) ? (y.opacity = t, b[this.isNew ? "attr" : "animate"](y)) : (d(b), b.attr("y", -9999)), this.isNew = !1)
            }, destroy: function () {
                F(this, this.axis)
            }
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.animObject, F = a.arrayMax, E = a.arrayMin, k = a.AxisPlotLineOrBandExtension, d = a.correctFloat, h = a.defaultOptions, g = a.defined, n = a.deg2rad, t = a.destroyObjectProperties, c = a.each, e = a.error, q = a.extend, w = a.fireEvent, C = a.format, b = a.getMagnitude, f = a.grep, p = a.inArray, v = a.isArray, H = a.isNumber, m = a.isString, D = a.merge, I = a.normalizeTickInterval, z = a.pick, J = a.PlotLineOrBand, r = a.removeEvent, y = a.splat, G = a.syncTimeout, M = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype =
        {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, x: 0},
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle"},
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    enabled: !1, formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }
                }
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, b) {
                var l = b.isX;
                this.chart = a;
                this.horiz =
                    a.inverted ? !l : l;
                this.isXAxis = l;
                this.coll = this.coll || (l ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var u = this.options, f = u.type;
                this.labelFormatter = u.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = u.reversed;
                this.visible = !1 !== u.visible;
                this.zoomEnabled = !1 !== u.zoomEnabled;
                this.hasNames = "category" === f || !0 === u.categories;
                this.categories = u.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === f;
                this.isDatetimeAxis = "datetime" === f;
                this.isLinked = g(u.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = u.minRange || u.maxZoom;
                this.range = u.range;
                this.offset = u.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = z(u.crosshair, y(a.options.tooltip.crosshairs)[l ? 0 : 1], !1);
                var c;
                b = this.options.events;
                -1 === p(this, a.axes) && (l ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && l && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (c in b)A(this, c, b[c]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = D(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions,
                    this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], D(h[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis, u = this.value, f = b.categories, c = this.dateTimeLabelFormat, d = h.lang, e = d.numericSymbols, d = d.numericSymbolMagnitude || 1E3, x = e && e.length, r, p = b.options.labels.format, b = b.isLog ? u : b.tickInterval;
                if (p)r = C(p, this); else if (f)r = u; else if (c)r = a.dateFormat(c, u); else if (x && 1E3 <= b)for (; x-- && void 0 === r;)f = Math.pow(d, x + 1), b >= f && 0 === 10 * u % f && null !== e[x] && 0 !== u && (r = a.numberFormat(u / f,
                        -1) + e[x]);
                void 0 === r && (r = 1E4 <= Math.abs(u) ? a.numberFormat(u, -1) : a.numberFormat(u, -1, void 0, ""));
                return r
            },
            getSeriesExtremes: function () {
                var a = this, b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                c(a.series, function (l) {
                    if (l.visible || !b.options.chart.ignoreHiddenSeries) {
                        var u = l.options, c = u.threshold, d;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= c && (c = null);
                        if (a.isXAxis)u = l.xData, u.length && (l = E(u), H(l) || l instanceof Date || (u = f(u, function (a) {
                            return H(a)
                        }),
                            l = E(u)), a.dataMin = Math.min(z(a.dataMin, u[0]), l), a.dataMax = Math.max(z(a.dataMax, u[0]), F(u))); else if (l.getExtremes(), d = l.dataMax, l = l.dataMin, g(l) && g(d) && (a.dataMin = Math.min(z(a.dataMin, l), l), a.dataMax = Math.max(z(a.dataMax, d), d)), g(c) && (a.threshold = c), !u.softThreshold || a.isLog)a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, f, c, d, e) {
                var l = this.linkedParent || this, u = 1, r = 0, p = c ? l.oldTransA : l.transA;
                c = c ? l.oldMin : l.min;
                var m = l.minPixelPadding;
                d = (l.isOrdinal || l.isBroken || l.isLog && d) && l.lin2val;
                p || (p = l.transA);
                f && (u *= -1, r = l.len);
                l.reversed && (u *= -1, r -= u * (l.sector || l.len));
                b ? (a = (a * u + r - m) / p + c, d && (a = l.lin2val(a))) : (d && (a = l.val2lin(a)), a = u * (a - c) * p + r + u * m + (H(e) ? p * e : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, f, c, d) {
                var l = this.chart, u = this.left, e = this.top, r, p, m = f && l.oldChartHeight || l.chartHeight, y = f && l.oldChartWidth || l.chartWidth, g;
                r = this.transB;
                var v = function (a, b, l) {
                    if (a < b || a > l)c ? a = Math.min(Math.max(b, a), l) : g = !0;
                    return a
                };
                d = z(d, this.translate(a, null, null, f));
                a = f = Math.round(d + r);
                r = p = Math.round(m - d - r);
                H(d) ? this.horiz ? (r = e, p = m - this.bottom, a = f = v(a, u, u + this.width)) : (a = u, f = y - this.right, r = p = v(r, e, e + this.height)) : g = !0;
                return g && !c ? null : l.renderer.crispLine(["M", a, r, "L", f, p], b || 1)
            },
            getLinearTickPositions: function (a, b, f) {
                var l, u = d(Math.floor(b / a) * a), c = d(Math.ceil(f / a) * a), e = [];
                if (b === f && H(b))return [b];
                for (b = u; b <= c;) {
                    e.push(b);
                    b = d(b + a);
                    if (b === l)break;
                    l = b
                }
                return e
            },
            getMinorTickPositions: function () {
                var a = this.options, b = this.tickPositions, f = this.minorTickInterval, c = [], d, e = this.pointRangePadding || 0;
                d = this.min - e;
                var e = this.max + e, r = e - d;
                if (r && r / f < this.len / 3)if (this.isLog)for (e = b.length, d = 1; d < e; d++)c = c.concat(this.getLogTickPositions(f, b[d - 1], b[d], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)c = c.concat(this.getTimeTicks(this.normalizeTimeTickInterval(f), d, e, a.startOfWeek)); else for (b = d + (b[0] - d) % f; b <= e && b !== c[0]; b += f)c.push(b);
                0 !== c.length &&
                this.trimTicks(c, a.startOnTick, a.endOnTick);
                return c
            },
            adjustForMinRange: function () {
                var a = this.options, b = this.min, f = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, r, p, m, y, v, q;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (g(a.min) || g(a.max) ? this.minRange = null : (c(this.series, function (a) {
                    y = a.xData;
                    for (p = v = a.xIncrement ? 1 : y.length - 1; 0 < p; p--)if (m = y[p] - y[p - 1], void 0 === r || m < r)r = m
                }), this.minRange = Math.min(5 * r, this.dataMax - this.dataMin)));
                f - b < this.minRange && (q = this.minRange, d = (q - f + b) / 2, d = [b - d, z(a.min,
                    b - d)], e && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(d), f = [b + q, z(a.max, b + q)], e && (f[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), f = E(f), f - b < q && (d[0] = f - q, d[1] = z(a.min, f - q), b = F(d)));
                this.min = b;
                this.max = f
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : c(this.series, function (b) {
                    var l = b.closestPointRange, f = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && g(l) && f && (a = g(a) ? Math.min(a, l) : l)
                });
                return a
            },
            nameToX: function (a) {
                var b = v(this.categories), l = b ? this.categories :
                    this.names, f = a.options.x, c;
                a.series.requireSorting = !1;
                g(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : p(a.name, l));
                -1 === f ? b || (c = l.length) : c = f;
                this.names[c] = a.name;
                return c
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, c(this.series || [], function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData)b.processData(), b.generatePoints();
                    c(b.points, function (l, f) {
                        var u;
                        l.options && void 0 === l.options.x && (u = a.nameToX(l), u !== l.x && (l.x = u, b.xData[f] =
                            u))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, l = b.max - b.min, f = b.axisPointRange || 0, d, e = 0, r = 0, p = b.linkedParent, y = !!b.categories, g = b.transA, v = b.isXAxis;
                if (v || y || f)p ? (e = p.minPointOffset, r = p.pointRangePadding) : (d = b.getClosest(), c(b.series, function (a) {
                    var l = y ? 1 : v ? z(a.options.pointRange, d, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    f = Math.max(f, l);
                    b.single || (e = Math.max(e, m(a) ? 0 : l / 2), r = Math.max(r, "on" === a ? 0 : l))
                })), p = b.ordinalSlope && d ? b.ordinalSlope / d : 1, b.minPointOffset = e *= p, b.pointRangePadding =
                    r *= p, b.pointRange = Math.min(f, l), v && (b.closestPointRange = d);
                a && (b.oldTransA = g);
                b.translationSlope = b.transA = g = b.len / (l + r || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = g * e
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (a) {
                var l = this, f = l.chart, r = l.options, p = l.isLog, m = l.log2lin, x = l.isDatetimeAxis, y = l.isXAxis, v = l.isLinked, q = r.maxPadding, h = r.minPadding, G = r.tickInterval, D = r.tickPixelInterval, k = l.categories, n = l.threshold, M = l.softThreshold, t, C, J, A;
                x || k || v || this.getTickAmount();
                J = z(l.userMin, r.min);
                A = z(l.userMax, r.max);
                v ? (l.linkedParent = f[l.coll][r.linkedTo], f = l.linkedParent.getExtremes(), l.min = z(f.min, f.dataMin), l.max = z(f.max, f.dataMax), r.type !== l.linkedParent.options.type && e(11, 1)) : (!M && g(n) && (l.dataMin >= n ? (t = n, h = 0) : l.dataMax <= n && (C = n, q = 0)), l.min = z(J, t, l.dataMin), l.max = z(A, C, l.dataMax));
                p && (!a && 0 >= Math.min(l.min, z(l.dataMin, l.min)) && e(10, 1), l.min = d(m(l.min), 15), l.max = d(m(l.max), 15));
                l.range && g(l.max) && (l.userMin = l.min = J = Math.max(l.min, l.minFromRange()), l.userMax = A = l.max,
                    l.range = null);
                w(l, "foundExtremes");
                l.beforePadding && l.beforePadding();
                l.adjustForMinRange();
                !(k || l.axisPointRange || l.usePercentage || v) && g(l.min) && g(l.max) && (m = l.max - l.min) && (!g(J) && h && (l.min -= m * h), !g(A) && q && (l.max += m * q));
                H(r.floor) ? l.min = Math.max(l.min, r.floor) : H(r.softMin) && (l.min = Math.min(l.min, r.softMin));
                H(r.ceiling) ? l.max = Math.min(l.max, r.ceiling) : H(r.softMax) && (l.max = Math.max(l.max, r.softMax));
                M && g(l.dataMin) && (n = n || 0, !g(J) && l.min < n && l.dataMin >= n ? l.min = n : !g(A) && l.max > n && l.dataMax <= n && (l.max =
                    n));
                l.tickInterval = l.min === l.max || void 0 === l.min || void 0 === l.max ? 1 : v && !G && D === l.linkedParent.options.tickPixelInterval ? G = l.linkedParent.tickInterval : z(G, this.tickAmount ? (l.max - l.min) / Math.max(this.tickAmount - 1, 1) : void 0, k ? 1 : (l.max - l.min) * D / Math.max(l.len, D));
                y && !a && c(l.series, function (a) {
                    a.processData(l.min !== l.oldMin || l.max !== l.oldMax)
                });
                l.setAxisTranslation(!0);
                l.beforeSetTickPositions && l.beforeSetTickPositions();
                l.postProcessTickInterval && (l.tickInterval = l.postProcessTickInterval(l.tickInterval));
                l.pointRange && !G && (l.tickInterval = Math.max(l.pointRange, l.tickInterval));
                a = z(r.minTickInterval, l.isDatetimeAxis && l.closestPointRange);
                !G && l.tickInterval < a && (l.tickInterval = a);
                x || p || G || (l.tickInterval = I(l.tickInterval, null, b(l.tickInterval), z(r.allowDecimals, !(.5 < l.tickInterval && 5 > l.tickInterval && 1E3 < l.max && 9999 > l.max)), !!this.tickAmount));
                this.tickAmount || (l.tickInterval = l.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b, f = a.tickPositions, c = a.tickPositioner, d =
                    a.startOnTick, e = a.endOnTick, r;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = f && f.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval,
                    this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = b = c);
                this.isLinked || (this.trimTicks(b, d, e), this.min === this.max && g(this.min) && !this.tickAmount && (r = !0, this.min -= .5, this.max += .5), this.single = r, f || c || this.adjustTickAmount())
            },
            trimTicks: function (a, b, f) {
                var l = a[0], c = a[a.length - 1], d = this.minPointOffset || 0;
                if (b)this.min = l; else for (; this.min - d > a[0];)a.shift();
                if (f)this.max = c; else for (; this.max + d < a[a.length - 1];)a.pop();
                0 === a.length && g(l) && a.push((c + l) / 2)
            },
            alignToOthers: function () {
                var a = {}, b, f = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== f.alignTicks && c(this.chart[this.coll], function (l) {
                    var f = l.options, f = [l.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                    l.series.length && (a[f] ? b = !0 : a[f] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, f = a.tickPixelInterval;
                !g(a.tickInterval) && this.len < f && !this.isRadial && !this.isLog &&
                a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / f) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, f = this.tickAmount, c = this.finalTickAmt, e = b && b.length;
                if (e < f) {
                    for (; b.length < f;)b.push(d(b[b.length - 1] + a));
                    this.transA *= (e - 1) / (f - 1);
                    this.max = b[b.length - 1]
                } else e > f && (this.tickInterval *= 2, this.setTickPositions());
                if (g(c)) {
                    for (a = f = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < f - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                c(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin,
                    this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, f, d, e) {
                var l = this, r = l.chart;
                f = z(f, !0);
                c(l.series, function (a) {
                    delete a.kdTree
                });
                e = q(e, {min: a, max: b});
                w(l, "setExtremes", e, function () {
                    l.userMin = a;
                    l.userMax = b;
                    l.eventArgs = e;
                    f && r.redraw(d)
                })
            },
            zoom: function (a, b) {
                var l = this.dataMin, f = this.dataMax, c = this.options, d = Math.min(l, z(c.min, l)), c = Math.max(f, z(c.max, f));
                if (a !== this.min || b !== this.max)this.allowZoomOutside ||
                (g(l) && a <= d && (a = d), g(f) && b >= c && (b = c)), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var a = this.chart, b = this.options, f = b.offsetLeft || 0, c = this.horiz, d = z(b.width, a.plotWidth - f + (b.offsetRight || 0)), e = z(b.height, a.plotHeight), r = z(b.top, a.plotTop), b = z(b.left, a.plotLeft + f), f = /%$/;
                f.test(e) && (e = Math.round(parseFloat(e) / 100 * a.plotHeight));
                f.test(r) && (r = Math.round(parseFloat(r) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = r;
                this.width =
                    d;
                this.height = e;
                this.bottom = a.chartHeight - e - r;
                this.right = a.chartWidth - d - b;
                this.len = Math.max(c ? d : e, 0);
                this.pos = c ? b : r
            },
            getExtremes: function () {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? d(b(this.min)) : this.min,
                    max: a ? d(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, l = this.lin2log, f = b ? l(this.min) : this.min, b = b ? l(this.max) : this.max;
                null === a ? a = f : f > a ? a = f : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a =
                    (z(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, l = b[a + "Length"], f = z(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (f && l)return "inside" === b[a + "Position"] && (l = -l), [l, f]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, f = this.tickInterval, d = f, e = this.len /
                    (((this.categories ? 1 : 0) + this.max - this.min) / f), r, p = a.rotation, m = this.labelMetrics(), y, v = Number.MAX_VALUE, q, h = function (a) {
                    a /= e || 1;
                    a = 1 < a ? Math.ceil(a) : 1;
                    return a * f
                };
                b ? (q = !a.staggerLines && !a.step && (g(p) ? [p] : e < z(a.autoRotationLimit, 80) && a.autoRotation)) && c(q, function (a) {
                    var b;
                    if (a === p || a && -90 <= a && 90 >= a)y = h(Math.abs(m.h / Math.sin(n * a))), b = y + Math.abs(a / 360), b < v && (v = b, r = a, d = y)
                }) : a.step || (d = h(m.h));
                this.autoRotation = q;
                this.labelRotation = z(r, p);
                return d
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz,
                    f = this.options.labels, c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), d = a.margin[3];
                return b && 2 > (f.step || 0) && !f.rotation && (this.staggerLines || 1) * a.plotWidth / c || !b && (d && d - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, f = this.tickPositions, d = this.ticks, e = this.options.labels, r = this.horiz, p = this.getSlotWidth(), y = Math.max(1, Math.round(p - 2 * (e.padding || 5))), v = {}, g = this.labelMetrics(), q = e.style && e.style.textOverflow, h, G = 0, z, w;
                m(e.rotation) || (v.rotation =
                    e.rotation || 0);
                c(f, function (a) {
                    (a = d[a]) && a.labelLength > G && (G = a.labelLength)
                });
                this.maxLabelLength = G;
                if (this.autoRotation)G > y && G > g.h ? v.rotation = this.labelRotation : this.labelRotation = 0; else if (p && (h = {width: y + "px"}, !q))for (h.textOverflow = "clip", z = f.length; !r && z--;)if (w = f[z], y = d[w].label)y.styles && "ellipsis" === y.styles.textOverflow ? y.css({textOverflow: "clip"}) : d[w].labelLength > p && y.css({width: p + "px"}), y.getBBox().height > this.len / f.length - (g.h - g.f) && (y.specCss = {textOverflow: "ellipsis"});
                v.rotation && (h =
                {width: (G > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, q || (h.textOverflow = "ellipsis"));
                if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation))v.align = this.labelAlign;
                c(f, function (a) {
                    var b = (a = d[a]) && a.label;
                    b && (b.attr(v), h && b.css(D(h, b.specCss)), delete b.specCss, a.rotation = v.rotation)
                });
                this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || g(this.min) && g(this.max) && !!this.tickPositions
            },
            getOffset: function () {
                var a =
                    this, b = a.chart, f = b.renderer, d = a.options, e = a.tickPositions, r = a.ticks, p = a.horiz, m = a.side, y = b.inverted ? [1, 0, 3, 2][m] : m, v, q, h = 0, G, w = 0, D = d.title, I = d.labels, k = 0, n = a.opposite, H = b.axisOffset, b = b.clipOffset, t = [-1, 1, 1, -1][m], C, J = d.className, A = a.axisParent, B = this.tickSize("tick");
                v = a.hasData();
                a.showAxis = q = v || z(d.showEmpty, !0);
                a.staggerLines = a.horiz && I.staggerLines;
                a.axisGroup || (a.gridGroup = f.g("grid").attr({zIndex: d.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (J || "")).add(A), a.axisGroup =
                    f.g("axis").attr({zIndex: d.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (J || "")).add(A), a.labelGroup = f.g("axis-labels").attr({zIndex: I.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (J || "")).add(A));
                if (v || a.isLinked)c(e, function (b) {
                    r[b] ? r[b].addLabel() : r[b] = new M(a, b)
                }), a.renderUnsquish(), !1 === I.reserveSpace || 0 !== m && 2 !== m && {
                    1: "left",
                    3: "right"
                }[m] !== a.labelAlign && "center" !== a.labelAlign || c(e, function (a) {
                    k = Math.max(r[a].getLabelSize(), k)
                }), a.staggerLines && (k *= a.staggerLines,
                    a.labelOffset = k * (a.opposite ? -1 : 1)); else for (C in r)r[C].destroy(), delete r[C];
                D && D.text && !1 !== D.enabled && (a.axisTitle || ((C = D.textAlign) || (C = (p ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: n ? "right" : "left",
                    middle: "center",
                    high: n ? "left" : "right"
                })[D.align]), a.axisTitle = f.text(D.text, 0, 0, D.useHTML).attr({
                    zIndex: 7,
                    rotation: D.rotation || 0,
                    align: C
                }).addClass("highcharts-axis-title").add(a.axisGroup), a.axisTitle.isNew = !0), q && (h = a.axisTitle.getBBox()[p ? "height" : "width"], G = D.offset, w = g(G) ? 0 : z(D.margin, p ? 5 :
                    10)), a.axisTitle[q ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = t * z(d.offset, H[m]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                f = 0 === m ? -a.labelMetrics().h : 2 === m ? a.tickRotCorr.y : 0;
                w = Math.abs(k) + w;
                k && (w = w - f + t * (p ? z(I.y, a.tickRotCorr.y + 8 * t) : I.x));
                a.axisTitleMargin = z(G, w);
                H[m] = Math.max(H[m], a.axisTitleMargin + h + t * a.offset, w, v && e.length && B ? B[0] : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[y] = Math.max(b[y], d)
            },
            getLinePath: function (a) {
                var b = this.chart, f = this.opposite, l = this.offset, c = this.horiz, d = this.left +
                    (f ? this.width : 0) + l, l = b.chartHeight - this.bottom - (f ? this.height : 0) + l;
                f && (a *= -1);
                return b.renderer.crispLine(["M", c ? this.left : d, c ? l : this.top, "L", c ? b.chartWidth - this.right : d, c ? l : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, f = this.top, c = this.len, d = this.options.title, e = a ? b : f, r = this.opposite, p = this.offset, m = d.x || 0, y = d.y || 0, v = this.chart.renderer.fontMetrics(d.style &&
                    d.style.fontSize, this.axisTitle).f, c = {
                    low: e + (a ? 0 : c),
                    middle: e + c / 2,
                    high: e + (a ? c : 0)
                }[d.align], b = (a ? f + this.height : b) + (a ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? v : 0);
                return {
                    x: a ? c + m : b + (r ? this.width : 0) + p + m,
                    y: a ? b + y - (r ? this.height : 0) + p : c + y
                }
            },
            render: function () {
                var a = this, b = a.chart, f = b.renderer, d = a.options, e = a.isLog, r = a.lin2log, p = a.isLinked, m = a.tickPositions, y = a.axisTitle, v = a.ticks, g = a.minorTicks, q = a.alternateBands, h = d.stackLabels, D = d.alternateGridColor, z = a.tickmarkOffset, w = a.axisLine, I = b.hasRendered &&
                    H(a.oldMin), k = a.showAxis, n = B(f.globalAnimation), t, C;
                a.labelEdge.length = 0;
                a.overlap = !1;
                c([v, g, q], function (a) {
                    for (var b in a)a[b].isActive = !1
                });
                if (a.hasData() || p)a.minorTickInterval && !a.categories && c(a.getMinorTickPositions(), function (b) {
                    g[b] || (g[b] = new M(a, b, "minor"));
                    I && g[b].isNew && g[b].render(null, !0);
                    g[b].render(null, !1, 1)
                }), m.length && (c(m, function (b, f) {
                    if (!p || b >= a.min && b <= a.max)v[b] || (v[b] = new M(a, b)), I && v[b].isNew && v[b].render(f, !0, .1), v[b].render(f)
                }), z && (0 === a.min || a.single) && (v[-1] || (v[-1] =
                    new M(a, -1, null, !0)), v[-1].render(-1))), D && c(m, function (f, c) {
                    C = void 0 !== m[c + 1] ? m[c + 1] + z : a.max - z;
                    0 === c % 2 && f < a.max && C <= a.max + (b.polar ? -z : z) && (q[f] || (q[f] = new J(a)), t = f + z, q[f].options = {
                        from: e ? r(t) : t,
                        to: e ? r(C) : C,
                        color: D
                    }, q[f].render(), q[f].isActive = !0)
                }), a._addedPlotLB || (c((d.plotLines || []).concat(d.plotBands || []), function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                c([v, g, q], function (a) {
                    var f, c, d = [], l = n.duration;
                    for (f in a)a[f].isActive || (a[f].render(f, !1, 0), a[f].isActive = !1, d.push(f));
                    G(function () {
                        for (c =
                                 d.length; c--;)a[d[c]] && !a[d[c]].isActive && (a[d[c]].destroy(), delete a[d[c]])
                    }, a !== q && b.hasRendered && l ? l : 0)
                });
                w && (w[w.isPlaced ? "animate" : "attr"]({d: this.getLinePath(w.strokeWidth())}), w.isPlaced = !0, w[k ? "show" : "hide"](!0));
                y && k && (y[y.isNew ? "attr" : "animate"](a.getTitlePosition()), y.isNew = !1);
                h && h.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), c(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                c(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this, f = b.stacks, d, l = b.plotLinesAndBands, e;
                a || r(b);
                for (d in f)t(f[d]), f[d] = null;
                c([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    t(a)
                });
                if (l)for (a = l.length; a--;)l[a].destroy();
                c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (e in b)b.hasOwnProperty(e) && -1 === p(e, b.keepProps) && delete b[e]
            },
            drawCrosshair: function (a, b) {
                var f, c = this.crosshair, d = z(c.snap, !0), l, e = this.cross;
                a || (a = this.cross &&
                    this.cross.e);
                this.crosshair && !1 !== (g(b) || !d) ? (d ? g(b) && (l = this.isXAxis ? b.plotX : this.len - b.plotY) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), g(l) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : z(b.stackY, b.y)), null, null, null, l) || null), g(f) ? (b = this.categories && !this.isRadial, e || (this.cross = e = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + c.className).attr({zIndex: z(c.zIndex, 2)}).add()), e.show().attr({d: f}), b && !c.width && e.attr({"stroke-width": this.transA}),
                    this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        };
        q(a.Axis.prototype, k)
    })(L);
    (function (a) {
        var A = a.Axis, B = a.Date, F = a.dateFormat, E = a.defaultOptions, k = a.defined, d = a.each, h = a.extend, g = a.getMagnitude, n = a.getTZOffset, t = a.normalizeTickInterval, c = a.pick, e = a.timeUnits;
        A.prototype.getTimeTicks = function (a, g, t, b) {
            var f = [], p = {}, v = E.global.useUTC, q, m = new B(g - n(g)), D = B.hcMakeTime, w = a.unitRange, z = a.count, C;
            if (k(g)) {
                m[B.hcSetMilliseconds](w >= e.second ?
                    0 : z * Math.floor(m.getMilliseconds() / z));
                if (w >= e.second)m[B.hcSetSeconds](w >= e.minute ? 0 : z * Math.floor(m.getSeconds() / z));
                if (w >= e.minute)m[B.hcSetMinutes](w >= e.hour ? 0 : z * Math.floor(m[B.hcGetMinutes]() / z));
                if (w >= e.hour)m[B.hcSetHours](w >= e.day ? 0 : z * Math.floor(m[B.hcGetHours]() / z));
                if (w >= e.day)m[B.hcSetDate](w >= e.month ? 1 : z * Math.floor(m[B.hcGetDate]() / z));
                w >= e.month && (m[B.hcSetMonth](w >= e.year ? 0 : z * Math.floor(m[B.hcGetMonth]() / z)), q = m[B.hcGetFullYear]());
                if (w >= e.year)m[B.hcSetFullYear](q - q % z);
                if (w === e.week)m[B.hcSetDate](m[B.hcGetDate]() -
                    m[B.hcGetDay]() + c(b, 1));
                q = m[B.hcGetFullYear]();
                b = m[B.hcGetMonth]();
                var r = m[B.hcGetDate](), y = m[B.hcGetHours]();
                if (B.hcTimezoneOffset || B.hcGetTimezoneOffset)C = (!v || !!B.hcGetTimezoneOffset) && (t - g > 4 * e.month || n(g) !== n(t)), m = m.getTime(), m = new B(m + n(m));
                v = m.getTime();
                for (g = 1; v < t;)f.push(v), v = w === e.year ? D(q + g * z, 0) : w === e.month ? D(q, b + g * z) : !C || w !== e.day && w !== e.week ? C && w === e.hour ? D(q, b, r, y + g * z) : v + w * z : D(q, b, r + g * z * (w === e.day ? 1 : 7)), g++;
                f.push(v);
                w <= e.hour && d(f, function (a) {
                    "000000000" === F("%H%M%S%L", a) && (p[a] = "day")
                })
            }
            f.info =
                h(a, {higherRanks: p, totalRange: w * z});
            return f
        };
        A.prototype.normalizeTimeTickInterval = function (a, c) {
            var d = c || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            c = d[d.length - 1];
            var b = e[c[0]], f = c[1], p;
            for (p = 0; p < d.length && !(c = d[p], b = e[c[0]], f = c[1], d[p + 1] && a <= (b * f[f.length - 1] + e[d[p + 1][0]]) / 2); p++);
            b === e.year && a < 5 * b && (f = [1, 2, 5]);
            a = t(a / b, f, "year" === c[0] ? Math.max(g(a /
                b), 1) : 1);
            return {unitRange: b, count: a, unitName: c[0]}
        }
    })(L);
    (function (a) {
        var A = a.Axis, B = a.getMagnitude, F = a.map, E = a.normalizeTickInterval, k = a.pick;
        A.prototype.getLogTickPositions = function (a, h, g, n) {
            var d = this.options, c = this.len, e = this.lin2log, q = this.log2lin, w = [];
            n || (this._minorAutoInterval = null);
            if (.5 <= a)a = Math.round(a), w = this.getLinearTickPositions(a, h, g); else if (.08 <= a)for (var c = Math.floor(h), C, b, f, p, v, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c < g + 1 && !v; c++)for (b = d.length, C = 0; C < b && !v; C++)f =
                q(e(c) * d[C]), f > h && (!n || p <= g) && void 0 !== p && w.push(p), p > g && (v = !0), p = f; else h = e(h), g = e(g), a = d[n ? "minorTickInterval" : "tickInterval"], a = k("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (n ? 5 : 1) * (g - h) / ((n ? c / this.tickPositions.length : c) || 1)), a = E(a, null, B(a)), w = F(this.getLinearTickPositions(a, h, g), q), n || (this._minorAutoInterval = a / 5);
            n || (this.tickInterval = a);
            return w
        };
        A.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        A.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(L);
    (function (a) {
        var A =
            a.dateFormat, B = a.each, F = a.extend, E = a.format, k = a.isNumber, d = a.map, h = a.merge, g = a.pick, n = a.splat, t = a.stop, c = a.syncTimeout, e = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            }, cleanSplit: function (a) {
                B(this.chart.series, function (c) {
                    var d = c && c.tt;
                    d && (!d.isActive || a ? c.tt = d.destroy() : d.isActive = !1)
                })
            }, applyFilter: function () {
                var a =
                    this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{tagName: "feGaussianBlur", in: "SourceAlpha", stdDeviation: 1}, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{tagName: "feFuncA", type: "linear", slope: .3}]
                    }, {
                        tagName: "feMerge",
                        children: [{tagName: "feMergeNode"}, {tagName: "feMergeNode", in: "SourceGraphic"}]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function () {
                var a = this.chart.renderer, c = this.options;
                this.label || (this.label = this.split ? a.g("tooltip") : a.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
                    padding: c.padding,
                    r: c.borderRadius
                }), this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                this.init(this.chart, h(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split &&
                this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, c, d, b) {
                var f = this, e = f.now, v = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(a - e.x) || 1 < Math.abs(c - e.y)), g = f.followPointer || 1 < f.len;
                F(e, {
                    x: v ? (2 * e.x + a) / 3 : a,
                    y: v ? (e.y + c) / 2 : c,
                    anchorX: g ? void 0 : v ? (2 * e.anchorX + d) / 3 : d,
                    anchorY: g ? void 0 : v ? (e.anchorY + b) / 2 : b
                });
                f.getLabel().attr(e);
                v && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    f &&
                    f.move(a, c, d, b)
                }, 32))
            }, hide: function (a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = g(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = c(function () {
                    d.getLabel()[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            }, getAnchor: function (a, c) {
                var e, b = this.chart, f = b.inverted, p = b.plotTop, v = b.plotLeft, g = 0, m = 0, h, q;
                a = n(a);
                e = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = b.pointer.normalize(c)), e = [c.chartX - b.plotLeft, c.chartY - p]);
                e || (B(a, function (a) {
                    h = a.series.yAxis;
                    q = a.series.xAxis;
                    g += a.plotX +
                        (!f && q ? q.left - v : 0);
                    m += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!f && h ? h.top - p : 0)
                }), g /= a.length, m /= a.length, e = [f ? b.plotWidth - m : g, this.shared && !f && 1 < a.length && c ? c.chartY - p : f ? b.plotHeight - g : m]);
                return d(e, Math.round)
            }, getPosition: function (a, c, d) {
                var b = this.chart, f = this.distance, e = {}, v = d.h || 0, h, m = ["y", b.chartHeight, c, d.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight], q = ["x", b.chartWidth, a, d.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth], k = !this.followPointer && g(d.ttBelow, !b.inverted === !!d.negative),
                    z = function (a, b, c, d, r, p) {
                        var l = c < d - f, m = d + f + c < b, g = d - f - c;
                        d += f;
                        if (k && m)e[a] = d; else if (!k && l)e[a] = g; else if (l)e[a] = Math.min(p - c, 0 > g - v ? g : g - v); else if (m)e[a] = Math.max(r, d + v + c > b ? d : d + v); else return !1
                    }, w = function (a, b, c, d) {
                        var l;
                        d < f || d > b - f ? l = !1 : e[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
                        return l
                    }, r = function (a) {
                        var b = m;
                        m = q;
                        q = b;
                        h = a
                    }, y = function () {
                        !1 !== z.apply(0, m) ? !1 !== w.apply(0, q) || h || (r(!0), y()) : h ? e.x = e.y = 0 : (r(!0), y())
                    };
                (b.inverted || 1 < this.len) && r();
                y();
                return e
            }, defaultFormatter: function (a) {
                var c = this.points || n(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(c[0])];
                d = d.concat(a.bodyFormatter(c));
                d.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return d
            }, refresh: function (a, c) {
                var d = this.chart, b, f, e, v = {}, h = [];
                b = this.options.formatter || this.defaultFormatter;
                var v = d.hoverPoints, m = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = n(a)[0].series.tooltipOptions.followPointer;
                e = this.getAnchor(a, c);
                c = e[0];
                f = e[1];
                !m || a.series && a.series.noSharedTooltip ? v = a.getLabelConfig() : (d.hoverPoints = a, v && B(v, function (a) {
                    a.setState()
                }),
                    B(a, function (a) {
                        a.setState("hover");
                        h.push(a.getLabelConfig())
                    }), v = {x: a[0].category, y: a[0].y}, v.points = h, this.len = h.length, a = a[0]);
                v = b.call(v, this);
                m = a.series;
                this.distance = g(m.tooltipOptions.distance, 16);
                !1 === v ? this.hide() : (b = this.getLabel(), this.isHidden && (t(b), b.attr({opacity: 1}).show()), this.split ? this.renderSplit(v, d.hoverPoints) : (b.attr({text: v && v.join ? v.join("") : v}), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + g(a.colorIndex, m.colorIndex)), this.updatePosition({
                    plotX: c,
                    plotY: f, negative: a.negative, ttBelow: a.ttBelow, h: e[2] || 0
                })), this.isHidden = !1)
            }, renderSplit: function (c, d) {
                var e = this, b = [], f = this.chart, p = f.renderer, v = !0, h = this.options, m, q = this.getLabel();
                B(c.slice(0, c.length - 1), function (a, c) {
                    c = d[c - 1] || {isHeader: !0, plotX: d[0].plotX};
                    var D = c.series || e, r = D.tt, y = "highcharts-color-" + g(c.colorIndex, (c.series || {}).colorIndex, "none");
                    r || (D.tt = r = p.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + y).attr({
                        padding: h.padding,
                        r: h.borderRadius
                    }).add(q));
                    r.isActive = !0;
                    r.attr({text: a});
                    a = r.getBBox();
                    y = a.width + r.strokeWidth();
                    c.isHeader ? (m = a.height, y = Math.max(0, Math.min(c.plotX + f.plotLeft - y / 2, f.chartWidth - y))) : y = c.plotX + f.plotLeft - g(h.distance, 16) - y;
                    0 > y && (v = !1);
                    a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                    a -= f.plotTop;
                    b.push({
                        target: c.isHeader ? f.plotHeight + m : a,
                        rank: c.isHeader ? 1 : 0,
                        size: D.tt.getBBox().height + 1,
                        point: c,
                        x: y,
                        tt: r
                    })
                });
                this.cleanSplit();
                a.distribute(b, f.plotHeight + m);
                B(b, function (a) {
                    var b = a.point;
                    a.tt.attr({
                        visibility: void 0 === a.pos ?
                            "hidden" : "inherit",
                        x: v || b.isHeader ? a.x : b.plotX + f.plotLeft + g(h.distance, 16),
                        y: a.pos + f.plotTop,
                        anchorX: b.plotX + f.plotLeft,
                        anchorY: b.isHeader ? a.pos + f.plotTop - 15 : b.plotY + f.plotTop
                    })
                })
            }, updatePosition: function (a) {
                var c = this.chart, d = this.getLabel(), d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            }, getXDateFormat: function (a, c, d) {
                var b;
                c = c.dateTimeLabelFormats;
                var f = d && d.closestPointRange, p, g = {
                    millisecond: 15,
                    second: 12, minute: 9, hour: 6, day: 3
                }, h, m = "millisecond";
                if (f) {
                    h = A("%m-%d %H:%M:%S.%L", a.x);
                    for (p in e) {
                        if (f === e.week && +A("%w", a.x) === d.options.startOfWeek && "00:00:00.000" === h.substr(6)) {
                            p = "week";
                            break
                        }
                        if (e[p] > f) {
                            p = m;
                            break
                        }
                        if (g[p] && h.substr(g[p]) !== "01-01 00:00:00.000".substr(g[p]))break;
                        "week" !== p && (m = p)
                    }
                    p && (b = c[p])
                } else b = c.day;
                return b || c.year
            }, tooltipFooterHeaderFormatter: function (a, c) {
                var d = c ? "footer" : "header";
                c = a.series;
                var b = c.tooltipOptions, f = b.xDateFormat, e = c.xAxis, g = e && "datetime" === e.options.type &&
                    k(a.key), d = b[d + "Format"];
                g && !f && (f = this.getXDateFormat(a, b, e));
                g && f && (d = d.replace("{point.key}", "{point.key:" + f + "}"));
                return E(d, {point: a, series: c})
            }, bodyFormatter: function (a) {
                return d(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat)
                })
            }
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.attr, F = a.charts, E = a.css, k = a.defined, d = a.doc, h = a.each, g = a.extend, n = a.fireEvent, t = a.offset, c = a.pick, e = a.removeEvent, q = a.splat, w = a.Tooltip, C = a.win;
        a.Pointer =
            function (a, c) {
                this.init(a, c)
            };
        a.Pointer.prototype = {
            init: function (a, f) {
                this.options = f;
                this.chart = a;
                this.runChartClick = f.chart.events && !!f.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                w && f.tooltip.enabled && (a.tooltip = new w(a, f.tooltip), this.followTouchMove = c(f.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, d = b.options.chart, e = d.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (e = c(d.pinchType, e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            }, normalize: function (a, c) {
                var b, f;
                a = a || C.event;
                a.target || (a.target = a.srcElement);
                f = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = t(this.chart.container));
                void 0 === f.pageX ? (b = Math.max(a.x, a.clientX - c.left), c = a.y) : (b = f.pageX - c.left, c = f.pageY - c.top);
                return g(a, {chartX: Math.round(b), chartY: Math.round(c)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                h(this.chart.axes, function (c) {
                    b[c.isXAxis ?
                        "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, runPointActions: function (b) {
                var f = this.chart, e = f.series, g = f.tooltip, q = g ? g.shared : !1, m = !0, D = f.hoverPoint, k = f.hoverSeries, z, n, r, y = [], G;
                if (!q && !k)for (z = 0; z < e.length; z++)if (e[z].directTouch || !e[z].options.stickyTracking)e = [];
                k && (q ? k.noSharedTooltip : k.directTouch) && D ? y = [D] : (q || !k || k.options.stickyTracking || (e = [k]), h(e, function (a) {
                    n = a.noSharedTooltip && q;
                    r = !q && a.directTouch;
                    a.visible && !n && !r && c(a.options.enableMouseTracking,
                        !0) && (G = a.searchPoint(b, !n && 1 === a.kdDimensions)) && G.series && y.push(G)
                }), y.sort(function (a, b) {
                    var c = a.distX - b.distX, f = a.dist - b.dist, d = b.series.group.zIndex - a.series.group.zIndex;
                    return 0 !== c && q ? c : 0 !== f ? f : 0 !== d ? d : a.series.index > b.series.index ? -1 : 1
                }));
                if (q)for (z = y.length; z--;)(y[z].x !== y[0].x || y[z].series.noSharedTooltip) && y.splice(z, 1);
                if (y[0] && (y[0] !== this.prevKDPoint || g && g.isHidden)) {
                    if (q && !y[0].series.noSharedTooltip) {
                        for (z = 0; z < y.length; z++)y[z].onMouseOver(b, y[z] !== (k && k.directTouch && D || y[0]));
                        y.length && g && g.refresh(y.sort(function (a, b) {
                            return a.series.index - b.series.index
                        }), b)
                    } else if (g && g.refresh(y[0], b), !k || !k.directTouch)y[0].onMouseOver(b);
                    this.prevKDPoint = y[0];
                    m = !1
                }
                m && (e = k && k.tooltipOptions.followPointer, g && e && !g.isHidden && (e = g.getAnchor([{}], b), g.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                })));
                this.unDocMouseMove || (this.unDocMouseMove = A(d, "mousemove", function (b) {
                    if (F[a.hoverChartIndex])F[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }));
                h(q ? y : [c(D, y[0])], function (a) {
                    h(f.axes, function (c) {
                        (!a ||
                        a.series && a.series[c.coll] === c) && c.drawCrosshair(b, a)
                    })
                })
            }, reset: function (a, c) {
                var b = this.chart, f = b.hoverSeries, d = b.hoverPoint, e = b.hoverPoints, g = b.tooltip, k = g && g.shared ? e : d;
                a && k && h(q(k), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a)g && k && (g.refresh(k), d && (d.setState(d.state, !0), h(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, d)
                }))); else {
                    if (d)d.onMouseOut();
                    e && h(e, function (a) {
                        a.setState()
                    });
                    if (f)f.onMouseOut();
                    g && g.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    h(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = b.hoverPoints = b.hoverPoint = null
                }
            }, scaleGroups: function (a, c) {
                var b = this.chart, f;
                h(b.series, function (d) {
                    f = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(c ? b.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(f))
                });
                b.clipRect.attr(c || b.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX =
                    a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, g = this.zoomHor, h = this.zoomVert, q = b.plotLeft, k = b.plotTop, n = b.plotWidth, r = b.plotHeight, y, G = this.selectionMarker, t = this.mouseDownX, l = this.mouseDownY, u = c.panKey && a[c.panKey + "Key"];
                G && G.touch || (d < q ? d = q : d > q + n && (d = q + n), e < k ? e = k : e > k + r && (e = k + r), this.hasDragged = Math.sqrt(Math.pow(t - d, 2) + Math.pow(l - e, 2)), 10 < this.hasDragged && (y = b.isInsidePlot(t - q, l - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) &&
                y && !u && !G && (this.selectionMarker = G = b.renderer.rect(q, k, g ? 1 : n, h ? 1 : r, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), G && g && (d -= t, G.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + t
                })), G && h && (d = e - l, G.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + l
                })), y && !G && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, d = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, m = this.selectionMarker, q = m.attr ? m.attr("x") : m.x, t = m.attr ? m.attr("y") : m.y, z = m.attr ? m.attr("width") :
                        m.width, w = m.attr ? m.attr("height") : m.height, r;
                    if (this.hasDragged || d)h(c.axes, function (c) {
                        if (c.zoomEnabled && k(c.min) && (d || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var f = c.horiz, g = "touchend" === a.type ? c.minPixelPadding : 0, l = c.toValue((f ? q : t) + g), f = c.toValue((f ? q + z : t + w) - g);
                            e[c.coll].push({axis: c, min: Math.min(l, f), max: Math.max(l, f)});
                            r = !0
                        }
                    }), r && n(c, "selection", e, function (a) {
                        c.zoom(g(a, d ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    d && this.scaleGroups()
                }
                c && (E(c.container, {cursor: c._cursor}),
                    c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY -
                    b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var c = F[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var c = this.chart;
                k(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) ||
                c.openMenu || this.runPointActions(b)
            }, inClass: function (a, c) {
                for (var b; a;) {
                    if (b = B(a, "class")) {
                        if (-1 !== b.indexOf(c))return !0;
                        if (-1 !== b.indexOf("highcharts-container"))return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (n(c.series, "click", g(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (g(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && n(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                A(c, "mouseleave",
                    b.onContainerMouseLeave);
                1 === a.chartCount && A(d, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && A(d, "touchend", b.onDocumentTouchEnd))
            }, destroy: function () {
                var b;
                e(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (e(d, "mouseup", this.onDocumentMouseUp), e(d, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (b in this)this[b] = null
            }
        }
    })(L);
    (function (a) {
        var A = a.charts, B = a.each, F = a.extend, E = a.map, k = a.noop, d = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, d, k, t, c, e) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, k, t, c, e);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, k, t, c, e)
            }, pinchTranslateDirection: function (a, d, k, t, c, e, q, w) {
                var g = this.chart, b = a ? "x" : "y", f = a ? "X" : "Y", h = "chart" + f, v = a ? "width" : "height", n = g["plot" + (a ? "Left" : "Top")], m, D, I = w || 1, z = g.inverted, J = g.bounds[a ? "h" : "v"], r = 1 === d.length, y = d[0][h], G = k[0][h], M = !r && d[1][h],
                    l = !r && k[1][h], u;
                k = function () {
                    !r && 20 < Math.abs(y - M) && (I = w || Math.abs(G - l) / Math.abs(y - M));
                    D = (n - G) / I + y;
                    m = g["plot" + (a ? "Width" : "Height")] / I
                };
                k();
                d = D;
                d < J.min ? (d = J.min, u = !0) : d + m > J.max && (d = J.max - m, u = !0);
                u ? (G -= .8 * (G - q[b][0]), r || (l -= .8 * (l - q[b][1])), k()) : q[b] = [G, l];
                z || (e[b] = D - n, e[v] = m);
                e = z ? 1 / I : I;
                c[v] = m;
                c[b] = d;
                t[z ? a ? "scaleY" : "scaleX" : "scale" + f] = I;
                t["translate" + f] = e * n + (G - e * y)
            }, pinch: function (a) {
                var g = this, h = g.chart, t = g.pinchDown, c = a.touches, e = c.length, q = g.lastValidTouch, w = g.hasZoom, C = g.selectionMarker, b = {}, f = 1 ===
                    e && (g.inClass(a.target, "highcharts-tracker") && h.runTrackerClick || g.runChartClick), p = {};
                1 < e && (g.initiated = !0);
                w && g.initiated && !f && a.preventDefault();
                E(c, function (a) {
                    return g.normalize(a)
                });
                "touchstart" === a.type ? (B(c, function (a, b) {
                    t[b] = {chartX: a.chartX, chartY: a.chartY}
                }), q.x = [t[0].chartX, t[1] && t[1].chartX], q.y = [t[0].chartY, t[1] && t[1].chartY], B(h.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = h.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, f = a.toPixels(d(a.options.min, a.dataMin)), e = a.toPixels(d(a.options.max,
                            a.dataMax)), g = Math.max(f, e);
                        b.min = Math.min(a.pos, Math.min(f, e) - c);
                        b.max = Math.max(a.pos + a.len, g + c)
                    }
                }), g.res = !0) : g.followTouchMove && 1 === e ? this.runPointActions(g.normalize(a)) : t.length && (C || (g.selectionMarker = C = F({
                    destroy: k,
                    touch: !0
                }, h.plotBox)), g.pinchTranslate(t, c, b, C, p, q), g.hasPinched = w, g.scaleGroups(b, p), g.res && (g.res = !1, this.reset(!1, 0)))
            }, touch: function (h, g) {
                var k = this.chart, t, c;
                a.hoverChartIndex = k.index;
                1 === h.touches.length ? (h = this.normalize(h), (c = k.isInsidePlot(h.chartX - k.plotLeft, h.chartY - k.plotTop)) && !k.openMenu ? (g && this.runPointActions(h), "touchmove" === h.type && (g = this.pinchDown, t = g[0] ? 4 <= Math.sqrt(Math.pow(g[0].chartX - h.chartX, 2) + Math.pow(g[0].chartY - h.chartY, 2)) : !1), d(t, !0) && this.pinch(h)) : g && this.reset()) : 2 === h.touches.length && this.pinch(h)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (d) {
                A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.charts,
            F = a.css, E = a.doc, k = a.extend, d = a.noop, h = a.Pointer, g = a.removeEvent, n = a.win, t = a.wrap;
        if (n.PointerEvent || n.MSPointerEvent) {
            var c = {}, e = !!n.PointerEvent, q = function () {
                var a, b = [];
                b.item = function (a) {
                    return this[a]
                };
                for (a in c)c.hasOwnProperty(a) && b.push({pageX: c[a].pageX, pageY: c[a].pageY, target: c[a].target});
                return b
            }, w = function (c, b, f, e) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !B[a.hoverChartIndex] || (e(c), e = B[a.hoverChartIndex].pointer, e[b]({
                    type: f, target: c.currentTarget, preventDefault: d,
                    touches: q()
                }))
            };
            k(h.prototype, {
                onContainerPointerDown: function (a) {
                    w(a, "onContainerTouchStart", "touchstart", function (a) {
                        c[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    w(a, "onContainerTouchMove", "touchmove", function (a) {
                        c[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        c[a.pointerId].target || (c[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    w(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete c[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container,
                        e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(E, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            t(h.prototype, "init", function (a, b, c) {
                a.call(this, b, c);
                this.hasZoom && F(b.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            t(h.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            });
            t(h.prototype, "destroy", function (a) {
                this.batchMSEvents(g);
                a.call(this)
            })
        }
    })(L);
    (function (a) {
        var A, B = a.addEvent, F = a.css, E = a.discardElement, k = a.defined, d = a.each, h = a.extend, g = a.isFirefox, n = a.marginNames, t = a.merge, c = a.pick, e = a.setAnimation, q = a.stableSort, w = a.win, C = a.wrap;
        A = a.Legend = function (a, c) {
            this.init(a, c)
        };
        A.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), B(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            }, setOptions: function (a) {
                var b = c(a.padding, 8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop ||
                    0;
                this.initialItemX = this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = c(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, d) {
                var b = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                c(d, !0) && b.redraw()
            }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden")
            }, positionItem: function (a) {
                var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
                g && (g.x = e, g.y = d)
            }, destroyItem: function (a) {
                var b = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && E(a.checkbox)
            }, destroy: function () {
                var a = this.group, c = this.box;
                c && (this.box = c.destroy());
                d(this.getAllItems(), function (a) {
                    d(["legendItem", "legendGroup"], function (b) {
                        a[b] && (a[b] = a[b].destroy())
                    })
                });
                a && (this.group = a.destroy());
                this.display = null
            }, positionCheckboxes: function (a) {
                var b =
                    this.group && this.group.alignAttr, c, e = this.clipHeight || this.legendHeight, g = this.titleHeight;
                b && (c = b.translateY, d(this.allItems, function (d) {
                    var f = d.checkbox, m;
                    f && (m = c + g + f.y + (a || 0) + 3, F(f, {
                        left: b.translateX + d.checkboxOffset + f.x - 20 + "px",
                        top: m + "px",
                        display: m > c - 6 && m < c + e - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.padding, c = this.options.title, d = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).add(this.group)), a =
                    this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: d}));
                this.titleHeight = d
            }, setText: function (b) {
                var c = this.options;
                b.legendItem.attr({text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b)})
            }, renderItem: function (a) {
                var b = this.chart, d = b.renderer, e = this.options, g = "horizontal" === e.layout, m = this.symbolWidth, h = e.symbolPadding, k = this.padding, q = g ? c(e.itemDistance, 20) : 0, n = !e.rtl, r = e.width, y = e.itemMarginBottom || 0, G = this.itemMarginTop, t = this.initialItemX,
                    l = a.legendItem, u = !a.series, w = !u && a.series.drawLegendSymbol ? a.series : a, C = w.options, C = this.createCheckboxForItem && C && C.showCheckbox, A = e.useHTML;
                l || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + w.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ? " " + a.options.className : "") + (u ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = l = d.text("", n ? m + h : -h, this.baseline || 0, A).attr({
                    align: n ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline ||
                (this.fontMetrics = d.fontMetrics(12, l), this.baseline = this.fontMetrics.f + 3 + G, l.attr("y", this.baseline)), w.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, l, A), C && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                d = l.getBBox();
                m = a.checkboxOffset = e.itemWidth || a.legendItemWidth || m + h + d.width + q + (C ? 20 : 0);
                this.itemHeight = h = Math.round(a.legendItemHeight || d.height);
                g && this.itemX - t + m > (r || b.chartWidth - 2 * k - t - e.x) && (this.itemX = t, this.itemY += G + this.lastLineHeight + y, this.lastLineHeight =
                    0);
                this.maxItemWidth = Math.max(this.maxItemWidth, m);
                this.lastItemY = G + this.itemY + y;
                this.lastLineHeight = Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += m : (this.itemY += G + h + y, this.lastLineHeight = h);
                this.offsetWidth = r || Math.max((g ? this.itemX - t - q : m) + k, this.offsetWidth)
            }, getAllItems: function () {
                var a = [];
                d(this.chart.series, function (b) {
                    var d = b && b.options;
                    b && c(d.showInLegend, k(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)))
                });
                return a
            },
            adjustMargins: function (a, e) {
                var b = this.chart, f = this.options, g = f.align.charAt(0) + f.verticalAlign.charAt(0) + f.layout.charAt(0);
                f.floating || d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (d, h) {
                    d.test(g) && !k(a[h]) && (b[n[h]] = Math.max(b[n[h]], b.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * f[h % 2 ? "x" : "y"] + c(f.margin, 12) + e[h]))
                })
            }, render: function () {
                var a = this, c = a.chart, e = c.renderer, g = a.group, k, m, t, n, z = a.box, w = a.options, r = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                g || (a.group = g = e.g("legend").attr({zIndex: 7}).add(), a.contentGroup = e.g().attr({zIndex: 1}).add(g), a.scrollGroup = e.g().add(a.contentGroup));
                a.renderTitle();
                k = a.getAllItems();
                q(k, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                w.reversed && k.reverse();
                a.allItems = k;
                a.display = m = !!k.length;
                a.lastLineHeight = 0;
                d(k, function (b) {
                    a.renderItem(b)
                });
                t = (w.width || a.offsetWidth) + r;
                n = a.lastItemY + a.lastLineHeight + a.titleHeight;
                n = a.handleOverflow(n);
                n += r;
                z || (a.box = z = e.rect().addClass("highcharts-legend-box").attr({r: w.borderRadius}).add(g), z.isNew = !0);
                0 < t && 0 < n && (z[z.isNew ? "attr" : "animate"](z.crisp({
                    x: 0,
                    y: 0,
                    width: t,
                    height: n
                }, z.strokeWidth())), z.isNew = !1);
                z[m ? "show" : "hide"]();
                "none" === g.getStyle("display") && (t = n = 0);
                a.legendWidth = t;
                a.legendHeight = n;
                d(k, function (b) {
                    a.positionItem(b)
                });
                m && g.align(h({width: t, height: n}, w), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var b = this, e = this.chart, g = e.renderer, h = this.options,
                    m = h.y, e = e.spacingBox.height + ("top" === h.verticalAlign ? -m : m) - this.padding, m = h.maxHeight, k, q = this.clipRect, n = h.navigation, t = c(n.animation, !0), r = n.arrowSize || 12, y = this.nav, G = this.pages, w = this.padding, l, u = this.allItems, C = function (a) {
                        a ? q.attr({height: a}) : q && (b.clipRect = q.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + w + "px,9999px," + (w + a) + "px,0)" : "auto")
                    };
                "horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (e /= 2);
                m && (e = Math.min(e, m));
                G.length = 0;
                a > e && !1 !== n.enabled ? (this.clipHeight = k = Math.max(e - 20 - this.titleHeight - w, 0), this.currentPage = c(this.currentPage, 1), this.fullHeight = a, d(u, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var d = G.length;
                    if (!d || c - G[d - 1] > k && (l || c) !== G[d - 1])G.push(l || c), d++;
                    b === u.length - 1 && c + a - G[d - 1] > k && G.push(c);
                    c !== l && (l = c)
                }), q || (q = b.clipRect = g.clipRect(0, w, 9999, 0), b.contentGroup.clip(q)), C(k), y || (this.nav = y = g.g().attr({zIndex: 1}).add(this.group), this.up = g.symbol("triangle", 0, 0, r, r).on("click",
                    function () {
                        b.scroll(-1, t)
                    }).add(y), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").add(y), this.down = g.symbol("triangle-down", 0, 0, r, r).on("click", function () {
                    b.scroll(1, t)
                }).add(y)), b.scroll(0), a = e) : y && (C(), y.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, c) {
                var b = this.pages, d = b.length;
                a = this.currentPage + a;
                var f = this.clipHeight, g = this.pager, h = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== c && e(c, this.chart), this.nav.attr({
                    translateX: h, translateY: f +
                    this.padding + 7 + this.titleHeight, visibility: "visible"
                }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), g.attr({text: a + "/" + d}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), c = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = a, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, d) {
                var b = a.options, e = b.symbolHeight ||
                    a.fontMetrics.f, b = b.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, c(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(d.legendGroup)
            }, drawLineMarker: function (a) {
                var b = this.options.marker, c = a.symbolWidth, d = this.chart.renderer, e = this.legendGroup, g = a.baseline - Math.round(.3 * a.fontMetrics.b);
                this.legendLine = d.path(["M", 0, g, "L", c, g]).addClass("highcharts-graph").attr({}).add(e);
                b && !1 !== b.enabled && (a = 0 === this.symbol.indexOf("url") ?
                    0 : b.radius, this.legendSymbol = b = d.symbol(this.symbol, c / 2 - a, g - a, 2 * a, 2 * a, b).addClass("highcharts-point").add(e), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(w.navigator.userAgent) || g) && C(A.prototype, "positionItem", function (a, c) {
            var b = this, d = function () {
                c._legendItemPos && a.call(b, c)
            };
            d();
            setTimeout(d)
        })
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.animObject, F = a.attr, E = a.doc, k = a.Axis, d = a.createElement, h = a.defaultOptions, g = a.discardElement, n = a.charts, t = a.css, c = a.defined, e = a.each, q = a.error, w = a.extend, C = a.fireEvent,
            b = a.getStyle, f = a.grep, p = a.isNumber, v = a.isObject, H = a.isString, m = a.Legend, D = a.marginNames, I = a.merge, z = a.Pointer, J = a.pick, r = a.pInt, y = a.removeEvent, G = a.seriesTypes, M = a.splat, l = a.svg, u = a.syncTimeout, Q = a.win, R = a.Renderer, O = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new O(a, b, c)
        };
        O.prototype = {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (H(a[0]) || a[0].nodeName)this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var d, e = b.series;
                b.series = null;
                d = I(h, b);
                d.series = b.series = e;
                this.userOptions = b;
                this.respRules = [];
                b = d.chart;
                e = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var f;
                this.index = n.length;
                n.push(this);
                a.chartCount++;
                if (e)for (f in e)A(this, f, e[f]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            }, initSeries: function (a) {
                var b = this.options.chart;
                (b = G[a.type || b.type || b.defaultSeriesType]) || q(17, !0);
                b = new b;
                b.init(this, a);
                return b
            }, isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var c = this.axes, d = this.series, f = this.pointer, l = this.legend, r = this.isDirtyLegend, g, m, y = this.hasCartesianSeries, h = this.isDirtyBox, u = d.length, k = u, q = this.renderer, G = q.isHidden(), p = [];
                a.setAnimation(b, this);
                G && this.cloneRenderTo();
                for (this.layOutTitles(); k--;)if (b = d[k], b.options.stacking && (g = !0,
                        b.isDirty)) {
                    m = !0;
                    break
                }
                if (m)for (k = u; k--;)b = d[k], b.options.stacking && (b.isDirty = !0);
                e(d, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), r = !0);
                    a.isDirtyData && C(a, "updatedData")
                });
                r && l.options.enabled && (l.render(), this.isDirtyLegend = !1);
                g && this.getStacks();
                y && e(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                y && (e(c, function (a) {
                    a.isDirty && (h = !0)
                }), e(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, p.push(function () {
                        C(a, "afterSetExtremes",
                            w(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (h || g) && a.redraw()
                }));
                h && this.drawChartBox();
                e(d, function (a) {
                    (h || a.isDirty) && a.visible && a.redraw()
                });
                f && f.reset(!0);
                q.draw();
                C(this, "redraw");
                G && this.cloneRenderTo(!0);
                e(p, function (a) {
                    a.call()
                })
            }, get: function (a) {
                var b = this.axes, c = this.series, d, e;
                for (d = 0; d < b.length; d++)if (b[d].options.id === a)return b[d];
                for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
                for (d = 0; d < c.length; d++)for (e = c[d].points || [], b = 0; b < e.length; b++)if (e[b].id === a)return e[b];
                return null
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = M(b.xAxis || {}), b = b.yAxis = M(b.yAxis || {});
                e(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                e(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                e(c, function (b) {
                    new k(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                e(this.series, function (b) {
                    a = a.concat(f(b.points || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return f(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var d = this, f = d.options, l;
                l = f.title = I(f.title,
                    a);
                f = f.subtitle = I(f.subtitle, b);
                e([["title", a, l], ["subtitle", b, f]], function (a, b) {
                    var c = a[0], e = d[c], f = a[1];
                    a = a[2];
                    e && f && (d[c] = e = e.destroy());
                    a && a.text && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    })
                });
                d.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, c, d = this.renderer, f = this.spacingBox;
                e(["title", "subtitle"], function (a) {
                    var c = this[a], e = this.options[a], l;
                    c && (l = d.fontMetrics(l, c).b,
                        c.css({width: (e.width || f.width + e.widthAdjust) + "px"}).align(w({y: b + l + ("title" === a ? -3 : 2)}, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && J(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var a = this.options.chart, d = a.width, a = a.height, e = this.renderToClone || this.renderTo;
                c(d) || (this.containerWidth = b(e, "width"));
                c(a) || (this.containerHeight = b(e,
                    "height"));
                this.chartWidth = Math.max(0, d || this.containerWidth || 600);
                this.chartHeight = Math.max(0, J(a, 19 < this.containerHeight ? this.containerHeight : 400))
            }, cloneRenderTo: function (a) {
                var b = this.renderToClone, c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
                        g(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), t(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }),
                b.style.setProperty && b.style.setProperty("display", "block", "important"), E.body.appendChild(b), c && b.appendChild(c)
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, c = this.options, e = c.chart, f, l;
                b = this.renderTo;
                var g = a.uniqueKey(), m;
                b || (this.renderTo = b = e.renderTo);
                H(b) && (this.renderTo = b = E.getElementById(b));
                b || q(13, !0);
                f = r(F(b, "data-highcharts-chart"));
                p(f) && n[f] && n[f].hasRendered && n[f].destroy();
                F(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                f = this.chartWidth;
                l = this.chartHeight;
                this.container = b = d("div", {id: g}, void 0, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[e.renderer] || R)(b, f, l, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                for (m in c.defs)this.renderer.definition(c.defs[m]);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, d = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !c(d[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(d, b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], d = a.margin;
                a.hasCartesianSeries && e(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                e(D, function (e, f) {
                    c(d[f]) || (a[e] += b[f])
                });
                a.setChartSize()
            },
            reflow: function (a) {
                var d = this, e = d.options.chart, f = d.renderTo, l = c(e.width), r = e.width || b(f, "width"), e = e.height || b(f, "height"), f = a ? a.target : Q;
                if (!l && !d.isPrinting && r && e && (f === Q || f === E)) {
                    if (r !== d.containerWidth || e !== d.containerHeight)clearTimeout(d.reflowTimeout), d.reflowTimeout = u(function () {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    d.containerWidth = r;
                    d.containerHeight = e
                }
            }, initReflow: function () {
                var a = this, b;
                b = A(Q, "resize", function (b) {
                    a.reflow(b)
                });
                A(a, "destroy", b)
            }, setSize: function (b, c, d) {
                var f =
                    this, l = f.renderer;
                f.isResizing += 1;
                a.setAnimation(d, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                void 0 !== b && (f.options.chart.width = b);
                void 0 !== c && (f.options.chart.height = c);
                f.getChartSize();
                f.setChartSize(!0);
                l.setSize(f.chartWidth, f.chartHeight, d);
                e(f.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.setResponsive && f.setResponsive(!1);
                f.redraw(d);
                f.oldChartHeight = null;
                C(f, "resize");
                u(function () {
                    f && C(f, "endResize", null,
                        function () {
                            --f.isResizing
                        })
                }, B(void 0).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, d = this.chartWidth, f = this.chartHeight, l = this.options.chart, r = this.spacing, g = this.clipOffset, m, y, h, u;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop = y = Math.round(this.plotTop);
                this.plotWidth = h = Math.max(0, Math.round(d - m - this.marginRight));
                this.plotHeight = u = Math.max(0, Math.round(f - y - this.marginBottom));
                this.plotSizeX = b ? u : h;
                this.plotSizeY = b ? h : u;
                this.plotBorderWidth = l.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: r[3], y: r[0], width: d - r[3] - r[1], height: f - r[0] - r[2]};
                this.plotBox = c.plotBox = {x: m, y: y, width: h, height: u};
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, g[3]) / 2);
                c = Math.ceil(Math.max(d, g[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, g[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, g[2]) / 2 - c))
                };
                a || e(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                e(["margin", "spacing"], function (c) {
                    var d = b[c], f = v(d) ? d : [d, d, d, d];
                    e(["Top", "Right", "Bottom", "Left"], function (d, e) {
                        a[c][e] = J(b[c + d], f[e])
                    })
                });
                e(D, function (b, c) {
                    a[b] = J(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, l = this.plotBorder, r, g, m = this.plotLeft, y = this.plotTop, h = this.plotWidth, u = this.plotHeight, k = this.plotBox, q = this.clipRect,
                    G = this.clipBox, p = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), p = "attr");
                r = g = e.strokeWidth();
                e[p]({x: g / 2, y: g / 2, width: c - g - r % 2, height: d - g - r % 2, r: a.borderRadius});
                p = "animate";
                f || (p = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[p](k);
                q ? q.animate({width: G.width, height: G.height}) : this.clipRect = b.clipRect(G);
                p = "animate";
                l || (p = "attr", this.plotBorder = l = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                l[p](l.crisp({
                    x: m,
                    y: y, width: h, height: u
                }, -l.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, d = a.options.series, f, l;
                e(["inverted", "angular", "polar"], function (e) {
                    c = G[b.type || b.defaultSeriesType];
                    l = b[e] || c && c.prototype[e];
                    for (f = d && d.length; !l && f--;)(c = G[d[f].type]) && c.prototype[e] && (l = !0);
                    a[e] = l
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                e(b, function (a) {
                    a.linkedSeries.length = 0
                });
                e(b, function (b) {
                    var c = b.options.linkedTo;
                    H(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) &&
                    c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = J(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                e(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && e(b.items, function (c) {
                    var d = w(b.style, c.style), e = r(d.left) + a.plotLeft, f = r(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options,
                    d, f, l;
                this.setTitle();
                this.legend = new m(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -= 21;
                e(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                l = 1.05 < d / this.plotHeight;
                if (f || l)e(a, function (a) {
                    (a.horiz && f || !a.horiz && l) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && e(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = I(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (Q.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this, c = b.axes, d = b.series, f = b.container, l, r = f && f.parentNode;
                C(b, "destroy");
                n[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                y(b);
                for (l = c.length; l--;)c[l] = c[l].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (l = d.length; l--;)d[l] = d[l].destroy();
                e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function (a) {
                        var c = b[a];
                        c && c.destroy && (b[a] = c.destroy())
                    });
                f && (f.innerHTML = "", y(f), r && g(f));
                for (l in b)delete b[l]
            }, isReadyToRender: function () {
                var a = this;
                return l || Q != Q.top || "complete" === E.readyState ? !0 : (E.attachEvent("onreadystatechange", function () {
                    E.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === E.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    C(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    e(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    C(a, "beforeRender");
                    z && (a.pointer = new z(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload)a.onload();
                    a.cloneRenderTo(!0)
                }
            }, onload: function () {
                e([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                C(this, "load");
                !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(L);
    (function (a) {
        var A, B = a.each, F = a.extend, E = a.erase, k = a.fireEvent, d = a.format, h =
            a.isArray, g = a.isNumber, n = a.pick, t = a.removeEvent;
        A = a.Point = function () {
        };
        A.prototype = {
            init: function (a, d, g) {
                var c = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(d, g);
                a.options.colorByPoint ? (d = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : d = a.colorIndex;
                this.colorIndex = n(this.colorIndex, d);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, d) {
                var c = this.series, e = c.options.pointValKey || c.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                e && (this.y = this[e]);
                this.isNull = n(this.isValid && !this.isValid(), null === this.x || !g(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                void 0 === this.x && c && (this.x = void 0 === d ? c.autoIncrement(this) : d);
                return this
            }, optionsToObject: function (a) {
                var c = {}, d = this.series, k = d.options.keys, n = k || d.pointArrayMap || ["y"], b = n.length, f = 0, p = 0;
                if (g(a) || null === a)c[n[0]] =
                    a; else if (h(a))for (!k && a.length > b && (d = typeof a[0], "string" === d ? c.name = a[0] : "number" === d && (c.x = a[0]), f++); p < b;)k && void 0 === a[f] || (c[n[p]] = a[f]), f++, p++; else"object" === typeof a && (c = a, a.dataLabels && (d._hasPointLabels = !0), a.marker && (d._hasPointMarkers = !0));
                return c
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex :
                        "") + (this.options.className ? " " + this.options.className : "")
            }, getZone: function () {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", g = 0, h;
                for (h = d[g]; this[a] >= h.value;)h = d[++g];
                h && h.color && !this.options.color && (this.color = h.color);
                return h
            }, destroy: function () {
                var a = this.series.chart, d = a.hoverPoints, g;
                a.pointCount--;
                d && (this.setState(), E(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint)this.onMouseOut();
                if (this.graphic || this.dataLabel)t(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this)this[g] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, g = 6; g--;)d = a[g], this[d] && (this[d] = this[d].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var c = this.series, g = c.tooltipOptions, h = n(g.valueDecimals, ""), k = g.valuePrefix || "", b = g.valueSuffix ||
                    "";
                B(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (k || b)a = a.replace(c + "}", k + c + "}" + b);
                    a = a.replace(c + "}", c + ":,." + h + "f}")
                });
                return d(a, {point: this, series: this.series})
            }, firePointEvent: function (a, d, g) {
                var c = this, e = this.series.options;
                (e.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (g = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                k(this, a, d, g)
            }, visible: !0
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.animObject,
            F = a.arrayMax, E = a.arrayMin, k = a.correctFloat, d = a.Date, h = a.defaultOptions, g = a.defined, n = a.each, t = a.erase, c = a.error, e = a.extend, q = a.fireEvent, w = a.grep, C = a.isArray, b = a.isNumber, f = a.isString, p = a.merge, v = a.pick, H = a.removeEvent, m = a.splat, D = a.stableSort, I = a.SVGElement, z = a.syncTimeout, J = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {duration: 1E3},
            events: {},
            marker: {radius: 4, states: {hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2}}},
            point: {events: {}},
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                }, verticalAlign: "bottom", x: 0, y: 0, padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10}}, select: {marker: {}}},
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this, d, f, r = a.series, g, m = function (a, b) {
                    return v(a.options.index,
                            a._i) - v(b.options.index, b._i)
                };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                e(c, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                f = b.events;
                for (d in f)A(c, d, f[d]);
                if (f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                n(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                r.length && (g = r[r.length - 1]);
                c._i = v(g && g._i, -1) + 1;
                r.push(c);
                D(r, m);
                this.yAxis && D(this.yAxis.series, m);
                n(r, function (a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function () {
                var a = this, b = a.options, d = a.chart, e;
                n(a.axisTypes || [], function (f) {
                    n(d[f], function (c) {
                        e = c.options;
                        if (b[f] === e.index || void 0 !== b[f] && b[f] === e.id || void 0 === b[f] && 0 === e.index)c.series.push(a), a[f] = c, c.isDirty = !0
                    });
                    a[f] || a.optionalAxis === f || c(18, !0)
                })
            },
            updateParallelArrays: function (a, c) {
                var d = a.series, e = arguments, f = b(c) ? function (b) {
                    var e = "y" === b && d.toYData ? d.toYData(a) : a[b];
                    d[b + "Data"][c] =
                        e
                } : function (a) {
                    Array.prototype[c].apply(d[a + "Data"], Array.prototype.slice.call(e, 2))
                };
                n(d.parallelArrays, f)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, c, e = a.pointIntervalUnit, b = v(b, a.pointStart, 0);
                this.pointInterval = c = v(this.pointInterval, a.pointInterval, 1);
                e && (a = new d(b), "day" === e ? a = +a[d.hcSetDate](a[d.hcGetDate]() + c) : "month" === e ? a = +a[d.hcSetMonth](a[d.hcGetMonth]() + c) : "year" === e && (a = +a[d.hcSetFullYear](a[d.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b =
                    this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
                this.userOptions = a;
                c = p(e, c.series, a);
                this.tooltipOptions = p(h.tooltip, h.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
                null === e.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && g(a[a.length - 1].value) && a.push({});
                return c
            },
            getCyclic: function (a, b, c) {
                var d, e = this.userOptions, f = a + "Index", r = a + "Counter", m = c ? c.length : v(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (d = v(e[f], e["_" + f]), g(d) || (e["_" + f] = d = this.chart[r] % m, this.chart[r] += 1), c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b
            },
            getColor: function () {
                this.getCyclic("color")
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (a, d, e, g) {
                var l = this, r = l.points, m = r && r.length || 0, h, y = l.options, k = l.chart, q = null, p = l.xAxis, t = y.turboThreshold, z = this.xData, D = this.yData, w = (h = l.pointArrayMap) && h.length;
                a = a || [];
                h = a.length;
                d = v(d, !0);
                if (!1 !== g && h && m === h && !l.cropped && !l.hasGroupedData && l.visible)n(a, function (a, b) {
                    r[b].update && a !== y.data[b] && r[b].update(a, !1, null, !1)
                }); else {
                    l.xIncrement = null;
                    l.colorCounter = 0;
                    n(this.parallelArrays, function (a) {
                        l[a + "Data"].length = 0
                    });
                    if (t && h > t) {
                        for (e = 0; null === q && e < h;)q = a[e], e++;
                        if (b(q))for (e =
                                          0; e < h; e++)z[e] = this.autoIncrement(), D[e] = a[e]; else if (C(q))if (w)for (e = 0; e < h; e++)q = a[e], z[e] = q[0], D[e] = q.slice(1, w + 1); else for (e = 0; e < h; e++)q = a[e], z[e] = q[0], D[e] = q[1]; else c(12)
                    } else for (e = 0; e < h; e++)void 0 !== a[e] && (q = {series: l}, l.pointClass.prototype.applyOptions.apply(q, [a[e]]), l.updateParallelArrays(q, e));
                    f(D[0]) && c(14, !0);
                    l.data = [];
                    l.options.data = l.userOptions.data = a;
                    for (e = m; e--;)r[e] && r[e].destroy && r[e].destroy();
                    p && (p.minRange = p.userMinRange);
                    l.isDirty = k.isDirtyBox = !0;
                    l.isDirtyData = !!r;
                    e = !1
                }
                "point" ===
                y.legendType && (this.processData(), this.generatePoints());
                d && k.redraw(e)
            },
            processData: function (a) {
                var b = this.xData, d = this.yData, e = b.length, f;
                f = 0;
                var g, r, m = this.xAxis, h, k = this.options;
                h = k.cropThreshold;
                var q = this.getExtremesFromAll || k.getExtremesFromAll, p = this.isCartesian, k = m && m.val2lin, n = m && m.isLog, t, v;
                if (p && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !a)return !1;
                m && (a = m.getExtremes(), t = a.min, v = a.max);
                if (p && this.sorted && !q && (!h || e > h || this.forceCrop))if (b[e - 1] < t || b[0] > v)b = [], d = []; else if (b[0] < t ||
                    b[e - 1] > v)f = this.cropData(this.xData, this.yData, t, v), b = f.xData, d = f.yData, f = f.start, g = !0;
                for (h = b.length || 1; --h;)e = n ? k(b[h]) - k(b[h - 1]) : b[h] - b[h - 1], 0 < e && (void 0 === r || e < r) ? r = e : 0 > e && this.requireSorting && c(15);
                this.cropped = g;
                this.cropStart = f;
                this.processedXData = b;
                this.processedYData = d;
                this.closestPointRange = r
            },
            cropData: function (a, b, c, d) {
                var e = a.length, f = 0, g = e, r = v(this.cropShoulder, 1), m;
                for (m = 0; m < e; m++)if (a[m] >= c) {
                    f = Math.max(0, m - r);
                    break
                }
                for (c = m; c < e; c++)if (a[c] > d) {
                    g = c + r;
                    break
                }
                return {
                    xData: a.slice(f, g), yData: b.slice(f,
                        g), start: f, end: g
                }
            },
            generatePoints: function () {
                var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, k, q = this.hasGroupedData, p, n = [], t;
                b || q || (b = [], b.length = a.length, b = this.data = b);
                for (t = 0; t < g; t++)k = h + t, q ? (p = (new f).init(this, [d[t]].concat(m(e[t]))), p.dataGroup = this.groupMap[t]) : (p = b[k]) || void 0 === a[k] || (b[k] = p = (new f).init(this, a[k], d[t])), p.index = k, n[t] = p;
                if (b && (g !== (c = b.length) || q))for (t = 0; t < c; t++)t !== h || q || (t += g), b[t] && (b[t].destroyElements(),
                    b[t].plotX = void 0);
                this.data = b;
                this.points = n
            },
            getExtremes: function (a) {
                var c = this.yAxis, d = this.processedXData, e, f = [], g = 0;
                e = this.xAxis.getExtremes();
                var r = e.min, m = e.max, h, k, q, p;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (p = 0; p < e; p++)if (k = d[p], q = a[p], h = (b(q, !0) || C(q)) && (!c.isLog || q.length || 0 < q), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[p + 1] || k) >= r && (d[p - 1] || k) <= m, h && k)if (h = q.length)for (; h--;)null !== q[h] && (f[g++] = q[h]); else f[g++] = q;
                this.dataMin = E(f);
                this.dataMax = F(f)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, c = a.stacking, d = this.xAxis, e = d.categories, f = this.yAxis, m = this.points, h = m.length, q = !!this.modifyValue, p = a.pointPlacement, t = "between" === p || b(p), n = a.threshold, z = a.startFromThreshold ? n : 0, D, w, I, J, C = Number.MAX_VALUE;
                "between" === p && (p = .5);
                b(p) && (p *= v(a.pointRange || d.pointRange));
                for (a = 0; a < h; a++) {
                    var H = m[a], A = H.x, B = H.y;
                    w = H.low;
                    var F = c && f.stacks[(this.negStacks && B < (z ? 0 : n) ? "-" : "") + this.stackKey],
                        E;
                    f.isLog && null !== B && 0 >= B && (H.isNull = !0);
                    H.plotX = D = k(Math.min(Math.max(-1E5, d.translate(A, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    c && this.visible && !H.isNull && F && F[A] && (J = this.getStackIndicator(J, A, this.index), E = F[A], B = E.points[J.key], w = B[0], B = B[1], w === z && J.key === F[A].base && (w = v(n, f.min)), f.isLog && 0 >= w && (w = null), H.total = H.stackTotal = E.total, H.percentage = E.total && H.y / E.total * 100, H.stackY = B, E.setOffset(this.pointXOffset || 0, this.barW || 0));
                    H.yBottom = g(w) ? f.translate(w, 0, 1, 0, 1) : null;
                    q && (B = this.modifyValue(B,
                        H));
                    H.plotY = w = "number" === typeof B && Infinity !== B ? Math.min(Math.max(-1E5, f.translate(B, 0, 1, 0, 1)), 1E5) : void 0;
                    H.isInside = void 0 !== w && 0 <= w && w <= f.len && 0 <= D && D <= d.len;
                    H.clientX = t ? k(d.translate(A, 0, 0, 0, 1, p)) : D;
                    H.negative = H.y < (n || 0);
                    H.category = e && void 0 !== e[H.x] ? e[H.x] : H.x;
                    H.isNull || (void 0 !== I && (C = Math.min(C, Math.abs(D - I))), I = D)
                }
                this.closestPointRangePx = C
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return w(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, c = this.options, d = b.renderer, e = b.inverted, f = this.clipBox, g = f || b.clipBox, r = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), m = b[r], h = b[r + "m"];
                m || (a && (g.width = 0, b[r + "m"] = h = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[r] = m = d.clipRect(g), m.count = {length: 0});
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || f ? m : b.clipRect), this.markerGroup.clip(h),
                    this.sharedClipKey = r);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && r && b[r] && (f || (b[r] = b[r].destroy()), b[r + "m"] && (b[r + "m"] = b[r + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart, c = B(this.options.animation), d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                q(this, "afterAnimate")
            },
            drawPoints: function () {
                var a =
                    this.points, c = this.chart, d, e, f, g, m = this.options.marker, h, k, q, p, t = this.markerGroup, n = v(m.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * m.radius);
                if (!1 !== m.enabled || this._hasPointMarkers)for (e = a.length; e--;)f = a[e], d = f.plotY, g = f.graphic, h = f.marker || {}, k = !!f.marker, q = n && void 0 === h.enabled || h.enabled, p = f.isInside, q && b(d) && null !== f.y ? (d = v(h.symbol, this.symbol), f.hasImage = 0 === d.indexOf("url"), q = this.markerAttribs(f, f.selected && "select"), g ? g[p ? "show" : "hide"](!0).animate(q) : p && (0 < q.width ||
                f.hasImage) && (f.graphic = g = c.renderer.symbol(d, q.x, q.y, q.width, q.height, k ? h : m).add(t)), g && g.addClass(f.getClassName(), !0)) : g && (f.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker, d = a && a.options, e = d && d.marker || {}, d = v(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = v(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {x: Math.floor(a.plotX) - d, y: a.plotY - d};
                d && (a.width = a.height = 2 * d);
                return a
            },
            destroy: function () {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(J.navigator.userAgent),
                    d, e = a.data || [], f, g, m;
                q(a, "destroy");
                H(a);
                n(a.axisTypes || [], function (b) {
                    (m = a[b]) && m.series && (t(m.series, a), m.isDirty = m.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = e.length; d--;)(f = e[d]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (g in a)a[g] instanceof I && !a[g].survive && (d = c && "group" === g ? "hide" : "destroy", a[g][d]());
                b.hoverSeries === a && (b.hoverSeries = null);
                t(b.series, a);
                for (g in a)delete a[g]
            },
            getGraphPath: function (a, b, c) {
                var d = this, e = d.options, f =
                    e.step, m, h = [], r = [], k;
                a = a || d.points;
                (m = a.reversed) && a.reverse();
                (f = {right: 1, center: 2}[f] || f && 3) && m && (f = 4 - f);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                n(a, function (l, m) {
                    var q = l.plotX, p = l.plotY, t = a[m - 1];
                    (l.leftCliff || t && t.rightCliff) && !c && (k = !0);
                    l.isNull && !g(b) && 0 < m ? k = !e.connectNulls : l.isNull && !b ? k = !0 : (0 === m || k ? m = ["M", l.plotX, l.plotY] : d.getPointSpline ? m = d.getPointSpline(a, l, m) : f ? (m = 1 === f ? ["L", t.plotX, p] : 2 === f ? ["L", (t.plotX + q) / 2, t.plotY, "L", (t.plotX + q) / 2, p] : ["L", q, t.plotY], m.push("L", q, p)) : m =
                        ["L", q, p], r.push(l.x), f && r.push(l.x), h.push.apply(h, m), k = !1)
                });
                h.xMap = r;
                return d.graphPath = h
            },
            drawGraph: function () {
                var a = this, b = (this.gappedPath || this.getGraphPath).call(this), c = [["graph", "highcharts-graph"]];
                n(this.zones, function (a, b) {
                    c.push(["zone-graph-" + b, "highcharts-graph highcharts-zone-graph-" + b + " " + (a.className || "")])
                });
                n(c, function (c, d) {
                    d = c[0];
                    var e = a[d];
                    e ? (e.endX = b.xMap, e.animate({d: b})) : b.length && (a[d] = a.chart.renderer.path(b).addClass(c[1]).attr({zIndex: 1}).add(a.group));
                    e && (e.startX =
                        b.xMap, e.isArea = b.isArea)
                })
            },
            applyZones: function () {
                var a = this, b = this.chart, c = b.renderer, d = this.zones, e, f, g = this.clips || [], m, h = this.graph, k = this.area, q = Math.max(b.chartWidth, b.chartHeight), p = this[(this.zoneAxis || "y") + "Axis"], t, z, w = b.inverted, D, I, J, H, C = !1;
                d.length && (h || k) && p && void 0 !== p.min && (z = p.reversed, D = p.horiz, h && h.hide(), k && k.hide(), t = p.getExtremes(), n(d, function (d, l) {
                    e = z ? D ? b.plotWidth : 0 : D ? 0 : p.toPixels(t.min);
                    e = Math.min(Math.max(v(f, e), 0), q);
                    f = Math.min(Math.max(Math.round(p.toPixels(v(d.value,
                        t.max), !0)), 0), q);
                    C && (e = f = p.toPixels(t.max));
                    I = Math.abs(e - f);
                    J = Math.min(e, f);
                    H = Math.max(e, f);
                    p.isXAxis ? (m = {
                        x: w ? H : J,
                        y: 0,
                        width: I,
                        height: q
                    }, D || (m.x = b.plotHeight - m.x)) : (m = {
                        x: 0,
                        y: w ? H : J,
                        width: q,
                        height: I
                    }, D && (m.y = b.plotWidth - m.y));
                    g[l] ? g[l].animate(m) : (g[l] = c.clipRect(m), h && a["zone-graph-" + l].clip(g[l]), k && a["zone-area-" + l].clip(g[l]));
                    C = d.value > t.max
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    var b = {width: c.yAxis.len, height: c.xAxis.len};
                    n(["group", "markerGroup"], function (d) {
                        c[d] && c[d].attr(b).invert(a)
                    })
                }

                var c = this, d;
                c.xAxis && (d = A(c.chart, "resize", b), A(c, "destroy", d), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, e) {
                var f = this[a], g = !f;
                g && (this[a] = f = this.chart.renderer.g(b).attr({zIndex: d || .1}).add(e), f.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                f.attr({visibility: c})[g ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b =
                    c, c = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a = this, b = a.chart, c, d = a.options, e = !!a.animate && b.renderer.isSVG && B(d.animation).duration, f = a.visible ? "inherit" : "hidden", g = d.zIndex, m = a.hasRendered, h = b.seriesGroup, k = b.inverted;
                c = a.plotGroup("group", "series", f, g, h);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, h);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? k : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels &&
                a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(k);
                !1 === d.clip || a.sharedClipKey || m || c.clip(b.clipRect);
                e && a.animate();
                m || (a.animationTimeout = z(function () {
                    a.afterAnimate()
                }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
                c && (a.inverted && c.attr({width: a.plotWidth, height: a.plotHeight}), c.animate({
                    translateX: v(d && d.left,
                        a.plotLeft), translateY: v(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis, d = this.yAxis, e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var f, g;
                    if (g = c && c.length)return f = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: c[g],
                        left: a(c.slice(0, g), d + 1, e), right: a(c.slice(g + 1), d + 1, e)
                    }
                }

                var b = this, c = b.kdDimensions;
                delete b.kdTree;
                z(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, l, h) {
                    var k = b.point, q = d.kdAxisArray[l % h], r, p, t = k;
                    p = g(a[e]) && g(k[e]) ? Math.pow(a[e] - k[e], 2) : null;
                    r = g(a[f]) && g(k[f]) ? Math.pow(a[f] - k[f], 2) : null;
                    r = (p || 0) + (r || 0);
                    k.dist = g(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    k.distX = g(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    q = a[q] - k[q];
                    r = 0 > q ? "left" : "right";
                    p = 0 > q ? "right" : "left";
                    b[r] && (r = c(a, b[r], l + 1, h), t = r[m] < t[m] ? r : k);
                    b[p] && Math.sqrt(q * q) < t[m] && (a = c(a, b[p], l + 1, h), t = a[m] < t[m] ? a : t);
                    return t
                }

                var d = this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], m = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree)return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(L);
    (function (a) {
        function A(a, c, d, g, h) {
            var e = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = c;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = h;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {
                align: c.align || (e ? d ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (e ? "middle" : d ? "bottom" : "top"),
                y: n(c.y, e ? 4 : d ? 14 : -6),
                x: n(c.x, e ? d ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (e ? d ? "right" : "left" : "center")
        }

        var B = a.Axis, F = a.Chart, E = a.correctFloat, k = a.defined, d = a.destroyObjectProperties, h = a.each, g = a.format, n = a.pick;
        a = a.Series;
        A.prototype = {
            destroy: function () {
                d(this, this.axis)
            }, render: function (a) {
                var c = this.options, d = c.format, d = d ? g(d, this) : c.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(d, null, null, c.useHTML).css(c.style).attr({
                    align: this.textAlign,
                    rotation: c.rotation,
                    visibility: "hidden"
                }).add(a)
            }, setOffset: function (a, c) {
                var d = this.axis, g = d.chart, h = g.inverted, k = d.reversed, k = this.isNegative && !k || !this.isNegative && k, b = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1), d = d.translate(0), d = Math.abs(b - d);
                a = g.xAxis[0].translate(this.x) + a;
                var f = g.plotHeight, h = {
                    x: h ? k ? b : b - d : a,
                    y: h ? f - a - c : k ? f - b - d : f - b,
                    width: h ? d : c,
                    height: h ? c : d
                };
                if (c =
                        this.label)c.align(this.alignOptions, null, h), h = c.alignAttr, c[!1 === this.options.crop || g.isInsidePlot(h.x, h.y) ? "show" : "hide"](!0)
            }
        };
        F.prototype.getStacks = function () {
            var a = this;
            h(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            h(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + n(c.options.stack, ""))
            })
        };
        B.prototype.buildStacks = function () {
            var a = this.series, c, d = n(this.options.reversedStacks, !0), g = a.length, h;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (h = g; h--;)a[d ? h : g - h - 1].setStackedPoints();
                for (h = g; h--;)c = a[d ? h : g - h - 1], c.setStackCliffs && c.setStackCliffs();
                if (this.usePercentage)for (h = 0; h < g; h++)a[h].setPercentStacks()
            }
        };
        B.prototype.renderStackTotals = function () {
            var a = this.chart, c = a.renderer, d = this.stacks, g, h, k = this.stackTotalGroup;
            k || (this.stackTotalGroup = k = c.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            k.translate(a.plotLeft, a.plotTop);
            for (g in d)for (h in a = d[g], a)a[h].render(k)
        };
        B.prototype.resetStacks =
            function () {
                var a = this.stacks, c, d;
                if (!this.isXAxis)for (c in a)for (d in a[c])a[c][d].touched < this.stacksTouched ? (a[c][d].destroy(), delete a[c][d]) : (a[c][d].total = null, a[c][d].cum = 0)
            };
        B.prototype.cleanStacks = function () {
            var a, c, d;
            if (!this.isXAxis)for (c in this.oldStacks && (a = this.stacks = this.oldStacks), a)for (d in a[c])a[c][d].cum = a[c][d].total
        };
        a.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData,
                    c = this.processedYData, d = [], g = c.length, h = this.options, C = h.threshold, b = h.startFromThreshold ? C : 0, f = h.stack, h = h.stacking, p = this.stackKey, v = "-" + p, H = this.negStacks, m = this.yAxis, D = m.stacks, I = m.oldStacks, z, J, r, y, G, B, l;
                m.stacksTouched += 1;
                for (G = 0; G < g; G++)B = a[G], l = c[G], z = this.getStackIndicator(z, B, this.index), y = z.key, r = (J = H && l < (b ? 0 : C)) ? v : p, D[r] || (D[r] = {}), D[r][B] || (I[r] && I[r][B] ? (D[r][B] = I[r][B], D[r][B].total = null) : D[r][B] = new A(m, m.options.stackLabels, J, B, f)), r = D[r][B], null !== l && (r.points[y] = r.points[this.index] =
                    [n(r.cum, b)], k(r.cum) || (r.base = y), r.touched = m.stacksTouched, 0 < z.index && !1 === this.singleStacks && (r.points[y][0] = r.points[this.index + "," + B + ",0"][0])), "percent" === h ? (J = J ? p : v, H && D[J] && D[J][B] ? (J = D[J][B], r.total = J.total = Math.max(J.total, r.total) + Math.abs(l) || 0) : r.total = E(r.total + (Math.abs(l) || 0))) : r.total = E(r.total + (l || 0)), r.cum = n(r.cum, b) + (l || 0), null !== l && (r.points[y].push(r.cum), d[G] = r.cum);
                "percent" === h && (m.usePercentage = !0);
                this.stackedYData = d;
                m.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function () {
            var a =
                this, c = a.stackKey, d = a.yAxis.stacks, g = a.processedXData, k;
            h([c, "-" + c], function (c) {
                for (var b = g.length, e, h; b--;)if (e = g[b], k = a.getStackIndicator(k, e, a.index, c), e = (h = d[c] && d[c][e]) && h.points[k.key])h = h.total ? 100 / h.total : 0, e[0] = E(e[0] * h), e[1] = E(e[1] * h), a.stackedYData[b] = e[1]
            })
        };
        a.prototype.getStackIndicator = function (a, c, d, g) {
            !k(a) || a.x !== c || g && a.key !== g ? a = {x: c, index: 0, key: g} : a.index++;
            a.key = [d, c, a.index].join();
            return a
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.Axis, F = a.createElement, E = a.css, k = a.defined, d =
            a.each, h = a.erase, g = a.extend, n = a.fireEvent, t = a.inArray, c = a.isNumber, e = a.isObject, q = a.merge, w = a.pick, C = a.Point, b = a.Series, f = a.seriesTypes, p = a.setAnimation, v = a.splat;
        g(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, e = this;
                a && (b = w(b, !0), n(e, "addSeries", {options: a}, function () {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, c, d) {
                var e = b ? "xAxis" : "yAxis", f = this.options;
                a = q(a, {index: this[e].length, isX: b});
                new B(this, a);
                f[e] = v(f[e] || {});
                f[e].push(a);
                w(c, !0) && this.redraw(d)
            },
            showLoading: function (a) {
                var b = this, c = b.options, d = b.loadingDiv, e = function () {
                    d && E(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                d || (b.loadingDiv = d = F("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = F("span", {className: "highcharts-loading-inner"}, null, d), A(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                b.loadingShown = !0;
                e()
            },
            hideLoading: function () {
                var a =
                    this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
            update: function (a, b) {
                var e, f = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, g = a.chart, h, m;
                if (g) {
                    q(!0, this.options.chart, g);
                    "className" in g && this.setClassName(g.className);
                    if ("inverted" in g || "polar" in g)this.propFromSeries(), h = !0;
                    for (e in g)g.hasOwnProperty(e) && (-1 !== t("chart." + e, this.propsRequireUpdateSeries) && (m = !0), -1 !== t(e, this.propsRequireDirtyBox) && (this.isDirtyBox = !0))
                }
                for (e in a) {
                    if (this[e] && "function" === typeof this[e].update)this[e].update(a[e], !1); else if ("function" === typeof this[f[e]])this[f[e]](a[e]);
                    "chart" !== e && -1 !== t(e, this.propsRequireUpdateSeries) && (m = !0)
                }
                a.plotOptions && q(!0, this.options.plotOptions, a.plotOptions);
                d(["xAxis", "yAxis", "series"], function (b) {
                    a[b] && d(v(a[b]), function (a) {
                        var c = k(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                h && d(this.axes, function (a) {
                    a.update({}, !1)
                });
                m && d(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && q(!0, this.options.loading, a.loading);
                e = g && g.width;
                g = g && g.height;
                c(e) && e !== this.chartWidth || c(g) && g !== this.chartHeight ? this.setSize(e,
                    g) : w(b, !0) && this.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        g(C.prototype, {
            update: function (a, b, c, d) {
                function f() {
                    g.applyOptions(a);
                    null === g.y && m && (g.graphic = m.destroy());
                    e(a, !0) && (m && m.element && a && a.marker && a.marker.symbol && (g.graphic = m.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()));
                    k = g.index;
                    h.updateParallelArrays(g, k);
                    l.data[k] = e(l.data[k], !0) ? g.options : a;
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" === l.legendType &&
                    (q.isDirtyLegend = !0);
                    b && q.redraw(c)
                }

                var g = this, h = g.series, m = g.graphic, k, q = h.chart, l = h.options;
                b = w(b, !0);
                !1 === d ? f() : g.firePointEvent("update", {options: a}, f)
            }, remove: function (a, b) {
                this.series.removePoint(t(this, this.series.data), a, b)
            }
        });
        g(b.prototype, {
            addPoint: function (a, b, c, d) {
                var e = this.options, f = this.data, g = this.chart, h = this.xAxis && this.xAxis.names, m = e.data, k, l, q = this.xData, p, n;
                b = w(b, !0);
                k = {series: this};
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                n = k.x;
                p = q.length;
                if (this.requireSorting &&
                    n < q[p - 1])for (l = !0; p && q[p - 1] > n;)p--;
                this.updateParallelArrays(k, "splice", p, 0, 0);
                this.updateParallelArrays(k, p);
                h && k.name && (h[n] = k.name);
                m.splice(p, 0, a);
                l && (this.data.splice(p, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(d)
            }, removePoint: function (a, b, c) {
                var d = this, e = d.data, f = e[a], g = d.points, h = d.chart, m = function () {
                    g && g.length === e.length &&
                    g.splice(a, 1);
                    e.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                    f && f.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    b && h.redraw()
                };
                p(c, h);
                b = w(b, !0);
                f ? f.firePointEvent("remove", null, m) : m()
            }, remove: function (a, b, c) {
                function d() {
                    e.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    w(a, !0) && f.redraw(b)
                }

                var e = this, f = e.chart;
                !1 !== c ? n(e, "remove", null, d) : d()
            }, update: function (a, b) {
                var c = this, e = this.chart, h = this.userOptions, m = this.type, k = a.type || h.type || e.options.chart.type,
                    p = f[m].prototype, n = ["group", "markerGroup", "dataLabelsGroup"], v;
                if (k && k !== m || void 0 !== a.zIndex)n.length = 0;
                d(n, function (a) {
                    n[a] = c[a];
                    delete c[a]
                });
                a = q(h, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
                this.remove(!1, null, !1);
                for (v in p)this[v] = void 0;
                g(this, f[k || m].prototype);
                d(n, function (a) {
                    c[a] = n[a]
                });
                this.init(e, a);
                e.linkSeries();
                w(b, !0) && e.redraw(!1)
            }
        });
        g(B.prototype, {
            update: function (a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = q(this.userOptions,
                    a);
                this.destroy(!0);
                this.init(c, g(a, {events: void 0}));
                c.isDirtyBox = !0;
                w(b, !0) && c.redraw()
            }, remove: function (a) {
                for (var b = this.chart, c = this.coll, e = this.series, f = e.length; f--;)e[f] && e[f].remove(!1);
                h(b.axes, this);
                h(b[c], this);
                b.options[c].splice(this.options.index, 1);
                d(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                w(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(L);
    (function (a) {
        var A = a.each, B =
            a.map, F = a.pick, E = a.Series, k = a.seriesType;
        k("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function () {
                var a = [], h = [], g = this.xAxis, k = this.yAxis, t = k.stacks[this.stackKey], c = {}, e = this.points, q = this.index, w = k.series, C = w.length, b, f = F(k.options.reversedStacks, !0) ? 1 : -1, p, v;
                if (this.options.stacking) {
                    for (p = 0; p < e.length; p++)c[e[p].x] = e[p];
                    for (v in t)null !== t[v].total && h.push(v);
                    h.sort(function (a, b) {
                        return a - b
                    });
                    b = B(w, function () {
                        return this.visible
                    });
                    A(h, function (d, e) {
                        var m = 0, n, v;
                        if (c[d] && !c[d].isNull)a.push(c[d]), A([-1, 1], function (a) {
                            var g = 1 === a ? "rightNull" : "leftNull", m = 0, k = t[h[e + a]];
                            if (k)for (p = q; 0 <= p && p < C;)n = k.points[p], n || (p === q ? c[d][g] = !0 : b[p] && (v = t[d].points[p]) && (m -= v[1] - v[0])), p += f;
                            c[d][1 === a ? "rightCliff" : "leftCliff"] = m
                        }); else {
                            for (p = q; 0 <= p && p < C;) {
                                if (n = t[d].points[p]) {
                                    m = n[1];
                                    break
                                }
                                p += f
                            }
                            m = k.toPixels(m, !0);
                            a.push({isNull: !0, plotX: g.toPixels(d, !0), plotY: m, yBottom: m})
                        }
                    })
                }
                return a
            }, getGraphPath: function (a) {
                var d = E.prototype.getGraphPath, g = this.options, k = g.stacking, t = this.yAxis,
                    c, e, q = [], w = [], C = this.index, b, f = t.stacks[this.stackKey], p = g.threshold, v = t.getThreshold(g.threshold), B, g = g.connectNulls || "percent" === k, m = function (c, d, e) {
                        var g = a[c];
                        c = k && f[g.x].points[C];
                        var h = g[e + "Null"] || 0;
                        e = g[e + "Cliff"] || 0;
                        var m, n, g = !0;
                        e || h ? (m = (h ? c[0] : c[1]) + e, n = c[0] + e, g = !!h) : !k && a[d] && a[d].isNull && (m = n = p);
                        void 0 !== m && (w.push({
                            plotX: b,
                            plotY: null === m ? v : t.getThreshold(m),
                            isNull: g
                        }), q.push({plotX: b, plotY: null === n ? v : t.getThreshold(n), doCurve: !1}))
                    };
                a = a || this.points;
                k && (a = this.getStackPoints());
                for (c = 0; c <
                a.length; c++)if (e = a[c].isNull, b = F(a[c].rectPlotX, a[c].plotX), B = F(a[c].yBottom, v), !e || g)g || m(c, c - 1, "left"), e && !k && g || (w.push(a[c]), q.push({
                    x: c,
                    plotX: b,
                    plotY: B
                })), g || m(c, c + 1, "right");
                c = d.call(this, w, !0, !0);
                q.reversed = !0;
                e = d.call(this, q, !0, !0);
                e.length && (e[0] = "L");
                e = c.concat(e);
                d = d.call(this, w, !1, g);
                e.xMap = c.xMap;
                this.areaPath = e;
                return d
            }, drawGraph: function () {
                this.areaPath = [];
                E.prototype.drawGraph.apply(this);
                var a = this, h = this.areaPath, g = this.options, k = [["area", "highcharts-area"]];
                A(this.zones, function (a,
                                        c) {
                    k.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + a.className])
                });
                A(k, function (d) {
                    var c = d[0], e = a[c];
                    e ? (e.endX = h.xMap, e.animate({d: h})) : (e = a[c] = a.chart.renderer.path(h).addClass(d[1]).attr({zIndex: 0}).add(a.group), e.isArea = !0);
                    e.startX = h.xMap;
                    e.shiftUnit = g.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var A = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, F, E) {
                var k = F.plotX, d = F.plotY, h = a[E - 1];
                E = a[E + 1];
                var g, n, t, c;
                if (h && !h.isNull && !1 !== h.doCurve && E && !E.isNull && !1 !== E.doCurve) {
                    a = h.plotY;
                    t = E.plotX;
                    E = E.plotY;
                    var e = 0;
                    g = (1.5 * k + h.plotX) / 2.5;
                    n = (1.5 * d + a) / 2.5;
                    t = (1.5 * k + t) / 2.5;
                    c = (1.5 * d + E) / 2.5;
                    t !== g && (e = (c - n) * (t - k) / (t - g) + d - c);
                    n += e;
                    c += e;
                    n > a && n > d ? (n = Math.max(a, d), c = 2 * d - n) : n < a && n < d && (n = Math.min(a, d), c = 2 * d - n);
                    c > E && c > d ? (c = Math.max(E, d), n = 2 * d - c) : c < E && c < d && (c = Math.min(E, d), n = 2 * d - c);
                    F.rightContX = t;
                    F.rightContY = c
                }
                F = ["C", A(h.rightContX, h.plotX), A(h.rightContY, h.plotY), A(g, k), A(n, d), k, d];
                h.rightContX = h.rightContY = null;
                return F
            }
        })
    })(L);
    (function (a) {
        var A = a.seriesTypes.area.prototype, B = a.seriesType;
        B("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: A.getStackPoints,
            getGraphPath: A.getGraphPath,
            setStackCliffs: A.setStackCliffs,
            drawGraph: A.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var A = a.animObject, B = a.each, F = a.extend, E = a.isNumber, k = a.merge, d = a.pick, h = a.Series, g = a.seriesType, n = a.stop, t = a.svg;
        g("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                h.prototype.init.apply(this, arguments);
                var a = this, d = a.chart;
                d.hasRendered && B(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, e = a.options, g = a.xAxis, h = a.yAxis,
                    k = g.reversed, b, f = {}, p = 0;
                !1 === e.grouping ? p = 1 : B(a.chart.series, function (c) {
                    var d = c.options, e = c.yAxis, g;
                    c.type === a.type && c.visible && h.len === e.len && h.pos === e.pos && (d.stacking ? (b = c.stackKey, void 0 === f[b] && (f[b] = p++), g = f[b]) : !1 !== d.grouping && (g = p++), c.columnIndex = g)
                });
                var n = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1), g.len), t = n * e.groupPadding, m = (n - 2 * t) / p, e = Math.min(e.maxPointWidth || g.len, d(e.pointWidth, m * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (m - e) / 2 + (t + ((a.columnIndex || 0) + (k ? 1 : 0)) * m - n / 2) * (k ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, d, g, h) {
                var c = this.chart, b = this.borderWidth, e = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (b += 1);
                g = Math.round(a + g) + e;
                a = Math.round(a) + e;
                h = Math.round(d + h) + b;
                e = .5 >= Math.abs(d) && .5 < h;
                d = Math.round(d) + b;
                h -= d;
                e && h && (--d, h += 1);
                return {x: a, y: d, width: g - a, height: h}
            },
            translate: function () {
                var a = this, e = a.chart, g = a.options, k = a.dense = 2 > a.closestPointRange * a.xAxis.transA, k = a.borderWidth = d(g.borderWidth,
                    k ? 0 : 1), n = a.yAxis, b = a.translatedThreshold = n.getThreshold(g.threshold), f = d(g.minPointLength, 5), p = a.getColumnMetrics(), v = p.width, t = a.barW = Math.max(v, 1 + 2 * k), m = a.pointXOffset = p.offset;
                e.inverted && (b -= .5);
                g.pointPadding && (t = Math.ceil(t));
                h.prototype.translate.apply(a);
                B(a.points, function (c) {
                    var g = d(c.yBottom, b), h = 999 + Math.abs(g), h = Math.min(Math.max(-h, c.plotY), n.len + h), k = c.plotX + m, p = t, q = Math.min(h, g), w, D = Math.max(h, g) - q;
                    Math.abs(D) < f && f && (D = f, w = !n.reversed && !c.negative || n.reversed && c.negative, q = Math.abs(q -
                        b) > f ? g - f : b - (w ? f : 0));
                    c.barX = k;
                    c.pointWidth = v;
                    c.tooltipPos = e.inverted ? [n.len + n.pos - e.plotLeft - h, a.xAxis.len - k - p / 2, D] : [k + p / 2, h + n.pos - e.plotTop, D];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [c.plotX, n.len / 2, 0, 0] : [k, q, p, D])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            drawPoints: function () {
                var a = this, d = this.chart, g = d.renderer, h = a.options.animationLimit || 250, t;
                B(a.points,
                    function (b) {
                        var c = b.graphic;
                        E(b.plotY) && null !== b.y ? (t = b.shapeArgs, c ? (n(c), c[d.pointCount < h ? "animate" : "attr"](k(t))) : b.graphic = g[b.shapeType](t).attr({"class": b.getClassName()}).add(b.group || a.group)) : c && (b.graphic = c.destroy())
                    })
            },
            animate: function (a) {
                var c = this, d = this.yAxis, g = c.options, h = this.chart.inverted, b = {};
                t && (a ? (b.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(g.threshold))), h ? b.translateX = a - d.len : b.translateY = a, c.group.attr(b)) : (b[h ? "translateX" : "translateY"] = d.pos, c.group.animate(b,
                    F(A(c.options.animation), {
                        step: function (a, b) {
                            c.group.attr({scaleY: Math.max(.001, b.pos)})
                        }
                    })), c.animate = null))
            },
            remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && B(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                h.prototype.remove.apply(a, arguments)
            }
        })
    })(L);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(L);
    (function (a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0, marker: {enabled: !0}, tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function () {
                this.options.lineWidth && A.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function (a) {
        var A = a.pick, B = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, E = this.chart, k = 2 * (a.slicedOffset || 0), d = E.plotWidth - 2 * k, E = E.plotHeight -
                    2 * k, h = a.center, h = [A(h[0], "50%"), A(h[1], "50%"), a.size || "100%", a.innerSize || 0], g = Math.min(d, E), n, t;
                for (n = 0; 4 > n; ++n)t = h[n], a = 2 > n || 2 === n && /%$/.test(t), h[n] = B(t, [d, E, g, h[2]][n]) + (a ? k : 0);
                h[3] > h[2] && (h[3] = h[2]);
                return h
            }
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.defined, F = a.each, E = a.extend, k = a.inArray, d = a.noop, h = a.pick, g = a.Point, n = a.Series, t = a.seriesType, c = a.setAnimation;
        t("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30, enabled: !0, formatter: function () {
                    return null === this.y ?
                        void 0 : this.point.name
                }, x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this, d = c.points, e = c.startAngleRad;
                a || (F(d, function (a) {
                    var b = a.graphic, d = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || c.center[3] / 2, start: e,
                        end: e
                    }), b.animate({r: d.r, start: d.start, end: d.end}, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, c = 0, d = this.points, g = d.length, b, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < g; a++)b = d[a], 0 > b.y && (b.y = null), c += f && !b.visible ? 0 : b.y;
                this.total = c;
                for (a = 0; a < g; a++)b = d[a], b.percentage = 0 < c && (b.visible || !f) ? b.y / c * 100 : 0, b.total = c
            },
            generatePoints: function () {
                n.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0, d = this.options, e = d.slicedOffset,
                    b = e + (d.borderWidth || 0), f, g, k, n = d.startAngle || 0, m = this.startAngleRad = Math.PI / 180 * (n - 90), n = (this.endAngleRad = Math.PI / 180 * (h(d.endAngle, n + 360) - 90)) - m, t = this.points, I = d.dataLabels.distance, d = d.ignoreHiddenPoint, z, J = t.length, r;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c) {
                    k = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + I), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(k) * (a[2] / 2 + I)
                };
                for (z = 0; z < J; z++) {
                    r = t[z];
                    f = m + c * n;
                    if (!d || r.visible)c += r.percentage / 100;
                    g = m + c * n;
                    r.shapeType = "arc";
                    r.shapeArgs = {
                        x: a[0], y: a[1], r: a[2] /
                        2, innerR: a[3] / 2, start: Math.round(1E3 * f) / 1E3, end: Math.round(1E3 * g) / 1E3
                    };
                    k = (g + f) / 2;
                    k > 1.5 * Math.PI ? k -= 2 * Math.PI : k < -Math.PI / 2 && (k += 2 * Math.PI);
                    r.slicedTranslation = {
                        translateX: Math.round(Math.cos(k) * e),
                        translateY: Math.round(Math.sin(k) * e)
                    };
                    f = Math.cos(k) * a[2] / 2;
                    g = Math.sin(k) * a[2] / 2;
                    r.tooltipPos = [a[0] + .7 * f, a[1] + .7 * g];
                    r.half = k < -Math.PI / 2 || k > Math.PI / 2 ? 1 : 0;
                    r.angle = k;
                    b = Math.min(b, I / 5);
                    r.labelPos = [a[0] + f + Math.cos(k) * I, a[1] + g + Math.sin(k) * I, a[0] + f + Math.cos(k) * b, a[1] + g + Math.sin(k) * b, a[0] + f, a[1] + g, 0 > I ? "center" : r.half ?
                        "right" : "left", k]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, c = a.chart.renderer, d, g, b;
                F(a.points, function (e) {
                    null !== e.y && (g = e.graphic, b = e.shapeArgs, d = e.sliced ? e.slicedTranslation : {}, g ? g.setRadialReference(a.center).animate(E(b, d)) : (e.graphic = g = c[e.shapeType](b).addClass(e.getClassName()).setRadialReference(a.center).attr(d).add(a.group), e.visible || g.attr({visibility: "hidden"})))
                })
            },
            searchPoint: d,
            sortByAngle: function (a, c) {
                a.sort(function (a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: d
        }, {
            init: function () {
                g.prototype.init.apply(this, arguments);
                var a = this, c;
                a.name = h(a.name, "Slice");
                c = function (c) {
                    a.slice("select" === c.type)
                };
                A(a, "select", c);
                A(a, "unselect", c);
                return a
            }, setVisible: function (a, c) {
                var d = this, e = d.series, b = e.chart, f = e.options.ignoreHiddenPoint;
                c = h(c, f);
                a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible : a, e.options.data[k(d, e.data)] = d.options, F(["graphic",
                    "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (d[b])d[b][a ? "show" : "hide"](!0)
                }), d.legendItem && b.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), f && (e.isDirty = !0), c && b.redraw())
            }, slice: function (a, d, g) {
                var e = this.series;
                c(g, e.chart);
                h(d, !0);
                this.sliced = this.options.sliced = a = B(a) ? a : !this.sliced;
                e.options.data[k(this, e.data)] = this.options;
                this.graphic.animate(a ? this.slicedTranslation : {translateX: 0, translateY: 0})
            }, haloPath: function (a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ?
                    [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
                    innerR: this.shapeArgs.r,
                    start: d.start,
                    end: d.end
                })
            }
        })
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.arrayMax, F = a.defined, E = a.each, k = a.extend, d = a.format, h = a.map, g = a.merge, n = a.noop, t = a.pick, c = a.relativeLength, e = a.Series, q = a.seriesTypes, w = a.stableSort, C = a.stop;
        a.distribute = function (a, d) {
            function b(a, b) {
                return a.target - b.target
            }

            var c, e = !0, f = a, g = [], k;
            k = 0;
            for (c = a.length; c--;)k += a[c].size;
            if (k > d) {
                w(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (k =
                         c = 0; k <= d;)k += a[c].size, c++;
                g = a.splice(c - 1, a.length)
            }
            w(a, b);
            for (a = h(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); e;) {
                for (c = a.length; c--;)e = a[c], k = (Math.min.apply(0, e.targets) + Math.max.apply(0, e.targets)) / 2, e.pos = Math.min(Math.max(0, k - e.size / 2), d - e.size);
                c = a.length;
                for (e = !1; c--;)0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size, a[c - 1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > d && (a[c - 1].pos = d - a[c - 1].size), a.splice(c, 1), e = !0)
            }
            c = 0;
            E(a, function (a) {
                var b = 0;
                E(a.targets, function () {
                    f[c].pos = a.pos + b;
                    b += f[c].size;
                    c++
                })
            });
            f.push.apply(f, g);
            w(f, b)
        };
        e.prototype.drawDataLabels = function () {
            var a = this, c = a.options, e = c.dataLabels, h = a.points, k, m, n = a.hasRendered || 0, q, z, w = t(e.defer, !0), r = a.chart.renderer;
            if (e.enabled || a._hasPointLabels)a.dlProcessOptions && a.dlProcessOptions(e), z = a.plotGroup("dataLabelsGroup", "data-labels", w && !n ? "hidden" : "visible", e.zIndex || 6), w && (z.attr({opacity: +n}), n || A(a, "afterAnimate", function () {
                a.visible && z.show(!0);
                z[c.animation ? "animate" : "attr"]({opacity: 1},
                    {duration: 200})
            })), m = e, E(h, function (b) {
                var c, f = b.dataLabel, h, n, p = b.connector, v = !0;
                k = b.dlOptions || b.options && b.options.dataLabels;
                c = t(k && k.enabled, m.enabled) && null !== b.y;
                if (f && !c)b.dataLabel = f.destroy(); else if (c) {
                    e = g(m, k);
                    c = e.rotation;
                    h = b.getLabelConfig();
                    q = e.format ? d(e.format, h) : e.formatter.call(h, e);
                    if (f)F(q) ? (f.attr({text: q}), v = !1) : (b.dataLabel = f = f.destroy(), p && (b.connector = p.destroy())); else if (F(q)) {
                        f = {r: e.borderRadius || 0, rotation: c, padding: e.padding, zIndex: 1};
                        for (n in f)void 0 === f[n] && delete f[n];
                        f = b.dataLabel = r[c ? "text" : "label"](q, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label").attr(f);
                        f.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (e.className || ""));
                        f.add(z)
                    }
                    f && a.alignDataLabel(b, f, e, null, v)
                }
            })
        };
        e.prototype.alignDataLabel = function (a, c, d, e, g) {
            var b = this.chart, f = b.inverted, h = t(a.plotX, -9999), n = t(a.plotY, -9999), p = c.getBBox(), r, q = d.rotation, v = d.align, w = this.visible && (a.series.forceDL || b.isInsidePlot(h, Math.round(n), f) || e && b.isInsidePlot(h, f ? e.x + 1 : e.y + e.height - 1, f)), l = "justify" ===
                t(d.overflow, "justify");
            w && (r = b.renderer.fontMetrics(void 0, c).b, e = k({
                x: f ? b.plotWidth - n : h,
                y: Math.round(f ? b.plotHeight - h : n),
                width: 0,
                height: 0
            }, e), k(d, {
                width: p.width,
                height: p.height
            }), q ? (l = !1, f = b.renderer.rotCorr(r, q), f = {
                x: e.x + d.x + e.width / 2 + f.x,
                y: e.y + d.y + {top: 0, middle: .5, bottom: 1}[d.verticalAlign] * e.height
            }, c[g ? "attr" : "animate"](f).attr({align: v}), h = (q + 720) % 360, h = 180 < h && 360 > h, "left" === v ? f.y -= h ? p.height : 0 : "center" === v ? (f.x -= p.width / 2, f.y -= p.height / 2) : "right" === v && (f.x -= p.width, f.y -= h ? 0 : p.height)) : (c.align(d,
                null, e), f = c.alignAttr), l ? this.justifyDataLabel(c, d, f, p, e, g) : t(d.crop, !0) && (w = b.isInsidePlot(f.x, f.y) && b.isInsidePlot(f.x + p.width, f.y + p.height)), d.shape && !q && c.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            w || (C(c), c.attr({y: -9999}), c.placed = !1)
        };
        e.prototype.justifyDataLabel = function (a, c, d, e, g, h) {
            var b = this.chart, f = c.align, k = c.verticalAlign, m, r, n = a.box ? 0 : a.padding || 0;
            m = d.x + n;
            0 > m && ("right" === f ? c.align = "left" : c.x = -m, r = !0);
            m = d.x + e.width - n;
            m > b.plotWidth && ("left" === f ? c.align = "right" : c.x = b.plotWidth - m, r = !0);
            m = d.y + n;
            0 > m && ("bottom" === k ? c.verticalAlign = "top" : c.y = -m, r = !0);
            m = d.y + e.height - n;
            m > b.plotHeight && ("top" === k ? c.verticalAlign = "bottom" : c.y = b.plotHeight - m, r = !0);
            r && (a.placed = !h, a.align(c, null, g))
        };
        q.pie && (q.pie.prototype.drawDataLabels = function () {
            var b = this, c = b.data, d, g = b.chart, k = b.options.dataLabels, m = t(k.connectorPadding, 10), n = t(k.connectorWidth, 1), q = g.plotWidth, z = g.plotHeight, w, r = k.distance, y = b.center, A = y[2] / 2, C = y[1], l = 0 < r, u, F, L, O, N = [[], []], x, K, P, T, S = [0, 0, 0, 0];
            b.visible && (k.enabled || b._hasPointLabels) &&
            (e.prototype.drawDataLabels.apply(b), E(c, function (a) {
                a.dataLabel && a.visible && (N[a.half].push(a), a.dataLabel._pos = null)
            }), E(N, function (c, e) {
                var f, l, n = c.length, p, t, v;
                if (n)for (b.sortByAngle(c, e - .5), 0 < r && (f = Math.max(0, C - A - r), l = Math.min(C + A + r, g.plotHeight), p = h(c, function (a) {
                    if (a.dataLabel)return v = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - f + v / 2,
                        size: v,
                        rank: a.y
                    }
                }), a.distribute(p, l + v - f)), T = 0; T < n; T++)d = c[T], L = d.labelPos, u = d.dataLabel, P = !1 === d.visible ? "hidden" : "inherit", t = L[1], p ? void 0 === p[T].pos ?
                    P = "hidden" : (O = p[T].size, K = f + p[T].pos) : K = t, x = k.justify ? y[0] + (e ? -1 : 1) * (A + r) : b.getX(K < f + 2 || K > l - 2 ? t : K, e), u._attr = {
                    visibility: P,
                    align: L[6]
                }, u._pos = {
                    x: x + k.x + ({left: m, right: -m}[L[6]] || 0),
                    y: K + k.y - 10
                }, L.x = x, L.y = K, null === b.options.size && (F = u.width, x - F < m ? S[3] = Math.max(Math.round(F - x + m), S[3]) : x + F > q - m && (S[1] = Math.max(Math.round(x + F - q + m), S[1])), 0 > K - O / 2 ? S[0] = Math.max(Math.round(-K + O / 2), S[0]) : K + O / 2 > z && (S[2] = Math.max(Math.round(K + O / 2 - z), S[2])))
            }), 0 === B(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(),
            l && n && E(this.points, function (a) {
                var c;
                w = a.connector;
                if ((u = a.dataLabel) && u._pos && a.visible) {
                    P = u._attr.visibility;
                    if (c = !w)a.connector = w = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup);
                    w[c ? "attr" : "animate"]({d: b.connectorPath(a.labelPos)});
                    w.attr("visibility", P)
                } else w && (a.connector = w.destroy())
            }))
        }, q.pie.prototype.connectorPath = function (a) {
            var b = a.x, c = a.y;
            return t(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5),
                c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, q.pie.prototype.placeDataLabels = function () {
            E(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999}))
            })
        }, q.pie.prototype.alignDataLabel = n, q.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, d = this.options, e = d.center, g = d.minSize || 80, h, k;
            null !== e[0] ? h = Math.max(b[2] - Math.max(a[1],
                    a[3]), g) : (h = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2);
            null !== e[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), g) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2);
            h < b[2] ? (b[2] = h, b[3] = Math.min(c(d.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0;
            return k
        });
        q.column && (q.column.prototype.alignDataLabel = function (a, c, d, h, k) {
            var b = this.chart.inverted, f = a.series, n = a.dlBox || a.shapeArgs, p = t(a.below, a.plotY > t(this.translatedThreshold, f.yAxis.len)),
                q = t(d.inside, !!this.options.stacking);
            n && (h = g(n), 0 > h.y && (h.height += h.y, h.y = 0), n = h.y + h.height - f.yAxis.len, 0 < n && (h.height -= n), b && (h = {
                x: f.yAxis.len - h.y - h.height,
                y: f.xAxis.len - h.x - h.width,
                width: h.height,
                height: h.width
            }), q || (b ? (h.x += p ? 0 : h.width, h.width = 0) : (h.y += p ? h.height : 0, h.height = 0)));
            d.align = t(d.align, !b || q ? "center" : p ? "right" : "left");
            d.verticalAlign = t(d.verticalAlign, b || q ? "middle" : p ? "top" : "bottom");
            e.prototype.alignDataLabel.call(this, a, c, d, h, k)
        })
    })(L);
    (function (a) {
        var A = a.Chart, B = a.each, F = a.pick,
            E = a.addEvent;
        A.prototype.callbacks.push(function (a) {
            function d() {
                var d = [];
                B(a.series, function (a) {
                    var g = a.options.dataLabels, h = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && B(h, function (c) {
                        B(a.points, function (a) {
                            a[c] && (a[c].labelrank = F(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[c]))
                        })
                    })
                });
                a.hideOverlappingLabels(d)
            }

            d();
            E(a, "redraw", d)
        });
        A.prototype.hideOverlappingLabels = function (a) {
            var d = a.length, h, g, k, t, c, e, q, w, A, b = function (a, b, c, d, e,
                                                                       g, h, k) {
                return !(e > a + c || e + h < a || g > b + d || g + k < b)
            };
            for (g = 0; g < d; g++)if (h = a[g])h.oldOpacity = h.opacity, h.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (g = 0; g < d; g++)for (k = a[g], h = g + 1; h < d; ++h)if (t = a[h], k && t && k.placed && t.placed && 0 !== k.newOpacity && 0 !== t.newOpacity && (c = k.alignAttr, e = t.alignAttr, q = k.parentGroup, w = t.parentGroup, A = 2 * (k.box ? 0 : k.padding), c = b(c.x + q.translateX, c.y + q.translateY, k.width - A, k.height - A, e.x + w.translateX, e.y + w.translateY, t.width - A, t.height - A)))(k.labelrank < t.labelrank ?
                k : t).newOpacity = 0;
            B(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function (a) {
        var A = a.addEvent, B = a.Chart, F = a.createElement, E = a.css, k = a.defaultOptions, d = a.defaultPlotOptions, h = a.each, g = a.extend, n = a.fireEvent, t = a.hasTouch, c = a.inArray, e = a.isObject, q = a.Legend, w = a.merge, C = a.pick, b = a.Point, f = a.Series, p = a.seriesTypes, v = a.svg, H;
        H = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a =
                    this, b = a.chart, c = b.pointer, d = function (a) {
                    for (var c = a.target, d; c && !d;)d = c.point, c = c.parentNode;
                    if (void 0 !== d && d !== b.hoverPoint)d.onMouseOver(a)
                };
                h(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (h(a.trackerGroups, function (b) {
                    if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
                            c.onTrackerMouseOut(a)
                        }), t))a[b].on("touchstart", d)
                }), a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a = this,
                    b = a.options.trackByArea, c = [].concat(b ? a.areaPath : a.graphPath), d = c.length, e = a.chart, f = e.pointer, g = e.renderer, k = e.options.tooltip.snap, n = a.tracker, l, q = function () {
                        if (e.hoverSeries !== a)a.onMouseOver()
                    }, p = "rgba(192,192,192," + (v ? .0001 : .002) + ")";
                if (d && !b)for (l = d + 1; l--;)"M" === c[l] && c.splice(l + 1, 0, c[l + 1] - k, c[l + 2], "L"), (l && "M" === c[l] || l === d) && c.splice(l, 0, "L", c[l - 2] + k, c[l - 1]);
                n ? n.attr({d: c}) : a.graph && (a.tracker = g.path(c).attr({
                    "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: p, fill: b ?
                        p : "none", "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * k), zIndex: 2
                }).add(a.group), h([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function (a) {
                        f.onTrackerMouseOut(a)
                    });
                    if (t)a.on("touchstart", q)
                }))
            }
        };
        p.column && (p.column.prototype.drawTracker = H.drawTrackerPoint);
        p.pie && (p.pie.prototype.drawTracker = H.drawTrackerPoint);
        p.scatter && (p.scatter.prototype.drawTracker = H.drawTrackerPoint);
        g(q.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this.chart, e = "highcharts-legend-" +
                    (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    d.seriesGroup.addClass(e)
                }).on("mouseout", function () {
                    d.seriesGroup.removeClass(e);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : n(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = F("input", {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle,
                    this.chart.container);
                A(a.checkbox, "click", function (b) {
                    n(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        g(B.prototype, {
            showResetZoom: function () {
                var a = this, b = k.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position,
                    !1, f)
            }, zoomOut: function () {
                var a = this;
                n(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, f;
                !a || a.resetSelection ? h(this.axes, function (a) {
                    b = a.zoom()
                }) : h(a.xAxis.concat(a.yAxis), function (a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                f = this.resetZoomButton;
                d && !f ? this.showResetZoom() : !d && e(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(C(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && h(d, function (a) {
                    a.setState()
                });
                h("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], h = (b.pointRange || 0) / 2, k = b.getExtremes(), m = b.toValue(g - f, !0) + h, h = b.toValue(g + b.len - f, !0) - h, g = g > f;
                    b.series.length && (g || m > Math.min(k.dataMin, k.min)) && (!g || h < Math.max(k.dataMax, k.max)) && (b.setExtremes(m, h, !1, !1, {trigger: "pan"}), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                E(c.container, {cursor: "move"})
            }
        });
        g(b.prototype, {
            select: function (a, b) {
                var d = this, e = d.series, f = e.chart;
                a = C(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[c(d, e.data)] = d.options;
                    d.setState(a && "select");
                    b || h(f.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[c(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a, b) {
                var c = this.series, d = c.chart, e = d.tooltip, f = d.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (f && f !== this)f.onMouseOut();
                        if (d.hoverSeries !== c)c.onMouseOver();
                        d.hoverPoint = this
                    }
                    !e || e.shared && !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            }, onMouseOut: function () {
                var a = this.series.chart, b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== c(this, b) || (this.setState(), a.hoverPoint = null)
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = w(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a)A(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            }, setState: function (b, c) {
                var e = Math.floor(this.plotX), f = this.plotY, g = this.series, h = g.options.states[b] || {}, k = d[g.type].marker && g.options.marker, m = k && !1 === k.enabled, n = k && k.states && k.states[b] || {}, l = !1 === n.enabled, q = g.stateMarkerGraphic, p = this.marker || {}, t = g.chart, v = g.halo, w, x = k && g.markerAttribs;
                b = b || "";
                if (!(b === this.state && !c || this.selected && "select" !== b || !1 === h.enabled || b && (l || m && !1 === n.enabled) || b && p.states && p.states[b] && !1 === p.states[b].enabled)) {
                    x &&
                    (w = g.markerAttribs(this, b));
                    if (this.graphic)this.state && this.graphic.removeClass("highcharts-point-" + this.state), b && this.graphic.addClass("highcharts-point-" + b), w && this.graphic.animate(w, C(t.options.chart.animation, n.animation, k.animation)), q && q.hide(); else {
                        if (b && n)if (k = p.symbol || g.symbol, q && q.currentSymbol !== k && (q = q.destroy()), q)q[c ? "animate" : "attr"]({
                            x: w.x,
                            y: w.y
                        }); else k && (g.stateMarkerGraphic = q = t.renderer.symbol(k, w.x, w.y, w.width, w.height).add(g.markerGroup), q.currentSymbol = k);
                        q && (q[b && t.isInsidePlot(e,
                            f, t.inverted) ? "show" : "hide"](), q.element.point = this)
                    }
                    (e = h.halo) && e.size ? (v || (g.halo = v = t.renderer.path().add(x ? g.markerGroup : g.group)), a.stop(v), v[c ? "animate" : "attr"]({d: this.haloPath(e.size)}), v.attr({"class": "highcharts-halo highcharts-color-" + C(this.colorIndex, g.colorIndex)})) : v && v.animate({d: this.haloPath(0)});
                    this.state = b
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        g(f.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this)b.onMouseOut();
                this.options.events.mouseOver && n(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d)d.onMouseOut();
                this && a.events.mouseOut && n(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a && (h([b.group, b.markerGroup], function (c) {
                    c && (b.state && c.removeClass("highcharts-series-" +
                        b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a)
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                h(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a])c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && h(d.series,
                    function (a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                h(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                n(c, f)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                n(this, a ? "select" : "unselect")
            }, drawTracker: H.drawTrackerGraph
        })
    })(L);
    (function (a) {
        var A = a.Chart, B = a.each, F = a.inArray, E = a.isObject, k = a.pick, d = a.splat;
        A.prototype.setResponsive =
            function (a) {
                var d = this.options.responsive;
                d && d.rules && B(d.rules, function (d) {
                    this.matchResponsiveRule(d, a)
                }, this)
            };
        A.prototype.matchResponsiveRule = function (d, g) {
            var h = this.respRules, t = d.condition, c;
            c = t.callback || function () {
                    return this.chartWidth <= k(t.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(t.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(t.minWidth, 0) && this.chartHeight >= k(t.minHeight, 0)
                };
            void 0 === d._id && (d._id = a.uniqueKey());
            c = c.call(this);
            !h[d._id] && c ? d.chartOptions && (h[d._id] = this.currentOptions(d.chartOptions),
                this.update(d.chartOptions, g)) : h[d._id] && !c && (this.update(h[d._id], g), delete h[d._id])
        };
        A.prototype.currentOptions = function (a) {
            function g(a, c, e) {
                var h, k;
                for (h in a)if (-1 < F(h, ["series", "xAxis", "yAxis"]))for (a[h] = d(a[h]), e[h] = [], k = 0; k < a[h].length; k++)e[h][k] = {}, g(a[h][k], c[h][k], e[h][k]); else E(a[h]) ? (e[h] = {}, g(a[h], c[h] || {}, e[h])) : e[h] = c[h] || null
            }

            var h = {};
            g(a, this.options, h);
            return h
        }
    })(L);
    return L
});
