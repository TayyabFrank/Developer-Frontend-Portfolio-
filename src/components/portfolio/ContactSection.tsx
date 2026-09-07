import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PORTFOLIO_DATA } from '@/constants/portfolio-data';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from './Badge';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export function ContactSection({ onShowToast }: ContactSectionProps) {
  const theme = useTheme();
  const { profile } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Mobile App');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = ['Mobile App', 'Web Platform', 'Consulting / Audit', 'Full-Time Role'];

  const handleSubmit = () => {
    if (!name.trim()) {
      onShowToast('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      onShowToast('Please enter a valid email address');
      return;
    }
    if (!message.trim()) {
      onShowToast('Please write a short message');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('Message sent! I will respond within 24 hours.');
      setName('');
      setEmail('');
      setMessage('');
    }, 900);
  };

  const handleCopyEmail = () => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      onShowToast('Email copied to clipboard!');
    } else {
      Linking.openURL(`mailto:${profile.email}`);
      onShowToast(`Opening email client`);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      onShowToast('Could not open external link');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>GET IN TOUCH</Text>
        <Text style={[styles.title, { color: theme.text }]}>Let's Build Something Great</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Have an idea, project, or full-time opportunity? Drop a message or book a discovery call.
        </Text>
      </View>

      {/* Quick Contact Cards */}
      <View style={styles.quickContactsRow}>
        <Pressable
          onPress={handleCopyEmail}
          style={({ pressed }) => [
            styles.quickCard,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <View style={[styles.quickIconWrap, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="mail" size={20} color={theme.primary} />
          </View>
          <View style={styles.quickCardInfo}>
            <Text style={[styles.quickCardLabel, { color: theme.textSecondary }]}>EMAIL DIRECTLY</Text>
            <Text style={[styles.quickCardValue, { color: theme.text }]} numberOfLines={1}>
              {profile.email}
            </Text>
          </View>
          <Ionicons name="copy-outline" size={16} color={theme.textSecondary} />
        </Pressable>

        <Pressable
          onPress={() => openLink(profile.calendly)}
          style={({ pressed }) => [
            styles.quickCard,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <View style={[styles.quickIconWrap, { backgroundColor: theme.accentLight }]}>
            <Feather name="calendar" size={18} color={theme.accent} />
          </View>
          <View style={styles.quickCardInfo}>
            <Text style={[styles.quickCardLabel, { color: theme.textSecondary }]}>SCHEDULE A CHAT</Text>
            <Text style={[styles.quickCardValue, { color: theme.text }]}>30-min Video Call</Text>
          </View>
          <Ionicons name="open-outline" size={16} color={theme.textSecondary} />
        </Pressable>
      </View>

      {/* Interactive Form Card */}
      <View
        style={[
          styles.formCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          },
        ]}>
        {isSubmitted ? (
          <View style={styles.submittedBox}>
            <View style={[styles.successIconWrap, { backgroundColor: theme.successLight }]}>
              <Ionicons name="checkmark-circle" size={48} color={theme.success} />
            </View>
            <Text style={[styles.submittedTitle, { color: theme.text }]}>Message Received!</Text>
            <Text style={[styles.submittedSub, { color: theme.textSecondary }]}>
              Thanks for reaching out. I usually respond within one business day.
            </Text>
            <Pressable
              onPress={() => setIsSubmitted(false)}
              style={({ pressed }) => [
                styles.sendAnotherBtn,
                { backgroundColor: theme.backgroundElement },
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.sendAnotherText, { color: theme.text }]}>Send Another Message</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={[styles.formHeading, { color: theme.text }]}>Send a Message</Text>

            {/* Name input */}
            <Text style={[styles.inputLabel, { color: theme.text }]}>Your Name</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                  color: theme.text,
                },
              ]}
              placeholder="e.g. Jane Doe"
              placeholderTextColor={theme.textSecondary}
              value={name}
              onChangeText={setName}
            />

            {/* Email input */}
            <Text style={[styles.inputLabel, { color: theme.text }]}>Email Address</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                  color: theme.text,
                },
              ]}
              placeholder="jane@company.com"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {/* Project Type selector */}
            <Text style={[styles.inputLabel, { color: theme.text }]}>Project Focus</Text>
            <View style={styles.projectTypesGrid}>
              {projectTypes.map((type) => {
                const isSelected = projectType === type;
                return (
                  <Pressable
                    key={type}
                    onPress={() => setProjectType(type)}
                    style={({ pressed }) => [
                      styles.typeChip,
                      {
                        backgroundColor: isSelected ? theme.primary : theme.backgroundElement,
                        borderColor: isSelected ? theme.primary : theme.cardBorder,
                      },
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.typeChipText,
                        { color: isSelected ? '#FFF' : theme.textSecondary },
                      ]}>
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Message input */}
            <Text style={[styles.inputLabel, { color: theme.text }]}>Message / Project Details</Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                  color: theme.text,
                },
              ]}
              placeholder="Tell me about your goals, timeline, and key requirements..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.pressed,
              ]}>
              <LinearGradient
                colors={[theme.primary, theme.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitBtnGradient}>
                {isSubmitting ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="paper-plane-outline" size={18} color="#FFF" />
                    <Text style={styles.submitBtnText}>Send Inquiry</Text>
                  </>
                )}
              </LinearGradient>
            </Pressable>
          </>
        )}
      </View>

      {/* Footer credits */}
      <View style={styles.footer}>
        <Badge label="100% Remote Ready" variant="success" hasDot style={styles.footerBadge} />
        <Text style={[styles.footerCopy, { color: theme.textSecondary }]}>
          Designed & Built with React Native, Expo & TypeScript.
        </Text>
        <Text style={[styles.footerSub, { color: theme.textSecondary }]}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </Text>
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
  quickContactsRow: {
    gap: 12,
    marginBottom: 20,
  },
  quickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  quickIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickCardInfo: {
    flex: 1,
  },
  quickCardLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  quickCardValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  formCard: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  formHeading: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  projectTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textArea: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  submitBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 20,
  },
  submitBtnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  submittedBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  submittedTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  submittedSub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: 20,
  },
  sendAnotherBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sendAnotherText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerBadge: {
    marginBottom: 6,
  },
  footerCopy: {
    fontSize: 12.5,
    textAlign: 'center',
  },
  footerSub: {
    fontSize: 11.5,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
