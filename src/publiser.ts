import { echo } from 'shelljs';
import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const publisher = async (data) => {
  let request: IRepublishParams;

  // tmp related to my account .replace("gitlab.com", "gitlab-work")
  const sourceGitRepo = data.project.git_ssh_url;
  const targetGitRepo = data.variables.target_git_ssh_url;

  const authorizedSourceGitRepo = sourceGitRepo.replace(
    'gitlab.com',
    'gitlab-work',
  );
  const authorizedTargetGitRepo = targetGitRepo.replace(
    'gitlab.com',
    'gitlab-work',
  );

  const allowedToPush =
    data.event_type === 'merge_request' &&
    data.object_attributes.state === 'opened';

  /**
     *  &&
    data.object_attributes.action === 'approved' &&
    data.user.username === 'Kitani_Islam'
     */
  request = {
    gitDevRepos: authorizedSourceGitRepo,
    developBranch: data.variables.source_branch,
    gitMasterRepos: authorizedTargetGitRepo,
    masterBranch: data.variables.target_branch,
  };

  console.log('🚀 ~ file: publiser.ts ~ line 19 ~ publisher ~ request', {
    request,
  });

  if (allowedToPush) await GitService.republish(request);
  echo('🚀 ✅ Everything up to date.');
  exit();
};

// let file = process.env.TRIGGER_PAYLOAD || '';
// let rawdata = fs.readFileSync(file, {
//   encoding: 'utf8',
// });

// let webhook_event = JSON.parse(rawdata);
// console.log('🚀 ~ file: publiser.ts ~ line 75 ~ webhook_event', {
//   webhook_event,
// });
const webhook_event = {
  variables: {
    source_branch: 'develop',
    target_branch: 'main',
    target_git_ssh_url: 'git@gitlab.com:k2808/webhook-test/mirror.git',
  },
  object_kind: 'merge_request',
  event_type: 'merge_request',
  user: {
    id: 2035733,
    name: 'Aiche Mohamed',
    username: 'mohamediniesta',
    avatar_url:
      'https://secure.gravatar.com/avatar/191e6278ecb9ff2c94d3b576786319b4?s=80\u0026d=identicon',
    email: '[REDACTED]',
  },
  project: {
    id: 34543891,
    name: 'Emitter',
    description: '',
    web_url: 'https://gitlab.com/k2808/webhook-test/emitter',
    avatar_url: null,
    git_ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
    git_http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
    namespace: 'webhook test',
    visibility_level: 0,
    path_with_namespace: 'k2808/webhook-test/emitter',
    default_branch: 'main',
    ci_config_path: '',
    homepage: 'https://gitlab.com/k2808/webhook-test/emitter',
    url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
    ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
    http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
  },
  object_attributes: {
    assignee_id: null,
    author_id: 11113191,
    created_at: '2022-03-22 12:26:53 UTC',
    description: '',
    head_pipeline_id: null,
    id: 146343051,
    iid: 15,
    last_edited_at: null,
    last_edited_by_id: null,
    merge_commit_sha: null,
    merge_error: null,
    merge_params: { force_remove_source_branch: '0' },
    merge_status: 'can_be_merged',
    merge_user_id: null,
    merge_when_pipeline_succeeds: false,
    milestone_id: null,
    source_branch: 'develop',
    source_project_id: 34543891,
    state_id: 1,
    target_branch: 'main',
    target_project_id: 34543891,
    time_estimate: 0,
    title: 'Fake MR',
    updated_at: '2022-03-22 12:26:53 UTC',
    updated_by_id: null,
    url: 'https://gitlab.com/k2808/webhook-test/emitter/-/merge_requests/15',
    source: {
      id: 34543891,
      name: 'Emitter',
      description: '',
      web_url: 'https://gitlab.com/k2808/webhook-test/emitter',
      avatar_url: null,
      git_ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      git_http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
      namespace: 'webhook test',
      visibility_level: 0,
      path_with_namespace: 'k2808/webhook-test/emitter',
      default_branch: 'main',
      ci_config_path: '',
      homepage: 'https://gitlab.com/k2808/webhook-test/emitter',
      url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
    },
    target: {
      id: 34543891,
      name: 'Emitter',
      description: '',
      web_url: 'https://gitlab.com/k2808/webhook-test/emitter',
      avatar_url: null,
      git_ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      git_http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
      namespace: 'webhook test',
      visibility_level: 0,
      path_with_namespace: 'k2808/webhook-test/emitter',
      default_branch: 'main',
      ci_config_path: '',
      homepage: 'https://gitlab.com/k2808/webhook-test/emitter',
      url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      ssh_url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
      http_url: 'https://gitlab.com/k2808/webhook-test/emitter.git',
    },
    last_commit: {
      id: '0c44725056a833ee6400be884fad8af295b5c8d2',
      message: 'edit\n',
      title: 'edit',
      timestamp: '2022-03-22T13:00:31+01:00',
      url: 'https://gitlab.com/k2808/webhook-test/emitter/-/commit/0c44725056a833ee6400be884fad8af295b5c8d2',
      author: { name: 'kitani', email: 'slmkitani@gmail.com' },
    },
    work_in_progress: false,
    total_time_spent: 0,
    time_change: 0,
    human_total_time_spent: null,
    human_time_change: null,
    human_time_estimate: null,
    assignee_ids: [],
    state: 'opened',
    blocking_discussions_resolved: true,
    action: 'approved',
  },
  labels: [],
  changes: {},
  repository: {
    name: 'Emitter',
    url: 'git@gitlab.com:k2808/webhook-test/emitter.git',
    description: '',
    homepage: 'https://gitlab.com/k2808/webhook-test/emitter',
  },
  id: '34577972',
  ref: 'develop',
};

publisher(webhook_event);
