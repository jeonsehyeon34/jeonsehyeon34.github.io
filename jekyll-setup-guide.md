# study-log 2026 — 최종 파일 구조 및 코드

기간: 2026.08.06 ~ 2026.09.06 (32일)

## 폴더 구조

```
jeonsehyeon34.github.io/
├── _config.yml
├── Gemfile
├── index.html
├── _data/
│   └── plan.yml
├── _posts/
│   ├── 2026-08-06-day1.md
│   ├── 2026-08-07-day2.md
│   └── 2026-08-08-day3.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── calendar.js
    └── log/
        ├── day1-start.jpg
        ├── day1-end.jpg
        └── ...
```

---

## `_config.yml`

```yaml
title: study-log 2026
description: 포스코 AI·빅데이터 아카데미 준비 기록
```

---

## `Gemfile`

로컬 미리보기(`jekyll serve`)를 위한 파일. GitHub Pages 자체 빌드에는 필요 없음.

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
```

---

## `_data/plan.yml`

```yaml
start_date: 2026-08-06
end_date: 2026-09-06
```

---

## `_posts/2026-08-06-day1.md`

파일명 형식 `연-월-일-제목.md` 필수. `day:` 필드는 넣지 않음 (파일명 날짜로 자동 계산).

```markdown
---
start_time: "09:03"
end_time: "18:12"
start_photo: /assets/log/day1-start.jpg
end_photo: /assets/log/day1-end.jpg
---
- 사전학습 MOOC 파이썬 프로그래밍 Part1 시작
```

## `_posts/2026-08-07-day2.md`

```markdown
---
start_time: "09:00"
end_time: "18:07"
start_photo: /assets/log/day2-start.jpg
end_photo: /assets/log/day2-end.jpg
media:
  - /assets/log/day2-note.jpg
---
- MOOC 파이썬 프로그래밍 Part1 완료
- 알고리즘 문제풀이 3문제
```

## `_posts/2026-08-08-day3.md`

```markdown
---
start_time: "09:05"
end_time: "18:15"
start_photo: /assets/log/day3-start.jpg
end_photo: /assets/log/day3-end.jpg
media:
  - /assets/log/day3-note.jpg
  - /assets/log/day3-lecture.jpg
---
- MOOC 파이썬 프로그래밍 Part2 진행
- 선형대수 - 고윳값·고유벡터 개념 정리
```

새 날짜를 추가할 때마다 이 형식 그대로 파일만 새로 만들면 됩니다.

---

## `index.html`

Day 번호, 진행률, 캘린더 칸 수를 `_data/plan.yml`의 시작일 기준으로 전부 자동 계산합니다.

```html
---
layout: none
---
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>study-log 2026</title>
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
</head>
<body>

{% assign start_ts = site.data.plan.start_date | date: "%s" %}
{% assign end_ts = site.data.plan.end_date | date: "%s" %}
{% assign total_days = end_ts | minus: start_ts | divided_by: 86400 | plus: 1 %}
{% assign done_count = site.posts.size %}
{% assign percent = done_count | times: 100 | divided_by: total_days %}

<header>
  <h1>study-log 2026</h1>
  <p>포스코 AI·빅데이터 아카데미 준비 기록</p>
  <div class="progress-wrap">
    <div class="progress-track"><div class="progress-fill" style="width: {{ percent }}%;"></div></div>
    <span class="progress-label">Day {{ done_count }} / {{ total_days }}</span>
  </div>
</header>

<div class="layout">

  <nav class="calendar">
    <p class="calendar-title">진행 현황</p>
    <div class="calendar-grid">
      {% for n in (1..total_days) %}
        {% assign found = false %}
        {% for post in site.posts %}
          {% assign post_ts = post.date | date: "%s" %}
          {% assign post_day = post_ts | minus: start_ts | divided_by: 86400 | plus: 1 %}
          {% if post_day == n %}{% assign found = true %}{% endif %}
        {% endfor %}
        {% if found %}
          <a href="#day{{ n }}" class="done">{{ n }}</a>
        {% else %}
          <span>{{ n }}</span>
        {% endif %}
      {% endfor %}
    </div>
    <div class="calendar-legend">
      <div><span class="dot done"></span>기록 완료</div>
      <div><span class="dot todo"></span>예정</div>
    </div>
  </nav>

  <div class="feed">
    {% for post in site.posts %}
      {% assign post_ts = post.date | date: "%s" %}
      {% assign post_day = post_ts | minus: start_ts | divided_by: 86400 | plus: 1 %}
      <article class="post" id="day{{ post_day }}">
        <div class="post-head">
          <span class="post-day">Day {{ post_day }}</span>
          <span class="post-meta">{{ post.date | date: "%Y.%m.%d" }} · {{ post.start_time }}–{{ post.end_time }}</span>
        </div>

        <div class="section">
          <p class="section-label">오늘 한 것</p>
          <div class="today-list">{{ post.content }}</div>
        </div>

        {% if post.media %}
        <div class="section">
          <p class="section-label">사진 · 영상</p>
          <div class="media-grid">
            {% for m in post.media %}
              <div class="media-box"><img src="{{ m }}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px;"></div>
            {% endfor %}
          </div>
        </div>
        {% endif %}

        <div class="section">
          <p class="section-label">출결 인증</p>
          <div class="attendance">
            <div class="attend-box">
              <div class="label">출근</div>
              <img src="{{ post.start_photo }}" alt="" style="width:100%;border-radius:6px;margin-bottom:4px;">
              <div class="time">{{ post.start_time }}</div>
            </div>
            <div class="attend-box">
              <div class="label">퇴근</div>
              <img src="{{ post.end_photo }}" alt="" style="width:100%;border-radius:6px;margin-bottom:4px;">
              <div class="time">{{ post.end_time }}</div>
            </div>
          </div>
        </div>
      </article>
    {% endfor %}
  </div>
