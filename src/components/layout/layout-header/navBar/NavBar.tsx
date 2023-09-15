import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavLinkClassesProps } from '../../../../types/layout';
import { api } from '../../../../api/api';
import './navBar.css';
import { ApiResponse, Category } from '../../../../types/api';

export default function NavBar(): ReactElement {
  const changeNavLinkClasses = ({ isActive }: NavLinkClassesProps): string => {
    return `nav-bar__link ${isActive ? 'nav-bar__link_active' : ''}`;
  };
  const [categories, setCategories] = useState<ApiResponse<Category[]> | null>(
    null,
  );

  const location = useLocation();

  useEffect(() => {
    const upadateCategories = async () => {
      if (!categories) {
        const categoriesResponse = await api.catalog.getCategories();
        setCategories(categoriesResponse);
      }
    };
    upadateCategories();
  }, [categories]);

  return (
    <nav className='nav-bar'>
      <NavLink to='/' className={changeNavLinkClasses}>
        Main
      </NavLink>
      <NavLink to='/catalog' className={changeNavLinkClasses}>
        Catalog
      </NavLink>
      {location.pathname.includes('catalog') && (
        <div className='nav-bar__categories'>
          {categories &&
            categories.data &&
            categories?.data?.map((item) => {
              const categoryName = item.name.toLowerCase();
              return (
                <NavLink
                  to={`/catalog/${categoryName}`}
                  key={item.key}
                  id={item.id}
                  className={changeNavLinkClasses}
                >
                  {item.name}
                </NavLink>
              );
            })}
        </div>
      )}
      <NavLink to='/about' className={changeNavLinkClasses}>
        About Us
      </NavLink>
    </nav>
  );
}
