export const siteConfig = {
  name: "SLIC",
  fullName: "Student-Led Innovation Club",
  university: "Riara University",
  tagline: "Innovate. Collaborate. Lead.",
  headline: "Building the Next Generation of Innovators",
  subtitle:
    "Student-Led Innovation Club empowers students to transform ideas into projects, startups, and impactful solutions.",
  description:
    "SLIC is a student-driven innovation ecosystem at Riara University focused on innovation, entrepreneurship, research, problem-solving, and leadership development.",
  vision:
    "To create a thriving innovation ecosystem that equips students with skills, opportunities, and networks to lead impactful projects.",
  mission:
    "To empower students through innovation programs, mentorship, research initiatives, skills development, and strategic partnerships.",
  email: "slic@riarauniversity.ac.ke",
  socials: {
    twitter: "https://twitter.com/slic_riara",
    linkedin: "https://linkedin.com/company/slic-riara",
    instagram: "https://instagram.com/slic_riara",
    github: "https://github.com/slic-riara",
  },
};

export const programs = [
  {
    title: "Startup School",
    description:
      "A structured bootcamp that takes students from idea validation to MVP launch with expert mentorship and hands-on workshops.",
    icon: "🚀",
    color: "#7c3aed",
  },
  {
    title: "Innovation Workshops",
    description:
      "Hands-on sessions covering design thinking, rapid prototyping, problem-solving frameworks, and emerging technologies.",
    icon: "💡",
    color: "#7c3aed",
  },
  {
    title: "Hackathons & Challenges",
    description:
      "Intensive build events where students collaborate to solve real-world problems and pitch their solutions to judges.",
    icon: "🏆",
    color: "#ec4899",
  },
  {
    title: "Innovation Safari",
    description:
      "Immersive visits to leading tech companies, innovation labs, and startup hubs to gain real-world industry exposure.",
    icon: "🌍",
    color: "#10b981",
  },
  {
    title: "Mentorship Clinics",
    description:
      "One-on-one and group mentorship sessions with industry professionals, founders, and subject matter experts.",
    icon: "🎯",
    color: "#f59e0b",
  },
  {
    title: "Real-World Projects",
    description:
      "Team-based projects tackling real industry challenges, giving students portfolio-worthy work and practical experience.",
    icon: "⚡",
    color: "#ef4444",
  },
];

export const impactMetrics = [
  { label: "Students Engaged", value: 500, suffix: "+" },
  { label: "Projects Created", value: 45, suffix: "+" },
  { label: "Innovation Workshops", value: 30, suffix: "+" },
  { label: "Industry Connections", value: 25, suffix: "+" },
  { label: "Startups Supported", value: 12, suffix: "" },
];

export const teamMembers = [
  {
    name: "James Mwangi",
    role: "President",
    bio: "Visionary leader driving SLIC's innovation agenda and strategic partnerships across the university ecosystem.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Aisha Patel",
    role: "Vice President",
    bio: "Passionate about entrepreneurship and building bridges between students and the startup community.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Kevin Ochieng",
    role: "Secretary",
    bio: "Organizational powerhouse ensuring seamless operations and documentation for all SLIC initiatives.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Grace Atieno",
    role: "Treasurer",
    bio: "Strategic financial manager ensuring resources are optimized for maximum impact across programs.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Kimani",
    role: "Programs Lead",
    bio: "Designs and executes innovation programs that equip students with real-world skills and mindsets.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sarah Wanjiku",
    role: "Projects Lead",
    bio: "Guides student project teams from ideation through execution, ensuring tangible outcomes and impact.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Michael Otieno",
    role: "Partnerships Lead",
    bio: "Builds strategic relationships with industry partners, mentors, and innovation organizations.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Esther Nyambura",
    role: "Media Lead",
    bio: "Tells the SLIC story through compelling content, visual media, and brand strategy across all platforms.",
    image: "/images/team/placeholder.svg",
    socials: { linkedin: "#", twitter: "#" },
  },
];

export const partners = [
  { name: "Riara University", tier: "Founding Partner" },
  { name: "iLab Africa", tier: "Innovation Partner" },
  { name: "Safaricom", tier: "Industry Partner" },
  { name: "Google for Startups", tier: "Ecosystem Partner" },
  { name: "Villgro Africa", tier: "Mentorship Partner" },
  { name: "Nailab", tier: "Startup Partner" },
];

export const events = [
  {
    title: "SLIC Startup Bootcamp 2026",
    date: "August 15-17, 2026",
    category: "Bootcamp",
    description:
      "A 3-day intensive startup building experience culminating in pitch presentations to investors and industry leaders.",
    location: "Riara University Innovation Lab",
    status: "upcoming" as const,
  },
  {
    title: "Innovation Safari: iHub Nairobi",
    date: "September 5, 2026",
    category: "Exposure",
    description:
      "Visit Kenya's leading innovation hub to network with founders and explore the startup ecosystem.",
    location: "iHub, Nairobi",
    status: "upcoming" as const,
  },
  {
    title: "Design Thinking Workshop",
    date: "September 20, 2026",
    category: "Workshop",
    description:
      "Learn human-centered design methodologies to solve complex problems creatively and effectively.",
    location: "Riara University, Room 401",
    status: "upcoming" as const,
  },
  {
    title: "Annual Innovation Summit 2026",
    date: "October 10, 2026",
    category: "Summit",
    description:
      "SLIC's flagship event featuring keynote speakers, panel discussions, and the annual project showcase.",
    location: "Riara University Auditorium",
    status: "upcoming" as const,
  },
  {
    title: "Hackathon: EdTech Challenge",
    date: "March 12-14, 2026",
    category: "Hackathon",
    description:
      "A 48-hour hackathon focused on building technology solutions for education challenges in Africa.",
    location: "Riara University Innovation Lab",
    status: "past" as const,
  },
  {
    title: "Founders Talk with Jane Mwangi",
    date: "February 20, 2026",
    category: "Talk",
    description:
      "An inspiring fireside chat with a successful Kenyan founder on building and scaling startups.",
    location: "Online (Zoom)",
    status: "past" as const,
  },
];

export const hubProjects = [
  {
    title: "EduConnect",
    description:
      "A peer-to-peer learning platform connecting university students for collaborative study and skill sharing.",
    stage: "MVP",
    team: "4 members",
  },
  {
    title: "AgriSense",
    description:
      "IoT-based smart farming solution providing real-time soil and crop data to smallholder farmers.",
    stage: "Prototype",
    team: "3 members",
  },
  {
    title: "HealthLinc",
    description:
      "A telemedicine platform connecting rural communities with healthcare providers via mobile.",
    stage: "Idea",
    team: "5 members",
  },
  {
    title: "GreenPay",
    description:
      "Blockchain-based carbon credit marketplace enabling individuals to trade verified offsets.",
    stage: "MVP",
    team: "3 members",
  },
  {
    title: "SkillBridge",
    description:
      "A mentorship marketplace connecting university students with industry professionals for career growth.",
    stage: "Prototype",
    team: "4 members",
  },
  {
    title: "Waste2Worth",
    description:
      "Circular economy platform turning organic waste into biogas and fertilizer for local communities.",
    stage: "Idea",
    team: "2 members",
  },
];