</div>

<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
</body>
</html>
```

---

## `assets/css/style.css`

```css
:root{
  --bg:#fafaf8;
  --card:#ffffff;
  --border:#e7e5df;
  --text:#1c1c1a;
  --text-sub:#6b6a63;
  --text-mute:#a8a69d;
  --accent:#2f5d50;
  --accent-bg:#e7f0ec;
  --accent-strong:#1e4038;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Pretendard","Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  line-height:1.6;
}
header{
  max-width:920px;
  margin:0 auto;
  padding:40px 20px 20px;
}
header h1{
  font-size:22px;
  font-weight:700;
  margin:0 0 4px;
  letter-spacing:-0.02em;
}
header p{
  font-size:13px;
  color:var(--text-sub);
  margin:0 0 18px;
}
.progress-wrap{
  display:flex;
  align-items:center;
  gap:12px;
}
.progress-track{
  flex:1;
  height:6px;
  background:var(--border);
  border-radius:99px;
  overflow:hidden;
}
.progress-fill{
  height:100%;
  background:var(--accent);
  border-radius:99px;
}
.progress-label{
  font-size:12px;
  font-weight:600;
  color:var(--accent-strong);
  white-space:nowrap;
}

.layout{
  max-width:920px;
  margin:0 auto;
  padding:0 20px 80px;
  display:grid;
  grid-template-columns:180px 1fr;
  gap:24px;
  align-items:start;
}

.calendar{
  position:sticky;
  top:20px;
  background:var(--card);
  border:1px solid var(--border);
  border-radius:14px;
  padding:16px;
}
.calendar-title{
  font-size:13px;
  font-weight:700;
  margin:0 0 12px;
}
.calendar-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:5px;
}
.calendar-grid a, .calendar-grid span{
  aspect-ratio:1/1;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  border-radius:6px;
  text-decoration:none;
  color:var(--text-mute);
  background:var(--bg);
}
.calendar-grid a.done{
  background:var(--accent-bg);
  color:var(--accent-strong);
  font-weight:600;
}
.calendar-grid a.done:hover{
  background:var(--accent);
  color:#fff;
}
.calendar-grid a.active{
  background:var(--accent);
  color:#fff;
  font-weight:700;
}
.calendar-legend{
  margin-top:12px;
  padding-top:12px;
  border-top:1px solid var(--border);
  font-size:11px;
  color:var(--text-mute);
}
.calendar-legend div{margin-bottom:4px;display:flex;align-items:center;gap:6px;}
.dot{width:8px;height:8px;border-radius:2px;display:inline-block;}
.dot.done{background:var(--accent-bg);border:1px solid var(--accent);}
.dot.todo{background:var(--bg);border:1px solid var(--border);}

.feed{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.post{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:16px;
  padding:20px;
  scroll-margin-top:20px;
}
.post-head{
  display:flex;
  align-items:baseline;
  gap:10px;
  margin-bottom:16px;
}
.post-day{
  font-size:17px;
  font-weight:700;
}
.post-meta{
  font-size:12px;
  color:var(--text-sub);
}

.section-label{
  font-size:11px;
  font-weight:700;
  color:var(--text-mute);
  text-transform:uppercase;
  letter-spacing:0.04em;
  margin:0 0 8px;
}
.section{margin-bottom:16px;}
.section:last-child{margin-bottom:0;}

.today-list{
  background:var(--bg);
  border-radius:10px;
  padding:12px 14px;
}
.today-list ul{
  list-style:none;
  margin:0;
  padding:0;
}
.today-list li{
  font-size:14px;
  padding:3px 0;
  display:flex;
  gap:8px;
}
.today-list li::before{
  content:"·";
  color:var(--accent);
  font-weight:700;
}

.media-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
  gap:8px;
}
.media-box{
  aspect-ratio:4/3;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:10px;
  overflow:hidden;
}

.attendance{
  display:flex;
  gap:10px;
}
.attend-box{
  flex:1;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:10px;
  padding:10px;
  text-align:center;
}
.attend-box .label{
  font-size:10px;
  color:var(--text-mute);
  margin-bottom:4px;
}
.attend-box .time{
  font-size:15px;
  font-weight:700;
  color:var(--accent-strong);
}

@media (max-width:640px){
  .layout{grid-template-columns:1fr;}
  .calendar{position:static;}
  .calendar-grid{grid-template-columns:repeat(7,1fr);}
}
```

---

## `assets/js/calendar.js`

```javascript
const posts = document.querySelectorAll('.post');
const links = document.querySelectorAll('.calendar-grid a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.calendar-grid a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
posts.forEach(p => observer.observe(p));
```

---

## 실행 순서

1. 위 파일들을 각 경로에 그대로 생성
2. 저장소 폴더에서 `bundle install` (최초 1회)
3. `bundle exec jekyll serve` 실행
4. `http://localhost:4000` 접속해서 확인
5. 문제없으면 `git add . && git commit -m "Day 3" && git push`

매일 할 일은 `_posts/`에 그날 날짜로 파일 하나 추가하고, `assets/log/`에 사진 넣고, push하는 것뿐입니다.
