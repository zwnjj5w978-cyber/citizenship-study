import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PARTS = [
  { id: "p0",  label: "N-400 준비",     emoji: "📋" },
  { id: "p1",  label: "미국 기초",       emoji: "📜" },
  { id: "p2a", label: "의회",            emoji: "🏛" },
  { id: "p2b", label: "대통령",          emoji: "🦅" },
  { id: "p2c", label: "법원·권한",       emoji: "⚖️" },
  { id: "p3",  label: "미네소타",        emoji: "❄️" },
  { id: "p4",  label: "권리·의무",       emoji: "✊" },
  { id: "p5a", label: "독립 시대",       emoji: "🗽" },
  { id: "p5b", label: "1800년대",        emoji: "⚔️" },
  { id: "p5c", label: "현대사",          emoji: "🌐" },
  { id: "p6",  label: "상징·기념일",     emoji: "🚩" },
  { id: "ref", label: "★ 빠른복습",     emoji: "⭐" },
  { id: "plan",label: "학습계획",        emoji: "📅" },
];

const READING_LIST = [
  "Which city is the capital of the United States?",
  "Which state is the largest state in the United States?",
  "Which river is the longest river in the United States?",
  "Who can vote?",
  "Why do you want to become a U.S. citizen?",
  "Who is the father of our country?",
  "What city was the first capital of the United States?",
  "Who was the 16th president of the United States?",
  "What is the supreme law of the land?",
  "What does the Constitution do?",
];

const WRITING_LIST = [
  { en: "Columbus Day is in October.", ko: "콜럼버스 데이는 10월에 있습니다." },
  { en: "Washington is on the dollar bill.", ko: "워싱턴은 달러 지폐에 있습니다." },
  { en: "The flag is red, white and blue.", ko: "국기는 빨강, 하양, 파랑입니다." },
  { en: "Washington is the first president of the United States.", ko: "워싱턴은 미국 최초의 대통령입니다." },
  { en: "We pay taxes.", ko: "우리는 세금을 냅니다." },
  { en: "California has the most people.", ko: "캘리포니아는 인구가 가장 많습니다." },
  { en: "U.S. Citizens can vote.", ko: "미국 시민은 투표할 수 있습니다." },
  { en: "I want to vote.", ko: "저는 투표하고 싶습니다." },
  { en: "Alaska is the largest state.", ko: "알래스카는 가장 큰 주입니다." },
];

const INTERVIEW_QA = [
  { q: "Tell me about yourself.", a: "My name is ___. I was born in Korea and have lived in the U.S. for ___ years. I live in Minnesota.", ko: "이름, 출신국, 거주 기간" },
  { q: "Why do you want to become a U.S. citizen?", a: "I want to become a U.S. citizen so I can vote and have more rights.", ko: "투표권, 더 많은 권리" },
  { q: "Do you understand the questions I ask you?", a: "Yes, I understand.", ko: "네, 이해합니다." },
  { q: "What is your address?", a: "(본인 주소), Minnesota.", ko: "주소를 정확히" },
  { q: "When did you get your permanent resident card?", a: "I got my green card on ___.", ko: "영주권 받은 날짜" },
  { q: "Have you filed your taxes every year?", a: "Yes, I have filed every year.", ko: "네, 매년 신고했습니다." },
  { q: "Have you ever claimed to be a U.S. citizen?", a: "No, I have never claimed to be a U.S. citizen.", ko: "⚠️ 아니요, 그런 적 없습니다." },
  { q: "Have you ever voted in the U.S.?", a: "No, I have not.", ko: "아니요, 투표한 적 없습니다." },
  { q: "모르는 질문이 나올 때", a: "I'm sorry, could you please repeat that?", ko: "다시 말씀해 주시겠어요?" },
];

const OATH_WORDS = [
  { w: "oath", p: "오스", m: "맹세, 서약" },
  { w: "allegiance", p: "얼-리-전스", m: "충성" },
  { w: "renounce", p: "리-나운스", m: "포기하다" },
  { w: "defend", p: "디-펜드", m: "지키다, 수호하다" },
  { w: "obey", p: "오-베이", m: "따르다, 지키다" },
  { w: "obligation", p: "오블-리-게이-션", m: "의무" },
];

const OATH_PROMISES = [
  { en: "Give up loyalty to other countries", ko: "다른 나라에 대한 충성을 포기한다" },
  { en: "Support and defend the U.S. Constitution", ko: "미국 헌법을 지지하고 수호한다" },
  { en: "Obey the laws of the United States", ko: "미국 법을 따른다" },
  { en: "Serve in the military if required", ko: "필요하면 군복무를 한다" },
  { en: "Take this obligation freely", ko: "자발적으로 이 약속을 한다" },
];

const CURRENT_OFFICIALS = [
  { qn: "Q23", label: "미네소타 상원의원", how: 'Google: "Minnesota US senators 2025"', fmt: "One of Minnesota's senators is ___." },
  { qn: "Q29", label: "내 지역구 하원의원", how: 'Google: "who is my representative Minnesota" + 주소', fmt: "My representative is ___." },
  { qn: "Q30★", label: "하원 의장", how: "uscis.gov/citizenship/testupdates", fmt: "The Speaker of the House is ___." },
  { qn: "Q38★", label: "현재 대통령", how: "uscis.gov/citizenship/testupdates", fmt: "The President of the United States is ___." },
  { qn: "Q39★", label: "현재 부통령", how: "uscis.gov/citizenship/testupdates", fmt: "The Vice President is ___." },
  { qn: "Q57", label: "대법원장", how: "uscis.gov/citizenship/testupdates", fmt: "The Chief Justice is ___." },
  { qn: "Q61★", label: "미네소타 주지사", how: 'Google: "Minnesota governor 2025"', fmt: "The governor of Minnesota is ___." },
];

