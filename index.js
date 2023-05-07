#!/usr/bin/env node

import * as lib from "./lib.js";

const products = await lib.fetchProducts();
for (const p of products) {
  let str = `[${p.price}] ${p.name}`;
  if (p.callOutPrice) {
    str += ` (${p.callOutPrice})`;
  }
  console.log(str);
}

// console.log(products);
