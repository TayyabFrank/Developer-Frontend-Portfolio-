import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { PORTFOLIO_DATA, Project } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

import { HeroSection } from '@/components/portfolio/HeroSection';
import { StatsSection } from '@/components/portfolio/StatsSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectModal } from '@/components/portfolio/ProjectModal';
import { ServicesSection } from '@/components/portfolio/ServicesSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { TestimonialsSection } from '@/components/portfolio/TestimonialsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Toast } from '@/components/portfolio/Toast';
import { AnimatedSection } from '@/components/portfolio/AnimatedSection';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  // State for project modal and toast
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  const handleScrollToContact = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleNavigateProjects = () => {
    router.push('/explore');
  };

  const featuredProjects = PORTFOLIO_DATA.projects.filter((p) => p.featured);

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Platform.OS === 'web' ? 70 : insets.top + 10,
            paddingBottom: BottomTabInset + 60,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.maxWidthContainer}>
          {/* Hero Profile Showcase with Avatar & Ambient Animations */}
          <AnimatedSection delay={0} duration={600}>
            <HeroSection
              onContactPress={handleScrollToContact}
              onProjectsPress={handleNavigateProjects}
              onShowToast={showToast}
            />
          </AnimatedSection>

          {/* Quick Metrics / Stats Counter */}
          <AnimatedSection delay={150} duration={600}>
            <StatsSection />
          </AnimatedSection>

          {/* Featured Projects Highlight */}
          <AnimatedSection delay={250} duration={600}>
            <View style={styles.sectionHeaderWrap}>
              <View>
                <Text style={[styles.eyebrow, { color: theme.primary }]}>SELECTED WORKS</Text>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Projects</Text>
              </View>
              <Pressable
                onPress={handleNavigateProjects}
                style={({ pressed }) => [
                  styles.viewAllBtn,
                  { backgroundColor: theme.primaryLight },
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>
                  View All ({PORTFOLIO_DATA.projects.length})
                </Text>
                <Ionicons name="arrow-forward" size={14} color={theme.primary} />
              </Pressable>
            </View>

            <View style={styles.projectsList}>
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelectProject}
                  onShowToast={showToast}
                />
              ))}
            </View>
          </AnimatedSection>

          {/* Interactive Skills & Animated Stack Progress */}
          <AnimatedSection delay={350} duration={600}>
            <SkillsSection />
          </AnimatedSection>

          {/* Core Services Offered */}
          <AnimatedSection delay={450} duration={600}>
            <ServicesSection />
          </AnimatedSection>

          {/* Career Journey & Timeline */}
          <AnimatedSection delay={550} duration={600}>
            <ExperienceSection />
          </AnimatedSection>

          {/* Recommendations & Social Proof */}
          <AnimatedSection delay={650} duration={600}>
            <TestimonialsSection />
          </AnimatedSection>

          {/* Contact Inquiry & Direct Links */}
          <AnimatedSection delay={750} duration={600}>
            <ContactSection onShowToast={showToast} />
          </AnimatedSection>
        </View>
      </ScrollView>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onShowToast={showToast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  maxWidthContainer: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  sectionHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 14,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  projectsList: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});
