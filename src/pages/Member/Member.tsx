import { TabView, TabPanel, TabPanelHeaderTemplateOptions } from 'primereact/tabview';
import UserInformation from './UserInformation';
import UserOrder from './UserOrder';

const Member = () => {
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

  return (<>
  <section className="container py-10 md:pt-20 md:pb-[120px]">
    <TabView pt={ptStyle} panelContainerClassName="bg-neutral-bg text-neutral-100">
        <TabPanel header="個人資料" headerTemplate={tab1HeaderTemplate} >
          <UserInformation />
        </TabPanel>
        <TabPanel header="我的訂單" headerTemplate={tab2HeaderTemplate}>
          <UserOrder />
        </TabPanel>
    </TabView>

  </section>
  </>)
}

export default Member;
