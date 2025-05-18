const EditPassword = () => {
  return(
    <div className='flex flex-col md:flex-row md:justify-between gap-6 md:gap-10 mt-10 md:mt-20'>
    {/* 修改密碼 */}
    <div className="rounded-[20px] bg-neutral-0 p-6 space-y-6 md:space-y-10 md:basis-1/3">
      <h5 className='h6 md:h5'>修改密碼</h5>
      <ul className='space-y-4'>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">電子信箱</span>
          <span className="block text-subtitle md:text-title">Jessica@exsample.com</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">密碼</span>
          <input type="password" name="" id="" value="●●●●●●" className="block text-subtitle bg-neutral-0" disabled />
        </li>
      </ul>
      <button className="btn-secondary">重設密碼</button>
    </div>
    {/* 基本資料 */}
    <div className="rounded-[20px] bg-neutral-0 p-6 space-y-6 md:space-y-10 md:basis-2/3">
      <h5 className='h6 md:h5'>基本資料</h5>
      <ul className='space-y-4'>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">姓名</span>
          <span className="block text-subtitle md:text-title">Jessica Ｗang</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">手機號碼</span>
          <span className="block text-subtitle md:text-title">+886 912 345 678</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">生日</span>
          <span className="block text-subtitle md:text-title">1990 年 8 月 15 日</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">地址</span>
          <span className="block text-subtitle md:text-title">高雄市新興區六角路 123 號</span>
        </li>
      </ul>
      <button className="btn-secondary">編輯基本資料</button>
    </div>
  </div>
  )
};

export default EditPassword;
