import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { api } from '../../../api/api';
import { ApiResponse, Category, ProductsResponse } from '../../../types/api';
import './catalog.css';
import { DEFAULT_LIMIT_PER_PAGE } from '../../../types/constants';

export default function Catalog(): ReactElement {
  const [categories, setCategories] = useState<ApiResponse<Category[]> | null>(
    null,
  );
  const [products, setProducts] =
    useState<ApiResponse<ProductsResponse> | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT_PER_PAGE);
  const [currentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('All stuff');
  const [searchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    const callData = async () => {
      const categoriesResponse = await api.catalog.getCategories();
      const productsResponse = await api.catalog.getProducts({
        limit: pageLimit,
        page: currentPage,
      });
      setCategories(categoriesResponse);
      setProducts(productsResponse);
    };
    callData();
  }, [pageLimit, currentPage]);

  useEffect(() => {
    setSearch(searchParams.get('search'));
  }, [searchParams]);

  useEffect(() => {
    const updateProducts = async () => {
      const pathArray = location.pathname.split('/');
      const lastNest = pathArray[pathArray.length - 1];
      if (lastNest !== 'catalog' && categories && categories.data) {
        const filteredCategoryByUrl = categories.data.filter(
          (item) => item.name.toLowerCase() === lastNest,
        );
        setCurrentCategory(lastNest);
        const categoryId = filteredCategoryByUrl[0].id;
        const newProducts = await api.catalog.getProducts({
          limit: pageLimit,
          categoryId,
          page: currentPage,
        });
        setProducts(newProducts);
      } else {
        const newProducts = await api.catalog.getProducts({
          limit: pageLimit,
          page: currentPage,
        });
        setProducts(newProducts);
        setCurrentCategory('All Staff');
      }
    };
    updateProducts();
  }, [location, pageLimit, currentPage, categories]);

  return (
    <main className='catalog'>
      <div className='sidebar'>
        {categories &&
          categories.data &&
          categories?.data?.map((item) => {
            const categoryName = item.name.toLowerCase();
            return (
              <NavLink
                to={`/catalog/${categoryName}`}
                key={item.key}
                id={item.id}
              >
                {item.name}
              </NavLink>
            );
          })}
      </div>
      <div className='products-main'>
        <div className='products-main__header'>
          <div className='products-main__breadcrumbs'>{location.pathname}</div>
          <div className='products-main__category-name'>
            {search
              ? `Result of search: ${search}`
              : currentCategory.toUpperCase()}
          </div>
          <div className='products-main__pagination'>
            {products?.data?.currentPage}
            {products?.data?.totalPage}
          </div>
          <div className='products-main__page-limit-settings'>
            <button
              type='button'
              onClick={() => setPageLimit(DEFAULT_LIMIT_PER_PAGE)}
            >
              {DEFAULT_LIMIT_PER_PAGE}
            </button>
            <button
              type='button'
              onClick={() => setPageLimit(DEFAULT_LIMIT_PER_PAGE * 2)}
            >
              {DEFAULT_LIMIT_PER_PAGE * 2}
            </button>
            <button
              type='button'
              onClick={() => setPageLimit(DEFAULT_LIMIT_PER_PAGE * 5)}
            >
              {DEFAULT_LIMIT_PER_PAGE * 5}
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
