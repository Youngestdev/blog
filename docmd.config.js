// docmd.config.js: basic config for docmd
module.exports = {
  // Core Site Metadata
  siteTitle: 'Blog | Youngestdev',
  // Define a base URL for your site, crucial for SEO and absolute paths
  // No trailing slash
  siteUrl: 'https://blog.youngest.dev', // Replace with your actual deployed URL

  // Logo Configuration
  logo: {
    light: '', // Path relative to outputDir root
    dark: '',   // Path relative to outputDir root
    alt: 'Blog',                      // Alt text for the logo
    href: '/',                              // Link for the logo, defaults to site root
  },

  // Directory Configuration
  srcDir: 'docs',       // Source directory for Markdown files
  outputDir: 'site',    // Directory for generated static site

  // Search Configuration
  search: true,        // Enable/disable search functionality

  // Build Options
  minify: true,        // Enable/disable HTML/CSS/JS minification

  // Sidebar Configuration
  sidebar: {
    collapsible: true,        // or false to disable
    defaultCollapsed: false,  // or true to start collapsed
  },

  // Theme Configuration
  theme: {
    name: 'ruby',            // Themes: 'default', 'sky'
    defaultMode: 'light',   // Initial color mode: 'light' or 'dark'
    enableModeToggle: true, // Show UI button to toggle light/dark modes
    positionMode: 'top', // 'top' or 'bottom' for the theme toggle
    codeHighlight: true,    // Enable/disable codeblock highlighting and import of highlight.js
    customCss: [
      '/assets/css/typography.css'
    ]
  },

  // Custom JavaScript Files
  customJs: [  // Array of paths to custom JS files, loaded at end of body
    // '/assets/js/custom-script.js', // Paths relative to outputDir root
    '/assets/js/docmd-image-lightbox.js', // Image lightbox functionality
  ],

  // Content Processing
  autoTitleFromH1: true, // Set to true to automatically use the first H1 as page title
  copyCode: true, // Enable/disable the copy code button on code blocks

  // Plugins Configuration
  // Plugins are configured here. docmd will look for these keys.
  plugins: {
    // SEO Plugin Configuration
    // Most SEO data is pulled from page frontmatter (title, description, image, etc.)
    // These are fallbacks or site-wide settings.
    seo: {
      // Default meta description if a page doesn't have one in its frontmatter
      defaultDescription: 'This blog is my open repo for engineering activities carried out personally or for a company I am permitted to write about.',
      openGraph: { // For Facebook, LinkedIn, etc.
        // siteName: 'docmd Documentation', // Optional, defaults to config.siteTitle
        // Default image for og:image if not specified in page frontmatter
        // Path relative to outputDir root
        defaultImage: '/assets/images/docmd-preview.png',
      },
      twitter: { // For Twitter Cards
        cardType: 'summary_large_image',     // 'summary', 'summary_large_image'
        // siteUsername: '@docmd_handle',    // Your site's Twitter handle (optional)
        // creatorUsername: '@your_handle',  // Default author handle (optional, can be overridden in frontmatter)
      }
    },
    // Analytics Plugin Configuration
    analytics: {
      // Google Analytics 4 (GA4)
      googleV4: {
        measurementId: 'G-8QVBDQ4KM1' // Replace with your actual GA4 Measurement ID
      }
    },
    // Enable Sitemap plugin
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    }
    // Add other future plugin configurations here by their key
  },

  // "Edit this page" Link Configuration
  editLink: {
    enabled: false,
    // The URL to the folder containing your docs in the git repo
    // Note: It usually ends with /edit/main/docs or /blob/main/docs
    baseUrl: 'https://github.com/mgks/docmd/edit/main/docs',
    text: 'Edit this page on GitHub'
  },

  // Navigation Structure (Sidebar)
  // Icons are kebab-case names from Lucide Icons (https://lucide.dev/)
  navigation: [
    { title: 'Welcome', path: '/', icon: 'home' }, // Corresponds to docs/index.md
    {
      title: 'Building Fisco',
      icon: 'building-2',
      path: '#',
      collapsible: true,
      children: [
        { title: 'Headless Commerce Architecture', path: '/fisco-headless-arch', icon: 'layers' },
        { title: 'Batch Imports Optimization', path: '/batch_imports', icon: 'upload' },
        { title: 'Ensuring Schema Uniformity Across MongoDB Codebases with MongoSchematic', path: '/mschema', icon: 'database' },
      ],
    },
    {
      title: 'Data Structures & Algorithms',
      icon: 'binary',
      path: '#',
      collapsible: true,
      children: [
        { title: 'Linked Lists 101 - Basics', path: '/linked_lists', icon: 'link' },
        { title: 'Linked Lists - The Class', path: '/linked_list_wrapper', icon: 'package' },
        { title: 'Looping N-Dimensional Arrays', path: '/looping_arrays', icon: 'grid-3x3' },
        { title: 'Recursion: How?', path: '/recursion', icon: 'repeat' },
        { title: 'Understanding Recursion', path: '/recursion-explained', icon: 'repeat-2' },
        { title: 'Prime Numbers in Range', path: '/prime-numbers-again', icon: 'calculator' },
        { title: 'Simple Array Questions', path: '/simple-questions', icon: 'list' },
        { title: 'Designing Tic-Tac-Toe', path: '/tic-tact-toe', icon: 'grid-2x2' },
        { title: 'The Andela Challenge', path: '/andela_challenge', icon: 'trophy' },
      ],
    },
    {
      title: 'Backend Engineering',
      icon: 'server',
      path: '#',
      collapsible: true,
      children: [
        { title: 'MongoDB Change Streams & Broadcaster', path: '/mongo-broadcaster', icon: 'radio' },
        { title: 'Building a Search Engine', path: '/how_to_create_a_search_engine', icon: 'search' },
        { title: 'SSO with FastAPI & MongoDB', path: '/verification-system-mongodb-fastapi', icon: 'shield-check' },
        { title: 'WebSocket Realtime Streams', path: '/websocket', icon: 'wifi' },
        { title: 'Mini Server Watch Board', path: '/server_dashboard.md', icon: 'activity' },
        { title: 'OPA Policy Management App', path: '/policy-management-app', icon: 'lock' },
      ],
    },
    {
      title: 'Blockchain & Web3',
      icon: 'coins',
      path: '#',
      collapsible: true,
      children: [
        { title: 'Crowdfund Module on Cosmos', path: '/crowdfund-cosmos', icon: 'hand-coins' },
      ],
    },
    {
      title: 'Projects & Challenges',
      icon: 'folder',
      path: '#',
      collapsible: true,
      children: [
        { title: 'Building a Treasure Hunter', path: '/treasure_hunter', icon: 'compass' },
        { title: 'Joint Session with Tomiwa', path: '/joint_session', icon: 'users' },
      ],
    },
    {
      title: 'Personal',
      icon: 'user',
      path: '#',
      collapsible: true,
      children: [
        { title: 'My Book is Here', path: '/my_book_is_here', icon: 'book' },
      ],
    },
    // External links:
    { title: 'GitHub', path: 'https://github.com/Youngestdev', icon: 'github', external: true },
    { title: 'Support the Project', path: 'https://github.com/sponsors/youngestdev', icon: 'heart', external: true },
  ],

  pageNavigation: true, // Enable previous / next page navigation at the bottom of each page

  // Sponsor Ribbon Configuration
  Sponsor: {
    enabled: false,
    title: 'Support docmd',
    link: 'https://github.com/sponsors/mgks',
  },

  // Footer Configuration
  // Markdown is supported here.
  footer: '© ' + new Date().getFullYear() + ' Youngestdevc.',

  // Favicon Configuration
  // Path relative to outputDir root
  favicon: '/assets/favicon.ico',
};
