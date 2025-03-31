const chatbot = document.querySelector(".chatbot");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatMessages = document.querySelector(".chatbot-messages");
const chatInput = document.querySelector(".chat-input textarea");
const sendButton = document.querySelector(".send-btn");

// Responses based on index.html content
const responses = {
    // General Information
    "service": "We offer various services including:\n- Coffee Shop with local refreshments\n- Karaoke & Entertainment Zone\n- Billiards Tables\n- Farm Tours\n- Event Spaces\n- Food Services\nWhich service would you like to know more about?",
    "location": "We are located in Santo Niño Purok II, Manolo Fortich, Bukidnon, Philippines. You can find us:\n- Easy to access by private vehicle\n- Look for our farm signage\n- Ample parking space available\n- Scenic surroundings",
    "hour": "We are open daily. For the most up-to-date operating hours, please:\n1. Check our Facebook page\n2. Contact us directly\n3. Visit our Contact page",
    "direction": "To reach Harah Rubina Del Dios Farm:\n1. Head to Santo Niño, Manolo Fortich\n2. Look for our farm signage\n3. We're easily accessible by private vehicle\n4. For detailed directions, please contact us on Facebook",

    // Menu & Food
    "menu": "Our menu features a variety of options:\n1. Main Dishes (like Pork Adobo - ₱120)\n2. Beverages (Fresh Brewed Coffee - ₱50)\n3. Desserts (Leche Flan - ₱60)\n4. Snacks (Lumpia - ₱80)",
    "food": "We serve both local Filipino favorites and refreshments. Our specialties include:\n- Pork Adobo\n- Fresh Coffee\n- Leche Flan\n- Lumpia\nAll dishes are prepared with quality ingredients. Check our Menu page for the complete selection!",
    "coffee": "Our coffee shop offers:\n- Freshly brewed local coffee\n- Cozy rural setting\n- Perfect for relaxation\n- Paired with delicious snacks",
    "price": "Our prices are reasonable and vary by item:\n- Main dishes: ₱120-200\n- Coffee: from ₱50\n- Desserts: from ₱60\n- Snacks: from ₱80",

    // Activities & Entertainment
    "karaoke": "Our Karaoke facilities feature:\n- Modern karaoke system\n- Comfortable seating\n- Wide song selection\n- Part of our entertainment zone\nPerfect for gatherings and celebrations!",
    "billiard": "Our Billiards area offers:\n- Well-maintained tables\n- Professional equipment\n- Comfortable environment\n- Perfect for both beginners and skilled players",
    "entertainment": "Our Entertainment Zone includes:\n1. Karaoke rooms\n2. Billiards tables\n3. Comfortable seating areas\n4. Perfect for groups and events",
    "tour": "Our Farm Tours offer:\n- Educational agricultural experiences\n- Scenic farm views\n- Interactive learning\n- Perfect for families and groups\nWould you like to book a tour?",
    "activity": "We offer various activities:\n1. Farm Tours\n2. Karaoke\n3. Billiards\n4. Coffee Shop relaxation\n5. Special events\nWhich activity interests you?",

    // Events & Facilities
    "event": "We can host various events:\n- Family gatherings\n- Group meetings\n- Special celebrations\n- Corporate events\nWould you like information about event packages?",
    "parking": "Yes, we have ample parking space available for our visitors. Our parking area features:\n- Secure location\n- Well-lit area\n- Easy access to facilities\n- Free for customers",
    "facility": "Our facilities include:\n1. Coffee Shop\n2. Entertainment Zone\n3. Dining Areas\n4. Parking Space\n5. Event Spaces\nWhich facility would you like to know more about?",

    // About & Contact
    "owner": "Harah Rubina Del Dios Farm is owned by Luisita Oponda. She has developed this place into:\n- A premier recreational destination\n- A hub for authentic farm experiences\n- A family-friendly venue\nWould you like to know more about our story?",
    "history": "Our farm has been growing and enhancing facilities to better serve visitors. We focus on:\n- Quality service\n- Authentic experiences\n- Family-friendly environment\n- Sustainable practices",
    "contact": "You can reach us through:\n1. Facebook Page: https://www.facebook.com/profile.php?id=61555217610211\n2. Visit us in Santo Niño, Manolo Fortich\n3. Use our contact form on the website\nHow would you like to connect with us?",
    "facebook": "Visit our Facebook page at: https://www.facebook.com/profile.php?id=61555217610211\nThere you can find:\n- Latest updates\n- Current offers\n- Operating hours\n- Event announcements",

    // Special Features
    "photo": "Our Photo Gallery showcases:\n1. Farm Views\n2. Food & Drinks\n3. Activities & Events\n4. Entertainment Zone\nWould you like to see our gallery page?",
    "blog": "Check our blog for:\n- Latest updates\n- New menu items\n- Weekend activities\n- Special offers\n- Farm news\nVisit our Blog page for more!",
    "biker": "We're a popular stop for bikers! We offer:\n- Refreshment station\n- Parking space\n- Beautiful views\n- Special deals for biking groups",

    // Common Queries
    "hello": "Hello! Welcome to Harah Rubina Del Dios Farm. How can I assist you today?",
    "hi": "Hi there! Welcome to Harah Rubina Del Dios Farm. How can I assist you today?",
    "bye": "Thank you for chatting with us! We hope to see you at Harah Rubina Del Dios Farm soon. Have a great day!",
    "thank": "You're welcome! If you need anything else, don't hesitate to ask.",
    "help": "I can help you with:\n1. Services & Activities\n2. Menu & Prices\n3. Location & Directions\n4. Events & Bookings\n5. Contact Information",
    "book": "To make a booking:\n1. Contact us through Facebook\n2. Use our contact form\n3. Visit us in person\nWhat would you like to book?",
    "open": "We are open daily. For specific hours:\n- Check our Facebook page\n- Contact us directly\n- Visit our Contact page",
    "cost": "Our pricing varies by service:\n1. Food & Beverages: See our menu page\n2. Activities: Contact for current rates\n3. Events: Custom packages available\nWhat specific prices would you like to know?",
    "weather": "Our farm offers beautiful views and activities in all weather. We recommend:\n- Morning visits for farm tours\n- Afternoon coffee breaks\n- Evening entertainment\nWhen are you planning to visit?",
    "group": "We welcome groups! We offer:\n1. Event spaces\n2. Group activities\n3. Special packages\n4. Catering services\nHow many people are in your group?"
};

