/* ==========================================================================
   글숲 (Geulsoop) Complete Data & State Persistence Manager (Phase 4 Final)
   ========================================================================== */

const GEULSOOP_DATA = {
    // 1. 이주의 추천 작품 및 신작 (Hero Slider Items)
    featuredWorks: [
        {
            id: 'feat-1',
            genre: '운문 · 시',
            genreKey: 'verse',
            subGenre: '시',
            title: '바람이 적어둔 잎사귀의 문장',
            author: '한가람 작가',
            authorAvatar: '한',
            authorBio: '시의 은유 속에서 삶의 작은 온기를 찾아 서성입니다.',
            excerpt: '가을이 지나가는 길목마다 나무는 자신이 가진 가장 뜨거운 색으로 지상에 띄우는 안부 편지를 쓴다.',
            fullContent: `가을이 지나가는 길목마다
나무는 자신이 가진 가장 뜨거운 색으로
지상에 띄우는 안부 편지를 쓴다.

떨어지는 것은 스러짐이 아닌,
땅을 향한 가장 깊은 고백이다.

너의 안부를 묻는 밤이면
내 안의 잎사귀 하나도
가장 깊은 주황빛으로 물들어
너라는 계절 속으로 정갈하게 내려앉는다.`,
            tags: ['#가을시', '#감성운문', '#자연', '#위로'],
            likes: 248,
            views: 1820,
            commentsCount: 2,
            date: '2026.09.28',
            comments: [
                { id: 'c-1', author: '달빛독자', avatar: '달', date: '2026.09.28 20:14', text: '“떨어지는 것은 스러짐이 아닌 땅을 향한 가장 깊은 고백이다” 구절에서 왈칵 눈물이 났습니다.', likes: 12 },
                { id: 'c-2', author: '글사랑', avatar: '글', date: '2026.09.29 09:30', text: '마음이 주황빛으로 따스해집니다. 잘 읽고 가요!', likes: 5 }
            ]
        },
        {
            id: 'feat-2',
            genre: '산문 · 에세이',
            genreKey: 'prose',
            subGenre: '에세이',
            title: '어스름녘 골목길의 온도',
            author: '서은우 작가',
            authorAvatar: '서',
            authorBio: '일상의 소소한 장면들을 다정한 시선으로 기록하는 수필가.',
            excerpt: '해 질 녘 동네 골목을 거닐다 보면, 어딘가에서 구수한 찌개 끓는 냄새와 사근사근 흘러나오는 웃음소리를 만난다.',
            fullContent: `해 질 녘 동네 골목을 거닐다 보면, 어딘가에서 구수한 찌개 끓는 냄새와 창문 너머 사근사근 흘러나오는 웃음소리를 만난다. 

어릴 적 우리는 왜 그리도 어둠이 내리는 것을 아쉬워했을까. 엄마가 골목 어귀에서 이름을 부를 때까지 공을 차던 아이들은, 이제 저마다의 일터에서 고단한 하루를 갈무리하고 집으로 돌아간다.

나에게 문학이란 먼 곳의 거대한 진리가 아니다. 해 질 녘 작은 골목길을 채우는 사람들의 나지막한 숨소리, 그 훈훈한 온기를 잊지 않고 언어로 지켜내는 기록이다.`,
            tags: ['#수필', '#골목길', '#일상의온도', '#추억'],
            likes: 195,
            views: 1450,
            commentsCount: 1,
            date: '2026.09.29',
            comments: [
                { id: 'c-5', author: '골목길산책', avatar: '골', date: '2026.09.29 21:00', text: '저녁 밥상 차리는 냄새가 글로 전해지는 듯해요.', likes: 9 }
            ]
        },
        {
            id: 'feat-3',
            genre: '기타 · 음악 가사',
            genreKey: 'music',
            subGenre: '음악 가사',
            title: '밤하늘 정류장 (Acoustic Ver.)',
            author: '멜로디아',
            authorAvatar: '멜',
            authorBio: '노래가 되는 말, 삶이 되는 가사를 쓰는 작사가.',
            excerpt: '막차가 떠난 새벽 두 시의 버스 정류장 / 불빛 아래 홀로 남은 내 그림자 / 내일은 오늘보다 조금 더 환하게 빛날 수 있을까',
            fullContent: `(Intro - 잔잔한 핑거피킹 아쿠스틱 기타)

[Verse 1]
막차가 떠난 새벽 두 시의 버스 정류장
차가운 벤치 위 홀로 남은 내 그림자
오늘 하루도 숨차게 달려왔지만
마음 한구석엔 여전히 빈자리가 남아

[Chorus]
밤하늘 정류장에서 나 나를 기다려
지친 마음 잠시 내려놓을 그 시각
너라는 별이 내 머리 위에 내려앉으면
내일은 오늘보다 조금 더 환하게 빛날 수 있을까`,
            tags: ['#음악가사', '#어쿠스틱', '#새벽감성', '#작사'],
            likes: 312,
            views: 2190,
            commentsCount: 1,
            date: '2026.09.30',
            comments: [
                { id: 'c-8', author: '인디뮤지션', avatar: '인', date: '2026.09.30 23:10', text: '멜로디 붙여서 노래로 부르고 싶은 가사입니다!', likes: 18 }
            ]
        }
    ],

    // 2. 장르별 전체 기본 작품 데이터베이스
    allWorks: [
        {
            id: 'work-v1',
            genreKey: 'verse',
            genreLabel: '운문',
            subGenre: '시',
            title: '창문에 맺힌 빗방울 기호',
            author: '민들레',
            authorAvatar: '민',
            authorBio: '빗소리 속에서 시를 줍는 시인입니다.',
            snippet: '유리창을 따라 흘러내리는 빗방울들은 하늘이 땅에게 보내는 서정적인 쉼표다.',
            fullContent: `유리창을 따라 흘러내리는 빗방울들은
하늘이 땅에게 보내는 서정적인 쉼표다.

지친 발걸음을 멈추고
창가에 이마를 대면
투명한 기호들이 번져나와
나의 슬픔을 토닥인다.

세상이 잠시 멈추어 서는 순간,
비로소 들리는 내 안의 소리.`,
            tags: ['#시', '#비오는날', '#쉼표', '#위로'],
            likes: 142,
            views: 890,
            commentsCount: 1,
            date: '2026.10.01',
            comments: [
                { id: 'cv1-1', author: '빗소리', avatar: '빗', date: '2026.10.01 12:00', text: '비 오는 창가가 눈앞에 보여요.', likes: 4 }
            ]
        },
        {
            id: 'work-v2',
            genreKey: 'verse',
            genreLabel: '운문',
            subGenre: '시조',
            title: '달빛에 씻은 밤',
            author: '청람',
            authorAvatar: '청',
            authorBio: '현대시조의 운율을 짓는 시조 시인.',
            snippet: '창밖에 달빛 차서 뜰 앞을 쓸어내니 서러운 지난날이 이슬로 맺히누나.',
            fullContent: `창밖에 달빛 차서 뜰 앞을 쓸어내니
서러운 지난날이 이슬로 맺히누나
뜬구름 소식이 없으니 가슴만 아리어라.

밤 깊어 귀뚜라미 목청 놓아 울어예고
바람에 흩날리는 정녕 너의 옷자락인가
홀로 든 등불 하나에 새벽을 맞이하네.`,
            tags: ['#시조', '#고전감성', '#달빛', '#그리움'],
            likes: 120,
            views: 740,
            commentsCount: 1,
            date: '2026.09.27',
            comments: [
                { id: 'cv2-1', author: '시조독자', avatar: '시', date: '2026.09.28 14:00', text: '정갈한 옛 시조의 멋이 깃들어 있습니다.', likes: 3 }
            ]
        },
        {
            id: 'work-p1',
            genreKey: 'prose',
            genreLabel: '산문',
            subGenre: '수필',
            title: '할머니의 손때 묻은 뚝배기',
            author: '정솔',
            authorAvatar: '정',
            authorBio: '가족과 추억의 온기를 수필로 씁니다.',
            snippet: '투박하지만 깊은 온기를 품은 그 뚝배기에는 세월의 주름과 사랑이 녹아 있었다.',
            fullContent: `할머니의 주방 한구석에는 이가 조금 나간 까만 뚝배기가 있었다. 
요즘 나오는 어여쁜 도자기 그릇에 비하면 보잘것없고 투박했지만, 거기에 된장찌개가 보글보글 끓어오르면 온 집안이 따스한 온기로 가득 찼다.

"음식은 불로 끓이는 게 아니라 마음으로 다스리는 게다."
할머니는 늘 그렇게 말씀하셨다. 세월이 흘러 내가 어른이 되고 거친 세상을 살아가다 지칠 때면, 그 손때 묻은 뚝배기 속 보글거리던 소리가 서정적인 위로로 다가온다.`,
            tags: ['#수필', '#할머니', '#추억', '#음식'],
            likes: 198,
            views: 1210,
            commentsCount: 1,
            date: '2026.09.30',
            comments: [
                { id: 'cp1-1', author: '따스함', avatar: '따', date: '2026.09.30 20:10', text: '가슴이 뭉클해지는 뚝배기 이야기 감사해요.', likes: 5 }
            ]
        },
        {
            id: 'work-d1',
            genreKey: 'drama',
            genreLabel: '극/영상',
            subGenre: '웹소설/대본',
            title: '시간을 짓는 목수 이야기',
            author: '강해든',
            authorAvatar: '강',
            authorBio: '스토리텔링과 극 대본을 씁니다.',
            snippet: '[제3화] 잊혀진 기억의 가구를 수리합니다. 안개가 자욱한 공방 문을 열자 향나무 향이 내렸다.',
            fullContent: `[씬 #12. 시간 공방 (낮)]
나무 깎는 톱질 소리가 정막을 깨운다. 
주인공 '진우'는 시계를 보지 않는다. 대신 나무의 결을 어루만진다.

진우 (혼잣말):
"사람들은 부러진 의자를 버리지만, 의자에 남은 기억까지 버릴 순 없지."`,
            tags: ['#웹소설', '#대본', '#판타지', '#감성스토리'],
            likes: 167,
            views: 1140,
            commentsCount: 1,
            date: '2026.09.28',
            comments: [
                { id: 'cd1-1', author: '대본러', avatar: '대', date: '2026.09.28 19:30', text: '목수의 대사가 차분한 큰 울림을 주네요.', likes: 4 }
            ]
        },
        {
            id: 'work-m1',
            genreKey: 'music',
            genreLabel: '기타/음악',
            subGenre: '음악 가사',
            title: '지하철 2호선 순환선',
            author: '류하',
            authorAvatar: '류',
            authorBio: '도시의 서성을 노래하는 작사가.',
            snippet: '끝없이 맴도는 2호선 열차처럼 / 우리 사랑도 목적지 없이 제자리를 돌고 있었는지 몰라.',
            fullContent: `[Verse 1]
매일 같은 시각, 같은 칸에 올라타
이어폰 너머로 흘러나오는 멜로디
창밖 한강 위로 노을이 번질 때
내 마음도 너에게로 번져가

[Chorus]
지하철 2호선 순환선처럼
끝없이 맴도는 우리의 이야기
내릴 곳을 알면서도 내리지 못하고
너라는 궤도 속을 서성인다`,
            tags: ['#노랫말', '#시티팝', '#2호선', '#감성가사'],
            likes: 275,
            views: 1680,
            commentsCount: 1,
            date: '2026.09.29',
            comments: [
                { id: 'cm1-1', author: '작곡가', avatar: '작', date: '2026.09.29 21:15', text: '노래 멜로디가 머릿속에 바로 그리는 리듬감!', likes: 6 }
            ]
        }
    ],

    // 3. 작가 소식
    news: [
        {
            id: 'n-1',
            category: 'debut',
            categoryLabel: '작가데뷔',
            title: '글숲 3기 정식 출판 지원 작가 공모전 당선작 발표',
            date: '2026.09.30'
        },
        {
            id: 'n-2',
            category: 'contest',
            categoryLabel: '합평모임',
            title: '[10월 첫째 주] 시·산문 오프라인 문학 합평회 참가자 모집',
            date: '2026.09.29'
        }
    ],

    // 4. 이달의 추천 작가
    spotlightWriter: {
        name: '윤슬 작가',
        avatar: '윤',
        tagline: '잔물결처럼 마음에 가만히 스며드는 시를 씁니다.',
        quote: '"글을 쓰는 시간은 세상의 소음에서 벗어나 내 영혼의 소리에 귀 기울이는 가장 거룩한 여정입니다."',
        representativeWorks: ['바람의 시집', '윤슬의 노래', '새벽 3시의 펜슬']
    }
};

