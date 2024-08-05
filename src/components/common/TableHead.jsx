import { FaSort } from "react-icons/fa";

export default function TableHead({onClick,name}) {
      return (<>
            <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer text-sm"
                  onClick={onClick && onClick}
            >
                  <div className='flex items-center capitalize'>
                  {name}
                  <FaSort />
                  </div>
            </th>
      </>)
}