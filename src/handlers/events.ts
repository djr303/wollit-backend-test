import store from '../store';
import { Handler } from '../handlers/types';
import { Event } from '../store'

const events: Handler = async (_, response) => {

  const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no'
  };

  response.writeHead(200, SSE_RESPONSE_HEADER);

  store.subscribe((e: Event) => {
    response.write(`data: ${JSON.stringify(e)}\n\n`);
  });

};

export default events;
