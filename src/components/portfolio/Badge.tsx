import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'muted';
  hasDot?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ label, variant = 'primary', hasDot = false, style, textStyle }: BadgeProps) {
  const theme = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: theme.primaryLight, text: theme.primary, dot: theme.primary };
      case 'accent':
        return { bg: theme.accentLight, text: theme.accent, dot: theme.accent };
      case 'success':
        return { bg: theme.successLight, text: theme.success, dot: theme.success };
      case 'warning':
        return { bg: theme.warningLight, text: theme.warning, dot: theme.warning };
      case 'muted':
      default:
        return { bg: theme.backgroundElement, text: theme.textSecondary, dot: theme.textSecondary };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, style]}>
      {hasDot && <View style={[styles.dot, { backgroundColor: colors.dot }]} />}
      <Text style={[styles.text, { color: colors.text }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
