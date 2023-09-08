import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './breadcrumbs.css';

type BreadcrumbsProps = {
  locationArray: string[] | null;
};

export default function Breadcrumbs({
  locationArray,
}: BreadcrumbsProps): ReactElement {
  return (
    <div className='breadcrumbs'>
      {locationArray &&
        locationArray.map((item, index, array) => {
          if (array.length - 1 > index) {
            if (!item)
              return (
                <div key='main' className='breadcrumbs-link'>
                  <Link to={`/${item}`}>main</Link>
                  {` / `}
                </div>
              );
            return (
              <div key={item} className='breadcrumbs-link'>
                <Link to={`${array.slice(0, index).join(`/`)}/${item}`}>
                  {item}
                </Link>
                {` / `}
              </div>
            );
          }
          return (
            <div key={item} className='breadcrumbs-current-position'>
              {item.length > 13 ? `${item.slice(0, 10)}...` : item}
            </div>
          );
        })}
    </div>
  );
}
