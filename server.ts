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

