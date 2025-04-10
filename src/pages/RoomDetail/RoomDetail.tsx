import { useState } from "react";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

import { FAKE_LAYOUT_INFO, FAKE_FACILITY_INFO, FAKE_AMENITY_INFO } from "@constants";
import { RoomBasicInfo } from "@components";
import { RoomFacilityInfo } from "@components";


const RoomDetail = () => {
  // Booking People inupt number
  const [bookingPeople, setBookingPeople] = useState<number>(2);
  const maxBookingPeople = 4;

  // Calendar
  const [startDate, setStartDate] = useState<Nullable<Date>>(null);
  const [endDate, setEndDate] = useState<Nullable<Date>>(null);
  const minStartDate = new Date();
  const maxStartDate = !endDate ? undefined : new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  const minEndDate = !startDate ? undefined : new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return(<>
  {/* swiper */}
  <section className="container py-10 lg:py-[120px] text-neutral-80 bg-primary-10">
    {/* room info */}
    <div className="max-w-[746px] space-y-6 lg:space-y-20">
      <div>
        <h2 className="h3 lg:h1 align-middle text-neutral-100 mb-4">尊爵雙人房</h2>
        <p className="text-body2 lg:text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房型基本資訊</h3>
        <RoomBasicInfo
          area="24坪"
          bed="一張大床"
          people={2} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房間格局</h3>
        <RoomFacilityInfo list={FAKE_LAYOUT_INFO} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房內設備</h3>
        <RoomFacilityInfo list={FAKE_FACILITY_INFO} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">備品提供</h3>
        <RoomFacilityInfo list={FAKE_AMENITY_INFO} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">訂房須知</h3>
        <ol className="list-decimal list-inside text-body2 lg:text-body">
          <li>入住時間為下午3點，退房時間為上午12點。</li>
          <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
          <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
          <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
          <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
          <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
          <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
          <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
          <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
          <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
        </ol>
      </div>
    </div>
    {/* room booking */}
    {/* hidden lg:block */}
    <div className=" bg-neutral-0 text-neutral-80 rounded-[20px] p-10 w-[478px] space-y-10 ">
      <h3 className="h5 pb-4 border-b border-neutral-40 text-neutral-100">預訂房型</h3>
      <div>
        <h2 className="h2 align-middle mb-2">尊爵雙人房</h2>
        <p className="text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
      </div>
      <div>
        <div className="flex gap-4 mb-4">
          <div className="border border-neutral-100 rounded-lg p-4">
            <label htmlFor="startDateCalendar" className="text-tiny block mb-1">
              入住（不可超過退房日）
            </label>
            <Calendar
              id="startDateCalendar"
              value={startDate}
              onChange={(e) => setStartDate(e.value)} dateFormat="yy/mm/dd"
              minDate={minStartDate}
              maxDate={maxStartDate}
              placeholder="請選擇入住日期"
              inputClassName="text-body"
              locale="zh-TW"
              showButtonBar
              todayButtonClassName="hidden"
              clearButtonClassName="btn-secondary"
              panelClassName="p-8 text-title text-neutral-100"
              touchUI
            />
          </div>
          <div className="border border-neutral-100 rounded-lg p-4">
            <label htmlFor="endDateCalendar" className="text-tiny block mb-1">
              退房（不可早於入住日）
            </label>
            <Calendar
              id="endDateCalendar"
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              dateFormat="yy/mm/dd"
              minDate={minEndDate}
              // maxDate={maxEndDate}
              placeholder="請選擇退房日期"
              inputClassName="text-body"
              locale="zh-TW"
              showButtonBar
              todayButtonClassName="hidden"
              clearButtonClassName="btn-secondary"
              panelClassName="p-8 text-title text-neutral-100"
              touchUI
             />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-title text-neutral-100">人數</span>
          <InputNumber
            value={bookingPeople}
            onValueChange={(e: InputNumberValueChangeEvent) => setBookingPeople(e.value)}
            showButtons
            buttonLayout="horizontal"
            min={1}
            max={maxBookingPeople}
            decrementButtonClassName="p-4 border rounded-full border-primary-40 w-14 h-14"
            incrementButtonClassName="p-4 border rounded-full border-primary-40 w-14 h-14"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            inputClassName="focus:shadow-none focus:ring-2 focus:ring-primary-100 h6 mx-4 w-4 text-center"
            />
        </div>

      </div>


      <span className="block h5 text-primary-100">NT$ 10,000</span>
      <div className="w-full text-title text-center btn-primary">立即預訂</div>
    </div>
  </section>
  </>);
};

export default RoomDetail;
