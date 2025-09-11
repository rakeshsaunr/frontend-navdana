// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res.data)
      setOrders(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-0 m-0 w-full min-h-screen bg-gray-50">
      <div className="w-full px-2 sm:px-4 md:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center tracking-tight w-full">
          Orders Management
        </h2>

        {/* Responsive Table */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Order ID</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Customer</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Items</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Payment</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Total</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Placed At</th>
                  <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="border-b px-4 py-2 text-xs break-all">{order._id}</td>
                    <td className="border-b px-4 py-2">
                      <div className="font-medium">{order.shippingAddress?.fullName}</div>
                      <div className="text-xs text-gray-500">{order.user?.email}</div>
                    </td>
                    <td className="border-b px-4 py-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          {item.name} x {item.quantity} <span className="text-gray-500">(${item.price})</span>
                        </div>
                      ))}
                    </td>
                    <td className="border-b px-4 py-2 capitalize">
                      <div className="text-xs">{order.paymentMethod}</div>
                      {order.isPaid ? (
                        <span className="text-green-600 font-semibold text-xs">Paid</span>
                      ) : (
                        <span className="text-red-600 text-xs">Unpaid</span>
                      )}
                    </td>
                    <td className="border-b px-4 py-2 font-semibold text-xs">
                      ₹{order.prices?.totalPrice}
                    </td>
                    <td className="border-b px-4 py-2 capitalize text-xs">{order.status}</td>
                    <td className="border-b px-4 py-2 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border-b px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center p-6 text-gray-500 text-sm">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile List */}
        <div className="block md:hidden">
          {orders.length === 0 && (
            <div className="text-center p-6 text-gray-500 text-sm">
              No orders found
            </div>
          )}
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-base text-gray-800 truncate">{order.shippingAddress?.fullName}</div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate">{order.user?.email}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700"
                    >
                      {item.name} x {item.quantity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium text-gray-700">
                    Payment: {order.paymentMethod}
                  </span>
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold text-xs">Paid</span>
                  ) : (
                    <span className="text-red-600 text-xs">Unpaid</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Total:</span>
                  <span className="font-semibold text-sm">₹{order.prices?.totalPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Placed:</span>
                  <span className="text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs w-full focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
