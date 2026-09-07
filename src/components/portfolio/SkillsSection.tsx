import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PORTFOLIO_DATA, Skill } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';

function AnimatedSkillBar({ level, color }: { level: number; color: string }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    widthAnim.setValue(0);
    Animated.timing(widthAnim, {
      toValue: level,
      duration: 850,
      useNativeDriver: false,
    }).start();
  }, [level]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.progressBarFill,
        {
          width: widthInterpolated,
          backgroundColor: color,
        },
      ]}
    />
  );
}

export function SkillsSection() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Mobile', 'AI & Data', 'Frontend', 'Backend', 'DevOps & Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter(s => s.category === selectedCategory);

  const getFeatherIconName = (name: string): keyof typeof Feather.glyphMap => {
    switch (name) {
      case 'smartphone': return 'smartphone';
      case 'code': return 'code';
      case 'globe': return 'globe';
      case 'palette': return 'layout';
      case 'server': return 'server';
      case 'cpu': return 'cpu';
      case 'share-2': return 'share-2';
      case 'database': return 'database';
      case 'layers': return 'layers';
      case 'activity': return 'activity';
      case 'box': return 'box';
      case 'cloud': return 'cloud';
      case 'git-commit': return 'git-commit';
      case 'check-circle': return 'check-circle';
      default: return 'terminal';
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>TECHNICAL EXPERTISE</Text>
        <Text style={[styles.title, { color: theme.text }]}>Skills & Technologies</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Core languages, frameworks, and architecture tools I use to deliver performant apps.
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={({ pressed }) => [
                styles.tabPill,
                {
                  backgroundColor: isActive ? theme.primary : theme.backgroundElement,
                  borderColor: isActive ? theme.primary : theme.cardBorder,
                },
                pressed && styles.pressed,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#FFF' : theme.textSecondary },
                ]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Skills Grid */}
      <View style={styles.skillsGrid}>
        {filteredSkills.map((skill: Skill, idx: number) => (
          <View
            key={`${selectedCategory}-${skill.name}-${idx}`}
            style={[
              styles.skillCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}>
            <View style={styles.skillTop}>
              <View style={[styles.iconWrap, { backgroundColor: theme.primaryLight }]}>
                <Feather
                  name={getFeatherIconName(skill.icon)}
                  size={18}
                  color={theme.primary}
                />
              </View>
              <View style={styles.skillMeta}>
                <Text style={[styles.skillName, { color: theme.text }]} numberOfLines={1}>
                  {skill.name}
                </Text>
                <Text style={[styles.skillExp, { color: theme.textSecondary }]}>
                  {skill.experience} • {skill.category}
                </Text>
              </View>
              <Text style={[styles.percentageText, { color: theme.primary }]}>
                {skill.level}%
              </Text>
            </View>

            {/* Proficiency progress bar with smooth dynamic width animation */}
            <View style={[styles.progressBarBg, { backgroundColor: theme.backgroundElement }]}>
              <AnimatedSkillBar level={skill.level} color={theme.primary} />
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
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tabPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCard: {
    width: '100%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  skillTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  skillMeta: {
    flex: 1,
  },
  skillName: {
    fontSize: 15,
    fontWeight: '700',
  },
  skillExp: {
    fontSize: 12,
    marginTop: 2,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  pressed: {
    opacity: 0.8,
  },
});
