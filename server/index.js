import express from "express";
import Stripe from 'stripe';

const app = express();
const port = 3000;
const publishableKey = "pk_test_51OzZKjSGbk9Yd6N1HOmsT28mkka0oVK6bO3upmeOtPQ2tIkuBGVaTdyfU1jlsYwaiDnK7BMGEfBCNfMPz1BPzXAE00tT3l0rAr";
const secretKey = "sk_test_51OzZKjSGbk9Yd6N17TlMkrpbJVAmz3ClSNxAwsZN1aUZzO49z1zuyVI8Cik4VD7CNe358SQcU41zjOHIFFSTsX5i00DL0rOBhi";

const stripe = new Stripe(secretKey, { apiVersion: "2023-10-16" });

app.listen(port, () => {
    console.log(`Server is listening at http://192.168.0.100:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, // Amount in cents
            currency: "usd",
            payment_method_types: ["card"],
        });

        const clientSecret = paymentIntent.client_secret;
        res.json({ clientSecret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Failed to create payment intent" });
    }
});

export default stripe;
