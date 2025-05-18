// import { Divider } from 'primereact/divider';
import { TabView, TabPanel, TabPanelHeaderTemplateOptions } from 'primereact/tabview';

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
  <section className="container py-10">
    <TabView pt={ptStyle} panelContainerClassName="bg-neutral-bg">
        <TabPanel header="個人資料" headerTemplate={tab1HeaderTemplate} >
          <div className="rounded-[20px] bg-neutral-0 mt-10 p-6">
            <p >
            修改密碼
            </p>
          </div>
          <div className="rounded-[20px] bg-neutral-0 mt-6 p-6">
            <p >
            基本資料
            </p>
          </div>
        </TabPanel>
        <TabPanel header="我的訂單" headerTemplate={tab2HeaderTemplate}>
            <p className="">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
    </TabView>

  </section>
  </>)
}

export default Member;
