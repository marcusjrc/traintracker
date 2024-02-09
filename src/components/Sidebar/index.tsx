import mapImg from '../../assets/map.png';
import reportImg from '../../assets/report.png';
import classNames from 'classnames';
import LiveTracker from '../LiveTracker';
import { ContentTypes, selectActiveTab, setActiveTab } from '../../store/features/content/contentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const MenuItems = [
  {
    type: ContentTypes.LiveTracking,
    logo: mapImg,
  },
  {
    type: ContentTypes.Reports,
    logo: reportImg,
  },
];

export default function Sidebar() {
  const sideBarContentRef = useRef<HTMLDivElement>(null);
  const activeItem = useSelector(selectActiveTab);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (activeItem) {
      gsap.from(sideBarContentRef.current, {
        left: 10,
        duration: 0.5,
      });
    }
  }, [activeItem]);

  const menuItems = MenuItems.map((item, i) => (
    <li
      data-testid={`sidebar-item-${i}`}
      key={i}
      className={classNames('mb-5 p-2 flex items-center justify-center cursor-pointer', {
        'bg-blue-200 rounded': activeItem === item.type,
      })}
      onClick={() => (activeItem === item.type ? dispatch(setActiveTab(undefined)) : dispatch(setActiveTab(item.type)))}
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
          ref={sideBarContentRef}
          data-testid="sidebar-content"
          className="sidebar-content overflow-hidden py-5 shadow fixed left-[80px] top-5 z-40 bg-white h-[90%] min-w-[260px] sm:min-w-[300px] xs:max-w-[260px] sm:max-w-[400px] rounded-r-md border-r-solid border-r border-y-solid border-y border-y-gray-200 max-h-[700px]"
        >
          {activeItem === ContentTypes.LiveTracking ? (
            <LiveTracker />
          ) : activeItem === ContentTypes.Reports ? (
            <div>Reports... (not done!)</div>
          ) : null}
        </div>
      )}
    </>
  );
}
