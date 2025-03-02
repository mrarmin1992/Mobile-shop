import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView, Text } from 'react-native';
import Swipper from 'react-native-swiper/src'

var { width } = Dimensions.get("window"); 


const Banner = () => {
    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        setBannerData([
            "https://img.freepik.com/free-vector/hand-drawn-electronics-store-sale-banner-template_23-2151138129.jpg",
            "https://storage.pixteller.com/designs/designs-images/2020-12-21/05/laptop-new-arrival-sales-banner-1-5fe0c47813869.png",
            "https://cdn.vectorstock.com/i/500p/30/94/black-friday-banner-with-halftone-laptop-and-open-vector-54253094.jpg",
            "https://as1.ftcdn.net/jpg/02/52/68/04/1000_F_252680454_05E8u8lQijA3nn4MloY0sDn1tVDn9YWz.jpg",
            "https://www.infifo.com/Images/a85c93a1-e850-4a08-aebc-b5f080411c1f-2023-August-22-T18-25-01-3734289-PM.jpg",
            "https://www.soundguys.com/wp-content/uploads/2023/11/Bose-Quietcomfort-Ultra-Headhones-Featured-Image-1-scaled.jpg",
            "https://www.esports.net/wp-content/uploads/2023/04/best-selling-call-of-duty-games.jpg",
            "https://sm.ign.com/ign_br/screenshot/default/befunky-collage-5_w98g.jpg"
        ])

        return () => {
            setBannerData([])
        }
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.swiper}>
                <Swipper
                    style = {{ height: width / 2 }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={2}
                >
                    {bannerData.map((item) => {
                        return (
                            <Image 
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="cover"
                                source={{uri: item}}
                            />
                        )
                    })}
                </Swipper>
                <View style={{ height: 20 }}></View>
            </View>
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray.200',
        paddingTop: 0,
        width: width
    },
    swiper: {
        width: width,
        alignItems:"center",
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
        paddingTop: 15
    }
});


export default Banner