import { NextResponse } from 'next/server';
import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

type GithubEvent = {
  type: string | null;
  repo: { name: string };
  created_at: string | null;
  payload: Record<string, unknown>;
};

function formatActivities(events: GithubEvent[]) {
  return events
    .filter((event) => {
      return event.type && ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type);
    })
    .slice(0, 1)
    .map((event) => {
      const repo = event.repo.name;
      const createdAt = new Date(event.created_at || Date.now());

      switch (event.type) {
        case 'PushEvent': {
          const payload = event.payload as { size?: number; commits?: unknown[] };
          const commits = payload.size || payload.commits?.length || 1;
          return {
            type: 'commit',
            message: `pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}`,
            repo,
            time: createdAt,
            icon: '📝',
          };
        }
        case 'PullRequestEvent': {
          const action = event.payload.action as string;
          return {
            type: 'pr',
            message: `${action} a pull request in ${repo}`,
            repo,
            time: createdAt,
            icon: '🔀',
          };
        }
        case 'IssuesEvent': {
          const issueAction = event.payload.action as string;
          return {
            type: 'issue',
            message: `${issueAction} an issue in ${repo}`,
            repo,
            time: createdAt,
            icon: '🐛',
          };
        }
        case 'CreateEvent': {
          const refType = event.payload.ref_type as string;
          return {
            type: 'create',
            message: `created ${refType} in ${repo}`,
            repo,
            time: createdAt,
            icon: '✨',
          };
        }
        default:
          return null;
      }
    })
    .filter(Boolean);
}

async function fetchPublicEvents(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=30`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'jijonj-network',
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub public API returned ${response.status}`);
  }

  return (await response.json()) as GithubEvent[];
}

export async function GET() {
  try {
    const appId = process.env.GITHUB_APP_ID;
    const privateKey = process.env.GITHUB_PRIVATE_KEY;
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const username = process.env.GITHUB_USERNAME || 'jjijon7000';

    let events: GithubEvent[] = [];

    // Prefer GitHub App auth (includes private activity) when configured
    if (appId && privateKey && installationId) {
      try {
        const auth = createAppAuth({
          appId,
          privateKey: privateKey.replace(/\\n/g, '\n'),
          installationId,
        });

        const { token } = await auth({ type: 'installation' });
        const octokit = new Octokit({ auth: token });

        const { data } = await octokit.activity.listEventsForAuthenticatedUser({
          username,
          per_page: 30,
        });

        events = data as GithubEvent[];
      } catch (appError) {
        console.warn('GitHub App auth failed, falling back to public events:', appError);
        events = await fetchPublicEvents(username);
      }
    } else {
      // Local / missing secrets: public events only
      events = await fetchPublicEvents(username);
    }

    return NextResponse.json({ activities: formatActivities(events) });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch GitHub activity',
        details: error instanceof Error ? error.message : 'Unknown error',
        activities: [],
      },
      { status: 500 }
    );
  }
}
