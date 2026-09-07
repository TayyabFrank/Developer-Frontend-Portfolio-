import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, Platform } from 'react-native';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle | ViewStyle[];
  translateDistance?: number;
}

const isNative = Platform.OS !== 'web';

export function AnimatedSection({
  children,
  delay = 0,
  duration = 600,
  style,
  translateDistance = 25,
}: AnimatedSectionProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(translateDistance)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: isNative,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: isNative,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
      {children}
    </Animated.View>
  );
}
