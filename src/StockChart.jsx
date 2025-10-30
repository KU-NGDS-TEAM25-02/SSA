import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// 1. 차트를 위한 가짜 시계열 데이터
// (나중에는 이 데이터를 백엔드 API에서 받아와야 합니다.)
const chartData = [
  { name: '10일 전', price: 81000 },
  { name: '9일 전', price: 81500 },
  { name: '8일 전', price: 82000 },
  { name: '7일 전', price: 81200 },
  { name: '6일 전', price: 83000 },
  { name: '5일 전', price: 82500 },
  { name: '4일 전', price: 84000 },
  { name: '3일 전', price: 83800 },
  { name: '2일 전', price: 84500 },
  { name: '1일 전', price: 85000 },
];

function StockChart() {
  return (
    // ResponsiveContainer: 차트가 부모 요소의 크기에 맞춰 자동으로 반응형이 되도록 함
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData} // 1번에서 만든 가짜 데이터를 여기에 연결
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" /> {/* X축은 'name' 키를 사용 */}
        <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} /> {/* Y축 범위 자동 조절 */}
        <Tooltip /> {/* 마우스를 올리면 정보 표시 */}
        <Legend />
        <Line 
          type="monotone" 
          dataKey="price" // Y축 값은 'price' 키를 사용
          stroke="#fcab40ff" // 선 색상
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;