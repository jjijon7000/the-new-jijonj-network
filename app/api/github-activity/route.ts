import { NextResponse } from 'next/server';
import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

export async function GET() {
  try {
    const appId = process.env.GITHUB_APP_ID;
    const privateKey = process.env.GITHUB_PRIVATE_KEY;
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const username = process.env.GITHUB_USERNAME;

    if (!appId || !privateKey || !installationId || !username) {
      console.error('Missing configuration:', {
        appId: !!appId,
        privateKey: !!privateKey,
        installationId: !!installationId,
        username: !!username,
      });
      return NextResponse.json(
        { error: 'Missing GitHub configuration' },
        { status: 500 }
      );
    }

    // Create authentication
    const auth = createAppAuth({
      appId,
      privateKey: privateKey.replace(/\\n/g, '\n'),
      installationId,
    });

    // Get installation access token
    const { token } = await auth({ type: 'installation' });

    // Create Octokit instance
    const octokit = new Octokit({ auth: token });

    // Fetch user's recent events (includes private repos the app has access to)
    const { data: events } = await octokit.activity.listEventsForAuthenticatedUser({
      username,
      per_page: 30,
    });

    // Filter and format events
    const activities = events
      .filter((event) => {
        return event.type && ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type);
      })
      .slice(0, 1)
      .map((event) => {
        const repo = event.repo.name;
        const createdAt = new Date(event.created_at);
        
        switch (event.type) {
          case 'PushEvent':
            const payload = event.payload as any;
            const commits = payload.size || payload.commits?.length || 1;
            return {
              type: 'commit',
              message: `pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}`,
              repo,
              time: createdAt,
              icon: '📝',
            };
          case 'PullRequestEvent':
            const action = (event.payload as any).action;
            return {
              type: 'pr',
              message: `${action} a pull request in ${repo}`,
              repo,
              time: createdAt,
              icon: '🔀',
            };
          case 'IssuesEvent':
            const issueAction = (event.payload as any).action;
            return {
              type: 'issue',
              message: `${issueAction} an issue in ${repo}`,
              repo,
              time: createdAt,
              icon: '🐛',
            };
          case 'CreateEvent':
            const refType = (event.payload as any).ref_type;
            return {
              type: 'create',
              message: `created ${refType} in ${repo}`,
              repo,
              time: createdAt,
              icon: '✨',
            };
          default:
            return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('GitHub API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}