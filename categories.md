---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories-container">
  {% assign categories = site.categories | sort %}
  {% if categories.size > 0 %}
    <p class="categories-intro">{{ site.categories.size }}개의 카테고리에 {{ site.posts.size }}개의 포스트가 있습니다.</p>

    {% for category in categories %}
      {% assign category_name = category[0] %}
      {% assign posts = category[1] %}

      <div class="category-section" id="{{ category_name | slugify }}">
        <h2 class="category-title">
          {{ category_name }}
          <span class="category-count">{{ posts.size }}</span>
        </h2>

        <ul class="category-post-list">
          {% for post in posts %}
            <li class="category-post-item">
              <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
              <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title | escape }}</a>
            </li>
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  {% else %}
    <p class="no-categories">아직 작성된 포스트가 없습니다.</p>
  {% endif %}
</div>

<style>
.categories-container {
  max-width: 760px;
  margin: 0 auto;
}

.categories-intro {
  color: #6a737d;
  font-size: 0.95rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--code-border, #e1e4e8);
}

.category-section {
  margin-bottom: 3rem;
}

h2.category-title {
  font-size: 1.25rem !important;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color, #24292e);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-count {
  font-size: 1rem;
  font-weight: 400;
  color: #6a737d;
  background-color: var(--code-bg, #f6f8fa);
  padding: 2px 10px;
  border-radius: 12px;
}

.category-post-list {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.category-post-item {
  display: flex;
  align-items: baseline;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--code-border, #e1e4e8);
  gap: 1rem;
}

.category-post-item:last-child {
  border-bottom: none;
}

.category-post-item .post-date {
  color: #6a737d;
  font-size: 0.9rem;
  font-family: 'Monaco', 'Menlo', monospace;
  flex-shrink: 0;
  min-width: 90px;
}

.category-post-item .post-title {
  color: var(--text-color, #24292e);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  transition: color 0.2s;
}

.category-post-item .post-title:hover {
  color: var(--brand, #0F4C81);
}

.no-categories {
  text-align: center;
  color: #6a737d;
  padding: 3rem 0;
  font-style: italic;
}

@media screen and (max-width: 600px) {
  h2.category-title {
    font-size: 1.1rem !important;
  }

  .category-post-item {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }

  .category-post-item .post-date {
    min-width: auto;
    font-size: 0.85rem;
  }
}
</style>
