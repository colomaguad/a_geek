import type { IncomingMessage as I, ServerResponse as S } from 'node:http';
type Req = Pick<I, 'method'> & {
    fresh?: boolean;
};
type Res = Pick<S, 'setHeader' | 'removeHeader' | 'end' | 'getHeader' | 'statusCode'>;
/**
 * Sends the HTTP response.
 *
 * The body parameter can be a Buffer object, a string, an object, or an array.
 *
 * This method performs many useful tasks for simple non-streaming responses.
 * For example, it automatically assigns the Content-Length HTTP response header field (unless previously defined) and provides automatic HEAD and HTTP cache freshness support.
 *
 * @param req Request
 * @param res Response
 */
export declare const send: <Request extends Req = Req, Response extends Res = Res>(req: Request, res: Response) => (body: any) => Response;
export {};
//# sourceMappingURL=send.d.ts.map