import React, { useRef, useMemo, useState, useEffect } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute"
  }
});

function SwipeablePanel({
  children,
  panelStyle,
  header,
  breakpoints,
  breakpointIndex = 0,
  // minVy = 0.7,
  sortBreakpoints = false,
  onBreakpointChange
}) {
  const breakpoints_ = useMemo(() => {
    if (sortBreakpoints) {
      return breakpoints.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;

        return 0;
      });
    }

    return breakpoints;
  }, [breakpoints]);

  const [breakpointIndex_, setBreakpointIndex] = useState(0);
  const [updateBreakpoint, setUpdateBreakpoint] = useState(false);

  const animate = useRef(new Animated.ValueXY({
    x: 0,
    y: 0
  })).current;

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animate.setOffset({
        x: 0,
        y: animate.y._value
      });

      animate.setValue({
        x: 0,
        y: 0
      });
    },
    onPanResponderMove: (_, gesture) => {
      animate.setValue({
        x: 0,
        y: gesture.dy
      });
    },
    onPanResponderRelease: (_, { moveY }) => {
      animate.flattenOffset();

      let index = 0;
      let minDistance = -1;

      for (const [i, breakpoint] of Object.entries(breakpoints_)) {
        const currentDistance = Math.abs(moveY - breakpoint);

        if (minDistance === -1 || currentDistance < minDistance) {
          minDistance = currentDistance;
          index = i;
        }
      }

      let result = true;

      if (onBreakpointChange) {
        result = onBreakpointChange({
          breakpoint: breakpoints_[index],
          index
        });
      }

      if (result !== false) {
        setBreakpointIndex(index);
      }

      setUpdateBreakpoint(true);
    }
  }), [breakpointIndex_]);

  useEffect(() => {
    setBreakpointIndex(breakpointIndex);
    setUpdateBreakpoint(true);
  }, [breakpointIndex]);

  useEffect(() => {
    if (!updateBreakpoint) return;

    const newY = breakpoints_[breakpointIndex_];

    Animated.spring(animate, {
      toValue: {
        x: 0,
        y: newY
      },
      tension: 80,
      friction: 25,
      useNativeDriver: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    }).start(() => {
      animate.setValue({
        x: 0,
        y: newY
      });
    });

    setUpdateBreakpoint(false);
  }, [updateBreakpoint]);

  return (
    <Animated.View style={[
      styles.container,
      panelStyle,
      {
        transform: animate.getTranslateTransform()
      }
    ]}>
      <Animated.View {...panResponder.panHandlers}>
        {header}
      </Animated.View>
      {children}
    </Animated.View>
  );
}

export { SwipeablePanel };