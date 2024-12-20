/// <reference types="node" />
import { IncomingMessage } from 'node:http';
/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 */
export declare function forwarded(req: Pick<IncomingMessage, 'headers' | 'socket'>): string[];
/**
 * Parse the X-Forwarded-For header.
 */
export declare function parse(header: string): string[];
