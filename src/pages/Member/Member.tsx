import { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { TabView, TabPanel, TabPanelHeaderTemplateOptions, TabViewTabChangeEvent } from 'primereact/tabview';

import { getUser, getOrdersData } from '@apis';
import { BookingType } from '@types';
import { KEY_TOKEN, getFromStorage, GlobalContext } from '@core';
import UserInformation from './UserInformation';
import UserOrder from './UserOrder';
import { formatTimestamp, getDiffDays } from '@constants';

const Member = () => {
  const { user, dispatch } = useContext(GlobalContext);
  const token = getFromStorage(KEY_TOKEN, 'COOKIE');
  const navigate = useNavigate();
  const location = useLocation();
  const [ordersData, setOrdersData] = useState<BookingType[]>([] as BookingType[]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 使用 `useCallback` 來記憶函式
  const fetchUser = useCallback(async () => {
    // 驗證是否有 token，未登入要轉跳 login
    if(!token) {
      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '未登入',
          detail: '未登入，轉登入頁。',
          display: true,
        },
      });
      return navigate('/login');
    };

    try {
      // 加入 loading
      dispatch({ type: 'SET_LOADER', payload: true });

      // 加入 token
      const user = await getUser(token);
      await dispatch({ type: 'SET_USER', payload: user });

      // 取得所有訂單資訊
      const data = await getOrdersData();
      setOrdersData(data);

      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'success',
          summary: '已登入',
          detail: '已登入，並取得會員、訂單資訊。',
          display: true,
        },
      });
    } catch (error) {
      console.error('獲取資訊失敗:', error);
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '會員、訂單不存在',
          detail: '會員、訂單不存在，轉登入頁。',
          display: true,
        },
      });
      return navigate('/login');
    } finally {
      dispatch({ type: 'SET_LOADER', payload: false });
    }
  }, [navigate, dispatch, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 轉換成需要的資料格式，新訂單在最上面
  const formattedData = useMemo(() => {
  return ordersData.map(order => ({
    ...order,
    checkInDate: formatTimestamp(order.checkInDate ?? ''),
    checkOutDate: formatTimestamp(order.checkOutDate ?? ''),
    diffDays: getDiffDays(order.checkInDate ?? '', order.checkOutDate ?? ''), // 增加新的屬性
  })).reverse();
}, [ordersData]); // 依賴 ordersData，每次變更都重新計算


  const underscoreClass: string = 'after:content-[""] after:absolute after:mx-auto after:inset-x-0 after:bottom-0 after:w-1/4 after:h-1 after:bg-primary-100 after:rounded-[10px] text-primary-100';

  const tab1HeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
    return (
        <div className={`flex align-items-center flex-col px-6 py-4 cursor-pointer relative duration-300 ${options.selected ? underscoreClass : 'text-neutral-0'}`} onClick={options.onClick}>
          <span className="text-title">個人資料</span>
        </div>
    );
  };

  const tab2HeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
    return (
        <div className={`flex align-items-center flex-col px-6 py-4 cursor-pointer relative duration-300 ${options.selected ? underscoreClass : 'text-neutral-0'}`} onClick={options.onClick}>
          <span className="text-title">我的訂單</span>
        </div>
    );
  };

  const ptStyle = {
    nav: { className: 'bg-neutral-bg'},
  }

  // setting loction.hash from switch step.
  const handleChangeStep = (event: TabViewTabChangeEvent) => {
    let step = '';
    setActiveIndex(event.index);

    switch (event.index) {
      case 0:
        step = 'userInformation';
        break;
      case 1:
        step = 'userOrder';
        break;
    };
    location.hash = step;
    navigate(`/account#${step}`);
    return;
  };

  return (<>
  <section className="container py-10 md:pt-20 md:pb-[120px]">
    <TabView pt={ptStyle} panelContainerClassName="bg-neutral-bg text-neutral-100"
    onTabChange={handleChangeStep}
    activeIndex={activeIndex}
    >
      <TabPanel header="個人資料" headerTemplate={tab1HeaderTemplate} >
        <UserInformation />
      </TabPanel>
      <TabPanel header="我的訂單" headerTemplate={tab2HeaderTemplate}>
        <UserOrder data={formattedData} />
      </TabPanel>
    </TabView>
  </section>
  </>)
}

export default Member;
