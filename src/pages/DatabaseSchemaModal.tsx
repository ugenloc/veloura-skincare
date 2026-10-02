import React, { useState } from 'react';
import { POSTGRES_SCHEMA_SQL } from '../utils/schemaSql';
import { X, Copy, Check, Database } from 'lucide-react';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(POSTGRES_SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-3xl bg-[#1E1C1A] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#38332E] z-10 max-h-[85vh] flex flex-col space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#38332E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A2724] text-[#C9B9A6] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif text-[#FAF7F2]">
                PostgreSQL Relational Schema (PRD Section 26)
              </h3>
              <p className="text-xs text-[#A69E95]">
                Production-ready DDL tables, indexes, constraints and UUID generators.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="py-1.5 px-3 bg-[#2A2724] hover:bg-[#38332E] rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-[#453F39] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SQL' : 'Copy DDL'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#141312] p-4 rounded-2xl border border-[#2A2724]">
          <pre className="font-mono text-[11px] text-[#C9B9A6] leading-relaxed whitespace-pre selection:bg-[#38332E]">
            {POSTGRES_SCHEMA_SQL}
          </pre>
        </div>

        <div className="flex items-center justify-between text-xs text-[#7A746E] pt-2">
          <span>Target Engine: PostgreSQL 14+, Cloud SQL, Supabase, Neon</span>
          <span>Entity count: 9 tables + performance indexes</span>
        </div>
      </div>
    </div>
  );
};
