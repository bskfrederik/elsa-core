import { r as registerInstance, e as createEvent, h, k as Host } from './index-dc0ae4f5.js';
import { q as isNullOrWhitespace, aY as state } from './index-7d63808a.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

var E_TIMEOUT = new Error('timeout while waiting for mutex to become available');
var E_ALREADY_LOCKED = new Error('mutex already locked');
var E_CANCELED = new Error('request for lock canceled');

var Semaphore = /** @class */ (function () {
    function Semaphore(_value, _cancelError) {
        if (_cancelError === void 0) { _cancelError = E_CANCELED; }
        this._value = _value;
        this._cancelError = _cancelError;
        this._weightedQueues = [];
        this._weightedWaiters = [];
    }
    Semaphore.prototype.acquire = function (weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        return new Promise(function (resolve, reject) {
            if (!_this._weightedQueues[weight - 1])
                _this._weightedQueues[weight - 1] = [];
            _this._weightedQueues[weight - 1].push({ resolve: resolve, reject: reject });
            _this._dispatch();
        });
    };
    Semaphore.prototype.runExclusive = function (callback, weight) {
        if (weight === void 0) { weight = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, release;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.acquire(weight)];
                    case 1:
                        _a = _b.sent(), value = _a[0], release = _a[1];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, callback(value)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Semaphore.prototype.waitForUnlock = function (weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        return new Promise(function (resolve) {
            if (!_this._weightedWaiters[weight - 1])
                _this._weightedWaiters[weight - 1] = [];
            _this._weightedWaiters[weight - 1].push(resolve);
            _this._dispatch();
        });
    };
    Semaphore.prototype.isLocked = function () {
        return this._value <= 0;
    };
    Semaphore.prototype.getValue = function () {
        return this._value;
    };
    Semaphore.prototype.setValue = function (value) {
        this._value = value;
        this._dispatch();
    };
    Semaphore.prototype.release = function (weight) {
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        this._value += weight;
        this._dispatch();
    };
    Semaphore.prototype.cancel = function () {
        var _this = this;
        this._weightedQueues.forEach(function (queue) { return queue.forEach(function (entry) { return entry.reject(_this._cancelError); }); });
        this._weightedQueues = [];
    };
    Semaphore.prototype._dispatch = function () {
        var _a;
        for (var weight = this._value; weight > 0; weight--) {
            var queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
            if (!queueEntry)
                continue;
            var previousValue = this._value;
            var previousWeight = weight;
            this._value -= weight;
            weight = this._value + 1;
            queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
        }
        this._drainUnlockWaiters();
    };
    Semaphore.prototype._newReleaser = function (weight) {
        var _this = this;
        var called = false;
        return function () {
            if (called)
                return;
            called = true;
            _this.release(weight);
        };
    };
    Semaphore.prototype._drainUnlockWaiters = function () {
        for (var weight = this._value; weight > 0; weight--) {
            if (!this._weightedWaiters[weight - 1])
                continue;
            this._weightedWaiters[weight - 1].forEach(function (waiter) { return waiter(); });
            this._weightedWaiters[weight - 1] = [];
        }
    };
    return Semaphore;
}());

var Mutex = /** @class */ (function () {
    function Mutex(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    Mutex.prototype.acquire = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, releaser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._semaphore.acquire()];
                    case 1:
                        _a = _b.sent(), releaser = _a[1];
                        return [2 /*return*/, releaser];
                }
            });
        });
    };
    Mutex.prototype.runExclusive = function (callback) {
        return this._semaphore.runExclusive(function () { return callback(); });
    };
    Mutex.prototype.isLocked = function () {
        return this._semaphore.isLocked();
    };
    Mutex.prototype.waitForUnlock = function () {
        return this._semaphore.waitForUnlock();
    };
    Mutex.prototype.release = function () {
        if (this._semaphore.isLocked())
            this._semaphore.release();
    };
    Mutex.prototype.cancel = function () {
        return this._semaphore.cancel();
    };
    return Mutex;
}());

