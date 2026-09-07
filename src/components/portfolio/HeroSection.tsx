import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PORTFOLIO_DATA } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';

interface HeroSectionProps {
  onContactPress?: () => void;
  onProjectsPress?: () => void;
  onShowToast: (msg: string) => void;
}

export function HeroSection({ onContactPress, onProjectsPress, onShowToast }: HeroSectionProps) {
  const theme = useTheme();
  const { profile } = PORTFOLIO_DATA;

  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseGlow = useRef(new Animated.Value(1)).current;
  const dotPulse = useRef(new Animated.Value(1)).current;
  const avatarScale = useRef(new Animated.Value(0.85)).current;
  const avatarFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const isNative = Platform.OS !== 'web';

    // 1. Entrance animation for avatar
    Animated.parallel([
      Animated.spring(avatarScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: isNative,
      }),
      Animated.timing(avatarFade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: isNative,
      }),
    ]).start();

    // 2. Continuous breathing glow loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseGlow, {
          toValue: 1.12,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: isNative,
        }),
        Animated.timing(pulseGlow, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: isNative,
        }),
      ])
    ).start();

    // 3. Continuous floating orb motion
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 14,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: isNative,
        }),
        Animated.timing(floatAnim, {
          toValue: -14,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: isNative,
        }),
      ])
    ).start();

    // 4. Status indicator pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, {
          toValue: 0.35,
          duration: 1000,
          useNativeDriver: isNative,
        }),
        Animated.timing(dotPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: isNative,
        }),
      ])
    ).start();
  }, []);

  const handleCopyEmail = () => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      onShowToast('Email copied to clipboard!');
    } else {
      Linking.openURL(`mailto:${profile.email}`);
      onShowToast(`Opening mail client for ${profile.email}`);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      onShowToast('Could not open external link');
    });
  };

  return (
    <View style={styles.container}>
      {/* Ambient Floating Glow Orbs */}
      <Animated.View
        style={[
          styles.glowOrb,
          {
            backgroundColor: theme.primary,
            opacity: 0.18,
            transform: [{ translateY: floatAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glowOrbSecondary,
          {
            backgroundColor: theme.accent,
            opacity: 0.12,
            transform: [
              {
                translateY: floatAnim.interpolate({
                  inputRange: [-14, 14],
                  outputRange: [14, -14],
                }),
              },
            ],
          },
        ]}
      />

      {/* Top Status Pill with animated live pulse dot */}
      <View style={styles.statusRow}>
        <View style={[styles.statusBadge, { backgroundColor: theme.successLight, borderColor: `${theme.success}40` }]}>
          <Animated.View
            style={[
              styles.statusDot,
              {
                backgroundColor: theme.success,
                opacity: dotPulse,
                transform: [{ scale: dotPulse.interpolate({ inputRange: [0.35, 1], outputRange: [0.8, 1.2] }) }],
              },
            ]}
          />
          <Text style={[styles.statusText, { color: theme.success }]}>{profile.status}</Text>
        </View>
      </View>

      {/* Profile Picture with Pulsing Animated Halo */}
      <View style={styles.avatarContainer}>
        {/* Breathing animated gradient halo */}
        <Animated.View
          style={[
            styles.haloGlow,
            {
              transform: [{ scale: pulseGlow }],
              opacity: pulseGlow.interpolate({
                inputRange: [1, 1.12],
                outputRange: [0.5, 0.85],
              }),
            },
          ]}>
          <LinearGradient
            colors={[theme.primary, theme.accent, '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.haloGradient}
          />
        </Animated.View>

        {/* Profile photo container */}
        <Animated.View
          style={[
            styles.avatarWrap,
            {
              borderColor: theme.card,
              opacity: avatarFade,
              transform: [{ scale: avatarScale }],
            },
          ]}>
          <Image
            source={require('@/assets/images/tayyab.jpg')}
            style={styles.avatarImage}
            contentFit="cover"
            transition={400}
          />
        </Animated.View>

        {/* Verified Badge */}
        <View style={[styles.verifiedBadge, { backgroundColor: theme.primary, borderColor: theme.card }]}>
          <Ionicons name="checkmark" size={14} color="#FFF" />
        </View>
      </View>

      {/* Name and Title with animated gradient-like feel */}
      <Text style={[styles.greeting, { color: theme.accent }]}>Hi there 👋 I'm</Text>
      <Text style={[styles.name, { color: theme.text }]}>{profile.name}</Text>
      <Text style={[styles.title, { color: theme.primary }]}>{profile.title}</Text>

      {/* Headline & Bio */}
      <Text style={[styles.headline, { color: theme.textSecondary }]}>{profile.headline}</Text>
      <Text style={[styles.bio, { color: theme.textSecondary }]}>{profile.bio}</Text>

      {/* Location & Experience Badges */}
      <View style={styles.metaRow}>
        <View style={[styles.metaPill, { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder }]}>
          <Ionicons name="location-sharp" size={14} color={theme.accent} />
          <Text style={[styles.metaText, { color: theme.text }]}>{profile.location}</Text>
        </View>
        <View style={[styles.metaPill, { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder }]}>
          <Ionicons name="sparkles" size={14} color={theme.warning} />
          <Text style={[styles.metaText, { color: theme.text }]}>{profile.experienceYears} Industry Exp</Text>
        </View>
      </View>

      {/* Interactive Call to Action Buttons */}
      <View style={styles.ctaRow}>
        <Pressable
          onPress={onContactPress}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <LinearGradient
            colors={[theme.primary, theme.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButtonGradient}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#FFF" style={styles.btnIcon} />
            <Text style={styles.primaryButtonText}>Let's Talk</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={onProjectsPress}
          style={({ pressed }) => [
            styles.secondaryButton,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Ionicons name="code-slash-outline" size={18} color={theme.text} style={styles.btnIcon} />
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>View Projects</Text>
        </Pressable>

        <Pressable
          onPress={handleCopyEmail}
          style={({ pressed }) => [
            styles.iconActionButton,
            { backgroundColor: theme.backgroundElement, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Ionicons name="mail-outline" size={18} color={theme.text} />
        </Pressable>
      </View>

      {/* Social Links Bar */}
      <View style={styles.socialBar}>
        <Pressable
          onPress={() => openLink(profile.github)}
          style={({ pressed }) => [
            styles.socialPill,
            { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Ionicons name="logo-github" size={17} color={theme.text} />
          <Text style={[styles.socialText, { color: theme.text }]}>GitHub</Text>
        </Pressable>

        <Pressable
          onPress={() => openLink(profile.linkedin)}
          style={({ pressed }) => [
            styles.socialPill,
            { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Ionicons name="logo-linkedin" size={17} color={theme.text} />
          <Text style={[styles.socialText, { color: theme.text }]}>LinkedIn</Text>
        </Pressable>

        <Pressable
          onPress={() => openLink(profile.twitter)}
          style={({ pressed }) => [
            styles.socialPill,
            { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Feather name="twitter" size={16} color={theme.text} />
          <Text style={[styles.socialText, { color: theme.text }]}>Twitter</Text>
        </Pressable>

        <Pressable
          onPress={() => openLink(profile.calendly)}
          style={({ pressed }) => [
            styles.socialPill,
            { backgroundColor: theme.cardMuted, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <Feather name="calendar" size={16} color={theme.text} />
          <Text style={[styles.socialText, { color: theme.text }]}>Book Call</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  glowOrb: {
    position: 'absolute',
    top: -40,
    width: 320,
    height: 320,
    borderRadius: 160,
    alignSelf: 'center',
    pointerEvents: 'none',
  },
  glowOrbSecondary: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 240,
    height: 240,
    borderRadius: 120,
    pointerEvents: 'none',
  },
  statusRow: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloGlow: {
    position: 'absolute',
    width: 146,
    height: 146,
    borderRadius: 73,
    justifyContent: 'center',
    alignItems: 'center',
  },
  haloGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 73,
    opacity: 0.7,
  },
  avatarWrap: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  name: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },
  headline: {
    fontSize: 16.5,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 620,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 580,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  metaText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 26,
    flexWrap: 'wrap',
  },
  primaryButton: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  iconActionButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnIcon: {
    marginRight: 8,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  socialBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  socialPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
