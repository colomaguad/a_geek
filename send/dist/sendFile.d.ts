import type { IncomingMessage as I, ServerResponse as S } from 'node:http';
export type ReadStreamOptions = Partial<{
    flags: string;
    encoding: BufferEncoding;
    fd: number;
    mode: number;
    autoClose: boolean;
    emitClose: boolean;
    start: number;
    end: number;
    highWaterMark: number;
}>;
export type SendFileOptions = ReadStreamOptions & Partial<{
    root: string;
    headers: Record<string, any>;
    caching: Partial<{
        maxAge: number;
        immutable: boolean;
    }>;
}>;
export type Caching = Partial<{
    maxAge: number;
    immutable: boolean;
}>;
type Req = Pick<I, 'headers'>;
type Res = Pick<S, 'setHeader' | 'statusCode' | 'writeHead' | 'getHeader'> & NodeJS.WritableStream;
export declare const enableCaching: (res: Res, caching: Caching) => void;
/**
 * Sends a file by piping a stream to response.
 *
 * It also checks for extension to set a proper `Content-Type` header.
 *
 * Path argument must be absolute. To use a relative path, specify the `root` option first.
 *
 * @param res Response
 */
export declare const sendFile: <Request extends Req = Req, Response extends Res = Res>(req: Request, res: Response) => (path: string, opts?: SendFileOptions, cb?: (err?: any) => void) => Response;
export {};
//# sourceMappingURL=sendFile.d.ts.map