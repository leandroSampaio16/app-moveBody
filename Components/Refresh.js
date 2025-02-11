import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { withNavigation } from "react-navigation";

function Refresh({ setRefreshed, refreshed, colors}) {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshed(!refreshed);
    // Perform the data fetching or any necessary operations
    // Once the refresh is complete, set the refreshing state back to false
    // Example:
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  

  return (
    
<ScrollView
  style={{
    position: "absolute",
    top:"3%",
    width: '100%',
    height: '40%',

  }}
  refreshControl={
    <RefreshControl  tintColor={colors.blueAccent[400]}  refreshing={refreshing} onRefresh={onRefresh} />
  }
/>


  );
}

export default withNavigation(Refresh);
