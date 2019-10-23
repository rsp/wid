# What is Deno?

<img src="deno-c.png" height="200"><br>
A new runtime for modern<br>JavaScript and TypeScript<br>backends for the 2020s

<small> Slides: https://pocztarski.com/wid </small>

---

# Rafał Pocztarski

You may know me from Stack Overflow

[<img alt="rsp on Stack Overflow" src="https://stackexchange.com/users/flair/303952.png" height="116">](https://stackoverflow.com/users/613198/rsp)

# pocztarski.com

<small>(and also from Medium, Quora, etc.)</small>

---

# Slides

<big><big> [pocztarski.com/wid](https://pocztarski.com/wid) </big></big>

---

# What is Deno?

A [...] JavaScript/TypeScript runtime<br>built with [...], [...], and [...]

---

# When and where?

Created by Ryan Dahl in 2018

Works on Linux, macOS and Windows

---

# Timeline

2009 Node.js

2012 TypeScript

2015 ts-node

2018 Deno

---

# How to get it?

<big><big> https://deno.land/ </big></big>

---

# Installation

For the adventurous:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

```sh
iwr https://deno.land/x/install/install.ps1 | iex
```

Or get a single file from:<br><big> https://github.com/denoland/deno/releases </big>

<small>(The scripts above just scrape the GitHub releases page)</small>

---

# How to use it?

```sh
$ cat script.ts
```

```ts
const x: string = 'Hello, world!';
console.log(x);
```

```sh
$ deno run script.ts
```

---

# Running

```sh
$ deno run script.ts 
Compile file:///Users/rsp/talks/deno/git/wid/script.ts
Hello, world!
```

```sh
$ deno run script.ts 
Hello, world!
```

---

# Deno vs ts-node

See my answer on Stack Overflow for details:<br>
[deno vs ts-node : what's the difference](https://stackoverflow.com/questions/53428120/deno-vs-ts-node-whats-the-difference/55609763#55609763)

Spoiler:<br>
Deno was 32x faster on startup for a simple example.<br>
Much easier development.

---

# Remote scripts

```sh
$ deno run https://pocztarski.com/hi.ts
```

---

Running remote scripts

```sh
$ deno run https://pocztarski.com/hi.ts
Download https://pocztarski.com/hi.ts
Compile https://pocztarski.com/hi.ts
Download https://pocztarski.com/hello.ts
Hello, Deno Warsaw!
```

```sh
$ deno run https://pocztarski.com/hi.ts
Hello, Deno Warsaw!
```

---

# Security

No network and filesystem ~~write~~ access by default

```
-A, --allow-all                  all permissions
    --allow-env                  environment access
    --allow-hrtime               high resolution time measurement
    --allow-net=<allow-net>      network access
    --allow-read=<allow-read>    file system read access
    --allow-run                  running subprocesses
    --allow-write=<allow-write>  file system write access
```

---

# Examples

```sh
$ deno run --allow-read=file.txt script.ts
```

```sh
$ deno run --allow-write=/tmp script.ts
```

```sh
$ deno run --allow-net script.ts
```

---

Importing URLs

```
import { hello } from 'https://pocztarski.com/hello.ts';

hello();
```

No need for installing dependencies

---

Running script with imported URLs

```sh
$ deno run hi1.ts 
Compile file:///Users/rsp/talks/deno/git/wid/hi1.ts
Download https://pocztarski.com/hello.ts
Hello, world!
```

```sh
$ deno run hi1.ts 
Hello, world!
```

---

Running remote scripts

```
$ deno run https://pocztarski.com/hi.ts
```

No need for installing tools

---

Dynamic imports and top level await

```
const { hello } = await import('https://pocztarski.com/hello.ts');

hello();
```

---

Running script with dynamic imports

```sh
$ deno run hi2.ts 
Compile file:///Users/rsp/talks/deno/git/wid/hi2.ts
Download https://pocztarski.com/hello.ts
️⚠️  Deno requests network access to "https://pocztarski.com/hello.ts". Grant?
[a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)] y
Hello, world!
```

```sh
$ deno run --allow-net=pocztarski.com hi2.ts
Hello, world!
```

---

HTTP server

```js
import { serve } from 'https://deno.land/std@v0.21.0/http/server.ts';

(async () => {

  let n = 0;
  const encoder = new TextEncoder();
  const server = serve(':8000');
  console.log('Listening on http://localhost:8000/');

  for await (const req of server) {
    const message = `Hello #${++n}, Deno Warsaw!\n`;
    req.respond({ body: encoder.encode(message) });
  }

})();
```

---

Running HTTP server

```sh
$ deno run server.ts
Compile file:///Users/rsp/talks/deno/git/wid/server.ts
Download https://deno.land/std@v0.21.0/http/server.ts
Download https://deno.land/std@v0.21.0/io/bufio.ts
...
Download https://deno.land/std@v0.21.0/testing/diff.ts
Download https://deno.land/std@v0.21.0/testing/format.ts
️⚠️  Deno requests network access to "0.0.0.0:8000". Grant?
[a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)] y
Listening on http://localhost:8000/
```

```sh
$ deno run --allow-net=:8000 server.ts
Listening on http://localhost:8000/
```

---

Serving files

```js
  for await (const req of server) {
    console.log(`${req.method} ${req.url}`);
    if (req.method === 'GET') {
      try {
        req.respond({ body: await Deno.readFile(`.${req.url}`) });
      } catch (e) {
        req.respond({ status: 404, body: encoder.encode('Not Found') });
      }
    } else {
      req.respond({ status: 405, body: encoder.encode('Method Not Allowed') });
    }
  }
