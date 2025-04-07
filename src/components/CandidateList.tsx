// components/CandidateList.tsx
import React from 'react';

type Candidate = {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  background: string;
};

type CandidateListProps = {
  candidates?: Candidate[];
  loading: boolean;
};

const CandidateList: React.FC<CandidateListProps> = ({ candidates, loading }) => {
  if (loading) return <p>Loading candidates...</p>;

  if (!candidates || candidates.length === 0) {
    return <p>No matching candidates found.</p>;
  }

  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.id}>
          <strong>{candidate.name}</strong> - {candidate.experience} yrs exp - {candidate.skills.join(', ')}
        </li>
      ))}
    </ul>
  );
};

export default CandidateList;
