import initializeStripe from 'stripe';
const stripe = initializeStripe(process.env.REACT_APP_STRIPE_SECRET_KEY)
export {
    stripe
}