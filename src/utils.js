const _ = {
  extends: function (a, b, undefOnly) {
    for (const prop in b) {
      if (hasOwn.call(b, prop)) {
        if (prop !== "constructor" || a !== global) {
          if (b[prop] === undefined) {
            delete a[prop];
          } else if (!(undefOnly && typeof a[prop] !== "undefined")) {
            a[prop] = b[prop];
          }
        }
      }
    }
    return a;
  },
  merge: function (obj1, obj2) {
    const obj3 = {};
    for (const attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (const attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }
};
