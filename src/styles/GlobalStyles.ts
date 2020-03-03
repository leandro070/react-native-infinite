import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#3F51B5',
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
});