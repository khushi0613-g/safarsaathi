import React, { useState } from "react";

const AdminDashboard = () => {
const [routeNumber, setRouteNumber] = useState("");
const [routeName, setRouteName] = useState("");
const [routes, setRoutes] = useState([]);

  const handleAddRoute = () => {
  if (!routeNumber || !routeName) {
    alert("Please fill all fields");
    return;
  }
  if (!/^\d+$/.test(routeNumber)) {
  alert("Route Number must contain only numbers");
  return;
}

if (!/^[A-Za-z\s]+$/.test(routeName)) {
  alert("Route Name must contain only letters");
  return;
}

  const newRoute = {
    id: Date.now(),
    routeNumber,
    routeName,
  };

  setRoutes([...routes, newRoute]);

  setRouteNumber("");
  setRouteName("");
};

  return (
    
    <div className="p-10 bg-gray-100 min-h-screen max-w-7xl mx-auto">
     <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-4xl font-bold text-gray-800">
      Safar Saathi Admin Panel
    </h1>
    <p className="text-gray-500 mt-1">
      Manage Routes, Buses and City Transport Data
    </p>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("isAdmin");
      window.location.href = "/admin-login";
    }}
    className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg"
  >
    Logout
  </button>
</div>

      <div className="max-w-md space-y-4">

        <input
          type="number"
          placeholder="Route Number"
          value={routeNumber}
          onChange={(e) => setRouteNumber(e.target.value)}
          className="w-full md:w-[500px] border p-3 rounded-lg shadow-sm"
        />

        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="w-full md:w-[500px] border p-3 rounded-lg shadow-sm"
        />

        <button
          onClick={handleAddRoute}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Add Route
        </button>
        <div className="mt-10">
            <input
  type="text"
  placeholder="Search Route..."
  className="w-full md:w-[500px] border p-3 rounded-lg shadow-sm"
/>
<div className="mt-8"></div>
  <h2 className="text-2xl font-bold mb-4">
    Route List
  </h2>

  <table className="w-[500px] border shadow bg-white">
    <thead>
      <tr className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
        <th className="p-3">Route No.</th>
        <th className="p-3">Route Name</th>
        <th className="p-3">Action</th>
      </tr>
    </thead>
   

    <tbody>
      {routes.map((route) => (
       <tr key={route.id}>
  <td className="p-3">{route.routeNumber}</td>

  <td className="p-3">{route.routeName}</td>

  <td className="p-3">
    <button
      onClick={() =>
        setRoutes(routes.filter(r => r.id !== route.id))
      }
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
    >
      Delete
    </button>
  </td>
</tr>
      ))}
    </tbody>
  </table>
  
</div>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

  <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg">Total Routes</h3>
    <p className="text-4xl font-bold mt-2">
  {routes.length}
</p>
  </div>

  <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg">Active Buses</h3>
    <p className="text-4xl font-bold mt-2">12</p>
  </div>

  <div className="bg-orange-500 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg">Total Stops</h3>
    <p className="text-4xl font-bold mt-2">48</p>

  </div>
  <div className="bg-white shadow rounded-xl p-5 mt-8 w-[700px]">
  <h3 className="text-xl font-bold mb-3">
    Recent Activity
  </h3>

  <ul className="space-y-2 text-gray-600">
    <li>✓ Route management enabled</li>
    <li>✓ Admin login successful</li>
    <li>✓ Live bus tracking active</li>
  </ul>
</div>
  

</div>
<div className="mt-10 text-center text-gray-500">
  © 2026 Safar Saathi | Smart City Bus Tracking System
</div>

        

      </div>
      
    </div>
    
  );
};

export default AdminDashboard;