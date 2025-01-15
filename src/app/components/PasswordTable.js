import { useState } from "react";
import { getSession } from "next-auth/react";
import ShowPasswordIcon from "../components/icons/ShowPasswordIcon";
import HidePasswordIcon from "../components/icons/HidePasswordIcon";

export default function PasswordTable({ passwords, setPasswords, showPasswords, setShowPasswords, loading }) {
    const togglePasswordVisibility = (id) => {
        setShowPasswords((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleEdit = (id) => {
        setPasswords((prevPasswords) =>
            prevPasswords.map((password) =>
                password.id === id
                    ? { ...password, isEditing: true, editWebsite: password.website, editUsername: password.username, editPassword: password.password, editRemarks: password.remarks }
                    : password
            )
        );
    };

    const handleSave = (id) => {
        const updatedPassword = passwords.find((password) => password.id === id);
        fetch(`http://localhost:4000/api/passwords/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                website: updatedPassword.editWebsite,
                username: updatedPassword.editUsername,
                password: updatedPassword.editPassword,
                remarks: updatedPassword.editRemarks,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                setPasswords((prevPasswords) =>
                    prevPasswords.map((password) =>
                        password.id === id
                            ? { ...password, isEditing: false, website: updatedPassword.editWebsite, username: updatedPassword.editUsername, password: updatedPassword.editPassword, remarks: updatedPassword.editRemarks }
                            : password
                    )
                );
            })
            .catch((error) => console.error("Error updating password:", error));
    };

    const handleCancel = (id) => {
        setPasswords((prevPasswords) =>
            prevPasswords.map((password) =>
                password.id === id ? { ...password, isEditing: false } : password
            )
        );
    };

    const handleFieldChange = (id, field, value) => {
        setPasswords((prevPasswords) =>
            prevPasswords.map((password) =>
                password.id === id ? { ...password, [field]: value } : password
            )
        );
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/api/passwords/${id}`, { method: "DELETE" })
            .then(() => {
                setPasswords((prevPasswords) =>
                    prevPasswords.filter((password) => password.id !== id)
                );
            })
            .catch((error) => console.error("Error deleting password:", error));
    };

    return (
        <div className="flex flex-col w-full rounded-lg bg-gray-50 px-6 py-8 md:w-4/4">
            <h2 className="text-2xl text-gray-800 mb-6">Your Saved Passwords</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left border border-gray-300">Website</th>
                            <th className="py-2 px-4 text-left border border-gray-300">Username</th>
                            <th className="py-2 px-4 text-left border border-gray-300">Password</th>
                            <th className="py-2 px-4 text-left border border-gray-300">Remarks</th>
                            <th className="py-2 px-4 text-left border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-2 px-4 text-center">Loading...</td>
                            </tr>
                        ) : (
                            passwords.map((password) => (
                                <tr key={password.id}>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {password.isEditing ? (
                                            <input
                                                type="text"
                                                value={password.editWebsite}
                                                onChange={(e) =>
                                                    handleFieldChange(password.id, "editWebsite", e.target.value)
                                                }
                                                className="border rounded px-2 py-1"
                                            />
                                        ) : (
                                            password.website
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {password.isEditing ? (
                                            <input
                                                type="text"
                                                value={password.editUsername}
                                                onChange={(e) =>
                                                    handleFieldChange(password.id, "editUsername", e.target.value)
                                                }
                                                className="border rounded px-2 py-1"
                                            />
                                        ) : (
                                            password.username
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {password.isEditing ? (
                                            <div className="flex items-center">
                                                <input
                                                    type={showPasswords[password.id] ? "text" : "password"}
                                                    value={password.editPassword}
                                                    onChange={(e) =>
                                                        handleFieldChange(password.id, "editPassword", e.target.value)
                                                    }
                                                    className="border rounded px-2 py-1 flex-grow"
                                                />
                                                <button
                                                    onClick={() => togglePasswordVisibility(password.id)}
                                                    className="ml-2"
                                                    title={showPasswords[password.id] ? "Hide password" : "Show password"}
                                                >
                                                    {showPasswords[password.id] ? (
                                                        <HidePasswordIcon />
                                                    ) : (
                                                        <ShowPasswordIcon />
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                onClick={() => togglePasswordVisibility(password.id)}
                                                className="cursor-pointer"
                                            >
                                                {showPasswords[password.id] ? password.password : "******"}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {password.isEditing ? (
                                            <input
                                                type="text"
                                                value={password.editRemarks}
                                                onChange={(e) =>
                                                    handleFieldChange(password.id, "editRemarks", e.target.value)
                                                }
                                                className="border rounded px-2 py-1"
                                            />
                                        ) : (
                                            password.remarks
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {password.isEditing ? (
                                            <>
                                                <button
                                                    onClick={() => handleSave(password.id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(password.id)}
                                                    className="bg-gray-500 text-white px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(password.id)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(password.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
