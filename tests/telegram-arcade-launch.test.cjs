const test = require('node:test');
const assert = require('node:assert/strict');
const {
  GAME_SLUGS,
  allowlistedGameSlug,
  requestedGameSlug
} = require('../telegram-arcade-launch.js');

test('accepts every canonical game slug and rejects lookalikes', () => {
  for (const slug of GAME_SLUGS) assert.equal(allowlistedGameSlug(slug), slug);
  for (const value of ['NEONTRIS', 'neontris/extra', '../neontris', 'asteroid', '', null]) {
    assert.equal(allowlistedGameSlug(value), null);
  }
});

test('reads Telegram tgWebAppStartParam', () => {
  assert.equal(requestedGameSlug({ search: '?tgWebAppStartParam=lumen-flight' }), 'lumen-flight');
});

test('reads Telegram initDataUnsafe start_param', () => {
  assert.equal(requestedGameSlug({
    telegramWebApp: { initDataUnsafe: { start_param: 'star-drift' } }
  }), 'star-drift');
});

test('preserves private-chat game query URLs', () => {
  assert.equal(requestedGameSlug({ search: '?game=neontris' }), 'neontris');
});

test('invalid or empty Telegram parameters fall back to the Arcade menu', () => {
  assert.equal(requestedGameSlug({ search: '?tgWebAppStartParam=../../secret&game=neontris' }), null);
  assert.equal(requestedGameSlug({ search: '?tgWebAppStartParam=' }), null);
  assert.equal(requestedGameSlug({
    search: '?game=science',
    telegramWebApp: { initDataUnsafe: { start_param: 'not-a-cabinet' } }
  }), null);
  assert.equal(requestedGameSlug({ search: '' }), null);
});
