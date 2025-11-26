const API_BASE_URL = import.meta.env.VITE_API_URL;
import React, { useState } from 'react'; // useEffect, axios 삭제
// import axios from 'axios'; // 삭제
import './App.css'
import StockChart from './StockChart'; // 1. 방금 만든 차트 컴포넌트 불러오기
import StockSearch from './StockSearch';
import logoImage from './assets/ssaicon.png';

// 1. 백엔드에서 주기로 한 것과 똑같은 모양의 가짜 데이터를 만듭니다.
const mockAppleData = {
    "stockDetailsDto": {
        "ticker": "AAPL",
        "price": 268.4700,
        "currency": "USD",
        "open": 269.7950,
        "high": 272.2900,
        "low": 266.7700,
        "volume": 48227365,
        "latestTradingDay": "2025-11-07",
        "previousClose": 269.7700,
        "change": -1.3000,
        "changePercent": "-0.4819%",
        "name": "Apple Inc",
        "description": "Apple Inc. is a leading American multinational technology company that specializes in innovative consumer electronics, software, and online services. With a record revenue of $274.5 billion in 2020, it holds the title of the world's most valuable publicly traded company and is a dominant force in the global technology landscape. Its flagship products, such as the iPhone, iPad, and Mac, have cemented its reputation as a trailblazer in the sector, positioning it as the fourth-largest PC vendor and smartphone manufacturer worldwide. As a cornerstone of the \"Big Five\" technology companies, Apple continues to set industry standards and drive advancements in technology and consumer engagement.",
        "industry": "CONSUMER ELECTRONICS",
        "sector": "TECHNOLOGY",
        "marketCapitalization": 3967007326000,
        "peRatio": 35.99,
        "dividendYield": 0.0038,
        "week52High": 277.05,
        "week52Low": 168.63
    },
    "llmResponse": {
        "list": [
            "Apple Inc.",
            "technology company",
            "iPhone",
            "iPad",
            "Mac"
        ]
    },
    "summaryStock": {
        "good": "좋은거",
        "bad": "나쁜거",
        "neutrality": "중립"
    },

    "priceHistory": [
        { "date": "2025-10-30", "close": 271.40 },
        { "date": "2025-10-31", "close": 270.37 },
        { "date": "2025-11-01", "close": 270.37 },
        { "date": "2025-11-02", "close": 270.37 },
        { "date": "2025-11-03", "close": 269.05 },
        { "date": "2025-11-04", "close": 270.04 },
        { "date": "2025-11-05", "close": 270.14 },
        { "date": "2025-11-06", "close": 269.77 },
        { "date": "2025-11-07", "close": 268.47 }
    ]
};

const mockSamsungData = {
    "stockDetailsDto": {
        "ticker": "005930",
        "price": 85000.00,
        "currency": "KRW",
        "open": 84500.00,
        "high": 85200.00,
        "low": 84300.00,
        "volume": 15000000,
        "latestTradingDay": "2025-11-07",
        "previousClose": 84500.00,
        "change": 500.00,
        "changePercent": "0.59%",
        "name": "Samsung Electronics",
        "description": "Samsung Electronics Co., Ltd. is a South Korean multinational electronics corporation headquartered in Yeongtong-gu, Suwon, South Korea. It is the pinnacle of the Samsung chaebol, accounting for 70% of the group's revenue in 2012.",
        "industry": "SEMICONDUCTORS",
        "sector": "TECHNOLOGY",
        "marketCapitalization": 500000000000000,
        "peRatio": 20.5,
        "dividendYield": 0.02,
        "week52High": 90000,
        "week52Low": 65000
    },
    "llmResponse": {
        "list": [
            "Samsung Electronics",
            "Semiconductor",
            "HBM",
            "Galaxy",
            "Memory"
        ]
    },
    "summaryStock": {
        "good": "HBM 시장 점유율 확대 기대",
        "bad": "파운드리 경쟁 심화",
        "neutrality": "스마트폰 시장 포화"
    },
    "priceHistory": [
        { "date": "2025-10-30", "close": 83000 },
        { "date": "2025-10-31", "close": 83500 },
        { "date": "2025-11-03", "close": 84000 },
        { "date": "2025-11-04", "close": 83800 },
        { "date": "2025-11-05", "close": 84200 },
        { "date": "2025-11-06", "close": 84500 },
        { "date": "2025-11-07", "close": 85000 }
    ]
};


