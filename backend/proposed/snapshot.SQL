-- per user snapshot
-- one row per eligible user: captured score, and continent

CREATE MATERIALIZED VIEW "LeaderboardUserSnapshot" AS
SELECT
    u.id AS "userId",
    MAX(ar."totalRating") AS score,
    tz.continent
FROM "User" u
JOIN "AverageRanks" ar
    ON ar."userId" = u.id
LEFT JOIN "TimeZoneContinent" tz -- Assumes one continent mapping per timezone
    ON tz."timeZone" = u."timeZone"
WHERE
    u."experiencePoints" >= 8650 -- Minimum XP to appear on leaderboard
    AND u.status = '-'
    AND ar."totalRating" IS NOT NULL
GROUP BY u.id, tz.continent;

CREATE UNIQUE INDEX leaderboard_user_snapshot_pk
ON "LeaderboardUserSnapshot" ("userId");

-------------------------------------------------------------------------

-- score distribution snapshot
-- aggregates elgible users by score and scope
-- calculates cumulative count

CREATE MATERIALIZED VIEW "LeaderboardScoreSnapshot" AS
WITH scoped_scores AS (
    -- Global scope
    SELECT
        'global'::text AS scope,
        'all'::text AS "scopeKey",
        score
    FROM "LeaderboardUserSnapshot"

    UNION ALL

    -- Continent scope
    SELECT
        'continent'::text AS scope,
        continent AS "scopeKey",
        score
    FROM "LeaderboardUserSnapshot"
    WHERE continent IS NOT NULL
),
score_counts AS (
    SELECT
        scope,
        "scopeKey",
        score,
        COUNT(*)::bigint AS count
    FROM scoped_scores
    GROUP BY scope, "scopeKey", score -- potentially very large
)
SELECT
    scope,
    "scopeKey",
    score,

    SUM(count) OVER (
        PARTITION BY scope, "scopeKey"
        ORDER BY score DESC
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND CURRENT ROW
    )::bigint AS "usersAtOrAbove",

    SUM(count) FILTER (WHERE score > 0) OVER (
        PARTITION BY scope, "scopeKey"
    )::bigint AS "totalEligibleUsers"

FROM score_counts;

CREATE UNIQUE INDEX leaderboard_score_snapshot_pk
ON "LeaderboardScoreSnapshot" (
    scope, "scopeKey", score
);

-- CREATE INDEX leaderboard_score_lookup_idx
-- ON "LeaderboardScoreSnapshot" (
--     scope, "scopeKey", score
-- )
-- INCLUDE ("usersAtOrAbove");

----------------------------------------------------------------------------

-- scheduled every 5 mins via cron job
-- both views are refreshed in a single transaction to ensure consistency

BEGIN;

REFRESH MATERIALIZED VIEW CONCURRENTLY
    "LeaderboardUserSnapshot";

REFRESH MATERIALIZED VIEW CONCURRENTLY
    "LeaderboardScoreSnapshot";

COMMIT;