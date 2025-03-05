import React from 'react'
import {
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native'

const Header = () => {
    return(
        <SafeAreaView style= {styles.header}>
            <Image 
                source = {require("../assets/logo.png")}
                resizeMode = "contain"
                style={{ height: 100 }}
            />
        </SafeAreaView>
    )
}    

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white'
}
})

export default Header