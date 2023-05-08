#!/usr/bin/env node

import * as lib from "./lib.js";

let hideBars = process.argv.includes("--hide-bars");

const products = await lib.fetchProducts(hideBars);
for (const p of products) {
  let str = `[${p.price}] ${p.name}`;
  if (p.callOutPrice) {
    str += ` (${p.callOutPrice})`;
  }
  console.log(str);
}

// console.log(products);
