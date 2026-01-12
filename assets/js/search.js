/**
 * Simple Jekyll Search 초기화
 */
(function() {
  'use strict';

  // 검색 입력 요소와 결과 컨테이너
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) {
    console.error('Search elements not found');
    return;
  }

  // 결과 템플릿
  var resultTemplate = `
    <div class="search-result-item">
      <h3 class="search-result-title">
        <a href="{url}">{title}</a>
      </h3>
      <div class="search-result-meta">
        <span class="date">{date}</span>
        {categories}
      </div>
      <p class="search-result-excerpt">{excerpt}</p>
    </div>
  `;

  // 검색어가 없을 때 메시지
  var noResultsText = '<p class="search-info">검색 결과가 없습니다.</p>';

  // SimpleJekyllSearch 초기화
  var searchInstance = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: searchResults,
    json: '/search.json',
    searchResultTemplate: resultTemplate,
    noResultsText: noResultsText,
    limit: 20,
    fuzzy: false,
    exclude: [],
    // 검색할 필드 지정 (title, tags, categories, content 모두 검색)
    searchFields: ['title', 'tags', 'categories', 'content'],

    // JSON 로드 성공 시 콜백
    success: function() {
      console.log('Search data loaded successfully');
    },

    // 템플릿 변수 처리
    templateMiddleware: function(prop, value, template) {
      // categories를 태그로 변환
      if (prop === 'categories') {
        if (Array.isArray(value) && value.length > 0) {
          return value.map(function(cat) {
            return '<span class="category">' + cat + '</span>';
          }).join('');
        }
        return '';
      }
      return value;
    }
  });

  // 디버깅: 검색 실행 시 로그
  var originalSearch = searchInstance.search;
  searchInstance.search = function(query) {
    console.log('Searching for:', query);
    var results = originalSearch.call(this, query);
    console.log('Results found:', results ? results.length : 0);
    return results;
  };

  // URL 쿼리 파라미터에서 검색어 가져오기
  function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // 페이지 로드 시 URL에서 검색어 확인
  var initialQuery = getQueryParam('q');
  if (initialQuery) {
    searchInput.value = initialQuery;
    // SimpleJekyllSearch가 input 이벤트 리스너를 등록한 후 실행하도록 약간의 지연
    setTimeout(function() {
      // input과 keyup 이벤트 모두 트리거
      var inputEvent = new Event('input', { bubbles: true });
      var keyupEvent = new Event('keyup', { bubbles: true });
      searchInput.dispatchEvent(inputEvent);
      searchInput.dispatchEvent(keyupEvent);
    }, 100);
  } else {
    // 검색어가 없으면 포커스
    searchInput.focus();
  }

  // 검색 입력 이벤트 - 초기 안내 문구 제거
  searchInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
      searchResults.innerHTML = '<p class="search-info">검색어를 입력하면 결과가 표시됩니다.</p>';
    }
  });

  // 엔터키로 검색 (이미 자동 검색되지만 UX 향상)
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
})();
