import { GlobalContext } from "@core";
import { useContext } from "react";

export const Loader = (() => {
  const { isLoading } = useContext(GlobalContext);

  return(
    isLoading && (
      <div className="w-full h-full fixed inset-0 m-auto flex justify-center items-center bg-gradient-to-tr from-primary-120/50 to-primary-80/100 z-50">
        <span className="loader"></span>
      </div>
    )
  )
})
