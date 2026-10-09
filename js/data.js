/**
 * MAHARASHTRIYA KALOPASAK - DATA LAYER (js/data.js)
 * Provides centralized async content fetching with an offline/static fallback.
 * Easily swappable for a REST endpoint / Headless CMS without breaking UI.
 */

let cachedContent = null;

export async function getContent() {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    const response = await fetch('./data/content.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cachedContent = await response.json();
    return cachedContent;
  } catch (error) {
    console.warn('[Data Layer] Failed to fetch content.json, loading embedded fallback:', error);
    cachedContent = getFallbackContent();
    return cachedContent;
  }
}

/**
 * Fallback static dataset in case fetch fails (e.g. offline, direct file opening)
 */
function getFallbackContent() {
  return {
    meta: {
      title: {
        mr: "महाराष्ट्रीय कलोपासक | ६० वर्षांची समृद्ध नाट्य परंपरा - पुणे",
        en: "Maharashtriya Kalopasak | 60+ Years of Theatre Legacy - Pune"
      },
      description: {
        mr: "महाराष्ट्रीय कलोपासक (स्थापना १९६३) – पुरुषोत्तम करंडक, भा.ला.भा. केळकर करंडक आणि राजा नातू करंडक स्पर्धांचे आयोजक. महाराष्ट्राची अग्रगण्य नाट्य संस्था.",
        en: "Maharashtriya Kalopasak (Est. 1963) – Organizers of Purushottam Karandak, Kelkar Karandak, and Raja Natu Karandak. Maharashtra's premier theatre institution."
      }
    },
    nav: {
      brand: { mr: "महाराष्ट्रीय कलोपासक", en: "Maharashtriya Kalopasak" },
      established: { mr: "स्थापना १९६३", en: "Est. 1963" },
      home: { mr: "मुख्य पृष्ठ", en: "Home" },
      about: { mr: "आमच्याबद्दल", en: "About Us" },
      stats: { mr: "वैशिष्ट्ये", en: "Key Highlights" },
      activities: { mr: "उपक्रम व स्पर्धा", en: "Activities" },
      upcoming: { mr: "आगामी कार्यक्रम", en: "Upcoming" },
      testimonials: { mr: "अभिप्राय", en: "Testimonials" },
      contact: { mr: "संपर्क", en: "Contact" }
    },
    hero: {
      badge: {
        mr: "६०+ वर्षांची गौरवशाली नाट्य परंपरा (१९६३ पासून)",
        en: "60+ Years of Glorious Theatre Tradition (Since 1963)"
      },
      headline: {
        mr: "महाराष्ट्रीय कलोपासक - ६० वर्षांची नाट्य परंपरा",
        en: "Maharashtriya Kalopasak – 60 Years of Theatre Tradition"
      },
      subtitle: {
        mr: "महाराष्ट्रातील तरुणाईच्या नाट्य प्रतिभेला आणि एकांकिका चळवळीला दिशा देणारी अग्रगण्य सांस्कृतिक संस्था.",
        en: "Nurturing youth theatre talent and spearheading Maharashtra's intercollegiate drama movement since 1963."
      },
      primaryBtn: { text: { mr: "नाटके पहा", en: "View Plays" }, url: "pages/plays.html" },
      secondaryBtn: { text: { mr: "आमच्याबद्दल जाणून घ्या", en: "Learn More" }, url: "#about" },
      slides: [
        {
          id: 1,
          image: "assets/images/hero-1.svg",
          alt: { mr: "पुरुषोत्तम करंडक अंतिम फेरीतील एकांकिकेचे सादरीकरण", en: "Purushottam Karandak Finals" },
          caption: { mr: "रंगभूमीवरील अफाट ऊर्जा आणि कसदार अभिनय", en: "Electrifying stage performance & masterful acting" }
        },
        {
          id: 2,
          image: "assets/images/hero-2.svg",
          alt: { mr: "भरत नाट्य मंदिर पुणे येथील नाट्य जल्लोष", en: "Bharat Natya Mandir Pune" },
          caption: { mr: "पुण्यातील ऐतिहासिक भरत नाट्य मंदिरातील नाट्य जल्लोष", en: "Celebrating theatrical excellence at historic Pune venues" }
        },
        {
          id: 3,
          image: "assets/images/hero-3.svg",
          alt: { mr: "मानाचा पुरुषोत्तम करंडक वितरण सोहळा", en: "Purushottam Karandak Trophy Award" },
          caption: { mr: "तरुण कलाकारांचा सन्मान आणि मानाचे करंडक वितरण", en: "Honouring young talents with coveted theatre trophies" }
        }
      ]
    },
    about: {
      tag: { mr: "आमच्याबद्दल", en: "About Us" },
      title: { mr: "महाराष्ट्रीय कलोपासक", en: "Maharashtriya Kalopasak" },
      p1: {
        mr: "महाराष्ट्रीय कलोपासक या संस्थेची स्थापना १९६३ मध्ये पुणे येथे झाली. महाराष्ट्रातील महाविद्यालयीन तरुणांच्या कलागुणांना व्यासपीठ मिळवून देणे आणि प्रायोगिक रंगभूमीला नवी दिशा देणे हे संस्थेचे मुख्य उद्दिष्ट राहिले आहे.",
        en: "Founded in 1963 in Pune, Maharashtriya Kalopasak has stood as a cornerstone of Maharashtra's vibrant theatre movement, dedicated to providing a prestigious platform for collegiate actors, playwrights, and directors."
      },
      p2: {
        mr: "गेल्या ६ दशकांहून अधिक काळ 'पुरुषोत्तम करंडक' सह विविध मानाच्या एकांकिका स्पर्धांच्या माध्यमातून कलोपासकने भारतीय चित्रपट व नाट्यसृष्टीला अनेक दिग्गज कलाकार, लेखक व तंत्रज्ञ दिले आहेत.",
        en: "Over six illustrious decades, through the iconic Purushottam Karandak and other state-level competitions, Kalopasak has fostered generations of legendary actors, writers, and technicians in Indian cinema and theatre."
      },
      image: "assets/images/about-archival.svg",
      imageAlt: { mr: "महाराष्ट्रीय कलोपासकचा ऐतिहासिक प्रवास", en: "Maharashtriya Kalopasak archival legacy" },
      btn: { text: { mr: "पूर्ण इतिहास वाचा", en: "Read Full History" }, url: "pages/history.html" }
    },
    stats: {
      tag: { mr: "आमची वाटचाल", en: "Our Journey" },
      title: { mr: "आकडेवारीतील कर्तृत्व", en: "Milestones in Numbers" },
      items: [
        { id: "stat-years", value: 60, suffix: "+", label: { mr: "वर्षे", en: "Years of Legacy" }, description: { mr: "अविरत सांस्कृतिक सेवा (१९६३ पासून)", en: "Continuous cultural legacy since 1963" } },
        { id: "stat-plays", value: 1000, suffix: "+", label: { mr: "एकांकिका", en: "Drama Performances" }, description: { mr: "सादर झालेल्या एकांकिकांचे मंचन", en: "One-act plays staged over decades" } },
        { id: "stat-colleges", value: 500, suffix: "+", label: { mr: "महाविद्यालये", en: "Participating Colleges" }, description: { mr: "महाराष्ट्रभरातील सहभागी संस्था", en: "Colleges participating across Maharashtra" } },
        { id: "stat-karandak", value: 3, suffix: "", label: { mr: "प्रमुख करंडक", en: "Major Karandak Competitions" }, description: { mr: "राज्यातील सर्वोच्च मानाच्या स्पर्धा", en: "Premier state-level championships" } }
      ]
    },
    activities: {
      tag: { mr: "आमचे उपक्रम", en: "Our Activities" },
      title: { mr: "महाराष्ट्रातील आघाडीच्या एकांकिका स्पर्धा", en: "Maharashtra's Premier Intercollegiate Drama Competitions" },
      subtitle: { mr: "तरुण नाट्य प्रतिभेला व्यासपीठ देणाऱ्या तीन प्रमुख वार्षिक करंडक स्पर्धा", en: "Three flagship annual trophy competitions fostering theatrical excellence" },
      items: [
        {
          id: "purushottam",
          title: { mr: "पुरुषोत्तम करंडक", en: "Purushottam Karandak" },
          tagline: { mr: "महाराष्ट्रातील सर्वात प्रतिष्ठेची आणि जुनी आंतरमहाविद्यालयीन एकांकिका स्पर्धा.", en: "Maharashtra's most prestigious and premier intercollegiate one-act play championship." },
          image: "assets/images/karandak-purushottam.svg",
          imageAlt: { mr: "पुरुषोत्तम करंडक मानाचा चषक", en: "Purushottam Karandak Trophy Banner" },
          btn: { text: { mr: "सविस्तर माहिती", en: "View Details" }, url: "pages/activities.html#purushottam" }
        },
        {
          id: "kelkar",
          title: { mr: "भा.ला.भा. केळकर करंडक", en: "Bha.La.Bha. Kelkar Karandak" },
          tagline: { mr: "मौलिक नाट्यलेखन व प्रायोगिक संकल्पनांना प्रोत्साहन देणारी विशेष एकांकिका स्पर्धा.", en: "Special drama competition fostering original scriptwriting and experimental direction." },
          image: "assets/images/karandak-kelkar.svg",
          imageAlt: { mr: "भा.ला.भा. केळकर करंडक चषक", en: "Bha.La.Bha. Kelkar Karandak Trophy Banner" },
          btn: { text: { mr: "सविस्तर माहिती", en: "View Details" }, url: "pages/activities.html#kelkar" }
        },
        {
          id: "natu",
          title: { mr: "राजा नातू करंडक", en: "Raja Natu Karandak" },
          tagline: { mr: "उत्कृष्ट नाट्य दिग्दर्शन, अभिनय कौशल्य आणि रंगमंच तंत्रज्ञानाचा सन्मान करणारी स्पर्धा.", en: "Competition celebrating brilliant stage direction, acting craft, and technical theatre." },
          image: "assets/images/karandak-natu.svg",
          imageAlt: { mr: "राजा नातू करंडक चषक", en: "Raja Natu Karandak Trophy Banner" },
          btn: { text: { mr: "सविस्तर माहिती", en: "View Details" }, url: "pages/activities.html#natu" }
        }
      ]
    },
    upcoming: {
      active: true,
      fallback_behavior: "empty_state",
      badge: { mr: "आगामी उपक्रम", en: "Upcoming Activity" },
      title: { mr: "पुरुषोत्तम करंडक २०२५ स्पर्धा वेळापत्रक व तिकीट विक्री", en: "Purushottam Karandak 2025 Schedule & Ticket Updates" },
      pills: {
        date: { label: { mr: "दिनांक", en: "Date" }, value: { mr: "ऑगस्ट - सप्टेंबर २०२५", en: "August – September 2025" } },
        venue: { label: { mr: "स्थळ", en: "Venue" }, value: { mr: "भरत नाट्य मंदिर, सदाशिव पेठ, पुणे", en: "Bharat Natya Mandir, Sadashiv Peth, Pune" } },
        status: { label: { mr: "स्थिती", en: "Status" }, value: { mr: "नोंदणी व तिकीट विक्री सुरू", en: "Registration & Tickets Open" } }
      },
      btn: { text: { mr: "माहिती व वेळापत्रक पहा", en: "View Details & Schedule" }, url: "pages/activities.html#purushottam" }
    },
    testimonials: {
      tag: { mr: "अभिप्राय", en: "Testimonials" },
      title: { mr: "आमच्याबद्दल मान्यवरांचे मत", en: "What People Talk About Us" },
      items: [
        { id: 1, quote: { mr: "पुरुषोत्तम करंडक ही केवळ स्पर्धा नसून प्रत्येक नाट्यप्रेमी विद्यार्थ्याची स्वप्नपूर्ती आहे. कलोपासकने मला रंगभूमीची खरी शिस्त शिकवली.", en: "Purushottam Karandak is not just a competition, but the realization of every young artist's dream." }, author: { mr: "सुधीर फडके (काल्पनिक नाव)", en: "Sudhir Phadke (Placeholder)" }, role: { mr: "ज्येष्ठ रंगकर्मी व माजी विजेता", en: "Veteran Theatre Artist & Past Winner" }, initials: "SF", avatar: "assets/images/avatar-1.svg" },
        { id: 2, quote: { mr: "गेल्या ६ दशकांपासून महाराष्ट्रातील आंतरमहाविद्यालयीन नाटकांना असा दर्जेदार मंच देणारी कलोपासक ही एकमेव दीपस्तंभ संस्था आहे.", en: "For over six decades, Kalopasak has remained the single greatest beacon guiding collegiate theatre." }, author: { mr: "डॉ. मंदार गोखले (काल्पनिक नाव)", en: "Dr. Mandar Gokhale (Placeholder)" }, role: { mr: "नाट्य समीक्षक व प्राध्यापक", en: "Drama Critic & Professor" }, initials: "MG", avatar: "assets/images/avatar-2.svg" },
        { id: 3, quote: { mr: "भरत नाट्य मंदिरातील ती घंटा आणि कलोपासकच्या मंचावर सादर झालेली एकांकिका आजही माझ्या आयुष्यातील सर्वात मोठा अभिमानाचा क्षण आहे.", en: "Performing on the Kalopasak stage remains the proudest milestone of my creative life." }, author: { mr: "अनन्या कुलकर्णी (काल्पनिक नाव)", en: "Ananya Kulkarni (Placeholder)" }, role: { mr: "सर्वोत्कृष्ट अभिनेत्री पुरस्कार विजेती", en: "Best Actress Award Winner" }, initials: "AK", avatar: "assets/images/avatar-3.svg" },
        { id: 4, quote: { mr: "भा.ला.भा. केळकर करंडकाने मला लेखनाची प्रेरणा दिली. प्रायोगिक लेखनाला कलोपासक जितके स्वातंत्र्य देते, तितके क्वचितच कुठे मिळते.", en: "The Bha.La.Bha. Kelkar Karandak sparked my passion for playwriting." }, author: { mr: "समीर जोशी (काल्पनिक नाव)", en: "Sameer Joshi (Placeholder)" }, role: { mr: "नाट्य लेखक व पटकथाकार", en: "Playwright & Screenwriter" }, initials: "SJ", avatar: "assets/images/avatar-4.svg" },
        { id: 5, quote: { mr: "विद्यार्थ्यांच्या ऊर्जेला व्यासपीठ मिळवून देण्यात कलोपासकचा वाटा अतुलनीय आहे. पुण्यातील नाट्यसंस्कृतीचा हा खरा प्राण आहे.", en: "Kalopasak's contribution to channelising youthful energy into theatrical mastery is peerless." }, author: { mr: "अनुराधा देशपांडे (काल्पनिक नाव)", en: "Anuradha Deshpande (Placeholder)" }, role: { mr: "नाट्य दिग्दर्शिका", en: "Theatre Director" }, initials: "AD", avatar: "assets/images/avatar-5.svg" },
        { id: 6, quote: { mr: "६० वर्षांची ही अखंड परंपरा महाराष्ट्राच्या सांस्कृतिक श्रीमंतीची साक्ष देते. कलोपासकच्या प्रत्येक कार्यकर्त्याचे कार्य कौतुकास्पद आहे.", en: "This unbroken 60-year tradition stands as testimony to Maharashtra's cultural richness." }, author: { mr: "प्रशांत चितळे (काल्पनिक नाव)", en: "Prashant Chitale (Placeholder)" }, role: { mr: "नाट्य रसिक व माजी परीक्षक", en: "Theatre Connoisseur & Past Juror" }, initials: "PC", avatar: "assets/images/avatar-6.svg" }
      ]
    },
    contact: {
      tag: { mr: "संपर्क", en: "Contact Us" },
      title: { mr: "आमच्याशी संपर्क साधा", en: "Get in Touch with Kalopasak" },
      subtitle: { mr: "स्पर्धा, नोंदणी, तिकीट किंवा इतर चौकशीसाठी आमच्या कार्यालयाशी संपर्क साधा.", en: "Reach out to our office for competition queries, registration, tickets, or general assistance." },
      description: { mr: "महाराष्ट्रीय कलोपासक ही १९६३ पासून महाराष्ट्राच्या नाट्यक्षेत्रात कार्यरत असलेली अग्रगण्य संस्था आहे.", en: "Maharashtriya Kalopasak is a premier cultural institution shaping theatre in Maharashtra since 1963." },
      address: {
        label: { mr: "कार्यालयाचा पत्ता", en: "Office Address" },
        lines: {
          mr: ["महाराष्ट्रीय कलोपासक", "सदाशिव पेठ, भरत नाट्य मंदिर जवळ,", "पुणे - ४११०३०, महाराष्ट्र, भारत"],
          en: ["Maharashtriya Kalopasak", "Near Bharat Natya Mandir, Sadashiv Peth,", "Pune - 411030, Maharashtra, India"]
        }
      },
      phone: { label: { mr: "दूरध्वनी क्रमांक", en: "Phone Numbers" }, display: "०२०-००००-०००० / +९१ ९८००० ०००००", raw: "+919800000000" },
      email: { label: { mr: "ईमेल पत्ता", en: "Email Address" }, display: "contact@kalopasak-pune.org", raw: "mailto:contact@kalopasak-pune.org" },
      hours: { label: { mr: "कार्यालयीन वेळ", en: "Office Timings" }, value: { mr: "सोमवार ते शनिवार: सकाळी १०:०० ते सायंकाळी ६:०० (रविवार सुट्टी)", en: "Monday to Saturday: 10:00 AM – 6:00 PM (Sunday Closed)" } },
      map: {
        title: { mr: "महाराष्ट्रीय कलोपासक कार्यालय नकाशा", en: "Maharashtriya Kalopasak Location Map" },
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2504899532857!2d73.8497672!3d18.5175949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06518ff7e37%3A0x6a0c50d30cf8ee93!2sBharat%20Natya%20Mandir!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
      },
      socials: [
        { id: "facebook", name: "Facebook", url: "https://www.facebook.com" },
        { id: "instagram", name: "Instagram", url: "https://www.instagram.com" },
        { id: "youtube", name: "YouTube", url: "https://www.youtube.com" },
        { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com" }
      ]
    },
    footer: {
      quickLinksTitle: { mr: "जलद दुवे", en: "Quick Links" },
      aboutOrgTitle: { mr: "संस्थेविषयी", en: "About Organisation" },
      quickLinks: [
        { text: { mr: "मुख्य पृष्ठ", en: "Home" }, url: "#home" },
        { text: { mr: "आमच्याबद्दल", en: "About Us" }, url: "#about" },
        { text: { mr: "इतिहास", en: "History" }, url: "pages/history.html" },
        { text: { mr: "उपक्रम व स्पर्धा", en: "Activities" }, url: "pages/activities.html" },
        { text: { mr: "छायाचित्रे", en: "Gallery" }, url: "pages/gallery.html" },
        { text: { mr: "बातम्या व लेख", en: "News & Articles" }, url: "pages/news.html" },
        { text: { mr: "नाटके संग्रह", en: "Plays Archive" }, url: "pages/plays.html" },
        { text: { mr: "संपर्क", en: "Contact Us" }, url: "#contact" }
      ],
      copyright: {
        mr: "© २०२६ महाराष्ट्रीय कलोपासक, पुणे. सर्व हक्क राखीव.",
        en: "© 2026 Maharashtriya Kalopasak, Pune. All Rights Reserved."
      }
    }
  };
}
