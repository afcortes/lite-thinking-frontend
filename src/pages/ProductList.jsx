import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsLifeCycle } from './../features/product/productSlice'
import Spinner from '../components/Spinner';
import ProductItem from '../components/ProductItem';


const ProductList = () => {

    const dispatch = useDispatch();

    const { isLoading, products } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProductsLifeCycle())
    }, [dispatch]);

    if (isLoading) return <Spinner/>

    return (
        <>
            <Link to='/create-product'>
                Create product
            </Link>
            {products.length > 0 && (
                <>
                <div>
                    {products.map((product) => (
                        <ProductItem
                            product={product}
                        />
                    ))}
                </div>
                </>
            )}
        </>
    );
};
export default ProductList;