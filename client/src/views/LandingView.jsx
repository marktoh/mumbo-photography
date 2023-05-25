import { useState, useEffect } from 'react';
import PhotoLibrary from "../components/PhotoLibrary";

import { stripe } from '../api/stripe';

function parseProducts(products) {
    return products?.data.filter(product => product.active)?.map(product => ({ 
        id: product.id,
        src: product?.images?.[0],
        description: product?.name
    }))
}
function LandingView() {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        async function getProducts() {
            const products = await stripe.products.list({
                limit: 25
              });
            const photos = parseProducts(products);
            setProducts(photos);
        }
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="landing-view">
            {products && <PhotoLibrary products={products} />}
        </div>
    )
}

export default LandingView;