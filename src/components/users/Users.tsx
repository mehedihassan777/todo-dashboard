"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/services/user-service";
import type { UserDetailOutputInterface } from "@/types/user-detail-output.interface";
import { motion, AnimatePresence } from "framer-motion";

const modalBackdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modalVariant = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.1 } },
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserDetailOutputInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetailOutputInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError("Failed to fetch users."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto lg:px-0 px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#0f2f54]">Users</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-base text-left rtl:text-right text-gray-500">
            <thead className="text-base text-gray-700 capitalize bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Company</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b border-gray-200"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 font-normal">{user.email}</td>
                  <td className="px-6 py-4 font-normal">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-[rgba(15,47,84,0.6)] bg-opacity-40 flex items-center justify-center z-[9999]"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg p-0 max-w-md w-full relative"
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-[#0f2f54]">
                <h2 className="text-base font-bold text-white">{selectedUser.name}</h2>
                <button
                  className="text-xl bg-[#415d7e99] rounded h-6 w-6 flex justify-center items-center text-white cursor-pointer"
                  onClick={() => setSelectedUser(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="divide-y divide-gray-200 p-4">
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Username</span>: {selectedUser.username}</div>
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Email</span>: {selectedUser.email}</div>
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Phone</span>: {selectedUser.phone}</div>
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Website</span>: {selectedUser.website}</div>
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Company</span>: {selectedUser.company.name}</div>
              <div className="p-3 flex"><span className="font-semibold text-gray-900 min-w-[100px]">Address</span><span className="min-w-[10px]">:</span> {selectedUser.address.suite}, {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
