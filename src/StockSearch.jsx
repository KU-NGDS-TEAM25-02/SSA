import React, { useState } from 'react';

// 1. App.jsx로부터 onSearch 라는 '기능(함수)'을 받아올 준비
function StockSearch({ onSearch }) {
  // 2. 검색창에 입력되는 글자를 기억할 'query'라는 상태(state)
  const [query, setQuery] = useState('');

  // 3. 폼 제출(엔터 키 또는 버튼 클릭) 시 실행될 함수
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    
    if (!query) return; // 입력값이 없으면 아무것도 안 함
    
    // 4. App.jsx에서 받아온 onSearch 함수를 'query'와 함께 실행!
    onSearch(query); 
    
    setQuery(''); // 검색 후 입력창 비우기
  };

  return (
    // 5. 폼(form) 태그로 input과 button을 감싸줌
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <input 
        type="text" 
        placeholder="종목 코드 또는 이름 입력"
        value={query} // 6. 입력창의 값은 'query' 상태와 일치시킴
        onChange={(e) => setQuery(e.target.value)} // 7. 글자 입력 시 'query' 상태 변경
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button type="submit" style={{ padding: '8px' }}>검색</button>
    </form>
  );
}

export default StockSearch;