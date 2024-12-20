import { createHash } from "node:crypto";
import { Stats } from "node:fs";
const entityTag = (entity) => {
  if (entity.length === 0) {
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
  }
  const hash = createHash("sha1").update(entity, "utf8").digest("base64").substring(0, 27);
  const len = typeof entity === "string" ? Buffer.byteLength(entity, "utf8") : entity.length;
  return `"${len.toString(16)}-${hash}"`;
};
const statTag = ({ mtime, size }) => {
  return `"${mtime.getTime().toString(16)}-${size.toString(16)}"`;
};
const eTag = (entity, options) => {
  if (entity == null) throw new TypeError("argument entity is required");
  const weak = (options == null ? void 0 : options.weak) || entity instanceof Stats;
  const tag = entity instanceof Stats ? statTag(entity) : entityTag(entity);
  return weak ? `W/${tag}` : tag;
};
export {
  eTag
};
//# sourceMappingURL=index.js.map
