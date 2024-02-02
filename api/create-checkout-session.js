const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async function handler(request, response) {
  try {
    console.log(
      `${new Date()}: ${request.method} ${request.url}\n${JSON.stringify(request.body, null, 2)}`,
    );
    const price_id = request.body.price_id;
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["MY"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "myr",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      line_items: [
        {
          price: price_id,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.STRIPE_CALLBACK_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: request.headers.referer,
    });
    response.redirect(303, session.url);
  } catch (error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
}
