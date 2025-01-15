import { useState } from "react";

export default function AddPasswordModal({ isOpen, onClose, onSave }) {
    const [newPassword, setNewPassword] = useState({
        website: "",
        username: "",
        password: "",
        remarks: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(newPassword);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl mb-4">Add New Password</h2>
                <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={newPassword.website}
                    onChange={handleChange}
                    className="border rounded w-full px-2 py-1 mb-2"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newPassword.username}
                    onChange={handleChange}
                    className="border rounded w-full px-2 py-1 mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newPassword.password}
                    onChange={handleChange}
                    className="border rounded w-full px-2 py-1 mb-2"
                />
                <textarea
                    name="remarks"
                    placeholder="Remarks"
                    value={newPassword.remarks}
                    onChange={handleChange}
                    className="border rounded w-full px-2 py-1 mb-2"
                />
                <div className="flex justify-between">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
