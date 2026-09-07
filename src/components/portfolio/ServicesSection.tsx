import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PORTFOLIO_DATA } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from './Badge';

export function ServicesSection() {
  const theme = useTheme();

  const getFeatherIcon = (icon: string): keyof typeof Feather.glyphMap => {
    switch (icon) {
      case 'smartphone': return 'smartphone';
      case 'monitor': return 'monitor';
      case 'layers': return 'layers';
      case 'zap': return 'zap';
      default: return 'check';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>WHAT I DELIVER</Text>
        <Text style={[styles.title, { color: theme.text }]}>Services & Solutions</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          High-caliber engineering tailored for rapid growth, robust stability, and delight.
        </Text>
      </View>

      <View style={styles.grid}>
        {PORTFOLIO_DATA.services.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconWrap, { backgroundColor: theme.primaryLight }]}>
                <Feather name={getFeatherIcon(item.icon)} size={20} color={theme.primary} />
              </View>
              <Badge label={item.badge} variant="accent" />
            </View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
              {item.desc}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    maxWidth: 600,
  },
  grid: {
    gap: 14,
  },
  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  cardDesc: {
    fontSize: 13.5,
    lineHeight: 21,
  },
});
