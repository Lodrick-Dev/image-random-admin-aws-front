import styled from "styled-components";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import Notification from "./globale/Notification";
import { Dynamic } from "./context/DynamicContext";
import Spin from "./globale/Spin";
import Pop from "./globale/Pop";

function App() {
  const { notif, spin, imgSelect } = Dynamic();
  return (
    <StyledApp className="App">
      {imgSelect.length > 0 && <Pop />}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      {notif && <Notification />}
      {spin ? <Spin /> : undefined}
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background: #404040;
  /* height: 110vh; */
`;
