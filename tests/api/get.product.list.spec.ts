import test, { expect } from "@playwright/test";


test("Get Product List API Test", async ({ request }) => {
    const getProductListResponse = await request.get('https://automationexercise.com/api/productsList');
    expect(getProductListResponse.status()).toEqual(200);
    console.log(await getProductListResponse.json());
    expect(await getProductListResponse.json()).toHaveProperty('responseCode', 200);
});

test("Get All Brands List", async ({ request }) => {
    const getProductListResponse = await request.get('https://automationexercise.com/api/brandsList');
    expect(getProductListResponse.status()).toEqual(200);
});

