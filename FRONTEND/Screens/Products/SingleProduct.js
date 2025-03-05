import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from "react-native";
import { Box, Button, Heading } from "native-base"; // Zamjena za Container i H1
import Swipper from 'react-native-swiper/src'

var { width } = Dimensions.get("window"); 

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <Box style={styles.container}> {/* Zamjena za Container */}
      <ScrollView style={styles.scroll}>
        <View>
        <Image 
            source={{ uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
            resizeMode="contain"
            style={styles.image}
        />
        </View>
        <View style={styles.contentContainer}>
            <Heading style={styles.contentHeader}>
                {item.name}
            </Heading>
            <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text>{item.description}</Text>
            <View style={styles.swiper}>
                <Swipper
                    style = {{ height: width / 2 }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={2}
                >
                    {item.images.map((item) => {
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
            <Text style = {styles.font}>{item.richDescription}</Text>
            <Text style = {styles.count}>Currently available {item.countInStock} products</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
            <View>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <View>
                <Button style={styles.addProduct}>Add</Button>
            </View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    backgroundColor: "#fff",
  },
  scroll: {
    marginBottom: 80,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 250
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20
  }, 
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white'
  },
  price: {
    fontSize: '24',
    margin: 20,
    color: 'red'
  },
  addProduct: {
    fontSize: '24',
    marginLeft: 200,
    marginTop: 10,
    width: '30%',
    color: 'red',
  },
  descriptionContainer: {
    position: "relative",
    height: "100%",
    backgroundColor: "#fff",
    margin: 10,
    alignContent: 'center'
  },
  font: {
    fontWeight: 'bold',
    marginTop: 25
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
    padding: 20,
    position: 'relative',
    margin: 10
},
count: {
    fontSize: '24',
    marginTop: 20,
  }
});

export default SingleProduct;
