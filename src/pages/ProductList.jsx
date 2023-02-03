import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsLifeCycle } from './../features/product/productSlice'
import Spinner from '../components/Spinner';
import ProductItem from '../components/ProductItem';
import { useParams } from 'react-router-dom';

const ProductList = () => {

    const { company_NIT } = useParams();

    const dispatch = useDispatch();

    const { isLoading, products } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProductsLifeCycle(company_NIT))
    }, [dispatch, company_NIT]);

    if (isLoading) return <Spinner/>

    return (
        <>
            <div className="d-flex flex-column">
                <div className='mx-auto'>
                    <button className='btn btn-secondary'>
                        <Link to='./../create-product'>
                            Create product
                        </Link>
                    </button>
                </div>
                <div>
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
                </div>
            </div>
        </>
    );
};
export default ProductList;