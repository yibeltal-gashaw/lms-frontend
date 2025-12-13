import { useState, useEffect } from "react";

const HISTORY_STORAGE_KEY = "report_history";

export function useReportHistory() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading report history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const addHistoryEntry = (reportId, action, details = {}) => {
    const entry = {
      id: `${reportId}-${Date.now()}`,
      reportId,
      action, // 'viewed', 'downloaded', 'shared'
      timestamp: new Date().toISOString(),
      ...details,
    };

    setHistory((prev) => [entry, ...prev].slice(0, 100)); // Keep last 100 entries
    return entry;
  };

  const getReportHistory = (reportId) => {
    return history.filter((entry) => entry.reportId === reportId);
  };

  const getRecentHistory = (limit = 10) => {
    return history.slice(0, limit);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return {
    history,
    addHistoryEntry,
    getReportHistory,
    getRecentHistory,
    clearHistory,
  };
}

