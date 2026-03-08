import { useState, useEffect } from "react";

function useGoogleFont() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+JP:wght@400;600;700;800&family=Noto+Sans+KR:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
}

const I18N = {
  ko: {
    appTitle: "BaseballLive", appSubtitle: "글로벌 베이스볼 생중계",
    tabs: { overview: "개요", schedule: "일정", standings: "순위", teams: "팀 목록" },
    schedule: { today: "오늘 경기", upcoming: "예정", live: "진행중", final: "종료", vs: "VS" },
    overview: { founded: "창설", teams: "팀 수", season: "시즌", champion: "2025 챔피언" },
    teams: { total: "개 팀" },
    standings: { note: "※ 2025 시즌 최종 순위 기준", w: "승", l: "패", pct: "승률", team: "팀명", away: "원정", home: "홈" },
  },
  ja: {
    appTitle: "BaseballLive", appSubtitle: "グローバルベースボール生中継",
    tabs: { overview: "概要", schedule: "日程", standings: "順位", teams: "チーム一覧" },
    schedule: { today: "本日の試合", upcoming: "予定", live: "試合中", final: "終了", vs: "VS" },
    overview: { founded: "設立", teams: "チーム数", season: "シーズン", champion: "2025優勝" },
    teams: { total: "チーム" },
    standings: { note: "※ 2025シーズン最終順位基準", w: "勝", l: "敗", pct: "勝率", team: "チーム", away: "ビジター", home: "ホーム" },
  },
  en: {
    appTitle: "BaseballLive", appSubtitle: "Global Baseball Live",
    tabs: { overview: "Overview", schedule: "Schedule", standings: "Standings", teams: "Teams" },
    schedule: { today: "Today's Games", upcoming: "Upcoming", live: "Live", final: "Final", vs: "VS" },
    overview: { founded: "Founded", teams: "Teams", season: "Season", champion: "2025 Champion" },
    teams: { total: "teams" },
    standings: { note: "※ Based on 2025 final standings", w: "W", l: "L", pct: "PCT", team: "Team", away: "Away", home: "Home" },
  },
};

const LANG_INFO = { ko:{flag:"🇰🇷",label:"한국어"}, ja:{flag:"🇯🇵",label:"日本語"}, en:{flag:"🇺🇸",label:"English"} };

const KBO_FLAG = () => (
  <svg width="60" height="40" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
    <rect width="720" height="480" fill="#FFF"/>
    <g transform="matrix(0.832050294 0.554700196 -0.554700196 0.832050294 193.589941 -159.384141)">
      <path d="M240,240 a120,120 0 0,1 240,0z" fill="#C60C30"/>
      <path d="M480,240 a120,120 0 0,1 -240,0z" fill="#003478"/>
      <path d="M360,239 a60,60 0 0,1 -120,0z" fill="#C60C30"/>
      <path d="M360,241 a60,60 0 0,1 120,0z" fill="#003478"/>
    </g>
    <g transform="matrix(0.554700196 -0.832050294 0.832050294 0.554700196 94.438489 135.070018)">
      <rect x="0" y="0" width="120" height="20" fill="#000"/><rect x="0" y="30" width="120" height="20" fill="#000"/><rect x="0" y="60" width="120" height="20" fill="#000"/>
    </g>
    <g transform="matrix(0.554700196 0.832050294 -0.832050294 0.554700196 161.002513 300.553966)">
      <rect x="0" y="0" width="120" height="20" fill="#000"/><rect x="0" y="30" width="55" height="20" fill="#000"/><rect x="65" y="30" width="55" height="20" fill="#000"/><rect x="0" y="60" width="120" height="20" fill="#000"/>
    </g>
    <g transform="matrix(0.554700196 0.832050294 -0.832050294 0.554700196 558.997487 35.2239829)">
      <rect x="0" y="0" width="55" height="20" fill="#000"/><rect x="65" y="0" width="55" height="20" fill="#000"/><rect x="0" y="30" width="120" height="20" fill="#000"/><rect x="0" y="60" width="55" height="20" fill="#000"/><rect x="65" y="60" width="55" height="20" fill="#000"/>
    </g>
    <g transform="matrix(0.554700196 -0.832050294 0.832050294 0.554700196 492.433464 400.400001)">
      <rect x="0" y="0" width="55" height="20" fill="#000"/><rect x="65" y="0" width="55" height="20" fill="#000"/><rect x="0" y="30" width="55" height="20" fill="#000"/><rect x="65" y="30" width="55" height="20" fill="#000"/><rect x="0" y="60" width="55" height="20" fill="#000"/><rect x="65" y="60" width="55" height="20" fill="#000"/>
    </g>
  </svg>
);
const NPB_FLAG = () => (<svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="white"/><circle cx="30" cy="20" r="12" fill="#BC002D"/></svg>);
const MLB_FLAG = () => (
  <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(<rect key={i} x="0" y={i*(40/13)} width="60" height={40/13+0.5} fill={i%2===0?"#B22234":"white"}/>))}
    <rect x="0" y="0" width="24" height="21" fill="#3C3B6E"/>
    {[0,1,2,3,4,5,6,7,8].map(row=>{const cols=row%2===0?6:5,ox=row%2===0?2.0:4.4;return Array.from({length:cols}).map((_,col)=>(<polygon key={row+"-"+col} points="0,-1.1 0.65,0.45 -0.65,0.45" transform={"translate("+(ox+col*4.0)+","+(2.0+row*2.2)+")"} fill="white"/>));})}
  </svg>
);

