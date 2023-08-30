import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../api/api';
import { ApiResponse, Category, ProductsResponse } from '../../../types/api';
import './catalog.css';

export default function Catalog(): ReactElement {
  const [categories, setCategories] = useState<ApiResponse<Category[]> | null>(
    null,
  );
  const [products, setProducts] =
    useState<ApiResponse<ProductsResponse> | null>(null);

  const [pageLimit, setPageLimit] = useState(10);
  const location = useLocation();

  useEffect(() => {
    const callData = async () => {
      const categoriesResponse = await api.catalog.getCategories();
      const productsResponse = await api.catalog.getProducts({
        limit: pageLimit,
      });
      setCategories(categoriesResponse);
      setProducts(productsResponse);
    };
    callData();
  }, [pageLimit]);

  return (
    <main className='catalog'>
      <div className='sidebar'>
        {categories &&
          categories.data &&
          categories?.data?.map((item) => (
            <button type='button' key={item.key} id={item.id}>
              {item.name}
            </button>
          ))}
      </div>
      <div className='products-main'>
        <div className='products-main__header'>
          <div className='products-main__breadcrumbs'>{location.pathname}</div>
          <div className='products-main__category-name'>Products</div>
          <div className='products-main__pagination'>
            {products?.data?.currentPage}
            {products?.data?.totalPage}
          </div>
          <div className='products-main__page-limit-settings'>
            <button type='button' onClick={() => setPageLimit(10)}>
              10
            </button>
            <button type='button' onClick={() => setPageLimit(20)}>
              20
            </button>
            <button type='button' onClick={() => setPageLimit(50)}>
              50
            </button>
          </div>
        </div>
        <div className='products-list'>
          {products?.data?.results.map((item) => (
            <div className='prodoct-card' key={item.id}>
              <div className='product-card__header'>
                <div>{item.attributes[0].value}</div>
              </div>
              <div className='product-card_img-container'>
                <img
                  src={item.imagesUrl[0]}
                  alt={item.name}
                  className='prodoct-card__img'
                />
              </div>
              <div className='product-card__attributs'>
                <div>{item.name}</div>
                <div className='product-card__shoping-attributs'>
                  <div>$ {item.price}</div>
                  <div className='product-card__counter'>
                    <button
                      type='button'
                      className='product-card__decrise-item'
                    >
                      -
                    </button>
                    <div>0</div>
                    <button
                      type='button'
                      className='product-card__incrise-counter'
                    >
                      +
                    </button>
                  </div>
                  <div className='product-card__basket'>Basket</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
