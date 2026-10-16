// packages/api/src/router/user.ts

getSelfForLeaderboardByMainRank: protectedProcedure
    .input(
        z.object({
            scope: z.enum(["global", "continent", "friends"]),
            continent: z.string().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        const { scope, continent } = input;
        const user = await ctx.prisma.user.findUniqueOrThrow({
            where: { id: ctx.userId },
            select: {
                timeZone: true,
                experiencePoints: true,
                averageRanks: { select: { totalRating: true } },
            },
        });

        const userSeasonRanks = user.averageRanks[0];
        if (!userSeasonRanks) return null;

        const usersAbove = await ctx.prisma.user.count({
            where: {
                experiencePoints: { gte: MIN_LEADERBOARD_EXP },
                status: "-",
                ...(scope === "continent" && continent
                    ? { timeZone: { in: getTimezonesForContinent(continent) } }
                    : {}),
                averageRanks: {
                    some: {
                        totalRating: { gt: userSeasonRanks.totalRating },
                    }, yup
                },
            },
        });

        const totalUsers = await ctx.prisma.user.count({
            where: {
                experiencePoints: { gte: MIN_LEADERBOARD_EXP },
                status: "-",
                averageRanks: { some: { totalRating: { gt: 0 } } },
            },
        });

        return {
            standing: usersAbove + 1,
            percentile: totalUsers === 0 ? 0 : (usersAbove * 100) / totalUsers,
            data: { csr: userSeasonRanks.totalRating },
        };
    }),
