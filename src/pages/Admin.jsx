import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Mail, Star, Check, Trash } from "lucide-react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [replyBox, setReplyBox] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const [notificationCount, setNotificationCount] = useState(0);
  const prevContactsRef = useRef([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const showModal = (message, type = "success") => {
    setModal({ show: true, message, type });
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      const res = await fetch("/.netlify/functions/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      showModal("Backend not running", "error");
    }
  };

  // =========================
  // FETCH CONTACTS
  // =========================
  const fetchContacts = async () => {
    try {
      const res = await fetch("/.netlify/functions/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      if (prevContactsRef.current.length > 0) {
        const diff = safeData.length - prevContactsRef.current.length;
        if (diff > 0) {
          setNotificationCount((prev) => prev + diff);
        }
      }

      prevContactsRef.current = safeData;
      setContacts(safeData);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH TEMPLATES
  // =========================
  const fetchTemplates = async () => {
    try {
      const res = await fetch("/.netlify/functions/templates", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTemplates();
    fetchContacts();

    const interval = setInterval(fetchContacts, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, usersPerPage]);

  // =========================
  // DELETE SUBSCRIBER (FIXED)
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete subscriber?")) return;

    await fetch(`/.netlify/functions/subscribers?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  // =========================
  // DELETE CONTACT (FIXED)
  // =========================
  const deleteContact = async (id) => {
    if (!window.confirm("Delete message?")) return;

    await fetch(`/.netlify/functions/contact?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchContacts();
  };

  // =========================
  // TOGGLE IMPORTANT
  // =========================
  const toggleImportant = async (id) => {
    await fetch(`/.netlify/functions/contact-important?id=${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchContacts();
  };

  // =========================
  // MARK REPLIED
  // =========================
  const markReplied = async (id) => {
    await fetch(`/.netlify/functions/contact-replied?id=${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchContacts();
  };

  // =========================
  // SEND TEMPLATE (FIXED)
  // =========================
  const sendTemplate = async () => {
    if (!selectedTemplate) return showModal("Select template first", "error");

    setLoading(true);

    await fetch("/.netlify/functions/send-template", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        templateName: selectedTemplate,
        subscribers: users, // ✅ send all users
      }),
    });

    showModal("Template sent successfully 🚀");
    setLoading(false);
  };

  // =========================
  // EXPORT
  // =========================
  const handleExport = async () => {
    try {
      const res = await fetch("https://travel-netlify.onrender.com/export", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);

      showModal("Export successful ✅");
    } catch {
      showModal("Export failed", "error");
    }
  };

  // =========================
  // SEND REPLY
  // =========================
  const sendReply = async () => {
    if (!replyMessage) return showModal("Write message", "error");

    await fetch("/.netlify/functions/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: replyBox.email,
        message: replyMessage,
        id: replyBox._id,
      }),
    });

    showModal("Reply sent ✅");
    setReplyBox(null);
    setReplyMessage("");
    fetchContacts();
  };

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) =>
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const barData = [
    { name: "Total", value: users.length },
    { name: "Filtered", value: filteredUsers.length },
  ];

  const pieData = [
    { name: "Total", value: users.length },
    { name: "Filtered", value: filteredUsers.length },
  ];

  const COLORS = ["#3b82f6", "#22c55e"];

  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0">
          <img src="./maldives.jpg" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 pt-20">
          <div className="flex justify-between max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-red-500 px-4 py-2 rounded text-white cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-1 px-4 py-4">
            <div className="bg-white opacity-80 pr-3 pt-3 rounded-xl shadow flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white opacity-80 pr-3 pt-3 rounded-xl shadow flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={90}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white opacity-80 p-4 rounded-xl shadow flex flex-col gap-2">
              <button
                onClick={handleExport}
                className="btn btn-secondary cursor-pointer"
              >
                Export Excel
              </button>

              <select
                className="p-2 border rounded"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="">Select Template</option>
                {templates.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={sendTemplate}
                className="bg-purple-600 text-white py-2 rounded cursor-pointer"
              >
                {loading ? "Sending..." : "Send Template"}
              </button>

              <input
                type="text"
                placeholder="Search email..."
                className="p-2 border rounded"
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="p-2 border rounded"
                value={usersPerPage}
                onChange={(e) => setUsersPerPage(Number(e.target.value))}
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-2 max-w-7xl mx-auto mb-2 px-4 py-4 bg-black opacity-75 rounded-xl shadow">
            <div className="space-y-2">
              <h2 className="text-white text-xl font-semibold">Subscribers</h2>
              {currentUsers.map((user, i) => (
                <div
                  key={user._id}
                  className="flex justify-between bg-white p-4 rounded shadow"
                >
                  <div>
                    #{indexOfFirst + i + 1} — {user.email}
                  </div>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-secondary cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-white text-xl font-semibold">
                Contact Messages (Messages received from)
              </h2>

              {filteredContacts.map((c) => (
                <div
                  key={c._id}
                  className="bg-white p-4 rounded shadow flex justify-between"
                >
                  <div>
                    <div>
                      <b>{c.name}</b> ({c.email})
                    </div>
                    <div>{c.message}</div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setReplyBox(c)}
                      className="btn btn-secondary cursor-pointer"
                    >
                      <Mail size={16} />
                    </button>

                    <button
                      onClick={() => toggleImportant(c._id)}
                      className="btn btn-secondary cursor-pointer"
                    >
                      <Star size={16} />
                    </button>

                    <button
                      onClick={() => markReplied(c._id)}
                      className="btn btn-secondary cursor-pointer"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => deleteContact(c._id)}
                      className="btn btn-secondary cursor-pointer"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {replyBox && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl w-full max-w-md">
                <h2 className="text-lg mb-3">Reply to {replyBox.email}</h2>

                <textarea
                  rows="4"
                  className="w-full p-2 border rounded mb-4"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setReplyBox(null)}
                    className="px-4 py-2 bg-gray-400 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={sendReply}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6 pb-6 gap-2 text-white">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-white text-black rounded cursor-pointer"
            >
              ◀
            </button>

            <span className="px-3 py-1">
              Page {currentPage} / {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages || 1))
              }
              className="px-3 py-1 bg-white text-black rounded cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>
        {/* ✅ FIX: MODAL MOVED OUTSIDE BUT INSIDE FRAGMENT */}
        {modal.show && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
              <h2 className="text-lg font-semibold mb-3">
                {modal.type === "error" ? "Error ❌" : "Success ✅"}
              </h2>

              <p className="mb-4">{modal.message}</p>

              <button
                onClick={() => setModal({ ...modal, show: false })}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;