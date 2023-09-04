import { Pagination } from '../pagination/Pagination';
import { PageLimit } from '../pageLimit/PageLimit';
import { SortedBy, SortOrder } from './CatalogHeaderTypes';
import { ApiResponse, ProductsResponse } from '../../../../types/api';
import Breadcrumbs from '../../../breadcrumbs/Breadcrumbs';
import './catalogHeader.css';
import { SortingButtns } from './SortingButtns/SortingButtns';

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

type CatalogHeaderProps = {
  search: string | undefined;
  currentCategory: string;
  location: Location;
  products: ApiResponse<ProductsResponse> | null;
  pageLimit: number | null;
  sortedBy: string;
  sortOrder: string;
  setPageLimit: (limit: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setSortedBy: (sortedBy: SortedBy) => void;
  setSortOrder: (order: SortOrder) => void;
};

export function CatalogHeader({
  search,
  currentCategory,
  location,
  products,
  pageLimit,
  sortedBy,
  sortOrder,
  setPageLimit,
  setCurrentPage,
  setSortedBy,
  setSortOrder,
}: CatalogHeaderProps) {
  const locationArray = search
    ? [...location.pathname.split('/'), search]
    : location.pathname.split('/');
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
          <SortingButtns
            sortedBy={sortedBy}
            sortOrder={sortOrder}
            setSortedBy={setSortedBy}
            setSortOrder={setSortOrder}
          />
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
