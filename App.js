
import { StyleSheet, Text, View , Image} from 'react-native';
import TaskScreen from './src/components/TaskScreen';
//import Addbutton from './src/components/Addbutton';


export default function App() {
  return (
    <View style={styles.container}>
    {/* <View>
      <Image
        source={require('./assets/image.png')}
        style={styles.image}
    />
    </View>
      <View style={styles.addbutton}>
          <Addbutton />            
  </View> */}
   <TaskScreen />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
   // justifyContent: 'center',
   // alignItems: 'center', 
  },  
 image:{
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
 // addbutton:{
  //  position: 'absolute',
   // bottom: 20, 
   // alignSelf: 'center',
  //}, 
});