'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublicProjects } from '@/lib/api';
import ViewAllButton from './ViewAllButton';
import SubmitIdeaModal from './SubmitIdeaModal';

const stageLabels: Record<string, string> = {
  idea: 'Idea',
  prototype: 'Prototype',
  launched: 'Launched',
  scaling: 'Scaling',
};

interface InnovationHubSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
  showActions?: boolean;
  stageFilter?: string[];
}

export default function InnovationHubSection({
  limit = 4,
  showViewAll = true,
  showHeader = true,
  showActions = true,
  stageFilter,
}: InnovationHubSectionProps) {
  const [projects, setProjects] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIdeaModal, setShowIdeaModal] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const result = await getPublicProjects();
        setProjects(result?.data ?? []);
      } catch (err) {
        setError('Unable to load projects right now.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = stageFilter
    ? projects.filter((project) => stageFilter.includes(String(project.stage || '')))
    : projects;
  const displayedProjects = filteredProjects.slice(0, limit);

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-green-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-pink-50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Innovation Hub</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore student-driven projects and innovations making a difference
            </p>
          </div>
        )}

        {showActions && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setShowIdeaModal(true)}
              className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 animate-float"
            >
              Submit Your Idea
            </button>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold hover:border-riara-400 hover:text-riara-500 transition-all duration-300"
            >
              Explore Student Projects
            </Link>
            <Link
              href="/startups"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold hover:border-riara-400 hover:text-riara-500 transition-all duration-300"
            >
              Startup Showcase
            </Link>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading innovations…</div>
        ) : error ? (
          <div className="text-center py-16 text-gray-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => {
                const stage = String(project.stage || 'idea');
                const stageColor =
                  stage === 'idea' ? '#f59e0b' :
                  stage === 'prototype' ? '#a78bfa' :
                  stage === 'launched' ? '#10b981' :
                  stage === 'scaling' ? '#7c3aed' : '#6b7280';

                return (
                  <div
                    key={(project.$id as string) || index}
                    className="glass-card rounded-xl p-6 relative group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {(() => {
                      const img = String(project.projectImage || project.image || '');
                      return img ? (
                        <div className="relative w-full h-36 rounded-lg overflow-hidden mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={String(project.title || 'Innovation Project')} className="w-full h-full object-cover" />
                        </div>
                      ) : null;
                    })()}
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-riara-500 transition-colors duration-300">
                        {String(project.title || 'Innovation Project')}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {String(project.description || 'More details coming soon.')}
                      </p>

                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${stageColor}20`,
                            color: stageColor,
                            borderColor: stageColor,
                          }}
                        >
                          {stageLabels[stage] || stage}
                        </span>

                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {String(Array.isArray(project.teamMembers) ? project.teamMembers.length : 0)} team
                        </span>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${stageColor}10 0%, transparent 50%)`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {displayedProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No projects found in this category yet. Check back soon!
                </p>
              </div>
            )}

            {showViewAll && filteredProjects.length > limit && (
              <div className="mt-14 text-center">
                <ViewAllButton href="/projects" label="View All Projects" />
              </div>
            )}
          </>
        )}
      </div>

      {showIdeaModal && <SubmitIdeaModal onClose={() => setShowIdeaModal(false)} />}
    </section>
  );
}
