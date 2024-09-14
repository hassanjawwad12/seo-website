//this is the landing page of the app with the functionality of sign-in with google
import Admin from "./Components/Admin";
import Landing from "./Components/Landing";
import Options from "./Components/Options";
import Selection from "./Components/Selection";
import Response from "./Components/Response";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
    
  
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={Landing()} />
            <Route path="admin" element={<Admin />} />
            <Route path="options" element={<Options />} />
            <Route path="selection" element={<Selection />} />
            <Route path="response" element={<Response />} />
          
            {/* <Route path="login" element={<Login />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