const LEAGUES = {
  KBO:{id:"KBO",emoji:"🇰🇷",color:"#DC2626",bg:"linear-gradient(135deg,#003478,#C60C30)",Flag:KBO_FLAG,
    name:{ko:"KBO 리그",ja:"KBOリーグ",en:"KBO League"},fullName:{ko:"한국프로야구",ja:"韓国プロ野球",en:"Korea Baseball Organization"},
    country:{ko:"🇰🇷 대한민국",ja:"🇰🇷 韓国",en:"🇰🇷 South Korea"},founded:"1982",teamCount:10,
    season:{ko:"3월 ~ 11월",ja:"3月〜11月",en:"Mar – Nov"},champion2025:{ko:"LG 트윈스",ja:"LGツインズ",en:"LG Twins"},
    teams_list:[
      {name:"한화 이글스",  mgr:"김경문",cap:"강백호",city:{ko:"대전",ja:"大田",  en:"Daejeon" },w:83,l:57,pct:".593",champ:1},
      {name:"LG 트윈스",   mgr:"염경엽",cap:"김현수",city:{ko:"서울",ja:"ソウル",en:"Seoul"   },w:85,l:56,pct:".603",champ:4},
      {name:"SSG 랜더스",  mgr:"이숭용",cap:"최정",city:{ko:"인천",ja:"仁川",  en:"Incheon" },w:75,l:65,pct:".536",champ:4},
      {name:"삼성 라이온즈",mgr:"박진만",cap:"구자욱",city:{ko:"대구",ja:"大邱",  en:"Daegu"   },w:74,l:68,pct:".521",champ:8},
      {name:"NC 다이노스", mgr:"강인권",cap:"손아섭",city:{ko:"창원",ja:"昌原",  en:"Changwon"},w:71,l:67,pct:".514",champ:1},
      {name:"KT wiz",      mgr:"이강철",cap:"김현수",city:{ko:"수원",ja:"水原",  en:"Suwon"   },w:71,l:68,pct:".511",champ:1},
      {name:"롯데 자이언츠",mgr:"김태형",cap:"전준우",city:{ko:"부산",ja:"釜山",  en:"Busan"   },w:66,l:72,pct:".478",champ:2},
      {name:"KIA 타이거즈",mgr:"이범호",cap:"나성범",city:{ko:"광주",ja:"光州",  en:"Gwangju" },w:65,l:75,pct:".464",champ:11},
      {name:"두산 베어스", mgr:"김원형",cap:"양의지",city:{ko:"서울",ja:"ソウル",en:"Seoul"   },w:61,l:77,pct:".441",champ:6},
      {name:"키움 히어로즈",mgr:"설종진",cap:"임지열",city:{ko:"서울",ja:"ソウル",en:"Seoul"   },w:47,l:93,pct:".336",champ:0},
    ]},
  NPB:{id:"NPB",emoji:"🇯🇵",color:"#2563EB",bg:"linear-gradient(135deg,#BC002D,#999)",Flag:NPB_FLAG,
    name:{ko:"NPB 리그",ja:"NPBリーグ",en:"NPB League"},fullName:{ko:"일본프로야구",ja:"日本プロ野球",en:"Nippon Professional Baseball"},
    country:{ko:"🇯🇵 일본",ja:"🇯🇵 日本",en:"🇯🇵 Japan"},founded:"1936",teamCount:12,
    season:{ko:"3월 ~ 11월",ja:"3月〜11月",en:"Mar – Nov"},champion2025:{ko:"요미우리 자이언츠",ja:"読売ジャイアンツ",en:"Yomiuri Giants"},
    teams_list:[
      {name:"読売ジャイアンツ",mgr:"阿部慎之助",cap:"岡本和真",champ:22,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"},     city:{ko:"도쿄",   ja:"東京",  en:"Tokyo"    },w:79,l:59,pct:".572"},
      {name:"阪神タイガース",mgr:"藤川球児",cap:"近本光司",champ:2,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"},       city:{ko:"오사카", ja:"大阪",  en:"Osaka"    },w:77,l:62,pct:".554"},
      {name:"広島東洋カープ",mgr:"新井貴浩",cap:"秋山翔吾",champ:3,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"},       city:{ko:"히로시마",ja:"広島", en:"Hiroshima"},w:72,l:67,pct:".518"},
      {name:"中日ドラゴンズ",mgr:"井上一樹",cap:"中島宏之",champ:2,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"},       city:{ko:"나고야", ja:"名古屋",en:"Nagoya"   },w:70,l:69,pct:".504"},
      {name:"ヤクルトスワローズ",mgr:"高津臣吾",cap:"山田哲人",champ:6,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"},   city:{ko:"도쿄",   ja:"東京",  en:"Tokyo"    },w:68,l:71,pct:".489"},
      {name:"横浜DeNAベイスターズ",mgr:"三浦大輔",cap:"牧秀悟",champ:2,div:{ko:"센트럴",ja:"セ・リーグ",en:"Central"}, city:{ko:"요코하마",ja:"横浜", en:"Yokohama" },w:52,l:87,pct:".374"},
      {name:"ソフトバンクホークス",mgr:"小久保裕紀",cap:"柳田悠岐",champ:11,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"}, city:{ko:"후쿠오카",ja:"福岡", en:"Fukuoka"  },w:76,l:63,pct:".547"},
      {name:"オリックスバファローズ",mgr:"岸田護",cap:"宗佑磨",champ:4,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"},city:{ko:"오사카", ja:"大阪",  en:"Osaka"    },w:65,l:74,pct:".467"},
      {name:"千葉ロッテマリーンズ",mgr:"吉井理人",cap:"中村奨吾",champ:2,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"}, city:{ko:"지바",   ja:"千葉",  en:"Chiba"    },w:63,l:76,pct:".453"},
      {name:"埼玉西武ライオンズ",mgr:"西口文也",cap:"源田壮亮",champ:13,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"},   city:{ko:"사이타마",ja:"埼玉", en:"Saitama"  },w:60,l:79,pct:".432"},
      {name:"北海道日本ハム",mgr:"新庄剛志",cap:"近藤健介",champ:2,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"},       city:{ko:"홋카이도",ja:"北海道",en:"Hokkaido" },w:58,l:81,pct:".417"},
      {name:"東北楽天イーグルス",mgr:"今江敏晃",cap:"浅村栄斗",champ:1,div:{ko:"퍼시픽",ja:"パ・リーグ",en:"Pacific"},   city:{ko:"센다이", ja:"仙台",  en:"Sendai"   },w:55,l:84,pct:".396"},
    ]},
  MLB:{id:"MLB",emoji:"🇺🇸",color:"#16A34A",bg:"linear-gradient(135deg,#B22234,#3C3B6E)",Flag:MLB_FLAG,
    name:{ko:"MLB",ja:"MLB",en:"MLB"},fullName:{ko:"메이저리그 베이스볼",ja:"メジャーリーグベースボール",en:"Major League Baseball"},
    country:{ko:"🇺🇸 미국/캐나다",ja:"🇺🇸 米国/カナダ",en:"🇺🇸 USA / Canada"},founded:"1903",teamCount:30,
    season:{ko:"4월 ~ 11월",ja:"4月〜11月",en:"Apr – Nov"},champion2025:{ko:"LA 다저스",ja:"LAドジャース",en:"LA Dodgers"},
    teams_list:[
      {name:"LA Dodgers",mgr:"Dave Roberts",cap:"Freddie Freeman",champ:7,div:{ko:"NL 서부",ja:"NL西",en:"NL West"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},          city:{ko:"로스앤젤레스",ja:"ロサンゼルス",    en:"Los Angeles"  },w:98, l:64, pct:".605"},
      {name:"Atlanta Braves",mgr:"Brian Snitker",cap:"Ronald Acuna Jr.",champ:4,div:{ko:"NL 동부",ja:"NL東",en:"NL East"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},      city:{ko:"애틀랜타",    ja:"アトランタ",      en:"Atlanta"      },w:92, l:70, pct:".568"},
      {name:"Philadelphia Phillies",mgr:"Rob Thomson",cap:"Bryce Harper",champ:2,div:{ko:"NL 동부",ja:"NL東",en:"NL East"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},city:{ko:"필라델피아",  ja:"フィラデルフィア", en:"Philadelphia" },w:91, l:71, pct:".562"},
      {name:"Houston Astros",mgr:"Joe Espada",cap:"Jose Altuve",champ:2,div:{ko:"AL 서부",ja:"AL西",en:"AL West"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},      city:{ko:"휴스턴",      ja:"ヒューストン",    en:"Houston"      },w:90, l:72, pct:".556"},
      {name:"NY Yankees",mgr:"Aaron Boone",cap:"Aaron Judge",champ:27,div:{ko:"AL 동부",ja:"AL東",en:"AL East"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},          city:{ko:"뉴욕",        ja:"ニューヨーク",    en:"New York"     },w:94, l:68, pct:".580"},
      {name:"Cleveland Guardians",mgr:"Stephen Vogt",cap:"Jose Ramirez",champ:2,div:{ko:"AL 중부",ja:"AL中",en:"AL Central"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"}, city:{ko:"클리블랜드",  ja:"クリーブランド",  en:"Cleveland"    },w:89, l:73, pct:".549"},
      {name:"Seattle Mariners",mgr:"Dan Wilson",cap:"Julio Rodriguez",champ:0,div:{ko:"AL 서부",ja:"AL西",en:"AL West"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},    city:{ko:"시애틀",      ja:"シアトル",        en:"Seattle"      },w:85, l:77, pct:".525"},
      {name:"Boston Red Sox",mgr:"Alex Cora",cap:"Rafael Devers",champ:9,div:{ko:"AL 동부",ja:"AL東",en:"AL East"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},      city:{ko:"보스턴",      ja:"ボストン",        en:"Boston"       },w:83, l:79, pct:".512"},
      {name:"Minnesota Twins",mgr:"Rocco Baldelli",cap:"Carlos Correa",champ:3,div:{ko:"AL 중부",ja:"AL中",en:"AL Central"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},     city:{ko:"미네소타",    ja:"ミネソタ",        en:"Minnesota"    },w:82, l:80, pct:".506"},
      {name:"Toronto Blue Jays",mgr:"John Schneider",cap:"Vladimir Guerrero Jr.",champ:2,div:{ko:"AL 동부",ja:"AL東",en:"AL East"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},   city:{ko:"토론토",      ja:"トロント",        en:"Toronto"      },w:81, l:81, pct:".500"},
      {name:"Tampa Bay Rays",mgr:"Kevin Cash",cap:"Yandy Diaz",champ:0,div:{ko:"AL 동부",ja:"AL東",en:"AL East"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},      city:{ko:"탬파베이",    ja:"タンパベイ",      en:"Tampa Bay"    },w:80, l:82, pct:".494"},
      {name:"San Diego Padres",mgr:"Mike Shildt",cap:"Manny Machado",champ:0,div:{ko:"NL 서부",ja:"NL西",en:"NL West"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},    city:{ko:"샌디에이고",  ja:"サンディエゴ",    en:"San Diego"    },w:88, l:74, pct:".543"},
      {name:"NY Mets",mgr:"Carlos Mendoza",cap:"Francisco Lindor",champ:2,div:{ko:"NL 동부",ja:"NL東",en:"NL East"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},             city:{ko:"뉴욕",        ja:"ニューヨーク",    en:"New York"     },w:79, l:83, pct:".488"},
      {name:"SF Giants",mgr:"Bob Melvin",cap:"Matt Chapman",champ:8,div:{ko:"NL 서부",ja:"NL西",en:"NL West"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},           city:{ko:"샌프란시스코",ja:"サンフランシスコ",en:"San Francisco"},w:78, l:84, pct:".481"},
      {name:"Texas Rangers",mgr:"Bruce Bochy",cap:"Corey Seager",champ:1,div:{ko:"AL 서부",ja:"AL西",en:"AL West"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},       city:{ko:"텍사스",      ja:"テキサス",        en:"Texas"        },w:76, l:86, pct:".469"},
      {name:"Chicago Cubs",mgr:"Craig Counsell",cap:"Dansby Swanson",champ:3,div:{ko:"NL 중부",ja:"NL中",en:"NL Central"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},        city:{ko:"시카고",      ja:"シカゴ",          en:"Chicago"      },w:75, l:87, pct:".463"},
      {name:"Baltimore Orioles",mgr:"Brandon Hyde",cap:"Adley Rutschman",champ:3,div:{ko:"AL 동부",ja:"AL東",en:"AL East"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},   city:{ko:"볼티모어",    ja:"ボルチモア",      en:"Baltimore"    },w:74, l:88, pct:".457"},
      {name:"Milwaukee Brewers",mgr:"Pat Murphy",cap:"William Contreras",champ:0,div:{ko:"NL 중부",ja:"NL中",en:"NL Central"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},   city:{ko:"밀워키",      ja:"ミルウォーキー",  en:"Milwaukee"    },w:72, l:90, pct:".444"},
      {name:"St. Louis Cardinals",mgr:"Oliver Marmol",cap:"Paul Goldschmidt",champ:11,div:{ko:"NL 중부",ja:"NL中",en:"NL Central"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"}, city:{ko:"세인트루이스", ja:"セントルイス",    en:"St. Louis"    },w:71, l:91, pct:".438"},
      {name:"Arizona Diamondbacks",mgr:"Torey Lovullo",cap:"Ketel Marte",champ:1,div:{ko:"NL 서부",ja:"NL西",en:"NL West"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},city:{ko:"애리조나",    ja:"アリゾナ",        en:"Arizona"      },w:70, l:92, pct:".432"},
      {name:"Kansas City Royals",mgr:"Matt Quatraro",cap:"Salvador Perez",champ:2,div:{ko:"AL 중부",ja:"AL中",en:"AL Central"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},  city:{ko:"캔자스시티",  ja:"カンザスシティ",  en:"Kansas City"  },w:68, l:94, pct:".420"},
      {name:"Detroit Tigers",mgr:"A.J. Hinch",cap:"Riley Greene",champ:4,div:{ko:"AL 중부",ja:"AL中",en:"AL Central"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},      city:{ko:"디트로이트",  ja:"デトロイト",      en:"Detroit"      },w:66, l:96, pct:".407"},
      {name:"Cincinnati Reds",mgr:"David Bell",cap:"Elly De La Cruz",champ:5,div:{ko:"NL 중부",ja:"NL中",en:"NL Central"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},     city:{ko:"신시내티",    ja:"シンシナティ",    en:"Cincinnati"   },w:65, l:97, pct:".401"},
      {name:"Pittsburgh Pirates",mgr:"Derek Shelton",cap:"Paul Skenes",champ:5,div:{ko:"NL 중부",ja:"NL中",en:"NL Central"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},  city:{ko:"피츠버그",    ja:"ピッツバーグ",    en:"Pittsburgh"   },w:63, l:99, pct:".389"},
      {name:"Washington Nationals",mgr:"Dave Martinez",cap:"CJ Abrams",champ:1,div:{ko:"NL 동부",ja:"NL東",en:"NL East"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},city:{ko:"워싱턴",      ja:"ワシントン",      en:"Washington"   },w:62, l:100,pct:".383"},
      {name:"LA Angels",mgr:"Ron Washington",cap:"Mike Trout",champ:1,div:{ko:"AL 서부",ja:"AL西",en:"AL West"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},           city:{ko:"로스앤젤레스",ja:"ロサンゼルス",    en:"Los Angeles"  },w:61, l:101,pct:".377"},
      {name:"Miami Marlins",mgr:"Skip Schumaker",cap:"Jazz Chisholm Jr.",champ:2,div:{ko:"NL 동부",ja:"NL東",en:"NL East"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},       city:{ko:"마이애미",    ja:"マイアミ",        en:"Miami"        },w:59, l:103,pct:".364"},
      {name:"Colorado Rockies",mgr:"Bud Black",cap:"Kris Bryant",champ:0,div:{ko:"NL 서부",ja:"NL西",en:"NL West"},league:{ko:"내셔널리그",ja:"ナ・リーグ",en:"NL"},    city:{ko:"콜로라도",    ja:"コロラド",        en:"Colorado"     },w:58, l:104,pct:".358"},
      {name:"Oakland Athletics",mgr:"Mark Kotsay",cap:"Brent Rooker",champ:9,div:{ko:"AL 서부",ja:"AL西",en:"AL West"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},   city:{ko:"오클랜드",    ja:"オークランド",    en:"Oakland"      },w:56, l:106,pct:".346"},
      {name:"Chicago White Sox",mgr:"Will Venable",cap:"Andrew Vaughn",champ:3,div:{ko:"AL 중부",ja:"AL中",en:"AL Central"},league:{ko:"아메리칸리그",ja:"ア・リーグ",en:"AL"},   city:{ko:"시카고",      ja:"シカゴ",          en:"Chicago"      },w:41, l:121,pct:".253"},
    ]},
};

const SCHEDULES = {
  KBO:{
    "-1":[
      {away:"KT",  home:"LG",  awayScore:5,homeScore:3,status:"final",time:"14:00",venue:"잠실"},
      {away:"키움",home:"한화",awayScore:2,homeScore:7,status:"final",time:"14:00",venue:"대전"},
      {away:"KIA",home:"SSG", awayScore:4,homeScore:4,status:"final",time:"14:00",venue:"문학"},
      {away:"롯데",home:"삼성",awayScore:1,homeScore:6,status:"final",time:"14:00",venue:"대구"},
      {away:"두산",home:"NC",  awayScore:3,homeScore:2,status:"final",time:"14:00",venue:"창원"},
    ],
    "0":[
      {away:"KT",  home:"LG",  awayScore:3,homeScore:null,status:"live",time:"14:00",venue:"잠실"},
      {away:"키움",home:"한화",awayScore:null,homeScore:null,status:"upcoming",time:"17:00",venue:"대전"},
      {away:"KIA",home:"SSG", awayScore:null,homeScore:null,status:"upcoming",time:"17:00",venue:"문학"},
      {away:"롯데",home:"삼성",awayScore:null,homeScore:null,status:"upcoming",time:"17:00",venue:"대구"},
      {away:"두산",home:"NC",  awayScore:null,homeScore:null,status:"upcoming",time:"17:00",venue:"창원"},
    ],
    "1":[
      {away:"LG",  home:"한화",awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"대전"},
      {away:"SSG", home:"키움",awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"고척"},
      {away:"삼성",home:"KIA", awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"광주"},
      {away:"NC",  home:"롯데",awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"사직"},
      {away:"두산",home:"KT",  awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"수원"},
    ],
  },
  NPB:{
    "-1":[
      {away:"阪神",home:"読売",       awayScore:3,homeScore:5,status:"final",time:"14:00",venue:"東京ドーム"},
      {away:"広島",home:"ヤクルト",   awayScore:6,homeScore:2,status:"final",time:"14:00",venue:"神宮"},
      {away:"中日",home:"DeNA",      awayScore:1,homeScore:4,status:"final",time:"14:00",venue:"横浜"},
      {away:"楽天",home:"ソフトバンク",awayScore:0,homeScore:3,status:"final",time:"14:00",venue:"福岡"},
      {away:"西武",home:"日本ハム",   awayScore:4,homeScore:2,status:"final",time:"14:00",venue:"北海道"},
    ],
    "0":[
      {away:"阪神",home:"読売",       awayScore:2,homeScore:null,status:"live",time:"14:00",venue:"東京ドーム"},
      {away:"広島",home:"ヤクルト",   awayScore:null,homeScore:null,status:"upcoming",time:"18:00",venue:"神宮"},
      {away:"中日",home:"DeNA",      awayScore:null,homeScore:null,status:"upcoming",time:"18:00",venue:"横浜"},
      {away:"楽天",home:"ソフトバンク",awayScore:null,homeScore:null,status:"upcoming",time:"18:00",venue:"福岡"},
      {away:"西武",home:"日本ハム",   awayScore:null,homeScore:null,status:"upcoming",time:"18:00",venue:"北海道"},
    ],
    "1":[
      {away:"読売",home:"阪神",       awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"甲子園"},
      {away:"ヤクルト",home:"広島",   awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"マツダ"},
      {away:"DeNA",home:"中日",      awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"バンテリン"},
      {away:"ソフトバンク",home:"楽天",awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"楽天モバイル"},
      {away:"日本ハム",home:"西武",   awayScore:null,homeScore:null,status:"upcoming",time:"14:00",venue:"ベルーナ"},
    ],
  },
  MLB:{
    "-1":[
      {away:"Yankees",home:"Dodgers",  awayScore:4,homeScore:6,status:"final",time:"19:10",venue:"Dodger Stadium"},
      {away:"Red Sox",home:"Astros",   awayScore:3,homeScore:3,status:"final",time:"13:05",venue:"Fenway Park"},
      {away:"Cubs",   home:"Cardinals",awayScore:7,homeScore:2,status:"final",time:"14:15",venue:"Busch Stadium"},
      {away:"Braves", home:"Mets",     awayScore:5,homeScore:1,status:"final",time:"19:10",venue:"Citi Field"},
    ],
    "0":[
      {away:"Yankees",home:"Dodgers",  awayScore:2,homeScore:null,status:"live",time:"19:10",venue:"Dodger Stadium"},
      {away:"Red Sox",home:"Yankees",  awayScore:null,homeScore:null,status:"upcoming",time:"13:05",venue:"Fenway Park"},
      {away:"Cubs",   home:"Cardinals",awayScore:null,homeScore:null,status:"upcoming",time:"14:15",venue:"Busch Stadium"},
      {away:"Astros", home:"Rangers",  awayScore:null,homeScore:null,status:"upcoming",time:"20:05",venue:"Globe Life Field"},
      {away:"Braves", home:"Mets",     awayScore:null,homeScore:null,status:"upcoming",time:"19:10",venue:"Citi Field"},
    ],
    "1":[
      {away:"Dodgers",home:"Giants",   awayScore:null,homeScore:null,status:"upcoming",time:"15:05",venue:"Oracle Park"},
      {away:"Yankees",home:"Red Sox",  awayScore:null,homeScore:null,status:"upcoming",time:"13:35",venue:"Yankee Stadium"},
      {away:"Cardinals",home:"Cubs",   awayScore:null,homeScore:null,status:"upcoming",time:"14:20",venue:"Wrigley Field"},
      {away:"Rangers",home:"Astros",   awayScore:null,homeScore:null,status:"upcoming",time:"20:10",venue:"Minute Maid Park"},
      {away:"Mets",   home:"Braves",   awayScore:null,homeScore:null,status:"upcoming",time:"19:20",venue:"Truist Park"},
    ],
  },
};

const newsCache = {};

const NEWS_SOURCES = {
  KBO: [
    {name:"스포츠조선", short:"스조", color:"#E63946"},
    {name:"일간스포츠", short:"일스", color:"#2563EB"},
    {name:"스포츠서울", short:"스서", color:"#059669"},
    {name:"MBC스포츠", short:"MBC", color:"#7C3AED"},
  ],
  NPB: [
    {name:"スポーツ報知", short:"報知", color:"#E63946"},
    {name:"日刊スポーツ", short:"日刊", color:"#2563EB"},
    {name:"サンスポ", short:"サン", color:"#D97706"},
    {name:"デイリー", short:"デイ", color:"#059669"},
  ],
  MLB: [
    {name:"ESPN", short:"ESPN", color:"#E63946"},
    {name:"MLB.com", short:"MLB", color:"#2563EB"},
    {name:"The Athletic", short:"ATH", color:"#1E293B", border:"#94A3B8"},
    {name:"CBS Sports", short:"CBS", color:"#2563EB"},
  ],
};

async function fetchNews(leagueId, lang) {
  const cacheKey = `${leagueId}-${lang}-${new Date().toISOString().slice(0,10)}`;
  if (newsCache[cacheKey]) return newsCache[cacheKey];

  const queries = {
    KBO: "KBO 야구",
    NPB: "プロ野球",
    MLB: "MLB baseball",
  };
  const hl = lang==="ko"?"ko":lang==="ja"?"ja":"en";
  const gl = lang==="ko"?"KR":lang==="ja"?"JP":"US";
  const ceid = lang==="ko"?"KR:ko":lang==="ja"?"JP:ja":"US:en";
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(queries[leagueId])}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=3`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.status !== "ok" || !data.items?.length) throw new Error("RSS 실패");

    const sources = NEWS_SOURCES[leagueId];
    const result = data.items.slice(0,3).map((item, i) => {
      const src = sources[i % sources.length];
      const title = item.title?.replace(/ - .*$/, "").slice(0,40) || "";
      const desc = item.description?.replace(/<[^>]+>/g,"").slice(0,60) || "";
      const emojis = ["⚾","🏆","📊","🔥","💪"];
      return { emoji: emojis[i%emojis.length], title, desc, source: src.name, link: item.link };
    });

    newsCache[cacheKey] = result;
    return result;
  } catch(e) {
    // fallback: AI 생성
    try {
      const today = new Date().toISOString().slice(0,10);
      const langLabel = lang==="ko"?"한국어":lang==="ja"?"日本語":"English";
      const srcNames = NEWS_SOURCES[leagueId].map(s=>s.name).join(",");
      const res2 = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-haiku-4-5-20251001",
          max_tokens:600,
          system:"Return ONLY valid JSON array, no markdown.",
          messages:[{role:"user", content:`${today} ${leagueId} 야구 뉴스 3개 ${langLabel}로. 출처: ${srcNames}. JSON만: [{"emoji":"","title":"","desc":"","source":""}]`}]
        })
      });
      const d = await res2.json();
      const text = d.content?.filter(c=>c.type==="text").map(c=>c.text).join("").trim().replace(/```json|```/g,"");
      const parsed = JSON.parse(text);
      newsCache[cacheKey] = parsed;
      return parsed;
    } catch { return null; }
  }
}

function NewsSection({ league, lang }) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const lc = league.color;

  useEffect(()=>{
    setNews(null);
    setLoading(true);
    fetchNews(league.id, lang).then(result=>{
      setNews(result||[]);
      setLoading(false);
    });
  }, [league.id, lang]);

  const sectionLabel = lang==="ko"?"주요 뉴스":lang==="ja"?"主要ニュース":"Top News";
  const sourceMap = {};
  NEWS_SOURCES[league.id].forEach(s=>{ sourceMap[s.name]=s; });

  function refresh() {
    const cacheKey = `${league.id}-${lang}-${new Date().toISOString().slice(0,10)}`;
    delete newsCache[cacheKey];
    setNews(null);
    setLoading(true);
    fetchNews(league.id, lang).then(result=>{ setNews(result||[]); setLoading(false); });
  }

  return (
    <div style={{marginTop:14}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:800,color:"#64748B",letterSpacing:"0.8px",textTransform:"uppercase"}}>{sectionLabel}</div>
        <button onClick={refresh} disabled={loading} style={{background:"none",border:"none",color:loading?"#334155":lc,fontSize:12,cursor:loading?"default":"pointer",fontWeight:700,padding:"2px 6px"}}>
          {loading?"⟳":"↻ "}{lang==="ko"?"새로고침":lang==="ja"?"更新":"Refresh"}
        </button>
      </div>
      {loading&&[0,1,2].map(i=>(
        <div key={i} style={{background:"#1E293B",borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#334155"}}/>
          <div style={{flex:1}}>
            <div style={{height:12,background:"#334155",borderRadius:6,width:"70%",marginBottom:8}}/>
            <div style={{height:10,background:"#263045",borderRadius:6,width:"90%"}}/>
          </div>
        </div>
      ))}
      {!loading&&news&&news.map((n,i)=>{
        const src = sourceMap[n.source] || NEWS_SOURCES[league.id][i%NEWS_SOURCES[league.id].length];
        return (
          <div key={i} onClick={()=>n.link&&window.open(n.link,"_blank")} style={{background:"#1E293B",borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",gap:12,alignItems:"flex-start",borderLeft:`3px solid ${lc}44`,cursor:n.link?"pointer":"default"}}>
            {/* 출처 로고 배지 */}
            <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:40,height:40,borderRadius:10,background:src.color,border:src.border?`1px solid ${src.border}`:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:10,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1,textAlign:"center"}}>{src.short}</span>
              </div>
              <span style={{fontSize:9,color:"#475569",fontWeight:600,maxWidth:40,textAlign:"center",lineHeight:1.2,wordBreak:"keep-all"}}>{src.name}</span>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:4,lineHeight:1.4}}>{n.emoji} {n.title}</div>
              <div style={{fontSize:11,color:"#64748B",lineHeight:1.5}}>{n.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const scheduleCache = {};

async function fetchSchedule(leagueId, dateStr, isPast) {
  const cacheKey = `${leagueId}-${dateStr}`;
  if (scheduleCache[cacheKey]) return scheduleCache[cacheKey];
  const teams = {
    KBO: ["한화","LG","KIA","SSG","롯데","삼성","두산","KT","키움","NC"],
    NPB: ["読売","阪神","広島","DeNA","ヤクルト","中日","ソフトバンク","楽天","西武","日本ハム","ロッテ","オリックス"],
    MLB: ["Yankees","Dodgers","Red Sox","Astros","Braves","Cubs","Cardinals","Giants","Mets","Rangers","Padres","Phillies"],
  };
  const prompt = isPast
    ? `${dateStr}의 ${leagueId} 경기 결과를 5경기 생성해줘. 팀 목록: ${teams[leagueId].join(",")}. 반드시 JSON 배열만 반환: [{"away":"팀명","home":"팀명","awayScore":숫자,"homeScore":숫자,"status":"final","time":"HH:MM","venue":"구장명"}]`
    : `${dateStr}의 ${leagueId} 예정 경기 일정을 5경기 생성해줘. 팀 목록: ${teams[leagueId].join(",")}. 반드시 JSON 배열만 반환: [{"away":"팀명","home":"팀명","awayScore":null,"homeScore":null,"status":"upcoming","time":"HH:MM","venue":"구장명"}]`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-haiku-4-5-20251001",
      max_tokens:600,
      system:"You are a baseball schedule generator. Return ONLY a valid JSON array, no markdown, no explanation.",
      messages:[{role:"user",content:prompt}]
    })
  });
  const data = await res.json();
  const text = data.content?.map(c=>c.text||"").join("").trim().replace(/```json|```/g,"");
  try {
    const parsed = JSON.parse(text);
    scheduleCache[cacheKey] = parsed;
    return parsed;
  } catch { return null; }
}

function ScheduleTab({ league, lang, t, scheduleOffset, setScheduleOffset }) {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const lc = league.color;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + scheduleOffset);
  const today = new Date();
  today.setHours(0,0,0,0);
  targetDate.setHours(0,0,0,0);
  const isPast = targetDate < today;
  const isToday = targetDate.getTime() === today.getTime();

  const dateStr = targetDate.toISOString().slice(0,10);
  const dateLabel = targetDate.toLocaleDateString(
    lang==="ko"?"ko-KR":lang==="ja"?"ja-JP":"en-US",
    {year:"numeric",month:"long",day:"numeric",weekday:"short"}
  );
  const dayLabel = isToday
    ? (lang==="ko"?"오늘":lang==="ja"?"今日":"Today")
    : scheduleOffset===-1
    ? (lang==="ko"?"어제":lang==="ja"?"昨日":"Yesterday")
    : isPast
    ? (lang==="ko"?"경기 결과":lang==="ja"?"試合結果":"Results")
    : scheduleOffset===1
    ? (lang==="ko"?"내일":lang==="ja"?"明日":"Tomorrow")
    : (lang==="ko"?"예정":lang==="ja"?"予定":"Schedule");

  useEffect(()=>{
    const cacheKey = `${league.id}-${dateStr}`;
    if (scheduleCache[cacheKey]) { setGames(scheduleCache[cacheKey]); return; }
    // 오늘/어제는 하드코딩 fallback 먼저
    if (isToday) {
      setGames(SCHEDULES[league.id]["0"]); return;
    }
    if (scheduleOffset===-1) {
      setGames(SCHEDULES[league.id]["-1"]); return;
    }
    setGames(null);
    setLoading(true);
    fetchSchedule(league.id, dateStr, isPast).then(result=>{
      setGames(result || []);
      setLoading(false);
    });
  }, [league.id, dateStr]);

  return (
    <div>
      {/* 날짜 네비게이션 */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:14}}>
        <button onClick={()=>setScheduleOffset(o=>o-1)}
          style={{width:36,height:36,borderRadius:"50%",border:"none",background:"#334155",color:"#F1F5F9",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ‹
        </button>
        <div style={{textAlign:"center",minWidth:180}}>
          <div style={{fontSize:12,fontWeight:800,color:lc,letterSpacing:"0.5px",marginBottom:2}}>{dayLabel}</div>
          <div style={{fontSize:12,color:"#94A3B8",fontWeight:600}}>📅 {dateLabel}</div>
        </div>
        <button onClick={()=>setScheduleOffset(o=>o+1)}
          style={{width:36,height:36,borderRadius:"50%",border:"none",background:"#334155",color:"#F1F5F9",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ›
        </button>
      </div>

      {/* 오늘 버튼 */}
      {scheduleOffset!==0&&(
        <div style={{textAlign:"center",marginBottom:12}}>
          <button onClick={()=>setScheduleOffset(0)} style={{background:"#1E293B",border:`1px solid ${lc}`,borderRadius:20,color:lc,fontSize:11,fontWeight:700,padding:"4px 14px",cursor:"pointer"}}>
            {lang==="ko"?"오늘로":lang==="ja"?"今日に戻る":"Back to Today"}
          </button>
        </div>
      )}

      {/* 로딩 */}
      {loading&&(
        <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}>
          <div style={{fontSize:24,marginBottom:8}}>⚾</div>
          <div style={{fontSize:12,color:lc}}>{lang==="ko"?"경기 일정 불러오는 중...":lang==="ja"?"試合日程を取得中...":"Loading schedule..."}</div>
        </div>
      )}

      {/* 경기 목록 */}
      {!loading&&games&&games.map((g,i)=>{
        const sc=g.status==="live"?"#22C55E":g.status==="final"?"#64748B":"#F59E0B";
        const sl=g.status==="live"?t.schedule.live:g.status==="final"?t.schedule.final:t.schedule.upcoming;
        return (
          <div key={i} style={{background:"#1E293B",borderRadius:12,padding:"14px 16px",marginBottom:10,border:g.status==="live"?"1px solid #22C55E44":"1px solid transparent"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:11,color:"#475569"}}>🏟️ {g.venue} · {g.time}</span>
              <span style={{fontSize:11,fontWeight:700,color:sc,background:sc+"22",padding:"2px 8px",borderRadius:8}}>{sl}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:11,color:"#475569",marginBottom:4}}>{t.standings.away}</div>
                <div style={{fontSize:18,fontWeight:800,color:"#F1F5F9"}}>{g.away}</div>
                {g.status!=="upcoming"&&<div style={{fontSize:20,fontWeight:900,color:g.awayScore>g.homeScore?"#F1F5F9":"#475569",marginTop:4}}>{g.awayScore??"-"}</div>}
              </div>
              <div style={{fontSize:13,color:"#334155",fontWeight:700,padding:"0 12px"}}>{t.schedule.vs}</div>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:11,color:"#475569",marginBottom:4}}>{t.standings.home}</div>
                <div style={{fontSize:18,fontWeight:800,color:"#F1F5F9"}}>{g.home}</div>
                {g.status!=="upcoming"&&<div style={{fontSize:20,fontWeight:900,color:g.homeScore>g.awayScore?"#F1F5F9":"#475569",marginTop:4}}>{g.homeScore??"-"}</div>}
              </div>
            </div>
          </div>
        );
      })}
      {!loading&&games&&games.length===0&&(
        <div style={{textAlign:"center",padding:"40px 0",color:"#475569",fontSize:13}}>
          {lang==="ko"?"경기 없음":lang==="ja"?"試合なし":"No games"}
        </div>
      )}
    </div>
  );
}

function StandingsTab({ league, lang, t }) {
  const teams = [...league.teams_list].sort((a,b) => b.w - a.w);
  const lc = league.color;
  const hasLeague = teams.some(tm => tm.league);
  const hasDivs = teams.some(tm => tm.div);

  const note = <div style={{fontSize:10,color:"#475569",marginBottom:12}}>{t.standings.note}</div>;
  const header = (
    <div style={{display:"grid",gridTemplateColumns:"28px 1fr 36px 36px 52px",padding:"6px 16px",fontSize:11,color:"#475569",fontWeight:600,marginBottom:4}}>
      <span>#</span><span>{t.standings.team}</span>
      <span style={{textAlign:"center"}}>{t.standings.w}</span>
      <span style={{textAlign:"center"}}>{t.standings.l}</span>
      <span style={{textAlign:"right"}}>{t.standings.pct}</span>
    </div>
  );
  const renderTeam = (tm, rank) => (
    <div key={tm.name} style={{background:"#1E293B",borderRadius:12,padding:"11px 16px",marginBottom:6,display:"grid",gridTemplateColumns:"28px 1fr 36px 36px 52px",alignItems:"center",borderLeft:rank===1?`3px solid ${lc}`:"3px solid transparent"}}>
      <span style={{fontSize:14,fontWeight:800,color:rank===1?lc:"#475569"}}>{rank}</span>
      <div style={{minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:"#F1F5F9",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tm.name}</div>
        <div style={{fontSize:11,color:"#475569",marginTop:1}}>📍 {tm.city[lang]}</div>
      </div>
      <span style={{textAlign:"center",fontSize:13,color:"#E2E8F0"}}>{tm.w??"-"}</span>
      <span style={{textAlign:"center",fontSize:13,color:"#E2E8F0"}}>{tm.l??"-"}</span>
      <span style={{textAlign:"right",fontSize:13,fontWeight:700,color:"#E2E8F0"}}>{tm.pct??"-"}</span>
    </div>
  );

  // KBO: 전체 순위
  if (!hasDivs) {
    return <div>{note}{header}{teams.map((tm,i)=>renderTeam(tm,i+1))}</div>;
  }

  // NPB: 센트럴/퍼시픽
  if (!hasLeague) {
    const divMap = {};
    teams.forEach(tm=>{ const k=tm.div[lang]; if(!divMap[k])divMap[k]=[]; divMap[k].push(tm); });
    return (
      <div>{note}{header}
        {Object.entries(divMap).map(([dn,dt])=>(
          <div key={dn} style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:lc,padding:"6px 4px 8px",letterSpacing:1}}>▸ {dn}</div>
            {dt.map((tm,i)=>renderTeam(tm,i+1))}
          </div>
        ))}
      </div>
    );
  }

  // MLB: 아메리칸/내셔널 → 디비전
  const lgMap = {};
  teams.forEach(tm=>{
    const lg=tm.league[lang], dv=tm.div[lang];
    if(!lgMap[lg])lgMap[lg]={};
    if(!lgMap[lg][dv])lgMap[lg][dv]=[];
    lgMap[lg][dv].push(tm);
  });
  return (
    <div>{note}{header}
      {Object.entries(lgMap).map(([lg,divs])=>(
        <div key={lg} style={{marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:800,color:"#fff",background:lc+"33",borderRadius:8,padding:"7px 12px",marginBottom:10,borderLeft:`3px solid ${lc}`}}>{lg}</div>
          {Object.entries(divs).map(([dn,dt])=>(
            <div key={dn} style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:lc,padding:"4px 4px 6px",letterSpacing:1}}>▸ {dn}</div>
              {dt.map((tm,i)=>renderTeam(tm,i+1))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

async function fetchStaff(teamName, leagueId) {
  const prompt = `2026년 현재 ${teamName} (${leagueId}) 팀의 감독 이름과 주장(또는 팀 대표 선수) 이름을 알려줘. JSON으로만 답해: {"mgr":"감독이름","cap":"주장이름"}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-haiku-4-5-20251001",
      max_tokens:80,
      system:`You are a baseball expert. Answer only with valid JSON {"mgr":"...","cap":"..."}, no other text.`,
      messages:[{role:"user",content:prompt}]
    })
  });
  const data = await res.json();
  const text = data.content?.map(c=>c.text||"").join("").trim();
  try { return JSON.parse(text.replace(/```json|```/g,"")); }
  catch { return null; }
}

const staffCache = {};

function TeamsTab({ league, lang, t }) {
  const [page, setPage] = useState(0);
  const [staffMap, setStaffMap] = useState({});
  const [loading, setLoading] = useState(false);
  const PER = 5;
  const teams = [...league.teams_list].sort((a,b) => a.name.localeCompare(b.name, lang));
  const total = Math.ceil(teams.length/PER);
  const paged = teams.slice(page*PER, page*PER+PER);
  const lc = league.color;
  const champCol = league.id==="KBO"?(lang==="ko"?"한국시리즈":lang==="ja"?"韓国シリーズ":"KS")
    :league.id==="NPB"?(lang==="ko"?"재팬시리즈":lang==="ja"?"日本シリーズ":"JS")
    :(lang==="ko"?"월드시리즈":lang==="ja"?"ワールドシリーズ":"WS");

  useEffect(()=>{
    const cacheKey = league.id;
    if (staffCache[cacheKey]) { setStaffMap(staffCache[cacheKey]); return; }
    setLoading(true);
    Promise.all(
      teams.map(tm =>
        fetchStaff(tm.name, league.id)
          .then(r => ({ name: tm.name, result: r || { mgr: tm.mgr, cap: tm.cap } }))
          .catch(() => ({ name: tm.name, result: { mgr: tm.mgr, cap: tm.cap } }))
      )
    ).then(results => {
      const map = {};
      results.forEach(({name, result}) => { map[name] = result; });
      staffCache[cacheKey] = map;
      setStaffMap(map);
      setLoading(false);
    });
  }, [league.id]);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:12,color:"#475569"}}>{league.teamCount}{t.teams.total}</div>
          {loading&&<div style={{fontSize:10,color:lc,animation:"spin 1s linear infinite"}}>⟳ {lang==="ko"?"조회중":lang==="ja"?"取得中":"Loading"}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0} style={{background:page===0?"#1E293B":lc,border:"none",borderRadius:8,color:page===0?"#475569":"#fff",width:28,height:28,cursor:page===0?"default":"pointer",fontSize:16,fontWeight:700}}>‹</button>
          <span style={{fontSize:13,color:"#94A3B8",fontWeight:600}}>{page+1} / {total}</span>
          <button onClick={()=>setPage(p=>Math.min(total-1,p+1))} disabled={page===total-1} style={{background:page===total-1?"#1E293B":lc,border:"none",borderRadius:8,color:page===total-1?"#475569":"#fff",width:28,height:28,cursor:page===total-1?"default":"pointer",fontSize:16,fontWeight:700}}>›</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"28px 1fr 70px 70px 54px",padding:"6px 16px",fontSize:11,color:"#475569",fontWeight:600,marginBottom:4}}>
        <span>#</span>
        <span>{lang==="ko"?"팀명":lang==="ja"?"チーム":"Team"}</span>
        <span style={{textAlign:"center"}}>{lang==="ko"?"감독":lang==="ja"?"監督":"Manager"}</span>
        <span style={{textAlign:"center"}}>{lang==="ko"?"주장":lang==="ja"?"主将":"Captain"}</span>
        <span style={{textAlign:"center",fontSize:10}}>{champCol}</span>
      </div>
      {paged.map((tm,i)=>{
        const staff = staffMap[tm.name] || { mgr: tm.mgr||"...", cap: tm.cap||"..." };
        const isLoaded = !!staffMap[tm.name];
        return (
          <div key={`${league.id}-${tm.name}`} style={{background:"#1E293B",borderRadius:12,padding:"12px 16px",marginBottom:8,display:"grid",gridTemplateColumns:"28px 1fr 70px 70px 54px",alignItems:"center",border:isLoaded?`1px solid ${lc}33`:"1px solid #334155",transition:"border 0.3s"}}>
            <span style={{fontSize:14,fontWeight:800,color:page*PER+i+1<=5?lc:"#475569"}}>{page*PER+i+1}</span>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:"#F1F5F9",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tm.name}</div>
              <div style={{fontSize:11,color:"#475569",marginTop:1}}>📍 {tm.city[lang]}</div>
            </div>
            <div style={{textAlign:"center",minWidth:0}}>
              <div style={{fontSize:11,color:isLoaded?"#E2E8F0":"#64748B",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{loading&&!isLoaded?"⟳":staff.mgr}</div>
            </div>
            <div style={{textAlign:"center",minWidth:0}}>
              <div style={{fontSize:11,color:isLoaded?"#E2E8F0":"#64748B",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{loading&&!isLoaded?"⟳":staff.cap}</div>
            </div>
            <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:tm.champ>0?"#FBBF24":"#334155"}}>{tm.champ??0}</span>
          </div>
        );
      })}
      <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:14}}>
        {Array.from({length:total}).map((_,i)=>(<button key={i} onClick={()=>setPage(i)} style={{width:8,height:8,borderRadius:"50%",border:"none",background:page===i?lc:"#334155",cursor:"pointer",padding:0}}/>))}
      </div>
    </div>
  );
}

export default function App() {
  useGoogleFont();
  const [lang, setLang] = useState("ko");
  const [tab, setTab] = useState("overview");
  const [selected, setSelected] = useState("KBO");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scheduleOffset, setScheduleOffset] = useState(0); // 0=오늘, -1=어제, +1=내일
  const t = I18N[lang], league = LEAGUES[selected];
  const Flag = league.Flag;

  return (
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:"#0F172A",fontFamily:"'Nunito','Noto Sans KR','Noto Sans JP',sans-serif"}}
      onClick={()=>showLangMenu&&setShowLangMenu(false)}>

      {/* 헤더 */}
      <div style={{padding:"20px 20px 14px",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:11,color:"#475569",marginBottom:4}}>⚾ {t.appSubtitle}</div>
          <div style={{fontSize:24,fontWeight:900,color:"#fff",letterSpacing:-1}}>BaseballLive</div>
        </div>
        <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setShowLangMenu(!showLangMenu)} style={{background:"#1E293B",border:"1px solid #334155",borderRadius:10,color:"#fff",padding:"7px 12px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            {LANG_INFO[lang].flag} {LANG_INFO[lang].label} ▾
          </button>
          {showLangMenu&&(
            <div style={{position:"absolute",right:0,top:42,background:"#1E293B",border:"1px solid #334155",borderRadius:10,overflow:"hidden",zIndex:100,minWidth:130}}>
              {Object.entries(LANG_INFO).map(([code,info])=>(
                <button key={code} onClick={()=>{setLang(code);setShowLangMenu(false);}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"10px 14px",border:"none",background:lang===code?"#334155":"transparent",color:lang===code?"#fff":"#94A3B8",fontSize:13,cursor:"pointer",textAlign:"left"}}>
                  {info.flag} {info.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 리그 선택 */}
      <div style={{display:"flex",gap:10,padding:"0 20px 16px"}}>
        {Object.values(LEAGUES).map(l=>(
          <button key={l.id} onClick={()=>{setSelected(l.id);setTab("overview");}} style={{flex:1,padding:"10px 0",borderRadius:12,border:"none",background:selected===l.id?l.color:"#1E293B",color:selected===l.id?"#fff":"#64748B",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:selected===l.id?`0 4px 12px ${l.color}55`:"none",transition:"all 0.15s"}}>
            {l.emoji} {l.id}
          </button>
        ))}
      </div>

      {/* 탭 */}
      <div style={{display:"flex",borderBottom:"1px solid #1E293B",padding:"0 20px"}}>
        {Object.entries(t.tabs).map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px 4px",border:"none",background:"transparent",color:tab===id?"#fff":"#475569",fontSize:13,fontWeight:tab===id?700:400,cursor:"pointer",borderBottom:tab===id?`2px solid ${league.color}`:"2px solid transparent",transition:"all 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div style={{padding:"20px"}}>

        {/* 개요 */}
        {tab==="overview"&&(
          <div style={{background:league.bg,borderRadius:16,padding:"20px",color:"#fff",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:16,right:16,borderRadius:4,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.4)",lineHeight:0}}>
              <Flag/>
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginBottom:6}}>{league.country[lang]} · {league.founded} {t.overview.founded}</div>
            <div style={{fontSize:26,fontWeight:800,marginBottom:4}}>{league.name[lang]}</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginBottom:16}}>{league.fullName[lang]}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[[t.overview.teams,String(league.teamCount)],[t.overview.season,league.season[lang]],[t.overview.champion,league.champion2025[lang]]].map(([k,v])=>(
                <div key={k} style={{background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginBottom:4}}>{k}</div>
                  <div style={{fontSize:13,fontWeight:700,lineHeight:1.3}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 주요 뉴스 */}
        {tab==="overview"&&<NewsSection league={league} lang={lang}/>}

        {/* 광고 슬롯 */}
        {tab==="overview"&&(
          <div style={{marginTop:14,background:"#1E293B",borderRadius:14,height:100,display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed #334155"}}>
            <span style={{fontSize:11,color:"#334155",fontWeight:600,letterSpacing:"1px"}}>ADVERTISEMENT</span>
          </div>
        )}

        {/* 일정 */}
        {tab==="schedule"&&(
          <ScheduleTab league={league} lang={lang} t={t} scheduleOffset={scheduleOffset} setScheduleOffset={setScheduleOffset}/>
        )}

        {tab==="standings"&&<StandingsTab league={league} lang={lang} t={t}/>}
        {tab==="teams"&&<TeamsTab league={league} lang={lang} t={t}/>}
      </div>
    </div>
  );
}
