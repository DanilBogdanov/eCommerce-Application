import { Pagination } from '../pagination/Pagination';
import { PageLimit } from '../pageLimit/PageLimit';
import { ApiResponse, ProductsResponse } from '../../../../types/api';
import './catalogHeader.css';
import Breadcrumbs from '../../../breadcrumbs/Breadcrumbs';

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
      <Breadcrumbs locationArray={locationArray} />
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
