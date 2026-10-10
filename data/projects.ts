export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description?: string;
  role?: string;
  year?: string;
  image?: string;
  images?: string[];
  tags?: string[];
  deployment?: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "vaulty",
    title: "Vaulty",
    tagline:
      "A smart warranty and receipt management platform that securely organizes product purchases, receipts, and warranty information.",
    description:
      "Built a full-stack warranty tracker that lets users upload a receipt photo and automatically extracts the product, price, and warranty details using AI. Set up secure cloud storage for receipts with AWS S3, and used background jobs to send expiration reminders before a warranty runs out. The result: no more digging through email or paper receipts to find proof of purchase.",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "PostgreSQL",
      "AWS S3",
      "Inngest",
      "Resend",
      "Sentry",
    ],
    deployment: [
      "EC2",
      "Docker",
      "Kubernetes (Minikube)",
      "Nginx",
      "Ansible",
      "Terraform",
      "GitHub Actions",
    ],
    liveUrl: "https://vaulty.site",
  },
  {
    slug: "file-compression-system",
    title: "File Compression System",
    tagline:
      "A Huffman coding-based file compression engine in Java, with byte-level compression/decompression, tree visualization, and a custom-built data structure library.",
    description:
      "Built a file compression tool in Java using the Huffman coding algorithm, writing the underlying data structures (priority queue, linked lists) from scratch instead of using Java's built-in ones. It shrinks files by giving common bytes shorter codes, then rebuilds the original file perfectly on decompression. Also added a tree visualizer to see how the compression codes are built, and a progress bar that runs on its own thread so the UI never freezes during compression.",
    tags: [
      "Java",
      "Data Structures & Algorithms",
      "Huffman Coding",
      "Swing",
      "Multithreading",
    ],
    repoUrl: "https://github.com/Monas-01/File-Compression-Sytem",
  },
];
