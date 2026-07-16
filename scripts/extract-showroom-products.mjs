import fs from "node:fs";

const source = fs.readFileSync("/Users/oluwatayo/Desktop/CLAUDE/BORA MEDIA NETWORK/CLIENTS/FLOORIFY/Floorify-showroom.html", "utf8");
const body = source.slice(source.indexOf("var P=[") + 7, source.indexOf("\n];", source.indexOf("var P=[")));
const chunks = body.split(/\{id:/).slice(1).map((chunk) => "{id:" + chunk);
const read = (chunk, key) => {
  const quoted = chunk.match(new RegExp("(?:^|[,{\\s])" + key + ":(['\\\"])([\\s\\S]*?)\\1(?:,|\\n)"));
  if (quoted) return quoted[2].replace(/\\'/g, "'").replace(/\\\"/g, '"');
  const plain = chunk.match(new RegExp("(?:^|[,{\\s])" + key + ":([^,\\n}]+)"));
  return plain ? plain[1].trim() : "";
};
const products = chunks.map((chunk) => ({
  id: Number(read(chunk, "id")), category: read(chunk, "c"), blindType: read(chunk, "bt"), brand: read(chunk, "b"),
  name: read(chunk, "n"), collection: read(chunk, "m"), description: read(chunk, "desc"), image: read(chunk, "img"),
  type: read(chunk, "tk"), width: read(chunk, "w"), finish: read(chunk, "f"), warranty: read(chunk, "wr"), price: read(chunk, "p"),
  images: [...chunk.matchAll(/\{url:'([^']+)',label:'([^']+)'\}/g)].map((match) => ({ url: match[1], label: match[2] }))
})).filter((p) => p.id && p.name && p.image);
fs.writeFileSync("app/showroom-products.json", JSON.stringify(products, null, 2) + "\n");
console.log(`Extracted ${products.length} showroom products.`);
