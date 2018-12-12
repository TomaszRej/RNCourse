import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import placeImage from './assets/beautiful-place.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends Component {
    state = {
        places: [],
        selectedPlace: null
    };

    placeAddedHandler = placeName => {
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    name: placeName,
                    image: placeImage
                })
            };
        });
    };
    placeDeletedHandler = key => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter(place => {
                    return place.key !== prevState.selectedPlace.key;
                }),
                selectedPlace: null
            }
        })
    };

    placeSelectedHandler = key => {
        this.setState(prevState => {
            return {
                selectedPlace: prevState.places.find(place => {
                    return place.key === key;
                })
            }
        })
    };
    modalClosedHandler = () => {
      this.setState({
          selectedPlace: null
      })
    };
    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail selectedPlace={this.state.selectedPlace}
                onItemDeleted={this.placeDeletedHandler}
                             onModalClosed={this.modalClosedHandler}
                />
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    }
});
