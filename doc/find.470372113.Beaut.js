(function() {
	var requirejs, require, define;
	(function(e) {
		function c(e, t) {
			return f.call(e, t)
		}
		function h(e, t) {
			var n, r, i, s, o, a, f, l, c, h, p = t && t.split("/"),
				d = u.map,
				v = d && d["*"] || {};
			if (e && e.charAt(0) === ".") if (t) {
				p = p.slice(0, p.length - 1), e = p.concat(e.split("/"));
				for (l = 0; l < e.length; l += 1) {
					h = e[l];
					if (h === ".") e.splice(l, 1), l -= 1;
					else if (h === "..") {
						if (l === 1 && (e[2] === ".." || e[0] === "..")) break;
						l > 0 && (e.splice(l - 1, 2), l -= 2)
					}
				}
				e = e.join("/")
			} else e.indexOf("./") === 0 && (e = e.substring(2));
			if ((p || v) && d) {
				n = e.split("/");
				for (l = n.length; l > 0; l -= 1) {
					r = n.slice(0, l).join("/");
					if (p) for (c = p.length; c > 0; c -= 1) {
						i = d[p.slice(0, c).join("/")];
						if (i) {
							i = i[r];
							if (i) {
								s = i, o = l;
								break
							}
						}
					}
					if (s) break;
					!a && v && v[r] && (a = v[r], f = l)
				}!s && a && (s = a, o = f), s && (n.splice(0, o, s), e = n.join("/"))
			}
			return e
		}
		function p(t, r) {
			return function() {
				return n.apply(e, l.call(arguments, 0).concat([t, r]))
			}
		}
		function d(e) {
			return function(t) {
				return h(t, e)
			}
		}
		function v(e) {
			return function(t) {
				s[e] = t
			}
		}
		function m(n) {
			if (c(o, n)) {
				var r = o[n];
				delete o[n], a[n] = !0, t.apply(e, r)
			}
			if (!c(s, n) && !c(a, n)) throw new Error("No " + n);
			return s[n]
		}
		function g(e) {
			var t, n = e ? e.indexOf("!") : -1;
			return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
		}
		function y(e) {
			return function() {
				return u && u.config && u.config[e] || {}
			}
		}
		var t, n, r, i, s = {},
			o = {},
			u = {},
			a = {},
			f = Object.prototype.hasOwnProperty,
			l = [].slice;
		r = function(e, t) {
			var n, r = g(e),
				i = r[0];
			return e = r[1], i && (i = h(i, t), n = m(i)), i ? n && n.normalize ? e = n.normalize(e, d(t)) : e = h(e, t) : (e = h(e, t), r = g(e), i = r[0], e = r[1], i && (n = m(i))), {
				f: i ? i + "!" + e : e,
				n: e,
				pr: i,
				p: n
			}
		}, i = {
			require: function(e) {
				return p(e)
			},
			exports: function(e) {
				var t = s[e];
				return typeof t != "undefined" ? t : s[e] = {}
			},
			module: function(e) {
				return {
					id: e,
					uri: "",
					exports: s[e],
					config: y(e)
				}
			}
		}, t = function(t, n, u, f) {
			var l, h, d, g, y, b = [],
				w = typeof u,
				E;
			f = f || t;
			if (w === "undefined" || w === "function") {
				n = !n.length && u.length ? ["require", "exports", "module"] : n;
				for (y = 0; y < n.length; y += 1) {
					g = r(n[y], f), h = g.f;
					if (h === "require") b[y] = i.require(t);
					else if (h === "exports") b[y] = i.exports(t), E = !0;
					else if (h === "module") l = b[y] = i.module(t);
					else if (c(s, h) || c(o, h) || c(a, h)) b[y] = m(h);
					else {
						if (!g.p) throw new Error(t + " missing " + h);
						g.p.load(g.n, p(f, !0), v(h), {}), b[y] = s[h]
					}
				}
				d = u ? u.apply(s[t], b) : undefined;
				if (t) if (l && l.exports !== e && l.exports !== s[t]) s[t] = l.exports;
				else if (d !== e || !E) s[t] = d
			} else t && (s[t] = u)
		}, requirejs = require = n = function(s, o, a, f, l) {
			return typeof s == "string" ? i[s] ? i[s](o) : m(r(s, o).f) : (s.splice || (u = s, o.splice ? (s = o, o = a, a = null) : s = e), o = o ||
			function() {}, typeof a == "function" && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function() {
				t(e, s, o, a)
			}, 4), n)
		}, n.config = function(e) {
			return u = e, u.deps && n(u.deps, u.callback), n
		}, requirejs._defined = s, define = function(e, t, n) {
			t.splice || (n = t, t = []), !c(s, e) && !c(o, e) && (o[e] = [e, t, n])
		}, define.amd = {
			jQuery: !0
		}
	})(), define("almond", function() {}), !
	function(e) {
		typeof define == "function" ? define("$", e) : e()
	}(function() {
		return jQuery
	}), define("tmpl", ["module"], function(e) {
		"use strict";
		var t = e.config && e.config() || {},
			n = t.templateSetting || {},
			r = {
				evaluate: n.evaluate || /<%([\s\S]+?)%>/g,
				interpolate: n.interpolate || /<%=([\s\S]+?)%>/g,
				escape: n.escape || /<%-([\s\S]+?)%>/g,
				include: n.include || /<%@([\s\S]+?)%>/g
			},
			i = /(.)^/,
			s = {
				"'": "'",
				"\\": "\\",
				"\r": "r",
				"\n": "n",
				"	": "t",
				"\u2028": "u2028",
				"\u2029": "u2029"
			},
			o = /\\|'|\r|\n|\t|\u2028|\u2029/g,
			u = {},
			a = function(e, t, n) {
				var a;
				n = n || r;
				var f = new RegExp([(n.include || i).source, (n.escape || i).source, (n.interpolate || i).source, (n.evaluate || i).source].join("|") + "|$", "g"),
					l = 0,
					c = "__p+='";
				e.replace(f, function(t, n, r, i, a, f) {
					c += e.slice(l, f).replace(o, function(e) {
						return "\\" + s[e]
					});
					if (n) {
						var h = n.trim().split(":"),
							p = h[1] || "";
						c += "'+\n(" + u[h[0]] + ")(" + p + ")+\n'"
					}
					return r && (c += "'+\n((__t=(" + r + "))==null?'':$.escape(__t))+\n'"), i && (c += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), a && (c += "';\n" + a + "\n__p+='"), l = f + t.length, t
				}), c += "';\n", n.variable || (c = "with(obj||{}){\n" + c + "}\n"), c = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + c + "return __p;\n";
				try {
					a = new Function(n.variable || "obj", "$", c)
				} catch (h) {
					throw h.source = c, h
				}
				if (t) return a(t, $);
				var p = function(e) {
						return a.call(this, e, $)
					};
				return p.source = "function(" + (n.variable || "obj") + "){\n" + c + "}", p
			},
			f, l, c = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
			h = typeof location != "undefined" && location.href,
			p = h && location.protocol && location.protocol.replace(/\:/, ""),
			d = h && location.hostname,
			v = h && (location.port || undefined),
			m = {};
		f = {
			version: "2.0.5+",
			createXhr: t.createXhr ||
			function() {
				var e, t, n;
				if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
				if (typeof ActiveXObject != "undefined") for (t = 0; t < 3; t += 1) {
					n = c[t];
					try {
						e = new ActiveXObject(n)
					} catch (r) {}
					if (e) {
						c = [n];
						break
					}
				}
				return e
			},
			parseName: function(e) {
				var t, n, r, i = e.indexOf("."),
					s = e.indexOf("./") === 0 || e.indexOf("../") === 0;
				return i !== -1 && (!s || i > 1) ? (t = e.substring(0, i), n = e.substring(i + 1, e.length)) : t = e, r = n || t, i = r.indexOf("!"), i !== -1 && (r = r.substring(0, i), n ? n = r : t = r), {
					moduleName: t,
					ext: n
				}
			},
			xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
			useXhr: function(e, t, n, r) {
				var i, s, o, u = f.xdRegExp.exec(e);
				return u ? (i = u[2], s = u[3], s = s.split(":"), o = s[1], s = s[0], (!i || i === t) && (!s || s.toLowerCase() === n.toLowerCase()) && (!o && !s || o === r)) : !0
			},
			finishLoad: function(e, t, n) {
				var r = a(t);
				m[e] = r.source, n(r)
			},
			load: function(e, n, i, s) {
				t.isBuild = s.isBuild;
				var o = f.parseName(e),
					a = o.moduleName + (o.ext ? "." + o.ext : ""),
					l = n.toUrl(a),
					c = t.useXhr || f.useXhr;
				!h || c(l, p, d, v) ? f.get(l, function(t) {
					var s, o = [],
						a = [];
					while ((s = r.include.exec(t)) !== null) {
						var l = s[1].trim();
						o.push(l), a.push("tmpl!" + l)
					}
					a[0] ? n(a, function() {
						for (var n = 0, r = a.length; n < r; n++) u[o[n]] = m[o[n]];
						f.finishLoad(e, t, i)
					}) : f.finishLoad(e, t, i)
				}, function(e) {
					i.error && i.error(e)
				}) : n([a], function(e) {
					f.finishLoad(o.moduleName + "." + o.ext, e, i)
				})
			},
			write: function(e, t, n, r) {
				if (m.hasOwnProperty(t)) {
					var i = m[t];
					n.asModule(e + "!" + t, "define(function () { return " + i + ";});\n")
				}
			},
			writeFile: function(e, t, n, r, i) {
				var s = f.parseName(t),
					o = s.ext ? "." + s.ext : "",
					u = s.moduleName + o,
					a = n.toUrl(s.moduleName + o) + ".js";
				f.load(u, n, function(t) {
					var n = function(e) {
							return r(a, e)
						};
					n.asModule = function(e, t) {
						return r.asModule(e, a, t)
					}, f.write(e, u, n, i)
				}, i)
			}
		};
		if (t.env === "node" || !t.env && typeof process != "undefined" && process.versions && !! process.versions.node) l = require.nodeRequire("fs"), f.get = function(e, t) {
			var n = l.readFileSync(e, "utf8");
			n.indexOf("?") === 0 && (n = n.substring(1)), t(n)
		};
		else if (t.env === "xhr" || !t.env && f.createXhr()) f.get = function(e, n, r, i) {
			var s = f.createXhr(),
				o;
			s.open("GET", e, !0);
			if (i) for (o in i) i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
			t.onXhr && t.onXhr(s, e), s.onreadystatechange = function(t) {
				var i, o;
				s.readyState === 4 && (i = s.status, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r(o)) : n(s.responseText))
			}, s.send(null)
		};
		return f
	}), define("tmpl!template/peSearch.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div id="pe-header" class="search-header nav-header">\r\n<div id="pe-search">\r\n    <form id="pe-search-form">\r\n        <div id="pe-header-left">\r\n            <div id="pe-header-left-upper">\r\n                <p class="">关键词:</p>\r\n\r\n                <p id="pe-search-input-p">\r\n                    <input type="text" name="" maxlength="25"\r\n                           id="pe-search-input"\r\n                           data-clear-btn="se-search-clear-btn"\r\n                            >\r\n                    <a href="#" class="btn-clear-input" hidden id="se-search-clear-btn" data-clear-target="pe-search-input">清除关键词</a>\r\n                    <a class="btn-loc" data-lbs="people" data-prefix="pe">\r\n                        <span class="enable"><b></b>开启位置信息，查看附近的人</span>\r\n                        <span class="disable"><b></b>关闭位置信息，停止查看附近的人</span>\r\n                    </a>\r\n                </p>\r\n                <p class="" id="pe-sex-label">性别:</p>\r\n\r\n                <p data-sex-picker="" id="pe-sex-p">\r\n                    <input type="text" name="" id="pe-sex" placeholder="不限" tabindex="-1"\r\n                           data-real-sex="0">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n\r\n                <p class="pe-search-online">\r\n                    <input type="checkbox" name="pe-online" id="pe-online"\r\n                           checked/>\r\n                    <label for="pe-online" class="">在线优先</label>\r\n                </p>\r\n            </div>\r\n            <div id="pe-header-left-down">\r\n                <p class="" id="pe-location-info-label">所在地:</p>\r\n\r\n                <p data-location-picker="pe-location-info"\r\n                   id="pe-location-info-p">\r\n                    <input type="text" name="" id="pe-location-info" tabindex="-1"\r\n                           placeholder="不限">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n\r\n                <p class="" id="pe-hometown-label">故乡:</p>\r\n\r\n                <p data-location-picker="pe-hometown-info"\r\n                   id="pe-hometown-info-p">\r\n                    <input type="text" name="" id="pe-hometown-info" tabindex="-1"\r\n                           placeholder="不限">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n\r\n                <p class="" id="pe-age-label">年龄:</p>\r\n\r\n                <p data-age-picker="" id="pe-age-p">\r\n                    <input type="text" name="" id="pe-age" placeholder="不限" tabindex="-1"\r\n                           data-real-age="0">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n\r\n                <p class="pe-search-camera">\r\n                    <input type="checkbox" id="pe-camera">\r\n                    <label for="pe-camera" class="">有摄像头</label>\r\n                </p>\r\n            </div>\r\n        </div>\r\n        <div id="pe-header-right">\r\n            <button class="btn-search" id="pe-search-trigger-btn" title="查找">查 找</button>\r\n        </div>\r\n        <!--  用来触发 form 表单的回车提交 -->\r\n        <!-- <input type="submit"\r\n               style="width:0; height: 0; position: absolute; top: 0; left: -5000px;"/> -->\r\n    </form>\r\n</div>\r\n</div>\r\n<!--这个div是用来辅助 找人页面的地址选择的 需要覆盖下面的内容，需要动态的计算应该处在的位置-->\r\n<div class="location-generator" id="location-generator">\r\n    <div id="country-box" class="country-box">\r\n        <div id="country-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-country"\r\n                   type="text" id="country-value"\r\n                   class="country-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-country"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="country-ul" data-iden="country" id="country-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="province-box" class="province-box">\r\n        <div id="province-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-province"\r\n                   type="text" id="province-value"\r\n                   class="province-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-province"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="province-ul" data-iden="province" id="province-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="city-box" class="city-box">\r\n        <div id="city-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-city"\r\n                   type="text" id="city-value" class="city-value"\r\n                   maxlength="20" autocomplete="off">\r\n            <span data-click-action="chose-city" class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="city-ul" data-iden="city" id="city-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="district" class="district">\r\n        <div id="district-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-district"\r\n                   type="text" id="district-value"\r\n                   class="district-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-district"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="district-ul" data-iden="district" id="district-ul">\r\n        </ul>\r\n    </div>\r\n</div>\r\n<!-- 找人页DOM空间 -->';
			return __p
		}
	}), define("tmpl!template/peSearch54.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div id="pe-header" class="search-header nav-header">\r\n<div id="pe-search">\r\n    <form id="pe-search-form">\r\n        <div class="search-block">\r\n            <div class="search-first-line">\r\n                <div id="pe-search-input-p">\r\n                    <input type="text" name="" maxlength="25"\r\n                           id="pe-search-input"\r\n                           class="nav-search-input"\r\n                           data-clear-btn="se-search-clear-btn"\r\n                            >\r\n                    <a href="#" class="btn-clear-input" hidden  id="se-search-clear-btn" data-clear-target="pe-search-input">清除关键词</a>\r\n                    <a class="btn-loc" data-lbs="people" data-prefix="pe">\r\n                        <span class="enable"><b></b>开启位置信息，查看附近的人</span>\r\n                        <span class="disable"><b></b>关闭位置信息，停止查看附近的人</span>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="search-second-line">\r\n                <p data-location-picker="pe-location-info"\r\n                   id="pe-location-info-p">\r\n                    <input type="text" name="" id="pe-location-info" tabindex="-1"\r\n                           placeholder="所在地">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n                <p data-location-picker="pe-hometown-info"\r\n                   id="pe-hometown-info-p">\r\n                    <input type="text" name="" id="pe-hometown-info" tabindex="-1"\r\n                           placeholder="故乡">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n                <p data-sex-picker="" id="pe-sex-p" class="adv-option-p">\r\n                    <input class="adv-first-input" id="pe-sex" name="" data-real-sex="0"\r\n                           type="text" placeholder="性别" tabindex="-1" alt="性别"\r\n                           readonly\r\n                            />\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n                <p data-age-picker=""  id="pe-age-p" class="adv-option-p">\r\n                    <input class="adv-first-input" id="pe-age" name="" data-real-age="0"\r\n                           type="text"  placeholder="年龄" tabindex="-1"\r\n                           readonly\r\n                            />\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n            </div>\r\n        </div>\r\n        <div class="pe-checkboxes">\r\n            <p class="pe-search-online">\r\n                <input type="checkbox" name="pe-online" id="pe-online"\r\n                       />\r\n                <label for="pe-online" class="">在&nbsp;&nbsp;线</label>\r\n            </p>\r\n            <p class="pe-search-camera">\r\n                <input type="checkbox" name="pe-camera" id="pe-camera" />\r\n                <label for="pe-camera" class="">摄像头</label>\r\n            </p>\r\n        </div>\r\n\r\n\r\n        <button class="btn-search"  id="pe-search-trigger-btn" title="查找">查找</button>\r\n        <a class="pe-header-gender-friends" data-nav-behavior="gender" data-nav="people" href="#">同城交友</a>\r\n        <a class="pe-header-hometown-friends" data-nav-behavior="hometown" data-nav="people" href="#">同城老乡</a>\r\n        <a id="pe-nav-nearly-people-trigger" class="pe-header-nearly-friends" data-nav-behavior="nearly" data-nav="people" href="#">附近的人</a>\r\n    </form>\r\n</div>\r\n</div>\r\n<!--这个div是用来辅助 找人页面的地址选择的 需要覆盖下面的内容，需要动态的计算应该处在的位置-->\r\n<div class="location-generator" id="location-generator">\r\n    <div id="country-box" class="country-box">\r\n        <div id="country-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-country"\r\n                   type="text" id="country-value"\r\n                   class="country-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-country"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="country-ul" data-iden="country" id="country-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="province-box" class="province-box">\r\n        <div id="province-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-province"\r\n                   type="text" id="province-value"\r\n                   class="province-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-province"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="province-ul" data-iden="province" id="province-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="city-box" class="city-box">\r\n        <div id="city-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-city"\r\n                   type="text" id="city-value" class="city-value"\r\n                   maxlength="20" autocomplete="off">\r\n            <span data-click-action="chose-city" class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="city-ul" data-iden="city" id="city-ul">\r\n        </ul>\r\n    </div>\r\n    <div id="district" class="district">\r\n        <div id="district-value-bg" class="area-value-bg">\r\n            <input readonly placeholder="不限" data-click-action="chose-district"\r\n                   type="text" id="district-value"\r\n                   class="district-value" maxlength="20"\r\n                   autocomplete="off">\r\n            <span data-click-action="chose-district"\r\n                  class="icon-down-arrow"></span>\r\n        </div>\r\n        <ul class="district-ul" data-iden="district" id="district-ul">\r\n        </ul>\r\n    </div>\r\n</div>\r\n<!-- 找人页DOM空间 -->';
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/tdw", e) : e()
	}(function() {
		"use strict";
		var e = "http://report.url.cn/report/tdw/report?",
			t = [],
			n = 10,
			r = 0;
		for (var i = 0; i < n; i++) t[i] = new Image;
		return {
			reportTdw: function(i, s, o) {
				var u = $.cookie.get("uin").replace(/^o0?/, ""),
					a = ["uin", "ts"],
					f = [u, +(new Date)];
				s = a.concat(s);
				for (var l = 0; l < o.length; l++) o[l] = f.concat(o[l]);
				if (i == "pf00191") return;
				var c = e + "table=" + i + "&fields=" + JSON.stringify(s) + "&datas=" + encodeURIComponent(JSON.stringify(o)) + "&t=" + +(new Date);
				t[r++ % n].src = c
			}
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/cookie", ["../$"], e) : e($)
	}(function(e) {
		"use strict";
		var t = "cookie",
			n, r, i = {
				set: function(e, t, n) {
					n = n || {}, t === null && (n.expires = -1);
					var r = n.expires;
					if (typeof n.expires == "number") {
						var i = n.expires = new Date;
						i.setDate(i.getDate() + r)
					} else typeof n.expires == "string" && (n.expires = new Date(r));
					return t = String(t), document.cookie = [encodeURIComponent(e), "=", encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
				},
				get: function(e) {
					var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
					return t ? decodeURIComponent(t[2]) : ""
				},
				uin: function() {
					return n
				},
				skey: function() {
					return r
				},
				updateUinSkey: function() {
					var e = i.get("uin");
					e = e ? parseInt(e.substring(1, e.length), 10) : null, n = e;
					var t = i.get("skey");
					t = t ? t : null, r = t
				}
			};
		return e[t] = i
	}), !
	function(e) {
		typeof define == "function" ? define("tools/reportBasic", ["../$", "./cookie"], e) : e($)
	}(function(e, t) {
		"use strict";

		function v(e) {
			var t = s + "monitors=" + "[" + e + "]",
				n = new Image;
			n.src = t
		}
		function m(e, t, n, i) {
			t == 11402 && window.FromTencentId && (i = window.FromTencentId);
			var o = s + "tag=0&log=" + encodeURIComponent([n || 0, t || 0, i || 0, r].join("_"));
			o += "&monitors=[" + e + "]";
			var u = new Image;
			u.src = o
		}
		function g(e, t, n) {
			e == 11402 && window.FromTencentId && (n = window.FromTencentId);
			var i = s + "tag=0&log=" + encodeURIComponent([t || 0, e || 0, n || 0, r].join("_")),
				o = new Image;
			o.src = i
		}
		function y(t) {
			var n = {
				type: 0,
				wd: 0,
				na: 0,
				kfuin: 0
			},
				r = [],
				i;
			e.extend(n, t);
			for (var s in n) n[s] && r.push(s + "=" + encodeURIComponent(n[s]));
			i = o + r.join("&"), c.src = i
		}
		function b(e, t, n, r) {
			var s = [],
				o, u = r[0],
				a, f;
			a = 1, f = r.length;
			for (; a < f; a++) o = r[a], o = o ? o - u : 0, o > 0 && s.push(a + "=" + o);
			var l = i + "flag1=" + e + "&flag2=" + t + "&flag3=" + n + "&" + s.join("&"),
				c = new Image;
			c.src = l
		}
		function w(e, t, n, r, s) {
			var o = "";
			if (r && typeof r == "object") for (var u in r) o += "&" + r[u] + "=" + s[u];
			else o = "&" + r + "=" + s;
			var a = i + "flag1=" + e + "&flag2=" + t + "&flag3=" + n + o,
				f = new Image;
			f.src = a
		}
		function E(e, t, n, r) {
			var i = window.webkitPerformance ? window.webkitPerformance : window.performance,
				s = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
				o = r || n,
				u, a, f;
			if (i && (u = i.timing)) {
				u.domContentLoadedEventStart || s.splice(15, 2, "domContentLoadedStart", "domContentLoadedEnd");
				var l = [];
				for (f = 0, a = s.length; f < a; f++) l[f] = u[s[f]];
				b(e, t, o, l)
			}
		}
		function S(e, n, r) {
			var i, s = [];
			d.touin || (d.touin = t.uin()), d.commandid = e, d.resultcode = n, d.tmcost = r;
			if (n == 0) {
				d.frequency = 20;
				var o = Math.floor(Math.random() * 100 + 1);
				if (o > 100) return;
				d.type = 1
			} else d.frequency = 1, n > 1e3 ? d.type = 3 : d.type = 2;
			if (n) var u = {
				url: d.commandid,
				rate: d.frequency,
				code: d.resultcode,
				time: d.tmcost,
				uin: d.touin,
				type: d.type
			};
			for (var a in u) u.hasOwnProperty(a) && s.push(a + "=" + encodeURIComponent(u[a]));
			i = "http://c.isdspeed.qq.com/code.cgi?" + s.join("&"), p.src = i
		}
		var n = "report",
			r = "201706071924",
			i = "http://isdspeed.qq.com/cgi-bin/r.cgi?",
			s = "http://report.url.cn/report/report_vm?",
			o = "http://cst.crm2.qq.com/cgi/customer_report.php?",
			u = "http://wspeed.qq.com/w.cgi?",
			a = new Image,
			f = new Image,
			l = new Image,
			c = new Image,
			h = new Image,
			p = new Image,
			d = {
				appid: 1000130,
				releaseversion: r,
				frequency: 1
			};
		return e[n] = {
			isd: b,
			isdSingleTags: w,
			monitor: v,
			bernoulli: g,
			monitorAndBer: m,
			performance: E,
			qiyeReport: y,
			mmReport: S
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/native", ["../$", "./cookie", "./reportBasic"], e) : e($)
	}(function(e, t, n) {
		"use strict";

		function u(e, t) {
			try {
				t = t || [];
				var n = external[e].apply(null, t);
				return n
			} catch (r) {
				return null
			}
		}
		function a(e, t) {
			try {
				var n;
				return t = t || {}, n = external.CallHummerApi(e, JSON.stringify(t)), JSON.parse(n)
			} catch (r) {
				return null
			}
		}
		function l(e) {
			if (!e) return;
			var t = [];
			for (var n = 0, r = e.length; n < r; n += 2) t.push(String.fromCharCode("0x" + e.slice(n, n + 2)));
			return e = t.join(""), e
		}
		function c(e) {
			var t = 10;
			e = e || "", e = "" + e;
			while (e.length < t) e = "0" + e;
			return "o" + e
		}
		var r = 0,
			i;
		if (!window.external) {
			window.external = {};
			try {
				i = navigator.userAgent.match(/QQ\/(\d+)/), i && (r = i[1]), e.report.bernoulli(11347, "externalnull" + r)
			} catch (s) {}
		}
		var o = {};
		o.callHummerApi = a, o.startChat = function(e, t, n) {
			return t && (e += "&findTab=", e += t), n && (e += "&findSource=", e += n), u("startChat", [e])
		}, o.addBuddy = function(e, t, n) {
			e += "", t = (t || 1) + "", n = n || [];
			var r = [e, t];
			return r = r.concat(n), u("addBuddy", r)
		}, o.addToGroup = function(e, t, n) {
			var r = ["gsearchopenclient://addgroup/?groupuin=" + e + "&source_id=" + ((t << 16) + n)];
			return u("addToGroup", r)
		}, o.viewInfo = function(e, t, n) {
			var r = [e + ""];
			return t = t === void 0 || t < 0 && t >= 4 ? 0 : t, r.push(t + ""), o.getVersion() >= 5497 && window.external && window.external.viewInfoEx && n > 0 && n < 50 ? (r.push(n + ""), u("viewInfoEx", r)) : u("viewInfo", r)
		}, o.viewGroupInfo = function(e, t) {
			var n = "gsearchopenclient://showinfo/?groupuin=" + e,
				r = [];
			for (var i in t) i === "groupoption" ? r.push(i + "=" + 2) : r.push(i + "=" + t[i]);
			return n = n + "&" + r.join("&"), u("viewGroupInfo", [n])
		}, o.crmStartChat = function(e) {
			return u("crmStartChat", ["crmtalk://" + e])
		}, o.crmViewInfo = function(e, t) {
			return u("crmViewInfo", ["crmlink://crm_showcorpinfo?uin=" + e + "&corpname=" + t])
		}, o.crmAddBuddy = function(e, t, n) {
			return u("crmAddBuddy", ["crmadduser://v2/uin=" + e + "&corpname=" + t + "&nameaccount=" + n])
		}, o.getVersion = function() {
			var e = 0;
			return function() {
				return e = e || u("Hummer_IM_GetVersion"), e = parseInt(e), e === 0 || e !== e ? (n.monitor(294404), 4903) : e
			}
		}(), o.invokeGuaGua = function(e, t, n, r) {
			return u("startupApp", ["Tencent://StartupApp/?subcmd=TianTian&account=" + e + "&fuin=" + t + "&roomid=" + n + "&extparam=" + (r || "") + "&srcid=1"])
		}, o.invokeGuaGuaByShortId = function(e, t, n, r) {
			r || (r = {});
			var i = "Tencent://StartupApp/?subcmd=TianTian&account=" + e + "&fuin=" + t + "&roomid=" + n + "&extparam=&srcid=" + (r.srcid || 1);
			return r.anchor_uin && ~~r.anchor_uin && (i += "&anchor_uin=" + r.anchor_uin), u("startupApp", [i])
		}, o.getWifiData = function() {
			return u("getWifiData") || {}
		}, o.enterPublicGroup = function(e, t, n) {
			var r = (t << 16) + n;
			try {
				window.external.addPublicGroup('{"groupuin":' + e + ',"source_id":' + r + "}")
			} catch (i) {}
		};
		var f = "0";
		return window.onIMStatusChange = function(e) {
			f = e
		}, o.getStatus = function() {
			return f
		}, o.canEnterPublicGroup = typeof window.external.addPublicGroup == "function", o.setUinSkey = function(n) {
			n = n || "relogin", e.report.monitor(319257);
			var r = a("IM.GetSKey"),
				i = a("Contact.GetSelfUin");
			if (!(i && i.uin && r && r.sKey)) {
				(!i || !r) && e.report.monitor(320719), e.report.monitor(319258), i = i || {}, r = r || {};
				var s = a("IM.GetVersion") || {},
					o = a("IM.GetClientKey") || {},
					u = "uin:" + i.errorCode + " skey:" + r.errorCode + " status:" + n + " version:" + s.version + " ckey:" + o.errorCode;
				e.report.bernoulli(11123, u)
			} else {
				var f = c(i.uin),
					h = l(r.sKey);
				t.set("uin", f, {
					domain: "qq.com"
				}), t.set("skey", h, {
					domain: "qq.com"
				}), t.updateUinSkey()
			}
		}, o.getClientKey = function() {
			var e = a("IM.GetClientKey");
			return e && e.clientKey
		}, o.reLoadWithPtlogin = function() {
			var e = a("Contact.GetSelfUin").uin,
				t = o.getClientKey(),
				n = encodeURIComponent("http://find.qq.com/index.html?version=1&width=910&height=610&search_target=0&redirectpt=1&t=" + +(new Date));
			location.href = "http://ptlogin2.qq.com/jump?ptlang=2052&clientuin=" + e + "&clientkey=" + t + "&u1=" + n
		}, o.canInvokeGuaGua = 1, o.switsh2OldWnd = function() {
			return u("switch2OldWnd")
		}, o.openGroupVideoHall = function() {
			var e = window.screen,
				n = {
					width: e.width / 2,
					height: e.height / 2
				},
				r = 1068,
				i = 700,
				s = {
					LiveUrl: "c",
					left: n.width - r / 2,
					right: n.width + r / 2,
					top: n.height - i / 2,
					bottom: n.height + i / 2
				},
				o = function(e) {
					if (!e) return e;
					e += "";
					var t = [];
					for (var n = 0, r = e.length; n < r; n++) t.push(e.charCodeAt(n).toString(16).toUpperCase());
					return t.join("")
				},
				u = "Tencent://AudioVideo/?subcmd=LiveWnd&param=" + o(JSON.stringify(s)) + "&fuin=" + t.uin();
			window.open(u)
		}, o.openPublicProfile = function(e) {
			return external.pubAccViewInfo(e)
		}, o.openPublicAIO = function(e) {
			return external.pubAccStartChat(e)
		}, o.focusPublic = function(e) {
			return external.pubAccSubScribe(e)
		}, window.client = o, o
	}), !
	function(e) {
		typeof define == "function" ? define("tools/utils", ["../$", "./cookie", "./native"], e) : e($)
	}(function(e, t, n) {
		"use strict";
		var r = {
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"/": "&#x2F;"
		},
			i = new RegExp("[" + Object.keys(r).join("") + "]", "g");
		return e.ajaxSetup({
			xhrFields: {
				withCredentials: !0
			},
			timeout: 3e4
		}), e.utils = {
			getCSRFParam: function() {
				return this.CSRFParam = e.param({
					ldw: this.getCSRFToken()
				})
			},
			getCSRFToken: function() {
				var e = t.get("skey"),
					n = 5381;
				for (var r = 0, i = e.length; r < i; ++r) n += (n << 5) + e.charAt(r).charCodeAt();
				return this.CSRFToken = n & 2147483647
			},
			getAvatar: function(e, n) {
				n = n || 1;
				var r = "abcd",
					i = t.uin();
				return i == e ? "http://face" + (e % 10 + 1) + ".qun.qq.com/cgi/svr/face/getface?cache=0&type=" + n + "&f=100&uin=" + e + "&t=" + Math.floor(new Date / 1e3) : "http://face" + (e % 10 + 1) + ".qun.qq.com/cgi/svr/face/getface?cache=0&type=" + n + "&f=100&uin=" + e
			},
			getStrLength: function(e) {
				return e.match(/[^ -~]/g) == null ? e.length : e.length + e.match(/[^ -~]/g).length
			},
			subString: function(e, t) {
				var n = /[^\x00-\xff]/g,
					r = Math.floor(t / 2),
					i = e.replace(n, "mm").length;
				if (i <= t) return e;
				for (var s = r; s < e.length; s++) if (e.substr(0, s).replace(n, "mm").length >= t) return e.substr(0, s);
				return e
			},
			encodeBase16: function(e) {
				if (!e) return e;
				e += "";
				var t = [];
				for (var n = 0, r = e.length; n < r; n++) t.push(e.charCodeAt(n).toString(16).toUpperCase());
				return t.join("")
			},
			decodebase16: function(e) {
				if (!e) return e;
				e += "";
				var t = [];
				for (var n = 0, r = e.length; n < r; n += 2) t.push(String.fromCharCode("0x" + e.slice(n, n + 2)));
				return t.join("")
			},
			encodeBase64: function(e) {
				var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					n = function(e) {
						e = e.replace(/\r\n/g, "\n");
						var t = "";
						for (var n = 0; n < e.length; n++) {
							var r = e.charCodeAt(n);
							r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(r & 63 | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(r & 63 | 128))
						}
						return t
					},
					r = function(e) {
						var r = "",
							i, s, o, u, a, f, l, c = 0;
						e = n(e);
						while (c < e.length) i = e.charCodeAt(c++), s = e.charCodeAt(c++), o = e.charCodeAt(c++), u = i >> 2, a = (i & 3) << 4 | s >> 4, f = (s & 15) << 2 | o >> 6, l = o & 63, isNaN(s) ? f = l = 64 : isNaN(o) && (l = 64), r = r + t.charAt(u) + t.charAt(a) + t.charAt(f) + t.charAt(l);
						return r
					};
				return r(e)
			},
			bitMapObj: function(e) {
				var t = {
					full: !1,
					noJoin: !1,
					isMember: !1,
					showJoinBtn: !0,
					option: 1
				};
				return e & 1 && (t.full = !0, t.showJoinBtn = !1), e & 2 && (t.noJoin = !0, t.showJoinBtn = !1, t.option = 3), e & 4 && (t.isMember = !0, t.showJoinBtn = !1), e & 8 && (t.option = 2), t
			},
			generatePtUrl: function(e) {
				var r = "http://ptlogin2.qq.com/jump?ptlang=2052&clientuin=",
					i = t.uin(),
					s = n.getClientKey();
				return i ? (r += i, r += "&clientkey=", r += s, r += "&u1=", r += encodeURIComponent(e)) : r = e, r
			},
			generateQzoneAddress: function(e) {
				return this.generatePtUrl("http://user.qzone.qq.com/" + e)
			},
			escape: function(e) {
				return e == null ? "" : ("" + e).replace(/&#160;/g, " ").replace(/\u00a0/g, " ").replace(/&lt;label&gt;/g, "").replace(/&lt;\/label&gt;/g, "").replace(i, function(e) {
					return r[e]
				})
			},
			escapeRegExp: function(e) {
				return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
			},
			format: function(e) {
				var t = Array.prototype.slice.call(arguments, 1);
				return e.replace(/\{(\d+)\}/g, function(e, n) {
					return t[n - 1] ? t[n - 1] : ""
				})
			},
			numberFuzzy: function(e) {
				if (e === null || e === undefined || parseInt(e) !== parseInt(e)) e = 0;
				var t = e;
				return e > 999 ? t = "999+" : e > 99 ? t = "99+" : e > 9 && (t = "9+"), t
			},
			gdtShowReport: function(t) {
				if (!t[0]) return;
				var n = [],
					r = 0,
					i = 4;
				for (var s = 0, o = t.length; s < o; s++) {
					if (s > i) break;
					n.push("viewid" + s + "=" + t[s].apurl.replace("http://v.gdt.qq.com/gdt_stats.fcg?viewid=", "")), r++
				}
				var u = "http://v.gdt.qq.com/gdt_stats.fcg?count=" + r;
				n.unshift(u);
				var a = n.join("&");
				a && ((new Image).src = a);
				var f = t.slice(i);
				e.utils.gdtShowReport(f)
			},
			getValue: function(e, t, n) {
				var r;
				if (e && t) {
					var i = t.split("."),
						s = i.length,
						o = 0;
					r = e[i[o]];
					while (r && ++o && o < s) r = r[i[o]]
				}
				return n && r == undefined && (r = n), r
			},
			getRowClass: function(e) {
				return ""
			},
			chkInputType: function() {
				var e = /^[0-9]{11}$/,
					t = /\w@\w*\.\w/,
					n = /^\d+$/;
				return function(r) {
					return r ? e.test(r) ? "tel" : n.test(r) ? "num" : t.test(r) ? "email" : "keyword" : "keyword"
				}
			}(),
			generateRedWords: function(t, n, r) {
				try {
					var i = r || [],
						s = [],
						o = Array.isArray(n) ? n : [n],
						u = {};
					for (var a = 0, f = i.length; a < f; a++) s.push(t[i[a]]);
					o.forEach(function(t) {
						t = e.utils.escape(t), t = e.utils.escapeRegExp(t);
						var n = new RegExp(t, "ig"),
							r;
						s.forEach(function(e, t) {
							while ((r = n.exec(e)) !== null) {
								var s = r.index,
									o = r.index + r[0].length;
								if (!u[i[t]]) u[i[t]] = [{
									startPos: s,
									endPos: o
								}];
								else {
									for (var a = 0, f = u[i[t]].length; a < f; a++) if (!(o <= u[i[t]][a].startPos) && !(s >= u[i[t]][a].endPos)) break;
									a === f && u[i[t]].push({
										startPos: s,
										endPos: o
									})
								}
							}
						})
					});
					for (var a in u) {
						var l = u[a],
							c, h = l.length;
						for (var p = 0; p < h - 1; p++) for (var d = 0; d < h - p - 1; d++) l[d].startPos >= l[d + 1].endPos && (c = l[d], l[d] = l[d + 1], l[d + 1] = c)
					}
					for (var a = 0, f = s.length; a < f; a++) {
						var v = t[i[a]].split("");
						if (u[i[a]]) {
							for (var p = 0, d = u[i[a]].length; p < d; p++) v.splice(u[i[a]][p].startPos + p * 2, 0, '<span class="red">'), v.splice(u[i[a]][p].endPos + 1 + p * 2, 0, "</span>");
							t[i[a]] = v.join("")
						}
					}
				} catch (m) {
					throw new Error("utils/generateRedWords" + m.message)
				}
			},
			foreach: function() {
				var e = function(t, n, r) {
						try {
							t.forEach(n, r)
						} catch (i) {
							if (i === e.
							break) return;
							throw i
						}
					};
				return e.
				break = new Error("Iteration Stop"), e
			}(),
			isEmptyObject: function(e) {
				for (var t in e) return !1;
				return !0
			},
			handleImgErr: function() {
				function t(t) {
					var n, r, i, s;
					i = t.data("type"), n = t.data("classification");
					switch (n) {
					case "qqun":
						r = 294105, s = "http://s.url.cn/pc/qqfind/face/group/1.png";
						break;
					case "guagua":
						r = 294105, s = "http://s.url.cn/qqfind/img/quguagua60-default-avatar.png";
						break;
					case "seller":
						r = 294107, s = "http://s.url.cn/qqfind/img/seller270-default-avatar.jpg";
						break;
					case "pe":
						r = 294104, s = "http://s.url.cn/pc/qqfind/face/1_100.gif";
						break;
					case "manu":
						switch (i) {
						case "sellerEnt":
						case "sellerv1":
						case "sellerv2":
							s = "http://s.url.cn/qqfind/img/seller100-default-avatar.png";
							break;
						default:
							s = "http://s.url.cn/qqfind/img/seller270-default-avatar.jpg"
						}
						break;
					default:
						r = 294106, s = "http://s.url.cn/qqfind/img/seller100-default-avatar.png"
					}
					return e.report.monitor(r), s
				}
				function n(n) {
					var r = e(n),
						i = null,
						s;
					return typeof n.src == "undefined" ? (i = new Image, i.onerror = function() {
						return i.onerror = "", n.onload = "", r.attr("xlink:href", t(r)), !0
					}, i.src = r.attr("xlink:href"), !0) : (n.onerror = "", n.src = t(r), !0)
				}
				return window.handleImgErr = n, window.handleImgErr
			}(),
			request: function(t) {
				t = t || {};
				var r = t.success;
				return t.success = function(i) {
					if (i.retcode == 1e5 || i.retcode == 100021) return n.setUinSkey(), t.success = r, e.ajax(t);
					r(i)
				}, e.ajax(t)
			}
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/info", ["$", "./utils", "./cookie"], e) : e($)
	}(function(e, t, n) {
		"use strict";

		function i(e) {
			e.type = e.type || "GET", e.url = s.CGI_HOST + e.url, e.data = t.getCSRFParam(), e.dataType = e.dataType || "json", t.request(e)
		}
		var r = "info",
			s = {
				CGI_HOST: "http://cgi.find.qq.com/qqfind/"
			},
			o = {
				isInited: !1
			};
		return o._fields = {
			gender: "",
			country: "",
			province: "",
			city: "",
			h_country: "",
			h_province: "",
			h_city: "",
			country_id: "-1",
			province_id: "-1",
			city_id: "-1",
			zone_id: "-1",
			p2c: "-1_-1",
			reportp2c: "0^0",
			longitude: 116,
			latitude: 39.916527,
			longitude_nocache: 116,
			latitude_nocache: 39.916527,
			lbs_addr_country: "",
			lbs_addr_province: "",
			lbs_addr_city: "",
			lbs_addr_city_nocache: "",
			lbs_addr_province_nocache: "",
			lbs_addr_detail: "",
			lbs_addr_detail_short: "暂无位置信息",
			lbs_addr_detail_short_backup: "暂无位置信息"
		}, o.myinfo = function(t) {
			var r = +(new Date),
				s = {
					url: "myinfo",
					error: function(e, t, n) {
						var r;
						t === "timeout" ? r = 666 : t === "error" ? r = e.status : r = 5000002, this.success({
							retcode: r
						})
					},
					success: function(i) {
						i || (i = {
							retcode: 777
						});
						var s = i.retcode;
						s === undefined && (s = 888);
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/myinfo", s, +(new Date) - r)
						} catch (u) {}
						if (s !== 0) {
							t && t(o._fields);
							return
						}
						o.isInited = !0;
						var a = i.result || {},
							f = a.lbs_addr_detail,
							l = "",
							c = "",
							h = "",
							p = "",
							d = "";
						a.longitude_nocache = a.longitude, a.latitude_nocache = a.latitude, n.updateUinSkey();
						var v = localStorage[n.uin() + "userInfo"],
							m = !1,
							g, y;
						if (v) {
							try {
								v = JSON.parse(v)
							} catch (u) {
								v = {}
							}
							y = v.lbs_addr_city || v.lbs_addr_province
						} else y = "";
						g = a.lbs_addr_city || a.lbs_addr_province;
						if (!g) try {
							g = f.city || f.province || ""
						} catch (u) {
							m = !0
						}
						p = g, f && (d = f.province);
						try {
							g.replace(/市/g, "") === "香港" ? g = "香港特别行政区" : g === "台湾" ? g = "台湾省" : g === "澳门" && (g = "澳门特别行政区"), g.replace(/市/g, "") === y.replace(/市/g, "") && (m = !0)
						} catch (u) {}
						m = !0, f && typeof f == "object" ? c = f.city || f.province || "" : c = a.lbs_addr_city || a.lbs_addr_province || "";
						if (v) try {
							h = v.lbs_addr_detail, l = v.lbs_addr_detail_short || h || "", a.latitude = v.latitude, a.longitude = v.longitude, a.lbs_addr_country = v.lbs_addr_country, a.lbs_addr_province = v.lbs_addr_province, a.lbs_addr_city = v.lbs_addr_city
						} catch (u) {} else f && typeof f == "object" ? h += f.city || f.province || "" : h += a.lbs_addr_city || a.lbs_addr_province || "", l = h;
						h = h.replace(/^中国/gi, ""), l = l.replace(/^中国/gi, ""), c = c.replace(/^中国/gi, ""), h = h.replace(/Unknown/gi, ""), l = l.replace(/Unknown/gi, ""), h.trim() === "" && (h = "北京天安门"), l.trim() === "" && (l = "暂无位置信息"), c.trim() === "" && (c = "暂无位置信息"), a.lbs_addr_detail = h, a.lbs_addr_detail_short = l, a.lbs_addr_detail_short_backup = c, a.lbs_addr_city_nocache = p, a.lbs_addr_province_nocache = d, o._fields = e.extend(o._fields, a), o._fields.reportp2c = o._fields.p2c.replace(/_/g, "^");
						try {
							o._fields.reportp2c.split("^").length !== 2 && (o._fields.reportp2c = "0^0"), o._fields.p2c.split("_").length !== 2 && (o._fields.p2c = "11_1")
						} catch (u) {
							o._fields.reportp2c = "0^0"
						}
						a.wpaver === 2 && (e(".jump-bussiness-web-trigger").attr("title", "精准定位，助您群聚客户").attr("href", "http://shang.qq.com/qqads/index.php").text("我要付费推广"), window.location.href.indexOf("im_version") > 0 ? e("#jump-bussiness-web-trigger54").show() : e("#jump-bussiness-web-trigger").show()), o.fleshId(), t && t(o._fields)
					}
				};
			i(s)
		}, o.init = function() {
			if (o.isInited) return;
			o.myinfo()
		}, o.reInit = function(e) {
			if (!e) return o._fields;
			o.myinfo(e)
		}, o.getCityId = function() {
			return o.fleshId(), o._fields.lbs_addr_city_id || o._fields.lbs_addr_detail_id || "10059"
		}, o.getInfo = function(e) {
			if (!e) return o._fields;
			o.isInited ? e(o._fields) : o.myinfo(e)
		}, o.fleshId = function() {
			var e = {
				10162: "10163",
				10175: "10176",
				10188: "10189",
				10204: "10205",
				10215: "10216",
				10231: "10232",
				10244: "10245",
				10263: "10264",
				10274: "10275",
				10287: "10288",
				10306: "10307",
				10326: "10327",
				10340: "10341",
				10355: "10356",
				10374: "10375",
				10390: "10391",
				10413: "10414",
				10430: "10431",
				10451: "10452",
				10474: "10475",
				10499: "10500",
				10510: "10511",
				10528: "10529",
				10540: "10541",
				10549: "10550",
				10567: "10568",
				10577: "10578",
				10583: "10584"
			},
				t = function(t) {
					return e[t] ? e[t] : t
				},
				n = function(e, t) {
					return !e || !t ? !1 : (e = e.replace(/(市)|(自治区)|(县)|(地区)|(特别行政区)/g, ""), (new RegExp(e)).test(t))
				},
				r = 0;
			for (var i in window.localCityMap) {
				n(o._fields.lbs_addr_city, window.localCityMap[i][0]) && (o._fields.lbs_addr_city_id = t(i), r++);
				if (n(o._fields.lbs_addr_detail, window.localCityMap[i][0]) || n(o._fields.lbs_addr_detail_short, window.localCityMap[i][0])) o._fields.lbs_addr_detail_id = t(i), r++;
				if (r > 1) break
			}
		}, e[r] = o
	}), !
	function(e) {
		typeof define == "function" ? define("tools/plugin", ["../$", "./utils"], e) : e($)
	}(function(e, t) {
		"use strict";
		e.escape = t.escape, jQuery.whenAll = function(e) {
			var t = [].slice,
				n = 0,
				r = t.call(arguments),
				i = r.length || 1,
				s = i,
				o = jQuery.Deferred(),
				u = function(e, n, r, u) {
					return function(a) {
						n[e] = this, r[e] = arguments.length > 1 ? t.call(arguments) : a, u ? (r[e] = {
							state: u,
							value: r[e]
						}, --s || (i === 1 ? o.resolveWith(n[0], [r[0]]) : o.resolveWith(n, r))) : o.notifyWith(n, r)
					}
				},
				a = new Array(i),
				f = new Array(i),
				l = new Array(i);
			for (; n < i; n++) r[n] && jQuery.isFunction(r[n].promise) ? r[n].promise().progress(u(n, f, a)).done(u(n, l, r, "resolved")).fail(u(n, l, r, "rejected")) : u(n, l, r, "resolved")(r[n]);
			return o.promise()
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/loading", ["../$", "./utils", "./native"], e) : e($)
	}(function(e, t, n) {
		"use strict";
		var r = function(e) {
				return escape(e).replace(/%/g, "_u")
			},
			i = function(e, t) {
				this.init("Loading", e, t)
			};
		i.prototype = {
			constructor: i,
			init: function(t, n, r) {
				this.el = e(n), this.options = r, this.type = t, this.loadingText = "加载中，请稍候…", this.searchText = "搜索中，请稍候…", this.errorText = '<i class="icon-alert"></i> 没有找到符合搜索条件的用户或对方设置了<a href="http://id.qq.com/index.html#account" class="blue" target="_blank">QQ号码/辅助帐号查找限制</a>', this.searchTimeoutText = '<i class="icon-alert"></i> 网络连接失败,<a class="blue" href="" data-nav="{1}" data-search="{2}">请重试</a>', this.timeoutText = '<i class="icon-alert"></i> 网络连接失败,<a class="blue" href="#" {1}="{2}">请重试</a>', this.zeroResultText = '<span><a class="tipZeroResultPic"></a></span>', this.zeroGroupText = '<i class="icon-alert"></i>抱歉，没有找到符合查找条件的QQ群', this.suicideText = '<i class="icon-alert"></i> 抱歉，没有找到符合查找条件的QQ群 <a href="//kf.qq.com/faq/170111rmQvMv170111zYjU3A.html" class="blue" target="_blank"> 相关帮助请点击这里</a>', this.isShow = !1, this.el.append('<span class="loading"></span>'), this.loadingEl = this.el.find(".loading"), !this.el.hasClass("item") && !this.el.hasClass("tab-pane") && !this.el.hasClass("exactRecommend") && this.el.css("position", "relative")
			},
			show: function(t) {
				if (!this.isShow || t && t.reShow) {
					this.loadingEl.removeClass("error"), this.loadingEl.removeClass("timeout"), this.loadingEl.removeClass("zeroResultTip"), this.loadingEl.removeClass("zeroGroupTip"), this.loadingEl.removeClass("hy-search-error"), e(".hy-result-header-location-bar")[0] && e(".hy-loading-title").html("");
					var n = this.loadingText;
					t && t.status === "search" && (n = this.searchText), this.loadingEl.text(n), this.loadingEl.show(), this.isShow = !0
				}
			},
			hide: function() {
				this.isShow && (this.loadingEl.hide(), this.isShow = !1)
			},
			error: function(e) {
				this.loadingEl.addClass("error");
				var t = "";
				e && e.errorCode ? e && e.errorText ? t = e.errorText + "<a href='http://support.qq.com/write.shtml?fid=910" + "&SSTAG=errorcode" + e.errorCode + ("__version" + n.getVersion()) + "' target='_blank' >反馈问题</a>" : t = this.errorText + "<a href='http://support.qq.com/write.shtml?fid=910" + "&SSTAG=errorcode" + e.errorCode + ("__version" + n.getVersion()) + "' target='_blank' >反馈问题</a>" : e && e.errorText ? t = e.errorText : t = this.errorText, this.loadingEl.html(t)
			},
			timeout: function(e) {
				this.loadingEl.addClass("timeout");
				var i;
				e && e.target && e.search ? i = t.format(this.searchTimeoutText, e.target, e.search) : e && e.bindsName && e.bindsData ? i = t.format(this.timeoutText, e.bindsName, e.bindsData) : i = this.timeoutText, i += '，<a class="blue" href="http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode' + (e && e.errorCode || 0) + ("__version" + n.getVersion()) + (e && e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈问题</a></p>', this.loadingEl.html(i)
			},
			zeroPosPersonTip: function(e) {
				var t = "zeroResultTipPe",
					n = this.zeroResultText;
				e || (e = "pe"), this.loadingEl.addClass(t), this.loadingEl.html(n)
			},
			hySearchError: function(e) {
				var t = "hy-search-error",
					i = "",
					s = e.errorKind || 0;
				s == "jobs" ? i += '<div style="width: 390px;position: absolute;left: 50%;margin-left: -25px;margin-top: -25px"><div style="float: left;margin-right: 28px;"><i class="icon-nojob"></i></div><div style="float: left;text-align: left;"><div style="font-size: 16px;color: #454C4C;margin-top: 20px;margin-bottom: 20px;">没有相关职位？看看外面的精彩吧</div><div style="margin-top: 8px;margin-bottom: 6px;color: #84848C;">点击查询热门城市职位</div><p><a href="#" data-change-region="" data-region-flag="2" data-region="1" data-city-id="10059">北京</a> <a href="#" data-change-region="" data-region-flag="2" data-region="2" data-city-id="10099">上海</a> <a href="#" data-change-region="" data-region-flag="2" data-region="4" data-city-id="10402">深圳</a> <a href="#" data-change-region="" data-region-flag="2" data-region="3" data-city-id="10391">广州</a> <a href="#" data-change-region="" data-region-flag="2" data-region="3" data-city-id="10356">武汉</a> <a href="#" data-soso-map-open="true">其他</a></p></div></div>' : (s & 2) > 0 ? (i += '<div class="hy-search-error-div" style="margin-left:15px" >', i += "<p class='hy-search-error-div-head'><i class='icon-big-alert'></i>", i += '<span class=\'hy-search-error-div-head-word\'>对方设置了<a href="http://id.qq.com/index.html#account" class="blue" target="_blank">QQ号码/辅助帐号禁止被查找</a>，建议：</span></p>', i += "<ol class='hy-search-error-div-body'><li>检查输入是否正确</li><li>尝试查找其他绑定帐号</li></ol>") : (s & 8) > 0 ? (i += '<div class="hy-search-error-div" style="margin-left:80px" >', i += "<p class='hy-search-error-div-head'><i class='icon-big-alert'></i>", i += '<span class="hy-search-error-div-head-word">没有找到你想要的结果。建议：</span></p>', i += '<ol class="hy-search-error-div-body"><li>检查输入是否正确</li><li>尝试其他同义、近义等词</li><li><a class="blue" href="http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode' + (e && e.errorCode || 0) + ("__errorkind" + s) + "__webversion201706071924" + ("__version" + n.getVersion()) + (e && e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈给我们</a>' + "</li>" + "</ol>") : (s & 16) > 0 ? (i += '<div style="margin-left:20px" class="hy-search-error-div" >', i += "<p class='hy-search-error-div-head'><i class='icon-big-alert'></i>", i += "<span class='hy-search-error-div-head-word'>由于网络异常，小Q没有找你想要的结果。建议：</span></p>", i += "<ol class='hy-search-error-div-body'><li>检查网络是否正常</li><li><a href='###' data-switch-old-qqfind='true'>切换到旧版本再试</a></li><li><a class=\"blue\" href=\"http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode" + (e && e.errorCode || 0) + ("__version" + n.getVersion()) + "__webversion201706071924" + ("__errorkind" + s) + (e && e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈给我们</a>' + "</li>" + "</ol>") : s == 0 ? i += '<div class="noSCTipsContainer" style="text-align: left;margin-top: -50px;"><div class="noSCTips" style="padding: 0"><p class="noSCTips-div-head"><i class="icon-big-alert"></i><span class="noSCTips-head-word">没有找到符合条件的本地商家</span></p><div class="noSCTips-div-body">1. 请检查是否勾选了“只看在线”<br>2. 更换其他筛选条件再试试吧</div><p class="noSCTips-div-footer">能提供该服务？<a class="blue" href="http://shang.qq.com/business/regist/intro.php" target="_blank">马上注册成QQ商家发布服务信息吧！</a></p></div>' : (i += '<div class="hy-search-error-div" style="margin-left:30px" >', i += "<p class='hy-search-error-div-head'><i class='icon-big-alert'></i>", i += "<span class='hy-search-error-div-head-word'>小Q可能由于以下原因没有找到你想要的结果</span></p>", i += '<ol class=\'hy-search-error-div-body\'><li>对方设置了<a href="http://id.qq.com/index.html#account" class="blue" target="_blank">QQ号码/辅助帐号查找限制。</a></li><li>由于违规行为被人举报而限制被查找</li><li>由于涉及色情、广告等违规信息系统限制被查找</li><li>由于网络异常导致连接失败</li></ol>', i += '<p class=\'hy-search-error-div-footer\'>如果遇到问题，请联系客服0755-83765566或<a class="blue" href="http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode' + (e && e.errorCode || 0) + ("__version" + n.getVersion()) + "__webversion201706071924" + ("__errorkind" + s) + (e && e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈问题</a></p>'), i += "</div>", this.loadingEl.addClass(t), this.loadingEl.html(i)
			},
			hySearchZeroSameCity: function(e) {
				var t = '<div class="hy-search-error-div" style="margin-left:40px"><p class="hy-search-error-div-head"><i class="icon-big-alert"></i><span class="hy-search-error-div-head-word">很遗憾您所在的城市尚未有商家提供符合条件的活动</span></p><p class="hy-search-error-div-footer">建议您查看其它服务内容，或<a href="http://shang.qq.com/business/regist/intro.php" target="_blank">注册QQ商家</a>，<a href="http://shang.qq.com/business/activity/form.php" target="_blank">免费发布活动信息</a></p></div>';
				this.loadingEl.addClass("error"), this.loadingEl.html(t)
			},
			peopleSearchError: function(e) {
				var t = "";
				this.loadingEl.addClass("error"), t += e && e.errorText ? e.errorText : this.errorText, t += '，<a class="blue" href="http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode' + (e && e.errorCode || 0) + (e && e.errorkind ? "__errorkind" + e.errorkind : "") + ("__version" + n.getVersion()) + "__webversion201706071924" + (e && e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈问题</a></p>', this.loadingEl.html(t)
			},
			zeroGroupTip: function(e) {
				e = e || {};
				var t = "",
					i = e.showFeedback === "undefined" ? !0 : e.showFeedback;
				this.loadingEl.addClass("zeroGroupTip"), t += e.zeroGroupText ? e.zeroGroupText : this.zeroGroupText, i && (t += '，<a class="blue" href="http://support.qq.com/write.shtml?fid=910&SSTAG=errorcode' + (e.errorCode || 0) + ("__version" + n.getVersion()) + (e.keyWord ? "__keyword" + r(e.keyWord) : "") + '" target="_blank">反馈问题</a>'), e.isQunResult && (t += '<p class="qu-city-filter-all">搜索全国范围内含 “' + e.keyWord + "” 的群</p>"), this.loadingEl.html(t)
			},
			suicideGroupTip: function(e) {
				var t = this.suicideText;
				this.loadingEl.addClass("zeroGroupTip"), this.loadingEl.html(t)
			}
		};
		var s = e.fn.loading;
		return e.fn.loading = function(t, n) {
			return this.each(function() {
				var r = e(this),
					s = r.data("loading"),
					o = typeof t == "object" && t;
				s || r.data("loading", s = new i(this, o)), typeof t == "string" && s[t](n)
			})
		}, e.fn.loading.Constructor = i, e.fn.loading.defaults = {}, e.fn.loading.noConflict = function() {
			return e.fn.loading = s, this
		}, i
	}), !
	function(e) {
		typeof define == "function" ? define("widget/people.chooseLocationGenerator", ["../$", "tools/reportBasic"], e) : e($)
	}(function(e, t) {
		"use strict";
		var n = {
			initFlag: !1,
			locationMap: {},
			locationInfo: {}
		},
			r = t.monitor,
			i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = {
				checkParamType: function(e) {
					var t = typeof e;
					return t === "object" && Array.isArray(e) ? "array" : t === "string" ? "string" : t === "object" ? "object" : ""
				},
				extend: e.extend,
				ajax: e.ajax,
				emptyFun: function() {}
			};
		return n.init = function(t) {
			function r() {
				window.locationMap ? (n.locationMap = window.locationMap, T.initFlag = !0, n.constructCountryUlList()) : window.setTimeout(r, 25)
			}
			i = e("#location-generator"), s = e("#country-value"), o = e("#province-value"), u = e("#city-value"), a = e("#district-value"), f = e("#country-value-bg"), l = e("#province-value-bg"), c = e("#city-value-bg"), h = e("#district-value-bg"), p = e("#country-ul"), d = e("#province-ul"), v = e("#city-ul"), m = e("#district-ul"), E = e("#pe-hometown-info-p"), S = e("#pe-location-info-p"), g = '<li data-value="-1">不限</li>', y = {
				country: s,
				province: o,
				city: u,
				district: a
			}, b = ["country", "province", "city", "district"], w = {
				country: 0,
				province: 1,
				city: 2,
				district: 3
			};
			try {
				var T = this;
				T.locationInfo = {};
				var N = x.checkParamType(t);
				if (N === "array") for (var C = 0, k = t.length; C < k; C++) T.locationInfo[t[C]] = ["-1", "-1", "-1", "-1"];
				else if (N === "string") T.locationInfo[t] = ["-1", "-1", "-1", "-1"];
				else {
					if (N !== "object") return "";
					x.extend(T.locationInfo, t)
				}
				r()
			} catch (L) {
				throw new Error("locationgGenerator/init/" + L.message)
			}
		}, n.fillLocationInfo = function(e) {
			var t = this;
			t.locationInfo[e.target] = e.value
		}, n.constructLocationWording = function(t) {
			var n = "",
				i;
			if (i = e("#" + t)) n = i.attr("placeholder") + ":";
			if (!this.initFlag) return r(304211), n + "不限";
			try {
				var s = this,
					o = s.locationInfo[t] || [],
					u = {},
					a = "";
				x.extend(!0, u, s.locationMap);
				if (o[0] == "-1") return n + "不限";
				for (var f = 0, l = o.length; f < l; f++) {
					if (o[f] == "-1") {
						for (; l - 1 > f; f++) o[f + 1] = "-1";
						break
					}
					u = u[o[f]];
					if (typeof u == "undefined") return f == 0 ? n + "不限" : a ? n + a : n + "不限";
					f == 0 ? a += u.n : u.n !== "" && u.n !== undefined && (a += ", " + u.n)
				}
				return n + a
			} catch (c) {
				throw new Error("locationgGenerator/constructLocationWording/n=" + o.join("&") + "|i=" + f + "|" + c.message)
			}
		}, n.disableSectionLocationChose = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var t = x.checkParamType(e);
				if (t === "array") for (var n = 0, r = e.length; n < r; n++) y[e[n]] && y[e[n]].attr("disabled", "-1").parent().parent().addClass("disabled");
				else t === "string" && y[e] && y[e].attr("disabled", "-1").parent().parent().addClass("disabled")
			} catch (i) {
				throw new Error("locationgGenerator/disableSectionLocationChose/" + i.message)
			}
		}, n.enableSectionLocationChose = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				if (!e) for (var t = 0, n = b.length; t < n; t++) y[b[t]].removeAttr("disabled").parent().parent().removeClass("disabled");
				else {
					var r = x.checkParamType(e);
					if (r === "array") for (var t = 0, n = e.length; t < n; t++) y[e[t]] && y[e[t]].removeAttr("disabled").parent().parent().removeClass("disabled");
					else r === "string" && y[e] && y[e].removeAttr("disabled").parent().parent().removeClass("disabled")
				}
			} catch (i) {
				throw new Error("locationgGenerator/enableSectionLocationChose/" + i.message)
			}
		}, n.clearSectionLocationValue = function(e, t) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			if (!e) return;
			var n = this;
			if (!t) n.locationInfo[e] = ["-1", "-1", "-1", "-1"];
			else {
				var r = x.checkParamType(t);
				if (r === "array") for (var i = 0, s = t.length; i < s; i++) n.locationInfo[e][w[t[i]]] = "-1";
				else r === "string" && n.locationInfo[e][w[t]]
			}
		}, n.clearSectionLocationShowingValue = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			if (!e) for (var t = 0, n = b.length; t < n; t++) y[b[t]].val("");
			else {
				var r = x.checkParamType(e);
				if (r === "array") for (var t = 0, n = e.length; t < n; t++) y[e[t]] && y[e[t]].val("");
				else r === "string" && y[e] && y[e].val("")
			}
		}, n.showLocationGenerator = function(t) {
			if (!this.initFlag) {
				r(304212);
				return
			}
			var n = this,
				g = e(t && t.inputTarget),
				y = g.data("location-picker"),
				b = g.offset();
			i.css("top", 0), i.css("left", 0), b.top += 29, b.left += 9, i.offset(b), i.data("target-input", y);
			var w = n.locationInfo[y],
				T = n.locationMap;
			n.disableSectionLocationChose(["province", "city", "district"]);
			var N = T[w[0]] || {},
				C = N[w[1]] || {},
				k = C[w[2]] || {},
				L = k[w[3]] || {};
			try {
				w[0] != "-1" && (s.val(N.n || "不限"), n.enableSectionLocationChose("province"), t && (t.callbackObj = t.callbackObj || x.emptyFun), n.constructProvinceUlList({}, !0))
			} catch (A) {
				throw new Error("locationGenerator/showLocationGenerator/showProvincelocationInfoHaved=" + w.join("&") + "|" + A.message)
			}
			try {
				w[1] != "-1" && w[0] != "-1" && (o.val(C.n || "不限"), n.enableSectionLocationChose("city"), n.constructCityUlList({}, !0))
			} catch (A) {
				throw new Error("locationGenerator/showLocationGenerator/showCitylocationInfoHaved=" + w.join("&") + "|" + A.message)
			}
			try {
				w[2] != "-1" && w[0] != "-1" && (u.val(k.n || "不限"), n.enableSectionLocationChose("district"), n.constructDistrictUlList({}, !0))
			} catch (A) {
				throw new Error("locationGenerator/showLocationGenerator/showDistrictlocationInfoHaved=" + w.join("&") + "|" + A.message)
			}
			try {
				w[3] != "-1" && w[0] != "-1" && a.val(L.n || "不限")
			} catch (A) {
				throw new Error("locationGenerator/showLocationGenerator/showDistrictValuelocationInfoHaved=" + w.join("&") + "|" + A.message)
			}
			i.data("showing") != "true" ? (i.show(), i.data("showing", "true"), g.find(".icon-down-arrow").removeClass("icon-down-arrow").addClass("icon-up-arrow"), e.report.monitor(296598)) : (i.hide(), i.removeData("showing"), g.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), p.hide(), f.removeData("showing"), f.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), s.val(""), d.hide().empty(), l.removeData("showing"), l.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), o.val(""), v.hide().empty(), c.removeData("showing"), c.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), u.val(""), m.hide().empty(), h.removeData("showing"), h.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), a.val(""), E.removeData("showing"), S.removeData("showing"), E.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), S.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"))
		}, n.constructCountryUlList = function() {
			if (!this.initFlag) throw "you must init location before you can use it!";
			var e = this,
				t = null;
			p.empty(), p.append(g);
			try {
				for (t in e.locationMap) {
					var n = '<li data-value="' + t + '">' + e.locationMap[t].n + "</li>";
					p.append(n)
				}
			} catch (r) {
				throw new Error("locationGenerator/constructCountryUlList/country=" + t + "|" + r.message)
			}
		}, n.constructProvinceUlList = function(e, t) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var n = this,
					r = i.data("target-input") || "",
					s = {},
					o = n.locationInfo[r][0],
					u = 0;
				d.empty(), d.append(g);
				if (!t) {
					var a = ["province", "city", "district"];
					n.clearSectionLocationValue(r, a), n.clearSectionLocationShowingValue(a), n.disableSectionLocationChose(["city", "district"])
				}
				for (var f in s = n.locationMap[o]) {
					if (f === "n") continue;
					if (s[f]["n"] == "") continue;
					var l = '<li data-value="' + f + '">' + s[f].n + "</li>";
					u++, d.append(l)
				}
				if (u === 0) {
					var c = ["province", "city", "district"];
					n.clearSectionLocationValue(r, c), n.disableSectionLocationChose(c), e && e.endCallback && e.endCallback(n.constructLocationWording(r))
				}
			} catch (h) {
				throw new Error("locationgGenerator/constructProvinceUlList/n=" + (n.locationInfo[r] || []).join("&") + "|t=" + r + "|" + h.message)
			}
		}, n.constructCityUlList = function(e, t) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var n = this,
					r = i.data("target-input") || "",
					s = {},
					o = 0;
				v.empty(), v.append(g);
				if (!t) {
					var u = ["city", "district"];
					n.clearSectionLocationValue(r, u), n.clearSectionLocationShowingValue(u), n.disableSectionLocationChose("district")
				}
				for (var a in s = n.locationMap[n.locationInfo[r][0]][n.locationInfo[r][1]]) {
					if (a === "n") continue;
					if (s[a].n === "") continue;
					var f = '<li data-value="' + a + '">' + s[a].n + "</li>";
					o++, v.append(f)
				}
				if (o === 0) {
					var l = ["city", "district"];
					n.clearSectionLocationValue(r, l), n.disableSectionLocationChose(l), e && e.endCallback && e.endCallback(n.constructLocationWording(r))
				}
			} catch (c) {
				throw new Error("locationgGenerator/constructCityUlList/n=" + (n.locationInfo[r] || []).join("&") + "|t=" + r + "|" + c.message)
			}
		}, n.constructDistrictUlList = function(e, t) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var n = this,
					r = i.data("target-input") || "",
					s = {},
					o = 0;
				m.empty(), m.append(g);
				if (!t) {
					var u = "district";
					n.clearSectionLocationValue(r, u), n.clearSectionLocationShowingValue(u)
				}
				for (var a in s = n.locationMap[n.locationInfo[r][0]][n.locationInfo[r][1]][n.locationInfo[r][2]]) {
					if (a === "n") continue;
					if (s[a].n === "") continue;
					var f = '<li data-value="' + a + '">' + s[a].n + "</li>";
					o++, m.append(f)
				}
				o === 0 && (n.clearSectionLocationValue(r, "district"), n.disableSectionLocationChose("district"), e && e.endCallback && e.endCallback(n.constructLocationWording(r)))
			} catch (l) {
				throw new Error("locationgGenerator/constructDistrictUlList/n=" + (n.locationInfo[r] || []).join("&") + "|t=" + r + "|" + l.message)
			}
		}, n.handleChooseLocation = function(n) {
			function f(t) {
				var n = ["country", "province", "city", "district"];
				for (var r = 0; r < 4; r++) {
					if (n[r] === t) continue;
					e("." + n[r] + "-ul").hide(), e("#" + n[r] + "-value-bg").removeData("showing"), e("#" + n[r] + "-value-bg").find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow")
				}
			}
			var r = n.target,
				i = e(r),
				s = 0,
				o = 0,
				u = i.data("click-action");
			n.type === "focus" && r.blur();
			var a = i.parent();
			f(i.data("click-action").substring(6));
			if (a.parent().is(".disabled")) return;
			if (a.data("showing") == "true") {
				a.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), a.removeData("showing"), a.parent().find("ul").hide();
				return
			}
			a.data("showing", "true"), a.find(".icon-down-arrow").removeClass("icon-down-arrow").addClass("icon-up-arrow");
			switch (u) {
			case "chose-country":
				return e(".country-ul").slideDown(400), f("country"), !1;
			case "chose-province":
				return e(".province-ul").slideDown(400), f("province"), !1;
			case "chose-city":
				return e(".city-ul").slideDown(400), f("city"), !1;
			case "chose-district":
				return e(".district-ul").slideDown(400), f("district"), !1
			}
		}, n.initEventHandler = function() {
			var t = this;
			e(document).on("click", "#location-generator li", function(n) {
				var r = e(this),
					g = r.parent(),
					y = g.data("iden"),
					b = i.data("target-input"),
					w = r.data("value"),
					E = "",
					S;
				if (S = e("#" + b)) E = S.attr("placeholder") + ":";
				try {
					switch (y) {
					case "country":
						if (t.locationInfo[b][0] == w) return p.hide(), f.removeData("showing"), f.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), !1;
						t.locationInfo[b][0] = w, t.clearSectionLocationValue(b, ["province", "city", "district"]);
						if (r.data("value") == -1) {
							var x = ["province", "city", "district"];
							t.disableSectionLocationChose(x), e("#" + b).val(E + "不限"), t.clearSectionLocationShowingValue(x), t.clearSectionLocationValue(b, x)
						} else t.enableSectionLocationChose("province"), t.constructProvinceUlList(), e("#" + b).val(t.constructLocationWording(b)), n.stopPropagation();
						s.val(r.text()), p.hide(), f.removeData("showing"), f.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow");
						break;
					case "province":
						if (t.locationInfo[b][1] == w) return d.hide(), l.removeData("showing"), l.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), !1;
						t.locationInfo[b][1] = w;
						var x = ["city", "district"];
						t.clearSectionLocationValue(b, x), t.clearSectionLocationShowingValue(x), w == -1 ? t.disableSectionLocationChose(x) : (t.enableSectionLocationChose("city"), t.constructCityUlList(b), n.stopPropagation()), e("#" + b).val(t.constructLocationWording(b)), o.val(r.text()), d.hide(), l.removeData("showing"), l.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow");
						break;
					case "city":
						if (t.locationInfo[b][2] == w) {
							v.hide(), c.removeData("showing"), c.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow");
							return
						}
						t.locationInfo[b][2] = w, t.clearSectionLocationValue(b, "district"), t.clearSectionLocationShowingValue("district"), w == -1 ? t.disableSectionLocationChose("district") : (t.enableSectionLocationChose("district"), t.constructDistrictUlList(b), n.stopPropagation()), e("#" + b).val(t.constructLocationWording(b)), u.val(r.text()), v.hide(), c.removeData("showing"), c.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow");
						break;
					case "district":
						t.locationInfo[b][3] = w, a.val(r.text()), m.hide(), h.removeData("showing"), h.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), e("#" + b).val(t.constructLocationWording(b))
					}
				} catch (n) {
					throw new Error("locationgGenerator/initEventHandler/" + n.message)
				}
			}), e("#location-generator").on("click", function(t) {
				if (!e(t.target).is("li")) return e(t.target).is(".icon-down-arrow") || e(t.target).is(".icon-up-arrow") ? (n.handleChooseLocation(t), !1) : !1
			}), e("#location-generator input").on("focus", function(e) {
				n.handleChooseLocation(e)
			})
		}, n
	}), !
	function(e) {
		typeof define == "function" ? define("widget/people.chooseLocationGenerator-54", ["../$"], e) : e($)
	}(function(e) {
		"use strict";
		var t = {
			initFlag: !1,
			locationMap: {},
			locationInfo: {}
		},
			n = e.report,
			r = n.monitor,
			i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = {
				checkParamType: function(e) {
					var t = typeof e;
					return t === "object" && Array.isArray(e) ? "array" : t === "string" ? "string" : t === "object" ? "object" : ""
				},
				extend: e.extend,
				ajax: e.ajax,
				emptyFun: function() {}
			};
		return t.init = function(n) {
			function r() {
				window.locationMap ? (t.locationMap = window.locationMap, y.initFlag = !0, t.constructCountryUlList()) : window.setTimeout(r, 25)
			}
			i = e("#location-generator"), s = e("#country-value"), o = e("#province-value"), u = e("#city-value"), a = e("#district-value"), f = e("#country-value-bg"), l = e("#province-value-bg"), c = e("#city-value-bg"), h = e("#district-value-bg"), p = e(".country-ul"), d = e(".province-ul"), v = e(".city-ul"), m = e(".district-ul"), E = e("#pe-hometown-info-p"), S = e("#pe-location-info-p"), g = '<li data-value="-1">不限</li>', b = ["country", "province", "city", "district"], w = {
				country: 0,
				province: 1,
				city: 2,
				district: 3
			};
			try {
				var y = this;
				y.locationInfo = {};
				var T = x.checkParamType(n);
				if (T === "array") for (var N = 0, C = n.length; N < C; N++) y.locationInfo[n[N]] = ["-1", "-1", "-1", "-1"];
				else if (T === "string") y.locationInfo[n] = ["-1", "-1", "-1", "-1"];
				else {
					if (T !== "object") return "";
					x.extend(y.locationInfo, n)
				}
				r()
			} catch (k) {
				throw new Error("locationgGenerator/init/" + k.message)
			}
		}, t.fillLocationInfo = function(e) {
			var t = this;
			t.locationInfo[e.target] = e.value
		}, t.disableSectionLocationChose = function(t, n) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			var r;
			n === "pe-location-info" ? r = e(".adv-option-down .location-container") : r = e(".adv-option-up .location-container");
			try {
				var i = x.checkParamType(t);
				if (i === "array") for (var s = 0, o = t.length; s < o; s++) r.find(".pe-search-" + t[s]).find("input").attr("disabled", "").addClass("disabled");
				else i === "string" && r.find(".pe-search-" + t).find("input").attr("disabled", "").addClass("disabled")
			} catch (u) {
				throw new Error("locationgGenerator/disableSectionLocationChose/" + u.message)
			}
		}, t.enableSectionLocationChose = function(t, n) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			var r;
			n === "pe-location-info" ? r = e(".adv-option-down .location-container") : r = e(".adv-option-up .location-container");
			try {
				if (!t) for (var i = 0, s = b.length; i < s; i++) y[b[i]].removeAttr("disabled").removeClass("disabled");
				else {
					var o = x.checkParamType(t);
					if (o === "array") for (var i = 0, s = t.length; i < s; i++) r.find(".pe-search-" + t[i]).find("input").removeAttr("disabled").removeClass("disabled");
					else o === "string" && r.find(".pe-search-" + t).find("input").removeAttr("disabled").removeClass("disabled")
				}
			} catch (u) {
				throw new Error("locationgGenerator/enableSectionLocationChose/" + u.message)
			}
		}, t.clearSectionLocationValue = function(e, t) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			if (!e) return;
			var n = this;
			if (!t) n.locationInfo[e] = ["-1", "-1", "-1", "-1"];
			else {
				var r = x.checkParamType(t);
				if (r === "array") for (var i = 0, s = t.length; i < s; i++) n.locationInfo[e][w[t[i]]] = "-1";
				else r === "string" && n.locationInfo[e][w[t]]
			}
		}, t.clearSectionLocationShowingValue = function(t, n) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			var r;
			n === "pe-location-info" ? r = e(".adv-option-down .location-container") : r = e(".adv-option-up .location-container");
			var i = x.checkParamType(t);
			if (i === "array") for (var s = 0, o = t.length; s < o; s++) r.find(".pe-search-" + t[s]).find("input").val("不限");
			else i === "string" && r.find(".pe-search-" + t).find("input").val("不限")
		}, t.constructCountryUlList = function() {
			if (!this.initFlag) throw "you must init location before you can use it!";
			var e = this,
				t = null;
			p.empty(), p.append(g);
			try {
				for (t in e.locationMap) {
					var n = '<li data-value="' + t + '">' + e.locationMap[t].n + "</li>";
					p.append(n)
				}
			} catch (r) {
				throw new Error("locationGenerator/constructCountryUlList/country=" + t + "|" + r.message)
			}
		}, t.constructProvinceUlList = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var t = this,
					e = e,
					n = {},
					r = t.locationInfo[e][0],
					i = 0;
				d.empty(), d.append(g);
				for (var s in n = t.locationMap[r]) {
					if (s === "n") continue;
					if (n[s]["n"] == "") continue;
					var o = '<li data-value="' + s + '">' + n[s].n + "</li>";
					i++, d.append(o)
				}
				if (i === 0) {
					var u = ["province", "city", "district"];
					t.clearSectionLocationValue(e, u), t.clearSectionLocationShowingValue(u, e), t.disableSectionLocationChose(u, e)
				}
			} catch (a) {
				throw new Error("locationgGenerator/constructProvinceUlList/n=" + (t.locationInfo[e] || []).join("&") + "|t=" + e + "|" + a.message)
			}
		}, t.constructCityUlList = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var t = this,
					e = e,
					n = {},
					r = 0;
				v.empty(), v.append(g);
				for (var i in n = t.locationMap[t.locationInfo[e][0]][t.locationInfo[e][1]]) {
					if (i === "n") continue;
					if (n[i].n === "") continue;
					var s = '<li data-value="' + i + '">' + n[i].n + "</li>";
					r++, v.append(s)
				}
				if (r === 0) {
					var o = ["city", "district"];
					t.clearSectionLocationValue(e, o), t.clearSectionLocationShowingValue(o, e), t.disableSectionLocationChose(o, e)
				}
			} catch (u) {
				throw new Error("locationgGenerator/constructCityUlList/n=" + (t.locationInfo[e] || []).join("&") + "|t=" + e + "|" + u.message)
			}
		}, t.constructDistrictUlList = function(e) {
			if (!this.initFlag) throw "you must init location before you can use it!";
			try {
				var t = this,
					e = e,
					n = {},
					r = 0;
				m.empty(), m.append(g);
				for (var i in n = t.locationMap[t.locationInfo[e][0]][t.locationInfo[e][1]][t.locationInfo[e][2]]) {
					if (i === "n") continue;
					if (n[i].n === "") continue;
					var s = '<li data-value="' + i + '">' + n[i].n + "</li>";
					r++, m.append(s)
				}
				r === 0 && (t.clearSectionLocationValue(e, "district"), t.clearSectionLocationShowingValue("district", e), t.disableSectionLocationChose("district", e))
			} catch (o) {
				throw new Error("locationgGenerator/constructDistrictUlList/n=" + (t.locationInfo[e] || []).join("&") + "|t=" + e + "|" + o.message)
			}
		}, t.handleChooseLocation = function(n) {
			function f(t) {
				var n = ["country", "province", "city", "district"];
				for (var r = 0; r < 4; r++) e("." + n[r] + "-ul").hide()
			}
			var r = n.target,
				i = e(r),
				s = 0,
				o = 0,
				u = i.data("click-action");
			n.type === "focus" && r.blur();
			var a = i.parent();
			f(i.data("click-action").substring(6));
			if (a.parent().is(".disabled")) return;
			if (a.data("showing") == "true") {
				i.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54"), a.removeData("showing"), a.parent().find("ul").hide();
				return
			}
			a.data("showing", "true"), i.parent().find(".icon-down-arrow-54").removeClass("icon-down-arrow-54").addClass("icon-up-arrow-54");
			switch (u) {
			case "chose-country":
				return a.parent().find(".country-ul").slideDown(400), !1;
			case "chose-province":
				return a.parent().find(".province-ul").slideDown(400), !1;
			case "chose-city":
				return a.parent().find(".city-ul").slideDown(400), !1;
			case "chose-district":
				return a.parent().find(".district-ul").slideDown(400), !1
			}
		}, t.constructLocationWording = function(e) {
			if (!this.initFlag) return r(304211), "不限";
			try {
				var t = this,
					n = t.locationInfo[e] || [],
					i = {},
					s = "";
				x.extend(!0, i, t.locationMap);
				if (n[0] == "-1") return "不限";
				for (var o = 0, u = n.length; o < u; o++) {
					if (n[o] == "-1") {
						for (; u - 1 > o; o++) n[o + 1] = "-1";
						break
					}
					i = i[n[o]];
					if (typeof i == "undefined") return o == 0 ? "不限" : s ? s : "不限";
					o == 0 ? s += i.n : i.n !== "" && i.n !== undefined && (s += ", " + i.n)
				}
				return s
			} catch (a) {
				throw new Error("locationgGenerator/constructLocationWording/n=" + n.join("&") + "|i=" + o + "|" + a.message)
			}
		}, t.initEventHandler = function() {
			e(document).on("click", "[data-click-action]", function(n) {
				var r = e(this),
					i = r.data("click-action");
				i && (i.substring(0, 5) === "chose" ? t.handleChooseLocation(n) : i === "cancel-condition-chose" ? (e(".adv-option").removeClass("border-show"), e(".adv-option-mask").hide(), n.preventDefault()) : i === "done-condition-chose" && (e(".adv-option").removeClass("border-show"), e(".adv-option-mask").hide(), e(document).trigger("peoplepage54:search"), n.preventDefault()))
			}), e(document).on("click", ".country-ul li, .province-ul li, .city-ul li, .district-ul li", function(n) {
				var r = e(this),
					i = t,
					s = r.parent(),
					o = s.data("iden"),
					u = s.parent(),
					a = r.data("value");
				if (u.find(".pe-hometown-label").length === 0) var f = "pe-location-info";
				else var f = "pe-hometown-info";
				try {
					switch (o) {
					case "country":
						if (i.locationInfo[f][0] == a) return p.hide(), e(".pe-search-country").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54"), !1;
						i.locationInfo[f][0] = a, i.clearSectionLocationValue(f, ["province", "city", "district"]), i.clearSectionLocationShowingValue(["province", "city", "district"], f);
						if (r.data("value") == -1) {
							var l = ["province", "city", "district"];
							i.disableSectionLocationChose(l, f), e("#" + f).val("不限"), i.clearSectionLocationShowingValue(l), i.clearSectionLocationValue(f, l), i.clearSectionLocationShowingValue(l, f)
						} else i.enableSectionLocationChose("province", f), i.constructProvinceUlList(f), n.stopPropagation();
						u.find(".pe-search-country").find("input").val(r.text()), p.hide(), e(".pe-search-country").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
						break;
					case "province":
						if (i.locationInfo[f][1] == a) return d.hide(), e(".pe-search-province").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54"), !1;
						i.locationInfo[f][1] = a;
						var l = ["city", "district"];
						i.clearSectionLocationValue(f, l), i.clearSectionLocationShowingValue(l, f), a == -1 ? i.disableSectionLocationChose(l, f) : (i.enableSectionLocationChose("city", f), i.constructCityUlList(f), n.stopPropagation()), u.find(".pe-search-province").find("input").val(r.text()), d.hide(), e(".pe-search-province").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
						break;
					case "city":
						if (i.locationInfo[f][2] == a) {
							v.hide(), e(".pe-search-city").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
							return
						}
						i.locationInfo[f][2] = a, i.clearSectionLocationValue(f, "district"), i.clearSectionLocationShowingValue("district", f), a == -1 ? i.disableSectionLocationChose("district", f) : (i.enableSectionLocationChose("district", f), i.constructDistrictUlList(f), n.stopPropagation()), u.find(".pe-search-city").find("input").val(r.text()), v.hide(), e(".pe-search-city").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
						break;
					case "district":
						i.locationInfo[f][3] = a, u.find(".pe-search-district").find("input").val(r.text()), m.hide(), e(".pe-search-district").removeData("showing"), s.parent().find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")
					}
				} catch (n) {
					throw new Error("locationgGenerator/initEventHandler/" + n.message)
				}
			})
		}, t
	}), define("tmpl!template/singleMiddlePerson.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += '\n<div class="unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            onerror="handleImgErr(this)"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="60px" alt="头像" title="查看用户资料" height="60px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div>\n        <p class="h20 middle-person-nick-p">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "middle-person-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <p class="h20">\n            ';
				if (value.tag) {
					__p += "\n            <!-- 如果CGI返回数据里面包含标签，则认为该请求是搜索标签的，则显示标签 -->\n                ";
					for (var tagsI = 0; tagsI < value.tag.length && tagsI < 3; tagsI++) __p += "", tagsI && (__p += "|"), __p += "" + ((__t = value.tag[tagsI]) == null ? "" : __t) + "";
					__p += "\n\n            "
				} else __p += "\n                <!-- 找人页默认页 展示性别 后边跟地址， 模糊搜索结果页 展示年龄 后边跟地址 -->\n                ", showGender && (__p += "\n                    ", value.gender === 2 ? __p += '\n                    <i class="icon-female"></i>\n                    ' : value.gender === 1 && (__p += '\n                    <i class="icon-male"></i>\n                    '), __p += "\n                "), showAge && (__p += "\n                    " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n                "), __p += "\n                " + ((__t = value.location) == null ? "" : __t) + "\n\n            ";
				__p += '\n\n\n        </p>\n\n        <p class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友</button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" href="#" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </p>\n    </div>\n</div>"
			}
			return __p
		}
	}), define("tmpl!template/peInitPeople.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="carousel-inner">\r\n    ', $.each(recommend, function(index, item) {
				__p += '\r\n        <div class="item ' + ((__t = index === 0 ? "active" : "") == null ? "" : __t) + '">\r\n            ', $.each(item, function(index, value) {
					__p += "\r\n                " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            onerror="handleImgErr(this)"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="60px" alt="头像" title="查看用户资料" height="60px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div>\n        <p class="h20 middle-person-nick-p">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "middle-person-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <p class="h20">\n            ';
							if (value.tag) {
								__p += "\n            <!-- 如果CGI返回数据里面包含标签，则认为该请求是搜索标签的，则显示标签 -->\n                ";
								for (var tagsI = 0; tagsI < value.tag.length && tagsI < 3; tagsI++) __p += "", tagsI && (__p += "|"), __p += "" + ((__t = value.tag[tagsI]) == null ? "" : __t) + "";
								__p += "\n\n            "
							} else __p += "\n                <!-- 找人页默认页 展示性别 后边跟地址， 模糊搜索结果页 展示年龄 后边跟地址 -->\n                ", showGender && (__p += "\n                    ", value.gender === 2 ? __p += '\n                    <i class="icon-female"></i>\n                    ' : value.gender === 1 && (__p += '\n                    <i class="icon-male"></i>\n                    '), __p += "\n                "), showAge && (__p += "\n                    " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n                "), __p += "\n                " + ((__t = value.location) == null ? "" : __t) + "\n\n            ";
							__p += '\n\n\n        </p>\n\n        <p class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友</button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" href="#" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </p>\n    </div>\n</div>"
						}
						return __p
					}() + "\r\n            "
				}), __p += "\r\n        </div>\r\n    "
			}), __p += '\r\n</div>\r\n<div class="carousel-prev-trigger disable" href="' + ((__t = pageControlHref) == null ? "" : __t) + '"\r\n     data-slide="prev"><a title="上一页" class="icon-arrow-prev-page"\r\n                          href=""></a></div>\r\n<div class="carousel-next-trigger ' + ((__t = hasNext ? "" : "disable") == null ? "" : __t) + '"\r\n     href="' + ((__t = pageControlHref) == null ? "" : __t) + '"\r\n     data-slide="next"><a title="下一页" class="icon-arrow-next-page"\r\n                          href=""></a></div>';
			return __p
		}
	}), define("tmpl!template/singleMiddleGuaGua.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += "\n";
				if (index < 6) {
					__p += '\n<div class="seller-item">\n  <div class="image-wrapper" data-room-id="' + ((__t = value.group_no) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-open-guagua-by-short-id="' + ((__t = value.group_no) == null ? "" : __t) + '"\n            data-anchor-uin="' + ((__t = value.anchor_uin) == null ? "" : __t) + '"\n            data-short-id="' + ((__t = value.anchor_short_id) == null ? "" : __t) + '">\n    <div class="enter-room">\n      <!-- 播放按钮 -->\n      <div class="enter-outer">\n        <div class="enter-inner">\n          <div class="enter-icon"></div>\n        </div>\n      </div>\n      <span>立即进入</span>\n    </div>\n    <img ', value.anchor_pic && value.anchor_pic[1] ? __p += 'src="' + ((__t = value.anchor_pic[1]) == null ? "" : __t) + '" onerror="this.src=\'http://find.qq.com/img/seller181-default-avatar.jpg\'"' : __p += 'src="http://find.qq.com/img/seller181-default-avatar.jpg"', __p += ' alt="主播头像">\n  </div>\n  <div class="seller-msg">\n    <div class="line1">\n      <span class="activity-title" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n               data-open-guagua-by-short-id="' + ((__t = value.group_no) == null ? "" : __t) + '"\n               data-anchor-uin="' + ((__t = value.anchor_uin) == null ? "" : __t) + '"\n               data-short-id="' + ((__t = value.anchor_short_id) == null ? "" : __t) + '" data-room-id="' + ((__t = value.group_no) == null ? "" : __t) + '" title="进入直播间">\n        <i class="icon-camera-new"></i>\n        <span title="' + ((__t = value.anchor_name) == null ? "" : $.escape(__t)) + '">' + ((__t = value.anchor_name) == null ? "" : $.escape(__t)) + '</span>\n      </span>\n    </div>\n    <div class="line2">\n      <span class="room-member">\n        <i class="icon-group-big"></i>\n        <span>' + ((__t = value.group_popularity) == null ? "" : __t) + '人</span>\n      </span>\n    </div>\n    <div class="line3">\n        ';
					if (value.anchor_tag) {
						__p += "\n        ";
						for (var j in value.anchor_tag) {
							__p += "\n        ";
							if (j > 1) break;
							__p += '\n        <span class="anchor-tag">\n          <span class="anchor-tag-inner">' + ((__t = value.anchor_tag[j]) == null ? "" : __t) + "</span>\n        </span>\n        "
						}
						__p += "\n        "
					}
					__p += "\n    </div>\n  </div>\n</div>\n"
				}
				__p += ""
			}
			return __p
		}
	}), define("tmpl!template/peInitPeopleGuaGua.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="carousel-inner">\r\n    <div class="active item qiqi-room">\r\n        ', $.each(item, function(index, value) {
				__p += "\r\n            " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) {
						__p += "", __p += "\n";
						if (index < 6) {
							__p += '\n<div class="seller-item">\n  <div class="image-wrapper" data-room-id="' + ((__t = value.group_no) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-open-guagua-by-short-id="' + ((__t = value.group_no) == null ? "" : __t) + '"\n            data-anchor-uin="' + ((__t = value.anchor_uin) == null ? "" : __t) + '"\n            data-short-id="' + ((__t = value.anchor_short_id) == null ? "" : __t) + '">\n    <div class="enter-room">\n      <!-- 播放按钮 -->\n      <div class="enter-outer">\n        <div class="enter-inner">\n          <div class="enter-icon"></div>\n        </div>\n      </div>\n      <span>立即进入</span>\n    </div>\n    <img ', value.anchor_pic && value.anchor_pic[1] ? __p += 'src="' + ((__t = value.anchor_pic[1]) == null ? "" : __t) + '" onerror="this.src=\'http://find.qq.com/img/seller181-default-avatar.jpg\'"' : __p += 'src="http://find.qq.com/img/seller181-default-avatar.jpg"', __p += ' alt="主播头像">\n  </div>\n  <div class="seller-msg">\n    <div class="line1">\n      <span class="activity-title" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n               data-open-guagua-by-short-id="' + ((__t = value.group_no) == null ? "" : __t) + '"\n               data-anchor-uin="' + ((__t = value.anchor_uin) == null ? "" : __t) + '"\n               data-short-id="' + ((__t = value.anchor_short_id) == null ? "" : __t) + '" data-room-id="' + ((__t = value.group_no) == null ? "" : __t) + '" title="进入直播间">\n        <i class="icon-camera-new"></i>\n        <span title="' + ((__t = value.anchor_name) == null ? "" : $.escape(__t)) + '">' + ((__t = value.anchor_name) == null ? "" : $.escape(__t)) + '</span>\n      </span>\n    </div>\n    <div class="line2">\n      <span class="room-member">\n        <i class="icon-group-big"></i>\n        <span>' + ((__t = value.group_popularity) == null ? "" : __t) + '人</span>\n      </span>\n    </div>\n    <div class="line3">\n        ';
							if (value.anchor_tag) {
								__p += "\n        ";
								for (var j in value.anchor_tag) {
									__p += "\n        ";
									if (j > 1) break;
									__p += '\n        <span class="anchor-tag">\n          <span class="anchor-tag-inner">' + ((__t = value.anchor_tag[j]) == null ? "" : __t) + "</span>\n        </span>\n        "
								}
								__p += "\n        "
							}
							__p += "\n    </div>\n  </div>\n</div>\n"
						}
						__p += ""
					}
					return __p
				}() + "\r\n        "
			}), __p += "\r\n    </div>\r\n</div>\r\n";
			return __p
		}
	}), define("tmpl!template/pePeopleMore.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(recommend, function(index, item) {
				__p += '\n    <div class="item">\n        ', $.each(item, function(index, value) {
					__p += "\n            " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            onerror="handleImgErr(this)"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="60px" alt="头像" title="查看用户资料" height="60px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div>\n        <p class="h20 middle-person-nick-p">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "middle-person-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <p class="h20">\n            ';
							if (value.tag) {
								__p += "\n            <!-- 如果CGI返回数据里面包含标签，则认为该请求是搜索标签的，则显示标签 -->\n                ";
								for (var tagsI = 0; tagsI < value.tag.length && tagsI < 3; tagsI++) __p += "", tagsI && (__p += "|"), __p += "" + ((__t = value.tag[tagsI]) == null ? "" : __t) + "";
								__p += "\n\n            "
							} else __p += "\n                <!-- 找人页默认页 展示性别 后边跟地址， 模糊搜索结果页 展示年龄 后边跟地址 -->\n                ", showGender && (__p += "\n                    ", value.gender === 2 ? __p += '\n                    <i class="icon-female"></i>\n                    ' : value.gender === 1 && (__p += '\n                    <i class="icon-male"></i>\n                    '), __p += "\n                "), showAge && (__p += "\n                    " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n                "), __p += "\n                " + ((__t = value.location) == null ? "" : __t) + "\n\n            ";
							__p += '\n\n\n        </p>\n\n        <p class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友</button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" href="#" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </p>\n    </div>\n</div>"
						}
						return __p
					}() + "\n        "
				}), __p += "\n    </div>\n"
			}), __p += "";
			return __p
		}
	}), define("tmpl!template/peFindAccurateColumns.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<span class="avatar-wrapper" title="查看用户资料">\r\n', person.onlineFlag ? __p += '\r\n<img\r\n        width="60" height="60" src="' + ((__t = person.avatar) == null ? "" : __t) + '"\r\n        alt="头像" data-prefix="pe" data-iden="avatar" data-obj="acc"\r\n        onerror="handleImgErr(this)"\r\n        data-classification="pe"\r\n        data-source="1"\r\n        data-open-people="' + ((__t = person.uin) == null ? "" : __t) + '" title="查看用户资料"/>\r\n' : __p += '\r\n    <svg>\r\n        <image width="60px" alt="头像" title="查看用户资料" height="60px"\r\n               xlink:href="' + ((__t = person.avatar) == null ? "" : __t) + '"\r\n               data-prefix="pe" data-iden="avatar" data-obj="rec"\r\n               data-classification="pe"\r\n               onload="handleImgErr(this)"\r\n               data-source="1"\r\n               data-open-people="' + ((__t = person.uin) == null ? "" : __t) + '"\r\n                />\r\n    </svg>\r\n', __p += '\r\n</span>\r\n<div class="column-detail">\r\n    <p>\r\n        <a href="#" data-prefix="pe" data-iden="nick" data-obj="acc"   data-source="1"\r\n           data-open-people="' + ((__t = person.uin) == null ? "" : __t) + '" title="查看用户资料">\r\n            ' + ((__t = person.nick) == null ? "" : __t) + '\r\n        </a>\r\n        <span class="red">(' + ((__t = person.uin2) == null ? "" : __t) + ")</span>\r\n    </p>\r\n\r\n    <p>\r\n        ", person.gender == 1 ? __p += '\r\n        <i class="icon-male"></i>\r\n        ' : person.gender == 2 && (__p += '\r\n        <i class="icon-female"></i>\r\n        '), __p += "\r\n        " + ((__t = person.age) == null ? "" : __t) + " ", person.age && (__p += "岁"), __p += " " + ((__t = person.sep) == null ? "" : __t) + " " + ((__t = person.location) == null ? "" : __t) + '\r\n        &nbsp;\r\n    </p>\r\n\r\n    <p>\r\n        <a class="add-friend-blue" data-prefix="pe" data-obj="acc"\r\n           data-source="1"\r\n           data-uin2="' + ((__t = person.uin2) == null ? "" : __t) + '"\r\n           data-add-people="' + ((__t = person.uin) == null ? "" : __t) + '" href="#">\r\n            <i class="icon-add-group-plus"></i>\r\n            好友\r\n           </a>\r\n        ', person.ck && (__p += "\r\n        ", person.wpa_ck ? __p += '\r\n        <a class="chat-friend" href="#" title="发起临时会话" data-prefix="pe"\r\n           data-obj="acc" data-iden="wpa_ck"\r\n           data-open-session="' + ((__t = person.ck) == null ? "" : __t) + '">\r\n            <i class="icon-chat-pop"></i>\r\n           </a>\r\n        ' : __p += '\r\n        <a class="chat-friend" href="#" title="发起临时会话" data-prefix="pe"\r\n           data-obj="acc" data-iden="ck"\r\n           data-open-session="' + ((__t = person.ck) == null ? "" : __t) + '">\r\n            <i class="icon-chat-pop"></i>\r\n        </a>\r\n           </a>\r\n        ', __p += "\r\n        "), __p += "\r\n    </p>\r\n</div>";
			return __p
		}
	}), define("tmpl!template/peFindAccRecManufacturers.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(manufactures, function(e, t) {
				__p += '\r\n<div class="unit">\r\n   <span class="avatar-wrapper" title="查看商家资料">\r\n        ', t.onlineFlag ? __p += '\r\n            <img src="' + ((__t = t.ic) == null ? "" : __t) + '" alt="商家头像" data-obj="acc"\r\n                 data-iden="avatar"\r\n                 data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n                 data-name="' + ((__t = t.name) == null ? "" : $.escape(__t)) + '"\r\n                 data-prefix="pe"\r\n                 data-classification="manu"\r\n                 onerror="handleImgErr(this)"\r\n                    >\r\n        ' : __p += '\r\n            <svg>\r\n                <image width="60px" alt="商家QQ头像" title="查看商家QQ资料"\r\n                       height="60px" xlink:href="' + ((__t = t.ic) == null ? "" : __t) + '"\r\n                       data-prefix="pe" data-iden="avatar" data-obj="acc"\r\n                       data-classification="manu"\r\n                       onload="handleImgErr(this)"\r\n                       data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n                        />\r\n            </svg>\r\n        ', __p += '\r\n    </span>\r\n\r\n    <div>\r\n        <p><a href="#" data-iden="nick" \r\n              data-prefix="pe"\r\n              data-classification="manu"\r\n              data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n              data-name="' + ((__t = t.name) == null ? "" : $.escape(__t)) + '">' + ((__t = t.cs) == null ? "" : $.escape(__t)) + "</a>\r\n        </p>\r\n\r\n        <p>" + ((__t = t.location) == null ? "" : __t) + "</p>\r\n\r\n        <p>\r\n            ", t.ck || t.wpa_ck ? __p += '\r\n            <a class="add-friend-blue" title="发起临时会话" data-prefix="pe"\r\n               data-classification="manu"\r\n               data-obj="acc" data-open-session="' + ((__t = t.ck || t.wpa_ck) == null ? "" : __t) + '">\r\n                <i class="icon-chat-pop"></i>\r\n                会话\r\n               </a>\r\n            ' : __p += '\r\n            <a class="add-friend-blue" title="发起临时会话" data-prefix="pe"\r\n               data-classification="manu"\r\n               data-obj="acc" data-open-session="' + ((__t = t.kfuin) == null ? "" : __t) + '">\r\n                <i class="icon-chat-pop"></i>\r\n                会话\r\n               </a>\r\n            ', __p += '\r\n            <a class="chat-friend" data-prefix="pe" data-obj="acc"\r\n               title="添加商家" data-classification="manu"\r\n               data-add-seller="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n               data-name="' + ((__t = t.name) == null ? "" : $.escape(__t)) + '"\r\n               data-account="' + ((__t = t.nameAccount) == null ? "" : $.escape(__t)) + '">\r\n                <i class="icon-add-group-plus"></i>\r\n               </a>\r\n        </p>\r\n    </div>\r\n</div>\r\n'
			}), __p += "";
			return __p
		}
	}), define("tmpl!template/peFindFuzzy.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(persons, function(index, value) {
				__p += "\r\n    " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) {
						__p += "", __p += '\n<div class="unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            onerror="handleImgErr(this)"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="60px" alt="头像" title="查看用户资料" height="60px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div>\n        <p class="h20 middle-person-nick-p">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "middle-person-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <p class="h20">\n            ';
						if (value.tag) {
							__p += "\n            <!-- 如果CGI返回数据里面包含标签，则认为该请求是搜索标签的，则显示标签 -->\n                ";
							for (var tagsI = 0; tagsI < value.tag.length && tagsI < 3; tagsI++) __p += "", tagsI && (__p += "|"), __p += "" + ((__t = value.tag[tagsI]) == null ? "" : __t) + "";
							__p += "\n\n            "
						} else __p += "\n                <!-- 找人页默认页 展示性别 后边跟地址， 模糊搜索结果页 展示年龄 后边跟地址 -->\n                ", showGender && (__p += "\n                    ", value.gender === 2 ? __p += '\n                    <i class="icon-female"></i>\n                    ' : value.gender === 1 && (__p += '\n                    <i class="icon-male"></i>\n                    '), __p += "\n                "), showAge && (__p += "\n                    " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n                "), __p += "\n                " + ((__t = value.location) == null ? "" : __t) + "\n\n            ";
						__p += '\n\n\n        </p>\n\n        <p class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友</button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" href="#" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </p>\n    </div>\n</div>"
					}
					return __p
				}() + "\r\n"
			}), __p += "";
			return __p
		}
	}), define("tmpl!template/singleLargePublicAccount.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\n<div class="large-seller-unit public-account">\n    <span class="avatar-wrapper" title="查看公众号资料">\n\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '"\n            data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '"\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            alt="公众号头像"\n            onerror="handleImgErr(this)"\n            title="查看公众号资料"/>\n\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n\n            <a \n                href="#"\n                title="' + ((__t = value.originalName) == null ? "" : __t) + '"\n                data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + "\n            </a>\n            ", value.is_verified && (__p += '<span class="icon-public-account-auth" title="已认证"></span>'), __p += '\n        </p>\n\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n\n        <div class="h20 large-seller-bottom-info">\n                <p class="right">\n\n                    <a class="btn-seller-chat-online" title="咨询" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-ask-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n\n                    <a class="btn-public-focus" title="关注公众号" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-focus-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n\n                </p>\n        </div>\n    </div>\n</div>';
			return __p
		}
	}), define("tmpl!template/singleQidianProfile.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\n<div class="large-seller-unit qidain-account">\n    <span class="avatar-wrapper" title="查看商家资料">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '" data-uin="' + ((__t = value.uin) == null ? "" : __t) + '" alt="头像" onerror="handleImgErr(this)" title="查看商家资料"/>\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n            <a href="#" title="' + ((__t = value.nick) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n        <div class="h20 large-seller-bottom-info">\n            <p class="right">\n                <a class="btn-seller-chat-online" title="咨询" data-ask-qidian-account="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n                <a class="btn-public-focus" title="关注" data-qidian-lianghao="' + ((__t = value.lianghao) == null ? "" : __t) + '"  data-qidian-nick="' + ((__t = value.nick) == null ? "" : __t) + '" data-qidian-add-friend="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n            </p>\n        </div>\n    </div>\n</div>';
			return __p
		}
	}), define("tmpl!template/sellerAuthIcon.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
			return __p
		}
	}), define("tmpl!template/sellerSalePromotionIcon.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", typeof value != "undefined" && (value.type === "bulk" ? print('<span class="icon-bulk" title="团购"></span>') : value.type === "microlife" && print('<span class="icon-micro-life" title="优惠券"></span>')), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/singleLargeSeller.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += '\n<div class="large-seller-unit">\n    <span class="avatar-wrapper" title="查看商家资料">\n\n        <img\n            class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '"\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '"\n            data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n            data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n            data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n            data-iden="avatar"\n            data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n            data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n            data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n            data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n            data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n            data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n            data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            alt="商家头像"\n            data-classification="manu"\n            onerror="handleImgErr(this)"\n            title="查看商家资料"/>\n\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n\n            ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
					return __p
				}() + '\n            <a \n                href="#"\n                title="' + ((__t = value.originalName) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-iden="nick"\n                data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n                data-iden="avatar"\n                data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n                data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n                data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n                data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n                data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n                data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n                data-classification="manu"\n                data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-name="' + ((__t = value.name) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "", typeof value != "undefined" && (value.type === "bulk" ? print('<span class="icon-bulk" title="团购"></span>') : value.type === "microlife" && print('<span class="icon-micro-life" title="优惠券"></span>')), __p += "\r\n";
					return __p
				}() + "\n\n            ";
				if (parseFloat(value.price) || parseInt(value.price) === 0) __p += '\n                <span class="price">仅' + ((__t = value.price) == null ? "" : __t) + "元</span>\n            ";
				__p += "\n            " + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n\n        <div class="h20 large-seller-bottom-info">\n            <p class="' + ((__t = !value.isLocalSeller && value.location ? "large-seller-bottom-info-location all-width" : "large-seller-bottom-info-location") == null ? "" : __t) + '">\n                ', __p += "\n\n                ", !value.isLocalSeller && value.location ? __p += "\n                    " + ((__t = value.category) == null ? "" : __t) + "" + ((__t = value.category ? "&nbsp;|&nbsp;" : "") == null ? "" : __t) + "" + ((__t = value.location) == null ? "" : __t) + "\n                " : (__p += "\n                    ", value.category ? __p += "\n                        " + ((__t = value.category) == null ? "" : __t) + "\n                    " : __p += "\n                        " + ((__t = value.location) == null ? "" : __t) + "\n                    ", __p += "\n                "), __p += "\n            </p>\n\n            ", __p += "\n            ", value.isLocalSeller && (__p += '\n                <p class="right">\n                    ', __p += "\n                    ", value && value.qzoneAuthFlag ? __p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-auth"\n                       data-open-qzone="true"\n                       title="查看商家认证空间"></a>\n                    ' : value && value.qzonePubFlag && (__p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-pub"\n                       data-open-qzone="true"\n                       title="查看商家公开空间"></a>\n                    '), __p += "\n\n\n                    ", value.wpa_ck || value.ck ? __p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"></a>\n                    ' : value.type === "sellerEnt" && (__p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '"></a>\n                    '), __p += "\n                </p>\n            "), __p += "\n        </div>\n    </div>\n</div>"
			}
			return __p
		}
	}), define("tmpl!template/peSimNavLeft.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", keyword == "" ? __p += "\r\n<span>条件查找</span>\r\n" : __p += "\r\n<span>" + ((__t = keyword) == null ? "" : $.escape(__t)) + "</span>\r\n", __p += "\r\n", gender == 1 ? __p += '\r\n<span class="pe-nav-separator">|</span>\r\n<span>男</span>\r\n' : gender == 2 && (__p += '\r\n<span class="pe-nav-separator">|</span>\r\n<span>女</span>\r\n'), __p += "\r\n", location !== undefined && (__p += '\r\n<span class="pe-nav-separator">|</span>\r\n<span>' + ((__t = location) == null ? "" : __t) + "</span>\r\n"), __p += "\r\n", hometown !== undefined && (__p += '\r\n<span class="pe-nav-separator">|</span>\r\n<span>' + ((__t = hometown) == null ? "" : __t) + "</span>\r\n"), __p += "\r\n", age !== undefined && (__p += '\r\n<span class="pe-nav-separator">|</span>\r\n<span>' + ((__t = age) == null ? "" : __t) + "</span>\r\n"), __p += "";
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("people.view", ["$", "./widget/people.chooseLocationGenerator", "./widget/people.chooseLocationGenerator-54", "tmpl!template/peInitPeople.html", "tmpl!template/peInitPeopleGuaGua.html", "tmpl!template/pePeopleMore.html", "tmpl!template/peFindAccurateColumns.html", "tmpl!template/peFindAccRecManufacturers.html", "tmpl!template/peFindFuzzy.html", "tmpl!template/singleLargePublicAccount.html", "tmpl!template/singleQidianProfile.html", "tmpl!template/singleLargeSeller.html", "tmpl!template/peSimNavLeft.html"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
		"use strict";
		var p = {
			initFlag: !1
		},
			d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X, V, $, J, K, Q, G, Y, Z, et, tt, nt, rt, it, st, ot, ut;
		return p.flattening = !1, p.loading = {}, p.init = function() {
			var n = window.location.href;
			n.indexOf("im_version") < 0 ? p.flattening = !1 : p.flattening = !0, t.init(["pe-location-info", "pe-hometown-info"]), d = e("#hy-header"), v = e("#pe-header"), m = e("#pe-search-input"), g = e("#pe-location-info"), y = e("#pe-hometown-info"), b = e("#pe-sex"), w = e("#pe-sex-p"), E = e("#pe-age"), S = e("#pe-age-p"), x = e("#sex-ul"), T = e("#age-ul"), N = e("#pe-online"), C = e("#pe-camera"), k = e("#pe-default"), L = e("#pe-sim-result"), A = e("#pe-acc-result"), O = e("#pe-acc-result-dom"), M = e("#pe-sim-result-dom"), _ = e("#pe-search-res-sim-dom"), D = e("#pe-acc-result-dom-person-dom .column-inner"), P = e("#pe-nav-left-input-label"), H = O.find(".pe-acc-container-second .carousel-inner .item"), B = O.find(".pe-acc-container-second .carousel-title"), j = e("#pe-sim-nav-left"), F = e("#pe-acc-see-more"), I = e("nav"), q = e("#hy"), R = e("#qu"), U = e("#hy-main"), z = e("#pe"), W = e("#pe-recommend-people"), X = e("#pe-nearly-people"), V = e("#country-ul"), $ = e("#country-value-bg"), J = e("#country-value"), K = e("#province-ul"), Q = e("#province-value-bg"), G = e("#province-value"), Y = e("#city-ul"), Z = e("#city-value-bg"), et = e("#city-value"), tt = e("#district-ul"), nt = e("#district-value-bg"), rt = e("#district-value"), it = e("#location-generator"), st = e("#pe-hometown-info-p"), ot = e("#pe-location-info-p"), ut = e("#pe-search-res-sim-page-controller"), p.loading = {
				peRecommendPeopleLoading: W.loading(),
				peNearlyPeopleLoading: X.loading(),
				peAccResDomLoading: O.loading(),
				peSimResDomLoading: M.loading()
			}, this.initFlag = !0
		}, p.initSexChose = function() {
			e(document).on("click", "[data-sex-picker]", function(t) {
				p.hideLocationGenerator(), p.hideAgeUL(), p.hideSexUL(), e(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), e(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
				var n = e(this);
				x.css("top", 0), x.css("left", 0);
				var r = n.offset();
				return r.top += 24, p.flattening && (r.left -= 5), x.offset(r), x.data("showing") != "true" ? (x.show(), x.data("showing", "true"), n.find(".icon-down-arrow").removeClass("icon-down-arrow").addClass("icon-up-arrow"), n.find(".icon-down-arrow-54").removeClass("icon-down-arrow-54").addClass("icon-up-arrow-54")) : (x.hide(), x.removeData("showing"), n.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), n.find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")), !1
			}), e(".sex-ul li").on("click", function(t) {
				var n = e(this),
					r = n.text();
				b.val(r).data("real-sex", n.data("value")), x.hide(), x.removeData("showing"), w.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), w.find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")
			})
		}, p.initAgeChose = function() {
			e(document).on("click", "[data-age-picker]", function(t) {
				p.hideLocationGenerator(), p.hideAgeUL(), p.hideSexUL(), e(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), e(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54");
				var n = e(this);
				T.css("top", 0), T.css("left", 0);
				var r = n.offset();
				return r.top += 24, p.flattening && (r.left -= 5), T.offset(r), T.data("showing") != "true" ? (T.show(), T.data("showing", "true"), n.find(".icon-down-arrow").removeClass("icon-down-arrow").addClass("icon-up-arrow"), n.find(".icon-down-arrow-54").removeClass("icon-down-arrow-54").addClass("icon-up-arrow-54")) : (T.hide(), T.removeData("showing"), n.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), n.find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")), !1
			}), e(".age-ul li").on("click", function(t) {
				var n = e(this),
					r = n.text();
				E.val(r).data("real-age", n.data("value")), T.hide(), T.removeData("showing"), S.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), S.find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")
			})
		}, p.initEventHandler = function() {
			var n = this;
			e(document).on("click", "[data-location-picker]", function(n) {
				p.hideLocationGenerator(), p.hideAgeUL(), p.hideSexUL(), e(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), t.showLocationGenerator({
					inputTarget: this,
					callbackObj: {
						endCallback: function(e) {}
					}
				}), n.stopPropagation(), n.preventDefault()
			}), t.initEventHandler(), n.initSexChose(), n.initAgeChose()
		}, p.hideLocationGenerator = function() {
			V.hide(), $.removeData("showing"), $.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), J.val(""), K.hide().empty(), Q.removeData("showing"), Q.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), G.val(""), Y.hide().empty(), Z.removeData("showing"), Z.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), et.val(""), tt.hide().empty(), nt.removeData("showing"), nt.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), rt.val(""), it.hide(), st.removeData("showing"), ot.removeData("showing"), st.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), ot.find(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow");
			if (p.flattening) {
				var t = ["country", "province", "city", "district"];
				for (var n = 0; n < 4; n++) e("." + t[n] + "-ul").hide().parent(), e(".pe-search-" + t[n]).removeData("showing");
				e(".location-container").find(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54")
			}
		}, p.hideAgeUL = function() {
			T.hide(), S.removeData("showing")
		}, p.hideSexUL = function() {
			x.hide(), w.removeData("showing")
		}, p.loadingDisplay = function(e, t, n) {
			n ? this.loading[e].loading(t, n) : this.loading[e].loading(t)
		}, p._clearResidualInfo = function(e) {
			var n = this;
			t.locationInfo["pe-location-info"] = ["-1", "-1", "-1", "-1"], p.flattening ? g.val("") : g.val("不限"), t.locationInfo["pe-hometown-info"] = ["-1", "-1", "-1", "-1"], p.flattening ? y.val("") : y.val("不限"), b.data("real-sex", 0), p.flattening ? b.val("") : b.val("不限"), e || n.loadingDisplay("peSimResDomLoading", "hide"), n.loadingDisplay("peAccResDomLoading", "hide"), n.loadingDisplay("peRecommendPeopleLoading", "hide"), n.loadingDisplay("peNearlyPeopleLoading", "hide")
		}, p.clearResidualInfo = p._clearResidualInfo, p._displayPeResSimPageController = function(e) {
			ut[e]()
		}, p.showPeResSimPageController = function() {
			this._displayPeResSimPageController("show")
		}, p.hidePeResSimPageController = function() {
			this._displayPeResSimPageController("hide")
		}, p.fillLocationInfo = function(e) {
			e && t.fillLocationInfo(e), g.val(t.constructLocationWording("pe-location-info"))
		}, p.fillHometownInfo = function(e) {
			e && t.fillLocationInfo(e), y.val(t.constructLocationWording("pe-hometown-info"))
		}, p.enterPeDefault = function(e) {
			var t = this;
			t._clearResidualInfo(), t.showAllPePageSkeleton(), t.showPeDefault(e), t.hidePeAcc(), t.hidePeSim()
		}, p.hideAllPePageSkeleton = function() {
			e("#pe").hide()
		}, p.showAllPePageSkeleton = function() {
			z.show()
		}, p.clearAll = function(t) {
			var n = this;
			n._clearResidualInfo(t), m.val(""), e.inputChangeHandler(), E.data("real-age", 0), p.flattening ? E.val("") : E.val("不限"), N[0] && (N[0].checked = !0)
		}, p.initPeDefault = function(t) {
			var n = this;
			n.clearAll(), z.show(), k.show(), n.loadingDisplay("peRecommendPeopleLoading", "show"), n.loadingDisplay("peNearlyPeopleLoading", "show"), t && t.keyword && (m.val(t.keyword), e.inputChangeHandler())
		}, p.noPosBuddyTip = function() {
			p.loadingDisplay("peRecommendPeopleLoading", "show"), p.loading.peRecommendPeopleLoading.loading("zeroPosPersonTip")
		}, p.buddyRecDisplay = function(e, t) {
			var n = t ? s : r;
			e.dataAddPeopleSource = 40;
			var i = n(e);
			t ? W.find(".carousel-inner").append(i) : (p.loadingDisplay("peRecommendPeopleLoading", "hide"), W.find(".carousel-inner").remove(), W.find(".carousel-prev-trigger").remove(), W.find(".carousel-next-trigger").remove(), W.append(i), W.find(".carousel-inner").show(), _tabsTiming.people.firstScreen = +(new Date))
		}, p.buddyNearlyDisplay = function(e, t) {
			var n = this;
			p.loadingDisplay("peNearlyPeopleLoading", "hide");
			var i = t ? s : r;
			e.dataAddPeopleSource = 25;
			var o = i(e);
			t ? X.find(".carousel-inner").append(o) : (X.find(".carousel-inner").remove(), X.find(".carousel-prev-trigger").remove(), X.find(".carousel-next-trigger").remove(), X.append(o), X.find(".pe-nearly-leftupper-tip").text("附近的人"), n.showNearlyPeLBS())
		}, p.guaguaRecDisplay = function(e, t) {
			var n = this;
			p.loadingDisplay("peNearlyPeopleLoading", "hide");
			var r = i;
			e.dataPrefix = "pe", e.dataObj = "rec";
			try {
				var s = r(e)
			} catch (o) {
				console.log(o)
			}
			X.find(".carousel-inner").remove(), X.find(".carousel-prev-trigger").remove(), X.find(".carousel-next-trigger").remove(), X.append(s), X.find(".pe-nearly-leftupper-tip").html("热门推荐<span>直播</span>"), n.showNearlyPeLBS()
		}, p.showNearlyPeNoLBS = function() {
			p.loadingDisplay("peNearlyPeopleLoading", "hide"), X.find(".carousel-inner").hide(), e("#pe-nearly-people-tip").show(), X.find(".pe-nearly-leftupper-tip").text("附近的人"), X.find(".btn-pe-nearly-lbs-close").hide(), e("#pe-nearly-people .carousel-prev-trigger").addClass("disable"), e("#pe-nearly-people .carousel-next-trigger").addClass("disable")
		}, p.showNearlyPeLBS = function() {
			var t = X.find(".carousel-inner");
			p.loadingDisplay("peNearlyPeopleLoading", "hide"), t.show(), e("#pe-nearly-people-tip").hide(), X.find(".btn-pe-nearly-lbs-close").show()
		}, p.initPeSearching = function() {
			var t = this;
			z.show(), k.is(":visible") ? (k.css("z-index", "0"), _.hide(), L.css({
				top: "30px",
				zIndex: 1,
				display: "block"
			}), t.loadingDisplay("peSimResDomLoading", "show"), k.hide(), e(document).trigger("initPeSearching:done")) : (A.hide(), j.text(""), _.hide(), t.loadingDisplay("peSimResDomLoading", "hide"), L.show(), t.loadingDisplay("peSimResDomLoading", "show"), e(document).trigger("initPeSearching:done"))
		}, p.showSearchErrorLoading = function(e) {
			this.loadingDisplay("peSimResDomLoading", "show", e), this.loadingDisplay("peSimResDomLoading", "peopleSearchError", e)
		}, p.showSearchTimeout = function(t) {
			this.loadingDisplay("peSimResDomLoading", "show"), this.loadingDisplay("peSimResDomLoading", "timeout", {
				target: "people",
				search: e.trim(e("#pe-search-input").val())
			}), this.showSearchSimNav({
				keyword: e.trim(m.val()),
				gender: undefined,
				age: undefined,
				location: undefined,
				hometown: undefined
			})
		}, p.showSearchAccResult = function(t, n) {
			L.css("z-index", 1), A.css("z-index", 2), t !== undefined ? (n ? (D.html(c({
				value: t
			})), e(".column-title", A).hide()) : (e(".column-title", A).show(), D.html(o({
				person: t
			}))), P.text("搜索： " + (t.uin2 || t.uin || t.nameAccount)), A.show(), L.hide()) : (this.loadingDisplay("peAccResDomLoading", "error"), this.loadingDisplay("peAccResDomLoading", "show"))
		}, p.showSearchAccSeeMore = function(e, t) {
			e == 0 ? F.hide() : (F.data("keyword", t), F.show())
		}, p.showExactPublicAccount = function(t) {
			L.css("z-index", 1), A.css("z-index", 2);
			var n = f({
				value: t
			});
			P.text("找到1个公众号"), e(".column-title", A).hide(), B.hide(), A.show(), L.hide(), D.html(n)
		}, p.showExactQidianAccount = function(t) {
			L.css("z-index", 1), A.css("z-index", 2);
			var n = l({
				value: t
			});
			P.text("找到1个商家"), e(".column-title", A).hide(), B.hide(), A.show(), L.hide(), D.html(n)
		}, p.showSearchAccRecManufacturers = function(t) {
			t.length > 4 && t.splice(4);
			if (t.length === 0) return B.hide(), H.html(""), e("#pe-acc-result-dom-person-dom").css("border-bottom", "solid 1px transparent"), !1;
			e("#pe-acc-result-dom-person-dom").css("border-bottom", "solid 1px #e4eaec"), B.show();
			var n = u({
				manufactures: t
			});
			H.html(n)
		}, p.showSearchSimResult = function(t) {
			_.find(".item").each(function(n, r) {
				n === 0 ? (e(this).empty(), e(this).html(a({
					persons: t,
					showAge: !0,
					showGender: !1,
					dataObj: "fuz",
					dataPrefix: "pe"
				})), e(this).addClass("active")) : e(this).remove()
			}), this.loadingDisplay("peSimResDomLoading", "hide"), _.show()
		}, p.showSearchSimNav = function(e) {
			j.html(h(e))
		}, p
	}), !
	function(e) {
		typeof define == "function" ? define("model/buddy", ["$", "../people.view", "tools/native", "tools/utils"], e) : e($)
	}(function(e, t, n, r) {
		"use strict";

		function s(t) {
			return t.type = t.type || "POST", t.url = o.CGI_HOST + t.url, t.dataType = t.dataType || "json", t.monitor && !t.error && (t.error = function() {
				e.report.monitor(t.monitor)
			}), r.request(t)
		}
		var i = "buddy",
			o = {
				CGI_HOST: "http://cgi.find.qq.com/qqfind/buddy/"
			},
			u = {};
		return u.possibleFeedback = function(t, n) {
			var r = +(new Date),
				i = {
					url: "possible_feedback",
					data: e.extend({
						act: 1,
						src: 3,
						uin_list: ""
					}, t),
					error: function(e, t, n) {
						this.success({
							retcode: 404
						})
					},
					success: function(t) {
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/buddy/possible_feedback", t.retcode, +(new Date) - r)
						} catch (i) {}
						n && n(t)
					}
				};
			return s(i)
		}, u.recommend = function(t, n) {
			var r = t && t.isHyMain;
			delete t.isHyMain;
			var i = +(new Date),
				o = {
					url: "possiblev",
					data: e.extend({
						num: 16,
						page: 0,
						start: 0,
						type: 3,
						use_846: 1,
						filter_uin: ""
					}, t),
					success: function(t) {
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/buddy/possiblev", t && t.retcode, +(new Date) - i)
						} catch (r) {}
						n && n(t)
					},
					error: function(e, t, n) {
						var i;
						t === "timeout" ? r ? i = 6013666 : i = 6022666 : t === "error" ? (r ? i = "6013" : i = "6022", i += e.status) : i = 5000002, this.success({
							retcode: i
						})
					}
				};
			return s(o)
		}, u.search = function(t, n, r) {
			var i = typeof n,
				o;
			i === "function" ? (o = "search_v3", r = n) : o = n;
			var u = +(new Date),
				a = {
					url: o,
					data: e.extend({
						num: 20,
						page: 0,
						sessionid: 0
					}, t),
					error: function(e, t, n) {
						var r;
						t === "timeout" ? r = 6023666 : t === "error" ? r = e.status : r = 5000002, this.success({
							retcode: r
						})
					},
					success: function(t) {
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/buddy/" + o, t && t.retcode, +(new Date) - u)
						} catch (n) {}
						r(t)
					}
				};
			return s(a)
		}, u.processData = function(e, t) {
			var n = e.city,
				i = e.province,
				s = e.country,
				o = "",
				u = e.distance;
			return n = Number(n) === 0 ? "" : n, i = Number(i) === 0 ? "" : i, s = Number(s) === 0 ? "" : s, n ? o = [i, n].join(" ") : o = [s, i].join(" "), e.uin2 = e.uin2 || e.uin, e.location = o, e.avatar = e.url || r.getAvatar(e.uin, 1), e.sex && (e.gender = e.sex), e.age || (e.age = ""), e.accuracy && (u = e.accuracy), u && (u > 900 ? u > 1e4 ? u = "超过10公里" : u = Math.ceil(u / 1e3) + "公里以内" : u = Math.ceil(u / 100) + "00米以内", e.location = '<i class="btn-loc-8-12-enable"></i>' + u), e.type === 3 && (e.location = "同城"), e.sep = e.age && e.location !== " " ? "|" : "", e.lnick && (e.sign = e.lnick), e.nick = r.escape(e.nick), e.sign ? e.sign = r.escape(e.sign) : e.sign = "这家伙很懒，什么都没有留下", e.wpa_ck && (e.ck = e.wpa_ck), typeof e.online != "undefined" && (e.stat = e.online), e.stat === 20 ? e.onlineFlag = 0 : e.onlineFlag = 1, t && r.generateRedWords(e, t, ["nick"]), e
		}, e[i] = u
	}), !
	function(e) {
		typeof define == "function" ? define("model/seller", ["$", "tools/native", "tools/utils"], e) : e($)
	}(function(e, t, n) {
		"use strict";
		var r = "seller",
			i = 0,
			s = {};
		s.sellersContainer = {}, e.cookie.updateUinSkey();
		var o = e.cookie.uin() % 10 < 8 ? 1 : 0;
		return s.neighbor = function(r, i) {
			var s = r.isHyMain;
			delete r.isHyMain;
			var o = +(new Date),
				u = "http://cgi.find.qq.com/qqfind/business/neighbor_v9";
			return n.request({
				type: "POST",
				url: u,
				dataType: "json",
				data: e.extend({
					n: 8,
					src: 0,
					v: t.getVersion()
				}, r),
				error: function(e, t, n) {
					var r;
					t === "timeout" ? r = 6011666 : t === "error" ? (r = "6011", r += e.status) : r = 5000002, this.success({
						retcode: r
					})
				},
				success: function(t) {
					try {
						e.report.mmReport(u, t.retcode, +(new Date) - o)
					} catch (n) {}
					i && i(t)
				}
			})
		}, s.processData = function(t, r) {
			var s = ["http://s.url.cn/qqfind/img/seller100-default-avatar.png", "http://s.url.cn/qqfind/img/seller270-default-avatar.jpg"],
				u = {
					100: 0,
					270: 1
				};
			t.chatButtonStyle = o;
			if (t.others_info && typeof t.others_info == "string") try {
				t.others_info_obj = e.parseJSON(t.others_info)
			} catch (a) {
				t.others_info_obj = {}
			} else t.others_info_obj = {};
			t.type && (t.specialSourceType = t.type), t.kfuin = n.escape(t.kfuin), t.online = t.online || t.stat, t.online === 10 || t.online == 1 ? t.onlineFlag = 1 : t.onlineFlag = 0;
			if (t.source) switch (t.source) {
			case 0:
				t.type = "sellerv1", t.defaultAvatarType = "100";
				break;
			case 1:
				t.type = "sellerEnt", t.defaultAvatarType = "100";
				break;
			case 2:
				t.ver && t.ver === 2 ? t.type = "sellerv2" : t.type = "sellerv1", t.defaultAvatarType = "100";
				break;
			case 3:
				t.type = "sellerEnt", t.defaultAvatarType = "100";
				break;
			case 7:
				t.type = "electronic", t.defaultAvatarType = "270";
				break;
			case 8:
				t.type = "travel", t.defaultAvatarType = "270";
				break;
			case 9:
				t.type = "mama", t.defaultAvatarType = "270";
				break;
			case 101:
				t.type = "hotword-search", t.defaultAvatarType = "270";
				break;
			case 102:
				t.type = "subject-search", t.defaultAvatarType = "270";
				break;
			case 103:
				t.type = "recom-search", t.defaultAvatarType = "270"
			} else t.isE ? t.type = "sellerEnt" : t.type = "sellerv1", t.defaultAvatarType = "100";
			t.type == "sellerEnt" && (t.onlineFlag = 1);
			if (t.type === "sellerv1" || t.type === "sellerv2") t.qzoneAuthFlag = t.qzf && t.qzf === 2, t.qzonePubFlag = t.qzf && t.qzf === 5, t.qzoneAddress = n.generateQzoneAddress(t.kfuin);
			t.weakType = t.weakType || 0, t.tenpayAuth = t.weakType & 2, t.licenceAuth = t.weakType & 1, t.biz_flag = t.biz_flag || "", t.isSellerEntAuth = t.isverified && t.isverified !== "0" || 0, t.profileCardType = t.cardtype || 0, t.defaultAvatarType = t.defaultAvatarType || "100", t.avatar = t.img || t.picurl || t.avatar || t.ic || t.logo_url || s[u[t.defaultAvatarType]], t.banner && (t.avatar = t.banner, t.color = !1), t.sign = t.desc || t.txt || t.title || t.sellerDesc || t.sign || t.company_desc || t.description || "", t.hasRating = t.source >= 1 && t.source <= 3 && t.rating && t.rating.rating_total_count;
			if (t.hasRating) {
				var f = ["zero", "half", "one", "one-half", "two", "two-half", "three", "three-half", "four", "four-half", "five"];
				t.rating.rating_show = Math.round(t.rating.avg_rating * 10) / 10, t.rating.rating_show = t.rating.rating_show.toFixed(1), t.rating.star = f[Math.round(t.rating.avg_rating * 2)]
			}
			var l = t.city,
				c = t.province,
				h = t.country,
				p = "",
				d = t.distance;
			t.location || (l = Number(l) === 0 ? "" : l, c = Number(c) === 0 ? "" : c, h = Number(h) === 0 ? "" : h, l ? p = [c, l].join(" ") : p = [h, c].join(" "), t.location = p, t.arValue && (t.arValue = t.arValue.trim()) && (t.location = t.arValue), t.location.trim() === "" && (t.location = "")), t.latitude = t.latitude && t.latitude / 1e6, t.longitude = t.longitude && t.longitude / 1e6, t.province && t.province.match(/上海|北京|重庆|天津|香港|澳门/) ? t.prov = t.province : t.prov = t.city, t.type === "sellerEnt" && (t["class"] = t.cLevel1 || t.cLevel2, t.sep = t.arValue && t["class"] ? "|" : ""), t.originName = t.nick || t.name || t.cs || t.sellerName || t.company_name, t.nick = n.escape(t.originName), t.nameAccount = t.nameAccount || "", t.category = t.category || t.industry1_str || t.industry_str || t.tag || t.subcategory || "", t.reportTag = t.category || "";
			if (t.others_info) {
				var v = {};
				try {
					v = e.parseJSON(t.others_info)
				} catch (a) {
					typeof t["others_info"] == "object" ? v = t.others_info : v = {}
				}
				if (v.address && typeof v.address == "object") {
					var m = v.address;
					t.isSameCity ? t.address = (m.district || m.city || "") + (m.street || "") : t.address = (m.province || "") + (m.city || "") + (m.district || "") + (m.street || ""), m.province.match(/上海|北京|重庆|天津|香港|澳门/) ? m.prov = m.province : m.prov = m.city
				}
				t.biz_scope = n.escape(v.service_area) || t.biz_scope || m && m.prov || t.prov || "", t.address = n.escape(t.address) || "", t.tel = n.escape(v.tel) || "";
				switch (t.source) {
				case 2:
					break;
				case 8:
					t.avatar = v.logo_url || s[u[t.defaultAvatarType]];
					break;
				case 9:
					switch (t.specialSourceType) {
					case 1:
						t.location = t.location || v.address || "", t.jumpurl = v.jump_url || "", t.sign = t.sign || v.notice || "", t.avatar100 = v.service_logo100, t.avatar270 = v.service_pic270;
						break;
					case 2:
						t.avatar = v.service_img, t.nick = v.service_name || "", t.sign = t.sign || v.service_desc || ""
					}
				}
			}
			return t.sellerIDCounter = ++i, e.seller.sellersContainer[t.sellerIDCounter] = t, t.sign = n.escape(t.sign), t.sign = t.sign.trim(), t.color && t.nick ? t.nameShow = !0 : t.nameShow = !1, t.originalName = t.nick, t.originalSign = t.sign, t.originalSign && t.originalSign.length > 200 && (t.originalSign = t.originalSign.substr(0, 200), t.originalSign += "..."), t.shortSign = n.escape(t.shortSign), r && n.generateRedWords(t, r, ["nick", "sign", "category"]), t.dataSource || (t.dataSource = t.type), t.dataSource === "gdt" && (t.jtype === 4 ? (t.jumpurl = t.trl, t.jumpurl += "&fuin=" + e.cookie.uin()) : t.jumpurl = t.rl_sec || t.rl, t.reporturl = t.rl, t.originalName = t.nick = "精品推荐", t.category = "推广"), t.wpa_ck && (t.wpa_ck += "&showUserName=" + n.encodeBase64(t.originName)), t
		}, s.reportTag = function(e) {
			if (!e) return;
			n.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind/rcmd/rep",
				dataType: "json",
				data: {
					tags: e,
					ver: t.getVersion()
				},
				success: function(e) {}
			})
		}, e[r] = s
	}), !
	function(e) {
		typeof define == "function" ? define("model/job", ["$", "tools/native", "tools/utils", "tools/cookie"], e) : e($)
	}(function(e, t, n, r) {
		"use strict";
		var i = "job",
			s = {};
		return s.processData = function(e, t) {
			return e.corp_name = n.escape(e.corp_name), e.attr_corp_name = n.escape(e.corp_name), e.edu_level = n.escape(e.edu_level), e.attr_edu_level = n.escape(e.edu_level), e.job_company = n.escape(e.job_company), e.attr_job_company = n.escape(e.job_company), e.work_years = n.escape(e.work_years), e.attr_work_years = n.escape(e.work_years), e.job_address = n.escape(e.job_address), e.attr_job_address = n.escape(e.job_address), e.wpa_ck = e.tencent_url, e
		}, e[i] = s
	}), !
	function(e) {
		typeof define == "function" ? define("widget/xss", [], e) : e()
	}(function() {
		"use strict";

		function y(e, t, n) {
			if (o.test(t)) return "";
			var r = v[e][t],
				i = r && r.regexp,
				s = r && r["default"];
			if (t === "href" || t === "src") {
				u.lastIndex = 0;
				if (u.test(n)) return s || "#";
				a.lastIndex = 0;
				if (a.test(n)) return s || "#";
				h.lastIndex = 0;
				if (!h.test(n)) return s || "#";
				if (i) {
					i.lastIndex = 0;
					if (!i.test(n)) return s || "#"
				}
				return n
			}
			if (r || m[t]) {
				f.lastIndex = 0;
				if (f.test(n)) return s || "";
				l.lastIndex = 0;
				if (l.test(n)) return s || "";
				if (t === "style") {
					c.lastIndex = 0;
					if (c.test(n)) return s || ""
				}
				return n
			}
			return ""
		}
		function b(e, t) {
			return String.fromCharCode(parseInt(t, 10))
		}
		var e = /</g,
			t = />/g,
			n = /"/g,
			r = /<(\/)*([a-zA-Z0-9_:\.\-]+)([^>a-zA-Z0-9_:\.\-]+[^>]*)*>/ig,
			i = /[^>a-zA-Z0-9_:\.\-]*([a-zA-Z0-9_:\.\-]+)=[\"\']?([^\"\'\s>]*)[\"\']?/ig,
			s = /&#([a-zA-Z0-9]*);?/img,
			o = /[^>a-zA-Z0-9_:\.\-]/ig,
			u = /\/\*|\*\//mg,
			a = /^[\s"'`]*((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/ig,
			f = /\/\*|\*\//mg,
			l = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/ig,
			c = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n/ig,
			h = new RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi"),
			p = new RegExp("(?:[^\\'\\\"]|^|s+)((((news|telnet|nttp|file|http|ftp|https)://)|(www\\.))(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*)(?![^<]*</a>)", "gi"),
			d = /^\s|\s$/ig,
			v = {
				h1: {},
				h2: {},
				h3: {},
				h4: {},
				h5: {},
				h6: {},
				hr: {},
				span: {},
				strong: {},
				b: {},
				i: {},
				br: {},
				pre: {},
				code: {},
				a: {
					target: {
						"default": "_blank"
					},
					href: !0,
					title: !0
				},
				img: {
					src: !0,
					alt: !0,
					title: !0,
					rel: !0
				},
				table: {
					border: !0
				},
				tr: {
					rowspan: !0
				},
				td: {
					colspan: !0
				},
				th: {
					colspan: !0
				},
				tbody: {},
				thead: {},
				ul: {},
				li: {},
				ol: {},
				dl: {},
				dt: {},
				em: {},
				cite: {},
				section: {},
				header: {},
				footer: {},
				blockquote: {},
				audio: {
					autoplay: !0,
					controls: !0,
					loop: !0,
					preload: !0,
					src: !0
				},
				video: {
					autoplay: !0,
					controls: !0,
					loop: !0,
					preload: !0,
					src: !0
				}
			},
			m = {
				width: !0,
				height: !0,
				style: !0
			},
			g = function(e) {
				if (!e) return !0;
				for (var t in e) return !1;
				return !0
			},
			w = function(n, s) {
				var o = {},
					u = 0,
					a = {};
				r.lastIndex = 0, n = n.replace(r, function() {
					var e = arguments[2] || "";
					e = e.toLowerCase();
					var t = v[e];
					if (!e || !t) return arguments[0] || "";
					if (arguments[1]) return a[e] && a[e].length ? (a[e].pop(), a[e].length || delete a[e], o[u] = "</" + arguments[2] + ">", "{%DataIndex_" + u+++"%}") : "</" + arguments[2] + ">";
					var n = (arguments[3] || "").replace(d, "");
					(n === "/" || !n) && !g(t) && (arguments[0] || "");
					if (n) {
						i.lastIndex = 0;
						if (i.test(n)) {
							i.lastIndex = 0;
							var r = [];
							n.replace(i, function() {
								var t = arguments[1].toLowerCase(),
									n = arguments[2],
									i = y(e, t, n);
								r.push(i ? " " + t + '="' + i + '"' : "")
							}), n = r.join("")
						} else n = ""
					}
					return (n === "/" || !n) && !g(t) ? arguments[0] || "" : (a[e] || (a[e] = []), a[e].push(e), o[u] = "<" + e + (n ? " " + n : "") + ">", "{%DataIndex_" + u+++"%}")
				}), s || (n = n.replace(e, "&lt;").replace(t, "&gt;")), n = n.replace(/\{\%DataIndex_(\d+)\%\}/ig, function() {
					return o[arguments[1]] || ""
				}).replace(p, function(e, t, n, r) {
					var i = "";
					e += "", e.length == t.length + 1 && (i = e[0], e = t);
					var s = "";
					return e.indexOf("://") == -1 ? s = "http://" + e : s = e, i + '<a href="' + s + '" target="_blank">' + e + "</a>"
				});
				var f = [];
				for (var l in a) {
					if (l === "img" || l === "br" || l === "p" || l === "hr") continue;
					var c;
					if (c = a[l].length) for (var h = 0; h < c; h++) f.push("</" + l + ">")
				}
				return f.length && (n += f.join("")), n
			};
		return {
			filter: w
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/face", [], e) : e()
	}(function() {
		"use strict";

		function v(n) {
			return n.replace(/\u0014([\s\S])/gi, function(n, r, i, s) {
				var o = t[parseInt(m(r))];
				return o ? e.code2Img(y(o)) : n
			})
		}
		function m(e) {
			return e ? e.charCodeAt(0) : e
		}
		function g(e) {
			for (var t = 0; t < l.length; t++) e = e.replace(l[t], '<img alt="@" height="24" width="24" src="http://qplus3.idqqimg.com/qun/jslib/res/ios_emoji/' + f[t] + '.png" rel="emoji" name="' + f[t] + '" />');
			return e
		}
		function y(e) {
			return "[/" + e + "]"
		}
		function b(e) {
			var t = "p",
				n = RegExp("<(/?\\s*" + t + ")[^>]*>", "ig");
			return e = e.replace(n, function(e, t, n, r) {
				return t.match(/^\//) ? "\n" : ""
			}), e.replace(/<\/?[^>]*>/gi, "").replace(new RegExp("&nbsp;", "gi"), " ").replace(/\u200B/g, "").replace(/(\r\n|\n|\r)$/g, "")
		}
		function w(e) {
			return e.replace(/<img.+?\/?>/gi, function(e, t, n) {
				var r = e.match(/alt="(\[\/[\u4e00-\u9fa5OKN]{1,3}\])"/);
				return r ? r[1] : e
			})
		}
		function E(e) {
			return String.fromCharCode(i) + String.fromCharCode(e)
		}
		var e = {},
			t = null,
			n = null,
			r = null,
			i = 20,
			s = "",
			o = {
				"呲牙": {
					text: "呲牙",
					code: 0
				},
				"调皮": {
					text: "调皮",
					code: 1
				},
				"流汗": {
					text: "流汗",
					code: 2
				},
				"偷笑": {
					text: "偷笑",
					code: 3
				},
				"再见": {
					text: "再见",
					code: 4
				},
				"敲打": {
					text: "敲打",
					code: 5
				},
				"擦汗": {
					text: "擦汗",
					code: 6
				},
				"猪头": {
					text: "猪头",
					code: 7
				},
				"玫瑰": {
					text: "玫瑰",
					code: 8
				},
				"流泪": {
					text: "流泪",
					code: 9
				},
				"大哭": {
					text: "大哭",
					code: 1e3
				},
				"嘘": {
					text: "嘘",
					code: 11
				},
				"酷": {
					text: "酷",
					code: 12
				},
				"抓狂": {
					text: "抓狂",
					code: 1300
				},
				"委屈": {
					text: "委屈",
					code: 14
				},
				"便便": {
					text: "便便",
					code: 15
				},
				"炸弹": {
					text: "炸弹",
					code: 16
				},
				"菜刀": {
					text: "菜刀",
					code: 17
				},
				"可爱": {
					text: "可爱",
					code: 18
				},
				"色": {
					text: "色",
					code: 19
				},
				"害羞": {
					text: "害羞",
					code: 20
				},
				"得意": {
					text: "得意",
					code: 21
				},
				"吐": {
					text: "吐",
					code: 22
				},
				"微笑": {
					text: "微笑",
					code: 23
				},
				"发怒": {
					text: "发怒",
					code: 24
				},
				"尴尬": {
					text: "尴尬",
					code: 25
				},
				"惊恐": {
					text: "惊恐",
					code: 26
				},
				"冷汗": {
					text: "冷汗",
					code: 27
				},
				"爱心": {
					text: "爱心",
					code: 28
				},
				"示爱": {
					text: "示爱",
					code: 29
				},
				"白眼": {
					text: "白眼",
					code: 30
				},
				"傲慢": {
					text: "傲慢",
					code: 31
				},
				"难过": {
					text: "难过",
					code: 32
				},
				"惊讶": {
					text: "惊讶",
					code: 33
				},
				"疑问": {
					text: "疑问",
					code: 34
				},
				"睡": {
					text: "睡",
					code: 35
				},
				"亲亲": {
					text: "亲亲",
					code: 36
				},
				"憨笑": {
					text: "憨笑",
					code: 37
				},
				"爱情": {
					text: "爱情",
					code: 38
				},
				"衰": {
					text: "衰",
					code: 39
				},
				"撇嘴": {
					text: "撇嘴",
					code: 40
				},
				"阴险": {
					text: "阴险",
					code: 41
				},
				"奋斗": {
					text: "奋斗",
					code: 42
				},
				"发呆": {
					text: "发呆",
					code: 43
				},
				"右哼哼": {
					text: "右哼哼",
					code: 44
				},
				"拥抱": {
					text: "拥抱",
					code: 45
				},
				"坏笑": {
					text: "坏笑",
					code: 46
				},
				"飞吻": {
					text: "飞吻",
					code: 47
				},
				"鄙视": {
					text: "鄙视",
					code: 48
				},
				"晕": {
					text: "晕",
					code: 49
				},
				"大兵": {
					text: "大兵",
					code: 50
				},
				"可怜": {
					text: "可怜",
					code: 51
				},
				"强": {
					text: "强",
					code: 52
				},
				"弱": {
					text: "弱",
					code: 53
				},
				"握手": {
					text: "握手",
					code: 54
				},
				"胜利": {
					text: "胜利",
					code: 55
				},
				"抱拳": {
					text: "抱拳",
					code: 56
				},
				"凋谢": {
					text: "凋谢",
					code: 57
				},
				"饭": {
					text: "饭",
					code: 58
				},
				"蛋糕": {
					text: "蛋糕",
					code: 59
				},
				"西瓜": {
					text: "西瓜",
					code: 60
				},
				"啤酒": {
					text: "啤酒",
					code: 61
				},
				"瓢虫": {
					text: "瓢虫",
					code: 62
				},
				"勾引": {
					text: "勾引",
					code: 63
				},
				OK: {
					text: "OK",
					code: 64
				},
				"爱你": {
					text: "爱你",
					code: 65
				},
				"咖啡": {
					text: "咖啡",
					code: 66
				},
				"钱": {
					text: "钱",
					code: 67
				},
				"月亮": {
					text: "月亮",
					code: 68
				},
				"美女": {
					text: "美女",
					code: 69
				},
				"刀": {
					text: "刀",
					code: 70
				},
				"发抖": {
					text: "发抖",
					code: 71
				},
				"差劲": {
					text: "差劲",
					code: 72
				},
				"拳头": {
					text: "拳头",
					code: 73
				},
				"心碎": {
					text: "心碎",
					code: 74
				},
				"太阳": {
					text: "太阳",
					code: 75
				},
				"礼物": {
					text: "礼物",
					code: 76
				},
				"足球": {
					text: "足球",
					code: 77
				},
				"骷髅": {
					text: "骷髅",
					code: 78
				},
				"挥手": {
					text: "挥手",
					code: 79
				},
				"闪电": {
					text: "闪电",
					code: 80
				},
				"饥饿": {
					text: "饥饿",
					code: 81
				},
				"困": {
					text: "困",
					code: 82
				},
				"咒骂": {
					text: "咒骂",
					code: 83
				},
				"折磨": {
					text: "折磨",
					code: 84
				},
				"抠鼻": {
					text: "抠鼻",
					code: 85
				},
				"鼓掌": {
					text: "鼓掌",
					code: 86
				},
				"糗大了": {
					text: "糗大了",
					code: 87
				},
				"左哼哼": {
					text: "左哼哼",
					code: 88
				},
				"哈欠": {
					text: "哈欠",
					code: 89
				},
				"快哭了": {
					text: "快哭了",
					code: 90
				},
				"吓": {
					text: "吓",
					code: 91
				},
				"篮球": {
					text: "篮球",
					code: 92
				},
				"乒乓": {
					text: "乒乓",
					code: 93
				},
				NO: {
					text: "NO",
					code: 94
				},
				"跳跳": {
					text: "跳跳",
					code: 95
				},
				"怄火": {
					text: "怄火",
					code: 96
				},
				"转圈": {
					text: "转圈",
					code: 97
				},
				"磕头": {
					text: "磕头",
					code: 98
				},
				"回头": {
					text: "回头",
					code: 99
				},
				"跳绳": {
					text: "跳绳",
					code: 100
				},
				"激动": {
					text: "激动",
					code: 101
				},
				"街舞": {
					text: "街舞",
					code: 102
				},
				"献吻": {
					text: "献吻",
					code: 103
				},
				"左太极": {
					text: "左太极",
					code: 104
				},
				"右太极": {
					text: "右太极",
					code: 105
				},
				"闭嘴": {
					text: "闭嘴",
					code: 106
				},
				"招财进宝": {
					text: "招财进宝",
					code: 107
				},
				"双喜": {
					text: "双喜",
					code: 108
				},
				"鞭炮": {
					text: "鞭炮",
					code: 109
				},
				"灯笼": {
					text: "灯笼",
					code: 110
				},
				"发财": {
					text: "发财",
					code: 111
				},
				"K歌": {
					text: "K歌",
					code: 112
				},
				"购物": {
					text: "购物",
					code: 113
				},
				"邮件": {
					text: "邮件",
					code: 114
				},
				"帅": {
					text: "帅",
					code: 115
				},
				"嘴唇": {
					text: "嘴唇",
					code: 116
				},
				"祈祷": {
					text: "祈祷",
					code: 117
				},
				"爆筋": {
					text: "爆筋",
					code: 118
				},
				"棒棒糖": {
					text: "棒棒糖",
					code: 119
				},
				"喝奶": {
					text: "喝奶",
					code: 120
				},
				"下面": {
					text: "下面",
					code: 121
				},
				"香蕉": {
					text: "香蕉",
					code: 122
				},
				"飞机": {
					text: "飞机",
					code: 123
				},
				"开车": {
					text: "开车",
					code: 124
				},
				"高铁左车头": {
					text: "高铁左车头",
					code: 125
				},
				"车厢": {
					text: "车厢",
					code: 126
				},
				"高铁右车头": {
					text: "高铁右车头",
					code: 127
				},
				"多云": {
					text: "多云",
					code: 128
				},
				"下雨": {
					text: "下雨",
					code: 129
				},
				"钞票": {
					text: "钞票",
					code: 130
				},
				"熊猫": {
					text: "熊猫",
					code: 131
				},
				"灯泡": {
					text: "灯泡",
					code: 132
				},
				"风车": {
					text: "风车",
					code: 133
				},
				"闹钟": {
					text: "闹钟",
					code: 134
				},
				"打伞": {
					text: "打伞",
					code: 135
				},
				"彩球": {
					text: "彩球",
					code: 136
				},
				"钻戒": {
					text: "钻戒",
					code: 137
				},
				"沙发": {
					text: "沙发",
					code: 138
				},
				"纸巾": {
					text: "纸巾",
					code: 139
				},
				"药": {
					text: "药",
					code: 140
				},
				"手枪": {
					text: "手枪",
					code: 141
				},
				"青蛙": {
					text: "青蛙",
					code: 142
				}
			},
			u = ["口红", "钻戒", "靴子", "灯笼", "灯泡", "点滴", "电视机", "照相机", "风车", "公文包", "购物袋", "海魂衫", "红领巾", "蝴蝶结", "皇冠", "火车头", "火箭", "酒杯", "蜡烛", "八爪鱼", "燕子", "小猫", "猫头鹰", "毛毛虫", "麋鹿", "鸭子", "小鸡", "青蛙", "乌龟", "熊猫", "棕熊", "牛奶", "苹果", "樱桃", "桃子", "橘子", "西瓜", "草莓", "巧克力冰棒", "鸡腿", "太阳", "彩虹", "浮云", "多云", "小雨", "中雨", "大雨", "雪花", "月圆", "汽车", "木马", "闹钟", "铅笔", "雨伞", "沙发", "手柄", "UFO", "醋坛", "孙悟空", "唐僧", "天使", "恶魔", "招财猫", "娃娃头", "卫生纸", "仙人球", "香烟", "烟斗", "板砖", "蝙蝠", "幽灵", "南瓜灯"],
			a = e.wording = ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "可爱", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "大兵", "奋斗", "咒骂", "疑问", "嘘", "晕", "折磨", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "挥手", "激动", "街舞", "献吻", "左太极", "右太极"];
		e.wording[116] = "示爱";
		var f = ["0x00A9", "0x00AE", "0x203C", "0x2049", "0x2122", "0x2139", "0x2194", "0x2195", "0x2196", "0x2197", "0x2198", "0x2199", "0x21A9", "0x21AA", "0x231A", "0x231B", "0x23E9", "0x23EA", "0x23EB", "0x23EC", "0x23F0", "0x23F3", "0x24C2", "0x25AA", "0x25AB", "0x25B6", "0x25C0", "0x25FB", "0x25FC", "0x25FD", "0x25FE", "0x2600", "0x2601", "0x260E", "0x2611", "0x2614", "0x2615", "0x261D", "0x263A", "0x2648", "0x2649", "0x264A", "0x264B", "0x264C", "0x264D", "0x264E", "0x264F", "0x2650", "0x2651", "0x2652", "0x2653", "0x2660", "0x2663", "0x2665", "0x2666", "0x2668", "0x267B", "0x267F", "0x2693", "0x26A0", "0x26A1", "0x26AA", "0x26AB", "0x26BD", "0x26BE", "0x26C4", "0x26C5", "0x26CE", "0x26D4", "0x26EA", "0x26F2", "0x26F3", "0x26F5", "0x26FA", "0x26FD", "0x2702", "0x2705", "0x2708", "0x2709", "0x270A", "0x270B", "0x270C", "0x270F", "0x2712", "0x2714", "0x2716", "0x2728", "0x2733", "0x2734", "0x2744", "0x2747", "0x274C", "0x274E", "0x2753", "0x2754", "0x2755", "0x2757", "0x2764", "0x2795", "0x2796", "0x2797", "0x27A1", "0x27B0", "0x27BF", "0x2934", "0x2935", "0x2B05", "0x2B06", "0x2B07", "0x2B1B", "0x2B1C", "0x2B50", "0x2B55", "0x3030", "0x303D", "0x3297", "0x3299", "0xD83C0xDC04", "0xD83C0xDCCF", "0xD83C0xDD70", "0xD83C0xDD71", "0xD83C0xDD7E", "0xD83C0xDD7F", "0xD83C0xDD8E", "0xD83C0xDD91", "0xD83C0xDD92", "0xD83C0xDD93", "0xD83C0xDD94", "0xD83C0xDD95", "0xD83C0xDD96", "0xD83C0xDD97", "0xD83C0xDD98", "0xD83C0xDD99", "0xD83C0xDD9A", "0xD83C0xDE01", "0xD83C0xDE02", "0xD83C0xDE1A", "0xD83C0xDE2F", "0xD83C0xDE32", "0xD83C0xDE33", "0xD83C0xDE34", "0xD83C0xDE35", "0xD83C0xDE36", "0xD83C0xDE37", "0xD83C0xDE38", "0xD83C0xDE39", "0xD83C0xDE3A", "0xD83C0xDE50", "0xD83C0xDE51", "0xD83C0xDF00", "0xD83C0xDF01", "0xD83C0xDF02", "0xD83C0xDF03", "0xD83C0xDF04", "0xD83C0xDF05", "0xD83C0xDF06", "0xD83C0xDF07", "0xD83C0xDF08", "0xD83C0xDF09", "0xD83C0xDF0A", "0xD83C0xDF0B", "0xD83C0xDF0C", "0xD83C0xDF0D", "0xD83C0xDF0E", "0xD83C0xDF0F", "0xD83C0xDF10", "0xD83C0xDF11", "0xD83C0xDF12", "0xD83C0xDF13", "0xD83C0xDF14", "0xD83C0xDF15", "0xD83C0xDF16", "0xD83C0xDF17", "0xD83C0xDF18", "0xD83C0xDF19", "0xD83C0xDF1A", "0xD83C0xDF1B", "0xD83C0xDF1C", "0xD83C0xDF1D", "0xD83C0xDF1E", "0xD83C0xDF1F", "0xD83C0xDF30", "0xD83C0xDF31", "0xD83C0xDF32", "0xD83C0xDF33", "0xD83C0xDF34", "0xD83C0xDF35", "0xD83C0xDF37", "0xD83C0xDF38", "0xD83C0xDF39", "0xD83C0xDF3A", "0xD83C0xDF3B", "0xD83C0xDF3C", "0xD83C0xDF3D", "0xD83C0xDF3E", "0xD83C0xDF3F", "0xD83C0xDF40", "0xD83C0xDF41", "0xD83C0xDF42", "0xD83C0xDF43", "0xD83C0xDF44", "0xD83C0xDF45", "0xD83C0xDF46", "0xD83C0xDF47", "0xD83C0xDF48", "0xD83C0xDF49", "0xD83C0xDF4A", "0xD83C0xDF4B", "0xD83C0xDF4C", "0xD83C0xDF4D", "0xD83C0xDF4E", "0xD83C0xDF4F", "0xD83C0xDF50", "0xD83C0xDF51", "0xD83C0xDF52", "0xD83C0xDF53", "0xD83C0xDF54", "0xD83C0xDF55", "0xD83C0xDF56", "0xD83C0xDF57", "0xD83C0xDF58", "0xD83C0xDF59", "0xD83C0xDF5A", "0xD83C0xDF5B", "0xD83C0xDF5C", "0xD83C0xDF5D", "0xD83C0xDF5E", "0xD83C0xDF5F", "0xD83C0xDF60", "0xD83C0xDF61", "0xD83C0xDF62", "0xD83C0xDF63", "0xD83C0xDF64", "0xD83C0xDF65", "0xD83C0xDF66", "0xD83C0xDF67", "0xD83C0xDF68", "0xD83C0xDF69", "0xD83C0xDF6A", "0xD83C0xDF6B", "0xD83C0xDF6C", "0xD83C0xDF6D", "0xD83C0xDF6E", "0xD83C0xDF6F", "0xD83C0xDF70", "0xD83C0xDF71", "0xD83C0xDF72", "0xD83C0xDF73", "0xD83C0xDF74", "0xD83C0xDF75", "0xD83C0xDF76", "0xD83C0xDF77", "0xD83C0xDF78", "0xD83C0xDF79", "0xD83C0xDF7A", "0xD83C0xDF7B", "0xD83C0xDF7C", "0xD83C0xDF80", "0xD83C0xDF81", "0xD83C0xDF82", "0xD83C0xDF83", "0xD83C0xDF84", "0xD83C0xDF85", "0xD83C0xDF86", "0xD83C0xDF87", "0xD83C0xDF88", "0xD83C0xDF89", "0xD83C0xDF8A", "0xD83C0xDF8B", "0xD83C0xDF8C", "0xD83C0xDF8D", "0xD83C0xDF8E", "0xD83C0xDF8F", "0xD83C0xDF90", "0xD83C0xDF91", "0xD83C0xDF92", "0xD83C0xDF93", "0xD83C0xDFA0", "0xD83C0xDFA1", "0xD83C0xDFA2", "0xD83C0xDFA3", "0xD83C0xDFA4", "0xD83C0xDFA5", "0xD83C0xDFA6", "0xD83C0xDFA7", "0xD83C0xDFA8", "0xD83C0xDFA9", "0xD83C0xDFAA", "0xD83C0xDFAB", "0xD83C0xDFAC", "0xD83C0xDFAD", "0xD83C0xDFAE", "0xD83C0xDFAF", "0xD83C0xDFB0", "0xD83C0xDFB1", "0xD83C0xDFB2", "0xD83C0xDFB3", "0xD83C0xDFB4", "0xD83C0xDFB5", "0xD83C0xDFB6", "0xD83C0xDFB7", "0xD83C0xDFB8", "0xD83C0xDFB9", "0xD83C0xDFBA", "0xD83C0xDFBB", "0xD83C0xDFBC", "0xD83C0xDFBD", "0xD83C0xDFBE", "0xD83C0xDFBF", "0xD83C0xDFC0", "0xD83C0xDFC1", "0xD83C0xDFC2", "0xD83C0xDFC3", "0xD83C0xDFC4", "0xD83C0xDFC6", "0xD83C0xDFC7", "0xD83C0xDFC8", "0xD83C0xDFC9", "0xD83C0xDFCA", "0xD83C0xDFE0", "0xD83C0xDFE1", "0xD83C0xDFE2", "0xD83C0xDFE3", "0xD83C0xDFE4", "0xD83C0xDFE5", "0xD83C0xDFE6", "0xD83C0xDFE7", "0xD83C0xDFE8", "0xD83C0xDFE9", "0xD83C0xDFEA", "0xD83C0xDFEB", "0xD83C0xDFEC", "0xD83C0xDFED", "0xD83C0xDFEE", "0xD83C0xDFEF", "0xD83C0xDFF0", "0xD83D0xDC00", "0xD83D0xDC01", "0xD83D0xDC02", "0xD83D0xDC03", "0xD83D0xDC04", "0xD83D0xDC05", "0xD83D0xDC06", "0xD83D0xDC07", "0xD83D0xDC08", "0xD83D0xDC09", "0xD83D0xDC0A", "0xD83D0xDC0B", "0xD83D0xDC0C", "0xD83D0xDC0D", "0xD83D0xDC0E", "0xD83D0xDC0F", "0xD83D0xDC10", "0xD83D0xDC11", "0xD83D0xDC12", "0xD83D0xDC13", "0xD83D0xDC14", "0xD83D0xDC15", "0xD83D0xDC16", "0xD83D0xDC17", "0xD83D0xDC18", "0xD83D0xDC19", "0xD83D0xDC1A", "0xD83D0xDC1B", "0xD83D0xDC1C", "0xD83D0xDC1D", "0xD83D0xDC1E", "0xD83D0xDC1F", "0xD83D0xDC20", "0xD83D0xDC21", "0xD83D0xDC22", "0xD83D0xDC23", "0xD83D0xDC24", "0xD83D0xDC25", "0xD83D0xDC26", "0xD83D0xDC27", "0xD83D0xDC28", "0xD83D0xDC29", "0xD83D0xDC2A", "0xD83D0xDC2B", "0xD83D0xDC2C", "0xD83D0xDC2D", "0xD83D0xDC2E", "0xD83D0xDC2F", "0xD83D0xDC30", "0xD83D0xDC31", "0xD83D0xDC32", "0xD83D0xDC33", "0xD83D0xDC34", "0xD83D0xDC35", "0xD83D0xDC36", "0xD83D0xDC37", "0xD83D0xDC38", "0xD83D0xDC39", "0xD83D0xDC3A", "0xD83D0xDC3B", "0xD83D0xDC3C", "0xD83D0xDC3D", "0xD83D0xDC3E", "0xD83D0xDC40", "0xD83D0xDC42", "0xD83D0xDC43", "0xD83D0xDC44", "0xD83D0xDC45", "0xD83D0xDC46", "0xD83D0xDC47", "0xD83D0xDC48", "0xD83D0xDC49", "0xD83D0xDC4A", "0xD83D0xDC4B", "0xD83D0xDC4C", "0xD83D0xDC4D", "0xD83D0xDC4E", "0xD83D0xDC4F", "0xD83D0xDC50", "0xD83D0xDC51", "0xD83D0xDC52", "0xD83D0xDC53", "0xD83D0xDC54", "0xD83D0xDC55", "0xD83D0xDC56", "0xD83D0xDC57", "0xD83D0xDC58", "0xD83D0xDC59", "0xD83D0xDC5A", "0xD83D0xDC5B", "0xD83D0xDC5C", "0xD83D0xDC5D", "0xD83D0xDC5E", "0xD83D0xDC5F", "0xD83D0xDC60", "0xD83D0xDC61", "0xD83D0xDC62", "0xD83D0xDC63", "0xD83D0xDC64", "0xD83D0xDC65", "0xD83D0xDC66", "0xD83D0xDC67", "0xD83D0xDC68", "0xD83D0xDC69", "0xD83D0xDC6A", "0xD83D0xDC6B", "0xD83D0xDC6C", "0xD83D0xDC6D", "0xD83D0xDC6E", "0xD83D0xDC6F", "0xD83D0xDC70", "0xD83D0xDC71", "0xD83D0xDC72", "0xD83D0xDC73", "0xD83D0xDC74", "0xD83D0xDC75", "0xD83D0xDC76", "0xD83D0xDC77", "0xD83D0xDC78", "0xD83D0xDC79", "0xD83D0xDC7A", "0xD83D0xDC7B", "0xD83D0xDC7C", "0xD83D0xDC7D", "0xD83D0xDC7E", "0xD83D0xDC7F", "0xD83D0xDC80", "0xD83D0xDC81", "0xD83D0xDC82", "0xD83D0xDC83", "0xD83D0xDC84", "0xD83D0xDC85", "0xD83D0xDC86", "0xD83D0xDC87", "0xD83D0xDC88", "0xD83D0xDC89", "0xD83D0xDC8A", "0xD83D0xDC8B", "0xD83D0xDC8C", "0xD83D0xDC8D", "0xD83D0xDC8E", "0xD83D0xDC8F", "0xD83D0xDC90", "0xD83D0xDC91", "0xD83D0xDC92", "0xD83D0xDC93", "0xD83D0xDC94", "0xD83D0xDC95", "0xD83D0xDC96", "0xD83D0xDC97", "0xD83D0xDC98", "0xD83D0xDC99", "0xD83D0xDC9A", "0xD83D0xDC9B", "0xD83D0xDC9C", "0xD83D0xDC9D", "0xD83D0xDC9E", "0xD83D0xDC9F", "0xD83D0xDCA0", "0xD83D0xDCA1", "0xD83D0xDCA2", "0xD83D0xDCA3", "0xD83D0xDCA4", "0xD83D0xDCA5", "0xD83D0xDCA6", "0xD83D0xDCA7", "0xD83D0xDCA8", "0xD83D0xDCA9", "0xD83D0xDCAA", "0xD83D0xDCAB", "0xD83D0xDCAC", "0xD83D0xDCAD", "0xD83D0xDCAE", "0xD83D0xDCAF", "0xD83D0xDCB0", "0xD83D0xDCB1", "0xD83D0xDCB2", "0xD83D0xDCB3", "0xD83D0xDCB4", "0xD83D0xDCB5", "0xD83D0xDCB6", "0xD83D0xDCB7", "0xD83D0xDCB8", "0xD83D0xDCB9", "0xD83D0xDCBA", "0xD83D0xDCBB", "0xD83D0xDCBC", "0xD83D0xDCBD", "0xD83D0xDCBE", "0xD83D0xDCBF", "0xD83D0xDCC0", "0xD83D0xDCC1", "0xD83D0xDCC2", "0xD83D0xDCC3", "0xD83D0xDCC4", "0xD83D0xDCC5", "0xD83D0xDCC6", "0xD83D0xDCC7", "0xD83D0xDCC8", "0xD83D0xDCC9", "0xD83D0xDCCA", "0xD83D0xDCCB", "0xD83D0xDCCC", "0xD83D0xDCCD", "0xD83D0xDCCE", "0xD83D0xDCCF", "0xD83D0xDCD0", "0xD83D0xDCD1", "0xD83D0xDCD2", "0xD83D0xDCD3", "0xD83D0xDCD4", "0xD83D0xDCD5", "0xD83D0xDCD6", "0xD83D0xDCD7", "0xD83D0xDCD8", "0xD83D0xDCD9", "0xD83D0xDCDA", "0xD83D0xDCDB", "0xD83D0xDCDC", "0xD83D0xDCDD", "0xD83D0xDCDE", "0xD83D0xDCDF", "0xD83D0xDCE0", "0xD83D0xDCE1", "0xD83D0xDCE2", "0xD83D0xDCE3", "0xD83D0xDCE4", "0xD83D0xDCE5", "0xD83D0xDCE6", "0xD83D0xDCE7", "0xD83D0xDCE8", "0xD83D0xDCE9", "0xD83D0xDCEA", "0xD83D0xDCEB", "0xD83D0xDCEC", "0xD83D0xDCED", "0xD83D0xDCEE", "0xD83D0xDCEF", "0xD83D0xDCF0", "0xD83D0xDCF1", "0xD83D0xDCF2", "0xD83D0xDCF3", "0xD83D0xDCF4", "0xD83D0xDCF5", "0xD83D0xDCF6", "0xD83D0xDCF7", "0xD83D0xDCF9", "0xD83D0xDCFA", "0xD83D0xDCFB", "0xD83D0xDCFC", "0xD83D0xDD00", "0xD83D0xDD01", "0xD83D0xDD02", "0xD83D0xDD03", "0xD83D0xDD04", "0xD83D0xDD05", "0xD83D0xDD06", "0xD83D0xDD07", "0xD83D0xDD09", "0xD83D0xDD0A", "0xD83D0xDD0B", "0xD83D0xDD0C", "0xD83D0xDD0D", "0xD83D0xDD0E", "0xD83D0xDD0F", "0xD83D0xDD10", "0xD83D0xDD11", "0xD83D0xDD12", "0xD83D0xDD13", "0xD83D0xDD14", "0xD83D0xDD15", "0xD83D0xDD16", "0xD83D0xDD17", "0xD83D0xDD18", "0xD83D0xDD19", "0xD83D0xDD1A", "0xD83D0xDD1B", "0xD83D0xDD1C", "0xD83D0xDD1D", "0xD83D0xDD1E", "0xD83D0xDD1F", "0xD83D0xDD20", "0xD83D0xDD21", "0xD83D0xDD22", "0xD83D0xDD23", "0xD83D0xDD24", "0xD83D0xDD25", "0xD83D0xDD26", "0xD83D0xDD27", "0xD83D0xDD28", "0xD83D0xDD29", "0xD83D0xDD2A", "0xD83D0xDD2B", "0xD83D0xDD2C", "0xD83D0xDD2D", "0xD83D0xDD2E", "0xD83D0xDD2F", "0xD83D0xDD30", "0xD83D0xDD31", "0xD83D0xDD32", "0xD83D0xDD33", "0xD83D0xDD34", "0xD83D0xDD35", "0xD83D0xDD36", "0xD83D0xDD37", "0xD83D0xDD38", "0xD83D0xDD39", "0xD83D0xDD3A", "0xD83D0xDD3B", "0xD83D0xDD3C", "0xD83D0xDD3D", "0xD83D0xDD50", "0xD83D0xDD51", "0xD83D0xDD52", "0xD83D0xDD53", "0xD83D0xDD54", "0xD83D0xDD55", "0xD83D0xDD56", "0xD83D0xDD57", "0xD83D0xDD58", "0xD83D0xDD59", "0xD83D0xDD5A", "0xD83D0xDD5B", "0xD83D0xDD5C", "0xD83D0xDD5D", "0xD83D0xDD5E", "0xD83D0xDD5F", "0xD83D0xDD60", "0xD83D0xDD61", "0xD83D0xDD62", "0xD83D0xDD63", "0xD83D0xDD64", "0xD83D0xDD65", "0xD83D0xDD66", "0xD83D0xDD67", "0xD83D0xDDFB", "0xD83D0xDDFC", "0xD83D0xDDFD", "0xD83D0xDDFE", "0xD83D0xDDFF", "0xD83D0xDE00", "0xD83D0xDE01", "0xD83D0xDE02", "0xD83D0xDE03", "0xD83D0xDE04", "0xD83D0xDE05", "0xD83D0xDE06", "0xD83D0xDE07", "0xD83D0xDE08", "0xD83D0xDE09", "0xD83D0xDE0A", "0xD83D0xDE0B", "0xD83D0xDE0C", "0xD83D0xDE0D", "0xD83D0xDE0E", "0xD83D0xDE0F", "0xD83D0xDE10", "0xD83D0xDE11", "0xD83D0xDE12", "0xD83D0xDE13", "0xD83D0xDE14", "0xD83D0xDE15", "0xD83D0xDE16", "0xD83D0xDE17", "0xD83D0xDE18", "0xD83D0xDE19", "0xD83D0xDE1A", "0xD83D0xDE1B", "0xD83D0xDE1C", "0xD83D0xDE1D", "0xD83D0xDE1E", "0xD83D0xDE1F", "0xD83D0xDE20", "0xD83D0xDE21", "0xD83D0xDE22", "0xD83D0xDE23", "0xD83D0xDE24", "0xD83D0xDE25", "0xD83D0xDE26", "0xD83D0xDE27", "0xD83D0xDE28", "0xD83D0xDE29", "0xD83D0xDE2A", "0xD83D0xDE2B", "0xD83D0xDE2C", "0xD83D0xDE2D", "0xD83D0xDE2E", "0xD83D0xDE2F", "0xD83D0xDE30", "0xD83D0xDE31", "0xD83D0xDE32", "0xD83D0xDE33", "0xD83D0xDE34", "0xD83D0xDE35", "0xD83D0xDE36", "0xD83D0xDE37", "0xD83D0xDE38", "0xD83D0xDE39", "0xD83D0xDE3A", "0xD83D0xDE3B", "0xD83D0xDE3C", "0xD83D0xDE3D", "0xD83D0xDE3E", "0xD83D0xDE3F", "0xD83D0xDE40", "0xD83D0xDE45", "0xD83D0xDE46", "0xD83D0xDE47", "0xD83D0xDE48", "0xD83D0xDE49", "0xD83D0xDE4A", "0xD83D0xDE4B", "0xD83D0xDE4C", "0xD83D0xDE4D", "0xD83D0xDE4E", "0xD83D0xDE4F", "0xD83D0xDE80", "0xD83D0xDE81", "0xD83D0xDE82", "0xD83D0xDE83", "0xD83D0xDE84", "0xD83D0xDE85", "0xD83D0xDE86", "0xD83D0xDE87", "0xD83D0xDE88", "0xD83D0xDE89", "0xD83D0xDE8A", "0xD83D0xDE8C", "0xD83D0xDE8D", "0xD83D0xDE8E", "0xD83D0xDE8F", "0xD83D0xDE90", "0xD83D0xDE91", "0xD83D0xDE92", "0xD83D0xDE93", "0xD83D0xDE94", "0xD83D0xDE95", "0xD83D0xDE96", "0xD83D0xDE97", "0xD83D0xDE98", "0xD83D0xDE99", "0xD83D0xDE9A", "0xD83D0xDE9B", "0xD83D0xDE9C", "0xD83D0xDE9D", "0xD83D0xDE9E", "0xD83D0xDE9F", "0xD83D0xDEA0", "0xD83D0xDEA1", "0xD83D0xDEA2", "0xD83D0xDEA3", "0xD83D0xDEA4", "0xD83D0xDEA5", "0xD83D0xDEA6", "0xD83D0xDEA7", "0xD83D0xDEA8", "0xD83D0xDEA9", "0xD83D0xDEAA", "0xD83D0xDEAB", "0xD83D0xDEAC", "0xD83D0xDEAD", "0xD83D0xDEAE", "0xD83D0xDEAF", "0xD83D0xDEB0", "0xD83D0xDEB1", "0xD83D0xDEB2", "0xD83D0xDEB3", "0xD83D0xDEB4", "0xD83D0xDEB5", "0xD83D0xDEB6", "0xD83D0xDEB7", "0xD83D0xDEB8", "0xD83D0xDEB9", "0xD83D0xDEBA", "0xD83D0xDEBB", "0xD83D0xDEBC", "0xD83D0xDEBD", "0xD83D0xDEBE", "0xD83D0xDEBF", "0xD83D0xDEC0", "0xD83D0xDEC1", "0xD83D0xDEC2", "0xD83D0xDEC3", "0xD83D0xDEC4", "0xD83D0xDEC5", "0x00230x20E3", "0x00300x20E3", "0x00310x20E3", "0x00320x20E3", "0x00330x20E3", "0x00340x20E3", "0x00350x20E3", "0x00360x20E3", "0x00370x20E3", "0x00380x20E3", "0x00390x20E3", "0xD83C0xDDE80xD83C0xDDF3", "0xD83C0xDDE90xD83C0xDDEA", "0xD83C0xDDEA0xD83C0xDDF8", "0xD83C0xDDEB0xD83C0xDDF7", "0xD83C0xDDEC0xD83C0xDDE7", "0xD83C0xDDEE0xD83C0xDDF9", "0xD83C0xDDEF0xD83C0xDDF5", "0xD83C0xDDF00xD83C0xDDF7", "0xD83C0xDDF70xD83C0xDDFA", "0xD83C0xDDFA0xD83C0xDDF8"],
			l = [],
			c = /<img.+?rel="emoji".+?name="([\w]+?)".+?\/?>/gi;
		for (var h = 0; h < f.length; h++) l.push(new RegExp(f[h].replace(/0x/g, "\\u"), "g"));
		(function() {
			n || (n = {}, a.forEach(function(e, t) {
				n[e] = t
			})), r || (r = {}, u.forEach(function(e, t) {
				r[e] = t + 1
			}));
			if (!t) {
				t = [];
				for (var i in o) {
					var s = o[i].code - 0;
					t[s] = i
				}
			}
			window.MOBLIE_FACE_ARRAY = t, window.faceWordingMap = n, window.lnWordingMap = r
		})();
		var p = /\[\/([\u4e00-\u9fa5OKN]{1,3})\]/g;
		e.code2Img = function(e) {
			return e ? e.replace(p, function(e, t) {
				var n = a.indexOf(t);
				return n > -1 ? '<img class="face" title="' + t + '" src="http://0.web.qstatic.com/webqqpic/style/face/' + n + '.gif" alt="' + y(t) + '" rel="face">' : e
			}) : e
		}, e.decodeRichText = function(t) {
			return g(v(e.code2Img(d(t))))
		};
		var d = e.decode = function(e) {
				function s(e, t, n) {
					return !t && !n ? i[e] || e : String.fromCharCode(t || n)
				}
				var t = /&quot;|&lt;|&gt;|&amp;|&nbsp;|&apos;|&#(\d+);|&#(\d+)/g,
					n = /\u00a0/g,
					r = /<br\s*\/?>/ig,
					i = {
						"&quot;": '"',
						"&lt;": "<",
						"&gt;": ">",
						"&amp;": "&",
						"&nbsp;": " "
					};
				return e ? ("" + e).replace(r, "\n").replace(t, s).replace(n, " ") : ""
			};
		return e.getText = function(e) {
			return b(w(e).replace(/(\r\n|\n|\r)/gm, " "))
		}, e.getTextLength = function(e) {
			var t = 0;
			if (e) {
				e = e.replace(/\[\/([\u4e00-\u9fa5OKN]{1,3})\]/g, "吃");
				var n = e.match(/[^\x00-\xff]/g) || [],
					r = e.replace(/[^\x00-\xff]/g, "");
				return n.length + r.length / 3 + .9
			}
			return t
		}, e.faceCode2MoblieCode = function(e) {
			return e.replace(/\[\/([\u4e00-\u9fa5OKN]{1,3})\]/gi, function(e, t, n, r) {
				var i = o[t];
				return i ? E(i.code) : e
			})
		}, e.moblieCode2Text = function(e) {
			return e.replace(/\u0014([\s\S])/gi, function(e, n, r, i) {
				var s = t[parseInt(m(n))];
				return s ? "/" + s : e
			})
		}, e.imgs2MoblieCode = function(t) {
			return t.replace(/<img.+?\/?>/gi, function(t, n, r) {
				var i = t.match(/alt="(\[\/[\u4e00-\u9fa5OKN]{1,3}\])"/);
				return i ? e.faceCode2MoblieCode(i[1]) : t
			})
		}, e.imgs2Code = function(e) {
			return e.replace(c, function(e, t, n, r) {
				var i = t.split("0x"),
					s = [];
				for (var o = 1; o < i.length; o++) s.push(parseInt(i[o], 16));
				return String.fromCharCode.apply(undefined, s)
			})
		}, e
	}), !
	function(e) {
		typeof define == "function" ? define("model/group", ["$", "tools/native", "tools/utils", "tools/cookie", "widget/xss", "widget/face"], e) : e($)
	}(function(e, t, n, r, i, s) {
		"use strict";
		var o = "group",
			u = "http://3.url.cn/qun/search/img/head.png",
			a = "http://3.url.cn/qun/search/img/head2.png",
			f = "http://s.url.cn/qqfind/img/quguagua60-default-avatar.png?t=20131012001",
			l = "http://3.url.cn/qun/search/img/xiaoyou.png",
			c = 0,
			h = {};
		return h.avatars = {}, h.gdtInfos = {}, h.processData = function(e, t) {
			e.gc && (e.code = e.gc, e.face = e.gFace, e.name = e.gName, e.memo = e.gIntro, e.member_num = e.gMemNum, e.max_member_num = e.gMaxMem, e.level = e.gLevel, e["class"] = e.gClass, e.owner_uin = e.gOwner, e.flag = e.gFlag, e.bitmap = e.gBitMap, e.hot = e.gHot), e.url = e.url || e.face_url, e.needpay = (e.app_privilege_flag & 640) === 640 ? !0 : !1, e.url && (e.url = e.url.trim()) ? e.avatar = e.url : (e.avatar = this.avatars[e.code]) ? e.avatar = e.avatar.replace(/40$/, "100") : e.bitmap & 16 ? e.avatar = l : e.flag >= 3 ? e.avatar = a : e.isGuaGua ? e.avatar = f : e.avatar = u, e.bitmap & 64 ? e.lbs = 1 : e.lbs = 0, e.bitmap & 256 ? e["public"] = !0 : e["public"] = !1, e.isGuaGua ? (e.isGuaGua = !0, e.code = e.roomid, e.extparam = e.extparam || "", e.account = r.uin(), e.fuin = r.uin()) : e.isGuaGua = !1, e.flag_ext && (e.flag_ext & 2048 ? e.auth = !0 : e.auth = !1), e.geo && (e.geo = n.escape(e.geo) || ""), !e.longitude && !e.latitude && (e.geo = ""), e.provCity = "";
			if (e.qaddr && e.qaddr != []) {
				typeof e.qaddr == "string" && (e.qaddr = [e.qaddr]), e.provCity = n.escape(e.qaddr.join(""));
				var o = 1,
					c = [
						[]
					];
				e.cityid && (e.cityid >= 10060 && e.cityid <= 10083 || e.cityid >= 10100 && e.cityid <= 10161 || e.cityid >= 10598 && e.cityid <= 10622 || e.cityid >= 11188 && e.cityid <= 11290 || e.cityid >= 11727 && e.cityid <= 12419 || e.cityid >= 12856 && e.cityid <= 15303 || e.cityid >= 15740 && e.cityid <= 15764) && (o = 2), e.city = e.qaddr[e.qaddr.length - o], e.city = e.city && e.city.replace("地区", "")
			}
			e.longitude = e.longitude && parseFloat(e.longitude) || "", e.latitude = e.latitude && parseFloat(e.latitude) || "", e.tag = n.escape(e.tag) || "", e.labelTag = "";
			if (e.labels && e.labels != []) {
				e.tag = "";
				for (var h in e.labels) e.labelTag += ' <span class="grey">|</span> ', e.labelTag += n.escape(e.labels[h].label), e.tag += "|" + e.labels[h].label;
				e.tag = n.escape(e.tag)
			}
			return typeof e.gcate != "undefined" && e.gcate[0] !== "TOP" ? (typeof e.gcate == "string" && (e.gcate = e.gcate.split("|")), e.gcate.splice(2), e.gcate[1] && e.gcate[1] != "其它" && e.gcate[1] != "其他" ? e.className = e.gcate[1] : e.className = e.gcate[0]) : e.className = e.className || "", e.sep = e.className ? "|" : "", e.memo && (e.memo = e.memo.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "")), e.name = n.escape(e.name), e.className = n.escape(e.className), e.memo || (e.memo = "群主很懒，什么都没有留下"), e.originName = e.name, e.originMemo = n.escape(e.memo), e.originClassName = e.className, e.groupId = e.gid || e.code || "", e.memo = e.richfingermemo || "", e.memo = e.memo.replace(/\&lt;div\&gt;/g, "").replace(/\&lt;\/div\&gt;/g, " ").replace(/\&lt;p\&gt;/g, "").replace(/\&lt;\/p\&gt;/g, " ").replace(/\<div\>/g, "").replace(/\<\/div\>/g, " ").replace(/\<p\>/g, "").replace(/\<\/p\>/g, " ").replace(/&/g, "&amp;"), e.memo = i.filter(s.decodeRichText(e.memo)), t && n.generateRedWords(e, t, ["name", "className", "memo"]), e
		}, h.processDatas = function(t) {
			var t = t || {},
				r = t.gdt || {},
				i = r.list || [],
				s = r.infos || {},
				o = t.gList || [];
			return h.gdtInfos = e.extend(h.gdtInfos, s), i.forEach(function(t, n, r) {
				e.extend(t, s[t.uin]), t.isGdt = !0, h.gdtInfos[t.uin].rl = t.rl, r[n] = h.processData(t)
			}), window.setTimeout(n.gdtShowReport, 1e3, i), o.forEach(function(e, t, n) {
				e.isGdt = !1, n[t] = h.processData(e)
			}), i.concat(o)
		}, h.recommend = function(r, i, s) {
			var o = r && r.isHyMain;
			delete r.isHyMain;
			var u = r && r.guaguan || 0;
			delete r.guaguan;
			var a = "http://qun.qq.com/cgi-bin/qunwelcome/recommend";
			r.v7 && (a = "http://cgi.find.qq.com/qqfind/qun/rcmd_v7", delete r.v7);
			var f = +(new Date);
			return n.request({
				type: "POST",
				url: a,
				dataType: "json",
				data: e.extend({
					n: 8,
					st: 1,
					guagua: t.canInvokeGuaGua,
					guaguan: u,
					last_gcode: c,
					v: t.getVersion()
				}, r),
				error: function(t, n, r) {
					var o;
					n === "timeout" ? (s && s(t, "timeout"), o = 6012666) : (s && s(t, n === "error" ? "error" : "parsererror"), n == "parsererror" ? o = 5000002 : (o = "6012", o += t.status));
					if (!s) i && i({
						retcode: o
					});
					else try {
						e.report.mmReport("http://cgi.find.qq.com/qqfind/qun/rcmd_v5", o, +(new Date) - f)
					} catch (u) {}
				},
				success: function(t) {
					try {
						e.report.mmReport("http://cgi.find.qq.com/qqfind/qun/rcmd_v5", t && t.retcode, +(new Date) - f)
					} catch (n) {}
					if (t && t.result && t.result.gList) {
						var r = t.result.gList.length,
							s = t.result.gList[r - 1];
						s && s.gc && (c = s.gc)
					}
					t.result && t.result.gUrls && e.extend(h.avatars, t.result.gUrls), i && i(t)
				}
			})
		}, h.groupUins = function() {
			var e = [],
				t = "";
			return {
				set: function(n, r) {
					return n && n.page === 0 ? (t = n, e = r) : e = e.concat(r), e = e.slice(0, 50), e
				},
				get: function() {
					return e
				}
			}
		}(), h.search = function(r, i, s) {
			if (r.isRecommend) return delete r.isRecommend, r.k && delete r.k, r.iso && delete r.iso, h.recommend(r, function(e) {
				e.result.group = {
					endflag: e.result.isEnd,
					group_list: e.result.gList,
					redwords: [],
					total: 1e3
				}, i(e)
			});
			e.report.bernoulli(11056, r.k);
			var o = +(new Date);
			r.keyword = r.k, delete r.k;
			var u = {
				1: 0,
				2: 1,
				4: 2
			};
			return r.sort = u[r.st], delete r.st, r.wantnum = r.n, delete r.n, r.page = r.p, delete r.p, r.ver = r.v, delete r.v, r.from || (r.from = 1), n.request({
				type: "POST",
				url: "http://qun.qq.com/cgi-bin/group_search/pc_group_search",
				dataType: "json",
				timeout: 3e4,
				data: e.extend({
					k: "交友",
					n: 8,
					st: 1,
					iso: 1,
					src: 0,
					v: t.getVersion(),
					bkn: n.getCSRFToken()
				}, r),
				error: function(t, n, r) {
					var i = 0;
					n === "timeout" ? (s && s(t, "timeout"), i = 666) : n === "error" && (s && s(t, "error"), i = t.status);
					if (!s) this.success({
						retcode: i
					});
					else try {
						e.report.mmReport("http://qun.qq.com/cgi-bin/group_search/pc_group_search", i, +(new Date) - o)
					} catch (u) {}
				},
				success: function(t) {
					t.retcode = t.ec;
					try {
						e.report.mmReport("http://qun.qq.com/cgi-bin/group_search/pc_group_search", t.retcode, +(new Date) - o)
					} catch (n) {}
					i(t), t.retcode === 0 && t.group_list && h.groupUins.set(r, t.group_list.map(function(e) {
						return e.gid
					}))
				}
			})
		}, h.getVideoGroupRecommend = function(e, t, r) {
			return n.request({
				type: "GET",
				url: "http://tiantian.qq.com/cgi-bin/qvideo/get_live_group",
				dataType: "json",
				timeout: 3e4,
				data: {
					keyword: t || "",
					count: e,
					bkn: n.getCSRFToken()
				},
				success: function(e) {
					if (e && e.ec === 0 && e.result) {
						var t = [],
							i = e.result.qun_infos;
						for (var s = 0; s < i.length; s++) t.push({
							avatar: "http://p.qlogo.cn/gh/" + i[s].qun_code + "/" + i[s].qun_code + "/140" || i[s].logo_url,
							name: n.escape(i[s].qun_name),
							member_num: i[s].onlive_num,
							gc: i[s].qun_code,
							tencentStr: i[s].qvideo_url
						});
						r(t)
					}
				}
			})
		}, e[o] = h
	}), define("tmpl!template/singleRoom.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<li class="seller-item', index >= 2 && index <= 5 && (__p += " seller-item-small"), __p += '">\r\n  <div class="image-wrapper" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n    <div class="enter-room">\r\n      <!-- 播放按钮 -->\r\n      <div class="enter-outer">\r\n        <div class="enter-inner">\r\n          <div class="enter-icon"></div>\r\n        </div>\r\n      </div>\r\n      <span>立即进入</span>\r\n    </div>\r\n    <img ', room.pic ? __p += 'src="' + ((__t = room.pic) == null ? "" : $.escape(__t)) + '" onerror="this.src=\'http://find.qq.com/img/seller270-default-avatar.jpg\'"' : __p += 'src="http://find.qq.com/img/seller270-default-avatar.jpg"', __p += ">\r\n    ", index < 2 && room.anchor_label && (__p += '\r\n    <div class="anchor-label">' + ((__t = room.anchor_label) == null ? "" : __t) + "</div>\r\n    "), __p += '\r\n  </div>\r\n  <div class="seller-msg">\r\n    <div class="line1">\r\n      <span class="activity-title" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '" title="进入直播间"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n        <i class="icon-camera-new"></i>\r\n        <span title="' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '">' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '</span>\r\n      </span>\r\n    </div>\r\n    <div class="line2">\r\n      <span class="room-member">\r\n        <i class="icon-group-big"></i>\r\n        <span>' + ((__t = room.group_popularity) == null ? "" : __t) + "人</span>\r\n      </span>\r\n      ";
				if (room.tags) {
					__p += "\r\n      ";
					for (var j in room.tags) {
						__p += "\r\n      ";
						if (j > 2) break;
						__p += '\r\n      <span class="anchor-tag">\r\n        <span class="anchor-tag-inner">' + ((__t = room.tags[j]) == null ? "" : __t) + "</span>\r\n      </span>\r\n      "
					}
					__p += "\r\n      "
				}
				__p += "\r\n    </div>\r\n  </div>\r\n</li>"
			}
			return __p
		}
	}), define("tmpl!template/qiqiRoomList.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<ul class="seller-list">\r\n  ', rooms.forEach(function(room, index) {
				__p += "\r\n    " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) {
						__p += '<li class="seller-item', index >= 2 && index <= 5 && (__p += " seller-item-small"), __p += '">\r\n  <div class="image-wrapper" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n    <div class="enter-room">\r\n      <!-- 播放按钮 -->\r\n      <div class="enter-outer">\r\n        <div class="enter-inner">\r\n          <div class="enter-icon"></div>\r\n        </div>\r\n      </div>\r\n      <span>立即进入</span>\r\n    </div>\r\n    <img ', room.pic ? __p += 'src="' + ((__t = room.pic) == null ? "" : $.escape(__t)) + '" onerror="this.src=\'http://find.qq.com/img/seller270-default-avatar.jpg\'"' : __p += 'src="http://find.qq.com/img/seller270-default-avatar.jpg"', __p += ">\r\n    ", index < 2 && room.anchor_label && (__p += '\r\n    <div class="anchor-label">' + ((__t = room.anchor_label) == null ? "" : __t) + "</div>\r\n    "), __p += '\r\n  </div>\r\n  <div class="seller-msg">\r\n    <div class="line1">\r\n      <span class="activity-title" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '" title="进入直播间"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n        <i class="icon-camera-new"></i>\r\n        <span title="' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '">' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '</span>\r\n      </span>\r\n    </div>\r\n    <div class="line2">\r\n      <span class="room-member">\r\n        <i class="icon-group-big"></i>\r\n        <span>' + ((__t = room.group_popularity) == null ? "" : __t) + "人</span>\r\n      </span>\r\n      ";
						if (room.tags) {
							__p += "\r\n      ";
							for (var j in room.tags) {
								__p += "\r\n      ";
								if (j > 2) break;
								__p += '\r\n      <span class="anchor-tag">\r\n        <span class="anchor-tag-inner">' + ((__t = room.tags[j]) == null ? "" : __t) + "</span>\r\n      </span>\r\n      "
							}
							__p += "\r\n      "
						}
						__p += "\r\n    </div>\r\n  </div>\r\n</li>"
					}
					return __p
				}() + "\r\n  "
			}), __p += "\r\n</ul>";
			return __p
		}
	}), define("tmpl!template/qiqiRoom.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="qiqi-room" hidden>\r\n  <div class="container">\r\n    ', hy == 1 && (__p += '\r\n    <div class="hy-subcategory">\r\n        <div class="back-home" data-coupon-cmd="close" data-overlay="hybrid"\r\n             data-current="fre"><i class="btn-arrow-back"></i> 返回</div>\r\n      <span class="free-activity-title">直播间（首次体验需安装应用）</span>\r\n    </div>\r\n    '), __p += '\r\n    <div class="content-container">\r\n      ' +
			function(obj) {
				var __t, __p = "",
					__j = Array.prototype.join,
					print = function() {
						__p += __j.call(arguments, "")
					};
				with(obj || {}) __p += '<ul class="seller-list">\r\n  ', rooms.forEach(function(room, index) {
					__p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += '<li class="seller-item', index >= 2 && index <= 5 && (__p += " seller-item-small"), __p += '">\r\n  <div class="image-wrapper" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n    <div class="enter-room">\r\n      <!-- 播放按钮 -->\r\n      <div class="enter-outer">\r\n        <div class="enter-inner">\r\n          <div class="enter-icon"></div>\r\n        </div>\r\n      </div>\r\n      <span>立即进入</span>\r\n    </div>\r\n    <img ', room.pic ? __p += 'src="' + ((__t = room.pic) == null ? "" : $.escape(__t)) + '" onerror="this.src=\'http://find.qq.com/img/seller270-default-avatar.jpg\'"' : __p += 'src="http://find.qq.com/img/seller270-default-avatar.jpg"', __p += ">\r\n    ", index < 2 && room.anchor_label && (__p += '\r\n    <div class="anchor-label">' + ((__t = room.anchor_label) == null ? "" : __t) + "</div>\r\n    "), __p += '\r\n  </div>\r\n  <div class="seller-msg">\r\n    <div class="line1">\r\n      <span class="activity-title" data-room-id="' + ((__t = room.group_no) == null ? "" : __t) + '" data-anchor-uin="' + ((__t = room.anchor_uin) == null ? "" : __t) + '" data-short-id="' + ((__t = room.anchor_short_id) == null ? "" : __t) + '" title="进入直播间"', from && (__p += ' data-from="' + ((__t = from) == null ? "" : __t) + '"'), __p += '>\r\n        <i class="icon-camera-new"></i>\r\n        <span title="' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '">' + ((__t = room.anchor_name) == null ? "" : $.escape(__t)) + '</span>\r\n      </span>\r\n    </div>\r\n    <div class="line2">\r\n      <span class="room-member">\r\n        <i class="icon-group-big"></i>\r\n        <span>' + ((__t = room.group_popularity) == null ? "" : __t) + "人</span>\r\n      </span>\r\n      ";
							if (room.tags) {
								__p += "\r\n      ";
								for (var j in room.tags) {
									__p += "\r\n      ";
									if (j > 2) break;
									__p += '\r\n      <span class="anchor-tag">\r\n        <span class="anchor-tag-inner">' + ((__t = room.tags[j]) == null ? "" : __t) + "</span>\r\n      </span>\r\n      "
								}
								__p += "\r\n      "
							}
							__p += "\r\n    </div>\r\n  </div>\r\n</li>"
						}
						return __p
					}() + "\r\n  "
				}), __p += "\r\n</ul>";
				return __p
			}() + "\r\n    </div>\r\n  </div>\r\n</div>";
			return __p
		}
	}), define("tmpl!template/pagination.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<div class="pagination clearfix">\r\n    ', page != 1 && (__p += '\r\n        <a href="#" class="pagination-prev"  data-page="' + ((__t = page - 1) == null ? "" : __t) + '">上一页</a>\r\n   '), __p += "\r\n   <span>\r\n        ";
				if (maxPage == page) if (page <= 5 || page == 6 && isEnd) {
					for (var i = 1; i <= page; i++) __p += '\r\n                    <a href="#" class="pagination-page', i == page && (__p += " current"), __p += '" data-page="' + ((__t = i) == null ? "" : __t) + '">' + ((__t = i) == null ? "" : __t) + "\r\n            ";
					page != 6 && !isEnd && (__p += '\r\n                    <a href="#" class="pagination-page"  data-page="' + ((__t = page + 1) == null ? "" : __t) + '">' + ((__t = page + 1) == null ? "" : __t) + "\r\n             ")
				} else {
					__p += '\r\n                <a href="#" class="pagination-page"  data-page="1">1\r\n                <a href="#" class="pagination-n">...\r\n\r\n\r\n                ';
					var c = 4;
					isEnd || c--;
					for (; c >= 0; c--) __p += '\r\n                    <a href="#" class="pagination-page', c == 0 && (__p += " current"), __p += '"  data-page="' + ((__t = page - c) == null ? "" : __t) + '">' + ((__t = page - c) == null ? "" : __t) + "\r\n                ";
					isEnd || (__p += '\r\n                    <a href="#" class="pagination-page" data-page="' + ((__t = page + 1) == null ? "" : __t) + '">' + ((__t = page + 1) == null ? "" : __t) + "\r\n              ")
				} else {
					if (page <= 5) for (var i = 1; i < 7 && i <= maxPage; i++) __p += '\r\n                    <a href="#" class="pagination-page', i == page && (__p += " current"), __p += '" data-page="' + ((__t = i) == null ? "" : __t) + '">' + ((__t = i) == null ? "" : __t) + "\r\n                ";
					else {
						__p += '\r\n                    <a href="#" class="pagination-page"  data-page="1">1\r\n                    <a href="#" class="pagination-n">...\r\n\r\n                    ';
						for (var c = 3; c >= 0; c--) __p += '\r\n                        <a href="#" class="pagination-page', c == 0 && (__p += " current"), __p += '"  data-page="' + ((__t = page - c) == null ? "" : __t) + '">' + ((__t = page - c) == null ? "" : __t) + "\r\n                    ";
						maxPage - page > 0 && (__p += '\r\n                            <a href="#" class="pagination-page" data-page="' + ((__t = page + 1) == null ? "" : __t) + '">' + ((__t = page + 1) == null ? "" : __t) + "\r\n                     ")
					}
					maxPage - page > 2 && maxPage > 7 && (__p += '\r\n                <a href="#" class="pagination-n">...\r\n            '), maxPage - page > 1 && maxPage > 6 && (__p += '\r\n                    <a href="#" class="pagination-page" data-page="' + ((__t = maxPage) == null ? "" : __t) + '" max-page>' + ((__t = maxPage) == null ? "" : __t) + "\r\n            ")
				}
				__p += "\r\n    </a></span>\r\n    ";
				if (!isEnd || page < maxPage) __p += '\r\n        <a href="#" class="pagination-next"  data-page="' + ((__t = page + 1) == null ? "" : __t) + '"> 下一页</a>\r\n    ';
				__p += "\r\n</div>"
			}
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/pagination", ["../$", "tmpl!../template/pagination.html"], e) : e($)
	}(function(e, t) {
		var n = {};
		return n.get = function(e, n, r) {
			return e === 1 && n && r === 1 ? "" : t({
				page: e,
				isEnd: n,
				maxPage: r
			})
		}, n.go = function(t, n) {
			n--, e(".item", t).removeClass("active"), e(".item:eq(" + n + ")", t).addClass("active")
		}, n
	}), !
	function(e) {
		typeof define == "function" ? define("widget/qiqi", ["../$", "../hybrid", "tmpl!../template/qiqiRoom.html", "tmpl!../template/qiqiRoomList.html", "tools/cookie", "tools/native", "tools/tdw", "tools/pagination"], e) : e($)
	}(function(e, t, n, r, i, s, o, u) {
		function a(e, t) {
			return e.forEach(function(e, n) {
				e.anchor_pic && e.anchor_pic.length && n < 2 && t == 1 ? (e.tags = e.anchor_tag, e.pic = e.anchor_pic[0]) : e.pic = e.anchor_pic[1]
			}), e
		}
		function h() {
			f = {
				pageno: 1,
				maxPage: 1,
				atEnd: !1
			}
		}
		function p() {
			l = {
				pageno: 1,
				maxPage: 1,
				atEnd: !1
			}
		}
		function d() {
			c = {
				pageno: 1,
				maxPage: 1,
				atEnd: !1
			}
		}
		function g(t, n, r, i) {
			"function" == typeof t && (i = r, r = n, n = t, t = 0), pageno = t + 1;
			var s = "http://cgi.tiantian.qq.com/tiantian/get_rcmd_anchor_info";
			m = +(new Date), e.utils.request({
				type: "GET",
				url: s,
				dataType: "json",
				data: {
					neednum: v,
					pageno: t
				},
				xhrFields: {
					withCredentials: !0
				},
				error: function() {
					e.report.mmReport(s, -1, +(new Date) - m), i && i()
				},
				success: function(t) {
					e.report.mmReport(s, t.retcode, +(new Date) - m);
					var i = Number(t.retcode),
						o = t.result;
					if (i !== 0 || e.isEmptyObject(o)) return r && r(i);
					var u = !o.isEnd,
						f = o.info;
					return f = a(f, pageno), n(f, u)
				}
			})
		}
		var f = {
			pageno: 1,
			maxPage: 1,
			atEnd: !1
		},
			l = {
				pageno: 1,
				maxPage: 1,
				atEnd: !1
			},
			c = {
				pageno: 1,
				maxPage: 1,
				atEnd: !1
			},
			v = 60,
			m, y = {},
			b = ["module", "action", "obj1", "obj2", "obj3"],
			w = ["module", "action", "obj1", "obj2"],
			E = ["module", "action", "obj1"];
		y.loadData = function(r) {
			h(), t = t || e.hybrid, t.MaskLoading.loading("hide"), t.MaskLoading.loading("show", {
				status: "search"
			}), g(function(t, i) {
				f.pageno = 1, f.atEnd = i, i || f.maxPage++;
				var s = n({
					rooms: t,
					hy: 1,
					from: r,
					isEnd: i
				});
				y.hyRender(s, i), e.report.isd(7832, 31, 1, [m, +(new Date)]);
				var o = 0;
				"hybrid" == r ? o = 11300 : "hybridHot" == r && (o = 11100);
				if (!o) return;
				var u = t.map(function(e) {
					return e.roomid
				});
				S(o, u)
			}, function() {}, function() {}), t.$els.fuzzy.hide(), t.$els.accurate.hide(), t.isSearchResultLayerDisplay ? t.$els.loadingMask.show() : t.$els.loadingMask.css({
				"z-index": "2",
				top: "445px"
			}).show().animate({
				top: "0"
			}, {
				duration: "normal",
				easing: "swing",
				complete: function() {
					t.isSearchResultLayerDisplay = !0
				},
				queue: !1
			})
		}, y.hyRender = function(n, r) {
			if (!t.isSearchResultLayerDisplay) return setTimeout(function() {
				y.hyRender(n)
			}, 100);
			var i = e(".qiqi-room", "#hy-main");
			i.length > 0 && i.remove(), e("#hy-main").append(n), f.maxPage > 1 && e("#hy-main .qiqi-room .content-container").append('<div class="qiqi-room-control">' + u.get(f.pageno, f.isEnd, f.maxPage) + "</div>"), t.$els.loadingMask.hide(), e(".qiqi-room", "#hy-main").show(), y.bindHandler()
		}, y.quRender = function(t, r, i, s) {
			p(), g(function(i, s) {
				l.pageno = 1, l.atEnd = s, s || l.maxPage++;
				var o = n({
					rooms: i,
					from: t,
					isEnd: s
				});
				e("#qu-carousel-inner").html(o), l.maxPage > 1 && e("#qu-carousel-inner .qiqi-room .content-container").append('<div class="qiqi-room-control">' + u.get(l.pageno, l.isEnd, l.maxPage) + "</div>"), e(".qiqi-room", "#qu-carousel-inner").show(), e("#qu-result-fuzzy").show(), y.bindHandler(), r && r(), e.report.isd(7832, 31, 1, [m, +(new Date)]);
				var a = 0;
				"qun" == t ? a = 12500 : "qunHot" == t && (a = 12100);
				if (!a) return;
				var f = i.map(function(e) {
					return e.roomid
				});
				S(a, f)
			}, i, s)
		}, y.livestudio = function(t, r, i, s) {
			d(), g(function(i, s) {
				c.pageno = 1, c.atEnd = s, s || c.maxPage++;
				var o = n({
					rooms: i,
					from: t,
					isEnd: s
				});
				e("#livestudio").html(o), c.maxPage > 1 && e("#livestudio  .qiqi-room .content-container").append('<div class="qiqi-room-control">' + u.get(c.pageno, c.isEnd, c.maxPage) + "</div>"), e(".qiqi-room", "#livestudio").show(), y.bindHandler(), r && r()
			}, i, s)
		}, y.bindHandler = function() {
			function h() {
				i.updateUinSkey();
				var t = fuin = i.uin(),
					n = this.dataset.roomId,
					r = this.dataset.shortId,
					u = {
						anchor_uin: r
					},
					a = e(this).parents(".seller-item"),
					f = a.parent().prevAll(".seller-list").length * v + a.prevAll(".seller-item").length + 1;
				e.report.bernoulli(11758, f);
				var l = this.dataset.from,
					c = this.position;
				switch (l) {
				case "hybrid":
					e.report.bernoulli(11543, n), o.reportTdw("pf00191", b, [
						["guagua_find", "clickrslt", n, 11300, c]
					]);
					break;
				case "hybridHot":
					u.srcid = 110, e.report.bernoulli(11563, n), o.reportTdw("pf00191", b, [
						["guagua_find", "clickrslt", n, 11100, c]
					]);
					break;
				case "qun":
					e.report.bernoulli(11544, n), o.reportTdw("pf00191", b, [
						["guagua_find", "clickrslt", n, 12500, c]
					]);
					break;
				case "qunHot":
					u.srcid = 130, e.report.bernoulli(11542, n), o.reportTdw("pf00191", b, [
						["guagua_find", "clickrslt", n, 12100, c]
					]);
					break;
				case "guaguaHotPic":
					u.srcid = 135, e.report.bernoulli(11542, n), o.reportTdw("pf00191", b, [
						["guagua_find", "clickrslt", n, 12201, c]
					]);
					break;
				case "searchwindow":
					u.srcid = 140, e.report.bernoulli(12087, n)
				}
				s.invokeGuaGuaByShortId(t, fuin, n, u)
			}
			var n = e("#hy-main .qiqi-room"),
				c = e(".qiqi-room");
			n.on("click", '[data-coupon-cmd="close"]', function(r) {
				t.isSearchResultLayerDisplay = !1, t.$els.loadingMask.hide(), t.$els.fuzzy.hide(), t.$els.accurate.hide(), e("#hy-recommend").show(), e("#hy-activity315").hide(), e("#hy-free-activities").hide(), n.hide(), n.css({
					"z-index": "0",
					top: 0
				}), r.preventDefault(), t.userTrack = 0
			}), c.on("click", ".image-wrapper", function(e) {
				this.position = 1, h.call(this)
			}), c.on("click", ".activity-title", function(e) {
				this.position = 2, h.call(this)
			}), c.on("click", ".room-entry", function(e) {
				e.preventDefault(), this.position = 3, h.call(this)
			}), c.on("click", "[data-page]", function(t) {
				t.preventDefault();
				var n = e(this).parents(".qiqi-room"),
					i, s, o, c;
				n.parents("#hy-main").length ? (c = !0, i = f.pageno, s = f.atEnd, o = f.maxPage) : (i = l.pageno, s = l.atEnd, o = l.maxPage), n.find(".content-container").scrollTop(0), n.scrollTop(0);
				var h = parseInt(this.dataset.page);
				if (h != i) {
					c ? f.pageno = h : l.pageno = h;
					var p = n.find(".qiqi-room-control");
					p.addClass("hide"), n.find(".seller-list").addClass("hide");
					var d = n.find(".seller-list").get(h - 1);
					if (d) {
						e(d).removeClass("hide"), p.removeClass("hide");
						var v = h == o && s ? !0 : !1;
						p.html(u.get(h, v, o));
						return
					}
					g(h - 1, function(t, i) {
						c ? (f.pageno = h, f.atEnd = i, i || (f.maxPage += 1), o = f.maxPage) : (l.pageno = h, l.atEnd = i, i || (l.maxPage += 1), o = l.maxPage);
						var s = r({
							rooms: a(t),
							from: n.find(".seller-item:first-child [data-from]").length && n.find(".seller-item:first-child [data-from]").get(0).dataset.from
						});
						e(s).insertBefore(p), p.html(u.get(h, i, o)).removeClass("hide")
					}, function() {
						p.removeClass("hide")
					}, function() {
						p.removeClass("hide")
					})
				}
			})
		}, y.isTabOn = function() {
			return e("#livestudio") ? !0 : !1
		}, y.hide = function() {
			y.isTabOn() && e("#livestudio").hide()
		}, y.show = function() {
			y.isTabOn() && e("#livestudio").show()
		};
		var S = y.reportShow = function(e, t, n) {
				var r;
				"object" == typeof t ? r = t.map(function(t) {
					return n ? ["guagua_find", "showguagua", e, t, n] : ["guagua_find", "showguagua", e, t]
				}) : n ? r = ["guagua_find", "showguagua", e, t, n] : r = ["guagua_find", "showguagua", e, t], o.reportTdw("pf00191", n ? b : w, r)
			},
			x = y.reportRcmd = function(e) {
				o.reportTdw("pf00191", E, [
					["guagua_find", "clickrcmd", e]
				])
			};
		return e.qiqi = y
	}), define("tmpl!template/singleOneLinePublicAccount.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\r\n\r\n<div class="one-line-seller-unit clearfix public-account">\r\n    <span class="avatar-wrapper" title="查看公众号资料">\r\n\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" alt="公众号头像" onerror="handleImgErr(this)"/>\r\n\r\n        <div class="avatar-mask" title="查看公众号资料"  data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '"></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n            <a href="#"　title="' + ((__t = value.originalName) == null ? "" : __t) + '"   data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '">' + ((__t = value.nick) == null ? "" : __t) + "</a>\r\n            ", value.is_verified && (__p += '<span class="icon-public-account-auth" title="已认证"></span>'), __p += '\r\n        </p>\r\n\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + '\r\n        </div>\r\n\r\n        <a class="btn-seller-chat-online" title="咨询"  data-ask-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n    </div>\r\n</div>';
			return __p
		}
	}), define("tmpl!template/singleQidianOneLineSeller.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\r\n\r\n<div class="one-line-seller-unit clearfix" a="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '">\r\n    <span class="avatar-wrapper" title="查看商家资料" >\r\n        <img class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '" src="' + ((__t = value.avatar) == null ? "" : __t) + '" alt="商家头像" onerror="handleImgErr(this)" />\r\n        <div class="avatar-mask" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '"\r\n             data-classification="manu"\r\n            title="查看商家资料"\r\n        ></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n            <a href="#" title="' + ((__t = value.originalName) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '"> \r\n                ' + ((__t = value.nick) == null ? "" : __t) + '\r\n            </a>\r\n        </p>\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + '\r\n        </div>\r\n        <a class="btn-seller-chat-online" title="咨询"  data-ask-qidian-account="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n        <a class="btn-public-focus" title="关注" data-qidian-lianghao="' + ((__t = value.lianghao) == null ? "" : __t) + '" data-qidian-nick="' + ((__t = value.name) == null ? "" : __t) + '" data-qidian-add-friend="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n    </div>\r\n    <div class="one-line-seller-unit-contact">\r\n        ', value.tel && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="' + ((__t = value.tel) == null ? "" : __t) + '"><i class="btn-phone"></i>\r\n                ' + ((__t = value.tel) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n        ", value.address && (__p += '\r\n            <p class="one-line-seller-unit-location-locate ' + ((__t = value.latitude || value.latitude ? "" : "disable") == null ? "" : __t) + '" title="' + ((__t = value.address) == null ? "" : __t) + '" data-prefix="hybrid" data-soso-map-located data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-nick="' + ((__t = value.originalName) == null ? "" : __t) + '" data-ck="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '" data-authicon="1" data-type="' + ((__t = value.type) == null ? "" : __t) + '"   data-uin="' + ((__t = value.uin) == null ? "" : __t) + '" data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '" data-issellerentauth="0" data-licenceauth="0" data-tenpayauth="0" data-chatbuttonstyle="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '"  data-obj="11521"> <i class="btn-loc-8-12-' + ((__t = value.latitude || value.latitude ? "enable" : "disable") == null ? "" : __t) + '"></i>\r\n                ' + ((__t = value.address) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n    </div>\r\n</div>";
			return __p
		}
	}), define("tmpl!template/singleOneLineSeller.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += "\r\n\r\n ", value.authIconType = 1, __p += '\r\n\r\n<div class="one-line-seller-unit clearfix', value.hasRating && (__p += " one-line-seller-has-rating"), __p += '" a="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '">\r\n    <span class="avatar-wrapper" title="查看商家资料">\r\n\r\n        <img\r\n                class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '"\r\n                src="' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n                alt="商家头像"\r\n\r\n                onerror="handleImgErr(this)"\r\n           />\r\n        ', value.biz_flag && (__p += '<i class="icon-seller-recom-flag"></i>'), __p += '\r\n\r\n        <div class="avatar-mask"\r\n             data-classification="manu"\r\n             data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n             data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n             data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n             data-iden="avatar"\r\n             data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n             data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n             data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n             data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n             data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n             data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n             data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n             data-category-id="' + ((__t = value.categoryId) == null ? "" : __t) + '"\r\n             data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n             data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            title="查看商家资料"\r\n        ></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n\r\n            <a\r\n                    href="#"\r\n                    title="' + ((__t = value.originalName) == null ? "" : __t) + '"\r\n                    data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                    data-iden="nick"\r\n                    data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n                    data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n                    data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n                    data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n                    data-category-id="' + ((__t = value.categoryId) == null ? "" : __t) + '"\r\n                    data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                    data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n                    data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n                    data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n                    data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n                    data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n                    data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n            data-classification="manu"\r\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-name="' + ((__t = value.name) == null ? "" : __t) + '">\r\n            ' + ((__t = value.nick) == null ? "" : __t) + "\r\n            </a>\r\n\r\n            " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
					return __p
				}() + '\r\n        </p>\r\n\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + "\r\n        </div>\r\n\r\n        ";
				var btnStyle = "btn-seller-chat-online";
				value.onlineFlag ? btnStyle = "btn-seller-chat-online" : btnStyle = "btn-seller-chat-offline", __p += "\r\n\r\n\r\n        ", value.wpa_ck || value.ck ? (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n           data-iden="talk"\r\n           data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"></a>\r\n        ') : value.type === "sellerEnt" && (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n           data-iden="talk"\r\n           data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '"></a>\r\n        '), __p += "\r\n    </div>\r\n    ", value.hasRating && (__p += '\r\n    <div class="one-line-seller-unit-rating">\r\n        <div class="star-rating icon-rating-empty" title="评分：' + ((__t = value.rating.rating_show) == null ? "" : __t) + '">\r\n            <div class="star-' + ((__t = value.rating.star) == null ? "" : __t) + ' icon-rating-full"></div>\r\n        </div>\r\n        <p class="one-line-seller-unit-rating-desc">', value.rating.rating_total_count < 1e4 ? __p += "" + ((__t = value.rating.rating_total_count) == null ? "" : __t) + "" : value.rating.rating_total_count < 1e6 ? __p += "" + ((__t = (value.rating.rating_total_count / 1e4).toFixed(1)) == null ? "" : __t) + "万" : __p += "" + ((__t = Math.round(value.rating.rating_total_count / 1e4)) == null ? "" : __t) + "万", __p += "人评分</p>\r\n    </div>\r\n    "), __p += '\r\n    <div class="one-line-seller-unit-contact">\r\n        ', value.biz_scope && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="服务区域 : ' + ((__t = value.biz_scope) == null ? "" : __t) + '">服务区域 : ' + ((__t = value.biz_scope) == null ? "" : __t) + "</p>\r\n        "), __p += "\r\n        ", value.tel && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="' + ((__t = value.tel) == null ? "" : __t) + '"><i class="btn-phone"></i>\r\n                ' + ((__t = value.tel) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n        ", value.address && (__p += '\r\n            <p class="one-line-seller-unit-location-locate ' + ((__t = value.latitude || value.latitude ? "" : "disable") == null ? "" : __t) + '" title="' + ((__t = value.address) == null ? "" : __t) + '" data-prefix="hybrid" data-soso-map-located data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-nick="' + ((__t = value.originalName) == null ? "" : __t) + '" data-ck="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"  data-type="' + ((__t = value.type) == null ? "" : __t) + '"   data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '" data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '" data-issellerentauth="' + ((__t = value.isSellerEntAuth) == null ? "" : __t) + '" data-licenceauth="' + ((__t = value.licenceAuth) == null ? "" : __t) + '" data-tenpayauth="' + ((__t = value.tenpayAuth) == null ? "" : __t) + '" data-chatbuttonstyle="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '"  data-obj="11521"> <i class="btn-loc-8-12-' + ((__t = value.latitude || value.latitude ? "enable" : "disable") == null ? "" : __t) + '"></i>\r\n                ' + ((__t = value.address) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n    </div>\r\n\r\n</div>"
			}
			return __p
		}
	}), define("tmpl!template/hyFindFuzzySellers.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				var dataObj = "fuz",
					dataPrefix = "hy";
				__p += '\n    <div class="search-row-inner">\n\n        <div class="localSeller" >\n            ', mixtureSameCityIsEmpty || (__p += "\n                ", $.each(mixtureSameCityList, function(index, value) {
					__p += "\n                    ", value.isPubAccount ? __p += "\n                        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\r\n\r\n<div class="one-line-seller-unit clearfix public-account">\r\n    <span class="avatar-wrapper" title="查看公众号资料">\r\n\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" alt="公众号头像" onerror="handleImgErr(this)"/>\r\n\r\n        <div class="avatar-mask" title="查看公众号资料"  data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '"></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n            <a href="#"　title="' + ((__t = value.originalName) == null ? "" : __t) + '"   data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '">' + ((__t = value.nick) == null ? "" : __t) + "</a>\r\n            ", value.is_verified && (__p += '<span class="icon-public-account-auth" title="已认证"></span>'), __p += '\r\n        </p>\r\n\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + '\r\n        </div>\r\n\r\n        <a class="btn-seller-chat-online" title="咨询"  data-ask-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n    </div>\r\n</div>';
						return __p
					}() + "\n                    " : value.isQidianAccount ? __p += "\n                        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\r\n\r\n<div class="one-line-seller-unit clearfix" a="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '">\r\n    <span class="avatar-wrapper" title="查看商家资料" >\r\n        <img class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '" src="' + ((__t = value.avatar) == null ? "" : __t) + '" alt="商家头像" onerror="handleImgErr(this)" />\r\n        <div class="avatar-mask" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '"\r\n             data-classification="manu"\r\n            title="查看商家资料"\r\n        ></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n            <a href="#" title="' + ((__t = value.originalName) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '"> \r\n                ' + ((__t = value.nick) == null ? "" : __t) + '\r\n            </a>\r\n        </p>\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + '\r\n        </div>\r\n        <a class="btn-seller-chat-online" title="咨询"  data-ask-qidian-account="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n        <a class="btn-public-focus" title="关注" data-qidian-lianghao="' + ((__t = value.lianghao) == null ? "" : __t) + '" data-qidian-nick="' + ((__t = value.name) == null ? "" : __t) + '" data-qidian-add-friend="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n    </div>\r\n    <div class="one-line-seller-unit-contact">\r\n        ', value.tel && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="' + ((__t = value.tel) == null ? "" : __t) + '"><i class="btn-phone"></i>\r\n                ' + ((__t = value.tel) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n        ", value.address && (__p += '\r\n            <p class="one-line-seller-unit-location-locate ' + ((__t = value.latitude || value.latitude ? "" : "disable") == null ? "" : __t) + '" title="' + ((__t = value.address) == null ? "" : __t) + '" data-prefix="hybrid" data-soso-map-located data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-nick="' + ((__t = value.originalName) == null ? "" : __t) + '" data-ck="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '" data-authicon="1" data-type="' + ((__t = value.type) == null ? "" : __t) + '"   data-uin="' + ((__t = value.uin) == null ? "" : __t) + '" data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '" data-issellerentauth="0" data-licenceauth="0" data-tenpayauth="0" data-chatbuttonstyle="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '"  data-obj="11521"> <i class="btn-loc-8-12-' + ((__t = value.latitude || value.latitude ? "enable" : "disable") == null ? "" : __t) + '"></i>\r\n                ' + ((__t = value.address) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n    </div>\r\n</div>";
						return __p
					}() + "\n                    " : __p += "\n                        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += "\r\n\r\n ", value.authIconType = 1, __p += '\r\n\r\n<div class="one-line-seller-unit clearfix', value.hasRating && (__p += " one-line-seller-has-rating"), __p += '" a="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '">\r\n    <span class="avatar-wrapper" title="查看商家资料">\r\n\r\n        <img\r\n                class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '"\r\n                src="' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n                alt="商家头像"\r\n\r\n                onerror="handleImgErr(this)"\r\n           />\r\n        ', value.biz_flag && (__p += '<i class="icon-seller-recom-flag"></i>'), __p += '\r\n\r\n        <div class="avatar-mask"\r\n             data-classification="manu"\r\n             data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n             data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n             data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n             data-iden="avatar"\r\n             data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n             data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n             data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n             data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n             data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n             data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n             data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n             data-category-id="' + ((__t = value.categoryId) == null ? "" : __t) + '"\r\n             data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n             data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            title="查看商家资料"\r\n        ></div>\r\n    </span>\r\n    <div class="one-line-seller-unit-profile">\r\n        <p class="h14 one-line-seller-unit-nick-p">\r\n\r\n            <a\r\n                    href="#"\r\n                    title="' + ((__t = value.originalName) == null ? "" : __t) + '"\r\n                    data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                    data-iden="nick"\r\n                    data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n                    data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n                    data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n                    data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n                    data-category-id="' + ((__t = value.categoryId) == null ? "" : __t) + '"\r\n                    data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                    data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n                    data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n                    data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n                    data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n                    data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n                    data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n            data-classification="manu"\r\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n            data-name="' + ((__t = value.name) == null ? "" : __t) + '">\r\n            ' + ((__t = value.nick) == null ? "" : __t) + "\r\n            </a>\r\n\r\n            " +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
								return __p
							}() + '\r\n        </p>\r\n\r\n        <div class="one-line-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n            ' + ((__t = value.sign) == null ? "" : __t) + "\r\n        </div>\r\n\r\n        ";
							var btnStyle = "btn-seller-chat-online";
							value.onlineFlag ? btnStyle = "btn-seller-chat-online" : btnStyle = "btn-seller-chat-offline", __p += "\r\n\r\n\r\n        ", value.wpa_ck || value.ck ? (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n           data-iden="talk"\r\n           data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"></a>\r\n        ') : value.type === "sellerEnt" && (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\r\n           data-iden="talk"\r\n           data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-seller-report-operation="' + ((__t = value.isSearchByCategory ? "1" : 0) == null ? "" : __t) + '"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '"></a>\r\n        '), __p += "\r\n    </div>\r\n    ", value.hasRating && (__p += '\r\n    <div class="one-line-seller-unit-rating">\r\n        <div class="star-rating icon-rating-empty" title="评分：' + ((__t = value.rating.rating_show) == null ? "" : __t) + '">\r\n            <div class="star-' + ((__t = value.rating.star) == null ? "" : __t) + ' icon-rating-full"></div>\r\n        </div>\r\n        <p class="one-line-seller-unit-rating-desc">', value.rating.rating_total_count < 1e4 ? __p += "" + ((__t = value.rating.rating_total_count) == null ? "" : __t) + "" : value.rating.rating_total_count < 1e6 ? __p += "" + ((__t = (value.rating.rating_total_count / 1e4).toFixed(1)) == null ? "" : __t) + "万" : __p += "" + ((__t = Math.round(value.rating.rating_total_count / 1e4)) == null ? "" : __t) + "万", __p += "人评分</p>\r\n    </div>\r\n    "), __p += '\r\n    <div class="one-line-seller-unit-contact">\r\n        ', value.biz_scope && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="服务区域 : ' + ((__t = value.biz_scope) == null ? "" : __t) + '">服务区域 : ' + ((__t = value.biz_scope) == null ? "" : __t) + "</p>\r\n        "), __p += "\r\n        ", value.tel && (__p += '\r\n            <p class="one-line-seller-unit-contact-detail" title="' + ((__t = value.tel) == null ? "" : __t) + '"><i class="btn-phone"></i>\r\n                ' + ((__t = value.tel) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n        ", value.address && (__p += '\r\n            <p class="one-line-seller-unit-location-locate ' + ((__t = value.latitude || value.latitude ? "" : "disable") == null ? "" : __t) + '" title="' + ((__t = value.address) == null ? "" : __t) + '" data-prefix="hybrid" data-soso-map-located data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-nick="' + ((__t = value.originalName) == null ? "" : __t) + '" data-ck="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"  data-type="' + ((__t = value.type) == null ? "" : __t) + '"   data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '" data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '" data-issellerentauth="' + ((__t = value.isSellerEntAuth) == null ? "" : __t) + '" data-licenceauth="' + ((__t = value.licenceAuth) == null ? "" : __t) + '" data-tenpayauth="' + ((__t = value.tenpayAuth) == null ? "" : __t) + '" data-chatbuttonstyle="' + ((__t = value.chatButtonStyle) == null ? "" : __t) + '"  data-obj="11521"> <i class="btn-loc-8-12-' + ((__t = value.latitude || value.latitude ? "enable" : "disable") == null ? "" : __t) + '"></i>\r\n                ' + ((__t = value.address) == null ? "" : __t) + "\r\n            </p>\r\n        "), __p += "\r\n    </div>\r\n\r\n</div>"
						}
						return __p
					}() + "\n                    ", __p += "\n                "
				}), __p += "\n            "), __p += '\n        </div>\n\n        <div class="hy-find-fuzzy-pagination">\n        </div>\n\n    </div>\n'
			}
			return __p
		}
	}), define("tmpl!template/singleJob.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<li class="single-job">\r\n    <a class="job_name" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_job_name) == null ? "" : __t) + '" data-report-id="11874">' + ((__t = value.job_name) == null ? "" : __t) + '</a>\r\n    <a class="job_company" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_corp_name) == null ? "" : __t) + '">' + ((__t = value.corp_name) == null ? "" : __t) + '</a>\r\n    <a class="job_require" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_edu_level) == null ? "" : __t) + ";工作" + ((__t = value.attr_work_years) == null ? "" : __t) + '">' + ((__t = value.edu_level) == null ? "" : __t) + ";工作" + ((__t = value.work_years) == null ? "" : __t) + '</a>\r\n    <a class="job_address" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_job_address) == null ? "" : __t) + '">' + ((__t = value.job_address) == null ? "" : __t) + "</a>\r\n    ";
				var btnStyle = "chat-animate-1";
				value.online ? btnStyle = "btn-half-line-seller-chat" : btnStyle = "btn-half-line-seller-chat-disable", __p += '\r\n\r\n\r\n\r\n    <!--<a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.online ? __p += "立即咨询" : __p += "给我留言", __p += '"-->\r\n       <!--data-online="' + ((__t = value.online) == null ? "" : __t) + '"-->\r\n       <!--data-iden="talk"-->\r\n       <!--data-type="job"-->\r\n       <!--data-report-id="11873"-->\r\n       <!--data-prefix="hy" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '">-->\r\n    <!--</a>-->\r\n\r\n</li>'
			}
			return __p
		}
	}), define("tmpl!template/guaguaEnterBtn.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
			return __p
		}
	}), define("tmpl!template/quOpenBtnBlue.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
			function(obj) {
				var __t, __p = "",
					__j = Array.prototype.join,
					print = function() {
						__p += __j.call(arguments, "")
					};
				with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
				return __p
			}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/singleRecommendGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				var dataObj = "",
					dataPrefix = "hy";
				__p += '\r\n<li class="single-recommend-group clearfix">\r\n    <div class="leftco">\r\n        <div class="group-avatar" data-prefix="hy"\r\n             data-iden="avatar"\r\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n             data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\r\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n        data-classification="qqun"\r\n        onerror="handleImgErr(this)"\r\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\r\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\r\n            <div class="group-avatar-outline"  alt="群头像"></div>\r\n            <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" onerror="handleImgErr(this)">\r\n        </div>\r\n        ', value.reportId = "11875", value.inJob = !0, __p += "\r\n        " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
						return __p
					}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
					return __p
				}() + '\r\n    </div>\r\n    <div class="rightco">\r\n        <a href="#" class="group-name"\r\n           data-prefix="hy"\r\n           data-iden="nick"\r\n           title="' + ((__t = value.originName) == null ? "" : __t) + '"\r\n           data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n           data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n           data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n           data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n           data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n            data-open-group="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n            data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\r\n            ' + ((__t = value.name) == null ? "" : __t) + '</a>\r\n        <span class="group-title" title="' + ((__t = value.memo) == null ? "" : __t) + '">' + ((__t = value.memo) == null ? "" : __t) + "</span>\r\n        ", value.cityid && value.provCity && (__p += '\r\n            <div class="group-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\r\n                <i class="btn-loc-8-12-enable"></i>\r\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\r\n            </div>\r\n        "), __p += "\r\n    </div>\r\n</li>"
			}
			return __p
		}
	}), define("tmpl!template/hyFindFuzzyJobs.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += "\r\n";
				var dataObj = "fuz",
					dataPrefix = "hy";
				__p += '\r\n<div class="search-row-inner">\r\n    <div class="jobs-container" >\r\n        <div class="jobs-position-list clearfix">\r\n            <div class="jobs-position-title">职位:</div>\r\n            <ul>\r\n                ', jobPositionData && $.each(jobPositionData, function(e, t) {
					__p += '\r\n                    <li class="jobs-position"><a href="#" data-report-id="11869" data-recom-menu-search="" data-second-flag="1" data-nav-behavior="6" data-position-id="' + ((__t = t.id) == null ? "" : __t) + '" data-search-word="' + ((__t = t.top_name ? t.top_name : t.name) == null ? "" : __t) + '" data-industry-full-nav="' + ((__t = t.top_name ? t.top_name : "") == null ? "" : __t) + '"  class="jobs-position-name', currentPosition == t.id && (__p += " active"), __p += '" title="' + ((__t = t.name) == null ? "" : __t) + '">' + ((__t = t.name) == null ? "" : __t) + "</a></li>\r\n                "
				}), __p += '\r\n            </ul>\r\n        </div>\r\n        <div class="jobs-condition-selection">\r\n            <div class="selector">\r\n                <span class="placeholder">', salary_name ? __p += "" + ((__t = salary_name) == null ? "" : __t) + "" : __p += "薪资", __p += '</span><i class="triangle"></i>\r\n                <ul class="extend-list">\r\n                    <li><a href="#" class="option', salary_name || (__p += " active"), __p += '" data-change-salary data-flag="0">不限</a></li>\r\n                    <li><a href="#" class="option', salary_name == "1000元以下" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="0" data-high="1000">1000元以下</a></li>\r\n                    <li><a href="#" class="option', salary_name == "1000-2000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="1000" data-high="2000">1000-2000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "2000-3000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="2000" data-high="3000">2000-3000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "3000-5000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="3000" data-high="5000">3000-5000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "5000-8000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="5000" data-high="8000">5000-8000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "8000-12000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="8000" data-high="12000">8000-12000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "12000-20000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="12000" data-high="20000">12000-20000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "20000-25000元" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="20000" data-high="25000">20000-25000元</a></li>\r\n                    <li><a href="#" class="option', salary_name == "25000元以上" && (__p += " active"), __p += '" data-change-salary data-flag="1" data-low="25000">25000元以上</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class="selector">\r\n                <span class="placeholder">', pubdate_name ? __p += "" + ((__t = pubdate_name) == null ? "" : __t) + "" : __p += "发布时间", __p += '</span><i class="triangle"></i>\r\n                <ul class="extend-list">\r\n                    <li><a href="#" class="option', pubdate_name || (__p += " active"), __p += '" data-change-pubdate data-flag="0">不限</a></li>\r\n                    <li><a href="#" class="option', pubdate_name == "3天内" && (__p += " active"), __p += '" data-change-pubdate data-flag="1" data-day="3">3天内</a></li>\r\n                    <li><a href="#" class="option', pubdate_name == "7天内" && (__p += " active"), __p += '" data-change-pubdate data-flag="1" data-day="7">7天内</a></li>\r\n                    <li><a href="#" class="option', pubdate_name == "15天内" && (__p += " active"), __p += '" data-change-pubdate data-flag="1" data-day="15">15天内</a></li>\r\n                    <li><a href="#" class="option', pubdate_name == "一月内" && (__p += " active"), __p += '" data-change-pubdate data-flag="1" data-day="30">一月内</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            ';
				if (district && typeof district == "object" && district.length > 0) {
					__p += '\r\n                <div class="selector">\r\n                    <span class="placeholder">' + ((__t = currentRegion ? currentRegion : "区域") == null ? "" : __t) + '</span><i class="triangle"></i>\r\n                    <ul class="extend-list">\r\n                        <li><a href="#" class="option" data-change-region data-region-flag="0">不限</a></li>\r\n                        ';
					for (var key in district) __p += '\r\n                            <li><a href="#" class="option"data-change-region data-region-flag="1" data-region="' + ((__t = district[key].region_id) == null ? "" : __t) + '">' + ((__t = district[key].region_name) == null ? "" : __t) + "</a></li>\r\n                        ";
					__p += "\r\n                    </ul>\r\n                </div>\r\n            "
				}
				__p += '\r\n        </div>\r\n        <ul class="jobs-list">\r\n            ', mixtureSameCityIsEmpty || (__p += "\r\n                ", $.each(mixtureSameCityList, function(index, value) {
					__p += "\r\n                    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += '<li class="single-job">\r\n    <a class="job_name" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_job_name) == null ? "" : __t) + '" data-report-id="11874">' + ((__t = value.job_name) == null ? "" : __t) + '</a>\r\n    <a class="job_company" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_corp_name) == null ? "" : __t) + '">' + ((__t = value.corp_name) == null ? "" : __t) + '</a>\r\n    <a class="job_require" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_edu_level) == null ? "" : __t) + ";工作" + ((__t = value.attr_work_years) == null ? "" : __t) + '">' + ((__t = value.edu_level) == null ? "" : __t) + ";工作" + ((__t = value.work_years) == null ? "" : __t) + '</a>\r\n    <a class="job_address" href="#"\r\n       data-open-seller data-uin="' + ((__t = value.job_id) == null ? "" : __t) + '" data-type="job"\r\n       title="' + ((__t = value.attr_job_address) == null ? "" : __t) + '">' + ((__t = value.job_address) == null ? "" : __t) + "</a>\r\n    ";
							var btnStyle = "chat-animate-1";
							value.online ? btnStyle = "btn-half-line-seller-chat" : btnStyle = "btn-half-line-seller-chat-disable", __p += '\r\n\r\n\r\n\r\n    <!--<a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.online ? __p += "立即咨询" : __p += "给我留言", __p += '"-->\r\n       <!--data-online="' + ((__t = value.online) == null ? "" : __t) + '"-->\r\n       <!--data-iden="talk"-->\r\n       <!--data-type="job"-->\r\n       <!--data-report-id="11873"-->\r\n       <!--data-prefix="hy" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '">-->\r\n    <!--</a>-->\r\n\r\n</li>'
						}
						return __p
					}() + "\r\n                "
				}), __p += "\r\n            "), __p += '\r\n        </ul>\r\n\r\n        <div class="hy-find-fuzzy-pagination">\r\n        </div>\r\n\r\n    </div>\r\n    <div class="jobs-recom-group">\r\n        <div class="jobs-recom-group-title">\r\n            ', keyword ? __p += '\r\n            "' + ((__t = keyword) == null ? "" : __t) + '"相关的群\r\n            ' : __p += "\r\n            相关招聘群\r\n            ", __p += '\r\n        </div>\r\n        <ul class="jobs-recom-group-list clearfix">\r\n            ', recommendGroupList ? $.each(recommendGroupList, function(index, value) {
					__p += "\r\n                    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "";
							var dataObj = "",
								dataPrefix = "hy";
							__p += '\r\n<li class="single-recommend-group clearfix">\r\n    <div class="leftco">\r\n        <div class="group-avatar" data-prefix="hy"\r\n             data-iden="avatar"\r\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n             data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\r\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n        data-classification="qqun"\r\n        onerror="handleImgErr(this)"\r\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\r\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\r\n            <div class="group-avatar-outline"  alt="群头像"></div>\r\n            <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" onerror="handleImgErr(this)">\r\n        </div>\r\n        ', value.reportId = "11875", value.inJob = !0, __p += "\r\n        " +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
									return __p
								}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
								return __p
							}() + '\r\n    </div>\r\n    <div class="rightco">\r\n        <a href="#" class="group-name"\r\n           data-prefix="hy"\r\n           data-iden="nick"\r\n           title="' + ((__t = value.originName) == null ? "" : __t) + '"\r\n           data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n           data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n           data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n           data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n           data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n            data-open-group="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n            data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\r\n            ' + ((__t = value.name) == null ? "" : __t) + '</a>\r\n        <span class="group-title" title="' + ((__t = value.memo) == null ? "" : __t) + '">' + ((__t = value.memo) == null ? "" : __t) + "</span>\r\n        ", value.cityid && value.provCity && (__p += '\r\n            <div class="group-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\r\n                <i class="btn-loc-8-12-enable"></i>\r\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\r\n            </div>\r\n        "), __p += "\r\n    </div>\r\n</li>"
						}
						return __p
					}() + "\r\n              "
				}) : __p += '\r\n                <span class="loading" style="display: block;"></span>\r\n            ', __p += '\r\n        </ul>\r\n\r\n        <div class="more-job-link">\r\n            <a href="#" data-nav="qqun" data-search="' + ((__t = keyword) == null ? "" : __t) + '" data-report-id="11876" data-from="hybrid">查看更多该职位招聘群</a>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>'
			}
			return __p
		}
	}), define("tmpl!template/guaguaCameraIcon.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
			return __p
		}
	}), define("tmpl!template/singleFuzzyResultGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
					return __p
				}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
				if (value.auth) {
					__p += "\n            ";
					var cls = "icon-authentication-group",
						ctit = "腾讯机构认证群";
					value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
				}
				__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
						return __p
					}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
					return __p
				}() + "\n    </div>\n</div>\n"
			}
			return __p
		}
	}), define("tmpl!template/hyFindFuzzyQunContainer.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<div class="hy-search-qun-container">\n    <div class="search-row-title">\n            <span class="left">\n                含 "' + ((__t = keyword) == null ? "" : $.escape(__t)) + '" 的群\n            </span>\n            <span class="right">\n                ', groupMore && (__p += '\n                <a href="#" title="查看更多的群" data-nav="qqun"\n                   data-search="' + ((__t = keyword) == null ? "" : $.escape(__t)) + '" data-keyword="' + ((__t = keyword) == null ? "" : $.escape(__t)) + '"\n                   class="blue">\n                    查看更多\n                </a>\n                '), __p += '\n            </span>\n    </div>\n    <div id="hy-search-qun-inner">\n        ';
				var dataPrefix = "hy";
				__p += "\n        ", $.each(group, function(index, value) {
					__p += "\n            " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
								return __p
							}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
							if (value.auth) {
								__p += "\n            ";
								var cls = "icon-authentication-group",
									ctit = "腾讯机构认证群";
								value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
							}
							__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
									return __p
								}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
								return __p
							}() + "\n    </div>\n</div>\n"
						}
						return __p
					}() + "\n        "
				}), __p += "\n    </div>\n</div>"
			}
			return __p
		}
	}), define("tmpl!template/hyFindFuzzyQun.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				var dataObj = "fuz",
					dataPrefix = "hy",
					dataAddPeopleSource = "4";
				__p += '\n<div class="hy-search-persons-row-one-double">\n\n    <div class="noSCTipsContainer" style="text-align: left;margin-top: -50px;">\n        <div class="noSCTips">\n            <p class="noSCTips-div-head">\n                <i class="icon-big-alert"></i>\n                <span class="noSCTips-head-word">没有找到符合条件的本地商家</span>\n            </p>\n            <div class="noSCTips-div-body">\n                1. 请检查是否勾选了“只看在线”<br>2. 更换其他筛选条件再试试吧\n            </div>\n            <p class="noSCTips-div-footer">\n                能提供该服务？<a class="blue" href="http://shang.qq.com/business/regist/intro.php" target="_blank">马上注册成QQ商家发布服务信息吧！</a>\n            </p>\n        </div>\n\n</div>\n\n', typeof group != "undefined" && (__p += "\n    " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) {
						__p += '<div class="hy-search-qun-container">\n    <div class="search-row-title">\n            <span class="left">\n                含 "' + ((__t = keyword) == null ? "" : $.escape(__t)) + '" 的群\n            </span>\n            <span class="right">\n                ', groupMore && (__p += '\n                <a href="#" title="查看更多的群" data-nav="qqun"\n                   data-search="' + ((__t = keyword) == null ? "" : $.escape(__t)) + '" data-keyword="' + ((__t = keyword) == null ? "" : $.escape(__t)) + '"\n                   class="blue">\n                    查看更多\n                </a>\n                '), __p += '\n            </span>\n    </div>\n    <div id="hy-search-qun-inner">\n        ';
						var dataPrefix = "hy";
						__p += "\n        ", $.each(group, function(index, value) {
							__p += "\n            " +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) {
									__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
									function(obj) {
										var __t, __p = "",
											__j = Array.prototype.join,
											print = function() {
												__p += __j.call(arguments, "")
											};
										with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
										return __p
									}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
									if (value.auth) {
										__p += "\n            ";
										var cls = "icon-authentication-group",
											ctit = "腾讯机构认证群";
										value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
									}
									__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
									function(obj) {
										var __t, __p = "",
											__j = Array.prototype.join,
											print = function() {
												__p += __j.call(arguments, "")
											};
										with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
										function(obj) {
											var __t, __p = "",
												__j = Array.prototype.join,
												print = function() {
													__p += __j.call(arguments, "")
												};
											with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
											return __p
										}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
										return __p
									}() + "\n    </div>\n</div>\n"
								}
								return __p
							}() + "\n        "
						}), __p += "\n    </div>\n</div>"
					}
					return __p
				}() + "\n"), __p += "\n"
			}
			return __p
		}
	}), define("tmpl!template/singleLargePerson.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\n<div class="unit large-person-unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            onerror="handleImgErr(this)"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="80px" alt="头像" title="查看用户资料" height="80px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div class="large-person-unit-profile">\n        <div class="h20">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "large-person-unit-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </div>\n\n        <p class="h20">\n            ', __p += "\n            ", showPersonGender && (__p += "\n                ", value.gender === 2 ? __p += '\n                <i class="icon-female"></i>\n                ' : value.gender === 1 && (__p += '\n                <i class="icon-male"></i>\n                '), __p += "\n            "), showPersonAge && (__p += "\n                " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n            "), __p += "\n\n            " + ((__t = value.location) == null ? "" : __t) + '\n        </p>\n        <p class="h20" title="' + ((__t = value.sign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </p>\n\n        <div class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友\n               </button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </div>\n    </div>\n</div>";
			return __p
		}
	}), define("tmpl!template/singleEightyGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += '\n<div class="unit eighty-group-unit">\n            <span class="avatar-wrapper"\n                  data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n                  ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n                  data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n                  data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n                  data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                  data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n    ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + "\n    " + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n    data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n    data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n    data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n    data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n    data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n    data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n    data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n    data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n    data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n    data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '"\n    data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n    data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n    >\n    ', value.lbs ? __p += '\n    <i class="icon-groupTips icon-groupTips-lbs"></i>\n    ' : value.hot && (__p += '\n    <i class="icon-groupTips icon-groupTips-hot"></i>\n    '), __p += '\n    <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="hy"\n         data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)"\n         ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n         alt="群头像"/>\n\n    ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
					return __p
				}() + '\n\n    </span>\n\n    <div>\n        <p class="eighty-group-nick">\n            ';
				if (value.auth) {
					__p += "\n            ";
					var cls = "icon-authentication-group",
						ctit = "腾讯机构认证群";
					value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '			\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n               href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
				}
				__p += '\n            <a\n                class="' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n            ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + "\n            " + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\n            data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n            data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n            data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n            data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n            data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.name) == null ? "" : __t) + '</a>\n        </p>\n\n        <p class="h20">\n            ', value.member_num && (__p += '\n            <i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "人\n            "), __p += '\n                <span\n                    title="' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + '">\n                    ' + ((__t = value.className != "" ? value.member_num ? " | " + value.className : value.className : "") == null ? "" : __t) + "\n                </span>\n        </p>\n\n        ", value.memo ? __p += '\n        <p class="h20" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.memo) == null ? "" : __t) + "</p>\n        " : __p += '\n        <p class="h20" title="这个群还没有填写群简介">这个群还没有填写群简介</p>\n        ', __p += '\n\n\n        <div class="h20">\n            ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
						return __p
					}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
					return __p
				}() + "\n        </div>\n    </div>\n</div>"
			}
			return __p
		}
	}), define("tmpl!template/hyFindAccurateColumns.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				var dataObj = "acc",
					dataPrefix = "hy";
				__p += "\r\n\r\n";
				if (typeof wpaData != "undefined") {
					__p += '\r\n<div class="column seller">\r\n    <div class="column-inner">\r\n        ';
					var value = wpaData,
						dataObj = "acc",
						dataPrefix = "hy";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="large-seller-unit">\n    <span class="avatar-wrapper" title="查看商家资料">\n\n        <img\n            class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '"\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '"\n            data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n            data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n            data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n            data-iden="avatar"\n            data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n            data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n            data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n            data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n            data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n            data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n            data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            alt="商家头像"\n            data-classification="manu"\n            onerror="handleImgErr(this)"\n            title="查看商家资料"/>\n\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
								return __p
							}() + '\n            <a \n                href="#"\n                title="' + ((__t = value.originalName) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-iden="nick"\n                data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n                data-iden="avatar"\n                data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n                data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n                data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n                data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n                data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n                data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n                data-classification="manu"\n                data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-name="' + ((__t = value.name) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "", typeof value != "undefined" && (value.type === "bulk" ? print('<span class="icon-bulk" title="团购"></span>') : value.type === "microlife" && print('<span class="icon-micro-life" title="优惠券"></span>')), __p += "\r\n";
								return __p
							}() + "\n\n            ";
							if (parseFloat(value.price) || parseInt(value.price) === 0) __p += '\n                <span class="price">仅' + ((__t = value.price) == null ? "" : __t) + "元</span>\n            ";
							__p += "\n            " + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n\n        <div class="h20 large-seller-bottom-info">\n            <p class="' + ((__t = !value.isLocalSeller && value.location ? "large-seller-bottom-info-location all-width" : "large-seller-bottom-info-location") == null ? "" : __t) + '">\n                ', __p += "\n\n                ", !value.isLocalSeller && value.location ? __p += "\n                    " + ((__t = value.category) == null ? "" : __t) + "" + ((__t = value.category ? "&nbsp;|&nbsp;" : "") == null ? "" : __t) + "" + ((__t = value.location) == null ? "" : __t) + "\n                " : (__p += "\n                    ", value.category ? __p += "\n                        " + ((__t = value.category) == null ? "" : __t) + "\n                    " : __p += "\n                        " + ((__t = value.location) == null ? "" : __t) + "\n                    ", __p += "\n                "), __p += "\n            </p>\n\n            ", __p += "\n            ", value.isLocalSeller && (__p += '\n                <p class="right">\n                    ', __p += "\n                    ", value && value.qzoneAuthFlag ? __p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-auth"\n                       data-open-qzone="true"\n                       title="查看商家认证空间"></a>\n                    ' : value && value.qzonePubFlag && (__p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-pub"\n                       data-open-qzone="true"\n                       title="查看商家公开空间"></a>\n                    '), __p += "\n\n\n                    ", value.wpa_ck || value.ck ? __p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"></a>\n                    ' : value.type === "sellerEnt" && (__p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '"></a>\n                    '), __p += "\n                </p>\n            "), __p += "\n        </div>\n    </div>\n</div>"
						}
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n\r\n"
				}
				if (typeof qidainData != "undefined") {
					__p += '\r\n<div class="column seller">\r\n    <div class="column-inner">\r\n        ';
					var value = qidainData,
						dataObj = "acc",
						dataPrefix = "hy";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n<div class="large-seller-unit qidain-account">\n    <span class="avatar-wrapper" title="查看商家资料">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '" data-uin="' + ((__t = value.uin) == null ? "" : __t) + '" alt="头像" onerror="handleImgErr(this)" title="查看商家资料"/>\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n            <a href="#" title="' + ((__t = value.nick) == null ? "" : __t) + '" data-open-qidian-profile="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n        <div class="h20 large-seller-bottom-info">\n            <p class="right">\n                <a class="btn-seller-chat-online" title="咨询" data-ask-qidian-account="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n                <a class="btn-public-focus" title="关注" data-qidian-lianghao="' + ((__t = value.lianghao) == null ? "" : __t) + '"  data-qidian-nick="' + ((__t = value.nick) == null ? "" : __t) + '" data-qidian-add-friend="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n            </p>\n        </div>\n    </div>\n</div>';
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n\r\n\r\n"
				}
				if (typeof sellerEnt != "undefined") {
					__p += '\r\n<div class="column seller">\r\n    <div class="column-inner">\r\n        ';
					var value = sellerEnt,
						dataObj = "acc",
						dataPrefix = "hy";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="large-seller-unit">\n    <span class="avatar-wrapper" title="查看商家资料">\n\n        <img\n            class="' + ((__t = value.type === "bulk" ? "bulk-img" : "") == null ? "" : __t) + '"\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '"\n            data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n            data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n            data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n            data-iden="avatar"\n            data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n            data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n            data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n            data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n            data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n            data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n            data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            alt="商家头像"\n            data-classification="manu"\n            onerror="handleImgErr(this)"\n            title="查看商家资料"/>\n\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
								return __p
							}() + '\n            <a \n                href="#"\n                title="' + ((__t = value.originalName) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-iden="nick"\n                data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\n                data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\n                data-iden="avatar"\n                data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\n                data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\n                data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\n                data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\n                data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\n                data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\n            data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\n                data-classification="manu"\n                data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n                data-name="' + ((__t = value.name) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </p>\n\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "", typeof value != "undefined" && (value.type === "bulk" ? print('<span class="icon-bulk" title="团购"></span>') : value.type === "microlife" && print('<span class="icon-micro-life" title="优惠券"></span>')), __p += "\r\n";
								return __p
							}() + "\n\n            ";
							if (parseFloat(value.price) || parseInt(value.price) === 0) __p += '\n                <span class="price">仅' + ((__t = value.price) == null ? "" : __t) + "元</span>\n            ";
							__p += "\n            " + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n\n        <div class="h20 large-seller-bottom-info">\n            <p class="' + ((__t = !value.isLocalSeller && value.location ? "large-seller-bottom-info-location all-width" : "large-seller-bottom-info-location") == null ? "" : __t) + '">\n                ', __p += "\n\n                ", !value.isLocalSeller && value.location ? __p += "\n                    " + ((__t = value.category) == null ? "" : __t) + "" + ((__t = value.category ? "&nbsp;|&nbsp;" : "") == null ? "" : __t) + "" + ((__t = value.location) == null ? "" : __t) + "\n                " : (__p += "\n                    ", value.category ? __p += "\n                        " + ((__t = value.category) == null ? "" : __t) + "\n                    " : __p += "\n                        " + ((__t = value.location) == null ? "" : __t) + "\n                    ", __p += "\n                "), __p += "\n            </p>\n\n            ", __p += "\n            ", value.isLocalSeller && (__p += '\n                <p class="right">\n                    ', __p += "\n                    ", value && value.qzoneAuthFlag ? __p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-auth"\n                       data-open-qzone="true"\n                       title="查看商家认证空间"></a>\n                    ' : value && value.qzonePubFlag && (__p += '\n                    <a href="' + ((__t = value.qzoneAddress) == null ? "" : __t) + '" target="_blank"\n                       class="btn-qzone-pub"\n                       data-open-qzone="true"\n                       title="查看商家公开空间"></a>\n                    '), __p += "\n\n\n                    ", value.wpa_ck || value.ck ? __p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '"></a>\n                    ' : value.type === "sellerEnt" && (__p += '\n                    <a class="btn-large-seller-chat" title="发起临时会话" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '"></a>\n                    '), __p += "\n                </p>\n            "), __p += "\n        </div>\n    </div>\n</div>"
						}
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n\r\n"
				}
				if (typeof publicData != "undefined") {
					__p += '\r\n<div class="column seller">\r\n    <div class="column-inner">\r\n        ';
					var value = publicData,
						dataObj = "acc",
						dataPrefix = "hy";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n<div class="large-seller-unit public-account">\n    <span class="avatar-wrapper" title="查看公众号资料">\n\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '"\n            data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '"\n            data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\n            alt="公众号头像"\n            onerror="handleImgErr(this)"\n            title="查看公众号资料"/>\n\n    </span>\n    <div class="large-seller-unit-profile">\n        <p class="h21 large-seller-unit-nick-p">\n\n            <a \n                href="#"\n                title="' + ((__t = value.originalName) == null ? "" : __t) + '"\n                data-open-public-profile="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + "\n            </a>\n            ", value.is_verified && (__p += '<span class="icon-public-account-auth" title="已认证"></span>'), __p += '\n        </p>\n\n        <div class="h39 large-seller-long-sign" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </div>\n\n        <div class="h20 large-seller-bottom-info">\n                <p class="right">\n\n                    <a class="btn-seller-chat-online" title="咨询" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-ask-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n\n                    <a class="btn-public-focus" title="关注公众号" data-obj="' + ((__t = value.dataObj) == null ? "" : __t) + '"\n                       data-iden="talk"\n                       data-type="' + ((__t = value.type) == null ? "" : __t) + '"\n                       data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '" data-focus-public="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\n\n                </p>\n        </div>\n    </div>\n</div>';
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n\r\n"
				}
				if (typeof buddy != "undefined") {
					__p += '\r\n<div class="column">\r\n\r\n    <div class="column-inner">\r\n        ';
					var value = buddy,
						dataObj = "acc",
						dataPrefix = "hy",
						dataAddPeopleSource = "1";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n<div class="unit large-person-unit">\n    <span class="avatar-wrapper" title="查看用户资料">\n    ', value.onlineFlag ? __p += '\n        <img\n            src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar"\n            data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '" alt="用户头像"\n            data-classification="pe"\n            onerror="handleImgErr(this)"\n            data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n            title="查看用户资料">\n    ' : __p += '\n        <svg>\n            <image width="80px" alt="头像" title="查看用户资料" height="80px"\n                   xlink:href="' + ((__t = value.avatar) == null ? "" : __t) + '"\n                   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="avatar" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                   data-classification="pe"\n                   onload="handleImgErr(this)"\n                   data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n                   data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n                />\n        </svg>\n    ', __p += '\n    </span>\n\n    <div class="large-person-unit-profile">\n        <div class="h20">\n            <a href="#" title="查看用户资料" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-iden="nick"\n               class="' + ((__t = value.photo_on === 0 ? "large-person-unit-nick-beyond-icon" : "") == null ? "" : __t) + '"\n               data-source="' + ((__t = typeof dataAddPeopleSource === "undefined" ? 4 : dataAddPeopleSource) == null ? "" : __t) + '"\n              data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-open-people="' + ((__t = value.uin) == null ? "" : __t) + '">\n                ' + ((__t = value.nick) == null ? "" : __t) + '\n            </a>\n        </div>\n\n        <p class="h20">\n            ', __p += "\n            ", showPersonGender && (__p += "\n                ", value.gender === 2 ? __p += '\n                <i class="icon-female"></i>\n                ' : value.gender === 1 && (__p += '\n                <i class="icon-male"></i>\n                '), __p += "\n            "), showPersonAge && (__p += "\n                " + ((__t = value.age) == null ? "" : __t) + "", value.age && (__p += "岁"), __p += "" + ((__t = value.sep) == null ? "" : __t) + "\n            "), __p += "\n\n            " + ((__t = value.location) == null ? "" : __t) + '\n        </p>\n        <p class="h20" title="' + ((__t = value.sign) == null ? "" : __t) + '">\n            ' + ((__t = value.sign) == null ? "" : __t) + '\n        </p>\n\n        <div class="h20">\n            <button class="add-friend-blue" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-source="' + ((__t = dataAddPeopleSource) == null ? "" : __t) + '"\n               data-uin2="' + ((__t = value.uin2) == null ? "" : __t) + '"\n               data-add-people="' + ((__t = value.uin) == null ? "" : __t) + '"\n               aria-label="加为好友">\n                <i class="icon-add-group-plus"></i>\n                好友\n               </button>\n            ', value.ck && (__p += '\n            <button class="chat-friend" title="发起临时会话" aria-label="发起临时会话"\n               data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n               data-iden="' + ((__t = value.wpa_ck ? "wpa_ck" : "ck") == null ? "" : __t) + '"\n               data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '">\n                <i class="icon-chat-pop"></i></a>\n               </button>\n            '), __p += "\n        </div>\n    </div>\n</div>";
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n"
				}
				if (typeof group != "undefined") {
					__p += '\r\n<div class="column">\r\n    <div class="column-inner">\r\n        ';
					var value = group,
						dataObj = "acc",
						dataPrefix = "hy";
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="unit eighty-group-unit">\n            <span class="avatar-wrapper"\n                  data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n                  ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n                  data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n                  data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n                  data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                  data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n    ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + "\n    " + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n    data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n    data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n    data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n    data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n    data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n    data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n    data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n    data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n    data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n    data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '"\n    data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n    data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n    >\n    ', value.lbs ? __p += '\n    <i class="icon-groupTips icon-groupTips-lbs"></i>\n    ' : value.hot && (__p += '\n    <i class="icon-groupTips icon-groupTips-hot"></i>\n    '), __p += '\n    <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="hy"\n         data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)"\n         ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n         alt="群头像"/>\n\n    ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
								return __p
							}() + '\n\n    </span>\n\n    <div>\n        <p class="eighty-group-nick">\n            ';
							if (value.auth) {
								__p += "\n            ";
								var cls = "icon-authentication-group",
									ctit = "腾讯机构认证群";
								value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '			\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n               href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
							}
							__p += '\n            <a\n                class="' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n            ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + "\n            " + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\n            data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n            data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n            data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n            data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n            data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.name) == null ? "" : __t) + '</a>\n        </p>\n\n        <p class="h20">\n            ', value.member_num && (__p += '\n            <i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "人\n            "), __p += '\n                <span\n                    title="' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + '">\n                    ' + ((__t = value.className != "" ? value.member_num ? " | " + value.className : value.className : "") == null ? "" : __t) + "\n                </span>\n        </p>\n\n        ", value.memo ? __p += '\n        <p class="h20" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.memo) == null ? "" : __t) + "</p>\n        " : __p += '\n        <p class="h20" title="这个群还没有填写群简介">这个群还没有填写群简介</p>\n        ', __p += '\n\n\n        <div class="h20">\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
									return __p
								}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
								return __p
							}() + "\n        </div>\n    </div>\n</div>"
						}
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n"
				}
				if (typeof groupGuaGua != "undefined") {
					__p += '\r\n<div class="column column-guagua">\r\n    <div class="column-inner">\r\n        ';
					var value = groupGuaGua;
					__p += "\r\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div class="unit eighty-group-unit">\n            <span class="avatar-wrapper"\n                  data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n                  ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n                  data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n                  data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n                  data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                  data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n    ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + "\n    " + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n    data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n    data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n    data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n    data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n    data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n    data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n    data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n    data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n    data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n    data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '"\n    data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n    data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n    >\n    ', value.lbs ? __p += '\n    <i class="icon-groupTips icon-groupTips-lbs"></i>\n    ' : value.hot && (__p += '\n    <i class="icon-groupTips icon-groupTips-hot"></i>\n    '), __p += '\n    <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-prefix="hy"\n         data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)"\n         ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n         alt="群头像"/>\n\n    ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
								return __p
							}() + '\n\n    </span>\n\n    <div>\n        <p class="eighty-group-nick">\n            ';
							if (value.auth) {
								__p += "\n            ";
								var cls = "icon-authentication-group",
									ctit = "腾讯机构认证群";
								value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '			\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n               href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
							}
							__p += '\n            <a\n                class="' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#" data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '" data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n            ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + "\n            " + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\n            data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n            data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n            data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\n            data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n            data-groupmemo="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.name) == null ? "" : __t) + '</a>\n        </p>\n\n        <p class="h20">\n            ', value.member_num && (__p += '\n            <i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "人\n            "), __p += '\n                <span\n                    title="' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + '">\n                    ' + ((__t = value.className != "" ? value.member_num ? " | " + value.className : value.className : "") == null ? "" : __t) + "\n                </span>\n        </p>\n\n        ", value.memo ? __p += '\n        <p class="h20" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">' + ((__t = value.memo) == null ? "" : __t) + "</p>\n        " : __p += '\n        <p class="h20" title="这个群还没有填写群简介">这个群还没有填写群简介</p>\n        ', __p += '\n\n\n        <div class="h20">\n            ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
									return __p
								}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
								return __p
							}() + "\n        </div>\n    </div>\n</div>"
						}
						return __p
					}() + "\r\n    </div>\r\n</div>\r\n"
				}
				__p += ""
			}
			return __p
		}
	}), define("tmpl!template/hyFindAccRecManufacturers.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(manufactures, function(e, t) {
				__p += '\r\n<div class="unit">\r\n    <span class="avatar-wrapper" title="查看商家资料">\r\n        ', t.onlineFlag ? __p += '\r\n            <img src="' + ((__t = t.ic) == null ? "" : __t) + '" alt="商家头像" data-obj="acc"\r\n                 data-iden="avatar"\r\n                 data-prefix="hy"\r\n                 data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n                 data-classification="manu"\r\n                 onerror="handleImgErr(this)"\r\n                 data-name="' + ((__t = t.nick) == null ? "" : $.escape(__t)) + '">\r\n        ' : __p += '\r\n            <svg>\r\n                <image width="60px" alt="商家QQ头像" title="查看商家QQ资料"\r\n                       height="60px" xlink:href="' + ((__t = t.ic) == null ? "" : __t) + '"\r\n                       data-prefix="hy" data-iden="avatar" data-obj="fuz"\r\n                       data-classification="manu"\r\n                       onload="handleImgErr(this)"\r\n                       data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n                        />\r\n            </svg>\r\n        ', __p += '\r\n    </span>\r\n\r\n    <div>\r\n        <p>\r\n            <a href="#" data-iden="nick" data-open-people="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n              data-prefix="hy"\r\n              data-classification="manu"\r\n              data-name="' + ((__t = t.nick) == null ? "" : __t) + '">' + ((__t = t.cs) == null ? "" : __t) + "</a>\r\n        </p>\r\n\r\n        <p>" + ((__t = t.location) == null ? "" : __t) + "&nbsp;</p>\r\n\r\n        <p>\r\n            ", t.ck || t.wpa_ck ? __p += '\r\n            <a class="btn-open-session" title="发起临时会话" data-prefix="hy"\r\n               data-obj="acc"\r\n               data-classification="manu"\r\n               data-open-session="' + ((__t = t.ck || t.wpa_ck) == null ? "" : __t) + '"></a>\r\n            ' : __p += '\r\n            <a class="btn-open-session" title="发起临时会话" data-prefix="hy"\r\n               data-classification="manu"\r\n               data-obj="acc" data-open-session="' + ((__t = t.kfuin) == null ? "" : __t) + '"></a>\r\n            ', __p += '\r\n            <a class="btn-add" data-prefix="hy"\r\n               title="添加商家"\r\n               data-classification="manu"\r\n               data-obj="acc"\r\n               data-add-seller="' + ((__t = t.kfuin) == null ? "" : __t) + '"\r\n               data-name="' + ((__t = t.nick) == null ? "" : __t) + '"\r\n               data-account="' + ((__t = t.nameAccount) == null ? "" : __t) + '"></a>\r\n\r\n        </p>\r\n    </div>\r\n</div>\r\n'
			}), __p += "";
			return __p
		}
	}), define("tmpl!template/hyFindFuzzyQunSuffix.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += '\n<div class="hy-find-fuzzy-qun-suffix">\n    <p>\n        在找群页查看更多含“' + ((__t = keyword) == null ? "" : __t) + '”的群\n        <a href="###" title="查看更多的群"\n           data-nav="qqun"\n           data-search="' + ((__t = keyword) == null ? "" : __t) + '"\n           data-keyword="' + ((__t = keyword) == null ? "" : __t) + '"\n           data-nav-behavior="page-2"\n            >查看更多>></a>\n    </p>\n\n</div>\n';
			return __p
		}
	}), define("tmpl!template/hyFindFuzzyTitleBarRight.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", hasSeller && totalNum ? __p += '\n    "' + ((__t = searchKeyword) == null ? "" : __t) + '"相关的' + ((__t = cityInfo) == null ? "" : __t) + "" + ((__t = searchType == "jobs" ? "职位" : "商家") == null ? "" : __t) + '(<span style="color:#fe5b01">' + ((__t = totalNum == 400 ? "400+" : totalNum + "个") == null ? "" : __t) + "</span>)\n" : __p += "\n    搜索： " + ((__t = searchKeyword) == null ? "" : __t) + "\n", __p += "\n";
				var loading = loading || "";
				__p += '\n<span class="hy-result-header-location-bar">\n    <span>\n        <input type="checkbox" id="hy-search-result-online-switch', loading && (__p += "-loading"), __p += '"\n            ' + ((__t = onlineSwitch ? "checked" : "") == null ? "" : __t) + '/>\n        <label for="hy-search-result-online-switch', loading && (__p += "-loading"), __p += '">只看在线</label>\n        <span class="vertical-line">|</span>\n        <a\n            class="btn-hy-search-result-default-order ' + ((__t = distanceSwitch ? "" : "selected") == null ? "" : __t) + '"\n           href="###">默认</a>\n        <a\n            class="btn-hy-search-result-distance-order ' + ((__t = distanceSwitch ? "selected" : "") == null ? "" : __t) + '" href="###">附\n            近</a>\n        <span class="vertical-line">|</span>\n    </span>\n\n    <a data-soso-map-open="true"\n       class="' + ((__t = userAddressFlag ? "btn-loc-enable" : "btn-loc-disable") == null ? "" : __t) + '"\n       href="###"\n       title="' + ((__t = lbsAddr) == null ? "" : $.escape(__t)) + '">\n        添加当前当前地理位置，查看你周围的QQ商家\n    </a>\n    <a href="#" data-soso-map-open="true">' + ((__t = lbsAddr ? lbsAddr : "设置我的位置") == null ? "" : $.escape(__t)) + "</a>\n</span>\n"
			}
			return __p
		}
	}), function(e) {
		typeof define == "function" ? define("hybrid.find", ["$", "./model/buddy", "./model/seller", "./model/job", "./model/group", "./widget/qiqi", "tmpl!template/hyFindFuzzySellers.html", "tmpl!template/hyFindFuzzyJobs.html", "tmpl!template/hyFindFuzzyQun.html", "tmpl!template/hyFindAccurateColumns.html", "tmpl!template/hyFindAccRecManufacturers.html", "tmpl!template/singleFuzzyResultGroup.html", "tmpl!template/hyFindFuzzyQunSuffix.html", "tmpl!template/singleOneLineSeller.html", "tmpl!template/singleQidianOneLineSeller.html", "tmpl!template/singleOneLinePublicAccount.html", "tmpl!template/singleJob.html", "tmpl!template/singleRecommendGroup.html", "tmpl!template/hyFindFuzzyQunContainer.html", "tmpl!template/hyFindFuzzyTitleBarRight.html", "tools/utils", "tools/info", "tools/cookie"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S) {
		function k(e) {
			return localStorage[S.uin() + "userInfo"] && (e.longitude = E._fields.longitude, e.latitude = E._fields.latitude, e.lbs_addr_country = E._fields.lbs_addr_country, e.lbs_addr_province = E._fields.lbs_addr_province, e.lbs_addr_city = E._fields.lbs_addr_city), e
		}
		function L(e) {
			var t = window.qqfind.hybrid;
			e || (t.containerNum = 36, t.findSellerNum = 0, t.qidianEndFlag = 0, t.findSameCitySellerNum = 0, t.isMoreSameCitySeller = !0, t.findNonSameCitySellerNum = 0, t.isMoreNonSameCitySeller = !0, t.isShowNonSameCitySeller = !1, t.findNonSameCityListCache = [], t.findSameCityListCache = [], t.findSellerCurPage = 1, t.findSellerTotalPage = 1, t.findCgiSellerCurPage = 1, t.findQunTotalNum = 0, t.findCgiQunCurPage = 1, t.preFetch = !1, t.ext = "", t.canFindMoreSeller = !0, t.isSearchByCategory = !1)
		}
		var x = {
			recommendGroupList: {},
			recommendGroupLoadingStatus: {}
		},
			T = e.report,
			N = T.bernoulli,
			C = T.monitorAndBer;
		return x.find = function(o, u) {
			var a = window.qqfind.hybrid;
			a.isUserSearchAction++, e("#acitvity-mask").hide();
			var f, l = {},
				g = "http://cgi.find.qq.com/qqfind/",
				T = "find_v11?backver=2",
				A, O = 0,
				M, _, a = window.qqfind.hybrid,
				D, P, H = 2,
				B, j, F;
			u ? typeof u == "object" ? (A = u.isMore, B = u.isGeneralHotWords, F = u.isCategoryIndex, a.categoryType = H = u.categoryType || 2, M = u.resultTitleKeyword, j = u.changeByCorDisOnline, _ = a.searchType = u.searchType || "seller") : (A = u, M = a.resultTitleKeyword) : (A = !1, F = !1), L(A), A || e("#hy-find-fuzzy-rows").scrollTop(0);
			if (!A && F || a.isSearchByCategory) a.searchType == "jobs" ? (T = "job/search_job", a.isSearchByCategory = !0, H = a.categoryType) : (T = "biz/industry_v4?backver=2", a.isSearchByCategory = !0, H = a.categoryType);
			!A && !F && (a.isSearchByCategory = !1), a.searchType != "jobs" ? l = {
				bnum: 15,
				pagesize: 15,
				id: a.categoryID,
				sid: 0,
				page: a.findCgiSellerCurPage - 1,
				pageindex: a.findCgiSellerCurPage - 1,
				ext: a.ext,
				guagua: client.canInvokeGuaGua,
				gnum: 12,
				guaguan: 2,
				type: H,
				ver: client.getVersion()
			} : (l = {
				bnum: 15,
				category_id: a.categoryID,
				page: a.findCgiSellerCurPage - 1,
				ver: client.getVersion()
			}, a.isUserSearchAction !== 1 && e.extend(l, a.searchParams), x.findRecommendGroup(a.categoryID, a.keyword, function(e) {})), l = k(l);
			if (typeof o == "string") f = o, l.keyword = f;
			else {
				f = o.keyword || "", e.extend(l, o);
				if (l.scf === 1 || l.scf === 2) l.fetchtag = 2
			}(F || B) && !j ? D = !1 : D = a.isUserSearchAction > 1 && a.searchResultOnlineSwitchObj[f], P = a.isUserSearchAction > 1 && a.searchResultDistanceSwitchObj[f], a.searchResultOnlineSwitchObj[f] = D, a.searchResultDistanceSwitchObj[f] = P, l.nf = P ? 1 : 0, l.of = D ? 1 : 0, A || (B && (l.hit = 1), e.report.bernoulli(11055, f));
			var I = +(new Date);
			w.request({
				type: "POST",
				url: g + T,
				dataType: "json",
				data: l,
				error: function(e, t, n) {
					var r;
					t === "timeout" ? r = 6014666 : t === "error" ? (r = "6014", r += e.status) : r = 5000002, this.success({
						retcode: r,
						result: {
							sret: 16
						}
					}), C(280706, 11466, r)
				},
				success: function(o, u, C) {
					try {
						e.report.mmReport(g + T, o && o.retcode, +(new Date) - I)
					} catch (k) {}
					var L = function(o, g, T) {
							if (!a.isSearchResultLayerDisplay) {
								setTimeout(function() {
									L(o, u, T)
								}, 50);
								return
							}
							var C = a.$els,
								k = o.result || {
									sret: 256
								},
								O = o.retcode ? (("" + o.retcode).search(/^6014/i) !== -1 ? "" : "6014") + o.retcode : o.retcode,
								D = k.sret || 0,
								P = k.exact,
								H = k.resultType || a.searchType,
								B = k.buddy || {},
								j = k.group || {},
								F = k.group_guagua || {},
								I = k.biz,
								q = k.qiye || {},
								R = k.qidian || {},
								U = k.public || {},
								z = k.oper || [],
								W = k.business || k || {},
								X = W.ext || "",
								V, J, K, Q, G, Y, Z = [],
								et, tt, nt, rt = "",
								it = {};
							!O && D && (O = 6000144), a.searchType == "jobs" && (D = "jobs"), U && U.length && (H = "seller");
							var st = it.resultTitleKeyword || it.keyword || M || f,
								ot = e.utils.escape(st),
								ut = E._fields.lbs_addr_detail_short,
								at = a.searchResultOnlineSwitchObj[f],
								ft = a.isUserSearchAction > 1 && a.searchResultDistanceSwitchObj[f],
								lt;
							a.searchResultDistanceSwitchObj[f] = ft, localStorage[S.uin() + "userInfo"] && (lt = !0);
							var ct = {
								searchKeyword: ot,
								cityInfo: it.city,
								totalNum: it.totalNum,
								lbsAddr: ut,
								onlineSwitch: at,
								distanceSwitch: ft,
								userAddressFlag: lt,
								hasSeller: H == "seller",
								searchType: _
							};
							if (O && !A) return a.$els.loadingMask.loading("hySearchError", {
								errorCode: O,
								keyWord: f,
								errorKind: D
							}), a.$els.loadingMask.find(".loading").show(), ct.loading = !0, rt = b(ct), e(".hy-loading-title").html(rt), rt = "", e.report.bernoulli(11466), 0;
							a.ext = X;
							var ht = 10834;
							it.keyword = f, it.resultTitleKeyword = M, a.keyword = f, a.resultTitleKeyword = M || f;
							if (P) {
								B && B.info_list && B.info_list.length && (it.buddy = B.info_list[0], it.buddy = t.processData(it.buddy)), j && j.group_list && j.group_list.length && (it.group = j.group_list[0], it.group = i.processData(it.group)), q && q.kfuin && (q.banner = "", q.isLocalSeller = !0, q.dataObj = "acc", q.dataPrefix = "hy", q.source = 1, it.sellerEnt = q, it.sellerEnt = n.processData(it.sellerEnt), N(10852, "acc"), a.userTrack === 100 && (a.userTrack = 900, E.getInfo(function(t) {
									e.report.bernoulli(11402, a.userTrack + "^" + t.reportp2c + "^" + a.keyword)
								}))), R && R.info && R.info[0] && R.info[0].uin && (it.qidainData = R.info[0], it.qidainData = n.processData(it.qidainData)), U && U.info && U.info[0] && U.info[0].account_id && (it.publicData = n.processData(U.info[0])), F && F.group_list && F.group_list.length && (it.groupGuaGua = F.group_list[0], it.groupGuaGua.isGuaGua = 1, it.groupGuaGua = i.processData(it.groupGuaGua)), I && (I.source = 2, I.isLocalSeller = !0, n.processData(I), it.wpaData = I, it.wpaData.dataObj = "acc", it.wpaData.dataPrefix = "hy", a.userTrack === 100 && (a.userTrack = 900, E.getInfo(function(t) {
									e.report.bernoulli(11402, a.userTrack + "^" + t.reportp2c + "^" + a.keyword)
								}))), W && W.results && W.results.length !== 0 ? (W.results.splice(4), W.results.forEach(function(e, t, r) {
									r[t] = n.processData(e)
								}), it.recManufacturers = W.results) : (a.$els.accRes || (a.$els.accRes = e("#hy-find-accurate")), a.$els.accResRecManufacturers || (a.$els.accResRecManufacturers = a.$els.accRes.find(".hy-acc-container-second")), a.$els.accResRecManufacturers.hide(), a.$els.accResColumns || (a.$els.accResColumns = e("#hy-find-accurate-columns")), a.$els.accResColumns.css("border-bottom", "solid 1px transparent"));
								if (!it.buddy && !it.group && !it.sellerEnt && !it.qidainData && !it.groupGuaGua && !it.wpaData && !it.publicData && !A) {
									a.$els.loadingMask.loading("hySearchError", {
										errorCode: 6000145,
										keyWord: f,
										errorKind: D
									}), a.$els.loadingMask.find(".loading").show(), ct.loading = !0;
									var rt = b(ct);
									return e(".hy-find-fuzzy-title").html(rt), rt = "", 0
								}
								C.HyNav.show(), it.showPersonGender = !0, it.showPersonAge = !1, it.search = f, it.escapedSearch = e.utils.escape(f), a.accurateFind(it), a.$els.loadingMask.hide(), C.fuzzy.hide(), C.accurate.css({
									"z-index": "2",
									top: "0px"
								}).show(), e.report.bernoulli(ht, "pv")
							} else {
								switch (H) {
								case "jobs":
									W.info && (W.sc_info = {
										info: W.info,
										endFlag: W.endFlag,
										totalNum: W.totalNum
									}), G = W.child_category, G && (W.parent_category &&
									function() {
										W.parent_category.top_name = W.parent_category.name, W.parent_category.name = "全部", Y = W.parent_category.id, G = [W.parent_category].concat(G)
									}(), a.jobPositionDataCache = G), district = W.regioninfo && W.regioninfo.region, a.districtCache = district || a.districtCache;
									var pt = {};
									a.districtCache && a.districtCache.forEach(function(e) {
										pt[e.region_id] = e.region_name
									}), W.sc_info && W.sc_info.info && W.sc_info.info.forEach(function(e) {
										e.region_id && pt[e.region_id] && (e.job_address = pt[e.region_id])
									});
								case "seller":
									a.currentResultType = H;
									if (l.fetchtag === 1) return;
									a.userTrack === 100 && (a.userTrack = 800, E.getInfo(function(t) {
										e.report.bernoulli(11402, a.userTrack + "^" + t.reportp2c + "^" + a.keyword)
									})), V = W.sc_info || {}, V && V.info && V.info.length && e.map(V.info, function(e) {
										return e.isSameCity = !0, e.isSearchByCategory = a.isSearchByCategory, e.categoryId = a.categoryID, e
									}), e.isEmptyObject(V) && e.isEmptyObject(R) && e.isEmptyObject(U) ? (a.qidianEndFlag = 1, V = {
										endFlag: 1
									}) : !e.isEmptyObject(R) && !e.isEmptyObject(V) && (R.endFlag === 1 && V.endFlag === 1 ? V.endFlag = 1 : V.endFlag = 0), J = V.totalNum || 0, K = !a.isMoreSameCitySeller || V.endFlag === 1, Q = V.info || [], a.isMoreSameCitySeller = !K, Q = z.concat(Q), J += z.length, U && U.length && (e.map(U, function(e, t) {
										e.isPubAccount = 1
									}), Q = U.concat(Q), J += U.length), R && R.info && (R.info.length && (e.map(R.info, function(e, t) {
										e.isQidianAccount = 1
									}), Q = R.info.concat(Q)), J += R.totalNum), A ? it.city = "" : (a.mixtureSellerTotalNum = J, it.city = k.addr && (k.addr.city || k.addr.province) || "");
									var dt = R.redwords || [],
										vt = W.redwords || [],
										mt = dt.concat(vt),
										gt = {};
									for (var yt = 0; yt < mt.length; yt++) gt[mt[yt]] = yt;
									var bt = [];
									for (var wt in gt) bt.push(wt);
									console.log("iwordObj:", bt), a.redwords = Z = bt;
									if (A) {
										Q = Q.concat(a.findSameCityListCache), a.findSameCityListCache = [];
										if (Q.length !== 0) {
											if (a.findSellerNum >= a.containerNum) {
												it.mixtureSameCityIsEmpty = !1, Q.splice(a.containerNum), a.findSellerNum = Q.length, Q.forEach(function(e, t, i) {
													H === "seller" ? (i[t].dataObj = "fuz", i[t].dataPrefix = "hy", i[t].banner = "", i[t] = n.processData(e, Z), i[t].avatar = i[t].avatar100 || i[t].avatar, i[t].isLocalSeller = !0) : i[t] = r.processData(e, Z)
												}), it.mixtureSameCityList = Q, it.jobPositionData = G, it.district = district, it.currentPosition = a.categoryID || Y, a.currentPosition = it.currentPosition, x.fuzzyFind(it, H, 1);
												return
											}
											a.findSellerNum + Q.length > a.containerNum ? (a.findSameCityListCache = Q.splice(-a.findSellerNum + a.containerNum), a.findSellerNum = a.containerNum) : a.findSellerNum += Q.length, Q.forEach(function(e, t, i) {
												H === "seller" ? (i[t].dataObj = "fuz", i[t].dataPrefix = "hy", i[t].banner = "", i[t] = n.processData(e, Z), i[t].avatar = i[t].avatar100 || i[t].avatar, i[t].isLocalSeller = !0, i[t].isPubAccount ? rt += v({
													value: i[t]
												}) : i[t].isQidianAccount ? rt += d({
													value: i[t]
												}) : rt += p({
													value: i[t]
												})) : (i[t] = r.processData(e, Z), rt += m({
													value: i[t]
												}))
											}), H === "seller" ? e(".localSeller:visible").append(rt) : e(".jobs-list:visible").append(rt);
											if (!a.isMoreSameCitySeller && a.findSameCityListCache.length === 0) {
												a.showPageController("end"), a.findCgiSellerCurPage = 1, a.unbindFindFuzzyScroll(), a.isSearchByCategory || x.find({
													keyword: a.keyword,
													fetchtag: 1
												}, 1);
												return
											}
											if (a.findSellerNum >= a.containerNum) {
												a.showPageController();
												return
											}
											a.bindFindFuzzyScroll()
										} else a.findCgiSellerCurPage = 1, a.unbindFindFuzzyScroll(), a.isSearchByCategory || x.find({
											keyword: a.keyword,
											fetchtag: 1
										}, 1);
										if (!a.isMoreSameCitySeller && a.findSameCityListCache.length === 0) a.showPageController("end"), a.unbindFindFuzzyScroll();
										else if (!(a.findSellerNum < a.containerNum) || K) a.showPageController(), a.unbindFindFuzzyScroll();
										return
									}
									a.findSellerTotalPage = 1, a.findSellerCurPage = 1, a.findCgiSellerCurPage = 1;
									if (Q.length !== 0) it.mixtureSameCityIsEmpty = !1, a.findSellerNum = Q.length, a.findSellerNum > a.containerNum && (a.findSameCityListCache = a.findSameCityListCache.concat(Q.splice(a.containerNum))), Q.forEach(function(e, t, i) {
										H != "jobs" ? (i[t].dataObj = "fuz", i[t].dataPrefix = "hy", i[t].banner = "", i[t] = n.processData(e, Z), i[t].avatar = i[t].avatar100 || i[t].avatar, i[t].isLocalSeller = !0) : i[t] = r.processData(e, Z)
									}), it.mixtureSameCityList = Q, it.totalNum = J, a.bindFindFuzzyScroll();
									else {
										if (H == "jobs") {
											a.$els.loadingMask.loading("hySearchError", {
												errorCode: 6000142,
												keyWord: f,
												errorKind: "jobs"
											}), a.$els.loadingMask.find(".loading").show(), ct.loading = !0;
											var rt = b(ct);
											return e(".hy-loading-title").html(rt), rt = "", a.$els.loadingMask.show(), a.$els.fuzzy.hide(), a.$els.accurate.hide(), 0
										}
										a.findCgiSellerCurPage = 1, a.isSearchByCategory ? a.unbindFindFuzzyScroll() : x.find({
											keyword: a.keyword,
											fetchtag: 1
										}, 1)
									}
									break;
								case "qun":
									if (A) {
										if (l.fetchtag === 2) return;
										j.group_list && j.group_list.length ? (e.each(j.group_list, function(e, t) {
											t.isGuaGua = !1, i.processData(t, j.redwords)
										}), tt = j.group_list) : tt = [], a.findQunTotalNum += tt.length;
										if (!tt[0]) a.unbindFindFuzzyQunScroll();
										else {
											var Et = "";
											tt.forEach(function(e) {
												Et += c({
													value: e,
													dataObj: "fuz",
													dataPrefix: "hy"
												})
											}), a.findCgiSellerCurPage++, j.endflag === 1 && (a.findQunTotalNum = a.containerNum + 1), a.findQunTotalNum >= a.containerNum ? (a.unbindFindFuzzyQunScroll(), Et += h({
												keyword: w.escape(a.keyword)
											})) : j.endflag === 0 && a.bindFindFuzzyQunScroll(), e("#hy-search-qun-inner")[0] !== undefined ? e("#hy-search-qun-inner").append(Et) : (Et = y({
												keyword: a.keyword,
												groupMore: !0,
												group: tt,
												dataObj: "fuz",
												dataPrefix: "hy"
											}), e("#hy-find-fuzzy-rows .localSeller:visible").append(Et))
										}
										return
									}
									j.endflag === 0 && a.bindFindFuzzyQunScroll(), e.report.bernoulli(11466);
									break;
								default:
									a.$els.loadingMask.loading("hySearchError", {
										errorCode: 6000142,
										keyWord: f
									}), a.$els.loadingMask.find(".loading").show(), ct.loading = !0;
									var rt = b(ct);
									return e(".hy-loading-title").html(rt), rt = "", a.$els.loadingMask.show(), a.$els.fuzzy.hide(), a.$els.accurate.hide(), 0
								}
								ht = 10835, j.group_list && j.group_list.length ? (e.each(j.group_list, function(e, t) {
									t.isGuaGua = !1, i.processData(t, j.redwords)
								}), tt = j.group_list) : tt = [];
								if (F && F.group_list && F.group_list.length) {
									var St = [];
									e.each(F.group_list, function(e, t) {
										t.isGuaGua = !0, St.push(t.roomid), i.processData(t, (j || {
											redwords: ""
										}).redwords)
									});
									try {
										s.reportShow(11400, St, f)
									} catch (xt) {}
									tt.splice(12 - F.group_list.length), tt = tt.concat(F.group_list)
								}
								tt[0] !== undefined ? (it.groupMore = j.total > a.containerNum, tt.length >= 12 && tt.splice(12), it.group = tt, a.findQunTotalNum = tt.length) : it.group = undefined;
								if (H === "qun" && !it.group && !A || H === "seller" && !Q.length && !A) {
									a.$els.loadingMask.loading("hySearchError", {
										errorCode: 6000143,
										keyWord: f
									}), a.$els.loadingMask.find(".loading").show(), ct.loading = !0;
									var rt = b(ct);
									return e(".hy-loading-title").html(rt), rt = "", a.$els.loadingMask.show(), a.$els.fuzzy.hide(), a.$els.accurate.hide(), e.report.bernoulli(11466), 0
								}
								C.HyNav.hide(), it.keyword = f, it.jobPositionData = G, it.district = district, it.currentPosition = a.categoryID || Y, a.currentPosition = it.currentPosition, x.fuzzyFind(it, H), a.$els.loadingMask.hide(), C.accurate.hide(), C.fuzzy.css({
									"z-index": "2",
									top: "0px"
								}).show()
							}
							N(ht, "pv")
						};
					L(o, u, C)
				}
			})
		}, x.checkScrollDownEnd = function(t, n) {
			var t = t || "seller",
				r = 0;
			return t === "seller" ? e("#hy-find-fuzzy-rows .jobs-container:visible") ? r = e("#hy-find-fuzzy-rows .jobs-container:visible").height() : r = e("#hy-find-fuzzy-rows .search-row-inner:visible").height() : e(".hy-search-qun-container").prev().is(".noSCTipsContainer") ? r = e("#hy-find-fuzzy-rows .hy-search-qun-container").height() + e(".noSCTipsContainer").height() - 10 : r = e("#hy-find-fuzzy-rows .search-row-inner:visible").height() - 10, e(n).scrollTop() + 412 + 20 > r ? !0 : !1
		}, x.findFuzzyScrollQunHandler = function(e) {
			var t = window.qqfind.hybrid,
				n = {};
			x.checkScrollDownEnd("qun", this) && (t.unbindFindFuzzyQunScroll(), t.findCgiSellerCurPage === 1 && (t.findCgiSellerCurPage = 2), n = {
				keyword: t.keyword,
				fetchtag: 1
			}, x.find(n, 1)), e.preventDefault()
		}, x.findFuzzyScrollHandler = function(e) {
			var t = window.qqfind.hybrid,
				n = {};
			if (x.checkScrollDownEnd("seller", this)) {
				t.unbindFindFuzzyScroll();
				if (t.isShowNonSameCitySeller) t.findCgiSellerCurPage++, n = {
					keyword: t.keyword,
					scf: 2
				};
				else {
					if (!t.isMoreSameCitySeller) return;
					t.findCgiSellerCurPage++, n = {
						keyword: t.keyword,
						scf: 1
					}
				}
				x.find(n, 1)
			}
		}, x.fuzzyFind = function(t, n, r) {
			var i = window.qqfind.hybrid,
				s = i.$els,
				f;
			i.status = "fuzzy", s.findFuzzyRows || (s.findFuzzyRows = e("#hy-find-fuzzy-rows"));
			switch (n) {
			case "seller":
				f = o(t);
				break;
			case "jobs":
				t.currentPosition = t.currentPosition || i.currentPosition, x.recommendGroupList[t.currentPosition] ? t.recommendGroupList = x.recommendGroupList[t.currentPosition] : (t.recommendGroupList = !1, x.renderRecommendGroup(t.currentPosition, t.keyword)), i.isUserSearchAction !== 1 && e.extend(t, i.searchParams), t.salary_name = t.salary_name || "", t.keyword = t.keyword || i.keyword || "", t.pubdate_name = t.pubdate_name || "", t.jobPositionData = t.jobPositionData || i.jobPositionDataCache, t.currentRegion = i.currentSearchRegion || 0, t.district = t.district || i.districtCache, f = u(t);
				break;
			case "qun":
				f = a(t)
			}
			if (r) e("#hy-find-fuzzy-rows .search-row-inner:visible").hide(), s.findFuzzyRows.append(f), e("#hy-find-fuzzy-rows").scrollTop(0), i.findSellerTotalPage++, i.findSellerCurPage++, !i.isMoreSameCitySeller && i.findSameCityListCache.length === 0 ? (i.showPageController("end"), i.unbindFindFuzzyScroll(), i.findCgiSellerCurPage = 1, i.isSearchByCategory ? i.unbindFindFuzzyScroll() : x.find({
				keyword: i.keyword,
				fetchtag: 1
			}, 1)) : (i.unbindFindFuzzyScroll(), i.bindFindFuzzyScroll());
			else {
				var l = t.resultTitleKeyword || t.keyword,
					c = e.utils.escape(l),
					h = E._fields.lbs_addr_detail_short,
					p = i.searchResultOnlineSwitchObj[t.keyword],
					d = i.isUserSearchAction > 1 && i.searchResultDistanceSwitchObj[t.keyword],
					v;
				i.searchResultDistanceSwitchObj[t.keyword] = d, localStorage[S.uin() + "userInfo"] && (v = !0);
				var m = {
					searchKeyword: c,
					cityInfo: t.city,
					totalNum: t.totalNum,
					lbsAddr: h,
					onlineSwitch: p,
					distanceSwitch: d,
					userAddressFlag: v,
					hasSeller: n == "seller" || n == "jobs",
					searchType: n
				},
					g = b(m);
				m.loading = !1, e(".hy-find-fuzzy-title").html(g), g = "", s.findFuzzyRows.html(f), !i.isMoreSameCitySeller && i.findSameCityListCache.length === 0 ? (i.showPageController("end"), i.unbindFindFuzzyScroll(), i.findCgiSellerCurPage = 1, i.isSearchByCategory ? i.unbindFindFuzzyScroll() : x.find({
					keyword: i.keyword,
					fetchtag: 1
				}, 1)) : i.findSellerNum < i.containerNum ? (i.unbindFindFuzzyScroll(), i.bindFindFuzzyScroll()) : (i.showPageController(), i.unbindFindFuzzyScroll())
			}
		}, x.accurateFind = function(t) {
			var n = window.qqfind.hybrid,
				r = f(t);
			e("#hy-find-accurate-columns").html(r);
			var i = e(".hy-find-accurate-title"),
				o = "找到",
				u = [];
			t.wpaData && u.push("1个商家"), t.sellerEnt && u.push("1个商家"), t.publicData && u.push("1个公众号"), t.buddy && u.push("1个人"), t.group && u.push("1个群");
			if (t.groupGuaGua) {
				u.push("1个直播间");
				try {
					s.reportShow(11500, t.groupGuaGua.roomid)
				} catch (a) {}
			}
			for (var c in u) c > 0 && (c < u.length - 1 ? o += "、" : o += "和"), o += u[c];
			i.html(o);
			if (!t.recManufacturers) {
				n.$els.accRes || (n.$els.accRes = e("#hy-find-accurate")), n.$els.accResRecManufacturers || (n.$els.accResRecManufacturers = n.$els.accRes.find(".hy-acc-container-second")), n.$els.accResRecManufacturers.hide(), n.$els.accResColumns || (n.$els.accResColumns = e("#hy-find-accurate-columns")), n.$els.accResColumns.css("border-bottom", "solid 1px transparent");
				return
			}
			n.$els.accRes || (n.$els.accRes = e("#hy-find-accurate")), n.$els.accResRecManufacturers || (n.$els.accResRecManufacturers = n.$els.accRes.find(".hy-acc-container-second")), n.$els.accResRecManufacturers.show(), n.$els.accResColumns || (n.$els.accResColumns = e("#hy-find-accurate-columns")), n.$els.accResColumns.css("border-bottom", "solid 1px #e4eaec"), t.recManufacturers.splice(4);
			var h = l({
				manufactures: t.recManufacturers
			});
			e("#hy-find-accurate").find(".hy-acc-container-second .item").html(h)
		}, x.findRecommendGroup = function(t, n, r) {
			E.getInfo(function(s) {
				var o = s.lbs_addr_city_id || s.lbs_addr_detail_id;
				if (!x.recommendGroupList[t]) {
					var u = +(new Date),
						a = "http://cgi.find.qq.com/qqfind/job/related_group";
					return x.recommendGroupLoadingStatus[t] = -1, w.request({
						type: "POST",
						url: a,
						dataType: "json",
						data: {
							category_id: t,
							category_name: n,
							city_id: o
						},
						error: function(e, t, n) {
							var r;
							t === "timeout" ? r = 6011666 : t === "error" ? (r = "6011", r += e.status) : r = 5000002, this.success({
								retcode: r
							})
						},
						success: function(n) {
							try {
								e.report.mmReport(a, n.retcode, +(new Date) - u)
							} catch (s) {}
							n.retcode === 0 && n.result && n.result.group_list && n.result.group_list.length ? (x.recommendGroupList[t] = n.result.group_list, e.each(n.result.group_list, function(e, t) {
								i.processData(t)
							}), x.recommendGroupLoadingStatus[t] && x.recommendGroupLoadingStatus[t] != -1 && (x.recommendGroupLoadingStatus[t](n.result.group_list), x.recommendGroupLoadingStatus[t] = 0), r && r(n.result.group_list)) : (r && r(!1), x.recommendGroupLoadingStatus[t] && x.recommendGroupLoadingStatus[t] != -1 && (x.recommendGroupLoadingStatus[t](!1), x.recommendGroupLoadingStatus[t] = 0))
						}
					})
				}
				r(x.recommendGroupList[t])
			})
		}, x.renderRecommendGroup = function(t, n) {
			var r = E._fields.lbs_addr_city_id || E._fields.lbs_addr_detail_id,
				i = function(t) {
					if (!t) e(".jobs-recom-group-list:visible").html("加载失败");
					else {
						var n = "";
						for (var r in t) n += g({
							value: t[r]
						});
						e(".jobs-recom-group-list:visible").html(n), e(".jobs-recom-group-title").html('"' + e.hybrid.keyword + '"相关的群')
					}
				};
			x.recommendGroupLoadingStatus[t] == -1 ? x.recommendGroupLoadingStatus[t] = i : x.findRecommendGroup(t, n, i)
		}, e.hybridFinder = x
	}), define("tmpl!template/copyrightDialog.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="dialog">\r\n    <div class="dialog-wrapper">\r\n        <div class="dialog-header">\r\n            <p><i class="icon-qq"></i> 提示</p>\r\n            <a href="#" title="关闭" id="copyright-dialog-close">×</a>\r\n        </div>\r\n        <p>查看附近的人，将使用你的位置信息，开启后您可以查看到同样开启该功能的用户距离信息并可以</p>\r\n\r\n        <p>和附近的人发起临时会话。点击<span></span>可关闭或开启该功能。</p>\r\n\r\n        <div class="dialog-footer">\r\n            <a href="#" title="我知道了" id="copyright-dialog-ok"> 我知道了 </a>\r\n        </div>\r\n    </div>\r\n    <div class="dialog-mask"></div>\r\n</div>';
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("model/lbs", ["$", "tmpl!template/copyrightDialog.html", "tools/native", "tools/utils", "tools/info", "tools/cookie", "tools/reportBasic"], e) : e($)
	}(function(e, t, n, r, i, s, o) {
		"use strict";
		var u = "lbs",
			a = "enable",
			f = "disable",
			l = "unknown",
			c = 0,
			h = 1,
			p = "http://cgi.find.qq.com/qqfind/lbs/get_auth_flag",
			d = "http://cgi.find.qq.com/qqfind/lbs/set_auth_flag",
			v = "http://cgi.find.qq.com/qqfind/lbs/get_neighbor",
			m = "http://cgi.find.qq.com/qqfind/lbs/set_local",
			g = "开启位置信息，查看附近的人",
			y = "关闭位置信息，停止查看附近的人",
			b = {
				_location: l,
				_service: l,
				isInited: !1
			};
		return b.init = function() {
			if (this.isInited) return;
			this.isInited = !0;
			var t = this,
				n = +(new Date);
			return r.request({
				type: "GET",
				url: p,
				data: r.getCSRFParam(),
				dataType: "json",
				error: function() {
					this.success({
						retcode: 404
					})
				},
				success: function(r) {
					try {
						e.report.mmReport("http://cgi.find.qq.com/qqfind/lbs/get_auth_flag", r && r.retcode, +(new Date) - n)
					} catch (i) {}
					Number(r.location) === h ? (t._location = a, o.bernoulli(12153)) : (t._location = f, o.bernoulli(12152)), Number(r.service) === h ? t._service = a : t._service = f, t.updateView(), e(document).trigger("lbs:stateinit", [t._location])
				}
			})
		}, b.updateView = function() {
			b.$el || (b.$el = e(".btn-loc"));
			var t = "";
			this._location == a ? (b.$el.addClass("enable"), b.$el.removeClass("disable"), t = y) : (b.$el.removeClass("enable"), b.$el.addClass("disable"), t = g), e(".tooltip-inner").text(t)
		}, b.setAuthFlag = function(t, n) {
			var i = this,
				s = +(new Date);
			r.request({
				type: "POST",
				url: d,
				dataType: "json",
				data: t,
				error: function() {
					this.success({
						retcode: 404
					})
				},
				success: function(r) {
					try {
						e.report.mmReport("http://cgi.find.qq.com/qqfind/lbs/set_auth_flag", r && r.retcode, +(new Date) - s)
					} catch (o) {}
					Number(t.location) === h ? i._location = a : i._location = f, Number(t.service) === h && (i._service = a), i.updateView(), e(document).trigger("lbs:statechange", [i._location]), n && n(i._location)
				}
			})
		}, b.neighbor = function(t, i) {
			var s = "",
				o = "";
			try {
				var u = JSON.parse(n.getWifiData());
				s = u.data, o = u.signature
			} catch (a) {
				s = "", o = ""
			}
			var f = +(new Date);
			r.request({
				type: "POST",
				url: v,
				dataType: "json",
				data: e.extend({
					li: s,
					sign: o
				}, t),
				success: function(t) {
					try {
						e.report.mmReport("http://cgi.find.qq.com/qqfind/lbs/get_neighbor", t && t.retcode, +(new Date) - f)
					} catch (n) {}
					i && i(t)
				},
				error: function(e, t, n) {
					var r;
					t === "timeout" ? r = 6021666 : t === "error" ? (r = "6021", r += e.status) : r = 5000002, this.success({
						retcode: r
					})
				}
			})
		}, b.showAuthServiceDialog = function(n) {
			var r = this;
			if (!b.isDialogShow) {
				var i = b.dialog = {};
				i.el = e("#copyright-dialog"), i.el.html(t()), i.el.show(), i.okButton = e("#copyright-dialog-ok"), i.closeButton = e("#copyright-dialog-close"), i.closeButton.on("click", function(t) {
					e.report.bernoulli(10823), b.dialog.el.hide()
				}), i.okButton.on("click", function(t) {
					e.report.bernoulli(10822), r.setAuthFlag({
						location: h,
						service: h
					}, n), b.dialog.el.hide()
				})
			}
			b.dialog.el.show()
		}, b.enable = function(e) {
			return this.showAuthServiceDialog(e)
		}, b.disable = function(e) {
			this.setAuthFlag({
				location: c
			}, e)
		}, b.toggle = function(t, n) {
			if (this._service === l) return;
			var r = n == "hy" ? "hybrid" : "people";
			this._location === a ? (e.report.bernoulli(10820, r), this.disable(t)) : (e.report.bernoulli(10819, r), this.enable(t))
		}, b.state = function() {
			return this._location
		}, e[u] = b
	}), !
	function(e) {
		typeof define == "function" ? define("model/activity", ["$", "tools/utils"], e) : e($)
	}(function(e, t) {
		"use strict";
		var n = {},
			r = 15,
			i = 9;
		return n.resetConfig = function() {
			n.cgiCurPage = 0, n.isEnd = !1, n.ext = "", n.dataCache = [], n.count = 0, n.id = 0
		}, n.resetConfig(), n.loadData = function(e, i) {
			var s = "http://cgi.find.qq.com/qqfind/biz/act_city";
			return e.ext = n.ext, e.page = n.cgiCurPage, e.num = r, t.request({
				type: "POST",
				url: s,
				dataType: "json",
				data: e,
				error: function(e, t, n) {
					var r;
					t === "timeout" ? r = 6011666 : t === "error" ? (r = "6011", r += e.status) : r = 5000002, this.success({
						retcode: r
					})
				},
				success: function(e) {
					i && i(e)
				}
			})
		}, n.get = function(t, r, s) {
			r ? (t.id = n.id || t.id || 0, n.dataCache && n.dataCache.length < i ? n.isEnd ? s({
				info: n.dataCache.splice(0, i),
				isEnd: n.isEnd
			}) : n.loadData(t, function(i) {
				i && !i.retcode ? (n.cgiCurPage++, n.isEnd = i.result.endFlag, n.ext = i.result.ext, i.result.info && i.result.info.length > 0 ? (e.each(i.result.info, function(e, t) {
					n.processDatas(t)
				}), n.dataCache = n.dataCache.concat(i.result.info)) : n.isEnd = !0, n.get(t, r, s)) : (n.isEnd = !0, s({
					isEnd: n.isEnd
				}))
			}) : s({
				info: n.dataCache.splice(0, i),
				isEnd: n.isEnd
			})) : (n.resetConfig(), n.id = t.id || 0, n.get(t, !0, s))
		}, n.processDatas = function(r) {
			r.key = n.count++;
			try {
				var i = e.parseJSON(r.address);
				r.address = i.province + i.city + i.district + i.street
			} catch (s) {}
			r.address = t.escape(r.address) || "", r.picUrl = r.pic_url || r.picUrl || "", r.title = t.escape(r.name) || t.escape(r.title) || "";
			try {
				var o = e.parseJSON(r.time),
					u, a, f, l;
				o.data[0].d ? (u = new Date(o.data[0].d), f = new Date(o.data[0].bt * 1e3), l = new Date(o.data[0].et * 1e3), r.time = u.getMonth() + 1 + "月" + u.getDate() + "日   " + f.Format("hh:mm") + " - " + l.Format("hh:mm")) : o.data[0].bd && o.data[0].ed && (u = new Date(o.data[0].bd), a = new Date(o.data[0].ed), r.time = u.getMonth() + 1 + "月" + u.getDate() + "日 - " + (a.getMonth() + 1) + "月" + a.getDate() + "日")
			} catch (s) {
				r.time = t.escape(r.time)
			}
			r.wpa_ck && (r.wpa_ck += "&showUserName=" + t.encodeBase64(seller.originName))
		}, n
	}), define("tmpl!template/activities.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<div id="hy-free-activities" hidden>\r\n    <div class="container" style="position: relative;">\r\n        <div class="hy-subcategory">\r\n            <span class="free-activity-title">', nav ? __p += "" + ((__t = nav) == null ? "" : __t) + "" : __p += "同城活动", __p += '</span>\r\n            <div class="back-home" data-coupon-cmd="close" data-overlay="hybrid"\r\n                 data-current="fre"><i class="btn-arrow-back"></i> 返回</div>\r\n            <a href="#" data-obj="11459" data-action="2" data-value="http://shang.qq.com/business/activity/form.php" target="_blank" class="blue fankui right" title="免费发布活动">免费发布活动</a>\r\n        </div>\r\n        <div class="content-container">\r\n            <ul class="seller-list">\r\n                ';
				for (var key in activities) __p += '\r\n                <li class="seller-item" data-index="' + ((__t = key) == null ? "" : __t) + '" data-message-id="' + ((__t = activities[key].id) == null ? "" : __t) + '" data-action="3" data-value="' + ((__t = activities[key].uin) == null ? "" : __t) + '">\r\n                    <div class="image-wrapper">\r\n                        <img src="' + ((__t = activities[key].picUrl) == null ? "" : __t) + '"  onerror="this.src=\'http://find.qq.com/img/seller270-default-avatar.jpg\'">\r\n                    </div>\r\n                    <div class="seller-msg">\r\n                        <div class="line1">\r\n                            <span class="activity-title" title="' + ((__t = activities[key].title) == null ? "" : __t) + '">' + ((__t = activities[key].title) == null ? "" : __t) + "</span>\r\n                        </div>\r\n                        ", activities[key].time && (__p += '\r\n                        <div class="line2">\r\n                            <div class="activity-time">时间:' + ((__t = activities[key].time) == null ? "" : __t) + "</div>\r\n                        </div>\r\n                        "), __p += "\r\n                        ", activities[key].address && (__p += '\r\n                        <div class="line3">\r\n                            <div class="activity-address" title="地点:' + ((__t = activities[key].address) == null ? "" : __t) + '">地点:' + ((__t = activities[key].address) == null ? "" : __t) + "</div>\r\n                        </div>\r\n                        "), __p += '\r\n                    </div>\r\n\r\n                    <div class="mask-container">\r\n                        ', activities[key].isFree == 1 && (__p += '<div class="free_mask"></div>'), __p += "\r\n                        ", activities[key].isHot == 1 && (__p += '<div class="hot_mask"></div>'), __p += "\r\n                        ", activities[key].isLimit == 1 && (__p += '<div class="limit_mask"></div>'), __p += "\r\n                    </div>\r\n                </li>\r\n                ";
				__p += '\r\n            </ul>\r\n            <div class="activity-pagination"></div>\r\n        </div>\r\n    </div>\r\n</div>'
			}
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/activities", ["../$", "../hybrid", "tmpl!../template/activities.html", "tools/native", "tools/info"], e) : e($)
	}(function(e, t, n, r, i) {
		var s = {};
		return s.currentArea = 0, s.activityData = {}, s.reportp2c = "0^0", s.loadData = function(n) {
			n = n || "", t = t || e.hybrid, s.currentArea = n || 0, t.MaskLoading.loading("hide"), t.MaskLoading.loading("show", {
				status: "search"
			}), e.utils.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/activity/get_same_city",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				data: {
					id: 110100
				},
				error: function(e, n, r) {
					t.search("同城活动", !0)
				},
				success: function(e, n, r) {
					e && e.retcode == 0 && e.info && e.info.length > 0 ? (s.processDatas(e.info), s.render({
						activities: e.info,
						nav: null
					})) : t.search("同城活动", !0)
				}
			}), t.$els.fuzzy.hide(), t.$els.accurate.hide(), t.isSearchResultLayerDisplay = !0, t.$els.loadingMask.show()
		}, s.render = function(r) {
			var o = n(r);
			t = t || e.hybrid, e("#hy-free-activities").length > 0 && e("#hy-free-activities").remove(), e("#hy-main").append(o), t.$els.loadingMask.hide(), e("#hy-free-activities").show(), s.bindHandler(), e.report.bernoulli(11458), i.getInfo(function(e) {
				s.reportp2c = e.reportp2c
			})
		}, s.processDatas = function(e) {
			for (var t in e) {
				for (var n in e[t].target) e[t].target.value = e[t].target[n], e[t].target.name = n, e[t].id = t, e[t].trade = "同城活动";
				s.activityData[t] = e[t]
			}
		}, s.bindHandler = function() {
			var n = e("#hy-free-activities");
			n.on("click", '[data-coupon-cmd="close"]', function(n) {
				var r = e("#hy-free-activities");
				t.isSearchResultLayerDisplay = !1, t.$els.loadingMask.hide(), t.$els.fuzzy.hide(), t.$els.accurate.hide(), e("#hy-recommend").show(), e("#hy-activity315").hide(), e("#hy-main .qiqi-room").hide(), r.hide(), r.css({
					"z-index": "0",
					top: 0
				}), n.preventDefault(), t.userTrack = 0
			}), n.on("click", "[data-action]", function(t) {
				var n = e(this),
					i = n.data("action"),
					o = n.data("value"),
					u = n.data("source"),
					a = n.data("type"),
					f = n.data("index"),
					l = n.data("loc"),
					c = e.hybrid.userTrack;
				switch (i) {
				case 0:
					r.startChat(o), l == "btn" && e.report.bernoulli(11463, f), c += 30, s.reportTrack(c);
					break;
				case 1:
					r.addToGroup(o, 104, 201), l == "btn" && e.report.bernoulli(11464, f), c += 50, s.reportTrack(c);
					break;
				case 2:
					window.open(o), l == "btn" && (e.report.bernoulli(11465, f), c += 60, s.reportTrack(c)), l == "organizer" && (c += 40, s.reportTrack(c), e.report.bernoulli(11462, f));
					break;
				case 3:
					c += 10, s.reportTrack(c);
					var h = e(this).data("message-id");
					profileMask && profileMask.openProfile({
						source: 2,
						others_id: o,
						type: a,
						trajectory: c + "^" + s.reportp2c + "^" + e.hybrid.keyword
					}), e.report.bernoulli(11461, f)
				}
				t.stopPropagation(), t.preventDefault()
			}), n.on("click", "[data-obj]", function() {
				var t = e(this),
					n = t.data("obj");
				e.report.bernoulli(n)
			})
		}, s.reportTrack = function(t) {
			i.getInfo(function(n) {
				e.report.bernoulli(11402, t + "^" + n.reportp2c + "^" + e.hybrid.keyword)
			})
		}, e.activities = s
	}), function(e) {
		typeof define == "function" ? define("widget/sosoMap.init", ["$"], e) : e($)
	}(function(e) {
		"use strict";
		var t = {};
		return t.isInited = !1, t.cgiSend = !1, t.callbackCacheArray = [], window.findmapinit = function() {
			t.isInited = !0, t.callbackCacheArray.forEach(function(e, t, n) {
				e(), n.splice(t, 1)
			})
		}, t.init = function(t) {
			var n = this;
			n.isInited ? t && t() : (n.cgiSend || (e.ajax("http://map.qq.com/api/js?callback=findmapinit&v=2.0", {
				dataType: "script"
			}), n.cgiSend = !0), t && n.callbackCacheArray.push(t))
		}, t.ready = t.init, t
	}), define("widget/hybrid.user.sosoMapLocationGenerator", ["../$", "tools/cookie"], function(e, t) {
		"use strict";
		var n = e(document),
			r = {
				isInited: !1,
				initOpened: !0,
				defLoc: ["1", "11", "1", "2"],
				oriLoc: null,
				provinceArr: null,
				cityArr: null,
				districtArr: null,
				$els: {},
				locArr: "",
				locMap: {},
				init: function(n) {
					var r = this,
						i;
					r.initOpened = !0;
					if (i = window.localStorage[t.uin() + "selectLocationArray"]) try {
						r.oriLoc = JSON.parse(i)
					} catch (s) {} else r.oriLoc = ["1", n.p2c.split("_")[0], n.p2c.split("_")[1]];
					if (!r.isInited) {
						r.locMap = window.locationMap, r.$els = {
							provinceUL: e("#soso-province-ul"),
							cityUL: e("#soso-city-ul"),
							districtUL: e("#soso-district-ul"),
							provinceValue: e("#soso-province-value"),
							cityValue: e("#soso-city-value"),
							districtValue: e("#soso-district-value")
						};
						try {
							n.p2c.split("_").length !== 2 && (n.p2c = "11_1")
						} catch (s) {
							n.p2c = "11_1"
						}
						r.oriLoc = r.oriLoc || ["1", n.p2c.split("_")[0], n.p2c.split("_")[1]], r.locArr = r.defLoc, r.initHandler(), r.isInited = !0
					}
					r.showEachLocationValue()
				},
				showEachLocationValue: function() {
					var e = this;
					e.constructProvinceUL(!0)
				},
				constructProvinceUL: function(e) {
					var t = this,
						r, i = 0;
					t.$els.provinceUL.empty();
					for (var s in r = t.locMap[1]) {
						if (s === "n") continue;
						if (r[s]["n"] == "") continue;
						var o = '<li data-value="' + s + '">' + r[s].n + "</li>";
						i++, e || i === 1 && t.$els.provinceValue.val(r[t.locArr[1]].n), t.$els.provinceUL.append(o)
					}!e || (t.$els.provinceValue.val(r[t.oriLoc[1]].n), t.locArr[1] = t.oriLoc[1]), n.trigger("sosolocationchooser:provincechanged", [e])
				},
				constructCityUL: function(e) {
					var t = this,
						r = {},
						i = 0;
					t.$els.cityUL.empty(), r = e ? t.locMap[1][t.oriLoc[1]] : t.locMap[1][t.locArr[1]], r[t.oriLoc[2]] || (e = !1);
					for (var s in r) {
						if (s === "n") continue;
						if (r[s].n === "") continue;
						var o = '<li data-value="' + s + '">' + r[s].n + "</li>";
						i++, t.$els.cityUL.append(o), e || i === 1 && (t.$els.cityValue.val(r[s].n), t.locArr.splice(2, 1, s))
					}!e || (t.$els.cityValue.val(r[t.oriLoc[2]].n), t.locArr[2] = t.oriLoc[2]), n.trigger("sosolocationchooser:citychanged", [e])
				},
				constructDistrictUL: function(e) {
					var t = this,
						r = {},
						i = 0;
					t.$els.districtUL.empty();
					for (var s in r = e ? t.locMap[1][t.oriLoc[1]][t.oriLoc[2]] : t.locMap[1][t.locArr[1]][t.locArr[2]]) {
						if (s === "n") continue;
						if (r[s].n === "") continue;
						var o = '<li data-value="' + s + '">' + r[s].n + "</li>";
						i++, (!e || !t.oriLoc[3]) && i === 1 && (t.$els.districtValue.val(r[s].n), t.locArr.splice(3, 1, s), e && t.oriLoc.splice(3, 1, s)), t.$els.districtUL.append(o)
					}
					return t.oriLoc[3] && e && i !== 0 && (t.$els.districtValue.val(r[t.oriLoc[3]].n), t.locArr.splice(3, 1, t.oriLoc[3])), n.trigger("sosolocationchooser:districtchanged", [e]), i === 0 ? !1 : !0
				},
				initHandler: function() {
					var t = this;
					n.on("sosolocationchooser:provincechanged", function(e, n) {
						t.constructCityUL(n), e.preventDefault()
					}), n.on("sosolocationchooser:citychanged", function(e, n) {
						t.constructDistrictUL(n) ? t._showDistrictChooser() : (t._hideDistrictChooser(), t.$els.districtValue.val(""), t._locationSelectionDone(n)), e.preventDefault()
					}), n.on("sosolocationchooser:districtchanged", function(e, n) {
						t._locationSelectionDone(n), e.preventDefault()
					}), e("#find-soso-map-container .location-picker").on("click", function(n) {
						var r = e(this),
							i = r.data("iden"),
							s = t.$els[i + "UL"].is(":visible");
						t._hideAllLocationChooseUL(), s || t.$els[i + "UL"].show(), n.preventDefault(), n.stopPropagation()
					}), e("#find-soso-map-container").on("click", "[data-value]", function(r) {
						var i = e(this),
							s = i.parent("ul"),
							o = s.data("iden"),
							u = i.data("value"),
							a = i.text(),
							f = {
								province: 1,
								city: 2,
								district: 3
							},
							l = {
								province: 8,
								city: 11,
								district: 14
							};
						t._hideAllLocationChooseUL(), t.$els[o + "Value"].val(a), t.locArr.splice(f[o], 1, u);
						try {
							window.FINDMAP.zoomTo(l[o])
						} catch (c) {}
						n.trigger("sosolocationchooser:" + o + "changed"), r.stopPropagation()
					}), e("#find-soso-map-container").on("click", function(e) {
						t._hideAllLocationChooseUL()
					}), e("#map-search-button").on("click", function(e) {
						t.initOpened = !1, t._changeSoSoMapPin(), e.stopPropagation(), e.preventDefault()
					}), e("#soso-selection-form").on("submit", function(e) {
						t.initOpened = !1, t._changeSoSoMapPin(), e.stopPropagation(), e.preventDefault()
					})
				},
				_changeSoSoMapPin: function(t) {
					var n = this._constructLocationWording(t),
						r = e("#detail-location").val(),
						i = n + r;
					try {
						r.trim() !== "" && window.FINDMAP.zoomTo(16)
					} catch (s) {}
					window.FINDMAP.geocoderDetailAddress.getLocation(i)
				},
				_showDistrictChooser: function() {
					e(".location-picker").removeClass("smaller"), e(".location-input").removeClass("larger")
				},
				_hideDistrictChooser: function() {
					e(".location-picker").addClass("smaller"), e(".location-input").addClass("larger")
				},
				_hideAllLocationChooseUL: function() {
					this.$els.provinceUL.hide(), this.$els.cityUL.hide(), this.$els.districtUL.hide()
				},
				_locationSelectionDone: function(n) {
					var r = null,
						i;
					e("#detail-location").val("").focus();
					if (n) {
						r = localStorage[t.uin() + "userInfo"];
						if (r) try {
							r = JSON.parse(r), window.FINDMAP.zoomTo(16);
							if (r.longitude && r.longitude !== 116) {
								var s = new soso.maps.LatLng(r.latitude, r.longitude);
								window.FINDMAP.geocoderDetailLocation.getAddress(s)
							} else window.FINDMAP.geocoderDetailAddress.getLocation(r.lbs_addr_detail)
						} catch (o) {} else this._changeSoSoMapPin(n)
					} else this._changeSoSoMapPin(n);
					window.localStorage[t.uin() + "selectLocationArray"] = JSON.stringify(this.locArr)
				},
				_constructLocationWording: function(e) {
					try {
						var t = this.$els;
						return t.provinceValue.val().trim() + t.cityValue.val().trim() + t.districtValue.val().trim()
					} catch (n) {
						return ""
					}
				}
			};
		return r
	}), function(e) {
		typeof define == "function" ? define("widget/hybrid.user.sosoMap", ["$", "./sosoMap.init", "./hybrid.user.sosoMapLocationGenerator", "tools/utils", "tools/info"], e) : e($)
	}(function(e, t, n, r, i) {
		var s = {};
		return s.isInit = !1, s.init = function(e) {
			var n = this;
			if (n.isInit) {
				e && e();
				return
			}
			t.init(function() {
				i.getInfo(function(t) {
					n.initUserInfo(t), e && e()
				})
			})
		}, s.initUserInfo = function(t) {
			try {
				var s = {
					wrongAddress: !1
				},
					o, u = new soso.maps.LatLng(t.latitude, t.longitude),
					a = {
						zoom: 11,
						center: u,
						mapTypeId: soso.maps.MapTypeId.ROADMAP
					},
					f = new soso.maps.Point(7, 33),
					l = new soso.maps.Size(13, 33),
					c = new soso.maps.Point(0, 0),
					h = new soso.maps.MarkerImage("http://s.url.cn/qqfind/img/red-pin.png", l, c, f);
				window.FINDMAP = o = new soso.maps.Map(e("#find-soso-map-inner-container")[0], a);
				var p = function(e) {
						soso.maps.Overlay.call(this, e)
					};
				p.prototype = new soso.maps.Overlay, p.prototype.construct = function() {
					this.dom = document.createElement("span"), this.dom.style.cssText = "background:transparent;color:white;position:absolute;display:block;trasnparent:.8;border:none;text-align:center;width:200px;height:47px", this.dom.innerHTML = '<div id="soso-overlay-location-tip" style="color:black;border-radius: 4px;background-color: #fff;display:inline-block;padding:3px 9px 0;text-align:center;margin-top:6px;border: 1px solid #777b71;height:40px;overflow:hidden;"></div><b style="position:absolute;width:9px;height:9px;background-color:#fff;transparent:.8;border-top:1px solid #777b71;border-right:1px solid #777b71;-webkit-transform:rotate(135deg);left:95px;top:46px;"></b>', this.getPanes().overlayLayer.appendChild(this.dom)
				}, p.prototype.draw = function(e) {
					e || (e = s.labelLocation);
					var e = e || this.get("position");
					if (e) {
						var t = this.getProjection().fromLatLngToDivPixel(e);
						this.dom.style.left = t.getX() - 100 + "px", this.dom.style.top = t.getY() - 92 + "px"
					}
				}, p.prototype.destroy = function() {
					this.dom.parentNode.removeChild(this.dom)
				}, p.prototype.setText = function(t) {
					var n = "20px",
						i = "26px";
					r.getStrLength(t) <= 30 || (r.getStrLength(t) >= 60 && (t = r.subString(t, 56) + "......"), n = "40px", i = "6px"), e(this.dom).find("#soso-overlay-location-tip").html(t).css("height", n).css("marginTop", i)
				};
				var d = null,
					v = new soso.maps.Marker({
						position: u,
						map: window.FINDMAP
					});
				v.setClickable(!0), v.setDraggable(!1), v.setIcon(h), d = new p({
					map: window.FINDMAP,
					position: u
				}), window.label = d, v.bindTo("position", o, "center"), d.bindTo("position", o, "center"), soso.maps.event.addListener(o, "center_changed", function(e) {
					var t = o.getCenter();
					g.getAddress(t), i._fields.longitude = parseFloat(t.getLng().toFixed(6)), i._fields.latitude = parseFloat(t.getLat().toFixed(6)), v.notify("overlayRedraw")
				});

				function m(t) {
					var n = t && t.detail || {},
						r = n.addressComponents || {},
						o = !1;
					i._fields.lbs_addr_country = r.country || "", i._fields.lbs_addr_province = r.province || "", i._fields.lbs_addr_city = r.city || "", i._fields.lbs_addr_district = r.district || "", i._fields.lbs_addr_street = r.street || r.town || "", !i._fields.lbs_addr_detail_tmp && !i._fields.lbs_addr_detail_short_tmp ? i._fields.lbs_addr_detail === i._fields.lbs_addr_detail_short && (o = !0) : e("#detail-location").blur(), i._fields.lbs_addr_detail_tmp = n.address || "", i._fields.lbs_addr_detail_short_tmp = (i._fields.lbs_addr_city ? "" : i._fields.lbs_addr_province) + i._fields.lbs_addr_city + i._fields.lbs_addr_district + i._fields.lbs_addr_street, i._fields.lbs_addr_detail_short_tmp.trim() === "" ? i._fields.lbs_addr_detail_short_tmp = "暂无地址信息" : (i._fields.lbs_addr_detail_short_tmp = i._fields.lbs_addr_detail_short_tmp.replace(/^中国/gi, ""), i._fields.lbs_addr_detail_tmp = i._fields.lbs_addr_detail_tmp.replace(/^中国/gi, ""), s.wrongAddress ? (d.setText("未找到相应位置，请重新输入或拖拽地图确认位置"), s.wrongAddress = !1) : o ? i._fields.lbs_addr_province === i._fields.lbs_addr_city ? d.setText(i._fields.lbs_addr_city) : d.setText(i._fields.lbs_addr_province + i._fields.lbs_addr_city) : d.setText(i._fields.lbs_addr_detail_tmp))
				}
				var g = new soso.maps.Geocoder({
					complete: function(e) {
						m(e)
					},
					error: function(e) {
						y.getLocation(i._fields.lbs_addr_detail)
					}
				}),
					y = new soso.maps.Geocoder({
						complete: function(t) {
							var r = t.detail || {},
								i = r.location || new soso.maps.LatLng(39.916527, 116.397128),
								o = r.gps_type;
							o === "1" && n.initOpened === !1 && e("#detail-location").val() !== "" && (s.wrongAddress = !0), i && window.FINDMAP.setCenter(i)
						}
					});
				window.FINDMAP.geocoderDetailAddress = y, window.FINDMAP.geocoderDetailLocation = g;
				if (t.longitude === 116) {
					var b = t.lbs_addr_detail;
					b === "暂无地址信息" && (b = "北京天安门"), y.getLocation(b)
				}
			} catch (w) {
				window.FINDMAP = null
			}
		}, s.show = function() {
			s.init(function() {
				e("#find-soso-map-container").show(), e(".page-mask").show(), n.init(i._fields)
			})
		}, s
	}), define("tmpl!template/hyHotWords.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<ul>\r\n    ", $.each(obj, function(e, t) {
				__p += '\r\n    <li><a class="white"\r\n           href="#" data-search="true" data-prefix="hy"\r\n           data-config-action="' + ((__t = t.action) == null ? "" : __t) + '"\r\n           data-special="' + ((__t = t.special) == null ? "" : __t) + '"\r\n           data-trigger="hotwords" data-obj="' + ((__t = e) == null ? "" : __t) + '"\r\n           data-decorate-word="' + ((__t = t.decorateWord) == null ? "" : $.escape(__t)) + '"\r\n           data-keyword="' + ((__t = t.originalWord) == null ? "" : $.escape(__t)) + '">' + ((__t = t.word) == null ? "" : __t) + "</a></li>\r\n    "
			}), __p += "\r\n</ul>";
			return __p
		}
	}), define("tmpl!template/hyRecommendMenuNav.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<div class="industry">\r\n    <ul class="category-list">\r\n\r\n        ';
				for (var key in industry) {
					var current_industry = industry[key];
					__p += '\r\n            <li class="category-item">\r\n                <div class="background">\r\n                    <i class="border-mask"></i>\r\n                </div>\r\n                <a href="#" class="category-title">\r\n                    <i class="icon-container"><img src="' + ((__t = current_industry.icon) == null ? "" : __t) + '"></i>\r\n                    ' + ((__t = current_industry.category) == null ? "" : __t) + '\r\n\r\n                </a>\r\n                    <button class="btn-extend-category"></button>\r\n                <div class="subcategory">\r\n                    ';
					for (var i in current_industry.recommends) {
						var recommend_word = current_industry.recommends[i];
						__p += '\r\n                        <a href="#" class="hy-subcategory-item" data-recom-menu-search="' + ((__t = recommend_word.industry || recommend_word.industry1) == null ? "" : __t) + '"\r\n                            data-category-index=""\r\n                            data-service-industry="' + ((__t = recommend_word.service_industry) == null ? "" : __t) + '"\r\n                            data-nav-behavior="' + ((__t = recommend_word.action) == null ? "" : __t) + '"\r\n                            data-nav-behavior-command="' + ((__t = recommend_word.special) == null ? "" : __t) + '"\r\n                            data-industry-full-nav="' + ((__t = current_industry.category) == null ? "" : __t) + " - " + ((__t = recommend_word.showword) == null ? "" : __t) + '"\r\n                            data-report-id="' + ((__t = recommend_word.reportid) == null ? "" : __t) + '"\r\n                            data-name-account="' + ((__t = recommend_word.kfuin) == null ? "" : __t) + '"\r\n                            data-source="' + ((__t = recommend_word.source) == null ? "" : __t) + '"\r\n                            data-seller-others-id="' + ((__t = recommend_word.others_id) == null ? "" : __t) + '"\r\n                            >' + ((__t = recommend_word.showword) == null ? "" : __t) + "</a>\r\n                    "
					}
					__p += '\r\n                </div>\r\n\r\n                <div class="extend-category-container">\r\n                    <div class="extend-category">\r\n                        ';
					for (var j in current_industry.items) {
						var category = current_industry.items[j];
						__p += '\r\n                        <div class="category-tree">\r\n                            <div class="parent-industry">\r\n                                <div class="parent-title">' + ((__t = category.sub_category) == null ? "" : __t) + '</div>\r\n                            </div>\r\n                            <div class="child-industry">\r\n                                <ul>\r\n                                    ';
						for (var k in category.items) {
							var category_item = category.items[k];
							__p += '\r\n                                        <li>\r\n                                            <div class="leftline"></div>\r\n                                            <a href="#" class="child-industry-item', category_item.isRecommend && (__p += " hot"), __p += '"\r\n                                               data-recom-menu-search="' + ((__t = category_item.industry1) == null ? "" : __t) + '"\r\n                                               data-category-index=""\r\n                                               data-service-industry="' + ((__t = category_item.service_industry) == null ? "" : __t) + '"\r\n                                               data-nav-behavior="' + ((__t = category_item.action) == null ? "" : __t) + '"\r\n                                               data-nav-behavior-command="' + ((__t = category_item.special) == null ? "" : __t) + '"\r\n                                               data-industry-full-nav="' + ((__t = category.sub_category) == null ? "" : __t) + " - " + ((__t = category_item.showword) == null ? "" : __t) + '"\r\n                                               data-report-id="' + ((__t = category.reportid) == null ? "" : __t) + '"\r\n                                               data-name-account="' + ((__t = category_item.kfuin) == null ? "" : __t) + '"\r\n                                               data-source="' + ((__t = category_item.source) == null ? "" : __t) + '"\r\n                                               data-seller-others-id="' + ((__t = category_item.others_id) == null ? "" : __t) + '"\r\n                                                >' + ((__t = category_item.showword) == null ? "" : __t) + "</a></li>\r\n                                    "
						}
						__p += "\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        "
					}
					__p += '\r\n                    </div>\r\n                </div>\r\n                <div class="category-bottom-line"></div>\r\n            </li>\r\n\r\n        '
				}
				__p += '\r\n    </ul>\r\n    <i class="icon-slogon"></i>\r\n</div>\r\n\r\n<div class="recommend">\r\n    <div class="recommend-head-row">\r\n        ';
				for (var key in recommend_activity_pics) {
					var pics_item = recommend_activity_pics[key];
					__p += '\r\n            <div class="recommend-pic"\r\n                 data-recom-menu-search="' + ((__t = pics_item.industry1) == null ? "" : __t) + '"\r\n                 data-service-industry="' + ((__t = pics_item.service_industry) == null ? "" : __t) + '"\r\n                 data-nav-behavior="' + ((__t = pics_item.action) == null ? "" : __t) + '"\r\n                 data-nav-behavior-command="' + ((__t = pics_item.special) == null ? "" : __t) + '"\r\n                 data-report-url="' + ((__t = pics_item.reportUrl) == null ? "" : __t) + '"\r\n                 data-report-id="' + ((__t = pics_item.reportid) == null ? "" : __t) + '"\r\n                 data-name-account="' + ((__t = pics_item.kfuin) == null ? "" : __t) + '"\r\n                 data-source="' + ((__t = pics_item.source) == null ? "" : __t) + '"\r\n                 data-seller-others-id="' + ((__t = pics_item.others_id) == null ? "" : __t) + '"\r\n                 data-industry-full-nav="' + ((__t = pics_item.searchword || pics_item.desc) == null ? "" : __t) + '"\r\n                 data-search-word="' + ((__t = pics_item.searchword) == null ? "" : __t) + '"\r\n                 title="' + ((__t = pics_item.desc) == null ? "" : __t) + '"\r\n                 >\r\n                <div class="recommend-pic-outline"></div>\r\n                <img src="' + ((__t = pics_item.pic) == null ? "" : __t) + '">\r\n                ', pics_item.desc && (__p += '\r\n                    <div class="bottom-mask"><i class="className">' + ((__t = pics_item.className) == null ? "" : __t) + "</i> " + ((__t = pics_item.desc) == null ? "" : __t) + "</div>\r\n                "), __p += "\r\n            </div>\r\n        "
				}
				__p += '\r\n        <ul class="recommend-activity-list">\r\n            ';
				for (var key in recommend_activity_text) {
					var text_item = recommend_activity_text[key];
					__p += '\r\n                <li><a href="#" class="recommend-activity-item"\r\n                       data-recom-menu-search="' + ((__t = text_item.industry1) == null ? "" : __t) + '"\r\n                       data-service-industry="' + ((__t = text_item.service_industry) == null ? "" : __t) + '"\r\n                       data-nav-behavior="' + ((__t = text_item.action) == null ? "" : __t) + '"\r\n                       data-nav-behavior-command="' + ((__t = text_item.special) == null ? "" : __t) + '"\r\n                       data-report-url="' + ((__t = text_item.reportUrl) == null ? "" : __t) + '"\r\n                       data-report-id="' + ((__t = text_item.reportid) == null ? "" : __t) + '"\r\n                       data-seller-others-id="' + ((__t = text_item.others_id) == null ? "" : __t) + '"\r\n                       data-source="' + ((__t = text_item.source) == null ? "" : __t) + '"\r\n                       data-name-account="' + ((__t = text_item.kfuin) == null ? "" : __t) + '"\r\n                       data-industry-full-nav="' + ((__t = text_item.searchword || text_item.desc) == null ? "" : __t) + '"\r\n                       data-search-word="' + ((__t = text_item.searchword) == null ? "" : __t) + '"\r\n                       title="' + ((__t = text_item.desc) == null ? "" : __t) + '"\r\n                        >' + ((__t = text_item.desc) == null ? "" : __t) + "</a></li>\r\n            "
				}
				__p += "\r\n        </ul>\r\n    </div>\r\n\r\n    ";
				for (var key in recommend_blocks) {
					var block = recommend_blocks[key];
					__p += '\r\n        <div class="recommend-block">\r\n            <div class="recommend-block-left">\r\n                <span class="recommend-block-title">' + ((__t = block.title) == null ? "" : __t) + "</span>\r\n                ";
					for (var i in block.recommend_industry) {
						var block_industry = block.recommend_industry[i];
						__p += '\r\n                    <a href="#" class="recomment-block-item"\r\n                       data-recom-menu-search="' + ((__t = block_industry.industry1) == null ? "" : __t) + '"\r\n                       data-service-industry="' + ((__t = block_industry.service_industry) == null ? "" : __t) + '"\r\n                       data-nav-behavior="' + ((__t = block_industry.action) == null ? "" : __t) + '"\r\n                       data-nav-behavior-command="' + ((__t = block_industry.special) == null ? "" : __t) + '"\r\n                       data-report-id="' + ((__t = block_industry.reportid) == null ? "" : __t) + '"\r\n                       data-name-account="' + ((__t = block_industry.kfuin) == null ? "" : __t) + '"\r\n                       data-source="' + ((__t = block_industry.source) == null ? "" : __t) + '"\r\n                       data-industry-full-nav="' + ((__t = block_industry.searchword || block_industry.showword) == null ? "" : __t) + '"\r\n                       data-search-word="' + ((__t = block_industry.searchword) == null ? "" : __t) + '"\r\n                       data-seller-others-id="' + ((__t = block_industry.others_id) == null ? "" : __t) + '"\r\n                       title="' + ((__t = block_industry.showword) == null ? "" : __t) + '"\r\n                            >' + ((__t = block_industry.showword) == null ? "" : __t) + "</a>\r\n                "
					}
					__p += "\r\n                <ul>\r\n                    ";
					for (var i in block.recommend_seller) {
						var seller = block.recommend_seller[i];
						__p += '\r\n                        <li><a href="#" class="recomment-block-item"\r\n                               data-recom-menu-search="' + ((__t = seller.industry1) == null ? "" : __t) + '"\r\n                               data-service-industry="' + ((__t = seller.service_industry) == null ? "" : __t) + '"\r\n                               data-nav-behavior="' + ((__t = seller.action) == null ? "" : __t) + '"\r\n                               data-nav-behavior-command="' + ((__t = seller.special) == null ? "" : __t) + '"\r\n                               data-report-id="' + ((__t = seller.reportid) == null ? "" : __t) + '"\r\n                               data-name-account="' + ((__t = seller.kfuin) == null ? "" : __t) + '"\r\n                               data-source="' + ((__t = seller.source) == null ? "" : __t) + '"\r\n                               data-seller-others-id="' + ((__t = seller.others_id) == null ? "" : __t) + '"\r\n                               data-industry-full-nav="' + ((__t = seller.searchword || seller.showword) == null ? "" : __t) + '"\r\n                               data-search-word="' + ((__t = seller.searchword) == null ? "" : __t) + '"\r\n                               title="' + ((__t = seller.showword) == null ? "" : __t) + '"\r\n                                ><i class="blue-point"></i>' + ((__t = seller.showword) == null ? "" : __t) + "</a></li>\r\n                    "
					}
					__p += '\r\n                </ul>\r\n            </div>\r\n            <div class="recommend-block-right">\r\n                <div class="recommend-block-pic-outline"\r\n                     data-recom-menu-search="' + ((__t = block.recommend_pic.industry1) == null ? "" : __t) + '"\r\n                     data-service-industry="' + ((__t = block.recommend_pic.service_industry) == null ? "" : __t) + '"\r\n                     data-nav-behavior="' + ((__t = block.recommend_pic.action) == null ? "" : __t) + '"\r\n                     data-nav-behavior-command="' + ((__t = block.recommend_pic.special) == null ? "" : __t) + '"\r\n                     data-report-id="' + ((__t = block.recommend_pic.reportid) == null ? "" : __t) + '"\r\n                     data-name-account="' + ((__t = block.recommend_pic.kfuin) == null ? "" : __t) + '"\r\n                     data-source="' + ((__t = block.recommend_pic.source) == null ? "" : __t) + '"\r\n                     data-seller-others-id="' + ((__t = block.recommend_pic.others_id) == null ? "" : __t) + '"\r\n                     data-industry-full-nav="' + ((__t = block.recommend_pic.searchword || block.recommend_pic.showword) == null ? "" : __t) + '"\r\n                     data-search-word="' + ((__t = block.recommend_pic.searchword) == null ? "" : __t) + '"\r\n                     title="' + ((__t = block.recommend_pic.showword) == null ? "" : __t) + '"\r\n                        ></div>\r\n                <img class="recommend-block-pic" src="' + ((__t = block.recommend_pic.pic) == null ? "" : __t) + '" />\r\n                ', block.recommend_pic.showword && (__p += '\r\n                <div class="recommend-block-pic-bottom-mask">' + ((__t = block.recommend_pic.showword) == null ? "" : __t) + "</div>\r\n                "), __p += "\r\n            </div>\r\n        </div>\r\n    "
				}
				__p += '\r\n    <a class="jump-bussiness-web-trigger blue right"\r\n       id="jump-bussiness-web-trigger54"\r\n       data-jump-ptlogin-web="true"\r\n       href="http://wp.qq.com/business.html" title="注册QQ商家, 让亿万QQ用户找到你" target="_blank">注册QQ商家</a>\r\n</div>\r\n'
			}
			return __p
		}
	}), define("tmpl!template/singleBiggerSeller.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", __p += "\r\n\r\n", value.isGroup ? __p += '\r\n<li class="bigger-seller-unit"  title="' + ((__t = value.originMemo) == null ? "" : __t) + '"\r\n    data-open-oper-qun=true\r\n    >\r\n    <div class="image">\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-classification="seller"\r\n             onerror="handleImgErr(this)">\r\n    </div>\r\n    <div class="bottom">\r\n        <span class="' + ((__t = value.className && value.className.length === 2 ? "two-w-category" : "four-w-category") == null ? "" : __t) + '" title="' + ((__t = value.className ? value.className : "教育互动") == null ? "" : __t) + '">' + ((__t = value.className ? value.className : "教育互动") == null ? "" : __t) + '</span>\r\n        <div class="' + ((__t = value.className && value.className.length === 2 ? "es-two-w-title-container" : "es-four-w-title-container") == null ? "" : __t) + '" >\r\n            ' + ((__t = value.memo) == null ? "" : __t) + "\r\n        </div>\r\n    </div>\r\n</li>\r\n" : (__p += '\r\n\r\n<li class="bigger-seller-unit"  title="' + ((__t = value.sign) == null ? "" : __t) + '"\r\n    data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n    data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n    data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n    data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n    data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n    data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n    data-open-' + ((__t = value.type) == null ? "" : __t) + '="true"\r\n    data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n    data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n    data-classification="manu"\r\n    data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n    data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\ndata-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n    >\r\n\r\n    <div class="image">\r\n        ', __p += "\r\n            ", __p += "\r\n            ", __p += "\r\n        ", __p += '\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" data-classification="seller"\r\n            onerror="handleImgErr(this)">\r\n\r\n        ', __p += "\r\n        ", __p += "\r\n        ", __p += '\r\n\r\n    </div>\r\n    <div class="bottom">\r\n        <span class="' + ((__t = value.category && value.category.length === 2 ? "two-w-category" : "four-w-category") == null ? "" : __t) + '" title="' + ((__t = value.category ? value.category : "专题活动") == null ? "" : __t) + '">' + ((__t = value.category ? value.category : "专题活动") == null ? "" : __t) + '</span>\r\n        <p class="' + ((__t = value.category && value.category.length === 2 ? "es-two-w-title-container" : "es-four-w-title-container") == null ? "" : __t) + '" >\r\n            ', __p += "\r\n            " + ((__t = value.sign) == null ? "" : __t) + "\r\n        </p>\r\n    </div>\r\n</li>\r\n\r\n"), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/singleActivityUnit.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<li class="seller-item" data-index="' + ((__t = value.key) == null ? "" : __t) + '" data-message-id="' + ((__t = value.id) == null ? "" : __t) + '" data-action="3" data-value="' + ((__t = value.uin) == null ? "" : __t) + '">\r\n    <div class="image-wrapper">\r\n        <img src="' + ((__t = value.picUrl) == null ? "" : __t) + '"  onerror="this.src=\'http://find.qq.com/img/seller270-default-avatar.jpg\'">\r\n    </div>\r\n    <div class="seller-msg">\r\n        <div class="line1">\r\n            <span class="activity-title" title="' + ((__t = value.title) == null ? "" : __t) + '">' + ((__t = value.title) == null ? "" : __t) + "</span>\r\n        </div>\r\n        ", value.time && (__p += '\r\n        <div class="line2">\r\n            <div class="activity-time">时间:' + ((__t = value.time) == null ? "" : __t) + "</div>\r\n        </div>\r\n        "), __p += "\r\n        ", value.address && (__p += '\r\n        <div class="line3">\r\n            <div class="activity-address" title="地点:' + ((__t = value.address) == null ? "" : __t) + '">地点:' + ((__t = value.address) == null ? "" : __t) + "</div>\r\n        </div>\r\n        "), __p += '\r\n    </div>\r\n\r\n    <div class="mask-container">\r\n        ', value.isFree == 1 && (__p += '<div class="free_mask"></div>'), __p += "\r\n        ", value.isHot == 1 && (__p += '<div class="hot_mask"></div>'), __p += "\r\n        ", value.isLimit == 1 && (__p += '<div class="limit_mask"></div>'), __p += "\r\n    </div>\r\n</li>";
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/reportLogic", ["../$", "./reportBasic", "./utils"], e) : e($)
	}(function(e, t, n) {
		"use strict";
		var r = {},
			i = t.bernoulli;
		return r.assertSearchBehavior = function(e, t) {
			var r = 10826;
			if (typeof e != "string" || e === "") return;
			switch (t) {
			case "hybrid":
			case "people":
				switch (n.chkInputType(e)) {
				case "tel":
					r = 10828;
					break;
				case "email":
					r = 10827;
					break;
				case "num":
					r = 10825
				}
			}
			t && i(r, t)
		}, r.groupOperation = function(t) {
			e.utils.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/report",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				data: t,
				error: function(e, t, n) {},
				success: function(e, t, n) {}
			})
		}, r.sellerOperation = function(t) {
			e.utils.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/report_v2",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				data: t,
				error: function(e, t, n) {},
				success: function(e, t, n) {}
			})
		}, r
	}), function() {
		var e = {};
		e[10059] = ["北京", 10060, 10061, 10062, 10063, 10064, 10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073, 10074, 10075, 10076, 10077, 10078], e[10079] = ["天津", 10080, 10081, 10082, 10083, 10084, 10085, 10086, 10087, 10088, 10089, 10090, 10091, 10092, 10093, 10094, 10095, 10096, 10097, 10098], e[10099] = ["上海", 10100, 10101, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115, 10116, 10117, 10118, 10119], e[10120] = ["重庆", 10121, 10122, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10131, 10132, 10133, 10134, 10135, 10136, 10137, 10138, 10139, 10140, 10141, 10142, 10143, 10144, 10145, 10146, 10147, 10148, 10149, 10150, 10151, 10152, 10153, 10154, 10155, 10156, 10157, 10158, 10159, 10160, 10161], e[10162] = ["河北", 10163, 10164, 10165, 10166, 10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174], e[10175] = ["山西", 10176, 10177, 10178, 10179, 10180, 10181, 10182, 10183, 10184, 10185, 10186, 10187], e[10188] = ["辽宁", 10189, 10190, 10191, 10192, 10193, 10194, 10195, 10196, 10197, 10198, 10199, 10200, 10201, 10202, 10203], e[10204] = ["吉林", 10205, 10206, 10207, 10208, 10209, 10210, 10211, 10212, 10213, 10214], e[10215] = ["江苏", 10216, 10217, 10218, 10219, 10220, 10221, 10222, 10223, 10224, 10225, 10226, 10227, 10228, 10229, 10230], e[10231] = ["浙江", 10232, 10233, 10234, 10235, 10236, 10237, 10238, 10239, 10240, 10241, 10242, 10243], e[10244] = ["安徽", 10245, 10246, 10247, 10248, 10249, 10250, 10251, 10252, 10253, 10254, 10255, 10256, 10257, 10258, 10259, 10260, 10261, 10262], e[10263] = ["福建", 10264, 10265, 10266, 10267, 10268, 10269, 10270, 10271, 10272, 10273], e[10274] = ["江西", 10275, 10276, 10277, 10278, 10279, 10280, 10281, 10282, 10283, 10284, 10285, 10286], e[10287] = ["山东", 10288, 10289, 10290, 10291, 10292, 10293, 10294, 10295, 10296, 10297, 10298, 10299, 10300, 10301, 10302, 10303, 10304, 10305], e[10306] = ["河南", 10307, 10308, 10309, 10310, 10311, 10312, 10313, 10314, 10315, 10316, 10317, 10318, 10319, 10320, 10321, 10322, 10323, 10324, 10325], e[10326] = ["内蒙古", 10327, 10328, 10329, 10330, 10331, 10332, 10333, 10334, 10335, 10336, 10337, 10338, 10339], e[10340] = ["黑龙江", 10341, 10342, 10343, 10344, 10345, 10346, 10347, 10348, 10349, 10350, 10351, 10352, 10353, 10354], e[10355] = ["湖北", 10356, 10357, 10358, 10359, 10360, 10361, 10362, 10363, 10364, 10365, 10366, 10367, 10368, 10369, 10370, 10371, 10372, 10373], e[10374] = ["湖南", 10375, 10376, 10377, 10378, 10379, 10380, 10381, 10382, 10383, 10384, 10385, 10386, 10387, 10388, 10389], e[10390] = ["广东", 10391, 10392, 10393, 10394, 10395, 10396, 10397, 10398, 10399, 10400, 10401, 10402, 10403, 10404, 10405, 10406, 10407, 10408, 10409, 10410, 10411, 10412], e[10413] = ["广西", 10414, 10415, 10416, 10417, 10418, 10419, 10420, 10421, 10422, 10423, 10424, 10425, 10426, 10427, 10428, 10429], e[10430] = ["海南", 10431, 10432, 10433, 10434, 10435, 10436, 10437, 10438, 10439, 10440, 10441, 10442, 10443, 10444, 10445, 10446, 10447, 10448, 10449, 10450], e[10451] = ["四川", 10452, 10453, 10454, 10455, 10456, 10457, 10458, 10459, 10460, 10461, 10462, 10463, 10464, 10465, 10466, 10467, 10468, 10469, 10470, 10471, 10472, 10473], e[10474] = ["台湾", 10475, 10476, 10477, 10478, 10479, 10480, 10481, 10482, 10483, 10484, 10485, 10486, 10487, 10488, 10489, 10490, 10491, 10492, 10493, 10494, 10495, 10496, 10497, 10498], e[10499] = ["贵州", 10500, 10501, 10502, 10503, 10504, 10505, 10506, 10507, 10508, 10509], e[10510] = ["云南", 10511, 10512, 10513, 10514, 10515, 10516, 10517, 10518, 10519, 10520, 10521, 10522, 10523, 10524, 10525, 10526, 10527], e[10528] = ["陕西", 10529, 10530, 10531, 10532, 10533, 10534, 10535, 10536, 10537, 10538, 10539], e[10540] = ["西藏", 10541, 10542, 10543, 10544, 10545, 10546, 10547, 10548], e[10549] = ["甘肃", 10550, 10551, 10552, 10553, 10554, 10555, 10556, 10557, 10558, 10559, 10560, 10561, 10562, 10563, 10564, 10565, 10566], e[10567] = ["青海", 10568, 10569, 10570, 10571, 10572, 10573, 10574, 10575, 10576], e[10577] = ["宁夏", 10578, 10579, 10580, 10581, 10582], e[10583] = ["新疆", 10584, 10585, 10586, 10587, 10588, 10589, 10590, 10591, 10592, 10593, 10594, 10595, 10596, 10597], e[10598] = ["香港"], e[10618] = ["澳门"], e[10060] = ["东城区"], e[10061] = ["西城区"], e[10062] = ["崇文区"], e[10063] = ["宣武区"], e[10064] = ["朝阳区"], e[10065] = ["丰台区"], e[10066] = ["石景山区"], e[10067] = ["海淀区"], e[10068] = ["门头沟区"], e[10069] = ["房山区"], e[10070] = ["通州区"], e[10071] = ["顺义区"], e[10072] = ["延庆县"], e[10073] = ["昌平区"], e[10074] = ["怀柔区"], e[10075] = ["密云县"], e[10076] = ["平谷区"], e[10077] = ["大兴区"], e[10078] = ["其它地区"], e[10080] = ["和平区"], e[10081] = ["河东区"], e[10082] = ["河西区"], e[10083] = ["南开区"], e[10084] = ["河北区"], e[10085] = ["红桥区"], e[10086] = ["塘沽区"], e[10087] = ["大港区"], e[10088] = ["东丽区"], e[10089] = ["西青区"], e[10090] = ["津南区"], e[10091] = ["北辰区"], e[10092] = ["蓟县"], e[10093] = ["宝坻区"], e[10094] = ["武清区"], e[10095] = ["宁河县"], e[10096] = ["静海县"], e[10097] = ["汉沽区"], e[10098] = ["其它地区"], e[10100] = ["黄浦区"], e[10101] = ["卢湾区"], e[10102] = ["徐汇区"], e[10103] = ["长宁区"], e[10104] = ["静安区"], e[10105] = ["普陀区"], e[10106] = ["闸北区"], e[10107] = ["虹口区"], e[10108] = ["杨浦区"], e[10109] = ["闵行区"], e[10110] = ["宝山区"], e[10111] = ["嘉定区"], e[10112] = ["浦东新区"], e[10113] = ["金山区"], e[10114] = ["松江区"], e[10115] = ["崇明县"], e[10116] = ["青浦区"], e[10117] = ["南汇区"], e[10118] = ["奉贤区"], e[10119] = ["其它地区"], e[10121] = ["渝中区"], e[10122] = ["大渡口区"], e[10123] = ["江北区"], e[10124] = ["沙坪坝区"], e[10125] = ["九龙坡区"], e[10126] = ["南岸区"], e[10127] = ["北碚区"], e[10128] = ["万盛区"], e[10129] = ["双桥区"], e[10130] = ["渝北区"], e[10131] = ["巴南区"], e[10132] = ["万州区"], e[10133] = ["涪陵区"], e[10134] = ["合川市"], e[10135] = ["永川市"], e[10136] = ["江津市"], e[10137] = ["南川市"], e[10138] = ["长寿区"], e[10139] = ["綦江县"], e[10140] = ["潼南县"], e[10141] = ["铜梁县"], e[10142] = ["大足县"], e[10143] = ["荣昌县"], e[10144] = ["璧山县"], e[10145] = ["垫江县"], e[10146] = ["武隆县"], e[10147] = ["丰都县"], e[10148] = ["城口县"], e[10149] = ["梁平县"], e[10150] = ["黔江区"], e[10151] = ["奉节县"], e[10152] = ["开县"], e[10153] = ["云阳县"], e[10154] = ["忠县"], e[10155] = ["巫溪县"], e[10156] = ["巫山县"], e[10157] = ["石柱土家族自治县"], e[10158] = ["秀山土家族苗族自治县"], e[10159] = ["酉阳土家族苗族自治县"], e[10160] = ["彭水苗族土家族自治县"], e[10161] = ["其它地区"], e[10163] = ["石家庄"], e[10164] = ["张家口"], e[10165] = ["承德"], e[10166] = ["秦皇岛"], e[10167] = ["唐山"], e[10168] = ["廊坊"], e[10169] = ["保定"], e[10170] = ["沧州"], e[10171] = ["衡水"], e[10172] = ["邢台"], e[10173] = ["邯郸"], e[10174] = ["其它地区"], e[10176] = ["太原"], e[10177] = ["大同"], e[10178] = ["朔州"], e[10179] = ["阳泉"], e[10180] = ["长治市"], e[10181] = ["晋城市"], e[10182] = ["忻州市"], e[10183] = ["吕梁市"], e[10184] = ["晋中市"], e[10185] = ["临汾市"], e[10186] = ["运城市"], e[10187] = ["其它地区"], e[10189] = ["沈阳市"], e[10190] = ["朝阳市"], e[10191] = ["阜新市"], e[10192] = ["铁岭市"], e[10193] = ["抚顺市"], e[10194] = ["本溪市"], e[10195] = ["辽阳市"], e[10196] = ["鞍山市"], e[10197] = ["丹东市"], e[10198] = ["大连市"], e[10199] = ["营口市"], e[10200] = ["盘锦市"], e[10201] = ["锦州市"], e[10202] = ["葫芦岛市"], e[10203] = ["其它地区"], e[10205] = ["长春市"], e[10206] = ["白城市"], e[10207] = ["松原市"], e[10208] = ["吉林市"], e[10209] = ["四平市"], e[10210] = ["辽源市"], e[10211] = ["通化市"], e[10212] = ["白山市"], e[10213] = ["延边"], e[10214] = ["其它地区"], e[10216] = ["南京市"], e[10217] = ["徐州市"], e[10218] = ["连云港市"], e[10219] = ["宿迁市"], e[10220] = ["淮阴市"], e[10221] = ["盐城市"], e[10222] = ["扬州市"], e[10223] = ["泰州市"], e[10224] = ["南通市"], e[10225] = ["镇江市"], e[10226] = ["常州市"], e[10227] = ["无锡市"], e[10228] = ["苏州市"], e[10229] = ["淮安市"], e[10230] = ["其它地区"], e[10232] = ["杭州市"], e[10233] = ["湖州市"], e[10234] = ["嘉兴市"], e[10235] = ["舟山市"], e[10236] = ["宁波市"], e[10237] = ["绍兴市"], e[10238] = ["金华市"], e[10239] = ["台州市"], e[10240] = ["温州市"], e[10241] = ["丽水市"], e[10242] = ["衢州市"], e[10243] = ["其它地区"], e[10245] = ["合肥市"], e[10246] = ["宿州市"], e[10247] = ["淮北市"], e[10248] = ["阜阳市"], e[10249] = ["蚌埠市"], e[10250] = ["淮南市"], e[10251] = ["滁州市"], e[10252] = ["马鞍山市"], e[10253] = ["芜湖市"], e[10254] = ["铜陵市"], e[10255] = ["安庆市"], e[10256] = ["黄山市"], e[10257] = ["六安市"], e[10258] = ["巢湖市"], e[10259] = ["池州市"], e[10260] = ["宣城市"], e[10261] = ["亳州市"], e[10262] = ["其它地区"], e[10264] = ["福州市"], e[10265] = ["南平市"], e[10266] = ["三明市"], e[10267] = ["莆田市"], e[10268] = ["泉州市"], e[10269] = ["厦门市"], e[10270] = ["漳州市"], e[10271] = ["龙岩市"], e[10272] = ["宁德市"], e[10273] = ["其它地区"], e[10275] = ["南昌市"], e[10276] = ["九江市"], e[10277] = ["景德镇市"], e[10278] = ["鹰潭市"], e[10279] = ["新余市"], e[10280] = ["萍乡市"], e[10281] = ["赣州市"], e[10282] = ["上饶市"], e[10283] = ["抚州市"], e[10284] = ["宜春市"], e[10285] = ["吉安市"], e[10286] = ["其它地区"], e[10288] = ["济南市"], e[10289] = ["聊城市"], e[10290] = ["德州市"], e[10291] = ["东营市"], e[10292] = ["淄博市"], e[10293] = ["潍坊市"], e[10294] = ["烟台市"], e[10295] = ["威海市"], e[10296] = ["青岛市"], e[10297] = ["日照市"], e[10298] = ["临沂市"], e[10299] = ["枣庄市"], e[10300] = ["济宁市"], e[10301] = ["泰安市"], e[10302] = ["莱芜市"], e[10303] = ["滨州市"], e[10304] = ["菏泽市"], e[10305] = ["其它地区"], e[10307] = ["郑州市"], e[10308] = ["三门峡市"], e[10309] = ["洛阳市"], e[10310] = ["焦作市"], e[10311] = ["新乡市"], e[10312] = ["鹤壁市"], e[10313] = ["安阳市"], e[10314] = ["濮阳市"], e[10315] = ["开封市"], e[10316] = ["商丘市"], e[10317] = ["许昌市"], e[10318] = ["漯河市"], e[10319] = ["平顶山市"], e[10320] = ["南阳市"], e[10321] = ["信阳市"], e[10322] = ["济源市"], e[10323] = ["周口市"], e[10324] = ["驻马店市"], e[10325] = ["其它地区"], e[10327] = ["呼和浩特市"], e[10328] = ["包头市"], e[10329] = ["乌海市"], e[10330] = ["赤峰市"], e[10331] = ["呼伦贝尔"], e[10332] = ["兴安盟"], e[10333] = ["锡林郭勒盟"], e[10334] = ["乌兰察布市"], e[10335] = ["巴彦淖尔市"], e[10336] = ["阿拉善盟"], e[10337] = ["鄂尔多斯市"], e[10338] = ["通辽市"], e[10339] = ["其它地区"], e[10341] = ["哈尔滨市"], e[10342] = ["齐齐哈尔市"], e[10343] = ["黑河市"], e[10344] = ["大庆市"], e[10345] = ["伊春市"], e[10346] = ["鹤岗市"], e[10347] = ["佳木斯市"], e[10348] = ["双鸭山市"], e[10349] = ["七台河市"], e[10350] = ["鸡西市"], e[10351] = ["牡丹江市"], e[10352] = ["绥化地区"], e[10353] = ["大兴安岭地区"], e[10354] = ["其它地区"], e[10356] = ["武汉市"], e[10357] = ["十堰市"], e[10358] = ["襄樊市"], e[10359] = ["荆门市"], e[10360] = ["孝感市"], e[10361] = ["黄冈市"], e[10362] = ["鄂州市"], e[10363] = ["黄石市"], e[10364] = ["咸宁市"], e[10365] = ["荆州市"], e[10366] = ["宜昌市"], e[10367] = ["随州市"], e[10368] = ["仙桃市"], e[10369] = ["天门市"], e[10370] = ["潜江市"], e[10371] = ["神农架"], e[10372] = ["恩施"], e[10373] = ["其它地区"], e[10375] = ["长沙市"], e[10376] = ["张家界市"], e[10377] = ["常德市"], e[10378] = ["益阳市"], e[10379] = ["岳阳市"], e[10380] = ["株洲市"], e[10381] = ["湘潭市"], e[10382] = ["衡阳市"], e[10383] = ["郴州市"], e[10384] = ["永州市"], e[10385] = ["邵阳市"], e[10386] = ["怀化市"], e[10387] = ["娄底市"], e[10388] = ["湘西"], e[10389] = ["其它地区"], e[10391] = ["广州市"], e[10392] = ["清远市"], e[10393] = ["韶关市"], e[10394] = ["河源市"], e[10395] = ["梅州市"], e[10396] = ["潮州市"], e[10397] = ["汕头市"], e[10398] = ["揭阳市"], e[10399] = ["汕尾市"], e[10400] = ["惠州市"], e[10401] = ["东莞市"], e[10402] = ["深圳市"], e[10403] = ["珠海市"], e[10404] = ["中山市"], e[10405] = ["江门市"], e[10406] = ["佛山市"], e[10407] = ["肇庆市"], e[10408] = ["云浮市"], e[10409] = ["阳江市"], e[10410] = ["茂名市"], e[10411] = ["湛江市"], e[10412] = ["其它地区"], e[10414] = ["南宁市"], e[10415] = ["桂林市"], e[10416] = ["柳州市"], e[10417] = ["梧州市"], e[10418] = ["贵港市"], e[10419] = ["玉林市"], e[10420] = ["钦州市"], e[10421] = ["北海市"], e[10422] = ["防城港市"], e[10423] = ["百色市"], e[10424] = ["河池地区"], e[10425] = ["贺州地区"], e[10426] = ["崇左市"], e[10427] = ["凭祥市"], e[10428] = ["来宾市"], e[10429] = ["其它地区"], e[10431] = ["海口市"], e[10432] = ["三亚市"], e[10433] = ["琼山市"], e[10434] = ["文昌市"], e[10435] = ["琼海市"], e[10436] = ["万宁市"], e[10437] = ["东方市"], e[10438] = ["儋州市"], e[10439] = ["临高县"], e[10440] = ["澄迈县"], e[10441] = ["定安县"], e[10442] = ["屯昌县"], e[10443] = ["昌江"], e[10444] = ["白沙"], e[10445] = ["琼中"], e[10446] = ["陵水"], e[10447] = ["保亭"], e[10448] = ["乐东"], e[10449] = ["五指山市"], e[10450] = ["其它地区"], e[10452] = ["成都市"], e[10453] = ["广元市"], e[10454] = ["绵阳市"], e[10455] = ["德阳市"], e[10456] = ["南充市"], e[10457] = ["广安市"], e[10458] = ["遂宁市"], e[10459] = ["内江市"], e[10460] = ["乐山市"], e[10461] = ["自贡市"], e[10462] = ["泸州市"], e[10463] = ["宜宾市"], e[10464] = ["攀枝花市"], e[10465] = ["巴中市"], e[10466] = ["达州市"], e[10467] = ["资阳市"], e[10468] = ["眉山市"], e[10469] = ["雅安市"], e[10470] = ["阿坝"], e[10471] = ["甘孜"], e[10472] = ["凉山"], e[10473] = ["其它地区"], e[10475] = ["台北市"], e[10476] = ["高雄市"], e[10477] = ["台南市"], e[10478] = ["台中市"], e[10479] = ["基隆市"], e[10480] = ["新竹市"], e[10481] = ["嘉义市"], e[10482] = ["台北县"], e[10483] = ["宜兰县"], e[10484] = ["新竹县"], e[10485] = ["桃园县"], e[10486] = ["苗栗县"], e[10487] = ["台中县"], e[10488] = ["彰化县"], e[10489] = ["南投县"], e[10490] = ["嘉义县"], e[10491] = ["云林县"], e[10492] = ["台南县"], e[10493] = ["高雄县"], e[10494] = ["屏东县"], e[10495] = ["台东县"], e[10496] = ["花莲县"], e[10497] = ["澎湖县"], e[10498] = ["其它地区"], e[10500] = ["贵阳市"], e[10501] = ["六盘水市"], e[10502] = ["遵义市"], e[10503] = ["毕节地区"], e[10504] = ["铜仁地区"], e[10505] = ["安顺市"], e[10506] = ["黔东南"], e[10507] = ["黔南"], e[10508] = ["黔西南"], e[10509] = ["其它地区"], e[10511] = ["昆明市"], e[10512] = ["曲靖市"], e[10513] = ["玉溪市"], e[10514] = ["丽江市"], e[10515] = ["昭通市"], e[10516] = ["思茅市"], e[10517] = ["临沧地区"], e[10518] = ["保山市"], e[10519] = ["德宏"], e[10520] = ["怒江"], e[10521] = ["迪庆"], e[10522] = ["大理"], e[10523] = ["楚雄"], e[10524] = ["红河"], e[10525] = ["文山"], e[10526] = ["西双版纳"], e[10527] = ["其它地区"], e[10529] = ["西安市"], e[10530] = ["延安市"], e[10531] = ["铜川市"], e[10532] = ["渭南市"], e[10533] = ["咸阳市"], e[10534] = ["宝鸡市"], e[10535] = ["汉中市"], e[10536] = ["榆林市"], e[10537] = ["商洛市"], e[10538] = ["安康市"], e[10539] = ["其它地区"], e[10541] = ["拉萨市"], e[10542] = ["那曲地区"], e[10543] = ["昌都地区"], e[10544] = ["林芝地区"], e[10545] = ["山南地区"], e[10546] = ["日喀则地区"], e[10547] = ["阿里地区"], e[10548] = ["其它地区"], e[10550] = ["兰州市"], e[10551] = ["嘉峪关市"], e[10552] = ["金昌市"], e[10553] = ["白银市"], e[10554] = ["天水市"], e[10555] = ["酒泉市"], e[10556] = ["张掖市"], e[10557] = ["武威市"], e[10558] = ["庆阳市"], e[10559] = ["平凉市"], e[10560] = ["定西市"], e[10561] = ["陇南地区"], e[10562] = ["临夏"], e[10563] = ["甘南"], e[10564] = ["玉门市"], e[10565] = ["敦煌市"], e[10566] = ["其它地区"], e[10568] = ["西宁市"], e[10569] = ["海东地区"], e[10570] = ["海北"], e[10571] = ["海南"], e[10572] = ["黄南"], e[10573] = ["果洛"], e[10574] = ["玉树"], e[10575] = ["海西"], e[10576] = ["其它地区"], e[10578] = ["银川市"], e[10579] = ["石嘴山市"], e[10580] = ["吴忠市"], e[10581] = ["固原市"], e[10582] = ["其它地区"], e[10584] = ["乌鲁木齐市"], e[10585] = ["克拉玛依市"], e[10586] = ["石河子市"], e[10587] = ["喀什地区"], e[10588] = ["阿克苏地区"], e[10589] = ["和田地区"], e[10590] = ["吐鲁番地区"], e[10591] = ["哈密地区"], e[10592] = ["克孜勒苏"], e[10593] = ["博尔塔拉"], e[10594] = ["昌吉"], e[10595] = ["巴音郭楞"], e[10596] = ["伊犁"], e[10597] = ["其它地区"], e[10599] = ["九龙城区"], e[10600] = ["中西区"], e[10601] = ["东区"], e[10602] = ["观塘区"], e[10603] = ["南区"], e[10604] = ["深水埗区"], e[10605] = ["黄大仙区"], e[10606] = ["湾仔区"], e[10607] = ["油尖旺区"], e[10608] = ["离岛区"], e[10609] = ["葵青区"], e[10610] = ["北区"], e[10611] = ["西贡区"], e[10612] = ["沙田区"], e[10613] = ["屯门区"], e[10614] = ["大埔区"], e[10615] = ["荃湾区"], e[10616] = ["元朗区"], e[10617] = ["其它地区"], e[10619] = ["澳门半岛"], e[10620] = ["凼仔岛"], e[10621] = ["路环岛"], e[10622] = ["其它地区"], window.localCityMap = e
	}(), define("data/city_id", function() {}), function(e) {
		typeof define == "function" ? define("tools/citySelector", ["../$", "../data/city_id"], e) : e($)
	}(function(e) {
		var t = function(e, n) {
				if (!(this instanceof t)) return new t(e, n);
				if (this._isLoaded) return;
				this._wrapper = e, this._id, this._init(), this._select(n || 0)
			},
			n = t.prototype;
		return n._init = function() {
			var t = this,
				n = [10059, 10079, 10099, 10120],
				r = this._wrapper,
				i = "",
				s = window.localCityMap,
				o = Object.keys(s),
				u = 0,
				a = [],
				f = function() {
					i += "</p>", i += t._insertRows(a), i += "<p>", a = []
				},
				l = ["10598", "10618"];
			if (!r || !r[0] || r[0].id != "hy-city-selector") i += "范围：";
			i += '<div class="city-selected"><span class="city-selected-text">全国</span>                    <i class="selector-city-arrow"></i>', i += '<div class="city-list">                <h4>选择城市</h4>';
			if (!r || !r[0] || r[0].id != "hy-city-selector") i += '<p><span class="city"><b id="city-0">全国</b></span></p>';
			i += '<p>                    <span class="city"><b id="city-10059">北京</b></span>                    <span class="city"><b id="city-10079">天津</b></span>                    <span class="city"><b id="city-10099">上海</b></span>                    <span class="city"><b id="city-10120">重庆</b></span>                </p>', i += "<p>", e.each(o, function(e, t) {
				n.indexOf(t >> 0) === -1 && s[t].length > 1 && (a.push(t), i += '<span class="province">                    <b id="prov-' + t + '">' + s[t][0] + '<i class="qu-city-arrow"></i></b>                    </span>', u++, u % 6 || f())
			}), a.length && f(), i = i.substring(0, i.length - 3), i += "</div></div>", r.html(i), i = "", l.forEach(function(e) {
				i += '<span class="city"><b id="city-' + e + '">' + s[e][0] + "</b></span>"
			}), r.find("p:not(.normal-cities):last").append(i), this._bind(), this._isLoaded = !0, delete n
		}, n._insertRows = function(e) {
			var t = window.localCityMap,
				n = "",
				r = [];
			return e.forEach(function(e, i) {
				r = t[e].slice(1), r.pop(), n += '<p class="normal-cities" data-prov-id="' + e + '">', r.forEach(function(e, r) {
					var i = t[e][0];
					i = i.length > 2 ? i.replace(/(县|州|市|盟|地区)$/, "") : i, n += '<span class="city">                    <b id="city-' + e + '">' + i + "</b>                    </span>"
				}), n += "</p>"
			}), n
		}, n._bind = function() {
			var t = this,
				n = this._wrapper;
			e(".city-selected", n).on("click", function(e) {
				n.addClass("open")
			}), e(".city-selected", n).on("mouseleave", function(e) {
				n.removeClass("open")
			}), n.on("click", '[id^="city-"]', function(n) {
				if (this.classList.contains("selected")) return;
				var r = e(this).attr("id").substring("city-".length) >> 0;
				t._select(r), r === 0 ? e("#qu").addClass("filter-all-hide") : e("#qu").removeClass("filter-all-hide")
			}), n.on("click", '[id^="prov-"]', function(t) {
				if (this.classList.contains("selected")) return;
				var r = e(".selected", n),
					i = e(this),
					s = i.attr("id").substring("prov-".length),
					o = n.find("[data-prov-id=" + s + "]");
				n.find(".normal-cities.open").removeClass("open"), n.find("[data-prov-id=" + s + "]").addClass("open"), r.removeClass("selected"), i.addClass("selected")
			})
		}, n._select = function(t, n) {
			var r = this._wrapper,
				i = e("#city-" + t),
				s = i.parent().parent(),
				o = s.attr("data-prov-id");
			r.find(".selected").removeClass("selected"), r.find(".normal-cities.open").removeClass("open"), o && (s.addClass("open"), e("#prov-" + o).addClass("selected")), i.addClass("selected"), r.find(".city-selected-text").text(i.text()), this._id = t, n || r.trigger("change", t)
		}, e.fn.citySelector = function(n) {
			var r = this;
			return this.each(function() {
				r.builder = t(e(this), n)
			})
		}, t
	}), !
	function(e) {
		"use strict";
		typeof define == "function" ? define("hybrid", ["$", "./hybrid.find", "./model/lbs", "./model/buddy", "./model/group", "./model/seller", "./model/activity", "./model/job", "./widget/qiqi", "./widget/activities", "./widget/hybrid.user.sosoMap", "tmpl!template/hyHotWords.html", "tmpl!template/hyRecommendMenuNav.html", "tmpl!template/singleBiggerSeller.html", "tmpl!template/singleLargeSeller.html", "tmpl!template/singleOneLineSeller.html", "tmpl!template/singleActivityUnit.html", "tools/utils", "tools/cookie", "tools/reportLogic", "tools/info", "tools/native", "tools/citySelector", "tools/pagination", "tools/tdw"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T) {
		"use strict";
		var N = "hybrid",
			C = e.report,
			k = C.monitor,
			L = C.bernoulli,
			A = C.monitorAndBer,
			O = {
				userTrack: 0,
				isInited: !1,
				isMoreDefaultSellerRecommend: !0,
				isSearchResultLayerDisplay: !1,
				groupKeywords: [],
				hotKeywords: [],
				sellerKeywords: [],
				keyword: "",
				defaultSellerNum: 0,
				sellerRecommendOffset: 0,
				recommendExt: "",
				defaultRecommendISC: 0,
				recommendFilter: [],
				recommendHTML: "",
				recommendRenderCallback: null,
				findSellerNum: 0,
				findSameCitySellerNum: 0,
				isMoreSameCitySeller: !0,
				findNonSameCitySellerNum: 0,
				isMoreNonSameCitySeller: !0,
				isShowNonSameCitySeller: !1,
				findNonSameCityListCache: [],
				findSameCityListCache: [],
				findCgiQunCurPage: 1,
				findQunTotalNum: 0,
				findSellerCurPage: 1,
				findSellerTotalPage: 1,
				findCgiSellerCurPage: 1,
				ext: "",
				canFindMoreSeller: !0,
				isSearchByCategory: !1,
				categoryID: 0,
				searchResultOnlineSwitchObj: {},
				searchResultDistanceSwitchObj: {},
				cgiReqOffset: "",
				$els: {},
				operQunObj: {},
				findActivityCurPage: 1,
				findActivityCurPageNum: 0,
				findActivityEnd: !1,
				findActivityPageCache: [],
				findActivityCurPageCache: [],
				isUserSearchAction: 0,
				searchParams: {},
				secondFlag: 0,
				currentSearchRegion: 0,
				isUserHoverInIndustry: !0
			};
		return O.init = function(t) {
			t.keyword && (e("#hy-search-input").val(t.keyword), e.inputChangeHandler()), O.isInited || (O.isInited = !0, O.initHandler(), O.initLoading(), O.initView(t), O.citySelector = e.hybridInit && e.hybridInit.citySelector);
			var n = t.searchType || "seller";
			t.categoryId ? (O.categoryID = t.categoryId, O.keyword = t.keyword, O.find({
				id: t.categoryId,
				keyword: t.keyword
			}, {
				isMore: !1,
				isCategoryIndex: !0,
				searchType: n
			}), O.isSearchResultLayerDisplay ? (O.$els.loadingMask.show(), O.$els.fuzzy.hide(), O.$els.accurate.hide()) : O.$els.loadingMask.css({
				"z-index": "2",
				top: "445px"
			}).show().animate({
				top: "0"
			}, {
				duration: "normal",
				easing: "swing",
				complete: function() {
					O.isSearchResultLayerDisplay = !0
				},
				queue: !1
			})) : t.search && O.search(t.keyword || "", t.ingnoreActivity)
		}, O.initLoading = function() {
			O.fuzzyFindLoading = e("#hy-find-fuzzy .container").loading(), O.accurateFindLoading = e("#hy-find-accurate .container").loading(), O.MaskLoading = e("#hy-loading-mask").loading()
		}, O.initHandler = function() {
			function n(t) {
				A(296038, 10824, "hybrid"), O.userTrack = 100, w.getInfo(function(t) {
					e.report.bernoulli(11402, O.userTrack + "^" + t.reportp2c + "^")
				}), O.search(), t.preventDefault()
			}
			function r() {
				O.find(O.keyword, {
					isMore: !1,
					isCategoryIndex: O.isSearchByCategory,
					categoryType: O.categoryType,
					resultTitleKeyword: O.resultTitleKeyword,
					changeByCorDisOnline: !0,
					searchType: O.searchType
				})
			}
			O.bindFindFuzzyScroll = function() {
				e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollHandler), e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollQunHandler), e("#hy-find-fuzzy-rows .jobs-container").off("scroll", O.findFuzzyScrollHandler), e("#hy-find-fuzzy-rows").on("scroll", O.findFuzzyScrollHandler), e("#hy-find-fuzzy-rows .jobs-container").on("scroll", O.findFuzzyScrollHandler)
			}, O.unbindFindFuzzyScroll = function() {
				e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollHandler), e("#hy-find-fuzzy-rows .jobs-container").off("scroll", O.findFuzzyScrollHandler)
			}, O.bindFindFuzzyQunScroll = function() {
				e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollHandler), e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollQunHandler), e("#hy-find-fuzzy-rows").on("scroll", O.findFuzzyScrollQunHandler)
			}, O.unbindFindFuzzyQunScroll = function() {
				e("#hy-find-fuzzy-rows").off("scroll", O.findFuzzyScrollQunHandler)
			}, e("#hy-search-submit").on("click", n), e("#hy-search-form").on("submit", n), e(document).on("click", ".btn-hy-search-result-default-order, .btn-hy-search-result-distance-order", function(t) {
				var n = t.target,
					i = e(n).is(".btn-hy-search-result-distance-order");
				i ? (L(11601), O.searchResultDistanceSwitchObj[O.keyword] = !0, localStorage[y.uin() + "userInfo"] ? r() : l.show()) : (L(11600), O.searchResultDistanceSwitchObj[O.keyword] = !1, r())
			}), e(document).on("change", "#hy-search-result-online-switch,#hy-search-result-online-switch-loading", function(e) {
				var t = e.target;
				O.searchResultOnlineSwitchObj[O.keyword] = t.checked, r(), L(11602)
			}), e(document).on("click", "[data-change-salary]", function(t) {
				e(this).closest(".selector").removeClass("open"), O.isUserSearchAction++, O.secondFlag++;
				var n = e(this);
				O.searchParams.salary_flag = n.data("flag"), O.searchParams.salary_high = n.data("high"), O.searchParams.salary_low = n.data("low"), O.searchParams.salary_name = n.html(), r(), e.report.bernoulli(11870)
			}), e(document).on("click", "[data-change-pubdate]", function(t) {
				e(this).closest(".selector").removeClass("open"), O.isUserSearchAction++, O.secondFlag++;
				var n = e(this);
				O.searchParams.pubdate_flag = n.data("flag"), O.searchParams.day = n.data("day"), O.searchParams.pubdate_name = n.html(), r(), e.report.bernoulli(11871)
			}), e(document).on("click", "[data-change-region]", function() {
				e(this).closest(".selector").removeClass("open"), O.isUserSearchAction++, O.secondFlag++;
				var n = e(this);
				O.searchParams.region_flag = n.data("region-flag"), O.searchParams.region = n.data("region");
				if (O.searchParams["region_flag"] == 2) {
					O.searchParams.region_flag = 0, O.currentSearchRegion = 0, t.recommendGroupList = {}, t.recommendGroupLoadingStatus = {}, O.secondFlag = 0, O.currentSearchRegion = 0;
					var i = n.data("city-id");
					if (window.LatlngMap[i]) {
						var s = window.LatlngMap[i].n,
							o = window.LatlngMap[i].prov,
							u = window.LatlngMap[i].lat,
							a = window.LatlngMap[i].lon;
						w._fields.lbs_addr_city = s, w._fields.lbs_addr_province = o, w._fields.lbs_addr_country = "中国", w._fields.longitude = a / 1e6, w._fields.latitude = u / 1e6, w._fields.lbs_addr_detail_short = s, w._fields.lbs_addr_city_nocache = s
					} else console.error(i);
					w.fleshId();
					if (O.citySelector) {
						var f = function(e, t) {
								return e = e.replace(/(市)|(自治区)|(县)|(地区)|(特别行政区)/g, ""), (new RegExp(e)).test(t)
							};
						f(localCityMap[w._fields.lbs_addr_city_id][0], w._fields.lbs_addr_city) && O.citySelector.builder._select(w._fields.lbs_addr_city_id, !0)
					}
					w.getInfo(function(e) {
						if (e.longitude === 116) return;
						localStorage[y.uin() + "userInfo"] = JSON.stringify(e), O.isSearchResultLayerDisplay && r(), O.initHot(s)
					});
					return
				}
				O.currentSearchRegion = n.html(), r(), e.report.bernoulli(11872)
			});
			var i = null,
				s = null;
			e("#hy-recommend-menu").on("mouseenter", ".category-item", function() {
				var t = e(this),
					n = t.parent();
				clearTimeout(i), O.isUserHoverInIndustry && clearTimeout(s), i = setTimeout(function() {
					e(".category-item").removeClass("active"), O.isUserHoverInIndustry ? (n.addClass("active"), t.addClass("active")) : (n.removeClass("active"), t.removeClass("active"))
				}, 100);
				return
			}), e("#hy-recommend-menu").on("mouseleave", ".category-item", function() {
				var t = e(this),
					n = t.parent();
				clearTimeout(i), clearTimeout(s), s = setTimeout(function() {
					n.removeClass("active"), t.removeClass("active"), O.isUserHoverInIndustry || (O.isUserHoverInIndustry = !0)
				}, 100)
			}), e(document).on("click", ".jobs-condition-selection .selector", function() {
				e(this).addClass("open")
			}), e(document).on("mouseleave", ".jobs-condition-selection .selector", function() {
				e(this).removeClass("open")
			}), e("#hy-recommend").on("click", "[data-gdt]", function() {
				var n = e(this).data("gdt"),
					r = O.gdtInfos[n].rl;
				r && ((new Image).src = r), O.gdtInfos[n].rl = null
			}), e("#hy-find-fuzzy").on("click", "[data-page]", function(t) {
				var n = e(this).data("page");
				O.gotoPage(n), t.preventDefault(), t.stopPropagation()
			}), O.handleRecomMenuSearch = function(t) {
				var n = t.id,
					r = t.keyword,
					i = t.categoryIndex,
					s = t.categoryType,
					o = t.resultTitleKeyword || t.keyword,
					u = t.searchType || "";
				i == null && (i = 6), O.keyword = r, O.resultTitleKeyword = o, O.categoryID = n, O.MaskLoading.loading("hide"), O.MaskLoading.loading("show", {
					status: "search"
				}), O.find({
					id: n,
					keyword: r
				}, {
					isMore: !1,
					isCategoryIndex: !0,
					searchType: u,
					categoryType: s || 2,
					resultTitleKeyword: o
				}), O.isSearchResultLayerDisplay = !0, O.$els.loadingMask.show(), O.$els.fuzzy.hide(), O.$els.accurate.hide();
				try {
					O.userTrack = 300, w.getInfo(function(t) {
						e.report.bernoulli(11402, O.userTrack + "^" + t.reportp2c + "^" + r)
					})
				} catch (a) {}
			}, e(document).on("click", "[data-recom-menu-search]", function(t) {
				var n = e(this),
					r = n.data("recom-menu-search"),
					i = n.text().trim(),
					s = n.data("nav-behavior") || 0,
					o = n.data("position-id") || 0,
					u = n.data("service-industry") || 0,
					a = n.data("nav-behavior-command"),
					f = n.data("industry-full-nav"),
					l = n.data("search-word"),
					c = n.data("report-id"),
					h = e(this).data("category-index");
				L(c, i), i = i || f;
				if (s === 0) O.searchType = "seller", O.isUserSearchAction = 0, O.handleRecomMenuSearch({
					id: r,
					keyword: i,
					categoryIndex: h,
					resultTitleKeyword: f,
					searchType: O.searchType
				});
				else if (s === 1) O.isUserSearchAction = 0, subjectEntrance.open({
					subjectName: a
				}), O.userTrack = 300, O.keyword = i, w.getInfo(function(t) {
					e.report.bernoulli(11402, O.userTrack + "^" + t.reportp2c + "^" + i)
				});
				else if (s === 2 || s === 5) {
					var p = n.data("seller-others-id"),
						d = n.data("source"),
						v = n.data("name-account"),
						m = "";
					w.getInfo(function(t) {
						m = "60^" + t.reportp2c + "^" + i, e.report.bernoulli(11402, m)
					});
					if (s === 5) E.viewInfo(p, 0);
					else try {
						profileMask.openProfile({
							source: d,
							others_id: p,
							trajectory: m,
							nameAccount: v
						})
					} catch (t) {}
				} else if (s === 3 || s === 7) a.match(/ke\.qq\.com/) && (a.match(/\?/) ? a += "&from=1" : a += "?from=1", a = g.generatePtUrl(a)), window.open(a);
				else if (s === 4) O.isUserSearchAction = 0, O.activityFind({
					id: u,
					nav: f
				});
				else if (s === 6) O.searchType = "jobs", i = l || i, O.keyword = l, n.data("second-flag") ? O.secondFlag++ : (O.secondFlag = 0, e.report.bernoulli(11868), O.currentSearchRegion = 0), O.searchParams = {}, O.handleRecomMenuSearch({
					id: r || o || 38688,
					keyword: i,
					categoryIndex: h,
					resultTitleKeyword: f,
					searchType: "jobs"
				});
				else if (s === 9) {
					var y = n.data("report-url");
					if (y) {
						if (y != "tencentNoReport") {
							var b = new Image;
							b.src = y
						}
						a = e.qqfind[a]
					} else a.match(/ke\.qq\.com/) && (a.match(/\?/) ? a += "&from=1" : a += "?from=1", a = g.generatePtUrl(a));
					window.open(a)
				}
				t.preventDefault()
			}), e(document).on("click", "[data-config-action]", function(t) {
				var n = e(this),
					r = n.data("config-action"),
					i = n.data("keyword"),
					s = n.data("special");
				switch (r) {
				case 0:
					O.search(i, !0), e.report.bernoulli(10907, i);
					break;
				case 1:
					s ? subjectEntrance.open({
						subjectName: s,
						prefix: 0,
						keyword: i
					}) : O.search(i);
					break;
				case 3:
					s.match(/ke\.qq\.com/) && (s.match(/\?/) ? s += "&from=1" : s += "?from=1", s = g.generatePtUrl(s)), window.open(s)
				}
				O.userTrack = 200, O.keyword = i, w.getInfo(function(t) {
					e.report.bernoulli(11402, O.userTrack + "^" + t.reportp2c + "^" + i)
				})
			}), e(document).on("click", ".jobs-container [data-report-id],.jobs-recom-group [data-report-id]", function(t) {
				e.report.bernoulli(e(this).data("report-id"))
			}), e(document).on("click", "[data-seller-report-operation]", function() {
				var t = e(this),
					n = t.data("seller-report-operation"),
					r = t.data("uin"),
					i = t.data("iden"),
					s = t.closest(".one-line-seller-unit").index("#hy-find-fuzzy-rows .one-line-seller-unit"),
					o = O.keyword;
				i == "talk" ? i = 2 : i = 1, b.sellerOperation({
					locType: n,
					bid: r,
					acttype: i,
					order: s,
					keyword: o
				})
			})
		}, O.gdtShowReport = g.gdtShowReport, O.findFuzzyScrollHandler = t.findFuzzyScrollHandler, O.findFuzzyScrollQunHandler = t.findFuzzyScrollQunHandler, O.computeCanFindMoreSeller = function() {
			if (O.isShowNonSameCitySeller && !O.isMoreNonSameCitySeller && O.findNonSameCityListCache.length === 0 || !O.isShowNonSameCitySeller && !O.isMoreSameCitySeller && O.findSameCityListCache.length === 0 && !O.isMoreNonSameCitySeller && O.findNonSameCityListCache.length === 0) O.canFindMoreSeller = !1
		}, O.showPageController = function(t) {
			O.computeCanFindMoreSeller();
			var n = e("#hy-find-fuzzy-rows .search-row-inner:visible .hy-find-fuzzy-pagination"),
				r = O.findSellerCurPage,
				i = O.findSellerTotalPage,
				s = !O.canFindMoreSeller,
				o = i;
			t == "end" && (s = !0);
			if (s && r === 1 && i === 1) return;
			n.html(x.get(O.findSellerCurPage, s, o)), n.show()
		}, O.hidePageController = function() {
			e(".hy-find-fuzzy-pagination").hide()
		}, O._gotoPageWithoutCgiReq = function(t) {
			e("#hy-find-fuzzy-rows .search-row-inner").each(function(n, r) {
				n + 1 === t ? e(this).show() : e(this).hide()
			}), e("#hy-find-fuzzy-rows,.jobs-container").scrollTop(0), O.findSellerCurPage = t
		}, O.gotoPage = function(n) {
			var r = {};
			n = parseInt(n);
			if (n !== n) return;
			if (n > O.findSellerCurPage) {
				e(".noSCTipsContainer").hide(), O.computeCanFindMoreSeller();
				if (n > O.findSellerTotalPage && O.canFindMoreSeller) {
					r.keyword = O.keyword;
					if (O.isMoreSameCitySeller) r.scf = 1, O.findCgiSellerCurPage++;
					else {
						O.findCgiSellerCurPage = 1, r.scf = 0, r.fetchtag = 1;
						if (O.findSameCityListCache.length !== 0) {
							var i = [];
							O.findSameCityListCache.forEach(function(e) {
								e.job_name ? e = u.processData(e) : e = s.processData(e), i.push(e)
							}), O.findSameCityListCache = [], t.fuzzyFind({
								mixtureSameCityIsEmpty: !1,
								mixtureSameCityList: i
							}, O.currentResultType || "seller", 1)
						}
					}
					O.find(r, 1)
				} else O._gotoPageWithoutCgiReq(n);
				e.report.bernoulli(11433)
			} else O._gotoPageWithoutCgiReq(n);
			!O.isMoreSameCitySeller && O.findSameCityListCache.length === 0 ? O.showPageController("end") : O.showPageController()
		}, O.find = t.find, O.accurateFind = t.accurateFind, O.fuzzyFind = t.fuzzyFind, O.activityFind = function(t, n) {
			var r, i = "同城活动";
			typeof t == "object" ? (r = t.id, i = t.nav) : r = t;
			var s = {
				id: r,
				ver: E.getVersion()
			};
			localStorage[y.uin() + "userInfo"] && (s.longitude = w._fields.longitude, s.latitude = w._fields.latitude, s.lbs_addr_country = w._fields.lbs_addr_country, s.lbs_addr_province = w._fields.lbs_addr_province, s.lbs_addr_city = w._fields.lbs_addr_city);
			if (!n) O.$els.fuzzy.hide(), O.$els.accurate.hide(), O.isSearchResultLayerDisplay = !0, O.MaskLoading.show(), O.MaskLoading.loading("hide"), O.MaskLoading.loading("show", {
				status: "search"
			}), o.get(s, n, function(e) {
				!e.info || !e.info.length ? O.MaskLoading.loading("hySearchZeroSameCity") : (O.findActivityCurPageNum += e.info.length, O.findActivityCurPageCache = O.findActivityCurPageCache.concat(e.info), f.render({
					activities: e.info,
					nav: i
				}), e.isEnd || O.bindActivityScroll())
			});
			else {
				var u = "";
				o.get(s, n, function(t) {
					O.findActivityCurPageNum += t.info.length, O.findActivityCurPageCache = O.findActivityCurPageCache.concat(t.info);
					var n = "";
					e.each(t.info, function(e, t) {
						n += m({
							value: t
						})
					}), e("#hy-free-activities .seller-list").append(n), t.isEnd || O.bindActivityScroll()
				})
			}
		}, O.bindActivityScroll = function() {
			e("#hy-free-activities .content-container").off("scroll", O.activityScrollHandler), e("#hy-free-activities .content-container").on("scroll", O.activityScrollHandler)
		}, O.unbindActivityScroll = function() {
			e("#hy-free-activities .content-container").off("scroll", O.activityScrollHandler)
		}, O.activityScrollHandler = function(t) {
			var n = e("#hy-free-activities .seller-list:visible").height();
			e(this).scrollTop() + 402 + 20 > n && (O.unbindActivityScroll(), O.activityFind(0, !0))
		}, O.search = function(t, n) {
			O.isUserSearchAction = 0;
			var r;
			t ? r = t : r = (e("#hy-search-input").val() || "").trim();
			if (r) {
				O.keyword = r;
				if (r == "同城活动" && !n) {
					e("#subject-mask").hide(), f.loadData();
					return
				}
				if (r == "齐齐直播间" && E.canInvokeGuaGua) {
					e("#subject-mask").hide(), n ? (a.loadData("hybridHot"), e.report.bernoulli(11564)) : (a.loadData("hybrid"), e.report.bernoulli(11545));
					return
				}
				if (r === "315维权专题" || r === "315维权" || r === "315") {
					subjectEntrance.open({
						subjectName: "activity315",
						prefix: 3,
						keyword: r
					});
					return
				}
				b.assertSearchBehavior(r, "hybrid"), O.$els.recommend.hide(), e("#hy-layer").hide(), e("#subject-mask").hide(), e("#hy-free-activities").hide(), e("#hy-activity315").hide(), e(".qiqi-room", "#hy-main").hide(), O.MaskLoading.loading("hide"), O.MaskLoading.loading("show", {
					status: "search"
				}), e(".hy-loading-title").html(""), O.find(r, {
					isGeneralHotWords: n ? !0 : !1
				}), O.isSearchResultLayerDisplay = !0, O.$els.loadingMask.show(), O.$els.fuzzy.hide(), O.$els.accurate.hide(), l.init()
			}
		}, O.initView = function(t) {
			var n = O.$els;
			n.recommend || (n.recommend = e("#hy-recommend")), n.fuzzy || (n.fuzzy = e("#hy-find-fuzzy")), n.accurate || (n.accurate = e("#hy-find-accurate")), n.HyNav || (n.HyNav = e("#hy-nav")), n.nav || (n.nav = e("nav")), n.loadingMask || (n.loadingMask = e("#hy-loading-mask")), n.accurate.hide(), n.fuzzy.hide(), n.HyNav.show(), n.nav.show(), n.recommend.show(), O.status = "init"
		}, O.display = function(t) {
			var n = O.$els;
			n.hy || (n.hy = [e("#hy-header"), e("nav"), e("#hy-nav"), e("#hy-main")]), n.hy.forEach(function(e) {
				e[t]()
			})
		}, O.show = function() {
			O.display("show"), e("#hy-search-input").focus();
			if (O.status === "fuzzy") {
				var t = O.$els;
				t.HyNav || (t.HyNav = e("#hy-nav")), t.HyNav.hide()
			}
		}, O.hide = function() {
			O.display("hide")
		}, window.qqfind || (window.qqfind = {}), window.qqfind.hybrid = O, e[N] = O
	}), !
	function(e) {
		typeof define == "function" ? define("widget/ke", ["../$"], e) : e($)
	}(function($) {
		"use strict";

		function _isFunction(e) {
			return typeof e == "function"
		}
		function _normalize(e, t) {
			return _isUnnormalId(t) ? t : _isRelativePath(t) ? _resolvePath(e, t) + ".js" : t
		}
		function _isUnnormalId(e) {
			return /^https?:|^file:|^\/|\.js$/.test(e)
		}
		function _isRelativePath(e) {
			return (e + "").indexOf(".") === 0
		}
		function _resolvePath(e, t) {
			t = e.substring(0, e.lastIndexOf("/") + 1) + t, t = t.replace(DOT_RE, "/");
			while (t.match(DOUBLE_DOT_RE)) t = t.replace(DOUBLE_DOT_RE, "/");
			return t = t.replace(DOUBLE_SLASH_RE, "$1/")
		}
		function parallel(e, t) {
			function s(e, i, s) {
				n[e] = s;
				if (--r === 0 || i) t && t(i, n), t = null
			}
			var n = [],
				r = e.length,
				i;
			r ? e.forEach(function(e, t) {
				e(s.bind(undefined, t))
			}) : (t && t(null, n), t = null)
		}
		function _getMod(e) {
			var t = e.name,
				n = e.base,
				r = _normalize(n, t),
				i;
			return (i = Cache[r]) ? i.exports : !1
		}
		function _initCache(e) {
			return Cache[e] = {
				dones: [],
				url: _sim[e] || e,
				loaded: !1
			}
		}
		function _save(e) {
			var t = require(STORAGE_MODULE_NAME),
				n = Cache[e];
			t && (n.factory ? t.set(MODULE_CACHE_KEY, {
				path: e,
				factory: n.factory.toString(),
				deps: JSON.stringify(n.deps)
			}) : t.set(MODULE_CACHE_KEY, {
				path: e,
				json: JSON.stringify(n.json)
			}))
		}
		function _runFactory(e, t, n, r) {
			function o() {
				if (_isFunction(t)) {
					var n = {
						exports: {}
					};
					i.factory = i.factory || t, i.exports = i.exports || t(makeRequire({
						base: i.url
					}), n.exports, n) || n.exports
				} else i.json = t, i.exports = t;
				i.dones.forEach(function(e) {
					e(null, i.exports)
				}), i.dones.length = 0, r && _save(e)
			}
			var i = Cache[e],
				s = makeRequire({
					base: i.url
				});
			n ? (i.deps = n.slice(0), setTimeout(function() {
				s(n, o)
			}, 0)) : o()
		}
		function _makeMod(e) {
			var t = Cache[e].url;
			_stack.forEach(function(n) {
				n.m || (n.m = e);
				var r = _normalize(t, n.m),
					i = n.f,
					s = Cache[r];
				s || (s = _initCache(r), _runFactory(r, i, n.d, !0)), !s.exports && _runFactory(r, i, n.d, !0)
			}), _stack.length = 0
		}
		function _loadScript(e) {
			function r() {
				return s(), _makeMod(e)
			}
			function i() {
				s(), _head.removeChild(t), n.dones.forEach(function(e) {
					e(new Error(404))
				}), n.dones.length = 0
			}
			function s() {
				t.removeEventListener("load", r, !1), t.removeEventListener("error", i, !1)
			}
			var t = document.createElement("script"),
				n = Cache[e];
			t.addEventListener("load", r, !1), t.addEventListener("error", i, !1), t.type = "text/javascript", t.src = n.url, _head.appendChild(t)
		}
		function _buildCallback(opt) {
			var name = opt.name,
				base = opt.base,
				path = _normalize(base, name),
				mod = Cache[path],
				db = require(STORAGE_MODULE_NAME);
			return function(done) {
				mod ? "exports" in mod ? done(null, mod.exports) : mod.dones.push(done) : (mod = _initCache(path), mod.dones.push(done), db ? db.get(MODULE_CACHE_KEY, path, function(e) {
					var data = this.result;
					if (!data) _loadScript(path);
					else if (data.factory) {
						var res = eval.call(window, "(" + data.factory + ")");
						_runFactory(path, res, JSON.parse(data.deps))
					} else data.json && _runFactory(path, JSON.parse(data.json))
				}) : _loadScript(path))
			}
		}
		function makeRequire(e) {
			function n(e, n, r) {
				if (!n) return _getMod({
					name: e,
					base: t
				});
				e.forEach(function(n, r) {
					typeof n == "string" && (e[r] = _buildCallback({
						name: n,
						base: t
					}))
				}), parallel(e, function(e, t) {
					if (e) return r(e);
					n.apply(undefined, t)
				})
			}
			var t = e.base;
			return n
		}
		function require() {
			return _require ? _require.apply(root, arguments) : (_base ? _require = makeRequire({
				base: _base
			}) : _require = makeRequire({
				base: location.href
			}), _require.apply(root, arguments))
		}
		function define(e, t, n) {
			n || (t ? (n = t, Array.isArray(e) ? (t = e, e = undefined) : t = null) : (n = e, e = undefined, t = null)), _stack.push({
				m: e,
				d: t,
				f: n
			})
		}
		function init(e) {
			var t = +(new Date);
			require([function(n) {
				require(["main"], function(r) {
					r.init("#ke-container", e, t), n(null, r)
				})
			}, "http://ke.qq.com/cgi-bin/course/index_hot_list?callback=ke&class=0&count=18&r=" + +(new Date)], function(e, t) {
				initFlag || e.render(t), initFlag = !0
			}, function() {
				require(["main"], function(e) {
					e.render()
				})
			})
		}
		var root = window,
			Cache = {},
			_sim = {
				main: root.localStorage.ke_main || "http://7.url.cn/edu/search/js/main.3.1.0.js"
			},
			_stack = [],
			_head = document.getElementsByTagName("head")[0],
			_require, _base = "./js/",
			MODULE_CACHE_KEY = "module",
			CGI_CACHE_KEY = "cgi",
			STORAGE_MODULE_NAME = "storage",
			DOT_RE = /\/\.\//g,
			DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//,
			DOUBLE_SLASH_RE = /([^:/])\/\//g;
		_initCache("jquery"), _runFactory("jquery", function() {
			return jQuery
		});
		var initFlag = !1;
		return root.ke = define, define.define = define, {
			init: init
		}
	}), !
	function(e) {
		typeof define == "function" ? define("tools/searchtext", ["$"], e) : e($)
	}(function(e) {
		var t = {
			hybridSearchText: "输入帐号、关键词、商家名称(如鲜花速递)",
			peopleSearchText: "请输入QQ号码/昵称/关键词/手机号/邮箱",
			groupSearchText: "请输入群号/关键词",
			sellerSearchText: "请输入QQ帐号/昵称/关键词",
			setFlag: !1
		};
		return t.setText = function(e) {
			if (t.setFlag) return;
			if (e) {
				var n = e.complex,
					r = e.people,
					i = e.group;
				n && (t.hybridSearchText = n), r && (t.peopleSearchText = r), i && (t.groupSearchText = i), t.setFlag = !0
			}
		}, t
	}), !
	function(e) {
		"use strict";
		typeof define == "function" ? define("hybrid.init", ["$", "tmpl!template/hyHotWords.html", "tmpl!template/hyRecommendMenuNav.html", "tools/utils", "tools/native", "tools/reportBasic", "tools/info", "tools/cookie", "tools/citySelector", "tools/searchtext"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f) {
		"use strict";
		var l = "hybridInit",
			c = s.monitor,
			h = s.bernoulli,
			p = s.monitorAndBer,
			d = {
				recommendHTML: "",
				recommendRenderCallback: null
			};
		return d.init = function(t) {
			e("#hy-search-form").on("submit", function(e) {
				e.preventDefault()
			}), e.report.monitor(395723), d.initLoading(), _tabsTiming.hybrid.startCGI = +(new Date), o.getInfo(function(n) {
				var r = o.getCityId() || 10059,
					i = function() {
						if (window.LatlngMap) {
							if (window.LatlngMap[r]) {
								var e = window.LatlngMap[r].n,
									t = window.LatlngMap[r].prov,
									n = window.LatlngMap[r].lat,
									s = window.LatlngMap[r].lon;
								o._fields.lbs_addr_city = e, o._fields.lbs_addr_province = t, o._fields.lbs_addr_country = "中国", o._fields.longitude = s / 1e6, o._fields.latitude = n / 1e6, o._fields.lbs_addr_detail_short = e, o._fields.lbs_addr_city_nocache = e, o.getInfo(function(e) {
									localStorage[u.uin() + "userInfo"] = JSON.stringify(e)
								})
							}
						} else setTimeout(i, 50)
					};
				i(), d.initHot(window.localCityMap[r][0], t), d.citySelector = e("#hy-city-selector").citySelector(o.getCityId()), d.citySelector.on("change", function(t, n) {
					var r = e.hybrid,
						i = e.hybridFinder;
					e("#hy-city-selector").removeClass("open"), i.recommendGroupList = {}, i.recommendGroupLoadingStatus = {}, r.isUserHoverInIndustry = !1, r.currentSearchRegion = 0, r.searchParam = {};
					if (window.LatlngMap[n]) {
						var s = window.LatlngMap[n].n,
							a = window.LatlngMap[n].prov,
							f = window.LatlngMap[n].lat,
							l = window.LatlngMap[n].lon;
						o._fields.lbs_addr_city = s, o._fields.lbs_addr_province = a, o._fields.lbs_addr_country = "中国", o._fields.longitude = l / 1e6, o._fields.latitude = f / 1e6, o._fields.lbs_addr_detail_short = s, o._fields.lbs_addr_city_nocache = s
					} else console.error(n);
					o.getInfo(function(e) {
						if (e.longitude === 116) return;
						localStorage[u.uin() + "userInfo"] = JSON.stringify(e), r.isSearchResultLayerDisplay && r.find(r.keyword, {
							isMore: !1,
							isCategoryIndex: r.isSearchByCategory,
							categoryType: r.categoryType,
							resultTitleKeyword: r.resultTitleKeyword,
							searchType: r.searchType
						}), d.initHot(s)
					})
				})
			})
		}, d.initLoading = function() {
			d.recommSellerCategoryLoading = e("#hy-recommend-menu").loading(), d.recommSellerCategoryLoading.loading("show")
		}, d.initHot = function(t, n) {
			t = t && t.replace("市", "") || "";
			var s = +(new Date),
				o = "http://cgi.find.qq.com/qqfind/biz/hotwords_navigation";
			i.canInvokeGuaGua && (o += "?guagua=1"), r.request({
				type: "POST",
				url: o,
				dataType: "json",
				data: {
					city: t,
					v: i.getVersion,
					gdtn: "2|4"
				},
				error: function(e, t, n) {
					var r = 0;
					t === "timeout" ? r = 6015666 : t === "error" && (r = 6015404), this.success({
						retcode: r
					})
				},
				success: function(t) {
					try {
						e.report.mmReport(o, t && t.retcode, +(new Date) - s)
					} catch (r) {}
					d.initHotHandler(t, n)
				}
			})
		}, d.initHotHandler = function(i, s) {
			function w(e, t) {
				return e.originalWord = t || e.word, e.action = e.action || 0, e.special = e.special || e.jump_url || "", e.decorateWord ? (e.word = e.decorateWord, e.isRecommend && (e.word = '<span class="hot-orange">' + e.word + "</span>")) : e.isRecommend && (e.word = '<span class="hot-orange">' + e.word + "</span>"), t && (e.decorateWord = t), e
			}
			_tabsTiming.hybrid.CGIend = +(new Date);
			var o = i.retcode,
				a = i.result || {},
				l = a.guagua_hot || {},
				c = a.hotwords || [],
				h = a.industry || [],
				p = a.activity || [],
				v = a.hot_recommend || [],
				m = a.gdt || [],
				g = a.prompt || {},
				y = i && i.result && i.result.isTC == 0 ? 0 : 1,
				b = {
					line1: {},
					line2: {}
				};
			!o && e.isEmptyObject(a) && (o = 6015112);
			if (o) {
				e.report.monitor(337453), d.recommSellerCategoryLoading.loading("error", {
					errorCode: o,
					errorText: '<i class="icon-big-alert"></i>拉取商家导航失败，'
				}), d.recommSellerCategoryLoading.loading("show"), s && s();
				return
			}
			d.recommSellerCategoryLoading.loading("hide");
			var E = [];
			E.push(w(l, "齐齐直播间"));
			var S = e.map(c, function(e) {
				return e = w(e), E.push(e), e
			});
			f.setText(g), d.searchInput || (d.searchInput = e("#hy-search-input")), d.searchInput.attr("placeholder", f.hybridSearchText), e("#hy-hot-words").html(t(E));
			var x = e("#hy-hot-words ul li");
			for (var T = x.length - 1; T > 0; T--) {
				if (!(x[T].offsetTop > 0)) break;
				e(x[T]).remove()
			}
			var N = [];
			N.push({
				a: 11917,
				b: 11918,
				m: 11929
			}), N.push({
				a: 11930,
				b: 11931,
				m: 11940
			}), N.push({
				a: 11941,
				b: 11942,
				m: 11951
			}), N.push({
				a: 11952,
				b: 11953,
				m: 11962
			}), N.push({
				a: 11963,
				b: 11964,
				m: 11973
			}), h.forEach(function(e, t, n) {
				if (t >= 5) return;
				var r = N[t] || N[4];
				e.recommends.forEach(function(e, t) {
					e.reportid = r.a
				}), e.items.forEach(function(e, t, n) {
					e.reportid = r.b + t > r.m ? r.m : r.b + t
				})
			});
			var C = [],
				k = [];
			p.forEach(function(e, t) {
				e.jump_url && (e.special = e.jump_url), e.activity_type == "pic" ? C.push(e) : k.push(e)
			});
			var L = [],
				A = [],
				O;
			if (m) {
				var M = "576467371671016655";
				if (m[M] && m[M].list) {
					O = [];
					for (var _ = 0; _ < m[M].list.length; _++) {
						var D = m[M].list[_];
						D.txt && D.rl && D.apurl && (L.push({
							desc: D.txt,
							action: 9,
							special: D.jtype == 4 ? D.cl : D.rl,
							reportUrl: D.jtype == 4 ? D.rl || "tencentNoReport" : ""
						}), console.log(L), e.qqfind = e.qqfind || {}, D.jtype == 4 && (e.qqfind[D.cl] = D.trl.replace("$FUIN$", u.uin()) + "&DATA=" + encodeURIComponent('{"POSID":' + M + ',"ADID":' + (D.cl || 0) + ',"TIME":' + +(new Date) + ',"SRCID":0}').replace(/"/g, '\\"') + "&traceid=" + D.traceid), L.length <= 4 && O.push(D))
					}
					r.gdtShowReport(O), k = L.concat(k)
				}
				M = "504409777633088719";
				if (m[M] && m[M].list) {
					O = [];
					for (_ = 0; _ < m[M].list.length; _++) D = m[M].list[_], D.img && D.rl && D.apurl && (A.push({
						desc: D.txt,
						pic: D.img,
						action: 9,
						special: D.jtype == 4 ? D.cl : D.rl,
						reportUrl: D.jtype == 4 ? D.rl || "tencentNoReport" : ""
					}), e.qqfind = e.qqfind || {}, D.jtype == 4 && (e.qqfind[D.cl] = D.trl.replace("$FUIN$", u.uin()) + "&DATA=" + encodeURIComponent('{"POSID":"' + M + '","ADID":' + (D.cl || 0) + ',"TIME":' + +(new Date) + ',"SRCID":0}').replace(/"/g, '\\"') + "&traceid=" + D.traceid), A.length <= 2 && O.push(D));
					r.gdtShowReport(O), C = A.concat(C)
				}
			}
			C.length > 2 ? C.length = 2 : "", k.length > 4 ? k.length = 4 : "", C.forEach(function(e, t) {
				t === 0 ? e.reportid = 11974 : e.reportid = 11975, e.action == 2 || e.action == 5 ? e.className = "商家" : e.action == 9 ? e.className = "推广" : e.action == 7 ? e.className = "课堂" : e.className = "专题"
			}), N = [11976, 11977, 11978, 11979], k.length > 4 ? k.length = 4 : 0, k.forEach(function(e, t) {
				e.jump_url && (e.special = e.jump_url), e.reportid = N[t] || 11979
			}), N = [], N.push({
				a: 11980,
				b: [11981, 11982, 11983],
				c: [11984, 11985]
			}), N.push({
				a: 11986,
				b: [11987, 11988, 11989],
				c: [11990, 11991]
			}), N.push({
				a: 11992,
				b: [11993, 11994, 11995],
				c: [11996, 11997]
			}), N.push({
				a: 11998,
				b: [11999, 12e3, 12001],
				c: [12002, 12003]
			}), v.forEach(function(e, t) {
				if (t >= 4) return;
				var n = N[t] || N[3];
				e.recommend_industry.forEach(function(e, t) {
					e.jump_url && (e.special = e.jump_url), e.reportid = n.b[t] || n.b[n.b.length - 1]
				}), e.recommend_seller.forEach(function(e, t) {
					e.jump_url && (e.special = e.jump_url), e.reportid = n.c[t] || n.c[n.c.length - 1]
				}), e.recommend_pic.reportid = n.a, e.recommend_pic.jump_url && (e.recommend_pic.special = e.recommend_pic.jump_url)
			}), e("#hy-recommend-menu").html(n({
				industry: h,
				recommend_activity_pics: C,
				recommend_activity_text: k,
				recommend_blocks: v
			})), _tabsTiming.hybrid.firstScreen = +(new Date), s && s()
		}, e[l] = d
	}), !
	function(e) {
		typeof define == "function" ? define("datapools", ["$", "tools/utils", "./model/buddy", "./model/lbs", "./people"], e) : e($)
	}(function(e, t, n, r, i) {
		"use strict";

		function a(t, i) {
			function s(n) {
				var r = n.result || {},
					s = r.buddy || {},
					a = n.ls;
				u["pe-fuzzy"][0].currentPageContainingNum === -1 && (u["pe-fuzzy"][0].currentPageContainingNum = 20);
				try {
					var f = {};
					a ? f = {
						currentPageContainingNum: a.length + u["pe-fuzzy"][0].currentPageContainingNum,
						sessionid: n.sessionid
					} : s.online !== undefined ? f = {
						page: s.page ? s.page : 0,
						online: s.online || 0,
						redwords: s.redwords,
						sessionid: s.sessionid,
						currentPageContainingNum: s.count + u["pe-fuzzy"][0].currentPageContainingNum
					} : f = {
						page: s.page ? s.page : 0,
						redwords: s.redwords,
						sessionid: s.sessionid,
						currentPageContainingNum: s.count + u["pe-fuzzy"][0].currentPageContainingNum
					}, o.set({
						sponser: t.sponser,
						data: f,
						urlIden: u["pe-fuzzy"][2]
					}), u["pe-fuzzy"][0].currentPageContainingNum >= 60 && u["pe-fuzzy"][0].currentPageContainingNum < 64 ? (u["pe-fuzzy"][0].num = 4, u["pe-fuzzy"][0].cnt = 4) : u["pe-fuzzy"][0].currentPageContainingNum >= 64 && (u["pe-fuzzy"][0].num = 20, u["pe-fuzzy"][0].cnt = 20, u["pe-fuzzy"][0].currentPageContainingNum = 0, e(document).trigger("peSearchResSimResultDown:end"))
				} catch (l) {}
				i && i(n)
			}
			t.sponser = t.sponser || "pe-default-recommend";
			switch (t.sponser) {
			case "pe-fuzzy":
				var a;
				u["pe-fuzzy"][2] !== "" && (a = u["pe-fuzzy"][2]), t.extend && e.extend(u["pe-fuzzy"][1], u["pe-fuzzy"][0]), typeof u["pe-fuzzy"][1].page != "undefined" && u["pe-fuzzy"][1].page++, typeof u["pe-fuzzy"][1].offset != "undefined" && u["pe-fuzzy"][1].cnt && (u["pe-fuzzy"][1].offset += u["pe-fuzzy"][1].cnt);
				var f = {};
				e.extend(!0, f, u["pe-fuzzy"][1]), delete f.currentPageContainingNum;
				if (a) switch (a) {
				case "nearly":
					r.neighbor(f, s);
					break;
				default:
					n.search(f, a, s)
				} else n.search(f, s)
			}
		}
		function f(t) {
			t.sponser == t.sponser || "pe-default-recommend";
			switch (t.sponser) {
			case "pe-fuzzy":
				t.data && !e.isEmptyObject(t.data) && (u["pe-fuzzy"][0] = {}, e.extend(u["pe-fuzzy"][0], t.data)), t.keywords && !e.isEmptyObject(t.keywords) && (u["pe-fuzzy"][1] = {}, e.extend(u["pe-fuzzy"][1], t.keywords)), t.urlIden && (u["pe-fuzzy"][2] = t.urlIden), u["pe-fuzzy"][0].currentPageContainingNum == null && (u["pe-fuzzy"][0].currentPageContainingNum = -1)
			}
		}
		var s = "dataPools",
			o = {},
			u = {
				"pe-default-recommend": [],
				"pe-accurate": [],
				"pe-fuzzy": [{
					page: 0,
					redwords: "",
					sessionid: 0,
					currentPageContainingNum: -1
				}, {}, ""]
			};
		return e.extend(o, {
			get: a,
			set: f
		}), e[s] = o
	}), !
	function(e) {
		"use strict";
		typeof define == "function" ? define("people", ["$", "./widget/people.chooseLocationGenerator", "./widget/people.chooseLocationGenerator-54", "./people.view", "./model/buddy", "./model/seller", "./datapools", "./model/lbs", "tmpl!template/peFindFuzzy.html", "tools/utils", "tools/reportBasic", "tools/reportLogic", "tools/info", "tools/native", "tools/searchtext", "tools/pagination", "tools/loading"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m) {
		"use strict";

		function A(t) {
			if (!y.GLOBAL.scrollNewFlag) return;
			y.$els.peSimResPCtrolContainer || (y.$els.peSimResPCtrolContainer = e("#pe-search-res-loading-tip")), y.$els.peSimResDom || (y.$els.peSimResDom = e("#pe-sim-result-dom")), y.$els.peSimResDomI || (y.$els.peSimResDomI = e("#pe-search-res-sim-dom"));
			var n = y.$els.peSimResDomI.height();
			e(this).scrollTop() + 413 + 20 > n && (y.unbindScrollDownOnPageSim(), o.get({
				extend: !0,
				sponser: "pe-fuzzy"
			}, function(t) {
				e("#pe-search-res-sim-dom .active").append(y.handleScollSimResult(t))
			}))
		}
		if (urlstr.indexOf("im_version") < 0) var g = !1;
		else var g = !0;
		var y = {
			flattening: g,
			isInited: !1,
			defaultShowed: !1,
			canPullTiantian: !1,
			isLoadingTiantian: !1
		},
			b, w, E, S, x, T, N, C, k, L;
		return y.$els = {}, y.GLOBAL = {
			currentResSimPage: 1,
			totalResSimPage: 1,
			scrollNewFlag: !0,
			initPeSearchingDone: !1,
			searchResultEndFlag: !1
		}, y.totalFilterUinList = [], e.extend(y, {
			utils: {
				reportSearchInfoButKeyword: function(n) {
					if (typeof n != "object") return;
					var r = [],
						i = [],
						s = "";
					n.sex == 1 ? (r.push(10865), i.push(0)) : n.sex == 2 && (r.push(10865), i.push(0)), t.locationInfo["pe-location-info"][0] !== "-1" && t.locationInfo["pe-location-info"][0] !== -1 && (r.push(10866), s = t.constructLocationWording("pe-location-info"), i.push(s)), t.locationInfo["pe-hometown-info"][0] !== "-1" && t.locationInfo["pe-hometown-info"][0] !== -1 && (r.push(10867), s = t.constructLocationWording("pe-hometown-info"), i.push(s)), n.agerg !== 0 && (r.push(10868), i.push(n.agerg)), r.push(10869), n.online ? i.push("yes") : i.push("no"), r.push(10870), n.video ? i.push("yes") : i.push("no");
					for (var o = 0, u = r.length; o < u; o++) {
						var a = r[o],
							f = i[o];
						window.setTimeout(function(t, n) {
							e.report.bernoulli(t, n)
						}, 100, a, f)
					}
					var l = n;
					l.agerg == 0 && l.city == 0 && l.country == 0 && l.district == 0 && l.firston == 1 && l.hcity == 0 && l.hcountry == 0 && l.hdistrict == 0 && l.hprovince == 0 && l.online == 1 && l.province == 0 && l.sex == 0 && l.video == 0 && e.report.bernoulli(12150)
				}
			}
		}), y.init = function(n) {
			y.$els.peSearchInput || (y.$els.peSearchInput = e("#pe-search-input")), y.isInited || (y.isInited = !0, b = e("#pe-search-input"), w = e("#pe-search-input-p a.btn-loc"), E = e("#pe-search-res-sim-dom"), S = e("#pe-location-info"), x = e("#pe-sex"), T = e("#pe-age"), N = e("#pe-online"), C = e("#pe-camera"), k = e("#pe-default"), r.init(), y.$els.peSearchInput.attr("placeholder", d.peopleSearchText), h.getInfo(function(e) {
				var n = 0,
					i = e["country_id"] != "" ? e.country_id : "-1",
					s = e["province_id"] != "" ? e.province_id : "-1",
					o = e["city_id"] != "" ? e.city_id : "-1",
					u = e["h_country"] != "" ? e.h_country : "-1",
					a = e["h_province"] != "" ? e.h_province : "-1",
					f = e["h_city"] != "" ? e.h_city : "-1",
					l = e["gender"] != "" ? e.gender : "";
				e.birthday && e.birthday.year && (n = (new Date).getFullYear() - e.birthday.year);
				if (e.p2c) {
					var c = e.p2c.split("_");
					c[0] != -1 && c[0] != -1 && (i = 1, s = c[0], o = c[1])
				}
				var h = {
					target: "pe-location-info",
					value: [i, s, o, -1]
				},
					p = {
						target: "pe-hometown-info",
						value: [1, -1, -1, -1]
					},
					d = 0,
					v = function() {
						t.initFlag ? (r.fillLocationInfo(h), r.fillHometownInfo(p)) : d < 10 && (d++, console.log(d), setTimeout(v, 200))
					};
				v()
			}), y.initHandler());
			if (n.search) return y.search(n), !1;
			y.show(n), window.setTimeout(function() {
				y.$els.peSearchInput[0] && y.$els.peSearchInput[0].focus()
			}, 200), y.defaultShowed = !0
		}, y.showNearlySection = function(t) {
			if (y.isLoadingTiantian) {
				setTimeout(function() {
					y.showNearlySection(t)
				}, 200);
				return
			}
			if (!y.canPullTiantian) switch (t) {
			case "enable":
				e("#pe-nearly-people .pe-nearly-filter").show(), y.more("nearly", !1);
				break;
			case "disable":
			default:
				r.showNearlyPeNoLBS()
			}
		}, y.show = function(t) {
			var n;
			y.defaultShowed ? (r.showAllPePageSkeleton(), k.css("z-index", "1").show()) : (r.initPeDefault(t), y.more("recommend", !1), y.more("tiantian", !1), n = u.state(), n === "unknown" && e(document).on("lbs:stateinit", function(e, t) {
				y.showNearlySection(t)
			}))
		}, y.hide = function() {
			r.hideAllPePageSkeleton()
		}, y._buddyRecommend = function() {
			var t = 0,
				n = 0,
				s = !0,
				o = 24;
			return function(u, a) {
				a && a();
				if (!s && u) return;
				u ? (o = 8, t = t === 0 ? 24 : t + 8) : (t = 0, n = 8, _tabsTiming.people.startCGI = +(new Date)), i.recommend({
					start: t,
					num: o,
					filter_uin: y.totalFilterUinList.join("-"),
					limitn: n
				}, function(t) {
					u || (_tabsTiming.people.CGIend = +(new Date));
					var n = {},
						o = 8,
						a = 0,
						f, l, c, h, p;
					if (!t) f = 600001;
					else if (t.retcode) t.retcode = "" + t.retcode, t.retcode.search(/^6022/i) === -1 ? f = "6022" + t.retcode : f = t.retcode;
					else {
						l = t.result;
						if (l === undefined) f = 6000214;
						else {
							c = l.ls;
							var d = l.eqq_hit;
							d ? f = 6000215 : c === undefined ? f = 6000212 : c[0] === undefined && (f = 6000213)
						}
					}
					if (f && f !== 6000214 && f !== 6000212 && f !== 6000213 && f !== 6000215) {
						if (!u) {
							r.loadingDisplay("peRecommendPeopleLoading", "show"), r.loadingDisplay("peRecommendPeopleLoading", "error", {
								errorText: '<i class="icon-alert"></i>拉取推荐好友失败，请稍后重试。',
								errorCode: f
							});
							return
						}
						return
					}
					if (f === 6000215) {
						e("#pe-recommend-people").hide();
						return
					}
					if (f) {
						r.noPosBuddyTip();
						return
					}
					h = c.length, p = l.disable === 1, n.hasNext = h > o, n.recommend = [], n.dataObj = "rec", n.showGender = !0, n.showAge = !1, n.dataPrefix = "pe", n.pageControlHref = "#pe-recommend-people", s = !p, a = 0, e.each(c, function(e, t) {
						i.processData(t), y.totalFilterUinList.push(t.uin), e += 1;
						if (e % o === 0 || e === h && p) n.recommend.push(c.slice(a, e)), a = e
					}), r.buddyRecDisplay(n, u)
				})
			}
		}(), y._pullTianTian = function() {
			y.isLoadingTiantian = !0;
			var t = 0,
				n = 8;
			return function(t, n) {
				var s = +(new Date),
					o = "",
					a = "";
				try {
					var l = JSON.parse(p.getWifiData());
					o = l.data, a = l.signature
				} catch (c) {
					o = "", a = ""
				}
				f.request({
					type: "POST",
					url: "http://cgi.find.qq.com/qqfind/lbs/get_neighbor_v3",
					data: {
						guagua: p.canInvokeGuaGua,
						offset: 1,
						cnt: 24,
						sessionid: 0,
						li: o,
						sign: a
					},
					dataType: "json",
					error: function() {
						this.success({
							retcode: 404
						})
					},
					success: function(o) {
						n && n();
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/lbs/get_neighbor_v3", o && o.retcode, +(new Date) - s)
						} catch (a) {}
						var o = o || {},
							f = o.retcode,
							l = o.guagua,
							c = o.buddy,
							h, p, d;
						if (f) {
							r.loadingDisplay("peNearlyPeopleLoading", "show"), r.loadingDisplay("peNearlyPeopleLoading", "error", {
								errorText: '<i class="icon-alert"></i>拉取数据失败，请稍后重试。'
							}), e("#pe-nearly-people").find(".carousel-inner").html("");
							return
						}
						if (l) y.canPullTiantian = !0, h = l.info, r.guaguaRecDisplay({
							item: h
						}, t), e.report.bernoulli(12154);
						else if (c) {
							p = c.ls, d = o.complete === 1;
							var v = 0,
								m, g = {};
							g.recommend = [], m = p.length;
							if (m === 0) {
								r.loadingDisplay("peNearlyPeopleLoading", "show"), r.loadingDisplay("peNearlyPeopleLoading", "error", {
									errorText: '<i class="icon-alert"></i>拉取数据失败，请稍后重试。'
								}), e("#pe-nearly-people").find(".carousel-inner").html("");
								return
							}
							g.hasNext = m > 8, g.recommend = [], g.dataObj = "near", g.showGender = !0, g.showAge = !1, g.dataPrefix = "pe", g.pageControlHref = "#pe-nearly-people", e.each(p, function(e, t) {
								i.processData(t), e += 1;
								if (e % 8 === 0 || e === m && d) g.recommend.push(p.slice(v, e)), v = e
							}), r.buddyNearlyDisplay(g, 0), e("#pe-nearly-people .pe-nearly-filter").show()
						} else {
							var b = u.state();
							if (b !== "unknown" && b !== "disable") {
								r.loadingDisplay("peNearlyPeopleLoading", "show"), r.loadingDisplay("peNearlyPeopleLoading", "error", {
									errorText: '<i class="icon-alert"></i>拉取数据失败，请稍后重试。'
								}), e("#pe-nearly-people").find(".carousel-inner").html("");
								return
							}
							y.showNearlySection("disable")
						}
						y.isLoadingTiantian = !1
					}
				})
			}
		}(), y._resultNearlyRender = function(t, n) {
			var s = {},
				u = 8,
				a = 0,
				f, l, c, h;
			n ? n.retcode ? (n.retcode = "" + n.retcode, n.retcode.search(/^6021/i) === -1 ? f = "6021" + n.retcode : f = n.retcode) : (l = n.ls, l === undefined ? f = 6000222 : l[0] === undefined && (f = 6000223)) : f = 6000001;
			if (f && !t) {
				e("#pe-search-res-sim-dom .carousel-inner .item").empty(), y.$els.peSimResPCtrolContainer || (y.$els.peSimResPCtrolContainer = e("#pe-search-res-loading-tip")), y.$els.peSimResPCtrolContainer.css("visibility", "hidden"), n ? r.showSearchErrorLoading({
					keyWord: "附近的人",
					errorkind: 256,
					errorCode: (("" + n.retcode).search(/^6023/i) !== -1 ? "" : "6023") + n.retcode
				}) : r.showSearchErrorLoading({
					keyWord: "附近的人",
					errorCode: 6000232,
					errorkind: 256
				});
				return
			}
			h = n.complete === 1, c = l.length, s = [], e.each(l, function(e, t) {
				i.processData(t), s.push(t)
			}), y.unbindScrollDownOnPageSim(), y.bindScrollDownOnPageSim(), y.GLOBAL.currentResSimPage = 1, y.GLOBAL.scrollNewFlag = !0, y.GLOBAL.totalResSimPage = 1, y.GLOBAL.searchResultEndFlag = !1, y.$els.peSimResPCtrolContainer || (y.$els.peSimResPCtrolContainer = e("#pe-search-res-loading-tip")), y.$els.peSimResPCtrolContainer.css("visibility", "hidden"), y.$els.peSimResPCtrolContainer.find("a.btn-hack").text(1), o.set({
				sponser: "pe-fuzzy",
				data: {}
			}), h ? (y.unbindScrollDownOnPageSim(), y.GLOBAL.searchResultEndFlag = !0) : e("#pe-search-res-loading-icon").show(), r.showSearchSimResult(s), e.report.bernoulli(10864, "pv")
		}, y._buddyNearly = function() {
			var t = 1,
				n = !0,
				s = 0,
				o = 24,
				a = 0,
				f = 2,
				l = {
					setOl: function(e) {
						a = e
					},
					setSex: function(e) {
						f = e
					}
				};
			return function(c, h) {
				h && h(l);
				if (!n && c) return;
				c ? (o = 8, t = t === 1 ? 25 : t + 8) : (o = 24, t = 1), u.neighbor({
					cnt: o,
					offset: t,
					sessionid: s,
					ol: a,
					sex: f
				}, function(t) {
					var o = {},
						u = 8,
						a = 0,
						f, l, h, p;
					t ? t.retcode ? (t.retcode = "" + t.retcode, t.retcode.search(/^6021/i) === -1 ? f = "6021" + t.retcode : f = t.retcode) : (l = t.ls, l === undefined ? f = 6000222 : l[0] === undefined && (f = 6000223)) : f = 6000001;
					if (f) {
						if (!c) {
							r.loadingDisplay("peNearlyPeopleLoading", "show"), r.loadingDisplay("peNearlyPeopleLoading", "error", {
								errorText: '<i class="icon-alert"></i>拉取附近的人失败，请稍后重试。',
								errorCode: f
							}), e("#pe-nearly-people").find(".carousel-inner").html("");
							return
						}
						return
					}
					s = t.sessionid, p = t.complete === 1, h = l.length, n = !p, o.hasNext = h > u, o.recommend = [], o.dataObj = "near", o.showGender = !0, o.showAge = !1, o.dataPrefix = "pe", o.pageControlHref = "#pe-nearly-people", e.each(l, function(e, t) {
						i.processData(t), e += 1;
						if (e % u === 0 || e === h && p) o.recommend.push(l.slice(a, e)), a = e
					}), r.buddyNearlyDisplay(o, c)
				})
			}
		}(), y.more = function(e, t, n) {
			e === "recommend" ? y._buddyRecommend(t, n) : e === "nearly" ? y._buddyNearly(t, n) : e === "tiantian" && y._pullTianTian(t, n)
		}, y.constructSecondNav = function(n) {
			e("#pe-sim-nav .pe-nearly-filter").hide();
			if (!n) {
				var i = e.trim(b.val()),
					s = x.data("real-sex"),
					o = T.data("real-age"),
					a = t.constructLocationWording("pe-location-info"),
					l = t.constructLocationWording("pe-hometown-info");
				o == 0 ? o = undefined : o = T.val(), a == "不限" && (a = undefined), l == "不限" && (l = undefined), i = f.escape(i), i = "搜索： " + i, r.showSearchSimNav({
					keyword: i,
					gender: s,
					age: o,
					location: a,
					hometown: l
				})
			} else {
				var c = h.getInfo(),
					p = c["country_id"] != "" ? c.country_id : "-1",
					d = c["province_id"] != "" ? c.province_id : "-1",
					v = c["city_id"] != "" ? c.city_id : "-1",
					m = c["zone_id"] != "" ? c.zone_id : "-1",
					g = c["h_country"] != "" ? c.h_country : "-1",
					w = c["h_province"] != "" ? c.h_province : "-1",
					E = c["h_city"] != "" ? c.h_city : "-1",
					S = c["gender"] != "" ? c.gender : "male",
					C = "";
				if (typeof n == "object") switch (n.behavior) {
				case "gender":
					C = "搜索： ", y.$els.peSearchInput.val(""), e.inputChangeHandler(), S == "male" ? S = 2 : S = 1, x.data("real-sex", S);
					var k = "不限";
					switch (S) {
					case 0:
						k = "不限";
						break;
					case 1:
						k = "男";
						break;
					case 2:
						k = "女"
					}
					x.val(k), r.fillLocationInfo({
						target: "pe-location-info",
						value: [p, d, v, "-1"]
					}), C += t.constructLocationWording("pe-location-info"), C += " | ", C += k;
					break;
				case "hometown":
					C = "搜索： ", y.$els.peSearchInput.val(""), e.inputChangeHandler(), r.fillLocationInfo({
						target: "pe-location-info",
						value: [p, d, v, "-1"]
					}), r.fillHometownInfo({
						target: "pe-hometown-info",
						value: [g, w, E, "-1"]
					}), C += t.constructLocationWording("pe-location-info"), C += " | ", C += t.constructLocationWording("pe-hometown-info");
					break;
				case "nearly":
					C = "查看附近的人";
					var L = u.state();
					L === "enable" ? e("#pe-sim-nav .pe-nearly-filter").show() : e("#pe-sim-nav .pe-nearly-filter").hide();
					break;
				case "more":
					n.source === "people" ? C = "查看更多" : C = "搜索： " + n.keyword;
					break;
				case "tag":
					y.$els.peSearchInput.val(""), e.inputChangeHandler(), N[0] && (N[0].checked = !1), C = "标签： " + n.keyword;
					break;
				default:
					C = "搜索： " + n.keyword
				}
				r.showSearchSimNav({
					keyword: C,
					gender: -1,
					age: undefined,
					location: undefined,
					hometown: undefined
				})
			}
		}, y.getPageSearchInfo = function() {
			var n = e.trim(b.val()),
				r = T.data("real-age"),
				i = x.data("real-sex"),
				s = N[0].checked === !0 ? 1 : 0,
				o = C[0].checked === !0 ? 1 : 0,
				u = t.locationInfo["pe-location-info"],
				a = t.locationInfo["pe-hometown-info"],
				f = u[0] == "-1" ? 0 : u[0],
				l = u[1] == "-1" ? 0 : u[1],
				c = u[2] == "-1" ? 0 : u[2],
				h = u[3] == "-1" ? 0 : u[3],
				p = a[0] == "-1" ? 0 : a[0],
				d = a[1] == "-1" ? 0 : a[1],
				v = a[2] == "-1" ? 0 : a[2],
				m = a[3] == "-1" ? 0 : a[3],
				g = 0;
			return o && (g = 1), s && (g = 1), {
				keyword: n,
				agerg: r,
				sex: i,
				firston: s,
				video: o,
				country: f,
				province: l,
				city: c,
				district: h,
				hcountry: p,
				hprovince: d,
				hcity: v,
				hdistrict: m,
				online: g
			}
		}, y.search = function(t) {
			function l(n) {
				if (!n || n.retcode !== 0) {
					n ? r.showSearchErrorLoading({
						keyWord: a,
						errorkind: 256,
						errorCode: (("" + n.retcode).search(/^6023/i) !== -1 ? "" : "6023") + n.retcode
					}) : r.showSearchErrorLoading({
						keyWord: a,
						errorCode: 6000232,
						errorkind: 256
					});
					return
				}
				if (!y.GLOBAL.initPeSearchingDone) {
					window.setTimeout(function() {
						l(n)
					}, 100);
					return
				}
				var u = n.result || {},
					c = u.sret || 0,
					h = u.buddy,
					p = u.business,
					d = u.qiye,
					v = u.qidian,
					m = u["public"];
				if ((!h || h["exact"] == undefined && h["count"] == undefined || h["exact"] == undefined && h["info_list"] == undefined || h["exact"] == undefined && typeof h.info_list[0] == "undefined") && !d && !m && !v) r.showSearchErrorLoading({
					keyWord: a,
					errorCode: 6000234,
					errorkind: c
				});
				else {
					if ((h && h["exact"] == 1 || u.exact == 1) && !m && !v) {
						var g = h && h.info_list && h.info_list[0] || {};
						if (g.uin == null && !d) {
							r.showSearchErrorLoading({
								keyWord: a,
								errorCode: 6000235,
								errorkind: c
							});
							return
						}
						d ? (d.isE = 1, d.isLocalSeller = !0, g = s.processData(d)) : g = i.processData(g), r.showSearchAccResult(g, !! d);
						var w = h && h.totalnum || 0;
						w = f.numberFuzzy(w), r.showSearchAccSeeMore(w, b.val()), p = p && p.results || [];
						for (var E = 0, S = p.length; E < S; E++) {
							p[E] = s.processData(p[E]);
							if (E === 3) break
						}
						r.showSearchAccRecManufacturers(p), e.report.bernoulli(10863, "pv")
					} else if (m) {
						var x = "//s.url.cn/qqfind/img/seller100-default-avatar.png",
							T = m.info[0];
						T.avatar = T.logo_url || x, T.originalName = T.name, T.nick = f.escape(T.name), T.sign = T.originalSign = T.description, r.showExactPublicAccount(T)
					} else if (v) {
						var N = v.info[0];
						N.avatar = N.logo_url || x, N.originalName = N.name, N.nick = f.escape(N.name), N.sign = N.originalSign = N.description, r.showExactQidianAccount(N)
					} else {
						y.unbindScrollDownOnPageSim(), y.bindScrollDownOnPageSim(), y.GLOBAL.currentResSimPage = 1, y.GLOBAL.scrollNewFlag = !0, y.GLOBAL.totalResSimPage = 1, y.GLOBAL.searchResultEndFlag = !1, y.$els.peSimResPCtrolContainer || (y.$els.peSimResPCtrolContainer = e("#pe-search-res-loading-tip")), y.$els.peSimResPCtrolContainer.css("visibility", "hidden"), y.$els.peSimResPCtrolContainer.find("a.btn-hack").text(1);
						var C = h.redwords ? h.redwords : [],
							k = {};
						h.online !== undefined ? k = {
							page: h.page || 0,
							online: h.online || 0,
							redwords: C,
							sessionid: h.sessionid
						} : k = {
							page: h.page || 0,
							redwords: C,
							sessionid: h.sessionid
						}, o.set({
							sponser: "pe-fuzzy",
							data: k
						}), h && h.endflag == 1 ? (y.unbindScrollDownOnPageSim(), y.GLOBAL.searchResultEndFlag = !0) : e("#pe-search-res-loading-icon").show();
						var L = h && h.info_list || [];
						for (var E = 0, S = L.length; E < S; E++) L[E] = i.processData(L[E], C);
						r.showSearchSimResult(L), e.report.bernoulli(10864, "pv")
					}!t || typeof t != "object" && (b.val(t), e.inputChangeHandler())
				}
			}
			if (t && t.behavior === "nearly") {
				var n = u.state();
				if (n === "unknown" || n === "disable") {
					u.toggle(function(e) {
						e === "enable" && y.search({
							behavior: "nearly"
						})
					}, "pe");
					return
				}
			}
			y.GLOBAL.initPeSearchingDone = !1, r.initPeSearching();
			var a;
			if (!t) {
				var p = y.getPageSearchInfo();
				o.set({
					sponser: "pe-fuzzy",
					data: {},
					keywords: p,
					urlIden: "search_v3"
				}), a = p.keyword, i.search(p, l), c.assertSearchBehavior(p.keyword, "people"), y.utils.reportSearchInfoButKeyword(p), y.constructSecondNav()
			} else {
				var d = !0;
				r.clearAll(d);
				if (typeof t == "object") {
					var v = t.behavior,
						m = h.getInfo(),
						g = {},
						w = "search_v3";
					if (v) switch (v) {
					case "gender":
						m.gender == "" && (m.gender = "male");
						switch (m.gender) {
						case "male":
							g = {
								villagers: "1",
								sex: "2",
								country: m.country_id,
								province: m.province_id,
								city: m.city_id,
								firston: 1,
								online: 1
							};
							break;
						case "female":
							g = {
								villagers: "1",
								sex: "1",
								country: m.country_id,
								province: m.province_id,
								city: m.city_id,
								firston: 1,
								online: 1
							};
							break;
						default:
							g = {
								villagers: "1",
								sex: "0",
								country: m.country_id,
								province: m.province_id,
								city: m.city_id,
								firston: 1,
								online: 1
							}
						}
						break;
					case "hometown":
						g = {
							villagers: "2",
							hcountry: m.h_country,
							hprovince: m.h_province,
							hcity: m.h_city,
							country: m.country_id,
							province: m.province_id,
							city: m.city_id,
							firston: 1,
							online: 1
						};
						break;
					case "nearly":
						w = "nearly", g = {
							offset: 1,
							cnt: 20,
							sessionid: 0
						};
						break;
					case "more":
						g = {
							use_nick: 1,
							keyword: t.keyword,
							country: 1,
							firston: 1,
							online: 1
						};
						break;
					case "tag":
						w = "searchbytag", g = {
							keyword: t.keyword,
							firston: 1,
							online: 1
						}
					} else g = {
						keyword: t.keyword
					};
					o.set({
						sponser: "pe-fuzzy",
						data: {},
						keywords: g,
						urlIden: w
					}), y.$els.peSearchInput || (y.$els.peSearchInput = e("#pe-search-input")), y.$els.peSearchInput.val(t.keyword || ""), e.inputChangeHandler(), w === "nearly" ? u.neighbor(g, function(e) {
						y._resultNearlyRender(0, e)
					}) : (a = g.keyword, i.search(g, w, l)), y.constructSecondNav(t);
					return
				}
				o.set({
					sponser: "pe-fuzzy",
					data: {},
					keywords: {
						keyword: t
					},
					urlIden: "search_v3"
				}), a = t, i.search({
					keyword: t
				}, l), y.constructSecondNav(t), c.assertSearchBehavior(t, "people")
			}
		}, y.showSimResPCtrol = function() {
			var t = y.GLOBAL,
				n = t.currentResSimPage,
				r = t.totalResSimPage,
				i = t.searchResultEndFlag && n >= r,
				s = e("#pe-pagination-container"),
				u = e("#pe-search-res-sim-dom .item").length;
			s.html(v.get(n, i, u)), e("#pe-search-res-loading-tip").css("visibility", "visible"), e(".pagination", s).on("click", "[data-page]", function(n) {
				var r = e(this).data("page"),
					i = e(this),
					s = e("#pe-search-res-sim-dom .carousel-inner"),
					u = e("#pe-search-res-sim-dom .item").length;
				if (i.is(".disable")) return;
				i.addClass("disable");
				if (y.GLOBAL.totalResSimPage > r || r <= y.GLOBAL.currentResSimPage || t.searchResultEndFlag || r <= u) {
					v.go(s, r), e("#pe-sim-result-dom").scrollTop(0), y.GLOBAL.currentResSimPage = r, n.preventDefault(), y.showSimResPCtrol();
					return
				}
				o.get({
					extend: !0,
					sponser: "pe-fuzzy"
				}, function(t) {
					y.$els.peSimResPCtrolContainer || (y.$els.peSimResPCtrolContainer = e("#pe-search-res-loading-tip")), y.$els.peSimResPCtrolContainer.css("visibility", "hidden"), e("#pe-search-res-sim-dom .active").after('<div class="item"></div>');
					var n = y.GLOBAL.currentResSimPage;
					y.GLOBAL.currentResSimPage = r, y.GLOBAL.currentResSimPage > y.GLOBAL.totalResSimPage && (y.GLOBAL.totalResSimPage = y.GLOBAL.currentResSimPage), y.GLOBAL.scrollNewFlag = !0, e(e("#pe-search-res-sim-dom .item")[n]).append(y.handleScollSimResult(t)), v.go(s, r), e("#pe-sim-result-dom").scrollTop(0)
				}), n.preventDefault()
			})
		}, y.handleScollSimResult = function(e) {
			console.log("==>>>>>>>>>>>>>>>>>>>>>>>>>>"), e = e || {};
			if (e.retcode !== 0) return;
			var t = e.result && e.result.buddy,
				n = null,
				r = t && t.endflag,
				s = e.ls;
			s ? (s.length === 0 && (r = 1), n = s) : (typeof t == "undefined" && (t = {}, r = 1), n = t.info_list || []), r == 1 ? (y.GLOBAL.searchResultEndFlag = !0, y.unbindScrollDownOnPageSim(), y.showSimResPCtrol()) : y.bindScrollDownOnPageSim();
			for (var o = 0, u = n.length; o < u; o++) n[o] = i.processData(n[o], t && t.redwords || []);
			return console.log("==>>>>>>>>>>>>>>>>>>>>>>>>>>"), a({
				persons: n,
				showAge: !0,
				showGender: !1,
				dataObj: "fuz",
				dataPrefix: "pe"
			})
		}, y.showNavNearlyPeopleTrigger = function() {
			var t = e("#pe-nav-nearly-people-trigger");
			return function() {
				t.show()
			}
		}(), y.unbindScrollDownOnPageSim = function() {
			var t = null;
			return y.$els.peSimResDom ? t = y.$els.peSimResDom : y.$els.peSimResDom = t = e("#pe-sim-result-dom"), t = t[0], function() {
				t.removeEventListener("scroll", A)
			}
		}(), y.bindScrollDownOnPageSim = function() {
			var t = null;
			return y.$els.peSimResDom ? t = y.$els.peSimResDom : y.$els.peSimResDom = t = e("#pe-sim-result-dom"), t = t[0], function() {
				t.addEventListener("scroll", A, !1)
			}
		}(), y.initHandler = function() {
			e(document).on("initPeSearching:done", function(e) {
				y.GLOBAL.initPeSearchingDone = !0
			}), e(document).on("slid", function(t) {
				y.$els.peSim || (y.$els.peSim = e("#pe-sim-result")), y.$els.peSim.is(":visible") && y.$els.peSimResDom.scrollTop(0)
			}), e(document).on("peSearchResSimResultDown:end", function(e) {
				y.GLOBAL.scrollNewFlag = !1, y.showSimResPCtrol(), e.preventDefault()
			});
			var t = function(t) {
					e.report.monitorAndBer(296039, 10824, "people"), y.search(), t.preventDefault()
				};
			e("#pe-search-trigger-btn").on("click", t), e("#pe-search-form").on("submit", t), e(document).on("peoplepage54:search", function(e) {
				t(e)
			}), e(document).on("click", "[data-open-advance-panel]", function(t) {
				var n = e(this);
				n.hasClass("border-show") ? (n.removeClass("border-show"), e(".adv-option-mask").hide()) : (n.addClass("border-show"), e(".adv-option-mask").show(), e("#pe-sex").focus())
			}), e(document).on("lbs:statechange", function(t) {
				var n = u.state(),
					i = y.canPullTiantian;
				switch (n) {
				case "enable":
					i || (r.loadingDisplay("peNearlyPeopleLoading", "show"), e("#pe-nearly-people-tip").hide(), /查看附近的人/.test(e("#pe-sim-nav-left").text()) ? e(".pe-nearly-filter").show() : e("#pe-nearly-people .pe-nearly-filter").show(), y.more("nearly", !1));
					break;
				case "disable":
					i || (r.showNearlyPeNoLBS(), e(".pe-nearly-filter").hide(), e("#nearly-slide").hide());
					break;
				default:
				}
			}), e(document).on("click", "#pe-see-nearly-people", function(t) {
				e.report.bernoulli(10881), u.enable()
			}), e(document).on("click", function(t) {
				var n = e(t.target);
				if (n.is(".location-generator")) return;
				if (y.flattening && n.is(".location-container [data-click-action]")) return;
				if (n.is("li")) return;
				r.hideLocationGenerator(), r.hideAgeUL(), r.hideSexUL(), e(".icon-up-arrow").removeClass("icon-up-arrow").addClass("icon-down-arrow"), e(".icon-up-arrow-54").removeClass("icon-up-arrow-54").addClass("icon-down-arrow-54"), e("#nearly-slide").slideUp("fast"), e("#nearly-slide-result").slideUp("fast"), e(".pe-nearly-filter").removeClass("active")
			}), e(".pe-nearly-filter").on("click", function(t) {
				var n = e(this),
					r = n.data("pos"),
					i;
				r === "result" ? i = e("#nearly-slide-result") : i = e("#nearly-slide"), n.hasClass("active") ? (i.slideUp("fast"), n.removeClass("active")) : (i.slideDown("fast"), n.addClass("active")), t.stopPropagation()
			}), e("#nearly-slide li[data-event], #nearly-slide-result li[data-event]").on("click", function(t) {
				var n = e(this),
					r = n.parent(),
					i = n.attr("data-event"),
					s = n.parent(),
					a = s.data("pos");
				if (a === "result") {
					var f = "nearly",
						l = {
							offset: 1,
							cnt: 20,
							sessionid: 0
						};
					switch (i) {
					case "all":
						l.sex = 2, l.ol = 0, r.find("li .check").not(this).addClass("hide");
						break;
					case "male-only":
						l.sex = 0, r.find("li[data-event!=online-only] .check").not(this).addClass("hide"), r.find("li[data-event=online-only] .check").hasClass("hide") || (l.ol = 1);
						break;
					case "female-only":
						l.sex = 1, r.find("li[data-event!=online-only] .check").not(this).addClass("hide"), r.find("li[data-event=online-only] .check").hasClass("hide") || (l.ol = 1);
						break;
					case "online-only":
						r.find("li[data-event=all] .check").addClass("hide"), l.ol = 1, r.find("li[data-event=male-only] .check").hasClass("hide") || (l.sex = 0), r.find("li[data-event=female-only] .check").hasClass("hide") || (l.sex = 1)
					}
					n.find(".check").removeClass("hide"), e("#pe-sim-result-dom").scrollTop(0), o.set({
						sponser: "pe-fuzzy",
						data: {},
						keywords: l,
						urlIden: f
					}), u.neighbor(l, function(e) {
						y._resultNearlyRender(0, e)
					})
				} else {
					e.report.bernoulli(12151);
					switch (i) {
					case "all":
						y._buddyNearly(!1, function(e) {
							e.setSex(2), e.setOl(0)
						}), r.find("li .check").not(this).addClass("hide"), n.find(".check").removeClass("hide");
						break;
					case "male-only":
						y._buddyNearly(!1, function(e) {
							e.setSex(0)
						}), r.find("li[data-event!=online-only] .check").not(this).addClass("hide"), n.find(".check").removeClass("hide");
						break;
					case "female-only":
						y._buddyNearly(!1, function(e) {
							e.setSex(1)
						}), r.find("li[data-event!=online-only] .check").not(this).addClass("hide"), n.find(".check").removeClass("hide");
						break;
					case "online-only":
						y._buddyNearly(!1, function(e) {
							e.setOl(1)
						}), r.find("li[data-event=all] .check").addClass("hide"), n.find(".check").removeClass("hide");
						break;
					case "close-location":
						u.toggle()
					}
				}
				s.slideUp("fast"), e(".pe-nearly-filter").removeClass("active"), t.stopPropagation()
			}), y.bindScrollDownOnPageSim(), r.initEventHandler()
		}, y
	}), define("tmpl!template/quRecommendGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(obj, function(index, value) {
				__p += '\r\n<div class="unit isSub">\r\n    <a class="head" href="#">\r\n        ', value.lbs ? __p += '\r\n        <i class="icon-groupTips icon-groupTips-lbs"></i>\r\n        ' : value.hot && (__p += '\r\n        <i class="icon-groupTips icon-groupTips-hot"></i>\r\n        '), __p += '\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\r\n\r\n        <div class="icon_mask"\r\n             data-prefix="qu" data-obj="rec" data-iden="avatar" data-loc="result"\r\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n             data-isGdt="' + ((__t = value.isGdt) == null ? "" : __t) + '"\r\n             ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + "\r\n             " + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + "\r\n             " + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\r\n             data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n             data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n             data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n             data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n             data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\r\n             data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n             data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n             data-groupname="' + ((__t = value.name) == null ? "" : __t) + '"\r\n             alt="群头像" ></div>\r\n        ' +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
					return __p
				}() + "\r\n    </a>\r\n    <div>\r\n        <p>\r\n            ";
				if (value.auth) {
					__p += "\r\n            ";
					var cls = "icon-authentication-group",
						ctit = "腾讯机构认证群";
					value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '      \r\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\r\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\r\n               target="_blank"\r\n               href="http://qun.qq.com/renzheng.html"\r\n                ></a>\r\n            '
				}
				__p += '\r\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '" href="#" data-prefix="qu" data-obj="rec"  data-loc="result"\r\n               title="' + ((__t = value.originName) == null ? "" : __t) + '"\r\n              data-iden="nick"\r\n              data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n              data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n              data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n              data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n              data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n              ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\r\n              data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n              ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n              data-isGdt="' + ((__t = value.isGdt) == null ? "" : __t) + '"\r\n              data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n              data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n              data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n              data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\r\n              data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n              data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n              data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\r\n              ' + ((__t = value.name) == null ? "" : __t) + '\r\n            </a>\r\n        </p>\r\n\r\n        <p class="h20" title="' + ((__t = value.memo) == null ? "" : __t) + '">\r\n            ', !value.memo && value.member_num ? __p += '\r\n            <i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "人\r\n            " : __p += "\r\n            " + ((__t = value.memo) == null ? "" : __t) + "\r\n            ", __p += '\r\n        </p>\r\n\r\n        <p class="h20">\r\n            ';
				var dataPrefix = "qu",
					dataObj = "rec";
				__p += "\r\n            " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
						return __p
					}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
					return __p
				}() + "\r\n         </p>\r\n    </div>\r\n</div>\r\n\r\n"
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quRecommendGroupNew.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n", $.each(obj, function(i, value) {
				__p += '\r\n\r\n<li>\r\n    <a class="group-icon" href="javascript: void(0);"\r\n        data-prefix="qu"\r\n        data-obj="rec"\r\n        data-iden="avatar"\r\n        data-head="' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n        data-bitmap="' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n        data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n        data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n        data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n        data-isGdt="' + ((__t = value.isGdt) == null ? "" : __t) + '"\r\n        data-is-main="' + ((__t = isMain ? 1 : "") == null ? "" : __t) + '"\r\n        ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + "\r\n        " + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + "\r\n        " + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\r\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n        data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\r\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n        data-groupname="' + ((__t = value.name) == null ? "" : __t) + '"\r\n        data-qu-region="recomgrp"\r\n    >\r\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n            data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '"\r\n            onerror="handleImgErr(this);" alt="群头像" />\r\n        ', value.isGuaGua && (__p += '\r\n        <i class="icon-guagua-camera" title="直播间"></i>\r\n        '), __p += '\r\n    </a>\r\n    <div class="group-info">\r\n            ';
				if (value.auth) {
					__p += "\r\n\r\n            ";
					var cls = "group-position icon-authentication-group",
						ctit = "腾讯机构认证群";
					value.certificate_type && value.certificate_type == 1 && (cls = "group-position icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\r\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\r\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\r\n               target="_blank"\r\n               href="http://qun.qq.com/renzheng.html"\r\n                ></a>\r\n            '
				}
				__p += '\r\n        <p class="group-name ' + ((__t = value.auth ? "nick-after-icon group-position-padding" : "") == null ? "" : __t) + '"\r\n            data-prefix="qu"\r\n            data-obj="rec"\r\n            title="' + ((__t = value.originName) == null ? "" : __t) + '"\r\n            data-iden="nick"\r\n            data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n            data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\r\n            data-account="' + ((__t = value.account) == null ? "" : __t) + '"\r\n            data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\r\n            data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\r\n            data-is-main="' + ((__t = isMain ? 1 : "") == null ? "" : __t) + '"\r\n            ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\r\n            data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\r\n            ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n            data-isGdt="' + ((__t = value.isGdt) == null ? "" : __t) + '"\r\n            data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\r\n            data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n            data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\r\n            data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '"\r\n            data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\r\n            data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\r\n            data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '"\r\n            data-qu-region="recomgrp"\r\n        >\r\n\r\n            ' + ((__t = value.name) == null ? "" : __t) + '\r\n        </p>\r\n        <p class="group-desc" title="' + ((__t = value.memo) == null ? "" : __t) + '">\r\n            ', !value.memo && value.member_num ? __p += "\r\n             " + ((__t = value.originMemo) == null ? "" : __t) + "\r\n            " : __p += "\r\n            " + ((__t = value.memo) == null ? "" : __t) + "\r\n            ", __p += "\r\n        </p>\r\n        ", value.isGuaGua ? __p += '\r\n        <p class="group-num"><i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "</p>\r\n        " : __p += '\r\n        <p class="group-num"><i class="icon-group"></i>' + ((__t = value.member_num) == null ? "" : __t) + "/" + ((__t = value.max_member_num) == null ? "" : __t) + "</p>\r\n        ", __p += "\r\n        ";
				var dataPrefix = "qu",
					dataObj = "rec";
				__p += "\r\n        " +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
						return __p
					}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
					return __p
				}() + "\r\n    </div>\r\n</li>\r\n\r\n"
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quCategory.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<!--\r\n    data-qu-category在改版之后和以前的作用不同了，这里区分区域，\r\n    即点击的是热词还是推荐关键词，用于恶心的数据上报，\r\n    data-qu-region用于判断轨迹上报的来源：点击热词或者推荐群打开模糊查找页，\r\n    用户点击群头像/群昵称/加群 时分别有按钮上报\r\n    有三处上报：点击热词/推荐关键词弹出搜索结果页，点击 群头像/群昵称/加群 按钮上报\r\n    请留意qqun.js和binds.js里的window.quReportKw\r\n    data-qu-report-id是分类关键词点击次数上报的id\r\n-->\r\n\r\n", $.each(obj, function(e, t) {
				__p += '\r\n\r\n<li class="category">\r\n    <div class="background">\r\n        <i class="border-mask"></i>\r\n    </div>\r\n    <span class="arrow-r"></span>\r\n\r\n    <div class="category-title">\r\n        <i class="categoryIcon c' + ((__t = e + 1) == null ? "" : __t) + '"></i>\r\n        <p class="title">' + ((__t = t.name) == null ? "" : __t) + '</p>\r\n    </div>\r\n\r\n    <ul class="tips">\r\n        ', $.each(t.list, function(e, t) {
					__p += '\r\n        <li class="tip"\r\n            title="' + ((__t = t.word) == null ? "" : __t) + '"\r\n            data-qu-search="' + ((__t = t.word) == null ? "" : __t) + '"\r\n            data-qu-region="categoryrec"\r\n            data-qu-report-id="11616"\r\n            data-qu-sub-id="403">\r\n            ' + ((__t = t.word) == null ? "" : __t) + "\r\n        </li>\r\n        "
				}), __p += '\r\n    </ul>\r\n    <div class="category-bottom-line"></div>\r\n    <div class="sub-category clearfix">\r\n        ';
				var n = 11609,
					r = [],
					i = [],
					s = 0,
					o;
				__p += "\r\n        ";
				while (o = t.subs.shift()) s++ % 2 ? i.push(o) : r.push(o);
				__p += "\r\n        ";
				for (s = 1; s <= 2; s++) __p += '\r\n        <div class="sub-col">\r\n            ', $.each(s % 2 ? r : i, function(t, r) {
					__p += '\r\n            <section class="clearfix">\r\n                <h4>' + ((__t = r.name) == null ? "" : __t) + "</h4>\r\n                ", $.each(r.list, function(t, r) {
						__p += '\r\n                <a class="' + ((__t = r.isRecommend ? "orange" : "") == null ? "" : __t) + '"\r\n                    title="' + ((__t = r.word) == null ? "" : __t) + '"\r\n                    href="javascript: void(0);"\r\n                    data-qu-search="' + ((__t = r.word) == null ? "" : __t) + '"\r\n                    data-qu-region="category"\r\n                    data-qu-report-id="' + ((__t = n + e) == null ? "" : __t) + '"\r\n                    data-qu-sub-id="' + ((__t = 404 + e) == null ? "" : __t) + '">\r\n                    ' + ((__t = r.word) == null ? "" : __t) + "\r\n                </a>\r\n                "
					}), __p += "\r\n            </section>\r\n            "
				}), __p += "\r\n        </div>\r\n        ";
				__p += "\r\n    </div>\r\n</li>\r\n\r\n"
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/singleExactResultGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "" +
			function(obj) {
				var __t, __p = "",
					__j = Array.prototype.join,
					print = function() {
						__p += __j.call(arguments, "")
					};
				with(obj || {}) {
					__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
						return __p
					}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
					if (value.auth) {
						__p += "\n            ";
						var cls = "icon-authentication-group",
							ctit = "腾讯机构认证群";
						value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
					}
					__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
						function(obj) {
							var __t, __p = "",
								__j = Array.prototype.join,
								print = function() {
									__p += __j.call(arguments, "")
								};
							with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
							return __p
						}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
						return __p
					}() + "\n    </div>\n</div>\n"
				}
				return __p
			}() + "";
			return __p
		}
	}), define("tmpl!template/quExactResult.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				var dataObj = "acc",
					dataPrefix = "qu";
				__p += "\r\n", $.each(groupList, function(index, value) {
					__p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "" +
						function(obj) {
							var __t, __p = "",
								__j = Array.prototype.join,
								print = function() {
									__p += __j.call(arguments, "")
								};
							with(obj || {}) {
								__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
									return __p
								}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
								if (value.auth) {
									__p += "\n            ";
									var cls = "icon-authentication-group",
										ctit = "腾讯机构认证群";
									value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
								}
								__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
									function(obj) {
										var __t, __p = "",
											__j = Array.prototype.join,
											print = function() {
												__p += __j.call(arguments, "")
											};
										with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
										return __p
									}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
									return __p
								}() + "\n    </div>\n</div>\n"
							}
							return __p
						}() + "";
						return __p
					}() + "\r\n"
				}), __p += "\r\n"
			}
			return __p
		}
	}), define("tmpl!template/quFuzzyResult.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "\r\n\r\n";
				var dataObj = "fuz",
					dataPrefix = "qu";
				__p += "\r\n", $.each(groupList, function(index, value) {
					__p += "\r\n    " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) {
							__p += "", __p += '\n<div data-gc="1528781" data-src="6" class="' + ((__t = dataPrefix === "hy" ? "" : "unit") == null ? "" : __t) + ' single-fuzzy-result-group">\n\n    <a class="head" href="#">\n        <img src="' + ((__t = value.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  data-classification="' + ((__t = value.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '" onerror="handleImgErr(this)">\n\n        <div class="icon_mask" data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n             data-obj="' + ((__t = dataObj) == null ? "" : __t) + '" data-iden="avatar"\n             data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n             data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n             data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n             data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n             data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n             data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n        data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n        data-groupid = "' + ((__t = value.groupId) == null ? "" : __t) + '"\n        data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '" data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n        data-classification="qqun"\n        onerror="handleImgErr(this)"\n        data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n        data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n        ' + ((__t = value.isGuaGua ? 'title="进入直播间"' : 'title="查看群资料"') == null ? "" : __t) + '\n        data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '" alt="群头像"></div>\n\n        ' +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 在需要展示呱呱视频群 camera的地方引入这个文件 -->\n", value.isGuaGua && (__p += '\n<i class="icon-guagua-camera" title="直播间"></i>\n'), __p += "\n";
								return __p
							}() + "\n\n        ", value.max_member_num === 1e3 ? __p += '\n            <i class="icon-group-member-1000 left-bottom"></i>\n        ' : value.max_member_num === 2e3 && (__p += '\n            <i class="icon-group-member-2000 left-bottom"></i>\n        '), __p += '\n    </a>\n\n    <div>\n        <p class="name-line">\n            <span class="qu-title-width">\n            ';
							if (value.auth) {
								__p += "\n            ";
								var cls = "icon-authentication-group",
									ctit = "腾讯机构认证群";
								value.certificate_type && value.certificate_type == 1 && (cls = "icon-authentication-user", ctit = "腾讯个人认证群"), __p += '\n            <a class="' + ((__t = cls) == null ? "" : __t) + '"\n               title="' + ((__t = ctit) == null ? "" : __t) + '"\n               target="_blank"\n			   href="http://qun.qq.com/renzheng.html"\n                ></a>\n            '
							}
							__p += '\n            <a class="group-nick-name ' + ((__t = value.auth ? "nick-after-icon" : "") == null ? "" : __t) + '"\n                href="#"\n                data-prefix="' + ((__t = typeof dataPrefix === "undefined" ? "qu" : dataPrefix) == null ? "" : __t) + '"\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n                data-iden="nick"\n                title="' + ((__t = value.originName) == null ? "" : __t) + '"\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\n                data-head = "' + ((__t = value.avatar) == null ? "" : __t) + '"\n                data-bitmap = "' + ((__t = value.bitmap) == null ? "" : __t) + '"\n                data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n                data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n                data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n                ' + ((__t = value.isGuaGua ? "data-open-guagua-by-short-id=" + value.roomid : "data-open-group=" + value.code) == null ? "" : __t) + '\n                data-owneruin="' + ((__t = value.owner_uin) == null ? "" : __t) + '"\n                data-groupid="' + ((__t = value.groupId) == null ? "" : __t) + '"\n                data-groupoption="' + ((__t = value.flag) == null ? "" : __t) + '"\n                data-groupclass="' + ((__t = value.class) == null ? "" : __t) + '"\n                data-membnum="' + ((__t = value.member_num) == null ? "" : __t) + '"\n                data-membmaxnum="' + ((__t = value.max_member_num) == null ? "" : __t) + '"\n                data-grouplevel="' + ((__t = value.level) == null ? "" : __t) + '" data-groupname="' + ((__t = value.originName) == null ? "" : __t) + '">\n                ' + ((__t = value.name) == null ? "" : __t) + "\n            </a>\n            </span>\n            ", value.isGuaGua ? __p += '\n                <i class="icon-guagua-room"></i>\n            ' : value.hot && (__p += '\n                <i class="icon-group-hot" title="群消息量大于平均值"></i>\n            '), __p += '\n\n        </p>\n        <p class="h20 manager_n_menber_num_wrapper">\n            <span class="menber_num">\n                ', value.member_num && (__p += '\n                <i class="icon-group-big"></i>' + ((__t = value.member_num) == null ? "" : __t) + "", value.max_member_num && (__p += "/" + ((__t = value.max_member_num) == null ? "" : __t) + ""), __p += "\n                "), __p += "\n            </span>\n\n            ", value.group_label && value.group_label[0] && (__p += '\n            <span class="manager_online">\n                <span class="grey">|</span>\n                <i class="icon-qun-manager"></i>\n                    ' + ((__t = value.group_label[0].name || "管理在线") == null ? "" : __t) + "\n            </span>\n            "), __p += '\n        </p>\n        <p class="h20 qun-tag" title="' + ((__t = value.originClassName != "" ? value.originClassName : "") == null ? "" : __t) + "", value.originClassName != "" && value.tag && (__p += ""), __p += "" + ((__t = value.tag) == null ? "" : __t) + '">\n            <span >\n                ' + ((__t = value.className != "" ? value.className : "") == null ? "" : __t) + "\n                ", value.labelTag && (__p += "\n                    " + ((__t = value.labelTag) == null ? "" : __t) + "\n                "), __p += '\n\n            </span>\n        </p>\n    </div>\n\n    <div class="qu-memo" title="' + ((__t = value.originMemo) == null ? "" : __t) + '">\n        ' + ((__t = value.memo) == null ? "" : __t) + '\n    </div>\n\n    <div class="qu-unit-bottom">\n        ', value.isGuaGua ? __p += '\n        <div class="qu-result-location" title="首次体验需下载应用">\n            <i class="icon-alert-flat"></i> 首次体验需下载应用\n        </div>\n        ' : value.auth && value.certificate_type ? (__p += '\n        <div class="qun-certificate">\n            <span class="qun-certificate-type">', value.certificate_type == 1 ? __p += "认证个人" : value.certificate_type == 2 && (__p += "认证机构"), __p += '</span>\n            <span class="qun-certificate-name" title="' + ((__t = value.certificate_name) == null ? "" : __t) + '">' + ((__t = value.certificate_name) == null ? "" : __t) + "</span>\n        </div>\n        ") : value.cityid && value.provCity ? __p += '\n        <div class="qu-result-location-container">\n            <div class="qu-result-location located" data-cityid="' + ((__t = value.cityid) == null ? "" : __t) + '" data-lat="' + ((__t = value.latitude) == null ? "" : __t) + '" data-lng="' + ((__t = value.longitude) == null ? "" : __t) + '" data-prov="' + ((__t = value.city) == null ? "" : __t) + '" data-soso-map-located="1" title="' + ((__t = value.provCity + value.geo) == null ? "" : __t) + '">\n                <i class="btn-loc-small"></i>\n                ' + ((__t = value.provCity) == null ? "" : __t) + "\n            </div>\n        </div>\n        " : __p += '\n        <div class="qu-result-space"></div>\n        ', __p += "\n        " +
							function(obj) {
								var __t, __p = "",
									__j = Array.prototype.join,
									print = function() {
										__p += __j.call(arguments, "")
									};
								with(obj || {}) __p += "<!-- 2013.10.30 蓝色按钮版本的进入群 -->\r\n\r\n<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<!-- 首先判断 是否为 呱呱视频群， 如果不是走入普通群的逻辑 -->\r\n", value.isGuaGua ? (__p += "\r\n    ", __p += "\r\n    " +
								function(obj) {
									var __t, __p = "",
										__j = Array.prototype.join,
										print = function() {
											__p += __j.call(arguments, "")
										};
									with(obj || {}) __p += "", __p += '\n\n<i class="btn-enter-guagua" title="进入直播间"\n   data-account="' + ((__t = value.account) == null ? "" : __t) + '"\n   data-iden="enterbtn"\n   data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\n   data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\n   data-kfuin="' + ((__t = value.fuin) == null ? "" : __t) + '"\n   data-extraparam="' + ((__t = value.extparam) == null ? "" : __t) + '"\n   data-open-guagua-by-short-id="' + ((__t = value.roomid) == null ? "" : __t) + '"\n    >\n    进入\n    </i>\n';
									return __p
								}() + "\r\n") : (__p += '\r\n        <span class="add-group-btn-container">\r\n    ', value.public && client.canEnterPublicGroup ? (__p += '\r\n        <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                data-prefix="hy"\r\n                title="进入公开群"\r\n                tabindex="0"\r\n                data-enter-pgroup="' + ((__t = value.groupId) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n            >\r\n            <i class="icon-double-angle-brackets"></i>\r\n            进入\r\n            </button>\r\n\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                title="加入该群"\r\n                tabindex="0"\r\n            >\r\n            ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>付费' : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n\r\n    ") : (__p += '\r\n            <button class="add-group-plus ' + ((__t = value.needpay ? "needpay" : "") == null ? "" : __t) + '"\r\n                title="加入该群"\r\n                data-prefix="' + ((__t = dataPrefix) == null ? "" : __t) + '"\r\n                data-obj="' + ((__t = dataObj) == null ? "" : __t) + '"\r\n                ' + ((__t = value.rl ? "data-group-gdt=" + value.code : "") == null ? "" : __t) + '\r\n                data-isGdt="' + ((__t = value.isGdt ? true : false) == null ? "" : __t) + '"\r\n                data-add-group="' + ((__t = value.code) == null ? "" : __t) + '"\r\n                data-qu-region="recomgrp"\r\n               data-need-pay="' + ((__t = value.needpay) == null ? "" : __t) + '"\r\n                ', value.reportId && (__p += '\r\n                    data-report-id="' + ((__t = value.reportId) == null ? "" : __t) + '"\r\n                '), __p += '\r\n                tabindex="0"\r\n                >\r\n                ' + ((__t = value.needpay ? '<i class="icon-add-group-plus-pay"></i>' + (value.inJob ? "" : "付费") : '<i class="icon-add-group-plus"></i>') == null ? "" : __t) + "加群\r\n            </button>\r\n        </span>\r\n    "), __p += "\r\n"), __p += "\r\n";
								return __p
							}() + "\n    </div>\n</div>\n"
						}
						return __p
					}() + "\r\n"
				}), __p += ""
			}
			return __p
		}
	}), define("tmpl!template/quNavHotWords.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n", $.each(obj, function(e, t) {
				__p += '\r\n\r\n<li>\r\n    <a href="#" class="' + ((__t = t.isRecommend ? "hot-orange" : "white") == null ? "" : __t) + '"\r\n        data-nav-behavior="' + ((__t = t.behavior) == null ? "" : __t) + '"\r\n        data-qu-report-id="10913"\r\n        data-qu-search="' + ((__t = t.word) == null ? "" : __t) + '"\r\n        data-qu-region="reci"\r\n        data-qu-sub-id="401">\r\n        ' + ((__t = t.word) == null ? "" : __t) + "\r\n    </a>\r\n</li>\r\n\r\n"
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quHotGroupTag.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<li class="active">\r\n    <a href="#qu-recommend-block" data-tab="0" data-clazz="recommend">推荐群</a>\r\n    <!-- <i class="icon-select" style="display:block"><i class="icon-select-tri"></i></i> -->\r\n</li>\r\n\r\n', $.each(obj, function(e, t) {
				__p += '\r\n\r\n<li>\r\n    <a href="#qu-tab-group-' + ((__t = t.id) == null ? "" : __t) + '" data-tab="' + ((__t = t.id) == null ? "" : __t) + '" data-report-index="' + ((__t = e) == null ? "" : __t) + '"\r\n       data-nav-behavior="' + ((__t = t.behavior) == null ? "" : __t) + '"\r\n       data-clazz="' + ((__t = t.name) == null ? "" : __t) + '">\r\n        ' + ((__t = t.name) == null ? "" : __t) + '</a>\r\n    <!-- <i class="icon-select"><i class="icon-select-tri"></i></i> -->\r\n</li>\r\n\r\n'
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quTabGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(obj, function(e, t) {
				__p += '\r\n\r\n<div id="qu-tab-group-' + ((__t = t.id) == null ? "" : __t) + '" class="tab-pane"\r\n     data-tab-index="' + ((__t = e + 1) == null ? "" : __t) + '">\r\n    <div class="carousel-inner">\r\n        <div class="active item"></div>\r\n        <div class="item"></div> \r\n    </div>\r\n    <div class="carousel-prev-trigger disable"\r\n         data-nav-behavior="' + ((__t = t.behavior) == null ? "" : __t) + '"\r\n        href="#qu-tab-group-' + ((__t = t.id) == null ? "" : __t) + '"  data-slide="prev">\r\n        <a title="上一页" class="icon-arrow-prev-page" href=""></a></div>\r\n    <div class="carousel-next-trigger"\r\n         data-nav-behavior="' + ((__t = t.behavior) == null ? "" : __t) + '"\r\n        href="#qu-tab-group-' + ((__t = t.id) == null ? "" : __t) + '" data-slide="next">\r\n        <a title="下一页" class="icon-arrow-next-page" href=""></a></div>\r\n</div>\r\n\r\n\r\n'
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quHotSearchPics.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(obj, function(e, t) {
				__p += '\r\n<!--\r\n    data-qu-banner-guagua表示这张图是guagua的推荐位，\r\n    点击的逻辑和其他完全不同，不用处理后面的那些字段.\r\n    data-qu-banner用于区分这个地方时banner，同时还是上报关键词\r\n-->\r\n<a\r\n    href="' + ((__t = t.link ? t.link : "javascript: void(0);") == null ? "" : __t) + '"\r\n    target="_blank"\r\n    data-index="' + ((__t = e) == null ? "" : __t) + '"\r\n    ' + ((__t = t.word ? "data-qu-search=" + t.word : "data-qu-banner=banner" + (1 + e)) == null ? "" : __t) + "\r\n    " + ((__t = t.guaguaAdv ? "data-qu-banner-guagua=1" : "") == null ? "" : __t) + "\r\n    " + ((__t = t.quActivity ? 'data-qu-banner-activity="1"' : "") == null ? "" : __t) + "\r\n    " + ((__t = t.qunVideoHall ? 'data-qu-banner-video-hall="1"' : "") == null ? "" : __t) + '\r\n    data-qu-region="hotword"\r\n    data-qu-report-id="10620"\r\n    style="background-image: url(' + ((__t = t.url) == null ? "" : __t) + ');">\r\n</a>\r\n'
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quHotSearchWords.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<!--\r\ndata-qu-region用途见quCategory.html\r\n-->\r\n\r\n<dt><i class="icon-hot-words"></i>热词</dt>\r\n', $.each(obj, function(e, t) {
				__p += '\r\n<dd>\r\n    <a href="javascript:void(0);"\r\n        title="' + ((__t = t.word) == null ? "" : __t) + '"\r\n        data-qu-search="' + ((__t = t.word) == null ? "" : __t) + '"\r\n        data-qu-region="hotword"\r\n        data-qu-report-id="11608"\r\n        data-qu-sub-id="402">\r\n        ' + ((__t = t.word) == null ? "" : __t) + "\r\n    </a>\r\n    ", t.isHot && (__p += '\r\n        <i class="icon-hot"></i>\r\n    '), __p += "\r\n    ", t.isNew && (__p += '\r\n        <i class="icon-new"></i>\r\n    '), __p += "\r\n</dd>\r\n\r\n"
			}), __p += "\r\n";
			return __p
		}
	}), define("tmpl!template/quRecommendVideoGroup.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += "", $.each(obj, function(e, t) {
				__p += '\r\n<div class="unit isSub">\r\n    <a class="head" href="#">\r\n        <img src="' + ((__t = t.avatar) == null ? "" : __t) + '" class="avatar-wrapper"  onerror="handleImgErr(this)">\r\n\r\n        <div class="icon_mask" data-enter-video-group="' + ((__t = t.tencentStr) == null ? "" : __t) + '" data-iden="avatar" alt="群头像" ></div>\r\n</a>\r\n<div>\r\n    <p>\r\n        <a class="group-nick-name" href="#"  data-iden="nick" data-enter-video-group="' + ((__t = t.tencentStr) == null ? "" : __t) + '">' + ((__t = t.name) == null ? "" : __t) + '</a>\r\n    </p>\r\n\r\n    <p class="h20" title="' + ((__t = t.member_num) == null ? "" : __t) + '人">\r\n        <i class="icon-group"></i>' + ((__t = t.member_num) == null ? "" : __t) + '人\r\n    </p>\r\n\r\n    <p class="h20">\r\n       <span class="add-group-btn-container">\r\n\r\n           <!--判断是否公开群来决定是否展示公开群标识-->\r\n            <button class="enter-open-group"\r\n                    title="进入直播群"\r\n                    tabindex="0"\r\n                    data-iden="button"\r\n                    data-enter-video-group="' + ((__t = t.tencentStr) == null ? "" : __t) + '"\r\n            >\r\n                <i class="icon-double-angle-brackets"></i>\r\n                进入\r\n            </button>\r\n       </span>\r\n    </p>\r\n</div>\r\n</div>\r\n\r\n'
			}), __p += "\r\n";
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("model/model.qun", ["../$", "tools/utils", "tools/cookie"], e) : e($)
	}(function(e, t, n) {
		function s() {
			var e = n.get("skey"),
				t = 5381;
			for (var r = 0, i = e.length; r < i; ++r) t += (t << 5) + e.charAt(r).charCodeAt();
			return t & 2147483647
		}
		function l(e) {
			e.type = e.type || "POST", e.url = e.url, e.dataType = e.dataType || "json", e.xhrFields = {
				withCredentials: !0
			}, t.request(e)
		}
		function c(e) {
			var t = [];
			for (var n in e) t.push(n);
			t.sort(function() {
				return .5 - Math.random()
			}), t = t.slice(0, 20);
			var r = {};
			for (var n = 0, i = t.length; n < i; n++) r[t[n]] = e[t[n]];
			return r
		}
		function h(e, n) {
			var r = [],
				i = {};
			for (var s = 0, u = e.length; s < u; s++) {
				var a = f[e[s]];
				a && (a.strName = a.strName.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "").replace(/\u003cbr\u003e/g, ""), a.strIntro = a.strIntro.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "").replace(/\u003cbr\u003e/g, ""), i.lat || (i.lat = a.iLat / 1e6, i.lon = a.iLon / 1e6, i.dis = a.distance, i.name = t.escape(a.strName), i.url = a.strFacePicUrl || 0, i.bname = t.escape(n), i.code = e[s]), r.push({
					name: t.escape(a.strName),
					intor: t.escape(a.strIntro),
					alive: a.bAlive,
					code: e[s],
					max: a.maxNum,
					anum: a.iMemberCnt,
					url: a.strFacePicUrl || 0,
					online: a.iOnlineMemberCnt
				}))
			}
			return r.length > 0 ? (i.num = r.length, o.trigger("qunmap:addnewLabel", i), {
				lbs: i,
				list: r
			}) : !1
		}
		function p(e, n, i) {
			var s = {};
			r <= 15 ? f = c(n) : f = n;
			for (var u in i) {
				i[u] = i[u].replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "").replace(/\u003cbr\u003e/g, "");
				var a = h(e[i[u]], i[u]);
				a && (s[t.escape(i[u])] = a)
			}
			o.trigger("qunmap:listLoaded", s), d(f)
		}
		function d(e) {
			var t = [];
			for (var n in e) t.length < 20 ? t.push(n) : (v(t), t = []);
			t.length > 0 && v(t)
		}
		function v(t) {
			var n = t.join("_"),
				r = a + n,
				s = +(new Date),
				u = {
					url: r,
					type: "GET",
					dataType: "jsonp",
					jsonp: "cb",
					jsonpCallback: "face_cb_" + i++,
					error: function(e, t, n) {},
					success: function(t) {
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/buddy/" + r, t && t.ec, +(new Date) - s)
						} catch (n) {}
						if (t.ec == 0) for (var i in t.grp) o.trigger("qunmap:imgloaded", {
							id: i,
							u: t.grp[i].u
						})
					}
				};
			l(u)
		}
		function m(t, n) {
			r = n.zoom;
			var i = 5;
			r < 15 && (i = 10);
			var a = +(new Date),
				f = {
					url: u,
					data: {
						bkn: s(),
						x: n.x * 1e6,
						y: n.y * 1e6,
						l: n.l * 1e6,
						r: n.r * 1e6,
						t: n.t * 1e6,
						b: n.b * 1e6,
						n: i,
						tn: n.tn
					},
					error: function(e, t, n) {
						o.trigger("qunmap:listLoadedFail")
					},
					success: function(t) {
						try {
							e.report.mmReport("http://cgi.find.qq.com/qqfind/buddy/" + u, t && t.ec, +(new Date) - a)
						} catch (n) {}
						t.ec == 0 && t.locs && t.gl ? p(t.locs, t.gl, t.locLs) : o.trigger("qunmap:listLoadedFail")
					}
				};
			l(f)
		}
		var r = 17,
			i = 0,
			o = e("#group-map-zone"),
			u = "http://qun.qq.com/cgi-bin/misc/group_in_rect",
			a = "http://face.imweb.qq.com/cgi-bin/face?app=group_info&grp=100|",
			f, g = {
				"qunmap:getList": m
			};
		for (var y in g) o.bind(y, g[y])
	}), define("tmpl!template/qunmaptips.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="map-qun-more-info">\r\n	', url ? __p += '\r\n		<img src="' + ((__t = url) == null ? "" : __t) + '" class="icon-def-qun-icon-small" />\r\n	' : __p += '\r\n		<img class="icon-def-qun-icon-small qun-map-head-' + ((__t = code) == null ? "" : __t) + '" class="icon-def-qun-icon-small" />\r\n	', __p += "\r\n	<div>\r\n		<strong " + ((__t = name) == null ? "" : __t) + ">" + ((__t = bname) == null ? "" : __t) + "</strong>\r\n		", num > 1 ? __p += '\r\n		<p><span class="map-qun-more-info-name" title="' + ((__t = name) == null ? "" : __t) + '">' + ((__t = name) == null ? "" : __t) + '</span> 等<span class="color">' + ((__t = num) == null ? "" : __t) + "</span>个群</p>\r\n		" : __p += '\r\n		<p><span class="map-qun-more-info-name map-qun-more-info-nolimit">' + ((__t = name) == null ? "" : __t) + "</span> </p>\r\n		", __p += "\r\n	</div>\r\n</div>";
			return __p
		}
	}), define("tmpl!template/qunmapCity.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '    <h5>\r\n        选择城市\r\n        <i class="qun-win-close icon-win-close" qun-map-select-city-close></i>\r\n    </h5>\r\n    <div class="qun-map-select-city-div-info">\r\n        <div>\r\n            当前城市 : <span id="qun-map-now-select-city">' + ((__t = info.pr) == null ? "" : __t) + " ", info.ci != "" && (__p += "> " + ((__t = info.ci) == null ? "" : __t) + ""), __p += '</span>\r\n        </div>\r\n        <div id="qun-map-area-select">\r\n            <div class="province-box">\r\n                <p data-qun-map-picker>\r\n                    <input class="pro" type="text" name="" value="' + ((__t = info.pr) == null ? "" : __t) + '">\r\n                    <span class="icon-down-arrow"></span>\r\n                </p>\r\n                <ul class="province-ul" data-iden="province">\r\n                </ul>\r\n            </div>\r\n            <div class="city-box">\r\n                <p data-qun-map-picker data-type="city">\r\n                    <input data-type="city" class="city" type="text" name="" ', info.ci != "" && (__p += 'value="' + ((__t = info.ci) == null ? "" : __t) + '"'), __p += '>\r\n                    <span  data-type="city" class="icon-down-arrow"></span>\r\n                </p>\r\n                <ul class="city-ul" data-iden="city">\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>';
			return __p
		}
	}), define("tmpl!template/qunmapSelectLi.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				for (var i in list) {
					var item = list[i];
					item.n && (__p += '\r\n	<li data-value="' + ((__t = i) == null ? "" : __t) + '" data-type="' + ((__t = type) == null ? "" : __t) + '" data-qun-map-li-select>' + ((__t = item.n) == null ? "" : __t) + "</li>\r\n")
				}
				__p += ""
			}
			return __p
		}
	}), define("tmpl!template/qunmapList.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "";
				for (var i in list) {
					__p += '\r\n    <h4 data-action-select-dis data-target="' + ((__t = list[i].lbs.code) == null ? "" : __t) + '" id="h4' + ((__t = list[i].lbs.code) == null ? "" : __t) + '">\r\n        <a data-target="' + ((__t = list[i].lbs.code) == null ? "" : __t) + '" title="' + ((__t = i) == null ? "" : __t) + '">' + ((__t = i) == null ? "" : __t) + "(" + ((__t = list[i].list.length) == null ? "" : __t) + ')</a>\r\n        <span  data-target="' + ((__t = list[i].lbs.code) == null ? "" : __t) + '">\r\n            ';
					var len = "";
					list[i].lbs.dis && list[i].lbs.dis < 100 ? len = "100m" : list[i].lbs.dis && list[i].lbs.dis < 1e3 ? (len = list[i].lbs.dis / 100 | 0, len += "00m") : (len = (list[i].lbs.dis / 100 | 0) / 10, len > 1e4 && (len = "9999"), len += "km"), __p += "\r\n            " + ((__t = len) == null ? "" : __t) + '\r\n        <i class="icon-dis-arrow"  data-target="' + ((__t = list[i].lbs.code) == null ? "" : __t) + '"></i></span>\r\n    </h4>                                 \r\n    <ul id="' + ((__t = list[i].lbs.code) == null ? "" : __t) + '">\r\n    	';
					for (var j in list[i].list) {
						var item = list[i].list[j];
						__p += '\r\n        <li class="qun-map-li" data-qun-map-gids="' + ((__t = item.code) == null ? "" : __t) + '">\r\n            <img class="qun-head icon-def-qun-icon qun-map-head-' + ((__t = item.code) == null ? "" : __t) + '"  data-qun-map-gid="' + ((__t = item.code) == null ? "" : __t) + '" title="' + ((__t = item.name) == null ? "" : __t) + '" />\r\n            <div class="qun-map-info">\r\n                <h6><strong data-qun-map-gid="' + ((__t = item.code) == null ? "" : __t) + '" title="' + ((__t = item.name) == null ? "" : __t) + '">' + ((__t = item.name) == null ? "" : __t) + " </strong>", item.alive && (__p += '<i class="icon-group-hot" title="群消息量大于平均值"></i>'), __p += '</h6>\r\n                <p class="menber_num">\r\n                    <i class="icon-group-big"></i>' + ((__t = item.anum) == null ? "" : __t) + "/" + ((__t = item.max) == null ? "" : __t) + '\r\n                </p>\r\n                <p class="qun-map-desc" title="' + ((__t = item.intor) == null ? "" : __t) + '">' + ((__t = item.intor) == null ? "" : __t) + "</p>\r\n            </div>\r\n        </li>        \r\n    	"
					}
					__p += "\r\n    </ul>\r\n"
				}
				__p += "    "
			}
			return __p
		}
	}), define("tmpl!template/qunmapListEmpty.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="qun-map-empty">\r\n	<i class="icon-qun-map-empty"></i>\r\n	<p>当前地图范围暂时没有群</p>\r\n	<p>拖动地图换个地方试试吧</p>\r\n</div>';
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/qunmap", ["../$", "./sosoMap.init", "../model/model.qun", "tmpl!template/qunmaptips.html", "tmpl!template/qunmapCity.html", "tmpl!template/qunmapSelectLi.html", "tmpl!template/qunmapList.html", "tmpl!template/qunmapListEmpty.html", "tools/info", "tools/native", "tools/reportBasic", "tools/loading"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l) {
		function V() {
			var t = parseInt(e("#group-map-zone").data("log")),
				n = parseInt(e("#group-map-zone").data("lat"));
			t !== "" && n !== "" && (e("#group-map-zone").data("log", "").data("lat", ""), b && (b = !1, et(), N = null))
		}
		function K(t, n) {
			p[n.id] || (p[n.id] = n.u, e(".qun-map-head-" + n.id).attr("src", n.u))
		}
		function Q(e, t) {
			j = 0;
			var n = new soso.maps.LatLng(t.lat, t.lon),
				r = new k(t)
		}
		function G() {
			X.loading("hide"), e("#qu-result-list-map").html(u({}))
		}
		function Y(t, n) {
			e("#qu-result-list-map").scrollTop(0), X.loading("hide"), e(".map-qun-more-info").remove(), e(".map-qun-label").remove(), e("#qu-result-list-map").html(o({
				list: n
			}))
		}
		function Z() {
			var t, n;
			C.longitude == 116 ? (U = C.country_id, z = C.province_id, W = C.city_id, t = C.city, n = C.province, parseInt(C.city_id) == 1 ? parseInt(C.province_id) == -1 ? parseInt(C.country_id) >= 0 && (t = C.country) : t = C.province : (t = "北京", n = "北京", U = 1, z = 11, W = 1)) : (t = C.lbs_addr_city_nocache.replace(/(市|省)/ig, ""), n = C.lbs_addr_province_nocache.replace(/(市|省)/ig, ""), C.lbs_addr_city_nocache == "" && (C.lbs_addr_province_nocache != "" ? t = C.lbs_addr_province_nocache.replace(/(市|省)/ig, "") : t = C.lbs_addr_detail.replace(/(市|省)/ig, ""))), t == n && (t = nt("", n)), e.trim(t) != "" && (e("#qun-map-now-city").html(t + '<i class="qun-map-select-city"></i>'), e("#qun-map-select-city-div").html(i({
				info: {
					pr: n,
					ci: t
				}
			})), y = !0)
		}
		function et(e, n) {
			if (b) return;
			t.init(function() {
				C ? dt() : a.getInfo(function() {
					dt()
				})
			})
		}
		function nt(e, t) {
			var n = locationMap[1],
				r = 0;
			for (var i in n) if (n[i].n == t) {
				z = i;
				for (var s in n[i]) {
					!r && s != "n" && (r = s);
					if (n[i][s] == e) {
						W = s;
						return
					}
				}
				return n[i][r].n
			}
			return ""
		}
		function rt(e) {
			return e.replace(/(市|区|省|维吾尔自治区|壮族自治区|回族自治区|特别行政区|自治区)/ig, "")
		}
		function it(t, n) {
			var r = rt(t),
				s = n.split(","),
				o = "",
				u = "";
			s.length == 2 ? u = rt(s[0]) : s.length == 3 ? (o = rt(s[0]), u = rt(s[1])) : (o = rt(s[1]), u = rt(s[2])), o == "" ? o = nt(o, u) : nt(o, u), c = o, o && o != r && (r = o), e("#qun-map-now-city").html(r + '<i class="qun-map-select-city"></i>'), e("#qun-map-select-city-div").html(i({
				info: {
					pr: u,
					ci: o
				}
			}))
		}
		function st() {
			var t = function(e) {
					function t() {
						E.panTo(N), H.searchCityByName(v), F = 1, R = 0, l.bernoulli(11642, "")
					}
					e.index = 1, soso.maps.event.addDomListener(e, "click", t)
				},
				n = e('<div class="map-control-center icon-map-icon-center" title="回到我的位置"><i></i></div>'),
				r = new t(n[0]);
			E.controls[soso.maps.ControlPosition.BOTTOM_RIGHT].push(n[0])
		}
		function ot() {
			var e = new soso.maps.Point(10, 30),
				t = new soso.maps.Size(30, 30),
				n = new soso.maps.Point(0, 0),
				r = new soso.maps.MarkerImage("http://s.url.cn/qqfind/img/qunmap-center-icon.png", t, n, e),
				i = new soso.maps.Point(32, 0),
				s = new soso.maps.Marker({
					icon: r,
					map: E,
					position: N
				})
		}
		function ut() {
			M = [];
			var e = E.getBounds(),
				t = new qq.maps.LatLng(parseFloat((e.lat.minY + e.lat.maxY) / 2), parseFloat((e.lng.minX + e.lng.maxX) / 2));
			_ = t, R = 0, H.searchCityByLatLng(t)
		}
		function at() {
			e(".map-qun-more-info").remove(), e(".map-qun-label").remove()
		}
		function ft() {
			D != E.getZoom() && (D = E.getZoom(), e(".map-qun-more-info").remove(), e(".map-qun-label").remove(), clearTimeout(m), m = setTimeout(function() {
				ut()
			}, 2e3))
		}
		function lt() {
			clearTimeout(m)
		}
		function ct() {
			soso.maps.event.addListener(E, "zoom_changed", ft), soso.maps.event.addListener(E, "bounds_changed", function() {
				j = 1
			}), soso.maps.event.addListener(E, "dragend", at), soso.maps.event.addListener(E, "idle", function() {
				j = 0;
				if (P) {
					P = 0;
					return
				}
				X.loading("hide"), X.loading("show"), p = {}, B ? B = 0 : (clearTimeout(m), m = setTimeout(function() {
					var e = E.getBounds();
					h.trigger("qunmap:getList", {
						x: N.lng,
						y: N.lat,
						t: e.lat.minY,
						b: e.lat.maxY,
						l: e.lng.minX,
						r: e.lng.maxX,
						zoom: E.getZoom()
					})
				}, 2e3))
			}), soso.maps.event.addListener(E, "maptypeid_changed", function() {
				E.getMapTypeId() == "hybrid" && l.bernoulli(11643, "")
			})
		}
		function ht(e) {
			var t = new k(e)
		}
		function pt(e) {
			return e < 21 ? {
				x: .0033,
				y: .0025
			} : e < 26 ? {
				x: .0033,
				y: .0024
			} : e < 32 ? {
				x: .0033,
				y: .0023
			} : e < 37 ? {
				x: .0033,
				y: .0022
			} : e < 42 ? {
				x: .0033,
				y: .002
			} : e < 45 ? {
				x: .0033,
				y: .0019
			} : {
				x: .0033,
				y: .0018
			}
		}
		function dt() {
			X.loading("show");
			var t = e("#group-map-zone").data("log"),
				n = e("#group-map-zone").data("lat");
			C || (C = a.getInfo()), b || (E = new soso.maps.Map(h[0], {
				minZoom: 11,
				maxZoom: 18,
				zoom: 17,
				panControl: !0,
				zoomControl: !0,
				panControlOptions: {
					position: soso.maps.ControlPosition.RIGHT_TOP
				},
				zoomControlOptions: {
					position: soso.maps.ControlPosition.RIGHT_TOP
				},
				mapTypeControlOptions: {
					position: soso.maps.ControlPosition.BOTTOM_RIGHT
				},
				scaleControl: !1
			}), st(), ct()), b = !0, g = !0, k = function(e) {
				this.opts = e;
				var t = new soso.maps.LatLng(e.lat, e.lon),
					n = {
						map: E,
						position: t
					};
				soso.maps.Overlay.call(this, n)
			}, k.prototype = new soso.maps.Overlay, k.prototype.construct = function() {
				var t = this,
					n = this.opts,
					r = e('<div data-id="' + this.opts.code + '" class="icon-map-label1 map-qun-label" data-map-qun-label>' + this.opts.num + "</div>");
				this.dom = r[0], r.bind("click", function() {
					var t = r.attr("data-id"),
						n = e("#qu-result-list-map"),
						i = e("#h4" + t).position();
					e("#qu-result-list-map h4").attr("class", ""), e("#h4" + t).addClass("selected"), n.scrollTop(0).scrollTop(e("#h4" + t).position().top)
				}), r.bind("mouseenter", function(t) {
					clearTimeout(O), e(".map-qun-label").removeClass("icon-map_label"), r.addClass("icon-map_label"), O = setTimeout(function() {
						A && A.destroy(), A = new L(n)
					}, 150), r.css("zIndex", 10119)
				}), r.bind("mouseleave", function(e) {
					clearTimeout(O), r.removeClass("icon-map_label"), O = setTimeout(function() {
						try {
							A.destroy()
						} catch (e) {}
					}, 150), r.css("zIndex", 10019)
				}), this.getPanes().overlayMouseTarget.appendChild(this.dom)
			}, k.prototype.draw = function() {
				var e = this.get("position");
				if (e) {
					var t = this.getProjection().fromLatLngToDivPixel(e);
					this.dom.style.left = t.getX() + "px", this.dom.style.top = t.getY() + "px"
				}
			}, k.prototype.destroy = function() {
				this.dom.parentNode.removeChild(this.dom)
			}, L = function(e) {
				this.opts = e;
				var t = new soso.maps.LatLng(e.lat, e.lon),
					n = {
						map: E,
						position: t
					};
				soso.maps.Overlay.call(this, n)
			}, L.prototype = new soso.maps.Overlay, L.prototype.construct = function() {
				var t = e('<div class="icon-qun-map-more-info map-qun-more-info"></div>').text(this.opts.num),
					n = 0;
				p[this.opts.code] && (n = p[this.opts.code]), t.html(r({
					url: n,
					bname: this.opts.bname,
					name: this.opts.name,
					code: this.opts.code,
					num: this.opts.num
				})), this.dom = t[0], this.getPanes().floatPane.appendChild(this.dom)
			}, L.prototype.draw = function() {
				var e = this.get("position");
				if (e) {
					var t = E.getBounds(),
						n = 0,
						r = new soso.maps.LatLng(t.lat.minY, t.lng.minX);
					tt = new soso.maps.LatLng(t.lat.maxY, t.lng.maxX), I || (I = this.getProjection().fromLatLngToDivPixel(r), q = this.getProjection().fromLatLngToDivPixel(tt));
					var i = this.getProjection().fromLatLngToDivPixel(e);
					i.getY() - 60 <= q.getY() && !j && (E.panBy(0, -60), n = 1), i.getX() + 120 >= q.getX() && !j && (E.panBy(120, 0), n = 1), i.getX() - 120 <= I.getX() && !j && (E.panBy(-120, 0), n = 1), n && (P = 1, I = 0, q = 0), this.dom.style.left = i.getX() - 55 + "px", this.dom.style.top = i.getY() - 50 + "px"
				}
			}, L.prototype.destroy = function() {
				e(this.dom).remove()
			};
			var i = {
				complete: function(e) {
					if (e.detail.name == "国外") {
						G();
						return
					}
					T = e.detail.latLng;
					if (!N) {
						N = e.detail.latLng, parseInt(t) && parseInt(n) && (N.lat = parseFloat(n), N.lng = parseFloat(t), t = 0, n = 0), E.setCenter(N), ot();
						var r = pt(N.lat),
							i = N.lat + r.y,
							s = N.lat - r.y,
							o = N.lng - r.x,
							u = N.lng + r.x;
						h.trigger("qunmap:getList", {
							x: N.lng,
							y: N.lat,
							t: i,
							b: s,
							l: o,
							r: u
						})
					}
					if (e.detail.detail.indexOf(c) < 0 || R) it(e.detail.name, e.detail.detail), R && (E.panTo(T), I = 0, q = 0), R = 0, F ? F = 0 : E.setZoom(11), D = 11
				},
				error: function() {}
			};
			H = new soso.maps.CityService(i), parseInt(t) && parseInt(n) ? (T = new soso.maps.LatLng(n, t), c = C.lbs_addr_city.replace(/(市|省)/ig, ""), v = c, R = 1, F = 1, H.searchCityByLatLng(T)) : C.longitude_nocache == 116 ? (C.lbs_addr_city_nocache == "" ? v = "北京" : (c = C.lbs_addr_city_nocache.replace(/(市|省)/ig, ""), v = c), R = 1, F = 1, H.searchCityByName(v)) : (T = new soso.maps.LatLng(C.latitude_nocache, C.longitude_nocache), c = C.lbs_addr_city.replace(/(市|省)/ig, ""), v = c, R = 1, F = 1, H.searchCityByLatLng(T))
		}
		function vt(t) {
			var n = locationMap[1],
				r;
			t == "city" ? (n = n[z], r = e("#qun-map-area-select .city-ul"), r.html(s({
				list: n,
				id: W,
				type: 1
			})).show()) : (r = e("#qun-map-area-select .province-ul"), r.html(s({
				list: n,
				id: z,
				type: 0
			})).show())
		}
		var c = 0,
			h = e("#group-map-zone"),
			p = {},
			v = "",
			m = 0,
			g = !1,
			y = !1,
			b = !1,
			w = !1,
			E = null,
			S = null,
			x = null,
			T = null,
			N = null,
			C = null,
			k, L, A, O, M = [],
			_, D = 17,
			P = 0,
			H, B = 1,
			j = 0,
			F = 0,
			I = 0,
			q = 0,
			R = 0,
			U = 1,
			z = 0,
			W = 0,
			X = e("#qu-result-list-map").loading(),
			$ = {
				"qunmap:loaded": function() {
					setTimeout(function() {
						b = !0, dt()
					}, 2e3)
				},
				"qunmap:imgloaded": K,
				"qunmap:init": et,
				"qunmap:addnewLabel": Q,
				"qunmap:listLoaded": Y,
				"qunmap:listLoadedFail": G,
				"qunmap:hide": V
			};
		for (var J in $) h.bind(J, $[J]);
		window.qunfindmapinit = function() {
			C ? e("#group-map-zone").trigger("qunmap:loaded") : a.getInfo(function() {
				e("#group-map-zone").trigger("qunmap:loaded"), C = {}, e.extend(C, d)
			})
		}, e(document).on("click", "[data-qun-map-picker]", function(t) {
			e("#qun-map-area-select ul").hide();
			var n = e(t.target),
				r = n.attr("data-type");
			vt(r)
		}), e(document).on("click", "[data-qun-map-li-select]", function(t) {
			var n = e(t.target),
				r = n.attr("data-value"),
				i = parseInt(n.attr("data-type")),
				s = "",
				o, u = "",
				a = "";
			l.bernoulli(11641, ""), i ? (o = e("#qun-map-area-select .city-ul").hide(), W = r, s = n.text(), r && (e("#qun-map-area-select .city").val(n.text()), a = e("#qun-map-area-select .pro").val() + "  >  " + n.text())) : (o = e("#qun-map-area-select .province-ul").hide(), z = r, W = 0, r && (a = n.text(), s = n.text()), s == "吉林" && (s += "省")), u = s + '<i class="qun-map-select-city"></i>', e("#qun-map-now-city").html(u), R = 1, H.searchCityByName(s), e("#qun-map-now-select-city").text(a)
		}), e(document).on("click", "[data-action-select-dis]", function(t) {
			t.preventDefault();
			var n = e(t.target),
				r = n.attr("data-target"),
				i = n.attr("data-show");
			t.target.nodeName != "H4" && (n = n.parents("h4"), i = n.attr("data-show")), n.removeClass("selected"), i ? (e("#" + r).show(), n.removeAttr("data-show"), n.find("i").attr("class", "icon-dis-arrow")) : (e("#" + r).hide(), n.attr("data-show", 1), n.find("i").attr("class", "icon-dis-arrow-up"))
		}), e(document).on("click", function(t) {
			var n = e(t.target);
			n.parents(".province-box").length == 0 && n.parents(".city-box").length == 0 && e("#qun-map-area-select ul").hide(), n.parents(".qun-map-select-city-div").length == 0 && n.parents(".qun-result-map-tit").length == 0 && e("#qun-map-select-city-div").hide()
		}), e(document).on("click", "[data-qun-map-gid]", function(t) {
			var n = e(t.target),
				r = n.attr("data-qun-map-gid");
			t.target.nodeName.toLowerCase() == "img" ? l.bernoulli(11644, "fujin") : l.bernoulli(11645, "fujin"), t.preventDefault(), r && f.viewGroupInfo(r, {
				source_id: 65543
			})
		}), e("#qu-result-list-map").on("scroll", function(t, n) {
			var r = e(this).scrollTop(),
				i = e(this).get(0).scrollHeight,
				s = e(this).height(),
				o = e("#qu-result-list-map h4");
			o.removeClass("fixed");
			var u = 0;
			o.each(function(t) {
				var n = e(this);
				if (n.offset().top >= 0) return !1;
				u++
			}), o.eq(u - 1).next("ul").height() > s && o.eq(u).offset().top > 100 && o.eq(u - 1).addClass("fixed")
		})
	}), !
	function(e) {
		typeof define == "function" ? define("qqun", ["$", "./model/group", "./widget/qiqi", "tmpl!template/quRecommendGroup.html", "tmpl!template/quRecommendGroupNew.html", "tmpl!template/quCategory.html", "tmpl!template/quExactResult.html", "tmpl!template/quFuzzyResult.html", "tmpl!template/quNavHotWords.html", "tmpl!template/quHotGroupTag.html", "tmpl!template/quTabGroup.html", "tmpl!template/quHotSearchPics.html", "tmpl!template/quHotSearchWords.html", "tmpl!template/quRecommendVideoGroup.html", "./widget/qunmap", "tools/utils", "tools/cookie", "tools/reportLogic", "tools/info", "tools/native", "tools/citySelector", "tools/searchtext", "tools/pagination", "tools/tdw"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x) {
		"use strict";
		var T = "qqun",
			N = {
				isMoreGroupRecommend: !0,
				isMorePage: !0,
				isInited: !1,
				isAddScrollEvent: !1,
				isResultReady: !1,
				isMaskEnd: !1,
				pageNum: 1,
				totalPage: 999,
				keyword: "",
				cgiPage: 0,
				sort: 1,
				iso: 0,
				isRecommend: !1,
				isPageLoad: [!0, !1],
				guagua_pageNum: 1,
				guagua_totalPage: 999,
				guagua_keyword: "齐齐直播间",
				guagua_cgiPage: 0,
				guagua_sort: 1,
				guagua_iso: 0,
				guagua_isRecommend: !1,
				guagua_isPageLoad: [!0, !1],
				tabPage: {},
				guagua_tabPage: {},
				reloadDom: {},
				tabNoMore: {},
				triggerEvent: "",
				tab: "",
				claszz: "",
				canShowRecommendVideoGroup: b.getVersion() >= 5443,
				searchParams: {
					cityId: 0
				}
			};
		N.init = function(t) {
			t.from === "hybrid" && (N.searchParams.from = 17), t.keyword && (e("#qu-search-input").val(t.keyword), e.inputChangeHandler()), N.isInited || (N.isInited = !0, N.citySelector = e("#qu-city-selector").citySelector(0), N.initDom(), N.initHandler(), N.initLoading(), N.loadCategory(), N.loadReGroup());
			if (t.search) {
				N.searchQuByRecommend = !1;
				if (t.behavior) {
					var n = 0,
						r;
					try {
						r = t.behavior.match(/page-(\d)/i), r !== null && (n = r[1]), n === "2" ? N.search({
							keyword: t.keyword,
							jumpPage: 1
						} || "") : N.search(t.keyword || "")
					} catch (i) {}
				} else N.search(t.keyword || "")
			} else parseInt(t.log) && parseInt(t.lat) && (e("#group-map-zone").attr("data-log", t.log).attr("data-lat", t.lat), N.showNearby());
			N.canShowRecommendVideoGroup ? e("#recommendGroupTitle").text("正在直播的群") : e("#exactRecommend").hide()
		}, N.initDom = function() {
			if (N.$els === Object(N.$els)) return;
			var t = {};
			t.category = e("#qu-category"), t.reCommend = e("#qu-re-group"), t.resultFuzzyMain = e("#qu-result-fuzzy-main"), t.resultExactMain = e("#qu-result-exact-main"), t.resultMaskMain = e("#qu-result-mask-main"), t.resultRecommend = e("#qu-result-recommend"), t.navWords = e("#qu-nav-words"), t.hotSPics = e("#qu-hot-pics"), t.hotSWords = e("#qu-hot-words"), t.groupNav = e("#qu-groups-nav"), t.qu = e("#qu"), t.header = e("#qu-header"), t.main = e("#qu-main"), t.resultFuzzy = e("#qu-result-fuzzy"), t.resultExact = e("#qu-result-exact"), t.resultMask = e("#qu-result-mask"), t.searchInput = e("#qu-search-input"), t.carouselInner = e("#qu-carousel-inner"), t.pageNumDom = e("#qu-result-pageNum"), t.pageControl = e("#qu-carousel-control"), t.groupMap = e("#qu-result-map"), t.groupMapList = e("#qu-result-list-map"), t.groupMapTit = e("#qun-result-map-tit"), t.selectCity = e("#qun-map-select-city-div"), t.groupMapZone = e("#group-map-zone"), N.$els = t
		}, N.initHandler = function() {
			function t(t) {
				N.searchQuByRecommend = !1, N.search(), t.preventDefault(), e.report.monitorAndBer(296040, 10824, "qun"), N.searchParams.from = 1;
				var n = (N.$els.searchInput.val() || "").trim();
				v.chkInputType(n) == "num" ? e.report.bernoulli(10825, "qun") : e.report.bernoulli(10826, "qun")
			}
			e("#qu-search-submit").on("click", t), e("#qu-search-form").on("submit", t);
			var i = e("#qu");
			e(i).on("click", "[data-page]", function(t) {
				var n = e(this),
					r = e("#qu-result-fuzzy-main"),
					i = n.data(),
					s = r.data("allguagua"),
					o = e("#qu-result-fuzzy-main").data("isRecommendResultPage", !0),
					u = i.page,
					a = {
						interval: !1
					},
					f = e("#qu-carousel-inner .item").length;
				if (!s) {
					if (e("#qu-result-fuzzy-main .active").next(".item").length == 0 && u > N.pageNum) {
						var l = e('<div class="item"></div>');
						N.loadFuzzyResultToDom(24, l, null, {
							isRecommend: !0
						}), N.$els.carouselInner.append(l), N.$els.pageControl.addClass("none")
					}
					N.pageNum = u, N.hideFilterAll(), N.pageNum >= N.totalPage ? N.$els.pageControl.html(S.get(N.pageNum, !0, f)) : N.$els.pageControl.html(S.get(u, !1, f))
				} else {
					if (e("#qu-result-fuzzy-main .active").next(".item").length == 0 && u > N.guagua_pageNum) {
						var l = e('<div class="item"></div>');
						N.loadFuzzyGuaGuaResultToDom(24, l), N.$els.carouselInner.append(l), N.$els.pageControl.addClass("none")
					}
					N.guagua_pageNum = u, N.guagua_pageNum >= N.guagua_totalPage ? N.$els.pageControl.html(S.get(u, !0, f)) : N.$els.pageControl.html(S.get(u, !1, f))
				}
				S.go(N.$els.resultFuzzyMain, u), e("#qu-result-fuzzy-main").trigger("slid"), t.preventDefault()
			}), e(i).on("click", "[data-qu-sort]", function() {
				var t = e(this).data(),
					n = t.quSort,
					r = N.isRecommend;
				e("[data-qu-sort]").removeClass("active"), e(this).addClass("active"), N.searchQuByRecommend = !1, N.search(N.keyword, n, 24, r)
			}), e(i).on("click", "[data-qu-moreRecommend]", function() {
				N.canShowRecommendVideoGroup ? (x.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "living_grp", "clk_more"]
				]), e.report.monitor(2453397), b.openGroupVideoHall()) : (N.searchQuByRecommend = !1, N.isMoreGroupRecommend ? N.search("", 1, 24, !0) : N.search("交友", 1, 24), e.report.monitor(2443853))
			}), N.hoverByUser = !0, e(i).on("click", "[data-qu-search]", function(t) {
				e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", ""), N.searchParams.from = 1;
				var n = e(this).data(),
					r = n.quSearch,
					i = n.quRegion,
					s = n.navBehavior || "normal",
					o = n.quSubId,
					u = n.quReportId - 0;
				u && e.report.bernoulli(u, r);
				if (i === "categoryrec") {
					var a = e(this).closest(".category").index() + 1;
					x.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2"], [
						["Grp_find_pc", "find_page", "Clk_keyword", a, r]
					])
				} else if (i === "hotword") x.reportTdw("dc00141", ["opername", "module", "action", "ver1"], [
					["Grp_find_pc", "find_page", "Clk_hot", r]
				]);
				else if (i === "reci") {
					var a = e(this).closest("li").index() + 1;
					x.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2"], [
						["Grp_find_pc", "find_page", "Clk_hot_searchbox", r, a]
					])
				}
				/category|recomgrep/.test(i) && e.report.bernoulli(11647), N.searchQuByRecommend = !0, N.searchQuSubId = o ? o - 0 : 0, N.quReportRegion = i;
				switch (s) {
				case "normal":
					N.search(r);
					break;
				case "onlyGuaGua":
					N.searchOnlyGuaGua("qunHot"), x.reportTdw("pf00191", ["module", "action", "obj1"], [
						["guagua_find", "clickhotword", 12100]
					]), e.report.bernoulli(11099)
				}
				t.preventDefault(), N.hideSubCat()
			}), e(i).on("click", "[data-qu-banner]", function(t) {
				e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", "");
				var r = e(this).data(),
					i = r.quReportId - 0,
					s = r.quBanner,
					o = r.quBannerGuagua >> 0,
					u = r.quBannerActivity >> 0,
					a = r.quBannerVideoHall >> 0,
					f = r.index;
				if (r.quBanner == "banner1") N.showNearby();
				else if (o) n.reportRcmd(12201), n.quRender("guaguaHotPic"), e.report.bernoulli(11757), N.guaguaScroll.show();
				else if (u) {
					e("#qu-activity-result").show();
					var l = e("#qu-activity-result-iframe");
					l.attr("src", l.data("src"))
				} else a ? b.openGroupVideoHall() : i && e.report.bernoulli(i, s);
				x.reportTdw("dc00141", ["uin", "ts", "opername", "module", "action", "obj2", "ver2"], [
					[m.uin(), Date.now(), "Grp_find_pc", "find_page", "Clk_banner", b.getVersion(), f]
				])
			}), e(i).on("click", "[data-tab]", function(t) {
				e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", ""), t.preventDefault();
				var n = e(this);
				n.tab("show"), e.report.bernoulli(10922, n.data("clazz"));
				var r = n.attr("href");
				N.tab = n.data("tab"), N.clazz = n.data("clazz");
				var s = n.data("nav-behavior");
				n.data("tabInited") || (n.data("tabInited", !0), N.triggerEvent = r.slice(1).split("-").slice(0, 3).join("."), e(i).trigger(N.triggerEvent, [N.tab, N.clazz, s]))
			}), e("#recommend-refresh").on("click", function() {
				x.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "find_page", "Clk_more_grp"]
				]), N.loadReGroup()
			}), e(document).on("qu.tab.group", function(t, n, i, s, o, u) {
				var a = e("#qu-tab-group-" + n),
					f = e(".item.active", a),
					l = s || "normal",
					c = e(".item:not(.active)", a);
				N.iso = 1, N.guagua_iso = 1, N.keyword = i, N.guagua_keyword = i;
				if (!o) switch (l) {
				case "normal":
					N.tabPage[n] = 0, N.cgiPage = N.tabPage[n], N.loadFuzzyResultToDom(12, f, r, {
						isMain: !0,
						showError: !0
					}, function(e) {
						e || (N.cgiPage = ++N.tabPage[n], N.loadFuzzyResultToDom(12, c, r, !0))
					});
					break;
				case "onlyguagua":
					N.guagua_tabPage[n] = 0, N.guagua_cgiPage = N.guagua_tabPage[n], N.loadFuzzyGuaGuaResultToDom(12, f, r, {
						isMain: !0,
						showError: !0
					}, function(t) {
						t ? e("#qu-tab-group-" + N.tab + " .carousel-next-trigger").addClass("disable") : (N.guagua_cgiPage = ++N.guagua_tabPage[n], N.loadFuzzyGuaGuaResultToDom(12, c, r, !0))
					})
				} else {
					if (N.tabNoMore["qu-tab-group-" + N.tab]) {
						e("#qu-tab-group-" + N.tab + " .carousel-next-trigger").addClass("disable");
						return
					}
					if (f.next().next().length == 0) {
						var h = e('<div class="item"></div>');
						switch (l) {
						case "normal":
							N.cgiPage = ++N.tabPage[n], N.loadFuzzyResultToDom(12, h, r, !0);
							break;
						case "onlyguagua":
							N.guagua_cgiPage = ++N.guagua_tabPage[n], N.loadFuzzyGuaGuaResultToDom(12, h, r, !0)
						}
						e(".carousel-inner", a).append(h)
					}
				}
			}), e(i).on("slid", function(e) {
				e.target.id == "qu-result-fuzzy-main" && (N.$els.resultFuzzyMain[0].scrollTop = 0, _ = L)
			}), e(i).on("click", "[data-qu-reload]", function() {
				var t = e(this).data(),
					n = t.quReload;
				switch (t.quReload) {
				case "main-category":
					N.loadingCategory.loading("show", {
						reShow: !0
					}), N.loadCategory();
					break;
				case "main-recommend":
					N.loading.loading("show", {
						reShow: !0
					});
					var s = e("#qu-recommend-block .item.active");
					N.loadRecommendToDom(12, s, r, !0);
					break;
				case "result-recommend":
					N.reloadDom.loading("show", {
						reShow: !0
					}), N.loadRecommendToDom(4, N.$els.resultRecommend, null, null, null, {
						isGdt: !0
					});
					break;
				case "result-search":
					N.loadingMask.loading("show", {
						reShow: !0
					}), N.search()
				}
				if (t.quReload.slice(0, 12) == "qu-tab-group") {
					var o = e("#" + n);
					o.loading("show", {
						reShow: !0
					}), e(i).trigger(N.triggerEvent, [N.tab, N.clazz])
				}
			});
			var s = e("#qu-category");
			s.on("mouseenter", ".category", function() {
				if (!N.hoverByUser) {
					s.find(".category.active").removeClass("active");
					return
				}
				if (this.classList.contains("active")) return;
				s.find(".category.active").removeClass("active"), this.classList.add("active")
			}), s.on("mouseleave", ".category", function(t) {
				e(this).removeClass("active"), N.hoverByUser || (N.hoverByUser = !0)
			}), N.citySelector.on("change", function(e, t) {
				var n = N.searchParams;
				n.cityId = t, N.search(n.keyword, n.sort, n.number, n.isRecommend)
			}), e("#qu").on("click", ".qu-city-filter-all", function(t) {
				e("#city-0").trigger("click")
			})
		}, N.setSubCatPos = function() {
			e.each(e("#qu-category .sub-category"), function(t, n) {
				n = e(n), n.css("top", -n.parent()[0].offsetTop);
				return;
				var r, i, s, o, u
			})
		}, N.hideSubCat = function() {
			setTimeout(function() {
				e("#qu-category .active").removeClass("active")
			}, 500)
		}, N.initLoading = function() {
			N.loading = N.$els.reCommend.loading(), N.loadingCategory = e("#qu-navigation-block").loading(), N.loadingPics = e("#qu-hot-pics").loading().loading("show"), N.loadingWords = e("#qu-hot-words").loading().loading("show"), N.loading.loading("show"), N.loadingCategory.loading("show"), N.loadingMask = N.$els.resultMaskMain.loading()
		}, N.loadCategory = function() {
			_tabsTiming.qqun.startCGI = +(new Date), e.ajax({
				type: "POST",
				data: {
					guagua: 1,
					ver: b.getVersion
				},
				url: "http://cgi.find.qq.com/qqfind/group/hotwords_v2",
				dataType: "json",
				success: function(t) {
					_tabsTiming.qqun.CGIend = +(new Date);
					var n = t.result || {},
						r, i, o;
					r = n.navWords || [], i = n.guaguaHot, i && r.unshift(i), e.each(r, function(e, t) {
						t.behavior = t.behavior || "normal"
					}), N.$els.navWords.html(a(n.navWords || [])), N.loadHotPics(n.hotPics || [], n.guagua_adv), N.$els.hotSWords.html(h(n.hotWords || [])), N.loadingCategory.loading("hide"), e.isArray(n.groupCategory) && n.groupCategory.length ? N.$els.category.html(s(n.groupCategory)) : N.loadingCategory.loading("zeroGroupTip"), _tabsTiming.qqun.firstScreen = +(new Date), N.setSubCatPos(), E.setText(n.searchText || {}), N.$els.searchInput.attr("placeholder", E.groupSearchText)
				},
				error: function(e, t, n) {
					t === "timeout" ? N.loadingCategory.loading("timeout", {
						bindsName: "data-qu-reload",
						bindsData: "main-category"
					}) : N.loadingCategory.loading("zeroGroupTip")
				}
			})
		}, N.loadHotPics = function(e, t) {
			e[0] && (e[0].link = 0), t && t.length && (t = t[0], e[1] = {
				url: t.picurl,
				guaguaAdv: 1
			});
			for (var n = 0; n < e.length; n++) e[n].link === "http://quactivity" ? (e[n].link = null, e[n].quActivity = !0, e[n].qunVideoHall = !1) : e[n].version && b.getVersion() >= e[n].version ? (e[n] = {
				quActivity: !1,
				url: e[n].urlv2,
				link: e[n].linkv2,
				word: e[n].wordv2
			}, e[n].link.match(/OpenGroupVideoHall/) && (e[n].link = null, e[n].qunVideoHall = !0)) : (e[n].quActivity = !1, e[n].qunVideoHall = !1);
			N.$els.hotSPics.html(c(e)), N.loadingPics.loading("hide")
		}, N.loadReGroup = function() {
			N.loadRecommendToDom(6, N.$els.reCommend, i, {
				isMain: !0
			}, null, {
				isGdt: 1,
				guaguan: 1
			}), e.report.bernoulli(11655)
		}, N.loadRecommendToDom = function(n, i, s, o, u, a) {
			a = a || {}, !i instanceof jQuery && e(i), s = s || r;
			var f = 12,
				l = a.isGdt || !1,
				c = a.guaguan || 0,
				h = !1,
				p = !1;
			o = o || {}, typeof o == "object" ? (h = o.isMain, p = o.showError) : h = o;
			var d = {
				n: n,
				src: 1,
				gdt: l ? 1 : 0
			};
			l && (h ? (d.gdtn = 1, d.guaguan = c) : (d.gdtn = 2, d.src = 2, d.search_gcode = function(e) {
				return isNaN(e - 0) ? e = "" : e -= 0, e
			}(N.keyword), d.v7 = !0));
			var v = h ? N.loading.loading() : i.parent().loading();
			t.recommend(d, function(r) {
				if (Number(r.retcode) !== 0 || e.isEmptyObject(r.result)) {
					if (p) {
						i.html("");
						if (h) return N.loading.loading("zeroGroupTip", {
							errorCode: r.retcode ? "6031" + r.retcode : 6000332
						});
						v.loading("show"), v.loading("zeroGroupTip", {
							errorCode: r.retcode ? "6034" + r.retcode : 6000333
						});
						return
					}
					i.remove()
				}
				h ? N.loading.loading("hide") : v.loading("hide");
				var o = r.result || {},
					a = t.processDatas(o),
					l = o.guagua || [],
					c = l[0];
				N.isMoreGroupRecommend = o.IsEnd === 0, c && (c.isGuaGua = !0, a.splice(2, 0, t.processData(c)), a.length = Math.min(a.length, 6)), i.html(s({
					obj: a,
					isMain: h
				})), n -= f, n > 0 ? N.loadRecommendToDom(n, i, s, h) : u && u(), d.src === 2 && x.reportTdw("dc00141", ["uin", "ts", "opername", "module", "action", "obj2"], [
					[m.uin(), Date.now(), "Grp_recom_pc", "find_result", "exp_grp", b.getVersion()]
				])
			}, function(e, t) {
				if (p) {
					i.html("");
					var n = h ? "main-recommend" : "result-recommend";
					N.reloadDom = v, v.loading("show"), t === "timeout" ? v.loading("timeout", {
						bindsName: "data-qu-reload",
						bindsData: n,
						errorCode: h ? "6031666" : "6034666"
					}) : v.loading("zeroGroupTip", {
						errorCode: t === "error" ? h ? "6031" + e.status : "6034" + e.status : 5000002
					})
				} else i.remove()
			})
		}, N.loadFuzzyResultToDom = function(r, i, s, o, a) {
			r = r || 24, s = s || u;
			var f = i || e("#qu-result-fuzzy-main .active"),
				l = 24,
				c = N.keyword,
				h = !1,
				p = !1,
				d = !1;
			o = o || {}, typeof o == "object" ? (h = o.isMain, p = o.showError, d = o.isRecommend) : h = o;
			var v = h ? f.parents(".tab-pane").loading() : f.loading(),
				m = {
					k: N.keyword,
					p: N.cgiPage,
					src: 1,
					st: N.sort,
					iso: N.iso,
					isRecommend: N.isRecommend,
					n: l,
					city_id: N.searchParams.cityId,
					from: N.searchParams.from
				};
			d || e("#qu-result-fuzzy .right-label a").not(".btn-group-overlay-close").each(function() {
				e(this).css("display", "inline-block")
			}), m.p = N.cgiPage++, m.n = r < l ? r : l, e("#qu-result-fuzzy-main").data("allguagua", !1), t.search(m, function(i) {
				if (h && Number(i.retcode) !== 0) {
					p ? (f.html(""), e(".item.active", f.parent()).html(""), v.loading("show"), v.loading("zeroGroupTip", {
						errorCode: i.retcode ? "6032" + i.retcode : 6000322,
						keyWord: c
					}), e("#qu-tab-group-" + N.tab + " .carousel-next-trigger").addClass("disable")) : f.remove();
					return
				}
				var o = i || {},
					u = o.group_list,
					m = o.redwords,
					g = o.endflag,
					y = [];
				if (!(!h || o.gTotal != 0 && u.length != 0)) {
					p ? (f.html(""), e(".item.active", f.parent()).html(""), v.loading("show"), v.loading("zeroGroupTip", {
						errorCode: 6000323,
						keyWord: c
					}), e("#qu-tab-group-" + N.tab + " .carousel-next-trigger").addClass("disable")) : f.remove();
					return
				}
				N.hasMorePage = o.gTotal > C * 3;
				if (g == 1) {
					N.isPageLoad[N.pageNum] = !0, N.totalPage = N.pageNum;
					var b = e("#qu-carousel-inner").find(".item").length;
					N.$els.pageControl.html(S.get(N.pageNum, g, b)), N.$els.pageControl.removeClass("none"), N.showFilterAll()
				}
				g == 1 && h && (N.tabNoMore["qu-tab-group-" + N.tab] = !0), h && v.loading("hide");
				try {
					if (o.endflag !== 1) {
						var w = u.length % 3;
						u.length = u.length - w
					}
				} catch (E) {}
				e(u).each(function(e, n) {
					h ? t.processData(n) : t.processData(n, m), y.push(n)
				}), h ? f.html(s({
					obj: y,
					isMain: h,
					groupList: y,
					groupGuaGuaList: []
				})) : f.append(s({
					obj: y,
					isMain: h,
					groupList: y,
					groupGuaGuaList: []
				}));
				var x = [];
				y.forEach(function(e) {
					e.isGuaGua && x.push(e.roomid)
				}), x.length && n.reportShow(12300, x, N.keyword), r -= l, r > 0 && g !== 1 ? N.loadFuzzyResultToDom(r, f, s, {
					isMain: h,
					isRecommend: d
				}) : a && a(g)
			}, function(t, n) {
				if (h) if (p) {
					f.html(""), e(".item.active", f.parent()).html(""), e("#qu-recommend-block .carousel-next-trigger").addClass("disable");
					var r = h ? v[0] && v[0].id || "" : "result-search";
					v.loading("show"), n === "timeout" ? v.loading("timeout", {
						bindsName: "data-qu-reload",
						bindsData: r,
						errorCode: 6032666,
						keyWord: c
					}) : v.loading("zeroGroupTip", {
						errorCode: n === "error" ? "6032" + t.status : 5000002,
						keyWord: c
					})
				} else f.remove()
			})
		}, N.loadVideoGroupRecomend = function() {
			t.getVideoGroupRecommend(4, N.keyword, function(t) {
				t && t.length && (x.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "living_grp", "exp_live"]
				]), e.report.monitor(2453393), N.$els.resultRecommend.html(p({
					obj: t
				})))
			})
		}, N.loadFuzzyGuaGuaResultToDom = function(r, i, s, o, a) {
			var r = r || 24,
				s = s || u,
				f = !1,
				l = !1;
			typeof o == "object" ? (f = o.isMain, l = o.showError) : f = o;
			var c = i || e("#qu-result-fuzzy-main .active"),
				h = 24,
				p = f ? c.parents(".tab-pane").loading() : c.loading(),
				d = N.guagua_keyword,
				v = {
					k: "1",
					p: N.cgiPage,
					src: 1,
					st: N.sort,
					guagua: 1,
					guaguan: 12,
					liveroom: 1,
					iso: N.iso,
					isRecommend: !1,
					n: h,
					from: N.searchParams.from
				};
			v.p = N.guagua_cgiPage++, v.n = r < h ? r : h, e("#qu-result-fuzzy .right-label a").not(".btn-group-overlay-close").each(function() {
				e(this).css("display", "none")
			}), t.search(v, function(i) {
				var o = i.result && i.result.group_guagua || {
					group_list: []
				},
					u = o.redwords,
					v = o.endflag,
					m = [];
				if (f && (o.total == 0 || o.group_list && o.group_list.length == 0)) {
					l ? (c.html(""), e(".item.active", c.parent()).html(""), p.loading("show"), p.loading("zeroGroupTip", {
						errorCode: 6000323,
						keyWord: d
					}), e("#qu-tab-group-" + N.tab + " .carousel-next-trigger").addClass("disable")) : c.remove();
					return
				}
				if (v == 1) {
					N.guagua_isPageLoad[N.guagua_pageNum] = !0, N.guagua_totalPage = N.guagua_pageNum;
					var g = e("#qu-carousel-inner .item").length;
					N.guagua_isMorePage && (N.$els.pageControl.html(S.get(N.guagua_pageNum, v, g)), N.$els.pageControl.removeClass("none"))
				}
				v == 1 && f && (N.tabNoMore["qu-tab-group-" + N.tab] = !0), f && p.loading("hide"), e(o.group_list).each(function(e, n) {
					n.isGuaGua = !0, f ? t.processData(n) : t.processData(n, u), m.push(n)
				}), N.guagua_isMorePage = o.total <= C * 3 ? !1 : !0, c.append(s({
					obj: m,
					isMain: f,
					groupList: m,
					groupGuaGuaList: []
				}));
				var y = [];
				m.forEach(function(e) {
					e.isGuaGua && y.push(e.roomid)
				}), y.length && n.reportShow(12200, y), r -= h, r > 0 && !v ? N.loadFuzzyGuaGuaResultToDom(r, c, s, f) : a && a(v)
			}, function(t, n) {
				if (f) if (l) {
					c.html(""), e(".item.active", c.parent()).html(""), e("#qu-recommend-block .carousel-next-trigger").addClass("disable");
					var r = f ? p[0] && p[0].id || "" : "result-search";
					p.loading("show"), n === "timeout" ? p.loading("timeout", {
						bindsName: "data-qu-reload",
						bindsData: r,
						errorCode: 6032666,
						keyWord: d
					}) : p.loading("zeroGroupTip", {
						errorCode: n === "error" ? "6032" + t.status : 5000002,
						keyWord: d
					})
				} else c.remove()
			})
		}, N.search = function(n, r, i, s) {
			var a = N.searchParams;
			i = a.number = i || 24, r = a.sort = r || 1, n = a.keyword = n || (N.$els.searchInput.val() || "").trim(), s = a.isRecommend = s || !1, a.sort === 1 ? x.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "exp_default"]
			]) : a.sort === 2 ? x.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "exp_num"]
			]) : a.sort === 4 && x.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "exp_active"]
			]);
			if (a.cityId !== 0) {
				var f = localCityMap[a.cityId][0],
					l = "";
				for (var c in localCityMap) localCityMap.hasOwnProperty(c) && localCityMap[c].length > 1 && localCityMap[c].indexOf(a.cityId) > -1 && (l = localCityMap[c][0]);
				e.trim(l) ? x.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2"], [
					["Grp_find_pc", "find_page", "Clk_area", l, f]
				]) : x.reportTdw("dc00141", ["opername", "module", "action", "ver1"], [
					["Grp_find_pc", "find_page", "Clk_area", f]
				])
			}
			e("#qu-keyword").text(n), N.keyword = n, e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", "");
			var h = {},
				p = 0;
			typeof n == "object" && (h = n, p = h.jumpPage || 1, n = h.keyword);
			if (n == "齐齐直播间" && b.canInvokeGuaGua) return e.report.bernoulli(11546), N.searchOnlyGuaGua("qun");
			var d = !1,
				g = !1,
				y = i,
				w = [],
				E = [],
				S = {},
				T = {},
				k = e(".qu-result-main", N.$els.resultFuzzy).loading(),
				A = e(".qu-result-main", N.$els.resultExact).loading();
			if (!n && !s) return;
			i > 24 && (y = 24), s ? (n = "推荐群", N.isRecommend = s) : N.isRecommend = !1, N.showResultMask(n), N.searchParams = e.extend(N.searchParams, {
				k: n,
				n: y,
				src: 1,
				st: r,
				p: p,
				isRecommend: s
			}), N.hideFilterAll(), t.search({
				k: n,
				n: y,
				src: 1,
				st: r,
				p: p,
				isRecommend: s,
				city_id: a.cityId,
				from: N.searchParams.from
			}, function(i) {
				var a = i.retcode,
					f = e("#qu-result-exact").find(".qu-result-nav .left-label");
				if (Number(a) !== 0) {
					s ? a = a ? "6032" + a : 6000312 : a = a ? "6033" + a : 6000312, N.$els.resultExactMain.html(" "), A.loading("show"), A.loading("zeroGroupTip", {
						zeroGroupText: '<i class="icon-alert"></i>抱歉，<span class="while-all-hide">当前城市</span>没有找到符合查找条件的QQ群',
						showFeedback: !1,
						errorCode: a,
						keyWord: v.escape(n),
						isQunResult: !0
					}), f.html('<span>找到<span id="qu-resultNum">0</span>个群</span>'), N.isResultReady = "exact", N.showResult();
					return
				}
				if (["自杀", "自尽", "自残"].join("").indexOf(n) >= 0) {
					N.$els.resultExactMain.html(" "), A.loading("show"), A.loading("suicideGroupTip", {
						errorCode: a,
						keyWord: v.escape(n),
						isQunResult: !0
					}), f.html('<span>找到<span id="qu-resultNum">0</span>个群</span>'), N.isResultReady = "exact", N.showResult(), e("#exactRecommend").hide();
					return
				}
				S = i, w = i.redwords, d = i.exact || !1, e(i.group_list).each(function(e, n) {
					t.processData(n, w), E.push(n)
				});
				if (i.gTotal == 0 || E.length == 0) {
					N.$els.resultExactMain.html(" "), A.loading("show"), a = 6000313, A.loading("zeroGroupTip", {
						errorCode: a,
						keyWord: n,
						isQunResult: !0
					}), f.html('<span>找到<span id="qu-resultNum">0</span>个群</span>'), N.isResultReady = "exact", N.showResult();
					return
				}
				x.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2"], [
					["Grp_find_pc", "find_page", "result", n, d ? 1 : 2]
				]), N.searchId = +(new Date) + "" + Math.floor(Math.random() * 9999), x.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4", "ver5"], [
					["Grp_find_pc", "find_page", "search", +(new Date), n, N.searchId, m.uin(), i.gTotal]
				]);
				if (d && !s) A.loading("hide"), e("#qu-resultNum").html(1), N.gTotal = 1, T = {
					groupList: E
				}, N.$els.resultExactMain.html(o(T)), N.isResultReady = "exact", E[0] && f.html('<span>找到<span id="qu-resultNum">1</span>个群</span>'), e.report.bernoulli(10912, "acc");
				else {
					k.loading("hide"), N.keyword = n, N.cgiPage = p + 1, N.sort = r, N.iso = 0, N.pageNum = 1, N.isPageLoad = [!0, !1], N.isRecommend = s, N.totalPage = 999, N.gTotal = i.gTotal, N.hasMorePage = S.total <= C * 3 ? !1 : !0, N.$els.pageControl.addClass("none"), e("[data-qu-sort]").removeClass("active"), e("[data-qu-sort=" + N.sort + "]").addClass("active"), N.showSearchInfo(n), N.$els.resultFuzzyMain[0].scrollTop = 0, _ = L, e("#qu-result-fuzzy-main").data("allguagua", !1);
					var l = e('<div class="item active"></div>');
					E.splice(24);
					try {
						if (S.endflag !== 1) {
							var c = E.length % 3;
							E.length = E.length - c
						}
					} catch (h) {}
					T = {
						groupList: E
					}, l.html(u(T)), N.$els.carouselInner.html(l), s ? (e("#qu-result-fuzzy-main").data("isRecommendResultPage", !0), e("#qu-result-fuzzy .right-label a").not(".btn-group-overlay-close").each(function() {
						e(this).css("display", "none")
					})) : (e("#qu-result-fuzzy .right-label a").not(".btn-group-overlay-close").each(function() {
						e(this).css("display", "inline-block")
					}), e("#qu-result-fuzzy-main").data("isRecommendResultPage", !1)), N.isResultReady = "fuzzy", e.report.bernoulli(10912, "fuz")
				}
				i.group_list.length <= 6 && p % 3 === 0 && i.endflag === 0 && N.loadFuzzyResultToDom(24, null, null, {
					isRecommend: e("#qu-result-fuzzy-main").data("isRecommendResultPage") || !1
				}), e("#qu-city-result-all").html("搜索全国范围内含 “" + v.escape(n) + "” 的群"), S.group_list.length < N.searchParams.n && N.showFilterAll(), N.showResult()
			}, function(e, t) {
				t === "timeout" ? N.loadingMask.loading("timeout", {
					bindsName: "data-qu-reload",
					bindsData: "result-search",
					errorCode: s ? "6032666" : "6033666",
					keyWord: n
				}) : N.loadingMask.loading("zeroGroupTip", {
					errorCode: t === "error" ? s ? "6032" + e.status : "6033" + e.status : 5000002,
					keyWord: n
				})
			})
		}, N.searchOnlyGuaGua = function(t) {
			var r = 24,
				i = 1,
				s = "齐齐直播间",
				o = r,
				u = 1,
				a = [],
				f = [],
				l = {},
				c = 12,
				h = {},
				p = e(".qu-result-main", N.$els.resultFuzzy).loading(),
				d = e(".qu-result-main", N.$els.resultExact).loading();
			return e("#qu-result-fuzzy .right-label a").not(".btn-group-overlay-close").each(function() {
				e(this).css("display", "none")
			}), N.showResultMask("齐齐直播间"), n.quRender(t, function() {
				N.keyword = "", N.guagua_cgiPage = 1, N.guagua_sort = i, N.guagua_iso = 0, N.guagua_pageNum = 1, N.guagua_isPageLoad = [!0, !1], N.guagua_isRecommend = !1, N.guagua_totalPage = 999, N.guagua_isMorePage = l.total <= C * 3 ? !1 : !0, N.$els.pageControl.addClass("none"), e("[data-qu-sort]").removeClass("active"), e("[data-qu-sort=" + N.sort + "]").addClass("active"), N.showSearchInfo(s, 1), N.$els.resultFuzzyMain[0].scrollTop = 0, _ = L, e("#qu-result-fuzzy-main").data("allguagua", !0), r > 12 && l.endflag === 0 && N.loadFuzzyGuaGuaResultToDom(), N.isResultReady = "fuzzy", e.report.bernoulli(10912, "fuz"), N.showResult()
			}, function(t) {
				t = t ? "6033" + t : 6000316, N.$els.resultExactMain.html(" "), d.loading("show"), d.loading("zeroGroupTip", {
					errorCode: t,
					keyWord: s
				}), e("#qu-result-exact .qu-result-nav .left-label").html('<span>找到<span id="qu-resultNum">0</span>个直播间</span>'), N.isResultReady = "exact", N.showResult();
				return
			}, function(e, t) {
				t === "timeout" ? N.loadingMask.loading("timeout", {
					bindsName: "data-qu-reload",
					bindsData: "result-search",
					errorCode: 6033666,
					keyWord: s
				}) : N.loadingMask.loading("zeroGroupTip", {
					errorCode: t === "error" ? "6033" + e.status : 5000002,
					keyWord: s
				})
			})
		}, N.showResultMask = function(t) {
			N.loadingMask.loading("show", {
				reShow: !0
			}), N.showSearchInfo(t), e(N.$els.resultMask).on("webkitTransitionEnd", N.maskAnimationEnd), N.isResultReady ? N.$els.resultMask.css("zIndex", "2") : N.$els.resultMask.addClass("slideUp"), N.isResultReady = !1
		}, N.maskAnimationEnd = function() {
			N.isMaskEnd = !0, N.showResult()
		}, N.guaguaScroll = function() {
			var t = !1;
			return {
				show: function() {
					t = !0, e("#qu-result-fuzzy-main").css("overflowY", "hidden"), e("#qu-result-fuzzy-main .recommend-row").css("width", "897px"), e("#qu-result-fuzzy .qu-result-nav").addClass("guagua-result-nav"), e("#qu-searchInfo").html("直播间（首次体验需安装应用）")
				},
				hide: function() {
					t && (t = !1, e("#qu-result-fuzzy-main").css("overflowY", "auto"), e("#qu-result-fuzzy-main .recommend-row").css("width", "894px"), e("#qu-result-fuzzy .qu-result-nav").removeClass("guagua-result-nav"))
				}
			}
		}(), N.showSearchInfo = function(t, n) {
			n ? (N.guaguaScroll.show(), e(".qu-searchInfo").html("直播间（首次体验需安装应用）"), e(".qu-searchInfo").css("color", "#000")) : (N.guaguaScroll.hide(), e(".qu-searchInfo").html("搜索: " + v.escape(t)), e(".qu-searchInfo").css("color", "#686868")), N.isRecommend ? (e(".qu-recommendInfo").show(), e(".qu-searchInfo").hide()) : (e(".qu-recommendInfo").hide(), e(".qu-searchInfo").show()), N.$els.searchInput.val(N.isRecommend ? "" : t), e.inputChangeHandler(), window.setTimeout(function() {
				N.$els.searchInput.focus()
			}, 200)
		}, N.showResult = function(t) {
			if (N.isResultReady == 0 || N.isMaskEnd == 0) return;
			t = t || N.isResultReady, N.$els.resultMask.css("zIndex", ""), N.$els.main.css("visibility", "hidden"), t == "fuzzy" ? (N.$els.resultFuzzy.show(), N.$els.resultExact.hide(), N.addScrollEvent()) : t == "exact" && (N.canShowRecommendVideoGroup ? N.loadVideoGroupRecomend() : N.loadRecommendToDom(4, N.$els.resultRecommend, null, null, null, {
				isGdt: !0
			}), e.report.monitor(2443849), N.$els.resultExact.show(), N.$els.resultFuzzy.hide())
		}, N.hideResult = function(t) {
			N.$els.searchInput.val(""), e.inputChangeHandler(), N.hideFilterAll(), N.removeScrollEvent(), N.$els.main.css("visibility", "visible"), N.$els.resultMask.removeClass("slideUp"), t == "qu-exact" ? (N.$els.resultExact.addClass("slideDown"), setTimeout(function() {
				N.$els.resultExact.hide(), N.$els.resultExact.css("zIndex", ""), N.$els.resultExact.removeClass("slideDown")
			}, 500)) : t == "qu-fuzzy" && (N.$els.resultFuzzy.addClass("slideDown"), setTimeout(function() {
				N.$els.resultFuzzy.hide(), N.$els.resultFuzzy.css("zIndex", ""), N.$els.resultFuzzy.removeClass("slideDown")
			}, 500)), N.cgiPage = 1, N.isResultReady = !1, N.isMaskEnd = !1, e(N.$els.resultMask).off("webkitTransitionEnd", N.maskAnimationEnd)
		}, N.showFilterAll = function() {
			return e("#qu-city-result-all").show()
		}, N.hideFilterAll = function(t) {
			t ? e("#qu-city-result-all").remove() : e("#qu-city-result-all").hide()
		};
		var C = 24,
			k = 167,
			L = 2 * k,
			A = Math.floor(C / 4),
			O = A * k,
			M = 2 * O,
			_ = L;
		return N.scrollEvent = function(t) {
			N.scrollTimer && clearTimeout(N.scrollTimer), N.scrollTimer = setTimeout(function() {
				clearTimeout(N.scrollTimer), N.scrollTimer = null;
				var n = t.target,
					r = e(n).data("isRecommendResultPage") || !1,
					i = e(n).data("allguagua");
				if (!i) {
					if (!N.isPageLoad[N.pageNum] && n.scrollHeight + e("#qu-result-fuzzy-main").height() > e("#qu-carousel-inner").height() - 28) {
						if (n.scrollTop < M) N.loadFuzzyResultToDom(C, null, null, {
							isRecommend: r
						});
						else {
							N.isPageLoad[N.pageNum] = !0;
							if (N.hasMorePage) {
								var s = e("#qu-carousel-inner .item").length;
								N.$els.pageControl.html(S.get(N.pageNum, !1, s)), N.$els.pageControl.removeClass("none"), N.showFilterAll()
							}
						}
						_ += O
					}
				} else if (!N.guagua_isPageLoad[N.guagua_pageNum] && n.scrollHeight + e("#qu-result-fuzzy-main").height() > e("#qu-carousel-inner").height() - 28) {
					if (n.scrollTop < M) N.loadFuzzyGuaGuaResultToDom(C);
					else {
						N.guagua_isPageLoad[N.guagua_pageNum] = !0;
						if (N.guagua_isMorePage) {
							var s = e("#qu-carousel-inner .item").length;
							N.$els.pageControl.html(S.get(N.guagua_pageNum, !1, s)), N.$els.pageControl.removeClass("none")
						}
					}
					_ += O
				}
			}, 500)
		}, N.addScrollEvent = function() {
			N.isAddScrollEvent || (N.isAddScrollEvent = !0, N.$els.resultFuzzyMain.on("scroll", N.scrollEvent))
		}, N.removeScrollEvent = function() {
			N.isAddScrollEvent && (N.$els.resultFuzzyMain.off("scroll", N.scrollEvent), N.isAddScrollEvent = !1)
		}, N.hasMoreGroupRecommend = function() {
			return N.isMoreGroupRecommend
		}, N.show = function() {
			e("#qu").show(), window.setTimeout(function() {
				e("#qu-search-input").focus()
			}, 500)
		}, N.hide = function() {
			e("#qu").hide()
		}, N.showNearby = function() {
			N.$els.groupMap.show(), N.$els.groupMapTit.show(), N.$els.groupMapZone.trigger("qunmap:init")
		}, N.hideNearby = function() {
			N.$els ? (N.$els.groupMap.hide(), N.$els.groupMapTit.hide()) : (e("#qu-result-map").hide(), e("#qun-result-map-tit").hide()), e("#group-map-zone").trigger("qunmap:hide"), e(".icon-nav-up-arrow").show()
		}, N.showSelectCity = function() {
			N.$els.selectCity.show(), e.report.bernoulli(11641, "")
		}, N.hideSelectCity = function() {
			N.$els.selectCity.hide()
		}, e[T] = N
	}), !
	function(e) {
		typeof define == "function" ? define("view", ["$", "./model/lbs", "hybrid.init", "./hybrid", "./widget/ke", "./people", "./qqun", "./model/buddy", "./widget/qiqi", "tools/utils", "tools/cookie", "tools/reportBasic", "tools/info", "tools/native", "tools/tdw"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
		"use strict";
		var v = "view",
			m = {},
			g = c.monitor,
			y = c.monitorAndBer,
			b = e.cookie.uin();
		m.$els = {}, m.nav = function(e) {
			localStorage[b + "_last_tab"] = e.target, m[e.target](e)
		}, m.qqun = function(e) {
			e.search ? (o.show(), o.init(e)) : (o.init(e), o.show()), a.hide(), s.hide(), r.hide(), m.$els.edu && m.$els.edu.hide(), m.$els.livestudio && m.$els.livestudio.hide(), y(280712, 10912, "rec"), d.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "exp"]
			])
		}, m.edu = function(t) {
			m.$els.edu || (m.$els.edu = e("#ke-container")), i.init(t), s.hide(), r.hide(), a.hide(), o.hide(), m.$els.livestudio && m.$els.livestudio.hide(), m.$els.edu.show(), g(280713)
		}, m.edu.preUrl = "", m.livestudio = function(t) {
			var n = document.getElementById("J_navHotCorner");
			n && (n.style.display = "none"), localStorage.setItem("enterNavHot", "1");
			var i = "http://tiantian.qq.com/qiqiclient/tab.html";
			m.$els.livestudio || (m.$els.livestudio = e("#livestudio")), s.hide(), r.hide(), a.hide(), o.hide(), m.$els.edu && m.$els.edu.hide();
			if (m.livestudio.preUrl === i) {
				m.$els.livestudio.show(), c.monitor(280713);
				return
			}
			m.$els.qiqiIframe && m.$els.qiqiIframe.hide(), m.$els.qiqiIframe ? (m.$els.qiqiIframe.attr({
				src: i
			}).load(function() {
				m.$els.qiqiIframe.show()
			}), m.livestudio.preUrl = i) : (m.$els.qiqiIframe = e("<iframe />").attr({
				id: "qiqi-main",
				src: i,
				frameborder: 0,
				hspace: 0,
				sandbox: "allow-scripts allow-same-origin allow-popups"
			}).css({
				width: "100%",
				height: "100%"
			}).appendTo("#livestudio"), m.livestudio.preUrl = i), m.$els.livestudio.show(), m.$els.qiqiIframe.show(), g(280713)
		}, m.livestudio.preUrl = "";
		var w = !1;
		return m.hybrid = function(i) {
			w || (n.init(), w = !0), r.init(i), t.init(), h.init(), m.$els.edu && m.$els.edu.hide(), m.$els.livestudio && m.$els.livestudio.hide(), s.hide(), a.hide(), o.hide(), r.show(), i.keyword !== "腾讯外卖" && (y(355977, 10833, "pv"), window.setTimeout(function() {
				h.getInfo(function(t) {
					e.report.bernoulli(11402, "0^" + t.reportp2c + "^")
				})
			}, 50))
		}, m.people = function(e) {
			t.init(), h.init(), s.init(e), r.hide(), o.hide(), a.hide(), m.$els.edu && m.$els.edu.hide(), m.$els.livestudio && m.$els.livestudio.hide(), y(280703, 10862, "pv")
		}, e[v] = m
	}), define("tmpl!template/activity315.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += "", __p += '\r\n\r\n\r\n<div id="hy-activity315" hidden="">\r\n    <div class="container" style="position: relative;">\r\n        <div class="hy-subcategory">\r\n            <div class="back-home" data-coupon-cmd="close" data-overlay="hybrid"\r\n                 data-current="tak"><i class="btn-arrow-back"></i> 返回\r\n            </div>\r\n            <div class="takeOut_title">\r\n                免费维权 就查找\r\n            </div>\r\n        </div>\r\n        <div class="content-container">\r\n            <div class="lawyer-topic">\r\n                <div class="header-banner">\r\n                    <div class="showCount">全国累积咨询人数</div>\r\n                    <div class="count"></div>\r\n                    <div class="renshu"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>\r\n                </div>\r\n                <div class="cases-con">  <span class="title-vertical-line"></span><span class="s1">专家推荐</span><span class="qgmfzx s2">资深律师全国免费咨询</span>\r\n                </div>\r\n                <div class="lawyer-content">\r\n\r\n                    <div class="lawyer-content-left">\r\n                        ';
				for (var key in cases) __p += '\r\n                            <div class="cases">\r\n                            <p class="wyts"><span>网友：</span><span>' + ((__t = cases[key].defendant) == null ? "" : __t) + "</span><span>投诉</span><span>" + ((__t = cases[key].complainant) == null ? "" : __t) + '</span></p>\r\n                            <p class="banner">' + ((__t = cases[key].
			case) == null ? "" : $.escape(__t)) + '</p>\r\n                            <div class="vote">\r\n                                <a href="###"\r\n                                   data-obj="' + ((__t = key + 1) == null ? "" : __t) + '"\r\n                                   data-report-id="11896"\r\n                                   caseid="' + ((__t = cases[key].id) == null ? "" : __t) + '"\r\n                                   class="' + ((__t = cases[key].yesclass) == null ? "" : __t) + '"\r\n                                   id="vote-yes">\r\n                                    <i class="icon-qq-kl"></i>\r\n                                    同情你!<span>(<span class="votespan">' + ((__t = cases[key].yes) == null ? "" : __t) + '</span>)</span>\r\n                                </a>\r\n                                <a href="###"\r\n                                   data-obj="' + ((__t = key + 1) == null ? "" : __t) + '"\r\n                                   data-report-id="11897"\r\n                                   caseid="' + ((__t = cases[key].id) == null ? "" : __t) + '"\r\n                                   class="' + ((__t = cases[key].noclass) == null ? "" : __t) + '"\r\n                                   id="vote-no">\r\n                                    <i class="icon-qq-fn"></i>\r\n                                    投诉他!<span>(<span class="votespan">' + ((__t = cases[key].no) == null ? "" : __t) + '</span>)</span>\r\n                                </a>\r\n                            </div>\r\n                            <div class="line">&nbsp;</div>\r\n                            <p class="layer-adv">\r\n                                <a\r\n                                    data-prefix="hy"\r\n                                    data-type="sellerv2"\r\n                                    data-iden="nick"\r\n                                    data-open-' + ((__t = cases[key].type === 0 ? "sellerv2" : "sellerent") == null ? "" : __t) + '="' + ((__t = cases[key].uin) == null ? "" : __t) + '"\r\n                                    data-name-account="' + ((__t = cases[key].nameAccount) == null ? "" : __t) + '"\r\n                                    data-uin="' + ((__t = cases[key].uin) == null ? "" : __t) + '"\r\n                                    data-obj="' + ((__t = key + 1) == null ? "" : __t) + '"\r\n                                    data-report-id="11898"\r\n                                    class="lawyer-name" href="###">\r\n                                    ' + ((__t = cases[key].company) == null ? "" : __t) + '\r\n                                </a> 建议</p>\r\n                            <p class="banner">' + ((__t = cases[key].suggest) == null ? "" : $.escape(__t)) + "</p>\r\n                            </div>\r\n                        ";
				__p += '\r\n                    </div>\r\n\r\n                    <div class="lawyer-content-right">\r\n                        <ul class="tabcon">\r\n                            ';
				for (var key in cases) __p += '\r\n                            <li>\r\n                                <a href="###"\r\n                                   data-prefix="hy"\r\n                                   data-type="sellerv2"\r\n                                   data-iden="nick"\r\n                                   data-open-' + ((__t = cases[key].type === 0 ? "sellerv2" : "sellerent") == null ? "" : __t) + '="' + ((__t = cases[key].uin) == null ? "" : __t) + '"\r\n                                    data-name-account="' + ((__t = cases[key].nameAccount) == null ? "" : __t) + '"\r\n                                    data-uin="' + ((__t = cases[key].uin) == null ? "" : __t) + '"\r\n                                    data-obj="' + ((__t = key + 1) == null ? "" : __t) + '"\r\n                                    data-report-id="11899"\r\n                                 >\r\n                                    <img src="' + ((__t = cases[key].picture) == null ? "" : __t) + '" alt="', key, __p += '" title="' + ((__t = cases[key].introduce) == null ? "" : __t) + '"/>\r\n                                </a>\r\n                                <div class="tabcon-mask">\r\n                                    <p class="p1"><span>' + ((__t = cases[key].lawer) == null ? "" : __t) + '</span>|<span  class="q2"> ' + ((__t = cases[key].company) == null ? "" : __t) + '</span>\r\n                                        <a href="###"\r\n                                          data-obj="' + ((__t = key + 1) == null ? "" : __t) + '"\r\n                                          data-report-id="12009"\r\n                                          data-prefix="hy"\r\n                                          data-iden="talk"\r\n                                          data-type="' + ((__t = cases[key].type === 0 ? "sellerv2" : "sellerEnt") == null ? "" : __t) + '"\r\n                                          data-open-session="' + ((__t = cases[key].type === 0 ? cases[key].wpa_ck : cases[key].kfuin) == null ? "" : __t) + '"\r\n                                          class="rightnow">立即咨询>></a>\r\n                                   </p>\r\n                                    <p class="p2">' + ((__t = cases[key].introduce) == null ? "" : __t) + "</p>\r\n                                </div>\r\n\r\n                            </li>\r\n                            ";
				__p += '\r\n                        </ul>\r\n                        <ul class="tabnav">\r\n                            ';
				for (var key in cases) __p += "\r\n                            <li>\r\n                                ", key == 0 ? __p += '\r\n                                   <span class="headermaskcur">\r\n                                ' : __p += "\r\n                                    <span>\r\n                                ", __p += '\r\n                                    &nbsp;</span>\r\n                                    <a href="###"><img src="' + ((__t = cases[key].picture) == null ? "" : __t) + '" alt="', key, __p += '"/></a></li>\r\n                                </li>\r\n                            ';
				__p += '\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div class="showFirm">\r\n                    <span class="title-vertical-line"></span>\r\n                    律师团\r\n                    <span class="qgmfzx">更多律师为您服务</span>\r\n                    <span class="line2">&nbsp;</span>\r\n                    ', moreLawyers && (__p += '\r\n                        <a href="###"\r\n                           data-nav="hybrid"\r\n                           data-search="律师"\r\n                           data-keyword="律师"\r\n                           data-report-id="11904"\r\n                            >\r\n                            更多\r\n                        </a>\r\n                    '), __p += '\r\n\r\n                    <ul class="qu-re-group">\r\n                        ', $.each(lawyers, function(i, value) {
					__p += "\r\n                        ";
					var dataPrefix = "hy",
						dataObj = "law";
					__p += "\r\n                        ", value.dataPrefix = dataPrefix, value.dataObj = dataObj, __p += '\r\n\r\n                        <li>\r\n                            <a class="group-icon" href="javascript: void(0);"\r\n                               data-classification="manu"\r\n                               data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n                               data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                               data-iden="avatar"\r\n                               data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n                               data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                               data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n                               data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n                               data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n                               data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n                               data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n                               data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n                               data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n                               data-report-id="11901"\r\n                               data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n                            >\r\n                            <img src="' + ((__t = value.avatar) == null ? "" : __t) + '"\r\n                                 alt="律师头像" />\r\n                            </a>\r\n                            <div class="group-info">\r\n\r\n                                <p class="group-name"\r\n                                   title="' + ((__t = value.originalName) == null ? "" : __t) + '"\r\n                                   data-iden="nick"\r\n                                   data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                                   data-special-source-type="' + ((__t = value.specialSourceType) == null ? "" : __t) + '"\r\n                                   data-report-tag="' + ((__t = value.reportTag) == null ? "" : __t) + '"\r\n                                   data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n                                   data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                                   data-seller-id-counter="' + ((__t = value.sellerIDCounter || "") == null ? "" : __t) + '"\r\n                                   data-profile-card-type="' + ((__t = value.profileCardType) == null ? "" : __t) + '"\r\n                                   data-jumpurl="' + ((__t = value.jumpurl) == null ? "" : __t) + '"\r\n                                   data-reporturl="' + ((__t = value.reporturl) == null ? "" : __t) + '"\r\n                                   data-open-' + ((__t = value.type) == null ? "" : __t) + '="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n                                    data-source="' + ((__t = value.dataSource) == null ? "" : __t) + '"\r\n                                    data-report-id="11902"\r\n                                    data-classification="manu"\r\n                                    data-uin="' + ((__t = value.kfuin) == null ? "" : __t) + '"\r\n                                    data-name="' + ((__t = value.name) == null ? "" : __t) + '">\r\n\r\n                                ' + ((__t = value.nick) == null ? "" : __t) + "\r\n\r\n                                " +
					function(obj) {
						var __t, __p = "",
							__j = Array.prototype.join,
							print = function() {
								__p += __j.call(arguments, "")
							};
						with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
						return __p
					}() + '\r\n                                </p>\r\n                                <p class="group-desc two-line" title="' + ((__t = value.originalSign) == null ? "" : __t) + '">\r\n                                    ' + ((__t = value.sign) == null ? "" : __t) + "\r\n                                </p>\r\n\r\n                                ";
					var dataPrefix = "hy",
						dataObj = "law";
					__p += "\r\n\r\n                                <div>\r\n                                    ", value.wpa_ck || value.ck ? __p += '\r\n                                        <a class="btn-seller-chat-online"\r\n                                           title="咨询"\r\n                                           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                                           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n                                           data-iden="talk"\r\n                                           data-report-id="11903"\r\n                                           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                                           data-open-session="' + ((__t = value.wpa_ck || value.ck) == null ? "" : __t) + '">\r\n                                        </a>\r\n                                    ' : value.type === "sellerEnt" && (__p += '\r\n                                        <a class="btn-seller-chat-online"\r\n                                           title="咨询"\r\n                                           data-iden="talk"\r\n                                           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n                                           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n                                           data-prefix="' + ((__t = value.dataPrefix) == null ? "" : __t) + '"\r\n                                           data-report-id="11903"\r\n                                           data-open-session="' + ((__t = value.kfuin) == null ? "" : __t) + '">\r\n                                        </a>\r\n                                    '), __p += "\r\n\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                        "
				}), __p += '\r\n                    </ul>\r\n                </div>\r\n\r\n                <div class="showFirm">\r\n                    <span class="title-vertical-line"></span>加入维权群\r\n                    <span class="qgmfzx">看看大家都在说什么</span>\r\n                    <span class="line2 line3">&nbsp;</span>\r\n                    ', moreGroups && (__p += '\r\n                        <a href="###"\r\n                           data-nav="qqun"\r\n                           data-search="律师"\r\n                           data-keyword="律师"\r\n                           data-report-id="11909"\r\n                            >\r\n                            更多\r\n                        </a>\r\n                    '), __p += '\r\n\r\n                    <ul class="qu-re-group">\r\n                        ', $.each(groups, function(e, t) {
					__p += '\r\n\r\n                        <li>\r\n                            <a class="group-icon"\r\n                               data-prefix="qu"\r\n                               data-iden="avatar"\r\n                               data-head="' + ((__t = t.avatar) == null ? "" : __t) + '"\r\n                               data-bitmap="' + ((__t = t.bitmap) == null ? "" : __t) + '"\r\n                               title="加入法律群咨询"\r\n                               data-report-id="11905"\r\n                               data-open-group="' + ((__t = t.code) == null ? "" : __t) + '"\r\n                               data-owneruin="' + ((__t = t.owner_uin) == null ? "" : __t) + '"\r\n                               data-groupoption="' + ((__t = t.flag) == null ? "" : __t) + '"\r\n                               data-groupid = "' + ((__t = t.groupId) == null ? "" : __t) + '"\r\n                               data-groupclass="' + ((__t = t.class) == null ? "" : __t) + '"\r\n                               data-grouplevel="' + ((__t = t.level) == null ? "" : __t) + '"\r\n                               data-membnum="' + ((__t = t.member_num) == null ? "" : __t) + '"\r\n                               data-membmaxnum="' + ((__t = t.max_member_num) == null ? "" : __t) + '"\r\n                               data-groupname="' + ((__t = t.name) == null ? "" : __t) + '"\r\n                               data-qu-region="recomgrp"\r\n                            >\r\n                            <img src="' + ((__t = t.avatar) == null ? "" : __t) + '"\r\n                                 data-classification="' + ((__t = t.isGuaGua ? "guagua" : "qqun") == null ? "" : __t) + '"\r\n                                 alt="群头像" />\r\n                            </a>\r\n                            <div class="group-info">\r\n                                ';
					if (t.auth) {
						__p += "\r\n\r\n                                ";
						var n = "group-position icon-authentication-group",
							r = "腾讯机构认证群";
						t.certificate_type && t.certificate_type == 1 && (n = "group-position icon-authentication-user", r = "腾讯个人认证群"), __p += '\r\n                                <a class="' + ((__t = n) == null ? "" : __t) + '"\r\n                                   title="' + ((__t = r) == null ? "" : __t) + '"\r\n                                   target="_blank"\r\n                                   href="http://qun.qq.com/renzheng.html"\r\n                                    ></a>\r\n                                '
					}
					__p += '\r\n                                <p class="group-name ' + ((__t = t.auth ? "nick-after-icon group-position-padding" : "") == null ? "" : __t) + '"\r\n                                    data-prefix="qu"\r\n                                    data-report-id="11906"\r\n                                    title="' + ((__t = t.originName) == null ? "" : __t) + '"\r\n                                    data-iden="nick"\r\n                                    data-head = "' + ((__t = t.avatar) == null ? "" : __t) + '"\r\n                                    data-bitmap = "' + ((__t = t.bitmap) == null ? "" : __t) + '"\r\n                                    data-open-group="' + ((__t = t.code) == null ? "" : __t) + '"\r\n                                    data-owneruin="' + ((__t = t.owner_uin) == null ? "" : __t) + '"\r\n                                    data-groupoption="' + ((__t = t.flag) == null ? "" : __t) + '"\r\n                                    data-groupid = "' + ((__t = t.groupId) == null ? "" : __t) + '"\r\n                                    data-groupclass="' + ((__t = t.class) == null ? "" : __t) + '"\r\n                                    data-grouplevel="' + ((__t = t.level) == null ? "" : __t) + '"\r\n                                    data-membnum="' + ((__t = t.member_num) == null ? "" : __t) + '"\r\n                                    data-membmaxnum="' + ((__t = t.max_member_num) == null ? "" : __t) + '"\r\n                                    data-groupname="' + ((__t = t.originName) == null ? "" : __t) + '"\r\n                                    data-qu-region="recomgrp"\r\n                                >\r\n\r\n                                ' + ((__t = t.name) == null ? "" : __t) + '\r\n                                </p>\r\n                            <p class="group-desc" title="' + ((__t = t.memo) == null ? "" : __t) + '">\r\n                                ', !t.memo && t.member_num ? __p += '\r\n                                <i class="icon-group"></i>' + ((__t = t.member_num) == null ? "" : __t) + "人\r\n                                " : __p += "\r\n                                " + ((__t = t.memo) == null ? "" : __t) + "\r\n                                ", __p += '\r\n                            </p>\r\n\r\n                            <p class="group-num"><i class="icon-group"></i>' + ((__t = t.member_num) == null ? "" : __t) + "</p>\r\n\r\n                            ";
					var i = "hy",
						s = "law";
					__p += '\r\n                            <span class="add-group-btn-container">\r\n                                <a class="add-group-plus"\r\n                                   title="加入该群"\r\n                                   data-prefix="' + ((__t = i) == null ? "" : __t) + '"\r\n                                   data-report-id="11907"\r\n                                   data-obj="' + ((__t = s) == null ? "" : __t) + '"\r\n                                    ' + ((__t = t.rl ? "data-group-gdt=" + t.code : "") == null ? "" : __t) + '\r\n                                    data-isGdt="' + ((__t = t.isGdt ? true : false) == null ? "" : __t) + '"\r\n                                    data-add-group="' + ((__t = t.code) == null ? "" : __t) + '"\r\n                                    data-qu-region="recomgrp"\r\n                                    >\r\n                                    <i class="icon-add-group-plus"></i>加群\r\n                                </a>\r\n                            </span>\r\n                        </div>\r\n                    </li>\r\n                '
				}), __p += '\r\n            </ul>\r\n            </div>\r\n\r\n            <div class="bottom-bar">\r\n                ', __p += '\r\n                <span><a href="http://www.qq.com"\r\n                         data-open-session="800051315"\r\n                         data-type="sellerEnt"\r\n                         data-account="800051315"\r\n                         data-report-id="11911"\r\n                         target="_blank"\r\n                         >向媒体爆料</a></span>\r\n                <span><a href="http://www.315.gov.cn"\r\n                         data-report-id="11910"\r\n                         target="_blank">315官方网址</a></span>\r\n                <span>投诉电话:12315</span>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>'
			}
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/activity315", ["../$", "../hybrid", "../model/group", "../model/seller", "tmpl!../template/activity315.html", "tools/native", "tools/cookie", "tools/reportBasic"], e) : e($)
	}(function(e, t, n, r, i, s, o, u) {
		function l() {
			function f(e) {
				e < 3 && (n.removeClass("headermaskcur").eq(e).addClass("headermaskcur"), r.eq(e).stop(!0, !0).slideDown("slow").siblings().slideUp("slow"), i.eq(e).stop(!0, !0).slideDown("slow").siblings().slideUp("slow"))
			}
			var t = e(".tabnav li"),
				n = e(".tabnav span"),
				r = e(".tabcon li"),
				i = e(".cases"),
				s = 0,
				o = t.length,
				a = null;
			t.mouseenter(function() {
				var t = e(this).index();
				f(t), u.bernoulli(11900, t + 1)
			})
		}
		function c() {
			var t = function() {
					var n = Math.floor(Math.ceil((new Date - 13941e8) / 395 + Math.random() * 3));
					e(".count").html(n), clearTime = setTimeout(t, 3e3)
				};
			t()
		}
		function p() {
			var t = window.localStorage;
			e(".vote").find("a").click(function() {
				var n = e(this).attr("caseid"),
					r = e(this).attr("id"),
					i = "yes",
					s;
				r == "vote-no" && (i = "no"), s = h + (n + i);
				if (!t.getItem(s)) {
					t.setItem(s, s);
					var o = e(this).find(".votespan").html();
					d(i, n), e(this).find(".votespan").html(parseInt(o) + 1), e(this).addClass("gray")
				}
			})
		}
		function d(t, n) {
			e.utils.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/subject/lawer/" + t + "?",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				data: {
					caseid: n
				},
				error: function(e, t, n) {},
				success: function(e, t, n) {}
			})
		}
		var a = {},
			f = [],
			h = o.uin();
		return a.loadData = function() {
			t = t || e.hybrid, t.MaskLoading.loading("hide"), t.MaskLoading.loading("show", {
				status: "search"
			}), e.utils.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/subject/lawer/query",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				data: {
					id: ""
				},
				error: function(e, n, r) {
					t.$els.loadingMask.loading("hySearchError", {
						errorCode: 0,
						keyWord: "315维权专题"
					}), t.$els.loadingMask.find(".loading").show()
				},
				success: function(e, s, o) {
					if (e && e.retcode == 0 && e.cases) {
						var u = [],
							c = [],
							p = 0,
							d = 0;
						f = e.cases, u = e.groups, c = e.lawers, p = e.moreGroups, d = e.moreLawers, u.length > 3 && (u.length = 3), c.length > 6 && (c.length = 6), u.forEach(function(e, t, r) {
							r[t] = n.processData(e)
						}), c.forEach(function(e, t, n) {
							n[t] = r.processData(e)
						});
						var v = window.localStorage;
						for (var m = 0; m < f.length; m++) {
							var g = h + (f[m].id + "yes"),
								y = h + (f[m].id + "no");
							v.getItem(g) ? f[m].yesclass = "gray" : f[m].yesclass = "", v.getItem(y) ? f[m].noclass = "gray" : f[m].noclass = ""
						}
						var b = i({
							cases: f,
							groups: u,
							lawyers: c,
							moreGroups: p,
							moreLawyers: d
						});
						a.render(b), l(f)
					} else t.$els.loadingMask.loading("hySearchError", {
						errorCode: 0,
						keyWord: "腾大专题"
					}), t.$els.loadingMask.find(".loading").show()
				}
			}), t.$els.fuzzy.hide(), t.$els.accurate.hide(), t.isSearchResultLayerDisplay ? t.$els.loadingMask.show() : (t.$els.loadingMask.css({
				"z-index": "2"
			}).show(), t.isSearchResultLayerDisplay = !0)
		}, a.render = function(n) {
			if (!t.isSearchResultLayerDisplay) {
				setTimeout(function() {
					a.render(n)
				}, 100);
				return
			}
			e("#hy-activity315").length > 0 && e("#hy-activity315").remove(), e("#hy-main").append(n), t.$els.loadingMask.hide(), e("#hy-activity315").show(), a.bindHandler(), e.report.bernoulli(12010)
		}, a.bindHandler = function() {
			var n = e("#hy-activity315");
			c(), p(), n.on("click", '[data-coupon-cmd="close"]', function(n) {
				var r = e("#hy-activity315");
				t.isSearchResultLayerDisplay = !1, t.$els.loadingMask.hide(), t.$els.fuzzy.hide(), t.$els.accurate.hide(), e("#hy-recommend").show(), e("#hy-free-activities").hide(), r.animate({
					top: "445px"
				}, {
					duration: "fast",
					easing: "swing",
					complete: function() {
						r.hide(), r.css({
							"z-index": "0",
							top: 0
						})
					},
					queue: !1
				}), n.preventDefault(), t.userTrack = 0
			}), n.on("click", "[data-report-id]", function(t) {
				var n = e(this),
					r = n.data("report-id"),
					i = n.data("obj");
				i ? u.bernoulli(r) : u.bernoulli(r, i)
			})
		}, a
	}), define("tmpl!template/singleSubjectSeller.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<li class="seller-item" ' + ((__t = value.source == 1 || value.source == 3 ? "data-open-sellerent" : "data-open-sellerv2") == null ? "" : __t) + '\r\n    data-type="sellerv2" title="点击查看商家信息"\r\n    data-name-account="' + ((__t = value.nameAccount) == null ? "" : __t) + '"\r\n    data-uin="' + ((__t = value.uin) == null ? "" : __t) + '"\r\n    data-obj-type="photo">\r\n    <div class="image-wrapper">\r\n        <img src="' + ((__t = value.pic_url) == null ? "" : __t) + '">\r\n        <div class="outline"></div>\r\n        ', value.pic_desc && (__p += '\r\n        <div class="bottom-mask" title="' + ((__t = value.pic_desc) == null ? "" : __t) + '">\r\n            ' + ((__t = value.pic_desc) == null ? "" : $.escape(__t)) + "\r\n        </div>\r\n        "), __p += '\r\n    </div>\r\n    <div class="seller-msg">\r\n        <div class="outline"></div>\r\n        <div class="line1">\r\n          ', __p += '\r\n            <a class="seller-name" href="#" title="' + ((__t = value.name) == null ? "" : __t) + '">' + ((__t = value.name) == null ? "" : $.escape(__t)) + '</a>\r\n\r\n        </div>\r\n        <div class="line2">\r\n            <div class="recomm_wording">' + ((__t = value.desc) == null ? "" : $.escape(__t)) + "</div>\r\n            ", value.wpa_ck ? __p += '\r\n                <div class="btn-large-seller-chat" data-open-session="' + ((__t = value.wpa_ck) == null ? "" : __t) + '" data-type="sellerv2" data-prefix="hy" title="点击咨询"  data-obj-type="wpa"></div>\r\n            ' : value.source == 1 && (__p += '\r\n                <div class="btn-large-seller-chat" data-open-session="' + ((__t = value.uin) == null ? "" : __t) + '" data-type="sellerEnt" title="点击咨询"  data-obj-type="wpa"></div>\r\n            '), __p += "\r\n        </div>\r\n\r\n    </div>\r\n    ", value.is_hot == 1 && (__p += '<div class="hot_mask"></div>'), __p += "\r\n</li>\r\n";
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/subject", ["../$", "../hybrid", "tmpl!../template/singleSubjectSeller.html", "tools/info", "tools/utils"], e) : e($)
	}(function(e, t, n, r, i) {
		var s = {
			els: {
				mask: e("#subject-mask"),
				title: e(".subject-mask-title"),
				content: e(".subject-mask-content")
			}
		};
		return s.loadData = function(n, r) {
			var s = {
				special: n
			};
			t = t || e.hybrid, t.MaskLoading.loading("hide"), t.MaskLoading.loading("show", {
				status: "search"
			}), t.MaskLoading.show(), i.request({
				type: "POST",
				url: "http://cgi.find.qq.com/qqfind_attach/activity/special",
				dataType: "json",
				data: s,
				error: function(e, t, n) {
					var r;
					t === "timeout" ? r = 6011666 : t === "error" ? (r = "6011", r += e.status) : r = 5000002, this.success({
						retcode: r
					})
				},
				success: function(e) {
					if (e && e.result && e.result.biz && e.result.biz.length) {
						var n = e.result.biz[0] && e.result.biz[0].special_name || "专题活动";
						t.MaskLoading.hide(), t.MaskLoading.loading("hide"), r && r({
							retcode: 0,
							list: e.result.biz,
							title: n
						})
					} else r && r({
						retcode: 10001
					})
				}
			})
		}, s.showContent = function(e, t) {
			s.loadData(e, function(e) {
				if (e.retcode) t && t();
				else {
					var r = "";
					for (var i in e.list) r += n({
						value: s.processData(e.list[i])
					});
					s.els.content.html(r), s.setTitle(e.title), s.els.mask.show()
				}
			})
		}, s.processData = function(e) {
			return e.uin = e.uin || e.others_id || "", e.nameAccount = e.nameAccount || e.kfuin || "", e.name = e.name || e.cs || "", e.desc = e.desc || "", e.pic_url = encodeURI(e.pic_url) || "", e.is_hot = e.is_hot || 0, e.wpa_ck && (e.wpa_ck += "&showUserName=" + i.encodeBase64(e.name)), e
		}, s.hide = function() {
			s.mask.hide(), s.setTitle(""), s.els.content.html("")
		}, s.setTitle = function(e) {
			s.els.title.html(e)
		}, s
	}), !
	function(e) {
		typeof define == "function" ? define("helper/subjectEntrance", ["../$", "../hybrid", "../widget/activities", "../widget/activity315", "../widget/qiqi", "../widget/subject", "tools/tdw"], e) : e($)
	}(function(e, t, n, r, i, s, o) {
		var u = {};
		return u.open = function(u) {
			t = t || e.hybrid, e("#hy-free-activities").hide(), e(".qiqi-room", "#hy-main").hide(), e("#hy-activity315").hide(), e("#subject-mask").hide();
			if (u && u.subjectName) switch (u.subjectName) {
			case "activity315":
				r.loadData();
				break;
			case "scActivity":
				n.loadData();
				break;
			case "qiqiRoom":
				i.loadData("hybrid"), e.report.bernoulli(11564), o.reportTdw("pf00191", ["module", "action", "obj1"], [
					["guagua_find", "clickhotword", 11100]
				]);
				break;
			default:
				s.showContent(u.subjectName, function() {
					u.keyword ? t.search(u.keyword) : (t.MaskLoading.loading("hySearchZeroSameCity"), t.MaskLoading.show())
				})
			}
		}, window.subjectEntrance = u
	}), define("tmpl!template/confirmDialog.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) __p += '<div class="dialog">\r\n    <div class="dialog-wrapper mini">\r\n        <div class="dialog-header">\r\n            <p><i class="icon-qq"></i> 提示</p>\r\n            <a href="#" title="关闭" id="confirm-dialog-close">×</a>\r\n        </div>\r\n        <div class="dialog-body">\r\n            <div class="left"><i class="icon-big-alert"></i></div>\r\n            <div class="right"><span>您的QQ目前处于离线状态，请先登录后再使用QQ查找。</span>\r\n            </div>\r\n        </div>\r\n        <div class="dialog-footer">\r\n            <a href="#" title="确定" id="confirm-dialog-ok"> 确定 </a>\r\n        </div>\r\n    </div>\r\n</div>';
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/confirm", ["../$", "tmpl!../template/confirmDialog.html"], e) : e($)
	}(function(e, t) {
		"use strict";

		function i(n, i, s) {
			function o() {
				r.cancelButton.off(), r.closeButton.off(), r.okButton.off()
			}
			i || (i = n), s || (s = n), r.el = e("#confirm-dialog"), r.el.html(t()), r.cancelButton = e("#confirm-dialog-cancel"), r.okButton = e("#confirm-dialog-ok"), r.closeButton = e("#confirm-dialog-close"), r.cancelButton.on("click", function(e) {
				r.el.hide(), i(), e.preventDefault(), e.stopPropagation(), o()
			}), r.closeButton.on("click", function(e) {
				r.el.hide(), s(), e.preventDefault(), e.stopPropagation(), o()
			}), r.okButton.on("click", function(e) {
				r.el.hide(), n(), e.preventDefault(), e.stopPropagation(), o()
			}), r.el.show()
		}
		var n = "confirm",
			r = {};
		return e[n] = i
	}), define("tmpl!template/sellerMapInfo.html", [], function() {
		return function(obj) {
			var __t, __p = "",
				__j = Array.prototype.join,
				print = function() {
					__p += __j.call(arguments, "")
				};
			with(obj || {}) {
				__p += '<div class="seller-map-info">\r\n    <div class="seller-map-info-name" title="' + ((__t = value.nick) == null ? "" : __t) + '"><span>' + ((__t = value.nick) == null ? "" : $.escape(__t)) + "</span>", value.authIcon || (__p += "" +
				function(obj) {
					var __t, __p = "",
						__j = Array.prototype.join,
						print = function() {
							__p += __j.call(arguments, "")
						};
					with(obj || {}) __p += "", value && value.isSellerEntAuth ? __p += '\n<a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n		data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n<a href="http://b.qq.com/crm/a115.html"\n        target="_blank"\n        class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "qiye"\n        title="营销QQ用户"><i class="icon-certification"></i></a>\n' : value && value.licenceAuth ? __p += '\n    <a\n        class="auth-icon-name"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item15"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "yingye"\n        title="营业执照已认证"><i class="icon-licence-auth"></i></a>\n' : __p += '\n    <a class="auth-icon-name"\n        data-open-href="true"\n        data-obj="10520"\n        data-str-value = "caifutong"\n        title="个人身份已认证"\n        target="_blank"\n        href="http://shang.qq.com/help.php#item14"><i class="icon-tenpay-auth"></i></a>\n', __p += "\n";
					return __p
				}() + ""), __p += '</div>\r\n    <div class="seller-map-info-address" title="' + ((__t = value.address) == null ? "" : __t) + '">' + ((__t = value.address) == null ? "" : $.escape(__t)) + '</div>\r\n    <div class="seller-map-info-chat-container">\r\n        ';
				var btnStyle = "btn-seller-chat-online";
				value.onlineFlag ? btnStyle = "btn-seller-chat-online" : btnStyle = "btn-seller-chat-offline", __p += "\r\n        ", value.ck ? (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-iden="talk"\r\n           data-prefix="hy"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-obj="fuz"\r\n           data-open-session="' + ((__t = value.ck) == null ? "" : __t) + '"></a>\r\n        ') : value.type === "sellerEnt" && (__p += '\r\n        <a class="' + ((__t = btnStyle) == null ? "" : __t) + '" title="', value.onlineFlag ? __p += "立即咨询" : __p += "给我留言", __p += '"\r\n           data-iden="talk"\r\n           data-online="' + ((__t = value.onlineFlag) == null ? "" : __t) + '"\r\n           data-type="' + ((__t = value.type) == null ? "" : __t) + '"\r\n           data-obj="fuz"\r\n           data-open-session="' + ((__t = value.uin) == null ? "" : __t) + '"></a>\r\n        '), __p += "\r\n    </div>\r\n</div>"
			}
			return __p
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/hybrid.result.sosoMap", ["../$", "./sosoMap.init", "tmpl!template/sellerMapInfo.html"], e) : e($)
	}(function(e, t, n) {
		var r = {
			isInit: !1,
			isDomInited: !1,
			dom: null,
			map: null,
			lastMaker: null,
			labelDom: null
		};
		return r.init = function(e) {
			if (r.isInit) return;
			t.init(function() {
				r.initDom(), r.isInit = !0, e && e()
			})
		}, r.initDom = function() {
			if (r.isDomInited) return;
			var t = document.createElement("section");
			t.setAttribute("id", "qun-soso-map-container"), e("body").append(t), r.dom = e(t), r.map = new soso.maps.Map(t, {
				mapTypeControlOptions: {
					position: soso.maps.ControlPosition.BOTTOM_RIGHT
				}
			}), r.map.zoomTo(16), e("<div/>", {
				"data-qun-soso-map-close": 1,
				"class": "qun-soso-map-close",
				html: '<i class="btn-close"></i>'
			}).appendTo(t), r.isDomInited = !0
		}, r.panTo = function(t, n, i) {
			if (!r.isInit) {
				r.init(function() {
					r.panTo(t, n, i)
				});
				return
			}
			var s = new soso.maps.LatLng(t, n);
			r.map.panTo(s), r.map.zoomTo(16), r.lastMaker && r.lastMaker.setMap(null);
			var o = new soso.maps.Point(7, 33),
				u = new soso.maps.Size(13, 33),
				a = new soso.maps.Point(0, 0),
				f = new soso.maps.MarkerImage("http://s.url.cn/qqfind/img/red-pin.png", u, a, o);
			r.lastMaker = new soso.maps.Marker({
				position: s,
				map: r.map
			}), i && i.uin && r.lastMaker.setIcon(f), r.dom.show(), i = i || {}, i.latLng = s, i && i.uin && r.showSellerInfo(i), e(".page-mask").show()
		}, r.panByCity = function(t, n) {
			if (!r.isInit) {
				r.init(function() {
					r.panByCity(t, n)
				});
				return
			}
			var i = new soso.maps.Point(7, 33),
				s = new soso.maps.Size(13, 33),
				o = new soso.maps.Point(0, 0),
				u = new soso.maps.MarkerImage("http://s.url.cn/qqfind/img/red-pin.png", s, o, i),
				a = new soso.maps.CityService({
					complete: function(t) {
						r.map.setCenter(t.detail.latLng), r.map.zoomTo(11), r.lastMaker && r.lastMaker.setMap(null), r.lastMaker = new soso.maps.Marker({
							map: r.map,
							position: t.detail.latLng
						}), n && n.uin && r.lastMaker.setIcon(u), r.dom.show(), e(".page-mask").show()
					},
					error: function() {
						r.hide()
					}
				});
			a.searchCityByName(t)
		}, r.hide = function() {
			r.dom.hide(), r.labelDom && r.labelDom.hide(), e(".page-mask").hide()
		}, r.showSellerInfo = function(t) {
			var i = function(e) {
					qq.maps.Overlay.call(this, e)
				},
				s = null;
			i.prototype = new qq.maps.Overlay, i.prototype.construct = function() {
				this.dom = document.createElement("div"), this.dom.style.cssText = "background:rgba(255,255,255,0.8);position:absolute;text-align:center;width:220px;border-radius:4px;margin-left:-110px;border:1px solid #5B5B5B", this.dom.innerHTML = '<i class="icon-down-triangle"></i><i class="btn-map-seller-close"></i> ';
				var i = this.dom;
				r.labelDom = e(this.dom), r.labelDom.append(n({
					value: t
				})), this.getPanes().overlayMouseTarget.appendChild(this.dom), r.labelDom.css({
					marginTop: "-" + (r.labelDom.height() + 46) + "px"
				}), r.labelDom.on("click", '[class="btn-map-seller-close"]', function() {
					s && s.destroy()
				}), r.labelDom.on("click", "[data-open-session]", e.dataOpenSessionHandler), qq.maps.event.addListener(r.lastMaker, "click", function() {
					this.getPanes().overlayMouseTarget.appendChild(i)
				})
			}, i.prototype.draw = function() {
				var e = this.get("position");
				if (e) {
					var t = this.getProjection().fromLatLngToDivPixel(e);
					this.dom.style.left = t.getX() + "px", this.dom.style.top = t.getY() + "px"
				}
			}, i.prototype.destroy = function() {
				this.dom.parentNode.removeChild(this.dom)
			}, s = new i({
				map: r.map,
				position: t.latLng
			})
		}, e.sosomap = r
	}), !
	function(e) {
		typeof define == "function" ? define("widget/carousel", ["../$"], e) : e($)
	}(function(e) {
		"use strict";
		e.support.transition = function() {
			var e = function() {
					var e = document.createElement("test"),
						t = {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd otransitionend",
							transition: "transitionend"
						},
						n;
					for (n in t) if (e.style[n] !== undefined) return t[n]
				}();
			return e && {
				end: e
			}
		}();
		var t = function(t, n) {
				this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
			};
		t.prototype = {
			cycle: function(t) {
				return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
			},
			getActiveIndex: function() {
				return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
			},
			to: function(t) {
				var n = this.getActiveIndex(),
					r = this;
				if (t > this.$items.length - 1 || t < 0) return;
				return this.sliding ? this.$element.one("slid", function() {
					r.to(t)
				}) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
			},
			pause: function(t) {
				return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
			},
			updateSlideControl: function(e) {
				this.$prev = this.$element.find("[data-slide=prev]"), this.$next = this.$element.find("[data-slide=next]");
				var t = this.getActiveIndex() + (e == "next" ? 1 : -1),
					n = this.$items.length - 1;
				t === n ? this.$next.addClass("disable") : this.$next.removeClass("disable"), t === 0 ? this.$prev.addClass("disable") : this.$prev.removeClass("disable")
			},
			next: function() {
				if (this.sliding) return;
				return this.slide("next")
			},
			immediateNext: function() {
				if (this.sliding) return;
				return this.slide("next", !1, "noAnimate")
			},
			prev: function() {
				if (this.sliding) return;
				return this.slide("prev")
			},
			immediatePrev: function() {
				if (this.sliding) return;
				return this.slide("prev", !1, "noAnimate")
			},
			slide: function(t, n, r) {
				this.updateSlideControl(t);
				var i = this.$element.find(".item.active"),
					s = n || i[t](),
					o = this.interval,
					u = t == "next" ? "left" : "right",
					a = t == "next" ? "first" : "last",
					f = this,
					l;
				this.sliding = !0, o && this.pause(), s = s.length ? s : this.$element.find(".item")[a](), l = e.Event("slide", {
					relatedTarget: s[0],
					direction: u
				});
				if (s.hasClass("active")) {
					this.sliding = !1;
					return
				}
				this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
					var t = e(f.$indicators.children()[f.getActiveIndex()]);
					t && t.addClass("active")
				}));
				if (e.support.transition && !r) {
					this.$element.trigger(l);
					if (l.isDefaultPrevented()) return;
					s.addClass(t), s[0].offsetWidth, i.addClass(u), s.addClass(u), this.$element.one(e.support.transition.end, function() {
						s.removeClass([t, u].join(" ")).addClass("active"), i.removeClass(["active", u].join(" ")), f.sliding = !1, setTimeout(function() {
							f.$element.trigger("slid")
						}, 0)
					})
				} else {
					this.$element.trigger(l);
					if (l.isDefaultPrevented()) return;
					i.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
				}
				return o && this.cycle(), this
			}
		};
		var n = e.fn.carousel;
		e.fn.carousel = function(n) {
			return this.each(function() {
				var r = e(this),
					i = r.data("carousel"),
					s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
					o = typeof n == "string" ? n : s.slide;
				i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
			})
		}, e.fn.carousel.defaults = {
			interval: 5e3,
			pause: "hover"
		}, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
			return e.fn.carousel = n, this
		}
	}), !
	function(e) {
		typeof define == "function" ? define("widget/tab", ["../$"], e) : e($)
	}(function(e) {
		"use strict";
		var t = function(t) {
				this.element = e(t)
			};
		t.prototype = {
			constructor: t,
			show: function() {
				var t = this.element,
					n = t.closest("ul"),
					r = t.attr("data-target"),
					i, s, o;
				r || (r = t.attr("href"));
				if (t.parent("li").hasClass("active")) return;
				i = n.find(".active:last a")[0], o = e.Event("show", {
					relatedTarget: i
				}), t.trigger(o);
				if (o.isDefaultPrevented()) return;
				s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
					t.trigger({
						type: "shown",
						relatedTarget: i
					})
				})
			},
			activate: function(t, n, r) {
				function o() {
					i.removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), r && r()
				}
				var i = n.find("> .active"),
					s = r && e.support.transition && i.hasClass("fade");
				s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
			}
		};
		var n = e.fn.tab;
		e.fn.tab = function(n) {
			return this.each(function() {
				var r = e(this),
					i = r.data("tabCache");
				i || r.data("tabCache", i = new t(this)), typeof n == "string" && i[n]()
			})
		}, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
			return e.fn.tab = n, this
		}
	}), !
	function(e) {
		typeof define == "function" ? define("binds", ["$", "./model/group", "./people.view", "./helper/subjectEntrance", "./widget/confirm", "./model/lbs", "./view", "./hybrid", "./hybrid.find", "./people", "./qqun", "./widget/qiqi", "./widget/hybrid.user.sosoMap", "./widget/hybrid.result.sosoMap", "./model/buddy", "./model/seller", "./widget/hybrid.user.sosoMapLocationGenerator", "./widget/carousel", "./widget/tab", "tools/utils", "tools/cookie", "tools/reportLogic", "tools/info", "tools/native", "tools/tdw"], e) : e($)
	}(function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T) {
		"use strict";

		function I(e, t) {
			var n = F[e],
				r = n[t];
			r.css("z-index", "2"), e === 0 ? f.show() : P.show(), r.hide(), r.css({
				top: e === 1 ? "0px" : "32px"
			})
		}
		function q(t) {
			u.isUserHoverInIndustry = !1, e("#hy-find-fuzzy-rows").scrollTop(0), I(1, t), u.isSearchResultLayerDisplay = !1, e.report.bernoulli(11519, "hybrid"), e("#hy-loading-mask .hy-loading-title").html("")
		}
		function R() {
			u.isUserHoverInIndustry = !1, I(1, 0), I(1, 1), I(1, 2), e("#hy-free-activities").hide(), e("#hy-activity315").hide(), e("#subject-mask").hide(), e("#hy-main .qiqi-room").hide()
		}
		function U(t) {
			I(0, t), e.report.bernoulli(11519, "people")
		}
		function z(n) {
			var r = e(this).data("group-gdt"),
				i = t.gdtInfos[r].rl;
			i && ((new Image).src = i), t.gdtInfos[r].rl = null, n.preventDefault()
		}
		function W(t) {
			var n = 0,
				r = "",
				i = t.prefix || "hy",
				s = t.iden,
				o = t.reportObj || "fuz";
			if (i === "hy") {
				if (o === "rec") u.userTrack = n = 40;
				else switch (s) {
				case "avatar":
					n = u.userTrack + 10;
					break;
				case "nick":
					n = u.userTrack + 20;
					break;
				case "talk":
					n = u.userTrack + 1;
					break;
				case "qzone":
					n = u.userTrack + 2
				}
				return S.getInfo(function(t) {
					r = n + "^" + t.reportp2c + "^" + u.keyword, e.report.bernoulli(11402, r)
				}), r || n + "^-1^-1^" + u.keyword
			}
		}
		function X(t, n) {
			return n = n || "hy", e.trim(e("#" + n + "-search-input").val()) == t ? !0 : !1
		}
		function V(t) {
			var n = e(this),
				r = n.data("uin") || n.data("open-people") || n.data("open-seller"),
				i = n.data("tab") || 0,
				s = n.data("iden") || "avatar",
				o = n.data("obj") || "acc",
				u = "",
				a = n.data("classification") || "pe",
				f = n.data("source"),
				l = n.data("jumpurl"),
				c = n.data("reporturl"),
				h = n.data("report-tag") || "",
				p = n.data("type"),
				d = n.data("prefix");
			p === "sellerv2" || p === "sellerv1" ? p = "sellerv2" : p != "job" && (p = "sellerv1");
			var m = "";
			if (a === "manu") switch (d) {
			case "hy":
				switch (s) {
				case "avatar":
					m = 10901;
					break;
				case "nick":
					m = 10902
				}
				break;
			case "pe":
				switch (s) {
				case "avatar":
					m = 10908;
					break;
				case "nick":
					m = 10909
				}
			} else if (o) switch (d) {
			case "pe":
				switch (s) {
				case "avatar":
					m = 10874;
					break;
				case "nick":
					m = 10875
				}
				break;
			case "hy":
				switch (s) {
				case "avatar":
					m = 10841;
					break;
				case "nick":
					m = 10842
				}
			}
			u = W({
				reportObj: o,
				prefix: d,
				iden: s
			}), a === "manu" ? e.report.bernoulli(m, o) : e.report.bernoulli(m, o, r);
			if (f === "gdt") {
				l && (window.open(l, "_blank"), c !== l && e.ajax(c)), e.report.bernoulli(10901, "ad");
				return
			}
			f === "operation" && e.report.bernoulli(10901, "rec");
			switch (p) {
			case "sellerv2":
				var g = n.data("categoryId") || "";
				try {
					profileMask.openProfile({
						others_id: r,
						source: 2,
						category: g,
						trajectory: u
					})
				} catch (t) {
					e.report.monitor(339583)
				}
				break;
			case "sellerv1":
				x.viewInfo(r, i, f);
				break;
			case "job":
				try {
					profileMask.openProfile({
						others_id: r,
						source: 10,
						trajectory: u
					})
				} catch (t) {
					e.report.monitor(339583)
				}
				break;
			default:
			}
			t.preventDefault(), v.reportTag(h)
		}
		function $(t) {
			var n = e(this),
				r = n.data("uin"),
				i = n.data("obj") || "acc",
				s = "",
				o = n.data("iden") || "avatar",
				u = n.data("prefix") || "hy",
				a = "qiyev2",
				f = n.data("report-tag") || "",
				l = n.data("profile-card-type") || 0,
				c = n.data("name");
			l === 1 && (a = "qiyev1");
			var h = 0;
			switch (o) {
			case "avatar":
				h = 10854;
				break;
			case "nick":
				h = 10855
			}
			e.report.bernoulli(h, i), s = W({
				reportObj: i,
				prefix: u,
				iden: o
			});
			switch (a) {
			case "qiyev2":
				var p = n.data("name-account");
				try {
					profileMask.openProfile({
						source: 1,
						others_id: r,
						trajectory: s,
						nameAccount: p
					})
				} catch (t) {
					e.report.monitor(339583)
				}
				break;
			case "qiyev1":
			default:
				x.crmViewInfo(r, c)
			}
			t.preventDefault(), v.reportTag(f)
		}
		function J(t) {
			var n = e(this),
				r = n.data("jumpurl"),
				i = n.data("iden") || "avatar",
				s = n.data("type"),
				o = n.data("obj"),
				u = "",
				a = n.data("classification"),
				f = 0,
				l = n.data("special-source-type"),
				c = n.data("seller-id-counter"),
				h = e.seller.sellersContainer[c],
				p = e.seller.sellersContainer[c].others_id,
				d = {
					electronic: 7,
					travel: 8,
					mama: 9
				},
				m = n.data("report-tag"),
				g = n.data("prefix"),
				y = n.data("source");
			if (a === "manu") switch (g) {
			case "hy":
				switch (i) {
				case "avatar":
					f = 10901;
					break;
				case "nick":
					f = 10902
				}
				break;
			case "pe":
				switch (i) {
				case "avatar":
					f = 10908;
					break;
				case "nick":
					f = 10909
				}
			} else if (o) switch (g) {
			case "pe":
				switch (i) {
				case "avatar":
					f = 10874;
					break;
				case "nick":
					f = 10875
				}
				break;
			case "hy":
				switch (i) {
				case "avatar":
					f = 10841;
					break;
				case "nick":
					f = 10842
				}
			}
			a === "manu" && e.report.bernoulli(f, o), u = W({
				reportObj: o,
				prefix: g,
				iden: i
			});
			try {
				profileMask.openProfile({
					source: d[s],
					others_id: p,
					others_info: h,
					type: l,
					trajectory: u
				})
			} catch (t) {
				e.report.monitor(339583)
			}
			v.reportTag(m)
		}
		function K() {
			e("#find-soso-map-container").hide(), e(".page-mask").hide()
		}
		var N = {},
			C = e.report,
			k = C.monitor,
			L = C.bernoulli,
			A = C.monitorAndBer;
		window.offlineTipfunc = function(e) {
			x.getStatus() === "20" && (document.removeEventListener("click", window.offlineTipfunc, !0), i(function() {
				document.addEventListener("click", window.offlineTipfunc, !0)
			}), e.stopPropagation(), e.preventDefault())
		}, document.addEventListener("click", window.offlineTipfunc, !0), e(document).ajaxSend(function(e, t, n) {
			if (n.type.toUpperCase() === "POST") {
				var r = b.getCSRFParam();
				n.data ? n.data.search(/ldw=/i) !== -1 ? n.data.replace(/ldw=([^&]+(?=&)|[^&]+$)/i, r) : n.data += "&" + r : n.data = r
			}
			var i = n.success;
			n.success = function(e, t, n) {
				Number(e.retcode) !== 0, i(e, t, n)
			}
		}), e(document).on("contextmenu", function(e) {
			k(304213), e.preventDefault()
		}), e(document).on("click", "[data-slide]", function(t) {
			t.preventDefault();
			var n = e(this),
				r, i = e(r = n.attr("href")),
				s = r.slice(1, 3),
				o = n.data("slide"),
				a = e.extend({}, i.data(), n.data()),
				c;
			a.interval = !1;
			if (r == "#pe-search-res-sim-dom") return !0;
			switch (o) {
			case "prev":
				i.carousel(a);
				break;
			case "next":
				if (s == "qu") {
					if (r == "#qu-recommend-block") l.groupRecommend(!0);
					else {
						var h = r.slice(1).split("-").slice(0, 3).join("."),
							p = e("[href=" + r + "][data-tab]"),
							v = p.data("tab"),
							m = p.data("nav-behavior"),
							g = p.data("clazz"),
							y = !0;
						e(document).trigger(h, [v, g, m, y])
					}
					i.carousel(a)
				} else s == "hy" ? (c = r.match(/#hy-recommend-(\S*)-(\S*)-container/), u.recommend(c[1], c[2], !0, function() {
					i.carousel(a)
				})) : (c = r.match(/#pe-([^-]*)-people/), f.more(c[1], !0, function() {
					i.carousel(a)
				}))
			}
			if (r == "#hy-recommend-people-possible-container" || r == "#pe-recommend-people") {
				var b = "",
					w = [];
				i.find(".item.active").find(".unit").each(function(t, n) {
					var r = e(n).find("img").attr("data-open-people");
					typeof r != "undefined" ? w.push(r) : w.push(e(n).find("image").attr("data-open-people"))
				}), b = w.join("-"), d.possibleFeedback({
					uin_list: b
				})
			}
			var E = "",
				S = 0,
				x = 0,
				T = r.split("-").slice(0, 3).join("-");
			switch (T) {
			case "#hy-recommend-seller":
				x = 10900, E = 0, S = 296589;
				break;
			case "#hy-recommend-group":
				x = 10832, E = "hybrid", S = 296592;
				break;
			case "#hy-recommend-people":
				x = 10831, E = "hybrid", S = 296593;
				break;
			case "#pe-recommend-people":
				x = 10831, E = "people", S = 296594;
				break;
			case "#pe-nearly-people":
				x = 10882, E = 0, S = 296595;
				break;
			case "#qu-recommend-block":
			case "#qu-tab-group":
				x = 10923, E = "", S = 296597
			}
			A(S, x, E)
		}), e(document).on("click", "[data-lbs]", function(t) {
			var n = e(this).data("prefix");
			s.toggle(null, n), t.preventDefault()
		}), e(document).on("click", "[data-nav]", function(t) {
			t.preventDefault(), e("#acitvity-mask").hide();
			var n = e(this),
				r = n.parent("li"),
				i = n.data("nav"),
				s = n.data("search"),
				a = n.data("from"),
				f = n.data("nav-behavior"),
				c = n.data("keyword");
			l.hideNearby();
			var h;
			if (!r.parent().parent().is("#header-nav")) {
				var p = n;
				n = e("#header-nav li.active a.nav-word"), i = p.data("nav") || "", s = p.data("search"), f = p.data("nav-behavior"), c = p.data("keyword"), h = p.data("decorate-word"), !c && s && (c = s, s = !0), typeof c == "object" && (c = JSON.stringify(c)), u.keyword = c, u.resultTitleKeyword = null;
				switch (i) {
				case "hybrid":
					r = e(e("#header-nav .nav-pills>li")[6]);
					break;
				case "people":
					r = e(e("#header-nav .nav-pills>li")[0]);
					break;
				case "qqun":
					r = e(e("#header-nav .nav-pills>li")[2]);
					break;
				case "edu":
					r = e(e("#header-nav .nav-pills>li")[4]);
					break;
				default:
				}
				var d = p.data("obj"),
					v = p.data("prefix"),
					m = p.data("trigger"),
					g = "";
				if (m == "hotwords" && v == "hy") e.report.bernoulli(10907, c), u.userTrack = 200, S.getInfo(function(t) {
					e.report.bernoulli(11402, u.userTrack + "^" + t.reportp2c + "^" + c)
				});
				else {
					var y = n.closest("ul"),
						b = y.find(".active"),
						w = b.find("a").data("nav");
					f && (s = !0);
					var E = "1",
						g = 10836;
					i === "people" ? w === "hybrid" ? f === "hometown" && (E = "2") : f === "hometown" ? (g = 10871, E = "2") : f === "gender" ? (g = 10871, E = "1") : f == "nearly" && (g = 10871, E = "3") : i === "qqun" ? (f === "page-2" ? g = 11649 : g = 11648, e(".hy-search-qun-container").prev().is(".noSCTipsContainer") ? E = "fuznone" : E = "fuzhave") : i === "seller" && (g = 10838, E = f), e.report.bernoulli(g, E)
				}
			} else if (r.hasClass("active")) {
				switch (i) {
				case "hybrid":
					e("#hy-search-input").val(""), e.inputChangeHandler(), e("#hy-find-fuzzy").is(":visible") ? q(1) : e("#hy-find-accurate").is(":visible") ? q(0) : e("#hy-loading-mask").is(":visible") ? q(2) : (u.isSearchResultLayerDisplay = !1, u.$els.loadingMask.hide(), u.$els.fuzzy.hide(), u.$els.accurate.hide(), e("#hy-recommend").show(), e("#hy-free-activities").hide(), e(".qiqi-room", "#hy-main").hide(), e("#hy-activity315").hide(), e("#subject-mask").hide());
					break;
				case "people":
					e("#pe-search-input").val(""), e.inputChangeHandler(), e("#pe-acc-result").is(":visible") ? U(0) : e("#pe-sim-result").is(":visible") && U(1);
					break;
				case "qqun":
					e("#qu-result-fuzzy").is(":visible") ? l.hideResult("qu-fuzzy") : e("#qu-result-exact").is(":visible") ? l.hideResult("qu-exact") : e("#qu-result-mask").is(":visible") && l.hideResult("qu-more");
					break;
				case "livestudio":
					break;
				case "edu":
					o.$els.eduIframe[0].contentWindow.postMessage('{"from":"QQFind","event":"courseSearchNavClick"}', "http://ke.qq.com");
					break;
				default:
				}
				return
			}
			var x = n.closest("ul"),
				T = x.find(".active");
			T.removeClass("active");
			var C = T.find("a").data("nav");
			if (!c || c === "") c = e("#" + C.slice(0, 2) + "-search-input").val() || "", C == "qqun" && (c = e("#qu-search-input").val() || ""), C == "edu" && (c = e("#is-search-keyword").val() || "");
			N.people || (N.people = e("#pe-search-input")), N.hybrid || (N.hybrid = e("#hy-search-input")), N.qqun || (N.qqun = e("#qu-search-input")), c && N[i] && N[C] && (h ? (N[i].val(h.trim()), e.inputChangeHandler()) : (N[i].val(c || s || (N[C].val() || "").trim()), N[C].val(""), e.inputChangeHandler())), r.addClass("active"), f && (s = !0), o.$els.beManufacturersLink || (o.$els.beManufacturersLink = e("#be_manufacturer_link")), i === "hybrid" ? o.$els.beManufacturersLink.show() : o.$els.beManufacturersLink.hide(), o.nav({
				target: i,
				source: C,
				search: s,
				keyword: c,
				decorateKeyword: h,
				behavior: f,
				from: a
			});
			switch (i) {
			case "hybrid":
				L(11059);
				break;
			case "people":
				L(11060);
				break;
			case "qqun":
				L(11061);
				break;
			case "livestudio":
				L(12086);
				break;
			case "seller":
				L(11062);
				break;
			default:
			}
		});
		var O = e("#pe-sim-result"),
			M = e("#pe-acc-result"),
			_ = e("#hy-find-fuzzy"),
			D = e("#hy-find-accurate"),
			P = e("#hy-recommend"),
			H = e("#hy-loading-mask"),
			B = [M, O],
			j = [D, _, H],
			F = [B, j];
		(function() {
			e(document).on("click", "[data-overlay]", function(t) {
				var n = e(this),
					r = n.data("overlay"),
					i = n.data("current");
				r === "hybrid" ? (u.userTrack = 0, u.unbindFindFuzzyQunScroll(), e("#hy-search-input").val(""), e.inputChangeHandler(), i === "acc" ? q(0) : i === "fuz" ? q(1) : i === "rec" ? u.secondFlag > 0 ? (e("#hy-loading-mask").hide(), e("#hy-find-fuzzy").show()) : q(2) : i === "all" && R(), u.secondFlag = 0, u.searchParam = {}) : r === "people" ? (e("#pe-search-input").val(""), e.inputChangeHandler(), i === "acc" ? U(0) : i === "fuz" && U(1)) : r === "qqun" && (l.$els.searchInput.val(""), e.inputChangeHandler(), l.removeScrollEvent(), l.$els.resultMask.removeClass("slideUp"), l.$els.main.css("visibility", "visible"), l.$els.resultExact.hide(), l.$els.resultFuzzy.hide(), e(l.$els.resultMask).off("webkitTransitionEnd", l.maskAnimationEnd), l.hoverByUser = !1, l.guaguaScroll.hide(), l.cgiPage = 1, l.isResultReady = !1, l.isMaskEnd = !1, e.report.bernoulli(11519, "qqun")), t.preventDefault()
			})
		})(), e(document).on("click", "[data-group-gdt]", z), e("#hy-main").on("click", "[data-open-qzone]", function() {
			L(11058), W({
				iden: "qzone"
			})
		}), e.dataOpenSessionHandler = function(t) {
			var n = e(this),
				r = n.data("prefix"),
				i = n.data("obj") || "acc",
				s = n.data("iden") || "ck",
				o = n.data("type"),
				u = n.data("account"),
				a = n.data("open-session"),
				f = "";
			if (o !== "sellerEnt") if (o === "sellerv1" || o === "sellerv2" || o === "mama" || o === "job") switch (r) {
			case "hy":
				x.startChat(a, 1, 1);
				var l = n.data("online");
				l ? f = 10903 : f = 11522, e.report.monitor(398687);
				break;
			case "pe":
				x.startChat(a, 2, 2), f = 10910
			} else switch (s) {
			case "ck":
				switch (r) {
				case "pe":
					x.startChat(a, 2, 2), f = 10877;
					break;
				case "hy":
					x.startChat(a, 1, 2), f = 10844;
					break;
				case "seller-profile":
					x.startChat(a, 1, 1), f = 11295, i = ""
				}
				break;
			case "wpa_ck":
				switch (r) {
				case "pe":
					x.startChat(a, 2, 2), f = 10879;
					break;
				case "hy":
					x.startChat(a, 1, 2), f = 10846
				}
			} else x.crmStartChat(a), e.report.qiyeReport({
				type: 4,
				wd: e.trim(e("#hy-search-input").val()),
				na: u,
				kfuin: a
			}), f = 10859, e.report.monitor(398688);
			if (s === "wpa_ck") {
				var c = n.siblings().data("add-people") || 0;
				e.report.bernoulli(f, i, c)
			} else s === "profile" ? e.report.bernoulli(11469) : e.report.bernoulli(f, i);
			W({
				reportObj: i,
				prefix: r,
				iden: "talk"
			}), t.preventDefault(), t.stopPropagation()
		}, e(document).on("click", "[data-open-session]", e.dataOpenSessionHandler), e(document).on("click", "[data-open-guagua]", function(t) {
			var n = e(this),
				r = n.data("open-guagua"),
				i = n.data("account"),
				s = n.data("kfuin"),
				o = n.data("obj"),
				u = n.data("prefix"),
				a = n.data("iden"),
				f = 0,
				l = 0,
				c = 0,
				h = ["module", "action", "obj1", "obj2", "obj3"],
				p = n.data("extraparam") || "",
				d = n.data("qu-region");
			x.invokeGuaGua(i, s, r, p);
			switch (u) {
			case "hy":
				l = 11500;
				switch (a) {
				case "avatar":
					f = 11095, c = 1;
					break;
				case "nick":
					f = 11094, c = 2;
					break;
				case "enterbtn":
					f = 11093, c = 3
				}
				break;
			case "qu":
				(d == "recomgrp" || n.parent().children("[data-open-guagua]").data("qu-region") == "recomgrp") && e.report.bernoulli(11756), n.parents("#qu-result-fuzzy").length ? l = 12300 : l = 12400;
				switch (a) {
				case "avatar":
					f = 11098, c = 1;
					break;
				case "nick":
					f = 11097, c = 2;
					break;
				case "enterbtn":
					f = 11096, c = 3
				}
			}
			f && e.report.bernoulli(f, o), l && c && T.reportTdw("pf00191", h, [
				["guagua_find", "clickrslt", r, l, c]
			]), t.preventDefault(), t.stopPropagation()
		}), e(document).on("click", "[data-open-guagua-by-short-id]", function(t) {
			var n = e(this),
				r = n.data("open-guagua-by-short-id"),
				i = n.data("short-id"),
				s, o, u = n.data("prefix");
			s = o = w.uin();
			var a = {};
			u === "pe" ? (a = {
				srcid: 120,
				anchor_uin: i
			}, L(11705, r)) : u === "qu" && (a = {
				srcid: 131
			}), x.invokeGuaGuaByShortId(s, o, r, a)
		}), e(document).on("click", "[data-add-people]", function(t) {
			var n = e(this),
				r = n.data("add-people"),
				i = n.data("uin2"),
				s = n.data("obj") || 0,
				o = n.data("classification"),
				u = n.data("source") || 1,
				a = n.data("prefix") || "hy",
				f;
			o ? f = 10904 : a === "hy" ? f = 10840 : a === "pe" && (f = 10873), e.report.bernoulli(f, s, r), i !== r && i ? x.addBuddy(r, u, i + "") : x.addBuddy(r, u), t.preventDefault()
		}), e(document).on("click", "[data-enter-pgroup]", function(n) {
			var r = e(this),
				i = r.data("enter-pgroup"),
				s = r.data("obj") || 0,
				o = r.data("need-pay") || 0,
				u = r.data("prefix") || "hy",
				a = 2,
				f;
			s === "acc" ? (f = 6, a = 1) : f = 3;
			var c = 0,
				h = e("#qu-carousel-inner .active").index(),
				p = r.closest(".single-fuzzy-result-group").parent().find(".single-fuzzy-result-group");
			c = p.index(r.closest(".single-fuzzy-result-group")) + h * 36 + 1, T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4"], [
				["Grp_find_pc", "find_page", "Clk_in", l.keyword, a, o ? 1 : 2, c || 1]
			]), T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4", "ver5", "ver6", "ver7"], [
				["Grp_find_pc", "find_page", "Clk", t.groupUins.get().join(","), l.keyword, l.searchId, w.uin(), l.gTotal, i, c]
			]), x.enterPublicGroup(i, 1, f), n.preventDefault()
		}), e(document).on("click", "[data-enter-video-group]", function(t) {
			var n = e(this),
				r = n.data("enter-video-group"),
				i = n.data("iden");
			r += "&fuin=" + w.uin();
			switch (i) {
			case "avatar":
				T.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "living_grp", "clk_head"]
				]), e.report.monitor(2453394);
				break;
			case "nick":
				T.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "living_grp", "clk_nickname"]
				]), e.report.monitor(2453395);
				break;
			case "button":
				T.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "living_grp", "clk_join"]
				]), e.report.monitor(2453396)
			}
			window.open(r)
		}), e(document).on("click", "[data-add-seller]", function(t) {
			var n = e(this),
				r = n.data("add-seller"),
				i = n.data("obj"),
				s = n.data("name"),
				o = n.data("account"),
				u = n.data("classification"),
				a = n.data("prefix"),
				f = "";
			switch (u) {
			case "manu":
				switch (a) {
				case "pe":
					f = 10911;
					break;
				case "hy":
					f = 10904
				}
				break;
			case "qiye":
				f = 10853;
				switch (a) {
				case "hy":
					e.report.qiyeReport({
						type: 3,
						wd: e.trim(e("#hy-search-input").val()),
						na: o,
						kfuin: r
					})
				}
			}
			e.report.bernoulli(f, i), x.crmAddBuddy(r, s, o), t.preventDefault()
		}), e(document).on("click", "[data-add-group]", function(n) {
			var r = e(this),
				i = r.data(),
				s = i.addGroup,
				o = i.prefix,
				a = i.needPay,
				f = i.obj,
				c = i.quRegion,
				h = 10849,
				p = 0,
				d = 0,
				v = 1,
				m = "",
				g = 0,
				y = 0;
			if (f === "rec") r.closest("#qu-result-recommend").length ? e.report.monitor(2443852) : T.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "Clk_reco_join"]
			]);
			else if (f === "acc" || f == "fuz") T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4"], [
				["Grp_find_pc", "find_page", "Clk_join", l.keyword, p, a ? 1 : 2, y || 1]
			]), T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4", "ver5", "ver6", "ver7"], [
				["Grp_find_pc", "find_page", "Clk", t.groupUins.get().join(","), l.keyword, l.searchId, w.uin(), l.gTotal, s, y]
			]);
			switch (o) {
			case "hy":
				switch (f) {
				case "acc":
					X(s, o) ? d = 5 : d = 2;
					break;
				case "fuz":
					X(s, o) ? d = 2 : d = 2, h = 11652, e(".hy-search-qun-container").prev().is(".noSCTipsContainer") ? f = "fuznone" : f = "fuzhave";
					var S = r.closest(".single-fuzzy-result-group").parent().find(".single-fuzzy-result-group");
					y = S.index(r.closest(".single-fuzzy-result-group")) + 1, E.groupOperation({
						gid: s,
						keyword: u.keyword,
						loctype: 7,
						order: y,
						acttype: 3
					});
					break;
				case "rec":
					d = 11
				}
				break;
			case "qu":
				h = 10926;
				switch (f) {
				case "acc":
					X(s, o) ? d = 5 : d = 2, p = 1;
					break;
				case "fuz":
					p = 2, g = e("#qu-carousel-inner .active").index();
					var S = r.closest(".single-fuzzy-result-group").parent().find(".single-fuzzy-result-group");
					y = S.index(r.closest(".single-fuzzy-result-group")) + g * 36 + 1, l.searchQuByRecommend ? (f = l.quReportRegion, h = 11619, E.groupOperation({
						gid: s,
						keyword: l.keyword,
						loctype: 8,
						order: y,
						acttype: 3
					})) : E.groupOperation({
						gid: s,
						keyword: l.keyword,
						loctype: 1,
						order: y,
						acttype: 3
					}), d = 2;
					break;
				case "rec":
					var N = !r.closest(".unit").hasClass("isSub");
					N ? d = 9 : d = 11, c && (f = c, h = 11619)
				}
			}
			e.report.bernoulli(h, f, s), a && x.getVersion() < 5473 ? window.open(b.generatePtUrl("http://qun.qq.com/qunpay/qunfee/qrcode.html?gc=" + s + "&source=joingroup")) : x.addToGroup(s, v, d), n.preventDefault()
		}), e(document).on("click", "[data-open-people]", V), e(document).on("click", "[data-open-seller]", V), e(document).on("click", "[data-open-sellerv1]", V), e(document).on("click", "[data-open-sellerv2]", V), e(document).on("click", "[data-open-href]", function(t) {
			var n = e(this).attr("href"),
				r = e(this).data("obj"),
				i = e(this).data("str-value");
			return r && e.report.bernoulli(r, i), n && window.open(n, "_blank"), !1
		}), e(document).on("click", "[data-jump-ptlogin-web]", function(t) {
			var n = e(this).attr("href"),
				r = e(this).text(),
				i = b.generatePtUrl(n),
				s = e(this).data("obj"),
				o = e(this).data("str-value");
			s && e.report.bernoulli(s, o);
			switch (n) {
			case "http://mma.qq.com/newqun2/pc/?adtag=media.free.oa.qun":
				e.report.bernoulli(11330);
				break;
			case "http://wp.qq.com/business.html":
				switch (r) {
				case "管理发布信息":
					e.report.bernoulli(11467);
					break;
				case "注册QQ商家":
					e.report.bernoulli(10905)
				}
				break;
			case "http://support.qq.com/discuss/910_1.shtml":
				e.report.bernoulli(11385);
				break;
			case "http://shang.qq.com/qqads/index.php":
				e.report.bernoulli(11467)
			}
			if (/^http\:\/\/wp\.qq\.com\/business\.html\?fw/.test(n)) {
				var u = e(this).data("w");
				e.report.bernoulli(11380, u)
			}
			return i && window.open(i, "_blank"), !1
		}), e(document).on("click", "[data-open-sellerent]", $), e(document).on("click", "[data-open-travel]", J), e(document).on("click", "[data-open-electronic]", J), e(document).on("click", "[data-open-mama]", J), e(document).on("click", "[data-open-hotword-search]", function(t) {
			var n = e(this).data("seller-id-counter"),
				r = e.seller.sellersContainer[n],
				i = r.hotword || "";
			o.nav({
				target: "hybrid",
				search: !0,
				keyword: i
			}), u.userTrack = 500, t.preventDefault(), window.setTimeout(function() {
				S.getInfo(function(t) {
					e.report.bernoulli(11402, u.userTrack + "^" + t.reportp2c + "^" + i)
				}), e.report.bernoulli(10901, "zt")
			}, 500)
		}), e(document).on("click", "[data-open-recom-search]", function(t) {
			var n = e(this).data("seller-id-counter"),
				r = e.seller.sellersContainer[n],
				i = r.industry1 || r.industry,
				s = r.industry1_str || r.industry_str;
			u.handleRecomMenuSearch({
				id: i,
				keyword: s,
				categoryType: r.industry1 ? 2 : 1
			}), u.userTrack = 500, t.preventDefault(), window.setTimeout(function() {
				S.getInfo(function(t) {
					e.report.bernoulli(11402, u.userTrack + "^" + t.reportp2c + "^" + s)
				}), e.report.bernoulli(10901, "zt")
			}, 500)
		}), e(document).on("click", "[data-open-subject-search]", function(t) {
			var n = e(this).data("seller-id-counter"),
				i = e.seller.sellersContainer[n],
				s = i.special;
			r.open({
				subjectName: s
			}), t.preventDefault(), u.userTrack = 500;
			switch (s) {
			case "tencent":
				u.keyword = "腾讯外卖";
				break;
			case "scActivity":
				u.keyword = "同城活动"
			}
			window.setTimeout(function() {
				S.getInfo(function(t) {
					e.report.bernoulli(11402, u.userTrack + "^" + t.reportp2c + "^" + u.keyword)
				}), e.report.bernoulli(10901, "zt")
			}, 500)
		}), e(document).on("click", "[data-open-oper-qun]", function(t) {
			var n = u.operQunObj || {},
				r = n.interactive || 0,
				i = n.ad_id;
			x.getVersion() < 5232 && (r = 4);
			switch (r) {
			case 0:
				var s;
				(s = n.jumpUrl) && window.open(s, "_blank");
				break;
			case 1:
				var o = "tencent://groupwpa/?subcmd=OpenGroup&param=";
				o += b.encodeBase16(JSON.stringify({
					ExtParam: {
						appId: "21"
					},
					groupUin: n.groupId,
					visitor: 1
				})), o += "&FUIN=" + w.uin(), window.open(o, "_blank");
				break;
			case 2:
				var a = n.groupId;
				x.enterPublicGroup(a);
				break;
			case 3:
				var f = n.code,
					l = n.groupId,
					c = {
						localid: f,
						head: n.avatar,
						bit: n.bitmap,
						groupid: l,
						groupuin: l,
						groupname: n.originName,
						groupmemo: n.originMemo,
						grouplevel: n.level,
						groupclass: n.class,
						owneruin: n.owner_uin,
						groupmem: n.member_num,
						groupmaxmem: n.max_member_num,
						groupoption: b.bitMapObj(n.flag).option
					};
				x.viewGroupInfo(f, c), t.preventDefault();
				break;
			case 4:
				var f = n.code,
					h = 101,
					p = 104;
				x.addToGroup(f, p, h)
			}
			t.preventDefault(), e.report.bernoulli(11477, i)
		}), e(document).on("click", "[data-open-group]", function(n) {
			var r = e(this),
				i = r.data(),
				s = i.openGroup,
				o = i.needPay,
				a = i.obj || "acc",
				f = i.prefix || "hy",
				c = i.iden || "avatar",
				h = i.quRegion,
				p = i.groupid,
				d = 0,
				v = 0,
				m = {
					localid: s,
					head: i.head,
					bit: i.bitmap,
					groupid: p,
					groupuin: p,
					groupname: i.groupname,
					groupmemo: i.groupmemo,
					grouplevel: i.grouplevel,
					groupclass: i.groupclass,
					owneruin: i.owneruin,
					groupmem: i.membnum,
					groupmaxmem: i.membmaxnum,
					groupoption: b.bitMapObj(i.groupoption).option
				};
			i.obj === "acc" ? m.source_id = 4 : i.obj === "fuz" ? m.source_id = 1 : i.obj === "rec" && (i.loc === "result" ? m.source_id = 10 : m.source_id = 8), m.source_id = 65536 + m.source_id, x.viewGroupInfo(s, m), n.preventDefault();
			var g = 10850;
			if (f === "hy") {
				switch (c) {
				case "avatar":
					g = 11650;
					break;
				case "nick":
					g = 11651
				}
				e(".hy-search-qun-container").prev().is(".noSCTipsContainer") ? e.report.bernoulli(g, "fuznone") : e.report.bernoulli(g, "fuzhave");
				var y = r.closest(".single-fuzzy-result-group").parent().find(".single-fuzzy-result-group");
				v = y.index(r.closest(".single-fuzzy-result-group")) + 1, E.groupOperation({
					gid: s,
					keyword: u.keyword,
					loctype: 7,
					order: v,
					acttype: 1
				})
			} else if (f === "qu") {
				g = c === "nick" ? 10925 : 10924, a === "rec" && (h && (a = h, g = c === "nick" ? 11618 : 11617, h === "recomgrp" && T.reportTdw("dc00141", ["opername", "module", "action"], [
					["Grp_find_pc", "find_page", "Clk_reco_grp"]
				])), h !== "recomgrp" && (c === "nick" ? e.report.monitor(2443851) : e.report.monitor(2443850))), d = e("#qu-carousel-inner .active").index();
				var y = r.closest(".single-fuzzy-result-group").parent().find(".single-fuzzy-result-group");
				v = y.index(r.closest(".single-fuzzy-result-group")) + d * 36 + 1;
				if (a === "fuz" || a === "acc") {
					var S = 2;
					a === "acc" && (S = 1), T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4"], [
						["Grp_find_pc", "find_page", "open_data", l.keyword, S, o ? 1 : 2, v]
					]), T.reportTdw("dc00141", ["opername", "module", "action", "ver1", "ver2", "ver3", "ver4", "ver5", "ver6", "ver7"], [
						["Grp_find_pc", "find_page", "Clk", t.groupUins.get().join(","), l.keyword || "-", l.searchId || "-", w.uin() || "-", l.gTotal || "-", s || "-", v]
					])
				}
				"fuz" === a && l.searchQuByRecommend ? (a = h || l.quReportRegion, g = c === "nick" ? 11618 : 11617, E.groupOperation({
					gid: s,
					keyword: l.keyword,
					loctype: 8,
					order: v,
					acttype: 1
				})) : E.groupOperation({
					gid: s,
					keyword: l.keyword,
					loctype: 1,
					order: v,
					acttype: 1
				}), e.report.bernoulli(g, a, s)
			}
		}), e(document).on("click", "[data-switch-old-qqfind]", function(e) {
			try {} catch (e) {}
			e.preventDefault()
		}), e(document).on("click", "[data-open-more]", function(t) {
			var n = e(this),
				r = n.data("prefix");
			x.openFriendCircle(), t.preventDefault(), r === "hy" && e.report.bernoulli(10861, "acc")
		}), e(document).on("mouseenter mouseleave", ".carousel", function(t) {
			var n = e(this),
				r = t.type;
			switch (r) {
			case "mouseenter":
				n.find(".carousel-prev-trigger, .carousel-next-trigger").css("opacity", 1);
				break;
			case "mouseleave":
				n.find(".carousel-prev-trigger, .carousel-next-trigger").css("opacity", 0)
			}
		}), e(document).on("click", "[data-link]", function(t) {
			var n = e(this).data("link");
			n == "beSeller" && e.report.bernoulli(10950, 0), t.preventDefault()
		}), e(document).on("click", "[data-soso-map-location-delete]", function(e) {
			K(), localStorage.removeItem(w.uin() + "userInfo"), localStorage.removeItem(w.uin() + "selectLocationArray"), u.searchResultDistanceSwitchObj[u.keyword] = !1, a.recommendGroupList = {}, a.recommendGroupLoadingStatus = {}, u.currentSearchRegion = 0, u.searchParam = {};
			try {
				S._fields.lbs_addr_detail_short = S._fields.lbs_addr_detail_short_backup, S._fields.lbs_addr_detail_tmp = null, S._fields.lbs_addr_detail_short_tmp = null, S._fields.lbs_addr_city = S._fields.lbs_addr_detail_short
			} catch (e) {}
			S.fleshId();
			if (u.citySelector) {
				var t = function(e, t) {
						return e = e.replace(/(市)|(自治区)|(县)|(地区)|(特别行政区)/g, ""), (new RegExp(e)).test(t)
					};
				t(localCityMap[S._fields.lbs_addr_city_id][0], S._fields.lbs_addr_city) && u.citySelector.builder._select(S._fields.lbs_addr_city_id, !0)
			}
			u.find(u.keyword, {
				isMore: !1,
				isCategoryIndex: u.isSearchByCategory,
				categoryType: u.categoryType,
				resultTitleKeyword: u.resultTitleKeyword,
				changeByCorDisOnline: !0,
				searchType: u.searchType
			}), e.preventDefault()
		}), e(document).on("click", "[data-soso-map-open]", function(t) {
			h.show(), t.preventDefault(), e.report.bernoulli(11502)
		}), e(document).on("click", "[data-soso-map-close]", function(e) {
			K(), S._fields.lbs_addr_detail_tmp = null, S._fields.lbs_addr_detail_short_tmp = null, u.searchResultDistanceSwitchObj[u.keyword] = !1, e.preventDefault()
		}), e(document).on("click", "[data-soso-map-location-changed]", function(e) {
			K(), S._fields.lbs_addr_detail_short = S._fields.lbs_addr_detail_short_tmp, S._fields.lbs_addr_detail = S._fields.lbs_addr_detail_tmp, S._fields.lbs_addr_detail_tmp = null, S._fields.lbs_addr_detail_short_tmp = null, a.recommendGroupList = {}, a.recommendGroupLoadingStatus = {}, u.searchParam = {}, u.currentSearchRegion = 0, S.fleshId();
			if (u.citySelector) {
				var t = function(e, t) {
						return e = e.replace(/(市)|(自治区)|(县)|(地区)|(特别行政区)/g, ""), (new RegExp(e)).test(t)
					};
				t(localCityMap[S._fields.lbs_addr_city_id][0], S._fields.lbs_addr_city) && u.citySelector.builder._select(S._fields.lbs_addr_city_id, !0)
			}
			S.getInfo(function(e) {
				if (e.longitude === 116) return;
				localStorage[w.uin() + "userInfo"] = JSON.stringify(e), u.find(u.keyword, {
					isMore: !1,
					isCategoryIndex: u.isSearchByCategory,
					categoryType: u.categoryType,
					resultTitleKeyword: u.resultTitleKeyword,
					changeByCorDisOnline: !0,
					searchType: u.searchType
				})
			})
		}), e(document).on("click", "[data-soso-map-located]", function(t) {
			var n = e(this),
				r = n.data("obj"),
				i = n.data("prefix"),
				s = n.data("lat"),
				o = n.data("lng"),
				u = n.data("prov"),
				a = n.data("uin"),
				f = n.data("ck"),
				l = n.data("type"),
				c = n.data("nick"),
				h = n.data("online"),
				d = n.attr("title"),
				v = n.data("issellerentauth"),
				m = n.data("licenceauth"),
				g = n.data("tenpayauth"),
				y = n.data("chatbuttonstyle"),
				b = n.data("authicon");
			r && e.report.bernoulli(r);
			var w = {
				nick: c,
				ck: f,
				address: d,
				uin: a,
				type: l,
				onlineFlag: h,
				isSellerEntAuth: v,
				licenceAuth: m,
				tenpayAuth: g,
				chatButtonStyle: y,
				authIcon: b
			};
			i != "hybrid" && (e.report.bernoulli(11479), w = null), console.log(this), e(this).hasClass("qu-result-location") && T.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "Clk_address"]
			]), s && o ? p.panTo(s, o, w) : u && p.panByCity(u, w), t.preventDefault()
		}), e(document).on("click", "[data-qun-soso-map-close]", function(e) {
			p.hide()
		}), e(document).on("click", "[data-clear-target]", function(t) {
			var n = e(this).data("clear-target");
			e("#" + n).val(""), e(this).hide()
		}), e(document).on("keyup", "input[data-clear-btn]", function() {
			e.inputChangeHandler()
		}), e.inputChangeHandler = function() {
			e("input[data-clear-btn]").each(function(t, n) {
				var r = e(n).data("clear-btn");
				r && (r = e("#" + r), e(this).val() !== "" ? r.show() : r.hide())
			})
		}, e(document).on("click", "[data-group-map]", function(e) {
			T.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "Clk_nearby"]
			]), C.bernoulli(11640, ""), l.showNearby(), e.preventDefault()
		}), e(document).on("click", "[group-map-zone-close]", function(e) {
			l.hideNearby(), e.preventDefault()
		}), e(document).on("click", "[qun-map-select-city]", function(e) {
			l.showSelectCity(), e.preventDefault()
		}), e(document).on("click", "[qun-map-select-city-close]", function(e) {
			l.hideSelectCity(), e.preventDefault()
		}), e(document).on("click", "[switch-to-old-wnd]", function(e) {
			x.switsh2OldWnd()
		}), e(document).on("click", ".yellow-tips-clear-net", function(e) {
			return T.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "Clk_notice"]
			]), C.monitor(449701), window.open("http://kf.qq.com/faq/161228RZvQnE161228FfMNZV.html", "_blank"), e.stopPropagation(), e.preventDefault(), !1
		}), e(document).on("click", ".qu-kf-link", function(e) {
			T.reportTdw("dc00141", ["opername", "module", "action"], [
				["Grp_find_pc", "find_page", "Clk_consult_link"]
			])
		}), e(document).on("click", ".yellow-tips-clear-net .btn-map-seller-close", function(t) {
			return C.monitor(449702), e(".yellow-tips-clear-net").remove(), t.stopPropagation(), t.preventDefault(), !1
		}), window.addEventListener("message", function(t) {
			var n;
			if (t.origin === "http://ke.qq.com") {
				if (t.data && t.data.message) {
					if (typeof t.data.message == "string") try {
						n = JSON.parse(t.data.message)
					} catch (t) {
						console.warn("postMessage数据必须是JSON格式或Object")
					} else n = t.data.message;
					if (n.opr) switch (n.opr) {
					case "addPerson":
						n.uin ? x.addBuddy(n.uin, 1) : console.warn("加好友参数不合法\nuin         用户uin");
						break;
					case "viewPersonInfo":
						n.uin && n.tabIndex !== undefined ? x.viewInfo(n.uin, n.tabIndex) : console.warn("打开个人资料卡参数不合法\nuin         用户uin\ntabIndex     定位到资料卡tab，0资料页(default), 1相册, 2空间动态, 3标签");
						break;
					case "viewGroupInfo":
						n.groupCode ? x.viewGroupInfo(n.groupCode, {
							localid: n.groupCode
						}) : console.warn("打开群资料卡参数不合法\ngroupCode         群号");
						break;
					case "addGroup":
						n.groupCode ? x.addToGroup(n.groupCode, 101, 201) : console.warn("加群参数不合法\ngroupCode         群号");
						break;
					case "enterOpenGroup":
						n.groupUin ? x.enterPublicGroup(n.groupUin) : console.warn("进入公开群参数不合法\ngroupCode         群号")
					}
				}
			} else if (t.origin === "http://tiantian.qq.com") {
				if (t.data && t.data.message) {
					if (typeof t.data.message == "string") try {
						n = JSON.parse(t.data.message)
					} catch (t) {
						console.warn("postMessage数据必须是JSON格式或Object")
					} else n = t.data.message;
					if (n.opr) switch (n.opr) {
					case "openRoom":
						n.roomId ? n.anchorUin && n.sourceId ? x.invokeGuaGuaByShortId(w.uin(), w.uin(), n.roomId, {
							anchor_uin: n.anchorUin,
							srcid: n.sourceId
						}) : x.invokeGuaGua(w.uin(), w.uin(), n.roomId) : console.warn("加好友参数不合法\nroomId         房间id")
					}
				}
			} else if (t.origin === "http://qqweb.qq.com" && t.data) if (t.data === "return") e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", ""), l.hoverByUser = !1;
			else {
				var r = {
					width: 800,
					height: 600,
					title: "群活动",
					url: t.data,
					singletonId: "12345"
				};
				x.callHummerApi("Group.PopNewWebPage", r)
			}
		}), e(document).on("click", "#qu-activity-top-mask", function(t) {
			return e("#qu-activity-result").hide(), e("#qu-activity-result-iframe").attr("src", ""), l.hoverByUser = !1, !1
		}), e(document).on("click", "[data-ask-public]", function(e) {
			return x.openPublicAIO(this.getAttribute("data-ask-public") + ""), !1
		}), e(document).on("click", "[data-focus-public]", function(e) {
			return x.focusPublic(this.getAttribute("data-focus-public") + ""), !1
		}), e(document).on("click", "[data-open-public-profile]", function(e) {
			return x.openPublicProfile(this.getAttribute("data-open-public-profile") + ""), !1
		}), e(document).on("click", "[data-open-qidian-profile]", function(e) {
			return x.crmViewInfo(this.getAttribute("data-open-qidian-profile") + "", ""), !1
		}), e(document).on("click", "[data-ask-qidian-account]", function(e) {
			return x.crmStartChat(this.getAttribute("data-ask-qidian-account")), !1
		}), e(document).on("click", "[data-qidian-add-friend]", function(e) {
			return x.crmAddBuddy(this.getAttribute("data-qidian-add-friend"), this.getAttribute("data-qidian-nick"), this.getAttribute("data-qidian-lianghao")), !1
		})
	}), !
	function(e) {
		typeof define == "function" ? define("helper/debug", ["../$"], e) : e($)
	}(function(e) {
		"use strict";
		var t = !1;
		e(document).on("keydown", function(e) {
			e.keyCode === 123 && e.ctrlKey && !t && (t = !0, function(e, t, n, r, i, s, o, u, a, f, l) {
				if (e.getElementById(i)) return;
				l = e[t + "NS"] && e.documentElement.namespaceURI, l = l ? e[t + "NS"](l, "script") : e[t]("script"), l[n]("id", i), l[n]("src", a + o + f), l[n](i, s), (e[r]("head")[0] || e[r]("body")[0]).appendChild(l), l = new Image, l[n]("src", a + u)
			}(document, "createElement", "setAttribute", "getElementsByTagName", "FirebugLite", "4", "build/firebug-lite.js", "skin/xp/sprite.png", "http://s.url.cn/lib/firebug-lite/", "#startOpened")), e.keyCode === 116 && location.reload()
		})
	}), _speedTiming[8] = +(new Date), window.qqfind || (window.qqfind = {}), window.qqfind.findjsnocdnrejected = !0, require.config({
		paths: {
			$: "./$",
			tmpl: "../lib/require/tmpl"
		}
	}), require(["$", "tmpl!template/peSearch.html", "tmpl!template/peSearch54.html", "tools/tdw", "tools/native", "tools/info", "tools/plugin", "tools/loading", "./hybrid", "./widget/ke", "./view", "./binds", "./helper/debug"], function(e, t, n, r, i, s, o, u, a, f) {
		function h(e, t) {
			t = t || location.href, t = t.split("?"), t[1] && (t = t[1]), t = decodeURIComponent(t);
			var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"),
				r = t.match(n);
			return decodeURIComponent(r ? r[2] : "")
		}
		function g() {
			d += 1, m < v.length && setTimeout(g, 1e3), v[m] == d && (m++, e.report.bernoulli(11865, window.FromTencentId, d))
		}
		function y(t) {
			var n = h("search_target", t),
				i = h("search_word", t),
				o = h("search_keyword", t),
				u = h("longitude", t),
				f = h("latitude", t);
			n == 2 && (n = 0), window.FromTencentId = h("FromTencentId", t) || 0;
			if (window.FromTencentId) {
				g();
				var c = h("data", t);
				if (c) {
					var p = e.parseJSON(decodeURIComponent(decodeURIComponent(decodeURIComponent(c)))),
						d = h("traceid", t);
					r.reportTdw("dc00141", ["uin", "opername", "module", "action", "obj1", "obj2", "ver1", "ver2"], [
						[e.cookie.uin(), "qqfind", "index", "gdt_load_start_time", 0, l, 0, d + "|" + (p.POSID || 0) + "|" + (p.ADID || 0) + "|" + (p.SRCID || 0) + "|" + p.TIME, _speedTiming[0]],
						[e.cookie.uin(), "qqfind", "index", "gdt_load_done_time", 0, l, 0, d + "|" + (p.POSID || 0) + "|" + (p.ADID || 0) + "|" + (p.SRCID || 0) + "|" + p.TIME, +(new Date(0))]
					])
				} else window.reportGDT = function() {}
			}
			if (n === "" || n == 0 && i === "" && o === "") {
				var v = e.cookie.uin(),
					m = localStorage[v + "_last_tab"] || "people";
				window.currentPageTarget = m, !e("#livestudio").length && m === "livestudio" && (m = "people"), b(m), a.userTrack = 0, e.view.nav({
					target: m,
					search: !1,
					keyword: "",
					isDefault: !0
				})
			} else {
				var m = [null, "qqun", "seller", "", "", "people", "hybrid"][n] || "people",
					y = i;
				window.currentPageTarget = m, b(m);
				switch (n) {
				case "0":
				case "1":
				case "2":
				case "5":
				case "6":
					var E = o,
						S = h("search_id", t);
					y != null && y !== "" && (E = y, y = !0), e.view.nav({
						target: m,
						search: y,
						keyword: E,
						categoryId: S,
						log: u,
						lat: f
					});
					break;
				case "7":
					e.view.nav({
						target: "hybrid",
						search: !1,
						keyword: ""
					}), subjectEntrance.open({
						subjectName: y
					});
					break;
				case "8":
					e.view.nav({
						target: "hybrid",
						search: !1,
						keyword: ""
					});
					try {
						var x = h("search_source", t),
							T = h("search_param", t);
						T = JSON.parse(T), T.source = parseInt(x), w(T)
					} catch (N) {}
					break;
				case "9":
					a.userTrack = 700;
					var E = h("search_keyword", t),
						S = h("search_id", t),
						C = h("search_type", t);
					y != null && y !== "" && (E = y, y = !0), e.view.nav({
						target: m,
						search: y,
						keyword: E,
						categoryId: S,
						searchType: C
					}), s.getInfo(function(t) {
						e.report.bernoulli(11402, a.userTrack + "^" + t.reportp2c + "^")
					});
					break;
				default:
					a.userTrack = 0, e.view.nav({
						target: "people",
						search: !1,
						keyword: ""
					})
				}
			}
		}
		function b(t) {
			e("#header-nav ul li:first").removeClass("active");
			var n = e("menu [data-nav=" + t + "]");
			n.parent("li").addClass("active")
		}
		var l = i.getVersion();
		window.inZip = !1, window.cacheVersion = "undefined", _speedTiming[9] = +(new Date), e.cookie.updateUinSkey();
		if (!e.cookie.uin() || !e.cookie.skey()) i.getClientKey() ? i.reLoadWithPtlogin() : (i.setUinSkey("login"), e.report.monitor(319256));
		if (localStorage.getItem("enterNavHot") !== "1") {
			var c = document.getElementById("J_navHotCorner");
			c && (c.style.display = "block")
		}
		var p = h("redirectpt");
		p && e.report.monitor(321563);
		var d = 0,
			v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 45, 60, 120, 180, 240, 300],
			m = 0,
			w = function(e, t) {
				t = t || 0;
				if (window.profileMask) window.profileMask.openProfile(e);
				else {
					if (t > 20) return;
					setTimeout(function() {
						w(e, t++)
					}, 300)
				}
			},
			E = window.location.href;
		e("#livestudio").length > 0 && e.report.bernoulli(12088), E.indexOf("im_version") > 0 ? (e(".icon-nav-up-display").addClass("icon-nav-up-arrow2"), e("#pe-main").before(n())) : (e(".icon-nav-up-display").addClass("icon-nav-up-arrow"), e("#pe-main").before(t())), y(), e(document).ready(function() {
			window.locationCb = function(e) {
				window.locationMap = e
			}, window.locationLat = function(e) {
				window.LatlngMap = e
			};
			var t = e(".nav-bar");
			_speedTiming[10] = +(new Date);
			var n, r, i, s;
			typeof qqfind == "undefined" || typeof qqfind.jquerycdnrejected == "undefined" || qqfind.jquerycdnrejected !== !0 ? (n = "http://s.url.cn/qqfind/js/location4.js", s = "http://s.url.cn/qqfind/js/extScript.js", r = "http://s.url.cn/qqfind/js/widget/contextmenu.js", i = "http://s.url.cn/qqfind/js/location.js") : (n = "http://find.qq.com/js/location4.js", r = "http://find.qq.com/js/widget/contextmenu.js", i = "http://find.qq.com/js/location.js", s = "http://find.qq.com/js/extScript.js"), e.ajax({
				dataType: "script",
				cache: !0,
				url: n
			}), e.ajax({
				dataType: "script",
				cache: !0,
				url: i
			}), e.ajax({
				dataType: "script",
				cache: !1,
				url: s
			}), e.ajax({
				dataType: "script",
				cache: !0,
				url: r,
				success: function() {
					e.contextMenu({
						selector: "#pe-search-input, #hy-search-input, #qu-search-input, #is-search-keyword",
						zIndex: 1e3,
						callback: function(t, n) {
							try {
								var r = "#" + n.$trigger.context.id
							} catch (i) {
								return
							}
							e.contextmenuAssistant.behaviorAccordingKey(t, r)
						},
						items: {
							revert: {
								name: "撤销"
							},
							sep1: "---------",
							cut: {
								name: "剪切"
							},
							copy: {
								name: "复制"
							},
							paste: {
								name: "粘贴"
							},
							"delete": {
								name: "删除"
							},
							sep2: "---------",
							selectall: {
								name: "全部选择"
							}
						},
						events: {
							show: function(t) {
								try {
									var n = "#" + t.$trigger.context.id
								} catch (r) {
									return
								}
								e(".context-menu-list").css("width", 122);
								var i = e.contextmenuAssistant.getList(n);
								i[0].forEach(function(e) {
									t.items[e].disabled = !0
								}), i[1].forEach(function(e) {
									t.items[e].disabled = !1
								})
							},
							hide: function(e) {}
						}
					})
				}
			}), e.getScript("http://s.url.cn/qqfind/js/profile.mask.js?t=20140424001")
		});
		var S = function() {
				e.report.performance(7832, 37, 2), function n() {
					if (window.currentPageTarget && window.currentPageTarget === "qqun" || window.currentPageTarget === "people" || window.currentPageTarget === "hybrid") {
						_speedTiming[5] = _tabsTiming[window.currentPageTarget].startCGI, _speedTiming[6] = _tabsTiming[window.currentPageTarget].CGIend, _speedTiming[7] = _tabsTiming[window.currentPageTarget].firstScreen;
						if (_speedTiming[6] && _speedTiming[7] && _speedTiming[8] && _speedTiming[9] && _speedTiming[10]) {
							var t = [];
							t[0] = _speedTiming[0], t[1] = _speedTiming[1], t[2] = _speedTiming[2], t[3] = _speedTiming[8], t[4] = _tabsTiming.hybrid.startCGI || 0, t[5] = _tabsTiming.hybrid.CGIend || 0, t[6] = _tabsTiming.hybrid.firstScreen || 0, t[7] = _tabsTiming.people.startCGI || 0, t[8] = _tabsTiming.people.CGIend || 0, t[9] = _tabsTiming.people.firstScreen || 0, t[10] = _tabsTiming.qqun.startCGI || 0, t[11] = _tabsTiming.qqun.CGIend || 0, t[12] = _tabsTiming.qqun.firstScreen || 0, t[13] = _speedTiming[10], e.report.isd(7832, 37, 3, t)
						} else window.setTimeout(n, 1500)
					} else window.setTimeout(n, 1500)
				}();
				var t = [_speedTiming[1] - _speedTiming[0], _speedTiming[2] - _speedTiming[0], _speedTiming[3] - _speedTiming[0]];
				window.inZip ? e.report.isdSingleTags(7832, 8, 3, [2, 4, 6], t) : window.cacheVersion == localStorage.getItem("cacheVersion") ? e.report.isdSingleTags(7832, 8, 3, [7, 9, 8], t) : (localStorage.setItem("cacheVersion", window.cacheVersion), e.report.isdSingleTags(7832, 8, 3, [1, 3, 5], t))
			};
		window.ONLOADED ? S() : window.onload = S, window.onLocationChange = function(e) {
			y(e)
		}
	}), define("main", function() {})
})();