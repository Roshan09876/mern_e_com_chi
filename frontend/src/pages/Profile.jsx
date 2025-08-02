import React, { useEffect, useState } from 'react';
import { getProfileApi } from '../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const res = await getProfileApi(userId);
          setUser(res.data.user);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 User Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="text-gray-600 font-semibold">Full Name</label>
          <p className="text-gray-900">{user.name}</p>
        </div>
        <div>
          <label className="text-gray-600 font-semibold">Email</label>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="text-gray-600 font-semibold">Role</label>
          <p className="text-gray-900">{user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
        <div>
          <label className="text-gray-600 font-semibold">Cart Items</label>
          <p className="text-gray-900">
            {Object.keys(user.cartData || {}).length} item(s)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
