type leaderboardUserSnapshot = {
    usersAbove: bigint;
    totalUsers: bigint;
}

getSelfForLeaderboardByMainRank: protectedProcedure
    .input(
        z.object({
            scope: z.enum(["global", "continent", "friends"]),
            continent: z.string().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        const { scope, continent } = input;

        // 1. same as before, fetch the user's live rating
        const user = await ctx.prisma.user.findUniqueOrThrow({
            where: { id: ctx.userId },
            select: {
                timeZone: true,
                experiencePoints: true,
                averageRanks: {
                    where: { season: 1 }, // assuming season 1 is the current season
                    select: { totalRating: true },
                },
            },
        });

        const userSeasonRanks = user.averageRanks[0];
        if (!userSeasonRanks) return null;

        const liveCSR = userSeasonRanks.totalRating;

        const isContinent =
            scope === "continent" && Boolean(continent);

        const scopeName = isContinent ? "continent" : "global";
        const scopeKey = isContinent ? continent! : "all";

        // 2. We now fetch the user's standing and percentile from the snapshot table

        // assuming the materialized view are defined in Prisma

        const [scoreRow, userSnapshot, totalRow] = await ctx.prisma.$transaction([

            // fetch the number of users above the current user in the snapshot
            ctx.prisma.leaderboardScoreSnapshot.findFirst({
                where: {
                    scope: scopeName,
                    scopeKey: scopeKey,
                    score: { gt: liveCSR },
                },
                orderBy: { score: "asc" },
                select: { usersAtOrAbove: true },
            }),

            // fetch the user's snapshot row
            ctx.prisma.leaderboardUserSnapshot.findFirst({
                where: {
                    userId: ctx.userId,
                },
            }),

            // fetch the total number of eligible users in the snapshot
            ctx.prisma.leaderboardScoreSnapshot.findFirst({
                where: {
                    scope: "global",
                    scopeKey: "all",

                },
                select: { totalEligibleUsers: true },
            }),
        ]);

        let usersAbove = Number(scoreRow?.usersAtOrAbove ?? 0n);

        // adjust the user's standing if the snapshot score is higher than the live score
        if (
            userSnapshot &&
            userSnapshot.score > liveCSR &&
            (scopeName === "global" ||
                userSnapshot.continent === scopeKey)
        ) {
            usersAbove--;
        }

        // ensure usersAbove is not negative
        usersAbove = Math.max(0, usersAbove);

        const totalUsers = Number(
            totalRow?.totalEligibleUsers ?? 0n
        );

        // build the same return object as before
        return {
            standing: usersAbove + 1,
            percentile:
                totalUsers === 0
                    ? 0
                    : (usersAbove * 100) / totalUsers,
            data: {
                csr: liveCSR,
            },
        };
    }),



