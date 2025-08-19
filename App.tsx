import { useState, useEffect, useCallback } from 'react';
import { Home, Search, PlusCircle, User, MapPin } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ModernNavigation } from './components/ModernNavigation';

// Import all components
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { OnboardingWalkthrough } from './components/OnboardingWalkthrough';
import { HomeFeed } from './components/HomeFeed';
import { LocalGemsPage } from './components/LocalGemsPage';
import { SearchPage } from './components/SearchPage';
import { ProfilePage } from './components/ProfilePage';
import { TravelCardPage } from './components/TravelCardPage';
import { ExperienceDetailPage } from './components/ExperienceDetailPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BucketListPage } from './components/BucketListPage';
import { TravelCardDraftDetailPage } from './components/TravelCardDraftDetailPage';
import { ExpandedItineraryView } from './components/ExpandedItineraryView';
import { AddToItineraryModal } from './components/AddToItineraryModal';
import { AddToExistingDraftModal } from './components/AddToExistingDraftModal';
import { CreateItineraryPage } from './components/CreateItineraryPage';
import { CreatePage } from './components/CreatePage';
import { CreateTravelCardPage } from './components/CreateTravelCardPage';
import { MessengerPage } from './components/MessengerPage';
import { AccountDetailsPage } from './components/AccountDetailsPage';
import { CulturalTriviaPage } from './components/CulturalTriviaPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { CulturalQuestPage } from './components/CulturalQuestPage';

