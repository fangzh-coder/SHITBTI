window.SHITBTI_QUESTIONS = [
  {
    id: 1,
    title: '你的排便节律更像哪一种？',
    options: [
      { text: '每天大概固定在同一个时间段', score: { S: 2 } },
      { text: '有一点规律，但不至于像打卡', score: { S: 1 } },
      { text: '看吃了什么和当天状态', score: { t: 1, s: 1 } },
      { text: '完全随机，来了就是最后通牒', score: { s: 2 } }
    ]
  },
  {
    id: 2,
    title: '最常见的触发时刻是？',
    options: [
      { text: '起床后不久，身体像自动排程', score: { S: 2 } },
      { text: '饭后 / 咖啡后 / 奶茶后', score: { t: 1, s: 1 } },
      { text: '下午某个神秘时间点', score: { S: 1 } },
      { text: '没有固定触发，纯看命', score: { s: 2 } }
    ]
  },
  {
    id: 3,
    title: '当便意出现时，你通常会？',
    options: [
      { text: '我早有预感，会提前布局', score: { S: 2, I: 1 } },
      { text: '感觉差不多了，顺路去处理', score: { S: 1, i: 1 } },
      { text: '先忍一会儿，能拖就拖', score: { H: 1, s: 1 } },
      { text: '屎到临头，立刻冲刺', score: { s: 2, t: 1 } }
    ]
  },
  {
    id: 4,
    title: '你的理想战场是？',
    options: [
      { text: '只信任自己家的马桶', score: { H: 2 } },
      { text: '公司也行，只要熟悉', score: { H: 1 } },
      { text: '高配商场 / 酒店公厕也能接受', score: { h: 1 } },
      { text: '只要够干净，哪里都能发挥', score: { h: 2 } }
    ]
  },
  {
    id: 5,
    title: '你坐下之后通常会？',
    options: [
      { text: '立刻办正事，速战速决', score: { i: 2 } },
      { text: '先刷会儿手机，状态要铺垫', score: { I: 2 } },
      { text: '边拉边沉思，顺便看点东西', score: { I: 2 } },
      { text: '拉完还会坐一会儿冷静一下', score: { I: 1, H: 1 } }
    ]
  },
  {
    id: 6,
    title: '单次平均时长更接近？',
    options: [
      { text: '1～3 分钟，我是效率机器', score: { i: 2 } },
      { text: '3～8 分钟，合理、稳定、克制', score: { i: 1, T: 1 } },
      { text: '8～15 分钟，需要完整体验', score: { I: 2 } },
      { text: '15 分钟以上，厕所是我的思考舱', score: { I: 2, H: 1 } }
    ]
  },
  {
    id: 7,
    title: '以下哪句话最像你？',
    options: [
      { text: '环境不对，我宁愿先憋着', score: { H: 2 } },
      { text: '流程要完整，不能太仓促', score: { I: 2 } },
      { text: '有感觉就去，没有就算了', score: { h: 1, i: 1 } },
      { text: '我的肠道经常临场发挥', score: { t: 2 } }
    ]
  },
  {
    id: 8,
    title: '你对“欣赏作品”的态度是？',
    options: [
      { text: '真男人从不回头看爆炸', score: { i: 2 } },
      { text: '偶尔确认一下健康状态', score: { T: 1, I: 1 } },
      { text: '必看，这是成果验收', score: { I: 2 } },
      { text: '我会综合评估形状、完整度与气势', score: { I: 2, T: 1 } }
    ]
  },
  {
    id: 9,
    title: '你最容易被什么触发？',
    options: [
      { text: '基本不被触发，主打稳定输出', score: { T: 2 } },
      { text: '咖啡、奶茶、冰的东西', score: { t: 2 } },
      { text: '辣的、火锅、重油重盐', score: { t: 2 } },
      { text: '情绪波动、紧张、赶时间', score: { t: 2, s: 1 } }
    ]
  },
  {
    id: 10,
    title: '你的肠道状态更像？',
    options: [
      { text: '常年稳定，成型顺滑', score: { T: 2 } },
      { text: '偶尔便秘，但整体可控', score: { T: 1, H: 1 } },
      { text: '偶尔蹿稀，存在爆发风险', score: { t: 2 } },
      { text: '便秘与蹿稀反复横跳', score: { t: 2, s: 1 } }
    ]
  },
  {
    id: 11,
    title: '外出差旅时，你通常会？',
    options: [
      { text: '依然照常发挥，主打适应力', score: { h: 2, T: 1 } },
      { text: '能拉，但必须挑厕所', score: { H: 1 } },
      { text: '节律会乱掉，最好还是回家', score: { H: 2, S: 1 } },
      { text: '状态很难预测，看当天肠道心情', score: { t: 1, s: 1 } }
    ]
  },
  {
    id: 12,
    title: '如果商场突然强烈来意，但厕所排队，你会？',
    options: [
      { text: '死守阵地，排也得排到', score: { H: 1, I: 1 } },
      { text: '迅速寻找其他楼层或备用点位', score: { h: 2 } },
      { text: '先忍一忍，赌自己扛得住', score: { H: 1, s: 1 } },
      { text: '已经来不及了，马上进入一级响应', score: { s: 2, t: 2 } }
    ]
  }
];
