import { FAKE_LAYOUT_INFO, FAKE_FACILITY_INFO, FAKE_AMENITY_INFO } from "@constants";
import { RoomBasicInfo } from "@components";

const RoomDetail = () => {
  return(<>
  {/* swiper */}
  <section className="container py-10 text-neutral-80 bg-primary-10">
    <div>
      <h2 className="h3 align-middle text-neutral-100">尊爵雙人房</h2>
      <p className="text-body2">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
    </div>
    <div>
      <h3>房型基本資訊</h3>
      <RoomBasicInfo
        area="24坪"
        bed="一張大床"
        people={2} />
    </div>
    <div>
      <h3>房間格局</h3>
      <ul className="bg-neutral-0 p-6 rounded-lg flex justify-start items-cente flex-wrap gap-6">
        {
          FAKE_FACILITY_INFO.map((item, index) => (
            <li key={index} className="w-28">
              {
                item.isProvide ?
                  <span className="material-symbols-outlined align-bottom text-primary-100">check</span> :
                  <span className="material-symbols-outlined align-bottom text-primary-100">close</span>
              }
              <span className="ml-2 text-title align-bottom">{item.title}</span>
            </li>
          ))
        }
      </ul>
    </div>

  </section>
  </>);
};

export default RoomDetail;
