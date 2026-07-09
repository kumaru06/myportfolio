import { useEffect, useState } from 'react';

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface ContributionsResponse {
  contributions: Contribution[];
  total: Record<string, number>;
}

interface GitHubContributionsProps {
  username: string;
}

function getDotSize(count: number, level: number): number {
  if (level === 0 || count === 0) return 3;
  return [5, 7, 9, 12][level - 1] ?? 5;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const profileUrl = `https://github.com/${username}`;
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  useEffect(() => {
    let cancelled = false;

    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data: ContributionsResponse = await res.json();
        if (!cancelled) {
          setContributions(data.contributions);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className="card overflow-hidden p-5 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 sm:text-sm">
          github
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-black dark:hover:text-white sm:text-sm"
        >
          @{username}
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
          </svg>
        </a>
      </div>

      {loading && (
        <div className="flex h-24 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-black dark:border-neutral-700 dark:border-t-white" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-sm text-neutral-500">Could not load contribution data.</p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black underline-offset-2 hover:underline dark:text-white"
          >
            Visit @{username} on GitHub
          </a>
        </div>
      )}

      {!loading && !error && contributions.length > 0 && (
        <>
          <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 pb-1 scrollbar-none touch-pan-x">
            <div
              className="inline-grid min-w-0 gap-1 sm:gap-[6px]"
              style={{
                gridTemplateRows: 'repeat(7, auto)',
                gridAutoFlow: 'column',
              }}
              role="img"
              aria-label={`${totalContributions} GitHub contributions in the last year`}
            >
              {contributions.map((day) => {
                const size = getDotSize(day.count, day.level);
                const isActive = day.level > 0 && day.count > 0;

                return (
                  <div
                    key={day.date}
                    className="flex h-3 w-3 items-center justify-center sm:h-4 sm:w-4"
                    title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`}
                  >
                    <span
                      className={`rounded-full ${isActive ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                      style={{ width: size, height: size }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-5 text-xs text-neutral-400">
            <span className="font-semibold text-black dark:text-white">{totalContributions.toLocaleString()}</span>{' '}
            contributions in the last year
          </p>
        </>
      )}
    </div>
  );
}
