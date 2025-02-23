import Sharecontent from "../components/Sharecontent";
import Sidebar from "../components/Sidebar";

export default function Sharepage() {
  return (
    <>
      <div className="grid-cols-4">
        <div className="col-span-1">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-3">
          <Sharecontent></Sharecontent>
        </div>
      </div>
    </>
  );
}
