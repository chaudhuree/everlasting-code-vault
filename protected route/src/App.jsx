import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// to make this app working we will have login and register page
// but as i am only storing how to use protected route so skip those
// part and just focus on protected route part

// - normal user route for all users
import Home from "./pages/Home";
// protected route
import Dashboard from "./pages/Dashboard";

// - components
import PrivateRoutes from "./components/routes/PrivateRoutes";

// testing purpose route element
const Testing = () => {
  return <div>Testing</div>;
};

function App() {
  return (
    <div className="App">
      <Router>
       
        <Routes>
          <Route path="/" element={<Home />} />
          {/*
            protected routes 
           */}
          <Route path="/dashboard" element={<PrivateRoutes />}>
            {/*
          now the route is just /dashboard as we left the path is empty 
          */}
            <Route path="" element={<Dashboard />} />
            {/*
             now the route will be /dashboard/testing
            */}
            <Route path="testing" element={<Testing />} />
          </Route>
          {/*
            not found path
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
