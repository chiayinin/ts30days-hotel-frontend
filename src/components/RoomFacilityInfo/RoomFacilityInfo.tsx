import { Facility } from "@types";

export const RoomFacilityInfo = ({list, className}: {list: Facility[], className?:string}) => {
  return(<ul className={`bg-neutral-0 p-6 rounded-lg flex justify-start items-cente flex-wrap gap-6 ${className}`}>
    {
      list.map((item, index) => (
        <li key={index} className="w-28">
          <span className="material-symbols-outlined align-bottom text-primary-100">
            {item.isProvide ? 'check' : 'close'}
          </span>
          <span className="ml-2 text-title align-bottom">{item.title}</span>
        </li>
      ))
    }
  </ul>)
}
