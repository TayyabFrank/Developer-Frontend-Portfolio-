import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PORTFOLIO_DATA, ExperienceItem } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from './Badge';

export function ExperienceSection() {
  const theme = useTheme();
  const [expandedId, setExpandedId] = useState<string>('apex');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>CAREER JOURNEY</Text>
        <Text style={[styles.title, { color: theme.text }]}>Work Experience</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Track record of shipping impactful software across fast-scaling startups and enterprises.
        </Text>
      </View>

      <View style={styles.timeline}>
        {PORTFOLIO_DATA.experience.map((item: ExperienceItem, idx: number) => {
          const isExpanded = expandedId === item.id;
          const isLast = idx === PORTFOLIO_DATA.experience.length - 1;

          return (
            <View key={item.id} style={styles.timelineItem}>
              {/* Timeline marker and vertical line */}
              <View style={styles.markerColumn}>
                <View
                  style={[
                    styles.nodeCircle,
                    {
                      backgroundColor: idx === 0 ? theme.primary : theme.card,
                      borderColor: theme.primary,
                    },
                  ]}>
                  <Ionicons
                    name="briefcase"
                    size={13}
                    color={idx === 0 ? '#FFF' : theme.primary}
                  />
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.connectorLine,
                      { backgroundColor: theme.cardBorder },
                    ]}
                  />
                )}
              </View>

              {/* Item Content Card */}
              <Pressable
                onPress={() => toggleExpand(item.id)}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                  pressed && styles.pressed,
                ]}>
                <View style={styles.cardHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={[styles.role, { color: theme.text }]}>{item.role}</Text>
                    <Text style={[styles.company, { color: theme.primary }]}>
                      {item.company}
                    </Text>
                  </View>
                  <View style={styles.headerRight}>
                    <Badge label={item.period} variant="muted" />
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={theme.textSecondary}
                      style={styles.chevron}
                    />
                  </View>
                </View>

                {/* Location & Employment Type */}
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={13} color={theme.textSecondary} />
                  <Text style={[styles.locationText, { color: theme.textSecondary }]}>
                    {item.location} • {item.type}
                  </Text>
                </View>

                {/* Short description */}
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  {item.description}
                </Text>

                {/* Expandable Achievements */}
                {isExpanded && (
                  <View style={[styles.expandedContent, { borderTopColor: theme.cardBorder }]}>
                    <Text style={[styles.achievementsTitle, { color: theme.text }]}>
                      Key Impact & Achievements:
                    </Text>
                    {item.achievements.map((ach, aIdx) => (
                      <View key={aIdx} style={styles.achievementRow}>
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color={theme.success}
                          style={styles.achCheck}
                        />
                        <Text style={[styles.achievementText, { color: theme.textSecondary }]}>
                          {ach}
                        </Text>
                      </View>
                    ))}

                    {/* Tech Pills */}
                    <View style={styles.techPillsRow}>
                      {item.technologies.map((tech, tIdx) => (
                        <View
                          key={tIdx}
                          style={[
                            styles.techPill,
                            {
                              backgroundColor: theme.backgroundElement,
                              borderColor: theme.cardBorder,
                            },
                          ]}>
                          <Text style={[styles.techPillText, { color: theme.textSecondary }]}>
                            {tech}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          );
        })}
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
  timeline: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  markerColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: 10,
  },
  nodeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -4,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  role: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chevron: {
    marginLeft: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  achievementsTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  achCheck: {
    marginTop: 2,
  },
  achievementText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  techPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  techPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  techPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});
