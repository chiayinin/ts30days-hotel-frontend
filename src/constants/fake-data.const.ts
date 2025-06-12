import { Room } from "@types";

/**
 * 假資料：房間格局
 */
export const FAKE_LAYOUT_INFO: Room['layoutInfo'] = [
  { title: "市景", isProvide: true },
  { title: "獨立衛浴", isProvide: true },
  { title: "客廳", isProvide: true },
  { title: "書房", isProvide: false },
  { title: "樓層電梯", isProvide: true },
];
/**
 * 假資料：房內設備
 */
export const FAKE_FACILITY_INFO: Room['facilityInfo'] = [
  { title: "平面電視", isProvide: false },
  { title: "吹風機", isProvide: true },
  { title: "冰箱", isProvide: true },
  { title: "熱水壺", isProvide: true },
  { title: "檯燈", isProvide: true },
  { title: "衣櫃", isProvide: true },
  { title: "除濕機", isProvide: true },
  { title: "浴缸", isProvide: true },
  { title: "書桌", isProvide: true },
  { title: "音響", isProvide: false },
];
/**
 * 假資料：備品提供
 */
export const FAKE_AMENITY_INFO: Room['amenityInfo'] = [
  { title: "衛生紙", isProvide: true },
  { title: "拖鞋", isProvide: true },
  { title: "衛浴用品", isProvide: true },
  { title: "清潔用品", isProvide: false },
  { title: "刮鬍刀", isProvide: true },
  { title: "吊衣架", isProvide: true },
  { title: "浴巾", isProvide: true },
  { title: "牙刷用品", isProvide: true },
  { title: "罐裝水", isProvide: true },
  { title: "梳子", isProvide: true },
];
