import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
  },
  albumImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 30,
  },
  progressBar: {
    height: 20,
    paddingTop: 90,
    marginRight:20,
    marginLeft:20
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
  },
  play:{
    width:60,
    height:60
  },
  next: {
    width: 50,
    height:50
  }
});

export default styles;
