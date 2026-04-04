// codingProfilesData.js
// Edit this file to update all card content

const codingProfilesData = {
  sectionTitle: "My Coding Profiles",

  profiles: [
    {
      id: "leetcode",
      platform: "LeetCode",
      description: "Solved over 1150 questions with a streak of 840 days.",
      link: "https://leetcode.com",
      btnText: "Visit LeetCode",
      // Platform logo URL — shown on right side after slider drag
      logoUrl: "/images/leetcodeprior.png",
      // Screenshot of your profile — shown on left (the card image)
      screenshotUrl: "/images/leetcode.webp",
      // Accent color for glow, slider handle, button
      accentColor: "#f89f1b",
      // Optional stats shown as overlay chips
      stats: [
        { label: "Rank", value: "#30" },
        { label: "Streak", value: "670d" },
      ],
    },
    {
      id: "gfg",
      platform: "GeeksforGeeks",
      description: "Institute Rank 30, solved 775 ques with a streak of 670 days.",
      link: "https://geeksforgeeks.org",
      btnText: "Visit GeeksforGeeks",
      logoUrl: "/images/gfgss.png",
      screenshotUrl: "/images/gfg.svg",
      accentColor: "#2f8d46",
      stats: [
        { label: "Rank", value: "#30" },
        { label: "Streak", value: "670d" },
      ],
    },
    {
      id: "codeforces",
      platform: "Codeforces",
      description: "Div 3, Solved over 450 problems with a streak of 1040 days.",
      link: "https://codechef.com",
      btnText: "Visit CodeChef",
      logoUrl: "/images/codeforcesss.png",
      screenshotUrl: "/images/codeforceslogo.png",
      accentColor: "#5b4638",
      stats: [
        { label: "Solved", value: "450+" },
        { label: "Streak", value: "1040d" },
      ],
    },
    {
      id: "ninjas",
      platform: "Coding Ninjas",
      description: "675-day streak, solved over 740 MCQs and 75 coding problems.",
      link: "https://codingninjas.com",
      btnText: "Visit Coding Ninjas",
      logoUrl: "/images/codingninjass.png",
      screenshotUrl: "/images/codingninjalogo.webp",
      accentColor: "#ff5722",
      stats: [
        { label: "MCQs", value: "740+" },
        { label: "Streak", value: "675d" },
      ],
    },
  ],
};

export default codingProfilesData;