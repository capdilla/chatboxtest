
# Coding Assessment: Chatbox Enhancement

## 🎯 Your Task

Your mission is to transform this chatbot into an extraordinary conversational agent. Here's what you need to do:

1. **Onboarding Questions**: Develop a feature to ask users three onboarding questions:
   - What is their favorite country?
   - What is their favorite continent?
   - What is their favorite destination?

2. **General Purpose Chatbot**: Post-onboarding, the chatbot should be capable of answering questions related to world geography.

3. **Creativity and Architecture**: We are looking for innovative solutions, creative flair, and robust architectural decisions. This task should take at least 1 hour, but feel free to invest more time to enhance the chatbot's capabilities.

## 📋 Additional Notes

- Utilize environment variables from `.env.example` (OpenAI Keys for this project).
- Implement a streaming chatbot for the chat rendered in `page.tsx` using the `/api/stream` endpoint.
- Leverage OpenAI npm packages, adhere to best practices, and incorporate your own design and functionality ideas.
- Use the GPT 4.1 model.
- Ensure the chat can onboard users, allow them to change preferences, and engage in informative conversations. (No database needed; mock data is sufficient.)

## ✨ Current Features

- **Next.js** (App Router) running on **Node 22.15.0**
- **TypeScript** with `strict` mode enabled
- **Tailwind CSS** for rapid UI styling
- Fixed bottom-right chatbox component
- `/api/stream` **Edge** route that streams an echo response ⚡️
- Stub for integrating an **OpenAI Assistant** to add side-effects (analytics, logging, etc.)

## ✨ New Features
- 🧠 **User Preferences Persistence**
User preferences are now saved using localStorage, allowing for a more consistent experience across sessions.

- 🎨 **UI Redesign**
A completely refreshed interface for improved usability and a cleaner look.

- 💬 **Contextual Follow-Up**
Users can now continue the conversation from their last question, optimized to minimize OpenAI token usage.

- 📄 **Markdown Rendering**
Responses now support Markdown formatting for better readability and structure.

- 🖼️ **Rich Media Responses**
The AI Agent can return images and links when relevant, enhancing the interactivity of responses.

- 🌍 **Smarter Travel Assistant**
The agent is now more focused as a travel assistant, tailoring suggestions based on user preferences.


## 🚀 How to Get Started

1. Clone the repository:
   ```bash
   git clone git@github.com:AskVinny/chatboxtest.git
   cd chatboxtest
   ```

2. Ensure the correct Node version:
   ```bash
   nvm install 22.15.0
   nvm use
   ```

3. Install dependencies and run the development server:
   ```bash
   npm install
   npm run dev
   ```

## 🧑‍💻 Best Practice Guidance

1. Use strict TypeScript with ESLint (`typescript-eslint`).
2. Opt for Edge runtime to reduce latency on the streaming route.
3. Manage environment variables via `env.example` (ignored by Git).

## 📧 Completion

Once you've completed the task, please email Rory at [rory@askvinny.co.uk] to schedule a review call and discuss your implementation.