function App() {
    // 2. 이 데이터를 'stockData'라는 state로 관리합니다.
    const [stockData, setStockData] = useState(mockAppleData);

    // 3. 검색 시 실행될 함수 (지금은 가짜 데이터라 큰 의미는 없지만 구조는 유지)
    const handleSearch = (searchQuery) => {
        console.log("App.jsx가 받은 검색어:", searchQuery);
        const query = searchQuery.toUpperCase().trim();

        if (query.includes("AAPL") || query.includes("APPLE") || query.includes("애플")) {
            setStockData(mockAppleData);
        } else if (query.includes("005930") || query.includes("SAMSUNG") || query.includes("삼성")) {
            setStockData(mockSamsungData);
        } else {
            alert("검색어에 해당하는 데이터를 찾을 수 없습니다. 'AAPL' 또는 '005930'을 입력해보세요.");
        }
        // 나중에 실제 API 연동 시, 이 searchQuery로 API를 호출하고
        // setStockData(apiResponse.data)를 실행하면 됩니다.
    };

    // 4. 숫자 포맷팅을 위한 헬퍼 함수
    const formatCurrency = (num, currencyCode) => {
        // 'en-US' (미국) 또는 'ko-KR' (한국) 로케일 설정
        const locale = currencyCode === 'KRW' ? 'ko-KR' : 'en-US';

        try {
            return num.toLocaleString(locale, {
                style: 'currency',
                currency: currencyCode,
                // KRW는 소수점이 필요 없으므로, USD일 때만 소수점 2자리를 강제
                minimumFractionDigits: currencyCode === 'USD' ? 2 : 0,
                maximumFractionDigits: currencyCode === 'USD' ? 2 : 0,
            });
        } catch (e) {
            // 혹시 모를 에러 대비
            console.error("Currency formatting error:", e);
            // 기본값 반환
            return `${currencyCode} ${num}`;
        }
    };

    // 5. 가격 변동에 따라 색상을 결정하는 헬퍼 함수
    const getChangeColor = (change) => {
        if (change > 0) return 'green'; // 상승 (팀원과 색상 논의)
        if (change < 0) return 'red';   // 하락
        return 'gray'; // 보합
    };

    // 6. JSON 데이터가 많으니 변수로 미리 빼두면 편합니다.
    const details = stockData.stockDetailsDto;
    const summary = stockData.summaryStock;
    const keywords = stockData.llmResponse.list;
    const changeColor = getChangeColor(details.change);
    const priceHistoryData = stockData.priceHistory;

    return (
        <div className="app-container">
            <header className="app-header">
                <img src={logoImage} alt="주식 예측 서비스 로고" className="app-logo" />
                <StockSearch onSearch={handleSearch} />
            </header>

            <main className="app-content">

                {/* ✨ [1] '메인 컨텐츠' (왼쪽) div 생성 */}
                <div className="main-content">

                    {/* --- 8. 차트 표시 --- */}
                    <section className="stock-chart" style={{ marginTop: '20px' }}>
                        <StockChart chartData={priceHistoryData} />
                    </section>

                    {/* --- 10. 기업 정보 표시 --- */}
                    <section className="stock-description" style={{ marginTop: '30px' }}>
                        <h3>기업 정보</h3>
                        <p><strong>Sector:</strong> {details.sector} / <strong>Industry:</strong> {details.industry}</p>
                        <p>{details.description}</p>
                    </section>

                    {/* --- 11. LLM 키워드 표시 --- */}
                    <section className="stock-keywords" style={{ marginTop: '30px' }}>
                        <h3>주요 키워드 (LLM)</h3>
                        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0, flexWrap: 'wrap' }}>
                            {keywords.map((keyword, index) => (
                                <li key={index} style={{ backgroundColor: '#E8DFCA', padding: '8px 12px', borderRadius: '20px', fontSize: '14px' }}>
                                    {keyword}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* ✨ [2] '사이드바' (오른쪽) div 생성 */}
                <div className="sidebar-content">

                    {/* --- 7. 기본 정보 및 가격 표시 (사이드바로 이동) --- */}
                    <section className="stock-header">
                        <h2>{details.name} ({details.ticker})</h2>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                            <h1 style={{ margin: 0, fontSize: '48px' }}>
                                {formatCurrency(details.price, details.currency)}
                            </h1>
                            <span style={{ color: changeColor, fontSize: '24px', fontWeight: 'bold', paddingBottom: '5px' }}>
                                {formatCurrency(details.change, details.currency)} ({details.changePercent})
                            </span>
                        </div>
                        <p style={{ color: '#555' }}>Latest Trading Day: {details.latestTradingDay}</p>
                    </section>

                    {/* --- 9. AI 분석 요약 표시 (사이드바로 이동) --- */}
                    <section className="stock-analysis" style={{ marginTop: '30px' }}>
                        <h3>AI 분석 요약</h3>
                        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>👍 Good:</strong> {summary.good}</p>
                            <p><strong>👎 Bad:</strong> {summary.bad}</p>
                            <p><strong>😐 Neutral:</strong> {summary.neutrality}</p>
                        </div>
                    </section>

                    {/* ✨ [3] (추가) 남는 데이터를 활용한 '주요 통계' 섹션 */}
                    <section className="stock-stats" style={{ marginTop: '30px' }}>
                        <h3>Key Statistics</h3>
                        <div className="stats-grid">
                            <div><strong>Market Cap:</strong> {formatCurrency(details.marketCapitalization, details.currency)}</div>
                            <div><strong>P/E Ratio:</strong> {details.peRatio.toFixed(2)}</div>
                            <div><strong>Dividend Yield:</strong> {(details.dividendYield * 100).toFixed(2)}%</div>
                            <div><strong>52-Week High:</strong> {formatCurrency(details.week52High, details.currency)}</div>
                            <div><strong>52-Week Low:</strong> {formatCurrency(details.week52Low, details.currency)}</div>
                            <div><strong>Volume:</strong> {details.volume.toLocaleString()}</div>
                        </div>
                    </section>

                </div>

            </main>
        </div>
    );
}

export default App;