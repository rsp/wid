import { serve } from 'https://deno.land/std@v0.21.0/http/server.ts';

(async () => {

  let n = 0;
  const encoder = new TextEncoder();
  const server = serve(':8000');
  console.log('Listening on http://localhost:8000/');

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

})();

