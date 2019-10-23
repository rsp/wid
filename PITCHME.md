# What is Deno?

A new runtime for modern<br>JavaScript and TypeScript<br>backends for the 2020s

Slides: https://pocztarski.com/wid

---

# Rafał Pocztarski

You may know me from Stack Overflow

[<img alt="rsp on Stack Overflow" src="https://stackexchange.com/users/flair/303952.png" height="116">](https://stackoverflow.com/users/613198/rsp)

# pocztarski.com

<small>(and also from Medium, Quora, etc.)</small>

---

# Deno vs Node

Deno: A secure TypeScript runtime on V8

Node: evented I/O for v8 javascript

---

# What is Deno?

A secure JavaScript/TypeScript runtime<br>built with V8, Rust, and Tokio

---

# Architecture

Node = Server-side JS with V8 + libuv in C++

Deno = Server-side TS with V8 + Tokio in Rust

---

# Timeline

2009 Node.js

2012 TypeScript

2015 ts-node

2018 Deno

---

# Deno

deno is a standalone executable<br>
it doesn't use Node.js<br>
it is distributed as a single binary<br>
it contains the TypeScript compiler as a V8 snapshot<br>
it has no dependencies<br>
it is a runtime written in Rust using Tokio

---

# Installation

<small>
For the adventurous:<br>
`curl -fsSL https://deno.land/x/install/install.sh | sh`<br>
`iwr https://deno.land/x/install/install.ps1 | iex`

Or get a single file from:<br>
https://github.com/denoland/deno/releases

(The scripts above just scrape the GitHub releases page)
</small>

---

# Example

```
$ cat script.ts

const x: string = 'Hello, world!';
console.log(x);
```

---

# Running

```
$ deno run script.ts

$ deno run https://pocztarski.com/hi.ts

$ deno run --allow-read=file.txt script.ts

$ deno run --allow-write=/tmp script.ts

$ deno run --allow-net script.ts
```

---

```
$ deno run https://pocztarski.com/hi.ts
Download https://pocztarski.com/hi.ts
Compile https://pocztarski.com/hi.ts
Download https://pocztarski.com/hello.ts
Hello, Deno Warsaw!

$ deno run https://pocztarski.com/hi.ts
Hello, Deno Warsaw!
```

---

# Security

No network and filesystem write access by default

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

Deno vs ts-node

See my answer on Stack Overflow for details:<br>
[deno vs ts-node : what's the difference](https://stackoverflow.com/questions/53428120/deno-vs-ts-node-whats-the-difference/55609763#55609763)

For even more details see:<br>
[node-ts-hello adventures](https://gist.github.com/rsp/f7d6aec4f2bbac3de4bc3f88d871cc70)

Conclusion:<br>
Deno is 32x faster on startup for a simple example.<br>
Much easier development.

---

Importing URLs

```
$ cat hi1.ts 

import { hello } from 'https://pocztarski.com/hello.ts';

hello();
```

---

Running

```
$ deno run hi1.ts 
Compile file:///Users/rsp/talks/deno/git/wid/hi1.ts
Download https://pocztarski.com/hello.ts
Hello, world!

$ deno run hi1.ts 
Hello, world!
```

---

Dynamic import and top level await

```
$ cat hi2.ts

const { hello } = await import('https://pocztarski.com/hello.ts');

hello();
```

---

Running

```
$ deno run hi2.ts 
Compile file:///Users/rsp/talks/deno/git/wid/hi2.ts
Download https://pocztarski.com/hello.ts
️⚠️  Deno requests network access to "https://pocztarski.com/hello.ts". Grant? [a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)] y
Hello, world!

$ deno run --allow-net=pocztarski.com hi2.ts
Hello, world!
```

---

# Caching

Deno downloads and caches all the files globally by default

Cleaning the cache (on Mac)<br>
`rm -rvf ~/Library/Caches/deno`

Using local caches<br>
`DENO_DIR=$(pwd)/.deno deno run hi.ts`

---

# Why it will get traction

1. Ryan Dahl (known for Node's amazing success)
2. V8 (engine by Google)
3. TypeScript (language by Microsoft)
4. Rust (language by Mozilla)

---

# Recommended talks

<small>
- [Ryan Dahl: Original Node.js presentation (2009)](https://www.youtube.com/watch?v=ztspvPYybIY)
- [History of Node.js by Ryan Dahl (2011)](https://www.youtube.com/watch?v=SAc0vQCC6UQ)
- [10 Things I Regret About Node.js by Ryan Dahl (2018)](https://www.youtube.com/watch?v=M3BM9TB-8yA)
- [Deno, A New Server-Side Runtime by Ryan Dahl (2018)](https://www.youtube.com/watch?v=FlTG0UXRAkE)
- [From Node.js to Deno - JS/TS runtime built with V8 and Rust by Rafał Pocztarski (2019)](https://www.youtube.com/watch?v=Aib1OZLy0_c&t=5s)

</small>

---

# Resources

<small>
- https://deno.land/
- https://denoland.org/
- https://deno.land/manual.html
- https://deno.land/typedoc/
- https://deno.land/x/
- https://www.typescriptlang.org/
- https://deno.news/
- https://denowarsaw.com/
- https://denopoland.com/

</small>

---

# Questions?

Slides: https://pocztarski.com/wid

## Rafał Pocztarski

## [pocztarski.com](https://pocztarski.com)

“The only thing that matters in software is the experience of the user.” - Ryan Dahl
