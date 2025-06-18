import { SamsaraClient } from "@samsarahq/samsara";

async function main() {
  try {
    const client = new SamsaraClient({ token: process.env.SAMSARA_KEY });

    console.log("Fetching vehicles using async iterator...");
    const response = await client.vehicles.list();
    for await (const item of response) {
      console.log({ id: item.id, name: item.name });
    }

    // console.log("\nFetching vehicles page by page...");
    // // Using let instead of const to allow reassignment
    // let page = await client.vehicles.list();
    // console.log({ page });
    // while (page.hasNextPage()) {
    //   page = await page.getNextPage();
    //   console.log({ page });
    // }


    const addresses = await client.addresses.list();
    for await (const address of addresses) {
        console.log({ id: address.id, formattedAddress: address.formattedAddress });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

}

// Execute the main function
main().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
