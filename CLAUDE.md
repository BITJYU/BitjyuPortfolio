# Portfolio Project - Claude Context

## 프로젝트 개요
IT & AI 전공 개발자의 개인 포트폴리오 사이트.
목표 직군: **백엔드 개발자 + AI 엔지니어**

## 기술 스택
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: 순수 CSS (외부 UI 라이브러리 없음)
- **Design**: Glassmorphism (다크 테마)

## 아키텍처 원칙
- `App.tsx`는 import/render만 담당 — 로직/state 없음
- 모든 구현은 `src/components/` 아래 각 섹션별 파일로 분리
- 각 component는 `.tsx` + `.css` 쌍으로 구성

## 섹션 구성 (순서)
1. Navbar
2. Hero
3. About Me
4. Skills
5. Projects
6. Games ← 게임 개발 섹션 (포트폴리오 차별화 요소)
7. Contact
8. Footer

## 개발자 보유 기술 (Skills 섹션 데이터)
- **Languages**: Python, JavaScript, TypeScript
- **Frontend**: React
- **Backend**: Node.js
- **Backend/DB**: MongoDB, MySQL, Oracle
- **Cloud/DevOps**: GCP, AWS, Server Deployment
- **AI/ML**: PyTorch, LoRA Fine-tuning, Hugging Face

## Games 섹션 특이사항
- 직접 제작한 게임 웹사이트 (live)
- AI Enemy & NPC Game — LLM/강화학습 기반 (개발 중)
- `status: 'live' | 'in-development'` 뱃지 표시
- AI 기능은 별도 하이라이트 스타일로 강조

## Hero 타이핑 텍스트
```
['Backend Developer', 'AI Engineer', 'ML Model Builder & Deployer']
```

## 디자인 토큰
- Background: `linear-gradient(135deg, #0a0a1a, #0d0d20, #1a0a2e)`
  - PC: `background-attachment: fixed`
  - Mobile/iOS: `background-attachment: scroll` (@media max-width: 768px)
- Accent: `#6366f1` (indigo), `#8b5cf6` (violet)
- Glass card: `rgba(255,255,255,0.05)` bg, `blur(16px)`, `rgba(255,255,255,0.10)` border

## 주의사항
- TypeScript strict mode: `noUnusedLocals`, `noUnusedParameters` 활성화
- React 19 StrictMode: useEffect timer는 반드시 `useRef`로 보관 + cleanup `clearTimeout`
- `backdrop-filter`는 `-webkit-backdrop-filter`도 함께 작성
- 이름/GitHub/이메일은 placeholder로 남겨두고 나중에 교체

## 플랜 파일
`C:\Users\whtna\.claude\plans\happy-brewing-hickey.md`
