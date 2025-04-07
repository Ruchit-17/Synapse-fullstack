'use client';

import React, { useState } from 'react';

type Candidate = {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  background: string;
};

const CandidateList = ({
  candidates,
  loading,
}: {
  candidates: Candidate[] | undefined;
  loading: boolean;
}) => {
  if (loading) {
    return <p className="text-center text-gray-600">🔄 Loading candidates...</p>;
  }

  if (!candidates || candidates.length === 0) {
    return <p className="text-center text-gray-500">No matching candidates found.</p>;
  }

  return (
    <ul className="mt-6 space-y-4">
      {candidates.map((c) => (
        <li
          key={c.id}
          className="border rounded-xl p-4 bg-white shadow-md transition hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-indigo-600">{c.name}</h3>
          <p className="text-gray-700">
            <strong>Skills:</strong> {c.skills.join(', ')}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {c.experience} years
          </p>
          <p className="text-gray-600">
            <strong>Background:</strong> {c.background}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default function Home() {
  const [description, setDescription] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/match-candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: description }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch candidates');
      }

      const data = await res.json();
      setCandidates(data.candidates);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Match Candidates from Job Description
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            placeholder="Paste your job description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            🔍 Find Matching Candidates
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        <div className="mt-8">
          <CandidateList candidates={candidates} loading={loading} />
        </div>
      </div>
    </main>
  );
}
