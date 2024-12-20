import { createReadStream, statSync } from 'node:fs';
import { extname, isAbsolute } from 'node:path';
import { join } from 'node:path';
import mime from 'mime';
import { createETag } from './utils.js';
export const enableCaching = (res, caching) => {
    let cc = caching.maxAge != null && `public,max-age=${caching.maxAge}`;
    if (cc && caching.immutable)
        cc += ',immutable';
    else if (cc && caching.maxAge === 0)
        cc += ',must-revalidate';
    if (cc)
        res.setHeader('Cache-Control', cc);
};
/**
 * Sends a file by piping a stream to response.
 *
 * It also checks for extension to set a proper `Content-Type` header.
 *
 * Path argument must be absolute. To use a relative path, specify the `root` option first.
 *
 * @param res Response
 */
export const sendFile = (req, res) => (path, opts = {}, cb) => {
    const { root, headers = {}, encoding = 'utf-8', caching, ...options } = opts;
    if (!isAbsolute(path) && !root)
        throw new TypeError('path must be absolute');
    if (caching)
        enableCaching(res, caching);
    const filePath = root ? join(root, path) : path;
    const stats = statSync(filePath);
    headers['Content-Encoding'] = encoding;
    headers['Last-Modified'] = stats.mtime.toUTCString();
    headers.ETag = createETag(stats, encoding);
    if (!res.getHeader('Content-Type'))
        headers['Content-Type'] = `${mime.getType(extname(path))}; charset=utf-8`;
    let status = res.statusCode || 200;
    if (req.headers.range) {
        status = 206;
        const [x, y] = req.headers.range.replace('bytes=', '').split('-');
        const end = (options.end = Number.parseInt(y, 10) || stats.size - 1);
        const start = (options.start = Number.parseInt(x, 10) || 0);
        if (start >= stats.size || end >= stats.size) {
            res
                .writeHead(416, {
                'Content-Range': `bytes */${stats.size}`
            })
                .end();
            return res;
        }
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
        headers['Content-Length'] = end - start + 1;
        headers['Accept-Ranges'] = 'bytes';
    }
    else {
        headers['Content-Length'] = stats.size;
    }
    for (const [k, v] of Object.entries(headers))
        res.setHeader(k, v);
    res.writeHead(status, headers);
    const stream = createReadStream(filePath, options);
    if (cb)
        stream.on('error', (err) => cb(err)).on('end', () => cb());
    stream.pipe(res);
    return res;
};
//# sourceMappingURL=sendFile.js.map