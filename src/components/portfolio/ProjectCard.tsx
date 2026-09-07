import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Linking, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Project } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onShowToast: (msg: string) => void;
}

export function ProjectCard({ project, onSelect, onShowToast }: ProjectCardProps) {
  const theme = useTheme();
  const cardScale = useRef(new Animated.Value(1)).current;
  const isNative = Platform.OS !== 'web';

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.985,
      friction: 8,
      tension: 100,
      useNativeDriver: isNative,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(cardScale, {
      toValue: 1,
      friction: 6,
      tension: 50,
      useNativeDriver: isNative,
    }).start();
  };

  const handleOpenLink = (url?: string) => {
    if (!url) {
      onShowToast('Link not available for this demo');
      return;
    }
    Linking.openURL(url).catch(() => {
      onShowToast('Could not open project link');
    });
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          transform: [{ scale: cardScale }],
        },
      ]}>
      {/* Visual Header with Gradient Banner */}
      <LinearGradient
        colors={project.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBanner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerTop}>
            <Badge label={project.badge} variant="warning" />
            {project.featured && (
              <View style={styles.featuredTag}>
                <Ionicons name="star" size={12} color="#FBBF24" />
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
          </View>
          <View style={styles.bannerIconWrap}>
            <Ionicons
              name={
                project.category === 'Mobile'
                  ? 'phone-portrait-outline'
                  : project.category === 'AI & Cloud'
                  ? 'hardware-chip-outline'
                  : 'laptop-outline'
              }
              size={36}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.bannerCategoryText}>{project.category}</Text>
        </View>
      </LinearGradient>

      {/* Card Body */}
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>{project.title}</Text>
        <Text style={[styles.tagline, { color: theme.primary }]}>{project.tagline}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={3}>
          {project.description}
        </Text>

        {/* Metrics Pill */}
        <View style={[styles.metricsContainer, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="trending-up" size={14} color={theme.success} />
          <Text style={[styles.metricsText, { color: theme.textSecondary }]}>{project.metrics}</Text>
        </View>

        {/* Tech Stack Pills */}
        <View style={styles.tagsRow}>
          {project.tags.slice(0, 4).map((tag, idx) => (
            <View
              key={idx}
              style={[
                styles.techTag,
                { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
              ]}>
              <Text style={[styles.techTagText, { color: theme.textSecondary }]}>{tag}</Text>
            </View>
          ))}
          {project.tags.length > 4 && (
            <View
              style={[
                styles.techTag,
                { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
              ]}>
              <Text style={[styles.techTagText, { color: theme.textSecondary }]}>
                +{project.tags.length - 4}
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionsRow, { borderTopColor: theme.cardBorder }]}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => onSelect(project)}
            style={({ pressed }) => [
              styles.detailsBtn,
              { backgroundColor: theme.primaryLight },
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.detailsBtnText, { color: theme.primary }]}>Case Study</Text>
            <Ionicons name="arrow-forward" size={14} color={theme.primary} />
          </Pressable>

          <View style={styles.linksRight}>
            {project.githubUrl && (
              <Pressable
                onPress={() => handleOpenLink(project.githubUrl)}
                style={({ pressed }) => [
                  styles.iconBtn,
                  { backgroundColor: theme.backgroundElement, borderColor: theme.cardBorder },
                  pressed && styles.pressed,
                ]}>
                <Ionicons name="logo-github" size={16} color={theme.text} />
              </Pressable>
            )}

            {project.liveUrl && (
              <Pressable
                onPress={() => handleOpenLink(project.liveUrl)}
                style={({ pressed }) => [
                  styles.iconBtn,
                  { backgroundColor: theme.backgroundElement, borderColor: theme.cardBorder },
                  pressed && styles.pressed,
                ]}>
                <Ionicons name="open-outline" size={16} color={theme.text} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    width: '100%',
  },
  gradientBanner: {
    height: 140,
    padding: 16,
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  bannerIconWrap: {
    alignSelf: 'center',
    opacity: 0.9,
  },
  bannerCategoryText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  body: {
    padding: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13.5,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 14,
  },
  metricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  metricsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  techTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  techTagText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  linksRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
