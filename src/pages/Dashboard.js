import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../api/axios";

/* Helpers for formatting AI responses */
const formatAnswerBlocks = (text) => {
    if (!text) return [];
    const normalized = String(text).replace(/\r\n/g, "\n");
    const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    return paragraphs;
};

const renderParagraph = (paragraph, idx) => {
    const lines = paragraph.split("\n").map((l) => l.trim()).filter(Boolean);
    const isAllBullets = lines.length > 1 && lines.every((l) => /^(-|\*|\d+\.)\s+/.test(l));
    const parseBold = (text) => {
        return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
            if (/^\*\*[^*]+\*\*$/.test(part)) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return <React.Fragment key={i}>{part}</React.Fragment>;
        });
    };

    if (isAllBullets) {
        const ordered = lines.every((l) => /^\d+\.\s+/.test(l));
        return ordered ? (
            <ol key={idx} className="list-decimal list-inside ml-4 space-y-1">
                {lines.map((l, i) => (
                    <li key={i}>{parseBold(l.replace(/^\d+\.\s+/, ""))}</li>
                ))}
            </ol>
        ) : (
            <ul key={idx} className="list-disc list-inside ml-4 space-y-1">
                {lines.map((l, i) => (
                    <li key={i}>{parseBold(l.replace(/^(-|\*)\s+/, ""))}</li>
                ))}
            </ul>
        );
    }
    return (
        <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
            {parseBold(paragraph)}
        </p>
    );
};


const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");

    const [editingDocId, setEditingDocId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editFile, setEditFile] = useState(null);

    const [selectedDocId, setSelectedDocId] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("access")) {
            window.location.href = "/";
        }
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/documents/");
            setDocuments(res.data);
        } catch (err) {
            console.error("Failed to load documents:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        setLoading(true);
        try {
            await axios.post("/documents/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Document uploaded successfully!");
            setFile(null);
            setTitle("");
            await fetchDocuments();
        } catch (err) {
            console.error("Upload failed", err);
            toast.error("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/documents/${id}/`);
            toast.success("Document deleted!");
            if (selectedDocId === id) {
                setSelectedDocId(null);
                setQuestion("");
                setAnswer("");
            }
            if (editingDocId === id) {
                setEditingDocId(null);
                setEditTitle("");
                setEditFile(null);
            }
            await fetchDocuments();
        } catch (err) {
            console.error("Delete failed", err);
            toast.error("Delete failed.");
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (doc) => {
        setEditingDocId(doc.id);
        setEditTitle(doc.title);
        setEditFile(null);
        setAnswer("");
        setQuestion("");
    };

    const cancelEdit = () => {
        setEditingDocId(null);
        setEditTitle("");
        setEditFile(null);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editTitle) return;

        const formData = new FormData();
        formData.append("title", editTitle);
        if (editFile) formData.append("file", editFile);

        setLoading(true);
        try {
            await axios.put(`/documents/${editingDocId}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Document updated!");
            cancelEdit();
            await fetchDocuments();
        } catch (err) {
            console.error("Update failed", err);
            toast.error("Update failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleAsk = async () => {
        if (!question) return;

        setLoading(true);
        try {
            const res = await axios.post(`/documents/${selectedDocId}/ask/`, { question });
            // store raw response and friendly answer
            setAnswer(res.data.answer ?? (res.data?.answer_text || String(res.data)));
            toast.success("Answer generated!");
        } catch (err) {
            console.error("Q&A failed", err);
            setAnswer("Something went wrong while answering.");
            toast.error("Something went wrong while answering.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 p-6 flex flex-col items-center">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-blue-700">DocAI Dashboard</h1>
                <p className="text-gray-600 mt-2 text-sm">
                    ➤ Upload ➤ Manage ➤ Ask Questions — Powered by AI
                </p>
            </header>

            {loading && (
                <div className="mb-6">
                    <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Upload / Edit Section */}
            <section className="w-full max-w-xl mb-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    {editingDocId ? "✏️ Edit Document" : "📤 Upload a New Document"}
                </h2>
                <form onSubmit={editingDocId ? handleUpdate : handleUpload} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Document title"
                        value={editingDocId ? editTitle : title}
                        onChange={(e) =>
                            editingDocId ? setEditTitle(e.target.value) : setTitle(e.target.value)
                        }
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <div className="space-y-1">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                editingDocId ? setEditFile(e.target.files[0]) : setFile(e.target.files[0])
                            }
                            className="w-full"
                            disabled={loading}
                        />
                        <p className="text-sm text-gray-500 italic">
                            {editingDocId
                                ? editFile
                                    ? `Selected: ${editFile.name} (${(editFile.size / 1024).toFixed(1)} KB)`
                                    : "No new file selected"
                                : file
                                    ? `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
                                    : "No file selected"}
                        </p>
                    </div>

                    <div className="space-x-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            {editingDocId ? "Update Document" : "Upload"}
                        </button>
                        {editingDocId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            {/* Document List */}
            <section className="w-full max-w-3xl mb-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>
                {documents.length === 0 ? (
                    <p className="text-gray-500">No documents found.</p>
                ) : (
                    <div className="space-y-4">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="border border-gray-200 bg-white rounded p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm"
                            >
                                <div className="text-lg font-medium text-gray-800 text-left">
                                    {doc.title}{" "}
                                    <span className="text-sm text-gray-500">({doc.file.split("/").pop()})</span>
                                </div>
                                <div className="mt-2 md:mt-0 space-x-2 text-right">
                                    <button
                                        onClick={() => startEdit(doc)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedDocId(doc.id);
                                            setAnswer("");
                                            setQuestion("");
                                        }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        disabled={loading}
                                    >
                                        Ask
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Q&A Section */}
            {selectedDocId && (
                <section className="w-full max-w-3xl text-center">
                    {(() => {
                        const selectedDoc = documents.find((doc) => doc.id === selectedDocId);
                        return (
                            <h2 className="text-2xl font-semibold mb-4">
                                ❓ Ask a Question about "{selectedDoc?.title}"
                            </h2>
                        );
                    })()}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAsk();
                        }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here"
                            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            Ask
                        </button>
                    </form>

                    {answer && (
                        <div className="mt-6 bg-white p-4 border border-blue-100 rounded shadow-sm text-left">
                            <div className="flex items-start justify-between">
                                <div>
                                    <strong className="text-blue-800">AI Answer:</strong>
                                    <div className="mt-2 space-y-3">
                                        {formatAnswerBlocks(answer).map((block, i) => renderParagraph(block, i))}
                                    </div>
                                </div>

                                <div className="ml-4 flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => {
                                            const txt = typeof answer === "string" ? answer : JSON.stringify(answer, null, 2);
                                            navigator.clipboard.writeText(txt).then(
                                                () => toast.success("Answer copied to clipboard!"),
                                                () => toast.error("Copy failed")
                                            );
                                        }}
                                        className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                                    >
                                        Copy Answer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Dashboard;