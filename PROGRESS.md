# 진행상황

> 컴퓨터 간 작업 인계용 문서. 완료된 항목은 계속 쌓아두지 않고, 끝나면 이 파일에서 지운다.

## 완료된 작업

- 공지사항 CRUD 전체 구현: 목록/상세/작성/수정/삭제 페이지, Server Actions 기반
- 제목/내용 유효성 검사: 클라이언트(`required`, `maxLength={20}`) + 서버(trim/length 체크) + DB 레벨(`@db.VarChar(20)` 마이그레이션) 3중 검증
- 재사용 컴포넌트 추출: `SubmitButton`, `DeleteButton`, `CancelButton`, `LinkButton`, `BackLinkButton` — 전부 `label`/`href`/`message` props로 일반화
- 공통 레이아웃(app-shell) 완성: `Header`(상단 고정) / `Sidebar`(좌측, 구분선이 Footer까지 이어짐) / `Footer`(하단 고정), 가운데 `max-w-4xl mx-auto` 패널 + `overflow-y-auto` 스크롤 영역
- 날짜 표시 공통 유틸 `src/lib/formatDate.ts` 추가 — 오늘 작성글은 시간(HH:MM, 24시간제), 아니면 날짜로 표시. 목록 페이지 우측 정렬로 적용 완료

## 다음 진행 예정

- **useState 사용해보기**
- 후보: 제목 입력창 글자 수 카운터("3/20자" 실시간 표시) — 기존 `maxLength={20}` 검증과 자연스럽게 연결되는 첫 useState 예제
- 아직 구체적으로 어떤 기능에 적용할지 확정하지 않음
