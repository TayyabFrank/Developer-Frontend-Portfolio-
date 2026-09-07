import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PORTFOLIO_DATA } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';

export function StatsSection() {
  const theme = useTheme();
  const { profile } = PORTFOLIO_DATA;

  const stats = [
    {
      label: 'Experience',
      value: profile.experienceYears,
      sub: 'In production tech',
      icon: 'time-outline' as const,
      color: theme.primary,
    },
    {
      label: 'Products Shipped',
      value: profile.shippedProjects,
      sub: 'Mobile & Web apps',
      icon: 'rocket-outline' as const,
      color: theme.accent,
    },
    {
      label: 'App Downloads',
      value: profile.appDownloads,
      sub: 'Across app stores',
      icon: 'cloud-download-outline' as const,
      color: theme.success,
    },
    {
      label: 'Git Commits',
      value: profile.codeCommits,
      sub: 'In past 24 months',
      icon: 'git-branch-outline' as const,
      color: theme.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stats.map((item, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}>
            <View style={[styles.iconWrap, { backgroundColor: `${item.color}18` }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={[styles.value, { color: theme.text }]}>{item.value}</Text>
            <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
            <Text style={[styles.sub, { color: theme.textSecondary }]}>{item.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    minWidth: '46%',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  sub: {
    fontSize: 12,
  },
});
