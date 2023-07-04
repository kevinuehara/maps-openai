import { PropsWithChildren } from "react";

interface SideBarProps {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
}

export const SideBar: React.FC<PropsWithChildren<SideBarProps>> = ({
  children,
  isOpen,
  handleOpen,
}) => {
  return (
    <div className="absolute z-10">
      <div className="bg-white p-6 relative m-[14px] rounded-sm">
        <button
          onClick={() => handleOpen(!isOpen)}
          className="bg-hamburger w-[28px] h-[28px] absolute text-4xl left-2 top-1"
          id="button_aside"
        >
          ≡
        </button>
      </div>

      {isOpen && (
        <aside
          className="grid fixed top-0 bg-[#F6F9FE] w-3/12 h-full left-0 ease-out delay-150 duration-300 rounded-r-[25px] rounded-bl-[25px]"
          id="aside"
        >
          <div className="flex justify-between mt-8">
            <h1 className="text-[#6164E8] font-bold text-[13px] text-center text-xl ml-5">
              OpenAI
            </h1>
            <i
              className="mr-8 hover:text-red-600 hover:cursor-pointer text-xl"
              onClick={() => handleOpen(false)}
            >
              X
            </i>
          </div>
          <div className="flex flex-col h-screen ml-5 mt-3">{children}</div>
        </aside>
      )}
    </div>
  );
};
