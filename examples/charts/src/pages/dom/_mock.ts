import { mock, Random } from 'mockjs';
import moment from 'moment';

const channels = ['WEIBO', 'TIKTOK', 'BAIDU', 'TIKTOK_SEARCH']
Random.extend({
  channel: function () {
    return this.pick(channels)
  }
})

const projectData = Array(10).fill(1).map((_, index) => ({
  name: Random.cname(),
  startDate: moment().subtract(index + 1, 'days').format('YYYY-MM-DD'),
  endDate: moment().add((index + 10), 'days').format('YYYY-MM-DD'),
  projectId: Random.id()
}))

const ganttData = [{
  name: "赵秀英",
  children: [{
    topicName: "孔娟",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-19 23:59:59",
    projectId: "820000200602276231",
    channel: "WEIBO",
    type: "hot"
  },
  {
    topicName: "叶明",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-12",
    projectId: "210000197811226865",
    channel: "TIKTOK",
    type: "hot"
  },
  {
    topicName: "罗秀兰",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-21",
    projectId: "520000199503160333",
    channel: "BAIDU",
    type: "hot"
  },
  {
    topicName: "龙超",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-22",
    projectId: "540000199504085666",
    channel: "TIKTOK_SEARCH",
    type: "normal"
  },
  {
    topicName: "杨明",
    startDate: "2021-01-20 19:02:03",
    endDate: "2021-01-30",
    projectId: "640000197310074947",
    channel: "WEIBO",
    type: "hot"
  },
  {
    topicName: "韩娟",
    startDate: "2021-01-14 19:02:03",
    endDate: "2021-01-24",
    projectId: "420000199505107719",
    channel: "TIKTOK",
    type: "normal"
  },
  {
    topicName: "邱静",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-25",
    projectId: "820000199003314448",
    channel: "BAIDU",
    type: "hot"
  },
  {
    topicName: "汪芳",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-26",
    projectId: "130000199109157600",
    channel: "TIKTOK_SEARCH",
    type: "normal"
  }],
  hot: [{
    topicName: "郑明",
    startDate: "1970-06-18 23:26:45",
    endDate: "1988-01-04 10:37:04",
    channel: "彭霞",
    type: "hot"
  },
  {
    topicName: "何平",
    startDate: "1976-06-08 21:01:48",
    endDate: "2003-08-01 18:39:20",
    channel: "熊静",
    type: "hot"
  },
  {
    topicName: "龚娜",
    startDate: "2005-06-18 05:47:33",
    endDate: "1978-08-19 21:26:57",
    channel: "孔军",
    type: "hot"
  },
  {
    topicName: "罗勇",
    startDate: "1988-08-05 20:27:46",
    endDate: "1974-04-22 18:35:09",
    channel: "马勇",
    type: "hot"
  }]
},
{
  name: "魏秀英",
  children: [{
    topicName: "孔娟",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-09 23:59:59",
    projectId: "820000200602276231",
    channel: "WEIBO",
    type: "hot"
  },
  {
    topicName: "叶明",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-20",
    projectId: "210000197811226865",
    channel: "TIKTOK",
    type: "normal"
  },
  {
    topicName: "罗秀兰",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-21",
    projectId: "520000199503160333",
    channel: "BAIDU",
    type: "hot"
  },
  {
    topicName: "龙超",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-22",
    projectId: "540000199504085666",
    channel: "TIKTOK_SEARCH",
    type: "normal"
  },
  {
    topicName: "杨明",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-23",
    projectId: "640000197310074947",
    channel: "WEIBO",
    type: "hot"
  },
  {
    topicName: "韩娟",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-24",
    projectId: "420000199505107719",
    channel: "TIKTOK",
    type: "normal"
  },
  {
    topicName: "邱静",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-25",
    projectId: "820000199003314448",
    channel: "BAIDU",
    type: "hot"
  },
  {
    topicName: "汪芳",
    startDate: "2021-01-09 19:02:03",
    endDate: "2021-01-26",
    projectId: "130000199109157600",
    channel: "TIKTOK_SEARCH",
    type: "normal"
  }],
  hot: [{
    topicName: "郑明",
    startDate: "1970-06-18 23:26:45",
    endDate: "1988-01-04 10:37:04",
    channel: "彭霞",
    type: "hot"
  },
  {
    topicName: "何平",
    startDate: "1976-06-08 21:01:48",
    endDate: "2003-08-01 18:39:20",
    channel: "熊静",
    type: "hot"
  },
  {
    topicName: "龚娜",
    startDate: "2005-06-18 05:47:33",
    endDate: "1978-08-19 21:26:57",
    channel: "孔军",
    type: "hot"
  },
  {
    topicName: "罗勇",
    startDate: "1988-08-05 20:27:46",
    endDate: "1974-04-22 18:35:09",
    channel: "马勇",
    type: "hot"
  }]
}]

export default {
  'GET /queryProjectList.json': {
    success: true,
    data: projectData
  },
  'GET /queryGanttList.json': {
    success: true,
    data: ganttData
  }
};