```

---

Running HTTP file server

```sh
$ deno run --allow-net=:8000 --allow-read=./dir --no-prompt serve.ts 
```

---

WebAssembly

```sh
$ cat factorial.c
```

```c
int factorial(int n) {
  return n < 1 ? 1 : n * factorial(n - 1);
}
```

Compile with Emscripten: https://emscripten.org/

Online with WasmFiddle: https://wasdk.github.io/WasmFiddle/

---

WebAssembly in Deno

```js
const mod = new WebAssembly.Module(await Deno.readFile('program.wasm'));

const { exports: { factorial } } = new WebAssembly.Instance(mod);

console.log(factorial(10));
```

---

Running Deno with WebAssembly

```sh
$ deno run wasm.ts 
Compile file:///Users/rsp/talks/deno/git/wid/wasm.ts
️⚠️  Deno requests read access to "/Users/rsp/talks/deno/git/wid/program.wasm". Grant?
[a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)] y
3628800
```

```sh
$ deno run --allow-read=program.wasm wasm.ts 
3628800
```

---

# WebAssembly

WebAssembly: https://webassembly.org/
<br>Emscripten: https://emscripten.org/
<br>AssemblyScript: https://assemblyscript.org/
<br>WasmFiddle: https://wasdk.github.io/WasmFiddle/

WebAssembly Binary Toolkit: https://github.com/WebAssembly/wabt

Languages compiled to WebAssembly: https://github.com/appcypher/awesome-wasm-langs

---

Languages compiled to WebAssembly

.Net,
AssemblyScript,
Astro,
Brainfuck,
C,
C#,
C++,
Clean,
D,
Elixir,
F#,
Faust,
Forest,
Forth,
Go,
Grain,
Haskell,
Java,
JavaScript,
Julia,
Idris,
Kotlin/Native,
Kou,
Lua,
Lys,
Nim,
Ocaml,
Perl,
PHP,
Plorth,
Poetry,
Python,
Prolog,
Ruby,
Rust,
Scheme,
Scopes,
Speedy.js,
Swift,
Turboscript,
TypeScript,
Wah,
Walt,
Wam,
Wracket,
Xlang,
Zig

https://github.com/appcypher/awesome-wasm-langs

---

# Caching

<small>Deno downloads and caches all the files globally by default</small>

Cleaning the cache (on Mac)

```sh
rm -rvf ~/Library/Caches/deno
```

Using local caches

```sh
DENO_DIR=$(pwd)/.deno deno run hi.ts
```

---

# Libraries

Built-in API: https://deno.land/typedoc/

Standard Modules: https://deno.land/std/

Third Party Modules: https://deno.land/x/

---

# Why it will get traction

1. Ryan Dahl (known for Node's amazing success)
2. V8 (engine by Google)
3. TypeScript (language by Microsoft)
4. Rust (language by Mozilla)

---

# Advantages

1. Easy installation
2. Easy development
3. Secure by default
4. Fine-grained privileges
5. TypeScript support out of the box
6. Modern language features
7. Following Web standards
8. Modern async/await-based API

---

# Recommended talks

<small>
- [Ryan Dahl: Original Node.js presentation (2009)](https://www.youtube.com/watch?v=ztspvPYybIY)
- [History of Node.js by Ryan Dahl (2011)](https://www.youtube.com/watch?v=SAc0vQCC6UQ)
- [10 Things I Regret About Node.js by Ryan Dahl (2018)](https://www.youtube.com/watch?v=M3BM9TB-8yA)
- [Deno, A New Server-Side Runtime by Ryan Dahl (2018)](https://www.youtube.com/watch?v=FlTG0UXRAkE)
- [From Node.js to Deno by Rafał Pocztarski (2019)](https://www.youtube.com/watch?v=Aib1OZLy0_c&t=5s)

</small>

---

# Documentation

- https://deno.land/manual.html
- https://deno.land/typedoc/
- https://deno.land/std/
- https://deno.land/x/
- https://www.typescriptlang.org/

---

# Resources

- https://deno.land/
- https://deno.news/
- https://denowarsaw.com/
- https://denopoland.com/

---

# Summary

Deno is a JavaScript/TypeScript runtime<br>
It is a standalone executable<br>
It has no dependencies<br>
It can import modules from URLs<br>
It supports dynamic imports<br>
It supports top-level await<br>
It provides a restricted sandbox

---

# Later Tonight

- How to contribute to Deno? An example of adding functionality and overview of variety of places where you can help Deno<br>- by Michał Sabiniarz

-  Deno internals - how modern runtime is built<br>- by Bartek Iwańczuk

---

# Questions?

Slides: https://pocztarski.com/wid

## Rafał Pocztarski

## [pocztarski.com](https://pocztarski.com)

“The only thing that matters in software<br>is the experience of the user.” - Ryan Dahl
