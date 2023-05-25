import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { stripe } from "../api/stripe";

import './OrderSuccessView.css';

function OrderSuccessView() {
    const [session, setSession] = useState(undefined);
    const [, setLineItems] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams,] = useSearchParams();
    function fulfillPurchase(err, lineItems) {
        try {
            console.log('lineItems', lineItems);
            setLineItems(lineItems);
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    useEffect(() => {
        async function getCheckoutSession() {
            setIsLoading(true);
            const session = await stripe.checkout.sessions.retrieve(searchParams.get('session_id'));
            setSession(session);
            stripe.checkout.sessions.listLineItems(session.id, { limit: 100 }, fulfillPurchase);
            setIsLoading(false);
        }
        getCheckoutSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Display({ email }) {
        return (
            <div className="success-notification">
                <h1>Congratulations!</h1>
                <p>An email has been sent to {email}</p>
            </div>
        )
    }
    return (
        <div className="order-success-view">
            {isLoading ? 'Loading...' : 
            <Display email={session?.customer_details?.email} />
            }
        </div>
    )

}

export default OrderSuccessView;