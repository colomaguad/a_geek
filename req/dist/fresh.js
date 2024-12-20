const CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
const compareETags = (etag, str) => str === etag || str === `W/${etag}` || `W/${str}` === etag;
function isStale(etag, noneMatch) {
    let start = 0;
    let end = 0;
    for (let i = 0, len = noneMatch.length; i < len; i++) {
        switch (noneMatch.charCodeAt(i)) {
            case 0x20 /*   */:
                if (start === end)
                    start = end = i + 1;
                break;
            case 0x2c /* , */:
                if (compareETags(etag, noneMatch.substring(start, end)))
                    return false;
                start = end = i + 1;
                break;
            default:
                end = i + 1;
                break;
        }
    }
    if (compareETags(etag, noneMatch.substring(start, end)))
        return false;
    return true;
}
/**
 * Check freshness of the response using request and response headers.
 */
export function fresh(reqHeaders, resHeaders) {
    const modifiedSince = reqHeaders['if-modified-since'];
    const noneMatch = reqHeaders['if-none-match'];
    if (!modifiedSince && !noneMatch)
        return false;
    const cacheControl = reqHeaders['cache-control'];
    if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl))
        return false;
    // if-none-match
    if (noneMatch && noneMatch !== '*') {
        const etag = resHeaders.etag;
        if (!etag || isStale(etag, noneMatch))
            return false;
    }
    // if-modified-since
    if (modifiedSince) {
        const lastModified = resHeaders['last-modified'];
        if (!lastModified || !(Date.parse(lastModified) <= Date.parse(modifiedSince)))
            return false;
    }
    return true;
}
//# sourceMappingURL=fresh.js.map