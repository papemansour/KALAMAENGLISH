import { Course, Level } from '../types/course';

export const levels: Level[] = [
  {
    id: '1',
    name: 'Beginner',
    code: 'first',
    password: 'alpha',
    description: 'Perfect for those starting their English journey',
    meetLink: 'https://meet.google.com/oye-vjhu-xaz',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
    courses: [
      {
        id: 'beg-1',
        title: 'Basic Conversations',
        description: 'Learn everyday English conversations',
        level: 'beginner',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 'beg-2',
        title: 'Essential Grammar',
        description: 'Master fundamental English grammar rules',
        level: 'beginner',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=2076&auto=format&fit=crop'
      },
      {
        id: 'beg-3',
        title: 'Basic Vocabulary',
        description: 'Build your essential English vocabulary',
        level: 'beginner',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=2074&auto=format&fit=crop'
      },
      {
        id: 'beg-4',
        title: 'Pronunciation Basics',
        description: 'Learn correct English pronunciation',
        level: 'beginner',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Intermediate',
    code: 'seconde',
    password: 'beta',
    description: 'For those ready to take their English to the next level',
    meetLink: 'https://meet.google.com/oye-vjhu-xaz',
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop',
    courses: [
      {
        id: 'int-1',
        title: 'Business English',
        description: 'Professional communication skills',
        level: 'intermediate',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 'int-2',
        title: 'Advanced Grammar',
        description: 'Complex grammar structures',
        level: 'intermediate',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop'
      },
      {
        id: 'int-3',
        title: 'Idiomatic Expressions',
        description: 'Common English idioms and phrases',
        level: 'intermediate',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
      },
      {
        id: 'int-4',
        title: 'Writing Skills',
        description: 'Improve your written English',
        level: 'intermediate',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '3',
    name: 'Advanced',
    code: 'third',
    password: 'gamma',
    description: 'For those aiming for fluency and mastery',
    meetLink: 'https://meet.google.com/oye-vjhu-xaz',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
    courses: [
      {
        id: 'adv-1',
        title: 'Academic Writing',
        description: 'University-level writing skills',
        level: 'advanced',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2074&auto=format&fit=crop'
      },
      {
        id: 'adv-2',
        title: 'Public Speaking',
        description: 'Master presentation skills',
        level: 'advanced',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1557425955-df376b5903c8?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 'adv-3',
        title: 'Literature Analysis',
        description: 'Explore English literature',
        level: 'advanced',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2074&auto=format&fit=crop'
      },
      {
        id: 'adv-4',
        title: 'Advanced Debate',
        description: 'Perfect your argumentation skills',
        level: 'advanced',
        duration: '4 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  }
];