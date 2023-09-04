import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ApiResponse, Category } from '../../types/api';
import { NavLinkClassesProps } from '../../types/layout';
import './sidebar.css';

type SidebarProps = {
  categories: ApiResponse<Category[]> | null;
};

export function Sidebar({ categories }: SidebarProps): ReactElement {
  const upadateClasses = ({ isActive }: NavLinkClassesProps): string => {
    return `sidebar__link ${isActive ? 'sidebar__link_active' : ''}`;
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__nav-container'>
        {categories &&
          categories.data &&
          categories?.data?.map((item) => {
            const categoryName = item.name.toLowerCase();
            return (
              <NavLink
                to={`/catalog/${categoryName}`}
                key={item.key}
                id={item.id}
                className={upadateClasses}
              >
                {item.name}
              </NavLink>
            );
          })}
        <div className='sidebar__underline'> </div>
      </div>
    </div>
  );
}
