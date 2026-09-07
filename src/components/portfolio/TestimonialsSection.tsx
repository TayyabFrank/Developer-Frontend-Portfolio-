import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PORTFOLIO_DATA, Testimonial } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';

export function TestimonialsSection() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>ENDORSEMENTS</Text>
        <Text style={[styles.title, { color: theme.text }]}>What Leaders Say</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Testimonials from engineering directors, founders, and cross-functional partners.
        </Text>
      </View>

      <View style={styles.cardsList}>
        {PORTFOLIO_DATA.testimonials.map((t: Testimonial) => (
          <View
            key={t.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}>
            {/* Star Rating */}
            <View style={styles.ratingRow}>
              {[...Array(t.rating)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#F59E0B" />
              ))}
            </View>

            {/* Quote */}
            <Text style={[styles.quoteText, { color: theme.text }]}>
              "{t.quote}"
            </Text>

            {/* Author details */}
            <View style={styles.authorRow}>
              <View style={[styles.avatar, { backgroundColor: t.avatarColor }]}>
                <Text style={styles.avatarText}>{t.avatarText}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={[styles.authorName, { color: theme.text }]}>{t.name}</Text>
                <Text style={[styles.authorRole, { color: theme.textSecondary }]}>
                  {t.role} • {t.company}
                </Text>
              </View>
            </View>
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
  cardsList: {
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  authorRole: {
    fontSize: 12.5,
    marginTop: 2,
  },
});
