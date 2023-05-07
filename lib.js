import * as cheerio from "cheerio";

export async function fetchProducts() {
  let html = await fetch(
    "https://www.purdys.com/chocolate/vegan-chocolates#/pageSize:78/sort:final_price:desc"
  );
  html = await html.text();
  const $ = cheerio.load(html);

  const $products = $("div.product-item-info .product-item-details")
    .map(function () {
      const $details = $(this);
      const name = $details.find(".product-item-name").text().trim();
      const link = $details.find(".product-item-link").attr("href");
      const price = $details.find(".price-final_price .price").text().trim();
      const priceAmount = $details
        .find(".price-wrapper")
        .attr("data-price-amount");
      const callOutPrice = $details.find(".call-out-price").text().trim();
      return {
        name,
        link,
        price,
        priceAmount: parseFloat(priceAmount),
        callOutPrice,
      };
    })
    .get();
  return $products.sort((a, b) => {
    const priceSort = b.priceAmount - a.priceAmount;
    // If the prices are the same, sort by `name`.
    if (priceSort === 0) {
      return a.name.localeCompare(b.name);
    }
    return priceSort;
  });
}
