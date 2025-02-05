# Chat API

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/smartlt/chat-api.git
   cd chat-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=port
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OPENAI_KEY=your_openai_key
```

## API Documentation

### Authentication

#### Register

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged in successfully.",
    "token": "jwt_token"
  }
  ```

#### Protected

- **URL:** `/api/auth/protected`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Access granted to protected route!."
  }
  ```

### Conversations

#### Chat

- **URL:** `/api/chat`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Body:**
  ```json
  {
    "conversationId"?: "string",
    "message": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are designed to think and act like humans. AI technology has advanced significantly in recent years, leading to transformative impacts across various sectors. Here’s an overview of the main concepts, applications, and implications of AI:\n\n### Key Concepts in AI:\n\n1. **Machine Learning (ML)**: A subset of AI that involves training algorithms on data to enable them to make predictions or decisions without explicit programming. It includes techniques such as supervised learning, unsupervised learning, and reinforcement learning.\n\n2. **Deep Learning**: A specialized form of machine learning that uses neural networks with many layers (deep neural networks) to analyze various forms of data. It excels in tasks such as image and speech recognition.\n\n3. **Natural Language Processing (NLP)**: This enables machines to understand, interpret, and respond to human language in a meaningful way. Applications include language translation, sentiment analysis, and chatbots.\n\n4. **Computer Vision**: The ability of machines to interpret and make decisions based on visual data from the world, such as identifying objects in images, which is useful in fields like autonomous driving and medical imaging.\n\n5. **Robotics**: Integrating AI with physical machines or robots to perform tasks autonomously. This can be seen in manufacturing, automation, and service industries.\n\n### Applications of AI:\n\n1. **Healthcare**: AI is used for diagnostic tools, personalized medicine, drug discovery, and robotic surgeries. It assists in analyzing medical images and predicting patient outcomes.\n\n2. **Finance**: Fraud detection, algorithmic trading, credit scoring, and customer service chatbots are some applications where AI enhances efficiency and accuracy.\n\n3. **Transportation**: AI powers autonomous vehicles, optimizing traffic patterns, and improving logistics and supply chain management.\n\n4. **Entertainment**: Recommendations systems in streaming services, AI-generated content, and game development tools are transforming how we consume media.\n\n5. **Smart Assistants**: AI is at the core of virtual assistants like Siri, Alexa, and Google Assistant, which help users with tasks and provide information through voice interactions.\n\n### Ethical and Societal Implications:\n\nAs AI continues to grow, it brings challenges and ethical considerations, such as:\n\n1. **Bias and Fairness**: AI systems can inadvertently perpetuate or exacerbate biases present in training data, leading to unfair outcomes.\n\n2. **Job Displacement**: Automation enabled by AI may displace certain jobs, prompting discussions on reskilling the workforce and the future of work.\n\n3. **Privacy**: The use of AI in surveillance and data collection raises concerns about individual privacy and data security.\n\n4. **Accountability**: As AI systems increasingly make decisions, questions arise about who is responsible for those decisions, especially in critical areas like healthcare and autonomous vehicles.\n\n5. **Existential Risks**: Some experts express concerns over the long-term implications of highly autonomous AI systems, including the potential loss of control over machines.\n\n### Future Prospects:\n\nThe future of AI is likely to encompass even more sophisticated systems, possibly leading to advancements in general artificial intelligence (AGI) – machines with the ability to understand, learn, and apply intelligence across a wide range of tasks, similar to humans. Ongoing research and development will focus on making AI systems more robust, explainable, and aligned with human values.\n\nAI presents immense potential, but it equally requires careful consideration of its ethical, societal, and economic impacts to ensure that it benefits humanity as a whole.",
    "conversationId": "67a38f22aa88e996a3762cae",
    "tokenUsed": 725,
    "remainingTokens": 99275
  }
  ```

#### Get Conversation

**URL:** `/api/chat/:conversationId`

- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
  **Response:**
  ```json
  {
    "conversation": {
      "id": "67a38f22aa88e996a3762cae",
      "messages": [
        {
          "role": "user",
          "content": "Tell me about artificial intelligence",
          "timestamp": "2025-02-05T16:17:38.079Z"
        },
        {
          "role": "assistant",
          "content": "Artificial intelligence (AI) refers to the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using it), reasoning (the use of rules to reach approximate or definite conclusions), and self-correction. AI encompasses a variety of subfields and techniques, including:\n\n1. **Machine Learning (ML)**: A subset of AI that focuses on the development of algorithms that enable computers to learn from and make predictions based on data. ML can be supervised, unsupervised, or semi-supervised, depending on the nature of the training data.\n\n2. **Deep Learning**: A more advanced subset of machine learning that uses neural networks with many layers (hence \"deep\"). This approach has been particularly successful in tasks such as image and speech recognition.\n\n3. **Natural Language Processing (NLP)**: This area of AI deals with the interaction between computers and humans through natural language. It involves tasks such as text analysis, sentiment analysis, translation, and chatbot development.\n\n4. **Computer Vision**: This field enables machines to interpret and make decisions based on visual data from the world. Applications include facial recognition, autonomous vehicles, and medical imaging.\n\n5. **Robotics**: AI is often integrated into robotics to create machines that can perform tasks autonomously or semi-autonomously in various environments.\n\n6. **Reinforcement Learning**: A type of machine learning where an agent learns to make decisions by receiving rewards or penalties based on its actions, helping it learn the best strategies over time.\n\n### Applications of AI:\n\n- **Personal Assistants**: Tools like Siri, Alexa, and Google Assistant use AI to understand and respond to user queries.\n- **Healthcare**: AI is used for diagnostic tools, personalized medicine, robotic surgeries, and predictive analytics.\n- **Finance**: AI helps in fraud detection, algorithmic trading, and risk assessment.\n- **Transportation**: Autonomous vehicles leverage AI for navigation and decision-making.\n- **Entertainment**: Recommendation systems, such as those used by Netflix or Spotify, analyze user preferences to suggest content.\n\n### Ethical Considerations:\n\nAs AI technology advances, it raises several ethical questions and challenges, including:\n\n- **Bias**: AI systems can perpetuate or amplify biases present in training data, leading to unfair outcomes.\n- **Privacy**: AI applications often rely on large amounts of personal data, raising concerns about data security and user privacy.\n- **Job Displacement**: Automation through AI may lead to job loss in various sectors, necessitating discussions about workforce retraining and economic transition.\n- **Autonomous Weapons**: The development of AI in military applications poses risks for conflict and escalation.\n\n### Future Directions:\n\nThe future of AI holds great promise but also challenges. Ongoing research aims to improve AI capabilities while addressing ethical issues. Concepts such as AI explainability, fairness, and accountability are becoming increasingly important as society navigates the implications of AI technology. Additionally, advancements in areas like quantum computing may interact with AI to achieve even more significant breakthroughs.\n\nIn summary, AI is a rapidly evolving field with vast potential to transform numerous aspects of daily life and various industries, yet it is crucial to approach its development and deployment with a keen understanding of the ethical implications involved.",
          "timestamp": "2025-02-05T16:17:50.865Z"
        },
        {
          "role": "user",
          "content": "Tell me about artificial intelligence",
          "timestamp": "2025-02-05T16:21:18.968Z"
        },
        {
          "role": "assistant",
          "content": "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think and learn like humans. It encompasses a variety of technologies and techniques used to create systems capable of performing tasks that typically require human intelligence. These tasks include problem-solving, understanding natural language, recognizing patterns, and making decisions.\n\n### Main Categories of AI:\n\n1. **Narrow AI (Weak AI)**: This type of AI is designed and trained for specific tasks. Examples include voice assistants like Siri and Alexa, recommendation algorithms used by Netflix and Amazon, and image recognition software.\n\n2. **General AI (Strong AI)**: This is a theoretical form of AI that would possess the ability to understand, learn, and apply intelligence broadly, similar to a human. As of now, General AI has not been realized.\n\n3. **Superintelligence**: This is a term used to describe an AI that surpasses human intelligence across virtually all domains. Its implications and effects on society are widely debated and hypothesized, but it remains a theoretical concept.\n\n### Key Components of AI:\n\n- **Machine Learning**: A subset of AI that involves training algorithms on data so they can identify patterns and make predictions. Techniques include supervised learning, unsupervised learning, and reinforcement learning.\n\n- **Deep Learning**: A further subset of machine learning that utilizes neural networks with many layers (deep networks) to analyze data. It has been particularly successful in fields like image and speech recognition.\n\n- **Natural Language Processing (NLP)**: This enables machines to understand and respond to written and spoken language. Applications include chatbots, translation services, and language generation tools.\n\n- **Computer Vision**: This field focuses on enabling machines to interpret and make decisions based on visual data from the world. It is used in areas like autonomous vehicles and facial recognition systems.\n\n### Applications of AI:\n\n- **Healthcare**: AI assists in diagnosing diseases, personalizing treatment plans, and analyzing medical images.\n- **Finance**: AI algorithms are used in fraud detection, algorithmic trading, and customer service through chatbots.\n- **Transportation**: Self-driving cars and traffic management systems utilize AI for safer, more efficient travel.\n- **Manufacturing**: AI enhances automation, predictive maintenance, and supply chain optimization.\n- **Entertainment**: AI is involved in content recommendation, game design, and creating virtual characters.\n\n### Ethical Considerations:\n\nThe rise of AI brings various ethical considerations, including concerns over privacy, bias in algorithms, job displacement, and the potential for autonomous weapons. Discussions on responsible AI development focus on transparency, accountability, and fairness.\n\n### Future of AI:\n\nThe future of AI involves ongoing advancements in technology, with potential implications for virtually every sector. Trends include the integration of AI in daily life, improvements in human-computer interaction, and the development of more robust regulatory frameworks to ensure the ethical use of AI.\n\nIn summary, artificial intelligence is a transformative technology with the potential to reshape industries, improve efficiencies, and enhance day-to-day life, while also posing significant challenges that must be carefully managed.",
          "timestamp": "2025-02-05T16:21:29.415Z"
        }
      ]
    }
  }
  ```

#### Get Conversation list

- **URL:** `/api/conversations`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  [
    {
      "conversation": {
        "id": "67a38f22aa88e996a3762cae",
        "messages": [
          {
            "role": "user",
            "content": "Tell me about artificial intelligence",
            "timestamp": "2025-02-05T16:17:38.079Z"
          },
          {
            "role": "assistant",
            "content": "Artificial intelligence (AI) refers to the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using it), reasoning (the use of rules to reach approximate or definite conclusions), and self-correction. AI encompasses a variety of subfields and techniques, including:\n\n1. **Machine Learning (ML)**: A subset of AI that focuses on the development of algorithms that enable computers to learn from and make predictions based on data. ML can be supervised, unsupervised, or semi-supervised, depending on the nature of the training data.\n\n2. **Deep Learning**: A more advanced subset of machine learning that uses neural networks with many layers (hence \"deep\"). This approach has been particularly successful in tasks such as image and speech recognition.\n\n3. **Natural Language Processing (NLP)**: This area of AI deals with the interaction between computers and humans through natural language. It involves tasks such as text analysis, sentiment analysis, translation, and chatbot development.\n\n4. **Computer Vision**: This field enables machines to interpret and make decisions based on visual data from the world. Applications include facial recognition, autonomous vehicles, and medical imaging.\n\n5. **Robotics**: AI is often integrated into robotics to create machines that can perform tasks autonomously or semi-autonomously in various environments.\n\n6. **Reinforcement Learning**: A type of machine learning where an agent learns to make decisions by receiving rewards or penalties based on its actions, helping it learn the best strategies over time.\n\n### Applications of AI:\n\n- **Personal Assistants**: Tools like Siri, Alexa, and Google Assistant use AI to understand and respond to user queries.\n- **Healthcare**: AI is used for diagnostic tools, personalized medicine, robotic surgeries, and predictive analytics.\n- **Finance**: AI helps in fraud detection, algorithmic trading, and risk assessment.\n- **Transportation**: Autonomous vehicles leverage AI for navigation and decision-making.\n- **Entertainment**: Recommendation systems, such as those used by Netflix or Spotify, analyze user preferences to suggest content.\n\n### Ethical Considerations:\n\nAs AI technology advances, it raises several ethical questions and challenges, including:\n\n- **Bias**: AI systems can perpetuate or amplify biases present in training data, leading to unfair outcomes.\n- **Privacy**: AI applications often rely on large amounts of personal data, raising concerns about data security and user privacy.\n- **Job Displacement**: Automation through AI may lead to job loss in various sectors, necessitating discussions about workforce retraining and economic transition.\n- **Autonomous Weapons**: The development of AI in military applications poses risks for conflict and escalation.\n\n### Future Directions:\n\nThe future of AI holds great promise but also challenges. Ongoing research aims to improve AI capabilities while addressing ethical issues. Concepts such as AI explainability, fairness, and accountability are becoming increasingly important as society navigates the implications of AI technology. Additionally, advancements in areas like quantum computing may interact with AI to achieve even more significant breakthroughs.\n\nIn summary, AI is a rapidly evolving field with vast potential to transform numerous aspects of daily life and various industries, yet it is crucial to approach its development and deployment with a keen understanding of the ethical implications involved.",
            "timestamp": "2025-02-05T16:17:50.865Z"
          },
          {
            "role": "user",
            "content": "Tell me about artificial intelligence",
            "timestamp": "2025-02-05T16:21:18.968Z"
          },
          {
            "role": "assistant",
            "content": "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think and learn like humans. It encompasses a variety of technologies and techniques used to create systems capable of performing tasks that typically require human intelligence. These tasks include problem-solving, understanding natural language, recognizing patterns, and making decisions.\n\n### Main Categories of AI:\n\n1. **Narrow AI (Weak AI)**: This type of AI is designed and trained for specific tasks. Examples include voice assistants like Siri and Alexa, recommendation algorithms used by Netflix and Amazon, and image recognition software.\n\n2. **General AI (Strong AI)**: This is a theoretical form of AI that would possess the ability to understand, learn, and apply intelligence broadly, similar to a human. As of now, General AI has not been realized.\n\n3. **Superintelligence**: This is a term used to describe an AI that surpasses human intelligence across virtually all domains. Its implications and effects on society are widely debated and hypothesized, but it remains a theoretical concept.\n\n### Key Components of AI:\n\n- **Machine Learning**: A subset of AI that involves training algorithms on data so they can identify patterns and make predictions. Techniques include supervised learning, unsupervised learning, and reinforcement learning.\n\n- **Deep Learning**: A further subset of machine learning that utilizes neural networks with many layers (deep networks) to analyze data. It has been particularly successful in fields like image and speech recognition.\n\n- **Natural Language Processing (NLP)**: This enables machines to understand and respond to written and spoken language. Applications include chatbots, translation services, and language generation tools.\n\n- **Computer Vision**: This field focuses on enabling machines to interpret and make decisions based on visual data from the world. It is used in areas like autonomous vehicles and facial recognition systems.\n\n### Applications of AI:\n\n- **Healthcare**: AI assists in diagnosing diseases, personalizing treatment plans, and analyzing medical images.\n- **Finance**: AI algorithms are used in fraud detection, algorithmic trading, and customer service through chatbots.\n- **Transportation**: Self-driving cars and traffic management systems utilize AI for safer, more efficient travel.\n- **Manufacturing**: AI enhances automation, predictive maintenance, and supply chain optimization.\n- **Entertainment**: AI is involved in content recommendation, game design, and creating virtual characters.\n\n### Ethical Considerations:\n\nThe rise of AI brings various ethical considerations, including concerns over privacy, bias in algorithms, job displacement, and the potential for autonomous weapons. Discussions on responsible AI development focus on transparency, accountability, and fairness.\n\n### Future of AI:\n\nThe future of AI involves ongoing advancements in technology, with potential implications for virtually every sector. Trends include the integration of AI in daily life, improvements in human-computer interaction, and the development of more robust regulatory frameworks to ensure the ethical use of AI.\n\nIn summary, artificial intelligence is a transformative technology with the potential to reshape industries, improve efficiencies, and enhance day-to-day life, while also posing significant challenges that must be carefully managed.",
            "timestamp": "2025-02-05T16:21:29.415Z"
          }
        ]
      }
    }
  ]
  ```

## Example API Requests

### Register

```sh
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"email": "user1", "password": "password123"}'
```

### Login

```sh
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email": "user1", "password": "password123"}'
```

### Send Message

```sh
curl -X POST http://localhost:3000/api/messages -H "Content-Type: application/json" -H "Authorization: Bearer your_jwt_token" -d '{"recipient": "user2", "message": "Hello!"}'
```

### Get Messages

```sh
curl -X GET http://localhost:3000/api/messages -H "Content-Type: application/json" -H "Authorization: Bearer your_jwt_token"
```
