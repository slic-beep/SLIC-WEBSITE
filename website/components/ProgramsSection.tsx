'use client';

import { useEffect, useState } from 'react';
import { getPublicPrograms } from '@/lib/api';
import ViewAllButton from './ViewAllButton';

interface ProgramsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
}

export default function ProgramsSection({
  limit = 4,
  showViewAll = true,
  showHeader = true,
}: ProgramsSectionProps) {
  const [programs, setPrograms] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const result = await getPublicPrograms();
        setPrograms(result?.data ?? []);
      } catch (err) {
        setError('Unable to load programs right now.');
      } finally {
        setLoading(false);
      }
    }

    loadPrograms();
  }, []);

  const displayedPrograms = programs.slice(0, limit);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-riara-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-riara-100 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Innovation Programs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Empowering students and professionals through cutting-edge innovation programs
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading programs…</div>
        ) : error ? (
          <div className="text-center py-16 text-gray-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPrograms.map((program, index) => (
                <div
                  key={(program.$id as string) || index}
                  className="glass-card rounded-xl p-6 relative group cursor-pointer animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    borderLeft: '4px solid #7c3aed',
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(to bottom, #7c3aed, #ec4899)',
                    }}
                  />

                  <div className="text-4xl mb-4">🚀</div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-riara-500 transition-colors duration-300">
                    {String(program.title || 'SLIC Program')}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {String(program.description || 'More details coming soon.')}
                  </p>

                  <div
                    className="h-0.5 mt-6 rounded-full transition-all duration-500"
                    style={{
                      background: 'linear-gradient(to right, #7c3aed, transparent)',
                      width: '40%',
                    }}
                  />
                </div>
              ))}
            </div>

            {showViewAll && programs.length > limit && (
              <div className="mt-14 text-center">
                <ViewAllButton href="/programs" label="View All Programs" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
