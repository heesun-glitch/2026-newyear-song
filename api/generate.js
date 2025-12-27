export const config = {
    runtime: 'edge',
};

// ★★★ 최종 통합 데이터베이스 (총 205곡) ★★★
const SONG_DATABASE = [
    // [SECTION 1: 유튜브 새해 국룰 리스트]
    { id: 1, title: "Welcome to the Show", artist: "DAY6 (데이식스)", tags: "시작, 무대, 주인공, 벅참, 환영" },
    { id: 2, title: "Live My Life", artist: "aespa", tags: "자유, 나만의 길, 여행, 팝펑크, 욜로" },
    { id: 3, title: "한 페이지가 될 수 있게", artist: "DAY6 (데이식스)", tags: "청춘, 기록, 아름다운 순간, 벅참" },
    { id: 4, title: "시작", artist: "가호 (Gaho)", tags: "도전, 이태원클라쓰, 성공, 패기, 새출발" },
    { id: 5, title: "I (Feat. 버벌진트)", artist: "태연 (TAEYEON)", tags: "비상, 꿈, 자유, 웅장함, 눈물" },
    { id: 6, title: "Higher (Feat. 이루마)", artist: "에일리 (Ailee)", tags: "성공, 도전, 높이, 야망, 목표" },
    { id: 7, title: "Start Line", artist: "아이린 (Red Velvet)", tags: "출발선, 시작, 설렘, 준비" },
    { id: 8, title: "New Future", artist: "이용신", tags: "달빛천사, 희망, 미래, 추억, 기도" },
    { id: 9, title: "1조", artist: "이찬혁 (AKMU)", tags: "돈, 부자, 1조, 대박, 벼락부자, 꿈" },
    { id: 10, title: "이루리", artist: "우주소녀", tags: "소원성취, 새해국룰, 희망, 주문, 긍정" },
    { id: 11, title: "JACKPOT", artist: "블락비 (Block B)", tags: "대박, 로또, 행운, 돈, 터졌다" },
    { id: 12, title: "MONEY", artist: "리사 (LISA)", tags: "돈, 부자, 현금, Flex, 성공" },
    { id: 13, title: "Lotto", artist: "EXO", tags: "로또, 당첨, 행운, 돈, 인생역전" },
    { id: 14, title: "소원을 말해봐 (Genie)", artist: "소녀시대", tags: "소원, 행운, 요정, 램프, 꿈" },
    { id: 15, title: "나의 바람 (Wind And Wish)", artist: "비투비 (BTOB)", tags: "바람, 소원, 행복, 안녕" },
    { id: 16, title: "행운을 빌어 줘", artist: "원필 (DAY6)", tags: "행운, 앞날, 응원, 이별, 시작" },
    { id: 17, title: "기적", artist: "도경수 (D.O.)", tags: "기적, 희망, 판타지, 소망" },
    { id: 18, title: "소원을 빌어 (The Wish)", artist: "안유진 (IVE)", tags: "소원, 디즈니, 꿈, 별, 희망" },
    { id: 19, title: "Shopper", artist: "아이유 (IU)", tags: "쇼핑, 욕망, 시원함, 당당함, 포부" },
    { id: 20, title: "I AM", artist: "IVE (아이브)", tags: "자존감, 야망, 길, 확신, 성공" },
    { id: 21, title: "나로 말할 것 같으면", artist: "마마무", tags: "자존감, 자신감, 매력, 당당함" },
    { id: 22, title: "달라달라", artist: "ITZY (있지)", tags: "개성, 특별함, 나다움, 자존감" },
    { id: 23, title: "ROYAL", artist: "IVE (아이브)", tags: "고급, 자존감, 왕족, 품격, 태도" },
    { id: 24, title: "퀸카 (Queencard)", artist: "(여자)아이들", tags: "자신감, 주인공, 퀸카, 아름다움" },
    { id: 25, title: "내가 제일 잘 나가", artist: "2NE1", tags: "최고, 1등, 자신감, 넘버원, 포스" },
    { id: 26, title: "Baddie", artist: "IVE (아이브)", tags: "빌런, 힙함, 당당함, 마이웨이" },
    { id: 27, title: "WANNABE", artist: "ITZY (있지)", tags: "자유, 나다움, 잔소리, 해방" },
    { id: 28, title: "Celebrity", artist: "아이유 (IU)", tags: "유명세, 별, 자존감, 특별함, 위로" },
    { id: 29, title: "말리지 마", artist: "(여자)아이들", tags: "직진, 마이웨이, 열정, 포기금지" },
    { id: 30, title: "Good Parts", artist: "LE SSERAFIM", tags: "실수, 자존감, 사랑, 나 자신" },
    { id: 31, title: "팔레트 (Feat. G-DRAGON)", artist: "아이유 (IU)", tags: "나, 취향, 성장, 여유, 25살" },
    { id: 32, title: "STEP", artist: "카라 (KARA)", tags: "전진, 극복, 성장, 댄스, 에너지" },
    { id: 33, title: "파이팅 해야지 (Feat. 이영지)", artist: "부석순 (SEVENTEEN)", tags: "응원, 에너지, 현생, 출근, 힘" },
    { id: 34, title: "얼굴 찌푸리지 말아요", artist: "하이라이트", tags: "긍정, 웃음, 위로, 행복" },
    { id: 35, title: "Songbird (Korean Ver.)", artist: "NCT WISH", tags: "희망, 배달, 행운, 비상" },
    { id: 36, title: "아주 NICE", artist: "SEVENTEEN (세븐틴)", tags: "기분좋음, 데이트, 에너지, 설렘" },
    { id: 37, title: "손오공", artist: "SEVENTEEN (세븐틴)", tags: "열정, 진화, 에너지, 팀워크, 무적" },
    { id: 38, title: "Run Run", artist: "이클립스 (ECLIPSE)", tags: "달리기, 운동, 에너지, 밴드, 땀" },
    { id: 39, title: "힘 내!", artist: "소녀시대", tags: "응원, 치어리딩, 힘, 긍정" },
    { id: 40, title: "SMILEY (Feat. 비비)", artist: "YENA (최예나)", tags: "미소, 긍정, 히어로, 해피바이러스" },
    { id: 41, title: "청춘찬가", artist: "SEVENTEEN (세븐틴)", tags: "청춘, 찬가, 위로, 응원" },
    { id: 42, title: "너와의 모든 지금", artist: "재쓰비", tags: "현재, 소중함, 사랑, 낭만" },
    { id: 43, title: "HAPPY", artist: "DAY6 (데이식스)", tags: "행복, 위로, 밴드, 소망" },
    { id: 44, title: "Siesta", artist: "위키미키", tags: "휴식, 낮잠, 힐링, 충전" },
    { id: 45, title: "행복 (Happiness)", artist: "Red Velvet", tags: "행복, 긍정, 에너지, 주문" },
    { id: 46, title: "Feel Special", artist: "TWICE", tags: "위로, 존재감, 감동, 반짝임" },
    { id: 47, title: "Drive", artist: "미연 ((여자)아이들)", tags: "드라이브, 봄, 힐링, 기분전환" },
    { id: 48, title: "건물 사이에 피어난 장미", artist: "H1-KEY (하이키)", tags: "끈기, 생명력, 존버, 위로, 성공" },
    { id: 49, title: "오르트구름", artist: "윤하", tags: "모험, 미지, 호기심, 벅참" },
    { id: 50, title: "안녕 (Hello)", artist: "조이 (JOY)", tags: "안녕, 맑음, 기분전환, 출근길" },
    { id: 51, title: "Happy", artist: "태연 (TAEYEON)", tags: "행복, 따뜻함, 사랑, 포근함" },
    { id: 52, title: "후라이의 꿈", artist: "AKMU (악뮤)", tags: "휴식, 게으름, 평화, 자아, 눕방" },
    { id: 53, title: "Parade", artist: "윤하", tags: "축제, 행진, 즐거움, 페스티벌" },
    { id: 54, title: "반짝, 빛을 내", artist: "윤하", tags: "빛, 희망, 응원, 격려" },
    { id: 55, title: "Loveable", artist: "조유리", tags: "사랑스러움, 위로, 긍정" },
    { id: 56, title: "예쁜 나이 25살", artist: "송지은", tags: "25살, 청춘, 아름다움, 리즈시절" },
    { id: 57, title: "스물셋", artist: "아이유 (IU)", tags: "23살, 성장, 고민, 현재" },
    { id: 58, title: "21", artist: "DEAN (딘)", tags: "21살, 청춘, 젊음, 반항" },
    { id: 59, title: "33", artist: "이창섭", tags: "33살, 어른, 다짐, 성숙" },
    { id: 60, title: "Forever Young", artist: "BLACKPINK", tags: "영원, 젊음, 파티, 불장난" },
    { id: 61, title: "FOREVER 1", artist: "소녀시대", tags: "영원, 축제, 기념, 1등, 파티" },
    { id: 62, title: "Hello Future", artist: "NCT DREAM", tags: "미래, 평화, 희망, 안녕" },
    { id: 63, title: "Thursday's Child Has Far To Go", artist: "투모로우바이투게더", tags: "여행, 이별극복, 긍정, 미래" },
    { id: 64, title: "Good & Great", artist: "키 (KEY)", tags: "일, 워커홀릭, 칭찬, 스스로, 승진" },
    { id: 65, title: "주인공", artist: "선미", tags: "주인공, 드라마, 이별, 독기" },
    { id: 66, title: "Youth", artist: "기현 (몬스타엑스)", tags: "청춘, 여행, 자유, 락" },
    { id: 67, title: "00:00 (Zero O'Clock)", artist: "방탄소년단", tags: "자정, 리셋, 새로운시작, 위로, 내일" },
    { id: 68, title: "Supernova", artist: "aespa", tags: "강렬함, 변화, 폭발적 에너지, 미래, 혁신" },
    { id: 69, title: "Hype Boy", artist: "NewJeans", tags: "설렘, 트렌디, 청량, 기분전환, 시작" },
    { id: 70, title: "Dynamite", artist: "BTS", tags: "희망, 긍정, 활력, 전세계적, 펑키, 기분업" },
    { id: 71, title: "ETA", artist: "NewJeans", tags: "신남, 친구, 빠른 템포, 드라이브" },
    { id: 72, title: "After LIKE", artist: "IVE (아이브)", tags: "사랑, 축제, 화려함, 설렘, 고백" },
    { id: 73, title: "Perfect Night", artist: "LE SSERAFIM", tags: "밤, 드라이브, 친구, 낭만, 즐거움" },
    { id: 74, title: "첫 만남은 계획대로 되지 않아", artist: "TWS (투어스)", tags: "설렘, 시작, 첫만남, 학교, 풋풋함" },
    { id: 75, title: "Love wins all", artist: "아이유 (IU)", tags: "사랑, 구원, 벅참, 감동, 서사, 발라드" },
    { id: 76, title: "Ditto", artist: "NewJeans", tags: "겨울, 감성, 그리움, 포근함, 기억" },
    { id: 77, title: "Magnetic", artist: "ILLIT (아일릿)", tags: "끌림, 설렘, 엉뚱함, 귀여움, 10대" },
    { id: 78, title: "Get A Guitar", artist: "RIIZE", tags: "청량, 리듬, 펑키, 시작, 꿈" },
    { id: 79, title: "봄날", artist: "BTS", tags: "그리움, 희망, 봄, 위로, 기다림, 재회" },
    { id: 80, title: "Spicy", artist: "aespa", tags: "자유분방, 여름, 하이틴, 당당함" },
    { id: 81, title: "ANTIFRAGILE", artist: "LE SSERAFIM", tags: "강인함, 극복, 성장, 독기, 성공" },
    { id: 82, title: "Love Lee", artist: "AKMU (악뮤)", tags: "사랑스러움, 귀여움, 밝음, 행복" },
    { id: 83, title: "Seven (feat. Latto)", artist: "Jung Kook", tags: "사랑, 열정, 일주일, 트렌디, 팝" },
    { id: 84, title: "Fast Forward", artist: "전소미", tags: "미래, 사랑, 속도, 댄스, 테크토닉" },
    { id: 85, title: "Kitsch", artist: "IVE (아이브)", tags: "자유, 개성, 힙함, 특별함" },
    { id: 86, title: "Attention", artist: "NewJeans", tags: "주목, 청량, 스타일리시, 여름" },
    { id: 87, title: "Butter", artist: "BTS", tags: "부드러움, 매력, 여름, 팝" },
    { id: 88, title: "Candy", artist: "NCT DREAM", tags: "겨울, 행복, 귀여움, 추억, 에너지" },
    { id: 89, title: "God of Music (음악의 신)", artist: "SEVENTEEN (세븐틴)", tags: "축제, 행복, 음악, 긍정" },
    { id: 90, title: "MANIAC", artist: "VIVIZ (비비지)", tags: "사랑, 역주행, 댄스, 몽환" },
    { id: 91, title: "Drama", artist: "aespa", tags: "주인공, 강렬함, 액션, 자신감" },
    { id: 92, title: "너의 모든 순간", artist: "성시경", tags: "사랑, 감동, 인연, 운명, 결혼" },
    { id: 93, title: "사건의 지평선", artist: "윤하", tags: "끝과 시작, 새로운 날들, 희망찬 이별, 우주" },
    { id: 94, title: "주저하는 연인들을 위해", artist: "잔나비", tags: "낭만, 사랑, 추억, 레트로, 밤" },
    { id: 95, title: "사랑은 늘 도망가", artist: "임영웅", tags: "그리움, 편안함, 감성, 위로" },
    { id: 96, title: "취중고백", artist: "김민석 (멜로망스)", tags: "고백, 사랑, 달달함, 설렘" },
    { id: 97, title: "해요 (2022)", artist: "#안녕", tags: "짝사랑, 고백, 애절함, 노래방" },
    { id: 98, title: "아이와 나의 바다", artist: "아이유 (IU)", tags: "위로, 성장, 나를 찾아서, 깊은 울림, 자아" },
    { id: 99, title: "흰수염고래", artist: "YB", tags: "자유, 꿈, 응원, 넓은 세상, 위로" },
    { id: 100, title: "모든 날, 모든 순간", artist: "폴킴", tags: "일상, 사랑, 감동, 축가, 편안함" },
    { id: 101, title: "예뻤어", artist: "DAY6 (데이식스)", tags: "추억, 이별, 회상, 아름다움" },
    { id: 102, title: "밤양갱", artist: "비비 (BIBI)", tags: "달달함, 귀여움, 왈츠, 사랑스러움" },
    { id: 103, title: "To. X", artist: "태연 (TAEYEON)", tags: "이별, 쿨함, 정리, 알앤비" },
    { id: 104, title: "헤어지자 말해요", artist: "박재정", tags: "이별, 발라드, 애절함, 눈물" },
    { id: 105, title: "비의 랩소디", artist: "임재현", tags: "그리움, 호소력, 명곡, 노래방" },
    { id: 106, title: "그대만 있다면", artist: "너드커넥션", tags: "사랑, 밴드, 감성, 벅참" },
    { id: 107, title: "인사", artist: "범진", tags: "안부, 따뜻함, 어쿠스틱, 위로" },
    { id: 108, title: "숲", artist: "최유리", tags: "휴식, 자연, 평화, 힐링" },
    { id: 109, title: "잘 지내자, 우리", artist: "최유리", tags: "이별, 담담함, 감성" },
    { id: 110, title: "APT.", artist: "로제 (ROSÉ) & Bruno Mars", tags: "술게임, 신남, 글로벌, 펑키, 중독성" },
    { id: 111, title: "T.B.H", artist: "QWER", tags: "고민중독, 밴드, 청량, 짝사랑" },
    { id: 112, title: "SPOT! (feat. JENNIE)", artist: "지코 (ZICO)", tags: "힙합, 트렌디, 친구, 파티" },
    { id: 113, title: "해야 (HEYA)", artist: "IVE (아이브)", tags: "전래동화, 한국적, 강렬함" },
    { id: 114, title: "SHEESH", artist: "BABYMONSTER", tags: "힙합, 강렬함, 신인, 퍼포먼스" },
    { id: 115, title: "Midas Touch", artist: "KISS OF LIFE", tags: "Y2K, 섹시, 당당함, 개성" },
    { id: 116, title: "Smoothie", artist: "NCT DREAM", tags: "힙합, 자신감, 쿨함" },
    { id: 117, title: "꿈결같아서", artist: "민니 ((여자)아이들)", tags: "OST, 설렘, 사랑, 선재업고튀어" },
    { id: 118, title: "소나기", artist: "이클립스 (ECLIPSE)", tags: "첫사랑, 애절함, OST, 선재업고튀어" },
    { id: 119, title: "Small girl (feat. 도경수(D.O.))", artist: "이영지", tags: "귀여움, 사랑, 커플, 달달함" },
    { id: 120, title: "Supernatural", artist: "NewJeans", tags: "뉴잭스윙, 일본, 트렌디, 신비로움" },
    { id: 121, title: "ABCD", artist: "나연 (TWICE)", tags: "Y2K, 댄스, 핫걸, 매력" },
    { id: 122, title: "Sticky", artist: "KISS OF LIFE", tags: "여름, 청량, 섹시, 휴가" },
    { id: 123, title: "클락션 (Klaxon)", artist: "(여자)아이들", tags: "여름, 드라이브, 시원함, 고백" },
    { id: 124, title: "Chk Chk Boom", artist: "Stray Kids", tags: "강렬함, 퍼포먼스, 자신감, 라틴" },
    { id: 125, title: "XO (Only If You Say Yes)", artist: "ENHYPEN", tags: "달달함, 로맨틱, 팝" },
    { id: 126, title: "별 떨어진다 (I Do)", artist: "디오 (D.O.)", tags: "어쿠스틱, 사랑, 고백, 낭만" },
    { id: 127, title: "너의 의미 (Feat. 김창완)", artist: "아이유 (IU)", tags: "힐링, 리메이크, 따뜻함, 사랑" },
    { id: 128, title: "금요일에 만나요 (Feat. 장이정)", artist: "아이유 (IU)", tags: "설렘, 주말, 약속, 달달함" },
    { id: 129, title: "Blueming", artist: "아이유 (IU)", tags: "파란색, 꽃, 설렘, 문자" },
    { id: 130, title: "내 손을 잡아", artist: "아이유 (IU)", tags: "벅참, 사랑, 라이브, 밴드, 역주행" },
    { id: 131, title: "라일락", artist: "아이유 (IU)", tags: "봄, 안녕, 화려함, 댄스" },
    { id: 132, title: "Strawberry Moon", artist: "아이유 (IU)", tags: "달, 몽환, 사랑, 행복" },
    { id: 133, title: "홀씨", artist: "아이유 (IU)", tags: "자유, 비행, 힙합, 개성" },
    { id: 134, title: "예쁘다", artist: "SEVENTEEN (세븐틴)", tags: "청량, 고백, 소년, 뮤지컬" },
    { id: 135, title: "Left & Right", artist: "SEVENTEEN (세븐틴)", tags: "청춘, 고민, 직진, 힙합" },
    { id: 136, title: "HOT", artist: "SEVENTEEN (세븐틴)", tags: "열정, 태양, 섹시, 강렬함" },
    { id: 137, title: "Love Killa", artist: "MONSTA X", tags: "치명적, 수트, 섹시, 어른" },
    { id: 138, title: "DRAMARAMA", artist: "MONSTA X", tags: "시간여행, 강렬함, 에너지" },
    { id: 139, title: "Love Scenario (사랑을 했다)", artist: "iKON", tags: "국민가요, 이별, 담담함, 떼창" },
    { id: 140, title: "REALLY REALLY", artist: "WINNER", tags: "고백, 트로피컬, 청량, 세련됨" },
    { id: 141, title: "뱅뱅뱅 (BANG BANG BANG)", artist: "BIGBANG", tags: "파티, 축제, 폭발, 신남" },
    { id: 142, title: "붉은 노을", artist: "BIGBANG", tags: "여행, 떼창, 신남, 리메이크, 희망" },
    { id: 143, title: "Cheer Up", artist: "TWICE", tags: "응원, 비타민, 상큼, 에너지" },
    { id: 144, title: "FANCY", artist: "TWICE", tags: "화려함, 네온, 짝사랑, 성숙" },
    { id: 145, title: "Alcohol-Free", artist: "TWICE", tags: "여름, 칵테일, 휴양지, 보사노바" },
    { id: 146, title: "빨간 맛 (Red Flavor)", artist: "Red Velvet", tags: "여름, 과일, 상큼, 에너지" },
    { id: 147, title: "Psycho", artist: "Red Velvet", tags: "명곡, 고혹적, 미스테리, 사랑" },
    { id: 148, title: "Feel My Rhythm", artist: "Red Velvet", tags: "봄, 클래식, 우아함, 꽃가루" },
    { id: 149, title: "ASAP", artist: "STAYC", tags: "꾹꾹이, 틴프레시, 상큼, 중독성" },
    { id: 150, title: "Teddy Bear", artist: "STAYC", tags: "곰인형, 귀여움, 응원, 히어로" },
    { id: 151, title: "Next Level", artist: "aespa", tags: "광야, 중독성, 강렬함, 디귿춤" },
    { id: 152, title: "ISTJ", artist: "NCT DREAM", tags: "성격, 반대, 에너지, 힙함" },
    { id: 153, title: "질주 (2 Baddies)", artist: "NCT 127", tags: "속도, 자동차, 힙합, 자신감" },
    { id: 154, title: "영웅 (Kick It)", artist: "NCT 127", tags: "무술, 에너지, 자신감, 가오" },
    { id: 155, title: "Baggy Jeans", artist: "NCT U", tags: "힙합, 그루브, 개성, 퍼포먼스" },
    { id: 156, title: "Boom Boom Bass", artist: "RIIZE", tags: "베이스, 리듬, 청춘, 설렘" },
    { id: 157, title: "Love 119", artist: "RIIZE", tags: "첫사랑, 겨울, 학교, 감성" },
    { id: 158, title: "Memories", artist: "RIIZE", tags: "추억, 시작, 우정, 벅참" },
    { id: 159, title: "첫 눈", artist: "EXO", tags: "겨울, 챌린지, 고백, 설렘" },
    { id: 160, title: "Love Shot", artist: "EXO", tags: "섹시, 수트, 웨이브, 치명적" },
    { id: 161, title: "으르렁 (Growl)", artist: "EXO", tags: "교복, 레전드, 댄스, 짝사랑" },
    { id: 162, title: "아무노래", artist: "지코 (ZICO)", tags: "챌린지, 편안함, 홈파티, 댄스" },
    { id: 163, title: "새삥 (Prod. ZICO)", artist: "지코 (ZICO)", tags: "트렌디, 춤, 오토바이, 힙함" },
    { id: 164, title: "VVS (Feat. JUSTHIS)", artist: "미란이, 먼치맨, Khundi Panda, 머쉬베놈", tags: "성공, 보석, 노력, 에너지, 쇼미" },
    { id: 165, title: "눈 (Feat. 이문세)", artist: "Zion.T", tags: "겨울, 눈, 재즈, 감성" },
    { id: 166, title: "양화대교", artist: "Zion.T", tags: "가족, 행복, 위로, 감동" },
    { id: 167, title: "비가 오는 날엔", artist: "BEAST (비스트)", tags: "비, 이별, 감성, 노래방" },
    { id: 168, title: "응급실", artist: "izi", tags: "노래방, 떼창, 락발라드, 사랑" },
    { id: 169, title: "소주 한 잔", artist: "임창정", tags: "술, 이별, 아재감성, 레전드" },
    { id: 170, title: "가시", artist: "버즈", tags: "락발라드, 떼창, 노래방, 추억" },
    // [SECTION 3: 글로벌 POP 명곡]
    { id: 171, title: "Viva La Vida", artist: "Coldplay", tags: "인생, 웅장함, 역사, 새출발, 왕" },
    { id: 172, title: "I Don't Think That I Like Her", artist: "Charlie Puth", tags: "설렘, 짝사랑, 경쾌함, 팝" },
    { id: 173, title: "Dangerously", artist: "Charlie Puth", tags: "열정, 사랑, 고음, 호소력" },
    { id: 174, title: "Cruel Summer", artist: "Taylor Swift", tags: "여름, 벅참, 사랑, 팝" },
    { id: 175, title: "Anti-Hero", artist: "Taylor Swift", tags: "자아성찰, 밤, 감성, 미드나잇" },
    { id: 176, title: "As It Was", artist: "Harry Styles", tags: "레트로, 신스팝, 아련함, 과거" },
    { id: 177, title: "Unholy", artist: "Sam Smith, Kim Petras", tags: "치명적, 섹시, 강렬함" },
    { id: 178, title: "Flowers", artist: "Miley Cyrus", tags: "자존감, 이별극복, 나혼자산다, 당당함" },
    { id: 179, title: "Stay", artist: "The Kid LAROI, Justin Bieber", tags: "신남, 팝, 드라이브, 속도감" },
    { id: 180, title: "Off My Face", artist: "Justin Bieber", tags: "사랑, 감성, 기타, 달달함" },
    { id: 181, title: "I'm Not The Only One", artist: "Sam Smith", tags: "이별, 명곡, 감성, 슬픔, 떼창" },
    { id: 182, title: "2002", artist: "Anne-Marie", tags: "추억, 사랑, 레트로, 내한, 떼창" },
    { id: 183, title: "Shape of You", artist: "Ed Sheeran", tags: "리듬, 운동, 팝, 신남, 중독성" },
    { id: 184, title: "Bad Habits", artist: "Ed Sheeran", tags: "밤, 뱀파이어, 댄스, 신남" },
    { id: 185, title: "There's Nothing Holdin' Me Back", artist: "Shawn Mendes", tags: "드라이브, 청량, 에너지, 락" },
    { id: 186, title: "Paris in the Rain", artist: "Lauv", tags: "비, 낭만, 분위기, 재즈바" },
    { id: 187, title: "Steal The Show", artist: "Lauv", tags: "엘리멘탈, 영화, 사랑, OST, 달달함" },
    { id: 188, title: "Kiss Me More (feat. SZA)", artist: "Doja Cat", tags: "하이틴, 달달함, 팝, 트렌디" },
    { id: 189, title: "Levitating", artist: "Dua Lipa", tags: "디스코, 댄스, 신남, 파티" },
    { id: 190, title: "Don't Start Now", artist: "Dua Lipa", tags: "이별, 쿨함, 베이스, 댄스" },
    { id: 191, title: "Save Your Tears", artist: "The Weeknd", tags: "레트로, 신스팝, 감성, 드라이브" },
    { id: 192, title: "Blinding Lights", artist: "The Weeknd", tags: "밤, 질주, 80년대, 몽환" },
    { id: 193, title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", tags: "사랑, 듀엣, 웅장함, 감동" },
    { id: 194, title: "Beautiful Things", artist: "Benson Boone", tags: "락, 호소력, 폭발적, 에너지" },
    { id: 195, title: "Good 4 u", artist: "Olivia Rodrigo", tags: "하이틴, 락, 복수, 에너지, 시원함" },
    { id: 196, title: "Espresso", artist: "Sabrina Carpenter", tags: "트렌디, 카페, 힙함, 자신감" },
    { id: 197, title: "Please Please Please", artist: "Sabrina Carpenter", tags: "레트로, 사랑, 귀여움" },
    { id: 198, title: "Birds of a Feather", artist: "Billie Eilish", tags: "감성, 몽환, 사랑, 편안함" },
    { id: 199, title: "LUNCH", artist: "Billie Eilish", tags: "힙함, 비트, 개성" },
    { id: 200, title: "Imagine", artist: "John Lennon", tags: "평화, 희망, 명곡, 클래식" },
    { id: 201, title: "Snooze", artist: "SZA", tags: "알앤비, 감성, 몽환, 사랑" },
    { id: 202, title: "Paint The Town Red", artist: "Doja Cat", tags: "힙합, 악마, 강렬함, 중독성" },
    { id: 203, title: "Vampire", artist: "Olivia Rodrigo", tags: "감정, 폭발, 이별, 락발라드" },
    { id: 204, title: "What Was I Made For?", artist: "Billie Eilish", tags: "바비, OST, 우울, 감성, 위로" },
    { id: 205, title: "Dance The Night", artist: "Dua Lipa", tags: "바비, 댄스, 디스코, 신남" }
];

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        // [수정] 프론트엔드에서 isKorean 정보를 받음
        const { keyword, wish, isKorean } = await req.json(); 
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
        }

        const dbString = JSON.stringify(SONG_DATABASE.map(s => ({ id: s.id, title: s.title, artist: s.artist, tags: s.tags })));
        
        // [수정] 언어에 따른 프롬프트 지시사항
        const langInstruction = isKorean
            ? "3. Output Language: 'title', 'artist', 'reason' MUST be in **Korean**. (Reason should be warm and polite '해요체')"
            : "3. Output Language: 'title', 'artist', 'reason' MUST be in **English**. Translate the song title and artist to their official English names if they are in Korean.";

        const finalPrompt = `
        Role: Music Recommendation Expert.
        
        [User Data]
        - Keyword: "${keyword}"
        - Wish: "${wish}"

        [Song Database]
        ${dbString}

        [Mission]
        Analyze the user's wish and keyword, then select the ONE song from the [Song Database] that best matches the mood.
        
        [Rules]
        1. YOU MUST PICK FROM THE DATABASE.
        2. Match the user's wish emotion with the song's tags.
        ${langInstruction}
        4. Output ONLY JSON format.
        
        [Output Format]
        { 
            "id": (number), 
            "title": "(Song title in target language)",
            "artist": "(Artist name in target language)",
            "reason": "(Reason in target language, max 2 sentences)" 
        }
        `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: finalPrompt }],
                temperature: 0.7, 
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        let aiSelection;
        try {
            aiSelection = JSON.parse(data.choices[0].message.content);
        } catch (e) {
            const randomId = Math.floor(Math.random() * SONG_DATABASE.length) + 1;
            aiSelection = { id: randomId, reason: isKorean ? "행운이 가득하시길!" : "Good luck!" };
        }

        // DB에서 원본 데이터 찾기 (이미지 검색용)
        let selectedSong = SONG_DATABASE.find(s => s.id === aiSelection.id);
        if (!selectedSong) {
            selectedSong = SONG_DATABASE[0];
        }

        // [수정] 결과 객체 생성: AI가 번역해준 제목/가수가 있으면 그것을 우선 사용
        let result = {
            title: aiSelection.title || selectedSong.title, // AI 번역값 우선
            artist: aiSelection.artist || selectedSong.artist, // AI 번역값 우선
            reason: aiSelection.reason,
            img_url: "record.png" 
        };

        // 이미지 검색 (Deezer에는 원본 DB의 영어/한국어 섞인 제목으로 검색해야 정확함)
        try {
            const query = `artist:"${selectedSong.artist}" track:"${selectedSong.title}"`;
            let searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                result.img_url = searchData.data[0].album.cover_xl;
            } else {
                let looseRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(selectedSong.artist + " " + selectedSong.title)}`);
                let looseData = await looseRes.json();
                if (looseData.data && looseData.data.length > 0) {
                    result.img_url = looseData.data[0].album.cover_xl;
                }
            }
        } catch (e) { 
            console.error("Deezer API Error:", e);
        }

        return new Response(JSON.stringify({
            choices: [{ message: { content: JSON.stringify(result) } }]
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
