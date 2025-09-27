import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../api/axios";

/* Helpers for formatting AI responses */
const formatAnswerBlocks = (text) => {
  if (!text) return [];
  const normalized = String(text).replace(/\r\n/g, "\n");
  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs;
};

const renderParagraph = (paragraph, idx) => {
  const lines = paragraph
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const isAllBullets =
    lines.length > 1 && lines.every((l) => /^(-|\*|\d+\.)\s+/.test(l));
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
    <p
      key={idx}
      className="text-gray-700 leading-relaxed whitespace-pre-line"
    >
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
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const query = user?.id ? `?userId=${user.id}` : "";
      const res = await axios.get(`/documents${query}`);
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
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.id) formData.append("userId", String(user.id));

    setLoading(true);
    try {
      await axios.post("/documents", formData, {
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
      await axios.delete(`/documents/${id}`);
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
      const msg = err.response?.data?.error || "Delete failed.";
      toast.error(msg);
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

    // Not supported by backend currently
    toast.info("Update is not supported by the backend API.");
  };

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res = await axios.post(`/documents/${selectedDocId}/ask`, {
        question,
      });
      setAnswer(res.data.answer ?? res.data.answer_text ?? String(res.data));
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ✅ Fix: define selectedDoc from selectedDocId
  const selectedDoc = documents.find((doc) => doc.id === selectedDocId);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
        {/* Left: Upload + List */}
        <div>
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
              DocAI Dashboard
            </h1>
            <p className="mt-1 text-sm text-foreground/70">
              Upload • Manage • Ask Questions — Powered by AI
            </p>
          </header>

          {loading && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-blue-600/20 bg-blue-600/5 px-3 py-1 text-xs text-blue-700">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              Working…
            </div>
          )}

          {/* Upload / Edit */}
          <section className="mb-8 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              {editingDocId ? "Edit Document" : "Upload a New Document"}
            </h2>
            <form
              onSubmit={editingDocId ? handleUpdate : handleUpload}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Document title"
                value={editingDocId ? editTitle : title}
                onChange={(e) =>
                  editingDocId
                    ? setEditTitle(e.target.value)
                    : setTitle(e.target.value)
                }
                required
                disabled={loading}
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="space-y-1">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    editingDocId
                      ? setEditFile(e.target.files?.[0] || null)
                      : setFile(e.target.files?.[0] || null)
                  }
                  disabled={loading}
                  className="w-full text-sm"
                />
                <p className="text-xs text-foreground/60">
                  {editingDocId
                    ? editFile
                      ? `Selected: ${editFile.name} (${(
                          editFile.size / 1024
                        ).toFixed(1)} KB)`
                      : "No new file selected"
                    : file
                    ? `Selected: ${file.name} (${(file.size / 1024).toFixed(
                        1
                      )} KB)`
                    : "No file selected"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95 disabled:opacity-60"
                >
                  {editingDocId ? "Update Document" : "Upload"}
                </button>
                {editingDocId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Document List */}
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Your Documents</h2>
            {documents.length === 0 ? (
              <p className="text-sm text-foreground/60">No documents found.</p>
            ) : (
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="rounded border border-border bg-background p-3"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="text-left">
                        <div className="text-sm font-medium">{doc.title}</div>
                        {doc.file && (
                          <div className="text-xs text-foreground/60">
                            {String(doc.file).split("/").pop()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <button
                          onClick={() => startEdit(doc)}
                          disabled={loading}
                          className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={loading}
                          className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDocId(doc.id);
                            setAnswer("");
                            setQuestion("");
                          }}
                          disabled={loading}
                          className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Ask
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Right: Q&A */}
        <div className="md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:overflow-auto">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              Ask about your documents
            </h2>
            <p className="mb-4 text-sm text-foreground/70">
              {selectedDoc ? (
                <>
                  Asking about{" "}
                  <span className="font-medium">“{selectedDoc.title}”</span>
                </>
              ) : (
                <>Select a document from the left to begin.</>
              )}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here"
                disabled={loading || !selectedDocId}
                className="flex-1 rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !selectedDocId}
                className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95 disabled:opacity-60"
              >
                Ask
              </button>
            </form>

            {answer && (
              <div className="mt-6 rounded border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                      AI Answer
                    </div>
                    <div className="mt-2 space-y-3 text-sm">
                      {formatAnswerBlocks(answer).map((block, i) =>
                        renderParagraph(block, i)
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => {
                        const txt =
                          typeof answer === "string"
                            ? answer
                            : JSON.stringify(answer, null, 2);
                        navigator.clipboard.writeText(txt).then(
                          () => alert("Answer copied to clipboard"),
                          () => alert("Copy failed")
                        );
                      }}
                      className="rounded border border-input bg-background px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ✅ Toast messages will show here */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
