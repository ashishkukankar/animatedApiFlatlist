import { useRef } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";

const SwipeableItem=({children,onDelete})=>{
    const translateX = useRef(new Animated.Value(0)).current;
    const itemHeight = useRef(new Animated.Value(100)).current;
    const threshold = -100;

    const handleSwipe = PanResponder.create({
        onMoveShouldSetPanResponder: ()=>true,
        onPanResponderMove: (_, gestureState) => {
            if(gestureState.dx < 0) {
                translateX.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dx <threshold){
                Animated.parallel([
                    Animated.timing(translateX,{
                        toValue:-500,
                        duration:300,
                        useNativeDriver:true
                    }),
                    Animated.timing(itemHeight,{
                        toValue:0,
                        duration:400,
                        useNativeDriver:false
                    }),
                ]).start(onDelete);
            }else {
            Animated.timing(translateX,{
                toValue:0,
                duration:300,
                useNativeDriver:true
            }).start();
        }
        }
    });

    return(
        <Animated.View style={[styles.container,{height:itemHeight}]}>
            <Animated.View style={[styles.subContainer,{transform:[{translateX}]}]}
            {...handleSwipe.panHandlers}
            >
                {children}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        overflow:'hidden',
        position:"relative"
    },
    subContainer:{
        backgroundColor:"white",
        padding:10,
        zIndex:10
    } 
})

export default SwipeableItem;