const QUESTIONS = [
  // ── PART 1 ──────────────────────────────────────────────────────────────────
  { id:1, part:"p1", star:false,
    q_en:"What is the form of government of the United States?",
    q_ko:"미국의 정부 형태는?",
    answers:["Republic","Representative democracy"],
    best:"Republic / Representative democracy",
    best_ko:"공화국 / 대표 민주주의",
    explain:"왕이 없는 나라. 국민이 대표를 뽑아 나라를 운영합니다." },

  { id:2, part:"p1", star:true,
    q_en:"What is the supreme law of the land?",
    q_ko:"나라의 최고 법은?",
    answers:["The Constitution","(U.S.) Constitution"],
    best:"The Constitution",
    best_ko:"헌법",
    words:[{w:"supreme",p:"수-프림",m:"최고의"},{w:"Constitution",p:"컨-스티-튜-션",m:"헌법"}],
    tip:"슈프림 피자처럼 '최고'! 최고의 법 = Constitution" },

  { id:3, part:"p1", star:false,
    q_en:"Name one thing the U.S. Constitution does.",
    q_ko:"헌법이 하는 일 한 가지는?",
    answers:["Forms the government","Defines powers of government","Protects the rights of the people"],
    best:"Forms the government / Protects the rights of the people",
    best_ko:"정부를 만든다 / 국민의 권리를 보호한다",
    explain:"헌법은 미국의 '설명서'입니다. 정부가 어떻게 구성되고, 무엇을 할 수 있고, 국민의 권리는 무엇인지 정해놓았습니다." },

  { id:4, part:"p1", star:false,
    q_en:'The U.S. Constitution starts with "We the People." What does that mean?',
    q_ko:'"We the People"은 무슨 뜻인가요?',
    answers:["Self-government","Popular sovereignty","People should govern themselves","Consent of the governed"],
    best:"Self-government / Popular sovereignty",
    best_ko:"자치 / 국민 주권",
    words:[{w:"sovereignty",p:"사브-런-티",m:"주권"},{w:"govern",p:"거-번",m:"다스리다"}],
    explain:"나라의 권력은 왕이 아니라 국민에게서 나온다는 뜻입니다." },

  { id:5, part:"p1", star:false,
    q_en:"How are changes made to the U.S. Constitution?",
    q_ko:"헌법을 어떻게 바꾸나요?",
    answers:["Amendments","The amendment process"],
    best:"Amendments",
    best_ko:"수정안",
    words:[{w:"amendment",p:"어-멘드-먼트",m:"수정안"}] },

  { id:6, part:"p1", star:false,
    q_en:"What does the Bill of Rights protect?",
    q_ko:"권리장전은 무엇을 보호하나요?",
    answers:["(The basic) rights of Americans","Rights of people living in the United States"],
    best:"(The basic) rights of Americans",
    best_ko:"미국인의 기본 권리",
    explain:"헌법에 추가된 처음 10개의 수정안. 언론의 자유, 종교의 자유 등을 보호합니다." },

  { id:7, part:"p1", star:true,
    q_en:"How many amendments does the U.S. Constitution have?",
    q_ko:"헌법에 수정안이 몇 개 있나요?",
    answers:["Twenty-seven (27)"],
    best:"Twenty-seven (27)",
    best_ko:"27개" },

  { id:8, part:"p1", star:false,
    q_en:"Why is the Declaration of Independence important?",
    q_ko:"독립선언서는 왜 중요한가요?",
    answers:["It says America is free from British control","It says all people are created equal","It identifies inherent rights","It identifies individual freedoms"],
    best:"It says all people are created equal",
    best_ko:"모든 사람은 평등하게 태어났다",
    words:[{w:"Declaration",p:"데클러-레이-션",m:"선언"},{w:"independence",p:"인디-펜-던스",m:"독립"},{w:"inherent",p:"인-히어-런트",m:"타고난, 천부적인"}] },

  { id:9, part:"p1", star:false,
    q_en:"What founding document said the American colonies were free from Britain?",
    q_ko:"식민지가 영국에서 자유롭다고 한 문서는?",
    answers:["Declaration of Independence"],
    best:"Declaration of Independence",
    best_ko:"독립선언서",
    words:[{w:"colonies",p:"칼-러-니즈",m:"식민지들"}] },

  { id:10, part:"p1", star:false,
    q_en:"Name two important ideas from the Declaration of Independence and the U.S. Constitution.",
    q_ko:"독립선언서와 헌법의 중요한 두 가지 생각은?",
    answers:["Equality","Liberty","Social contract","Natural rights","Limited government","Self-government"],
    best:"Equality / Liberty",
    best_ko:"평등 / 자유",
    tip:"가장 쉬운 두 개: Equality(평등) + Liberty(자유)" },

  { id:11, part:"p1", star:false,
    q_en:'"Life, Liberty, and the pursuit of Happiness" are in what founding document?',
    q_ko:'"생명, 자유, 행복 추구"는 어느 문서에 있나요?',
    answers:["Declaration of Independence"],
    best:"Declaration of Independence",
    best_ko:"독립선언서",
    tip:"Life, Liberty, Happiness → 독립선언서! 독립선언서에서 가장 유명한 문장." },

  { id:12, part:"p1", star:true,
    q_en:"What is the economic system of the United States?",
    q_ko:"미국의 경제 시스템은?",
    answers:["Capitalism","Free market economy"],
    best:"Capitalism / Free market economy",
    best_ko:"자본주의 / 자유 시장 경제",
    words:[{w:"capitalism",p:"캐-피-털-리-즘",m:"자본주의"}],
    explain:"미국은 정부가 경제를 모두 통제하지 않아요. 기업과 사람들이 자유롭게 사고팔 수 있는 자본주의 경제입니다." },

  { id:13, part:"p1", star:false,
    q_en:"What is the rule of law?",
    q_ko:"법치주의란 무엇인가요?",
    answers:["Everyone must follow the law","Leaders must obey the law","No one is above the law"],
    best:"Everyone must follow the law / No one is above the law",
    best_ko:"모든 사람은 법을 따라야 한다 / 법 위에 사람 없다",
    explain:"대통령도, 부자도, 모든 사람이 법 앞에 평등합니다." },

  { id:14, part:"p1", star:false,
    q_en:"Many documents influenced the U.S. Constitution. Name one.",
    q_ko:"헌법에 영향을 준 문서 하나는?",
    answers:["Declaration of Independence","Articles of Confederation","Federalist Papers","Mayflower Compact","Iroquois Great Law of Peace"],
    best:"Declaration of Independence",
    best_ko:"독립선언서",
    tip:"가장 쉬운 답: Declaration of Independence (이미 알고 있으니까!)" },

  { id:15, part:"p1", star:false,
    q_en:"There are three branches of government. Why?",
    q_ko:"정부에 세 부서가 있는 이유는?",
    answers:["So one part does not become too powerful","Checks and balances","Separation of powers"],
    best:"So one part does not become too powerful",
    best_ko:"한 곳이 너무 강해지지 않도록",
    words:[{w:"branch",p:"브랜-치",m:"부서, 나뭇가지"},{w:"checks and balances",p:"첵스 앤 밸-런-시즈",m:"견제와 균형"}],
    tip:"나무처럼 가지가 여러 개 있어야 쓰러지지 않아요. 정부도 세 부서로 나눠서 서로 감시합니다." },

  // ── PART 2A: Congress ────────────────────────────────────────────────────────
  { id:16, part:"p2a", star:false,
    q_en:"Name the three branches of government.",
    q_ko:"정부의 세 부서는?",
    answers:["Legislative, executive, and judicial","Congress, president, and the courts"],
    best:"Legislative, executive, and judicial",
    best_ko:"입법부, 행정부, 사법부",
    words:[{w:"legislative",p:"레-지슬-러-티브",m:"입법의 (법 만드는)"},{w:"executive",p:"이그-제큐-티브",m:"행정의 (법 실행하는)"},{w:"judicial",p:"주-디-셜",m:"사법의 (법 판단하는)"}],
    tip:"L → E → J: Law 만들기 → Execute(실행) → Judge(판단)" },

  { id:17, part:"p2a", star:false,
    q_en:"The President is in charge of which branch of government?",
    q_ko:"대통령은 어느 부서를 맡나요?",
    answers:["Executive branch"],
    best:"Executive branch",
    best_ko:"행정부" },

  { id:18, part:"p2a", star:false,
    q_en:"What part of the federal government writes laws?",
    q_ko:"연방 정부에서 법을 만드는 곳은?",
    answers:["(U.S.) Congress","Legislative branch"],
    best:"(U.S.) Congress",
    best_ko:"의회" },

  { id:19, part:"p2a", star:false,
    q_en:"What are the two parts of the U.S. Congress?",
    q_ko:"의회의 두 부분은?",
    answers:["Senate and House of Representatives"],
    best:"Senate and House of Representatives",
    best_ko:"상원과 하원",
    words:[{w:"Senate",p:"세-닛",m:"상원 (각 주 2명씩)"},{w:"Representatives",p:"레프리-젠-터-티브즈",m:"하원의원들"}],
    tip:"S = Senate(상원), H = House(하원). SH처럼 두 개!" },

  { id:20, part:"p2a", star:true,
    q_en:"Name one power of the U.S. Congress.",
    q_ko:"의회의 권한 하나는?",
    answers:["Writes laws","Declares war","Makes the federal budget"],
    best:"Writes laws",
    best_ko:"법을 만든다",
    tip:"가장 쉬운 답: 'Writes laws'" },

  { id:21, part:"p2a", star:false,
    q_en:"How many U.S. senators are there?",
    q_ko:"상원의원은 몇 명인가요?",
    answers:["One hundred (100)"],
    best:"One hundred (100)",
    best_ko:"100명",
    explain:"50개 주 × 2명 = 100명" },

  { id:22, part:"p2a", star:false,
    q_en:"How long is a term for a U.S. senator?",
    q_ko:"상원의원의 임기는?",
    answers:["Six (6) years"],
    best:"Six (6) years",
    best_ko:"6년" },

  { id:23, part:"p2a", star:false, special:true,
    q_en:"Who is one of your state's U.S. senators now?",
    q_ko:"지금 우리 주 상원의원 한 명은?",
    answers:["(현재 이름 확인 필요)"],
    best:"One of Minnesota's senators is ___.",
    best_ko:"미네소타 상원의원 이름 — 인터뷰 전 확인 필요",
    explain:'Google에서 "Minnesota US senators 2025"를 검색하세요.' },

  { id:24, part:"p2a", star:false,
    q_en:"How many voting members are in the House of Representatives?",
    q_ko:"하원 투표 의원은 몇 명인가요?",
    answers:["Four hundred thirty-five (435)"],
    best:"Four hundred thirty-five (435)",
    best_ko:"435명" },

  { id:25, part:"p2a", star:false,
    q_en:"How long is a term for a member of the House of Representatives?",
    q_ko:"하원의원의 임기는?",
    answers:["Two (2) years"],
    best:"Two (2) years",
    best_ko:"2년" },

  { id:26, part:"p2a", star:false,
    q_en:"Why do U.S. representatives serve shorter terms than U.S. senators?",
    q_ko:"하원의원이 상원의원보다 임기가 짧은 이유는?",
    answers:["To more closely follow public opinion"],
    best:"To more closely follow public opinion",
    best_ko:"국민의 의견을 더 잘 반영하기 위해" },

  { id:27, part:"p2a", star:false,
    q_en:"How many senators does each state have?",
    q_ko:"각 주에 상원의원이 몇 명인가요?",
    answers:["Two (2)"],
    best:"Two (2)",
    best_ko:"2명" },

  { id:28, part:"p2a", star:false,
    q_en:"Why does each state have two senators?",
    q_ko:"각 주에 상원의원이 2명인 이유는?",
    answers:["Equal representation (for small states)","The Great Compromise"],
    best:"Equal representation (for small states)",
    best_ko:"작은 주도 평등하게 대표되도록" },

  { id:29, part:"p2a", star:false, special:true,
    q_en:"Name your U.S. representative.",
    q_ko:"당신의 하원의원은?",
    answers:["(현재 이름 확인 필요)"],
    best:"My representative is ___.",
    best_ko:"내 지역구 하원의원 이름 — 인터뷰 전 확인 필요",
    explain:'Google에서 "who is my representative Minnesota" + 본인 주소를 검색하세요.' },

  { id:30, part:"p2a", star:true, special:true,
    q_en:"What is the name of the Speaker of the House of Representatives now?",
    q_ko:"현재 하원 의장 이름은?",
    answers:["(현재 이름 확인 필요)"],
    best:"The Speaker of the House is ___.",
    best_ko:"하원 의장 이름 — uscis.gov/citizenship/testupdates 에서 확인" },

  { id:31, part:"p2a", star:false,
    q_en:"Who does a U.S. senator represent?",
    q_ko:"상원의원은 누구를 대표하나요?",
    answers:["Citizens of their state","People of their state"],
    best:"Citizens of their state",
    best_ko:"자기 주의 시민들" },

  { id:32, part:"p2a", star:false,
    q_en:"Who elects U.S. senators?",
    q_ko:"상원의원은 누가 뽑나요?",
    answers:["Citizens from their state"],
    best:"Citizens from their state",
    best_ko:"자기 주의 시민들" },

  { id:33, part:"p2a", star:false,
    q_en:"Who does a member of the House of Representatives represent?",
    q_ko:"하원의원은 누구를 대표하나요?",
    answers:["Citizens in their (congressional) district"],
    best:"Citizens in their (congressional) district",
    best_ko:"자기 지역구의 시민들" },

  { id:34, part:"p2a", star:false,
    q_en:"Who elects members of the House of Representatives?",
    q_ko:"하원의원은 누가 뽑나요?",
    answers:["Citizens from their (congressional) district"],
    best:"Citizens from their (congressional) district",
    best_ko:"자기 지역구의 시민들" },

  { id:35, part:"p2a", star:false,
    q_en:"Some states have more representatives than other states. Why?",
    q_ko:"어떤 주는 하원의원이 더 많은 이유는?",
    answers:["(Because of) the state's population","Because they have more people"],
    best:"(Because of) the state's population",
    best_ko:"그 주의 인구가 더 많기 때문에" },

  // ── PART 2B: President ───────────────────────────────────────────────────────
  { id:36, part:"p2b", star:true,
    q_en:"The President of the United States is elected for how many years?",
    q_ko:"대통령은 몇 년 임기인가요?",
    answers:["Four (4) years"],
    best:"Four (4) years",
    best_ko:"4년" },

  { id:37, part:"p2b", star:false,
    q_en:"The President can serve only two terms. Why?",
    q_ko:"대통령이 두 번만 할 수 있는 이유는?",
    answers:["(Because of) the 22nd Amendment","To keep the president from becoming too powerful"],
    best:"(Because of) the 22nd Amendment",
    best_ko:"22번째 수정안 때문에" },

  { id:38, part:"p2b", star:true, special:true,
    q_en:"What is the name of the President of the United States now?",
    q_ko:"현재 미국 대통령 이름은?",
    answers:["(현재 이름 확인 필요)"],
    best:"The President of the United States is ___.",
    best_ko:"uscis.gov/citizenship/testupdates 에서 확인" },

  { id:39, part:"p2b", star:true, special:true,
    q_en:"What is the name of the Vice President of the United States now?",
    q_ko:"현재 부통령 이름은?",
    answers:["(현재 이름 확인 필요)"],
    best:"The Vice President is ___.",
    best_ko:"uscis.gov/citizenship/testupdates 에서 확인" },

  { id:40, part:"p2b", star:false,
    q_en:"If the president can no longer serve, who becomes president?",
    q_ko:"대통령이 더 이상 일할 수 없으면 누가 대통령이 되나요?",
    answers:["The Vice President"],
    best:"The Vice President",
    best_ko:"부통령" },

  { id:41, part:"p2b", star:false,
    q_en:"Name one power of the president.",
    q_ko:"대통령의 권한 하나는?",
    answers:["Signs bills into law","Vetoes bills","Commander in Chief (of the military)","Appoints federal judges"],
    best:"Signs bills into law",
    best_ko:"법안에 서명한다",
    tip:"가장 쉬운 답: 'Signs bills into law'" },

  { id:42, part:"p2b", star:false,
    q_en:"Who is Commander in Chief of the U.S. military?",
    q_ko:"미군의 총사령관은 누구인가요?",
    answers:["The President"],
    best:"The President",
    best_ko:"대통령" },

  { id:43, part:"p2b", star:false,
    q_en:"Who signs bills to become laws?",
    q_ko:"법안에 서명하는 사람은?",
    answers:["The President"],
    best:"The President",
    best_ko:"대통령" },

  { id:44, part:"p2b", star:true,
    q_en:"Who vetoes bills?",
    q_ko:"법안을 거부할 수 있는 사람은?",
    answers:["The President"],
    best:"The President",
    best_ko:"대통령",
    words:[{w:"veto",p:"비-토",m:"거부권"}] },

  { id:45, part:"p2b", star:false,
    q_en:"Who appoints federal judges?",
    q_ko:"연방 판사를 임명하는 사람은?",
    answers:["The President"],
    best:"The President",
    best_ko:"대통령",
    words:[{w:"appoint",p:"어-포인트",m:"임명하다"},{w:"federal",p:"페-더-럴",m:"연방의"}] },

  { id:46, part:"p2b", star:false,
    q_en:"The executive branch has many parts. Name one.",
    q_ko:"행정부의 구성 요소 하나는?",
    answers:["President","Cabinet","Federal departments and agencies"],
    best:"President / Cabinet",
    best_ko:"대통령 / 내각" },

  { id:47, part:"p2b", star:false,
    q_en:"What does the President's Cabinet do?",
    q_ko:"대통령 내각은 무슨 일을 하나요?",
    answers:["Advises the President"],
    best:"Advises the President",
    best_ko:"대통령에게 조언한다",
    words:[{w:"cabinet",p:"캐-비-닛",m:"내각"},{w:"advise",p:"어드-바이즈",m:"조언하다"}] },

  { id:48, part:"p2b", star:false,
    q_en:"What are two Cabinet-level positions?",
    q_ko:"내각급 직위 두 가지는?",
    answers:["Vice President","Secretary of State","Attorney General","Secretary of Defense"],
    best:"Vice President / Secretary of State",
    best_ko:"부통령 / 국무장관",
    tip:"가장 쉬운 두 개: Vice President + Secretary of State" },

  { id:49, part:"p2b", star:false,
    q_en:"Why is the Electoral College important?",
    q_ko:"선거인단이 왜 중요한가요?",
    answers:["It decides who is elected president","Compromise between popular election and congressional selection"],
    best:"It decides who is elected president",
    best_ko:"누가 대통령이 될지 결정한다",
    words:[{w:"Electoral College",p:"일렉-터-럴 칼-리지",m:"선거인단"}] },

  // ── PART 2C: Courts + Powers ─────────────────────────────────────────────────
  { id:50, part:"p2c", star:false,
    q_en:"What is one part of the judicial branch?",
    q_ko:"사법부의 구성 요소 하나는?",
    answers:["Supreme Court","Federal Courts"],
    best:"Supreme Court",
    best_ko:"대법원" },

  { id:51, part:"p2c", star:false,
    q_en:"What does the judicial branch do?",
    q_ko:"사법부는 무슨 일을 하나요?",
    answers:["Reviews laws","Explains laws","Decides if a law goes against the Constitution"],
    best:"Reviews laws / Decides if a law goes against the Constitution",
    best_ko:"법을 검토한다 / 헌법에 어긋나는지 판단한다" },

  { id:52, part:"p2c", star:true,
    q_en:"What is the highest court in the United States?",
    q_ko:"미국의 최고 법원은?",
    answers:["Supreme Court"],
    best:"Supreme Court",
    best_ko:"대법원",
    tip:"supreme = 최고의 → Supreme Court = 최고 법원!" },

  { id:53, part:"p2c", star:false,
    q_en:"How many seats are on the Supreme Court?",
    q_ko:"대법원 판사는 몇 명인가요?",
    answers:["Nine (9)"],
    best:"Nine (9)",
    best_ko:"9명" },

  { id:54, part:"p2c", star:false,
    q_en:"How many Supreme Court justices are usually needed to decide a case?",
    q_ko:"대법원 판결에 보통 몇 명이 필요한가요?",
    answers:["Five (5)"],
    best:"Five (5)",
    best_ko:"5명",
    words:[{w:"justice",p:"저스-티스",m:"판사 (대법원 판사)"}] },

  { id:55, part:"p2c", star:false,
    q_en:"How long do Supreme Court justices serve?",
    q_ko:"대법원 판사는 얼마나 오래 일하나요?",
    answers:["(For) life","Lifetime appointment"],
    best:"(For) life",
    best_ko:"평생" },

  { id:56, part:"p2c", star:false,
    q_en:"Supreme Court justices serve for life. Why?",
    q_ko:"대법원 판사가 평생 일하는 이유는?",
    answers:["To be independent (of politics)","To limit outside influence"],
    best:"To be independent (of politics)",
    best_ko:"정치로부터 독립하기 위해",
    explain:"판사가 선거로 뽑히면 정치인들 눈치를 봐야 합니다. 평생 임명이면 눈치 없이 공정하게 판결할 수 있어요." },

  { id:57, part:"p2c", star:false, special:true,
    q_en:"Who is the Chief Justice of the United States now?",
    q_ko:"현재 대법원장은 누구인가요?",
    answers:["(현재 이름 확인 필요)"],
    best:"The Chief Justice is ___.",
    best_ko:"uscis.gov/citizenship/testupdates 에서 확인" },

  { id:58, part:"p2c", star:false,
    q_en:"Name one power that is only for the federal government.",
    q_ko:"연방 정부만 가진 권한 하나는?",
    answers:["Print paper money","Declare war","Create an army","Make treaties","Set foreign policy"],
    best:"Print paper money",
    best_ko:"화폐를 인쇄한다",
    tip:"가장 쉬운 답: 'Print paper money'" },

  { id:59, part:"p2c", star:false,
    q_en:"Name one power that is only for the states.",
    q_ko:"주(State)만 가진 권한 하나는?",
    answers:["Provide schooling","Provide protection (police)","Give a driver's license","Approve zoning"],
    best:"Give a driver's license",
    best_ko:"운전면허 발급",
    tip:"가장 쉬운 답: 'Give a driver's license'" },

  { id:60, part:"p2c", star:false,
    q_en:"What is the purpose of the 10th Amendment?",
    q_ko:"10번째 수정안의 목적은?",
    answers:["Powers not given to the federal government belong to the states or to the people"],
    best:"Powers not given to the federal government belong to the states or to the people",
    best_ko:"연방 정부에 주어지지 않은 권한은 주나 국민에게 속한다" },

  // ── PART 3: Minnesota ────────────────────────────────────────────────────────
  { id:61, part:"p3", star:true, special:true,
    q_en:"Who is the governor of your state now?",
    q_ko:"지금 우리 주지사는 누구인가요?",
    answers:["(현재 이름 확인 필요)"],
    best:"The governor of Minnesota is ___.",
    best_ko:"인터뷰 전 확인 필요",
    words:[{w:"governor",p:"거-버-너",m:"주지사"}],
    explain:'Google에서 "Minnesota governor 2025"를 검색하세요.' },

  { id:62, part:"p3", star:false,
    q_en:"What is the capital of your state?",
    q_ko:"우리 주의 수도는 어디인가요?",
    answers:["Saint Paul"],
    best:"Saint Paul",
    best_ko:"세인트 폴",
    tip:"⚠️ Minneapolis가 아닙니다! 미네소타의 수도는 Saint Paul입니다." },

  // ── PART 4: Rights & Duties ──────────────────────────────────────────────────
  { id:63, part:"p4", star:false,
    q_en:"There are four amendments about who can vote. Describe one of them.",
    q_ko:"투표권에 관한 헌법 수정안 하나를 설명하세요.",
    answers:["Citizens 18 and older can vote","You don't have to pay a poll tax to vote","Any citizen can vote (women and men)","A male citizen of any race can vote"],
    best:"Citizens 18 and older can vote",
    best_ko:"18세 이상 시민이 투표할 수 있다",
    tip:"가장 쉬운 답: 'Citizens 18 and older can vote'" },

  { id:64, part:"p4", star:false,
    q_en:"Who can vote in federal elections, run for federal office, and serve on a jury?",
    q_ko:"연방 선거 투표, 공직 출마, 배심원 참여를 할 수 있는 사람은?",
    answers:["Citizens","U.S. citizens"],
    best:"Citizens / U.S. citizens",
    best_ko:"미국 시민",
    words:[{w:"jury",p:"쥬-리",m:"배심원단"}] },

  { id:65, part:"p4", star:false,
    q_en:"What are three rights of everyone living in the United States?",
    q_ko:"미국에 사는 모든 사람의 권리 세 가지는?",
    answers:["Freedom of expression","Freedom of speech","Freedom of assembly","Freedom to petition the government","Freedom of religion","The right to bear arms"],
    best:"Freedom of speech / Freedom of religion / Freedom of assembly",
    best_ko:"언론의 자유 / 종교의 자유 / 집회의 자유",
    tip:"가장 쉬운 세 개: Freedom of speech + Freedom of religion + Freedom of assembly" },

  { id:66, part:"p4", star:true,
    q_en:"What do we show loyalty to when we say the Pledge of Allegiance?",
    q_ko:"Pledge of Allegiance를 말할 때 무엇에 충성을 보이나요?",
    answers:["The United States","The flag"],
    best:"The United States / The flag",
    best_ko:"미국 / 국기",
    words:[{w:"pledge",p:"플레-지",m:"서약"},{w:"allegiance",p:"얼-리-전스",m:"충성"}] },

  { id:67, part:"p4", star:false,
    q_en:"Name two promises that new citizens make in the Oath of Allegiance.",
    q_ko:"새 시민이 충성 서약에서 하는 약속 두 가지는?",
    answers:["Give up loyalty to other countries","Defend the Constitution","Obey the laws of the United States","Serve in the military (if needed)","Be loyal to the United States"],
    best:"Give up loyalty to other countries / Obey the laws",
    best_ko:"다른 나라 충성 포기 / 법 지키기",
    tip:"가장 쉬운 두 개: Give up loyalty to other countries + Obey the laws" },

  { id:68, part:"p4", star:false,
    q_en:"How can people become United States citizens?",
    q_ko:"미국 시민이 되는 방법은?",
    answers:["Be born in the United States","Naturalize","Derive citizenship"],
    best:"Naturalize",
    best_ko:"귀화",
    words:[{w:"naturalize",p:"내-추-럴-라이즈",m:"귀화하다"}] },

  { id:69, part:"p4", star:false,
    q_en:"What are two examples of civic participation in the United States?",
    q_ko:"시민 참여의 두 가지 예는?",
    answers:["Vote","Run for office","Join a political party","Join a civic group","Contact elected officials"],
    best:"Vote / Join a civic group",
    best_ko:"투표 / 시민 단체 참여" },

  { id:70, part:"p4", star:false,
    q_en:"What is one way Americans can serve their country?",
    q_ko:"미국인이 나라에 봉사하는 방법 하나는?",
    answers:["Vote","Pay taxes","Obey the law","Serve in the military","Run for office"],
    best:"Vote / Pay taxes",
    best_ko:"투표 / 세금 내기" },

  { id:71, part:"p4", star:false,
    q_en:"Why is it important to pay federal taxes?",
    q_ko:"연방 세금을 내는 것이 왜 중요한가요?",
    answers:["Required by law","Civic duty","All people pay to fund the federal government"],
    best:"Required by law",
    best_ko:"법으로 요구됨" },

  { id:72, part:"p4", star:false,
    q_en:"It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.",
    q_ko:"18~25세 남성이 선발 서비스에 등록해야 하는 이유 하나는?",
    answers:["Required by law","Civic duty","Makes the draft fair, if needed"],
    best:"Required by law",
    best_ko:"법으로 요구됨",
    words:[{w:"Selective Service",p:"셀-렉-티브 서-비스",m:"군 징병 등록 시스템"},{w:"draft",p:"드래-프트",m:"징병"}] },

  // ── PART 5A: Colonial & Independence ─────────────────────────────────────────
  { id:73, part:"p5a", star:false,
    q_en:"The colonists came to America for many reasons. Name one.",
    q_ko:"식민지 개척자들이 미국에 온 이유 하나는?",
    answers:["Freedom","Religious freedom","Economic opportunity","Escape persecution"],
    best:"Religious freedom / Freedom",
    best_ko:"종교의 자유 / 자유",
    words:[{w:"colonists",p:"칼-러-니스츠",m:"식민지 개척자들"},{w:"persecution",p:"퍼-시-큐-션",m:"박해"}] },

  { id:74, part:"p5a", star:true,
    q_en:"Who lived in America before the Europeans arrived?",
    q_ko:"유럽인이 오기 전 미국에 살던 사람은?",
    answers:["American Indians","Native Americans"],
    best:"American Indians / Native Americans",
    best_ko:"아메리카 인디언 / 원주민" },

  { id:75, part:"p5a", star:false,
    q_en:"What group of people was taken and sold as slaves?",
    q_ko:"노예로 팔린 사람들은 어느 집단인가요?",
    answers:["Africans","People from Africa"],
    best:"Africans / People from Africa",
    best_ko:"아프리카인" },

  { id:76, part:"p5a", star:false,
    q_en:"What war did the Americans fight to win independence from Britain?",
    q_ko:"미국이 영국에서 독립하기 위해 싸운 전쟁은?",
    answers:["American Revolution","The (American) Revolutionary War","War for (American) Independence"],
    best:"American Revolution",
    best_ko:"미국 독립 혁명" },

  { id:77, part:"p5a", star:false,
    q_en:"Name one reason why the Americans declared independence from Britain.",
    q_ko:"미국이 영국에서 독립을 선언한 이유 하나는?",
    answers:["High taxes","Taxation without representation","They did not have self-government","British soldiers stayed in Americans' houses"],
    best:"Taxation without representation",
    best_ko:"대표 없는 과세",
    tip:"유명한 구호: 'No taxation without representation' — 대표 없이 세금 없다!" },

  { id:78, part:"p5a", star:true,
    q_en:"Who wrote the Declaration of Independence?",
    q_ko:"독립선언서를 쓴 사람은?",
    answers:["(Thomas) Jefferson"],
    best:"Thomas Jefferson",
    best_ko:"토마스 제퍼슨",
    tip:"나중에 미국 3번째 대통령이 됨. J = Jefferson이 썼어요!" },

  { id:79, part:"p5a", star:false,
    q_en:"When was the Declaration of Independence adopted?",
    q_ko:"독립선언서가 채택된 날은?",
    answers:["July 4, 1776"],
    best:"July 4, 1776",
    best_ko:"1776년 7월 4일",
    tip:"Independence Day = 7월 4일 = 미국 생일!" },

  { id:80, part:"p5a", star:false,
    q_en:"The American Revolution had many important events. Name one.",
    q_ko:"미국 독립 혁명의 중요한 사건 하나는?",
    answers:["Battle of Bunker Hill","Declaration of Independence","Battle of Saratoga","Valley Forge","Battle of Yorktown"],
    best:"Declaration of Independence",
    best_ko:"독립선언서",
    tip:"가장 쉬운 답: 'Declaration of Independence'" },

  { id:81, part:"p5a", star:false,
    q_en:"There were 13 original states. Name five.",
    q_ko:"처음 13개 주 중 다섯 개는?",
    answers:["New Hampshire","Massachusetts","Rhode Island","Connecticut","New York","New Jersey","Pennsylvania","Delaware","Maryland","Virginia","North Carolina","South Carolina","Georgia"],
    best:"New York, Virginia, Pennsylvania, Massachusetts, Georgia",
    best_ko:"뉴욕, 버지니아, 펜실베이니아, 매사추세츠, 조지아",
    tip:"가장 기억하기 쉬운 5개: New York + Virginia + Pennsylvania + Massachusetts + Georgia" },

  { id:82, part:"p5a", star:false,
    q_en:"What founding document was written in 1787?",
    q_ko:"1787년에 쓰여진 건국 문서는?",
    answers:["(U.S.) Constitution"],
    best:"(U.S.) Constitution",
    best_ko:"헌법" },

  { id:83, part:"p5a", star:false,
    q_en:"The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    q_ko:"연방주의자 논문 작가 한 명은?",
    answers:["(James) Madison","(Alexander) Hamilton","(John) Jay","Publius"],
    best:"(Alexander) Hamilton",
    best_ko:"알렉산더 해밀턴",
    tip:"뮤지컬 '해밀턴'의 주인공! Hamilton이 썼어요." },

  { id:84, part:"p5a", star:false,
    q_en:"Why were the Federalist Papers important?",
    q_ko:"연방주의자 논문이 왜 중요한가요?",
    answers:["They helped people understand the Constitution","They supported passing the Constitution"],
    best:"They helped people understand the Constitution",
    best_ko:"사람들이 헌법을 이해하도록 도왔다" },

  { id:85, part:"p5a", star:false,
    q_en:"Benjamin Franklin is famous for many things. Name one.",
    q_ko:"벤저민 프랭클린이 유명한 이유 하나는?",
    answers:["Founded the first free public libraries","First Postmaster General","Helped write the Declaration of Independence","Inventor","U.S. diplomat"],
    best:"Inventor / Helped write the Declaration of Independence",
    best_ko:"발명가 / 독립선언서 작성 참여",
    tip:"100달러 지폐에 나오는 사람! 발명가, 외교관, 독립선언서 작성자." },

  { id:86, part:"p5a", star:true,
    q_en:"George Washington is famous for many things. Name one.",
    q_ko:"조지 워싱턴이 유명한 이유 하나는?",
    answers:['"Father of Our Country"',"First president of the United States","General of the Continental Army"],
    best:"First president of the United States",
    best_ko:"미국 최초의 대통령",
    tip:"1달러 지폐에 나오는 사람! 최초의 대통령, 우리나라의 아버지." },

  { id:87, part:"p5a", star:false,
    q_en:"Thomas Jefferson is famous for many things. Name one.",
    q_ko:"토마스 제퍼슨이 유명한 이유 하나는?",
    answers:["Writer of the Declaration of Independence","Third president of the United States","Doubled the size of the United States (Louisiana Purchase)"],
    best:"Writer of the Declaration of Independence",
    best_ko:"독립선언서 작성자" },

  { id:88, part:"p5a", star:false,
    q_en:"James Madison is famous for many things. Name one.",
    q_ko:"제임스 매디슨이 유명한 이유 하나는?",
    answers:['"Father of the Constitution"',"Fourth president of the United States","One of the writers of the Federalist Papers"],
    best:'"Father of the Constitution" / Fourth president',
    best_ko:"헌법의 아버지 / 4번째 대통령",
    tip:"Washington=1번째, Adams=2번째, Jefferson=3번째, Madison=4번째" },

  { id:89, part:"p5a", star:false,
    q_en:"Alexander Hamilton is famous for many things. Name one.",
    q_ko:"알렉산더 해밀턴이 유명한 이유 하나는?",
    answers:["First Secretary of the Treasury","One of the writers of the Federalist Papers","Helped establish the First Bank of the United States"],
    best:"First Secretary of the Treasury",
    best_ko:"초대 재무장관",
    tip:"10달러 지폐에 나오는 사람!" },

  // ── PART 5B: 1800s ───────────────────────────────────────────────────────────
  { id:90, part:"p5b", star:false,
    q_en:"What territory did the United States buy from France in 1803?",
    q_ko:"1803년에 프랑스에서 구입한 땅은?",
    answers:["Louisiana Territory","Louisiana"],
    best:"Louisiana Territory",
    best_ko:"루이지애나 영토",
    explain:"루이지애나 매입 — 제퍼슨 대통령이 프랑스에서 땅을 사서 미국 영토를 두 배로 늘렸습니다." },

  { id:91, part:"p5b", star:false,
    q_en:"Name one war fought by the United States in the 1800s.",
    q_ko:"1800년대 미국이 싸운 전쟁 하나는?",
    answers:["War of 1812","Mexican-American War","Civil War","Spanish-American War"],
    best:"Civil War",
    best_ko:"남북전쟁",
    tip:"가장 쉬운 답: 'Civil War'" },

  { id:92, part:"p5b", star:false,
    q_en:"Name the U.S. war between the North and the South.",
    q_ko:"북부와 남부 사이의 전쟁 이름은?",
    answers:["The Civil War"],
    best:"The Civil War",
    best_ko:"남북전쟁",
    words:[{w:"civil war",p:"시-빌 워",m:"내전, 같은 나라 안에서의 전쟁"}] },

  { id:93, part:"p5b", star:false,
    q_en:"The Civil War had many important events. Name one.",
    q_ko:"남북전쟁의 중요한 사건 하나는?",
    answers:["Emancipation Proclamation","Battle of Gettysburg","Lincoln was assassinated","Battle of Fort Sumter"],
    best:"Emancipation Proclamation",
    best_ko:"노예 해방 선언",
    words:[{w:"emancipation",p:"이-맨-시-페이-션",m:"해방"},{w:"proclamation",p:"프로클러-메이-션",m:"선언"}],
    tip:"가장 유명한 것: 'Emancipation Proclamation' — 노예 해방 선언!" },

  { id:94, part:"p5b", star:true,
    q_en:"Abraham Lincoln is famous for many things. Name one.",
    q_ko:"에이브러햄 링컨이 유명한 이유 하나는?",
    answers:["Freed the slaves (Emancipation Proclamation)","Saved the Union","Led the United States during the Civil War","16th president"],
    best:"Freed the slaves / 16th president",
    best_ko:"노예를 해방했다 / 16번째 대통령",
    tip:"5달러 지폐에 나오는 사람! 노예 해방, 16번째 대통령." },

  { id:95, part:"p5b", star:false,
    q_en:"What did the Emancipation Proclamation do?",
    q_ko:"해방 선언은 무엇을 했나요?",
    answers:["Freed the slaves","Freed slaves in the Confederacy"],
    best:"Freed the slaves",
    best_ko:"노예를 해방했다" },

  { id:96, part:"p5b", star:false,
    q_en:"What U.S. war ended slavery?",
    q_ko:"어떤 전쟁이 노예제를 끝냈나요?",
    answers:["The Civil War"],
    best:"The Civil War",
    best_ko:"남북전쟁" },

  { id:97, part:"p5b", star:false,
    q_en:"What amendment says all persons born or naturalized in the U.S. are U.S. citizens?",
    q_ko:"미국 출생 또는 귀화한 사람이 시민이라고 하는 수정안은?",
    answers:["14th Amendment"],
    best:"14th Amendment",
    best_ko:"14번째 수정안" },

  { id:98, part:"p5b", star:false,
    q_en:"When did all men get the right to vote?",
    q_ko:"모든 남성이 투표권을 얻은 때는?",
    answers:["After the Civil War","During Reconstruction","15th Amendment","1870"],
    best:"After the Civil War / 15th Amendment / 1870",
    best_ko:"남북전쟁 후 / 15번째 수정안 / 1870년" },

  { id:99, part:"p5b", star:false,
    q_en:"Name one leader of the women's rights movement in the 1800s.",
    q_ko:"1800년대 여성 권리 운동의 지도자 한 명은?",
    answers:["Susan B. Anthony","Elizabeth Cady Stanton","Sojourner Truth","Harriet Tubman","Lucretia Mott","Lucy Stone"],
    best:"Susan B. Anthony",
    best_ko:"수전 B. 앤서니",
    tip:"가장 유명한 두 명: Susan B. Anthony + Harriet Tubman" },

  // ── PART 5C: Modern History ──────────────────────────────────────────────────
  { id:100, part:"p5c", star:false,
    q_en:"Name one war fought by the United States in the 1900s.",
    q_ko:"1900년대 미국이 싸운 전쟁 하나는?",
    answers:["World War I","World War II","Korean War","Vietnam War","(Persian) Gulf War"],
    best:"Korean War",
    best_ko:"한국전쟁",
    tip:"한국인이라면 Korean War 쉽게 기억!" },

  { id:101, part:"p5c", star:false,
    q_en:"Why did the United States enter World War I?",
    q_ko:"미국이 1차 세계대전에 참전한 이유는?",
    answers:["Because Germany attacked U.S. ships","To support the Allied Powers"],
    best:"Because Germany attacked U.S. ships",
    best_ko:"독일이 미국 배를 공격했기 때문에" },

  { id:102, part:"p5c", star:false,
    q_en:"When did all women get the right to vote?",
    q_ko:"모든 여성이 투표권을 얻은 때는?",
    answers:["1920","After World War I","(With the) 19th Amendment"],
    best:"1920 / 19th Amendment",
    best_ko:"1920년 / 19번째 수정안",
    tip:"19th Amendment → 1920년. 19-20으로 기억!" },

  { id:103, part:"p5c", star:false,
    q_en:"What was the Great Depression?",
    q_ko:"대공황이란 무엇인가요?",
    answers:["Longest economic recession in modern history"],
    best:"Longest economic recession in modern history",
    best_ko:"현대 역사에서 가장 긴 경제 침체",
    words:[{w:"depression",p:"디-프레-션",m:"공황, 불경기"}] },

  { id:104, part:"p5c", star:false,
    q_en:"When did the Great Depression start?",
    q_ko:"대공황은 언제 시작되었나요?",
    answers:["The Great Crash (1929)","Stock market crash of 1929"],
    best:"Stock market crash of 1929",
    best_ko:"1929년 주식시장 붕괴" },

  { id:105, part:"p5c", star:false,
    q_en:"Who was president during the Great Depression and World War II?",
    q_ko:"대공황과 2차 세계대전 당시 대통령은?",
    answers:["(Franklin) Roosevelt"],
    best:"(Franklin) Roosevelt",
    best_ko:"프랭클린 루즈벨트" },

  { id:106, part:"p5c", star:false,
    q_en:"Why did the United States enter World War II?",
    q_ko:"미국이 2차 세계대전에 참전한 이유는?",
    answers:["(Bombing of) Pearl Harbor","Japanese attacked Pearl Harbor"],
    best:"(Bombing of) Pearl Harbor",
    best_ko:"진주만 폭격",
    words:[{w:"Pearl Harbor",p:"펄 하-버",m:"진주만 (하와이 미군 기지)"}] },

  { id:107, part:"p5c", star:false,
    q_en:"Dwight Eisenhower is famous for many things. Name one.",
    q_ko:"드와이트 아이젠하워가 유명한 이유 하나는?",
    answers:["General during World War II","34th president of the United States"],
    best:"General during World War II / 34th president",
    best_ko:"2차 세계대전 장군 / 34번째 대통령" },

  { id:108, part:"p5c", star:false,
    q_en:"Who was the United States' main rival during the Cold War?",
    q_ko:"냉전 시대 미국의 주요 적수는?",
    answers:["Soviet Union","USSR","Russia"],
    best:"Soviet Union / USSR",
    best_ko:"소련",
    words:[{w:"Cold War",p:"콜드 워",m:"냉전 (1947~1991)"}] },

  { id:109, part:"p5c", star:false,
    q_en:"During the Cold War, what was one main concern of the United States?",
    q_ko:"냉전 중 미국의 주요 걱정 하나는?",
    answers:["Communism","Nuclear war"],
    best:"Communism",
    best_ko:"공산주의",
    words:[{w:"communism",p:"커-뮤-니-즘",m:"공산주의"},{w:"nuclear",p:"뉴-클리어",m:"핵의"}] },

  { id:110, part:"p5c", star:false,
    q_en:"Why did the United States enter the Korean War?",
    q_ko:"미국이 한국전쟁에 참전한 이유는?",
    answers:["To stop the spread of communism"],
    best:"To stop the spread of communism",
    best_ko:"공산주의의 확산을 막기 위해",
    tip:"Q110 + Q111 답이 완전히 같습니다: 'To stop the spread of communism'" },

  { id:111, part:"p5c", star:false,
    q_en:"Why did the United States enter the Vietnam War?",
    q_ko:"미국이 베트남 전쟁에 참전한 이유는?",
    answers:["To stop the spread of communism"],
    best:"To stop the spread of communism",
    best_ko:"공산주의의 확산을 막기 위해",
    tip:"Q110 + Q111 답이 완전히 같습니다: 'To stop the spread of communism'" },

  { id:112, part:"p5c", star:false,
    q_en:"What did the civil rights movement do?",
    q_ko:"민권 운동은 무엇을 했나요?",
    answers:["Fought to end racial discrimination"],
    best:"Fought to end racial discrimination",
    best_ko:"인종 차별을 끝내기 위해 싸웠다",
    words:[{w:"civil rights",p:"시-빌 라이-츠",m:"민권"},{w:"racial discrimination",p:"레이-셜 디스크리-미-네이-션",m:"인종 차별"}] },

  { id:113, part:"p5c", star:true,
    q_en:"Martin Luther King, Jr. is famous for many things. Name one.",
    q_ko:"마틴 루터 킹 주니어가 유명한 이유 하나는?",
    answers:["Fought for civil rights","Worked for equality for all Americans"],
    best:"Fought for civil rights",
    best_ko:"민권을 위해 싸웠다",
    tip:"1월 셋째 월요일 = Martin Luther King, Jr. Day (국경일!)" },

  { id:114, part:"p5c", star:false,
    q_en:"Why did the United States enter the Persian Gulf War?",
    q_ko:"미국이 걸프전에 참전한 이유는?",
    answers:["To force the Iraqi military from Kuwait"],
    best:"To force the Iraqi military from Kuwait",
    best_ko:"이라크 군을 쿠웨이트에서 쫓아내기 위해" },

  { id:115, part:"p5c", star:true,
    q_en:"What major event happened on September 11, 2001 in the United States?",
    q_ko:"2001년 9월 11일 미국에서 일어난 주요 사건은?",
    answers:["Terrorists attacked the United States"],
    best:"Terrorists attacked the United States",
    best_ko:"테러리스트들이 미국을 공격했다",
    words:[{w:"terrorists",p:"테-러-리스츠",m:"테러리스트들"}] },

  { id:116, part:"p5c", star:false,
    q_en:"Name one U.S. military conflict after the September 11, 2001 attacks.",
    q_ko:"9/11 이후 미국의 군사 충돌 하나는?",
    answers:["(Global) War on Terror","War in Afghanistan","War in Iraq"],
    best:"War in Afghanistan",
    best_ko:"아프가니스탄 전쟁" },

  { id:117, part:"p5c", star:false,
    q_en:"Name one American Indian tribe in the United States.",
    q_ko:"미국 아메리카 인디언 부족 하나는?",
    answers:["Cherokee","Navajo","Sioux","Lakota","Apache","Ojibwe","Chippewa","Mohawk"],
    best:"Cherokee / Navajo",
    best_ko:"체로키 / 나바호",
    tip:"미네소타 관련 부족: Ojibwe (Chippewa) 또는 Lakota (Sioux)" },

  { id:118, part:"p5c", star:false,
    q_en:"Name one example of an American innovation.",
    q_ko:"미국의 혁신적 발명 하나는?",
    answers:["Light bulb","Automobile","Skyscrapers","Airplane","Assembly line","Landing on the moon"],
    best:"Airplane / Light bulb",
    best_ko:"비행기 / 전구",
    tip:"Airplane = 라이트 형제, Light bulb = 에디슨" },

  // ── PART 6: Symbols & Holidays ───────────────────────────────────────────────
  { id:119, part:"p6", star:false,
    q_en:"What is the capital of the United States?",
    q_ko:"미국의 수도는?",
    answers:["Washington, D.C."],
    best:"Washington, D.C.",
    best_ko:"워싱턴 D.C.",
    tip:"D.C. = District of Columbia. 어떤 주에도 속하지 않는 특별 구역!" },

  { id:120, part:"p6", star:false,
    q_en:"Where is the Statue of Liberty?",
    q_ko:"자유의 여신상은 어디에 있나요?",
    answers:["New York (Harbor)","Liberty Island"],
    best:"New York (Harbor) / Liberty Island",
    best_ko:"뉴욕 항구 / 리버티 섬" },

  { id:121, part:"p6", star:true,
    q_en:"Why does the flag have 13 stripes?",
    q_ko:"국기에 줄이 13개인 이유는?",
    answers:["Because there were 13 original colonies","The stripes represent the original colonies"],
    best:"Because there were 13 original colonies",
    best_ko:"처음 13개 식민지가 있었기 때문에",
    words:[{w:"stripes",p:"스트라이-프스",m:"줄"},{w:"colonies",p:"칼-러-니즈",m:"식민지들"}] },

  { id:122, part:"p6", star:false,
    q_en:"Why does the flag have 50 stars?",
    q_ko:"국기에 별이 50개인 이유는?",
    answers:["One star for each state","Each star represents a state","There are 50 states"],
    best:"One star for each state / There are 50 states",
    best_ko:"각 주마다 별 하나 / 50개 주",
    explain:"50개 주 → 별 50개 | 처음 13개 식민지 → 줄 13개" },

  { id:123, part:"p6", star:false,
    q_en:"What is the name of the national anthem?",
    q_ko:"국가(나라 노래)의 이름은?",
    answers:["The Star-Spangled Banner"],
    best:"The Star-Spangled Banner",
    best_ko:"별이 빛나는 깃발",
    words:[{w:"anthem",p:"앤-섬",m:"국가 (나라 노래)"}] },

  { id:124, part:"p6", star:false,
    q_en:'The Nation\'s first motto was "E Pluribus Unum." What does that mean?',
    q_ko:'국가의 첫 번째 모토 "E Pluribus Unum"의 뜻은?',
    answers:["Out of many, one","We all become one"],
    best:"Out of many, one",
    best_ko:"여럿에서 하나로",
    tip:"'에 플루리버스 우넘' (라틴어) — 여러 주와 사람들이 모여 하나의 나라가 된다!" },

  { id:125, part:"p6", star:false,
    q_en:"What is Independence Day?",
    q_ko:"독립기념일이란?",
    answers:["A holiday to celebrate U.S. independence (from Britain)","The country's birthday"],
    best:"The country's birthday / A holiday to celebrate U.S. independence",
    best_ko:"나라의 생일 / 영국에서 독립을 기념하는 날",
    tip:"7월 4일 = Independence Day = 미국 생일! 불꽃놀이 하는 날!" },

  { id:126, part:"p6", star:true,
    q_en:"Name three national U.S. holidays.",
    q_ko:"미국 국경일 세 가지는?",
    answers:["New Year's Day","Martin Luther King Jr. Day","Presidents Day","Memorial Day","Independence Day","Labor Day","Veterans Day","Thanksgiving Day","Christmas Day"],
    best:"Thanksgiving Day / Independence Day / Christmas Day",
    best_ko:"추수감사절 / 독립기념일 / 크리스마스",
    tip:"가장 쉬운 세 개: Thanksgiving Day + Independence Day + Christmas Day" },

  { id:127, part:"p6", star:false,
    q_en:"What is Memorial Day?",
    q_ko:"현충일이란?",
    answers:["A holiday to honor soldiers who died in military service"],
    best:"A holiday to honor soldiers who died in military service",
    best_ko:"군 복무 중 사망한 군인들을 기리는 날",
    words:[{w:"memorial",p:"메-모-리-얼",m:"추모의"},{w:"honor",p:"아-너",m:"기리다"}],
    tip:"Memorial = Mourning(애도) → 돌아가신 분들. 5월 마지막 월요일." },

  { id:128, part:"p6", star:false,
    q_en:"What is Veterans Day?",
    q_ko:"재향군인의 날이란?",
    answers:["A holiday to honor people in the (U.S.) military","A holiday to honor people who have served (in the U.S. military)"],
    best:"A holiday to honor people who have served in the U.S. military",
    best_ko:"군 복무를 한 모든 군인을 기리는 날 (살아있는 분 포함)",
    tip:"Veterans Day = 살아있는 군인 포함 모든 군인. 11월 11일. Memorial Day(사망)와 구별!" },
];