function withTimeout(sync, timeout, timeoutError) {
    var _this = this;
    if (timeoutError === void 0) { timeoutError = E_TIMEOUT; }
    return {
        acquire: function (weight) {
            if (weight !== undefined && weight <= 0) {
                throw new Error("invalid weight ".concat(weight, ": must be positive"));
            }
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var isTimeout, handle, ticket, release, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isTimeout = false;
                            handle = setTimeout(function () {
                                isTimeout = true;
                                reject(timeoutError);
                            }, timeout);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, sync.acquire(weight)];
                        case 2:
                            ticket = _a.sent();
                            if (isTimeout) {
                                release = Array.isArray(ticket) ? ticket[1] : ticket;
                                release();
                            }
                            else {
                                clearTimeout(handle);
                                resolve(ticket);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (!isTimeout) {
                                clearTimeout(handle);
                                reject(e_1);
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        },
        runExclusive: function (callback, weight) {
            return __awaiter(this, void 0, void 0, function () {
                var release, ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            release = function () { return undefined; };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 7, 8]);
                            return [4 /*yield*/, this.acquire(weight)];
                        case 2:
                            ticket = _a.sent();
                            if (!Array.isArray(ticket)) return [3 /*break*/, 4];
                            release = ticket[1];
                            return [4 /*yield*/, callback(ticket[0])];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            release = ticket;
                            return [4 /*yield*/, callback()];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            release();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        },
        release: function (weight) {
            sync.release(weight);
        },
        cancel: function () {
            return sync.cancel();
        },
        waitForUnlock: function (weight) {
            if (weight !== undefined && weight <= 0) {
                throw new Error("invalid weight ".concat(weight, ": must be positive"));
            }
            return new Promise(function (resolve, reject) {
                sync.waitForUnlock(weight).then(resolve);
                setTimeout(function () { return reject(timeoutError); }, timeout);
            });
        },
        isLocked: function () { return sync.isLocked(); },
        getValue: function () { return sync.getValue(); },
        setValue: function (value) { return sync.setValue(value); },
    };
}

// eslint-disable-next-lisne @typescript-eslint/explicit-module-boundary-types
function tryAcquire(sync, alreadyAcquiredError) {
    if (alreadyAcquiredError === void 0) { alreadyAcquiredError = E_ALREADY_LOCKED; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withTimeout(sync, 0, alreadyAcquiredError);
}

const win = window;
const require = win.require;
var EditorVariables = [];
let isInitialized;
const mutex = new Mutex();
async function initializeMonacoWorker(libPath) {
  return await mutex.runExclusive(async () => {
    if (isInitialized) {
      return win.monaco;
    }
    if (isNullOrWhitespace(libPath)) {
      // The lib path is not set, which means external code will be responsible for loading the Monaco editor.
      // In this case, spin while we wait for the editor to be loaded.
      // Create a promise that will resolve after the win.monaco variable exists. Do this in a tight loop, checking for win.monaco to exist on each iteration. Within the same iteration, request the next animation frame as to not tw-block the UI.
      // If we don't get win.monaco after 3 seconds, reject the promise.
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const timeout = 3000;
        const checkForMonaco = () => {
          if (win.monaco) {
            resolve(win.monaco);
            return;
          }
          if (Date.now() - startTime > timeout) {
            reject('Monaco editor not loaded.');
            return;
          }
          requestAnimationFrame(checkForMonaco);
        };
        checkForMonaco();
      });
    }
    const origin = document.location.origin;
    const baseUrl = libPath.startsWith('http') ? libPath : `${origin}/${libPath}`;
    require.config({ paths: { 'vs': `${baseUrl}/vs` } });
    win.MonacoEnvironment = { getWorkerUrl: () => proxy };
    let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: '${baseUrl}'
	};
	importScripts('${baseUrl}/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));
    return new Promise(resolve => {
      require(["vs/editor/editor.main"], () => {
        isInitialized = true;
        registerLiquid(win.monaco);
        registerSql(win.monaco);
        resolve(win.monaco);
      });
    });
  });
}
function registerLiquid(monaco) {
  monaco.languages.register({ id: 'liquid' });
  monaco.languages.registerCompletionItemProvider('liquid', {
    provideCompletionItems: () => {
      const autocompleteProviderItems = [];
      const keywords = ['assign', 'capture', 'endcapture', 'increment', 'decrement',
        'if', 'else', 'elsif', 'endif', 'for', 'endfor', 'break',
        'continue', 'limit', 'offset', 'range', 'reversed', 'cols',
        'case', 'endcase', 'when', 'tw-block', 'endblock', 'true', 'false',
        'in', 'unless', 'endunless', 'cycle', 'tablerow', 'endtablerow',
        'contains', 'startswith', 'endswith', 'comment', 'endcomment',
        'raw', 'endraw', 'editable', 'endentitylist', 'endentityview', 'endinclude',
        'endmarker', 'entitylist', 'entityview', 'forloop', 'image', 'include',
        'marker', 'outputcache', 'plugin', 'style', 'text', 'widget',
        'abs', 'append', 'at_least', 'at_most', 'capitalize', 'ceil', 'compact',
        'concat', 'date', 'default', 'divided_by', 'downcase', 'escape',
        'escape_once', 'first', 'floor', 'join', 'last', 'lstrip', 'map',
        'minus', 'modulo', 'newline_to_br', 'plus', 'prepend', 'remove',
        'remove_first', 'replace', 'replace_first', 'reverse', 'round',
        'rstrip', 'size', 'slice', 'sort', 'sort_natural', 'split', 'strip',
        'strip_html', 'strip_newlines', 'times', 'truncate', 'truncatewords',
        'uniq', 'upcase', 'url_decode', 'url_encode'];
      for (let i = 0; i < keywords.length; i++) {
        autocompleteProviderItems.push({ 'label': keywords[i], kind: monaco.languages.CompletionItemKind.Keyword });
      }
      return { suggestions: autocompleteProviderItems };
    }
  });
}
function registerSql(monaco) {
  monaco.languages.registerCompletionItemProvider('sql', {
    triggerCharacters: ["@"],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const autocompleteProviderItems = [];
      for (const variable of EditorVariables) {
        autocompleteProviderItems.push({
          label: `${variable.variableName}: ${variable.type}`,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: variable.variableName
        });
      }
      return { suggestions: autocompleteProviderItems };
    }
  });
}

