import { useState } from 'react';
import mapImg from '../../assets/map.png';
import reportImg from '../../assets/report.png';
import classNames from 'classnames';

enum MenuItemTypes {
  LiveTracking = 'LiveTracking',
  Reports = 'Reports',
}

const MenuItems = [
  {
    type: MenuItemTypes.LiveTracking,
    logo: mapImg,
  },
  {
    type: MenuItemTypes.Reports,
    logo: reportImg,
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<MenuItemTypes | undefined>(undefined);

  const menuItems = MenuItems.map((item, i) => (
    <li
      data-testid={`sidebar-item-${i}`}
      key={i}
      className={classNames('mb-5 p-2 flex items-center justify-center cursor-pointer', {
        'bg-blue-200 rounded': activeItem === item.type,
      })}
      onClick={() => (activeItem === item.type ? setActiveItem(undefined) : setActiveItem(item.type))}
    >
      <img width={20} src={item.logo} />
    </li>
  ));

  return (
    <>
      <div
        data-testid="sidebar"
        className={classNames(
          'shadow w-[70px] rounded-l-md top-5 border-solid border border-gray-200 h-[90%] left-[10px] z-50 fixed bg-white px-4 py-5 max-h-[700px]',
          { 'rounded-r-md': !activeItem },
        )}
      >
        <h1 className="text-lg italic font-bold red px-2">TT</h1>
        <ul className="mt-5">{menuItems}</ul>
      </div>
      {activeItem && (
        <div
          data-testid="sidebar-content"
          className="py-5 px-3 shadow fixed left-[80px] top-5 z-50 bg-white h-[90%] min-w-[260px] sm:min-w-[300px] xs:max-w-[260px] sm:max-w-[400px] rounded-r-md border-r-solid border-r border-y-solid border-y border-y-gray-200 max-h-[700px]"
        >
          {activeItem === MenuItemTypes.LiveTracking ? (
            <div>Live tracking...</div>
          ) : activeItem === MenuItemTypes.Reports ? (
            <div>Reports...</div>
          ) : null}
        </div>
      )}
    </>
  );
}
