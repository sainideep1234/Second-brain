
import Authorized from "./pages/Authorized";
import Dashboard from "./pages/Dashboard";
import Errorpage from "./pages/Errorpage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Sharepage from "./pages/Sharepage";
import { Routes, Route } from "react-router-dom";

//
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Authorized><Dashboard /> </ Authorized> } />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share/:link" element={<Sharepage />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </>
  );
}
export default App;
