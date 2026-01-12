---
layout: page
title: 검색 결과
permalink: /search/
---

<div class="search-container">
  <div class="search-input-wrapper">
    <input
      type="search"
      id="search-input"
      placeholder="검색어를 입력하세요..."
      autocomplete="off"
      aria-label="검색어 입력"
    />
  </div>

  <div id="search-results" class="search-results">
    <p class="search-info">검색어를 입력하면 결과가 표시됩니다.</p>
  </div>
</div>

<script src="{{ '/assets/js/vendor/simple-jekyll-search.min.js' | relative_url }}"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>

<style>
.search-container {
  max-width: 760px;
  margin: 0 auto;
}

.search-input-wrapper {
  margin-bottom: 2rem;
}

#search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid var(--code-border, #e1e4e8);
  border-radius: 6px;
  transition: border-color 0.2s;
}

#search-input:focus {
  outline: none;
  border-color: var(--brand, #0F4C81);
}

.search-results {
  min-height: 200px;
}

.search-info {
  color: #6a737d;
  text-align: center;
  padding: 2rem 0;
  font-style: italic;
}

.search-result-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--code-border, #e1e4e8);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.search-result-title a {
  color: var(--text-color, #24292e);
  text-decoration: none;
}

.search-result-title a:hover {
  color: var(--brand, #0F4C81);
}

.search-result-meta {
  color: #6a737d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.search-result-meta .date {
  margin-right: 1rem;
}

.search-result-meta .category {
  display: inline-block;
  background-color: var(--code-bg, #f6f8fa);
  padding: 2px 8px;
  border-radius: 3px;
  margin-right: 0.5rem;
  font-size: 0.85rem;
}

.search-result-excerpt {
  color: #586069;
  line-height: 1.6;
}

@media screen and (max-width: 600px) {
  .search-result-title {
    font-size: 1.25rem;
  }

  .search-result-meta {
    font-size: 0.85rem;
  }
}
</style>
