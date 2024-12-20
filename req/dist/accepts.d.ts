import type { IncomingMessage } from 'node:http';
type Request = Pick<IncomingMessage, 'headers'>;
type AcceptReturns = string | boolean | string[];
export declare const getAccepts: (req: Request) => (...types: string[]) => AcceptReturns;
export declare const getAcceptsEncodings: (req: Request) => (...encodings: string[]) => AcceptReturns;
export declare const getAcceptsCharsets: (req: Request) => (...charsets: string[]) => AcceptReturns;
export declare const getAcceptsLanguages: (req: Request) => (...languages: string[]) => AcceptReturns;
export {};
//# sourceMappingURL=accepts.d.ts.map