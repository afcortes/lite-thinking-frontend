const ProductItem = ({product}) => {

  return (
        <>
          <div className="card my-3">
            <h2 className="card-header text-center">{product.name}</h2>
            <div className="card-body">
              <p className='fs-6'>
                Price: {product.price}
              </p>
              <p className='fs-6'>
                Description: {product.description}
              </p>
            </div>
          </div>
        </>
  );
};

export default ProductItem;