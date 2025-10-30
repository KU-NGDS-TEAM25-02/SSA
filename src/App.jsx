import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState } from 'react'; // useEffect, axios 삭제
// import axios from 'axios'; // 삭제
import './App.css'
import StockChart from './StockChart'; // 1. 방금 만든 차트 컴포넌트 불러오기
import StockSearch from './StockSearch';

// 1. 백엔드에서 주기로 한 것과 똑같은 모양의 가짜 데이터를 만듭니다.
const mockStockData = {
  stockName: "삼성전자 (Mock Data)",
  stockCode: "005930",
  price: 85000,
  prediction: "매수 추천",
  // 나중에 백엔드에서 뉴스 목록을 주기로 했다면?
  news: [
    { id: 1, title: "AI 반도체 관련 호재 발생" },
    { id: 2, title: "4분기 실적 예상치 상회" }
  ]
};

function App() {
  // 2. useState의 기본값으로 이 'mockStockData'를 넣어줍니다.
  const [stockData, setStockData] = useState(mockStockData);

  // 3. API 호출, 로딩, 에러 관련 코드는 모두 삭제!
  // useEffect(() => { ... }, []); <-- 이 부분 전체 삭제

  // if (loading) { ... }  <-- 삭제
  // if (error) { ... }   <-- 삭제

  // 4. 데이터가 '무조건' 있다고 가정하고 화면을 그립니다.
  const handleSearch = (searchQuery) => {
    console.log("App.jsx가 받은 검색어:", searchQuery);
    // TODO: 나중에 여기서 searchQuery로 실제 API를 호출해야 함
    // 지금은 임시로 'mockStockData'의 이름을 바꿔보겠습니다.
    setStockData(prevData => ({
      ...prevData,
      stockName: `${searchQuery} (검색됨)`
    }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SSA</h1>
        <StockSearch onSearch={handleSearch} />
      </header>

      <main className="app-content">
        {/* stockData가 항상 있으므로 stockData && ( ... ) 부분은
          그냥 <div>로 바꿔도 됩니다.
        */}
        <div>
          <h2>{stockData.stockName} ({stockData.stockCode})</h2>
          <div style={{ marginTop: '20px' }}>
            <StockChart />
          </div>
          <p>현재 가격: {stockData.price}원</p>
          <p>예측 결과: {stockData.prediction}</p>

          <hr /> 

          {/* 5. 뉴스 목록 같은 추가 데이터도 그려볼 수 있습니다. */}
          <h3>관련 뉴스</h3>
          <ul>
            {stockData.news.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;

// function App() {
//   // 1. 데이터를 저장할 '상태' 만들기
//   // stockData는 데이터, setStockData는 데이터를 변경하는 함수
//   const [stockData, setStockData] = useState(null); // 처음엔 데이터가 없으니 null
//   const [loading, setLoading] = useState(true); // 로딩 중인지 아닌지
//   const [error, setError] = useState(null); // 에러가 났는지

//   // 2. 컴포넌트가 처음 렌더링될 때 API 호출하기
//   useEffect(() => {
//     // 백엔드 API 주소 (임시 예시입니다. 실제 주소로 바꿔야 해요!)
//     const apiUrl = 'http://localhost:8080/api/stock/005930'; // 예: 삼성전자

//     const fetchData = async () => {
//       try {
//         setLoading(true); // 로딩 시작
//         setError(null);
//         // axios를 이용해 GET 요청 보내기
//         const response = await axios.get(apiUrl);
//         // 3. 성공하면 받아온 데이터를 stockData 상태에 저장
//         setStockData(response.data); 
//       } catch (err) {
//         // 4. 실패하면 에러 상태에 저장
//         setError(err); 
//       } finally {
//         setLoading(false); // 로딩 끝
//       }
//     };

//     fetchData(); // 함수 실행
//   }, []); // [] 비어있는 배열: "이 컴포넌트가 처음 로드될 때 딱 한 번만 실행해줘" 라는 뜻

//   // 5. 로딩 중이거나 에러가 났을 때 처리
//   if (loading) {
//     return <div className="app-container">로딩 중입니다...</div>;
//   }
//   if (error) {
//     return <div className="app-container">에러가 발생했습니다: {error.message}</div>;
//   }

//   // 6. 데이터가 성공적으로 왔을 때 화면에 그리기
//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>주식 예측 서비스</h1>
//       </header>
      
//       <main className="app-content">
//         {/* stockData가 있을 때만 이 부분을 보여줌 */}
//         {stockData && (
//           <div>
//             <h2>{stockData.stockName} ({stockData.stockCode})</h2>
//             <p>현재 가격: {stockData.price}원</p>
//             <p>예측 결과: {stockData.prediction}</p>
//             {/* 백엔드에서 주는 데이터 구조에 맞춰서 수정해야 합니다! */}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;