// Import data
import { 
  mockTravelCards, 
  mockUsers, 
  mockStories, 
  mockMoments, 
  mockExperiences 
} from './data/mockData';
import { mockLocalGems } from './data/localGemsData';
import { travelProducts } from './data/travelProducts';
import { Experience, LocalGem, BucketListItem, TravelItinerary, User as UserType, TravelCardDraft, LocalGemDraft } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [selectedTravelCardId, setSelectedTravelCardId] = useState<string | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedItineraryId, setSelectedItineraryId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [selectedChatUserId, setSelectedChatUserId] = useState<string | null>(null);
  const [bucketListItems, setBucketListItems] = useState<BucketListItem[]>([]);
  const [savedGems, setSavedGems] = useState<string[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showAddToItineraryModal, setShowAddToItineraryModal] = useState(false);
  const [showAddToExistingDraftModal, setShowAddToExistingDraftModal] = useState(false);
  const [selectedBucketListItem, setSelectedBucketListItem] = useState<BucketListItem | null>(null);
  const [selectedBucketListItems, setSelectedBucketListItems] = useState<BucketListItem[]>([]);
  const [followingUsers, setFollowingUsers] = useState<string[]>([]);
  const [userAccountType, setUserAccountType] = useState<'user' | 'creator'>('user');
  const [userInstagramData, setUserInstagramData] = useState<any>(null);

  // Enhanced travel cards for all user profiles
  const additionalProfileCards = [
    // User2 (Foodie Traveler) cards
    {
      id: 'profile-user2-1',
      title: 'Street Food Paradise',
      destination: 'Bangkok, Thailand',
      thumbnail: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=800&fit=crop'],
      tripType: 'Food',
      description: 'A culinary journey through the best street food markets of Bangkok',
      experiences: [
        { id: 'exp-user2-1', title: 'Chatuchak Market Food Tour', category: 'food', cost: 800, rating: 4.7 },
        { id: 'exp-user2-2', title: 'Thai Cooking Class', category: 'activity', cost: 1500, rating: 4.9 }
      ],
      creatorId: 'user2',
      likes: 4280,
      comments: 234,
      views: 15670,
      cost: 8000,
      dates: '3 days',
      rating: 4.8
    },
    {
      id: 'profile-user2-2',
      title: 'Wine & Dine Tuscany',
      destination: 'Florence, Italy',
      thumbnail: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=800&fit=crop'],
      tripType: 'Food',
      description: 'Authentic Italian cuisine and vineyard tours in the heart of Tuscany',
      experiences: [
        { id: 'exp-user2-3', title: 'Chianti Vineyard Tour', category: 'activity', cost: 2500, rating: 4.8 },
        { id: 'exp-user2-4', title: 'Traditional Trattoria Dinner', category: 'food', cost: 1200, rating: 4.9 }
      ],
      creatorId: 'user2',
      likes: 3456,
      comments: 189,
      views: 12340,
      cost: 22000,
      dates: '5 days',
      rating: 4.7
    },
    // User4 (Adventure Seeker) cards
    {
      id: 'profile-user4-1',
      title: 'Patagonia Expedition',
      destination: 'Torres del Paine, Chile',
      thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop'],
      tripType: 'Adventure',
      description: 'Epic trekking adventure through the pristine wilderness of Patagonia',
      experiences: [
        { id: 'exp-user4-1', title: 'W Circuit Trek', category: 'activity', cost: 5000, rating: 5.0 },
        { id: 'exp-user4-2', title: 'Mountain Refuge Stay', category: 'stay', cost: 3500, rating: 4.6 }
      ],
      creatorId: 'user4',
      likes: 5678,
      comments: 298,
      views: 18950,
      cost: 45000,
      dates: '10 days',
      rating: 4.9
    },
    {
      id: 'profile-user4-2',
      title: 'Nepal Base Camp Trek',
      destination: 'Everest Region, Nepal',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop'],
      tripType: 'Adventure',
      description: 'Journey to Everest Base Camp through the stunning Himalayas',
      experiences: [
        { id: 'exp-user4-3', title: 'Everest Base Camp Trek', category: 'activity', cost: 8000, rating: 5.0 },
        { id: 'exp-user4-4', title: 'Sherpa Village Experience', category: 'activity', cost: 1500, rating: 4.8 }
      ],
      creatorId: 'user4',
      likes: 7234,
      comments: 445,
      views: 25680,
      cost: 35000,
      dates: '14 days',
      rating: 4.9
    },
    // User6 (Solo Voyager) cards
    {
      id: 'profile-user6-1',
      title: 'Solo in Seoul',
      destination: 'Seoul, South Korea',
      thumbnail: 'https://images.unsplash.com/photo-1548960028-63ba8822b853?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1548960028-63ba8822b853?w=600&h=800&fit=crop'],
      tripType: 'Cultural',
      description: 'Solo female travel guide to Seoul - safety tips and hidden gems',
      experiences: [
        { id: 'exp-user6-1', title: 'Bukchon Hanok Village', category: 'activity', cost: 0, rating: 4.7 },
        { id: 'exp-user6-2', title: 'K-BBQ Solo Dining', category: 'food', cost: 800, rating: 4.5 }
      ],
      creatorId: 'user6',
      likes: 8942,
      comments: 567,
      views: 32450,
      cost: 15000,
      dates: '4 days',
      rating: 4.8
    },
    // User8 (Luxury Escapes) cards
    {
      id: 'profile-user8-1',
      title: 'Maldives Overwater Bliss',
      destination: 'Maldives',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop'],
      tripType: 'Luxury',
      description: 'Ultimate luxury escape in an overwater villa with private butler',
      experiences: [
        { id: 'exp-user8-1', title: 'Overwater Villa with Butler', category: 'stay', cost: 15000, rating: 5.0 },
        { id: 'exp-user8-2', title: 'Private Sunset Cruise', category: 'activity', cost: 5000, rating: 4.9 }
      ],
      creatorId: 'user8',
      likes: 12560,
      comments: 234,
      views: 45670,
      cost: 85000,
      dates: '5 days',
      rating: 4.9
    }
  ];

  // State for all travel cards, local gems, and experiences
  const [allTravelCards, setAllTravelCards] = useState([...mockTravelCards, ...additionalProfileCards]);
  const [allLocalGems, setAllLocalGems] = useState(mockLocalGems);
  const [allExperiences] = useState(mockExperiences);

  // Enhanced travel card drafts data with proper typing
  const [travelCardDrafts, setTravelCardDrafts] = useState<TravelCardDraft[]>([
    {
      id: 'draft-1',
      title: 'Spiti Valley Adventure',
      destination: 'Spiti Valley, Himachal Pradesh',
      duration: '6 Days',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      estimatedCost: 15000,
      completionPercentage: 75,
      lastUpdated: '2024-12-01T00:00:00Z',
      experienceCount: 8,
      isDraft: true,
      startDate: '2025-04-01',
      endDate: '2025-04-06',
      description: 'Epic adventure through the high-altitude desert of Spiti Valley',
      experiences: [],
      collaborators: []
    },
    {
      id: 'draft-2',
      title: 'European Summer',
      destination: 'Paris, France',
      duration: '10 Days',
      coverImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      estimatedCost: 85000,
      completionPercentage: 40,
      lastUpdated: '2024-11-28T00:00:00Z',
      experienceCount: 3,
      isDraft: true,
      startDate: '2025-07-15',
      endDate: '2025-07-25',
      description: 'Romantic journey through the heart of Europe',
      experiences: [],
      collaborators: []
    }
  ]);

  // Local Gem Drafts state
  const [localGemDrafts, setLocalGemDrafts] = useState<LocalGemDraft[]>([
    {
      id: 'gem-draft-1',
      title: 'Hidden Coffee Roastery',
      description: 'Amazing third-wave coffee shop tucked away in an old warehouse',
      location: 'Industrial District, Bangalore',
      category: 'cafe',
      tags: ['Hidden Gem', 'Coffee', 'Local Favorite'],
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop',
      userId: 'current-user',
      lastUpdated: '2024-12-01T10:30:00Z',
      isDraft: true
    },
    {
      id: 'gem-draft-2',
      title: 'Secret Beach Viewpoint',
      description: '',
      location: 'Gokarna, Karnataka',
      category: 'nature',
      tags: ['Sunset', 'Photography'],
      image: '',
      userId: 'current-user',
      lastUpdated: '2024-11-30T15:45:00Z',
      isDraft: true
    }
  ]);

  // Initialize bucket list with some sample items - using a ref to prevent re-initialization
  const [bucketListInitialized, setBucketListInitialized] = useState(false);
  
  useEffect(() => {
    if (!bucketListInitialized && bucketListItems.length === 0) {
      setBucketListItems([
        {
          id: 'bucket-exp-exp1',
          type: 'experience',
          data: mockExperiences[0], // Ubud Jungle Villa
          addedDate: '2024-11-25T00:00:00Z'
        },
        {
          id: 'bucket-exp-exp2',
          type: 'experience', 
          data: mockExperiences[1], // Sisterfields Café
          addedDate: '2024-11-24T00:00:00Z'
        },
        {
          id: 'bucket-gem-gem1',
          type: 'localGem',
          data: mockLocalGems[0],
          addedDate: '2024-11-23T00:00:00Z'
        },
        {
          id: 'bucket-exp-exp9',
          type: 'experience',
          data: mockExperiences[8], // Shibuya Sky
          addedDate: '2024-11-22T00:00:00Z'
        },
        {
          id: 'bucket-gem-gem2',
          type: 'localGem',
          data: mockLocalGems[1],
          addedDate: '2024-11-21T00:00:00Z'
        }
      ]);
      setBucketListInitialized(true);
    }
  }, [bucketListInitialized, bucketListItems.length]);

  // Current logged-in user (first user in mockUsers)
  const currentUser = mockUsers[0];

  // Mock itineraries data with enhanced experiences including time slots
  const [itineraries, setItineraries] = useState<TravelItinerary[]>([
    {
      id: 'itin-1',
      title: 'Spiti Valley Adventure 2025',
      destination: 'Spiti Valley, Himachal Pradesh',
      startDate: '2025-04-01',
      endDate: '2025-04-10',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      experiences: [
        {
          id: 'exp-spiti-1',
          title: 'Zostel Kaza Stay',
          category: 'stay',
          description: 'Comfortable hostel accommodation with stunning mountain views',
          rating: 4.5,
          cost: 1200,
          location: 'Kaza, Spiti Valley',
          media: [],
          scheduledDate: '2025-04-02',
          timeFrom: '15:00',
          timeTo: '11:00',
          bookingUrl: 'https://zostel.com/kaza'
        },
        {
          id: 'exp-spiti-2',
          title: 'Local Tibetan Lunch',
          category: 'food',
          description: 'Authentic Tibetan cuisine at a local restaurant',
          rating: 4.8,
          cost: 300,
          location: 'Kaza Market, Spiti Valley',
          media: [],
          scheduledDate: '2025-04-02',
          timeFrom: '13:00',
          timeTo: '14:30'
        },
        {
          id: 'exp-spiti-3',
          title: 'Key Monastery Visit',
          category: 'activity',
          description: 'Ancient Buddhist monastery perched on a hilltop',
          rating: 4.9,
          cost: 0,
          location: 'Key Village, Spiti Valley',
          media: [],
          scheduledDate: '2025-04-03',
          timeFrom: '10:00',
          timeTo: '12:00'
        }
      ],
      createdAt: '2024-12-01T00:00:00Z',
      updatedAt: '2024-12-01T00:00:00Z'
    },
    {
      id: 'itin-2',
      title: 'European Summer 2025',
      destination: 'Paris, France',
      startDate: '2025-07-15',
      endDate: '2025-07-25',
      coverImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      experiences: [],
      createdAt: '2024-12-01T00:00:00Z',
      updatedAt: '2024-12-01T00:00:00Z'
    }
  ]);

  // Navigation stack for proper back navigation
  const [navigationStack, setNavigationStack] = useState<string[]>([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Define showToast early to avoid initialization issues
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    // Use setTimeout to defer DOM manipulation to avoid render conflicts
    setTimeout(() => {
      const styles = {
        success: 'bg-moodboard-cream border-moodboard-muted-teal text-moodboard-deep-green shadow-brand',
        error: 'bg-moodboard-cream border-red-300 text-red-800 shadow-lg',
        info: 'bg-moodboard-cream border-moodboard-warm-beige text-moodboard-charcoal shadow-brand-secondary'
      };

      const icons = {
        success: '<svg class="w-4 h-4 text-moodboard-muted-teal" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>',
        error: '<svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
        info: '<svg class="w-4 h-4 text-moodboard-warm-beige-dark" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>'
      };

      const toast = document.createElement('div');
      toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 ${styles[type]} border px-4 py-3 rounded-xl z-50 backdrop-blur-sm animate-slideDown max-w-sm`;
      toast.innerHTML = `
        <div class="flex items-center space-x-3">
          ${icons[type]}
          <span class="font-medium text-sm">${message}</span>
        </div>
      `;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (toast && toast.parentNode) {
          toast.style.opacity = '0';
          toast.style.transform = 'translate(-50%, -20px)';
          setTimeout(() => {
            if (toast && toast.parentNode) {
              document.body.removeChild(toast);
            }
          }, 300);
        }
      }, 3000);
    }, 0);
  }, []);

  const navigateToPage = useCallback((page: string, fromPage?: string) => {
    if (fromPage && fromPage !== page) {
      setNavigationStack(prev => [...prev, fromPage]);
    }
    setPreviousPage(currentPage);
    setCurrentPage(page);
  }, [currentPage]);

  const navigateBack = useCallback(() => {
    if (navigationStack.length > 0) {
      const previousPage = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
    } else if (previousPage) {
      setCurrentPage(previousPage);
    } else {
      setCurrentPage('home');
    }
  }, [navigationStack, previousPage]);

  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  const handleSignUpSuccess = (accountType: 'user' | 'creator' = 'user', instagramData?: any) => {
    setUserAccountType(accountType);
    setUserInstagramData(instagramData);
    setCurrentPage('onboarding');
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  const handleOnboardingComplete = () => {
    setCurrentPage('home');
  };

  const handleLogout = () => {
    // Clear all state
    setBucketListItems([]);
    setSavedGems([]);
    setUnreadNotifications(0);
    setNavigationStack([]);
    setFollowingUsers([]);
    setUserAccountType('user');
    setUserInstagramData(null);
    setTravelCardDrafts([]);
    setLocalGemDrafts([]);
    setCurrentPage('login');
  };

  const handleSelectTravelCard = useCallback((id: string) => {
    setSelectedTravelCardId(id);
    navigateToPage('travelCardDetail', currentPage);
  }, [currentPage]);

  const handleSelectExperience = useCallback((id: string) => {
    setSelectedExperienceId(id);
    navigateToPage('experienceDetail', currentPage);
  }, [currentPage]);

  const handleSelectProduct = useCallback((id: string) => {
    setSelectedProductId(id);
    navigateToPage('productDetail', currentPage);
  }, [currentPage]);

  const handleSelectItinerary = useCallback((id: string) => {
    setSelectedItineraryId(id);
    navigateToPage('expandedItinerary', currentPage);
  }, [currentPage]);

  const handleSelectTravelCardDraft = useCallback((draftId: string) => {
    setSelectedDraftId(draftId);
    navigateToPage('travelCardDraftDetail', currentPage);
  }, [currentPage]);

  const handleSelectUser = useCallback((userId: string) => {
    if (userId === currentUser.id) {
      // Navigate to own profile (My Profile)
      navigateToPage('profile', currentPage);
    } else {
      // Navigate to other user's profile (User Profile)
      setSelectedUserId(userId);
      navigateToPage('userProfile', currentPage);
    }
  }, [currentUser.id, currentPage]);

  const handleFollowUser = useCallback((userId: string) => {
    setFollowingUsers(prev => {
      if (prev.includes(userId)) {
        showToast('Unfollowed user', 'info');
        return prev.filter(id => id !== userId);
      } else {
        showToast('Following user!', 'success');
        return [...prev, userId];
      }
    });
  }, [showToast]);

  const handleMessageUser = useCallback((userId: string) => {
    setSelectedChatUserId(userId);
    navigateToPage('messenger', currentPage);
    showToast('Opening conversation...', 'info');
  }, [currentPage, showToast]);

  const handleAddToItinerary = useCallback((experienceId: string) => {
    const exp = allExperiences.find(e => e.id === experienceId);
    if (exp) {
      setBucketListItems(prev => {
        if (!prev.some(item => item.type === 'experience' && item.data.id === exp.id)) {
          return [...prev, { 
            id: `bucket-exp-${exp.id}`, 
            type: 'experience', 
            data: exp,
            addedDate: new Date().toISOString()
          }];
        }
        return prev;
      });
      showToast(`"${exp.title}" added to your bucket list!`);
    }
  }, [allExperiences, showToast]);

  const handleSaveToWishlist = useCallback((localGemId: string) => {
    const gem = allLocalGems.find(g => g.id === localGemId);
    if (gem) {
      setSavedGems(prev => [...prev, localGemId]);
      setBucketListItems(prev => {
        if (!prev.some(item => item.type === 'localGem' && item.data.id === localGemId)) {
          return [...prev, { 
            id: `bucket-gem-${localGemId}`, 
            type: 'localGem', 
            data: gem,
            addedDate: new Date().toISOString()
          }];
        }
        return prev;
      });
      showToast(`"${gem.title}" saved to wishlist!`);
    }
  }, [allLocalGems, showToast]);

  const handleRemoveFromBucketList = useCallback((itemId: string) => {
    setBucketListItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from bucket list', 'info');
  }, [showToast]);

  const handleOpenAddToItineraryModal = useCallback((itemId: string) => {
    const item = bucketListItems.find(item => item.id === itemId);
    if (item) {
      setSelectedBucketListItem(item);
      setShowAddToItineraryModal(true);
    }
  }, [bucketListItems]);

  const handleAddToExistingItinerary = (itineraryId: string, itemId: string) => {
    const item = bucketListItems.find(item => item.id === itemId);
    if (item && item.type === 'experience') {
      setItineraries(prev => prev.map(itin => 
        itin.id === itineraryId 
          ? { 
              ...itin, 
              experiences: [...(itin.experiences || []), item.data as Experience],
              updatedAt: new Date().toISOString()
            }
          : itin
      ));
    }
  };

  const handleAddToExistingDraft = (draftId: string, items: BucketListItem[]) => {
    const experiences = items
      .filter(item => item.type === 'experience')
      .map(item => item.data as Experience);
    
    setTravelCardDrafts(prev => prev.map(draft => 
      draft.id === draftId 
        ? { 
            ...draft, 
            experiences: [...(draft.experiences || []), ...experiences],
            experienceCount: (draft.experienceCount || 0) + experiences.length,
            lastUpdated: new Date().toISOString(),
            completionPercentage: Math.min(100, Math.max(draft.completionPercentage, Math.floor(((draft.experienceCount || 0) + experiences.length) / 10 * 100)))
          }
        : draft
    ));
    
    showToast(`Added ${experiences.length} experience${experiences.length > 1 ? 's' : ''} to travel card draft!`);
  };

  const handleAddToDraft = useCallback((itemId: string) => {
    const item = bucketListItems.find(item => item.id === itemId);
    if (item && travelCardDrafts.length > 0) {
      // Open the modal to select which draft to add to
      setSelectedBucketListItems([item]);
      setShowAddToExistingDraftModal(true);
    } else if (item && travelCardDrafts.length === 0) {
      // No drafts available, suggest creating a new travel card
      showToast('No travel card drafts available. Create a new travel card first!', 'info');
    }
  }, [bucketListItems, travelCardDrafts, showToast]);

  const handleCreateNewItinerary = (newItinerary: Omit<TravelItinerary, 'id'>, itemId: string) => {
    const item = bucketListItems.find(item => item.id === itemId);
    const itineraryId = `itin-${Date.now()}`;
    
    const fullItinerary: TravelItinerary = {
      ...newItinerary,
      id: itineraryId,
      experiences: item && item.type === 'experience' ? [item.data as Experience] : []
    };
    
    setItineraries(prev => [fullItinerary, ...prev]);
  };

  const handleUpdateItinerary = (updatedItinerary: TravelItinerary) => {
    setItineraries(prev => prev.map(itin => 
      itin.id === updatedItinerary.id ? updatedItinerary : itin
    ));
  };

  const handleCreateItinerary = useCallback(() => {
    navigateToPage('createItinerary', currentPage);
  }, [navigateToPage, currentPage]);

  const handleSaveItinerary = useCallback((itinerary: TravelItinerary) => {
    if (selectedTravelCardId) {
      setAllTravelCards(prev => prev.map(card => 
        card.id === selectedTravelCardId 
          ? { ...card, itinerary }
          : card
      ));
      showToast('Itinerary saved successfully!');
      navigateBack();
    }
  }, [selectedTravelCardId, showToast, navigateBack]);

  const handleAddToNewTravelCard = useCallback((items: (Experience | LocalGem)[]) => {
    navigateToPage('createTravelCard', currentPage);
    showToast(`Starting new travel card with ${items.length} items!`);
  }, [navigateToPage, currentPage, showToast]);

  const handlePublishNewContent = useCallback((newContent: any) => {
    // Check if it's a travel card or local gem based on structure
    if (newContent.destination && newContent.experiences !== undefined) {
      // It's a travel card
      setAllTravelCards(prevCards => [newContent, ...prevCards]);
      showToast('Travel Card published successfully!');
    } else if (newContent.category && newContent.tags && newContent.timestamp) {
      // It's a local gem
      setAllLocalGems(prevGems => [newContent, ...prevGems]);
      showToast('Local Gem posted successfully!');
    }
    setCurrentPage('home');
  }, [showToast]);

  const handleSaveNewDraft = useCallback((draftData: any) => {
    setTravelCardDrafts(prev => [draftData, ...prev]);
    showToast('Draft saved to your bucket list!', 'success');
  }, [showToast]);

  const handleSaveLocalGemDraft = useCallback((draftData: LocalGemDraft) => {
    setLocalGemDrafts(prev => [draftData, ...prev]);
    showToast('Local gem draft saved successfully!', 'success');
  }, [showToast]);

  const handleLoadLocalGemDraft = useCallback((draft: LocalGemDraft) => {
    // This would typically trigger the form to load the draft data
    // The actual implementation is handled in CreatePage
    showToast('Loading draft...', 'info');
  }, [showToast]);

  const handleDeleteLocalGemDraft = useCallback((draftId: string) => {
    setLocalGemDrafts(prev => prev.filter(draft => draft.id !== draftId));
    showToast('Draft deleted successfully!', 'info');
  }, [showToast]);

  const handlePublishTravelCardDraft = (draftData: any) => {
    // Convert draft to published travel card
    const publishedCard = {
      ...draftData,
      id: `published-${draftData.id}`,
      isDraft: false,
      publishedAt: new Date().toISOString(),
      creatorId: currentUser.id,
      creator: currentUser
    };
    
    setAllTravelCards(prev => [publishedCard, ...prev]);
    setTravelCardDrafts(prev => prev.filter(draft => draft.id !== draftData.id));
    showToast('Travel Card published successfully!');
    setCurrentPage('profile');
  };

  const handleSaveTravelCardDraft = (draftData: any) => {
    setTravelCardDrafts(prev => prev.map(draft => 
      draft.id === draftData.id ? { 
        ...draft, 
        ...draftData, 
        lastUpdated: new Date().toISOString(),
        experienceCount: draftData.experiences ? draftData.experiences.length : draft.experienceCount,
        completionPercentage: draftData.experiences && draftData.experiences.length > 0 
          ? Math.min(100, Math.max(draftData.completionPercentage || 0, Math.floor((draftData.experiences.length / 10) * 100)))
          : draft.completionPercentage
      } : draft
    ));
    showToast('Draft saved successfully!');
  };

  // New Travel Card creation handlers
  const handleCreateTravelCard = useCallback(() => {
    navigateToPage('createTravelCard', currentPage);
  }, [navigateToPage, currentPage]);

  const handleSaveTravelCardFromCreation = useCallback((draftData: any) => {
    setTravelCardDrafts(prev => [draftData, ...prev]);
    showToast('Travel Card draft saved successfully!', 'success');
    navigateBack();
  }, [showToast, navigateBack]);

  const handlePublishTravelCardFromCreation = useCallback((cardData: any) => {
    setAllTravelCards(prev => [cardData, ...prev]);
    showToast('Travel Card published successfully!', 'success');
    setCurrentPage('home');
  }, [showToast]);

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentPage('welcome')} />;
      case 'welcome':
        return <WelcomeScreen onNavigateToLogin={handleNavigateToLogin} onNavigateToSignUp={handleNavigateToSignUp} />;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToSignUp={handleNavigateToSignUp} />;
      case 'signup':
        return <SignUpPage onSignUpSuccess={handleSignUpSuccess} onNavigateToLogin={handleNavigateToLogin} />;
      case 'onboarding':
        return <OnboardingWalkthrough accountType={userAccountType} onComplete={handleOnboardingComplete} />;
      case 'home':
        return (
          <HomeFeed 
            travelCards={allTravelCards} 
            stories={mockStories}
            moments={mockMoments}
            onSelectTravelCard={handleSelectTravelCard}
            onSelectUser={handleSelectUser}
            onNavigateToMessenger={() => navigateToPage('messenger', currentPage)}
            onNavigateToAccountDetails={() => navigateToPage('accountDetails', currentPage)}
            onNavigateToTrivia={() => navigateToPage('trivia', currentPage)}
            onNavigateToCulturalQuest={() => navigateToPage('culturalQuest', currentPage)}
            onNavigateToNotifications={() => {
              setUnreadNotifications(0);
              navigateToPage('notifications', currentPage);
            }}
            unreadNotifications={unreadNotifications}
          />
        );
      case 'localGems':
        return (
          <LocalGemsPage 
            onSaveToWishlist={handleSaveToWishlist}
            onSelectUser={handleSelectUser}
            savedGems={savedGems}
            localGems={allLocalGems}
          />
        );
      case 'search':
        return (
          <SearchPage 
            travelCards={allTravelCards} 
            onSelectTravelCard={handleSelectTravelCard}
            onSelectUser={handleSelectUser}
          />
        );
      case 'profile':
        // My Profile - accessed via bottom navigation
        const userTravelCards = allTravelCards.filter(card => card.creatorId === currentUser.id);
        const userLocalGems = allLocalGems.filter(gem => gem.userId === currentUser.id);
        return (
          <ProfilePage 
            user={currentUser} 
            travelCards={userTravelCards} 
            localGems={userLocalGems}
            onSelectTravelCard={handleSelectTravelCard}
            onSelectUser={handleSelectUser}
            onNavigateToBucketList={() => navigateToPage('bucketList', currentPage)}
            bucketListCount={bucketListItems.length}
            isOwnProfile={true}
            onFollowUser={handleFollowUser}
            onMessageUser={handleMessageUser}
            isFollowing={false}
            onNavigateToSettings={() => navigateToPage('settings', currentPage)}
            onLogout={handleLogout}
            userAccountType={userAccountType}
          />
        );
      case 'userProfile':
        // User Profile - accessed by clicking usernames/profile pics
        const selectedUser = mockUsers.find(user => user.id === selectedUserId);
        if (!selectedUser) {
          return (
            <div className="min-h-screen bg-surface-warm flex items-center justify-center p-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-moodboard-deep-green mb-2">User not found</h2>
                <button onClick={navigateBack} className="text-moodboard-muted-teal">Go back</button>
              </div>
            </div>
          );
        }
        const selectedUserTravelCards = allTravelCards.filter(card => card.creatorId === selectedUser.id);
        const selectedUserLocalGems = allLocalGems.filter(gem => gem.userId === selectedUser.id);
        return (
          <ProfilePage 
            user={selectedUser} 
            travelCards={selectedUserTravelCards} 
            localGems={selectedUserLocalGems}
            onSelectTravelCard={handleSelectTravelCard}
            onSelectUser={handleSelectUser}
            onNavigateToBucketList={() => {}} // Not accessible for other users
            bucketListCount={0} // Not shown for other users
            isOwnProfile={false}
            onFollowUser={handleFollowUser}
            onMessageUser={handleMessageUser}
            isFollowing={followingUsers.includes(selectedUser.id)}
            onBack={navigateBack}
            onNavigateToSettings={() => navigateToPage('settings', currentPage)}
            onLogout={handleLogout}
            userAccountType={selectedUser.id === currentUser.id ? userAccountType : 'user'}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage
            onBack={navigateBack}
            onNavigateToSettings={() => navigateToPage('settings', currentPage)}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            onBack={navigateBack}
            onNavigateToAccountDetails={() => navigateToPage('accountDetails', currentPage)}
            onLogout={handleLogout}
          />
        );
      case 'bucketList':
        return (
          <BucketListPage
            bucketListItems={bucketListItems}
            travelCardDrafts={travelCardDrafts}
            onBack={navigateBack}
            onRemoveFromBucketList={handleRemoveFromBucketList}
            onAddToNewTravelCard={handleAddToNewTravelCard}
            onAddToItinerary={handleOpenAddToItineraryModal}
            onSelectTravelCardDraft={handleSelectTravelCardDraft}
            onAddToDraft={handleAddToDraft}
          />
        );
      case 'travelCardDraftDetail':
        const selectedDraft = travelCardDrafts.find(draft => draft.id === selectedDraftId);
        if (!selectedDraftId || !selectedDraft) {
          return (
            <div className="min-h-screen bg-surface-warm flex items-center justify-center p-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-moodboard-deep-green mb-2">Draft not found</h2>
                <button onClick={navigateBack} className="text-moodboard-muted-teal">Go back</button>
              </div>
            </div>
          );
        }
        return (
          <TravelCardDraftDetailPage
            draftData={selectedDraft}
            onBack={navigateBack}
            onPublish={handlePublishTravelCardDraft}
            onSaveDraft={handleSaveTravelCardDraft}
            onSelectExperience={handleSelectExperience}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'expandedItinerary':
        const selectedItinerary = itineraries.find(itin => itin.id === selectedItineraryId);
        if (!selectedItinerary) {
          return (
            <div className="min-h-screen bg-surface-warm flex items-center justify-center p-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-moodboard-deep-green mb-2">Itinerary not found</h2>
                <button onClick={navigateBack} className="text-moodboard-muted-teal">Go back</button>
              </div>
            </div>
          );
        }
        return (
          <ExpandedItineraryView
            itinerary={selectedItinerary}
            onBack={navigateBack}
            onUpdateItinerary={handleUpdateItinerary}
            bucketListItems={bucketListItems}
          />
        );
      case 'createItinerary':
        return (
          <CreateItineraryPage
            onBack={navigateBack}
            onSave={handleSaveItinerary}
            bucketListItems={bucketListItems}
          />
        );
      case 'travelCardDetail':
        return (
          <TravelCardPage 
            travelCardId={selectedTravelCardId} 
            allTravelCards={allTravelCards} 
            onBack={navigateBack}
            onSelectExperience={handleSelectExperience}
            onSelectUser={handleSelectUser}
            onAddToItinerary={handleAddToItinerary}
            onSelectProduct={handleSelectProduct}
            onCreateItinerary={handleCreateItinerary}
            onAddToDraft={(experienceId: string) => {
              // Find the experience and convert to bucket list item format
              const experience = allExperiences.find(exp => exp.id === experienceId);
              if (experience && travelCardDrafts.length > 0) {
                const bucketListItem: BucketListItem = {
                  id: `bucket-exp-${experienceId}`,
                  type: 'experience',
                  data: experience,
                  addedDate: new Date().toISOString()
                };
                setSelectedBucketListItems([bucketListItem]);
                setShowAddToExistingDraftModal(true);
              } else if (experience && travelCardDrafts.length === 0) {
                showToast('No travel card drafts available. Create a new travel card first!', 'info');
              }
            }}
          />
        );
      case 'experienceDetail':
        return (
          <ExperienceDetailPage 
            experienceId={selectedExperienceId} 
            allExperiences={allExperiences} 
            onBack={navigateBack}
            onAddToItinerary={handleAddToItinerary}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailPage 
            productId={selectedProductId} 
            allProducts={travelProducts} 
            onBack={navigateBack}
          />
        );
      case 'create':
        return <CreatePage 
          onBack={navigateBack} 
          onPublish={handlePublishNewContent}
          onSaveDraft={handleSaveNewDraft}
          onSaveLocalGemDraft={handleSaveLocalGemDraft}
          onLoadLocalGemDraft={handleLoadLocalGemDraft}
          onDeleteLocalGemDraft={handleDeleteLocalGemDraft}
          userAccountType={userAccountType}
          userInstagramData={userInstagramData}
          travelCardDrafts={travelCardDrafts}
          localGemDrafts={localGemDrafts}
          currentUserId={currentUser.id}
          onCreateTravelCard={handleCreateTravelCard}
        />;
      case 'createTravelCard':
        return (
          <CreateTravelCardPage
            onBack={navigateBack}
            onSaveDraft={handleSaveTravelCardFromCreation}
            onPublish={handlePublishTravelCardFromCreation}
            currentUserId={currentUser.id}
          />
        );
      case 'accountDetails':
        return <AccountDetailsPage onNavigate={setCurrentPage} />;
      case 'messenger':
        return (
          <MessengerPage 
            onBack={navigateBack} 
            bucketListItems={bucketListItems}
            selectedChatUserId={selectedChatUserId}
            onSelectUser={handleSelectUser}
            onClearChatSelection={() => setSelectedChatUserId(null)}
            allUsers={mockUsers}
            currentUser={currentUser}
          />
        );
      case 'culturalQuest':
        return <CulturalQuestPage onBack={navigateBack} onNavigateToTrivia={() => navigateToPage('trivia', currentPage)} />;
      case 'trivia':
        return <CulturalTriviaPage onBack={navigateBack} />;
      default:
        return (
          <HomeFeed 
            travelCards={allTravelCards} 
            stories={mockStories}
            moments={mockMoments}
            onSelectTravelCard={handleSelectTravelCard}
            onSelectUser={handleSelectUser}
            onNavigateToMessenger={() => navigateToPage('messenger', currentPage)}
            onNavigateToAccountDetails={() => navigateToPage('accountDetails', currentPage)}
            onNavigateToTrivia={() => navigateToPage('trivia', currentPage)}
            onNavigateToCulturalQuest={() => navigateToPage('culturalQuest', currentPage)}
            onNavigateToNotifications={() => {
              setUnreadNotifications(0);
              navigateToPage('notifications', currentPage);
            }}
            unreadNotifications={unreadNotifications}
          />
        );
    }
  };

  if (currentPage === 'splash' || currentPage === 'welcome' || currentPage === 'login' || currentPage === 'signup' || currentPage === 'onboarding') {
    return (
      <>
        {renderPage()}
        <AddToItineraryModal
          isOpen={showAddToItineraryModal}
          onClose={() => setShowAddToItineraryModal(false)}
          bucketListItem={selectedBucketListItem}
          existingItineraries={itineraries}
          onAddToExistingItinerary={handleAddToExistingItinerary}
          onCreateNewItinerary={handleCreateNewItinerary}
        />
        <AddToExistingDraftModal
          isOpen={showAddToExistingDraftModal}
          onClose={() => setShowAddToExistingDraftModal(false)}
          selectedItems={selectedBucketListItems}
          travelCardDrafts={travelCardDrafts}
          onAddToDraft={handleAddToExistingDraft}
        />
      </>
    );
  }

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      pages: ['home', 'messenger', 'culturalQuest', 'trivia', 'travelCardDetail', 'experienceDetail', 'productDetail', 'createItinerary'] 
    },
    { 
      id: 'localGems', 
      label: 'Local Gems', 
      icon: MapPin, 
      pages: ['localGems'] 
    },
    { 
      id: 'create', 
      label: 'Create', 
      icon: PlusCircle, 
      pages: ['create', 'createTravelCard'], 
      isCenter: true 
    },
    { 
      id: 'search', 
      label: 'Explore', 
      icon: Search, 
      pages: ['search'] 
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      pages: ['profile', 'userProfile', 'accountDetails', 'bucketList', 'travelCardDraftDetail', 'expandedItinerary', 'notifications', 'settings'] 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm">
      <div className="flex-grow overflow-y-auto content-bottom-spacing">
        {renderPage()}
      </div>

      {/* Add to Itinerary Modal */}
      <AddToItineraryModal
        isOpen={showAddToItineraryModal}
        onClose={() => setShowAddToItineraryModal(false)}
        bucketListItem={selectedBucketListItem}
        existingItineraries={itineraries}
        onAddToExistingItinerary={handleAddToExistingItinerary}
        onCreateNewItinerary={handleCreateNewItinerary}
      />

      {/* Add to Existing Draft Modal */}
      <AddToExistingDraftModal
        isOpen={showAddToExistingDraftModal}
        onClose={() => setShowAddToExistingDraftModal(false)}
        selectedItems={selectedBucketListItems}
        travelCardDrafts={travelCardDrafts}
        onAddToDraft={handleAddToExistingDraft}
      />

      {/* Modern Interactive Navigation */}
      <ModernNavigation
        currentPage={currentPage}
        onNavigate={navigateToPage}
        navItems={navItems}
        bucketListItems={bucketListItems}
        unreadNotifications={unreadNotifications}
        travelCardDrafts={travelCardDrafts}
      />
    </div>
  );
}