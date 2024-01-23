import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import FaceAPI from "./components/Api/facial";
import HandAPI from "./components/HandAPI/hand";
import Home from "./components/Home/Home";
export default function App() {
  return (
      <BrowserRouter >

          <Routes>
            <Route path ="*" element={<Navigate to="/"/>}></Route>   {/*this route will be used as a catch-all route for any undefined or unmatched URLs. */}
            <Route path="/" element ={<Home/>} ></Route>
              <Route path="/faceAPI" element ={<FaceAPI/>} ></Route>
              <Route path="/handAPI" element ={<HandAPI/>} ></Route>
          </Routes>

      </BrowserRouter>
  );
}


