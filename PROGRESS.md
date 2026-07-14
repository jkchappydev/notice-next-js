# 진행상황

> 컴퓨터 간 작업 인계용 문서. 완료된 항목은 계속 쌓아두지 않고, 끝나면 이 파일에서 지운다.

## 완료된 작업

- 공지사항 CRUD 전체 구현: 목록/상세/작성/수정/삭제 페이지, Server Actions 기반
- 제목/내용 유효성 검사: 클라이언트(`required`, `maxLength={20}`) + 서버(trim/length 체크) + DB 레벨(`@db.VarChar(20)` 마이그레이션) 3중 검증
- 재사용 컴포넌트 추출: `SubmitButton`, `DeleteButton`, `CancelButton`, `LinkButton`, `BackLinkButton` — 전부 `label`/`href`/`message` props로 일반화
- 공통 레이아웃(app-shell) 완성: `Header`(상단 고정) / `Sidebar`(좌측, 구분선이 Footer까지 이어짐) / `Footer`(하단 고정), 가운데 `max-w-4xl mx-auto` 패널 + `overflow-y-auto` 스크롤 영역
- 날짜 표시 공통 유틸 `src/lib/formatDate.ts` 추가 — 오늘 작성글은 시간(HH:MM, 24시간제), 아니면 날짜로 표시. 목록 페이지 우측 정렬로 적용 완료
- 제목 글자 수 카운터: `src/components/TitleInput.tsx`에 `useState`로 글자 수(N/20자) 실시간 표시, 등록/수정 페이지에 적용 — 클라이언트 상태 관리 첫 예제. Notion에도 정리함

## 다음 진행 예정

- **목록 검색 필터 (진행 중)**
- 1차로 `src/components/NoticeList.tsx`에 `useState` 기반 client-side filter(`notices.filter(title.includes(search))`)로 구현하고 동작 확인까지 완료함
- 이후 "데이터가 수천 건 이상이면 client-side filter는 비효율적" 논의 끝에, Prisma `where`(`contains` + `mode: "insensitive"`) 기반 서버 사이드 검색으로 전환하기로 결정함 — 제출(Enter/버튼) 시에만 검색, 페이지네이션은 아직 안 함
- 전환 방법: `page.tsx`에 `searchParams`(Promise) 추가해서 `?q=` 쿼리로 `where` 조건 구성, 검색 input은 일반 GET `<form>`(JS 불필요)으로 처리. 상태가 `useState`가 아니라 URL로 옮겨가므로 `NoticeList.tsx`는 삭제하고 `page.tsx`에 재통합 예정
- 가이드까지 전달됨, 아직 사용자가 코드에 적용 전