const STAR_REVIEW = QUESTIONS.filter(q => q.star && !q.special);

const STUDY_PLAN = [
  { day:"1일", content:"PART 0: 읽기/쓰기 연습", review:"—" },
  { day:"2일", content:"PART 0: 인터뷰 대화, 충성 서약", review:"1일차" },
  { day:"3일", content:"PART 1: Q1~8 (미국 기초)", review:"1~2일차" },
  { day:"4일", content:"PART 1: Q9~15", review:"3일차" },
  { day:"5일", content:"PART 2: Q16~35 (의회)", review:"3~4일차" },
  { day:"6일", content:"PART 2: Q36~49 (대통령)", review:"5일차" },
  { day:"7일", content:"PART 2: Q50~60 (법원·권한)", review:"5~6일차" },
  { day:"8일", content:"🔄 복습일: PART 0~2 전체", review:"전체" },
  { day:"9일", content:"PART 3~4: Q61~72 (미네소타·권리)", review:"8일차" },
  { day:"10일", content:"PART 5A: Q73~89 (독립 시대)", review:"9일차" },
  { day:"11일", content:"PART 5B: Q90~99 (1800년대)", review:"10일차" },
  { day:"12일", content:"PART 5C: Q100~118 (현대사)", review:"10~11일차" },
  { day:"13일", content:"PART 6: Q119~128 (상징·기념일)", review:"11~12일차" },
  { day:"14일", content:"⭐ 빠른 복습표 전체 + 모의 인터뷰", review:"전체" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#F4F1EB",
  card: "#FFFEF9",
  navy: "#1B2B4B",
  navyLight: "#2D4270",
  gold: "#C8922A",
  goldLight: "#FDF3DC",
  green: "#3A6B4A",
  greenLight: "#EAF4ED",
  red: "#B03A2E",
  redLight: "#FDF0EE",
  border: "#E2DECE",
  muted: "#7A7469",
  text: "#2C2820",
};

const s = {
  app: { background: C.bg, minHeight: "100vh", fontFamily: "'Georgia', serif", color: C.text },
  header: { background: C.navy, color: "#fff", padding: "16px 20px", textAlign: "center" },
  headerTitle: { margin: 0, fontSize: "20px", fontWeight: "bold", letterSpacing: "0.02em" },
  headerSub: { margin: "4px 0 0", fontSize: "12px", opacity: 0.7, fontFamily: "sans-serif" },
  navScroll: { overflowX: "auto", background: C.navyLight, display: "flex", gap: "2px", padding: "6px 8px", WebkitOverflowScrolling: "touch" },
  navBtn: (active) => ({
    flexShrink: 0, border: "none", cursor: "pointer", borderRadius: "8px",
    padding: "6px 12px", fontSize: "11px", fontWeight: "bold", fontFamily: "sans-serif",
    background: active ? C.gold : "rgba(255,255,255,0.15)",
    color: active ? "#fff" : "rgba(255,255,255,0.85)",
    transition: "all 0.15s",
  }),
  body: { padding: "14px", maxWidth: "600px", margin: "0 auto" },
  card: {
    background: C.card, border: `1.5px solid ${C.border}`,
    borderRadius: "12px", marginBottom: "10px", overflow: "hidden",
  },
  cardHeader: (open) => ({
    padding: "12px 14px", cursor: "pointer", display: "flex",
    alignItems: "flex-start", gap: "10px",
    background: open ? "#F8F6F0" : C.card,
  }),
  num: (star, special) => ({
    flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", fontWeight: "bold", fontFamily: "sans-serif", marginTop: "1px",
    background: special ? C.red : star ? C.gold : C.navy,
    color: "#fff",
  }),
  qText: { flex: 1 },
  qEn: { margin: 0, fontSize: "14px", fontWeight: "bold", color: C.navy, lineHeight: 1.4 },
  qKo: { margin: "3px 0 0", fontSize: "12px", color: C.muted, fontFamily: "sans-serif" },
  chevron: { color: C.muted, fontSize: "14px", marginTop: "5px", flexShrink: 0 },
  body2: { padding: "0 14px 14px" },
  ansBox: {
    background: C.greenLight, border: `1px solid #C3DFC9`,
    borderRadius: "8px", padding: "10px 14px", marginBottom: "10px",
  },
  ansLabel: { margin: 0, fontSize: "10px", color: C.green, fontWeight: "bold", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" },
  ansBest: { margin: "4px 0 2px", fontSize: "16px", fontWeight: "bold", color: C.green, fontFamily: "Georgia, serif" },
  ansKo: { margin: 0, fontSize: "13px", color: C.green, fontFamily: "sans-serif" },
  specialBox: {
    background: C.redLight, border: `1px solid #F0C4BF`,
    borderRadius: "8px", padding: "10px 14px", marginBottom: "10px",
  },
  starBadge: {
    display: "inline-block", background: C.goldLight, color: C.gold,
    fontSize: "10px", fontWeight: "bold", padding: "2px 8px",
    borderRadius: "10px", marginBottom: "6px", fontFamily: "sans-serif",
  },
  toggleBtn: (open) => ({
    width: "100%", background: open ? "#F0EDE4" : "#F8F6F0",
    border: `1px solid ${C.border}`, borderRadius: "8px",
    padding: "8px 12px", cursor: "pointer", fontSize: "12px",
    fontWeight: "bold", color: C.navy, textAlign: "left",
    marginBottom: "6px", fontFamily: "sans-serif",
  }),
  vocabRow: (i) => ({
    display: "flex", gap: "8px", padding: "7px 10px",
    background: i % 2 === 0 ? "#F8F6F0" : "#FFFEF9",
    borderRadius: "6px", marginBottom: "2px", alignItems: "flex-start",
    fontFamily: "sans-serif",
  }),
  vocabWord: { fontWeight: "bold", fontSize: "13px", color: C.navy, minWidth: "110px" },
  vocabPron: { fontSize: "11px", color: C.muted },
  vocabMean: { fontSize: "12px", color: C.text, flex: 1 },
  explainBox: {
    background: "#FFFBF0", border: `1px solid #EDE5C0`,
    borderRadius: "8px", padding: "10px 14px", marginBottom: "6px",
    fontSize: "13px", color: C.text, lineHeight: 1.7, fontFamily: "sans-serif",
  },
  tipBox: {
    background: "#F0F4FF", border: `1px solid #C5D3F5`,
    borderRadius: "8px", padding: "8px 12px",
    fontSize: "12px", color: C.navyLight, lineHeight: 1.6, fontFamily: "sans-serif",
  },
  sectionTitle: {
    fontSize: "16px", fontWeight: "bold", color: C.navy,
    margin: "0 0 12px", fontFamily: "Georgia, serif",
  },
  infoCard: {
    background: C.card, border: `1.5px solid ${C.border}`,
    borderRadius: "12px", padding: "14px", marginBottom: "10px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px", fontFamily: "sans-serif" },
  th: { background: C.navy, color: "#fff", padding: "7px 10px", textAlign: "left", fontSize: "11px" },
  td: (i) => ({ padding: "7px 10px", borderBottom: `1px solid ${C.border}`, verticalAlign: "top", background: i%2===0 ? C.card : "#F8F6F0" }),
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function QuestionCard({ q }) {
  const [open, setOpen] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  return (
    <div style={s.card}>
      <div style={s.cardHeader(open)} onClick={() => setOpen(!open)}>
        <div style={s.num(q.star, q.special)}>{q.id}</div>
        <div style={s.qText}>
          {q.star && <div style={s.starBadge}>★ 핵심</div>}
          {q.special && <div style={{...s.starBadge, background:"#FDF0EE", color:C.red}}>⚠️ 확인 필요</div>}
          <p style={s.qEn}>{q.q_en}</p>
          <p style={s.qKo}>{q.q_ko}</p>
        </div>
        <span style={s.chevron}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={s.body2}>
          {q.special ? (
            <div style={s.specialBox}>
              <p style={s.ansLabel}>⚠️ 인터뷰 전 확인 필요</p>
              <p style={{...s.ansBest, color: C.red}}>{q.best}</p>
              <p style={{...s.ansKo, color: C.red}}>{q.best_ko}</p>
            </div>
          ) : (
            <div style={s.ansBox}>
              <p style={s.ansLabel}>✅ 정답</p>
              <p style={s.ansBest}>{q.best}</p>
              <p style={s.ansKo}>{q.best_ko}</p>
            </div>
          )}

          {q.words && q.words.length > 0 && (
            <>
              <button style={s.toggleBtn(showWords)} onClick={() => setShowWords(!showWords)}>
                📖 핵심 단어 보기 {showWords ? "▲" : "▼"}
              </button>
              {showWords && (
                <div style={{ marginBottom: "8px" }}>
                  {q.words.map((w, i) => (
                    <div key={i} style={s.vocabRow(i)}>
                      <div>
                        <div style={s.vocabWord}>{w.w}</div>
                        <div style={s.vocabPron}>{w.p}</div>
                      </div>
                      <div style={s.vocabMean}>{w.m}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {(q.explain || q.tip) && (
            <>
              <button style={s.toggleBtn(showExplain)} onClick={() => setShowExplain(!showExplain)}>
                💬 설명 & 팁 {showExplain ? "▲" : "▼"}
              </button>
              {showExplain && (
                <div>
                  {q.explain && <div style={s.explainBox}>{q.explain}</div>}
                  {q.tip && <div style={s.tipBox}>💡 {q.tip}</div>}
                </div>
              )}
            </>
          )}

          {!q.explain && !q.tip && !q.words && (
            <div style={{...s.tipBox, marginTop: 0}}>
              {q.answers.length > 1
                ? `✔ 인정되는 답: ${q.answers.slice(0,3).join(" / ")}${q.answers.length > 3 ? " 등" : ""}`
                : "✔ 위 정답 하나만 말하면 됩니다."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Part0View() {
  const [tab, setTab] = useState("read");
  const tabs = [
    { id:"read",  label:"읽기 연습" },
    { id:"write", label:"쓰기 연습" },
    { id:"int",   label:"인터뷰" },
    { id:"oath",  label:"충성 서약" },
    { id:"claim", label:"Claim 설명" },
    { id:"check", label:"확인 필요" },
  ];
  return (
    <div>
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"14px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ border:"none", cursor:"pointer", borderRadius:"20px",
              padding:"6px 14px", fontSize:"12px", fontWeight:"bold", fontFamily:"sans-serif",
              background: tab===t.id ? C.navy : C.border, color: tab===t.id ? "#fff" : C.text }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "read" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>📖 읽기 연습 (Reading Test)</p>
          <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
            면접관이 카드를 보여주면 소리 내어 읽으면 됩니다.
          </p>
          {READING_LIST.map((r, i) => (
            <div key={i} style={{ padding:"9px 12px", background: i%2===0 ? "#F8F6F0" : C.card,
              borderRadius:"6px", marginBottom:"4px", fontSize:"13px", fontFamily:"Georgia, serif" }}>
              {r}
            </div>
          ))}
          <div style={{ marginTop:"14px" }}>
            <p style={{ fontSize:"12px", fontWeight:"bold", color:C.navy, fontFamily:"sans-serif", marginBottom:"6px" }}>핵심 단어 발음</p>
            {[["capital","캐-피-털","수도"],["largest","라-지스트","가장 큰"],["longest","롱-기스트","가장 긴"],
              ["citizen","시-티-즌","시민"],["supreme","수-프림","최고의"],["Constitution","컨-스티-튜-션","헌법"],
              ["president","프레-지-던트","대통령"]].map(([w,p,m],i) => (
              <div key={i} style={s.vocabRow(i)}>
                <div style={s.vocabWord}>{w}</div>
                <div style={s.vocabPron}>{p}</div>
                <div style={s.vocabMean}>{m}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "write" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>✏️ 쓰기 연습 (Writing Test)</p>
          <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
            면접관이 말하는 문장을 듣고 종이에 씁니다. 매일 3문장씩 손으로 써보세요.
          </p>
          <table style={s.table}>
            <thead>
              <tr><th style={s.th}>영어 문장</th><th style={s.th}>한국어 뜻</th></tr>
            </thead>
            <tbody>
              {WRITING_LIST.map((w, i) => (
                <tr key={i}>
                  <td style={{...s.td(i), fontFamily:"Georgia, serif", fontSize:"13px"}}>{w.en}</td>
                  <td style={{...s.td(i), fontFamily:"sans-serif"}}>{w.ko}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "int" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>🗣 인터뷰 대화 연습</p>
          <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
            천천히 · 또박또박 · 짧게 대답 · 정직하게
          </p>
          {INTERVIEW_QA.map((qa, i) => (
            <div key={i} style={{ padding:"10px 12px", background: i%2===0 ? "#F8F6F0" : C.card,
              borderRadius:"8px", marginBottom:"6px" }}>
              <p style={{ margin:"0 0 4px", fontSize:"12px", color:C.muted, fontFamily:"sans-serif" }}>Q: {qa.q}</p>
              <p style={{ margin:"0 0 3px", fontSize:"13px", fontFamily:"Georgia, serif", color:C.navy }}>A: {qa.a}</p>
              <p style={{ margin:0, fontSize:"11px", color:C.green, fontFamily:"sans-serif" }}>{qa.ko}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "oath" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>🤝 Oath of Allegiance (충성 서약)</p>
          <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
            귀화식 당일 큰 소리로 읽는 공식 맹세입니다. 전체를 외울 필요는 없지만 <strong>내용을 이해</strong>해야 합니다.
          </p>
          <p style={{ fontSize:"13px", fontWeight:"bold", color:C.navy, marginBottom:"8px", fontFamily:"sans-serif" }}>시험에 나오는 약속 (Q67)</p>
          {OATH_PROMISES.map((p, i) => (
            <div key={i} style={{ display:"flex", gap:"10px", padding:"8px 10px",
              background: i%2===0 ? "#F8F6F0" : C.card, borderRadius:"6px", marginBottom:"4px" }}>
              <span style={{ color:C.gold, fontWeight:"bold" }}>✓</span>
              <div>
                <p style={{ margin:0, fontSize:"13px", fontFamily:"Georgia, serif" }}>{p.en}</p>
                <p style={{ margin:"2px 0 0", fontSize:"12px", color:C.muted, fontFamily:"sans-serif" }}>{p.ko}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize:"13px", fontWeight:"bold", color:C.navy, margin:"14px 0 8px", fontFamily:"sans-serif" }}>핵심 단어 발음</p>
          {OATH_WORDS.map((w, i) => (
            <div key={i} style={s.vocabRow(i)}>
              <div style={s.vocabWord}>{w.w}</div>
              <div style={s.vocabPron}>{w.p}</div>
              <div style={s.vocabMean}>{w.m}</div>
            </div>
          ))}
          <div style={{ ...s.tipBox, marginTop:"12px" }}>
            💡 핵심만 기억: 다른 나라 충성 포기 + 미국 헌법 지키기 + 법 따르기 + 자발적으로
          </div>
          <div style={{ ...s.explainBox, marginTop:"8px" }}>
            <strong>시험 예상 질문:</strong><br />
            Q: What is the meaning of the Oath of Allegiance?<br />
            A: "The Oath of Allegiance is a promise to be loyal to the United States. You give up loyalty to other countries and promise to obey U.S. laws and defend the Constitution."
          </div>
        </div>
      )}

      {tab === "claim" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>❓ "Claim of U.S. citizen"이란?</p>
          <div style={{ ...s.ansBox, marginBottom:"12px" }}>
            <p style={s.ansLabel}>질문</p>
            <p style={{ ...s.ansBest, fontSize:"14px" }}>Have you ever claimed to be a U.S. citizen?</p>
            <p style={s.ansKo}>미국 시민이라고 주장한 적이 있습니까?</p>
          </div>
          <div style={{ ...s.ansBox }}>
            <p style={s.ansLabel}>✅ 정답 (시민권자가 아니라면)</p>
            <p style={s.ansBest}>"No, I have never claimed to be a U.S. citizen."</p>
            <p style={s.ansKo}>아니요, 저는 한 번도 미국 시민이라고 주장한 적이 없습니다.</p>
          </div>
          <p style={{ fontSize:"13px", fontWeight:"bold", color:C.red, margin:"14px 0 6px", fontFamily:"sans-serif" }}>⚠️ 해당하는 경우의 예</p>
          {["미국 여권 사용","미국 선거에서 투표","서류에 'U.S. citizen'이라고 잘못 표시"].map((e,i) => (
            <div key={i} style={{ padding:"7px 12px", background:"#FDF0EE", borderRadius:"6px",
              marginBottom:"4px", fontSize:"13px", fontFamily:"sans-serif", color:C.red }}>
              • {e}
            </div>
          ))}
          <div style={{ ...s.explainBox, marginTop:"10px", borderColor:"#F0C4BF", background:"#FDF0EE", color:C.red }}>
            거짓으로 시민이라고 주장한 경우 시민권 신청이 거절되거나 영구 금지될 수 있습니다. 반드시 정직하게 답하세요.
          </div>
        </div>
      )}

      {tab === "check" && (
        <div style={s.infoCard}>
          <p style={s.sectionTitle}>⚠️ 인터뷰 전 반드시 확인할 질문들</p>
          <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
            날짜에 따라 답이 바뀝니다. 인터뷰 1주일 전에 최신 이름을 확인하세요.
          </p>
          {CURRENT_OFFICIALS.map((o, i) => (
            <div key={i} style={{ padding:"10px 14px", background: i%2===0 ? "#FDF0EE" : "#F8F6F0",
              borderRadius:"8px", marginBottom:"6px" }}>
              <p style={{ margin:"0 0 3px", fontSize:"11px", color:C.red, fontWeight:"bold", fontFamily:"sans-serif" }}>{o.qn} — {o.label}</p>
              <p style={{ margin:"0 0 3px", fontSize:"13px", fontFamily:"Georgia, serif", color:C.navy }}>"{o.fmt}"</p>
              <p style={{ margin:0, fontSize:"11px", color:C.muted, fontFamily:"sans-serif" }}>🔍 {o.how}</p>
            </div>
          ))}
          <div style={{ ...s.tipBox, marginTop:"8px" }}>
            💡 모르는 경우: "I'm sorry, could you please repeat that?" 또는 "I need to verify the current name." 라고 말할 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
}

function QuickRefView() {
  return (
    <div>
      <div style={s.infoCard}>
        <p style={s.sectionTitle}>⭐ ★ 핵심 문제 빠른 복습</p>
        <p style={{ fontSize:"12px", color:C.muted, fontFamily:"sans-serif", marginBottom:"12px" }}>
          이 문제들을 먼저 외우세요. ⚠️ 표시는 인터뷰 전 현재 이름 확인 필요.
        </p>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>#</th><th style={s.th}>질문</th><th style={s.th}>정답</th></tr>
          </thead>
          <tbody>
            {STAR_REVIEW.map((q, i) => (
              <tr key={q.id}>
                <td style={{...s.td(i), fontWeight:"bold", color:C.gold, fontFamily:"sans-serif"}}>Q{q.id}</td>
                <td style={{...s.td(i), fontFamily:"sans-serif", fontSize:"11px"}}>{q.q_ko}</td>
                <td style={{...s.td(i), fontFamily:"Georgia, serif", fontSize:"12px", color:C.green}}>{q.best}</td>
              </tr>
            ))}
            <tr>
              <td style={{...s.td(0), fontWeight:"bold", color:C.red, fontFamily:"sans-serif"}}>Q30★</td>
              <td style={{...s.td(0), fontFamily:"sans-serif", fontSize:"11px"}}>현재 하원 의장 이름은?</td>
              <td style={{...s.td(0), fontFamily:"sans-serif", fontSize:"11px", color:C.red}}>⚠️ uscis.gov/citizenship/testupdates</td>
            </tr>
            <tr>
              <td style={{...s.td(1), fontWeight:"bold", color:C.red, fontFamily:"sans-serif"}}>Q38★</td>
              <td style={{...s.td(1), fontFamily:"sans-serif", fontSize:"11px"}}>현재 대통령 이름은?</td>
              <td style={{...s.td(1), fontFamily:"sans-serif", fontSize:"11px", color:C.red}}>⚠️ uscis.gov/citizenship/testupdates</td>
            </tr>
            <tr>
              <td style={{...s.td(0), fontWeight:"bold", color:C.red, fontFamily:"sans-serif"}}>Q39★</td>
              <td style={{...s.td(0), fontFamily:"sans-serif", fontSize:"11px"}}>현재 부통령 이름은?</td>
              <td style={{...s.td(0), fontFamily:"sans-serif", fontSize:"11px", color:C.red}}>⚠️ uscis.gov/citizenship/testupdates</td>
            </tr>
            <tr>
              <td style={{...s.td(1), fontWeight:"bold", color:C.red, fontFamily:"sans-serif"}}>Q61★</td>
              <td style={{...s.td(1), fontFamily:"sans-serif", fontSize:"11px"}}>현재 미네소타 주지사는?</td>
              <td style={{...s.td(1), fontFamily:"sans-serif", fontSize:"11px", color:C.red}}>⚠️ Google: "Minnesota governor 2025"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={s.infoCard}>
        <p style={{ fontSize:"13px", fontWeight:"bold", color:C.navy, marginBottom:"8px", fontFamily:"sans-serif" }}>⚠️ Memorial Day vs Veterans Day — 자주 틀리는 문제!</p>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}></th><th style={s.th}>Memorial Day</th><th style={s.th}>Veterans Day</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{...s.td(0), fontWeight:"bold", fontFamily:"sans-serif", fontSize:"11px"}}>날짜</td>
              <td style={s.td(0)}>5월 마지막 월요일</td>
              <td style={s.td(0)}>11월 11일</td>
            </tr>
            <tr>
              <td style={{...s.td(1), fontWeight:"bold", fontFamily:"sans-serif", fontSize:"11px"}}>누구를?</td>
              <td style={s.td(1)}>군 복무 중 <strong>사망한</strong> 군인</td>
              <td style={s.td(1)}><strong>모든</strong> 군인 (살아있는 분 포함)</td>
            </tr>
            <tr>
              <td style={{...s.td(0), fontWeight:"bold", fontFamily:"sans-serif", fontSize:"11px"}}>핵심 단어</td>
              <td style={{...s.td(0), color:C.red}}>died (사망)</td>
              <td style={{...s.td(0), color:C.green}}>served (복무)</td>
            </tr>
          </tbody>
        </table>
        <div style={{ ...s.tipBox, marginTop:"10px" }}>
          💡 Memorial = Mourning(애도) → 돌아가신 분들. Veterans = 살아있는 분 포함 모든 군인.
        </div>
      </div>
    </div>
  );
}

function StudyPlanView() {
  return (
    <div>
      <div style={s.infoCard}>
        <p style={s.sectionTitle}>📅 ADHD 맞춤 14일 학습 계획</p>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>날</th><th style={s.th}>공부 내용</th><th style={s.th}>복습</th></tr>
          </thead>
          <tbody>
            {STUDY_PLAN.map((p, i) => (
              <tr key={i}>
                <td style={{...s.td(i), fontWeight:"bold", color: i===7 ? C.gold : C.navy, fontFamily:"sans-serif", whiteSpace:"nowrap"}}>{p.day}</td>
                <td style={{...s.td(i), fontFamily:"sans-serif"}}>{p.content}</td>
                <td style={{...s.td(i), fontFamily:"sans-serif", color:C.muted, fontSize:"11px"}}>{p.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={s.infoCard}>
        <p style={{ fontSize:"14px", fontWeight:"bold", color:C.navy, marginBottom:"10px", fontFamily:"sans-serif" }}>🧠 기억에 도움이 되는 방법</p>
        {[
          ["🗣", "소리 내어 말하기", "읽는 것보다 말로 하면 더 잘 기억됩니다."],
          ["✏️", "손으로 쓰기", "질문과 답을 종이에 직접 써보세요."],
          ["⭐", "★ 별표 문제 먼저", "빠른 복습표의 문제들을 우선적으로 외우세요."],
          ["👥", "가족과 연습", "'이 질문 물어봐줘!' 하고 모의 인터뷰 연습."],
          ["⏸", "집중이 안 될 때", "억지로 하지 말고 잠깐 쉬었다가 다시 시작."],
          ["🔄", "날짜 바뀌는 답 확인", "인터뷰 1주일 전에 uscis.gov/citizenship/testupdates 재확인."],
        ].map(([emoji, title, body], i) => (
          <div key={i} style={{ display:"flex", gap:"10px", borderLeft:`3px solid ${C.navy}`,
            paddingLeft:"10px", marginBottom:"10px" }}>
            <span style={{ fontSize:"16px", flexShrink:0 }}>{emoji}</span>
            <div style={{ fontFamily:"sans-serif" }}>
              <p style={{ margin:"0 0 2px", fontWeight:"bold", fontSize:"13px", color:C.navy }}>{title}</p>
              <p style={{ margin:0, fontSize:"12px", color:C.text, lineHeight:1.5 }}>{body}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...s.infoCard, background:"#FDF3DC", borderColor:C.gold }}>
        <p style={{ margin:0, fontSize:"12px", fontFamily:"sans-serif", color:"#7A5800", lineHeight:1.7 }}>
          <strong>시험 안내:</strong> 128문제 중 20개 질문 → 12개 이상 정답이면 합격 (60%).<br />
          65세+ 20년 이상 영주권자: 별표(★) 문제 중 10개 질문, 6개 정답이면 합격, 모국어 가능.<br />
          <strong>uscis.gov/citizenship/testupdates</strong> 에서 현재 관리들의 이름을 확인하세요.
        </p>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activePart, setActivePart] = useState("p0");
  const partQuestions = QUESTIONS.filter(q => q.part === activePart);

  return (
    <div style={s.app}>
      <div style={s.header}>
        <h1 style={s.headerTitle}>🇺🇸 미국 시민권 시험 완전 공부자료</h1>
        <p style={s.headerSub}>미네소타 거주자 기준 · 2025년 버전 · ADHD 맞춤 정리</p>
      </div>

      <div style={s.navScroll}>
        {PARTS.map(p => (
          <button key={p.id} style={s.navBtn(activePart === p.id)} onClick={() => setActivePart(p.id)}>
            {p.emoji} {p.label}
          </button>
        ))}
      </div>

      <div style={s.body}>
        {activePart === "p0"  && <Part0View />}
        {activePart === "ref" && <QuickRefView />}
        {activePart === "plan" && <StudyPlanView />}
        {partQuestions.length > 0 && (
          <>
            {partQuestions.map(q => <QuestionCard key={q.id} q={q} />)}
          </>
        )}
      </div>
    </div>
  );
}
