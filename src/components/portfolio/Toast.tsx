import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'info';
  onDismiss: () => void;
}

export function Toast({ message, visible, type = 'success', onDismiss }: ToastProps) {
  const theme = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-20)).current;
  const isNative = Platform.OS !== 'web';

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: isNative,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: isNative,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: isNative,
          }),
          Animated.timing(translateY, {
            toValue: -20,
            duration: 250,
            useNativeDriver: isNative,
          }),
        ]).start(() => {
          onDismiss();
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: '#000',
        },
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: type === 'success' ? theme.successLight : theme.primaryLight }]}>
        <Ionicons
          name={type === 'success' ? 'checkmark-circle' : 'information-circle'}
          size={18}
          color={type === 'success' ? theme.success : theme.primary}
        />
      </View>
      <Text style={[styles.text, { color: theme.text }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    maxWidth: '90%',
  },
  iconWrap: {
    padding: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
