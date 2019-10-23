const buf = await Deno.readFile('program.wasm');
const mod = new WebAssembly.Module(buf);
const { exports: { factorial } } = new WebAssembly.Instance(mod);
console.log(factorial(10));