const monacoEditorCss = ".monaco-editor-host{display:block;position:relative;min-height:12em}.monaco-editor-container{position:absolute;left:0;top:0;width:100%;height:100%;max-height:100% !important;margin:0;padding:0}.monaco-editor{border-radius:0.25rem}.monaco-editor .overflow-guard{border-radius:0.25rem}.monaco-editor .suggest-widget div.tree{white-space:unset;padding-bottom:0}";

const ElsaMonaco = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.editorHeight = '5em';
    this.value = undefined;
    this.language = undefined;
    this.singleLineMode = false;
    this.padding = undefined;
  }
  async languageChangeHandler(newValue) {
    if (!this.editor)
      return;
    const model = this.editor.getModel();
    const monaco = await this.getMonaco();
    monaco.editor.setModelLanguage(model, this.language);
  }
  async setValue(value) {
    if (!this.editor)
      return;
    const model = this.editor.getModel();
    model.setValue(value || '');
  }
  async addJavaScriptLib(libSource, libUri) {
    const monaco = await this.getMonaco();
    monaco.languages.typescript.javascriptDefaults.setExtraLibs([{
        filePath: "lib.es5.d.ts"
      }, {
        content: libSource,
        filePath: libUri
      }]);
    const oldModel = monaco.editor.getModel(libUri);
    if (oldModel)
      oldModel.dispose();
    const newModel = monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
    const matches = libSource.matchAll(/declare const (\w+): (string|number)/g);
    EditorVariables.splice(0, EditorVariables.length);
    for (const match of matches) {
      EditorVariables.push({ variableName: match[1], type: match[2] });
    }
  }
  async componentDidLoad() {
    const monaco = await this.getMonaco();
    const language = this.language;
    // Validation settings.
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
    // Compiler options.
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      lib: [],
      allowNonTsExtensions: true
    });
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    const defaultOptions = {
      value: this.value,
      language: language,
      fontFamily: "Roboto Mono, monospace",
      renderLineHighlight: 'none',
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      lineNumbers: "on",
      theme: "vs",
      roundedSelection: true,
      scrollBeyondLastLine: false,
      readOnly: false,
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      lineDecorationsWidth: 0,
      hideCursorInOverviewRuler: true,
      glyphMargin: false
    };
    let options = defaultOptions;
    if (this.singleLineMode) {
      options = Object.assign(Object.assign({}, defaultOptions), {
        wordWrap: 'off',
        lineNumbers: 'off',
        lineNumbersMinChars: 0,
        folding: false,
        scrollBeyondLastColumn: 0,
        scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
        find: { addExtraSpaceOnTop: false, autoFindInSelection: 'never', seedSearchStringFromSelection: false },
      });
    }
    this.editor = monaco.editor.create(this.container, options);
    this.editor.onDidChangeModelContent(e => {
      const value = this.editor.getValue();
      const markers = monaco.editor.getModelMarkers({ owner: language });
      this.valueChanged.emit({ value: value, markers: markers });
    });
    if (this.singleLineMode) {
      this.editor.onKeyDown(e => {
        if (e.keyCode == monaco.KeyCode.Enter) {
          // We only prevent enter when the suggest model is not active
          if (this.editor.getContribution('editor.contrib.suggestController').model.state == 0) {
            e.preventDefault();
          }
        }
      });
      this.editor.onDidPaste(e => {
        if (e.range.endLineNumber > 1) {
          let newContent = "";
          const model = this.editor.getModel();
          let lineCount = model.getLineCount();
          for (let i = 0; i < lineCount; i++) {
            newContent += model.getLineContent(i + 1);
          }
          model.setValue(newContent);
        }
      });
    }
  }
  async getMonaco() {
    if (!!this.monaco)
      return this.monaco;
    const monacoLibPath = state.monacoLibPath;
    return this.monaco = await initializeMonacoWorker(monacoLibPath);
  }
  disconnectedCallback() {
    const editor = this.editor;
    if (!!editor)
      editor.dispose();
  }
  render() {
    const padding = this.padding || 'tw-pt-1.5 tw-pl-1';
    return (h(Host, { class: "monaco-editor-host tw-border focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-block tw-w-full tw-min-w-0 tw-rounded-md sm:tw-text-sm tw-border-gray-300 tw-p-4", style: { 'min-height': this.editorHeight } }, h("div", { ref: el => this.container = el, class: `monaco-editor-container ${padding}` })));
  }
  static get watchers() { return {
    "language": ["languageChangeHandler"]
  }; }
};
ElsaMonaco.style = monacoEditorCss;

export { ElsaMonaco as elsa_monaco_editor };

//# sourceMappingURL=elsa-monaco-editor.entry.js.map