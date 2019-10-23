const o = { x: 1, f() { console.log(this.x++) } };

const x = f => f();

x(o.f.bind(o));

x(() => o.f());

x(() => o.f.bind(o).apply(null));

x(function () { return o.f.bind(o).call(undefined) }.bind(x));

x(((f, t, s = Symbol(), p = new Proxy(t, { get:
  (a, n) => n === s ? f : t[n] })) => () => p[s]())(o.f, o));

