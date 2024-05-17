import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card";
import { fetchProducts, resetProductList } from "../../features/productSlice";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../index.css';

export default function Home() {
  const products = useSelector(state => state.product.list);
  const page = useSelector(state => state.product.page);
  const hasMore = useSelector(state => state.product.hasMore);
  const search = useSelector(state => state.product.search)
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    dispatch(resetProductList());
    dispatch(fetchProducts(1)); 
  }, [dispatch]);

  useEffect(() => {
    if (search) {
        setFilteredProducts(() => {return products.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))})
    }
    else {
        setFilteredProducts(products)
    }
  }, [products, search])

  const fetchMoreProducts = () => {
    if (hasMore) {
      dispatch(fetchProducts(page + 1)); 
    }
  };

  return (
    <InfiniteScroll
      dataLength={filteredProducts.length}
      next={fetchMoreProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more products to show.</p>}
      className=""
    >
      <div className='card__container flex'>
        {filteredProducts && filteredProducts.map(product => (
          <Card key={product.id} product={product}/>
        ))}
      </div>
    </InfiniteScroll>
  );
}
