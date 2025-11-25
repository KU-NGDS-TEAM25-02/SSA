// src/StockChart.jsx (최종 테스트 버전)

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ✨ 1. App.jsx의 'priceHistory' 데이터를 여기에 *직접* 복사합니다.
//    (이름은 testChartData로 바꿨습니다)
//const testChartData = [
//    { "date": "2025-10-30", "close": 260.50 },
//    { "date": "2025-10-31", "close": 262.30 },
//    { "date": "2025-11-03", "close": 265.00 },
//    { "date": "2025-11-04", "close": 267.80 },
//    { "date": "2025-11-05", "close": 270.10 },
//    { "date": "2025-11-06", "close": 269.77 },
//    { "date": "2025-11-07", "close": 268.47 }
//];

// ✨ 2. { chartData } props를 받지 않는 *기본* 함수로 되돌립니다.
function StockChart({ chartData }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                // ✨ 3. 위에서 만든 'testChartData'를 사용합니다.
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                {/* ✨ 4. X/Y축 키를 'date'와 'close'로 맞춥니다. */}
                <XAxis dataKey="date" />
                {/* ✨ 5. Y축 domain은 '일직선' 문제 고친 버전(-5)을 씁니다. */}
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />

                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="close" // ✨ 'close' 키
                    stroke="#fcab40ff" // 선 색상
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default StockChart;
//import React from 'react';
//import {
//  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
//} from 'recharts';

//// 1. 차트를 위한 가짜 시계열 데이터
//// (나중에는 이 데이터를 백엔드 API에서 받아와야 합니다.)
//const chartData = [
//  { name: '10일 전', price: 271.40 },
//  { name: '9일 전', price: 270.37 },
//  { name: '8일 전', price: 269.05 },
//  { name: '7일 전', price: 270.04 },
//  { name: '6일 전', price: 270.14 },
//  { name: '5일 전', price: 269.77 },
//  { name: '4일 전', price: 268.47 },
//  { name: '3일 전', price: 269.43 },
//  { name: '2일 전', price: 275.25 },
//  { name: '1일 전', price: 273.47 },
//];

//function StockChart() {
//  return (
//    // ResponsiveContainer: 차트가 부모 요소의 크기에 맞춰 자동으로 반응형이 되도록 함
//    <ResponsiveContainer width="100%" height={300}>
//      <LineChart
//        data={chartData} // 1번에서 만든 가짜 데이터를 여기에 연결
//        margin={{
//          top: 5, right: 30, left: 20, bottom: 5,
//        }}
//      >
//        <CartesianGrid strokeDasharray="3 3" />
//        <XAxis dataKey="name" /> {/* X축은 'name' 키를 사용 */}
//        <YAxis domain={['dataMin - 5', 'dataMax + 5']} /> {/* Y축 범위 자동 조절 */}
//        <Tooltip /> {/* 마우스를 올리면 정보 표시 */}
//        <Legend />
//        <Line 
//          type="monotone" 
//          dataKey="price" // Y축 값은 'price' 키를 사용
//          stroke="#fcab40ff" // 선 색상
//          activeDot={{ r: 8 }} 
//        />
//      </LineChart>
//    </ResponsiveContainer>
//  );
//}

//export default StockChart;