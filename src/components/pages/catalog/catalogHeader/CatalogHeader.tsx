import { Link } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { PageLimit } from '../pageLimit/PageLimit';
import { ApiResponse, ProductsResponse } from '../../../../types/api';
import './catalogHeader.css';

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

type CatalogHeaderProps = {
  search: string | null;
  currentCategory: string;
  location: Location;
  products: ApiResponse<ProductsResponse> | null;
  pageLimit: number | null;
  setPageLimit: (limit: number) => void;
  setCurrentPage: (currentPage: number) => void;
};

export function CatalogHeader({
  search,
  currentCategory,
  location,
  products,
  pageLimit,
  setPageLimit,
  setCurrentPage,
}: CatalogHeaderProps) {
  const locationArray = location.pathname.split('/');
  const currentPage = products?.data?.currentPage;
  const totalPages = products?.data?.totalPage;

  return (
    <div className='products-header'>
      <div className='products-header__breadcrumbs'>
        {locationArray.map((item, index, array) => {
          if (array.length - 1 > index) {
            if (!item)
              return (
                <div key='main' className='products-header__breadcrumbs-link'>
                  <Link to={`/${item}`}>main</Link>
                  {` / `}
                </div>
              );
            return (
              <div key={item} className='products-header__breadcrumbs-link'>
                <Link to={`${array.slice(0, index).join(`/`)}/${item}`}>
                  {item}
                </Link>
                {` / `}
              </div>
            );
          }
          return (
            <div
              key={item}
              className='products-header__breadcrumbs-current-position'
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className='products-header__second-line'>
        <div className='products-header__category-name'>
          {search
            ? `Result of search: ${search}`
            : currentCategory.toUpperCase()}
        </div>
        <div className='products-header__page-settings'>
          <div className='products-header__pagination'>
            <Pagination
              currentPage={currentPage || 0}
              totalPages={totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className='products-header__separator'>|</div>
          <PageLimit pageLimit={pageLimit} setPageLimit={setPageLimit} />
        </div>
      </div>
    </div>
  );
}
