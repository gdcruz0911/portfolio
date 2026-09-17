/* eslint-disable @typescript-eslint/no-require-imports -- This Node CommonJS check loads transpiled modules. */
// Small regression check for Spotify's away states and optional project media.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function load(file, overrides = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, {
    exports,
    require: (name) => name === 'server-only' ? {} : require(name),
    Buffer, URLSearchParams, AbortSignal,
    ...overrides,
  });
  return exports;
}

async function main() {
  const env = { SPOTIFY_CLIENT_ID: 'test', SPOTIFY_CLIENT_SECRET: 'test', SPOTIFY_REFRESH_TOKEN: 'test' };
  const item = { name: 'Track Case', artists: [{ name: 'Artist Case' }], album: { name: 'Album', images: [{ url: 'https://i.scdn.co/image/test' }] }, external_urls: { spotify: 'https://open.spotify.com/track/test' } };
  let calls = 0;
  let now = { is_playing: true, item };
  let status = 200;
  const spotify = load('src/lib/spotify.ts', {
    process: { env },
    fetch: async (url) => {
      calls++;
      if (url.includes('/api/token')) return { ok: true, json: async () => ({ access_token: 'test' }) };
      return { ok: status === 200, status, json: async () => now };
    },
  });
  assert.equal((await spotify.getNowPlaying()).title, 'Track Case');
  now = { is_playing: false, item };
  assert.equal(await spotify.getNowPlaying(), null, 'paused is away');
  now = { is_playing: true };
  assert.equal(await spotify.getNowPlaying(), null, 'missing item is away');
  for (status of [202, 204, 401, 429, 500]) assert.equal(await spotify.getNowPlaying(), null);
  env.SPOTIFY_REFRESH_TOKEN = '';
  const previousCalls = calls;
  assert.equal(await spotify.getNowPlaying(), null);
  assert.equal(calls, previousCalls, 'no requests without credentials');
  const broken = load('src/lib/spotify.ts', { process: { env: { ...env, SPOTIFY_REFRESH_TOKEN: 'test' } }, fetch: async () => { throw Error('network'); } });
  assert.equal(await broken.getNowPlaying(), null, 'network failures are away');
  const { ProjectCard } = load('src/components/ProjectCard.tsx');
  const project = { title: 'Test project', description: 'Development-only fixture', tech: ['React'] };
  const empty = renderToStaticMarkup(React.createElement(ProjectCard, { project }));
  assert.ok(!empty.includes('<video') && !empty.includes('<a '));
  const full = renderToStaticMarkup(React.createElement(ProjectCard, { project: { ...project, walkthrough: '/test.mp4', poster: '/poster.jpg', demo: 'https://example.com', github: 'https://github.com/example/test' } }));
  assert.match(full, /preload="none"/);
  assert.match(full, /controls=""/);
  assert.match(full, /poster="\/poster.jpg"/);
  assert.ok(!full.toLowerCase().includes('autoplay'));
  assert.match(full, /visit live site/);
  assert.match(full, /source code/);
  console.log('Passed: Spotify active, paused, unavailable, missing credentials, network failures; project media and optional links.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
