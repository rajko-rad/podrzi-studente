import React from 'react';
import { Construction } from 'lucide-react';

const WorkInProgress = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Construction size={48} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Stranica u izradi
      </h2>
      <p className="text-gray-500">
        Ova sekcija je trenutno u razvoju. Molimo vas da se vratite kasnije.
      </p>
    </div>
  );
};

export default WorkInProgress;