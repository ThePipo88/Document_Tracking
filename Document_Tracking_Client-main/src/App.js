import { BrowserRouter as Router, Route, Routes, Link, Switch } from "react-router-dom";
import routes from './config/routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.layout><route.component /></route.layout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
