const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const source = fs.readFileSync(
  path.join(__dirname, "../src/utils/cart.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const compiledExports = {};
vm.runInNewContext(compiled, { exports: compiledExports });
const { calculateCartTotals, BIKE30_CODE } = compiledExports;

const catalog = [
  { id: "peugeot", priceCents: 199999 },
  { id: "pilot", priceCents: 399999 },
  { id: "smith", priceCents: 12000 },
];
const items = catalog.map((product) => ({
  productId: product.id,
  quantity: 1,
}));
assert.deepEqual(
  { ...calculateCartTotals(items, catalog, BIKE30_CODE) },
  {
    subtotalCents: 611998,
    deliveryCents: 0,
    discountCents: 183599,
    totalCents: 428399,
    itemCount: 3,
  },
);
assert.equal(
  calculateCartTotals(
    [{ productId: "peugeot", quantity: 2 }, ...items.slice(1)],
    catalog,
    BIKE30_CODE,
  ).totalCents,
  568398,
);
assert.equal(calculateCartTotals(items, catalog, null).totalCents, 611998);
assert.equal(calculateCartTotals([], catalog, BIKE30_CODE).totalCents, 0);
assert.equal(
  calculateCartTotals(
    [{ productId: "one", quantity: 1 }],
    [{ id: "one", priceCents: 5 }],
    BIKE30_CODE,
  ).discountCents,
  2,
);
console.log("Cart cent arithmetic passed.");