// Default response
const defaultResponse = "I'm here to help! You can ask me about:\n1. Our services and facilities\n2. Menu and prices\n3. Location and directions\n4. Events and bookings\n5. Operating hours\n6. Contact information\nWhat would you like to know?";

// Toggle chatbot visibility
chatbotToggler.addEventListener("click", () => {
    chatbot.classList.toggle("show");
});

// Handle sending messages
const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    appendMessage(userMessage, "outgoing");
    chatInput.value = "";

    // Process the message and get response
    setTimeout(() => {
        const response = getBotResponse(userMessage);
        appendMessage(response, "incoming");
    }, 600);
};

// Get bot response based on user input
const getBotResponse = (userInput) => {
    const lowercaseInput = userInput.toLowerCase();

    // Check each keyword in the responses object
    for (const keyword in responses) {
        if (lowercaseInput.includes(keyword)) {
            return responses[keyword];
        }
    }
    
    return defaultResponse;
};

// Add a message to the chat
const appendMessage = (message, type) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", type);
    
    const content = document.createElement("div");
    content.classList.add("message-content");
    content.textContent = message;
    
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Event listeners
sendButton.addEventListener("click", handleChat);
chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

// Close chatbot when clicking outside
document.addEventListener("click", (e) => {
    if (!chatbot.contains(e.target) && chatbot.classList.contains("show")) {
        chatbot.classList.remove("show");
    }
}); 