/* --------------------------------------------------------------------------
   LocalStorage Persistence State Manager Engine (Likes, Comments, Published)
   -------------------------------------------------------------------------- */

const STATE_KEYS = {
    USER_WORKS: 'geulsoop_user_published_works',
    WORK_STATES: 'geulsoop_work_dynamic_states' // Stores likes, views, comments overrides by work ID
};

function getLocalPublishedWorks() {
    try {
        const saved = localStorage.getItem(STATE_KEYS.USER_WORKS);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveUserPublishedWork(newWork) {
    try {
        const existing = getLocalPublishedWorks();
        existing.unshift(newWork);
        localStorage.setItem(STATE_KEYS.USER_WORKS, JSON.stringify(existing));
    } catch (e) {
        console.error('Failed to save published work to localStorage', e);
    }
}

function getWorkDynamicStates() {
    try {
        const saved = localStorage.getItem(STATE_KEYS.WORK_STATES);
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        return {};
    }
}

function saveWorkDynamicState(workId, stateUpdate) {
    try {
        const states = getWorkDynamicStates();
        states[workId] = {
            ...(states[workId] || {}),
            ...stateUpdate
        };
        localStorage.setItem(STATE_KEYS.WORK_STATES, JSON.stringify(states));
    } catch (e) {
        console.error('Failed to save work state to localStorage', e);
    }
}

function getAllWorksCombined() {
    const baseList = [...GEULSOOP_DATA.allWorks];
    
    // Add featured works if not already present
    GEULSOOP_DATA.featuredWorks.forEach(fw => {
        if (!baseList.some(w => w.id === fw.id)) {
            baseList.unshift(fw);
        }
    });

    // Merge User Published Works from localStorage
    const localUserWorks = getLocalPublishedWorks();
    localUserWorks.forEach(uw => {
        if (!baseList.some(w => w.id === uw.id)) {
            baseList.unshift(uw);
        }
    });

    // Apply LocalStorage Dynamic State Overrides (Likes, Views, Comments)
    const dynamicStates = getWorkDynamicStates();
    baseList.forEach(w => {
        if (dynamicStates[w.id]) {
            const st = dynamicStates[w.id];
            if (st.likes !== undefined) w.likes = st.likes;
            if (st.views !== undefined) w.views = st.views;
            if (st.comments !== undefined) {
                w.comments = st.comments;
                w.commentsCount = st.comments.length;
            }
        }
    });

    return baseList;
}
