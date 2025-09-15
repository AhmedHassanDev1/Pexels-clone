
// 06d6a0 ef233c ff5400

import {
    getStatisticsViews,
    getStatisticsFollowers,
    getStatisticsDownloads,
    getStatisticsLikes
} from "@/lib/api/statistics";

export let StatisticsList = [
    {
        title: 'views',
        color: '#cdb4db',
        type: "views_count",
        fnStatistics: getStatisticsViews,
    },
    {
        title: 'downloads',
        color: '#06d6a0',
        type: "downloads_count",
        fnStatistics: getStatisticsDownloads,
    },
    {
        title: 'likes',
        color: '#ff0054',
        type: "likes_count",
        fnStatistics: getStatisticsLikes,
    },
    {
        title: 'followers',
        type: "followers_count",
        color: '#ffba08',
        fnStatistics: getStatisticsFollowers,
    }

]