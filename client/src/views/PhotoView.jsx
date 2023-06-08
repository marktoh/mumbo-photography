import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Photo from '../components/Photo';

import { stripe } from '../../src/api/stripe';
import { formatStripePrice } from '../utils/money';

import './PhotoView.css';

function Banner() {
    return (
        <div className="banner">
            Free shipping is now available
        </div>
    )
}
function PhotoView() {
    const { id } = useParams();
    const [prices, setPrices] = useState([]);
    const [currentPriceId, setCurrentPriceId] = useState('');
    const [product, setProduct] = useState(null);
    useEffect(() => {
        async function getProduct() {
            const product = await stripe.products.retrieve(id);
            console.log('product', product);
            setProduct(product);
            setCurrentPriceId(product?.default_price);
        }
        async function getPrices() {
            const prices = await stripe.prices.search({
                query: `product:'${id}'`,
              });
            console.log('prices', prices);
            setPrices(prices?.data?.filter(datum => datum?.active === true));
        }
        getProduct();
        getPrices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function Prices({ id, size, currency, price, onClick, isHighlighted }) {
        return <button className={`pricing-option${isHighlighted ? ' highlight' : ''}`} onClick={() => onClick(id)}>
            <div className="pricing-option-property">
                <span>Size: </span> 
                <b>{size}</b>
            </div>
            <div className="pricing-option-property">
                <span>Price: </span>
                <b><span className="currency">{currency}</span> {price}</b>
            </div>
        </button>
    }
    function handlePricingOptionClick(id) {
        setCurrentPriceId(id);
    }
    return (
        <div className="photo-view">
            <div className="photo-container">
                <Photo src={product?.images?.[0]} description={product?.description} />
            </div>
            <Banner />
            <div className="photo-details">
                <div className="description">
                    <h2>Dimensions</h2>
                    <p>{prices.length > 0 && prices?.find(e => e.id === currentPriceId)?.nickname}</p>
                </div>
                <div className="purchase">
                    <div className="pricing-options-list">
                        {prices.length > 0 && prices?.sort((a, b) => a.unit_amount - b.unit_amount)?.map(price => <Prices key={price.id} id={price.id} size={price.nickname} currency={price.currency} price={formatStripePrice(price.unit_amount)} onClick={handlePricingOptionClick} isHighlighted={currentPriceId === price.id} />)}
                    </div>
                    <form action={`${process.env.REACT_APP_SERVER_URL}/api/create-checkout-session`} method="POST">
                        <input type="hidden" name="price_id" value={currentPriceId} />
                        <button type="submit">
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PhotoView;