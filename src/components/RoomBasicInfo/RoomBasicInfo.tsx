import iconBed from "@assets/icons/icon-bed.svg";
import iconProfile from "@assets/icons/icon-profile.svg";
import iconSize from "@assets/icons/icon-size.svg";

type ContentType = {
  area: string;
  bed: string;
  people: number;
};

export const RoomBasicInfo = ({area, bed, people}: ContentType) => {
  return(<ul className="flex justify-start items-center gap-4">
    <li className="border border-primary-40 rounded-lg bg-neutral-0 px-4 py-5 space-y-2 min-w-24 h-24">
      <img src={iconSize} alt="房間坪數" />
      <span className="text-subtitle lg:text-title block">{area}</span>
    </li>
    <li className="border border-primary-40 rounded-lg bg-neutral-0 p-4 py-5 space-y-2 min-w-[100px] h-24">
      <img src={iconBed} alt="房間床型" />
      <span className="text-subtitle lg:text-title block">{bed}</span>
    </li>
    <li className="border border-primary-40 rounded-lg bg-neutral-0 p-4 py-5 space-y-2 min-w-24 h-24">
      <img src={iconProfile} alt="房間人數" />
      <span className="text-subtitle lg:text-title block">{people} 人</span>
    </li>
  </ul>)
}
