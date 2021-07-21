!(function(e, t) {
  typeof exports === 'object' && typeof module === 'object' ? module.exports = t() : typeof define === 'function' && define.amd ? define([], t) : typeof exports === 'object' ? exports.HomeyLib = t() : e.HomeyLib = t();
}(window, (() => {
  return (function(e) {
    const t = {}; function r(a) {
      if (t[a]) return t[a].exports; const n = t[a] = { i: a, l: !1, exports: {} }; return e[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    } return r.m = e, r.c = t, r.d = function(e, t, a) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }, r.r = function(e) {
      typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
    }, r.t = function(e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e; if (4 & t && typeof e === 'object' && e && e.__esModule) return e; const a = Object.create(null); if (r.r(a), Object.defineProperty(a, 'default', { enumerable: !0, value: e }), 2 & t && typeof e !== 'string') {
        for (const n in e) {
          r.d(a, n, (t => {
            return e[t];
          }).bind(null, n));
        }
      } return a;
    }, r.n = function(e) {
      const t = e && e.__esModule ? function() {
        return e.default;
      } : function() {
        return e;
      }; return r.d(t, 'a', t), t;
    }, r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = '', r(r.s = 24);
  }([function(e, t, r) {
    'use strict';

    function a(e, t, r) {
      const a = r ? ' !== ' : ' === '; const n = r ? ' || ' : ' && '; const i = r ? '!' : ''; const s = r ? '' : '!'; switch (e) {
        case 'null': return `${t + a}null`; case 'array': return `${i}Array.isArray(${t})`; case 'object': return `(${i}${t}${n}typeof ${t}${a}"object"${n}${s}Array.isArray(${t}))`; case 'integer': return `(typeof ${t}${a}"number"${n}${s}(${t} % 1)${n}${t}${a}${t})`; default: return `typeof ${t}${a}"${e}"`;
      }
    }e.exports = {
      copy(e, t) {
        for (const r in t = t || {}, e)t[r] = e[r]; return t;
      },
      checkDataType: a,
      checkDataTypes(e, t) {
        switch (e.length) {
          case 1: return a(e[0], t, !0); default: var r = ''; var n = i(e); for (const s in n.array && n.object && (r = n.null ? '(' : `(!${t} || `, r += `typeof ${t} !== "object")`, delete n.null, delete n.array, delete n.object), n.number && delete n.integer, n)r += (r ? ' && ' : '') + a(s, t, !0); return r;
        }
      },
      coerceToTypes(e, t) {
        if (Array.isArray(t)) {
          for (var r = [], a = 0; a < t.length; a++) {
            const i = t[a]; (n[i] || e === 'array' && i === 'array') && (r[r.length] = i);
          } if (r.length) return r;
        } else {
          if (n[t]) return [t]; if (e === 'array' && t === 'array') return ['array'];
        }
      },
      toHash: i,
      getProperty: l,
      escapeQuotes: u,
      equal: r(4),
      ucs2length: r(36),
      varOccurences(e, t) {
        t += '[^0-9]'; const r = e.match(new RegExp(t, 'g')); return r ? r.length : 0;
      },
      varReplace(e, t, r) {
        return t += '([^0-9])', r = r.replace(/\$/g, '$$$$'), e.replace(new RegExp(t, 'g'), `${r}$1`);
      },
      cleanUpCode(e) {
        return e.replace(d, '').replace(c, '').replace(m, 'if (!($1))');
      },
      finalCleanUpCode(e, t) {
        let r = e.match(p); r && r.length == 2 && (e = t ? e.replace(f, '').replace(v, 'return data;') : e.replace(h, '').replace('return errors === 0;', 'validate.errors = null; return true;')); return (r = e.match(g)) && r.length === 3 ? e.replace(y, '') : e;
      },
      schemaHasRules(e, t) {
        if (typeof e === 'boolean') return !e; for (const r in e) if (t[r]) return !0;
      },
      schemaHasRulesExcept(e, t, r) {
        if (typeof e === 'boolean') return !e && r != 'not'; for (const a in e) if (a != r && t[a]) return !0;
      },
      toQuotedString: b,
      getPathExpr(e, t, r, a) {
        return _(e, r ? `'/' + ${t}${a ? '' : ".replace(/~/g, '~0').replace(/\\//g, '~1')"}` : a ? `'[' + ${t} + ']'` : `'[\\'' + ${t} + '\\']'`);
      },
      getPath(e, t, r) {
        const a = b(r ? `/${S(t)}` : l(t)); return _(e, a);
      },
      getData(e, t, r) {
        let a; let n; let i; let s; if (e === '') return 'rootData'; if (e[0] == '/') {
          if (!k.test(e)) throw new Error(`Invalid JSON-pointer: ${e}`); n = e, i = 'rootData';
        } else {
          if (!(s = e.match(w))) throw new Error(`Invalid JSON-pointer: ${e}`); if (a = +s[1], (n = s[2]) == '#') {
            if (a >= t) throw new Error(`Cannot access property/index ${a} levels up, current level is ${t}`); return r[t - a];
          } if (a > t) throw new Error(`Cannot access data ${a} levels up, current level is ${t}`); if (i = `data${t - a || ''}`, !n) return i;
        } for (var o = i, u = n.split('/'), d = 0; d < u.length; d++) {
          const c = u[d]; c && (i += l(P(c)), o += ` && ${i}`);
        } return o;
      },
      unescapeFragment(e) {
        return P(decodeURIComponent(e));
      },
      unescapeJsonPointer: P,
      escapeFragment(e) {
        return encodeURIComponent(S(e));
      },
      escapeJsonPointer: S,
    }; var n = i(['string', 'number', 'integer', 'boolean', 'null']); function i(e) {
      for (var t = {}, r = 0; r < e.length; r++)t[e[r]] = !0; return t;
    } const s = /^[a-z$_][a-z$_0-9]*$/i; const o = /'|\\/g; function l(e) {
      return typeof e === 'number' ? `[${e}]` : s.test(e) ? `.${e}` : `['${u(e)}']`;
    } function u(e) {
      return e.replace(o, '\\$&').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\f/g, '\\f')
        .replace(/\t/g, '\\t');
    } var d = /else\s*{\s*}/g; var c = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g; var m = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g; var p = /[^v.]errors/g; var h = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g; var f = /var errors = 0;|var vErrors = null;/g; var v = /if \(errors === 0\) return data;\s*else throw new ValidationError\(vErrors\);/; var g = /[^A-Za-z_$]rootData[^A-Za-z0-9_$]/g; var y = /if \(rootData === undefined\) rootData = data;/; function b(e) {
      return `'${u(e)}'`;
    } var k = /^\/(?:[^~]|~0|~1)*$/; var w = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/; function _(e, t) {
      return e == '""' ? t : (`${e} + ${t}`).replace(/' \+ '/g, '');
    } function S(e) {
      return e.replace(/~/g, '~0').replace(/\//g, '~1');
    } function P(e) {
      return e.replace(/~1/g, '/').replace(/~0/g, '~');
    }
  }, function(e, t) {}, function(e, t, r) {
    'use strict';

    (function(e) {
    /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
      const a = r(26); const n = r(27); const i = r(28); function s() {
        return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      } function o(e, t) {
        if (s() < t) throw new RangeError('Invalid typed array length'); return l.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = l.prototype : (e === null && (e = new l(t)), e.length = t), e;
      } function l(e, t, r) {
        if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(e, t, r); if (typeof e === 'number') {
          if (typeof t === 'string') throw new Error('If encoding is specified then the first argument must be a string'); return c(this, e);
        } return u(this, e, t, r);
      } function u(e, t, r, a) {
        if (typeof t === 'number') throw new TypeError('"value" argument must not be a number'); return typeof ArrayBuffer !== 'undefined' && t instanceof ArrayBuffer ? (function(e, t, r, a) {
          if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds"); if (t.byteLength < r + (a || 0)) throw new RangeError("'length' is out of bounds"); t = void 0 === r && void 0 === a ? new Uint8Array(t) : void 0 === a ? new Uint8Array(t, r) : new Uint8Array(t, r, a); l.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = l.prototype : e = m(e, t); return e;
        }(e, t, r, a)) : typeof t === 'string' ? (function(e, t, r) {
          typeof r === 'string' && r !== '' || (r = 'utf8'); if (!l.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding'); const a = 0 | h(t, r); const n = (e = o(e, a)).write(t, r); n !== a && (e = e.slice(0, n)); return e;
        }(e, t, r)) : (function(e, t) {
          if (l.isBuffer(t)) {
            const r = 0 | p(t.length); return (e = o(e, r)).length === 0 || t.copy(e, 0, 0, r), e;
          } if (t) {
            if (typeof ArrayBuffer !== 'undefined' && t.buffer instanceof ArrayBuffer || 'length' in t) return typeof t.length !== 'number' || (a = t.length) != a ? o(e, 0) : m(e, t); if (t.type === 'Buffer' && i(t.data)) return m(e, t.data);
          } let a; throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
        }(e, t));
      } function d(e) {
        if (typeof e !== 'number') throw new TypeError('"size" argument must be a number'); if (e < 0) throw new RangeError('"size" argument must not be negative');
      } function c(e, t) {
        if (d(t), e = o(e, t < 0 ? 0 : 0 | p(t)), !l.TYPED_ARRAY_SUPPORT) for (let r = 0; r < t; ++r)e[r] = 0; return e;
      } function m(e, t) {
        const r = t.length < 0 ? 0 : 0 | p(t.length); e = o(e, r); for (let a = 0; a < r; a += 1)e[a] = 255 & t[a]; return e;
      } function p(e) {
        if (e >= s()) throw new RangeError(`Attempt to allocate Buffer larger than maximum size: 0x${s().toString(16)} bytes`); return 0 | e;
      } function h(e, t) {
        if (l.isBuffer(e)) return e.length; if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength; typeof e !== 'string' && (e = `${e}`); const r = e.length; if (r === 0) return 0; for (let a = !1; ;) {
          switch (t) {
            case 'ascii': case 'latin1': case 'binary': return r; case 'utf8': case 'utf-8': case void 0: return B(e).length; case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': return 2 * r; case 'hex': return r >>> 1; case 'base64': return U(e).length; default: if (a) return B(e).length; t = (`${t}`).toLowerCase(), a = !0;
          }
        }
      } function f(e, t, r) {
        let a = !1; if ((void 0 === t || t < 0) && (t = 0), t > this.length) return ''; if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return ''; if ((r >>>= 0) <= (t >>>= 0)) return ''; for (e || (e = 'utf8'); ;) {
          switch (e) {
            case 'hex': return O(this, t, r); case 'utf8': case 'utf-8': return E(this, t, r); case 'ascii': return x(this, t, r); case 'latin1': case 'binary': return C(this, t, r); case 'base64': return A(this, t, r); case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': return j(this, t, r); default: if (a) throw new TypeError(`Unknown encoding: ${e}`); e = (`${e}`).toLowerCase(), a = !0;
          }
        }
      } function v(e, t, r) {
        const a = e[t]; e[t] = e[r], e[r] = a;
      } function g(e, t, r, a, n) {
        if (e.length === 0) return -1; if (typeof r === 'string' ? (a = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = n ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
          if (n) return -1; r = e.length - 1;
        } else if (r < 0) {
          if (!n) return -1; r = 0;
        } if (typeof t === 'string' && (t = l.from(t, a)), l.isBuffer(t)) return t.length === 0 ? -1 : y(e, t, r, a, n); if (typeof t === 'number') return t &= 255, l.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function' ? n ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : y(e, [t], r, a, n); throw new TypeError('val must be string, number or Buffer');
      } function y(e, t, r, a, n) {
        let i; let s = 1; let o = e.length; let l = t.length; if (void 0 !== a && ((a = String(a).toLowerCase()) === 'ucs2' || a === 'ucs-2' || a === 'utf16le' || a === 'utf-16le')) {
          if (e.length < 2 || t.length < 2) return -1; s = 2, o /= 2, l /= 2, r /= 2;
        } function u(e, t) {
          return s === 1 ? e[t] : e.readUInt16BE(t * s);
        } if (n) {
          let d = -1; for (i = r; i < o; i++) {
            if (u(e, i) === u(t, d === -1 ? 0 : i - d)) {
              if (d === -1 && (d = i), i - d + 1 === l) return d * s;
            } else d !== -1 && (i -= i - d), d = -1;
          }
        } else {
          for (r + l > o && (r = o - l), i = r; i >= 0; i--) {
            for (var c = !0, m = 0; m < l; m++) {
              if (u(e, i + m) !== u(t, m)) {
                c = !1; break;
              }
            } if (c) return i;
          }
        } return -1;
      } function b(e, t, r, a) {
        r = Number(r) || 0; const n = e.length - r; a ? (a = Number(a)) > n && (a = n) : a = n; const i = t.length; if (i % 2 != 0) throw new TypeError('Invalid hex string'); a > i / 2 && (a = i / 2); for (var s = 0; s < a; ++s) {
          const o = parseInt(t.substr(2 * s, 2), 16); if (isNaN(o)) return s; e[r + s] = o;
        } return s;
      } function k(e, t, r, a) {
        return M(B(t, e.length - r), e, r, a);
      } function w(e, t, r, a) {
        return M((function(e) {
          for (var t = [], r = 0; r < e.length; ++r)t.push(255 & e.charCodeAt(r)); return t;
        }(t)), e, r, a);
      } function _(e, t, r, a) {
        return w(e, t, r, a);
      } function S(e, t, r, a) {
        return M(U(t), e, r, a);
      } function P(e, t, r, a) {
        return M((function(e, t) {
          for (var r, a, n, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)r = e.charCodeAt(s), a = r >> 8, n = r % 256, i.push(n), i.push(a); return i;
        }(t, e.length - r)), e, r, a);
      } function A(e, t, r) {
        return t === 0 && r === e.length ? a.fromByteArray(e) : a.fromByteArray(e.slice(t, r));
      } function E(e, t, r) {
        r = Math.min(e.length, r); for (var a = [], n = t; n < r;) {
          var i; var s; var o; var l; const u = e[n]; let d = null; let c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1; if (n + c <= r) {
            switch (c) {
              case 1: u < 128 && (d = u); break; case 2: (192 & (i = e[n + 1])) == 128 && (l = (31 & u) << 6 | 63 & i) > 127 && (d = l); break; case 3: i = e[n + 1], s = e[n + 2], (192 & i) == 128 && (192 & s) == 128 && (l = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (l < 55296 || l > 57343) && (d = l); break; case 4: i = e[n + 1], s = e[n + 2], o = e[n + 3], (192 & i) == 128 && (192 & s) == 128 && (192 & o) == 128 && (l = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & o) > 65535 && l < 1114112 && (d = l);
            }
          }d === null ? (d = 65533, c = 1) : d > 65535 && (d -= 65536, a.push(d >>> 10 & 1023 | 55296), d = 56320 | 1023 & d), a.push(d), n += c;
        } return (function(e) {
          const t = e.length; if (t <= 4096) return String.fromCharCode.apply(String, e); let r = ''; let a = 0; for (;a < t;)r += String.fromCharCode.apply(String, e.slice(a, a += 4096)); return r;
        }(a));
      }t.Buffer = l, t.SlowBuffer = function(e) {
        +e != e && (e = 0); return l.alloc(+e);
      }, t.INSPECT_MAX_BYTES = 50, l.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : (function() {
        try {
          const e = new Uint8Array(1); return e.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo() {
              return 42;
            },
          }, e.foo() === 42 && typeof e.subarray === 'function' && e.subarray(1, 1).byteLength === 0;
        } catch (e) {
          return !1;
        }
      }()), t.kMaxLength = s(), l.poolSize = 8192, l._augment = function(e) {
        return e.__proto__ = l.prototype, e;
      }, l.from = function(e, t, r) {
        return u(null, e, t, r);
      }, l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, typeof Symbol !== 'undefined' && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, { value: null, configurable: !0 })), l.alloc = function(e, t, r) {
        return (function(e, t, r, a) {
          return d(t), t <= 0 ? o(e, t) : void 0 !== r ? typeof a === 'string' ? o(e, t).fill(r, a) : o(e, t).fill(r) : o(e, t);
        }(null, e, t, r));
      }, l.allocUnsafe = function(e) {
        return c(null, e);
      }, l.allocUnsafeSlow = function(e) {
        return c(null, e);
      }, l.isBuffer = function(e) {
        return !(e == null || !e._isBuffer);
      }, l.compare = function(e, t) {
        if (!l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError('Arguments must be Buffers'); if (e === t) return 0; for (var r = e.length, a = t.length, n = 0, i = Math.min(r, a); n < i; ++n) {
          if (e[n] !== t[n]) {
            r = e[n], a = t[n]; break;
          }
        } return r < a ? -1 : a < r ? 1 : 0;
      }, l.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
          case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'latin1': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': return !0; default: return !1;
        }
      }, l.concat = function(e, t) {
        if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers'); if (e.length === 0) return l.alloc(0); let r; if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r)t += e[r].length; const a = l.allocUnsafe(t); let n = 0; for (r = 0; r < e.length; ++r) {
          const s = e[r]; if (!l.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers'); s.copy(a, n), n += s.length;
        } return a;
      }, l.byteLength = h, l.prototype._isBuffer = !0, l.prototype.swap16 = function() {
        const e = this.length; if (e % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits'); for (let t = 0; t < e; t += 2)v(this, t, t + 1); return this;
      }, l.prototype.swap32 = function() {
        const e = this.length; if (e % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits'); for (let t = 0; t < e; t += 4)v(this, t, t + 3), v(this, t + 1, t + 2); return this;
      }, l.prototype.swap64 = function() {
        const e = this.length; if (e % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits'); for (let t = 0; t < e; t += 8)v(this, t, t + 7), v(this, t + 1, t + 6), v(this, t + 2, t + 5), v(this, t + 3, t + 4); return this;
      }, l.prototype.toString = function() {
        const e = 0 | this.length; return e === 0 ? '' : arguments.length === 0 ? E(this, 0, e) : f.apply(this, arguments);
      }, l.prototype.equals = function(e) {
        if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer'); return this === e || l.compare(this, e) === 0;
      }, l.prototype.inspect = function() {
        let e = ''; const r = t.INSPECT_MAX_BYTES; return this.length > 0 && (e = this.toString('hex', 0, r).match(/.{2}/g).join(' '), this.length > r && (e += ' ... ')), `<Buffer ${e}>`;
      }, l.prototype.compare = function(e, t, r, a, n) {
        if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer'); if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === a && (a = 0), void 0 === n && (n = this.length), t < 0 || r > e.length || a < 0 || n > this.length) throw new RangeError('out of range index'); if (a >= n && t >= r) return 0; if (a >= n) return -1; if (t >= r) return 1; if (this === e) return 0; for (var i = (n >>>= 0) - (a >>>= 0), s = (r >>>= 0) - (t >>>= 0), o = Math.min(i, s), u = this.slice(a, n), d = e.slice(t, r), c = 0; c < o; ++c) {
          if (u[c] !== d[c]) {
            i = u[c], s = d[c]; break;
          }
        } return i < s ? -1 : s < i ? 1 : 0;
      }, l.prototype.includes = function(e, t, r) {
        return this.indexOf(e, t, r) !== -1;
      }, l.prototype.indexOf = function(e, t, r) {
        return g(this, e, t, r, !0);
      }, l.prototype.lastIndexOf = function(e, t, r) {
        return g(this, e, t, r, !1);
      }, l.prototype.write = function(e, t, r, a) {
        if (void 0 === t)a = 'utf8', r = this.length, t = 0; else if (void 0 === r && typeof t === 'string')a = t, r = this.length, t = 0; else {
          if (!isFinite(t)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported'); t |= 0, isFinite(r) ? (r |= 0, void 0 === a && (a = 'utf8')) : (a = r, r = void 0);
        } const n = this.length - t; if ((void 0 === r || r > n) && (r = n), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError('Attempt to write outside buffer bounds'); a || (a = 'utf8'); for (let i = !1; ;) {
          switch (a) {
            case 'hex': return b(this, e, t, r); case 'utf8': case 'utf-8': return k(this, e, t, r); case 'ascii': return w(this, e, t, r); case 'latin1': case 'binary': return _(this, e, t, r); case 'base64': return S(this, e, t, r); case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': return P(this, e, t, r); default: if (i) throw new TypeError(`Unknown encoding: ${a}`); a = (`${a}`).toLowerCase(), i = !0;
          }
        }
      }, l.prototype.toJSON = function() {
        return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
      }; function x(e, t, r) {
        let a = ''; r = Math.min(e.length, r); for (let n = t; n < r; ++n)a += String.fromCharCode(127 & e[n]); return a;
      } function C(e, t, r) {
        let a = ''; r = Math.min(e.length, r); for (let n = t; n < r; ++n)a += String.fromCharCode(e[n]); return a;
      } function O(e, t, r) {
        const a = e.length; (!t || t < 0) && (t = 0), (!r || r < 0 || r > a) && (r = a); for (var n = '', i = t; i < r; ++i)n += F(e[i]); return n;
      } function j(e, t, r) {
        for (var a = e.slice(t, r), n = '', i = 0; i < a.length; i += 2)n += String.fromCharCode(a[i] + 256 * a[i + 1]); return n;
      } function L(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint'); if (e + t > r) throw new RangeError('Trying to access beyond buffer length');
      } function $(e, t, r, a, n, i) {
        if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance'); if (t > n || t < i) throw new RangeError('"value" argument is out of bounds'); if (r + a > e.length) throw new RangeError('Index out of range');
      } function T(e, t, r, a) {
        t < 0 && (t = 65535 + t + 1); for (let n = 0, i = Math.min(e.length - r, 2); n < i; ++n)e[r + n] = (t & 255 << 8 * (a ? n : 1 - n)) >>> 8 * (a ? n : 1 - n);
      } function D(e, t, r, a) {
        t < 0 && (t = 4294967295 + t + 1); for (let n = 0, i = Math.min(e.length - r, 4); n < i; ++n)e[r + n] = t >>> 8 * (a ? n : 3 - n) & 255;
      } function R(e, t, r, a, n, i) {
        if (r + a > e.length) throw new RangeError('Index out of range'); if (r < 0) throw new RangeError('Index out of range');
      } function z(e, t, r, a, i) {
        return i || R(e, 0, r, 4), n.write(e, t, r, a, 23, 4), r + 4;
      } function I(e, t, r, a, i) {
        return i || R(e, 0, r, 8), n.write(e, t, r, a, 52, 8), r + 8;
      }l.prototype.slice = function(e, t) {
        let r; const a = this.length; if ((e = ~~e) < 0 ? (e += a) < 0 && (e = 0) : e > a && (e = a), (t = void 0 === t ? a : ~~t) < 0 ? (t += a) < 0 && (t = 0) : t > a && (t = a), t < e && (t = e), l.TYPED_ARRAY_SUPPORT)(r = this.subarray(e, t)).__proto__ = l.prototype; else {
          const n = t - e; r = new l(n, void 0); for (let i = 0; i < n; ++i)r[i] = this[i + e];
        } return r;
      }, l.prototype.readUIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || L(e, t, this.length); for (var a = this[e], n = 1, i = 0; ++i < t && (n *= 256);)a += this[e + i] * n; return a;
      }, l.prototype.readUIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || L(e, t, this.length); for (var a = this[e + --t], n = 1; t > 0 && (n *= 256);)a += this[e + --t] * n; return a;
      }, l.prototype.readUInt8 = function(e, t) {
        return t || L(e, 1, this.length), this[e];
      }, l.prototype.readUInt16LE = function(e, t) {
        return t || L(e, 2, this.length), this[e] | this[e + 1] << 8;
      }, l.prototype.readUInt16BE = function(e, t) {
        return t || L(e, 2, this.length), this[e] << 8 | this[e + 1];
      }, l.prototype.readUInt32LE = function(e, t) {
        return t || L(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
      }, l.prototype.readUInt32BE = function(e, t) {
        return t || L(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      }, l.prototype.readIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || L(e, t, this.length); for (var a = this[e], n = 1, i = 0; ++i < t && (n *= 256);)a += this[e + i] * n; return a >= (n *= 128) && (a -= Math.pow(2, 8 * t)), a;
      }, l.prototype.readIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || L(e, t, this.length); for (var a = t, n = 1, i = this[e + --a]; a > 0 && (n *= 256);)i += this[e + --a] * n; return i >= (n *= 128) && (i -= Math.pow(2, 8 * t)), i;
      }, l.prototype.readInt8 = function(e, t) {
        return t || L(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
      }, l.prototype.readInt16LE = function(e, t) {
        t || L(e, 2, this.length); const r = this[e] | this[e + 1] << 8; return 32768 & r ? 4294901760 | r : r;
      }, l.prototype.readInt16BE = function(e, t) {
        t || L(e, 2, this.length); const r = this[e + 1] | this[e] << 8; return 32768 & r ? 4294901760 | r : r;
      }, l.prototype.readInt32LE = function(e, t) {
        return t || L(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      }, l.prototype.readInt32BE = function(e, t) {
        return t || L(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      }, l.prototype.readFloatLE = function(e, t) {
        return t || L(e, 4, this.length), n.read(this, e, !0, 23, 4);
      }, l.prototype.readFloatBE = function(e, t) {
        return t || L(e, 4, this.length), n.read(this, e, !1, 23, 4);
      }, l.prototype.readDoubleLE = function(e, t) {
        return t || L(e, 8, this.length), n.read(this, e, !0, 52, 8);
      }, l.prototype.readDoubleBE = function(e, t) {
        return t || L(e, 8, this.length), n.read(this, e, !1, 52, 8);
      }, l.prototype.writeUIntLE = function(e, t, r, a) {
        (e = +e, t |= 0, r |= 0, a) || $(this, e, t, r, Math.pow(2, 8 * r) - 1, 0); let n = 1; let i = 0; for (this[t] = 255 & e; ++i < r && (n *= 256);) this[t + i] = e / n & 255; return t + r;
      }, l.prototype.writeUIntBE = function(e, t, r, a) {
        (e = +e, t |= 0, r |= 0, a) || $(this, e, t, r, Math.pow(2, 8 * r) - 1, 0); let n = r - 1; let i = 1; for (this[t + n] = 255 & e; --n >= 0 && (i *= 256);) this[t + n] = e / i & 255; return t + r;
      }, l.prototype.writeUInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 1, 255, 0), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
      }, l.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : T(this, e, t, !0), t + 2;
      }, l.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : T(this, e, t, !1), t + 2;
      }, l.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : D(this, e, t, !0), t + 4;
      }, l.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4;
      }, l.prototype.writeIntLE = function(e, t, r, a) {
        if (e = +e, t |= 0, !a) {
          const n = Math.pow(2, 8 * r - 1); $(this, e, t, r, n - 1, -n);
        } let i = 0; let s = 1; let o = 0; for (this[t] = 255 & e; ++i < r && (s *= 256);)e < 0 && o === 0 && this[t + i - 1] !== 0 && (o = 1), this[t + i] = (e / s >> 0) - o & 255; return t + r;
      }, l.prototype.writeIntBE = function(e, t, r, a) {
        if (e = +e, t |= 0, !a) {
          const n = Math.pow(2, 8 * r - 1); $(this, e, t, r, n - 1, -n);
        } let i = r - 1; let s = 1; let o = 0; for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);)e < 0 && o === 0 && this[t + i + 1] !== 0 && (o = 1), this[t + i] = (e / s >> 0) - o & 255; return t + r;
      }, l.prototype.writeInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 1, 127, -128), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
      }, l.prototype.writeInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : T(this, e, t, !0), t + 2;
      }, l.prototype.writeInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : T(this, e, t, !1), t + 2;
      }, l.prototype.writeInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 4, 2147483647, -2147483648), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : D(this, e, t, !0), t + 4;
      }, l.prototype.writeInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || $(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4;
      }, l.prototype.writeFloatLE = function(e, t, r) {
        return z(this, e, t, !0, r);
      }, l.prototype.writeFloatBE = function(e, t, r) {
        return z(this, e, t, !1, r);
      }, l.prototype.writeDoubleLE = function(e, t, r) {
        return I(this, e, t, !0, r);
      }, l.prototype.writeDoubleBE = function(e, t, r) {
        return I(this, e, t, !1, r);
      }, l.prototype.copy = function(e, t, r, a) {
        if (r || (r = 0), a || a === 0 || (a = this.length), t >= e.length && (t = e.length), t || (t = 0), a > 0 && a < r && (a = r), a === r) return 0; if (e.length === 0 || this.length === 0) return 0; if (t < 0) throw new RangeError('targetStart out of bounds'); if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds'); if (a < 0) throw new RangeError('sourceEnd out of bounds'); a > this.length && (a = this.length), e.length - t < a - r && (a = e.length - t + r); let n; const i = a - r; if (this === e && r < t && t < a) for (n = i - 1; n >= 0; --n)e[n + t] = this[n + r]; else if (i < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (n = 0; n < i; ++n)e[n + t] = this[n + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t); return i;
      }, l.prototype.fill = function(e, t, r, a) {
        if (typeof e === 'string') {
          if (typeof t === 'string' ? (a = t, t = 0, r = this.length) : typeof r === 'string' && (a = r, r = this.length), e.length === 1) {
            const n = e.charCodeAt(0); n < 256 && (e = n);
          } if (void 0 !== a && typeof a !== 'string') throw new TypeError('encoding must be a string'); if (typeof a === 'string' && !l.isEncoding(a)) throw new TypeError(`Unknown encoding: ${a}`);
        } else typeof e === 'number' && (e &= 255); if (t < 0 || this.length < t || this.length < r) throw new RangeError('Out of range index'); if (r <= t) return this; let i; if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), typeof e === 'number') for (i = t; i < r; ++i) this[i] = e; else {
          const s = l.isBuffer(e) ? e : B(new l(e, a).toString()); const o = s.length; for (i = 0; i < r - t; ++i) this[i + t] = s[i % o];
        } return this;
      }; const V = /[^+\/0-9A-Za-z-_]/g; function F(e) {
        return e < 16 ? `0${e.toString(16)}` : e.toString(16);
      } function B(e, t) {
        let r; t = t || 1 / 0; for (var a = e.length, n = null, i = [], s = 0; s < a; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!n) {
              if (r > 56319) {
                (t -= 3) > -1 && i.push(239, 191, 189); continue;
              } if (s + 1 === a) {
                (t -= 3) > -1 && i.push(239, 191, 189); continue;
              }n = r; continue;
            } if (r < 56320) {
              (t -= 3) > -1 && i.push(239, 191, 189), n = r; continue;
            }r = 65536 + (n - 55296 << 10 | r - 56320);
          } else n && (t -= 3) > -1 && i.push(239, 191, 189); if (n = null, r < 128) {
            if ((t -= 1) < 0) break; i.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break; i.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break; i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error('Invalid code point'); if ((t -= 4) < 0) break; i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        } return i;
      } function U(e) {
        return a.toByteArray(function(e) {
          if ((e = (function(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
          }(e)).replace(V, '')).length < 2) return ''; for (;e.length % 4 != 0;)e += '='; return e;
        }(e));
      } function M(e, t, r, a) {
        for (var n = 0; n < a && !(n + r >= t.length || n >= e.length); ++n)t[n + r] = e[n]; return n;
      }
    }).call(this, r(7));
  }, function(e, t, r) {
    'use strict';

    const a = r(32); const n = r(4); const i = r(0); const s = r(10); const o = r(37); function l(e, t, r) {
      let a = this._refs[r]; if (typeof a === 'string') {
        if (!this._refs[a]) return l.call(this, e, t, a); a = this._refs[a];
      } if ((a = a || this._schemas[r]) instanceof s) return h(a.schema, this._opts.inlineRefs) ? a.schema : a.validate || this._compile(a); let n; let i; let o; const d = u.call(this, t, r); return d && (n = d.schema, t = d.root, o = d.baseId), n instanceof s ? i = n.validate || e.call(this, n.schema, t, void 0, o) : void 0 !== n && (i = h(n, this._opts.inlineRefs) ? n : e.call(this, n, t, void 0, o)), i;
    } function u(e, t) {
      const r = a.parse(t, !1, !0); const n = v(r); let i = f(this._getId(e.schema)); if (n !== i) {
        const o = y(n); let l = this._refs[o]; if (typeof l === 'string') return d.call(this, e, l, r); if (l instanceof s)l.validate || this._compile(l), e = l; else {
          if (!((l = this._schemas[o]) instanceof s)) return; if (l.validate || this._compile(l), o == y(t)) return { schema: l, root: e, baseId: i }; e = l;
        } if (!e.schema) return; i = f(this._getId(e.schema));
      } return m.call(this, r, i, e.schema, e);
    } function d(e, t, r) {
      const a = u.call(this, e, t); if (a) {
        const n = a.schema; let i = a.baseId; e = a.root; const s = this._getId(n); return s && (i = b(i, s)), m.call(this, r, i, n, e);
      }
    }e.exports = l, l.normalizeId = y, l.fullPath = f, l.url = b, l.ids = function(e) {
      const t = y(this._getId(e)); const r = { '': t }; const s = { '': f(t, !1) }; const l = {}; const u = this; return o(e, { allKeys: !0 }, ((e, t, o, d, c, m, p) => {
        if (t !== '') {
          let h = u._getId(e); let f = r[d]; let v = `${s[d]}/${c}`; if (void 0 !== p && (v += `/${typeof p === 'number' ? p : i.escapeFragment(p)}`), typeof h === 'string') {
            h = f = y(f ? a.resolve(f, h) : h); let g = u._refs[h]; if (typeof g === 'string' && (g = u._refs[g]), g && g.schema) {
              if (!n(e, g.schema)) throw new Error(`id "${h}" resolves to more than one schema`);
            } else if (h != y(v)) {
              if (h[0] == '#') {
                if (l[h] && !n(e, l[h])) throw new Error(`id "${h}" resolves to more than one schema`); l[h] = e;
              } else u._refs[h] = v;
            }
          }r[t] = f, s[t] = v;
        }
      })), l;
    }, l.inlineRef = h, l.schema = u; const c = i.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']); function m(e, t, r, a) {
      if (e.hash = e.hash || '', e.hash.slice(0, 2) == '#/') {
        for (let n = e.hash.split('/'), s = 1; s < n.length; s++) {
          let o = n[s]; if (o) {
            if (void 0 === (r = r[o = i.unescapeFragment(o)])) break; var l; if (!c[o] && ((l = this._getId(r)) && (t = b(t, l)), r.$ref)) {
              const d = b(t, r.$ref); const m = u.call(this, a, d); m && (r = m.schema, a = m.root, t = m.baseId);
            }
          }
        } return void 0 !== r && r !== a.schema ? { schema: r, root: a, baseId: t } : void 0;
      }
    } const p = i.toHash(['type', 'format', 'pattern', 'maxLength', 'minLength', 'maxProperties', 'minProperties', 'maxItems', 'minItems', 'maximum', 'minimum', 'uniqueItems', 'multipleOf', 'required', 'enum']); function h(e, t) {
      return !1 !== t && (void 0 === t || !0 === t ? (function e(t) {
        let r; if (Array.isArray(t)) {
          for (let a = 0; a < t.length; a++) if (typeof (r = t[a]) === 'object' && !e(r)) return !1;
        } else {
          for (const n in t) {
            if (n == '$ref') return !1; if (typeof (r = t[n]) === 'object' && !e(r)) return !1;
          }
        } return !0;
      }(e)) : t ? (function e(t) {
        let r; let a = 0; if (Array.isArray(t)) {
          for (let n = 0; n < t.length; n++) if (typeof (r = t[n]) === 'object' && (a += e(r)), a == 1 / 0) return 1 / 0;
        } else {
          for (const i in t) {
            if (i == '$ref') return 1 / 0; if (p[i])a++; else if (typeof (r = t[i]) === 'object' && (a += e(r) + 1), a == 1 / 0) return 1 / 0;
          }
        } return a;
      }(e)) <= t : void 0);
    } function f(e, t) {
      return !1 !== t && (e = y(e)), v(a.parse(e, !1, !0));
    } function v(e) {
      const t = e.protocol || e.href.slice(0, 2) == '//' ? '//' : ''; return `${(e.protocol || '') + t + (e.host || '') + (e.path || '')}#`;
    } const g = /#\/?$/; function y(e) {
      return e ? e.replace(g, '') : '';
    } function b(e, t) {
      return t = y(t), a.resolve(e, t);
    }
  }, function(e, t, r) {
    'use strict';

    e.exports = function e(t, r) {
      if (t === r) return !0; let a; const n = Array.isArray(t); const i = Array.isArray(r); if (n && i) {
        if (t.length != r.length) return !1; for (a = 0; a < t.length; a++) if (!e(t[a], r[a])) return !1; return !0;
      } if (n != i) return !1; if (t && r && typeof t === 'object' && typeof r === 'object') {
        const s = Object.keys(t); if (s.length !== Object.keys(r).length) return !1; const o = t instanceof Date; const l = r instanceof Date; if (o && l) return t.getTime() == r.getTime(); if (o != l) return !1; const u = t instanceof RegExp; const d = r instanceof RegExp; if (u && d) return t.toString() == r.toString(); if (u != d) return !1; for (a = 0; a < s.length; a++) if (!Object.prototype.hasOwnProperty.call(r, s[a])) return !1; for (a = 0; a < s.length; a++) if (!e(t[s[a]], r[s[a]])) return !1; return !0;
      } return !1;
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(3); function n(e, t, r) {
      this.message = r || n.message(e, t), this.missingRef = a.url(e, t), this.missingSchema = a.normalizeId(a.fullPath(this.missingRef));
    } function i(e) {
      return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
    }e.exports = {
      Validation: i((function(e) {
        this.message = 'validation failed', this.errors = e, this.ajv = this.validation = !0;
      })),
      MissingRef: i(n),
    }, n.message = function(e, t) {
      return `can't resolve reference ${t} from id ${e}`;
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(9); let n; class i {

      constructor(e) {
        this._capability = e;
      }

      debug(...e) {
        this._debug && console.log('[dbg]', ...e);
      }

      async validate({ debug: e = !1 } = {}) {
        this._debug = e, this.debug('Validating capability'); const t = i.getJSONSchema(); const r = new a({ async: !0 }).compile(t); if (!1 === await r(this._capability)) throw new Error(JSON.stringify(r.errors, !1, 4) || 'Invalid Capability'); this.debug('Validated successfully');
      }

      static getJSONSchema() {
        return r(69);
      }

      static getCapabilities() {
        if (n) return n; const e = r(70); return n = e.reduce((e, t) => (e[t] = r(71)(`./${t}.json`), e[t] = i._composeCapability(t, e[t]), e), {}), n;
      }

      static getCapability(e) {
        const t = i.getCapabilities()[e]; if (!t) throw new Error('invalid_capability'); return t;
      }

      static hasCapability(e) {
        return !!this.getCapabilities()[e];
      }

      static _composeCapability(e, t) {
        return t.flow && console.warn(`Warning: using \`capability.flow\` (${e}), expected a \`capability.$flow\``), t.$flow && ['triggers', 'conditions', 'actions'].forEach(r => {
          const a = t.$flow[r]; Array.isArray(a) && a.forEach(r => {
            Array.isArray(r.args) && r.args.forEach(e => {
              e.type === 'dropdown' && e.values === '$values' && (e.values = t.values);
            }), Array.isArray(r.tokens) && r.tokens.forEach(r => {
              r.name === '$id' && (r.name = e), r.type === '$type' && (r.type = t.type), r.title === '$title' && (r.title = t.title);
            });
          });
        }), t;
      }

    }e.exports = i;
  }, function(e, t) {
    let r; r = (function() {
      return this;
    }()); try {
      r = r || new Function('return this')();
    } catch (e) {
      typeof window === 'object' && (r = window);
    }e.exports = r;
  }, function(e, t, r) {
    'use strict';

    t.decode = t.parse = r(29), t.encode = t.stringify = r(30);
  }, function(e, t, r) {
    'use strict';

    const a = r(31); const n = r(3); const i = r(38); const s = r(10); const o = r(11); const l = r(39); const u = r(40); const d = r(61); const c = r(0); e.exports = g, g.prototype.validate = function(e, t) {
      let r; if (typeof e === 'string') {
        if (!(r = this.getSchema(e))) throw new Error(`no schema with key or ref "${e}"`);
      } else {
        const a = this._addSchema(e); r = a.validate || this._compile(a);
      } const n = r(t); !0 !== r.$async && (this.errors = r.errors); return n;
    }, g.prototype.compile = function(e, t) {
      const r = this._addSchema(e, void 0, t); return r.validate || this._compile(r);
    }, g.prototype.addSchema = function(e, t, r, a) {
      if (Array.isArray(e)) {
        for (let i = 0; i < e.length; i++) this.addSchema(e[i], void 0, r, a); return this;
      } const s = this._getId(e); if (void 0 !== s && typeof s !== 'string') throw new Error('schema id must be string'); return S(this, t = n.normalizeId(t || s)), this._schemas[t] = this._addSchema(e, r, a, !0), this;
    }, g.prototype.addMetaSchema = function(e, t, r) {
      return this.addSchema(e, t, r, !0), this;
    }, g.prototype.validateSchema = function(e, t) {
      let r = e.$schema; if (void 0 !== r && typeof r !== 'string') throw new Error('$schema must be a string'); if (!(r = r || this._opts.defaultMeta || (function(e) {
        const t = e._opts.meta; return e._opts.defaultMeta = typeof t === 'object' ? e._getId(t) || t : e.getSchema(h) ? h : void 0, e._opts.defaultMeta;
      }(this)))) return this.logger.warn('meta-schema not available'), this.errors = null, !0; let a; const n = this._formats.uri; this._formats.uri = typeof n === 'function' ? this._schemaUriFormatFunc : this._schemaUriFormat; try {
        a = this.validate(r, e);
      } finally {
        this._formats.uri = n;
      } if (!a && t) {
        const i = `schema is invalid: ${this.errorsText()}`; if (this._opts.validateSchema != 'log') throw new Error(i); this.logger.error(i);
      } return a;
    }, g.prototype.getSchema = function(e) {
      const t = y(this, e); switch (typeof t) {
        case 'object': return t.validate || this._compile(t); case 'string': return this.getSchema(t); case 'undefined': return (function(e, t) {
          const r = n.schema.call(e, { schema: {} }, t); if (r) {
            const i = r.schema; const o = r.root; const l = r.baseId; const u = a.call(e, i, o, void 0, l); return e._fragments[t] = new s({
              ref: t, fragment: !0, schema: i, root: o, baseId: l, validate: u,
            }), u;
          }
        }(this, e));
      }
    }, g.prototype.removeSchema = function(e) {
      if (e instanceof RegExp) return b(this, this._schemas, e), b(this, this._refs, e), this; switch (typeof e) {
        case 'undefined': return b(this, this._schemas), b(this, this._refs), this._cache.clear(), this; case 'string': var t = y(this, e); return t && this._cache.del(t.cacheKey), delete this._schemas[e], delete this._refs[e], this; case 'object': var r = this._opts.serialize; var a = r ? r(e) : e; this._cache.del(a); var i = this._getId(e); i && (i = n.normalizeId(i), delete this._schemas[i], delete this._refs[i]);
      } return this;
    }, g.prototype.addFormat = function(e, t) {
      typeof t === 'string' && (t = new RegExp(t)); return this._formats[e] = t, this;
    }, g.prototype.errorsText = function(e, t) {
      if (!(e = e || this.errors)) return 'No errors'; for (var r = void 0 === (t = t || {}).separator ? ', ' : t.separator, a = void 0 === t.dataVar ? 'data' : t.dataVar, n = '', i = 0; i < e.length; i++) {
        const s = e[i]; s && (n += `${a + s.dataPath} ${s.message}${r}`);
      } return n.slice(0, -r.length);
    }, g.prototype._addSchema = function(e, t, r, a) {
      if (typeof e !== 'object' && typeof e !== 'boolean') throw new Error('schema should be object or boolean'); const i = this._opts.serialize; const o = i ? i(e) : e; const l = this._cache.get(o); if (l) return l; a = a || !1 !== this._opts.addUsedSchema; const u = n.normalizeId(this._getId(e)); u && a && S(this, u); let d; const c = !1 !== this._opts.validateSchema && !t; c && !(d = u && u == n.normalizeId(e.$schema)) && this.validateSchema(e, !0); const m = n.ids.call(this, e); const p = new s({
        id: u, schema: e, localRefs: m, cacheKey: o, meta: r,
      }); u[0] != '#' && a && (this._refs[u] = p); this._cache.put(o, p), c && d && this.validateSchema(e, !0); return p;
    }, g.prototype._compile = function(e, t) {
      if (e.compiling) return e.validate = i, i.schema = e.schema, i.errors = null, i.root = t || i, !0 === e.schema.$async && (i.$async = !0), i; let r; let n; e.compiling = !0, e.meta && (r = this._opts, this._opts = this._metaOpts); try {
        n = a.call(this, e.schema, t, e.localRefs);
      } finally {
        e.compiling = !1, e.meta && (this._opts = r);
      } return e.validate = n, e.refs = n.refs, e.refVal = n.refVal, e.root = n.root, n; function i() {
        const t = e.validate; const r = t.apply(null, arguments); return i.errors = t.errors, r;
      }
    }, g.prototype.compileAsync = r(62); const m = r(63); g.prototype.addKeyword = m.add, g.prototype.getKeyword = m.get, g.prototype.removeKeyword = m.remove; const p = r(5); g.ValidationError = p.Validation, g.MissingRefError = p.MissingRef, g.$dataMetaSchema = d; var h = 'http://json-schema.org/draft-07/schema'; const f = ['removeAdditional', 'useDefaults', 'coerceTypes']; const v = ['/properties']; function g(e) {
      if (!(this instanceof g)) return new g(e); e = this._opts = c.copy(e) || {}, (function(e) {
        let t = e._opts.logger; if (!1 === t)e.logger = { log: P, warn: P, error: P }; else {
          if (void 0 === t && (t = console), !(typeof t === 'object' && t.log && t.warn && t.error)) throw new Error('logger must implement log, warn and error methods'); e.logger = t;
        }
      }(this)), this._schemas = {}, this._refs = {}, this._fragments = {}, this._formats = l(e.format); const t = this._schemaUriFormat = this._formats['uri-reference']; this._schemaUriFormatFunc = function(e) {
        return t.test(e);
      }, this._cache = e.cache || new i(), this._loadingSchemas = {}, this._compilations = [], this.RULES = u(), this._getId = (function(e) {
        switch (e.schemaId) {
          case 'auto': return _; case 'id': return k; default: return w;
        }
      }(e)), e.loopRequired = e.loopRequired || 1 / 0, e.errorDataPath == 'property' && (e._errorDataPathProperty = !0), void 0 === e.serialize && (e.serialize = o), this._metaOpts = (function(e) {
        for (var t = c.copy(e._opts), r = 0; r < f.length; r++) delete t[f[r]]; return t;
      }(this)), e.formats && (function(e) {
        for (const t in e._opts.formats) {
          const r = e._opts.formats[t]; e.addFormat(t, r);
        }
      }(this)), (function(e) {
        let t; e._opts.$data && (t = r(65), e.addMetaSchema(t, t.$id, !0)); if (!1 === e._opts.meta) return; let a = r(66); e._opts.$data && (a = d(a, v)); e.addMetaSchema(a, h, !0), e._refs['http://json-schema.org/schema'] = h;
      }(this)), typeof e.meta === 'object' && this.addMetaSchema(e.meta), (function(e) {
        const t = e._opts.schemas; if (!t) return; if (Array.isArray(t))e.addSchema(t); else for (const r in t)e.addSchema(t[r], r);
      }(this));
    } function y(e, t) {
      return t = n.normalizeId(t), e._schemas[t] || e._refs[t] || e._fragments[t];
    } function b(e, t, r) {
      for (const a in t) {
        const n = t[a]; n.meta || r && !r.test(a) || (e._cache.del(n.cacheKey), delete t[a]);
      }
    } function k(e) {
      return e.$id && this.logger.warn('schema $id ignored', e.$id), e.id;
    } function w(e) {
      return e.id && this.logger.warn('schema id ignored', e.id), e.$id;
    } function _(e) {
      if (e.$id && e.id && e.$id != e.id) throw new Error('schema $id is different from id'); return e.$id || e.id;
    } function S(e, t) {
      if (e._schemas[t] || e._refs[t]) throw new Error(`schema with key or id "${t}" already exists`);
    } function P() {}
  }, function(e, t, r) {
    'use strict';

    const a = r(0); e.exports = function(e) {
      a.copy(e, this);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t) {
      t || (t = {}), typeof t === 'function' && (t = { cmp: t }); let r; const a = typeof t.cycles === 'boolean' && t.cycles; const n = t.cmp && (r = t.cmp, function(e) {
        return function(t, a) {
          const n = { key: t, value: e[t] }; const i = { key: a, value: e[a] }; return r(n, i);
        };
      }); const i = []; return (function e(t) {
        if (t && t.toJSON && typeof t.toJSON === 'function' && (t = t.toJSON()), void 0 !== t) {
          if (typeof t === 'number') return isFinite(t) ? `${t}` : 'null'; if (typeof t !== 'object') return JSON.stringify(t); let r; let s; if (Array.isArray(t)) {
            for (s = '[', r = 0; r < t.length; r++)r && (s += ','), s += e(t[r]) || 'null'; return `${s}]`;
          } if (t === null) return 'null'; if (i.indexOf(t) !== -1) {
            if (a) return JSON.stringify('__cycle__'); throw new TypeError('Converting circular structure to JSON');
          } const o = i.push(t) - 1; const l = Object.keys(t).sort(n && n(t)); for (s = '', r = 0; r < l.length; r++) {
            const u = l[r]; const d = e(t[u]); d && (s && (s += ','), s += `${JSON.stringify(u)}:${d}`);
          } return i.splice(o, 1), `{${s}}`;
        }
      }(e));
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ''; const n = !0 === e.schema.$async; let i = e.util.schemaHasRulesExcept(e.schema, e.RULES.all, '$ref'); const s = e.self._getId(e.schema); if (e.isTop && (a += ' var validate = ', n && (e.async = !0, a += 'async '), a += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ", s && (e.opts.sourceCode || e.opts.processCode) && (a += ` /*# sourceURL=${s} */ `)), typeof e.schema === 'boolean' || !i && !e.schema.$ref) {
        var o = e.level; var l = e.dataLevel; var u = e.schema['false schema']; var d = e.schemaPath + e.util.getProperty('false schema'); var c = `${e.errSchemaPath}/false schema`; var m = !e.opts.allErrors; var p = `data${l || ''}`; var h = `valid${o}`; if (!1 === e.schema) {
          e.isTop ? m = !0 : a += ` var ${h} = false; `, (K = K || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'false schema' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(c)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'boolean schema is false' "), e.opts.verbose && (a += ` , schema: false , parentSchema: validate.schema${e.schemaPath} , data: ${p} `), a += ' } ') : a += ' {} '; var f = a; a = K.pop(), !e.compositeRule && m ? e.async ? a += ` throw new ValidationError([${f}]); ` : a += ` validate.errors = [${f}]; return false; ` : a += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `;
        } else e.isTop ? a += n ? ' return data; ' : ' validate.errors = null; return true; ' : a += ` var ${h} = true; `; return e.isTop && (a += ' }; return validate; '), a;
      } if (e.isTop) {
        var v = e.isTop; o = e.level = 0, l = e.dataLevel = 0, p = 'data'; e.rootId = e.resolve.fullPath(e.self._getId(e.root.schema)), e.baseId = e.baseId || e.rootId, delete e.isTop, e.dataPathArr = [void 0], a += ' var vErrors = null; ', a += ' var errors = 0;     ', a += ' if (rootData === undefined) rootData = data; ';
      } else {
        o = e.level, p = `data${(l = e.dataLevel) || ''}`; if (s && (e.baseId = e.resolve.url(e.baseId, s)), n && !e.async) throw new Error('async schema in sync schema'); a += ` var errs_${o} = errors;`;
      }h = `valid${o}`, m = !e.opts.allErrors; let g = ''; let y = ''; let b = e.schema.type; let k = Array.isArray(b); if (k && b.length == 1 && (b = b[0], k = !1), e.schema.$ref && i) {
        if (e.opts.extendRefs == 'fail') throw new Error(`$ref: validation keywords used in schema at path "${e.errSchemaPath}" (see option extendRefs)`); !0 !== e.opts.extendRefs && (i = !1, e.logger.warn(`$ref: keywords ignored in schema at path "${e.errSchemaPath}"`));
      } if (e.schema.$comment && e.opts.$comment && (a += ` ${e.RULES.all.$comment.code(e, '$comment')}`), b) {
        if (e.opts.coerceTypes) var w = e.util.coerceToTypes(e.opts.coerceTypes, b); var _ = e.RULES.types[b]; if (w || k || !0 === _ || _ && !W(_)) {
          d = `${e.schemaPath}.type`, c = `${e.errSchemaPath}/type`, d = `${e.schemaPath}.type`, c = `${e.errSchemaPath}/type`; const S = k ? 'checkDataTypes' : 'checkDataType'; if (a += ` if (${e.util[S](b, p, !0)}) { `, w) {
            const P = `dataType${o}`; const A = `coerced${o}`; a += ` var ${P} = typeof ${p}; `, e.opts.coerceTypes == 'array' && (a += ` if (${P} == 'object' && Array.isArray(${p})) ${P} = 'array'; `), a += ` var ${A} = undefined; `; let E = ''; const x = w; if (x) for (var C, O = -1, j = x.length - 1; O < j;)C = x[O += 1], O && (a += ` if (${A} === undefined) { `, E += '}'), e.opts.coerceTypes == 'array' && C != 'array' && (a += ` if (${P} == 'array' && ${p}.length == 1) { ${A} = ${p} = ${p}[0]; ${P} = typeof ${p};  } `), C == 'string' ? a += ` if (${P} == 'number' || ${P} == 'boolean') ${A} = '' + ${p}; else if (${p} === null) ${A} = ''; ` : C == 'number' || C == 'integer' ? (a += ` if (${P} == 'boolean' || ${p} === null || (${P} == 'string' && ${p} && ${p} == +${p} `, C == 'integer' && (a += ` && !(${p} % 1)`), a += `)) ${A} = +${p}; `) : C == 'boolean' ? a += ` if (${p} === 'false' || ${p} === 0 || ${p} === null) ${A} = false; else if (${p} === 'true' || ${p} === 1) ${A} = true; ` : C == 'null' ? a += ` if (${p} === '' || ${p} === 0 || ${p} === false) ${A} = null; ` : e.opts.coerceTypes == 'array' && C == 'array' && (a += ` if (${P} == 'string' || ${P} == 'number' || ${P} == 'boolean' || ${p} == null) ${A} = [${p}]; `); a += ` ${E} if (${A} === undefined) {   `, (K = K || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'type' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(c)} , params: { type: '`, a += k ? `${b.join(',')}` : `${b}`, a += "' } ", !1 !== e.opts.messages && (a += " , message: 'should be ", a += k ? `${b.join(',')}` : `${b}`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${d} , parentSchema: validate.schema${e.schemaPath} , data: ${p} `), a += ' } ') : a += ' {} '; f = a; a = K.pop(), !e.compositeRule && m ? e.async ? a += ` throw new ValidationError([${f}]); ` : a += ` validate.errors = [${f}]; return false; ` : a += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } else {  '; const L = l ? `data${l - 1 || ''}` : 'parentData'; a += ` ${p} = ${A}; `, l || (a += `if (${L} !== undefined)`), a += ` ${L}[${l ? e.dataPathArr[l] : 'parentDataProperty'}] = ${A}; } `;
          } else {
            (K = K || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'type' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(c)} , params: { type: '`, a += k ? `${b.join(',')}` : `${b}`, a += "' } ", !1 !== e.opts.messages && (a += " , message: 'should be ", a += k ? `${b.join(',')}` : `${b}`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${d} , parentSchema: validate.schema${e.schemaPath} , data: ${p} `), a += ' } ') : a += ' {} '; f = a; a = K.pop(), !e.compositeRule && m ? e.async ? a += ` throw new ValidationError([${f}]); ` : a += ` validate.errors = [${f}]; return false; ` : a += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `;
          }a += ' } ';
        }
      } if (e.schema.$ref && !i)a += ` ${e.RULES.all.$ref.code(e, '$ref')} `, m && (a += ' } if (errors === ', a += v ? '0' : `errs_${o}`, a += ') { ', y += '}'); else {
        const $ = e.RULES; if ($) {
          for (let T = -1, D = $.length - 1; T < D;) {
            if (W(_ = $[T += 1])) {
              if (_.type && (a += ` if (${e.util.checkDataType(_.type, p)}) { `), e.opts.useDefaults && !e.compositeRule) {
                if (_.type == 'object' && e.schema.properties) {
                  u = e.schema.properties; const R = Object.keys(u); if (R) {
                    for (var z, I = -1, V = R.length - 1; I < V;) {
                      if (void 0 !== (B = u[z = R[I += 1]]).default)a += `  if (${ M = p + e.util.getProperty(z) } === undefined) ${ M } = `, e.opts.useDefaults == 'shared' ? a += ` ${ e.useDefault(B.default) } ` : a += ` ${ JSON.stringify(B.default) } `, a += '; ';
                    }
                  }
                } else if (_.type == 'array' && Array.isArray(e.schema.items)) {
                  const F = e.schema.items; if (F) {
                    O = -1; for (var B, U = F.length - 1; O < U;) {
                      var M; if (void 0 !== (B = F[O += 1]).default)a += `  if (${M = `${p}[${O}]`} === undefined) ${M} = `, e.opts.useDefaults == 'shared' ? a += ` ${e.useDefault(B.default)} ` : a += ` ${JSON.stringify(B.default)} `, a += '; ';
                    }
                  }
                }
              } const N = _.rules; if (N) {
                for (var q, H = -1, G = N.length - 1; H < G;) {
                  if (Q(q = N[H += 1])) {
                    let J = q.code(e, q.keyword, _.type); J && (a += ` ${ J } `, m && (g += '}'));
                  }
                }
              } if (m && (a += ` ${g} `, g = ''), _.type && (a += ' } ', b && b === _.type && !w)) {
                a += ' else { '; var K; d = `${e.schemaPath}.type`, c = `${e.errSchemaPath}/type`; (K = K || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'type' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(c)} , params: { type: '`, a += k ? `${b.join(',')}` : `${b}`, a += "' } ", !1 !== e.opts.messages && (a += " , message: 'should be ", a += k ? `${b.join(',')}` : `${b}`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${d} , parentSchema: validate.schema${e.schemaPath} , data: ${p} `), a += ' } ') : a += ' {} '; f = a; a = K.pop(), !e.compositeRule && m ? e.async ? a += ` throw new ValidationError([${f}]); ` : a += ` validate.errors = [${f}]; return false; ` : a += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } ';
              }m && (a += ' if (errors === ', a += v ? '0' : `errs_${o}`, a += ') { ', y += '}');
            }
          }
        }
      } function W(e) {
        for (let t = e.rules, r = 0; r < t.length; r++) if (Q(t[r])) return !0;
      } function Q(t) {
        return void 0 !== e.schema[t.keyword] || t.implements && (function(t) {
          for (let r = t.implements, a = 0; a < r.length; a++) if (void 0 !== e.schema[r[a]]) return !0;
        }(t));
      } return m && (a += ` ${y} `), v ? (n ? (a += ' if (errors === 0) return data;           ', a += ' else throw new ValidationError(vErrors); ') : (a += ' validate.errors = vErrors; ', a += ' return errors === 0;       '), a += ' }; return validate;') : a += ` var ${h} = errors === errs_${o};`, a = e.util.cleanUpCode(a), v && (a = e.util.finalCleanUpCode(a, n)), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); let u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o; const p = t == 'maximum'; const h = p ? 'exclusiveMaximum' : 'exclusiveMinimum'; const f = e.schema[h]; const v = p ? '<' : '>'; let g = p ? '>' : '<'; let y = void 0; if (e.opts.$data && f && f.$data) {
        let b = e.util.getData(f.$data, s, e.dataPathArr); var k = `exclusive${i}`; const w = `exclType${i}`; var _ = `exclIsNumber${i}`; var S = `' + ${E = `op${i}`} + '`; n += ` var schemaExcl${i} = ${b}; `, n += ` var ${k}; var ${w} = typeof ${b = `schemaExcl${i}`}; if (${w} != 'boolean' && ${w} != 'undefined' && ${w} != 'number') { `; var P; y = h; (P = P || []).push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: '${y || '_exclusiveLimit'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: {} `, !1 !== e.opts.messages && (n += ` , message: '${h} should be boolean' `), e.opts.verbose && (n += ` , schema: validate.schema${l} , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; var A = n; n = P.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${A}]); ` : n += ` validate.errors = [${A}]; return false; ` : n += ` var err = ${A};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += ' } else if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), n += ` ${w} == 'number' ? ( (${k} = ${a} === undefined || ${b} ${v}= ${a}) ? ${c} ${g}= ${b} : ${c} ${g} ${a} ) : ( (${k} = ${b} === true) ? ${c} ${g}= ${a} : ${c} ${g} ${a} ) || ${c} !== ${c}) { var op${i} = ${k} ? '${v}' : '${v}=';`;
      } else {
        S = v; if ((_ = typeof f === 'number') && m) {
          var E = `'${S}'`; n += ' if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), n += ` ( ${a} === undefined || ${f} ${v}= ${a} ? ${c} ${g}= ${f} : ${c} ${g} ${a} ) || ${c} !== ${c}) { `;
        } else {
          _ && void 0 === o ? (k = !0, y = h, u = `${e.errSchemaPath}/${h}`, a = f, g += '=') : (_ && (a = Math[p ? 'min' : 'max'](f, o)), f === (!_ || a) ? (k = !0, y = h, u = `${e.errSchemaPath}/${h}`, g += '=') : (k = !1, S += '=')); E = `'${S}'`; n += ' if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), n += ` ${c} ${g} ${a} || ${c} !== ${c}) { `;
        }
      }y = y || t, (P = P || []).push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: '${y || '_limit'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { comparison: ${E}, limit: ${a}, exclusive: ${k} } `, !1 !== e.opts.messages && (n += ` , message: 'should be ${S} `, n += m ? `' + ${a}` : `${a}'`), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; A = n; return n = P.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${A}]); ` : n += ` validate.errors = [${A}]; return false; ` : n += ` var err = ${A};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += ' } ', d && (n += ' else { '), n;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o, n += 'if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), n += ` ${c}.length ${t == 'maxItems' ? '>' : '<'} ${a}) { `; const p = t; var h = h || []; h.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: '${p || '_limitItems'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { limit: ${a} } `, !1 !== e.opts.messages && (n += " , message: 'should NOT have ", n += t == 'maxItems' ? 'more' : 'less', n += ' than ', n += m ? `' + ${a} + '` : `${o}`, n += " items' "), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const f = n; return n = h.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${f}]); ` : n += ` validate.errors = [${f}]; return false; ` : n += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += '} ', d && (n += ' else { '), n;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o; const p = t == 'maxLength' ? '>' : '<'; n += 'if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), !1 === e.opts.unicode ? n += ` ${c}.length ` : n += ` ucs2length(${c}) `, n += ` ${p} ${a}) { `; const h = t; var f = f || []; f.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: '${h || '_limitLength'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { limit: ${a} } `, !1 !== e.opts.messages && (n += " , message: 'should NOT be ", n += t == 'maxLength' ? 'longer' : 'shorter', n += ' than ', n += m ? `' + ${a} + '` : `${o}`, n += " characters' "), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const v = n; return n = f.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${v}]); ` : n += ` validate.errors = [${v}]; return false; ` : n += ` var err = ${v};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += '} ', d && (n += ' else { '), n;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o, n += 'if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'number') || `), n += ` Object.keys(${c}).length ${t == 'maxProperties' ? '>' : '<'} ${a}) { `; const p = t; var h = h || []; h.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: '${p || '_limitProperties'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { limit: ${a} } `, !1 !== e.opts.messages && (n += " , message: 'should NOT have ", n += t == 'maxProperties' ? 'more' : 'less', n += ' than ', n += m ? `' + ${a} + '` : `${o}`, n += " properties' "), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const f = n; return n = h.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${f}]); ` : n += ` validate.errors = [${f}]; return false; ` : n += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += '} ', d && (n += ' else { '), n;
    };
  }, function(e, t) {
    let r; let a; const n = e.exports = {}; function i() {
      throw new Error('setTimeout has not been defined');
    } function s() {
      throw new Error('clearTimeout has not been defined');
    } function o(e) {
      if (r === setTimeout) return setTimeout(e, 0); if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0); try {
        return r(e, 0);
      } catch (t) {
        try {
          return r.call(null, e, 0);
        } catch (t) {
          return r.call(this, e, 0);
        }
      }
    }!(function() {
      try {
        r = typeof setTimeout === 'function' ? setTimeout : i;
      } catch (e) {
        r = i;
      } try {
        a = typeof clearTimeout === 'function' ? clearTimeout : s;
      } catch (e) {
        a = s;
      }
    }()); let l; let u = []; let d = !1; let c = -1; function m() {
      d && l && (d = !1, l.length ? u = l.concat(u) : c = -1, u.length && p());
    } function p() {
      if (!d) {
        const e = o(m); d = !0; for (let t = u.length; t;) {
          for (l = u, u = []; ++c < t;)l && l[c].run(); c = -1, t = u.length;
        }l = null, d = !1, (function(e) {
          if (a === clearTimeout) return clearTimeout(e); if ((a === s || !a) && clearTimeout) return a = clearTimeout, clearTimeout(e); try {
            a(e);
          } catch (t) {
            try {
              return a.call(null, e);
            } catch (t) {
              return a.call(this, e);
            }
          }
        }(e));
      }
    } function h(e, t) {
      this.fun = e, this.array = t;
    } function f() {}n.nextTick = function(e) {
      const t = new Array(arguments.length - 1); if (arguments.length > 1) for (let r = 1; r < arguments.length; r++)t[r - 1] = arguments[r]; u.push(new h(e, t)), u.length !== 1 || d || o(p);
    }, h.prototype.run = function() {
      this.fun.apply(null, this.array);
    }, n.title = 'browser', n.browser = !0, n.env = {}, n.argv = [], n.version = '', n.versions = {}, n.on = f, n.addListener = f, n.once = f, n.off = f, n.removeListener = f, n.removeAllListeners = f, n.emit = f, n.prependListener = f, n.prependOnceListener = f, n.listeners = function(e) {
      return [];
    }, n.binding = function(e) {
      throw new Error('process.binding is not supported');
    }, n.cwd = function() {
      return '/';
    }, n.chdir = function(e) {
      throw new Error('process.chdir is not supported');
    }, n.umask = function() {
      return 0;
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(6); let n; class i {

      static getClasses() {
        if (n) return n; const e = r(144); return n = e.reduce((e, t) => (e[t] = r(145)(`./${t}.json`), e), {}), n;
      }

      static getClass(e) {
        const t = i.getClasses()[e]; if (!t) throw new Error('invalid_class'); return t;
      }

      static getCapabilities() {
        return a.getCapabilities();
      }

    }e.exports = i;
  }, function(e, t, r) {
    'use strict';

    const {
      validate: a, genericValidator: n, irValidator: i, rfValidator: s, rf433Validator: o, rf868Validator: l, modulationValidator: u, prontoValidator: d,
    } = r(172); e.exports = class {

      constructor(e, { frequency: t } = {}) {
        this._signal = e, this._frequency = t, this._check = this._check.bind(this);
      }

      debug(...e) {
        this._debug && console.log('[dbg]', ...e);
      }

      _check(e, t) {
        if (!0 !== t) throw new Error(e);
      }

      async validate({ debug: e = !1 } = {}) {
        if (this._debug = e, this.debug('Validating signal'), !this._signal) throw new Error('Invalid Signal'); if (this._signal.type === 'prontohex') this._validateProntohex(); else {
          if (void 0 !== this._signal.type) throw new Error('Invalid Signal type'); this._validateRegular();
        } if (this._frequency === '433') this._validate433(); else if (this._frequency === '868') this._validate868(); else {
          if (this._frequency !== 'ir') throw new Error('Invalid Frequency'); this._validateInfrared();
        } this.debug('Validated successfully');
      }

      _validateWithEngine(e) {
        return a(e, this._check, this._signal);
      }

      _validateProntohex() {
        this._check('mandatory_fields', this._signal.hasOwnProperty('cmds')), this._validateWithEngine(d);
      }

      _validateRegular() {
        this._check('mandatory_fields', this._signal.hasOwnProperty('sof') || this._signal.hasOwnProperty('eof') || this._signal.hasOwnProperty('words')), this._validateWithEngine(n), this._validateWithEngine(s);
      }

      _validate433() {
        this._validateWithEngine(u), this._validateWithEngine(o);
      }

      _validate868() {
        this._validateWithEngine(u), this._validateWithEngine(l);
      }

      _validateInfrared() {
        this._validateWithEngine(i);
      }

    };
  }, function(e, t, r) {
    'use strict';

    e.exports = class {

      static getCurrencies() {
        return r(173);
      }

      static getBatteries() {
        return ['LS14250', 'C', 'AA', 'AAA', 'AAAA', 'A23', 'A27', 'PP3', 'CR123A', 'CR2', 'CR1632', 'CR2032', 'CR2430', 'CR2450', 'CR2477', 'CR3032', 'CR14250', 'INTERNAL', 'OTHER'];
      }

    };
  }, function(e, t, r) {
    (function(e) {
      function r(e, t) {
        for (var r = 0, a = e.length - 1; a >= 0; a--) {
          const n = e[a]; n === '.' ? e.splice(a, 1) : n === '..' ? (e.splice(a, 1), r++) : r && (e.splice(a, 1), r--);
        } if (t) for (;r--; r)e.unshift('..'); return e;
      } function a(e, t) {
        if (e.filter) return e.filter(t); for (var r = [], a = 0; a < e.length; a++)t(e[a], a, e) && r.push(e[a]); return r;
      }t.resolve = function() {
        for (var t = '', n = !1, i = arguments.length - 1; i >= -1 && !n; i--) {
          const s = i >= 0 ? arguments[i] : e.cwd(); if (typeof s !== 'string') throw new TypeError('Arguments to path.resolve must be strings'); s && (t = `${s}/${t}`, n = s.charAt(0) === '/');
        } return (n ? '/' : '') + (t = r(a(t.split('/'), (e => {
          return !!e;
        })), !n).join('/')) || '.';
      }, t.normalize = function(e) {
        const i = t.isAbsolute(e); const s = n(e, -1) === '/'; return (e = r(a(e.split('/'), (e => {
          return !!e;
        })), !i).join('/')) || i || (e = '.'), e && s && (e += '/'), (i ? '/' : '') + e;
      }, t.isAbsolute = function(e) {
        return e.charAt(0) === '/';
      }, t.join = function() {
        const e = Array.prototype.slice.call(arguments, 0); return t.normalize(a(e, ((e, t) => {
          if (typeof e !== 'string') throw new TypeError('Arguments to path.join must be strings'); return e;
        })).join('/'));
      }, t.relative = function(e, r) {
        function a(e) {
          for (var t = 0; t < e.length && e[t] === ''; t++);for (var r = e.length - 1; r >= 0 && e[r] === ''; r--);return t > r ? [] : e.slice(t, r - t + 1);
        }e = t.resolve(e).substr(1), r = t.resolve(r).substr(1); for (var n = a(e.split('/')), i = a(r.split('/')), s = Math.min(n.length, i.length), o = s, l = 0; l < s; l++) {
          if (n[l] !== i[l]) {
            o = l; break;
          }
        } let u = []; for (l = o; l < n.length; l++)u.push('..'); return (u = u.concat(i.slice(o))).join('/');
      }, t.sep = '/', t.delimiter = ':', t.dirname = function(e) {
        if (typeof e !== 'string' && (e += ''), e.length === 0) return '.'; for (var t = e.charCodeAt(0), r = t === 47, a = -1, n = !0, i = e.length - 1; i >= 1; --i) {
          if ((t = e.charCodeAt(i)) === 47) {
            if (!n) {
              a = i; break;
            }
          } else n = !1;
        } return a === -1 ? r ? '/' : '.' : r && a === 1 ? '/' : e.slice(0, a);
      }, t.basename = function(e, t) {
        let r = (function(e) {
          typeof e !== 'string' && (e += ''); let t; let r = 0; let a = -1; let n = !0; for (t = e.length - 1; t >= 0; --t) {
            if (e.charCodeAt(t) === 47) {
              if (!n) {
                r = t + 1; break;
              }
            } else a === -1 && (n = !1, a = t + 1);
          } return a === -1 ? '' : e.slice(r, a);
        }(e)); return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)), r;
      }, t.extname = function(e) {
        typeof e !== 'string' && (e += ''); for (var t = -1, r = 0, a = -1, n = !0, i = 0, s = e.length - 1; s >= 0; --s) {
          const o = e.charCodeAt(s); if (o !== 47)a === -1 && (n = !1, a = s + 1), o === 46 ? t === -1 ? t = s : i !== 1 && (i = 1) : t !== -1 && (i = -1); else if (!n) {
            r = s + 1; break;
          }
        } return t === -1 || a === -1 || i === 0 || i === 1 && t === a - 1 && t === r + 1 ? '' : e.slice(t, a);
      }; var n = 'ab'.substr(-1) === 'b' ? function(e, t, r) {
        return e.substr(t, r);
      } : function(e, t, r) {
        return t < 0 && (t = e.length + t), e.substr(t, r);
      };
    }).call(this, r(17));
  }, function(e, t, r) {
    'use strict';

    const a = {
      bmp: r(176), cur: r(177), dds: r(178), gif: r(179), ico: r(23), jpg: r(180), png: r(181), psd: r(182), svg: r(183), tiff: r(184), webp: r(186),
    }; e.exports = a;
  }, function(e, t, r) {
    'use strict';

    function a(e, t) {
      const r = e.readUInt8(t); return r === 0 ? 256 : r;
    } function n(e, t) {
      const r = 6 + 16 * t; return { width: a(e, r), height: a(e, r + 1) };
    }e.exports = {
      detect(e) {
        return e.readUInt16LE(0) === 0 && e.readUInt16LE(2) === 1;
      },
      calculate(e) {
        let t; const r = e.readUInt16LE(4); const a = n(e, 0); if (r === 1) return a; for (a.images = [{ width: a.width, height: a.height }], t = 1; t < r; t += 1)a.images.push(n(e, t)); return a;
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports.App = r(25), e.exports.Device = r(18), e.exports.Capability = r(6), e.exports.Signal = r(19), e.exports.Media = r(190), e.exports.Energy = r(20), e.exports.getDeviceClasses = e.exports.Device.getClasses.bind(e.exports.Device), e.exports.getDeviceClass = e.exports.Device.getClass.bind(e.exports.Device), e.exports.getCapabilities = e.exports.Capability.getCapabilities.bind(e.exports.Capability), e.exports.getCapability = e.exports.Capability.getCapability.bind(e.exports.Capability), e.exports.hasCapability = e.exports.Capability.hasCapability.bind(e.exports.Capability), e.exports.getAppLocales = e.exports.App.getLocales.bind(e.exports.App), e.exports.getAppCategories = e.exports.App.getCategories.bind(e.exports.App), e.exports.getAppPermissions = e.exports.App.getPermissions.bind(e.exports.App), e.exports.getAppBrandColor = e.exports.App.getBrandColor.bind(e.exports.App), e.exports.getMediaCodecs = e.exports.Media.getCodecs.bind(e.exports.Media), e.exports.getCurrencies = e.exports.Energy.getCurrencies.bind(e.exports.Energy), e.exports.getBatteries = e.exports.Energy.getBatteries.bind(e.exports.Energy);
  }, function(e, t, r) {
    'use strict';

    (function(t, a) {
      const n = r(8); const i = r(9); const s = r(67); const o = r(68); const l = r(18); const u = r(6); const d = r(19); const c = r(20); const {
        openAsync: m, readAsync: p, statAsync: h, readFileAsync: f, readDirAsync: v, lstatAsync: g, imageSizeAsync: y, join: b, extname: k, basename: w, dirname: _,
      } = r(174); const S = ['debug', 'publish', 'verified']; const P = { '.jpg': t.from([255, 216]), '.jpeg': t.from([255, 216]), '.png': t.from([137, 80, 78, 71]) }; const A = { app: { small: { width: 250, height: 175 }, large: { width: 500, height: 350 }, xlarge: { width: 1e3, height: 700 } }, driver: { small: { width: 75, height: 75 }, large: { width: 500, height: 500 }, xlarge: { width: 1e3, height: 1e3 } } }; const E = ['measure_battery', 'alarm_battery']; class x {

        constructor(e) {
          if (this._path = e, typeof this._path !== 'string') throw new Error('Invalid path');
        }

        debug(...e) {
          this._debug && console.log('[dbg]', ...e);
        }

        async validate({ level: e = 'debug', debug: t = !1 } = {}) {
          if (this._debug = t, this.debug(`Validating "${this._path}"`), !S.includes(e)) throw new Error(`Invalid validation level. Allowed levels are: ${S}`); const r = e === 'publish' || e === 'verified'; const a = e === 'verified'; let n = await f(b(this._path, 'app.json')); n = JSON.parse(n); const o = n.sdk || 1; const m = x.getJSONSchema(); this.constructor.loopObjectRecursive(m, e => {
            r && e.requiredPublish && (e.required = [...e.required || [], ...e.requiredPublish]), a && e.requiredVerified && (e.required = [...e.required || [], ...e.requiredVerified]);
          }); const p = new i({ async: !0, allErrors: !0 }).compile(m); if (!1 === await p(n)) throw new Error(this.constructor.errorsText(p.errors) || 'Invalid app.json'); if (!x.isValidId(n.id)) throw new Error('Invalid id'); if (!s.valid(n.version)) throw new Error('Invalid version'); if (s.coerce(n.version).toString() !== n.version) throw new Error(`Invalid version (${n.version}), pre-release versions are not allowed`); try {
            new s.Range(n.compatibility);
          } catch (e) {
            throw new Error('Invalid compatibility');
          } if (n.sdk === 3) {
            const e = s.minVersion(n.compatibility); if (!s.gt(e, '4.2.0')) throw new Error(`Invalid compatibility (${n.compatibility}), SDK version 3 apps must have a compatibility of at least >=5.0.0`);
          } if (Array.isArray(n.permissions)) {
            const e = x.getPermissions(); n.permissions.forEach(t => {
              if (t === 'homey:app:com.athom.homeyscript') throw new Error(`Forbidden permission: ${t}`); if (t === 'homey:manager:api' && r && console.warn('Warning: using the homey:manager:api permission will require a more thorough review. It may take longer than usual to review your app.'), !t.startsWith('homey:app:') && void 0 === e[t]) throw new Error(`Invalid permission: ${t}`);
            });
          } if (void 0 !== n.category) {
            const e = x.getCategories(); let t = []; t = Array.isArray(n.category) ? n.category : [n.category], t.forEach(t => {
              if (!e.includes(t)) throw new Error(`Invalid category: ${t}`);
            });
          } if (Array.isArray(n.drivers)) {
            const e = l.getClasses(); const t = l.getCapabilities(); for (let a = 0; a < n.drivers.length; a++) {
              const i = n.drivers[a]; if (await this._ensureFileExistsCaseSensitive(b('drivers', i.id)), void 0 === e[i.class]) throw new Error(`Invalid driver class: ${i.class}`); if (i.capabilities.forEach(e => {
                const a = e.split('.')[0]; const s = void 0 !== t[a]; const o = void 0 !== n.capabilities && void 0 !== n.capabilities[a]; if (!s && !o) throw new Error(`Invalid capability: ${e}`); if (E.includes(a) && (!i.energy || !Array.isArray(i.energy.batteries)) && r) throw new Error(`drivers.${i.id} is missing an array 'energy.batteries' because the capability ${a} is being used.`);
              }), Array.isArray(i.pair)) {
                for (let e = 0; e < i.pair.length; e++) {
                  const t = i.pair[e]; if (void 0 !== t.navigation) {
                    const e = t.navigation.prev; if (e) {
                      if (!i.pair.find(t => t.id === e)) throw new Error(`Invalid navigation.prev: ${e}`);
                    } const r = t.navigation.next; if (r) {
                      if (!i.pair.find(e => e.id === r)) throw new Error(`Invalid navigation.next: ${r}`);
                    }
                  } void 0 === t.template && await this._ensureFileExistsCaseSensitive(b('drivers', i.id, 'pair', `${t.id}.html`));
                }
              } if (i.zwave && Array.isArray(i.settings)) {
                for (let e = 0; e < i.settings.length; e++) {
                  const t = i.settings[e]; if (t.type && t.type === 'group' && t.children && Array.isArray(t.children)) {
                    for (let e = 0; e < t.children.length; e++) {
                      const r = t.children[e]; r && this._checkZwaveForSetting(i, r);
                    }
                  } else this._checkZwaveForSetting(i, t);
                }
              } if (r && await this._validateImages(i.images, 'driver'), !(typeof i.discovery !== 'string' || n.discovery && n.discovery[i.discovery])) throw new Error(`Invalid driver discovery: ${i.discovery}`); if (typeof i.energy === 'object' && Array.isArray(i.energy.batteries)) {
                const e = c.getBatteries(); i.energy.batteries.forEach(t => {
                  if (!e.includes(t)) throw new Error(`Invalid driver battery: ${t}. Allowed values: ${e.join(', ')}`);
                });
              }
            }
          } if (void 0 !== n.capabilities) {
            for (const e in n.capabilities) {
              if (e.includes('.')) throw new Error(`Invalid capability: ${e}\nCharacter '.' is reserved for subcapabilities.`); const t = n.capabilities[e]; const r = new u(t); try {
                await r.validate();
              } catch (t) {
                throw new Error(`Invalid capability: ${e}\n${t.message}`);
              }t.icon && await this._ensureFileExistsCaseSensitive(t.icon);
            }
          } if (void 0 !== n.signals) {
            for (const e in n.signals) {
              for (const t in n.signals[e]) {
                const r = new d(n.signals[e][t], { frequency: e }); try {
                  await r.validate();
                } catch (r) {
                  throw new Error(`Invalid signal: ${e}.${t}\n${r.message}`);
                }
              }
            }
          } if (n.flow) {
            for (const e in n.flow) {
              const t = n.flow[e]; if (Array.isArray(t)) {
                for (let n = 0; n < t.length; n++) {
                  const i = t[n]; if (t.findIndex(e => e.id === i.id) !== n) throw new Error(`Found multiple Flow card ${e} with the id "${i.id}", all Flow cards should have a unique id.`); this._validateFlowCard(i, `flow.${e}.${i.id}`, { levelPublish: r, levelVerified: a });
                }
              }
            }
          } if (n.discovery) {
            for (const e in n.discovery) {
              const t = n.discovery[e]; const { type: r } = t; if (!t[r]) throw new Error(`Missing discovery.${e}.${r}`);
            }
          } if (await this._fileExistsCaseSensitive('locales')) {
            const e = x.getLocales(); const t = await this._getDirectoryContents('locales'); for (let r = 0; r < t.length; r++) {
              const a = t[r]; if (k(a) !== '.json') continue; const n = w(a, '.json'); if (!e.includes(n)) throw new Error(`Invalid locale: /locales/${n}.json\nAllowed locales are: ${e}`); try {
                const e = await f(a, 'utf8'); JSON.parse(e);
              } catch (e) {
                throw new Error(`Malformed locale: /locales/${n}.json\n${e.message}`);
              }
            }
          } if (o === 1 && await this._ensureFileExistsCaseSensitive('app.js'), await this._fileExistsCaseSensitive('env.json')) {
            let e; try {
              e = await f(b(this._path, 'env.json'), 'utf8'), e = JSON.parse(e);
            } catch (e) {
              throw new Error(`Malformed file: /env.json\n${e.message}`);
            } if (e) {
              for (const t in e) {
                if (t.toUpperCase() !== t) throw new Error(`Invalid /env.json key, must be uppercase: ${t}`); const r = e[t]; if (typeof r !== 'string') throw new Error(`Invalid /env.json value, must be of type string: ${r}`);
              }
            }
          } if (await this._ensureFileExistsCaseSensitive(b('assets', 'icon.svg')), await this._fileExistsCaseSensitive('settings') && await this._ensureFileExistsCaseSensitive(b('settings', 'index.html')), r && (await this._validateImages(n.images, 'app'), await this._validateModules()), n.brandColor && !this.constructor.isValidBrandColor(n.brandColor)) throw new Error('The color defined in `brandColor` is too bright. Icons are rendered white, so choose a darker color that has enough contrast.'); this.debug('Validated successfully');
        }

        _checkZwaveForSetting(e, t) {
          if (e && t && t.zwave) {
            if (typeof t.zwave.index !== 'number' || typeof t.zwave.size !== 'number') throw new Error(`Missing property in "zwave" at ${e.id}, ${t.id}`); if (t.attr && typeof t.attr.max === 'number' || typeof t.max === 'number') {
              let r; let a; let n; const i = t.zwave.size; a = typeof t.attr.max === 'number' ? t.attr.max : t.max, typeof t.attr.step !== 'number' || (n = t.attr.step), n > 1 && (a /= n), r = typeof t.zwave.signed !== 'boolean' || t.zwave.signed; const s = Math.pow(2, 8 * i) / 2 - 1; const o = Math.pow(2, 8 * i) - 1; if (r && a > s) throw new Error(`Value cannot be signed: ${e.id}, ${t.id}. Max value: ${s}, actual value: ${a}`); if (!r && a > o) throw new Error(`Max value out of bounds: ${e.id}, ${t.id}.  Max value: ${o}, actual value: ${a}`);
            }
          }
        }

        async _getDirectoryContents(e) {
          return await this._fileExistsCaseSensitive(e), e = b(this._path, e), v(e).then(t => t.map(t => b(e, t)));
        }

        async _ensureFileExistsCaseSensitive(e) {
          if (!0 !== await this._fileExistsCaseSensitive(e)) throw new Error(`Filepath does not exist: ${e}`);
        }

        async _fileExistsCaseSensitive(e) {
          e = b(this._path, e); const t = _(e); try {
            return !!(await h(t)).isDirectory() && (await v(t)).indexOf(w(e)) > -1;
          } catch (e) {
            return !1;
          }
        }

        async _validateImages(e, t) {
          const r = ['small', 'large']; for (let a = 0; a < r.length; a++) {
            const n = r[a]; const i = e[n]; const s = k(i); if (void 0 === P[s]) throw new Error(`Invalid image extention: ${s}`); await this._ensureFileExistsCaseSensitive(i); const o = P[s]; if (!(await this._readBytes(i, o.length)).equals(o)) throw new Error(`Invalid image: ${i}`); const l = A[t][n]; const u = await y(b(this._path, i)); if (u.width !== l.width || u.height !== l.height) throw new Error(`Invalid image size (${u.width}x${u.height}): ${i}\nRequired: ${l.width}x${l.height}`);
          }
        }

        async _validateModules() {
          const e = b(this._path, 'node_modules'); try {
            await h(e);
          } catch (e) {
            return;
          } for (const t of await v(e)) {
            let r; try {
              r = await g(b(e, t));
            } catch (e) {
              throw Error(`Invalid module '${t}' in 'node_modules': ${e.message}`);
            } if (r.isSymbolicLink()) throw Error(`Invalid module '${t}' in 'node_modules': is a symbolic link`);
          }
        }

        _validateFlowCard(e, t, { levelPublish: r, levelVerified: a }) {
          if (!1 === Array.isArray(e.args)) return; let i = !1; const s = e.args.filter(e => {
            if (i) return !0; if (e.type !== 'device') return !0; if (!e.filter) return !0; const t = n.parse(e.filter); return !t.driver_id && !t.driverId || (i = !0, !1);
          }); if (s.length !== 0) {
            if (e.droptoken && s.push({ name: 'droptoken' }), void 0 === e.titleFormatted) {
              if (a) throw new Error(`${t}.titleFormatted is missing.`); console.warn(`Warning: ${t}.titleFormatted is missing. Specifying a Flow card's formatted title will be required in the future.`);
            } if (typeof e.titleFormatted !== 'string') if (typeof e.titleFormatted !== 'object' || e.titleFormatted === null);else for (const [r, a] of Object.entries(e.titleFormatted))x._checkTitleFormatted(a, s, `${t}.titleFormatted.${r}`); else x._checkTitleFormatted(e.titleFormatted, s, `${t}.titleFormatted`);
          }
        }

        static _checkTitleFormatted(e, t, r) {
          const a = t.reduce((e, t) => (e[t.name] = !1, e), {}); const n = e.match(/\[\[(.*?)\]\]/gm); if (n === null) throw Error(`Missing all args in ${r}`); n.forEach(e => {
            const t = e.substring(2, e.length - 2); if (void 0 === a[t]) throw Error(`Invalid [[${t}]] in ${r}.titleFormatted`); if (!0 === a[t]) throw Error(`Duplicate [[${t}]] in ${r}.titleFormatted`); !1 === a[t] && (a[t] = !0);
          }); for (const [e, t] of Object.entries(a)) if (!1 === t) throw Error(`Missing [[${e}]] in ${r}`);
        }

        async _readBytes(e, r) {
          e = b(this._path, e); const a = await m(e, 'r'); const n = t.alloc(r); return await p(a, n, 0, r, 0), n;
        }

        static isValidId(e) {
          return typeof e === 'string' && (!(e.length < 1) && (!(e.split('.').length < 2) && !!/^[a-zA-Z0-9_.-]*$/g.test(e)));
        }

        static isValidBrandColor(e) {
          return o(e).getBrightness() <= 184;
        }

        static getJSONSchema() {
          const e = r(188); return JSON.parse(JSON.stringify(e));
        }

        static getPermissions() {
          const e = r(189); if (typeof b === 'function') {
            for (const t in e) {
              e[t].icon = b(a, '..', '..', 'assets', 'app', 'permissions', `${t.replace(/\:/g, '-')}.svg`);
            }
          } return e;
        }

        static getCategories() {
          return ['lights', 'video', 'music', 'appliances', 'security', 'climate', 'tools', 'internet', 'localization', 'energy'];
        }

        static getLocales() {
          return ['ab', 'aa', 'af', 'ak', 'sq', 'am', 'ar', 'an', 'hy', 'as', 'av', 'ae', 'ay', 'az', 'bm', 'ba', 'eu', 'be', 'bn', 'bh', 'bi', 'bs', 'br', 'bg', 'my', 'ca', 'ch', 'ce', 'ny', 'zh', 'cv', 'kw', 'co', 'cr', 'hr', 'cs', 'da', 'dv', 'nl', 'dz', 'en', 'eo', 'et', 'ee', 'fo', 'fj', 'fi', 'fr', 'ff', 'gl', 'ka', 'de', 'el', 'gn', 'gu', 'ht', 'ha', 'he', 'hz', 'hi', 'ho', 'hu', 'ia', 'id', 'ie', 'ga', 'ig', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'kl', 'kn', 'kr', 'ks', 'kk', 'km', 'ki', 'rw', 'ky', 'kv', 'kg', 'ko', 'ku', 'kj', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'gv', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mh', 'mn', 'na', 'nv', 'nd', 'ne', 'ng', 'nb', 'nn', 'no', 'ii', 'nr', 'oc', 'oj', 'cu', 'om', 'or', 'os', 'pa', 'pi', 'fa', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'sa', 'sc', 'sd', 'se', 'sm', 'sg', 'sr', 'gd', 'sn', 'si', 'sk', 'sl', 'so', 'st', 'es', 'su', 'sw', 'ss', 'sv', 'ta', 'te', 'tg', 'th', 'ti', 'bo', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'cy', 'wo', 'fy', 'xh', 'yi', 'yo', 'za', 'zu'];
        }

        static getBrandColor(e) {
          const r = t.from(e).toString('hex'); let a; let n = 0; do {
            const e = `${r}${++n}`; let t = o(`#${e.substring(e.length - 6)}`); t = o({ h: t.toHsv().h, s: 0.75, l: 0.5 }); const i = t.toHexString(); this.isValidBrandColor(i) && (a = i);
          } while (!a); return a;
        }

        static errorsText(e) {
          if (!1 !== Array.isArray(e)) {
            return e.reduce((e, t) => {
              let r = ''; switch (t.keyword) {
                case 'oneOf': return `${e}manifest${t.dataPath} matched no available schemas, see previous errors\n`; case 'enum': r = JSON.stringify(t.params.allowedValues);
              } return `${e}manifest${t.dataPath} ${t.message} ${r}\n`;
            }, '').slice(0, -1);
          }
        }

        static loopObjectRecursive(e, t) {
          for (const r in e)t(e[r]), typeof e[r] === 'object' && e[r] !== null && this.loopObjectRecursive(e[r], t);
        }

      }e.exports = x;
    }).call(this, r(2).Buffer, '/');
  }, function(e, t, r) {
    'use strict';

    t.byteLength = function(e) {
      const t = u(e); const r = t[0]; const a = t[1]; return 3 * (r + a) / 4 - a;
    }, t.toByteArray = function(e) {
      let t; let r; const a = u(e); const s = a[0]; const o = a[1]; const l = new i(function(e, t, r) {
        return 3 * (t + r) / 4 - r;
      }(0, s, o)); let d = 0; const c = o > 0 ? s - 4 : s; for (r = 0; r < c; r += 4)t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)], l[d++] = t >> 16 & 255, l[d++] = t >> 8 & 255, l[d++] = 255 & t; o === 2 && (t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4, l[d++] = 255 & t); o === 1 && (t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2, l[d++] = t >> 8 & 255, l[d++] = 255 & t); return l;
    }, t.fromByteArray = function(e) {
      for (var t, r = e.length, n = r % 3, i = [], s = 0, o = r - n; s < o; s += 16383)i.push(d(e, s, s + 16383 > o ? o : s + 16383)); n === 1 ? (t = e[r - 1], i.push(`${a[t >> 2] + a[t << 4 & 63]}==`)) : n === 2 && (t = (e[r - 2] << 8) + e[r - 1], i.push(`${a[t >> 10] + a[t >> 4 & 63] + a[t << 2 & 63]}=`)); return i.join('');
    }; for (var a = [], n = [], i = typeof Uint8Array !== 'undefined' ? Uint8Array : Array, s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', o = 0, l = s.length; o < l; ++o)a[o] = s[o], n[s.charCodeAt(o)] = o; function u(e) {
      const t = e.length; if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4'); let r = e.indexOf('='); return r === -1 && (r = t), [r, r === t ? 0 : 4 - r % 4];
    } function d(e, t, r) {
      for (var n, i, s = [], o = t; o < r; o += 3)n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), s.push(a[(i = n) >> 18 & 63] + a[i >> 12 & 63] + a[i >> 6 & 63] + a[63 & i]); return s.join('');
    }n['-'.charCodeAt(0)] = 62, n['_'.charCodeAt(0)] = 63;
  }, function(e, t) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    t.read = function(e, t, r, a, n) {
      let i; let s; const o = 8 * n - a - 1; const l = (1 << o) - 1; const u = l >> 1; let d = -7; let c = r ? n - 1 : 0; const m = r ? -1 : 1; let p = e[t + c]; for (c += m, i = p & (1 << -d) - 1, p >>= -d, d += o; d > 0; i = 256 * i + e[t + c], c += m, d -= 8);for (s = i & (1 << -d) - 1, i >>= -d, d += a; d > 0; s = 256 * s + e[t + c], c += m, d -= 8);if (i === 0)i = 1 - u; else {
        if (i === l) return s ? NaN : 1 / 0 * (p ? -1 : 1); s += Math.pow(2, a), i -= u;
      } return (p ? -1 : 1) * s * Math.pow(2, i - a);
    }, t.write = function(e, t, r, a, n, i) {
      let s; let o; let l; let u = 8 * i - n - 1; const d = (1 << u) - 1; const c = d >> 1; const m = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0; let p = a ? 0 : i - 1; const h = a ? 1 : -1; const f = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0; for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0, s = d) : (s = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t += s + c >= 1 ? m / l : m * Math.pow(2, 1 - c)) * l >= 2 && (s++, l /= 2), s + c >= d ? (o = 0, s = d) : s + c >= 1 ? (o = (t * l - 1) * Math.pow(2, n), s += c) : (o = t * Math.pow(2, c - 1) * Math.pow(2, n), s = 0)); n >= 8; e[r + p] = 255 & o, p += h, o /= 256, n -= 8);for (s = s << n | o, u += n; u > 0; e[r + p] = 255 & s, p += h, s /= 256, u -= 8);e[r + p - h] |= 128 * f;
    };
  }, function(e, t) {
    const r = {}.toString; e.exports = Array.isArray || function(e) {
      return r.call(e) == '[object Array]';
    };
  }, function(e, t, r) {
    'use strict';

    function a(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }e.exports = function(e, t, r, i) {
      t = t || '&', r = r || '='; const s = {}; if (typeof e !== 'string' || e.length === 0) return s; const o = /\+/g; e = e.split(t); let l = 1e3; i && typeof i.maxKeys === 'number' && (l = i.maxKeys); let u = e.length; l > 0 && u > l && (u = l); for (let d = 0; d < u; ++d) {
        var c; var m; var p; var h; const f = e[d].replace(o, '%20'); const v = f.indexOf(r); v >= 0 ? (c = f.substr(0, v), m = f.substr(v + 1)) : (c = f, m = ''), p = decodeURIComponent(c), h = decodeURIComponent(m), a(s, p) ? n(s[p]) ? s[p].push(h) : s[p] = [s[p], h] : s[p] = h;
      } return s;
    }; var n = Array.isArray || function(e) {
      return Object.prototype.toString.call(e) === '[object Array]';
    };
  }, function(e, t, r) {
    'use strict';

    const a = function(e) {
      switch (typeof e) {
        case 'string': return e; case 'boolean': return e ? 'true' : 'false'; case 'number': return isFinite(e) ? e : ''; default: return '';
      }
    }; e.exports = function(e, t, r, o) {
      return t = t || '&', r = r || '=', e === null && (e = void 0), typeof e === 'object' ? i(s(e), (s => {
        const o = encodeURIComponent(a(s)) + r; return n(e[s]) ? i(e[s], (e => {
          return o + encodeURIComponent(a(e));
        })).join(t) : o + encodeURIComponent(a(e[s]));
      })).join(t) : o ? encodeURIComponent(a(o)) + r + encodeURIComponent(a(e)) : '';
    }; var n = Array.isArray || function(e) {
      return Object.prototype.toString.call(e) === '[object Array]';
    }; function i(e, t) {
      if (e.map) return e.map(t); for (var r = [], a = 0; a < e.length; a++)r.push(t(e[a], a)); return r;
    } var s = Object.keys || function(e) {
      const t = []; for (const r in e)Object.prototype.hasOwnProperty.call(e, r) && t.push(r); return t;
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(3); const n = r(0); const i = r(5); const s = r(11); const o = r(12); const l = n.ucs2length; const u = r(4); const d = i.Validation; function c(e, t, r) {
      let a = p.call(this, e, t, r); return a >= 0 ? { index: a, compiling: !0 } : (a = this._compilations.length, this._compilations[a] = { schema: e, root: t, baseId: r }, { index: a, compiling: !1 });
    } function m(e, t, r) {
      const a = p.call(this, e, t, r); a >= 0 && this._compilations.splice(a, 1);
    } function p(e, t, r) {
      for (let a = 0; a < this._compilations.length; a++) {
        const n = this._compilations[a]; if (n.schema == e && n.root == t && n.baseId == r) return a;
      } return -1;
    } function h(e, t) {
      return `var pattern${e} = new RegExp(${n.toQuotedString(t[e])});`;
    } function f(e) {
      return `var default${e} = defaults[${e}];`;
    } function v(e, t) {
      return void 0 === t[e] ? '' : `var refVal${e} = refVal[${e}];`;
    } function g(e) {
      return `var customRule${e} = customRules[${e}];`;
    } function y(e, t) {
      if (!e.length) return ''; for (var r = '', a = 0; a < e.length; a++)r += t(a, e); return r;
    }e.exports = function e(t, r, p, b) {
      const k = this; const w = this._opts; const _ = [void 0]; const S = {}; const P = []; const A = {}; const E = []; const x = {}; const C = []; r = r || { schema: t, refVal: _, refs: S }; const O = c.call(this, t, r, b); const j = this._compilations[O.index]; if (O.compiling) {
        return j.callValidate = function e() {
          const t = j.validate; const r = t.apply(null, arguments); return e.errors = t.errors, r;
        };
      } const L = this._formats; const $ = this.RULES; try {
        const T = R(t, r, p, b); j.validate = T; const D = j.callValidate; return D && (D.schema = T.schema, D.errors = null, D.refs = T.refs, D.refVal = T.refVal, D.root = T.root, D.$async = T.$async, w.sourceCode && (D.source = T.source)), T;
      } finally {
        m.call(this, t, r, b);
      } function R(t, s, c, m) {
        const p = !s || s && s.schema == t; if (s.schema != r.schema) return e.call(k, t, s, c, m); let b; const A = !0 === t.$async; let x = o({
          isTop: !0, schema: t, isRoot: p, baseId: m, root: s, schemaPath: '', errSchemaPath: '#', errorPath: '""', MissingRefError: i.MissingRef, RULES: $, validate: o, util: n, resolve: a, resolveRef: z, usePattern: F, useDefault: B, useCustomRule: U, opts: w, formats: L, logger: k.logger, self: k,
        }); x = y(_, v) + y(P, h) + y(E, f) + y(C, g) + x, w.processCode && (x = w.processCode(x)); try {
          b = new Function('self', 'RULES', 'formats', 'root', 'refVal', 'defaults', 'customRules', 'equal', 'ucs2length', 'ValidationError', x)(k, $, L, r, _, E, C, u, l, d), _[0] = b;
        } catch (e) {
          throw k.logger.error('Error compiling schema, function code:', x), e;
        } return b.schema = t, b.errors = null, b.refs = S, b.refVal = _, b.root = p ? b : s, A && (b.$async = !0), !0 === w.sourceCode && (b.source = { code: x, patterns: P, defaults: E }), b;
      } function z(t, n, i) {
        n = a.url(t, n); let s; let o; const l = S[n]; if (void 0 !== l) return V(s = _[l], o = `refVal[${l}]`); if (!i && r.refs) {
          const u = r.refs[n]; if (void 0 !== u) return V(s = r.refVal[u], o = I(n, s));
        }o = I(n); let d = a.call(k, R, r, n); if (void 0 === d) {
          const c = p && p[n]; c && (d = a.inlineRef(c, w.inlineRefs) ? c : e.call(k, c, r, p, t));
        } if (void 0 !== d) {
          return (function(e, t) {
            const r = S[e]; _[r] = t;
          }(n, d)), V(d, o);
        } !(function(e) {
          delete S[e];
        }(n));
      } function I(e, t) {
        const r = _.length; return _[r] = t, S[e] = r, `refVal${r}`;
      } function V(e, t) {
        return typeof e === 'object' || typeof e === 'boolean' ? { code: t, schema: e, inline: !0 } : { code: t, $async: e && !!e.$async };
      } function F(e) {
        let t = A[e]; return void 0 === t && (t = A[e] = P.length, P[t] = e), `pattern${t}`;
      } function B(e) {
        switch (typeof e) {
          case 'boolean': case 'number': return `${e}`; case 'string': return n.toQuotedString(e); case 'object': if (e === null) return 'null'; var t = s(e); var r = x[t]; return void 0 === r && (r = x[t] = E.length, E[r] = e), `default${r}`;
        }
      } function U(e, t, r, a) {
        const n = e.definition.validateSchema; if (n && !1 !== k._opts.validateSchema && !n(t)) {
          const i = `keyword schema is invalid: ${k.errorsText(n.errors)}`; if (k._opts.validateSchema != 'log') throw new Error(i); k.logger.error(i);
        } let s; const o = e.definition.compile; const l = e.definition.inline; const u = e.definition.macro; if (o)s = o.call(k, t, r, a); else if (u)s = u.call(k, t, r, a), !1 !== w.validateSchema && k.validateSchema(s, !0); else if (l)s = l.call(k, a, e.keyword, t, r); else if (!(s = e.definition.validate)) return; if (void 0 === s) throw new Error(`custom keyword "${e.keyword}"failed to compile`); const d = C.length; return C[d] = s, { code: `customRule${d}`, validate: s };
      }
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(33); const n = r(35); function i() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
    }t.parse = b, t.resolve = function(e, t) {
      return b(e, !1, !0).resolve(t);
    }, t.resolveObject = function(e, t) {
      return e ? b(e, !1, !0).resolveObject(t) : t;
    }, t.format = function(e) {
      n.isString(e) && (e = b(e)); return e instanceof i ? e.format() : i.prototype.format.call(e);
    }, t.Url = i; const s = /^([a-z0-9.+-]+:)/i; const o = /:[0-9]*$/; const l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/; const u = ['{', '}', '|', '\\', '^', '`'].concat(['<', '>', '"', '`', ' ', '\r', '\n', '\t']); const d = ["'"].concat(u); const c = ['%', '/', '?', ';', '#'].concat(d); const m = ['/', '?', '#']; const p = /^[+a-z0-9A-Z_-]{0,63}$/; const h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/; const f = { javascript: !0, 'javascript:': !0 }; const v = { javascript: !0, 'javascript:': !0 }; const g = {
      http: !0, https: !0, ftp: !0, gopher: !0, file: !0, 'http:': !0, 'https:': !0, 'ftp:': !0, 'gopher:': !0, 'file:': !0,
    }; const y = r(8); function b(e, t, r) {
      if (e && n.isObject(e) && e instanceof i) return e; const a = new i(); return a.parse(e, t, r), a;
    }i.prototype.parse = function(e, t, r) {
      if (!n.isString(e)) throw new TypeError(`Parameter 'url' must be a string, not ${typeof e}`); const i = e.indexOf('?'); const o = i !== -1 && i < e.indexOf('#') ? '?' : '#'; const u = e.split(o); u[0] = u[0].replace(/\\/g, '/'); let b = e = u.join(o); if (b = b.trim(), !r && e.split('#').length === 1) {
        const k = l.exec(b); if (k) return this.path = b, this.href = b, this.pathname = k[1], k[2] ? (this.search = k[2], this.query = t ? y.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = '', this.query = {}), this;
      } let w = s.exec(b); if (w) {
        var _ = (w = w[0]).toLowerCase(); this.protocol = _, b = b.substr(w.length);
      } if (r || w || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var S = b.substr(0, 2) === '//'; !S || w && v[w] || (b = b.substr(2), this.slashes = !0);
      } if (!v[w] && (S || w && !g[w])) {
        for (var P, A, E = -1, x = 0; x < m.length; x++) {
          (C = b.indexOf(m[x])) !== -1 && (E === -1 || C < E) && (E = C);
        }(A = E === -1 ? b.lastIndexOf('@') : b.lastIndexOf('@', E)) !== -1 && (P = b.slice(0, A), b = b.slice(A + 1), this.auth = decodeURIComponent(P)), E = -1; for (x = 0; x < c.length; x++) {
          var C; (C = b.indexOf(c[x])) !== -1 && (E === -1 || C < E) && (E = C);
        }E === -1 && (E = b.length), this.host = b.slice(0, E), b = b.slice(E), this.parseHost(), this.hostname = this.hostname || ''; const O = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; if (!O) {
          for (var j = this.hostname.split(/\./), L = (x = 0, j.length); x < L; x++) {
            const $ = j[x]; if ($ && !$.match(p)) {
              for (var T = '', D = 0, R = $.length; D < R; D++)$.charCodeAt(D) > 127 ? T += 'x' : T += $[D]; if (!T.match(p)) {
                const z = j.slice(0, x); const I = j.slice(x + 1); const V = $.match(h); V && (z.push(V[1]), I.unshift(V[2])), I.length && (b = `/${I.join('.')}${b}`), this.hostname = z.join('.'); break;
              }
            }
          }
        } this.hostname.length > 255 ? this.hostname = '' : this.hostname = this.hostname.toLowerCase(), O || (this.hostname = a.toASCII(this.hostname)); var F = this.port ? `:${this.port}` : ''; const B = this.hostname || ''; this.host = B + F, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), b[0] !== '/' && (b = `/${b}`));
      } if (!f[_]) {
        for (x = 0, L = d.length; x < L; x++) {
          const U = d[x]; if (b.indexOf(U) !== -1) {
            let M = encodeURIComponent(U); M === U && (M = escape(U)), b = b.split(U).join(M);
          }
        }
      } const N = b.indexOf('#'); N !== -1 && (this.hash = b.substr(N), b = b.slice(0, N)); const q = b.indexOf('?'); if (q !== -1 ? (this.search = b.substr(q), this.query = b.substr(q + 1), t && (this.query = y.parse(this.query)), b = b.slice(0, q)) : t && (this.search = '', this.query = {}), b && (this.pathname = b), g[_] && this.hostname && !this.pathname && (this.pathname = '/'), this.pathname || this.search) {
        F = this.pathname || ''; const H = this.search || ''; this.path = F + H;
      } return this.href = this.format(), this;
    }, i.prototype.format = function() {
      let e = this.auth || ''; e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ':'), e += '@'); let t = this.protocol || ''; let r = this.pathname || ''; let a = this.hash || ''; let i = !1; let s = ''; this.host ? i = e + this.host : this.hostname && (i = e + (this.hostname.indexOf(':') === -1 ? this.hostname : `[${this.hostname}]`), this.port && (i += `:${this.port}`)), this.query && n.isObject(this.query) && Object.keys(this.query).length && (s = y.stringify(this.query)); let o = this.search || s && `?${s}` || ''; return t && t.substr(-1) !== ':' && (t += ':'), this.slashes || (!t || g[t]) && !1 !== i ? (i = `//${i || ''}`, r && r.charAt(0) !== '/' && (r = `/${r}`)) : i || (i = ''), a && a.charAt(0) !== '#' && (a = `#${a}`), o && o.charAt(0) !== '?' && (o = `?${o}`), t + i + (r = r.replace(/[?#]/g, (e => {
        return encodeURIComponent(e);
      }))) + (o = o.replace('#', '%23')) + a;
    }, i.prototype.resolve = function(e) {
      return this.resolveObject(b(e, !1, !0)).format();
    }, i.prototype.resolveObject = function(e) {
      if (n.isString(e)) {
        const t = new i(); t.parse(e, !1, !0), e = t;
      } for (var r = new i(), a = Object.keys(this), s = 0; s < a.length; s++) {
        const o = a[s]; r[o] = this[o];
      } if (r.hash = e.hash, e.href === '') return r.href = r.format(), r; if (e.slashes && !e.protocol) {
        for (let l = Object.keys(e), u = 0; u < l.length; u++) {
          const d = l[u]; d !== 'protocol' && (r[d] = e[d]);
        } return g[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = '/'), r.href = r.format(), r;
      } if (e.protocol && e.protocol !== r.protocol) {
        if (!g[e.protocol]) {
          for (let c = Object.keys(e), m = 0; m < c.length; m++) {
            const p = c[m]; r[p] = e[p];
          } return r.href = r.format(), r;
        } if (r.protocol = e.protocol, e.host || v[e.protocol])r.pathname = e.pathname; else {
          for (var h = (e.pathname || '').split('/'); h.length && !(e.host = h.shift()););e.host || (e.host = ''), e.hostname || (e.hostname = ''), h[0] !== '' && h.unshift(''), h.length < 2 && h.unshift(''), r.pathname = h.join('/');
        } if (r.search = e.search, r.query = e.query, r.host = e.host || '', r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
          const f = r.pathname || ''; const y = r.search || ''; r.path = f + y;
        } return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
      } const b = r.pathname && r.pathname.charAt(0) === '/'; const k = e.host || e.pathname && e.pathname.charAt(0) === '/'; let w = k || b || r.host && e.pathname; const _ = w; let S = r.pathname && r.pathname.split('/') || []; const P = (h = e.pathname && e.pathname.split('/') || [], r.protocol && !g[r.protocol]); if (P && (r.hostname = '', r.port = null, r.host && (S[0] === '' ? S[0] = r.host : S.unshift(r.host)), r.host = '', e.protocol && (e.hostname = null, e.port = null, e.host && (h[0] === '' ? h[0] = e.host : h.unshift(e.host)), e.host = null), w = w && (h[0] === '' || S[0] === '')), k)r.host = e.host || e.host === '' ? e.host : r.host, r.hostname = e.hostname || e.hostname === '' ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, S = h; else if (h.length)S || (S = []), S.pop(), S = S.concat(h), r.search = e.search, r.query = e.query; else if (!n.isNullOrUndefined(e.search)) {
        if (P)r.hostname = r.host = S.shift(), (O = !!(r.host && r.host.indexOf('@') > 0) && r.host.split('@')) && (r.auth = O.shift(), r.host = r.hostname = O.shift()); return r.search = e.search, r.query = e.query, n.isNull(r.pathname) && n.isNull(r.search) || (r.path = (r.pathname ? r.pathname : '') + (r.search ? r.search : '')), r.href = r.format(), r;
      } if (!S.length) return r.pathname = null, r.search ? r.path = `/${r.search}` : r.path = null, r.href = r.format(), r; for (var A = S.slice(-1)[0], E = (r.host || e.host || S.length > 1) && (A === '.' || A === '..') || A === '', x = 0, C = S.length; C >= 0; C--)(A = S[C]) === '.' ? S.splice(C, 1) : A === '..' ? (S.splice(C, 1), x++) : x && (S.splice(C, 1), x--); if (!w && !_) for (;x--; x)S.unshift('..'); !w || S[0] === '' || S[0] && S[0].charAt(0) === '/' || S.unshift(''), E && S.join('/').substr(-1) !== '/' && S.push(''); let O; const j = S[0] === '' || S[0] && S[0].charAt(0) === '/'; P && (r.hostname = r.host = j ? '' : S.length ? S.shift() : '', (O = !!(r.host && r.host.indexOf('@') > 0) && r.host.split('@')) && (r.auth = O.shift(), r.host = r.hostname = O.shift())); return (w = w || r.host && S.length) && !j && S.unshift(''), S.length ? r.pathname = S.join('/') : (r.pathname = null, r.path = null), n.isNull(r.pathname) && n.isNull(r.search) || (r.path = (r.pathname ? r.pathname : '') + (r.search ? r.search : '')), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
    }, i.prototype.parseHost = function() {
      let e = this.host; let t = o.exec(e); t && ((t = t[0]) !== ':' && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
    };
  }, function(e, t, r) {
    (function(e, a) {
      let n; /*! https://mths.be/punycode v1.4.1 by @mathias */!(function(i) {
        t && t.nodeType, e && e.nodeType; const s = typeof a === 'object' && a; s.global !== s && s.window !== s && s.self; let o; const l = 2147483647; const u = /^xn--/; const d = /[^\x20-\x7E]/; const c = /[\x2E\u3002\uFF0E\uFF61]/g; const m = { overflow: 'Overflow: input needs wider integers to process', 'not-basic': 'Illegal input >= 0x80 (not a basic code point)', 'invalid-input': 'Invalid input' }; const p = Math.floor; const h = String.fromCharCode; function f(e) {
          throw new RangeError(m[e]);
        } function v(e, t) {
          for (var r = e.length, a = []; r--;)a[r] = t(e[r]); return a;
        } function g(e, t) {
          const r = e.split('@'); let a = ''; return r.length > 1 && (a = `${r[0]}@`, e = r[1]), a + v((e = e.replace(c, '.')).split('.'), t).join('.');
        } function y(e) {
          for (var t, r, a = [], n = 0, i = e.length; n < i;)(t = e.charCodeAt(n++)) >= 55296 && t <= 56319 && n < i ? (64512 & (r = e.charCodeAt(n++))) == 56320 ? a.push(((1023 & t) << 10) + (1023 & r) + 65536) : (a.push(t), n--) : a.push(t); return a;
        } function b(e) {
          return v(e, (e => {
            let t = ''; return e > 65535 && (t += h((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += h(e);
          })).join('');
        } function k(e, t) {
          return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
        } function w(e, t, r) {
          let a = 0; for (e = r ? p(e / 700) : e >> 1, e += p(e / t); e > 455; a += 36)e = p(e / 35); return p(a + 36 * e / (e + 38));
        } function _(e) {
          let t; let r; let a; let n; let i; let s; let o; let u; let d; let c; let m; const h = []; const v = e.length; let g = 0; let y = 128; let k = 72; for ((r = e.lastIndexOf('-')) < 0 && (r = 0), a = 0; a < r; ++a)e.charCodeAt(a) >= 128 && f('not-basic'), h.push(e.charCodeAt(a)); for (n = r > 0 ? r + 1 : 0; n < v;) {
            for (i = g, s = 1, o = 36; n >= v && f('invalid-input'), ((u = (m = e.charCodeAt(n++)) - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : 36) >= 36 || u > p((l - g) / s)) && f('overflow'), g += u * s, !(u < (d = o <= k ? 1 : o >= k + 26 ? 26 : o - k)); o += 36)s > p(l / (c = 36 - d)) && f('overflow'), s *= c; k = w(g - i, t = h.length + 1, i == 0), p(g / t) > l - y && f('overflow'), y += p(g / t), g %= t, h.splice(g++, 0, y);
          } return b(h);
        } function S(e) {
          let t; let r; let a; let n; let i; let s; let o; let u; let d; let c; let m; let v; let g; let b; let _; const S = []; for (v = (e = y(e)).length, t = 128, r = 0, i = 72, s = 0; s < v; ++s)(m = e[s]) < 128 && S.push(h(m)); for (a = n = S.length, n && S.push('-'); a < v;) {
            for (o = l, s = 0; s < v; ++s)(m = e[s]) >= t && m < o && (o = m); for (o - t > p((l - r) / (g = a + 1)) && f('overflow'), r += (o - t) * g, t = o, s = 0; s < v; ++s) {
              if ((m = e[s]) < t && ++r > l && f('overflow'), m == t) {
                for (u = r, d = 36; !(u < (c = d <= i ? 1 : d >= i + 26 ? 26 : d - i)); d += 36)_ = u - c, b = 36 - c, S.push(h(k(c + _ % b, 0))), u = p(_ / b); S.push(h(k(u, 0))), i = w(r, g, a == n), r = 0, ++a;
              }
            }++r, ++t;
          } return S.join('');
        }o = {
          version: '1.4.1',
          ucs2: { decode: y, encode: b },
          decode: _,
          encode: S,
          toASCII(e) {
            return g(e, (e => {
              return d.test(e) ? `xn--${S(e)}` : e;
            }));
          },
          toUnicode(e) {
            return g(e, (e => {
              return u.test(e) ? _(e.slice(4).toLowerCase()) : e;
            }));
          },
        }, void 0 === (n = function() {
          return o;
        }.call(t, r, t, e)) || (e.exports = n);
      }());
    }).call(this, r(34)(e), r(7));
  }, function(e, t) {
    e.exports = function(e) {
      return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, 'loaded', {
        enumerable: !0,
        get() {
          return e.l;
        },
      }), Object.defineProperty(e, 'id', {
        enumerable: !0,
        get() {
          return e.i;
        },
      }), e.webpackPolyfill = 1), e;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      isString(e) {
        return typeof e === 'string';
      },
      isObject(e) {
        return typeof e === 'object' && e !== null;
      },
      isNull(e) {
        return e === null;
      },
      isNullOrUndefined(e) {
        return e == null;
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e) {
      for (var t, r = 0, a = e.length, n = 0; n < a;)r++, (t = e.charCodeAt(n++)) >= 55296 && t <= 56319 && n < a && (64512 & (t = e.charCodeAt(n))) == 56320 && n++; return r;
    };
  }, function(e, t, r) {
    'use strict';

    var a = e.exports = function(e, t, r) {
      typeof t === 'function' && (r = t, t = {}), (function e(t, r, n, i, s, o, l, u, d) {
        if (n && typeof n === 'object' && !Array.isArray(n)) {
          for (const c in r(n, i, s, o, l, u, d), n) {
            const m = n[c]; if (Array.isArray(m)) {
              if (c in a.arrayKeywords) for (let p = 0; p < m.length; p++)e(t, r, m[p], `${i}/${c}/${p}`, s, i, c, n, p);
            } else if (c in a.propsKeywords) {
              if (m && typeof m === 'object') for (const h in m)e(t, r, m[h], `${i}/${c}/${h.replace(/~/g, '~0').replace(/\//g, '~1')}`, s, i, c, n, h);
            } else (c in a.keywords || t.allKeys && !(c in a.skipKeywords)) && e(t, r, m, `${i}/${c}`, s, i, c, n);
          }
        }
      }(t, r, e, '', e));
    }; a.keywords = {
      additionalItems: !0, items: !0, contains: !0, additionalProperties: !0, propertyNames: !0, not: !0,
    }, a.arrayKeywords = {
      items: !0, allOf: !0, anyOf: !0, oneOf: !0,
    }, a.propsKeywords = {
      definitions: !0, properties: !0, patternProperties: !0, dependencies: !0,
    }, a.skipKeywords = {
      enum: !0, const: !0, required: !0, maximum: !0, minimum: !0, exclusiveMaximum: !0, exclusiveMinimum: !0, multipleOf: !0, maxLength: !0, minLength: !0, pattern: !0, format: !0, maxItems: !0, minItems: !0, uniqueItems: !0, maxProperties: !0, minProperties: !0,
    };
  }, function(e, t, r) {
    'use strict';

    const a = e.exports = function() {
      this._cache = {};
    }; a.prototype.put = function(e, t) {
      this._cache[e] = t;
    }, a.prototype.get = function(e) {
      return this._cache[e];
    }, a.prototype.del = function(e) {
      delete this._cache[e];
    }, a.prototype.clear = function() {
      this._cache = {};
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(0); const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/; const i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; const s = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i; const o = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i; const l = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i; const u = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i; const d = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i; const c = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i; const m = /^(?:\/(?:[^~/]|~0|~1)*)*$/; const p = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i; const h = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/; function f(e) {
      return e = e == 'full' ? 'full' : 'fast', a.copy(f[e]);
    } function v(e) {
      const t = e.match(n); if (!t) return !1; const r = +t[1]; const a = +t[2]; const s = +t[3]; return a >= 1 && a <= 12 && s >= 1 && s <= (a == 2 && (function(e) {
        return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
      }(r)) ? 29 : i[a]);
    } function g(e, t) {
      const r = e.match(s); if (!r) return !1; const a = r[1]; const n = r[2]; const i = r[3]; const o = r[5]; return (a <= 23 && n <= 59 && i <= 59 || a == 23 && n == 59 && i == 60) && (!t || o);
    }e.exports = f, f.fast = {
      date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/, time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i, 'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i, uri: /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i, 'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i, 'uri-template': u, url: d, email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i, hostname: o, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/, ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i, regex: w, uuid: c, 'json-pointer': m, 'json-pointer-uri-fragment': p, 'relative-json-pointer': h,
    }, f.full = {
      date: v,
      time: g,
      'date-time': function(e) {
        const t = e.split(y); return t.length == 2 && v(t[0]) && g(t[1], !0);
      },
      uri(e) {
        return b.test(e) && l.test(e);
      },
      'uri-reference': /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      'uri-template': u,
      url: d,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname(e) {
        return e.length <= 255 && o.test(e);
      },
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
      regex: w,
      uuid: c,
      'json-pointer': m,
      'json-pointer-uri-fragment': p,
      'relative-json-pointer': h,
    }; var y = /t|\s/i; var b = /\/|:/; const k = /[^\\]\\Z/; function w(e) {
      if (k.test(e)) return !1; try {
        return new RegExp(e), !0;
      } catch (e) {
        return !1;
      }
    }
  }, function(e, t, r) {
    'use strict';

    const a = r(41); const n = r(0).toHash; e.exports = function() {
      const e = [{ type: 'number', rules: [{ maximum: ['exclusiveMaximum'] }, { minimum: ['exclusiveMinimum'] }, 'multipleOf', 'format'] }, { type: 'string', rules: ['maxLength', 'minLength', 'pattern', 'format'] }, { type: 'array', rules: ['maxItems', 'minItems', 'items', 'contains', 'uniqueItems'] }, { type: 'object', rules: ['maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames', { properties: ['additionalProperties', 'patternProperties'] }] }, { rules: ['$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if'] }]; const t = ['type', '$comment']; return e.all = n(t), e.types = n(['number', 'integer', 'string', 'array', 'object', 'boolean', 'null']), e.forEach((r => {
        r.rules = r.rules.map((r => {
          let n; if (typeof r === 'object') {
            const i = Object.keys(r)[0]; n = r[i], r = i, n.forEach((r => {
              t.push(r), e.all[r] = !0;
            }));
          } return t.push(r), e.all[r] = { keyword: r, code: a[r], implements: n };
        })), e.all.$comment = { keyword: '$comment', code: a.$comment }, r.type && (e.types[r.type] = r);
      })), e.keywords = n(t.concat(['$schema', '$id', 'id', '$data', 'title', 'description', 'default', 'definitions', 'examples', 'readOnly', 'writeOnly', 'contentMediaType', 'contentEncoding', 'additionalItems', 'then', 'else'])), e.custom = {}, e;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      $ref: r(42), allOf: r(43), anyOf: r(44), $comment: r(45), const: r(46), contains: r(47), dependencies: r(48), enum: r(49), format: r(50), if: r(51), items: r(52), maximum: r(13), minimum: r(13), maxItems: r(14), minItems: r(14), maxLength: r(15), minLength: r(15), maxProperties: r(16), minProperties: r(16), multipleOf: r(53), not: r(54), oneOf: r(55), pattern: r(56), properties: r(57), propertyNames: r(58), required: r(59), uniqueItems: r(60), validate: r(12),
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n; let i = ' '; const s = e.level; const o = e.dataLevel; const l = e.schema[t]; const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${o || ''}`; const m = `valid${s}`; if (l == '#' || l == '#/')e.isRoot ? (a = e.async, n = 'validate') : (a = !0 === e.root.schema.$async, n = 'root.refVal[0]'); else {
        const p = e.resolveRef(e.baseId, l, e.isRoot); if (void 0 === p) {
          const h = e.MissingRefError.message(e.baseId, l); if (e.opts.missingRefs == 'fail') {
            e.logger.error(h), (y = y || []).push(i), i = '', !1 !== e.createErrors ? (i += ` { keyword: '$ref' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { ref: '${e.util.escapeQuotes(l)}' } `, !1 !== e.opts.messages && (i += ` , message: 'can\\'t resolve reference ${e.util.escapeQuotes(l)}' `), e.opts.verbose && (i += ` , schema: ${e.util.toQuotedString(l)} , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), i += ' } ') : i += ' {} '; const f = i; i = y.pop(), !e.compositeRule && d ? e.async ? i += ` throw new ValidationError([${f}]); ` : i += ` validate.errors = [${f}]; return false; ` : i += ` var err = ${f};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, d && (i += ' if (false) { ');
          } else {
            if (e.opts.missingRefs != 'ignore') throw new e.MissingRefError(e.baseId, l, h); e.logger.warn(h), d && (i += ' if (true) { ');
          }
        } else if (p.inline) {
          const v = e.util.copy(e); v.level++; const g = `valid${v.level}`; v.schema = p.schema, v.schemaPath = '', v.errSchemaPath = l, i += ` ${e.validate(v).replace(/validate\.schema/g, p.code)} `, d && (i += ` if (${g}) { `);
        } else a = !0 === p.$async || e.async && !1 !== p.$async, n = p.code;
      } if (n) {
        var y; (y = y || []).push(i), i = '', e.opts.passContext ? i += ` ${n}.call(this, ` : i += ` ${n}( `, i += ` ${c}, (dataPath || '')`, e.errorPath != '""' && (i += ` + ${e.errorPath}`); const b = i += ` , ${o ? `data${o - 1 || ''}` : 'parentData'} , ${o ? e.dataPathArr[o] : 'parentDataProperty'}, rootData)  `; if (i = y.pop(), a) {
          if (!e.async) throw new Error('async schema referenced by sync schema'); d && (i += ` var ${m}; `), i += ` try { await ${b}; `, d && (i += ` ${m} = true; `), i += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ', d && (i += ` ${m} = false; `), i += ' } ', d && (i += ` if (${m}) { `);
        } else i += ` if (!${b}) { if (vErrors === null) vErrors = ${n}.errors; else vErrors = vErrors.concat(${n}.errors); errors = vErrors.length; } `, d && (i += ' else { ');
      } return i;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.schema[t]; const i = e.schemaPath + e.util.getProperty(t); const s = `${e.errSchemaPath}/${t}`; const o = !e.opts.allErrors; const l = e.util.copy(e); let u = ''; l.level++; const d = `valid${l.level}`; const c = l.baseId; let m = !0; const p = n; if (p) for (var h, f = -1, v = p.length - 1; f < v;)h = p[f += 1], e.util.schemaHasRules(h, e.RULES.all) && (m = !1, l.schema = h, l.schemaPath = `${i}[${f}]`, l.errSchemaPath = `${s}/${f}`, a += `  ${e.validate(l)} `, l.baseId = c, o && (a += ` if (${d}) { `, u += '}')); return o && (a += m ? ' if (true) { ' : ` ${u.slice(0, -1)} `), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = `errs__${n}`; const p = e.util.copy(e); let h = ''; p.level++; const f = `valid${p.level}`; if (s.every((t => {
        return e.util.schemaHasRules(t, e.RULES.all);
      }))) {
        const v = p.baseId; a += ` var ${m} = errors; var ${c} = false;  `; const g = e.compositeRule; e.compositeRule = p.compositeRule = !0; const y = s; if (y) for (var b, k = -1, w = y.length - 1; k < w;)b = y[k += 1], p.schema = b, p.schemaPath = `${o}[${k}]`, p.errSchemaPath = `${l}/${k}`, a += `  ${e.validate(p)} `, p.baseId = v, a += ` ${c} = ${c} || ${f}; if (!${c}) { `, h += '}'; e.compositeRule = p.compositeRule = g, a += ` ${h} if (!${c}) {   var err =   `, !1 !== e.createErrors ? (a += ` { keyword: 'anyOf' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'should match some schema in anyOf' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', !e.compositeRule && u && (e.async ? a += ' throw new ValidationError(vErrors); ' : a += ' validate.errors = vErrors; return false; '), a += ` } else {  errors = ${m}; if (vErrors !== null) { if (${m}) vErrors.length = ${m}; else vErrors = null; } `, e.opts.allErrors && (a += ' } '), a = e.util.cleanUpCode(a);
      } else u && (a += ' if (true) { '); return a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.schema[t]; const i = `${e.errSchemaPath}/${t}`; const s = (e.opts.allErrors, e.util.toQuotedString(n)); return !0 === e.opts.$comment ? a += ` console.log(${s});` : typeof e.opts.$comment === 'function' && (a += ` self._opts.$comment(${s}, ${e.util.toQuotedString(i)}, validate.root.schema);`), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = e.opts.$data && s && s.$data; m && (a += ` var schema${n} = ${e.util.getData(s.$data, i, e.dataPathArr)}; `), m || (a += ` var schema${n} = validate.schema${o};`), a += `var ${c} = equal(${d}, schema${n}); if (!${c}) {   `; var p = p || []; p.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'const' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'should be equal to constant' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const h = a; return a = p.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${h}]); ` : a += ` validate.errors = [${h}]; return false; ` : a += ` var err = ${h};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' }', u && (a += ' else { '), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = `errs__${n}`; const p = e.util.copy(e); p.level++; const h = `valid${p.level}`; const f = `i${n}`; const v = p.dataLevel = e.dataLevel + 1; const g = `data${v}`; const y = e.baseId; const b = e.util.schemaHasRules(s, e.RULES.all); if (a += `var ${m} = errors;var ${c};`, b) {
        const k = e.compositeRule; e.compositeRule = p.compositeRule = !0, p.schema = s, p.schemaPath = o, p.errSchemaPath = l, a += ` var ${h} = false; for (var ${f} = 0; ${f} < ${d}.length; ${f}++) { `, p.errorPath = e.util.getPathExpr(e.errorPath, f, e.opts.jsonPointers, !0); const w = `${d}[${f}]`; p.dataPathArr[v] = f; const _ = e.validate(p); p.baseId = y, e.util.varOccurences(_, g) < 2 ? a += ` ${e.util.varReplace(_, g, w)} ` : a += ` var ${g} = ${w}; ${_} `, a += ` if (${h}) break; }  `, e.compositeRule = p.compositeRule = k, a += `  if (!${h}) {`;
      } else a += ` if (${d}.length == 0) {`; var S = S || []; S.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'contains' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'should contain a valid item' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const P = a; return a = S.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${P}]); ` : a += ` validate.errors = [${P}]; return false; ` : a += ` var err = ${P};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } else { ', b && (a += `  errors = ${m}; if (vErrors !== null) { if (${m}) vErrors.length = ${m}; else vErrors = null; } `), e.opts.allErrors && (a += ' } '), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `errs__${n}`; const m = e.util.copy(e); let p = ''; m.level++; const h = `valid${m.level}`; const f = {}; const v = {}; const g = e.opts.ownProperties; for (w in s) {
        var y = s[w]; var b = Array.isArray(y) ? v : f; b[w] = y;
      }a += `var ${c} = errors;`; const k = e.errorPath; for (var w in a += `var missing${n};`, v) {
        if ((b = v[w]).length) {
          if (a += ` if ( ${d}${e.util.getProperty(w)} !== undefined `, g && (a += ` && Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(w)}') `), u) {
            a += ' && ( '; const _ = b; if (_) {
              for (let S = -1, P = _.length - 1; S < P;) {
                j = _[S += 1], S && (a += ' || '), a += ` ( ( ${D = d + (T = e.util.getProperty(j))} === undefined `, g && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(j)}') `), a += `) && (missing${n} = ${e.util.toQuotedString(e.opts.jsonPointers ? j : T)}) ) `;
              }
            }a += ')) {  '; const A = `missing${n}`; var E = `' + ${A} + '`; e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(k, A, !0) : `${k} + ${A}`); var x = x || []; x.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'dependencies' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { property: '${e.util.escapeQuotes(w)}', missingProperty: '${E}', depsCount: ${b.length}, deps: '${e.util.escapeQuotes(b.length == 1 ? b[0] : b.join(', '))}' } `, !1 !== e.opts.messages && (a += " , message: 'should have ", b.length == 1 ? a += `property ${e.util.escapeQuotes(b[0])}` : a += `properties ${e.util.escapeQuotes(b.join(', '))}`, a += ` when property ${e.util.escapeQuotes(w)} is present' `), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const C = a; a = x.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${C}]); ` : a += ` validate.errors = [${C}]; return false; ` : a += ` var err = ${C};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `;
          } else {
            a += ' ) { '; const O = b; if (O) {
              for (var j, L = -1, $ = O.length - 1; L < $;) {
                j = O[L += 1]; var T = e.util.getProperty(j); var D = (E = e.util.escapeQuotes(j), d + T); e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(k, j, e.opts.jsonPointers)), a += ` if ( ${D} === undefined `, g && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(j)}') `), a += ') {  var err =   ', !1 !== e.createErrors ? (a += ` { keyword: 'dependencies' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { property: '${e.util.escapeQuotes(w)}', missingProperty: '${E}', depsCount: ${b.length}, deps: '${e.util.escapeQuotes(b.length == 1 ? b[0] : b.join(', '))}' } `, !1 !== e.opts.messages && (a += " , message: 'should have ", b.length == 1 ? a += `property ${e.util.escapeQuotes(b[0])}` : a += `properties ${e.util.escapeQuotes(b.join(', '))}`, a += ` when property ${e.util.escapeQuotes(w)} is present' `), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
              }
            }
          }a += ' }   ', u && (p += '}', a += ' else { ');
        }
      }e.errorPath = k; const R = m.baseId; for (var w in f) {
        y = f[w]; e.util.schemaHasRules(y, e.RULES.all) && (a += ` ${h} = true; if ( ${d}${e.util.getProperty(w)} !== undefined `, g && (a += ` && Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(w)}') `), a += ') { ', m.schema = y, m.schemaPath = o + e.util.getProperty(w), m.errSchemaPath = `${l}/${e.util.escapeFragment(w)}`, a += `  ${e.validate(m)} `, m.baseId = R, a += ' }  ', u && (a += ` if (${h}) { `, p += '}'));
      } return u && (a += `   ${p} if (${c} == errors) {`), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = e.opts.$data && s && s.$data; m && (a += ` var schema${n} = ${e.util.getData(s.$data, i, e.dataPathArr)}; `); const p = `i${n}`; const h = `schema${n}`; m || (a += ` var ${h} = validate.schema${o};`), a += `var ${c};`, m && (a += ` if (schema${n} === undefined) ${c} = true; else if (!Array.isArray(schema${n})) ${c} = false; else {`), a += `${c} = false;for (var ${p}=0; ${p}<${h}.length; ${p}++) if (equal(${d}, ${h}[${p}])) { ${c} = true; break; }`, m && (a += '  }  '), a += ` if (!${c}) {   `; var f = f || []; f.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'enum' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { allowedValues: schema${n} } `, !1 !== e.opts.messages && (a += " , message: 'should be equal to one of the allowed values' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const v = a; return a = f.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${v}]); ` : a += ` validate.errors = [${v}]; return false; ` : a += ` var err = ${v};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' }', u && (a += ' else { '), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; if (!1 === e.opts.format) return u && (a += ' if (true) { '), a; let c; const m = e.opts.$data && s && s.$data; m ? (a += ` var schema${n} = ${e.util.getData(s.$data, i, e.dataPathArr)}; `, c = `schema${n}`) : c = s; const p = e.opts.unknownFormats; const h = Array.isArray(p); if (m) {
        a += ` var ${f = `format${n}`} = formats[${c}]; var ${v = `isObject${n}`} = typeof ${f} == 'object' && !(${f} instanceof RegExp) && ${f}.validate; var ${g = `formatType${n}`} = ${v} && ${f}.type || 'string'; if (${v}) { `, e.async && (a += ` var async${n} = ${f}.async; `), a += ` ${f} = ${f}.validate; } if (  `, m && (a += ` (${c} !== undefined && typeof ${c} != 'string') || `), a += ' (', p != 'ignore' && (a += ` (${c} && !${f} `, h && (a += ` && self._opts.unknownFormats.indexOf(${c}) == -1 `), a += ') || '), a += ` (${f} && ${g} == '${r}' && !(typeof ${f} == 'function' ? `, e.async ? a += ` (async${n} ? await ${f}(${d}) : ${f}(${d})) ` : a += ` ${f}(${d}) `, a += ` : ${f}.test(${d}))))) {`;
      } else {
        var f; if (!(f = e.formats[s])) {
          if (p == 'ignore') return e.logger.warn(`unknown format "${s}" ignored in schema at path "${e.errSchemaPath}"`), u && (a += ' if (true) { '), a; if (h && p.indexOf(s) >= 0) return u && (a += ' if (true) { '), a; throw new Error(`unknown format "${s}" is used in schema at path "${e.errSchemaPath}"`);
        } var v; var g = (v = typeof f === 'object' && !(f instanceof RegExp) && f.validate) && f.type || 'string'; if (v) {
          var y = !0 === f.async; f = f.validate;
        } if (g != r) return u && (a += ' if (true) { '), a; if (y) {
          if (!e.async) throw new Error('async format in sync schema'); a += ` if (!(await ${b = `formats${e.util.getProperty(s)}.validate`}(${d}))) { `;
        } else {
          a += ' if (! '; var b = `formats${e.util.getProperty(s)}`; v && (b += '.validate'), a += typeof f === 'function' ? ` ${b}(${d}) ` : ` ${b}.test(${d}) `, a += ') { ';
        }
      } var k = k || []; k.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'format' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { format:  `, a += m ? `${c}` : `${e.util.toQuotedString(s)}`, a += '  } ', !1 !== e.opts.messages && (a += " , message: 'should match format \"", a += m ? `' + ${c} + '` : `${e.util.escapeQuotes(s)}`, a += "\"' "), e.opts.verbose && (a += ' , schema:  ', a += m ? `validate.schema${o}` : `${e.util.toQuotedString(s)}`, a += `         , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const w = a; return a = k.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${w}]); ` : a += ` validate.errors = [${w}]; return false; ` : a += ` var err = ${w};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } ', u && (a += ' else { '), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = `errs__${n}`; const p = e.util.copy(e); p.level++; const h = `valid${p.level}`; const f = e.schema.then; const v = e.schema.else; const g = void 0 !== f && e.util.schemaHasRules(f, e.RULES.all); const y = void 0 !== v && e.util.schemaHasRules(v, e.RULES.all); const b = p.baseId; if (g || y) {
        let k; p.createErrors = !1, p.schema = s, p.schemaPath = o, p.errSchemaPath = l, a += ` var ${m} = errors; var ${c} = true;  `; const w = e.compositeRule; e.compositeRule = p.compositeRule = !0, a += `  ${e.validate(p)} `, p.baseId = b, p.createErrors = !0, a += `  errors = ${m}; if (vErrors !== null) { if (${m}) vErrors.length = ${m}; else vErrors = null; }  `, e.compositeRule = p.compositeRule = w, g ? (a += ` if (${h}) {  `, p.schema = e.schema.then, p.schemaPath = `${e.schemaPath}.then`, p.errSchemaPath = `${e.errSchemaPath}/then`, a += `  ${e.validate(p)} `, p.baseId = b, a += ` ${c} = ${h}; `, g && y ? a += ` var ${k = `ifClause${n}`} = 'then'; ` : k = "'then'", a += ' } ', y && (a += ' else { ')) : a += ` if (!${h}) { `, y && (p.schema = e.schema.else, p.schemaPath = `${e.schemaPath}.else`, p.errSchemaPath = `${e.errSchemaPath}/else`, a += `  ${e.validate(p)} `, p.baseId = b, a += ` ${c} = ${h}; `, g && y ? a += ` var ${k = `ifClause${n}`} = 'else'; ` : k = "'else'", a += ' } '), a += ` if (!${c}) {   var err =   `, !1 !== e.createErrors ? (a += ` { keyword: 'if' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { failingKeyword: ${k} } `, !1 !== e.opts.messages && (a += ` , message: 'should match "' + ${k} + '" schema' `), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', !e.compositeRule && u && (e.async ? a += ' throw new ValidationError(vErrors); ' : a += ' validate.errors = vErrors; return false; '), a += ' }   ', u && (a += ' else { '), a = e.util.cleanUpCode(a);
      } else u && (a += ' if (true) { '); return a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); let l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = `errs__${n}`; const p = e.util.copy(e); let h = ''; p.level++; const f = `valid${p.level}`; const v = `i${n}`; const g = p.dataLevel = e.dataLevel + 1; const y = `data${g}`; const b = e.baseId; if (a += `var ${m} = errors;var ${c};`, Array.isArray(s)) {
        const k = e.schema.additionalItems; if (!1 === k) {
          a += ` ${c} = ${d}.length <= ${s.length}; `; const w = l; l = `${e.errSchemaPath}/additionalItems`, a += `  if (!${c}) {   `; var _ = _ || []; _.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'additionalItems' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { limit: ${s.length} } `, !1 !== e.opts.messages && (a += ` , message: 'should NOT have more than ${s.length} items' `), e.opts.verbose && (a += ` , schema: false , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const S = a; a = _.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${S}]); ` : a += ` validate.errors = [${S}]; return false; ` : a += ` var err = ${S};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } ', l = w, u && (h += '}', a += ' else { ');
        } const P = s; if (P) {
          for (var A, E = -1, x = P.length - 1; E < x;) {
            if (A = P[E += 1], e.util.schemaHasRules(A, e.RULES.all)) {
              a += ` ${f} = true; if (${d}.length > ${E}) { `; var C = `${d}[${E}]`; p.schema = A, p.schemaPath = `${o}[${E}]`, p.errSchemaPath = `${l}/${E}`, p.errorPath = e.util.getPathExpr(e.errorPath, E, e.opts.jsonPointers, !0), p.dataPathArr[g] = E; var O = e.validate(p); p.baseId = b, e.util.varOccurences(O, y) < 2 ? a += ` ${e.util.varReplace(O, y, C)} ` : a += ` var ${y} = ${C}; ${O} `, a += ' }  ', u && (a += ` if (${f}) { `, h += '}');
            }
          }
        } if (typeof k === 'object' && e.util.schemaHasRules(k, e.RULES.all)) {
          p.schema = k, p.schemaPath = `${e.schemaPath}.additionalItems`, p.errSchemaPath = `${e.errSchemaPath}/additionalItems`, a += ` ${f} = true; if (${d}.length > ${s.length}) {  for (var ${v} = ${s.length}; ${v} < ${d}.length; ${v}++) { `, p.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers, !0); C = `${d}[${v}]`; p.dataPathArr[g] = v; O = e.validate(p); p.baseId = b, e.util.varOccurences(O, y) < 2 ? a += ` ${e.util.varReplace(O, y, C)} ` : a += ` var ${y} = ${C}; ${O} `, u && (a += ` if (!${f}) break; `), a += ' } }  ', u && (a += ` if (${f}) { `, h += '}');
        }
      } else if (e.util.schemaHasRules(s, e.RULES.all)) {
        p.schema = s, p.schemaPath = o, p.errSchemaPath = l, a += `  for (var ${v} = 0; ${v} < ${d}.length; ${v}++) { `, p.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers, !0); C = `${d}[${v}]`; p.dataPathArr[g] = v; O = e.validate(p); p.baseId = b, e.util.varOccurences(O, y) < 2 ? a += ` ${e.util.varReplace(O, y, C)} ` : a += ` var ${y} = ${C}; ${O} `, u && (a += ` if (!${f}) break; `), a += ' }';
      } return u && (a += ` ${h} if (${m} == errors) {`), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o, n += `var division${i};if (`, m && (n += ` ${a} !== undefined && ( typeof ${a} != 'number' || `), n += ` (division${i} = ${c} / ${a}, `, e.opts.multipleOfPrecision ? n += ` Math.abs(Math.round(division${i}) - division${i}) > 1e-${e.opts.multipleOfPrecision} ` : n += ` division${i} !== parseInt(division${i}) `, n += ' ) ', m && (n += '  )  '), n += ' ) {   '; var p = p || []; p.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: 'multipleOf' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { multipleOf: ${a} } `, !1 !== e.opts.messages && (n += " , message: 'should be multiple of ", n += m ? `' + ${a}` : `${a}'`), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const h = n; return n = p.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${h}]); ` : n += ` validate.errors = [${h}]; return false; ` : n += ` var err = ${h};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += '} ', d && (n += ' else { '), n;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `errs__${n}`; const m = e.util.copy(e); m.level++; const p = `valid${m.level}`; if (e.util.schemaHasRules(s, e.RULES.all)) {
        m.schema = s, m.schemaPath = o, m.errSchemaPath = l, a += ` var ${c} = errors;  `; let h; const f = e.compositeRule; e.compositeRule = m.compositeRule = !0, m.createErrors = !1, m.opts.allErrors && (h = m.opts.allErrors, m.opts.allErrors = !1), a += ` ${e.validate(m)} `, m.createErrors = !0, h && (m.opts.allErrors = h), e.compositeRule = m.compositeRule = f, a += ` if (${p}) {   `; var v = v || []; v.push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'not' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'should NOT be valid' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; const g = a; a = v.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${g}]); ` : a += ` validate.errors = [${g}]; return false; ` : a += ` var err = ${g};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ` } else {  errors = ${c}; if (vErrors !== null) { if (${c}) vErrors.length = ${c}; else vErrors = null; } `, e.opts.allErrors && (a += ' } ');
      } else a += '  var err =   ', !1 !== e.createErrors ? (a += ` { keyword: 'not' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: {} `, !1 !== e.opts.messages && (a += " , message: 'should NOT be valid' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', u && (a += ' if (false) { '); return a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = `errs__${n}`; const p = e.util.copy(e); let h = ''; p.level++; const f = `valid${p.level}`; const v = p.baseId; const g = `prevValid${n}`; const y = `passingSchemas${n}`; a += `var ${m} = errors , ${g} = false , ${c} = false , ${y} = null; `; const b = e.compositeRule; e.compositeRule = p.compositeRule = !0; const k = s; if (k) for (var w, _ = -1, S = k.length - 1; _ < S;)w = k[_ += 1], e.util.schemaHasRules(w, e.RULES.all) ? (p.schema = w, p.schemaPath = `${o}[${_}]`, p.errSchemaPath = `${l}/${_}`, a += `  ${e.validate(p)} `, p.baseId = v) : a += ` var ${f} = true; `, _ && (a += ` if (${f} && ${g}) { ${c} = false; ${y} = [${y}, ${_}]; } else { `, h += '}'), a += ` if (${f}) { ${c} = ${g} = true; ${y} = ${_}; }`; return e.compositeRule = p.compositeRule = b, a += `${h}if (!${c}) {   var err =   `, !1 !== e.createErrors ? (a += ` { keyword: 'oneOf' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { passingSchemas: ${y} } `, !1 !== e.opts.messages && (a += " , message: 'should match exactly one schema in oneOf' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', !e.compositeRule && u && (e.async ? a += ' throw new ValidationError(vErrors); ' : a += ' validate.errors = vErrors; return false; '), a += `} else {  errors = ${m}; if (vErrors !== null) { if (${m}) vErrors.length = ${m}; else vErrors = null; }`, e.opts.allErrors && (a += ' } '), a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = e.opts.$data && o && o.$data; m ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o, n += 'if ( ', m && (n += ` (${a} !== undefined && typeof ${a} != 'string') || `), n += ` !${m ? `(new RegExp(${a}))` : e.usePattern(o)}.test(${c}) ) {   `; var p = p || []; p.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: 'pattern' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { pattern:  `, n += m ? `${a}` : `${e.util.toQuotedString(o)}`, n += '  } ', !1 !== e.opts.messages && (n += " , message: 'should match pattern \"", n += m ? `' + ${a} + '` : `${e.util.escapeQuotes(o)}`, n += "\"' "), e.opts.verbose && (n += ' , schema:  ', n += m ? `validate.schema${l}` : `${e.util.toQuotedString(o)}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const h = n; return n = p.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${h}]); ` : n += ` validate.errors = [${h}]; return false; ` : n += ` var err = ${h};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += '} ', d && (n += ' else { '), n;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); let l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `errs__${n}`; const m = e.util.copy(e); let p = ''; m.level++; const h = `valid${m.level}`; const f = `key${n}`; const v = `idx${n}`; const g = m.dataLevel = e.dataLevel + 1; const y = `data${g}`; const b = `dataProperties${n}`; const k = Object.keys(s || {}); const w = e.schema.patternProperties || {}; const _ = Object.keys(w); const S = e.schema.additionalProperties; const P = k.length || _.length; const A = !1 === S; const E = typeof S === 'object' && Object.keys(S).length; const x = e.opts.removeAdditional; const C = A || E || x; const O = e.opts.ownProperties; const j = e.baseId; const L = e.schema.required; if (L && (!e.opts.v5 || !L.$data) && L.length < e.opts.loopRequired) var $ = e.util.toHash(L); if (a += `var ${c} = errors;var ${h} = true;`, O && (a += ` var ${b} = undefined;`), C) {
        if (a += O ? ` ${b} = ${b} || Object.keys(${d}); for (var ${v}=0; ${v}<${b}.length; ${v}++) { var ${f} = ${b}[${v}]; ` : ` for (var ${f} in ${d}) { `, P) {
          if (a += ` var isAdditional${n} = !(false `, k.length) {
            if (k.length > 5)a += ` || validate.schema${o}[${f}] `; else {
              const T = k; if (T) for (let D = -1, R = T.length - 1; D < R;)K = T[D += 1], a += ` || ${f} == ${e.util.toQuotedString(K)} `;
            }
          } if (_.length) {
            const z = _; if (z) for (let I = -1, V = z.length - 1; I < V;)ne = z[I += 1], a += ` || ${e.usePattern(ne)}.test(${f}) `;
          }a += ` ); if (isAdditional${n}) { `;
        } if (x == 'all')a += ` delete ${d}[${f}]; `; else {
          var F = e.errorPath; const B = `' + ${f} + '`; if (e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(e.errorPath, f, e.opts.jsonPointers)), A) {
            if (x)a += ` delete ${d}[${f}]; `; else {
              a += ` ${h} = false; `; var U = l; l = `${e.errSchemaPath}/additionalProperties`, (te = te || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'additionalProperties' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { additionalProperty: '${B}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is an invalid additional property' : a += 'should NOT have additional properties', a += "' "), e.opts.verbose && (a += ` , schema: false , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; var M = a; a = te.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${M}]); ` : a += ` validate.errors = [${M}]; return false; ` : a += ` var err = ${M};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, l = U, u && (a += ' break; ');
            }
          } else if (E) {
            if (x == 'failing') {
              a += ` var ${c} = errors;  `; const N = e.compositeRule; e.compositeRule = m.compositeRule = !0, m.schema = S, m.schemaPath = `${e.schemaPath}.additionalProperties`, m.errSchemaPath = `${e.errSchemaPath}/additionalProperties`, m.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, f, e.opts.jsonPointers); var q = `${d}[${f}]`; m.dataPathArr[g] = f; var H = e.validate(m); m.baseId = j, e.util.varOccurences(H, y) < 2 ? a += ` ${e.util.varReplace(H, y, q)} ` : a += ` var ${y} = ${q}; ${H} `, a += ` if (!${h}) { errors = ${c}; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ${d}[${f}]; }  `, e.compositeRule = m.compositeRule = N;
            } else {
              m.schema = S, m.schemaPath = `${e.schemaPath}.additionalProperties`, m.errSchemaPath = `${e.errSchemaPath}/additionalProperties`, m.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, f, e.opts.jsonPointers); q = `${d}[${f}]`; m.dataPathArr[g] = f; H = e.validate(m); m.baseId = j, e.util.varOccurences(H, y) < 2 ? a += ` ${e.util.varReplace(H, y, q)} ` : a += ` var ${y} = ${q}; ${H} `, u && (a += ` if (!${h}) break; `);
            }
          }e.errorPath = F;
        }P && (a += ' } '), a += ' }  ', u && (a += ` if (${h}) { `, p += '}');
      } const G = e.opts.useDefaults && !e.compositeRule; if (k.length) {
        const J = k; if (J) {
          for (var K, W = -1, Q = J.length - 1; W < Q;) {
            var Z = s[K = J[W += 1]]; if (e.util.schemaHasRules(Z, e.RULES.all)) {
              const Y = e.util.getProperty(K); const X = (q = d + Y, G && void 0 !== Z.default); m.schema = Z, m.schemaPath = o + Y, m.errSchemaPath = `${l}/${e.util.escapeFragment(K)}`, m.errorPath = e.util.getPath(e.errorPath, K, e.opts.jsonPointers), m.dataPathArr[g] = e.util.toQuotedString(K); H = e.validate(m); if (m.baseId = j, e.util.varOccurences(H, y) < 2) {
                H = e.util.varReplace(H, y, q); var ee = q;
              } else {
                ee = y; a += ` var ${y} = ${q}; `;
              } if (X)a += ` ${H} `; else {
                if ($ && $[K]) {
                  a += ` if ( ${ee} === undefined `, O && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(K)}') `), a += `) { ${h} = false; `; F = e.errorPath, U = l; var te; const re = e.util.escapeQuotes(K); e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(F, K, e.opts.jsonPointers)), l = `${e.errSchemaPath}/required`, (te = te || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${re}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${re}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; M = a; a = te.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${M}]); ` : a += ` validate.errors = [${M}]; return false; ` : a += ` var err = ${M};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, l = U, e.errorPath = F, a += ' } else { ';
                } else u ? (a += ` if ( ${ee} === undefined `, O && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(K)}') `), a += `) { ${h} = true; } else { `) : (a += ` if (${ee} !== undefined `, O && (a += ` &&   Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(K)}') `), a += ' ) { '); a += ` ${H} } `;
              }
            }u && (a += ` if (${h}) { `, p += '}');
          }
        }
      } if (_.length) {
        const ae = _; if (ae) {
          for (var ne, ie = -1, se = ae.length - 1; ie < se;) {
            Z = w[ne = ae[ie += 1]]; if (e.util.schemaHasRules(Z, e.RULES.all)) {
              m.schema = Z, m.schemaPath = `${e.schemaPath}.patternProperties${e.util.getProperty(ne)}`, m.errSchemaPath = `${e.errSchemaPath}/patternProperties/${e.util.escapeFragment(ne)}`, a += O ? ` ${b} = ${b} || Object.keys(${d}); for (var ${v}=0; ${v}<${b}.length; ${v}++) { var ${f} = ${b}[${v}]; ` : ` for (var ${f} in ${d}) { `, a += ` if (${e.usePattern(ne)}.test(${f})) { `, m.errorPath = e.util.getPathExpr(e.errorPath, f, e.opts.jsonPointers); q = `${d}[${f}]`; m.dataPathArr[g] = f; H = e.validate(m); m.baseId = j, e.util.varOccurences(H, y) < 2 ? a += ` ${e.util.varReplace(H, y, q)} ` : a += ` var ${y} = ${q}; ${H} `, u && (a += ` if (!${h}) break; `), a += ' } ', u && (a += ` else ${h} = true; `), a += ' }  ', u && (a += ` if (${h}) { `, p += '}');
            }
          }
        }
      } return u && (a += ` ${p} if (${c} == errors) {`), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `errs__${n}`; const m = e.util.copy(e); m.level++; const p = `valid${m.level}`; if (e.util.schemaHasRules(s, e.RULES.all)) {
        m.schema = s, m.schemaPath = o, m.errSchemaPath = l; const h = `key${n}`; const f = `idx${n}`; const v = `i${n}`; const g = `' + ${h} + '`; const y = `data${m.dataLevel = e.dataLevel + 1}`; const b = `dataProperties${n}`; const k = e.opts.ownProperties; const w = e.baseId; a += ` var ${c} = errors; `, k && (a += ` var ${b} = undefined; `), a += k ? ` ${b} = ${b} || Object.keys(${d}); for (var ${f}=0; ${f}<${b}.length; ${f}++) { var ${h} = ${b}[${f}]; ` : ` for (var ${h} in ${d}) { `, a += ` var startErrs${n} = errors; `; const _ = h; const S = e.compositeRule; e.compositeRule = m.compositeRule = !0; const P = e.validate(m); m.baseId = w, e.util.varOccurences(P, y) < 2 ? a += ` ${e.util.varReplace(P, y, _)} ` : a += ` var ${y} = ${_}; ${P} `, e.compositeRule = m.compositeRule = S, a += ` if (!${p}) { for (var ${v}=startErrs${n}; ${v}<errors; ${v}++) { vErrors[${v}].propertyName = ${h}; }   var err =   `, !1 !== e.createErrors ? (a += ` { keyword: 'propertyNames' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { propertyName: '${g}' } `, !1 !== e.opts.messages && (a += ` , message: 'property name \\'${g}\\' is invalid' `), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', !e.compositeRule && u && (e.async ? a += ' throw new ValidationError(vErrors); ' : a += ' validate.errors = vErrors; return false; '), u && (a += ' break; '), a += ' } }';
      } return u && (a += `  if (${c} == errors) {`), a = e.util.cleanUpCode(a);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a = ' '; const n = e.level; const i = e.dataLevel; const s = e.schema[t]; const o = e.schemaPath + e.util.getProperty(t); const l = `${e.errSchemaPath}/${t}`; const u = !e.opts.allErrors; const d = `data${i || ''}`; const c = `valid${n}`; const m = e.opts.$data && s && s.$data; m && (a += ` var schema${n} = ${e.util.getData(s.$data, i, e.dataPathArr)}; `); const p = `schema${n}`; if (!m) {
        if (s.length < e.opts.loopRequired && e.schema.properties && Object.keys(e.schema.properties).length) {
          var h = []; const f = s; if (f) {
            for (var v, g = -1, y = f.length - 1; g < y;) {
              v = f[g += 1]; const b = e.schema.properties[v]; b && e.util.schemaHasRules(b, e.RULES.all) || (h[h.length] = v);
            }
          }
        } else h = s;
      } if (m || h.length) {
        const k = e.errorPath; const w = m || h.length >= e.opts.loopRequired; const _ = e.opts.ownProperties; if (u) {
          if (a += ` var missing${n}; `, w) {
            m || (a += ` var ${p} = validate.schema${o}; `); var S = `' + ${O = `schema${n}[${E = `i${n}`}]`} + '`; e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(k, O, e.opts.jsonPointers)), a += ` var ${c} = true; `, m && (a += ` if (schema${n} === undefined) ${c} = true; else if (!Array.isArray(schema${n})) ${c} = false; else {`), a += ` for (var ${E} = 0; ${E} < ${p}.length; ${E}++) { ${c} = ${d}[${p}[${E}]] !== undefined `, _ && (a += ` &&   Object.prototype.hasOwnProperty.call(${d}, ${p}[${E}]) `), a += `; if (!${c}) break; } `, m && (a += '  }  '), a += `  if (!${c}) {   `, (C = C || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${S}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${S}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; var P = a; a = C.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${P}]); ` : a += ` validate.errors = [${P}]; return false; ` : a += ` var err = ${P};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } else { ';
          } else {
            a += ' if ( '; const A = h; if (A) {
              for (var E = -1, x = A.length - 1; E < x;) {
                L = A[E += 1], E && (a += ' || '), a += ` ( ( ${R = d + (D = e.util.getProperty(L))} === undefined `, _ && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(L)}') `), a += `) && (missing${n} = ${e.util.toQuotedString(e.opts.jsonPointers ? L : D)}) ) `;
              }
            }a += ') {  '; var C; S = `' + ${O = `missing${n}`} + '`; e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(k, O, !0) : `${k} + ${O}`), (C = C || []).push(a), a = '', !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${S}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${S}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} '; P = a; a = C.pop(), !e.compositeRule && u ? e.async ? a += ` throw new ValidationError([${P}]); ` : a += ` validate.errors = [${P}]; return false; ` : a += ` var err = ${P};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, a += ' } else { ';
          }
        } else if (w) {
          m || (a += ` var ${p} = validate.schema${o}; `); var O; S = `' + ${O = `schema${n}[${E = `i${n}`}]`} + '`; e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(k, O, e.opts.jsonPointers)), m && (a += ` if (${p} && !Array.isArray(${p})) {  var err =   `, !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${S}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${S}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += `;  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (${p} !== undefined) { `), a += ` for (var ${E} = 0; ${E} < ${p}.length; ${E}++) { if (${d}[${p}[${E}]] === undefined `, _ && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, ${p}[${E}]) `), a += ') {  var err =   ', !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${S}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${S}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ', m && (a += '  }  ');
        } else {
          const j = h; if (j) {
            for (var L, $ = -1, T = j.length - 1; $ < T;) {
              L = j[$ += 1]; var D = e.util.getProperty(L); var R = (S = e.util.escapeQuotes(L), d + D); e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(k, L, e.opts.jsonPointers)), a += ` if ( ${R} === undefined `, _ && (a += ` || ! Object.prototype.hasOwnProperty.call(${d}, '${e.util.escapeQuotes(L)}') `), a += ') {  var err =   ', !1 !== e.createErrors ? (a += ` { keyword: 'required' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(l)} , params: { missingProperty: '${S}' } `, !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += 'is a required property' : a += `should have required property \\'${S}\\'`, a += "' "), e.opts.verbose && (a += ` , schema: validate.schema${o} , parentSchema: validate.schema${e.schemaPath} , data: ${d} `), a += ' } ') : a += ' {} ', a += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
            }
          }
        }e.errorPath = k;
      } else u && (a += ' if (true) {'); return a;
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n = ' '; const i = e.level; const s = e.dataLevel; const o = e.schema[t]; const l = e.schemaPath + e.util.getProperty(t); const u = `${e.errSchemaPath}/${t}`; const d = !e.opts.allErrors; const c = `data${s || ''}`; const m = `valid${i}`; const p = e.opts.$data && o && o.$data; if (p ? (n += ` var schema${i} = ${e.util.getData(o.$data, s, e.dataPathArr)}; `, a = `schema${i}`) : a = o, (o || p) && !1 !== e.opts.uniqueItems) {
        p && (n += ` var ${m}; if (${a} === false || ${a} === undefined) ${m} = true; else if (typeof ${a} != 'boolean') ${m} = false; else { `), n += ` var i = ${c}.length , ${m} = true , j; if (i > 1) { `; const h = e.schema.items && e.schema.items.type; n += h && h != 'object' && h != 'array' ? ` var itemIndices = {}, item; for (;i--;) { var item = ${c}[i]; if (typeof item != '${h}') continue; if (itemIndices[item] !== undefined) { ${m} = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ` : ` outer: for (;i--;) { for (j = i; j--;) { if (equal(${c}[i], ${c}[j])) { ${m} = false; break outer; } } } `, n += ' } ', p && (n += '  }  '), n += ` if (!${m}) {   `; var f = f || []; f.push(n), n = '', !1 !== e.createErrors ? (n += ` { keyword: 'uniqueItems' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(u)} , params: { i: i, j: j } `, !1 !== e.opts.messages && (n += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "), e.opts.verbose && (n += ' , schema:  ', n += p ? `validate.schema${l}` : `${o}`, n += `         , parentSchema: validate.schema${e.schemaPath} , data: ${c} `), n += ' } ') : n += ' {} '; const v = n; n = f.pop(), !e.compositeRule && d ? e.async ? n += ` throw new ValidationError([${v}]); ` : n += ` validate.errors = [${v}]; return false; ` : n += ` var err = ${v};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `, n += ' } ', d && (n += ' else { ');
      } else d && (n += ' if (true) { '); return n;
    };
  }, function(e, t, r) {
    'use strict';

    const a = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength', 'pattern', 'additionalItems', 'maxItems', 'minItems', 'uniqueItems', 'maxProperties', 'minProperties', 'required', 'additionalProperties', 'enum', 'format', 'const']; e.exports = function(e, t) {
      for (let r = 0; r < t.length; r++) {
        e = JSON.parse(JSON.stringify(e)); var n; const i = t[r].split('/'); let s = e; for (n = 1; n < i.length; n++)s = s[i[n]]; for (n = 0; n < a.length; n++) {
          const o = a[n]; const l = s[o]; l && (s[o] = { anyOf: [l, { $ref: 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }] });
        }
      } return e;
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(5).MissingRef; e.exports = function e(t, r, n) {
      const i = this; if (typeof this._opts.loadSchema !== 'function') throw new Error('options.loadSchema should be a function'); typeof r === 'function' && (n = r, r = void 0); const s = o(t).then((() => {
        const e = i._addSchema(t, void 0, r); return e.validate || (function e(t) {
          try {
            return i._compile(t);
          } catch (e) {
            if (e instanceof a) return n(e); throw e;
          } function n(a) {
            const n = a.missingSchema; if (u(n)) throw new Error(`Schema ${n} is loaded but ${a.missingRef} cannot be resolved`); let s = i._loadingSchemas[n]; return s || (s = i._loadingSchemas[n] = i._opts.loadSchema(n)).then(l, l), s.then((e => {
              if (!u(n)) {
                return o(e).then((() => {
                  u(n) || i.addSchema(e, n, void 0, r);
                }));
              }
            })).then((() => {
              return e(t);
            })); function l() {
              delete i._loadingSchemas[n];
            } function u(e) {
              return i._refs[e] || i._schemas[e];
            }
          }
        }(e));
      })); n && s.then((e => {
        n(null, e);
      }), n); return s; function o(t) {
        const r = t.$schema; return r && !i.getSchema(r) ? e.call(i, { $ref: r }, !0) : Promise.resolve();
      }
    };
  }, function(e, t, r) {
    'use strict';

    const a = /^[a-z_$][a-z0-9_$-]*$/i; const n = r(64); e.exports = {
      add(e, t) {
        const r = this.RULES; if (r.keywords[e]) throw new Error(`Keyword ${e} is already defined`); if (!a.test(e)) throw new Error(`Keyword ${e} is not a valid identifier`); if (t) {
          if (t.macro && void 0 !== t.valid) throw new Error('"valid" option cannot be used with macro keywords'); const i = t.type; if (Array.isArray(i)) {
            let s; const o = i.length; for (s = 0; s < o; s++)c(i[s]); for (s = 0; s < o; s++)d(e, i[s], t);
          } else i && c(i), d(e, i, t); const l = !0 === t.$data && this._opts.$data; if (l && !t.validate) throw new Error('$data support: "validate" function is not defined'); let u = t.metaSchema; u && (l && (u = { anyOf: [u, { $ref: 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }] }), t.validateSchema = this.compile(u, !0));
        } function d(e, t, a) {
          for (var i, s = 0; s < r.length; s++) {
            const o = r[s]; if (o.type == t) {
              i = o; break;
            }
          }i || (i = { type: t, rules: [] }, r.push(i)); const l = {
            keyword: e, definition: a, custom: !0, code: n, implements: a.implements,
          }; i.rules.push(l), r.custom[e] = l;
        } function c(e) {
          if (!r.types[e]) throw new Error(`Unknown type ${e}`);
        } return r.keywords[e] = r.all[e] = !0, this;
      },
      get(e) {
        const t = this.RULES.custom[e]; return t ? t.definition : this.RULES.keywords[e] || !1;
      },
      remove(e) {
        const t = this.RULES; delete t.keywords[e], delete t.all[e], delete t.custom[e]; for (let r = 0; r < t.length; r++) {
          for (let a = t[r].rules, n = 0; n < a.length; n++) {
            if (a[n].keyword == e) {
              a.splice(n, 1); break;
            }
          }
        } return this;
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r) {
      let a; let n; let i = ' '; const s = e.level; const o = e.dataLevel; const l = e.schema[t]; const u = e.schemaPath + e.util.getProperty(t); const d = `${e.errSchemaPath}/${t}`; const c = !e.opts.allErrors; const m = `data${o || ''}`; const p = `valid${s}`; const h = `errs__${s}`; const f = e.opts.$data && l && l.$data; f ? (i += ` var schema${s} = ${e.util.getData(l.$data, o, e.dataPathArr)}; `, n = `schema${s}`) : n = l; let v; let g; let y; let b; let k; const w = `definition${s}`; const _ = this.definition; let S = ''; if (f && _.$data) {
        k = `keywordValidate${s}`; var P = _.validateSchema; i += ` var ${w} = RULES.custom['${t}'].definition; var ${k} = ${w}.validate;`;
      } else {
        if (!(b = e.useCustomRule(this, l, e.schema, e))) return; n = `validate.schema${u}`, k = b.code, v = _.compile, g = _.inline, y = _.macro;
      } let A = `${k}.errors`; const E = `i${s}`; const x = `ruleErr${s}`; const C = _.async; if (C && !e.async) throw new Error('async keyword in sync schema'); if (g || y || (i += `${A} = null;`), i += `var ${h} = errors;var ${p};`, f && _.$data && (S += '}', i += ` if (${n} === undefined) { ${p} = true; } else { `, P && (S += '}', i += ` ${p} = ${w}.validateSchema(${n}); if (${p}) { `)), g)_.statements ? i += ` ${b.validate} ` : i += ` ${p} = ${b.validate}; `; else if (y) {
        const O = e.util.copy(e); S = ''; O.level++; var j = `valid${O.level}`; O.schema = b.validate, O.schemaPath = ''; const L = e.compositeRule; e.compositeRule = O.compositeRule = !0; const $ = e.validate(O).replace(/validate\.schema/g, k); e.compositeRule = O.compositeRule = L, i += ` ${$}`;
      } else {
        (z = z || []).push(i), i = '', i += `  ${k}.call( `, e.opts.passContext ? i += 'this' : i += 'self', v || !1 === _.schema ? i += ` , ${m} ` : i += ` , ${n} , ${m} , validate.schema${e.schemaPath} `, i += " , (dataPath || '')", e.errorPath != '""' && (i += ` + ${e.errorPath}`); var T = o ? `data${o - 1 || ''}` : 'parentData'; var D = o ? e.dataPathArr[o] : 'parentDataProperty'; const R = i += ` , ${T} , ${D} , rootData )  `; i = z.pop(), !1 === _.errors ? (i += ` ${p} = `, C && (i += 'await '), i += `${R}; `) : i += C ? ` var ${A = `customErrors${s}`} = null; try { ${p} = await ${R}; } catch (e) { ${p} = false; if (e instanceof ValidationError) ${A} = e.errors; else throw e; } ` : ` ${A} = null; ${p} = ${R}; `;
      } if (_.modifying && (i += ` if (${T}) ${m} = ${T}[${D}];`), i += `${S}`, _.valid)c && (i += ' if (true) { '); else {
        var z; i += ' if ( ', void 0 === _.valid ? (i += ' !', i += y ? `${j}` : `${p}`) : i += ` ${!_.valid} `, i += ') { ', a = this.keyword, (z = z || []).push(i), i = '', (z = z || []).push(i), i = '', !1 !== e.createErrors ? (i += ` { keyword: '${a || 'custom'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(d)} , params: { keyword: '${this.keyword}' } `, !1 !== e.opts.messages && (i += ` , message: 'should pass "${this.keyword}" keyword validation' `), e.opts.verbose && (i += ` , schema: validate.schema${u} , parentSchema: validate.schema${e.schemaPath} , data: ${m} `), i += ' } ') : i += ' {} '; const I = i; i = z.pop(), !e.compositeRule && c ? e.async ? i += ` throw new ValidationError([${I}]); ` : i += ` validate.errors = [${I}]; return false; ` : i += ` var err = ${I};  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; `; const V = i; i = z.pop(), g ? _.errors ? _.errors != 'full' && (i += `  for (var ${E}=${h}; ${E}<errors; ${E}++) { var ${x} = vErrors[${E}]; if (${x}.dataPath === undefined) ${x}.dataPath = (dataPath || '') + ${e.errorPath}; if (${x}.schemaPath === undefined) { ${x}.schemaPath = "${d}"; } `, e.opts.verbose && (i += ` ${x}.schema = ${n}; ${x}.data = ${m}; `), i += ' } ') : !1 === _.errors ? i += ` ${V} ` : (i += ` if (${h} == errors) { ${V} } else {  for (var ${E}=${h}; ${E}<errors; ${E}++) { var ${x} = vErrors[${E}]; if (${x}.dataPath === undefined) ${x}.dataPath = (dataPath || '') + ${e.errorPath}; if (${x}.schemaPath === undefined) { ${x}.schemaPath = "${d}"; } `, e.opts.verbose && (i += ` ${x}.schema = ${n}; ${x}.data = ${m}; `), i += ' } } ') : y ? (i += '   var err =   ', !1 !== e.createErrors ? (i += ` { keyword: '${a || 'custom'}' , dataPath: (dataPath || '') + ${e.errorPath} , schemaPath: ${e.util.toQuotedString(d)} , params: { keyword: '${this.keyword}' } `, !1 !== e.opts.messages && (i += ` , message: 'should pass "${this.keyword}" keyword validation' `), e.opts.verbose && (i += ` , schema: validate.schema${u} , parentSchema: validate.schema${e.schemaPath} , data: ${m} `), i += ' } ') : i += ' {} ', i += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ', !e.compositeRule && c && (e.async ? i += ' throw new ValidationError(vErrors); ' : i += ' validate.errors = vErrors; return false; ')) : !1 === _.errors ? i += ` ${V} ` : (i += ` if (Array.isArray(${A})) { if (vErrors === null) vErrors = ${A}; else vErrors = vErrors.concat(${A}); errors = vErrors.length;  for (var ${E}=${h}; ${E}<errors; ${E}++) { var ${x} = vErrors[${E}]; if (${x}.dataPath === undefined) ${x}.dataPath = (dataPath || '') + ${e.errorPath};  ${x}.schemaPath = "${d}";  `, e.opts.verbose && (i += ` ${x}.schema = ${n}; ${x}.data = ${m}; `), i += ` } } else { ${V} } `), i += ' } ', c && (i += ' else { ');
      } return i;
    };
  }, function(e) {
    e.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON Schema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');
  }, function(e) {
    e.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');
  }, function(e, t, r) {
    (function(r) {
      let a; t = e.exports = J, a = typeof r === 'object' && r.env && r.env.NODE_DEBUG && /\bsemver\b/i.test(r.env.NODE_DEBUG) ? function() {
        const e = Array.prototype.slice.call(arguments, 0); e.unshift('SEMVER'), console.log.apply(console, e);
      } : function() {}, t.SEMVER_SPEC_VERSION = '2.0.0'; const n = Number.MAX_SAFE_INTEGER || 9007199254740991; const i = t.re = []; const s = t.src = []; let o = 0; const l = o++; s[l] = '0|[1-9]\\d*'; const u = o++; s[u] = '[0-9]+'; const d = o++; s[d] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'; const c = o++; s[c] = `(${s[l]})\\.(${s[l]})\\.(${s[l]})`; const m = o++; s[m] = `(${s[u]})\\.(${s[u]})\\.(${s[u]})`; const p = o++; s[p] = `(?:${s[l]}|${s[d]})`; const h = o++; s[h] = `(?:${s[u]}|${s[d]})`; const f = o++; s[f] = `(?:-(${s[p]}(?:\\.${s[p]})*))`; const v = o++; s[v] = `(?:-?(${s[h]}(?:\\.${s[h]})*))`; const g = o++; s[g] = '[0-9A-Za-z-]+'; const y = o++; s[y] = `(?:\\+(${s[g]}(?:\\.${s[g]})*))`; const b = o++; const k = `v?${s[c]}${s[f]}?${s[y]}?`; s[b] = `^${k}$`; const w = `[v=\\s]*${s[m]}${s[v]}?${s[y]}?`; const _ = o++; s[_] = `^${w}$`; const S = o++; s[S] = '((?:<|>)?=?)'; const P = o++; s[P] = `${s[u]}|x|X|\\*`; const A = o++; s[A] = `${s[l]}|x|X|\\*`; const E = o++; s[E] = `[v=\\s]*(${s[A]})(?:\\.(${s[A]})(?:\\.(${s[A]})(?:${s[f]})?${s[y]}?)?)?`; const x = o++; s[x] = `[v=\\s]*(${s[P]})(?:\\.(${s[P]})(?:\\.(${s[P]})(?:${s[v]})?${s[y]}?)?)?`; const C = o++; s[C] = `^${s[S]}\\s*${s[E]}$`; const O = o++; s[O] = `^${s[S]}\\s*${s[x]}$`; const j = o++; s[j] = '(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])'; const L = o++; s[L] = '(?:~>?)'; const $ = o++; s[$] = `(\\s*)${s[L]}\\s+`, i[$] = new RegExp(s[$], 'g'); const T = o++; s[T] = `^${s[L]}${s[E]}$`; const D = o++; s[D] = `^${s[L]}${s[x]}$`; const R = o++; s[R] = '(?:\\^)'; const z = o++; s[z] = `(\\s*)${s[R]}\\s+`, i[z] = new RegExp(s[z], 'g'); const I = o++; s[I] = `^${s[R]}${s[E]}$`; const V = o++; s[V] = `^${s[R]}${s[x]}$`; const F = o++; s[F] = `^${s[S]}\\s*(${w})$|^$`; const B = o++; s[B] = `^${s[S]}\\s*(${k})$|^$`; const U = o++; s[U] = `(\\s*)${s[S]}\\s*(${w}|${s[E]})`, i[U] = new RegExp(s[U], 'g'); const M = o++; s[M] = `^\\s*(${s[E]})\\s+-\\s+(${s[E]})\\s*$`; const N = o++; s[N] = `^\\s*(${s[x]})\\s+-\\s+(${s[x]})\\s*$`; const q = o++; s[q] = '(<|>)?=?\\s*\\*'; for (let H = 0; H < 35; H++)a(H, s[H]), i[H] || (i[H] = new RegExp(s[H])); function G(e, t) {
        if (t && typeof t === 'object' || (t = { loose: !!t, includePrerelease: !1 }), e instanceof J) return e; if (typeof e !== 'string') return null; if (e.length > 256) return null; if (!(t.loose ? i[_] : i[b]).test(e)) return null; try {
          return new J(e, t);
        } catch (e) {
          return null;
        }
      } function J(e, t) {
        if (t && typeof t === 'object' || (t = { loose: !!t, includePrerelease: !1 }), e instanceof J) {
          if (e.loose === t.loose) return e; e = e.version;
        } else if (typeof e !== 'string') throw new TypeError(`Invalid Version: ${e}`); if (e.length > 256) throw new TypeError('version is longer than 256 characters'); if (!(this instanceof J)) return new J(e, t); a('SemVer', e, t), this.options = t, this.loose = !!t.loose; const r = e.trim().match(t.loose ? i[_] : i[b]); if (!r) throw new TypeError(`Invalid Version: ${e}`); if (this.raw = e, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > n || this.major < 0) throw new TypeError('Invalid major version'); if (this.minor > n || this.minor < 0) throw new TypeError('Invalid minor version'); if (this.patch > n || this.patch < 0) throw new TypeError('Invalid patch version'); r[4] ? this.prerelease = r[4].split('.').map((e => {
          if (/^[0-9]+$/.test(e)) {
            const t = +e; if (t >= 0 && t < n) return t;
          } return e;
        })) : this.prerelease = [], this.build = r[5] ? r[5].split('.') : [], this.format();
      }t.parse = G, t.valid = function(e, t) {
        const r = G(e, t); return r ? r.version : null;
      }, t.clean = function(e, t) {
        const r = G(e.trim().replace(/^[=v]+/, ''), t); return r ? r.version : null;
      }, t.SemVer = J, J.prototype.format = function() {
        return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join('.')}`), this.version;
      }, J.prototype.toString = function() {
        return this.version;
      }, J.prototype.compare = function(e) {
        return a('SemVer.compare', this.version, this.options, e), e instanceof J || (e = new J(e, this.options)), this.compareMain(e) || this.comparePre(e);
      }, J.prototype.compareMain = function(e) {
        return e instanceof J || (e = new J(e, this.options)), W(this.major, e.major) || W(this.minor, e.minor) || W(this.patch, e.patch);
      }, J.prototype.comparePre = function(e) {
        if (e instanceof J || (e = new J(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1; if (!this.prerelease.length && e.prerelease.length) return 1; if (!this.prerelease.length && !e.prerelease.length) return 0; let t = 0; do {
          const r = this.prerelease[t]; const n = e.prerelease[t]; if (a('prerelease compare', t, r, n), void 0 === r && void 0 === n) return 0; if (void 0 === n) return 1; if (void 0 === r) return -1; if (r !== n) return W(r, n);
        } while (++t);
      }, J.prototype.inc = function(e, t) {
        switch (e) {
          case 'premajor': this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc('pre', t); break; case 'preminor': this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc('pre', t); break; case 'prepatch': this.prerelease.length = 0, this.inc('patch', t), this.inc('pre', t); break; case 'prerelease': this.prerelease.length === 0 && this.inc('patch', t), this.inc('pre', t); break; case 'major': this.minor === 0 && this.patch === 0 && this.prerelease.length !== 0 || this.major++, this.minor = 0, this.patch = 0, this.prerelease = []; break; case 'minor': this.patch === 0 && this.prerelease.length !== 0 || this.minor++, this.patch = 0, this.prerelease = []; break; case 'patch': this.prerelease.length === 0 && this.patch++, this.prerelease = []; break; case 'pre': if (this.prerelease.length === 0) this.prerelease = [0]; else {
            for (var r = this.prerelease.length; --r >= 0;) typeof this.prerelease[r] === 'number' && (this.prerelease[r]++, r = -2); r === -1 && this.prerelease.push(0);
          }t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t, 0]); break; default: throw new Error(`invalid increment argument: ${e}`);
        } return this.format(), this.raw = this.version, this;
      }, t.inc = function(e, t, r, a) {
        typeof r === 'string' && (a = r, r = void 0); try {
          return new J(e, r).inc(t, a).version;
        } catch (e) {
          return null;
        }
      }, t.diff = function(e, t) {
        if (X(e, t)) return null; const r = G(e); const a = G(t); let n = ''; if (r.prerelease.length || a.prerelease.length) {
          n = 'pre'; var i = 'prerelease';
        } for (const s in r) if ((s === 'major' || s === 'minor' || s === 'patch') && r[s] !== a[s]) return n + s; return i;
      }, t.compareIdentifiers = W; const K = /^[0-9]+$/; function W(e, t) {
        const r = K.test(e); const a = K.test(t); return r && a && (e = +e, t = +t), e === t ? 0 : r && !a ? -1 : a && !r ? 1 : e < t ? -1 : 1;
      } function Q(e, t, r) {
        return new J(e, r).compare(new J(t, r));
      } function Z(e, t, r) {
        return Q(e, t, r) > 0;
      } function Y(e, t, r) {
        return Q(e, t, r) < 0;
      } function X(e, t, r) {
        return Q(e, t, r) === 0;
      } function ee(e, t, r) {
        return Q(e, t, r) !== 0;
      } function te(e, t, r) {
        return Q(e, t, r) >= 0;
      } function re(e, t, r) {
        return Q(e, t, r) <= 0;
      } function ae(e, t, r, a) {
        switch (t) {
          case '===': return typeof e === 'object' && (e = e.version), typeof r === 'object' && (r = r.version), e === r; case '!==': return typeof e === 'object' && (e = e.version), typeof r === 'object' && (r = r.version), e !== r; case '': case '=': case '==': return X(e, r, a); case '!=': return ee(e, r, a); case '>': return Z(e, r, a); case '>=': return te(e, r, a); case '<': return Y(e, r, a); case '<=': return re(e, r, a); default: throw new TypeError(`Invalid operator: ${t}`);
        }
      } function ne(e, t) {
        if (t && typeof t === 'object' || (t = { loose: !!t, includePrerelease: !1 }), e instanceof ne) {
          if (e.loose === !!t.loose) return e; e = e.value;
        } if (!(this instanceof ne)) return new ne(e, t); a('comparator', e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ? this.value = '' : this.value = this.operator + this.semver.version, a('comp', this);
      }t.rcompareIdentifiers = function(e, t) {
        return W(t, e);
      }, t.major = function(e, t) {
        return new J(e, t).major;
      }, t.minor = function(e, t) {
        return new J(e, t).minor;
      }, t.patch = function(e, t) {
        return new J(e, t).patch;
      }, t.compare = Q, t.compareLoose = function(e, t) {
        return Q(e, t, !0);
      }, t.rcompare = function(e, t, r) {
        return Q(t, e, r);
      }, t.sort = function(e, r) {
        return e.sort(((e, a) => {
          return t.compare(e, a, r);
        }));
      }, t.rsort = function(e, r) {
        return e.sort(((e, a) => {
          return t.rcompare(e, a, r);
        }));
      }, t.gt = Z, t.lt = Y, t.eq = X, t.neq = ee, t.gte = te, t.lte = re, t.cmp = ae, t.Comparator = ne; var ie = {}; function se(e, t) {
        if (t && typeof t === 'object' || (t = { loose: !!t, includePrerelease: !1 }), e instanceof se) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new se(e.raw, t); if (e instanceof ne) return new se(e.value, t); if (!(this instanceof se)) return new se(e, t); if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set = e.split(/\s*\|\|\s*/).map((function(e) {
          return this.parseRange(e.trim());
        }), this).filter((e => {
          return e.length;
        })), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${e}`); this.format();
      } function oe(e) {
        return !e || e.toLowerCase() === 'x' || e === '*';
      } function le(e, t, r, a, n, i, s, o, l, u, d, c, m) {
        return (`${t = oe(r) ? '' : oe(a) ? `>=${r}.0.0` : oe(n) ? `>=${r}.${a}.0` : `>=${t}`} ${o = oe(l) ? '' : oe(u) ? `<${+l + 1}.0.0` : oe(d) ? `<${l}.${+u + 1}.0` : c ? `<=${l}.${u}.${d}-${c}` : `<=${o}`}`).trim();
      } function ue(e, t, r) {
        for (var n = 0; n < e.length; n++) if (!e[n].test(t)) return !1; if (t.prerelease.length && !r.includePrerelease) {
          for (n = 0; n < e.length; n++) {
            if (a(e[n].semver), e[n].semver !== ie && e[n].semver.prerelease.length > 0) {
              const i = e[n].semver; if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
            }
          } return !1;
        } return !0;
      } function de(e, t, r) {
        try {
          t = new se(t, r);
        } catch (e) {
          return !1;
        } return t.test(e);
      } function ce(e, t, r, a) {
        let n; let i; let s; let o; let l; switch (e = new J(e, a), t = new se(t, a), r) {
          case '>': n = Z, i = re, s = Y, o = '>', l = '>='; break; case '<': n = Y, i = te, s = Z, o = '<', l = '<='; break; default: throw new TypeError('Must provide a hilo val of "<" or ">"');
        } if (de(e, t, a)) return !1; for (let u = 0; u < t.set.length; ++u) {
          const d = t.set[u]; var c = null; var m = null; if (d.forEach((e => {
            e.semver === ie && (e = new ne('>=0.0.0')), c = c || e, m = m || e, n(e.semver, c.semver, a) ? c = e : s(e.semver, m.semver, a) && (m = e);
          })), c.operator === o || c.operator === l) return !1; if ((!m.operator || m.operator === o) && i(e, m.semver)) return !1; if (m.operator === l && s(e, m.semver)) return !1;
        } return !0;
      }ne.prototype.parse = function(e) {
        const t = this.options.loose ? i[F] : i[B]; const r = e.match(t); if (!r) throw new TypeError(`Invalid comparator: ${e}`); this.operator = r[1], this.operator === '=' && (this.operator = ''), r[2] ? this.semver = new J(r[2], this.options.loose) : this.semver = ie;
      }, ne.prototype.toString = function() {
        return this.value;
      }, ne.prototype.test = function(e) {
        return a('Comparator.test', e, this.options.loose), this.semver === ie || (typeof e === 'string' && (e = new J(e, this.options)), ae(e, this.operator, this.semver, this.options));
      }, ne.prototype.intersects = function(e, t) {
        if (!(e instanceof ne)) throw new TypeError('a Comparator is required'); let r; if (t && typeof t === 'object' || (t = { loose: !!t, includePrerelease: !1 }), this.operator === '') return r = new se(e.value, t), de(this.value, r, t); if (e.operator === '') return r = new se(this.value, t), de(e.semver, r, t); const a = !(this.operator !== '>=' && this.operator !== '>' || e.operator !== '>=' && e.operator !== '>'); const n = !(this.operator !== '<=' && this.operator !== '<' || e.operator !== '<=' && e.operator !== '<'); const i = this.semver.version === e.semver.version; const s = !(this.operator !== '>=' && this.operator !== '<=' || e.operator !== '>=' && e.operator !== '<='); const o = ae(this.semver, '<', e.semver, t) && (this.operator === '>=' || this.operator === '>') && (e.operator === '<=' || e.operator === '<'); const l = ae(this.semver, '>', e.semver, t) && (this.operator === '<=' || this.operator === '<') && (e.operator === '>=' || e.operator === '>'); return a || n || i && s || o || l;
      }, t.Range = se, se.prototype.format = function() {
        return this.range = this.set.map((e => {
          return e.join(' ').trim();
        })).join('||').trim(), this.range;
      }, se.prototype.toString = function() {
        return this.range;
      }, se.prototype.parseRange = function(e) {
        const t = this.options.loose; e = e.trim(); const r = t ? i[N] : i[M]; e = e.replace(r, le), a('hyphen replace', e), e = e.replace(i[U], '$1$2$3'), a('comparator trim', e, i[U]), e = (e = (e = e.replace(i[$], '$1~')).replace(i[z], '$1^')).split(/\s+/).join(' '); const n = t ? i[F] : i[B]; let s = e.split(' ').map((function(e) {
          return (function(e, t) {
            return a('comp', e, t), e = (function(e, t) {
              return e.trim().split(/\s+/).map((e => {
                return (function(e, t) {
                  a('caret', e, t); const r = t.loose ? i[V] : i[I]; return e.replace(r, ((t, r, n, i, s) => {
                    let o; return a('caret', e, t, r, n, i, s), oe(r) ? o = '' : oe(n) ? o = `>=${r}.0.0 <${+r + 1}.0.0` : oe(i) ? o = r === '0' ? `>=${r}.${n}.0 <${r}.${+n + 1}.0` : `>=${r}.${n}.0 <${+r + 1}.0.0` : s ? (a('replaceCaret pr', s), o = r === '0' ? n === '0' ? `>=${r}.${n}.${i}-${s} <${r}.${n}.${+i + 1}` : `>=${r}.${n}.${i}-${s} <${r}.${+n + 1}.0` : `>=${r}.${n}.${i}-${s} <${+r + 1}.0.0`) : (a('no pr'), o = r === '0' ? n === '0' ? `>=${r}.${n}.${i} <${r}.${n}.${+i + 1}` : `>=${r}.${n}.${i} <${r}.${+n + 1}.0` : `>=${r}.${n}.${i} <${+r + 1}.0.0`), a('caret return', o), o;
                  }));
                }(e, t));
              })).join(' ');
            }(e, t)), a('caret', e), e = (function(e, t) {
              return e.trim().split(/\s+/).map((e => {
                return (function(e, t) {
                  const r = t.loose ? i[D] : i[T]; return e.replace(r, ((t, r, n, i, s) => {
                    let o; return a('tilde', e, t, r, n, i, s), oe(r) ? o = '' : oe(n) ? o = `>=${r}.0.0 <${+r + 1}.0.0` : oe(i) ? o = `>=${r}.${n}.0 <${r}.${+n + 1}.0` : s ? (a('replaceTilde pr', s), o = `>=${r}.${n}.${i}-${s} <${r}.${+n + 1}.0`) : o = `>=${r}.${n}.${i} <${r}.${+n + 1}.0`, a('tilde return', o), o;
                  }));
                }(e, t));
              })).join(' ');
            }(e, t)), a('tildes', e), e = (function(e, t) {
              return a('replaceXRanges', e, t), e.split(/\s+/).map((e => {
                return (function(e, t) {
                  e = e.trim(); const r = t.loose ? i[O] : i[C]; return e.replace(r, ((t, r, n, i, s, o) => {
                    a('xRange', e, t, r, n, i, s, o); const l = oe(n); const u = l || oe(i); const d = u || oe(s); return r === '=' && d && (r = ''), l ? t = r === '>' || r === '<' ? '<0.0.0' : '*' : r && d ? (u && (i = 0), s = 0, r === '>' ? (r = '>=', u ? (n = +n + 1, i = 0, s = 0) : (i = +i + 1, s = 0)) : r === '<=' && (r = '<', u ? n = +n + 1 : i = +i + 1), t = `${r + n}.${i}.${s}`) : u ? t = `>=${n}.0.0 <${+n + 1}.0.0` : d && (t = `>=${n}.${i}.0 <${n}.${+i + 1}.0`), a('xRange return', t), t;
                  }));
                }(e, t));
              })).join(' ');
            }(e, t)), a('xrange', e), e = (function(e, t) {
              return a('replaceStars', e, t), e.trim().replace(i[q], '');
            }(e, t)), a('stars', e), e;
          }(e, this.options));
        }), this).join(' ').split(/\s+/); return this.options.loose && (s = s.filter((e => {
          return !!e.match(n);
        }))), s = s.map((function(e) {
          return new ne(e, this.options);
        }), this);
      }, se.prototype.intersects = function(e, t) {
        if (!(e instanceof se)) throw new TypeError('a Range is required'); return this.set.some((r => {
          return r.every((r => {
            return e.set.some((e => {
              return e.every((e => {
                return r.intersects(e, t);
              }));
            }));
          }));
        }));
      }, t.toComparators = function(e, t) {
        return new se(e, t).set.map((e => {
          return e.map((e => {
            return e.value;
          })).join(' ').trim().split(' ');
        }));
      }, se.prototype.test = function(e) {
        if (!e) return !1; typeof e === 'string' && (e = new J(e, this.options)); for (let t = 0; t < this.set.length; t++) if (ue(this.set[t], e, this.options)) return !0; return !1;
      }, t.satisfies = de, t.maxSatisfying = function(e, t, r) {
        let a = null; let n = null; try {
          var i = new se(t, r);
        } catch (e) {
          return null;
        } return e.forEach((e => {
          i.test(e) && (a && n.compare(e) !== -1 || (n = new J(a = e, r)));
        })), a;
      }, t.minSatisfying = function(e, t, r) {
        let a = null; let n = null; try {
          var i = new se(t, r);
        } catch (e) {
          return null;
        } return e.forEach((e => {
          i.test(e) && (a && n.compare(e) !== 1 || (n = new J(a = e, r)));
        })), a;
      }, t.minVersion = function(e, t) {
        e = new se(e, t); let r = new J('0.0.0'); if (e.test(r)) return r; if (r = new J('0.0.0-0'), e.test(r)) return r; r = null; for (let a = 0; a < e.set.length; ++a) {
          e.set[a].forEach((e => {
            const t = new J(e.semver.version); switch (e.operator) {
              case '>': t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format(); case '': case '>=': r && !Z(r, t) || (r = t); break; case '<': case '<=': break; default: throw new Error(`Unexpected operation: ${e.operator}`);
            }
          }));
        } if (r && e.test(r)) return r; return null;
      }, t.validRange = function(e, t) {
        try {
          return new se(e, t).range || '*';
        } catch (e) {
          return null;
        }
      }, t.ltr = function(e, t, r) {
        return ce(e, t, '<', r);
      }, t.gtr = function(e, t, r) {
        return ce(e, t, '>', r);
      }, t.outside = ce, t.prerelease = function(e, t) {
        const r = G(e, t); return r && r.prerelease.length ? r.prerelease : null;
      }, t.intersects = function(e, t, r) {
        return e = new se(e, r), t = new se(t, r), e.intersects(t);
      }, t.coerce = function(e) {
        if (e instanceof J) return e; if (typeof e !== 'string') return null; const t = e.match(i[j]); if (t == null) return null; return G(`${t[1]}.${t[2] || '0'}.${t[3] || '0'}`);
      };
    }).call(this, r(17));
  }, function(e, t, r) {
    let a; !(function(n) {
      const i = /^\s+/; const s = /\s+$/; let o = 0; const l = n.round; const u = n.min; const d = n.max; const c = n.random; function m(e, t) {
        if (t = t || {}, (e = e || '') instanceof m) return e; if (!(this instanceof m)) return new m(e, t); const r = (function(e) {
          let t = { r: 0, g: 0, b: 0 }; let r = 1; let a = null; let o = null; let l = null; let c = !1; let m = !1; typeof e === 'string' && (e = (function(e) {
            e = e.replace(i, '').replace(s, '').toLowerCase(); let t; let r = !1; if (j[e])e = j[e], r = !0; else if (e == 'transparent') {
return {
              r: 0, g: 0, b: 0, a: 0, format: 'name', 
            };
} if (t = N.rgb.exec(e)) return { r: t[1], g: t[2], b: t[3] }; if (t = N.rgba.exec(e)) {
return {
              r: t[1], g: t[2], b: t[3], a: t[4], 
            };
} if (t = N.hsl.exec(e)) return { h: t[1], s: t[2], l: t[3] }; if (t = N.hsla.exec(e)) {
return {
              h: t[1], s: t[2], l: t[3], a: t[4], 
            };
} if (t = N.hsv.exec(e)) return { h: t[1], s: t[2], v: t[3] }; if (t = N.hsva.exec(e)) {
return {
              h: t[1], s: t[2], v: t[3], a: t[4], 
            };
} if (t = N.hex8.exec(e)) {
return {
              r: R(t[1]), g: R(t[2]), b: R(t[3]), a: F(t[4]), format: r ? 'name' : 'hex8', 
            };
} if (t = N.hex6.exec(e)) {
return {
              r: R(t[1]), g: R(t[2]), b: R(t[3]), format: r ? 'name' : 'hex', 
            };
} if (t = N.hex4.exec(e)) {
return {
              r: R(`${t[1]}${t[1]}`), g: R(`${t[2]}${t[2]}`), b: R(`${t[3]}${t[3]}`), a: F(`${t[4]}${t[4]}`), format: r ? 'name' : 'hex8', 
            };
} if (t = N.hex3.exec(e)) {
return {
              r: R(`${t[1]}${t[1]}`), g: R(`${t[2]}${t[2]}`), b: R(`${t[3]}${t[3]}`), format: r ? 'name' : 'hex', 
            };
} return !1;
          }(e))); typeof e === 'object' && (q(e.r) && q(e.g) && q(e.b) ? (p = e.r, h = e.g, f = e.b, t = { r: 255 * T(p, 255), g: 255 * T(h, 255), b: 255 * T(f, 255) }, c = !0, m = String(e.r).substr(-1) === '%' ? 'prgb' : 'rgb') : q(e.h) && q(e.s) && q(e.v) ? (a = I(e.s), o = I(e.v), t = (function(e, t, r) {
            e = 6 * T(e, 360), t = T(t, 100), r = T(r, 100); const a = n.floor(e); const i = e - a; const s = r * (1 - t); const o = r * (1 - i * t); const l = r * (1 - (1 - i) * t); const u = a % 6; return { r: 255 * [r, o, s, s, l, r][u], g: 255 * [l, r, r, o, s, s][u], b: 255 * [s, s, l, r, r, o][u] };
          }(e.h, a, o)), c = !0, m = 'hsv') : q(e.h) && q(e.s) && q(e.l) && (a = I(e.s), l = I(e.l), t = (function(e, t, r) {
            let a; let n; let i; function s(e, t, r) {
              return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + 6 * (t - e) * r : r < 0.5 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e;
            } if (e = T(e, 360), t = T(t, 100), r = T(r, 100), t === 0)a = n = i = r; else {
              const o = r < 0.5 ? r * (1 + t) : r + t - r * t; const l = 2 * r - o; a = s(l, o, e + 1 / 3), n = s(l, o, e), i = s(l, o, e - 1 / 3);
            } return { r: 255 * a, g: 255 * n, b: 255 * i };
          }(e.h, a, l)), c = !0, m = 'hsl'), e.hasOwnProperty('a') && (r = e.a)); let p; let h; let f; return r = $(r), {
            ok: c, format: e.format || m, r: u(255, d(t.r, 0)), g: u(255, d(t.g, 0)), b: u(255, d(t.b, 0)), a: r,
          };
        }(e)); this._originalInput = e, this._r = r.r, this._g = r.g, this._b = r.b, this._a = r.a, this._roundA = l(100 * this._a) / 100, this._format = t.format || r.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = l(this._r)), this._g < 1 && (this._g = l(this._g)), this._b < 1 && (this._b = l(this._b)), this._ok = r.ok, this._tc_id = o++;
      } function p(e, t, r) {
        e = T(e, 255), t = T(t, 255), r = T(r, 255); let a; let n; const i = d(e, t, r); const s = u(e, t, r); const o = (i + s) / 2; if (i == s)a = n = 0; else {
          const l = i - s; switch (n = o > 0.5 ? l / (2 - i - s) : l / (i + s), i) {
            case e: a = (t - r) / l + (t < r ? 6 : 0); break; case t: a = (r - e) / l + 2; break; case r: a = (e - t) / l + 4;
          }a /= 6;
        } return { h: a, s: n, l: o };
      } function h(e, t, r) {
        e = T(e, 255), t = T(t, 255), r = T(r, 255); let a; let n; const i = d(e, t, r); const s = u(e, t, r); const o = i; const l = i - s; if (n = i === 0 ? 0 : l / i, i == s)a = 0; else {
          switch (i) {
            case e: a = (t - r) / l + (t < r ? 6 : 0); break; case t: a = (r - e) / l + 2; break; case r: a = (e - t) / l + 4;
          }a /= 6;
        } return { h: a, s: n, v: o };
      } function f(e, t, r, a) {
        const n = [z(l(e).toString(16)), z(l(t).toString(16)), z(l(r).toString(16))]; return a && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) : n.join('');
      } function v(e, t, r, a) {
        return [z(V(a)), z(l(e).toString(16)), z(l(t).toString(16)), z(l(r).toString(16))].join('');
      } function g(e, t) {
        t = t === 0 ? 0 : t || 10; const r = m(e).toHsl(); return r.s -= t / 100, r.s = D(r.s), m(r);
      } function y(e, t) {
        t = t === 0 ? 0 : t || 10; const r = m(e).toHsl(); return r.s += t / 100, r.s = D(r.s), m(r);
      } function b(e) {
        return m(e).desaturate(100);
      } function k(e, t) {
        t = t === 0 ? 0 : t || 10; const r = m(e).toHsl(); return r.l += t / 100, r.l = D(r.l), m(r);
      } function w(e, t) {
        t = t === 0 ? 0 : t || 10; const r = m(e).toRgb(); return r.r = d(0, u(255, r.r - l(-t / 100 * 255))), r.g = d(0, u(255, r.g - l(-t / 100 * 255))), r.b = d(0, u(255, r.b - l(-t / 100 * 255))), m(r);
      } function _(e, t) {
        t = t === 0 ? 0 : t || 10; const r = m(e).toHsl(); return r.l -= t / 100, r.l = D(r.l), m(r);
      } function S(e, t) {
        const r = m(e).toHsl(); const a = (r.h + t) % 360; return r.h = a < 0 ? 360 + a : a, m(r);
      } function P(e) {
        const t = m(e).toHsl(); return t.h = (t.h + 180) % 360, m(t);
      } function A(e) {
        const t = m(e).toHsl(); const r = t.h; return [m(e), m({ h: (r + 120) % 360, s: t.s, l: t.l }), m({ h: (r + 240) % 360, s: t.s, l: t.l })];
      } function E(e) {
        const t = m(e).toHsl(); const r = t.h; return [m(e), m({ h: (r + 90) % 360, s: t.s, l: t.l }), m({ h: (r + 180) % 360, s: t.s, l: t.l }), m({ h: (r + 270) % 360, s: t.s, l: t.l })];
      } function x(e) {
        const t = m(e).toHsl(); const r = t.h; return [m(e), m({ h: (r + 72) % 360, s: t.s, l: t.l }), m({ h: (r + 216) % 360, s: t.s, l: t.l })];
      } function C(e, t, r) {
        t = t || 6, r = r || 30; const a = m(e).toHsl(); const n = 360 / r; const i = [m(e)]; for (a.h = (a.h - (n * t >> 1) + 720) % 360; --t;)a.h = (a.h + n) % 360, i.push(m(a)); return i;
      } function O(e, t) {
        t = t || 6; for (var r = m(e).toHsv(), a = r.h, n = r.s, i = r.v, s = [], o = 1 / t; t--;)s.push(m({ h: a, s: n, v: i })), i = (i + o) % 1; return s;
      }m.prototype = {
        isDark() {
          return this.getBrightness() < 128;
        },
        isLight() {
          return !this.isDark();
        },
        isValid() {
          return this._ok;
        },
        getOriginalInput() {
          return this._originalInput;
        },
        getFormat() {
          return this._format;
        },
        getAlpha() {
          return this._a;
        },
        getBrightness() {
          const e = this.toRgb(); return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
        },
        getLuminance() {
          let e; let t; let r; const a = this.toRgb(); return e = a.r / 255, t = a.g / 255, r = a.b / 255, 0.2126 * (e <= 0.03928 ? e / 12.92 : n.pow((e + 0.055) / 1.055, 2.4)) + 0.7152 * (t <= 0.03928 ? t / 12.92 : n.pow((t + 0.055) / 1.055, 2.4)) + 0.0722 * (r <= 0.03928 ? r / 12.92 : n.pow((r + 0.055) / 1.055, 2.4));
        },
        setAlpha(e) {
          return this._a = $(e), this._roundA = l(100 * this._a) / 100, this;
        },
        toHsv() {
          const e = h(this._r, this._g, this._b); return {
            h: 360 * e.h, s: e.s, v: e.v, a: this._a,
          };
        },
        toHsvString() {
          const e = h(this._r, this._g, this._b); const t = l(360 * e.h); const r = l(100 * e.s); const a = l(100 * e.v); return this._a == 1 ? `hsv(${t}, ${r}%, ${a}%)` : `hsva(${t}, ${r}%, ${a}%, ${this._roundA})`;
        },
        toHsl() {
          const e = p(this._r, this._g, this._b); return {
            h: 360 * e.h, s: e.s, l: e.l, a: this._a,
          };
        },
        toHslString() {
          const e = p(this._r, this._g, this._b); const t = l(360 * e.h); const r = l(100 * e.s); const a = l(100 * e.l); return this._a == 1 ? `hsl(${t}, ${r}%, ${a}%)` : `hsla(${t}, ${r}%, ${a}%, ${this._roundA})`;
        },
        toHex(e) {
          return f(this._r, this._g, this._b, e);
        },
        toHexString(e) {
          return `#${this.toHex(e)}`;
        },
        toHex8(e) {
          return (function(e, t, r, a, n) {
            const i = [z(l(e).toString(16)), z(l(t).toString(16)), z(l(r).toString(16)), z(V(a))]; if (n && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1)) return i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0); return i.join('');
          }(this._r, this._g, this._b, this._a, e));
        },
        toHex8String(e) {
          return `#${this.toHex8(e)}`;
        },
        toRgb() {
          return {
            r: l(this._r), g: l(this._g), b: l(this._b), a: this._a,
          };
        },
        toRgbString() {
          return this._a == 1 ? `rgb(${l(this._r)}, ${l(this._g)}, ${l(this._b)})` : `rgba(${l(this._r)}, ${l(this._g)}, ${l(this._b)}, ${this._roundA})`;
        },
        toPercentageRgb() {
          return {
            r: `${l(100 * T(this._r, 255))}%`, g: `${l(100 * T(this._g, 255))}%`, b: `${l(100 * T(this._b, 255))}%`, a: this._a,
          };
        },
        toPercentageRgbString() {
          return this._a == 1 ? `rgb(${l(100 * T(this._r, 255))}%, ${l(100 * T(this._g, 255))}%, ${l(100 * T(this._b, 255))}%)` : `rgba(${l(100 * T(this._r, 255))}%, ${l(100 * T(this._g, 255))}%, ${l(100 * T(this._b, 255))}%, ${this._roundA})`;
        },
        toName() {
          return this._a === 0 ? 'transparent' : !(this._a < 1) && (L[f(this._r, this._g, this._b, !0)] || !1);
        },
        toFilter(e) {
          const t = `#${v(this._r, this._g, this._b, this._a)}`; let r = t; const a = this._gradientType ? 'GradientType = 1, ' : ''; if (e) {
            const n = m(e); r = `#${v(n._r, n._g, n._b, n._a)}`;
          } return `progid:DXImageTransform.Microsoft.gradient(${a}startColorstr=${t},endColorstr=${r})`;
        },
        toString(e) {
          const t = !!e; e = e || this._format; let r = !1; const a = this._a < 1 && this._a >= 0; return t || !a || e !== 'hex' && e !== 'hex6' && e !== 'hex3' && e !== 'hex4' && e !== 'hex8' && e !== 'name' ? (e === 'rgb' && (r = this.toRgbString()), e === 'prgb' && (r = this.toPercentageRgbString()), e !== 'hex' && e !== 'hex6' || (r = this.toHexString()), e === 'hex3' && (r = this.toHexString(!0)), e === 'hex4' && (r = this.toHex8String(!0)), e === 'hex8' && (r = this.toHex8String()), e === 'name' && (r = this.toName()), e === 'hsl' && (r = this.toHslString()), e === 'hsv' && (r = this.toHsvString()), r || this.toHexString()) : e === 'name' && this._a === 0 ? this.toName() : this.toRgbString();
        },
        clone() {
          return m(this.toString());
        },
        _applyModification(e, t) {
          const r = e.apply(null, [this].concat([].slice.call(t))); return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this;
        },
        lighten() {
          return this._applyModification(k, arguments);
        },
        brighten() {
          return this._applyModification(w, arguments);
        },
        darken() {
          return this._applyModification(_, arguments);
        },
        desaturate() {
          return this._applyModification(g, arguments);
        },
        saturate() {
          return this._applyModification(y, arguments);
        },
        greyscale() {
          return this._applyModification(b, arguments);
        },
        spin() {
          return this._applyModification(S, arguments);
        },
        _applyCombination(e, t) {
          return e.apply(null, [this].concat([].slice.call(t)));
        },
        analogous() {
          return this._applyCombination(C, arguments);
        },
        complement() {
          return this._applyCombination(P, arguments);
        },
        monochromatic() {
          return this._applyCombination(O, arguments);
        },
        splitcomplement() {
          return this._applyCombination(x, arguments);
        },
        triad() {
          return this._applyCombination(A, arguments);
        },
        tetrad() {
          return this._applyCombination(E, arguments);
        },
      }, m.fromRatio = function(e, t) {
        if (typeof e === 'object') {
          const r = {}; for (const a in e)e.hasOwnProperty(a) && (r[a] = a === 'a' ? e[a] : I(e[a])); e = r;
        } return m(e, t);
      }, m.equals = function(e, t) {
        return !(!e || !t) && m(e).toRgbString() == m(t).toRgbString();
      }, m.random = function() {
        return m.fromRatio({ r: c(), g: c(), b: c() });
      }, m.mix = function(e, t, r) {
        r = r === 0 ? 0 : r || 50; const a = m(e).toRgb(); const n = m(t).toRgb(); const i = r / 100; return m({
          r: (n.r - a.r) * i + a.r, g: (n.g - a.g) * i + a.g, b: (n.b - a.b) * i + a.b, a: (n.a - a.a) * i + a.a,
        });
      }, m.readability = function(e, t) {
        const r = m(e); const a = m(t); return (n.max(r.getLuminance(), a.getLuminance()) + 0.05) / (n.min(r.getLuminance(), a.getLuminance()) + 0.05);
      }, m.isReadable = function(e, t, r) {
        let a; let n; const i = m.readability(e, t); switch (n = !1, (a = (function(e) {
          let t; let r; t = ((e = e || { level: 'AA', size: 'small' }).level || 'AA').toUpperCase(), r = (e.size || 'small').toLowerCase(), t !== 'AA' && t !== 'AAA' && (t = 'AA'); r !== 'small' && r !== 'large' && (r = 'small'); return { level: t, size: r };
        }(r))).level + a.size) {
          case 'AAsmall': case 'AAAlarge': n = i >= 4.5; break; case 'AAlarge': n = i >= 3; break; case 'AAAsmall': n = i >= 7;
        } return n;
      }, m.mostReadable = function(e, t, r) {
        let a; let n; let i; let s; let o = null; let l = 0; n = (r = r || {}).includeFallbackColors, i = r.level, s = r.size; for (let u = 0; u < t.length; u++)(a = m.readability(e, t[u])) > l && (l = a, o = m(t[u])); return m.isReadable(e, o, { level: i, size: s }) || !n ? o : (r.includeFallbackColors = !1, m.mostReadable(e, ['#fff', '#000'], r));
      }; var j = m.names = {
        aliceblue: 'f0f8ff', antiquewhite: 'faebd7', aqua: '0ff', aquamarine: '7fffd4', azure: 'f0ffff', beige: 'f5f5dc', bisque: 'ffe4c4', black: '000', blanchedalmond: 'ffebcd', blue: '00f', blueviolet: '8a2be2', brown: 'a52a2a', burlywood: 'deb887', burntsienna: 'ea7e5d', cadetblue: '5f9ea0', chartreuse: '7fff00', chocolate: 'd2691e', coral: 'ff7f50', cornflowerblue: '6495ed', cornsilk: 'fff8dc', crimson: 'dc143c', cyan: '0ff', darkblue: '00008b', darkcyan: '008b8b', darkgoldenrod: 'b8860b', darkgray: 'a9a9a9', darkgreen: '006400', darkgrey: 'a9a9a9', darkkhaki: 'bdb76b', darkmagenta: '8b008b', darkolivegreen: '556b2f', darkorange: 'ff8c00', darkorchid: '9932cc', darkred: '8b0000', darksalmon: 'e9967a', darkseagreen: '8fbc8f', darkslateblue: '483d8b', darkslategray: '2f4f4f', darkslategrey: '2f4f4f', darkturquoise: '00ced1', darkviolet: '9400d3', deeppink: 'ff1493', deepskyblue: '00bfff', dimgray: '696969', dimgrey: '696969', dodgerblue: '1e90ff', firebrick: 'b22222', floralwhite: 'fffaf0', forestgreen: '228b22', fuchsia: 'f0f', gainsboro: 'dcdcdc', ghostwhite: 'f8f8ff', gold: 'ffd700', goldenrod: 'daa520', gray: '808080', green: '008000', greenyellow: 'adff2f', grey: '808080', honeydew: 'f0fff0', hotpink: 'ff69b4', indianred: 'cd5c5c', indigo: '4b0082', ivory: 'fffff0', khaki: 'f0e68c', lavender: 'e6e6fa', lavenderblush: 'fff0f5', lawngreen: '7cfc00', lemonchiffon: 'fffacd', lightblue: 'add8e6', lightcoral: 'f08080', lightcyan: 'e0ffff', lightgoldenrodyellow: 'fafad2', lightgray: 'd3d3d3', lightgreen: '90ee90', lightgrey: 'd3d3d3', lightpink: 'ffb6c1', lightsalmon: 'ffa07a', lightseagreen: '20b2aa', lightskyblue: '87cefa', lightslategray: '789', lightslategrey: '789', lightsteelblue: 'b0c4de', lightyellow: 'ffffe0', lime: '0f0', limegreen: '32cd32', linen: 'faf0e6', magenta: 'f0f', maroon: '800000', mediumaquamarine: '66cdaa', mediumblue: '0000cd', mediumorchid: 'ba55d3', mediumpurple: '9370db', mediumseagreen: '3cb371', mediumslateblue: '7b68ee', mediumspringgreen: '00fa9a', mediumturquoise: '48d1cc', mediumvioletred: 'c71585', midnightblue: '191970', mintcream: 'f5fffa', mistyrose: 'ffe4e1', moccasin: 'ffe4b5', navajowhite: 'ffdead', navy: '000080', oldlace: 'fdf5e6', olive: '808000', olivedrab: '6b8e23', orange: 'ffa500', orangered: 'ff4500', orchid: 'da70d6', palegoldenrod: 'eee8aa', palegreen: '98fb98', paleturquoise: 'afeeee', palevioletred: 'db7093', papayawhip: 'ffefd5', peachpuff: 'ffdab9', peru: 'cd853f', pink: 'ffc0cb', plum: 'dda0dd', powderblue: 'b0e0e6', purple: '800080', rebeccapurple: '663399', red: 'f00', rosybrown: 'bc8f8f', royalblue: '4169e1', saddlebrown: '8b4513', salmon: 'fa8072', sandybrown: 'f4a460', seagreen: '2e8b57', seashell: 'fff5ee', sienna: 'a0522d', silver: 'c0c0c0', skyblue: '87ceeb', slateblue: '6a5acd', slategray: '708090', slategrey: '708090', snow: 'fffafa', springgreen: '00ff7f', steelblue: '4682b4', tan: 'd2b48c', teal: '008080', thistle: 'd8bfd8', tomato: 'ff6347', turquoise: '40e0d0', violet: 'ee82ee', wheat: 'f5deb3', white: 'fff', whitesmoke: 'f5f5f5', yellow: 'ff0', yellowgreen: '9acd32',
      }; var L = m.hexNames = (function(e) {
        const t = {}; for (const r in e)e.hasOwnProperty(r) && (t[e[r]] = r); return t;
      }(j)); function $(e) {
        return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
      } function T(e, t) {
        (function(e) {
          return typeof e === 'string' && e.indexOf('.') != -1 && parseFloat(e) === 1;
        }(e)) && (e = '100%'); const r = (function(e) {
          return typeof e === 'string' && e.indexOf('%') != -1;
        }(e)); return e = u(t, d(0, parseFloat(e))), r && (e = parseInt(e * t, 10) / 100), n.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t);
      } function D(e) {
        return u(1, d(0, e));
      } function R(e) {
        return parseInt(e, 16);
      } function z(e) {
        return e.length == 1 ? `0${e}` : `${e}`;
      } function I(e) {
        return e <= 1 && (e = `${100 * e}%`), e;
      } function V(e) {
        return n.round(255 * parseFloat(e)).toString(16);
      } function F(e) {
        return R(e) / 255;
      } let B; let U; let M; var N = (U = `[\\s|\\(]+(${B = '(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)'})[,|\\s]+(${B})[,|\\s]+(${B})\\s*\\)?`, M = `[\\s|\\(]+(${B})[,|\\s]+(${B})[,|\\s]+(${B})[,|\\s]+(${B})\\s*\\)?`, {
        CSS_UNIT: new RegExp(B), rgb: new RegExp(`rgb${U}`), rgba: new RegExp(`rgba${M}`), hsl: new RegExp(`hsl${U}`), hsla: new RegExp(`hsla${M}`), hsv: new RegExp(`hsv${U}`), hsva: new RegExp(`hsva${M}`), hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      }); function q(e) {
        return !!N.CSS_UNIT.exec(e);
      }e.exports ? e.exports = m : void 0 === (a = function() {
        return m;
      }.call(t, r, t, e)) || (e.exports = a);
    }(Math));
  }, function(e) {
    e.exports = JSON.parse('{"title":"Capability","type":"object","definitions":{"i18nObject":{"oneOf":[{"type":"string","minLength":1},{"type":"object","required":["en"],"patternProperties":{"^.*$":{"type":"string"}},"additionalProperties":false}]}},"required":["title","type"],"anyOf":[{"required":["getable"]},{"required":["setable"]}],"properties":{"title":{"$ref":"#/definitions/i18nObject"},"desc":{"$ref":"#/definitions/i18nObject"},"type":{"type":"string","enum":["boolean","number","string","enum"]},"getable":{"type":"boolean","default":true},"setable":{"type":"boolean","default":true},"icon":{"type":"string"},"insights":{"type":"boolean"},"insightsTitleTrue":{"$ref":"#/definitions/i18nObject"},"insightsTitleFalse":{"$ref":"#/definitions/i18nObject"},"chartType":{"type":"string","enum":["line","area","stepLine","column","spline","splineArea","scatter"]},"decimals":{"type":"number"},"min":{"type":"number"},"max":{"type":"number"},"step":{"type":"number","minimum":0},"units":{"$ref":"#/definitions/i18nObject"},"values":{"type":"array","items":{"type":"object","required":["id","title"],"properties":{"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"}}}},"uiComponent":{"oneOf":[{"type":"string","enum":["thermostat","media","toggle","slider","ternary","button","color","picker","sensor","battery"]},{"type":"null"}]}},"_comment":"Require `values` array when `type` is `enum`","oneOf":[{"properties":{"type":{"type":"string","enum":["enum"]}},"required":["values"]},{"properties":{"type":{"type":"string","enum":["boolean","number","string"]}}}]}');
  }, function(e) {
    e.exports = JSON.parse('["onoff","dim","light_hue","light_saturation","light_temperature","light_mode","vacuumcleaner_state","thermostat_mode","target_temperature","measure_temperature","measure_co","measure_co2","measure_pm25","measure_humidity","measure_pressure","measure_noise","measure_rain","measure_wind_strength","measure_wind_angle","measure_gust_strength","measure_gust_angle","measure_battery","measure_power","measure_voltage","measure_current","measure_luminance","measure_ultraviolet","measure_water","alarm_generic","alarm_motion","alarm_contact","alarm_co","alarm_co2","alarm_pm25","alarm_tamper","alarm_smoke","alarm_fire","alarm_heat","alarm_water","alarm_battery","alarm_night","meter_power","meter_water","meter_gas","meter_rain","homealarm_state","volume_set","volume_up","volume_down","volume_mute","channel_up","channel_down","locked","lock_mode","garagedoor_closed","windowcoverings_state","windowcoverings_tilt_up","windowcoverings_tilt_down","windowcoverings_tilt_set","windowcoverings_closed","windowcoverings_set","button","speaker_playing","speaker_next","speaker_prev","speaker_shuffle","speaker_repeat","speaker_artist","speaker_album","speaker_track","speaker_duration","speaker_position"]');
  }, function(e, t, r) {
    const a = {
      './alarm_battery.json': 72, './alarm_co.json': 73, './alarm_co2.json': 74, './alarm_contact.json': 75, './alarm_fire.json': 76, './alarm_generic.json': 77, './alarm_heat.json': 78, './alarm_motion.json': 79, './alarm_night.json': 80, './alarm_pm25.json': 81, './alarm_smoke.json': 82, './alarm_tamper.json': 83, './alarm_water.json': 84, './button.json': 85, './channel_down.json': 86, './channel_up.json': 87, './dim.json': 88, './garagedoor_closed.json': 89, './homealarm_state.json': 90, './light_hue.json': 91, './light_mode.json': 92, './light_saturation.json': 93, './light_temperature.json': 94, './lock_mode.json': 95, './locked.json': 96, './measure_battery.json': 97, './measure_co.json': 98, './measure_co2.json': 99, './measure_current.json': 100, './measure_gust_angle.json': 101, './measure_gust_strength.json': 102, './measure_humidity.json': 103, './measure_luminance.json': 104, './measure_noise.json': 105, './measure_pm25.json': 106, './measure_power.json': 107, './measure_pressure.json': 108, './measure_rain.json': 109, './measure_temperature.json': 110, './measure_ultraviolet.json': 111, './measure_voltage.json': 112, './measure_water.json': 113, './measure_wind_angle.json': 114, './measure_wind_strength.json': 115, './meter_gas.json': 116, './meter_power.json': 117, './meter_rain.json': 118, './meter_water.json': 119, './onoff.json': 120, './speaker_album.json': 121, './speaker_artist.json': 122, './speaker_duration.json': 123, './speaker_next.json': 124, './speaker_playing.json': 125, './speaker_position.json': 126, './speaker_prev.json': 127, './speaker_repeat.json': 128, './speaker_shuffle.json': 129, './speaker_track.json': 130, './target_temperature.json': 131, './thermostat_mode.json': 132, './vacuumcleaner_state.json': 133, './volume_down.json': 134, './volume_mute.json': 135, './volume_set.json': 136, './volume_up.json': 137, './windowcoverings_closed.json': 138, './windowcoverings_set.json': 139, './windowcoverings_state.json': 140, './windowcoverings_tilt_down.json': 141, './windowcoverings_tilt_set.json': 142, './windowcoverings_tilt_up.json': 143,
    }; function n(e) {
      const t = i(e); return r(t);
    } function i(e) {
      if (!r.o(a, e)) {
        const t = new Error(`Cannot find module '${e}'`); throw t.code = 'MODULE_NOT_FOUND', t;
      } return a[e];
    }n.keys = function() {
      return Object.keys(a);
    }, n.resolve = i, e.exports = n, n.id = 71;
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Battery alarm","nl":"Batterij alarm","de":"Batterie-Alarm","fr":"Alarme batterie","it":"Allarme batteria","sv":"Batterialarm","no":"Batterialarm","es":"Alarma de batería","da":"Batterialarm"},"desc":{"en":"True when there is a battery warning","nl":"Geeft een batterijwaarschuwing","de":"True, wenn es eine Batterie-Warnung gibt","fr":"Vrai quand il y a un avertissement de batterie","it":"Vero quando c\'è un avvertimento sulla batteria","sv":"Sant när det finns en batterivarning","no":"Sant når det finnes en batteriadvarsel","es":"Verdadero cuando hay una advertencia de la batería","da":"Sandt, når der er en batterialarm"},"insights":true,"insightsTitleTrue":{"en":"Battery alarm turned on","nl":"Batterijalarm ging af","de":"Batterie-Alarm ist angegangen","fr":"Alarme batterie activée","it":"Allarme batteria attivato","sv":"Batterialarm aktiverat","no":"Batterialarm aktivert","es":"Alarma de la batería activada","da":"Batterialarm aktiveret"},"insightsTitleFalse":{"en":"Battery alarm turned off","nl":"Batterijalarm ging uit","de":"Batterie-Alarm ist ausgegangen","fr":"Alarme batterie désactivée","it":"Allarme batteria disattivato","sv":"Batterialarm avstängt","no":"Batterialarm deaktivert","es":"Alarma de la batería desactivada","da":"Batterialarm deaktiveret"},"getable":true,"setable":false,"uiComponent":"battery","$flow":{"triggers":[{"id":"alarm_battery_true","highlight":true,"title":{"en":"The battery alarm turned on","nl":"De batterijwaarschuwing gaat aan","de":"Der Batterie-Alarm ist angegangen","fr":"L\'alarme batterie s\'est activée","it":"L\'allarme della batteria è stato attivato","sv":"Batterialarmet aktiverat","no":"Batterialarmen er aktivert","es":"La alarma de la batería se ha activado","da":"Batterialarm aktiverede"}},{"id":"alarm_battery_false","title":{"en":"The battery alarm turned off","nl":"De batterijwaarschuwing gaat uit","de":"Der Batterie-Alarm ist ausgegangen","fr":"L\'alarme batterie s\'est désactivée","it":"L\'allarme della batteria è stato disattivato","sv":"Batterialarmet aktiverat","no":"Batterialarmen er deaktivert","es":"La alarma de la batería se ha desactivado","da":"Batterialarm deaktiverede"}}],"conditions":[{"id":"alarm_battery","title":{"en":"The battery alarm is !{{on|off}}","nl":"De batterijwaarschuwing is !{{aan|uit}}","de":"Der Batterie-Alarm ist !{{an|aus}}","fr":"L\'alarme batterie est !{{en marche|arrêtée}}","it":"L\'allarme della batteria è !{{acceso|spento}}","sv":"Batterialarmet är !{{på|av}}","no":"Batterialarmen er !{{på|av}}","es":"La alarma de la batería está !{{activada|desactivada}}","da":"Batterialarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"CO alarm","nl":"CO alarm","de":"CO-Alarm","fr":"Alarme CO","it":"Allarme CO","sv":"CO-larm","no":"CO-alarm","es":"Alarma de CO","da":"CO-alarm"},"desc":{"en":"True when dangerous CO values have been detected","nl":"Gaat af bij gevaarlijke concentraties CO","de":"True, wenn gefährliche CO-Werte erkannt wurden","fr":"Vrai si des valeurs de CO dangereuses ont été détectées","it":"Vero quando sono stati rilevati valori pericolosi di CO","sv":"Sant när farliga CO-värden upptäcks","no":"Sant når farlige CO-verdier påvises","es":"Verdadero cuando se han detectado valores peligrosos de CO","da":"Sandt, når farlige CO-værdier er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"CO alarm turned on","nl":"CO alarm ging af","de":"CO-Alarm ist angegangen","fr":"L\'alarme CO est activée","it":"Allarme CO attivato","sv":"CO-larm aktiverat","no":"CO-alarm aktivert","es":"Alarma de CO activada","da":"CO-alarm aktiveret"},"insightsTitleFalse":{"en":"CO alarm turned off","nl":"CO alarm ging uit","de":"CO-Alarm ist ausgegangen","fr":"L\'alarme CO est désactivée","it":"Allarme CO disattivato","sv":"CO-larm inaktiverat","no":"CO-alarm deaktivert","es":"Alarma de CO desactivada","da":"CO-alarm deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_co_true","highlight":true,"title":{"en":"The CO alarm turned on","nl":"Het CO alarm gaat aan","de":"Der CO-Alarm ist angegangen","fr":"L\'alarme CO s\'est activée","it":"L\'allarme CO è stato attivato","sv":"CO-larmet aktiverades","no":"CO-alarmen aktivert","es":"La alarma de CO se ha activado","da":"CO-alarmen blev aktiveredt"}},{"id":"alarm_co_false","title":{"en":"The CO alarm turned off","nl":"Het CO alarm gaat uit","de":"Der CO-Alarm ist ausgegangen","fr":"L\'alarme CO s\'est désactivée","it":"L\'allarme CO è stato disattivato","sv":"CO-larmet inaktiverades","no":"CO-alarmen deaktivert","es":"La alarma de CO se ha desactivado","da":"CO-alarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_co","title":{"en":"The CO alarm is !{{on|off}}","nl":"Het CO alarm is !{{aan|uit}}","de":"Der CO-Alarm ist !{{an|aus}}","fr":"L\'alarme CO est !{{en marche|arrêtée}}","it":"L\'allarme CO è !{{acceso|spento}}","sv":"CO-larmet är !{{på|av}}","no":"CO-alarmen er !{{på|av}}","es":"La alarma de CO está !{{activada|desactivada}}","da":"CO-alarmen er !{{on|off}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"CO2 alarm","nl":"CO2 alarm","de":"CO2-Alarm","fr":"Alarme CO2","it":"Allarme CO2","no":"CO2-alarm","es":"Alarma de CO2","da":"CO2-alarm"},"desc":{"en":"True when dangerous CO2 values have been detected","nl":"Gaat af bij gevaarlijke concentraties CO2 alarm","de":"True, wenn gefährliche CO2-Werte erkannt wurden","fr":"Vrai si des valeurs dangereuses de CO2 ont été détectées","it":"Vero quando sono stati rilevati valori pericolosi di CO2","no":"Sant når farlige CO2-verdier har blitt oppdaget","es":"Verdadero cuando se han detectado valores peligrosos de CO2","da":"Sandt, når farlige CO2-værdier er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"CO2 alarm turned on","nl":"CO2 alarm ging af","de":"CO2-Alarm ist angegangen","fr":"L\'alarme CO2 s\'est activée","it":"Allarme CO2 attivato","sv":"CO2-larm på","no":"CO2-alarm aktivert","es":"Alarma de CO2 activada","da":"CO2-alarm aktiveret"},"insightsTitleFalse":{"en":"CO2 alarm turned off","nl":"CO2 alarm ging uit","de":"CO2-Alarm ist ausgegangen","fr":"L\'alarme CO2 s\'est désactivée","it":"Allarme CO2 disattivato","sv":"CO2-larm av","no":"CO2-alarm deaktivert","es":"Alarma de CO2 desactivada","da":"CO2-alarm deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_co2_true","highlight":true,"title":{"en":"The CO2 alarm turned on","nl":"Het CO2 alarm gaat aan","de":"Der CO2-Alarm ist angegangen","fr":"L\'alarme CO2 s\'est activée","it":"L\'allarme CO2 è stato attivato","sv":"CO2-larmet på","no":"CO2-alarmen er aktivert","es":"La alarma de CO2 se ha activado","da":"CO2-alarmen blev aktiveret"}},{"id":"alarm_co2_false","title":{"en":"The CO2 alarm turned off","nl":"Het CO2 alarm gaat uit","de":"Der CO2-Alarm ist ausgegangen","fr":"L\'alarme CO2 s\'est désactivée","it":"L\'allarme CO2 è stato disattivato","sv":"CO2-larmet av","no":"CO2-alarmen er deaktivert","es":"La alarma de CO2 se ha desactivado","da":"CO2-alarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_co2","title":{"en":"The CO2 alarm is !{{on|off}}","nl":"Het CO2 alarm is !{{aan|uit}}","de":"Der CO2-Alarm ist !{{an|aus}}","fr":"L\'alarme CO2 est !{{en marche|arrêtée}}","it":"L\'allarme CO2 è !{{acceso|spento}}","sv":"CO2-larmet är !{{på|av}}","no":"CO2-alarmen er !{{på|av}}","es":"La alarma de CO2 está !{{activada|desactivada}}","da":"CO2-alarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Contact alarm","nl":"Contact alarm","de":"Kontakt-Alarm","fr":"Alarme contact","it":"Allarme contatto","sv":"Kontaktalarm","no":"Kontaktalarm","es":"Alarma de contacto","da":"Kontaktalarm"},"desc":{"en":"Contact sensor, e.g. for windows (true/false)","nl":"Contact sensor, bijvoorbeeld voor ramen","de":"Kontaktsensor, z.B. für Windows (true/false)","fr":"Capteur de contact, par ex. pour les fenêtres (vrai/faux)","it":"Sensore di contatto, ad es. per le finestre (vero/falso)","sv":"Kontaktsensor, t.ex. för fönster (sant/falskt)","no":"Kontaktsensor, f.eks. for vindu (sant/usant)","es":"Sensor de contacto, p. ej., para ventanas (verdadero/falso)","da":"Kontaktsensor, f.eks. til vinduer ((sandt/falsk)"},"insights":true,"insightsTitleTrue":{"en":"Contact alarm turned on","nl":"Contact alarm ging af","de":"Kontakt-Alarm ist angegangen","fr":"Alarme contact s\'est activée","it":"Allarme di contatto attivato","sv":"Kontaktalarm aktiverat","no":"Kontaktalarm aktivert","es":"Alarma de contacto activada","da":"Kontaktalarm blev aktiveret"},"insightsTitleFalse":{"en":"Contact alarm turned off","nl":"Contact alarm ging uit","de":"Kontakt-Alarm ist ausgegangen","fr":"Alarme contact s\'est désactivée","it":"Allarme di contatto disattivato","sv":"Kontaktalarm inaktiverat","no":"Kontaktalarm deaktivert","es":"Alarma de contacto desactivada","da":"Kontaktalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","options":{"zoneActivity":true},"$flow":{"triggers":[{"id":"alarm_contact_true","highlight":true,"title":{"en":"The contact alarm turned on","nl":"Het contactalarm gaat aan","de":"Der Kontakt-Alarm ist angegangen","fr":"L\'alarme contact s\'est activée","it":"L\'allarme di contatto è stato attivato","sv":"Kontaktalarmet aktiverat","no":"Kontaktalarmen aktivert","es":"La alarma de contacto se ha activado","da":"Kontaktalarmen blev aktiveret"}},{"id":"alarm_contact_false","title":{"en":"The contact alarm turned off","nl":"Het contactalarm gaat uit","de":"Der Kontakt-Alarm ist ausgegangen","fr":"L\'alarme contact s\'est désactivée","it":"L\'allarme di contatto è stato disattivato","sv":"Kontaktalarmet inaktiverat","no":"Kontaktalarmen deaktivert","es":"La alarma de contacto se ha desactivado","da":"Kontaktalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_contact","title":{"en":"The contact alarm is !{{on|off}}","nl":"Het contactalarm is !{{aan|uit}}","de":"Der Kontakt-Alarm ist !{{an|aus}}","fr":"L\'alarme contact est !{{en marche|arrêtée}}","it":"L\'allarme di contatto è !{{acceso|spento}}","sv":"Kontaktalarmet är !{{på|av}}","no":"Kontaktalarmen er !{{på|av}}","es":"La alarma de contacto está !{{activada|desactivada}}","da":"Kontaktalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Fire alarm","nl":"Brandalarm","de":"Feuer-Alarm","fr":"Alarme incendie","it":"Allarme antincendio","sv":"Brandlarm","no":"Brannalarm","es":"Alarma de incendios","da":"Brandalarm"},"desc":{"en":"True when fire has been detected","nl":"Gaat af als er brand gedetecteerd wordt","de":"True, wenn Feuer erkannt wurde","fr":"Vrai si un incendie a été détecté","it":"Vero quando è stato rilevato un incendio","sv":"Sant när brand upptäckts","no":"Sant når brann påvises","es":"Verdadero cuando se ha detectado fuego","da":"Sandt, når brand er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"Fire alarm turned on","nl":"Brandalarm ging af","de":"Feuer-Alarm ist angegangen","fr":"Alarme incendie s\'est activée","it":"Allarme antincendio attivato","sv":"Brandlarm aktiverat","no":"Brannlarm aktivert","es":"Alarma de incendios activada","da":"Brandalarm blev aktiveret"},"insightsTitleFalse":{"en":"Fire alarm turned off","nl":"Brandalarm ging uit","de":"Feuer-Alarm ist ausgegangen","fr":"Alarme incendie s\'est désactivée","it":"Allarme antincendio disattivato","sv":"Brandlarm inaktiverat","no":"Brannlarm deaktivert","es":"Alarma de incendios desactivada","da":"Brandalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_fire_true","highlight":true,"title":{"en":"The fire alarm turned on","nl":"Het brandalarm gaat aan","de":"Der Feuer-Alarm ist angegangen","fr":"L\'alarme incendie s\'est activée","it":"L\'allarme antincendio è stato attivato","sv":"Brandlarmet aktiverat","no":"Brannalarmen aktivert","es":"La alarma de incendios se ha activado","da":"Brandalarmen blev aktiveret"}},{"id":"alarm_fire_false","title":{"en":"The fire alarm turned off","nl":"Het brandalarm gaat uit","de":"Der Feuer-Alarm ist ausgegangen","fr":"L\'alarme incendie s\'est désactivée","it":"L\'allarme antincendio è stato disattivato","sv":"Brandlarmet inaktiverat","no":"Brannalarmen deaktivert","es":"La alarma de incendios se ha desactivado","da":"Brandalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_fire","title":{"en":"The fire alarm is !{{on|off}}","nl":"Het brandalarm is !{{aan|uit}}","de":"Der Feuer-Alarm ist !{{an|aus}}","fr":"L\'alarme incendie est !{{en marche|arrêtée}}","it":"L\'allarme antincendio è !{{acceso|spento}}","sv":"Brandlarmet är !{{på|av}}","no":"Brannalarmen er !{{på|av}}","es":"La alarma de incendios está !{{activada|desactivada}}","da":"Brandalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Generic alarm","nl":"Algemeen alarm","de":"Allgemeiner Alarm","fr":"Alarme générique","it":"Allarme generico","sv":"Generiskt larm","no":"Generell alarm","es":"Alarma general","da":"Generisk alarm"},"desc":{"en":"Generic alarm","nl":"Algemeen alarm","de":"Allgemeiner Alarm","fr":"Alarme générique","it":"Allarme generico","sv":"Generiskt larm","no":"Generell alarm","es":"Alarma general","da":"Generisk alarm"},"insights":true,"insightsTitleTrue":{"en":"Generic alarm turned on","nl":"Algemeen alarm ging af","de":"Allgemeiner Alarm ist angegangen","fr":"Alarme générique s\'est activée","it":"Allarme generico attivato","sv":"Generiskt larm aktiverat","no":"Generell alarm aktivert","es":"Alarma general activada","da":"Generisk alarm blev aktiveret"},"insightsTitleFalse":{"en":"Generic alarm turned off","nl":"Algemeen alarm ging uit","de":"Allgemeiner Alarm ist ausgegangen","fr":"Alarme générique s\'est désactivée","it":"Allarme generico disattivato","sv":"Generiskt larm inaktiverat","no":"Generell alarm deaktivert","es":"Alarma general desactivada","da":"Generisk alarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_generic_true","title":{"en":"The generic alarm turned on","nl":"Het algemene alarm gaat aan","de":"Der allgemeine Alarm ist angegangen","fr":"L\'alarme générique s\'est activée","it":"L\'allarme generico è stato attivato","sv":"Det generiska larmet är aktiverat","no":"Den generelle alarmen er aktivert","es":"La alarma general se ha activado","da":"Den generiske alarm blev aktiveret"}},{"id":"alarm_generic_false","title":{"en":"The generic alarm turned off","nl":"Het algemene alarm ging uit","de":"Der allgemeine Alarm ist ausgegangen","fr":"L\'alarme générique s\'est désactivée","it":"L\'allarme generico è stato disattivato","sv":"Det generiska larmet är inaktiverat","no":"Den generelle alarmen er deaktivert","es":"La alarma general se ha desactivado","da":"Den generiske alarm blev deaktiveret"}}],"conditions":[{"id":"alarm_generic","title":{"en":"The generic alarm is !{{on|off}}","nl":"Het algemene alarm is !{{aan|uit}}","de":"Der allgemeine Alarm ist !{{an|aus}}","fr":"L\'alarme générique est !{{en marche|arrêtée}}","it":"L\'allarme generico è !{{acceso|spento}}","sv":"Det generiska larmet är !{{på|av}}","no":"Den generelle alarmen er !{{på|av}}","es":"La alarma general está !{{activada|desactivada}}","da":"Den generiske alarm er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Heat alarm","nl":"Hittealarm","de":"Hitze-Alarm","fr":"Alarme chaleur","it":"Allarme di calore","sv":"Värmelarm","no":"Varmealarm","es":"Alarma de calor","da":"Varmealarm"},"desc":{"en":"True when extreme heat has been detected","nl":"Gaat af als er extreme hitte gedetecteerd wordt","de":"True, wenn extreme Hitze erkannt wurde","fr":"Vrai si une chaleur extrême a été détectée","it":"Vero quando è stato rilevato un calore estremo","sv":"Sant när extrem hetta upptäckts","no":"Sant når ekstrem varme påvises","es":"Verdadero cuando se ha detectado un calor extremo","da":"Sandt, når ekstrem varme er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"Heat alarm turned on","nl":"Hittealarm ging af","de":"Hitze-Alarm ist angegangen","fr":"Alarme chaleur s\'est activée","it":"Allarme di calore attivato","sv":"Värmelarm aktiverat","no":"Varmealarm aktivert","es":"Alarma de calor activada","da":"Varmealarm blev aktiveret"},"insightsTitleFalse":{"en":"Heat alarm turned off","nl":"Hittealarm ging uit","de":"Hitze-Alarm ist ausgegangen","fr":"Alarme chaleur s\'est désactivée","it":"Allarme di calore disattivato","sv":"Värmelarm inaktiverat","no":"Varmealarm deaktivert","es":"Alarma de calor desactivada","da":"Varmealarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_heat_true","highlight":true,"title":{"en":"The heat alarm turned on","nl":"Het hitte alarm gaat aan","de":"Der Hitze-Alarm ist angegangen","fr":"L\'alarme chaleur s\'est activée","it":"L\'allarme di calore è stato attivato","sv":"Värmelarmet aktiverat","no":"Varmealarmen aktivert","es":"La alarma de calor se ha activado","da":"Varmealarmen blev aktiveret"}},{"id":"alarm_heat_false","title":{"en":"The heat alarm turned off","nl":"Het hitte alarm gaat uit","de":"Der Hitze-Alarm ist ausgegangen","fr":"L\'alarme chaleur s\'est désactivée","it":"L\'allarme di calore è stato disattivato","sv":"Värmelarmet inaktiverat","no":"Varmealarmen deaktivert","es":"La alarma de calor se ha desactivado","da":"Varmealarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_heat","title":{"en":"The heat alarm is !{{on|off}}","nl":"Het hitte alarm is !{{aan|uit}}","de":"Der Hitze-Alarm ist !{{an|aus}}","fr":"L\'alarme chaleur est !{{en marche|arrêtée}}","it":"L\'allarme di calore è !{{acceso|spento}}","sv":"Värmelarmet är !{{på|av}}","no":"Varmealarmen er !{{på|av}}","es":"La alarma de calor está !{{activada|desactivada}}","da":"Varmealarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Motion alarm","nl":"Bewegingsalarm","de":"Bewegungs-Alarm","fr":"Alarme mouvement","it":"Allarme di movimento","sv":"Rörelselarm","no":"Bevegelsesalarm","es":"Alarma de movimiento","da":"Bevægelsesalarm"},"insights":true,"insightsTitleTrue":{"en":"Motion alarm turned on","nl":"Bewegingsalarm ging af","de":"Bewegungs-Alarm ist angegangen","fr":"Alarme mouvement s\'est déclenchée","it":"Allarme di movimento attivato","sv":"Rörelselarm aktiverat","no":"Bevegelsesalarm aktivert","es":"Alarma de movimiento activada","da":"Bevægelsesalarm blev aktiveret"},"insightsTitleFalse":{"en":"Motion alarm turned off","nl":"Bewegingsalarm ging uit","de":"Bewegungs-Alarm ist ausgegangen","fr":"Alarme mouvement s\'est désactivée","it":"Allarme di movimento disattivato","sv":"Rörelselarm inaktiverat","no":"Bevegelsesalarm deaktivert","es":"Alarma de movimiento desactivada","da":"Bevægelsesalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","options":{"zoneActivity":true},"$flow":{"triggers":[{"id":"alarm_motion_true","highlight":true,"title":{"en":"The motion alarm turned on","nl":"De bewegingsmelder gaat aan","de":"Der Bewegungs-Alarm ist angegangen","fr":"L\'alarme mouvement s\'est activée","it":"L\'allarme di movimento è stato attivato","sv":"Rörelselarmet aktiverat","no":"Bevegelsesalarmen aktivert","es":"La alarma de movimiento se ha activado","da":"Bevægelsesalarmen blev aktiveret"}},{"id":"alarm_motion_false","title":{"en":"The motion alarm turned off","nl":"De bewegingsmelder gaat uit","de":"Der Bewegungs-Alarm ist ausgegangen","fr":"L\'alarme mouvement s\'est désactivée","it":"L\'allarme di movimento è stato disattivato","sv":"Rörelselarmet inaktiverat","no":"Bevegelsesalarmen deaktivert","es":"La alarma de movimiento se ha desactivado","da":"Bevægelsesalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_motion","title":{"en":"The motion alarm is !{{on|off}}","nl":"De bewegingsmelder is !{{aan|uit}}","de":"Der Bewegungs-Alarm ist !{{an|aus}}","fr":"L\'alarme mouvement est !{{en marche|arrêtée}}","it":"L\'allarme di movimento è !{{acceso|spento}}","sv":"Rörelselarmet är !{{på|av}}","no":"Bevegelsesalarmen er !{{på|av}}","es":"La alarma de movimiento está !{{activada|desactivada}}","da":"Bevægelsesalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Night alarm","nl":"Nachtalarm","de":"Nacht-Alarm","fr":"Alarme nuit","it":"Allarme notturno","sv":"Nattlarm","no":"Nattalarm","es":"Alarma nocturna","da":"Natalarm"},"desc":{"en":"True when it is night","nl":"Gaat af als het nacht is","de":"True, wenn es Nacht ist","fr":"Vrai quand il fait nuit","it":"Vero quando è notte","sv":"Sant när det är natt","no":"Sant når det er natt","es":"Verdadero cuando es de noche","da":"Sandt, når det er nat"},"insights":true,"insightsTitleTrue":{"en":"Night alarm turned on","nl":"Nachtalarm ging af","de":"Nacht-Alarm ist angegangen","fr":"Alarme nuit s\'est activée","it":"Allarme notturno attivato","sv":"Nattlarm aktiverat","no":"Nattalarm aktivert","es":"Alarma nocturna activada","da":"Natalarm blev aktiveret"},"insightsTitleFalse":{"en":"Night alarm turned off","nl":"Nachtalarm ging uit","de":"Nacht-Alarm ist ausgegangen","fr":"Alarme nuit s\'est désactivée","it":"Allarme notturno disattivato","sv":"Nattlarm inaktiverat","no":"Nattalarm deaktivert","es":"Alarma nocturna desactivada","da":"Natalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_night_true","title":{"en":"The night alarm turned on","nl":"Het nachtalarm gaat aan","de":"Der Nacht-Alarm ist angegangen","fr":"L\'alarme nuit s\'est activée","it":"L\'allarme notturno è stato attivato","sv":"Nattlarmet aktiverat","no":"Nattalarmen aktivert","es":"La alarma nocturna se ha activado","da":"Natalarmen blev aktiveret"}},{"id":"alarm_night_false","title":{"en":"The night alarm turned off","nl":"Het nachtalarm gaat uit","de":"Der Nacht-Alarm ist ausgegangen","fr":"L\'alarme nuit s\'est désactivée","it":"L\'allarme notturno è stato disattivato","sv":"Nattlarmet inaktiverat","no":"Nattalarmen deaktivert","es":"La alarma nocturna se ha desactivado","da":"Natalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_night","title":{"en":"The night alarm is !{{on|off}}","nl":"Het nachtalarm is !{{aan|uit}}","de":"Der Nacht-Alarm ist !{{an|aus}}","fr":"L\'alarme nuit est !{{en marche|arrêtée}}","it":"L\'allarme notturno è !{{acceso|spento}}","sv":"Nattlarmet är !{{på|av}}","no":"Nattalarmen er !{{på|av}}","es":"La alarma nocturna está !{{activada|desactivada}}","da":"Natalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"PM2.5 alarm","nl":"PM2.5 alarm","de":"PM2.5-Alarm","fr":"Alarme PM2.5","it":"Allarme PM2.5","sv":"PM2.5-larm","no":"PM2.5-alarm","es":"Alarma de PM2,5","da":"PM2,5-alarm"},"desc":{"en":"True when PM2.5 values exceeds threshold","nl":"Gaat af wanneer de PM2.5 waarde overschreden wordt","de":"True, wenn PM2.5-Werte die Schwelle überschreiten","fr":"Vrai si les valeurs PM2.5 excèdent un seuil","it":"Vero quando i valori PM2.5 superano la soglia","sv":"Sant när PM2.5-värdena överstiger gränsvärdet","no":"Sant når PM2.5-verdiene overskrider grenseverdien","es":"Verdadero cuando los valores de PM2,5 superan el límite","da":"Sandt, når PM2,5-værdier overskrider grænseværdien"},"insights":true,"insightsTitleTrue":{"en":"PM2.5 alarm turned on","nl":"PM2.5 alarm ging af","de":"PM2.5-Alarm ist angegangen","fr":"Alarme PM2.5 s\'est activée","it":"Allarme PM2.5 attivato","sv":"PM2.5-larm aktiverat","no":"PM2.5-alarm aktivert","es":"Alarma de PM2,5 activada","da":"PM2,5-alarm blev aktiveret"},"insightsTitleFalse":{"en":"PM2.5 alarm turned off","nl":"PM2.5 alarm ging uit","de":"PM2.5-Alarm ist ausgegangen","fr":"Alarme PM2.5 s\'est désactivée","it":"Allarme PM2.5 disattivato","sv":"PM2.5-larm inaktiverat","no":"PM2.5-alarm deaktivert","es":"Alarma de PM2,5 desactivada","da":"PM2,5-alarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_pm25_true","highlight":true,"title":{"en":"The PM2.5 alarm turned on","nl":"Het PM2.5 gaat aan","de":"Der PM2.5-Alarm ist angegangen","fr":"L\'alarme PM2.5 s\'est activée","it":"L\'allarme PM2.5 è stato attivato","sv":"PM2.5-larmet aktiverat","no":"PM2.5-alarmen aktivert","es":"La alarma de PM2,5 se ha activado","da":"PM2,5-alarmen blev aktiveret"}},{"id":"alarm_pm25_false","title":{"en":"The PM2.5 alarm turned off","nl":"Het PM2.5 gaat uit","de":"Der PM2.5-Alarm ist ausgegangen","fr":"L\'alarme PM2.5 s\'est désactivée","it":"L\'allarme PM2.5 è stato disattivato","sv":"PM2.5-larmet inaktiverat","no":"PM2.5-alarmen deaktivert","es":"La alarma de PM2,5 se ha desactivado","da":"PM2,5-alarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_pm25","title":{"en":"The PM2.5 alarm is !{{on|off}}","nl":"Het PM2.5 alarm is !{{aan|uit}}","de":"Der PM2.5-Alarm ist !{{an|aus}}","fr":"L\'alarme PM2.5 est !{{en marche|arrêtée}}","it":"L\'allarme PM2.5 è !{{acceso|spento}}","sv":"PM2.5-larmet är !{{på|av}}","no":"PM2.5-alarmen er !{{på|av}}","es":"La alarma de PM2,5 está !{{activada|desactivada}}","da":"PM2,5-alarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Smoke alarm","nl":"Rookmelder","de":"Rauch-Alarm","fr":"Alarme fumée","it":"Allarme fumo","sv":"Röklarm","no":"Røykalarm","es":"Alarma de humo","da":"Røgalarm"},"desc":{"en":"True when smoke has been detected","nl":"Gaat af als er rook gedetecteerd wordt","de":"True, wenn Rauch erkannt wurde","fr":"Vrai quand de la fumée a été détectée","it":"Vero quando è stato rilevato del fumo","sv":"Sant när rök upptäcks","no":"Sant når røyk har blitt påvist","es":"Verdadero cuando se ha detectado humo","da":"Sandt, når røg er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"Smoke alarm turned on","nl":"Rookmelder ging af","de":"Rauch-Alarm ist angegangen","fr":"Alarme fumée s\'est activée","it":"Allarme fumo attivato","sv":"Röklarm aktiverat","no":"Røykalarm aktivert","es":"Alarma de humo activada","da":"Røgalarm blev aktiveret"},"insightsTitleFalse":{"en":"Smoke alarm turned off","nl":"Rookmelder ging uit","de":"Rauch-Alarm ist ausgegangen","fr":"Alarme fumée s\'est désactivée","it":"Allarme fumo disattivato","sv":"Röklarm inaktiverat","no":"Røykalarm deaktivert","es":"Alarma de humo desactivada","da":"Røgalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_smoke_true","highlight":true,"title":{"en":"The smoke alarm turned on","nl":"De rookmelder gaat aan","de":"Der Rauch-Alarm ist angegangen","fr":"L\'alarme fumée s\'est activée","it":"L\'allarme fumo è stato attivato","sv":"Röklarmet aktiverat","no":"Røykalarmen er aktivert","es":"La alarma de humo se ha activado","da":"Røgalarmen blev aktiveret"}},{"id":"alarm_smoke_false","title":{"en":"The smoke alarm turned off","nl":"De rookmelder gaat uit","de":"Der Rauch-Alarm ist ausgegangen","fr":"L\'alarme fumée s\'est désactivée","it":"L\'allarme fumo è stato disattivato","sv":"Röklarmet inaktiverat","no":"Røykalarmen er deaktivert","es":"La alarma de humo se ha desactivado","da":"Røgalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_smoke","title":{"en":"The smoke alarm is !{{on|off}}","nl":"De rookmelder is !{{aan|uit}}","de":"Der Rauch-Alarm ist !{{an|aus}}","fr":"L\'alarme fumée est !{{en marche|arrêtée}}","it":"L\'allarme fumo è !{{acceso|spento}}","sv":"Röklarmet är !{{på|av}}","no":"Røykalarmen er !{{på|av}}","es":"La alarma de humo está !{{activada|desactivada}}","da":"Røgalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Tamper Alarm","nl":"Sabotagealarm","de":"Sabotage-Alarm","fr":"Alarme sabotage","it":"Allarme manomissione","sv":"Sabotagelarm","no":"Sabotasjealarm","es":"Alarma de sabotaje","da":"Sabotagealarm"},"desc":{"en":"True when tampering has been detected","nl":"Gaat af als sabotage gedetecteerd wordt","de":"True, wenn Sabotage erkannt wurde","fr":"Vrai si l\'alarme sabotage a été détectée","it":"Vero quando è stata rilevata una manomissione","sv":"Sant när sabotage upptäckts","no":"Sant när sabotasje oppdages","es":"Verdadero cuando se ha detectado un sabotaje","da":"Sandt, når sabotage er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"Tamper alarm turned on","nl":"Sabotagealarm ging af","de":"Sabotage-Alarm ist angegangen","fr":"Alarme sabotage s\'est activée","it":"Allarme manomissione attivato","sv":"Sabotagelarm aktiverat","no":"Sabotasjealarm aktivert","es":"Alarma de sabotaje activada","da":"Sabotagealarm blev aktiveret"},"insightsTitleFalse":{"en":"Tamper alarm turned off","nl":"Sabotagealarm ging uit","de":"Sabotage-Alarm ist ausgegangen","fr":"Alarme sabotage s\'est désactivée","it":"Allarme manomissione disattivato","sv":"Sabotagelarm inaktiverat","no":"Sabotagealarm deaktivert","es":"Alarma de sabotaje desactivada","da":"Sabotagealarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_tamper_true","highlight":true,"title":{"en":"The tamper alarm turned on","nl":"Het sabotagealarm gaat aan","de":"Der Sabotage-Alarm ist angegangen","fr":"L\'alarme sabotage s\'est activée","it":"L\'allarme manomissione è stato attivato","sv":"Sabotagelarmet aktiverat","no":"Sabotasjealarmen aktivert","es":"La alarma de sabotaje se ha activado","da":"Sabotagealarmen blev aktiveret"}},{"id":"alarm_tamper_false","title":{"en":"The tamper alarm turned off","nl":"Het sabotagealarm gaat uit","de":"Der Sabotage-Alarm ist ausgegangen","fr":"L\'alarme sabotage s\'est désactivée","it":"L\'allarme manomissione è stato disattivato","sv":"Sabotagelarmet inaktiverat","no":"Sabotasjealarmen deaktivert","es":"La alarma de sabotaje se ha desactivado","da":"Sabotagealarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_tamper","title":{"en":"The tamper alarm is !{{on|off}}","nl":"Het sabotagealarm is !{{aan|uit}}","de":"Der Sabotage-Alarm ist !{{an|aus}}","fr":"L\'alarme sabotage est !{{en marche|arrêtée}}","it":"L\'allarme manomissione è !{{acceso|spento}}","sv":"Sabotagelarmet är !{{på|av}}","no":"Sabotasjealarmen er !{{på|av}}","es":"La alarma de sabotaje está !{{activada|desactivada}}","da":"Sabotagealarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Water alarm","nl":"Wateralarm","de":"Wasser-Alarm","fr":"Alarme eau","it":"Allarme acqua","sv":"Vattenalarm","no":"Vannalarm","es":"Alarma de agua","da":"Vandalarm"},"desc":{"en":"True when water has been detected","nl":"Gaat af als er water gedetecteerd wordt","de":"True, wenn Wasser erkannt wurde","fr":"Vrai si de l\'eau a été détectée","it":"Vero quando è stata rilevata dell\'acqua","sv":"Sant när vatten upptäcks","no":"Sant når vann påvises","es":"Verdadero cuando se ha detectado agua","da":"Sandt, når vand er blevet opdaget"},"insights":true,"insightsTitleTrue":{"en":"Water alarm turned on","nl":"Water alarm ging af","de":"Wasser-Alarm ist angegangen","fr":"Alarme eau s\'est activée","it":"Allarme acqua attivato","sv":"Vattenalarm aktiverat","no":"Vannalarm aktivert","es":"Alarma de agua activada","da":"Vandalarm blev aktiveret"},"insightsTitleFalse":{"en":"Water alarm turned off","nl":"Water alarm ging uit","de":"Wasser-Alarm ist ausgegangen","fr":"Alarme eau s\'est désactivée","it":"Allarme acqua disattivato","sv":"Vattenalarm inaktiverat","no":"Vannalarm deaktivert","es":"Alarma de agua desactivada","da":"Vandalarm blev deaktiveret"},"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"alarm_water_true","highlight":true,"title":{"en":"The water alarm turned on","nl":"Het wateralarm gaat aan","de":"Der Wasser-Alarm ist angegangen","fr":"L\'alarme eau s\'est activée","it":"L\'allarme acqua è stato attivato","sv":"Vattenalarmet aktiverat","no":"Vannalarmen aktivert","es":"La alarma de agua se ha activado","da":"Vandalarmen blev aktiveret"}},{"id":"alarm_water_false","title":{"en":"The water alarm turned off","nl":"Het wateralarm gaat uit","de":"Der Wasser-Alarm ist ausgegangen","fr":"L\'alarme eau s\'est désactivée","it":"L\'allarme acqua è stato disattivato","sv":"Vattenalarmet inaktiverat","no":"Vannalarmen deaktivert","es":"La alarma de agua se ha desactivado","da":"Vandalarmen blev deaktiveret"}}],"conditions":[{"id":"alarm_water","title":{"en":"The water alarm is !{{on|off}}","nl":"Het wateralarm is !{{aan|uit}}","de":"Der Wasser-Alarm ist !{{an|aus}}","fr":"L\'alarme eau est !{{en marche|arrêtée}}","it":"L\'allarme acqua è !{{acceso|spento}}","sv":"Vattenalarmet är !{{på|av}}","no":"Vannalarmen er !{{på|av}}","es":"La alarma de agua está !{{activada|desactivada}}","da":"Vandalarmen er !{{tændt|slukket}}"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Button","nl":"Knop","de":"Taste","fr":"Bouton","it":"Pulsante","sv":"Knapp","no":"Knapp","es":"Botón","da":"Knap"},"type":"boolean","getable":false,"setable":true,"uiComponent":"button","uiQuickAction":true,"$flow":{"actions":[{"id":"press","title":{"en":"Press the button","nl":"Druk op de knop","de":"Drücke die Taste","fr":"Appuyer sur le bouton","it":"Premi il pulsante","sv":"Tryck på knappen","no":"Trykk på knappen","es":"Pulsa el botón","da":"Tryk på knappen"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Channel down","nl":"Kanaal omlaag","de":"Kanal runter","fr":"Chane bas","it":"Canale verso il basso","sv":"Kanal ned","no":"Lavere kanal","es":"Bajar de canal","da":"Kanal ned"},"type":"boolean","getable":false,"setable":true,"$flow":{"actions":[{"id":"channel_down","title":{"en":"One channel down","nl":"Eén kanaal omlaag","de":"Einen Kanal runter","fr":"Une châine vers le bas","it":"Un canale verso il basso","sv":"En kanal ned","no":"En kanal lavere","es":"Un canal más abajo","da":"En kanal ned"}}]},"uiComponent":"button","$speechExamples":{"en":["Switch My TV to the previous channel"],"nl":["Zet Mijn TV op het vorige kanaal"],"de":["Schalte meinen TV auf den vorherigen Kanal"],"fr":["Descendre ma télé d\'une chaîne"],"it":["Passa al canale precedente in TV"],"sv":["Byt till föregående kanal på min TV"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn)"},"channel":{"type":"string","value":"channel"},"down":{"type":"regex","value":"(prev|previous|decrease|(turn\\\\s)?down)"}},"group":{"channelDown":{"set":"(verb) && channel && down","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["channel_down"]}}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"channel":{"type":"regex","value":"kanaal|zender"},"down":{"type":"regex","value":"(omlaag|vorige|vorig)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Channel up","nl":"Kanaal omhoog","de":"Kanal hoch","fr":"Chaîne haut","it":"Canale verso l\'alto","sv":"Kanal upp","no":"Høyere kanal","es":"Subir de canal","da":"Kanal op"},"type":"boolean","getable":false,"setable":true,"$flow":{"actions":[{"id":"channel_up","title":{"en":"One channel up","nl":"Eén kanaal omhoog","de":"Einen Kanal hoch","fr":"Une chaîne vers le haut","it":"Un canale verso l\'alto","sv":"En kanal upp","no":"En kanal høyere","es":"Un canal más arriba","da":"En kanal op"}}]},"uiComponent":"button","$speechExamples":{"en":["Switch My TV to the next channel"],"nl":["Zet Mijn TV op het volgende kanaal"],"de":["Schalte meinen TV zum nächsten Kanal"],"fr":["Monter ma télé d\'une chaîne"],"it":["Passa al canale successivo in TV"],"sv":["Byt till nästa kanal på min TV"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn)"},"channel":{"type":"string","value":"channel"},"up":{"type":"regex","value":"(next|increase|(turn\\\\s)?up)"}},"group":{"channelUp":{"set":"(verb) && channel && up","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["channel_up"]}}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"channel":{"type":"regex","value":"kanaal|zender"},"up":{"type":"regex","value":"(omhoog|volgende|volgend)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Dim level","nl":"Dim niveau","de":"Dimmlevel","fr":"Intensité lumineuse","it":"Intensità luminosa","sv":"Dimningsnivå","no":"Dempingsnivå","es":"Intensidad de la luz","da":"Lysniveau"},"chartType":"stepLine","min":0,"max":1,"decimals":2,"units":"%","getable":true,"setable":true,"uiComponent":"slider","$flow":{"triggers":[{"id":"dim_changed","title":{"en":"Dim-level changed","nl":"Dim-niveau veranderd","de":"Dimm-Niveau geändert","fr":"Intensité lumineuse a été modifiée","it":"Intensità luminosa modificata","sv":"Dimningsnivå ändrades","no":"Dempingsnivå ble endret","es":"La intensidad de la luz ha cambiado","da":"Lysniveau ændret"},"tokens":[{"name":"dim","type":"number","title":{"en":"Level","nl":"Niveau","de":"Niveau","fr":"Niveau","it":"Livello","sv":"Nivå","no":"Nivå","es":"Nivel","da":"Niveau"},"example":0.5}]}],"actions":[{"id":"dim","highlight":true,"title":{"en":"Dim to","nl":"Dim naar","de":"Dimmen auf","fr":"Mettre l\'intensité lumineuse sur","it":"Imposta l\'intensità luminosa su","sv":"Dimma till","no":"Demp til","es":"Ajustar la intensidad de la luz a","da":"Juster til"},"args":[{"name":"dim","type":"range","min":0,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]},{"id":"dim_relative","title":{"en":"Set relative dim-level","nl":"Zet relatief dim-niveau","de":"Relatives Dimm-Niveau setzen","fr":"Définir l\'intensité lumineuse sur relative","it":"Imposta intensità luminosa su relativa","no":"Innstill relativt dempingsnivå","es":"Ajustar la intensidad de la luz como relativa","da":"Indstil relativt lysniveau"},"hint":{"en":"Dim or brighten with respect to the device\'s current dim-level.","nl":"Verhoog of verlaag de helderheid ten opzichte van het huidige dim-niveau van het apparaat."},"args":[{"name":"dim","type":"range","min":-1,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]}]},"$speechExamples":{"en":["Dim all lights to 50%","Set My Light to full brightness"],"nl":["Dim alle lampen naar 50%","Zet Mijn Lamp naar volle helderheid"],"de":["Alle Lichter auf 50% dimmen","Meine Lichter auf volle Helligkeit setzen"],"fr":["Estomper toutes les lumières vers 50%","Définir ma lumière sur l\'intensité maximum"],"it":["Abbassa tutte le luci al 50%","Imposta la luce alla massima luminosità"],"sv":["Dämpa all belysning till 50 %","Still in Min lampa till full ljusstyrka"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn|set|put|change)"},"light":{"type":"regex","value":"(all\\\\s|every\\\\s)?(?:the\\\\s)?(light(s)?|lamp(s)?)(to\\\\s)?"},"lightOrBright":{"type":"regex","value":"(the\\\\s)?(brightness|(brightness\\\\sof\\\\s)?(the\\\\s)?(light(s)?|lamp(s)?))"},"percent":{"type":"regex","value":"(?:to\\\\s)?(\\\\d+)\\\\spercent"},"max":{"type":"regex","value":"(to\\\\s)?(max(imum|imal)(\\\\sbrightness)?|(the\\\\s|it(\\\\s)?s\\\\s)?high(est)?|(up\\\\s)?all\\\\sthe\\\\sway)"},"min":{"type":"regex","value":"(to\\\\s)?(min(imum|imal)(\\\\sbrightness)?|(the\\\\s|it(\\\\s)?s\\\\s)?low(est)?|(up\\\\s)?all\\\\sthe\\\\sway)"},"up":{"type":"regex","value":"(raise|increase|boost|(turn\\\\s)?up|brighter)"},"down":{"type":"regex","value":"(lower|dim|(turn\\\\s)down|decrease|less\\\\sbright)"}},"group":{"changeBrightness":{"set":"(verb) && upDown","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"light","capabilities":["dim"]}},"upDown":{"set":"up || down"},"toPercentage":{"set":"(verb) && percent","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"light","capabilities":["dim"]}},"setMaxMin":{"set":"(verb) && maxMin","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"light","capabilities":["dim"]}},"maxMin":{"set":"max || min"}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"light":{"type":"regex","value":"(?:(alle\\\\s|al\\\\sde\\\\s)|het\\\\s|de\\\\s|\\\\b)(licht|lamp|verlichting)(en)?"},"lightOrBright":{"type":"regex","value":"(de\\\\s)?(helderheid\\\\s(van\\\\s)?)?(het\\\\s|de\\\\s)?(licht|lamp|verlichting)(en)?"},"percent":{"type":"regex","value":"(?:naar\\\\s|op\\\\s)?(\\\\d+)\\\\sprocent"},"max":{"type":"regex","value":"(naar\\\\s|op\\\\s)?(de\\\\s)?(maxim(um|ale|aal)(\\\\shelderheid)?|(het|zijn|z\\\\s?n)\\\\s(hoogste?|felst)|(helemaal|volledig)\\\\saan)"},"min":{"type":"regex","value":"(naar\\\\s|op\\\\s)?(de\\\\s)?(minim(um|ale|aal)(\\\\shelderheid)?|(het|zijn|z\\\\s?n)\\\\slaagste?|(helemaal|compleeet|volledig)\\\\sgedimd)"},"up":{"type":"regex","value":"(hoger|feller|verhoog)"},"down":{"type":"regex","value":"(dim|lager|verlaag|reduceer|minder(\\\\sfel)?)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Closed","nl":"Gesloten","de":"Geschlossen","fr":"Fermé","it":"Chiuse","sv":"Stängd","no":"Lukket","es":"Cerrados","da":"Lukket"},"getable":true,"setable":true,"uiComponent":"toggle","$flow":{"triggers":[{"id":"garagedoor_closed_true","title":{"en":"Closed","nl":"Gesloten","de":"Geschlossen","fr":"Fermé","it":"Chiuse","sv":"Stängd","no":"Lukket","es":"Cerrados","da":"Lukket"}},{"id":"garagedoor_closed_false","title":{"en":"Opened","nl":"Geopend","de":"Offen","fr":"Ouvert","it":"Aperte","sv":"Öppen","no":"Åpen","es":"Abiertos","da":"Åben"}}],"conditions":[{"id":"closed","title":{"en":"Is !{{closed|open}}","nl":"Is !{{gesloten|geopend}}","de":"Ist !{{geschlossen|offen}}","fr":"Est !{{fermé|ouvert}}","it":"È !{{chiuso|aperto}}","sv":"Är !{{stängd|öppen}}","no":"Er !{{lukket|åpen}}","es":"Está !{{cerrado|abierto}}","da":"Er !{{lukket|åben}}"}}],"actions":[{"id":"close","highlight":true,"title":{"en":"Close","nl":"Sluiten","de":"Schließen","fr":"Fermer","it":"Chiudi","sv":"Stäng","no":"Lukk","es":"Cerrar","da":"Luk"}},{"id":"open","highlight":true,"title":{"en":"Open","nl":"Openen","de":"Öffnen","fr":"Ouvrir","it":"Apri","sv":"Öppna","no":"Åpne","es":"Abrir","da":"Åbn"}},{"id":"toggle","title":{"en":"Toggle open or closed","nl":"Schakel tussen geopend en gesloten","de":"Offen/Geschlossen umschalten","fr":"Alterner ouvert/fermé","it":"Alterna aperte/chiuse","sv":"Växla mellan öppen eller stängd","no":"Veksle mellom åpen og lukket","es":"Abrir o cerrar","da":"Skift mellem åben og lukket"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"enum","title":{"en":"Home Alarm state","nl":"Thuisalarm status","de":"Heim-Alarm-Status","fr":"Etat de l\'alarme de maison","it":"Stato dell\'allarme domestico","sv":"Hemlarmsstatus","no":"Hjemmealarmstatus","es":"Estado de la alarma doméstica","da":"Hjemmealarmstatus"},"values":[{"id":"armed","title":{"en":"Armed","nl":"Geactiveerd","de":"scharf","fr":"Armé","it":"Attivato","sv":"Larmat","no":"Aktivert","es":"Activada","da":"Aktiveret"}},{"id":"disarmed","title":{"en":"Disarmed","nl":"Gedeactiveerd","de":"unscharf","fr":"Désarmé","it":"Disattivato","sv":"Avlarmat","no":"Deaktivert","es":"Desactivada","da":"Deaktiveret"}},{"id":"partially_armed","title":{"en":"Partially armed","nl":"Deels geactiveerd","de":"teilweise scharf","fr":"Partiellement armé","it":"Parzialmente attivato","sv":"Delvis larmat","no":"Delvis aktivert","es":"Parcialmente activada","da":"Delvist aktiveret"}}],"getable":true,"setable":true,"uiComponent":"picker","$flow":{"triggers":[{"id":"homealarm_state_changed","title":{"en":"The state changed","nl":"De status is veranderd","de":"Der Status hat sich geändert","fr":"L\'état a été modifié","it":"Lo stato è cambiato","sv":"Statusen ändrad","no":"Statusen ble endret","es":"El estado ha cambiado","da":"Status ændret"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"conditions":[{"id":"homealarm_state_is","title":{"en":"The state is !{{|not}}","nl":"De status is !{{|niet}}","de":"Der Status ist !{{|nicht}}","fr":"L\'état !{{est|n\'est pas}}","it":"Lo stato è !{{|non}}","sv":"Statusen är !{{|inte}}","no":"Statusen er !{{|ikke}}","es":"El estado !{{|no}} es","da":"Status er !{{|ikke}}"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"actions":[{"id":"set_homealarm_state","title":{"en":"Set state","nl":"Zet de status","de":"Status setzen","fr":"Définir l\'état","it":"Imposta stato","sv":"Ställ in status","no":"Innstill status","es":"Definir estado","da":"Indstil status"},"args":[{"name":"device","type":"device","filter":"class=homealarm&capabilities=homealarm_state"},{"name":"state","type":"dropdown","values":"$values"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Hue","nl":"Hue","de":"Farbton","fr":"Teinte","it":"Tonalità","sv":"Nyans","no":"Fargetone","es":"Tonalidad","da":"Farvetone"},"min":0,"chartType":"stepLine","max":1,"decimals":2,"getable":true,"setable":true,"uiComponent":"color","$flow":{"actions":[{"id":"hue","title":{"en":"Set the hue","nl":"Verander kleurtint","de":"Den Farbton setzen","fr":"Définir la teinte","it":"Imposta la tonalità","sv":"Ställ in nyans","no":"Innstill fargetone","es":"Configurar la tonalidad","da":"Indstil farvetonen"},"hint":{"en":"Select a color from the hue scale, for example red (0°/360°), yellow (60°), or blue (180°).","nl":"Selecteer een kleurtint van de hue schaal, bijvoorbeeld rood (0°/360°), geel (60°), of blauw (180°)."},"args":[{"name":"hue","type":"range","min":0,"max":1,"step":0.01,"value":0,"label":"°","labelMultiplier":360,"labelDecimals":0}]},{"id":"color","title":{"en":"Set a color","nl":"Verander naar kleur","de":"Eine Farbe setzen","fr":"Définir la couleur","it":"Imposta un colore","sv":"Ställ in en färg","no":"Innstill fargetone","es":"Configurar un color","da":"Indstil en farve"},"args":[{"name":"color","type":"color"}]},{"id":"color_random","title":{"en":"Set a random color","nl":"Verander naar een willekeurige kleur","de":"Eine zufällige Farbe setzen","fr":"Définir une couleur aléatoire","it":"Imposta un colore casuale","sv":"Ställ in en slumpvis färg","no":"Innstill en tilfeldig farge","es":"Configurar un color aleatorio","da":"Indstil en tilfældig farve"}}]},"$speechExamples":{"en":["Turn all lights to blue","Turn My Light to pink"],"nl":["Zet alle lampen op blauw","Zet Mijn Licht op blauw"],"de":["Alle Lampen auf Blau schalten","Mein Licht auf Pink schalten"],"fr":["Mettre toutes les lumières en bleu","Mettre ma lumière en rose"],"it":["Imposta tutte le luci blu","Imposta la mia luce rosa"],"sv":["Gör alla lampor blå","Gör min lampa rosa"]},"$speech":{"en":{"group":{"changeColor":{"set":"(verb) && light && color","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"light","capabilities":["light_hue"]}},"color":{"set":"red || orange || yellow || green || cyan || magenta || pink || purple || blue"}},"element":{"light":{"type":"regex","value":"(all\\\\s|every\\\\s)?(?:the\\\\s)?(light(s)?|lamp(s)?)(to\\\\s)?"},"verb":{"type":"regex","value":"(switch|turn|set|put|change)"},"red":{"type":"string","value":"red"},"orange":{"type":"string","value":"orange"},"yellow":{"type":"string","value":"yellow"},"green":{"type":"string","value":"green"},"cyan":{"type":"string","value":"cyan"},"magenta":{"type":"string","value":"magenta"},"pink":{"type":"string","value":"pink"},"purple":{"type":"string","value":"purple"},"blue":{"type":"string","value":"blue"}}},"nl":{"element":{"light":{"type":"regex","value":"(?:(alle\\\\s|al\\\\sde\\\\s)|het\\\\s|de\\\\s|\\\\b)(licht|lamp|verlichting)(en)?"},"verb":{"type":"pos","value":{"pos":"VERB"}},"red":{"type":"string","value":"rood"},"orange":{"type":"string","value":"oranje"},"yellow":{"type":"string","value":"geel"},"green":{"type":"string","value":"groen"},"cyan":{"type":"string","value":"cyaan"},"magenta":{"type":"string","value":"magenta"},"pink":{"type":"string","value":"roze"},"purple":{"type":"string","value":"paars"},"blue":{"type":"string","value":"blauw"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"enum","title":{"en":"Light mode","nl":"Lamp modus","de":"Lichtmodus","fr":"Mode lumière","it":"Modalità luce","sv":"Lampläge","no":"Lysmodus","es":"Modo de la luz","da":"Lystilstand"},"desc":{"en":"Switch between Color or Temperature mode","nl":"Schakel tussen Kleur of Temperatuur modus","de":"Zwischen Farb- und Temperaturmodus wechseln","fr":"Passer entre les modes Couleur ou Température","it":"Passa tra le modalità Colore o Temperatura","sv":"Växla mellan Färg- och Temperatur-läge","no":"Veksle mellom farge- og temperaturmodus","es":"Cambia entre los modos Color y Temperatura","da":"Skift mellem Farve- eller Temperaturtilstand"},"values":[{"id":"color","title":{"en":"Color","nl":"Kleur","de":"Farbe","fr":"Couleur","it":"Colore","sv":"Färg","no":"Farge","es":"Color","da":"Farve"}},{"id":"temperature","title":{"en":"Temperature","nl":"Temperatuur","de":"Temperatur","fr":"Température","it":"Temperatura","sv":"Temperatur","no":"Temperatur","es":"Temperatura","da":"Temperatur"}}],"getable":true,"setable":true,"uiComponent":"color"}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Color Saturation","nl":"Kleurverzadiging","de":"Farbsättigung","fr":"Saturation de couleur","it":"Saturazione colore","sv":"Färggmättnad","no":"Fargemetning","es":"Saturación del color","da":"Farvemætning"},"min":0,"chartType":"stepLine","max":1,"decimals":2,"getable":true,"setable":true,"$flow":{"actions":[{"id":"saturation","title":{"en":"Set the saturation","nl":"Verander kleurverzadiging","de":"Die Sättigung setzen","fr":"Définir la saturation","it":"Imposta la saturazione","sv":"Ställ in mättnad","no":"Innstill metningen","es":"Configurar la saturación","da":"Indstil farvemætningen"},"args":[{"name":"saturation","type":"range","min":0,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]}]},"uiComponent":"color"}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Color Temperature","nl":"Kleurtemperatuur","de":"Farbtemperatur","fr":"Température de couleur","it":"Temperatura colore","sv":"Färgtemperatur","no":"Fargetemperatur","es":"Temperatura del color","da":"Farvetemperatur"},"min":0,"chartType":"stepLine","max":1,"decimals":2,"getable":true,"setable":true,"uiComponent":"color","$flow":{"actions":[{"id":"temperature","title":{"en":"Set a temperature","nl":"Verander naar temperatuur","de":"Eine Temperatur setzen","fr":"Définir une température","it":"Imposta una temperatura","sv":"Ställ in en temperatur","no":"Innstill en temperatur","es":"Configurar la temperatura","da":"Indstil en temperatur"},"args":[{"name":"temperature","type":"range","min":0,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}],"hint":{"en":"Adjusts the temperature of the light. A higher value means a warmer color.","nl":"Verander de temperatuur van de lamp. Een hogere waarde betekent een warmere kleur.","de":"Stelle die Temperatur der Farbe ein. Ein höherer Wert bedeutet eine wärmere Farbe.","fr":"Ajuste la température de la lumière. Une valeur plus élévée signifie une couleur plus chaude.","it":"Regola la temperatura della luce. Un valore più alto indica un colore più caldo.","sv":"Justerar temperaturen på ljuset. Ett högre värde innebär en varmare färg.","no":"Justerer lystemperaturen. En høyere verdi gir en varmere farge.","es":"Ajusta la temperatura de la luz. Cuanto más alto es el valor, más cálido es el color.","da":"Justerer lysets temperatur. En højere værdi betyder en varmere farve."}}]},"$speechExamples":{"en":["Turn all lights to warm white","Turn My Light to cool white"],"nl":["Zet alle lampen op warm wit","Zet Mijn Licht op koel wit"],"de":["Alle Lampen auf warmes Weiß schalten","Mein Licht auf kaltes Weiß schalten"],"fr":["Mettre toutes les lumières en blanc chaud","Mettre ma lumière en blanc froid"],"it":["Cambia tutte le luci in bianco caldo","Cambia la mia luce in bianco freddo"],"sv":["Gör alla lampor varmvita","Gör Min lampa till kallt vitt"]},"$speech":{"en":{"group":{"changeTemperature":{"set":"(verb) && light && temperature","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"light"}},"temperature":{"set":"cool_white || white || warm_white"}},"element":{"light":{"type":"regex","value":"(all\\\\s|every\\\\s)?(?:the\\\\s)?(light(s)?|lamp(s)?)(to\\\\s)?"},"verb":{"type":"regex","value":"(switch|turn|set|put|change)"},"cool_white":{"type":"string","value":["cool white","cold white"]},"warm_white":{"type":"string","value":"warm white"},"white":{"type":"string","value":"white"}}},"nl":{"element":{"light":{"type":"regex","value":"(?:(alle\\\\s|al\\\\sde\\\\s)|het\\\\s|de\\\\s|\\\\b)(licht|lamp|verlichting)(en)?"},"verb":{"type":"pos","value":{"pos":"VERB"}},"cool_white":{"type":"string","value":["koel wit","koud wit"]},"warm_white":{"type":"string","value":"warm wit"},"white":{"type":"string","value":["wit","normaal wit"]}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"enum","title":{"en":"Lock mode","nl":"Slot modus","de":"Schloss-Modus","fr":"Mode verrou","it":"Modalità serratura","sv":"Låsläge","no":"Låsemodus","es":"Modo de la cerradura","da":"Lås-tilstand"},"values":[{"id":"always_locked","title":{"en":"Always locked","nl":"Altijd op slot","de":"Immer verriegelt","fr":"Toujours verrouillé","it":"Sempre chiusa","sv":"Alltid låst","no":"Alltid låst","es":"Siempre cerrada","da":"Altid låst"}},{"id":"always_unlocked","title":{"en":"Always unlocked","nl":"Altijd open","de":"Immer entriegelt","fr":"Toujours déverrouillé","it":"Sempre aperta","sv":"Alltid olåst","no":"Alltid ulåst","es":"Siempre abierta","da":"Altid ulåst"}},{"id":"locked_until_unlock","title":{"en":"Locked until unlocked","nl":"Op slot tot geopend","de":"Verriegelt, bis entriegelt wird","fr":"Verrouillé jusqu\'à déverrouillé","it":"Chiusa finché non viene sbloccata","sv":"Låst tills upplåst","no":"Låst til opplåst","es":"Cerrada hasta que se abra","da":"Låst indtil ulåst"}}],"getable":true,"setable":true,"uiComponent":"picker","$flow":{"triggers":[{"id":"lock_mode_changed","title":{"en":"Lock mode has changed","nl":"Slot modus is veranderd","de":"Schloss-Modus hat sich geändert","fr":"Mode verrou a été modifié","it":"La modalità di blocco è cambiata","sv":"Låsläge har ändrats","no":"Låsemodusen er endret","es":"El modo de la cerradura ha cambiado","da":"Lås-tilstand er blevet ændret"},"args":[{"name":"mode","type":"dropdown","values":"$values"}]}],"conditions":[{"id":"lock_mode_is","title":{"en":"Lock mode !{{is|is not}}","nl":"Slot modus !{{is|is niet}}","de":"Schloss-Modus !{{ist|ist nicht}}","fr":"Mode verrou !{{est|n\'est pas}}","it":"La modalità di blocco !{{è|non è}}","sv":"Låsläge !{{är|är inte}}","no":"Låsemodus !{{er|er ikke}}","es":"El modo de la cerradura !{{está|no está}}","da":"Lås-tilstand !{{er|er ikke}}"},"args":[{"name":"mode","type":"dropdown","values":"$values"}]}],"actions":[{"id":"mode","title":{"en":"Set mode","nl":"Stel stand in","de":"Modus setzen","fr":"Définir le mode","it":"Imposta la modalità","sv":"Ställ in läge","no":"Innstill modus","es":"Configurar modo","da":"Indstil tilstand"},"args":[{"name":"mode","type":"dropdown","values":"$values"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Locked","nl":"Op slot","de":"Verriegelt","fr":"Verrouillé","it":"Chiusa","sv":"Låst","no":"Låst","es":"Cerrada","da":"Låst"},"desc":{"en":"True when the lock is locked","nl":"Geeft aan wanneer iets op slot is","de":"True, wenn das Schloss verriegelt ist","fr":"Vrai, si le verrou est verrouillé","it":"Vero quando la serratura è chiusa","sv":"Sant när låset är låst","no":"Sant når låsen er låst","es":"Verdadero cuando la cerradura está cerrada","da":"Sandt, når låsen er låst"},"insights":true,"insightsTitleTrue":{"en":"Locked","nl":"Vergrendeld","de":"Verriegelt","fr":"Verrouillé","it":"Chiusa","sv":"Låst","no":"Låst","es":"Cerrada","da":"Låst"},"insightsTitleFalse":{"en":"Unlocked","nl":"Ontgrendeld","de":"Entriegelt","fr":"Déverrouillé","it":"Aperta","sv":"Olåst","no":"Ulåst","es":"Abierta","da":"Ulåst"},"getable":true,"setable":true,"uiComponent":"toggle","$flow":{"triggers":[{"id":"locked_true","title":{"en":"A lock just locked","nl":"Een slot werd vergrendeld","de":"Ein Schloss wurde gerade verriegelt","fr":"Un verrou vient de se verrouiller","it":"Una serratura appena chiusa","sv":"Ett lås låstes precis","no":"En lås ble nettopp låst","es":"Se ha cerrado una cerradura","da":"En lås er lige blevet låst"}},{"id":"locked_false","title":{"en":"A lock just unlocked","nl":"Een slot werd ontgrendeld","de":"Ein Schloss wurde gerade entriegelt","fr":"Un verrou vient de se déverrouiller","it":"Una serratura appena aperta","sv":"Ett lås låstes precis upp","no":"En lås ble nettopp låst opp","es":"Se ha abierto una cerradura","da":"En lås er lige blevet låst op"}}],"conditions":[{"id":"locked","title":{"en":"A lock is !{{locked|unlocked}}","nl":"Een slot is !{{vergrendeld|ontgrendeld}}","de":"Ein Schloss ist !{{verriegelt|entriegelt}}","fr":"Un verrou est !{{verrouillé|déverrouillé}}","it":"Una serratura è !{{chiusa|aperta}}","sv":"Ett lås är !{{låst|olåst}}","no":"En lås er !{{låst|ulåst}}","es":"Una cerradura está !{{cerrada|abierta}}","da":"En lås er blevet !{{låst|låst op}}"}}],"actions":[{"id":"lock","highlight":true,"title":{"en":"Lock","nl":"Vergrendel","de":"Verriegeln","fr":"Verrouiller","it":"Chiudi","sv":"Lås","no":"Lås","es":"Cerrar","da":"Lås"}},{"id":"unlock","highlight":true,"title":{"en":"Unlock","nl":"Ontgrendel","de":"Entriegeln","fr":"Déverrouiller","it":"Apri","sv":"Lås upp","no":"Lås opp","es":"Abrir","da":"Lås op"}}]},"$speechExamples":{"en":["Did I lock My Lock?"],"nl":["Heb ik Mijn Slot op slot gedaan?"],"de":["Habe ich mein Schloss verriegelt?"],"fr":["Ai-je verrouillé mon verrou ?"],"it":["Ho chiuso la serratura?"],"sv":["Låste jag mitt lås?"]},"$speech":{"en":{"element":{"asking":{"type":"regex","value":"(did(?:\\\\sI|\\\\swe|\\\\syou)?|are|is|have(?:\\\\sI|\\\\swe|\\\\syou)?(?:\\\\sleave)?)"},"lockReg":{"type":"regex","value":"((un)?lock(ed)?(?:\\\\sthe\\\\s)?(door(s)?|window(s)?)?|(?:the\\\\s)?(door(s)?\\\\s|window(s)?\\\\s)?(un)?lock(ed)?)"},"lockedUnlocked":{"type":"regex","value":"(un)?lock(ed)?"}},"group":{"locks":{"set":"(asking) && lockReg","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"lock"}},"lock":{"set":"asking && lockedUnlocked","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"lock"}}}},"nl":{"asking":{"type":"regex","value":"\\\\b(is|staat|heb\\\\sik|hebben\\\\swe|gelaten)\\\\b"},"lockReg":{"type":"regex","value":"((op\\\\s|het\\\\s)?slot|open|dicht|(af)?gesloten|(ont|ver)grendeld?)"},"lockedUnlocked":{"type":"regex","value":"(?:(open|geopend)|dicht|gesloten|op\\\\sslot)"}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Battery","nl":"Accuniveau","de":"Batterie","fr":"Batterie","it":"Batteria","sv":"Batteri","no":"Batteri","es":"Batería","da":"Batteri"},"units":{"en":"%"},"insights":true,"min":0,"max":100,"desc":{"en":"Battery charge in percentage (%)","nl":"Accuniveau in procenten (%)","de":"Batteriestand in Prozent (%)","fr":"Pourcentage de charge de la batterie (%)","it":"Percentuale di carica della batteria (%)","sv":"Batteriladdning i procent (%)","no":"Batterilading i prosent (%)","es":"Carga de la batería en porcentaje (%)","da":"Batteriniveau i procent (%)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"battery","$flow":{"triggers":[{"id":"measure_battery_changed","title":{"en":"The battery level changed","nl":"Het accuniveau is veranderd","de":"Der Batteriestand hat sich geändert","fr":"Le niveau de la batterie a changé","it":"Il livello della batteria è cambiato","sv":"Batterinivån ändrades","no":"Batterinivået ble endret","es":"El nivel de la batería ha cambiado","da":"Batteriniveauet har ændret sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":99}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"CO","nl":"CO","de":"CO","fr":"CO","it":"CO","sv":"CO","no":"CO","da":"CO"},"units":{"en":"ppm"},"insights":true,"desc":{"en":"CO in Parts-per-million (ppm)","nl":"CO deeltjes per miljoen (ppm)","de":"CO in Anteile pro Million (ppm)","fr":"Niveau de CO en parts par million (ppm)","it":"Livello di CO in parti per milione (ppm)","sv":"CO i partiklar-per-miljon (ppm)","no":"CO i partikler per million (ppm)","es":"CO en partes por millón (ppm)","da":"CO i partikler-per-million (ppm)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_co_changed","title":{"en":"The CO-level changed","nl":"Het CO niveau is veranderd","de":"Der CO-Gehalt hat sich geändert","fr":"Le niveau de CO a changé","it":"Il livello di CO è cambiato","sv":"CO-nivån ändrades","no":"CO-nivået ble endret","es":"El nivel de CO ha cambiado","da":"CO-niveauet har ændret sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":20}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"CO2","nl":"CO2","de":"CO2","fr":"CO2","it":"CO2","sv":"CO2","no":"CO2","da":"CO2"},"units":{"en":"ppm"},"insights":true,"desc":{"en":"CO2 in Parts-per-million (ppm)","nl":"CO2 deeltjes per miljoen (ppm)","de":"CO2 in Anteile pro Million (ppm)","fr":"Niveau de CO2 en parts par million (ppm)","it":"Livello di CO2 in parti per milione (ppm)","sv":"CO2 i partiklar-per-miljon (ppm)","no":"CO2 i partikler per million (ppm)","es":"CO2 en partes por millón (ppm)","da":"CO2 i partikler-per-million (ppm)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_co2_changed","title":{"en":"The CO2-level changed","nl":"Het CO2 niveau is veranderd","de":"Der CO2-Gehalt hat sich geändert","fr":"Le niveau de CO2 a changé","it":"Il livello di CO2 è cambiato","sv":"CO2-nivån ändrades","no":"CO2-nivet ble endret","es":"El nivel de CO2 ha cambiado","da":"CO2-niveauet har ændret sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":20}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Current","nl":"Stroom","de":"Strom","fr":"Courant","it":"Corrente","sv":"Ström","no":"Strøm","es":"Corriente","da":"Strøm"},"units":{"en":"A"},"insights":true,"desc":{"en":"Electric current (A)","nl":"Elektrische stroom (A)","de":"Elektrischer Strom (A)","fr":"Courant électrique (A)","it":"Corrente elettrica (A)","sv":"Elektrisk ström (A)","no":"Elektrisk strøm (A)","es":"Corriente eléctrica (A)","da":"Elektrisk strøm (A)"},"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_current_changed","title":{"en":"The electric current changed","nl":"De elektrische stroom is veranderd","de":"Der elektrische Strom hat sich geändert","fr":"Le courant électrique a changé","it":"La corrente elettrica è cambiata","sv":"Den elektriska strömmen ändrades","no":"Den elektriska strømmen ble endret","es":"La corriente eléctrica ha cambiado","da":"Den elektriske strøm ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":7.5}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Gust Angle","nl":"Windstoot richting","de":"Böenrichtung","fr":"Direction d\'un coup de vent","it":"Angolo delle raffiche","sv":"Vindriktning","no":"Vindretning","es":"Dirección del aire","da":"Vindretning"},"units":{"en":"°"},"insights":true,"desc":{"en":"Gust Angle in Degrees (°)","nl":"Windstoot richting in Graden (°)","de":"Böenrichtung in Grad (°)","fr":"Direction du coup de vent en degrés (°)","it":"Angolo delle raffiche in gradi (°)","sv":"Vindriktning i grader (°)","no":"Vindretning i grader (°)","es":"Dirección del aire en grados (°)","da":"Vindretning i grader (°)"},"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_gust_angle_changed","title":{"en":"The gust angle changed","nl":"Windstoot richting is veranderd","de":"Die Böenrichtung hat sich geändert","fr":"Direction du coup de vent a changé","it":"L\'angolo delle raffiche è cambiato","sv":"Vindriktningen har ändrats","no":"Vindretningen er endret","es":"La dirección del aire ha cambiado","da":"Vindretningen skiftede"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":36}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Gust Strength","nl":"Windstoot kracht","de":"Böenstärke","fr":"Force d\'un coup de vent","it":"Intensità delle raffiche","sv":"Vindstyrka","no":"Vindstyrke","es":"Fuerza del aire","da":"Vindstyrke"},"units":{"en":"km/h"},"insights":true,"desc":{"en":"Gust Strength in Kilometer per hour (km/h)","nl":"Windstoot snelheid in Kilometer per uur (km/u)","de":"Böenstärke in Kilometer pro Stunde (km/h)","fr":"Force du coup de vent en kilomètres par heure (km/h)","it":"Intensità delle raffiche in chilometri orari (km/h)","sv":"Vindstyrka i kilometer per timme (km/h)","no":"Vindstyrke i kilometer per time (km/t)","es":"Fuerza del aire en kilómetros por hora (km/h)","da":"Vindstyrke i kilometer i timen (km/t)"},"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_gust_strength_changed","title":{"en":"The gust strength changed","nl":"De windstoot snelheid is veranderd","de":"Die Böenstärke hat sich geändert","fr":"La force du coup de vent a changé","it":"L\'intensità delle raffiche è cambiata","sv":"Vindstyrkan ändrades","no":"Vindstyrken ble endret","es":"La fuerza del aire ha cambiado","da":"Vindstyrken skiftede"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":15}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Humidity","nl":"Luchtvochtigheid","de":"Luftfeuchtigkeit","fr":"Humidité","it":"Umidità","sv":"Luftfuktighet","no":"Luftfuktighet","es":"Humedad","da":"Luftfugtighed"},"units":{"en":"%"},"insights":true,"desc":{"en":"Humidity in percent (%)","nl":"Relatieve luchtvochtigheid (%)","de":"Luftfeuchtigkeit in Prozent (%)","fr":"Humidité en pourcentage (%)","it":"Umidità in percentuale (%)","sv":"Luftfuktighet i procent (%)","no":"Luftfuktighet i prosent (%)","es":"Humedad en porcentaje (%)","da":"Luftfugtighed i procent (%)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_humidity_changed","title":{"en":"The humidity changed","nl":"De luchtvochtigheid is veranderd","de":"Die Luftfeuchtigkeit hat sich geändert","fr":"L\'humidité a changé","it":"L\'umidità è cambiata","sv":"Luftfuktigheten ändrades","no":"Luftfuktigheten ble endret","es":"La humedad ha cambiado","da":"Luftfugtigheden ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":35}]}]},"$speechExamples":{"en":["What is the average humidity at home?"],"nl":["Wat is de gemiddelde luchtvochtigheid thuis?"],"de":["Was ist die durchschnittliche Luftfeuchtigkeit zu Hause?"],"fr":["Quelle est l\'humidité moyenne à la maison ?"],"it":["Qual è l\'umidità media in casa?"],"sv":["Vad är den genomsnittliga luftfuktigheten hemma?"]},"$speech":{"en":{"element":{"humidityReg":{"type":"regex","value":"((what\\\\sis\\\\sthe\\\\s(current\\\\s)?)humidity|(is\\\\sit\\\\s|how\\\\s)?humid(\\\\sis\\\\sit)?)"}},"group":{"humidity":{"set":"humidityReg","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["measure_humidity"]}}}},"nl":{"element":{"humidityReg":{"type":"regex","value":"((wat\\\\sis\\\\sde\\\\s(huidige\\\\s)?)(lucht)vochtigheid|(is\\\\shet\\\\s|hoe\\\\s)?(vochtig|nat|droog)(\\\\sis\\\\het)?)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Luminance","nl":"Helderheid","de":"Helligkeit","fr":"Luminance","it":"Luminanza","sv":"Luminans","no":"Luminans","es":"Luminancia","da":"Luminans"},"units":{"en":"lx"},"insights":true,"desc":{"en":"Luminance in Lux (lx)","nl":"Helderheid in Lux (lx)","de":"Leuchtkraft in Lux (lx)","fr":"Luminance en Lux (lx)","it":"Luminanza in Lux (lx)","sv":"Luminans i Lux (lx)","no":"Luminans i Lux (lx)","es":"Luminancia en Lux (lx)","da":"Luminans i Lux (lx)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_luminance_changed","highlight":true,"title":{"en":"The luminance changed","nl":"De helderheid is veranderd","de":"Die Helligkeit hat sich geändert","fr":"La luminance a changé","it":"La luminanza è cambiata","sv":"Luminansen ändrades","no":"Luminansen ble endret","es":"La luminancia ha cambiado","da":"Luminansen ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":100}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Noise","nl":"Geluid","de":"Lärm","fr":"Bruit","it":"Rumore","sv":"Buller","no":"Støy","es":"Ruido"},"units":{"en":"dB"},"insights":true,"desc":{"en":"Noise in Decibel (db)","nl":"Geluid in Decibel (db)","de":"Lärm in Dezibel (dB)","fr":"Bruit en Decibel (dB)","it":"Rumore in Decibel (db)","sv":"Buller i decibel (db)","no":"Støy i decibel (db)","es":"Ruido en decibelios (dB)","da":"Støj i decibel (db)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_noise_changed","title":{"en":"The noise changed","nl":"Het geluidsniveau is veranderd","de":"Der Lärm hat sich geändert","fr":"Le bruit a changé","it":"Il rumore è cambiato","sv":"Bullret ändrades","no":"Støyen ble endret","es":"El ruido ha cambiado","da":"Støjniveauet ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":43}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"PM2.5","nl":"PM2.5","de":"PM2.5","fr":"PM2.5","it":"PM2.5","sv":"PM2.5","no":"PM2.5","es":"PM2,5"},"units":{"en":"μg/m³"},"insights":true,"desc":{"en":"Atmospheric Particulate Matter (μg/m³)","nl":"Deeltjesvormige luchtverontreiniging (μg/m³)","de":"Atmosphärischer Feinstaub (μg/m³)","fr":"Particules en suspension (μg/m³)","it":"Particolato atmosferico (μg/m³)","sv":"Atmosfäriskt partikelämne (μg/m³)","no":"Atmosfæriske partikler (μg/m³)","es":"Partículas atmosféricas (μg/m³)","da":"Atmosfæriske partikler (μg/m³)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_pm25_changed","title":{"en":"The PM2.5 value has changed","nl":"De PM2.5 waarde is veranderd","de":"Der PM2.5-Wert hat sich geändert","fr":"La valeur PM2.5 a changé","it":"Il valore di PM2.5 è cambiato","sv":"PM2.5-värdet har ändrats","no":"PM2.5-verdien er endret","es":"El valor de PM2,5 ha cambiado","da":"PM2.5-værdien har ændret sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":2}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Power","nl":"Vermogen","de":"Leistung","fr":"Puissance","it":"Potenza","sv":"Effekt","no":"Effekt","es":"Potencia","da":"Effekt"},"units":{"en":"W"},"insights":true,"desc":{"en":"Power in Watt (W)","nl":"Vermogen in Watt (W)","de":"Leistung in Watt (W)","fr":"Puissance  en Watt (W)","it":"Potenza in Watt (W)","sv":"Effekt i watt (W)","no":"Effekt i watt (W)","es":"Potencia en vatios (W)","da":"Effekt i Watt (W)"},"options":{"isApproximated":{"type":"boolean","default":false,"desc":{"en":"This flag is used to determine that the device itself has no power measurement functionality, but that the driver calculates the energy use."}}},"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_power_changed","highlight":true,"title":{"en":"The power changed","nl":"Het vermogen is veranderd","de":"Der Verbrauch hat sich gändert","fr":"L\'énergie a changé","it":"L\'energia è cambiata","sv":"Strömmen ändrades","no":"Strømmen ble endret","es":"La potencia ha cambiado","da":"Strømmen ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":7.5}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Pressure","nl":"Druk","de":"Druck","fr":"Pression","it":"Pressione","sv":"Tryck","no":"Trykk","es":"Presión","da":"Tryk"},"units":{"en":"mbar"},"insights":true,"desc":{"en":"Pressure in millibar (mbar)","nl":"Druk in millibar (mbar)","de":"Druck in Millibar (mbar)","fr":"Pression en millibar (mbar)","it":"Pressione in millibar (mbar)","sv":"Tryck i millibar (mbar)","no":"Trykk i millibar (mbar)","es":"Presión en milibares (mbar)","da":"Tryk i millibar (mbar)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_pressure_changed","title":{"en":"The pressure changed","nl":"De druk is veranderd","de":"Der Druck hat sich geändert","fr":"La pression a changé","it":"La pressione è cambiata","sv":"Trycket ändrades","no":"Trykket ble endret","es":"La presión ha cambiado","da":"Trykkey ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":1000}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Rain","nl":"Regen","de":"Niederschlag","fr":"Pluie","it":"Pioggia","sv":"Regn","no":"Regn","es":"Lluvia","da":"Regn"},"units":{"en":"mm"},"insights":true,"desc":{"en":"Rain in millimeter (mm)","nl":"Regen in millimeter (mm)","de":"Niederschlag in Millimeter (mm)","fr":"Pluie en millimètres (mm)","it":"Pioggia in millimetri (mm)","sv":"Regn i millimeter (mm)","no":"Regn i millimeter (mm)","es":"Lluvia en milímetros (mm)","da":"Regn i millimeter (mm)"},"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_rain_changed","title":{"en":"The rain changed","nl":"De regen is veranderd","de":"Der Niederschlag hat sich geändert","fr":"La pluie a changé","it":"La pioggia è cambiata","sv":"Regnet ändrades","no":"Regnet ble endret","es":"La lluvia ha cambiado","da":"Regnen ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":3}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Temperature","nl":"Temperatuur","de":"Temperatur","fr":"Température","it":"Temperatura","sv":"Temperatur","no":"Temperatur","es":"Temperatura","da":"Temperatur"},"units":{"en":"°C"},"insights":true,"desc":{"en":"Temperature in degrees Celsius (°C)","nl":"Temperatuur in graden Celsius (°C)","de":"Temperatur in Grad Celsius (°C)","fr":"Température en degrés Celsius (°C)","it":"Temperatura in gradi Celsius (°C)","sv":"Temperatur i grader Celsius (°C)","no":"Temperatur i grader Celsius (°C)","es":"Temperatura en grados Celsius (°C)","da":"Temperatur i Celsius (°C)"},"decimals":2,"chartType":"spline","getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_temperature_changed","highlight":true,"title":{"en":"The temperature changed","nl":"De temperatuur is veranderd","de":"Die Temperatur hat sich geändert","fr":"La température a changé","it":"La temperatura è cambiata","sv":"Temperaturen ändrades","no":"Temperaturen ble endret","es":"La temperatura ha cambiado","da":"Temperaturen ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":23.5}]}]},"$speechExamples":{"en":["What is the average temperature at home?"],"nl":["Wat is de gemiddelde temperatuur thuis?"],"de":["Was ist die durchschnittliche Temperatur zu Hause?"],"fr":["Quelle est la température moyenne à la maison ?"],"it":["Qual è la temperatura media in casa?"],"sv":["Vad är medeltemperaturen hemma?"]},"$speech":{"en":{"element":{"temperatureReg":{"type":"regex","value":"((what\\\\sis\\\\sthe\\\\s(current\\\\s)?)temperature|(is\\\\sit\\\\s|how\\\\s)?(warm|hot|cold|cool)(\\\\sis\\\\sit)?)"}},"group":{"temperature":{"set":"temperatureReg","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["measure_temperature"]}}}},"nl":{"element":{"temperatureReg":{"type":"regex","value":"((huidige\\\\s)?temperatuur|((warm|heet|koud|koel)|hoeveel\\\\sgraden)\\\\s(wordt?|gaat|zal|is)\\\\shet|het\\\\s(warm|heet|koud|koel))"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Ultraviolet","nl":"Ultraviolet","de":"Ultraviolett","fr":"Ultraviolet","it":"Ultravioletto","sv":"Ultraviolett","no":"Ultrafiolett","es":"Ultravioleta","da":"Ultraviolet"},"units":{"en":"UVI"},"desc":{"en":"Ultraviolet in UV index (UVI)","de":"Ultraviolett in UV-Index (UVI)","fr":"Ultraviolet en UV-Index (UVI)","it":"Ultravioletto nell\'indice UV (UVI)","sv":"Ultraviolett i UV-Index (UVI)","no":"Ultrafiolett på UV-indeks (UVI)","es":"Ultravioleta en índice UV (UV)","da":"Ultraviolet i UV-indeks (UV)"},"insights":true,"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_ultraviolet_changed","title":{"en":"The ultraviolet value changed","nl":"De ultraviolet waarde is veranderd","de":"Der Ultraviolett-Wert hat sich geändert","fr":"La valeur d\'ultraviolet a changé","it":"Il valore dell\'ultravioletto è cambiato","sv":"Ultraviolettvärdet ändrades","no":"Ultrafiolettverdien ble endret","es":"La radiación ultravioleta ha cambiado","da":"UV-værdien ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":100}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Voltage","nl":"Voltage","de":"Spannung","fr":"Voltage","it":"Voltaggio","sv":"Spänning","no":"Spenning","es":"Tensión","da":"Elektrisk spænding"},"units":{"en":"V"},"desc":{"en":"Voltage (V)","nl":"Voltage (V)","de":"Spannung (V)","fr":"Voltage (V)","it":"Voltaggio (V)","sv":"Spänning (V)","no":"Spenning (V)","es":"Tensión (V)","da":"Volt (V)"},"insights":true,"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_voltage_changed","title":{"en":"The voltage changed","nl":"Het voltage is veranderd","de":"Die Spannung hat sich geändert","fr":"Le voltage a changé","it":"Il voltaggio è cambiato","sv":"Spänningen ändrades","no":"Spenningen ble endret","es":"La tensión ha cambiado","da":"Den elektriske spænding ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":7.5}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Water flow","nl":"Waterdoorstroming","de":"Wasserfluss","fr":"Débit d\'eau","it":"Flusso d\'acqua","sv":"Vattenflöde","no":"Vannstrøm","es":"Caudal del agua","da":"Vandstrøm"},"units":{"en":"L/min"},"desc":{"en":"Water flow in Liters per minute (L/min)","nl":"Waterdoorstroming in Liters per minuut (L/min)","de":"Wasserfluss in Liter pro Minute (L/min)","fr":"Débit d\'eau en litres par minute (L/min)","it":"Flusso d\'acqua in litri al minuto (L/min)","sv":"Vattenflöde i liter per minut (L/min)","no":"Vannstrøm i liter per minutt (L/min)","es":"Caudal del agua en litros por minuto (L/min)","da":"Vandstrøm i liter per minut (l/min)"},"insights":true,"chartType":"stepLine","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_water_changed","title":{"en":"The waterflow has changed","nl":"De waterstroom veranderd","de":"Der Wasserfluss hat sich geändert","fr":"Le débit d\'eau a changé","it":"Il flusso d\'acqua è cambiato","sv":"Vattenflödet ändrades","no":"Vannstrømmen ble endret","es":"El caudal del agua ha cambiado","da":"Vandstrømmen har ændret sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":2}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Wind Angle","nl":"Windrichting","de":"Windrichtung","fr":"Angle du vent","it":"Angolo del vento","sv":"Vindvinkel","no":"Vindvinkel","es":"Ángulo del viento","da":"Vindvinkel"},"units":{"en":"°"},"desc":{"en":"Wind Angle in Degrees (°)","nl":"Windrichting in Graden (°)","de":"Windrichtung in Grad (°)","fr":"Angle du vent en degrés (°)","it":"Angolo del vento in gradi (°)","sv":"Vindvinkel i grader (°)","no":"Vindvinkel i grader (°)","es":"Ángulo del viento en grados (°)","da":"Vindvinkel i grader (°)"},"insights":true,"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_wind_angle_changed","title":{"en":"The wind angle changed","nl":"De windrichting is veranderd","de":"Die Windrichtung hat sich geändert","fr":"L\'angle du vent a changé","it":"L\'angolo del vento è cambiato","sv":"Vindvinkel ändrad","no":"Vindvinkel er endret","es":"El ángulo del viento ha cambiado","da":"Vindvinklen er skiftet"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":36}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Wind Strength","nl":"Windsnelheid","de":"Windstärke","fr":"Force du vent","it":"Forza del vento","sv":"Vindstyrka","no":"Vindstyrke","es":"Fuerza del viento","da":"Vindstyrke"},"units":{"en":"km/h"},"desc":{"en":"Wind Strength in Kilometer per hour (km/h)","nl":"Windsnelheid in Kilometer per uur (km/u)","de":"Windstärke in Kilometer pro Stunde (km/h)","fr":"Force du vent en kilomètres par heure (km/h)","it":"Forza del vento in chilometri orari (km/h)","sv":"Vindstyrka i kilometer per timme (km/h)","no":"Vindstyrke i kilometer per time (km/t)","es":"La fuerza del viento en kilómetros por hora (km/h)","da":"Vindstyrke i kilometer i timen (km/t)"},"insights":true,"chartType":"spline","decimals":2,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"measure_wind_strength_changed","title":{"en":"The wind strength changed","nl":"De windsnelheid is veranderd","de":"Die Windstärke hat sich geändert","fr":"La force du vent a changé","it":"La forza del vento è cambiata","sv":"Vindstyrkan ändrades","no":"Vindstyrken ble endret","es":"La fuerza del viento ha cambiado","da":"Vindstyrken ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":15}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Gas Meter","nl":"Gasmeter","de":"Gaszähler","fr":"Compteur de gaz","it":"Contatore del gas","sv":"Gasmätare","no":"Gassmåler","es":"Contador de gas","da":"Gasmåler"},"min":0,"decimals":2,"chartType":"spline","units":{"en":"m³"},"desc":{"en":"Gas usage in Cubic Meter (m³)","nl":"Gas gebruik in Kubieke Meter (m³)","de":"Gasverbrauch in Kubikmeter (m³)","fr":"Consommation de gaz en mètres cubes (m³)","it":"Consumo di gas in metri cubi (m³)","sv":"Gasanvändning i kubikmeter (m³)","no":"Gassforbruk i kubikkmeter (m³)","es":"Consumo de gas en metros cúbicos (m³)","da":"Gasforbrug i kubikmeter (m³)"},"insights":true,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"meter_gas_changed","title":{"en":"The gas meter changed","nl":"De gasmeter is veranderd","de":"Der Gaszähler hat sich geändert","fr":"Le compteur de gaz a changé","it":"Il contatore del gas è cambiato","sv":"Gasmätaren ändrades","no":"Gassmåleren ble endret","es":"El contador de gas ha cambiado","da":"Gasmåleren ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":25}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Energy","nl":"Energie","de":"Energie","fr":"Énergie","it":"Energia","sv":"Energi","no":"Energi","es":"Energía","da":"Energi"},"decimals":2,"units":{"en":"kWh"},"desc":{"en":"Energy usage in kilowatt-hour (kWh)","nl":"Energie verbruik in kilowattuur (kWh)","de":"Energieverbrauch in Kilowattstunde (kWh)","fr":"Consommation d\'énergie en kilowatt-heure (kWh)","it":"Consumo energetico in kilowattora (kWh)","sv":"Energianvändning i kilowattimmar (kWh)","no":"Energiforbruk i kilowattimer (kWh)","es":"Uso de energía en kilovatio hora (kWh)","da":"Energiforbrug i kilowattime (kWh)"},"chartType":"spline","options":{"isApproximated":{"type":"boolean","default":false,"desc":{"en":"This flag is used to determine that the device itself has no power measurement functionality, but that the driver calculates the energy use."}}},"insights":true,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"meter_power_changed","title":{"en":"The power meter changed","nl":"De stroommeter is veranderd","de":"Der Gesamtverbrauch hat sich geändert","fr":"Le compteur électrique a changé","it":"Il misuratore di potenza è cambiato","sv":"Elmätaren ändrades","no":"Strømmåleren ble endret","es":"El contador de energía ha cambiado","da":"Strømmåleren ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":25}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Rain Meter","nl":"Regenmeter","de":"Regenzähler","fr":"Compteur de pluie","it":"Misuratore di pioggia","sv":"Regnmätare","no":"Regnmåler","es":"Pluviómetro","da":"Regnmåler"},"units":{"en":"m³"},"chartType":"spline","desc":{"en":"Rain in Cubic Meter (m³)","nl":"Regen in Kubieke Meter (m³)","de":"Regen in Kubikmeter (m³)","fr":"Pluie en mètres cubes (m³)","it":"Pioggia in metri cubi (m³)","sv":"Regn i kubikmeter (m³)","no":"Regn i kubikkmeter (m³)","es":"Lluvia en metros cúbicos (m³)","da":"Regn i kubikmeter (m³)"},"decimals":2,"insights":true,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"meter_rain_changed","title":{"en":"The rain meter changed","nl":"De regenmeter is veranderd","de":"Der Regenzähler hat sich geändert","fr":"Le compteur de pluie a changé","it":"Il misuratore di pioggia è cambiato","sv":"Regnmätaren ändrades","no":"Regnmåleren ble endret","es":"El pluviómetro ha cambiado","da":"Regnmåleren ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":1}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Water Meter","nl":"Watermeter","de":"Wasserzähler","fr":"Compteur d\'eau","it":"Contatore dell\'acqua","sv":"Vattenmätare","no":"Vannmåler","es":"Contador de agua","da":"Vandmåler"},"decimals":3,"min":0,"units":{"en":"m³"},"chartType":"spline","desc":{"en":"Water usage in Cubic Meter (m³)","nl":"Water gebruik in Kubieke Meter (m³)","de":"Wasserverbrauch in Kubikmeter (m³)","fr":"Consommation d\'eau en mètres cubes (m³)","it":"Utilizzo di acqua in metri cubi (m³)","sv":"Vattenanvändning i kubikmeter (m³)","no":"Vannforbruk i kubikkmeter (m³)","es":"Consumo de agua en metros cúbicos (m³)","da":"Vandforbrug i kubikmeter (m³)"},"insights":true,"getable":true,"setable":false,"uiComponent":"sensor","$flow":{"triggers":[{"id":"meter_water_changed","title":{"en":"The water meter changed","nl":"De watermeter is veranderd","de":"Der Wasserzähler hat sich geändert","fr":"Le compteur d\'eau a changé","it":"Il contatore dell\'acqua è cambiato","sv":"Vattenmätaren ändrades","no":"Vannmåleren ble endret","es":"El contador de agua ha cambiado","da":"Vandmåleren ændrede sig"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":25}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Turned on","nl":"Aangezet","de":"Eingeschaltet","fr":"Activé","it":"Attivato","sv":"Aktiverad","no":"Slått på","es":"Encendido","da":"Tændt"},"getable":true,"setable":true,"insights":true,"insightsTitleTrue":{"en":"Turned on","nl":"Aangezet","de":"Eingeschaltet","fr":"Activé","it":"Attivato","sv":"Aktiverad","no":"Slått på","es":"Encendido","da":"Tændt"},"insightsTitleFalse":{"en":"Turned off","nl":"Uitgezet","de":"Ausgeschaltet","fr":"Désactivé","it":"Disattivato","sv":"Inaktiverad","no":"Slått av","es":"Apagado","da":"Slukket"},"options":{"setOnDim":{"type":"boolean","default":true,"desc":{"en":"When a device has both an `onoff` and `dim` capability, and Homey wants to turn the device on AND to a specific dim value, set this capability to `false` to prevent Homey from sending a set command.","de":"Wenn ein Gerät sowohl \'An/Aus\'- als auch \'Dimm\'-Fähigkeit hat und Homey das Gerät anschalten UND auf einen bestimmten Wert dimmen will, setze diese Fähigkeit auf \'false\', um Homey am Senden eines Setzen-Befehls zu hindern.","fr":"Quand un appareil peut `allumer/éteindre` et `estomper`, et que Homey veut allumer l\'appareil ET sur une valeur d\'estompage spécifique, définissez cette capacité sur `faux` pour empêcher Homey d\'envoyer une commande de définition.","it":"Quando un dispositivo può \'accendersi\' e \'attenuarsi\' e Homey desidera attivare il dispositivo E definire un valore specifico, imposta questa funzione su \'falso\' per impedire a Homey di inviare un comando di definizione.","sv":"När en enhet har både en `på/av`- och `dim`-funktionalitet och Homey vill slå på enheten OCH till ett specifikt dimvärde, sätt den här funktionen till `falsk` för att förhindra att Homey skickar ett inställningskommando.","no":"Når en enhet har både en `på/av`- og en `dempe`-funksjon og Homey vil slå på enheten OG sette dempingen til en spesifikk verdi, sett denne egenskapen til `usann` for å forhindre at Homey sender en innstillingskommando.","es":"Cuando un dispositivo tiene tanto la capacidad \'encender/apagar\' como la de \'intensidad de la luz\', y Homey quiere encender el dispositivo Y ajustar una intensidad concreta, configura esta capacidad como \'falso\' para evitar que Homey envíe un comando de configuración.","da":"Når en enhed har både en `tænd/sluk`- og en `dæmpe`-funktion, og Homey vil tænde for enheden OG indstille til en specifik dæmpeværdi, skal denne funktion indstilles til  `falsk` for at forhindre, at Homey sender en indstillingskommando."}},"greyout":{"type":"boolean","default":false,"desc":{"en":"When this capability is false, give a visual hint to greyout the device.","de":"wenn diese Fähigkeit \'false\' ist, gibt es einen visuellenen Hinweis, um das Gerät auszugrauen.","fr":"Quand cette capacité est fausse, donnez un indice visuel pour griser cet appareil.","it":"Quando questa funzione è impostata su falso, dai un indizio visivo per far apparire questo dispositivo in grigio.","sv":"När den här funktionen är falsk, ge en ett visuellt tips för att gråa ut enheten.","no":"Når denne egenskapen er usann, gi et visuelt tips for å vise enheten i grått.","es":"Cuando esta capacidad es falsa, da una indicación visual para poner en gris el dispositivo.","da":"Når denne funktion er falsk, skal du give et visuelt tip for at vise enheden i grå."}}},"uiComponent":"toggle","uiQuickAction":true,"$flow":{"triggers":[{"id":"onoff_true","highlight":true,"title":{"en":"Turned on","nl":"Aangezet ","de":"Angeschaltet","fr":"Activé","it":"Attivato","sv":"Aktiverad","no":"Slått på","es":"Encendido","da":"Tændt"}},{"id":"onoff_false","highlight":true,"title":{"en":"Turned off","nl":"Uitgezet","de":"Ausgeschaltet","fr":"Désactivé","it":"Disattivato","sv":"Inaktiverad","no":"Slått av","es":"Apagado","da":"Slukket"}}],"conditions":[{"id":"on","title":{"en":"Is turned !{{on|off}}","nl":"Is !{{aan|uit}}","de":"Ist !{{an|aus}}","fr":"Est !{{activé|désactivé}}","it":"È !{{attivato|disattivato}}","sv":"Är !{{på|av}}","no":"Er slått !{{på|av}}","es":"Está !{{encendido|apagado}}","da":"Er !{{tændt|slukket}}"}},{"id":"open","title":{"en":"Is !{{open|closed}}","nl":"Is !{{geopend|gesloten}}","de":"Ist !{{offen|geschlossen}}","fr":"Est !{{ouvert|fermé}}","it":"È !{{aperto|chiuso}}","sv":"Är !{{öppen|stängd}}","no":"Er !{{åpen|lukket}}","es":"Está !{{abierto|cerrado}}","da":"Er !{{åben|lukket}}"},"$filter":{"class":"windowcoverings|curtain|blinds|sunshade"}}],"actions":[{"id":"on","highlight":true,"title":{"en":"Turn on","nl":"Zet aan","de":"Einschalten","fr":"Activer","it":"Attiva","sv":"Aktivera","no":"Slå på","es":"Encender","da":"Tændt"}},{"id":"off","highlight":true,"title":{"en":"Turn off","nl":"Zet uit","de":"Ausschalten","fr":"Désactiver","it":"Disattiva","sv":"stäng av","no":"Slå av","es":"Apagar","da":"Slukket"}},{"id":"toggle","title":{"en":"Toggle on or off","nl":"Schakel aan of uit","de":"Ein- oder ausschalten","fr":"Alterner activé ou désactivé","it":"Attiva o disattiva","sv":"Växla på och av","no":"Veksle mellom på og av","es":"Encender o apagar","da":"Tænd eller sluk"}},{"id":"open","title":{"en":"Open curtain or blind","nl":"Open de gordijnen","de":"Vorhang oder Rollladen öffnen","fr":"Ouvrir rideau ou store","it":"Apri la tenda o le persiane","sv":"Öppna gardin eller persienn","no":"Åpne gardin eller persienne","es":"Abrir cortina o persiana","da":"Åbn gardiner eller persienner"},"$filter":{"class":"windowcoverings|curtain|blinds|sunshade"}},{"id":"close","title":{"en":"Close curtain or blind","nl":"Sluit de gordijnen","de":"Vorhang oder Rollladen schließen","fr":"Fermer rideau ou store","it":"Chiudi la tenda o le persiane","sv":"Stäng gardin eller persienn","no":"Lukk gardin eller persienne","es":"Cerrar cortina o persiana","da":"Luk gardiner eller persienner"},"$filter":{"class":"windowcoverings|curtain|blinds|sunshade"}}]},"$speechExamples":{"en":["Turn all lights on","Turn off all devices","Toggle all lights"],"nl":["Zet alle lichten aan","Zet alle apparaten uit"],"de":["Alle Lichter anschalten","Alle Geräte ausschalten","Alle Lichter an-/ausschalten"],"fr":["Allumer toutes les lumières","Désactiver tous les appareils","Alterner toutes les lumières"],"it":["Accendi tutte le luci","Spegni tutti i dispositivi","Attiva tutte le luci"],"sv":["Tänd alla lampor","Släck alla lampor","Växla alla lampor"]},"$speech":{"en":{"element":{"turn":{"type":"regex","value":"turn"},"turnOnOrOff":{"type":"regex","value":"(on)|off"}},"group":{"setDevices":{"set":"(turn) && turnOnOrOff","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["onoff"]}}}},"nl":{"element":{"turn":{"type":"regex","value":"zet"},"turnOnOrOff":{"type":"regex","value":"(aan)|uit"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Album","nl":"Album","de":"Album","fr":"Album","it":"Album","sv":"Album","no":"Album","es":"Álbum","da":"Album"},"type":"string","getable":true,"setable":false,"uiComponent":"media","$flow":{"triggers":[{"id":"speaker_album_changed","title":{"en":"The album changed","nl":"Het album is veranderd","de":"Das Album hat sich geändert","fr":"L\'album a été modifié","it":"L\'album è cambiato","sv":"Albumet ändrades","no":"Albumet ble endret","es":"El álbum ha cambiado","da":"Albummet skiftede"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":"Life Lessons"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Artist","nl":"Artiest","de":"Künstler","fr":"Artiste","it":"Artista","sv":"Artist","no":"Artist","es":"Artista","da":"Kunstner"},"type":"string","getable":true,"setable":false,"uiComponent":"media","$flow":{"triggers":[{"id":"speaker_artist_changed","title":{"en":"The artist changed","nl":"De artiest is veranderd","de":"Der Künstler hat sich verändert","fr":"L\'artiste a été modifié","it":"L\'artista è cambiato","sv":"Artisten ändrades","no":"Artisten ble endret","es":"El artista ha cambiado","da":"Kunstneren skiftede"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":"Johnny S."}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Duration","nl":"Lengte","de":"Länge","fr":"Durée","it":"Durata","sv":"Längd","no":"Varighet","es":"Duración","da":"Varighed"},"type":"number","getable":true,"setable":false,"uiComponent":"media"}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Next","nl":"Volgende","de":"Weiter","fr":"Suivant","it":"Successivo","sv":"Nästa","no":"Neste","es":"Siguiente","da":"Næste"},"type":"boolean","getable":false,"setable":true,"uiComponent":"media","$flow":{"actions":[{"id":"next","title":{"en":"Next","nl":"Volgende","de":"Weiter","fr":"Suivant","it":"Successivo","sv":"Nästa","no":"Neste","es":"Siguiente","da":"Næste"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Playing","nl":"Afspelen","de":"Abspielen","fr":"Lire","it":"In riproduzione","sv":"Spelas","no":"Avspilles","es":"Reproduciendo","da":"Spiller"},"type":"boolean","getable":true,"setable":true,"uiComponent":"media","uiQuickAction":true,"$flow":{"triggers":[{"id":"speaker_playing_true","title":{"en":"Started playing","nl":"Begint af te spelen","de":"Begann zu spielen","fr":"Lecture démarrée","it":"Riproduzione avviata","sv":"Började spela","no":"Startet spilling","es":"Reproducción iniciada","da":"Begyndte at spille"}},{"id":"speaker_playing_false","title":{"en":"Stopped playing","nl":"Gestopt met afspelen","de":"Hörte auf zu spielen","fr":"Lecture stoppée","it":"Riproduzione interrotta","sv":"Slutade spela","no":"Stanset spilling","es":"Reproducción detenida","da":"Stoppede med at spille"}}],"conditions":[{"id":"is_playing","title":{"en":"Is !{{|not}} playing","nl":"Is !{{|niet}} aan het afspelen","de":"Wird !{{|nicht}} abgespielt","fr":"!{{Est|N\'est pas}} en cours de lecture","it":"!{{È|Non è}} in riproduzione","sv":"Spelas !{{|inte}}","no":"Avspilles !{{|ikke}}","es":"!{{Se está|No se está}} reproduciendo","da":"Spiller !{{|ikke}}"}}],"actions":[{"id":"play","highlight":true,"title":{"en":"Play","nl":"Speel af","de":"Play","fr":"Lire","it":"Riproduci","sv":"Spela","no":"Spill av","es":"Reproducir","da":"Afspil"}},{"id":"pause","highlight":true,"title":{"en":"Pause","nl":"Pauzeer","de":"Pause","fr":"Pause","it":"Pausa","sv":"Pausa","no":"Pause","es":"Pausa","da":"Pause"}},{"id":"toggle_playing","title":{"en":"Toggle Play/Pause","nl":"Toggle Afspelen/Pauze","de":"Play/Pause umschalten","fr":"Alterner Lire/Pause","it":"Alterna riproduzione/pausa","sv":"Växla spela/pausa","no":"Veksle mellom avspilling/pause","es":"Reproducir/Pausar","da":"Skift mellem Afspil/Pause"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Position","nl":"Positie","de":"Positiv","fr":"Position","it":"Posizione","sv":"Position","no":"Posisjon","es":"Posición","da":"Position"},"type":"number","getable":true,"setable":false,"uiComponent":"media"}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Previous","nl":"Vorige","de":"Zurück","fr":"Précédent","it":"Precedente","sv":"Föregående","no":"Forrige","es":"Anterior","da":"Forrige"},"type":"boolean","getable":false,"setable":true,"uiComponent":"media","$flow":{"actions":[{"id":"prev","title":{"en":"Previous","nl":"Vorige","de":"Zurück","fr":"Précédent","it":"Precedente","sv":"Föregående","no":"Forrige","es":"Anterior","da":"Forrige"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Repeat","de":"Wiederholen","fr":"Répéter","it":"Ripeti","sv":"Upprepa","no":"Gjenta","es":"Repetir","da":"Gentag"},"type":"enum","values":[{"id":"none","title":{"en":"Off","nl":"Uit","de":"Aus","fr":"Arrêt","it":"Spegni","sv":"Av","no":"Av","es":"Apagar","da":"Fra"}},{"id":"track","title":{"en":"Repeat Track","de":"Titel wiederholen","fr":"Répéter le titre","it":"Ripeti traccia","sv":"Upprepa spår","no":"Gjenta spor","es":"Repetir pista","da":"Gentag spor"}},{"id":"playlist","title":{"en":"Repeat Playlist","de":"Playlist wiederholen","fr":"Répéter la playlist","it":"Ripeti playlist","sv":"Upprepa spellista","no":"Gjenta spilleliste","es":"Repetir lista de reproducción","da":"Gentag afspilningsliste"}}],"getable":true,"setable":true,"uiComponent":"media","$flow":{"actions":[{"id":"set_repeat","title":{"en":"Repeat","de":"Wiederholen","fr":"Répéter","it":"Ripeti","sv":"Upprepa","no":"Gjenta","es":"Repetir","da":"Gentag"},"args":[{"name":"value","type":"dropdown","values":"$values"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Shuffle","de":"Zufallswiedergabe","fr":"Aléatoire","it":"Ordine casuale","sv":"Blanda","no":"Tilfeldig rekkefølge","es":"Aleatorio","da":"Shuffle"},"type":"boolean","getable":true,"setable":true,"uiComponent":"media","$flow":{"actions":[{"id":"set_shuffle_true","title":{"en":"Shuffle on","nl":"Shuffle aan","de":"Zufallswiedergabe an","fr":"Aléatoire activée","it":"Ordine casuale attivato","sv":"Blanda på","no":"Tilfeldig rekkefølge på","es":"Orden aleatorio activado","da":"Shufflet slået til"}},{"id":"set_shuffle_false","title":{"en":"Shuffle off","nl":"Shuffle uit","de":"Zufallswiedergabe aus","fr":"Aléatoire désactivée","it":"Ordine casuale disattivato","sv":"Blanda av","no":"Tilfeldig rekkefølge av","es":"Orden aleatorio desactivado","da":"Shuffle slået fra"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Track","nl":"Track","de":"Track","fr":"Titre","it":"Traccia","sv":"Spår","no":"Spor","es":"Pista","da":"Spor"},"type":"string","getable":true,"setable":false,"uiComponent":"media","$flow":{"triggers":[{"id":"speaker_track_changed","title":{"en":"The track changed","nl":"De track is veranderd","de":"Der Track hat sich geändert","fr":"Le titre a été modifié","it":"La traccia è cambiata","sv":"Spåret ändrades","no":"Sporet ble endret","es":"La pista ha cambiado","da":"Sporet skiftede"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":"My World"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","min":4,"max":35,"title":{"en":"Target temperature","nl":"Ingestelde temperatuur","de":"Ziel-Temperatur","fr":"Température cible","it":"Temperatura nominale","sv":"Måltemperatur","no":"Ønsket temperatur","es":"Temperatura configurada","da":"Måltemperatur"},"units":{"en":"°C"},"chartType":"stepLine","decimals":2,"insights":true,"getable":true,"setable":true,"uiComponent":"thermostat","$flow":{"triggers":[{"id":"target_temperature_changed","title":{"en":"The target temperature changed","nl":"De ingestelde temperatuur is veranderd","de":"Die Ziel-Temperatur hat sich geändert","fr":"La température cible a été modifiée","it":"La temperatura nominale è cambiata","sv":"Måltemperaturen ändrades","no":"Ønsket temperatur ble endret","es":"La temperatura configurada ha cambiado","da":"Måltemperaturen blev ændret"},"tokens":[{"name":"$id","title":"$title","type":"$type","example":23.5}]}],"actions":[{"id":"target_temperature_set","highlight":true,"title":{"en":"Set the temperature","nl":"Stel de temperatuur in","de":"Die Temperatur setzen","fr":"Définir la température","it":"Imposta la temperatura","sv":"Ställ in temperaturen","no":"Innstill temperaturen","es":"Configurar la temperatura","da":"Indstil temperaturen"},"args":[{"name":"target_temperature","type":"range","min":5,"max":40,"step":0.5,"label":"°C","labelDecimals":1}]}]},"$speechExamples":{"en":["Set the temperature to 21 degrees"],"nl":["Zet de temperatuur op 21 graden"],"de":["Die Temperatur auf 21 Grad setzen"],"fr":["Définir la température sur 21 degrés"],"it":["Imposta la temperatura a 21 gradi"],"sv":["Ställ in temperaturen till 21 grader"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(set|change|adjust|turn)"},"thermostat":{"type":"regex","value":"(the\\\\s)?(temperature|thermostat|heating|heater)"},"degrees":{"type":"regex","value":"(to\\\\s)?(\\\\d+)\\\\sdegree(s)?"}},"group":{"setTemp":{"set":"(verb) && thermostat && degrees","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["target_temperature"]}}}},"nl":{"element":{"verb":{"type":"regex","value":"(zet|draai|doe)"},"thermostat":{"type":"regex","value":"(de\\\\s)?(temperatuur|thermostaat|verwarming|kachel)"},"degrees":{"type":"regex","value":"(?:op\\\\s|naar\\\\s)?(\\\\d+)\\\\sgraden"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"enum","title":{"en":"Thermostat mode","nl":"Thermostaat modus","de":"Thermostat-Modus","fr":"Mode thermostat","it":"Modalità termostato","sv":"Termostatläge","no":"Termostatmodus","es":"Modo del termostato","da":"Termostattilstand"},"desc":{"en":"Mode of the thermostat","nl":"Modus van de thermostaat","de":"Modus des Thermostates","fr":"Mode du thermostat","it":"Modalità del termostato","sv":"Läge för termostaten","no":"Modus for termostaten","es":"Modo del termostato","da":"Tilstand for termostat"},"values":[{"id":"auto","title":{"en":"Automatic","nl":"Automatisch","de":"Automatisch","fr":"Automatique","it":"Automatica","sv":"Automatiskt","no":"Automatisk","es":"Automático","da":"Automatisk"}},{"id":"heat","title":{"en":"Heat","nl":"Verhitten","de":"Heizen","fr":"Chauffer","it":"Calore","sv":"Värme","no":"Varme","es":"Calentar","da":"Opvarm"}},{"id":"cool","title":{"en":"Cool","nl":"Koelen","de":"Kühlen","fr":"Refroidir","it":"Raffreddamento","sv":"Kyla","no":"Avkjøle","es":"Enfriar","da":"Køl ned"}},{"id":"off","title":{"en":"Off","nl":"Uit","de":"Aus","fr":"Désactivé","it":"Disattivata","sv":"Av","no":"Av","es":"Desactivado","da":"Deaktiveret"}}],"getable":true,"setable":true,"uiComponent":"picker","$flow":{"triggers":[{"id":"thermostat_mode_changed","title":{"en":"Thermostat mode has changed","nl":"Thermostaat modus is veranderd","de":"Thermostat-Modus hat sich geändert","fr":"Mode thermostat a été modifié","it":"La modalità del termostato è cambiata","sv":"Termostatläge ändrades","no":"Termostatmodus ble endret","es":"El modo del termostato ha cambiado","da":"Termostattilstand er blevet ændret"},"args":[{"name":"thermostat_mode","type":"dropdown","values":"$values"}]}],"conditions":[{"id":"thermostat_mode_is","title":{"en":"Thermostat mode !{{is|is not}}","nl":"Thermostaat modus !{{is|is niet}}","de":"Thermostat-Modus !{{ist|ist nicht}}","fr":"Mode thermostat !{{est|n\'est pas}}","it":"La modalità del termostato !{{è|non è}}","sv":"Termostatläge !{{är|är inte}}","no":"Termostatmodus !{{er|er ikke}}","es":"El modo del termostato !{{está|no está}}","da":"Termostattilstand !{{er|er ikke}}"},"args":[{"name":"thermostat_mode","type":"dropdown","values":"$values"}]}],"actions":[{"id":"thermostat_mode_set","title":{"en":"Set the mode","nl":"Stel de modus in","de":"Modus setzen","fr":"Définir le mode","it":"Imposta la modalità","sv":"Ställ in läget","no":"Innstill modusen","es":"Configurar el modo","da":"Indstil tilstanden"},"args":[{"name":"thermostat_mode","type":"dropdown","values":"$values"}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"enum","title":{"en":"Vacuum cleaner state","de":"Staubsauger-Status","fr":"Etat de l\'aspirateur","it":"Stato dell\'aspirapolvere","sv":"Dammsugarstatus","no":"Støvsugerstatus","es":"Modo de la aspiradora","da":"Støvsugerstatus"},"values":[{"id":"cleaning","title":{"en":"Cleaning","nl":"Stofzuigen","de":"Staubsaugen","fr":"Aspirer","it":"Pulizia in corso","sv":"Städning","no":"Rengjøring","es":"Aspirando","da":"Støvsuger"}},{"id":"spot_cleaning","title":{"en":"Spot cleaning","nl":"Vlek schoonmaken","de":"Spot-Reinigung","fr":"Détacher","it":"Pulizia delle macchie","sv":"Områdesstädning","no":"Områderengjøring","es":"Aspirando un punto concreto","da":"Områdestøvsugning"}},{"id":"docked","title":{"en":"Docked","nl":"Op laadstation","de":"An Ladestation","fr":"Connecté à la base","it":"Connesso alla base","sv":"Dockad","no":"I ladestasjon","es":"En la estación de carga","da":"I ladestation"}},{"id":"charging","title":{"en":"Charging","nl":"Aan het opladen","de":"Lädt auf","fr":"En charge","it":"In carica","sv":"Laddar","no":"Lader","es":"Cargando","da":"Lader"}},{"id":"stopped","title":{"en":"Stopped","nl":"Gestopt","de":"Gestoppt","fr":"Arrêté","it":"Fermo","sv":"Stoppad","no":"Stanset","es":"Detenida","da":"Stoppet"}}],"getable":true,"setable":true,"uiComponent":"picker","$flow":{"triggers":[{"id":"vacuumcleaner_state_changed","title":{"en":"The state changed to...","nl":"De status is veranderd naar...","de":"Der Status hat sich geändert auf...","fr":"L\'état est passé à...","it":"Lo stato è cambiato in...","sv":"Status ändrad till...","no":"Status endret til ...","es":"El estado ha cambiado a...","da":"Status er ændret til..."},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"conditions":[{"id":"vacuumcleaner_state_is","title":{"en":"The vacuum cleaner !{{is|is not}}","nl":"De stofzuiger !{{is|is niet}}","de":"Der Staubsauger !{{ist|ist nicht}}","fr":"L\'aspirateur !{{est|n\'est pas}}","it":"L\'aspirapolvere !{{è|non è}}","sv":"Dammsugaren !{{är|är inte}}","no":"Støvsugeren !{{er|er ikke}}","es":"La aspiradora !{{está|no está}}","da":"Støvsugeren !{{er|er ikke}}"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"actions":[{"id":"clean","highlight":true,"title":{"en":"Start cleaning","nl":"Begin met stofzuigen","de":"Mit Staubsaugen anfangen","fr":"Commencer le nettoyage","it":"Avvia la pulizia","sv":"Börja städa","no":"Begynn rengjøring","es":"Comenzar a aspirar","da":"Begynd at støvsuge"}},{"id":"spot_clean","title":{"en":"Start spot cleaning","nl":"Begin met één plek stofzuigen","de":"Mit Spot-Reinigung anfangen","fr":"Commencer le détachage","it":"Avvia la pulizia delle macchie","sv":"Starta områdesstädning","no":"Begynn områderengjøring","es":"Comenzar a aspirar un punto concreto","da":"Begynd at områdestøvsuge"}},{"id":"dock","highlight":true,"title":{"en":"Return to dock","nl":"Terug naar laadstation","de":"Zu Ladestation zurückkehren","fr":"Retourner à la base","it":"Ritorna alla base","sv":"Återgå till docka","no":"Gå tilbake til ladestasjon","es":"Volver a la estación de carga","da":"Vend tilbage til ladestationen"}},{"id":"stop","highlight":true,"title":{"en":"Stop","nl":"Stop","de":"Stop","fr":"Arrêter","it":"Arresta","sv":"Stopp","no":"Stans","es":"Detener","da":"Stop"}}]},"$speechExamples":{"en":["Start the vacuum cleaner"],"nl":["Begin met stofzuigen"],"de":["Den Staubsauger starten"],"fr":["Commencer à aspirer"],"it":["Avvia l\'aspirapolvere"],"sv":["Starta dammsugaren"]},"$speech":{"en":{"element":{"vacuum":{"type":"regex","value":"((vacuum\\\\s)?cleaning|vacuum\\\\scleaner|vacuum|vacuuming)"},"cleaning":{"type":"regex","value":"(start|go|begin|on)"},"spot_cleaning":{"type":"regex","value":"(start\\\\s)?spot(\\\\scleaning)?"},"docked":{"type":"regex","value":"(finish|dock|docking\\\\sstation|charger?|charging(\\\\sstation)?|(return\\\\s)?home)"},"stopped":{"type":"regex","value":"(stop|end|finish|off)"}},"group":{"changeState":{"set":"vacuum && state","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["vacuumcleaner_state"]}},"state":{"set":"cleaning || spot_cleaning || docked || stopped"}}},"nl":{"element":{"vacuum":{"type":"regex","value":"((stof)?\\\\s?zuige(n|r)|schoon\\\\s?maken)"},"cleaning":{"type":"regex","value":"(start|ga|begin(\\\\smet)?|aan)"},"spot_cleaning":{"type":"regex","value":"(gericht|een\\\\splek|hier)(stof\\\\s?zuige(n|r)|schoon\\\\s?maken)"},"docked":{"type":"regex","value":"(klaar|beëindig(en)?|dock|docking\\\\sstation|(op)?lade(r|n)|(op)?laa(d|t)\\\\s?station|(terug\\\\s)(naar\\\\s)?huis)"},"stopped":{"type":"regex","value":"(stop|uit)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Volume down","nl":"Volume omlaag","de":"Lautstärke runter","fr":"Baisser le volume","it":"Volume abbassato","sv":"Volym ned","no":"Volum ned","es":"Bajar volumen","da":"Ned for lyden"},"type":"boolean","getable":false,"setable":true,"uiComponent":"button","$flow":{"actions":[{"id":"volume_down","highlight":true,"title":{"en":"Turn the volume down","nl":"Zet het geluid zachter","de":"Dreh die Lautstärke runter","fr":"Baisser le son","it":"Abbassa il volume","sv":"Sänk volymen","no":"Senk volumet","es":"Bajar el volumen","da":"Skru ned for lyden"}}]},"$speechExamples":{"en":["Turn up the volume of my speaker"],"nl":["Zet het volume van mijn speaker hoger"],"de":["Dreh die Lautstärke meines Lautsprechers hoch"],"fr":["Augmenter le volume de mon haut-parleur"],"it":["Alza il volume degli altoparlanti"],"sv":["Sänk volymen på min högtalare"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn)"},"down":{"type":"regex","value":"(quit(er)?|lower|(turn\\\\s)down|decrease)"}},"group":{"volumeUp":{"set":"(verb) && down","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["volume_up"]}}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"down":{"type":"regex","value":"(zachter|lager|verlaag|reduceer)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Volume muted","nl":"Gedempt volume","de":"Lautstärke stumm","fr":"Volume sourdine","it":"Volume disattivato","sv":"Volym inaktiverad","no":"Volym dempet","es":"Silenciar volumen","da":"Lyd slået fra"},"type":"boolean","getable":true,"setable":true,"uiComponent":"button","$flow":{"actions":[{"id":"volume_mute","title":{"en":"Mute the volume","nl":"Demp het geluid","de":"Lautstärke stummschalten","fr":"Mettre le volume en sourdine","it":"Disattiva il volume","sv":"Inaktivera volymen","no":"Demp volumet","es":"Silenciar el volumen","da":"Slå lyden fra"}},{"id":"volume_unmute","title":{"en":"Unmute the volume","nl":"Demp het geluid niet meer","de":"Lautstärke nicht mehr stummschalten","fr":"Réactiver le son","it":"Riattiva il volume","sv":"Aktivera volymen","no":"Opphev demping av volum","es":"Activar el volumen","da":"Slå lyden til"}}]},"$speechExamples":{"en":["Mute the volume of my amplifier"],"nl":["Demp het volume van mijn versterker"],"de":["Die Lautstärke meines Verstärkers stummschalten"],"fr":["Mettre le volume de mon amplificateur en sourdine"],"it":["Disattiva il volume del mio amplificatore"],"sv":["Inaktivera volymen på min förstärkare"]},"$speech":{"en":{"element":{"muteReg":{"type":"regex","value":"(?:(unmute|(the\\\\s)?volume\\\\s(back\\\\s)?on)|mute|silence|shut\\\\sup)"}},"group":{"mute":{"set":"muteReg","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["volume_mute"]}}}},"nl":{"muteReg":{"type":"regex","value":"(?:(weer\\\\saan|(het\\\\s)?volume\\\\s(aan|terug))|stil)"}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Set volume","de":"Lautstärke setzen","fr":"Définir le volume","it":"Imposta il volume","sv":"Ställ in volym","no":"Innstill volum","es":"Configurar volumen","da":"Indstil lydstyrken"},"type":"number","desc":{"en":"Volume","nl":"Volume","de":"Lautstärke","fr":"Volume","it":"Volume","sv":"Volym","no":"Volum","es":"Volumen","da":"Lydstyrke"},"chartType":"stepLine","min":0,"max":1,"decimals":2,"setable":true,"getable":true,"uiComponent":"slider","$flow":{"triggers":[{"id":"volume_set_changed","title":{"en":"Volume changed","nl":"Volume veranderd","de":"Lautstärke hat sich geändert","fr":"Volume a été modifié","it":"Volume modificato","sv":"Volymen ändrades","no":"Volumet ble endret","es":"El volumen ha cambiado","da":"Lydstyrke blev ændret"},"tokens":[{"name":"volume_set","type":"number","title":{"en":"Volume","nl":"Volume","de":"Lautstärke","fr":"Volume","it":"Volume","sv":"Volym","no":"Volum","es":"Volumen","da":"Lydstyrke"},"example":0.5}]}],"actions":[{"id":"volume_set","highlight":true,"title":{"en":"Set volume to","nl":"Zet volume naar","de":"Lautstärke setzen auf","fr":"Mettre le volume sur","it":"Imposta il volume al","sv":"Ställ in volymen på","no":"Sett volumet til","es":"Configurar el volumen a","da":"Indstil lydstyrke til"},"args":[{"name":"volume_set","type":"range","min":0,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]},{"id":"volume_set_relative","title":{"en":"Set relative volume","de":"Setze relative Lautsärke","nl":"Zet relatief volume"},"hint":{"en":"Change the volume with respect to the device\'s current volume.","de":"Ändere die Lautstärke unter Berücksichtigung der aktuellen Lautstärke des Gerätes.","nl":"Verhoog of verlaag het volume ten opzichte van het huidige volume van het apparaat."},"args":[{"name":"volume_set","type":"range","min":-1,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]}]},"$speechExamples":{"en":["Turn the volume of my speaker to 50%"],"nl":["Zet het volume van mijn speaker op 50%"],"de":["Drehe die Lautstärke meines Lautsprechers auf 50%"],"fr":["Mettre le volume de mon haut-parleur sur 50%"],"it":["Imposta il volume dei miei altoparlanti al 50%"],"sv":["Ställ in volymen på min högtalare till 50 %"],"no":["Sett høyttalervolumet til 50 %"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn)"},"volume":{"type":"regex","value":"(the\\\\s)?volume"},"toNumber":{"type":"regex","value":"(?:to\\\\s)?(\\\\d+)(\\\\spercent)?"}},"group":{"volumeTo":{"set":"(verb) && volume && toNumber","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["volume_set"]}}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"volume":{"type":"regex","value":"(het\\\\s)?volume"},"toNumber":{"type":"regex","value":"(?:naar\\\\s|op\\\\s)?(\\\\d+)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Volume up","nl":"Volume omhoog","de":"Lautstärke hoch","fr":"Augmenter le volume","it":"Volume alzato","sv":"Volym upp","no":"Volum opp","es":"Subir volumen","da":"Op for lyden"},"type":"boolean","getable":false,"setable":true,"uiComponent":"button","$flow":{"actions":[{"id":"volume_up","highlight":true,"title":{"en":"Turn the volume up","nl":"Zet het geluid harder","de":"Dreh die Lautstärke hoch","fr":"Augmenter le son","it":"Alza il volume","sv":"Vrid upp volymen","no":"Skru opp volumet","es":"Subir el volumen","da":"Skru op for lyden"}}]},"$speechExamples":{"en":["Turn the volume of my speaker up"],"nl":["Zet het volume van mijn speaker hoger"],"de":["Dreh die Lautstärke meines Lautsprechers hoch"],"fr":["Augmenter le volume de mon haut-parleur"],"it":["Alza il volume degli altoparlanti"],"sv":["Vrid upp volymen på min högtalare"]},"$speech":{"en":{"element":{"verb":{"type":"regex","value":"(switch|turn)"},"up":{"type":"regex","value":"(louder|raise|increase|boost|(turn\\\\s)?up)"}},"group":{"volumeUp":{"set":"(verb) && up","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"capabilities":["volume_up"]}}}},"nl":{"element":{"verb":{"type":"pos","value":{"pos":"VERB"}},"up":{"type":"regex","value":"(harder|hoger|verhoog)"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"boolean","title":{"en":"Closed","nl":"Gesloten","de":"Geschlossen","fr":"Fermé","it":"Chiuse","sv":"Stängd","no":"Lukket","es":"Cerrados","da":"Lukket"},"getable":true,"setable":true,"uiComponent":"toggle","$flow":{"triggers":[{"id":"windowcoverings_closed_true","title":{"en":"Closed","nl":"Gesloten","de":"Geschlossen","fr":"Fermé","it":"Chiuse","sv":"Stängd","no":"Lukket","es":"Cerrados","da":"Lukket"}},{"id":"windowcoverings_closed_false","title":{"en":"Opened","nl":"Geopend","de":"Offen","fr":"Ouvert","it":"Aperte","sv":"Öppen","no":"Åpen","es":"Abiertos","da":"Åben"}}],"conditions":[{"id":"closed","title":{"en":"Are !{{closed|opened}}","nl":"Zijn !{{gesloten|geopend}}","de":"Sind !{{geschlossen|offen}}","fr":"Sont !{{fermés|ouverts}}","it":"Sono !{{chiuse|aperte}}","sv":"Är !{{stängda|öppnade}}","no":"Er !{{lukket|åpen}}","es":"Están !{{cerrados|abiertos}}","da":"Er !{{lukket|åben}}"}}],"actions":[{"id":"close","highlight":true,"title":{"en":"Close","nl":"Sluiten","de":"Schließen","fr":"Fermer","it":"Chiudi","sv":"Stäng","no":"Lukk","es":"Cerrar","da":"Luk"}},{"id":"open","highlight":true,"title":{"en":"Open","nl":"Openen","de":"Öffnen","fr":"Ouvrir","it":"Apri","sv":"Öppna","no":"Åpne","es":"Abrir","da":"Åbn"}},{"id":"toggle","title":{"en":"Toggle open or closed","nl":"Schakel tussen geopend en gesloten","de":"Offen/Geschlossen umschalten","fr":"Alterner ouvert/fermé","it":"Alterna aperte/chiuse","sv":"Växla mellan öppen eller stängd","no":"Veksle mellom åpen og lukket","es":"Abrir o cerrar","da":"Skift mellem åben og lukket"}}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"type":"number","title":{"en":"Position","nl":"Positie","de":"Position","fr":"Position","it":"Posizione","sv":"Position","no":"Posisjon","es":"Posición","da":"Position"},"desc":{"en":"Set the position of window coverings. 0% is closed, 100% is open","de":"Die Position der Jalousien setzen. 0% ist geschlossen, 100% ist offen","fr":"Définir la position des stores. 0% est fermé, 100% est ouvert","it":"Imposta la posizione delle tapparelle. 0% è chiuse, 100% è aperte","sv":"Ställ in positionen för fönsterskydden. 0 % är stängd, 100 % är öppet","no":"Innstill vindusbeskyttelsens posisjon. 0 % er lukket, 100 % er åpen","es":"Configura la posición de los cobertores de ventanas. 0 % es \'cerrados\', 100 % es \'abiertos\'","da":"Indstil positionen af dækket for vinduet. 0% er lukket, 100% er åben"},"chartType":"stepLine","min":0,"max":1,"decimals":2,"units":{"en":"%"},"getable":true,"setable":true,"uiComponent":"slider","$flow":{"triggers":[{"id":"windowcoverings_set_changed","title":{"en":"Position changed","nl":"Positie veranderd","de":"Position hat sich geändert","fr":"Position a été modifiée","it":"Posizione cambiata","sv":"Position ändrad","no":"Posisjon endret","es":"La posición ha cambiado","da":"Position ændret"},"tokens":[{"name":"windowcoverings_set","type":"number","title":{"en":"Position","nl":"Positie","de":"Position","fr":"Position","it":"Posizione","sv":"Position","no":"Posisjon","es":"Posición","da":"Position"},"example":0.5}]}],"actions":[{"id":"windowcoverings_set","highlight":true,"title":{"en":"Set the position to","nl":"Zet de positie naar","de":"Setze die Position auf","fr":"Mettre la position sur","it":"Imposta la posizione su","sv":"Ställ in positionen till","no":"Innstill posisjonen til","es":"Configurar la posición como","da":"Indstil positionen til"},"hint":{"en":"Change the position to open (100%), closed (0%), or a value in between.","nl":"Verander de positie naar open (100%), gesloten (0%), of een een waarde daartussen."},"args":[{"name":"windowcoverings_set","type":"range","min":0,"max":1,"step":0.01,"value":0.5,"label":"%","labelMultiplier":100,"labelDecimals":0}]}]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Window Coverings State","nl":"Raambekleding Status","de":"Jalousien-Status","fr":"Etat des stores","it":"Stato delle tapparelle","sv":"Status för fönsterskydd","no":"Status for vindusbeskyttelse","es":"Estado de los cobertores de ventanas","da":"Status for vinduesdække"},"type":"enum","values":[{"id":"up","title":{"en":"Up","nl":"Omhoog","de":"Oben","fr":"Haut","it":"Alzate","sv":"Upp","no":"Opp","es":"Arriba","da":"Oppe"}},{"id":"idle","title":{"en":"Idle","nl":"Stil","de":"Inaktiv","fr":"Inactif","it":"Socchiuse","sv":"Inaktiv","no":"Ikke aktiv","es":"Inactivos","da":"Inaktiv"}},{"id":"down","title":{"en":"Down","nl":"Omlaag","de":"Unten","fr":"Bas","it":"Abbassate","sv":"Ned","no":"Ned","es":"Abajo","da":"Nede"}}],"getable":true,"setable":true,"uiComponent":"ternary","$flow":{"triggers":[{"id":"windowcoverings_state_changed","highlight":true,"title":{"en":"The state changed","nl":"De status is veranderd","de":"Der Status hat sich geändert","fr":"L\'état a été modifié","it":"Lo stato è cambiato","sv":"Status ändrades","no":"Status ble endret","es":"El estado ha cambiado","da":"Status blev ændret"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"conditions":[{"id":"windowcoverings_state_is","title":{"en":"The state is !{{|not}}","nl":"De status is !{{|niet}}","de":"Der Status ist !{{|nicht}}","fr":"L\'état !{{est|n\' est pas}}","it":"Lo stato !{{è|non è}}","sv":"Status är !{{|inte}}","no":"Status er !{{|ikke}}","es":"El estado !{{|no}} es","da":"Status er !{{|ikke}}"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}],"actions":[{"id":"set_windowcoverings_state","highlight":true,"title":{"en":"Set state","nl":"Zet de status","de":"Status setzen","fr":"Définir l\'état","it":"Imposta lo stato","sv":"Ställ in status","no":"Innstill status","es":"Configurar estado","da":"Indstil status"},"args":[{"name":"state","type":"dropdown","values":"$values"}]}]},"$speechExamples":{"en":["Open the window coverings"],"nl":["Open de raamverduistering"],"de":["Die Jalousien öffnen"],"fr":["Ouvrir les stores"],"it":["Apri le tapparelle"],"sv":["Öppna fönsterskydden"]},"$speech":{"en":{"element":{"windowCoverings":{"type":"regex","value":"(window coverings|(window )?covers|(roller )?shades|solar screen|blinds|curtains|shutters|drapes)"},"up":{"type":"regex","value":"(up|open|raise)"},"down":{"type":"regex","value":"(down|close|draw|lower)"},"idle":{"type":"regex","value":"(stop|idle)"},"percent":{"type":"regex","value":"(?:to\\\\s)?(\\\\d+)\\\\spercent"}},"group":{"setWindowCoveringsPercentage":{"set":"windowCoverings && percent","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"windowcoverings|curtain|blinds|sunshade","capabilities":"windowcoverings_set|dim"}},"setWindowCoveringsState":{"set":"windowCoverings && windowCoveringsState","ordered":false,"allowDisconnect":true,"capturingGroup":true,"devices":{"class":"windowcoverings|curtain|blinds|sunshade","capabilities":"windowcoverings_state|windowcoverings_closed|onoff"}},"windowCoveringsState":{"set":"up || idle || down"}}},"nl":{"element":{"windowCoverings":{"type":"regex","value":"(zonnescherm|zonneschermen|zonwering|zonnewering|luifel|raambekleding|raambedekking|lamellen|jaloezien|luxaflex|rolluik|rolluiken)"},"up":{"type":"regex","value":"(omhoog|verhoog)"},"down":{"type":"regex","value":"(omlaag|verlaag)"},"idle":{"type":"regex","value":"(stop)"},"percent":{"type":"regex","value":"(?:to\\\\s)?(\\\\d+)\\\\sprocent"}}}}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Window Coverings Tilt Down","de":"Jalousien nach unten gekippt","fr":"Stores baissés","it":"Tapparelle abbassate","sv":"Fönsterskydd nedfällda","no":"Vindusbeskyttelser lukket","es":"Cobertores de ventanas inclinados hacia abajo","da":"Vinduesdække nedad"},"type":"boolean","getable":false,"setable":true,"uiComponent":"button"}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Window Coverings Tilt Set","de":"Jalousien-Kippstellung setzen","fr":"Définir l\'inclinaison des stores","it":"Imposta l\'inclinazione delle tapparelle","sv":"Ställ in lutning för fönsterskydd","no":"Innstill helning for vindusbeskyttelse","es":"Configurar la inclinación de los cobertores de ventanas","da":"Indstil hældning for vinduesdække"},"type":"number","min":0,"max":1,"decimals":2,"getable":true,"setable":true,"uiComponent":"slider"}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Window Coverings Tilt Up","de":"Jalousien nach oben gekippt","fr":"Stores levés","it":"Tapparelle alzate","sv":"Fönsterskydd öppna","no":"Vindusbeskyttelser åpne","es":"Cobertores de ventanas inclinados hacia arriba","da":"Vinduesdække opad"},"type":"boolean","getable":false,"setable":true,"uiComponent":"button"}');
  }, function(e) {
    e.exports = JSON.parse('["amplifier","blinds","button","camera","coffeemachine","curtain","doorbell","fan","garagedoor","heater","homealarm","kettle","light","lock","other","remote","sensor","socket","speaker","solarpanel","sunshade","thermostat","tv","vacuumcleaner","windowcoverings"]');
  }, function(e, t, r) {
    const a = {
      './amplifier.json': 146, './blinds.json': 147, './button.json': 148, './camera.json': 149, './coffeemachine.json': 150, './curtain.json': 151, './doorbell.json': 152, './fan.json': 153, './garagedoor.json': 154, './heater.json': 155, './homealarm.json': 156, './kettle.json': 157, './light.json': 158, './lock.json': 159, './other.json': 160, './relay.json': 161, './remote.json': 162, './sensor.json': 163, './socket.json': 164, './solarpanel.json': 165, './speaker.json': 166, './sunshade.json': 167, './thermostat.json': 168, './tv.json': 169, './vacuumcleaner.json': 170, './windowcoverings.json': 171,
    }; function n(e) {
      const t = i(e); return r(t);
    } function i(e) {
      if (!r.o(a, e)) {
        const t = new Error(`Cannot find module '${e}'`); throw t.code = 'MODULE_NOT_FOUND', t;
      } return a[e];
    }n.keys = function() {
      return Object.keys(a);
    }, n.resolve = i, e.exports = n, n.id = 145;
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Amplifier","nl":"Versterker","de":"Verstärker","fr":"Amplificateur","it":"Amplificatore","sv":"Förstärkare","no":"Forsterker","es":"Amplificador","da":"Forstærker"},"description":{"en":"Use this device class for audio amplifier devices.","de":"Nutze diese Geräteklasse für Audio-Verstärker-Geräte.","fr":"Utilisez cette classe d\'appareil pour les appareils amplificateurs audio.","it":"Utilizza questa classe di dispositivi per i dispositivi che amplificano l\'audio.","sv":"Använd den här enhetsklassne ljudförstärkarenheter.","no":"Bruk denne enhetsklassen for lydforsterkerenheter.","es":"Utiliza esta clase de dispositivo para los amplificadores de audio.","da":"Brug denne enhedsklasse til lydforstærkerenheder"},"$speechAlternatives":{"en":["amp","amplifier","tuner"],"nl":["versterker"],"fr":["amp","amplificateur","tuner"],"it":["amp","amplificatore","sintonizzatore"],"sv":["förstärkare","tuner"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Blinds","nl":"Jaloezieën & Lamellen","de":"Rolladen","fr":"Stores","it":"Tapparelle","sv":"Persienner","no":"Persienner","es":"Persianas","da":"Persienner"},"description":{"en":"Use this device class for blinds, both horizontal and vertical.","de":"Nutze diese Geräteklasse für Rolladen, sowohl horizontal als auch vertikal.","fr":"Utilisez cette classe d\'appareil pour les stores, horizontaux et verticaux.","it":"Utilizza questa classe di dispositivi per le tapparelle, orizzontali e verticali.","sv":"Använd den här enhetsklassen för persienner, både horisontella och vertikala.","no":"Bruk denne enhetsklassen for persienner, både horisontale og vertikale.","es":"Utiliza esta clase de dispositivo para las persianas, tanto horizontales como verticales.","da":"Brug denne enhedsklasse til persienner, både vandrette og lodrette"},"$speechAlternatives":{"en":["blinds"],"nl":["lamellen","jaloezien","luxaflex","rolluik","rolluiken"],"fr":["stores","volets"],"it":["tapparelle"],"sv":["persienner"],"no":["persienner"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Button","nl":"Knop","de":"Taste","fr":"Bouton","it":"Pulsante","sv":"Knapp","no":"Knapp","es":"Botón","da":"Knap"},"description":{"en":"Use this device class for buttons, such as a remote.","de":"Nutze diese Geräteklasse für Tasten wie z. B. eine Fernbedienung.","fr":"Utilisez cette classe d\'appareil pour les boutons, comme pour une télécommande.","it":"Utilizza questa classe di dispositivi per i pulsanti, come ad esempio un telecomando.","sv":"Använd den här enhetsklassen för knappar, som en fjärrkontroll.","no":"Bruk denne enhetsklassen for knapper, f.eks. en fjernkontroll.","es":"Utiliza esta clase de dispositivo para los botones, p. ej., mandos a distancia.","da":"Brug denne enhedsklasse til knapper, f-eks. en fjernbetjening"}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Camera","nl":"Camera","de":"Kamera","fr":"Caméra","it":"Telecamera","sv":"Kamera","no":"Kamera","es":"Cámara","da":"Kamera"},"description":{"en":"Security camera","nl":"Beveiligingscamera","de":"Überwachungskamera","fr":"Caméra de sécurité","it":"Telecamera di sicurezza","sv":"Säkerhetskamera","no":"Sikkehetskamera","es":"Cámara de seguridad","da":"Overvågningskamera"}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Coffee machine","nl":"Koffiemachine","de":"Kaffemaschine","fr":"Machine à café","it":"Macchina per il caffè","sv":"Kaffemaskin","no":"Kaffemaskin","es":"Máquina de café","da":"Kaffemaskine"},"description":{"en":"Use this device class for coffee machines.","de":"Nutze diese Geräteklasse für Kaffeemaschinen.","fr":"Utilisez cette classe d\'appareil pour les machines à café.","it":"Utilizza questa classe di dispositivi per le macchine per il caffè.","sv":"Använd den här enhetsklassen för kaffemaskiner.","no":"Bruk denne enhetsklassen for kaffemaskiner.","es":"Utiliza esta clase de dispositivo para las máquinas de café.","da":"Brug denne enhedsklasse til kaffemaskiner."},"$speechAlternatives":{"en":["coffee machine","coffee machines"],"nl":["koffiezetapparaat","koffiemachine","koffie zet apparaat"],"fr":["machine à café","cafetière"],"it":["macchina per il caffè","caffettiera"],"sv":["kaffemaskin","kaffemaskiner","kaffebryggare"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Curtains","nl":"Gordijnen","de":"Vorhänge","fr":"Rideaux","it":"Tende","sv":"Gardiner","no":"Gardiner","es":"Cortinas","da":"Gardiner"},"description":{"en":"Use this device class for curtains.","de":"Nutze diese Geräteklasse für Vorhänge.","fr":"Utilisez cette classe d\'appareil pour les rideaux.","it":"Utilizza questa classe di dispositivi per le tende.","sv":"Använd den här enheten för gardiner.","no":"Bruk denne enheten for gardiner.","es":"Utiliza esta clase de dispositivo para las cortinas.","da":"Brug denne enhedsklasse til gardiner."},"$speechAlternatives":{"en":["curtains","curtain"],"nl":["gordijnen","gordijn"],"fr":["rideaux","rideau"],"it":["tende","tenda"],"sv":["gardiner","gardin"],"no":["gardiner","gardin"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Doorbell","nl":"Deurbel","de":"Türklingel","fr":"Sonnette","it":"Campanello","sv":"Dörrklocka","no":"Dørklokke","es":"Timbre","da":"Dørklokke"},"description":{"en":"Use this device class for doorbells, usually together with the `button` capability.","de":"Nutze diese Geräteklasse für Türklingeln - normalerweise zusammen mit der \'button\'-Fähigkeit.","fr":"Utilisez cette classe d\'appareil pour les sonnettes, habituellement avec la capacité de `bouton`.","it":"Utilizza questa classe di dispositivi per i campanelli, di solito insieme alla funzione `pulsante`.","sv":"Använd den här enhetsklassen för dörrklockor, oftast tillsammans med `knapp`-funktionen.","es":"Utiliza esta clase de dispositivo para los timbres, generalmente junto con la capacidad \'botón\'.","da":"Brug denne enhedsklasse til dørklokker, normalt sammen med `knap`-funktionen.","no":"Bruk denne enhetsklassen for dørklokker, ofte sammen med `knapp`-funksjonen."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Fan","nl":"Ventilator","de":"Ventilator","fr":"Ventilateur","it":"Ventilatore","sv":"Fläkt","no":"Vifte","es":"Ventilador","da":"Ventilator"},"description":{"en":"Use this device class for fans that cool your home.","de":"Nutze diese Geräteklasse für Ventilatoren, die dein Heim kühlen.","fr":"Utilisez cette classe d\'appareil pour les ventilateurs qui refroidissent votre maison.","it":"Utilizza questa classe di dispositivi per i ventilatori che rinfrescano la tua casa.","sv":"Använd den här enhetsklassen för fläktar som kyler ned hemmet.","no":"Bruk denne enhetsklassen for vifter som avkjøler hjemmet ditt.","es":"Utiliza esta clase de dispositivo para los ventiladores que enfrían la casa.","da":"Brug denne enhedsklasse til ventilatorer, der køler dit hjem ned."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Garage door","nl":"Garagedeur","de":"Garagentor","fr":"Porte de garage","it":"Porta del garage","sv":"Garagedörr","no":"Garasjedør","es":"Puerta de garaje","da":"Garageport"},"description":{"en":"Use this device class for garage doors, usually together with the `garagedoor_closed` capability."},"$speechAlternatives":{"en":["garagedoor","garage door","garage door"],"nl":["garagedeur","garage deur","garage deuren"],"fr":["porte de garage"],"it":["porta del garage","basculante"],"sv":["garagedörr","garageport"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Heater","nl":"Heater","de":"Heizung","fr":"Radiateur","it":"Termosifone","sv":"Element","no":"Varmeelement","es":"Calefactor","da":"Varmeapparat"},"description":{"en":"Use this device class for heaters, that warm your home.","de":"Nutze diese Geräteklasse für Heizungen, die dein Heim wärmen.","fr":"Utilisez cette classe d\'appareil pour les radiateurs qui chauffent votre maison.","it":"Utilizza questa classe di dispositivi per i termosifoni, che riscaldano la tua casa.","sv":"Använd den här enhetsklassen för element, som värmer upp hemmet.","no":"Bruk denne enhetsklassen for varmeelement som varmer opp hjemmet ditt.","es":"Utiliza esta clase de dispositivo para los calefactores que calientan tu casa.","da":"Brug denne enhedsklasse til varmeapparater, som opvarmer dit hjem."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Home Security","nl":"Huisbeveiliging","de":"Heim-Sicherheit","fr":"Sécurité de la maison","it":"Sicurezza della casa","sv":"Hemsäkerhet","no":"Hjemmesikkerhet","es":"Seguridad de la casa","da":"Hjemmesikkerhed"},"description":{"en":"Use this device class for home alarm systems.","de":"Nutze diese Geräteklasse für Heim-Alarm-Systeme.","fr":"Utilisez cette classe d\'appareil pour les systèmes d\'alarme de maison.","it":"Utilizza questa classe di dispositivi per i sistemi di allarme di casa.","sv":"Använd den här enhetsklassen för hemlarmsystem.","no":"Bruk denne enhetsklassen for hjemmealarmsystemer.","es":"Utiliza esta clase de dispositivo para los sistemas de alarmas de la casa.","da":"Brug denne enhedsklasse til alarmsystemer til hjemmet."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Kettle","nl":"Waterkoker","de":"Wasserkocher","fr":"Bouilloire","it":"Bollitore","sv":"Vattenkokare","no":"Vannkoker","es":"Hervidor","da":"Elkedel"},"description":{"en":"Use this device class for kettle devices, that can heat water.","de":"Nutze diese Geräteklasse für Kessel-Geräte, die Wasser kochen können.","fr":"Utilisez cette classe d\'appareil pour les bouilloires qui peuvent faire chauffer de l\'eau.","it":"Utilizza questa classe di dispositivi per i bollitori, che possono riscaldare l\'acqua.","sv":"Använd den här enhetsklassen för vattenkokare, som kan värma vatten.","no":"Bruk denne enhetsklassen for vannkokere som kan varme opp vann.","es":"Utiliza esta clase de dispositivo para los hervidores que calientan agua.","da":"Brug denne enhedsklasse til elkedelenheder, der kan opvarme vand."},"$speechAlternatives":{"en":["kettle","kettles","water cooker"],"nl":["ketel","waterkoker"],"fr":["bouilloire"],"it":["bollitore","bollitori"],"sv":["vattenkokare"],"no":["vannkoker"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Light","nl":"Lamp","de":"Lampe","fr":"Lampe","it":"Lampada","sv":"Lampa","no":"Lampe","es":"Lámpara","da":"Lys"},"description":{"en":"Use this device class for lights, usually together with the `onoff`, `dim` and `light_*` capabilities.","de":"Nutze diese Geräteklasse für Lampen - normalerweise zusammen mit den \'onoff\'-, \'dim\'- und \'light_*\'-Fähigkeiten.","fr":"Utilisez cette classe d\'appareil pou les lampes, habituellement avec les capacités `allumer/éteindre`, `estomper` et `lumière_*`.","it":"Utilizza questa classe di dispositivi per le lampade, generalmente insieme alle funzioni \'acceso/spento\', \'regolatore luminosità\' e \'luce_*\'.","sv":"Använd den här enhetsklassen för lampor, oftast tillsammans med funktionerna `av/på`, `dim` och `lys upp_*`.","no":"Bruk denne enhetsklassen for lamper, ofte sammen med funksjonene `av/på`, `demp` och `lys_*`.","es":"Utiliza esta clase de dispositivo para las luces, generalmente junto con las capacidades de \'encendido/apagado\', \'intensidad de la luz\', y \'luz_*\'.","da":"Brug denne enhedsklasse til lys, normalt sammen med `tændtslukket`, `dæmp` og `lys_*` funktionerne."},"$speechAlternatives":{"en":["light","lights","lamp"],"nl":["licht","lichten","lamp","verlichting"],"fr":["lumière","lampe","lampes"],"it":["luce","luci","lampada"],"sv":["ljus","lampor","lampa"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Lock","nl":"Slot","de":"Schloss","fr":"Verrou","it":"Serratura","sv":"Lås","no":"Lås","es":"Cerradura","da":"Lås"},"description":{"en":"Use this device class for lock devices, usually together with the `locked` and `lock_mode` capabilities.","de":"Nutze diese Geräteklasse für Schloss-Geräte - normalerweise zusammen mit den \'locked\'- und \'lock_mode\'-Fähigkeiten.","fr":"Utilisez cette classe d\'appareil pour les appareils verrou, généralement avec les capacités `verrouillé` et `mode_verrou`.","it":"Utilizza questa classe di dispositivi per le serrature, generalmente insieme alle funzioni \'chiusa\' e \'modalità_serratura\'.","sv":"Använd den här enhetsklassen för att låsa enheter, oftast tillsammans med funktionerna `låst` och `låsläge`.","no":"Bruk denne enhetsklassen for låseenheter, ofte sammen med funksjonene `låst` og `låst_modus`.","es":"Utiliza esta clase de dispositivo para las cerraduras, generalmente junto con las capacidades de \'cerrado\' y \'modo_cerradura\'.","da":"Brug denne enhedsklasse til låseenheder, normalt sammen med `låst` and `låst_tilstand` funktionerne."},"$speechAlternatives":{"en":["lock","locks"],"nl":["slot","sloten"],"fr":["verrou","verrous"],"it":["serratura","serrature"],"sv":["lås"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Other","nl":"Overig","de":"Andere","fr":"Autre","it":"Altro","sv":"Övrigt","no":"Annet","es":"Otro","da":"Andet"},"description":{"en":"Use this device class for devices that do not fit any other device class.","de":"Nutze diese Geräteklasse für Geräte, die nicht in andere Geräteklassen passen.","fr":"Utilisez cette classe d\'appareil pour les appareils qui ne correspondent à aucune autre classe d\'appareil.","it":"Utilizza questa classe di dispositivi per gli apparecchi che non appartengono a nessun\'altra classe di dispositivi.","sv":"Använd den här enhetsklassen för enheter som inte passar i någon annan enhetsklass.","no":"Bruk denne enhetsklassen for enheter som ikke passer inn i noen annen enhetsklasse.","es":"Utiliza esta clase de dispositivo para los dispositivos que no se ajusten a ninguna otra clase.","da":"Brug denne enhedsklasse til enheder, der ikke hører til i andre enhedsklasse."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Relay","nl":"Relais","de":"Relais","fr":"Relais","it":"Relé","sv":"Relä","no":"Relé","es":"Relé","da":"Relæ"},"description":{"en":"Use this device class for relays, which are connected to another device.","de":"Nutze diese Geräteklasse für Relais, die mit anderen Geräten verbunden sind.","fr":"Utilisez cette classe d\'appareil pour les relais qui sont connectés à d\'autres appareils.","it":"Utilizza questa classe di dispositivi per i relé, che sono connessi ad un altro dispositivo.","sv":"Använd den här enhetsklassen för relän, som är kopplade till en annan enhet","no":"Bruk denne enhetsklassen for reléer som er koblet til en annen enhet.","es":"Utiliza esta clase de dispositivo para los relés conectados a otros dispositivos.","da":"Brug denne enhedsklasse til relæer, som er koblet til en anden enhed."},"virtualTitle":{"en":"What\'s connected?","nl":"Wat is er verbonden?","de":"Was ist verbunden?","fr":"Qu\'est-ce qui est connecté ?","it":"Cos\'è connesso?","sv":"Relä","no":"Hva er tilkoblet?","es":"¿Qué está conectado?","da":"Hvad er tilkoblet?"},"allowedVirtual":["garagedoor","sunshade","blinds","curtain"],"$speechAlternatives":{"en":["relay","relays"],"nl":["relais"],"fr":["relais"],"it":["relé"],"sv":["relä","relän"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Remote","nl":"Afstandsbediening","de":"Fernbedienung","fr":"Télécommande","it":"Telecomando","sv":"Fjärrkontroll","no":"Fjernkontroll","es":"Mando a distancia","da":"Fjernbetjening"},"description":{"en":"Use this device class for (TV/Sunblind/Keyfob etc.) remotes.","de":"Nutze diese Geräteklasse für (TV/Jalousien/Schlüsselanhänger etc.)-Fernbedienungen.","fr":"Utilisez cette classe d\'appareil pour les télécommandes (TV/Stores/Porte-clés, etc.).","it":"Utilizza questa classe di dispositivi per i telecomandi (TV/Tapparelle/Portachiavi, ecc.).","sv":"Använd den här enheten för fjärrkontroller för (TV/Markis/Nyckellås mm.).","no":"Bruk denne enheten for fjernkontroller for (TV/markise/smartnøkkel m.m.).","es":"Utiliza esta clase de dispositivo para los mandos a distancia (TV/persianas/llaves electrónicas, etc.","da":"Brug denne enhedsklasse til fjernbetjeninger (til TV/markise/smartnøgle osv.)"}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Sensor","nl":"Sensor","de":"Sensor","fr":"Capteur","it":"Sensore","sv":"Sensor","no":"Sensor","es":"Sensor","da":"Sensor"},"description":{"en":"Use this device class for sensors, e.g. a contact or motion sensor.","de":"Nutze diese Geräteklasse für Sensoren, z. B. ein Kontakt- oder Bewegungssensor.","fr":"Utilisez cette classe d\'appareil pour les capteurs, par ex. un capteur de contact ou de mouvement.","it":"Utilizza questa classe di dispositivi per i sensori, ad es. un sensore di contatto o di movimento.","sv":"Använd den här enhetsklassen för sensorer, t.ex. en kontakt eller rörelsesensor.","no":"Bruk denne enhetsklassen for sensorer, f.eks. en kontakt- eller bevegelsessensor.","es":"Utiliza esta clase de dispositivo para los sensores; p. ej., sensores de contacto  o movimiento.","da":"Brug denne enhedsklasse til sensorer, f-eks en kontakt- eller bevægelsessensor."},"$speechAlternatives":{"en":["sensor","sensors"],"nl":["sensor","sensors","sensoren"],"fr":["capteur","capteurs"],"it":["sensore","sensori"],"sv":["sensor","sensorer"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Wall Plug","nl":"Schakeldoos","de":"Steckdose","fr":"Prise murale","it":"Presa a muro","sv":"Väggkontakt","no":"Veggkontakt","es":"Enchufe de pared","da":"Stikkontakt"},"description":{"en":"Use this device class for sockets (built-in or plug-in socket switches). When adding the `choose_slave` pair template, the user is presented a `What\'s plugged in?` question.","de":"Nutze diese Geräteklasse für Sockel (eingebaut oder zum zum Einstecken). Wenn das \'choose_slave\'-Paar-Template hinzugefügt wird, wird dem Benutzer eine \'Was ist eingesteckt?\'-Frage gestellt.","fr":"Utilisez cette classe d\'appareil pour les prises (intégrées ou prises d\'interrupteurs). En ajoutant le modèle d\'appairage `choisir_esclave`, il est demandé à l\'utilisteur `Qu\'est-ce qui est connecté ?`.","it":"Utilizza questa classe di dispositivi per le prese (prese integrate o interruttori). Aggiungendo il modello di abbinamento `scegli_secondario`, viene chiesto all\'utente \'Cosa è collegato?`.","sv":"Använd den här enhetsklassen för uttag (inbyggda eller stickkontakter). När parmallen `välj_slav` får användaren en `Vad är inkopplat?`-fråga.","no":"Bruk denne enhetsklassen for kontakter (innebygde eller eksterne kontaktenheter). Når sammenkoblingsmalen `velg_slave` legges til, får brukeren et `Hva er koblet til?`-spørsmål.","es":"Utiliza esta clase de dispositivo para los enchufes (interruptores de enchufe integrados o enchufables). Al añadir la plantilla de emparejamiento \'elegir_subordinado\', al usuario se le pregunta \'¿Qué está enchufado?\'.","da":"Brug denne enhedsklasse til kontakter (indbyggede eller eksterne kontaktenheder). Når `vælg_slave` parskabelonen tilføjes, bliver brugeren præsenteret for et `Hvad er sat til?` spørgsmål."},"virtualTitle":{"en":"What\'s plugged in?","nl":"Wat is er ingeplugd?","de":"Was ist eingesteckt?","fr":"Qu\'est-ce qui est connecté ?","it":"Cosa è collegato?","sv":"Vad är inkopplat?","no":"Hva er koblet til?","es":"¿Qué está enchufado?","da":"Hvad er sat til?"},"allowedVirtual":["light","fan","heater","coffeemachine","kettle","tv","solarpanel"],"$speechAlternatives":{"en":["socket","plug"],"nl":["schakelaar","wandschakelaar","stekkerdoos","tussenstekker"],"fr":["prise"],"it":["presa","spina"],"sv":["uttag","kontakt"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Solar Panel","nl":"Zonnepaneel","sv":"Solpanel","no":"Solpanel","es":"Panel solar","da":"Solpanel"},"description":{"en":"Use this device class for solar panels.","es":"Utiliza esta clase de dispositivo para los paneles solares.","da":"Brug denne enhedsklasse til solpaneler."}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Speaker","nl":"Speaker","de":"Lautsprecher","fr":"Haut-parleur","it":"Altoparlante","sv":"Högtalare","no":"Høyttaler","es":"Altavoz","da":"Højttaler"},"description":{"en":"Use this device class for devices that can play music, usually together with the `speaker_*` capabilities.","de":"Nutze diese Geräteklasse für Geräte, die Musik spielen können - normalerweise zusammen mit den \'speaker_*\'-Fähigkeiten.","fr":"Utilisez cette classe d\'appareil pour les appareils qui peuvent jouer de la musique, généralement avec la capacité `haut-parleur_*`.","it":"Utilizza questa classe di dispositivi per i dispositivi che possono riprodurre musica, generalmente insieme alla funzione \'altoparlante_*\'.","sv":"Använd den här enhetsklassen för enheter som kan spela musik, oftast tilsammans med funktionerna `högtalare_*`.","no":"Bruk denne enhetsklassen for enheter som kan spille musikk, ofte sammen med funksjonen `høyttaler_*`.","es":"Utiliza esta clase de dispositivo para los aparatos capaces de reproducir música, generalmente junto con las capacidades \'altavoz_*\'.","da":"Brug denne enhedsklasse til enheder, der kan afspille musik, normalt sammen med `højttaler_*` funktionerne."},"$speechAlternatives":{"en":["speaker","speakers"],"nl":["speaker","speakers"],"fr":["haut-parleur","haut-parleurs"],"it":["altoparlante","casse"],"sv":["högtalare"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Sunshade","nl":"Zonnescherm","de":"Sonnenschirm","fr":"Auvent","it":"Parasole","sv":"Markis","no":"Markise","es":"Toldo","da":"Markise"},"description":{"en":"Use this device class for sunshades (window coverings against the sun).","de":"Nutze diese Geräteklasse für Jalousien (Fenster-Abdeckungen gegen die Sonne).","fr":"Utilisez cette classe d\'appareil pour les auvents (couvrant les fenêtres contre le soleil).","it":"Utilizza questa classe di dispositivi per gli scuretti (che riparano le finestre dal sole).","sv":"Använd den här enhetsklassen för markiser (fönsterskydd mot solen).","no":"Bruk denne enhetsklassen for markiser (vindusbeskyttelse mot solen).","es":"Utiliza esta clase de dispositivo para los toldos (para proteger las ventanas del sol).","da":"Brug denne enhedsklasse til markiser (vinduesdække mod solen)."},"$speechAlternatives":{"en":["sunscreen","sunscreens","sunshade","sunshades"],"nl":["zonnescherm","zonneschermen","luifel","zonwering","zonnewering"],"fr":["auvent","parasol","pare-soleil"],"it":["parasole","scuretti"],"sv":["solskydd","markis","markiser"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Thermostat","nl":"Thermostaat","de":"Thermostat","fr":"Thermostat","it":"Termostato","sv":"Termostat","no":"Termostat","es":"Termostato","da":"Termostat"},"description":{"en":"Use this device class for thermostats, either for the entire home or radiator-mounted, usually together with the `measure_temperature`, `target_temperature` and `thermostat_mode` capabilities.","de":"Nutze diese Geräteklasse für Thermostate, entweder für das gesamte Heim oder pro Heizung - normalerweise zusammen mit den \'measure_temperature\'-, \'target_temperature\'- und \'thermostat_mode\'-Fähigkeiten.","fr":"Utilisez cette classe d\'appareil pour les thermostats, soit pour toute la maison soit montés sur radiateurs, généralemebnt avec les capacités `mesure_température`, `température_cible` et `mode_thermostat`.","it":"Utilizza questa classe di dispositivi per i termostati, sia quelli per l\'intera casa che quelli montati sul radiatore, solitamente insieme alle funzionalità `misura_temperatura`,`temperatura_nominale` e `modalità_termostato`.","sv":"Använd den här enhetsklassen för termostater, antingen för hela hemmet eller elementmonterade, oftast tillsammans med funktionerna `mät_temperatur`, `måltemperatur` och `termostatläge`.","no":"Bruk denne enhetsklassen for termostater, enten for hele hjemmet eller monterte på varmeelement, ofte sammen med funksjonene `måling_temperatur`, `ønsket_temperatur` og `termostat_modus`.","es":"Utiliza esta clase de dispositivo para los termostatos, tanto los de toda la casa como los montados en los radiadores, generalmente junto con las capacidades \'medir_temperatura\', \'temperatura_configurada\' y \'modo_termostato\'.","da":"Brug denne enhedsklasse til termostater, enten til hele hjemmet eller på radiatorer, normalt sammen med `mål_temperatur`, `måltemperatur` og `termostattilstand` funktionerne."},"$speechAlternatives":{"en":["thermostat","thermostats"],"nl":["thermostaat","thermostaten"],"it":["termostato","termostati"],"sv":["termostat","termostater"],"no":["termostat","termostater"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"TV","nl":"TV","de":"TV","fr":"TV","it":"TV","sv":"TV","no":"TV","es":"TV","da":"TV"},"description":{"en":"Use this device class for TVs.","de":"Nutze diese Geräteklasse für TVs","fr":"Utilisez cette classe d\'appareil pour les TV","it":"Utilizza questa classe di dispositivi per i televisori.","sv":"Använd den här enhetsklassen för TV-apparater.","no":"Bruk denne enhetsklassen for TV-apparater.","es":"Utiliza esta clase de dispositivo para los televisores.","da":"Brug denne enhedsklasse til TV-apparater."},"$speechAlternatives":{"en":["tvs","televisions","television","tv"],"nl":["tv\'s","televisie","televisies","tv"],"fr":["tv","télévisions","téléviseurs"],"it":["tv","televisione","televisore"],"sv":["tv-apparater","television","tv"],"no":["tv-apparater","fjernsyn","tv"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Vacuum Cleaner","nl":"Stofzuiger","de":"Staubsauger","fr":"Aspirateur","it":"Aspirapolvere","sv":"Dammsugare","no":"Støvsuger","es":"Aspiradora","da":"Støvsuger"},"description":{"en":"Use this device class for vacuum cleaners, usually together with the `vacuumcleaner_state` capability.","de":"Nutze diese Geräteklasse für Staubsauger - normalerweise zusammen mit der \'vacuumcleaner_state\'-Fähigkeit.","fr":"Utilisez cette classe d\'appareil pour les aspirateurs, habituellement avec la capacité `état_aspirateur`.","it":"Utilizza questa classe di dispositivi per gli aspirapolvere, generalmente insieme alla funzionalità \'stato_aspirapolvere\'.","sv":"Använd den här enhetsklassen för dammsugare, oftast tillsammans med funktionen `dammsugar_status`.","no":"Bruk denne enhetsklassen for støvsugere, ofte sammen med funksjonen `støvsuger_status`.","es":"Utiliza esta clase de dispositivo para las aspiradoras, generalmente junto con la capacidad \'estado_aspiradora\'.","da":"Brug denne enhedsklasse til støvsugere, normalt sammen med `støvsugertilstand` funktionen."},"$speechAlternatives":{"en":["vacuum cleaner","vacuumcleaner","vacuum cleaners","vacuumcleaners","vacuum"],"nl":["stofzuiger","stofzuigers"],"fr":["aspirateur","aspirateurs"],"it":["aspirapolvere","aspiratore"],"sv":["dammsugare"],"no":["støvsuger"]}}');
  }, function(e) {
    e.exports = JSON.parse('{"title":{"en":"Window Coverings","nl":"Raambekleding","de":"Fenster-Abdeckungen","fr":"Couverture de fenêtre","it":"Rivestimenti per finestre","sv":"Fönsterskydd","no":"Vindusbeskyttelse","es":"Cobertores de ventanas","da":"Vinduesdække"},"description":{"en":"Use this device class for window coverings, when the `curtains`, `blinds` or `sunshade` device class doesn\'t apply.","de":"Nutze diese Geräteklasse für Fenster-Abdeckungen, wenn \'Vorhänge\'-, \'Rolladen\'- oder \'Jalousien\'-Geräteklassen nicht zutreffen.","fr":"Utilisez cette classe d\'appareil pour les couvertures de fenêtre, lorsque la classe d\'appareil `rideaux`, `stores` ou `auvent` ne s\'applique pas.","it":"Utilizza questa classe di dispositivi per i rivestimenti per finestre, quando non rientrano nelle classi \'tende\', \'tapparelle\' o \'scuretti\'.","sv":"Använd den här enhetsklassen för fönsterskydd när enhetsklasserna `gardiner`, `persienner` eller `solskydd` inte gäller.","no":"Bruk denne enhetsklassen for vindusbeskyttelse som ikke dekkes av enhetsklassene `gardiner`, `persienner` eller `solbeskyttelse`.","es":"Utiliza esta clase de dispositivo para los cobertores de ventanas que no entren en las clases \'cortinas\', \'persianas\' o \'toldo\'.","da":"Brug denne enhedsklasse til vinduesdække, når enhedsklasserne `gardiner`, `persienner` og `markise` ikke er gældende."},"virtualTitle":{"en":"What\'s the type?","nl":"Wat voor type is dit?","de":"Welcher Typ ist das?","fr":"Quel est le type ?","it":"Qual è il tipo?","sv":"Vad är det för typ?","no":"Hvilken type er det?","es":"¿Cuál es el tipo?","da":"Hvad er typen?"},"allowedVirtual":["sunshade","blinds","curtain"],"$speechAlternatives":{"en":["window coverings","windowcoverings"],"nl":["raambekleding","raambedekking"],"fr":["couvertures de fenêtre"],"it":["rivestimenti per finestre"],"sv":["fönsterskydd"]}}');
  }, function(e, t, r) {
    'use strict';

    function a(e, t, r) {
      let a = !0; return e instanceof Array ? e.forEach((e => {
        (e < t || e > r) && (a = !1);
      })) : typeof e === 'number' && (e < t || e > r) && (a = !1), a;
    } function n(e) {
      return typeof e === 'string' && /^(([0-9a-f]{4}\s?){2}){2,}$/i.test(e);
    } const i = { min: 1, max: 1e3 }; const s = { min: 0, max: 0.5 }; function o(e, t) {
      const r = { result: !0, msg: `invalid_${this}` }; return e instanceof Array ? (t.packing ? e.some((e => {
        return !(e >= 0 && e <= 255);
      })) && (r.result = !1) : e.some((e => {
        return !t.words || !t.words[e];
      })) && (r.result = !1), r) : (r.result = !1, r);
    } const l = {
      words(e, t) {
        const r = { result: !0, msg: 'invalid_words' }; return !(e instanceof Array) || e.length <= 1 ? (r.result = !1, r) : (e.forEach((e => {
          if (!(e instanceof Array) || e.length <= 1) return r.result = !1, r;
        })), r);
      },
      agc(e, t) {
        return { result: e instanceof Array, msg: 'invalid_agc' };
      },
      sof(e, t) {
        return { result: e instanceof Array, msg: 'invalid_sof' };
      },
      toggleSof(e, t) {
        return { result: e instanceof Array, msg: 'invalid_toggleSof' };
      },
      eof(e, t) {
        return { result: e instanceof Array, msg: 'invalid_eof' };
      },
      manchesterUnit(e, t) {
        return { result: typeof e === 'number', msg: 'invalid_manchesterUnit' };
      },
      manchesterMaxUnits(e, t) {
        return { result: typeof e === 'number' && e >= i.min, msg: 'invalid_manchesterMaxUnits' };
      },
      sensitivity(e, t) {
        return { result: typeof e === 'number' && a(e, s.min, s.max), msg: 'invalid_sensitivity' };
      },
      interval(e, t) {
        return { result: typeof e === 'number', msg: 'invalid_signalinterval' };
      },
      minimalLength(e, t) {
        return { result: e > 0, msg: 'invalid_minimalLength' };
      },
      maximalLength(e, t) {
        return { result: e > 0, msg: 'invalid_maximalLength' };
      },
      packing(e, t) {
        return { result: typeof e === 'boolean' && t.words && t.words.length == 2, msg: 'invalid_packing' };
      },
      dutyCycle(e, t) {
        return { result: typeof e === 'number', msg: 'invalid_dutyCycle' };
      },
      txOnly(e, t) {
        return { result: typeof e === 'boolean', msg: 'invalid_txOnly' };
      },
      cmds(e, t) {
        const r = { result: !0, msg: 'invalid_cmd' }; return Object.keys(e).forEach((a => {
          o(e[a], t).result || (r.result = !1);
        })), r;
      },
      toggleIndexes(e, t) {
        return {
          result: e instanceof Array && !e.some((e => {
            return e >= t.sof.length;
          })),
          msg: 'invalid_toggleIndexes',
        };
      },
      toggleBits(e, t) {
        return { result: e instanceof Array, msg: 'invalid_toggleBits' };
      },
      prefixData: o.bind('prefixData'),
      postfixData: o.bind('postfixData'),
    }; const u = {
      timeInterval: { min: 5, max: 32767 }, manchesterInterval: { min: 0, max: 1 }, rxTimeout: { min: 0, max: 255 }, repetitions: { min: 1, max: 255 },
    }; const d = {
      words(e, t) {
        const r = { result: !0, msg: 'word_interval_out_of_bounds' }; const n = t.hasOwnProperty('manchesterUnit') ? u.manchesterInterval : u.timeInterval; return e.forEach((e => {
          a(e, n.min, n.max) || (r.result = !1);
        })), r;
      },
      agc(e, t) {
        const r = t.hasOwnProperty('manchesterUnit') ? u.manchesterInterval : u.timeInterval; return { result: a(e, r.min, r.max), msg: 'agc_out_of_bounds' };
      },
      toggleSof(e, t) {
        const r = t.hasOwnProperty('manchesterUnit') ? u.manchesterInterval : u.timeInterval; return { result: a(e, r.min, r.max), msg: 'toggleSof_out_of_bounds' };
      },
      sof(e, t) {
        const r = t.hasOwnProperty('manchesterUnit') ? u.manchesterInterval : u.timeInterval; return { result: a(e, r.min, r.max), msg: 'sof_out_of_bounds' };
      },
      eof(e, t) {
        const r = t.hasOwnProperty('manchesterUnit') ? u.manchesterInterval : u.timeInterval; return { result: a(e, r.min, r.max), msg: 'eof_out_of_bounds' };
      },
      repetitions(e, t) {
        return { result: a(e, u.repetitions.min, u.repetitions.max), msg: 'repetitions_out_of_bounds' };
      },
      interval(e, t) {
        return { result: a(e, u.timeInterval.min, u.timeInterval.max), msg: 'interval_out_of_bounds' };
      },
      rxTimeout(e, t) {
        return { result: a(e, u.rxTimeout.min, u.rxTimeout.max), msg: 'rxTimeout_out_of_bounds' };
      },
      manchesterUnit(e, t) {
        return { result: a(e, u.timeInterval.min, u.timeInterval.max), msg: 'manchesterUnit_out_of_bounds' };
      },
    }; const c = { min: 1e3, max: 2e5 }; const m = { min: 58e3, max: 812e3 }; const p = { min: 5e3, max: 5e4 }; const h = {
      modulation(e, t) {
        for (var r = ['type', 'baudRate', 'channelSpacing', 'channelDeviation'], n = { result: !0, msg: 'invalid_modulation_properties' }, i = 0; i < r.length; i++) {
          const s = r[i]; if (!e.hasOwnProperty(s)) return n.result = !1, n;
        } return e.type !== 'ASK' && e.type !== 'FSK' && e.type !== 'GFSK' ? (n.result = !1, n) : a(e.baudRate, c.min, c.max) && a(e.channelSpacing, m.min, m.max) ? (a(e.channelDeviation, p.min, p.max) || (n.result = !1), n) : (n.result = !1, n);
      },
    }; const f = {
      cmds(e, t) {
        return {
          result: !Object.keys(e).some((t => {
            return !n(e[t]);
          })),
          msg: 'invalid_pronto_cmds',
        };
      },
      toggleCmds(e, t) {
        return {
          result: !Object.keys(e).some((t => {
            return !n(e[t]);
          })),
          msg: 'invalid_pronto_toggleCmds',
        };
      },
      repetitions(e, t) {
        return { result: a(e, u.repetitions.min, u.repetitions.max), msg: 'repetitions_out_of_bounds' };
      },
    }; const v = {
      carrier(e, t) {
        return { result: a(e, 433e6, 43399e4), msg: 'carrier_out_of_bounds' };
      },
    }; const g = { min: 868e6, max: 8689e5 }; const y = {
      carrier(e, t) {
        return { result: a(e, g.min, g.max), msg: 'carrier_out_of_bounds' };
      },
    }; const b = { min: 3e4, max: 58e3 }; const k = { min: 30, max: 70 }; const w = {
      carrier(e, t) {
        return { result: a(e, b.min, b.max), msg: 'invalid_carrier' };
      },
      dutyCycle(e, t) {
        return { result: a(e, k.min, k.max), msg: 'dutyCycle_out_of_bounds' };
      },
    }; e.exports = {
      validate(e, t, r) {
        for (const a in r) {
          const n = r[a]; const i = e[a]; if (typeof i === 'function') {
            const s = i(n, r); t(s.msg, s.result);
          }
        }
      },
      genericValidator: l,
      irValidator: w,
      rfValidator: d,
      rf433Validator: v,
      rf868Validator: y,
      modulationValidator: h,
      prontoValidator: f,
    };
  }, function(e) {
    e.exports = JSON.parse('{"USD":"$","CAD":"$","EUR":"€","AED":"د.إ.‏","AFN":"؋","ALL":"Lek","AMD":"դր.","ARS":"$","AUD":"$","AZN":"ман.","BAM":"KM","BDT":"৳","BGN":"лв.","BHD":"د.ب.‏","BIF":"FBu","BND":"$","BOB":"Bs","BRL":"R$","BWP":"P","BYR":"BYR","BZD":"$","CDF":"FrCD","CHF":"CHF","CLP":"$","CNY":"CN¥","COP":"$","CRC":"₡","CVE":"CV$","CZK":"Kč","DJF":"Fdj","DKK":"kr","DOP":"RD$","DZD":"د.ج.‏","EEK":"kr","EGP":"ج.م.‏","ERN":"Nfk","ETB":"Br","GBP":"£","GEL":"GEL","GHS":"GH₵","GNF":"FG","GTQ":"Q","HKD":"$","HNL":"L","HRK":"kn","HUF":"Ft","IDR":"Rp","ILS":"₪","INR":"টকা","IQD":"د.ع.‏","IRR":"﷼","ISK":"kr","JMD":"$","JOD":"د.أ.‏","JPY":"￥","KES":"Ksh","KHR":"៛","KMF":"FC","KRW":"₩","KWD":"د.ك.‏","KZT":"тңг.","LBP":"ل.ل.‏","LKR":"SL Re","LTL":"Lt","LVL":"Ls","LYD":"د.ل.‏","MAD":"د.م.‏","MDL":"MDL","MGA":"MGA","MKD":"MKD","MMK":"K","MOP":"MOP$","MUR":"MURs","MXN":"$","MYR":"RM","MZN":"MTn","NAD":"N$","NGN":"₦","NIO":"C$","NOK":"kr","NPR":"नेरू","NZD":"$","OMR":"ر.ع.‏","PAB":"B/.","PEN":"S/.","PHP":"₱","PKR":"₨","PLN":"zł","PYG":"₲","QAR":"ر.ق.‏","RON":"RON","RSD":"дин.","RUB":"руб.","RWF":"FR","SAR":"ر.س.‏","SDG":"SDG","SEK":"kr","SGD":"$","SOS":"Ssh","SYP":"ل.س.‏","THB":"฿","TND":"د.ت.‏","TOP":"T$","TRY":"TL","TTD":"$","TWD":"NT$","TZS":"TSh","UAH":"₴","UGX":"USh","UYU":"$","UZS":"UZS","VEF":"Bs.F.","VND":"₫","XAF":"FCFA","XOF":"CFA","YER":"ر.ي.‏","ZAR":"R","ZMK":"ZK"}');
  }, function(e, t, r) {
    'use strict';

    try {
      const t = r(1); const a = r(21); const n = r(1); const i = r(175); t && n && n.promisify && (e.exports.openAsync = n.promisify(t.open), e.exports.readAsync = n.promisify(t.read), e.exports.statAsync = n.promisify(t.stat), e.exports.readFileAsync = n.promisify(t.readFile), e.exports.readDirAsync = n.promisify(t.readdir), e.exports.lstatAsync = n.promisify(t.lstat), e.exports.imageSizeAsync = n.promisify(i)), a && (e.exports.join = a.join, e.exports.extname = a.extname, e.exports.basename = a.basename, e.exports.dirname = a.dirname);
    } catch (e) {}
  }, function(e, t, r) {
    'use strict';

    (function(t) {
      const a = r(1); const n = r(21); const i = r(22); const s = r(187); function o(e, t) {
        const r = s(e, t); if (r in i) {
          const a = i[r].calculate(e, t); if (!1 !== a) return a.type = r, a;
        } throw new TypeError(`unsupported file type: ${r} (file: ${t})`);
      }e.exports = function(e, r) {
        if (t.isBuffer(e)) return o(e); if (typeof e !== 'string') throw new TypeError('invalid invocation'); const i = n.resolve(e); if (typeof r !== 'function') {
          return o((function(e) {
            const r = a.openSync(e, 'r'); const n = a.fstatSync(r).size; const i = Math.min(n, 524288); const s = new t(i); return a.readSync(r, s, 0, i, 0), a.closeSync(r), s;
          }(i)), i);
        } !(function(e, r) {
          a.open(e, 'r', ((n, i) => {
            if (n) return r(n); a.fstat(i, ((n, s) => {
              if (n) return r(n); const o = s.size; if (o <= 0) return r(new Error(`File size is not greater than 0 —— ${e}`)); const l = Math.min(o, 524288); const u = new t(l); a.read(i, u, 0, l, 0, (e => {
                if (e) return r(e); a.close(i, (e => {
                  r(e, u);
                }));
              }));
            }));
          }));
        }(i, ((e, t) => {
          if (e) return r(e); let a; try {
            a = o(t, i);
          } catch (t) {
            e = t;
          }r(e, a);
        })));
      }, e.exports.types = Object.keys(i);
    }).call(this, r(2).Buffer);
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        return e.toString('ascii', 0, 2) === 'BM';
      },
      calculate(e) {
        return { width: e.readUInt32LE(18), height: Math.abs(e.readInt32LE(22)) };
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        return e.readUInt16LE(0) === 0 && e.readUInt16LE(2) === 2;
      },
      calculate: r(23).calculate,
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        return e.readUInt32LE(0) === 542327876;
      },
      calculate(e) {
        return { height: e.readUInt32LE(12), width: e.readUInt32LE(16) };
      },
    };
  }, function(e, t, r) {
    'use strict';

    const a = /^GIF8[79]a/; e.exports = {
      detect(e) {
        const t = e.toString('ascii', 0, 6); return a.test(t);
      },
      calculate(e) {
        return { width: e.readUInt16LE(6), height: e.readUInt16LE(8) };
      },
    };
  }, function(e, t, r) {
    'use strict';

    function a(e, t) {
      return { height: e.readUInt16BE(t), width: e.readUInt16BE(t + 2) };
    } function n(e, t) {
      if (t > e.length) throw new TypeError('Corrupt JPG, exceeded buffer limits'); if (e[t] !== 255) throw new TypeError('Invalid JPG, marker table corrupted');
    }e.exports = {
      detect(e) {
        return e.toString('hex', 0, 2) === 'ffd8';
      },
      calculate(e) {
        let t; let r; for (e = e.slice(4); e.length;) {
          if (t = e.readUInt16BE(0), n(e, t), (r = e[t + 1]) === 192 || r === 193 || r === 194) return a(e, t + 5); e = e.slice(t + 2);
        } throw new TypeError('Invalid JPG, no size found');
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        if (e.toString('ascii', 1, 8) === 'PNG\r\n\n') {
          let t = e.toString('ascii', 12, 16); if (t === 'CgBI' && (t = e.toString('ascii', 28, 32)), t !== 'IHDR') throw new TypeError('invalid png'); return !0;
        }
      },
      calculate(e) {
        return e.toString('ascii', 12, 16) === 'CgBI' ? { width: e.readUInt32BE(32), height: e.readUInt32BE(36) } : { width: e.readUInt32BE(16), height: e.readUInt32BE(20) };
      },
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        return e.toString('ascii', 0, 4) === '8BPS';
      },
      calculate(e) {
        return { width: e.readUInt32BE(18), height: e.readUInt32BE(14) };
      },
    };
  }, function(e, t, r) {
    'use strict';

    const a = /<svg[^>]+[^>]*>/; const n = /<svg\s[^>]+>/; const i = /\bwidth=(['"])([^%]+?)\1/; const s = /\bheight=(['"])([^%]+?)\1/; const o = /\bviewBox=(['"])(.+?)\1/; function l(e) {
      const t = e.split(' '); return { width: parseInt(t[2], 10), height: parseInt(t[3], 10) };
    }e.exports = {
      detect(e) {
        return a.test(e);
      },
      calculate(e) {
        const t = e.toString('utf8').match(n); if (t) {
          const r = (function(e) {
            const t = e.match(i); const r = e.match(s); const a = e.match(o); return { width: t && parseInt(t[2], 10), height: r && parseInt(r[2], 10), viewbox: a && l(a[2]) };
          }(t[0])); if (r.width && r.height) {
            return (function(e) {
              return { width: e.width, height: e.height };
            }(r));
          } if (r.viewbox) {
            return (function(e) {
              const t = e.viewbox.width / e.viewbox.height; return e.width ? { width: e.width, height: Math.floor(e.width / t) } : e.height ? { width: Math.floor(e.height * t), height: e.height } : { width: e.viewbox.width, height: e.viewbox.height };
            }(r));
          }
        } throw new TypeError('invalid svg');
      },
    };
  }, function(e, t, r) {
    'use strict';

    (function(t) {
      const a = r(1); const n = r(185); function i(e, t) {
        const r = n(e, 16, 8, t); return (n(e, 16, 10, t) << 16) + r;
      } function s(e) {
        if (e.length > 24) return e.slice(12);
      }e.exports = {
        detect(e) {
          const t = e.toString('hex', 0, 4); return t === '49492a00' || t === '4d4d002a';
        },
        calculate(e, r) {
          if (!r) throw new TypeError("Tiff doesn't support buffer"); const o = (function(e) {
            const t = e.toString('ascii', 0, 2); return t === 'II' ? 'LE' : t === 'MM' ? 'BE' : void 0;
          }(e)) === 'BE'; const l = (function(e, t) {
            for (var r, a, o, l = {}; e && e.length && (r = n(e, 16, 0, t), a = n(e, 16, 2, t), o = n(e, 32, 4, t), r !== 0);)o !== 1 || a !== 3 && a !== 4 || (l[r] = i(e, t)), e = s(e); return l;
          }((function(e, r, i) {
            let s = n(e, 32, 4, i); let o = 1024; const l = a.statSync(r).size; s + o > l && (o = l - s - 10); const u = new t(o); const d = a.openSync(r, 'r'); return a.readSync(d, u, 0, o, s), u.slice(2);
          }(e, r, o)), o)); const u = l[256]; const d = l[257]; if (!u || !d) throw new TypeError('Invalid Tiff, missing tags'); return { width: u, height: d };
        },
      };
    }).call(this, r(2).Buffer);
  }, function(e, t, r) {
    'use strict';

    e.exports = function(e, t, r, a) {
      return r = r || 0, e[`readUInt${t}${a ? 'BE' : 'LE'}`].call(e, r);
    };
  }, function(e, t, r) {
    'use strict';

    e.exports = {
      detect(e) {
        const t = e.toString('ascii', 0, 4) === 'RIFF'; const r = e.toString('ascii', 8, 12) === 'WEBP'; const a = e.toString('ascii', 12, 15) === 'VP8'; return t && r && a;
      },
      calculate(e) {
        const t = e.toString('ascii', 12, 16); if (e = e.slice(20, 30), t === 'VP8X') {
          const r = e[0]; return !(!((192 & r) == 0) || !((1 & r) == 0)) && (function(e) {
            return { width: 1 + e.readUIntLE(4, 3), height: 1 + e.readUIntLE(7, 3) };
          }(e));
        } if (t === 'VP8 ' && e[0] !== 47) {
          return (function(e) {
            return { width: 16383 & e.readInt16LE(6), height: 16383 & e.readInt16LE(8) };
          }(e));
        } const a = e.toString('hex', 3, 6); return t === 'VP8L' && a !== '9d012a' && (function(e) {
          return { width: 1 + ((63 & e[2]) << 8 | e[1]), height: 1 + ((15 & e[4]) << 10 | e[3] << 2 | (192 & e[2]) >> 6) };
        }(e));
      },
    };
  }, function(e, t, r) {
    'use strict';

    const a = r(22); e.exports = function(e, t) {
      let r; for (r in a) if (a[r].detect(e, t)) return r;
    };
  }, function(e) {
    e.exports = JSON.parse('{"title":"App","type":"object","definitions":{"i18nObject":{"oneOf":[{"type":"string","minLength":1},{"type":"object","required":["en"],"patternProperties":{"^.*$":{"type":"string"}},"additionalProperties":false}]},"i18nArray":{"type":"object","patternProperties":{"^.*$":{"type":"array","items":{"type":"string"}}},"additionalProperties":false},"author":{"required":["name"],"properties":{"name":{"type":"string"},"email":{"type":"string"},"website":{"type":"string"}}},"images":{"required":["large","small"],"additionalProperties":false,"properties":{"large":{"type":"string"},"small":{"type":"string"},"xlarge":{"type":"string"}}},"flowCard":{"type":"object","required":["id","title"],"properties":{"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"},"titleFormatted":{"$ref":"#/definitions/i18nObject"},"deprecated":{"type":"boolean","enum":[true]},"highlight":{"type":"boolean","enum":[true]},"droptoken":{"oneOf":[{"type":"string","enum":["boolean","number","string","image"]},{"type":"array","items":{"type":"string","enum":["boolean","number","string","image"]}}]},"tokens":{"type":"array","items":{"type":"object","required":["name","title"],"properties":{"name":{"type":"string"},"type":{"type":"string","enum":["boolean","number","string","image"],"default":"string"},"title":{"$ref":"#/definitions/i18nObject"},"example":{"oneOf":[{"$ref":"#/definitions/i18nObject"},{"type":"number"},{"type":"boolean"}]}}}},"args":{"type":"array","items":{"oneOf":[{"type":"object","required":["name","type"],"requiredVerified":["title"],"properties":{"name":{"type":"string"},"type":{"type":"string","enum":["device"]}}},{"type":"object","required":["name","type"],"properties":{"title":{"$ref":"#/definitions/i18nObject"},"name":{"type":"string"},"type":{"type":"string","enum":["text","autocomplete","device","date","time","color"]},"placeholder":{"$ref":"#/definitions/i18nObject"},"filter":{"oneOf":[{"type":"string"},{"type":"object"}]}}},{"type":"object","required":["name","type"],"requiredVerified":["title"],"properties":{"title":{"$ref":"#/definitions/i18nObject"},"name":{"type":"string"},"type":{"type":"string","enum":["number","range"]},"min":{"type":"number"},"max":{"type":"number"},"step":{"type":"number","minimum":0},"label":{"$ref":"#/definitions/i18nObject"},"labelMultiplier":{"type":"number"},"labelDecimals":{"type":"number","mimimum":0,"maximum":10}}},{"type":"object","required":["name","type","values"],"requiredVerified":["title"],"properties":{"title":{"$ref":"#/definitions/i18nObject"},"name":{"type":"string"},"type":{"type":"string","enum":["dropdown"]},"values":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"label":{"$ref":"#/definitions/i18nObject"}}}}}}]}}}},"appSettings":{"type":"array","items":{"oneOf":[{"type":"object","required":["id","type","title"],"properties":{"type":{"type":"string","enum":["text","password","textarea","label"]},"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"string"},"pattern":{"type":"string"}}},{"type":"object","required":["id","type","title"],"properties":{"type":{"type":"string","enum":["number","slider"]},"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"number"},"units":{"$ref":"#/definitions/i18nObject"},"min":{"type":"number"},"max":{"type":"number"},"step":{"type":"number","minimum":0}}},{"type":"object","required":["id","type","title","values"],"properties":{"type":{"type":"string","enum":["radio","dropdown"]},"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"string"},"values":{"type":"array","items":{"type":"object","required":["id","title"],"properties":{"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"}}}}}},{"type":"object","required":["id","type","title"],"properties":{"type":{"type":"string","enum":["checkbox"]},"id":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"boolean"}}},{"type":"object","required":["type","title","children"],"properties":{"type":{"type":"string","enum":["group"]},"title":{"$ref":"#/definitions/i18nObject"},"children":{"$ref":"#/definitions/appSettings"}}}]}},"driverSettings":{"type":"array","items":{"oneOf":[{"type":"object","required":["id","type","label"],"properties":{"type":{"type":"string","enum":["text","password","textarea","label"]},"id":{"oneOf":[{"type":"string"},{"type":"number"}]},"label":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"string"},"pattern":{"type":"string"},"zwave":{"$ref":"#/definitions/zwaveSetting"}}},{"type":"object","required":["id","type","label"],"properties":{"type":{"type":"string","enum":["number","slider"]},"id":{"oneOf":[{"type":"string"},{"type":"number"}]},"label":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"number"},"units":{"$ref":"#/definitions/i18nObject"},"attr":{"type":"object","properties":{"min":{"type":"number"},"max":{"type":"number"},"step":{"type":"number","minimum":0}}},"zwave":{"$ref":"#/definitions/zwaveSetting"}}},{"type":"object","required":["id","type","label","values"],"properties":{"type":{"type":"string","enum":["radio","dropdown"]},"id":{"oneOf":[{"type":"string"},{"type":"number"}]},"label":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"string"},"values":{"type":"array","items":{"type":"object","required":["id","label"],"properties":{"id":{"type":"string"},"label":{"$ref":"#/definitions/i18nObject"}}}},"zwave":{"$ref":"#/definitions/zwaveSetting"}}},{"type":"object","required":["id","type","label"],"properties":{"type":{"type":"string","enum":["checkbox"]},"id":{"oneOf":[{"type":"string"},{"type":"number"}]},"label":{"$ref":"#/definitions/i18nObject"},"hint":{"$ref":"#/definitions/i18nObject"},"value":{"type":"boolean"},"zwave":{"$ref":"#/definitions/zwaveSetting"}}},{"type":"object","required":["type","label","children"],"properties":{"type":{"type":"string","enum":["group"]},"label":{"$ref":"#/definitions/i18nObject"},"children":{"$ref":"#/definitions/driverSettings"},"zwave":{"$ref":"#/definitions/zwaveSetting"}}}]}},"zwaveDevice":{"type":"object","required":["manufacturerId","productTypeId","productId"],"properties":{"manufacturerId":{"oneOf":[{"type":"number"},{"type":"array","items":{"type":"number"}}]},"productTypeId":{"oneOf":[{"type":"number"},{"type":"array","items":{"type":"number"}}]},"productId":{"oneOf":[{"type":"number"},{"type":"array","items":{"type":"number"}}]},"learnmode":{"type":"object","required":["instruction"],"properties":{"image":{"type":"string"},"instruction":{"$ref":"#/definitions/i18nObject"}}},"associationGroups":{"type":"array","items":{"type":"number"}},"associationGroupsMultiChannel":{"type":"array","items":{"type":"number"}},"associationGroupsOptions":{"type":"object","properties":{"hint":{"$ref":"#/definitions/i18nObject"}}},"wakeUpInterval":{"type":"number"},"defaultConfiguration":{"type":"array","items":{"type":"object","required":["id","size","value"],"properties":{"id":{"type":"number"},"size":{"type":"number","enum":[1,2,4]},"value":{"oneOf":[{"type":"number"},{"type":"string"}]},"multiChannelNodes":{"type":"object","items":{"type":"object","required":["class","capabilities","name"],"properties":{"class":{"type":"string"},"capabilities":{"type":"array","items":{"type":"string"}},"icon":{"type":"string"},"name":{"$ref":"#/definitions/i18nObject"}}}}}}}}},"zwaveSetting":{"type":"object","required":["index","size"],"properties":{"index":{"type":"number"},"size":{"type":"number","enum":[1,2,4]},"signed":{"type":"boolean"}}}},"required":["id","name","version","compatibility","author"],"requiredPublish":["category","images","brandColor"],"requiredVerified":["support"],"properties":{"id":{"type":"string"},"name":{"$ref":"#/definitions/i18nObject"},"description":{"$ref":"#/definitions/i18nObject"},"author":{"$ref":"#/definitions/author"},"images":{"$ref":"#/definitions/images"},"version":{"type":"string"},"compatibility":{"type":"string"},"sdk":{"type":"number","default":3,"minimum":1,"maximum":3},"tags":{"$ref":"#/definitions/i18nArray"},"permissions":{"type":"array","items":{"type":"string"}},"bugs":{"type":"object","properties":{"url":{"type":"string","pattern":"^https?://"}}},"homepage":{"type":"string","pattern":"^https://"},"support":{"type":"string","pattern":"^(https://|mailto:)"},"source":{"type":"string","pattern":"^https://"},"athomForumDiscussionId":{"type":"number"},"homeyCommunityTopicId":{"type":"number"},"category":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}]},"contributors":{"type":"object","patternProperties":{"^(developers|translators)$":{"type":"array","items":{"$ref":"#/definitions/author"}}},"additionalProperties":false},"contributing":{"type":"object","properties":{"donate":{"type":"object","additionalProperties":false,"properties":{"paypal":{"type":"object","additionalProperties":false,"patternProperties":{"^(username|email)$":{"type":"string"},"currency":{"type":"string"}}}}}}},"screensavers":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"title":{"$ref":"#/definitions/i18nObject"}}}},"capabilities":{"type":"object","patternProperties":{"^.*$":{"type":"object"}},"additionalProperties":false},"drivers":{"type":"array","items":{"type":"object","required":["id","name","class","capabilities"],"requiredPublish":["images"],"requiredVerified":["connectivity"],"properties":{"id":{"type":"string"},"name":{"$ref":"#/definitions/i18nObject"},"class":{"type":"string"},"capabilities":{"type":"array","items":{"type":"string"}},"capabilitiesOptions":{"type":"object"},"images":{"$ref":"#/definitions/images"},"deprecated":{"type":"boolean","enum":[true]},"discovery":{"type":"string"},"energy":{"type":"object","properties":{"approximation":{"oneOf":[{"required":["usageOn","usageOff"],"additionalProperties":false,"properties":{"usageOn":{"type":"number"},"usageOff":{"type":"number"}}},{"required":["usageConstant"],"additionalProperties":false,"properties":{"usageConstant":{"type":"number"}}}]},"cumulative":{"type":"boolean","enum":[true]},"batteries":{"type":"array","minItems":1,"items":{"type":"string"}}}},"pair":{"type":"array","items":{"type":"object","required":["id"],"properties":{"id":{"type":"string"},"template":{"type":"string"},"options":{"type":"object"},"navigation":{"type":"object","properties":{"prev":{"type":"string"},"next":{"type":"string"}}}}}},"settings":{"$ref":"#/definitions/driverSettings"},"gtin":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}]},"zwave":{"$ref":"#/definitions/zwaveDevice"},"zigbee":{"type":"object"},"connectivity":{"type":"array","items":{"type":"string","enum":["lan","cloud","ble","zwave","zigbee","infrared","rf433","rf868"]}}}}},"flow":{"type":"object","properties":{"triggers":{"type":"array","items":{"$ref":"#/definitions/flowCard"}},"conditions":{"type":"array","items":{"$ref":"#/definitions/flowCard"}},"actions":{"type":"array","items":{"$ref":"#/definitions/flowCard"}}}},"signals":{"type":"object","patternProperties":{"^(433|868|ir)$":{"type":"object"}},"additionalProperties":false},"brandColor":{"type":"string","minLength":7,"maxLength":7,"pattern":"^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"},"discovery":{"type":"object","patternProperties":{"^.*$":{"type":"object","required":["type"],"additionalProperties":false,"properties":{"type":{"type":"string","enum":["mdns-sd","ssdp","mac"]},"id":{"type":"string","minLength":1},"conditions":{"type":"array","items":{"type":"array","items":{"type":"object","required":["field","match"],"additionalProperties":false,"properties":{"field":{"type":"string"},"match":{"type":"object","required":["type","value"],"additionalProperties":false,"properties":{"type":{"type":"string","enum":["string","regex"]},"value":{"type":"string"}}}}}}},"mdns-sd":{"type":"object","required":["name","protocol"],"additionalProperties":false,"properties":{"name":{"type":"string","minLength":1},"protocol":{"type":"string","enum":["tcp","udp"]}}},"ssdp":{"type":"object","required":["search"],"additionalProperties":false,"properties":{"search":{"type":"string","minLength":1}}},"mac":{"type":"object","required":["manufacturer"],"additionalProperties":false,"properties":{"manufacturer":{"type":"array","minItems":1,"maxItems":32,"items":{"type":"array","minItems":3,"maxItems":3,"items":{"type":"integer","minimum":0,"maximum":255}}}}}}}}},"settings":{"$ref":"#/definitions/appSettings"}}}');
  }, function(e) {
    e.exports = JSON.parse('{"homey:manager:geolocation":{"title":{"en":"Read Homey\'s location","nl":"Homey\'s locatie uitlezen","de":"Homeys Standort lesen","fr":"Lire la position de Homey","it":"Leggi la posizione di Homey","sv":"Läs av Homeys plats","no":"Les av Homeys posisjon","es":"Leer la posición de Homey","da":"Læs Homeys placering"}},"homey:manager:ledring":{"title":{"en":"Control Homey\'s LED ring","nl":"Homey\'s LED ring besturen","de":"Homeys LED-Ring steuern","fr":"Contrôler l\'anneau LED de Homey","it":"Controlla l\'anello LED di Homey","sv":"Kontrollera Homeys LED-ring","no":"Kontroller Homeys LED-ring","es":"Controlar el anillo LED de Homey","da":"Kontroller Homeys LED-ring"}},"homey:manager:media":{"title":{"en":"Control Homey\'s Music","nl":"Homey\'s Muziek besturen","de":"Homeys Musik steuern","fr":"Contrôler la musique de Homey","it":"Controlla la musica di Homey","sv":"Styr Homeys musik","no":"Kontroller Homeys musikk","es":"Controlar la música de Homey","da":"Kontroller Homeys musik"}},"homey:manager:speech-input":{"title":{"en":"React to speech","nl":"Reageren op spraak","de":"Auf Sprache reagieren","fr":"Réagir au discours","it":"Reagisci al parlato","sv":"Reagera på tal","no":"Reager på tale","es":"Reaccionar al habla","da":"Reager på tale"}},"homey:manager:speech-output":{"title":{"en":"Let Homey talk","nl":"Homey laten praten","de":"Homey sprechen lassen","fr":"Laisser Homey parler","it":"Permetti a Homey di parlare","sv":"Låt Homey prata","no":"La Homey snakke","es":"Deja que Homey hable","da":"Lad Homey tale"}},"homey:wireless:433":{"title":{"en":"Send and receive on the 433 MHz frequency","nl":"Verzenden en ontvangen op de 433 MHz frequentie","de":"Auf der 433MHz-Frequenz senden und empfangen","fr":"Envoyer et recevoir sur la fréquence 433 MHz","it":"Invia e ricevi sulla frequenza 433 MHz","sv":"Skicka och ta emot på frekvensen 433 MHz","no":"Send og motta på frekvensen 433 MHz","es":"Enviar y recibir en la frecuencia de 433 MHz","da":"Send, og modtag på 433 MHz-frekvensen"}},"homey:wireless:868":{"title":{"en":"Send and receive on the 868 MHz frequency","nl":"Verzenden en ontvangen op de 868 MHz frequentie","de":"Auf der 868MHz-Frequenz senden und empfangen","fr":"Envoyer et recevoir sur la fréquence 868 MHz","it":"Invia e ricevi sulla frequenza 868 MHz","sv":"Skicka och ta emot på frekvensen 468 MHz","no":"Send og motta på frekvensen 468 MHz","es":"Enviar y recibir en la frecuencia de 868 MHz","da":"Send, og modtag på 868 MHz-frekvensen"}},"homey:wireless:ir":{"title":{"en":"Send and receive Infrared","nl":"Infrarood verzenden en ontvangen","de":"Infrarot senden und empfangen","fr":"Envoyer et recevoir en infrarouge","it":"Invia e ricevi in infrarossi","sv":"Skicka och ta emot infrarött","no":"Send og motta infrarødt","es":"Enviar y recibir en infrarrojos","da":"Send, og modtag på infrarød"}},"homey:wireless:zwave":{"title":{"en":"Send and receive Z-Wave for specific devices","nl":"Z-Wave verzenden en ontvangen voor specifieke apparaten","de":"Z-Wave für spezifische Geräte senden und empfangen","fr":"Envoyer et recevoir Z-Wave pour les appareils spécifiques","it":"Invia e ricevi Z-Wave per dispositivi specifici","sv":"Skicka och ta emot Z-Wave för specifika enheter","no":"Send og motta Z-Wave for spesifikke enheter","es":"Enviar y recibir Z-Wave para dispositivos específicos","da":"Send, og modtag på Z-Wave for specifikke enheder"}},"homey:wireless:zigbee":{"title":{"en":"Send and receive Zigbee for specific devices","nl":"Zigbee verzenden en ontvangen voor specifieke apparaten","de":"Zigbee für spezifische Geräte senden und empfangen","fr":"Envoyer et recevoir Zigbee pour les appareils spécifiques","it":"Invia e ricevi Zigbee per dispositivi specifici","sv":"Skicka och ta emot Zigbee för specifika enheter","no":"Send og motta Zigbee for spesifikke enheter","es":"Enviar y recibir Zigbee para dispositivos específicos","da":"Send, og modtag på Zigbee for specifikke enheder"}},"homey:wireless:nfc":{"title":{"en":"Read and write NFC tags","nl":"NFC tags lezen en schrijven","de":"NFC-Tags lesen und schreiben","fr":"Lire et écrire les tags NFC","it":"Leggi e scrivi i tag NFC","sv":"Läs och skriv NFC-taggar","no":"Les og skriv NFC-tagger","es":"Leer y escribir etiquetas NFC","da":"Læs, og skriv NFC-tags"}},"homey:manager:api":{"title":{"en":"Gain full access to Homey to control everything on behalf of the user","nl":"Volledige toegang tot Homey om alles te bedienen namens de gebruiker","de":"Erhalte vollen Zugriff auf Homey, um alles im Namen des Benutzers zu steuern","fr":"Obtenir l\'accès complet à Homey pour contrôler tout au nom de l\'utilisateur","it":"Ottieni l\'accesso completo a Homey per controllare tutto a nome dell\'utente","sv":"Få full åtkomst till Homey för att styra allt åt användaren","no":"Få full tilgang til Homey for å kontrollere alt på vegne av brukeren","es":"Acceso completo a Homey para controlarlo todo en nombre del usuario","da":"Få fuld adgang til Homey for at kontrollere alt på brugerens vegne"}},"homey:wireless:ble":{"title":{"en":"Communicate with Bluetooth Low Energy devices","nl":"Communiceren met Bluetooth Low Energy apparaten","de":"Mit Bluetooth-Low-Energy-Geräten kommunizieren","fr":"Communiquer avec les appareils Bluetooth à faible énergie","it":"Comunica con i dispositivi Bluetooth Low Energy","sv":"Kommunicera med Bluetooth låg energi-enheter","no":"Kommuniser med Bluetooth Low Energy-enheter","es":"Comunicarse con dispositivos de Bluetooth Low Energy","da":"Kommuniker med Bluetooth low energy-enheder"}}}');
  }, function(e, t, r) {
    'use strict';

    e.exports = class {

      static getCodecs() {
        return r(191);
      }

    };
  }, function(e) {
    e.exports = JSON.parse('{"homey:codec:mp3":{},"homey:codec:ogg":{},"homey:codec:flac":{}}');
  }]));
})));
