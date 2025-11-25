
export interface PricingPackage {
  name: string;
  speed: string;
  devices: string;
  feature1: string;
  feature2: string;
  price: string;
  highlight?: boolean;
}

export interface ContactInfo {
  email: string;
  address: string;
  whatsapp: string;
  phone: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface SiteContent {
  hero: {
    tagline: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    description: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
  stats: {
    uptime: string;
    latency: string;
    nocResponse: string;
  };
  monitoring: {
    traffic: string;
    packetLoss: string;
    backboneStatus: string;
  };
  homeFeatures: { // Why Choose Us Section
    title: string;
    subtitle: string;
    items: WhyChooseItem[];
  };
  dashboardAlerts: {
    alert1: string;
    alert2: string;
  };
  featuresPage: {
    heroTitle: string;
    heroSubtitle: string;
    items: FeatureItem[];
  };
  testimonialsPage: {
    heroTitle: string;
    heroSubtitle: string;
    items: TestimonialItem[];
  };
  packages: PricingPackage[];
  contact: ContactInfo;
  chatConfig: {
    autoReplyText: string;
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: number;
  isAutoReply?: boolean;
  attachmentType?: 'image' | 'location';
  attachmentUrl?: string;
}

export interface ChatSession {
  id: string;
  customerId?: string; // Changed from userEmail to customerId (optional)
  userName: string;
  messages: ChatMessage[];
  lastUpdated: number;
  unreadCount: number; // For admin
  lastTypingTimestamp?: number;
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    tagline: "Konektivitas premium dengan pendekatan konsultatif",
    headlineStart: "Internet Harmonika Tech",
    headlineHighlight: "selalu selaras",
    headlineEnd: "dengan target bisnis Anda.",
    description: "Tim jaringan dan keamanan kami mendesain koneksi yang cepat, aman, dan mudah dipantau. Cocok untuk kantor pusat, cabang, kampus, hotel, hingga layanan digital dengan trafik tinggi.",
    buttonPrimary: "Jadwalkan Demo",
    buttonSecondary: "Lihat Keunggulan"
  },
  stats: {
    uptime: "99.98%",
    latency: "< 5ms",
    nocResponse: "-15 mnt"
  },
  monitoring: {
    traffic: "2.4 Gbps",
    packetLoss: "0.03%",
    backboneStatus: "Hijau"
  },
  homeFeatures: {
    title: "Lebih Dari Sekadar Internet Cepat",
    subtitle: "Kami mengkombinasikan teknologi fiber optik terkini dengan pelayanan yang memanusiakan pelanggan.",
    items: [
      {
        title: "Koneksi Cepat & Stabil",
        description: "Jaringan 100% Fiber Optic menjamin latensi rendah dan kecepatan tinggi untuk streaming 4K dan gaming tanpa lag."
      },
      {
        title: "Unlimited Tanpa FUP",
        description: "Bebas internetan sepuasnya tanpa batasan kuota (Fair Usage Policy). Kecepatan tidak akan turun di akhir bulan."
      },
      {
        title: "Support Responsif 24/7",
        description: "Bukan bot, tapi manusia. Tim teknis kami standby 24 jam untuk membantu kendala Anda via WhatsApp dan telepon."
      },
      {
        title: "Harga Transparan",
        description: "Biaya bulanan flat. Tidak ada biaya tersembunyi, biaya sewa modem yang membengkak, atau kenaikan harga tiba-tiba."
      }
    ]
  },
  dashboardAlerts: {
    alert1: "Optimasi latency cabang Bandung",
    alert2: "Autentikasi Wi-Fi guest berhasil"
  },
  featuresPage: {
    heroTitle: "Fondasi Digital yang Kokoh & Terpercaya",
    heroSubtitle: "Harmonika Tech tidak hanya menjual internet, kami membangun ekosistem konektivitas yang dirancang untuk mendukung pertumbuhan bisnis tanpa hambatan teknis.",
    items: [
      {
        title: "Dedicated Bandwidth 1:1",
        desc: "Koneksi murni tanpa berbagi jalur dengan pelanggan lain. Kecepatan upload dan download simetris untuk performa bisnis maksimal."
      },
      {
        title: "Keamanan Tingkat Lanjut",
        desc: "Proteksi DDoS mitigasi otomatis dan firewall terintegrasi untuk menjaga jaringan Anda tetap aman dari serangan siber."
      },
      {
        title: "Multi-Upstream Redundancy",
        desc: "Terhubung ke berbagai exchange internasional (IX) dan lokal (IIX/OpenIXP) dengan jalur failover otomatis."
      },
      {
        title: "Support Prioritas 24/7",
        desc: "Akses langsung ke teknisi NOC Level 2 tanpa melalui bot. Respon time di bawah 15 menit untuk isu kritis."
      },
      {
        title: "Infrastruktur Fiber Optic",
        desc: "Jaringan 100% Fiber Optic End-to-End dari core network hingga ke lokasi pelanggan (FTTH/FTTB) menjamin latensi rendah."
      },
      {
        title: "SLA Uptime 99.9%",
        desc: "Jaminan tingkat layanan (Service Level Agreement) tertulis dengan kompensasi restitusi jika target tidak tercapai."
      }
    ]
  },
  testimonialsPage: {
    heroTitle: "Dipercaya oleh Bisnis yang Menuntut Kualitas",
    heroSubtitle: "Dari startup teknologi hingga institusi pendidikan, lihat bagaimana Harmonika Tech menjadi tulang punggung digital mereka.",
    items: [
      {
        name: "Budi Santoso",
        role: "CTO, StartUp Unicorn",
        company: "Harmonika Tech",
        text: "Latency ke server Singapore turun signifikan setelah pindah ke Harmonika. Tim support sangat responsif di jam 2 pagi sekalipun. Sangat recommended untuk kebutuhan high-availability.",
        rating: 5
      },
      {
        name: "Siti Rahma",
        role: "IT Manager",
        company: "Grand Hotel Bandung",
        text: "Tamu hotel tidak pernah komplain lagi soal WiFi lambat. Dashboard monitoringnya sangat membantu tim kami memantau trafik tamu vs operasional secara real-time.",
        rating: 5
      },
      {
        name: "Andi Wijaya",
        role: "Kepala Yayasan",
        company: "Sekolah Pelita Bangsa",
        text: "Koneksi stabil untuk ujian online serentak 500 siswa. Kami dulu sering down saat peak hour, tapi dengan jalur dedicated Harmonika, semua lancar.",
        rating: 5
      },
      {
        name: "Dr. Hendra",
        role: "Direktur",
        company: "RS Sehat Sejahtera",
        text: "Konektivitas untuk sistem rekam medis elektronik (RME) kami berjalan tanpa hambatan. Keamanan data juga lebih terjamin dengan fitur firewall yang disertakan.",
        rating: 5
      },
      {
        name: "Reza Rahardian",
        role: "Owner",
        company: "Cafe Ruang Temu",
        text: "Co-working space saya butuh internet kencang untuk menarik digital nomad. Harmonika memberikan solusi bandwidth on-demand yang fleksibel.",
        rating: 4
      },
      {
        name: "Dewi Lestari",
        role: "Procurement",
        company: "PT Logistik Utama",
        text: "Proses instalasi sangat cepat dan rapi. Tim teknis sangat mengerti standar K3 di area pergudangan kami. After sales service juara.",
        rating: 5
      }
    ]
  },
  packages: [
    {
      name: "Starter 50Mbps",
      speed: "Up to 50 Mbps",
      devices: "Ideal untuk 4 Perangkat",
      feature1: "Unlimited Kuota Tanpa F.U.P",
      feature2: "Gratis Biaya Instalasi",
      price: "Rp 176.500/bulan",
      highlight: false
    },
    {
      name: "Basic 75Mbps",
      speed: "Up to 75 Mbps",
      devices: "Ideal untuk 6 Perangkat",
      feature1: "Unlimited Kuota Tanpa F.U.P",
      feature2: "Gratis Biaya Instalasi",
      price: "Rp 232.000/bulan",
      highlight: false
    },
    {
      name: "Premium 100Mbps",
      speed: "Up to 100 Mbps",
      devices: "Ideal untuk 9 Perangkat",
      feature1: "Unlimited Kuota Tanpa F.U.P",
      feature2: "Gratis Biaya Instalasi",
      price: "Rp 343.000/bulan",
      highlight: true
    },
    {
      name: "Gold 125Mbps",
      speed: "Up to 125 Mbps",
      devices: "Ideal untuk 10 Perangkat",
      feature1: "Unlimited Kuota Tanpa F.U.P",
      feature2: "Gratis Biaya Instalasi",
      price: "Rp 444.000/bulan",
      highlight: false
    },
    {
      name: "Platinum 150Mbps",
      speed: "Up to 250 Mbps",
      devices: "Ideal untuk 20 Perangkat",
      feature1: "Unlimited Kuota Tanpa F.U.P",
      feature2: "Gratis Biaya Instalasi",
      price: "Rp 565.000/bulan",
      highlight: false
    }
  ],
  contact: {
    email: "info@harmonika.tech",
    address: "Jl.Mariwati KM.4 Cibadak Sukaresmi, Sukanagalih, Kec. Pacet, Kabupaten Cianjur, Jawa Barat 43254",
    whatsapp: "+62 851-2130-4526",
    phone: "0263-7008009"
  },
  chatConfig: {
    autoReplyText: "Kami sedang tidak ada di tempat bisa hubungi kami di info@harmonika.tech\nWhatsApp: +62 851-2130-4526\nCall: 0263-7008009"
  }
};
