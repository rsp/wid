import { serve } from 'https://deno.land/std@v0.21.0/http/server.ts';
const encoder = new TextEncoder();
const server = serve(':8000');
window.onload = async () => {
  console.log('Listening on http://localhost:8000/');
  let n = 0;
  for await (const req of server) {
    const message = `Hello #${++n}, Deno Warsaw!\n`;
    const body = encoder.encode(message);
    req.respond({ body });
  }
};
