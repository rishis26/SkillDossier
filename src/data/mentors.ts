export interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  skills: string[];
  bio: string;
  availability: string;
  rating: number;
  students: number;
  experience: string;
  location: string;
  hourlyRate: string;
  languages: string[];
  specializations: string[];
}

export interface SkillCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  skills: string[];
  mentors: number;
}

export interface LearningPath {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  skills: string[];
  mentors: Mentor[];
  progress: number;
}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Marcus Johnson",
    title: "Product Manager",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
    bio: "Product management leader specializing in career transitions and leadership development. Helps professionals advance from IC to management roles. 10+ years of experience.",
    availability: "Available",
    rating: 4.8,
    students: 89,
    experience: "10 years",
    location: "Seattle, WA",
    hourlyRate: "$150",
    languages: ["English", "Spanish"],
    specializations: ["Product Management", "Strategy", "Team Leadership"]
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    title: "Data Science Lead",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    bio: "Data science expert with PhD in Statistics. Specializes in machine learning, predictive modeling, and helping professionals transition into data science.",
    availability: "Limited",
    rating: 4.9,
    students: 156,
    experience: "12 years",
    location: "Los Angeles, CA",
    hourlyRate: "$180",
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Data Science", "Machine Learning", "Career Transition"]
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    title: "Full Stack Developer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    bio: "Full-stack developer passionate about clean code and scalable architecture. Loves teaching and helping developers grow their technical skills.",
    availability: "Available",
    rating: 4.7,
    students: 98,
    experience: "6 years",
    location: "Austin, TX",
    hourlyRate: "$110",
    languages: ["English", "Spanish"],
    specializations: ["Full Stack Development", "System Design", "Code Reviews"]
  },
  {
    id: 4,
    name: "Emily Watson",
    title: "UX Designer",
    company: "Figma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    bio: "UX designer with a focus on creating intuitive and accessible user experiences. Expert in design thinking and user-centered design processes.",
    availability: "Available",
    rating: 4.8,
    students: 73,
    experience: "7 years",
    location: "New York, NY",
    hourlyRate: "$130",
    languages: ["English", "French"],
    specializations: ["UX Design", "User Research", "Design Systems"]
  },
  {
    id: 6,
    name: "David Kim",
    title: "DevOps Engineer",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    bio: "DevOps engineer specializing in cloud infrastructure and automation. Passionate about helping teams implement best practices for deployment and monitoring.",
    availability: "Available",
    rating: 4.6,
    students: 64,
    experience: "9 years",
    location: "Seattle, WA",
    hourlyRate: "$140",
    languages: ["English", "Korean"],
    specializations: ["DevOps", "Cloud Infrastructure", "Automation"]
  },
  {
    id: 7,
    name: "Lisa Thompson",
    title: "Marketing Director",
    company: "HubSpot",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    bio: "Marketing professional with expertise in digital marketing, content strategy, and growth hacking. Loves helping professionals build their personal brand.",
    availability: "Limited",
    rating: 4.7,
    students: 112,
    experience: "11 years",
    location: "Boston, MA",
    hourlyRate: "$125",
    languages: ["English"],
    specializations: ["Digital Marketing", "Content Strategy", "Personal Branding"]
  },
  {
    id: 8,
    name: "James Wilson",
    title: "Mobile Developer",
    company: "Airbnb",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    skills: ["React Native", "iOS", "Android", "Swift"],
    bio: "Mobile developer with expertise in cross-platform development. Passionate about creating smooth, native-feeling mobile experiences.",
    availability: "Available",
    rating: 4.8,
    students: 85,
    experience: "8 years",
    location: "San Francisco, CA",
    hourlyRate: "$135",
    languages: ["English"],
    specializations: ["Mobile Development", "Cross-platform", "App Store Optimization"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Frontend Development",
    icon: "💻",
    description: "Master modern frontend technologies",
    skills: ["React", "Vue.js", "Angular", "TypeScript", "CSS", "HTML"],
    mentors: mentors.filter(m => m.skills.some(s => ["React", "TypeScript", "UI/UX Design"].includes(s))).length
  },
  {
    id: 2,
    name: "Backend Development",
    icon: "⚙️",
    description: "Build robust server-side applications",
    skills: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB", "AWS"],
    mentors: mentors.filter(m => m.skills.some(s => ["Node.js", "PostgreSQL", "AWS"].includes(s))).length
  },
  {
    id: 3,
    name: "Data Science",
    icon: "📊",
    description: "Extract insights from data",
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "R", "TensorFlow"],
    mentors: mentors.filter(m => m.skills.some(s => ["Python", "Machine Learning", "Statistics", "SQL"].includes(s))).length
  },
  {
    id: 4,
    name: "Product Management",
    icon: "📋",
    description: "Lead product strategy and development",
    skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership", "User Research"],
    mentors: mentors.filter(m => m.skills.some(s => ["Product Strategy", "Agile", "Data Analysis", "Leadership"].includes(s))).length
  },
  {
    id: 5,
    name: "UX/UI Design",
    icon: "🎨",
    description: "Create beautiful user experiences",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Adobe XD"],
    mentors: mentors.filter(m => m.skills.some(s => ["Figma", "User Research", "Prototyping", "Design Systems"].includes(s))).length
  },
  {
    id: 6,
    name: "DevOps & Cloud",
    icon: "☁️",
    description: "Deploy and scale applications",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring"],
    mentors: mentors.filter(m => m.skills.some(s => ["Docker", "Kubernetes", "AWS", "CI/CD"].includes(s))).length
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Frontend Developer Path",
    description: "From zero to frontend hero",
    duration: "6 months",
    difficulty: "Beginner to Intermediate",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    mentors: mentors.filter(m => m.skills.some(s => ["React", "TypeScript", "UI/UX Design"].includes(s))),
    progress: 0
  },
  {
    id: 2,
    title: "Full Stack Developer Path",
    description: "Master both frontend and backend",
    duration: "12 months",
    difficulty: "Intermediate to Advanced",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    mentors: mentors.filter(m => m.skills.some(s => ["React", "Node.js", "PostgreSQL", "AWS"].includes(s))),
    progress: 0
  },
  {
    id: 3,
    title: "Data Science Path",
    description: "Become a data science expert",
    duration: "8 months",
    difficulty: "Intermediate to Advanced",
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    mentors: mentors.filter(m => m.skills.some(s => ["Python", "Machine Learning", "Statistics", "SQL"].includes(s))),
    progress: 0
  },
  {
    id: 4,
    title: "Product Manager Path",
    description: "Lead product strategy and teams",
    duration: "6 months",
    difficulty: "Intermediate to Advanced",
    skills: ["Product Strategy", "User Research", "Data Analysis", "Leadership", "Agile"],
    mentors: mentors.filter(m => m.skills.some(s => ["Product Strategy", "Agile", "Data Analysis", "Leadership"].includes(s))),
    progress: 0
  }
];
