import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Card } from './card/Card';
import { CatalogHeader } from './catalogHeader/CatalogHeader';
import { Pagination } from './pagination/Pagination';
import { PageLimit } from './pageLimit/PageLimit';
import { api } from '../../../api/api';
import { ApiResponse, Category, ProductsResponse } from '../../../types/api';
import { DEFAULT_LIMIT_PER_PAGE } from '../../../types/constants';
import './catalog.css';
import { Sidebar } from '../../sidebar/Sidebar';

const CATALOG_TITLE = 'all stuff';

export default function Catalog(): ReactElement {
  const [categories, setCategories] = useState<ApiResponse<Category[]> | null>(
    null,
  );
  const [products, setProducts] =
    useState<ApiResponse<ProductsResponse> | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(CATALOG_TITLE);
  const [searchParams] = useSearchParams();
  const [cateoguriesNames, setCateoguriesNames] = useState<string[][] | null>(
    null,
  );

  const location = useLocation();
  useEffect(() => {
    setSearch(searchParams.get('search'));
  }, [searchParams]);

  useEffect(() => {
    const updateProducts = async () => {
      if (!categories) {
        const categoriesResponse = await api.catalog.getCategories();
        setCategories(categoriesResponse);
      }
      if (categories && categories.data) {
        const findedCategoriesNames = categories.data.map((item) => [
          item.id,
          item.name,
        ]);
        setCateoguriesNames(findedCategoriesNames);
      }
      const pathArray = location.pathname.split('/');
      const lastNest = pathArray[pathArray.length - 1];
      if (lastNest !== 'catalog' && categories && categories.data) {
        const filteredCategoryByUrl = categories.data.filter(
          (item) => item.name.toLowerCase() === lastNest,
        );
        setCurrentCategory(lastNest);
        const categoryId = filteredCategoryByUrl[0].id;
        if (currentCategory !== lastNest) setCurrentPage(0);
        const newProducts = await api.catalog.getProducts({
          limit: pageLimit,
          categoryId,
          page: currentPage,
        });
        setProducts(newProducts);
      } else {
        if (currentCategory !== CATALOG_TITLE) setCurrentPage(0);
        const newProducts = await api.catalog.getProducts({
          limit: pageLimit,
          page: currentPage,
        });
        setProducts(newProducts);
        setCurrentCategory(CATALOG_TITLE);
      }
    };
    updateProducts();
  }, [location, pageLimit, currentPage, categories, currentCategory]);

  return (
    <main className='catalog'>
      <Sidebar categories={categories} />
      <div className='products-main'>
        <CatalogHeader
          search={search}
          currentCategory={currentCategory}
          location={location}
          products={products}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          setCurrentPage={setCurrentPage}
        />
        <div className='products-list'>
          {products?.data?.results.map((item) => (
            <Card
              item={item}
              key={item.id}
              cateoguriesNames={cateoguriesNames}
            />
          ))}
        </div>
        <div className='products-footer__page-settings'>
          <div className='products-footer__pagination'>
            <Pagination
              currentPage={currentPage || 0}
              totalPages={products?.data?.totalPage || 1}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className='products-footer__separator'>|</div>
          <PageLimit pageLimit={pageLimit} setPageLimit={setPageLimit} />
        </div>
      </div>
    </main>
  );
}
