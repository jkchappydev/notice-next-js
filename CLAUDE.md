## 작업 방식
- 이 프로젝트에서는 superpowers 플러그인을 사용하지 않는다.  
  brainstorming/writing-plans/TDD/subagent-driven-development 등
  superpowers의 스킬을 자동으로 호출하지 않는다.
  ```
  /plugin disable superpowers --scope local
  ```
  명령으로 이미 비활성화 설정됨.  
  (다른 컴퓨터에서 이 프로젝트를 열 경우, local scope 설정은 공유되지 않으므로 동일 명령을 다시 실행할 것)
- 새로운 대화 세션이 열리면, 작업 시작 전에 PROGRESS.md를 확인한다.
- PROGRESS.md는 진행상황을 계속 누적시키는 로그가 아니라 컴퓨터 간 작업 인계용 스냅샷이다. 항목이 끝나면 그 내용을 PROGRESS.md에서 제거한다.
- PROGRESS.md는 "## 완료된 작업", "## 다음 진행 예정" 두 섹션 구조를 유지한다.
- 코드는 기본적으로 사용자가 직접 작성한다. Claude는 구현하지 않고 가이드·설명·리뷰만 한다.
  - 예외: CSS/레이아웃 작업은 사용자가 "이 css는 너가 수정해줘"라고 명시적으로 요청했으므로, 이후 CSS/레이아웃 관련 작업은 Claude가 직접 수정해도 된다.
- git commit은 사용자가 직접 실행한다. Claude는 커밋 메시지만 작성해서 제안하고, 스테이징(`git add`)도 요청받았을 때만 한다. `git commit`은 Claude가 직접 실행하지 않는다.
- Notion 문서 동기화는 사용자가 "노션에 정리해줘"처럼 명시적으로 요청했을 때만 한다. 다른 작업의 부수 효과로 자동으로 정리하지 않는다.

## 개발 환경
- 기술 스택: Next.js 16 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL(Docker)
- DB 컨테이너 최초 실행 (컴퓨터마다 한 번씩 필요, docker-compose 없음):
  ```
  docker run --name notice-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
  ```
  이후에는 `docker start notice-db`로 재시작하면 됨
- `.env`는 gitignore되어 있어 git에 포함되지 않음. 새 컴퓨터에서는 아래 값으로 직접 생성:
  ```
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notice_board"
  ```
- DB 준비 후 스키마 반영: `npx prisma migrate dev` (DATABASE_URL의 `notice_board` DB가 없으면 자동 생성 후 마이그레이션까지 적용됨. `migrate deploy`는 DB가 이미 있어야 동작하므로 최초 세팅에는 쓰지 말 것)
- 자주 쓰는 명령어
  - `npm run dev` — 개발 서버
  - `npx prisma migrate dev --name <이름>` — 마이그레이션 생성/적용
  - `npx prisma generate` — Prisma Client 재생성 (마이그레이션 후 dev 서버가 이미 떠 있었다면 재시작도 필요)
- (Windows 한정) `prisma migrate dev`에서 y/n 확인 프롬프트가 뜨는 경우 Git Bash가 아니라 PowerShell에서 실행할 것 (Git Bash는 non-interactive로 인식되어 프롬프트 처리가 안 되는 이력이 있었음)