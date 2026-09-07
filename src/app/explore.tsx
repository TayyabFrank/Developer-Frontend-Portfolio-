import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { PORTFOLIO_DATA, Project } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectModal } from '@/components/portfolio/ProjectModal';
import { Toast } from '@/components/portfolio/Toast';
import { Badge } from '@/components/portfolio/Badge';

export default function ExploreScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const categories = ['All', 'Mobile', 'Web', 'AI & Cloud', 'Full-Stack'];

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      <ScrollView
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
          {/* Header Banner */}
          <View style={styles.header}>
            <Badge label="INNOVATION LAB & PORTFOLIO" variant="primary" style={styles.headerBadge} />
            <Text style={[styles.title, { color: theme.text }]}>All Projects & Systems</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Explore mobile applications, full-stack web platforms, and AI systems built for production scale.
            </Text>
          </View>

          {/* Search Input Box */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}>
            <Ionicons name="search-outline" size={18} color={theme.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search by title, stack (e.g. React Native, OpenAI, Next.js)..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
              </Pressable>
            )}
          </View>

          {/* Category Filter Chips */}
          <View style={styles.filterRow}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={({ pressed }) => [
                    styles.catChip,
                    {
                      backgroundColor: isActive ? theme.primary : theme.card,
                      borderColor: isActive ? theme.primary : theme.cardBorder,
                    },
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      styles.catText,
                      { color: isActive ? '#FFF' : theme.textSecondary },
                    ]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Results count banner */}
          <View style={styles.resultsInfoRow}>
            <Text style={[styles.resultsCountText, { color: theme.textSecondary }]}>
              Showing <Text style={{ color: theme.text, fontWeight: '700' }}>{filteredProjects.length}</Text> project{filteredProjects.length === 1 ? '' : 's'}
            </Text>
            {searchQuery ? (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text style={[styles.clearFilterText, { color: theme.primary }]}>Clear search</Text>
              </Pressable>
            ) : null}
          </View>

          {/* Projects Cards List */}
          {filteredProjects.length > 0 ? (
            <View style={styles.projectsList}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelectProject}
                  onShowToast={showToast}
                />
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}>
              <Ionicons name="filter-outline" size={44} color={theme.textSecondary} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No Projects Found</Text>
              <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
                No projects matched your current filters. Try changing your search keywords or category.
              </Text>
              <Pressable
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                style={({ pressed }) => [
                  styles.resetBtn,
                  { backgroundColor: theme.primaryLight },
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.resetBtnText, { color: theme.primary }]}>Reset All Filters</Text>
              </Pressable>
            </View>
          )}
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  headerBadge: {
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 620,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  resultsCountText: {
    fontSize: 13,
  },
  clearFilterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  projectsList: {
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 36,
    marginHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  emptySub: {
    fontSize: 13.5,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  resetBtn: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  resetBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
