import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { getAuthToken } from '../utils/auth';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const storedToken = await getAuthToken();

    if (!storedToken) {
      router.replace('/login');
      return;
    }

    setToken(storedToken);
    fetchUserData(storedToken);
  };

  const fetchUserData = async (token: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserData({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        stats: {
          projects: 12,
          completed: 8,
          pending: 4,
          rating: 4.8
        },
        recentActivity: [
          { id: 1, type: 'project', title: 'Mobile App Design', time: '2 hours ago', icon: 'mobile-alt' },
          { id: 2, type: 'meeting', title: 'Team Meeting', time: 'Yesterday', icon: 'users' },
          { id: 3, type: 'task', title: 'Bug Fixes', time: '2 days ago', icon: 'bug' },
          { id: 4, type: 'upload', title: 'Document Upload', time: '3 days ago', icon: 'upload' },
        ],
        quickActions: [
          { id: 1, title: 'New Project', icon: 'plus-circle', color: '#4F46E5' },
          { id: 2, title: 'Analytics', icon: 'bar-chart-2', color: '#10B981' },
          { id: 3, title: 'Calendar', icon: 'calendar', color: '#F59E0B' },
          { id: 4, title: 'Settings', icon: 'settings', color: '#EF4444' },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkToken();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color, iconFamily = 'Feather' }: any) => {
    const IconComponent = iconFamily === 'FontAwesome5' ? FontAwesome5 : 
                         iconFamily === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Feather;
    
    return (
      <View style={styles.statCard}>
        <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
          <IconComponent name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    );
  };

  const ActivityItem = ({ item }: any) => {
    const getIconColor = () => {
      switch (item.type) {
        case 'project': return '#4F46E5';
        case 'meeting': return '#10B981';
        case 'task': return '#F59E0B';
        case 'upload': return '#EF4444';
        default: return '#667eea';
      }
    };

    return (
      <View style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: `${getIconColor()}20` }]}>
          <FontAwesome5 name={item.icon} size={16} color={getIconColor()} />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#9CA3AF" />
      </View>
    );
  };

  const QuickAction = ({ title, icon, color, onPress }: any) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <LinearGradient
        colors={[`${color}`, `${color}DD`]}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Feather name={icon} size={24} color="#fff" />
      </LinearGradient>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            titleColor="#fff"
          />
        }
      >
        {/* Gradient Background as first element in ScrollView */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.headerBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {/* Header Section inside the gradient */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.userName}>
                  {userData?.name || 'User'}
                </Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Feather name="bell" size={22} color="#fff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* User Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={{ uri: userData?.avatar }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userData?.name}</Text>
                <Text style={styles.profileEmail}>{userData?.email}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{userData?.stats?.rating || '4.8'}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Rest of the content */}
        <View style={styles.contentContainer}>
          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionSubtitle}>This week</Text>
            </View>
            <View style={styles.statsGrid}>
              <StatCard
                title="Projects"
                value={userData?.stats?.projects || '0'}
                icon="briefcase"
                color="#4F46E5"
              />
              <StatCard
                title="Completed"
                value={userData?.stats?.completed || '0'}
                icon="check-circle"
                color="#10B981"
              />
              <StatCard
                title="Pending"
                value={userData?.stats?.pending || '0'}
                icon="clock"
                color="#F59E0B"
              />
              <StatCard
                title="Rating"
                value={userData?.stats?.rating || '0'}
                icon="star"
                color="#EF4444"
              />
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSubtitle}>Get things done</Text>
            </View>
            <View style={styles.actionsGrid}>
              {userData?.quickActions?.map((action: any) => (
                <QuickAction
                  key={action.id}
                  title={action.title}
                  icon={action.icon}
                  color={action.color}
                  onPress={() => console.log(`${action.title} pressed`)}
                />
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activitySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityList}>
              {userData?.recentActivity?.map((activity: any) => (
                <ActivityItem key={activity.id} item={activity} />
              ))}
            </View>
          </View>

          {/* Welcome Card - Fixed Layout */}
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            style={styles.welcomeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.welcomeCardContent}>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeCardTitle}>Boost Your Productivity</Text>
                <Text style={styles.welcomeCardText}>
                  Explore premium features to take your work to the next level
                </Text>
              </View>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
                <Feather name="arrow-right" size={14} color="#fff" style={styles.upgradeIcon} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.footerSpacing} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  headerBackground: {
    minHeight: 280,
    paddingBottom: 30,
  },
  contentContainer: {
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  statCard: {
    width: (width - 72) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  quickAction: {
    width: (width - 72) / 2,
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 20,
  },
  quickActionGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  welcomeCard: {
    marginHorizontal: 24,
    marginTop: 30,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  welcomeCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  welcomeCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeCardText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 100,
    justifyContent: 'center',
  },
  upgradeButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  upgradeIcon: {
    marginLeft: 4,
  },
  footerSpacing: {
    height: 40,
  },
});