"use client";
import { getSession } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { lusitana } from "../ui/fonts";
import { useState, useEffect } from "react";
import PasswordTable from "../components/PasswordTable";
import AddPasswordModal from "../components/AddPasswordModal";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPasswords, setShowPasswords] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (session) {
            fetch("http://localhost:4000/api/passwords")
                .then((response) => response.json())
                .then((data) => {
                    setPasswords(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching passwords:", error);
                    setLoading(false);
                });
        }
    }, [session]);

    const handleAddPassword = (newPassword) => {
        fetch("http://localhost:4000/api/passwords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword),
        })
            .then((response) => response.json())
            .then((data) => {
                setPasswords((prevPasswords) => [...prevPasswords, data]);
            })
            .catch((error) => console.error("Error adding password:", error));
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    return (
        <div className="flex flex-col p-6 min-h-screen">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <h1 className={`text-white ${lusitana.className} text-3xl`}>Password Manager</h1>
            </div>

            <div className="mt-4 flex flex-col gap-6 md:flex-row w-full">
                <div className="w-full">
                    <PasswordTable passwords={passwords} setPasswords={setPasswords} showPasswords={showPasswords} setShowPasswords={setShowPasswords} loading={loading} />
                </div>
            </div>

            {/* Logout Button (links, fixed) */}
            <div className="fixed bottom-6 left-6">
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Add Button (größer, runder) */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white p-6 rounded-full shadow-lg hover:bg-blue-400 transition-colors"
                >
                    +
                </button>
            </div>

            <AddPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddPassword} />
        </div>
    );
}