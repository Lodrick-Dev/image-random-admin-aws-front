import styled from "styled-components";
import Home from "./components/Home";
import { Route, Routes, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import Notification from "./globale/Notification";
import { Dynamic } from "./context/DynamicContext";
import Spin from "./globale/Spin";
import PopImageSelect from "./globale/PopImageSelect";
import PopUserSelect from "./globale/PopUserSelect";

function App() {
  const { notif, spin, imgSelect, userSelect } = Dynamic();
  return (
    <StyledApp className="App">
      {imgSelect.length > 0 && <PopImageSelect />}
      {userSelect.length > 0 && <PopUserSelect />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {notif && <Notification />}
      {spin ? <Spin /> : undefined}
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  /* background: #404040; */
  /* background: red; */
  height: 100vh;
`;
