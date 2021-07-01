require('dotenv').config()
const fetch = require('node-fetch')
const API_URL = 'https://app.snipcart.com/api'

module.exports = function registerHook({ services, exceptions }) {
    return {
        'items.create': async function({ item, payload, collection }) {
                if (collection !== 'products') return
                console.log("Item created", JSON.stringify({ collection, item, payload }, null, 2))

                const response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    body: JSON.stringify({
                        fetchUrl: `${process.env.STOREFRONT_URL}/products/${item}`
                    }),
                    headers: {
                        'Authorization': `Basic ${Buffer.from(process.env.SNIPCART_SECRET).toString('base64')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                console.log("Snipcart has created the product", JSON.stringify(response, null, 2))
            }
            // no update syncing because snipcart only allows updates to inventory values
    };
};

// {
//     "collection": "products",
//     "item": 15,
//     "payload": {
//       "name": "Toh Hong Xiang",
//       "description": "<p>asdf</p>",
//       "price": "23",
//       "categories": [
//         {
//           "categories_id": 8
//         },
//         {
//           "categories_id": 9
//         },
//         {
//           "categories_id": 10
//         },
//         {
//           "categories_id": 11
//         },
//         {
//           "categories_id": 12
//         },
//         {
//           "categories_id": 13
//         },
//         {
//           "categories_id": 14
//         },
//         {
//           "categories_id": 15
//         },
//         {
//           "categories_id": 16
//         },
//         {
//           "categories_id": 17
//         }
//       ],
//       "custom_fields": [
//         {
//           "name": "color",
//           "options": "red|blue|yellow|green|violet"
//         }
//       ],
//       "id": 15
//     }
//   }