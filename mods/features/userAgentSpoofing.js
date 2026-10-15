/**
 * TizeOSN User-Agent & Device Capability Spoofing
 * Ensures seamless compatibility with Samsung Tizen Smart TV web engines.
 */

export function initUserAgentSpoofing() {
  try {
    // If running in older web engine, polyfill Promise.finally and Object.fromEntries if missing
    if (!Promise.prototype.finally) {
      Promise.prototype.finally = function (callback) {
        const constructor = this.constructor;
        return this.then(
          (value) => constructor.resolve(callback()).then(() => value),
          (reason) => constructor.resolve(callback()).then(() => { throw reason; })
        );
      };
    }

    if (!Object.fromEntries) {
      Object.fromEntries = function (entries) {
        if (!entries || !entries[Symbol.iterator]) {
          throw new Error('Object.fromEntries() requires a single iterable argument');
        }
        const obj = {};
        for (const [k, v] of entries) {
          obj[k] = v;
        }
        return obj;
      };
    }

    // Suppress console spam or anti-adblock debugger loops
    const origDebug = console.debug;
    console.debug = function () {
      if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('[TizeOSN]')) {
        return origDebug.apply(this, arguments);
      }
    };

    console.log('[TizeOSN] Environment compatibility layers applied.');
  } catch (e) {
    console.warn('[TizeOSN] User-agent spoofing note:', e);
  }
}
