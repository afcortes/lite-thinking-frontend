const ProductItem = ({product}) => {

  return (
        <>
          <h2>{product.name}</h2>
          <div>
            {product.price}
          </div>
          <div>
            {product.description}
          </div>
        </>
  );
};

export default ProductItem;