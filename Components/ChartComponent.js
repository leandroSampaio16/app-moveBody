import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Adjust the width based on your chart container
const screenWidth = Dimensions.get('window').width;

const ChartComponent = ({ data, selectedPart, avlFm, colors }) => {
  
  // Transform your data as needed 

  const dataLine = !avlFm ? data.testeForca : data.medidas
  console.log("$$$$$$$$$$$")
  console.log(selectedPart)
  console.log(dataLine[0][selectedPart])
  console.log("$$$$$$$$$$$")

  if(dataLine && dataLine[0][selectedPart]){

  
  const transformedData = [
    { 
      id: selectedPart,
      data: dataLine.map((measure) => ({
        x: measure.DataAvaliacao ? measure.DataAvaliacao : [] ,
        y: measure[selectedPart] ? measure[selectedPart] : [],
      })),
    },
  ];
  console.log("-------")
  transformedData[0].data.map((item) => console.log(item.y))
console.log(transformedData[0].data)
console.log("-------")
  return (
    <LineChart
    data={{
      labels: transformedData[0].data.map((item) => item.x),
  datasets: [
    {
      data:  transformedData[0].data.map((item) => item.y),
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: [selectedPart] // optional
    }}
      width={screenWidth}
      height={220}
  
      withInnerLines={false}
      withOuterLines={false}
      chartConfig={{
        backgroundColor:"grey",
        backgroundGradientFrom: colors.blueAccent[400],
        backgroundGradientTo: "grey",
        decimalPlaces: 2,
        color: (opacity = 1) => colors.background[100], // Change color as needed
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
    }
};

export default ChartComponent;
