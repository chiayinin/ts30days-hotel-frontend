import { FAKE_LAYOUT_INFO, FAKE_FACILITY_INFO, FAKE_AMENITY_INFO } from "@constants";
import { RoomBasicInfo } from "@components";
import { RoomFacilityInfo } from "@components";

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
      <RoomFacilityInfo list={FAKE_FACILITY_INFO} />
    </div>
  </section>
  </>);
};

export default RoomDetail;
