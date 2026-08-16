(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AsterArcadeLaunch = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const GAME_SLUGS = Object.freeze([
    'neontris',
    'science',
    'star-drift',
    'neon-breaker',
    'lumen-flight',
    'tempest',
    'lumen-panic'
  ]);
  const ALLOWED_GAMES = new Set(GAME_SLUGS);

  function allowlistedGameSlug(value) {
    return typeof value === 'string' && ALLOWED_GAMES.has(value) ? value : null;
  }

  function requestedGameSlug(options) {
    const settings = options || {};
    const params = new URLSearchParams(String(settings.search || ''));

    // Telegram documents tgWebAppStartParam as the GET copy of startapp. If it
    // is present, it is authoritative even when invalid or empty.
    if (params.has('tgWebAppStartParam')) {
      return allowlistedGameSlug(params.get('tgWebAppStartParam'));
    }

    // initDataUnsafe is not trusted for authorization, but it is safe for this
    // client-only game selection after applying the same exact allowlist.
    const initData = settings.telegramWebApp?.initDataUnsafe;
    if (initData && Object.prototype.hasOwnProperty.call(initData, 'start_param')) {
      const startParam = initData.start_param;
      if (startParam !== undefined && startParam !== null && startParam !== '') {
        return allowlistedGameSlug(startParam);
      }
    }

    // Preserve the existing private-chat Web App URLs.
    if (params.has('game')) return allowlistedGameSlug(params.get('game'));
    return null;
  }

  return Object.freeze({ GAME_SLUGS, allowlistedGameSlug, requestedGameSlug });
});
