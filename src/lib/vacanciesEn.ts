// ВАКАНСИИ ÁLIS BEAUTY — английская версия (тот же порядок и ключи полей, что в vacancies.ts).
import type { CAREER as CareerRu } from "./vacancies";

export const CAREER_EN: typeof CareerRu = {
  salon: {
    title: "Careers at ÁLIS BEAUTY",
    intro: [
      "ÁLIS BEAUTY is a beauty salon that sets the standard of service in Novorossiysk. We work with demanding clients, value flawless execution and build a team of specialists for whom the profession means craftsmanship and reputation.",
      "We welcome specialists who are ready to work at a high level and grow together with the brand.",
    ],
    offerTitle: "We offer",
    offer: [
      "a steady client base and a full schedule;",
      "professional products and equipment;",
      "a strong team and a culture of mutual support;",
      "a professional growth path: TOP specialist status, training and the brand's on-location projects.",
    ],
    howTitle: "How to apply",
    how: "Choose a position and fill in the form below. Your portfolio is the key selection criterion, so please attach high-quality photos of your work.",
    positions: [
      {
        title: "Makeup artist",
        lead: "We are looking for a specialist who creates refined, long-lasting looks and has a fine sense of each client's individuality.",
        tasks: [
          "day, evening, bridal and mature-skin makeup, makeup for photo and video shoots;",
          "creating a look that suits the client's features, the occasion and their wishes;",
          "expert advice on skincare and choosing cosmetics;",
          "following hygiene standards and keeping the workstation spotless.",
        ],
        reqs: [
          "at least 6 months of experience and a professional portfolio;",
          "confident technique and the ability to work with any skin type and age;",
          "long-wearing makeup that lasts through long events;",
          "punctuality, tact and a high standard of client service;",
          "bridal experience and the ability to create complete looks are a plus.",
        ],
      },
      {
        title: "Hair colourist",
        lead: "We are looking for a specialist with a deep understanding of colour theory who can perform advanced colouring techniques at a premium service level.",
        tasks: [
          "advanced colouring: blonde, AirTouch, balayage, shatush, toning, colour correction from dark shades;",
          "women's haircuts and blow-dry styling;",
          "restorative and conditioning treatments;",
          "advising clients on the right shade and home care.",
        ],
        reqs: [
          "at least 1 year of experience as a colourist and a before/after portfolio;",
          "professional knowledge of colour theory and colour-correction skills;",
          "experience with professional hair-colour brands;",
          "care for the condition of the client's hair;",
          "styling with hot tools is a plus.",
        ],
      },
      {
        title: "Brow artist",
        lead: "We are looking for a specialist who creates a natural, harmonious brow shape that enhances the client's features.",
        tasks: [
          "brow mapping based on facial proportions;",
          "brow tinting;",
          "brow lamination;",
          "lash lift and lash tinting.",
        ],
        reqs: [
          "at least 6 months of experience and a portfolio;",
          "precision, symmetry and attention to detail;",
          "strict compliance with sanitary standards;",
          "waxing and brow-lightening skills are a plus.",
        ],
      },
      {
        title: "Makeup & brow artist",
        lead: "We are looking for a versatile specialist who can create a complete look — from brow mapping to finished makeup.",
        tasks: [
          "the full range of brow services: mapping, tinting, lamination;",
          "day, evening and bridal makeup.",
        ],
        reqs: [
          "proven experience and a portfolio in both areas;",
          "a strong sense of style and the ability to work efficiently without compromising quality;",
          "attentiveness and a high standard of service.",
        ],
      },
      {
        title: "Nail technician",
        lead: "We are looking for a manicure and pedicure specialist for whom a flawless finish and sterility are a non-negotiable standard.",
        tasks: [
          "combined and e-file manicure, gel polish;",
          "levelling, strengthening, extensions and infills;",
          "nail art: French, chrome powders, stamping, hand painting;",
          "e-file pedicure.",
        ],
        reqs: [
          "at least 1 year of experience and a portfolio with close-up photos;",
          "flawless cuticle work, a clean nail structure and long-lasting polish;",
          "strict compliance with sterilisation protocols;",
          "a well-groomed appearance and a perfectly tidy workstation;",
          "a manicure with polish in no more than 2 hours.",
        ],
      },
    ],
    note: "Our artists can earn TOP artist status, which is confirmed every month based on the quality of work, reviews and returning clients.",
    formIntro: "Thank you for your interest in ÁLIS BEAUTY. The form takes about 7 minutes. Every application is reviewed personally; if you meet the requirements, we will contact you to invite you to an interview. Fields marked with an asterisk (*) are required.",
    form: [
      { title: "1. Contact information", fields: [
        { key: "name", label: "First and last name", required: true },
        { key: "age", label: "Age", required: true },
        { key: "phone", label: "Phone number", required: true, type: "phone" },
        { key: "contact", label: "Preferred way to contact you", required: true, type: "select", options: ["Messenger on this phone number", "Telegram", "Other"] },
        { key: "profile", label: "Link to your professional profile (social media, Telegram channel, website)" },
        { key: "district", label: "District of Novorossiysk or town you live in", required: true },
      ] },
      { title: "2. Professional experience", fields: [
        { key: "position", label: "Position you are applying for", required: true, type: "select", options: ["Makeup artist", "Hair colourist", "Brow artist", "Makeup & brow artist", "Nail technician"] },
        { key: "experience", label: "Experience in your specialty", required: true, type: "select", options: ["under 6 months", "6–12 months", "1–3 years", "over 3 years"] },
        { key: "workplace", label: "Current or most recent workplace (salon, studio, private practice)", required: true },
        { key: "services", label: "Services you perform at a professional level", required: true, type: "textarea" },
        { key: "growth", label: "Areas you plan to develop in", type: "textarea" },
        { key: "education", label: "Professional education and advanced training (school, mentor, year)", type: "textarea" },
        { key: "brands", label: "Products and brands you work with" },
      ] },
      { title: "3. Portfolio", fields: [
        { key: "portfolio", label: "Link to 5–10 photos of your work (cloud, profile)", required: true, note: "Photo requirements: high resolution, daylight, close-up, no filters or retouching. For colouring and brows — before/after photos. For nail services — close-ups of the cuticle and side walls. Only your own unedited work is accepted." },
        { key: "photo", label: "Your photo — link (optional)" },
      ] },
      { title: "4. Terms", fields: [
        { key: "start", label: "Date you can start", required: true, type: "date" },
        { key: "income", label: "Expected income" },
        { key: "medbook", label: "Health certificate (medical book)", required: true, type: "select", options: ["I have one", "Ready to get one"] },
        { key: "trial", label: "Ready to do a trial service at the salon", required: true, type: "select", options: ["Yes", "No"] },
      ] },
      { title: "5. Motivation", fields: [
        { key: "why", label: "Why are you considering ÁLIS BEAUTY as a place to work?", type: "textarea" },
        { key: "env", label: "What kind of professional environment helps you do your best work?", type: "textarea" },
      ] },
    ],
  },
  concierge: {
    title: "Careers at ÁLIS BEAUTY Concierge",
    intro: [
      "ÁLIS BEAUTY Concierge is a concierge service creating complete premium looks. Our specialists work wherever is convenient for the client: at hotels, weddings, film sets, private and corporate events. We create looks of any complexity and provide full support to the client throughout the event.",
      "We are building an international team of specialists in Russia and abroad and welcome professionals from other cities and countries.",
    ],
    offerTitle: "We offer",
    offer: [
      "high-level projects: weddings, shoots and events in Russia and Europe;",
      "bookings under the ÁLIS BEAUTY brand with a personal manager supporting every trip;",
      "a branded uniform and professional products;",
      "a fee as a percentage of the project value, terms agreed individually.",
    ],
    howTitle: "How to apply",
    how: "Choose a position and fill in the form below. Your portfolio is the key selection criterion, so please attach high-quality photos of your work.",
    positions: [
      {
        title: "Makeup artist",
        tasks: [
          "creating looks for brides, guests, models and performers on on-location projects;",
          "working with groups of clients under time pressure;",
          "accompanying the client and maintaining the look throughout the event;",
          "working with your own professional kit.",
        ],
        reqs: [
          "at least 1 year of experience, including weddings and on-location projects;",
          "a portfolio at the level of bridal, evening, fashion or editorial makeup;",
          "flawless makeup longevity (12+ hours) that looks right on photo and video;",
          "a fully equipped professional kit;",
          "resilience under stress, punctuality and readiness for early starts and long trips.",
        ],
      },
      {
        title: "Hairstylist",
        tasks: [
          "bridal and evening hairstyles, curls, updos, Hollywood waves;",
          "styling for shoots and events;",
          "working with accessories: veils, hair jewellery, clip-in extensions;",
          "accompanying the client and maintaining the hairstyle throughout the event.",
        ],
        reqs: [
          "at least 1 year of experience and a professional portfolio;",
          "high speed and flawlessly long-lasting results;",
          "makeup skills are a plus.",
        ],
      },
    ],
    extra: {
      title: "International team",
      text: "We welcome makeup artists, hairstylists and all-round specialists living in other cities in Russia and abroad to work with us on projects in Moscow, St Petersburg, the south of Russia, Yerevan, Paris, Cannes and Milan.",
      blocks: [
        { title: "How we work together", items: [
          "projects under the ÁLIS BEAUTY brand in your city, as well as business trips;",
          "a branded uniform and professional products;",
          "a fee as a percentage of the project value.",
        ] },
        { title: "Requirements", items: [
          "at least 2 years of experience and a high-level portfolio;",
          "experience with weddings, events, shoots or the luxury segment;",
          "readiness to work to the brand's standards;",
          "English or another foreign language and readiness to travel are a plus.",
        ] },
      ],
    },
    formIntro: "Thank you for your interest in ÁLIS BEAUTY Concierge. The form takes about 7 minutes. Every application is reviewed personally; if you meet the requirements, we will contact you to discuss working together. Fields marked with an asterisk (*) are required.",
    form: [
      { title: "1. Contact information", fields: [
        { key: "name", label: "First and last name", required: true },
        { key: "age", label: "Age", required: true },
        { key: "phone", label: "Phone number with country code", required: true, type: "phone" },
        { key: "contact", label: "Preferred way to contact you", required: true, type: "select", options: ["Messenger on this phone number", "Telegram", "Other"] },
        { key: "email", label: "Email", type: "email" },
        { key: "profile", label: "Link to your professional profile (social media, website, portfolio)", required: true },
      ] },
      { title: "2. Location and current work", fields: [
        { key: "country", label: "Country of residence", required: true },
        { key: "city", label: "City of residence", required: true },
        { key: "workplace", label: "Current workplace: salon, studio, agency, private practice — name and city", required: true },
        { key: "travel", label: "Readiness to travel", required: true, type: "select", options: ["only in my city", "within my region", "across Russia", "international projects"] },
        { key: "passport", label: "Valid international passport", type: "select", options: ["Yes", "No"] },
        { key: "languages", label: "Foreign languages and level" },
      ] },
      { title: "3. Professional experience", fields: [
        { key: "position", label: "Position you are applying for", required: true, type: "select", options: ["Makeup artist", "Hairstylist", "Makeup artist & hairstylist"] },
        { key: "experience", label: "Experience in your specialty", required: true, type: "select", options: ["1–2 years", "2–5 years", "over 5 years"] },
        { key: "outcall", label: "On-location experience (you can choose several)", required: true, type: "multi", options: ["weddings", "shoots", "events", "fashion show backstage", "other"] },
        { key: "looks", label: "How many looks you can create in one wedding or event morning" },
        { key: "education", label: "Professional education and advanced training (school, mentor, year)", type: "textarea" },
        { key: "kit", label: "Your own professional kit and tools", required: true, type: "select", options: ["Fully equipped", "Partly", "No"] },
      ] },
      { title: "4. Portfolio", fields: [
        { key: "portfolio", label: "Link to 8–15 photos of your work (cloud, profile)", required: true, note: "Photo requirements: high resolution, daylight or professional photography, no filters. Show different styles: bridal, evening and shoot work. Only your own unedited work is accepted." },
        { key: "video", label: "Link to a video of your work or process (if any)" },
        { key: "photo", label: "Your photo — link (optional)" },
      ] },
      { title: "5. Terms", fields: [
        { key: "availability", label: "Days and periods when you are available for projects", required: true },
        { key: "rate", label: "Expected fee per look or per day (with currency)" },
        { key: "why", label: "Why are you considering working with ÁLIS BEAUTY?", type: "textarea" },
      ] },
    ],
  },
};
