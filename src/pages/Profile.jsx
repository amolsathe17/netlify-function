import { useState } from "react";
import { Mail, Phone, MapPin, Edit3, Save } from "lucide-react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: "Amol Sathe",
    email: "amol@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    bio: "Travel enthusiast ✈️ |  UI/UX Explorer"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-200 relative flex items-center justify-center p-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">

      {/* 🌄 Background Image */}
      <div className="absolute inset-0">
        <img
          src="./m6.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 📦 Profile Card */}
      
      <div className="relative z-0 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 md:mt-20">
          <div className="mb-10 md:-mt-10 text-left text-white">
       <h1 className="text-3xl font-bold text-white mb-6">
          Profile
            </h1>

          </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {user.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">
            {!editMode ? (
              <>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-slate-300 mt-1">{user.bio}</p>

                <div className="mt-4 space-y-2 text-slate-300">
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {user.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} /> {user.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> {user.location}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <input
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Name"
                />

                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Email"
                />

                <input
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Phone"
                />

                <input
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Location"
                />

                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Bio"
                />
              </div>
            )}
          </div>

          {/* Button */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition"
          >
            {editMode ? <Save size={18} /> : <Edit3 size={18} />}
            {editMode ? "Save" : "Edit"}
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <h3 className="text-xl font-bold text-white">24</h3>
            <p className="text-slate-300 text-sm">Trips</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <h3 className="text-xl font-bold text-white">12</h3>
            <p className="text-slate-300 text-sm">Countries</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <h3 className="text-xl font-bold text-white">5★</h3>
            <p className="text-slate-300 text-sm">Rating</p>
          </div>
        </div>

      </div>
    </div>
  );
}