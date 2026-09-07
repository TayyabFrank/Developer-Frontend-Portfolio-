import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Project } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from './Badge';

interface ProjectModalProps {
  project: Project | null;
  visible: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function ProjectModal({ project, visible, onClose, onShowToast }: ProjectModalProps) {
  const theme = useTheme();

  if (!project) return null;

  const handleOpenLink = (url?: string) => {
    if (!url) {
      onShowToast('Link not available for this project');
      return;
    }
    Linking.openURL(url).catch(() => {
      onShowToast('Could not open URL');
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
            },
          ]}>
          {/* Header Banner */}
          <LinearGradient
            colors={project.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerBanner}>
            <View style={styles.headerTop}>
              <Badge label={project.category} variant="warning" />
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}>
                <Ionicons name="close" size={20} color="#FFF" />
              </Pressable>
            </View>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.bannerTitle}>{project.title}</Text>
              <Text style={styles.bannerTagline}>{project.tagline}</Text>
            </View>
          </LinearGradient>

          {/* Scrollable Body */}
          <ScrollView
            style={styles.scrollBody}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Impact & Metrics */}
            <View style={[styles.sectionBox, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.sectionBoxTitle, { color: theme.textSecondary }]}>
                METRICS & IMPACT
              </Text>
              <View style={styles.metricsRow}>
                <Ionicons name="sparkles" size={16} color={theme.warning} />
                <Text style={[styles.metricsText, { color: theme.text }]}>
                  {project.metrics}
                </Text>
              </View>
            </View>

            {/* Overview */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Overview</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              {project.description}
            </Text>

            {/* System Architecture */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>
              System Architecture
            </Text>
            <View
              style={[
                styles.architectureBox,
                { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
              ]}>
              <Ionicons name="git-network-outline" size={20} color={theme.primary} />
              <Text style={[styles.architectureText, { color: theme.text }]}>
                {project.architecture}
              </Text>
            </View>

            {/* Key Features */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Key Features</Text>
            <View style={styles.featuresList}>
              {project.features.map((feature, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={theme.success}
                    style={styles.featureIcon}
                  />
                  <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Tech Stack */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>
              Technologies Used
            </Text>
            <View style={styles.tagsGrid}>
              {project.tags.map((tag, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tagChip,
                    { backgroundColor: theme.primaryLight, borderColor: theme.primary },
                  ]}>
                  <Text style={[styles.tagChipText, { color: theme.primary }]}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              {project.liveUrl && (
                <Pressable
                  onPress={() => handleOpenLink(project.liveUrl)}
                  style={({ pressed }) => [styles.actionBtn, styles.primaryBtn, pressed && styles.pressed]}>
                  <LinearGradient
                    colors={[theme.primary, theme.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.btnGradient}>
                    <Ionicons name="open-outline" size={16} color="#FFF" />
                    <Text style={styles.btnTextWhite}>Launch Live Demo</Text>
                  </LinearGradient>
                </Pressable>
              )}

              {project.githubUrl && (
                <Pressable
                  onPress={() => handleOpenLink(project.githubUrl)}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    { backgroundColor: theme.backgroundElement, borderColor: theme.cardBorder },
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons name="logo-github" size={18} color={theme.text} />
                  <Text style={[styles.btnText, { color: theme.text }]}>Source Repository</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: SCREEN_HEIGHT * 0.88,
    overflow: 'hidden',
  },
  headerBanner: {
    padding: 20,
    paddingTop: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: {},
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  bannerTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  scrollBody: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  sectionBox: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  sectionBoxTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricsText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  paragraph: {
    fontSize: 14.5,
    lineHeight: 23,
    marginBottom: 20,
  },
  architectureBox: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  architectureText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '500',
  },
  featuresList: {
    gap: 10,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  featureIcon: {
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  tagChipText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  modalActions: {
    gap: 10,
  },
  actionBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 1,
  },
  primaryBtn: {
    borderWidth: 0,
  },
  btnGradient: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnTextWhite: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
