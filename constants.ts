import { AgendaIconType, EventDetails } from './types';

export const INITIAL_EVENT_DATA: EventDetails = {
  title: "丝路 · 雅集",
  subtitle: "丝绸之路·AI出海会员线下私享会 · 苏州站",
  date: "2026.01.16 (周五)",
  timeLabel: "17:00 签到",
  weather: "多云 2°C~8°C (预计)",
  introTitle: "诚挚邀请",
  introText: "尊敬的丝绸之路会员：\n\n姑苏城外，运河之畔。时维金秋，群贤毕至。\n\n诚邀您共赴一场味蕾与思想的盛宴。本次雅集设宴于吴江美食界“顶流”——阿红私房菜。这家43年匠心传承的老字号，连续霸榜苏州江浙菜销量榜首及苏帮菜热门榜第一等二十余项殊荣，曾引得王晶、罗嘉良、朱孝天等名流皆成座上宾。\n\n让我们在品味地道苏帮美味的同时，从技术落地到全球增长，与江浙沪区域的AI先行者们深度链接，共话出海新篇章。",
  stats: {
    value1: "10+",
    label1: "核心会员",
    valueMiddle: "4h",
    labelMiddle: "深度交流",
    value2: "No.1",
    label2: "私房美味"
  },
  agenda: [
    {
      time: "17:00",
      title: "会员签到",
      description: "自由交流",
      icon: AgendaIconType.CHECK_IN
    },
    {
      time: "17:30",
      title: "自我介绍",
      description: "破冰环节，相互认识",
      icon: AgendaIconType.INTRO
    },
    {
      time: "18:30",
      title: "晚宴开始",
      description: "43年老店 · 王晶/罗嘉良/朱孝天同款",
      icon: AgendaIconType.DINNER
    },
    {
      time: "20:30",
      title: "主题交流",
      description: "丝绸之路会员资源对接",
      icon: AgendaIconType.TALK
    },
    {
      time: "21:30",
      title: "合影留念",
      description: "活动圆满结束",
      icon: AgendaIconType.PHOTO
    }
  ],
  venue: {
    name: "阿红私房菜 (新都汇店)",
    room: "尊享包间 · A区 V209",
    address: "吴江区 · 新都汇城市广场9幢",
    distance: "距地铁4号线人民广场站步行800m",
    rating: "4.9分高口碑 · 43年匠心老店",
    tags: ["苏帮菜销量No.1", "名流雅集首选", "尊享私密V209", "免费停车"],
    imageUrls: [
      "https://s2.loli.net/2026/01/13/IOyEej1dmnqJQPM.jpg",
      "https://s2.loli.net/2026/01/13/7PXejkS8YgWTlKn.jpg"
    ],
    intro: "这家43年老字号苏帮菜馆简直是吴江美食界的“顶流”！连续霸榜苏州江浙菜销量榜第1名、苏帮菜热门榜第1名等超20个榜单。招牌菜「阿红烧麦」皮薄到透光，咬开瞬间爆汁；「手工套肠」层层叠叠的工艺超费功夫，炖得软糯入味；「神仙鸡」用砂锅慢煲，鸡肉吸饱酱香，连骨头都酥烂！",
    features: [
      "食材讲究：鲜活河鲜现点现杀，冰糖河鳗、清蒸白水鱼都是时令限定",
      "工艺独特：套肠手工套制7层，神仙鸡用传统砂锅保留锅气",
      "环境加分：海派复古风+透明厨房，三楼包厢带露台，拍照超出片"
    ]
  },
  transport: {
    car: "导航搜索“新都汇城市广场-地下停车场”。就餐可享免费停车5小时，请结账时告知车牌号。",
    subway: "乘坐地铁4号线至【人民广场站】3号口出，步行约800米（约12分钟）即可到达。",
    taxi: "建议定位至“新都汇城市广场-西门”，下车后步行约50米即达阿红私房菜大堂入口。"
  },
  // "Fisherman's Song at Dusk" - Guzheng (Royalty Free / Public Domain from Wikimedia)
  musicUrl: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Guzheng_-_Fisherman%27s_Song_at_Dusk.ogg/Guzheng_-_Fisherman%27s_Song_at_Dusk.ogg.mp3"
};