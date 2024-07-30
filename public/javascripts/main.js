const urlInput = document.getElementById('url-input');
  const filterRadios = document.querySelectorAll('input[type="radio"][name="filter"]');
  const platformSelectContainer = document.getElementById('platform-select-container');
  const platformSelect = document.getElementById('platform-select');
  const useCaseSelect = document.getElementById('use-case-select');
  const campaignNameInput = document.getElementById('campaign-input');
  const utmOutput = document.getElementById('utm-output');
  const generateButton = document.getElementById('generate-button');
  const body = document.body;

// UTM Taxonomy Data (from UTM Builder Lookup Table in Excel)
const utmTaxonomy = [
  { Platform: "Amazon", "Use Case": "Amazon - Image", "Campaign Source": "amazon_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Organic Shopping" },
  { Platform: "Amazon", "Use Case": "Amazon - Link", "Campaign Source": "amazon_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,'Channel':"Organic Shopping"},
  { Platform: "Amazon", "Use Case": "Amazon - Video", "Campaign Source": "amazon_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Organic Shopping" },
  { Platform: "Amazon", "Use Case": "Amazon Music - Image", "Campaign Source": "amazon_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Organic Shopping" },
  { Platform: "CRM", "Use Case": "CRM - Email", "Campaign Source": "crm_o", "Campaign Medium": "Email", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Email" },
  { Platform: "CRM", "Use Case": "CRM - In-app notification", "Campaign Source": "crm_o", "Campaign Medium": "OApp", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "inapp", "Channel": "Owned App" },
  { Platform: "CRM", "Use Case": "CRM - Push notification", "Campaign Source": "crm_o", "Campaign Medium": "OApp", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "push", "Channel": "Owned App"},
  { Platform: "CRM", "Use Case": "CRM - SMS", "Campaign Source": "crm_o", "Campaign Medium": "TxtSMS", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"SMS" },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT - Image", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"CCTV/OOT" },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT - Link", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link", 'Channel':"CCTV/OOT" },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT - Video", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"CCTV/OOT"  },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT Integration - Image", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image", 'Channel':"CCTV/OOT"  },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT Integration - Link", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link", 'Channel':"CCTV/OOT"  },
  { Platform: "CTV/OTT", "Use Case": "CTV/OTT Integration - Video", "Campaign Source": "CTVOTT_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video", 'Channel':"CCTV/OOT" },

  { Platform: "Display", "Use Case": "Display Banner", "Campaign Source": "display_p", "Campaign Medium": "display", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Display" },
  { Platform: "Display", "Use Case": "Display Banner - Native", "Campaign Source": "display_p", "Campaign Medium": "display", "Campaign Name": "Campaign Name", "Campaign Term": "Native", "Campaign Content": "image",'Channel':"Display" },
  { Platform: "Facebook", "Use Case": "Facebook Paid Posts - Image", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Facebook", "Use Case": "Facebook Paid Posts - Link", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Facebook", "Use Case": "Facebook Paid Posts - Video", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },

  { Platform: "Facebook", "Use Case": "Facebook Owned Posts - Image", "Campaign Source": "fb_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "Facebook", "Use Case": "Facebook Owned Posts - Link", "Campaign Source": "fb_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "Facebook", "Use Case": "Facebook Owned Posts - Video", "Campaign Source": "fb_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "Facebook", "Use Case": "Facebook Owned Posts - Chat", "Campaign Source": "fb_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat" ,'Channel':"Owned Social"},

  { Platform: "Facebook", "Use Case": "Facebook Influencer Posts - Image", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Facebook", "Use Case": "Facebook Influencer Posts - Link", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Facebook", "Use Case": "Facebook Influencer Posts - Video", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Facebook", "Use Case": "Facebook Influencer Posts - Chat", "Campaign Source": "fb_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },


  { Platform: "Gaming", "Use Case": "Gaming App - Image", "Campaign Source": "gamingapp_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image", "Channel": "Gaming" },
  { Platform: "Gaming", "Use Case": "Gaming App - Link", "Campaign Source": "gamingapp_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link", "Channel": "Gaming" },
  { Platform: "Gaming", "Use Case": "Gaming App - Video", "Campaign Source": "gamingapp_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video", "Channel": "Gaming" },
  { Platform: "Gaming", "Use Case": "Gaming Console - Image", "Campaign Source": "gamingconsole_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image", "Channel": "Gaming" },
  { Platform: "Gaming", "Use Case": "Gaming Console - Link", "Campaign Source": "gamingconsole_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link", "Channel": "Gaming" },
  { Platform: "Gaming", "Use Case": "Gaming Console - Video", "Campaign Source": "gamingconsole_p", "Campaign Medium": "Gaming", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video", "Channel": "Gaming" },

  { Platform: "Google Search", "Use Case": "Google Search - Image", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Search" },
  { Platform: "Google Search", "Use Case": "Google Search - Link", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Search" },
  { Platform: "Google Search", "Use Case": "Google Search - Video", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Search" },
  { Platform: "Google Search", "Use Case": "Google Search - App", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "multiple",'Channel':"Paid Search" },
  { Platform: "Google Search", "Use Case": "Google Search - Discovery", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "multiple" ,'Channel':"Paid Search"},
  { Platform: "Google Search", "Use Case": "Google Search - Performance Max", "Campaign Source": "google_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "multiple",'Channel':"Paid Search"},

  { Platform: "Instagram", "Use Case": "Instagram Paid Posts - Image", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Instagram", "Use Case": "Instagram Paid Posts - Link", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Instagram", "Use Case": "Instagram Paid Posts - Video", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },

  { Platform: "Instagram", "Use Case": "Instagram Owned Posts - Image", "Campaign Source": "ig_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image" ,'Channel':"Owned Social"},
  { Platform: "Instagram", "Use Case": "Instagram Owned Posts - Link", "Campaign Source": "ig_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,'Channel':"Owned Social"},
  { Platform: "Instagram", "Use Case": "Instagram Owned Posts - Video", "Campaign Source": "ig_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "Instagram", "Use Case": "Instagram Owned Posts - Chat", "Campaign Source": "ig_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },

  { Platform: "Instagram", "Use Case": "Instagram Influencer Posts - Image", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Instagram", "Use Case": "Instagram Influencer Posts - Link", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Instagram", "Use Case": "Instagram Influencer Posts - Video", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Instagram", "Use Case": "Instagram Influencer Posts - Chat", "Campaign Source": "ig_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },

  { Platform: "LinkedIn", "Use Case": "LinkedIn Paid Posts - Image", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Paid Posts - Link", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Paid Posts - Video", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Paid Posts - Chat", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Paid Social" },

  { Platform: "LinkedIn", "Use Case": "LinkedIn Influencer Posts - Image", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Influencer Posts - Link", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Influencer Posts - Video", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video" ,'Channel':"Paid Social"},
  { Platform: "LinkedIn", "Use Case": "LinkedIn Influencer Posts - Chat", "Campaign Source": "linkedin_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },

  { Platform: "LinkedIn", "Use Case": "LinkedIn Owned Posts - Image", "Campaign Source": "linkedin_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Owned Posts - Link", "Campaign Source": "linkedin_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Owned Posts - Video", "Campaign Source": "linkedin_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "LinkedIn", "Use Case": "LinkedIn Owned Posts - Chat", "Campaign Source": "linkedin_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },

  { Platform: "Online Video", "Use Case": "Online Video", "Campaign Source": "OLV_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Online Video" },
  { Platform: "Online Video", "Use Case": "Online Video - Native", "Campaign Source": "OLV_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Native", "Campaign Content": "video",'Channel':"Online Video"  },
  { Platform: "Online Video", "Use Case": "Online Video Integration - Image", "Campaign Source": "OLV_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Online Video"  },
  { Platform: "Online Video", "Use Case": "Online Video Integration - Link", "Campaign Source": "OLV_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Online Video"  },
  { Platform: "Online Video", "Use Case": "Online Video Integration - Video", "Campaign Source": "OLV_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Online Video"  },

  { Platform: "Cinema", "Use Case": "OOH - Cinema", "Campaign Source": "cinema_p", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr", "Channel": "Cinema" },
  { Platform: "Digital OOH", "Use Case": "OOH - Digital", "Campaign Source": "digooh_p", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr","Channel": "Digital Out Of Home" },
  { Platform: "Store Signage", "Use Case": "OOH - In-Store Signage", "Campaign Source": "signage_p", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr" ,"Channel": "In-Store Signage"},
  { Platform: "Print", "Use Case": "OOH - Print", "Campaign Source": "print_p", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr", "Channel": "Print"},
  { Platform: "Packaging", "Use Case": "OOH - Packaging", "Campaign Source": "packaging_o", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr", 'Channel':"Packaging" },
  { Platform: "Transit", "Use Case": "OOH - Transit", "Campaign Source": "transit_o", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr",'Channel':"Transit"},
  { Platform: "Uber", "Use Case": "Uber - Transit", "Campaign Source": "transit_o", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "uber",'Channel':"Transit" },
  { Platform: "Other", "Use Case": "OOH - Other", "Campaign Source": "other_o", "Campaign Medium": "OOH", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr", "Channel": "Owned Other" },

  { Platform: "Other Audio", "Use Case": "Other Audio - Image", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Audio" },
  { Platform: "Other Audio", "Use Case": "Other Audio - Link", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Audio" },
  { Platform: "Other Audio", "Use Case": "Other Audio - Video", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Audio" },
  { Platform: "Other Audio", "Use Case": "Other Audio Integration - Image", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Audio" },
  { Platform: "Other Audio", "Use Case": "Other Audio Integration - Link", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Audio" },
  { Platform: "Other Audio", "Use Case": "Other Audio Integration - Video", "Campaign Source": "audio_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video" ,'Channel':"Audio"},


  { Platform: "Other Digital", "Use Case": "Other Digital - Image", "Campaign Source": "otherdigital_p", "Campaign Medium": "Other", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image" },
  { Platform: "Other Digital", "Use Case": "Other Digital - Link", "Campaign Source": "otherdigital_p", "Campaign Medium": "Other", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" },
  { Platform: "Other Digital", "Use Case": "Other Digital - Video", "Campaign Source": "otherdigital_p", "Campaign Medium": "Other", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video" },
  { Platform: "Other Marketplaces", "Use Case": "Other Marketplaces - Image", "Campaign Source": "digmkt_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Organic Shopping" },
  { Platform: "Other Marketplaces", "Use Case": "Other Marketplaces - Link", "Campaign Source": "digmkt_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Organic Shopping" },
  { Platform: "Other Marketplaces", "Use Case": "Other Marketplaces - Video", "Campaign Source": "digmkt_p", "Campaign Medium": "DigMkt", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Organic Shopping" },
  { Platform: "Other Search", "Use Case": "Other Search - Image", "Campaign Source": "search_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image","Channel":"Search" },
  { Platform: "Other Search", "Use Case": "Other Search - Link", "Campaign Source": "search_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link","Channel":"Search" },
  { Platform: "Other Search", "Use Case": "Other Search - Video", "Campaign Source": "search_p", "Campaign Medium": "Search", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video","Channel":"Search" },
  { Platform: "Other Social", "Use Case": "Other Social Paid Posts - Image", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Paid Posts - Link", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Paid Posts - Video", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Paid Posts - Chat", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Influencer Posts - Image", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Influencer Posts - Link", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Influencer Posts - Video", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Influencer Posts - Chat", "Campaign Source": "social_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Other Social", "Use Case": "Other Social Owned Posts - Image", "Campaign Source": "social_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image" },
  { Platform: "Other Social", "Use Case": "Other Social Owned Posts - Link", "Campaign Source": "social_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" },
  { Platform: "Other Social", "Use Case": "Other Social Owned Posts - Video", "Campaign Source": "social_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video" },
  { Platform: "Other Social", "Use Case": "Other Social Owned Posts - Chat", "Campaign Source": "social_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat" },
  { Platform: "Owned Web", "Use Case": "Owned Web - Link", "Campaign Source": "web_o", "Campaign Medium": "OWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link", "Channel": "Owned Web" },
  { Platform: "Owned Web", "Use Case": "Owned Web - QR", "Campaign Source": "web_o", "Campaign Medium": "OWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr","Channel": "Owned Web"},
  { Platform: "Owned Web", "Use Case": "Owned Web - Video", "Campaign Source": "web_o", "Campaign Medium": "OWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video","Channel": "Owned Web"},
  { Platform: "Owned App", "Use Case": "Owned App - Image", "Campaign Source": "app_o", "Campaign Medium": "OApp", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image","Channel": "Owned Web"  },
  { Platform: "Owned App", "Use Case": "Owned App - Link", "Campaign Source": "app_o", "Campaign Medium": "OApp", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,"Channel": "Owned Web" },
  { Platform: "Owned App", "Use Case": "Owned App - Video", "Campaign Source": "app_o", "Campaign Medium": "OApp", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video","Channel": "Owned Web"  },
  { Platform: "Owned Web", "Use Case": "Owned Web - Image", "Campaign Source": "web_o", "Campaign Medium": "OWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image","Channel": "Owned Web"},
  { Platform: "Owned Web", "Use Case": "Partner Web - Link", "Campaign Source": "web_p", "Campaign Medium": "PWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link"},
  { Platform: "Owned Web", "Use Case": "Partner Web - QR", "Campaign Source": "web_p", "Campaign Medium": "PWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "qr","Channel": "Owned Web"},
  { Platform: "Owned Web", "Use Case": "Partner Web - Video", "Campaign Source": "web_p", "Campaign Medium": "PWeb", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video","Channel": "Owned Web" },
  { Platform: "Pinterest", "Use Case": "Pinterest Paid Posts - Image", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Paid Posts - Link", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Paid Posts - Video", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Paid Posts - Chat", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat" ,'Channel':"Paid Social"},
  { Platform: "Pinterest", "Use Case": "Pinterest Owned Posts - Image", "Campaign Source": "pinterest_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Owned Posts - Link", "Campaign Source": "pinterest_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Owned Posts - Video", "Campaign Source": "pinterest_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Owned Posts - Chat", "Campaign Source": "pinterest_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Influencer Posts - Image", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Influencer Posts - Link", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Influencer Posts - Video", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Pinterest", "Use Case": "Pinterest Influencer Posts - Chat", "Campaign Source": "pinterest_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Paid Posts - Image", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Paid Posts - Link", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,'Channel':"Paid Social"},
  { Platform: "Snapchat", "Use Case": "Snapchat Paid Posts - Video", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Paid Posts - Chat", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Owned Posts - Image", "Campaign Source": "snap_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Owned Posts - Link", "Campaign Source": "snap_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Owned Posts - Video", "Campaign Source": "snap_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Owned Posts - Chat", "Campaign Source": "snap_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Influencer Posts - Image", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Influencer Posts - Link", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Influencer Posts - Video", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Snapchat", "Use Case": "Snapchat Influencer Posts - Chat", "Campaign Source": "snap_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Spotify", "Use Case": "Spotify - Image", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Audio" },
  { Platform: "Spotify", "Use Case": "Spotify - Link", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Audio" },
  { Platform: "Spotify", "Use Case": "Spotify - Video", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Audio" },
  { Platform: "Spotify", "Use Case": "Spotify Integration - Image", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Audio" },
  { Platform: "Spotify", "Use Case": "Spotify Integration - Link", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Audio" },
  { Platform: "Spotify", "Use Case": "Spotify Integration - Video", "Campaign Source": "spotify_p", "Campaign Medium": "Audio", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Audio" },
  { Platform: "TikTok", "Use Case": "TikTok Paid Posts - Image", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Paid Posts - Link", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Paid Posts - Video", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Paid Posts - Chat", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Owned Posts - Image", "Campaign Source": "tiktok_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "TikTok", "Use Case": "TikTok Owned Posts - Link", "Campaign Source": "tiktok_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "TikTok", "Use Case": "TikTok Owned Posts - Video", "Campaign Source": "tiktok_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "TikTok", "Use Case": "TikTok Owned Posts - Chat", "Campaign Source": "tiktok_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },
  { Platform: "TikTok", "Use Case": "TikTok Influencer Posts - Image", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Influencer Posts - Video", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Influencer Posts - Chat", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "TikTok", "Use Case": "TikTok Influencer Posts - Link", "Campaign Source": "tiktok_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch - Image", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch - Link", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch - Video", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch Influencer or Integration - Image", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch Influencer or Integration - Link", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link" ,'Channel':"Paid Social"},
  { Platform: "Twitch", "Use Case": "Twitch Influencer or Integration - Video", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Twitch", "Use Case": "Twitch Influencer or Integration - Chat", "Campaign Source": "twitch_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat" ,'Channel':"Paid Social"},
  { Platform: "Twitter", "Use Case": "Twitter Paid Posts - Image", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Paid Posts - Link", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Paid Posts - Video", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video" ,'Channel':"Paid Social"},
  { Platform: "Twitter", "Use Case": "Twitter Paid Posts - Chat", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat" ,'Channel':"Paid Social"},
  { Platform: "YouTube", "Use Case": "YouTube Infuencer - Link", "Campaign Source": "yt_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link" ,'Channel':"Online Video"},
  { Platform: "Twitter", "Use Case": "Twitter Influencer Posts - Image", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "image",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Influencer Posts - Link", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "link",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Influencer Posts - Video", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Influencer Posts - Chat", "Campaign Source": "twitter_p", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "chat",'Channel':"Paid Social" },
  { Platform: "Twitter", "Use Case": "Twitter Owned Posts - Image", "Campaign Source": "twitter_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Owned Social" },
  { Platform: "Twitter", "Use Case": "Twitter Owned Posts - Link", "Campaign Source": "twitter_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link",'Channel':"Owned Social" },
  { Platform: "Twitter", "Use Case": "Twitter Owned Posts - Video", "Campaign Source": "twitter_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Owned Social" },
  { Platform: "Twitter", "Use Case": "Twitter Owned Posts - Chat", "Campaign Source": "twitter_o", "Campaign Medium": "social", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "chat",'Channel':"Owned Social" },
  { Platform: "WhatsApp", "Use Case": "WhatsApp Owned - Link", "Campaign Source": "whatsapp_o", "Campaign Medium": "Link", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" },
  { Platform: "YouTube", "Use Case": "YouTube Infuencer - Video", "Campaign Source": "yt_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "Intg", "Campaign Content": "video" ,'Channel':"Online Video" },
  { Platform: "YouTube", "Use Case": "YouTube Owned - Link", "Campaign Source": "yt_o", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,'Channel':"Online Video" },
  { Platform: "YouTube", "Use Case": "YouTube Owned - Video", "Campaign Source": "yt_o", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video",'Channel':"Online Video"  },
  { Platform: "YouTube", "Use Case": "YouTube Paid - Image", "Campaign Source": "yt_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "image",'Channel':"Online Video"  },
  { Platform: "YouTube", "Use Case": "YouTube Paid - Link", "Campaign Source": "yt_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "link" ,'Channel':"Online Video" },
  { Platform: "YouTube", "Use Case": "YouTube Paid - Video", "Campaign Source": "yt_p", "Campaign Medium": "Video", "Campaign Name": "Campaign Name", "Campaign Term": "n/a", "Campaign Content": "video" ,'Channel':"Online Video" },
];
let filteredTaxonomy = utmTaxonomy; // Start with all data
$(document).ready(function() {
  $('#utm-link-table').DataTable({
    "searching": false, // Disable the search box
    "paging": false,     // Disable pagination controls
    "info": false        // Disable the "Showing ... entries" message
  });
});
// Populate Platform Select Options
function populatePlatformSelect() {
  platformSelect.innerHTML = '<option value="">-- Platform --</option>';

  const uniquePlatforms = new Set(filteredTaxonomy.map(item => item.Platform));

  for (const platform of uniquePlatforms) {
    const option = document.createElement('option');
    option.value = platform;
    option.text = platform;
    platformSelect.add(option);
  }
}

// Populate Use Case Select Options
function populateUseCaseSelect() {
  useCaseSelect.innerHTML = '<option value="">-- Use Case --</option>';

  const selectedPlatform = platformSelect.value;

  // Filter taxonomy based on selected platform
  const filteredUseCases = filteredTaxonomy.filter(item => item.Platform === selectedPlatform);

  const uniqueUseCases = new Set(filteredUseCases.map(item => item["Use Case"]));
  for (const useCase of uniqueUseCases) {
    const option = document.createElement('option');
    option.value = useCase;
    option.text = useCase;
    useCaseSelect.add(option);
  }
}

// Initial population on page load
populatePlatformSelect();
populateUseCaseSelect();



// Event listener for platform select
platformSelect.addEventListener('change', () => {
  populateUseCaseSelect(); // Update use case dropdown based on selected platform
});

function generateUTM(event) {
  event.preventDefault();

  const baseUrl = urlInput.value;
  const selectedUseCase = useCaseSelect.value;
  const customCampaign = campaignNameInput.value;
  const brand = document.getElementById('brand-input').value; // Get the brand input value

  const taxonomyEntry = filteredTaxonomy.find(item => item["Use Case"] === selectedUseCase);

  if (taxonomyEntry) {
    const utmSource = taxonomyEntry["Campaign Source"];
    const utmMedium = taxonomyEntry["Campaign Medium"];
    const utmContent = taxonomyEntry["Campaign Content"]; 
    const utmChannel = taxonomyEntry["Channel"]
    const marketingChannel = document.getElementById('marketing-channel-value'); // Get the new element
    const aepTracking = document.getElementById('aep-value')

    // Add utm_content to the parameters
    let utmParameters = `?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${customCampaign}&utm_content=${utmContent}`; 

    // Add utm_brand to the parameters if it's populated
    if (brand) {
      utmParameters += `&utm_brand=${brand}`;
    }

    const generatedUTMUrl = baseUrl + utmParameters;

    utmOutput.textContent = generatedUTMUrl;
    marketingChannel.textContent = utmChannel ? "   " + utmChannel : "  Unassigned";
    aepTracking.textContent = utmSource+'|'+utmMedium+'|'+customCampaign+'|'+utmContent;
    const table = $('#utm-link-table').DataTable();
    table.row.add([
      customCampaign,
      selectedUseCase,
      generatedUTMUrl
    ]).draw(false);
  } else {
    utmOutput.textContent = "Please select a use case.";
  }
}
/* Bottle animations
utmForm = document.querySelector('#utm-form')
utmForm.addEventListener('submit', () => {
  
  //Then trigger the bottle animation
  if (! document.body.classList.contains('dark-mode')){
  animateBottles(); 
  }
});*/

// Function to create and animate the bottles on form submit 
function animateBottles() {
    const numBottles = Math.floor(Math.random() * 15) + 16;
    for (let i = 0; i < numBottles; i++) {
      const bottle = document.createElement('img');
      bottle.src = '/public/images/coke-explosion.png'; 
      bottle.classList.add('bottle-animation');
  
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let dx = (Math.random() - 0.5) * 20; 
      let dy = (Math.random() - 0.5) * 20; 
      let rotationSpeed = (Math.random() - 0.5) * 15; 
      let scaleFactor = 1; 
      let scaleDirection = 1; 
  
      bottle.style.left = `${x}px`;
      bottle.style.top = `${y}px`;
  
      body.appendChild(bottle);
  
      // Update bottle every 5 milliseconds
      const intervalId = setInterval(() => {
        // Update position
        x += dx;
        y += dy;
  
        //bouncing with rotation and scaling
        if (x + bottle.width > window.innerWidth || x < 0) {
          dx = -dx * 0.95; // energy loss on bounce
          rotationSpeed = -rotationSpeed * 1.1; // More spin on bounce
          scaleDirection *= -1; // Reverse scaling direction
        }
        if (y + bottle.height > window.innerHeight || y < 0) {
          dy = -dy * 0.95; // Slight energy loss on bounce
          rotationSpeed = -rotationSpeed * 1.1; // More spin on bounce!
          scaleDirection *= -1; // Reverse scaling direction
        }
  
        // Apply rotation and scaling
        bottle.style.transform = `rotate(${rotationSpeed}deg) scale(${scaleFactor})`;
  
        // Update scale for a pulsing effect
        scaleFactor += 0.02 * scaleDirection; 
        if (scaleFactor > 1.2 || scaleFactor < 0.8) {
          scaleDirection *= -1; 
        }
  
        bottle.style.left = `${x}px`;
        bottle.style.top = `${y}px`;
      }, 5); 
  
      // Remove bottle after 3 seconds
      setTimeout(() => {
        clearInterval(intervalId); 
        bottle.remove();
      }, 1000);
    }
  }

const copyButton = document.getElementById('copy-button');
const copyAnimation = document.getElementById('copy-animation');

    copyButton.addEventListener('click', () => {
      const utmUrl = utmOutput.textContent;

      navigator.clipboard.writeText(utmUrl)
        .then(() => {
          // Add the "copied" class to trigger the animation
          copyButton.classList.add('copied');

          // Remove the "copied" class after a short delay to reset the animation
          setTimeout(() => {
            copyButton.classList.remove('copied');
          }, 1000); // Adjust delay as needed (in milliseconds)
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
    });


 






    // Function to toggle dark mode
    function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class
    }

    




    async function copyToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Text copied to clipboard');
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
      
      copyButton.addEventListener('click', () => {
        const utmUrlToCopy = utmOutput.textContent;
        copyToClipboard(utmUrlToCopy);
        copyAnimation.style.display = 'block'; 
        copyAnimation.classList.add('copy-animation-effect');
      
        setTimeout(() => {
          copyAnimation.style.display = 'none';
          copyAnimation.classList.remove('copy-animation-effect');
        }, 2000); // Hide after 2 seconds
      });
      
