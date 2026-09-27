# Angle Pair Relationship Quiz

An interactive geometry quiz application that helps students practice identifying angle pair relationships. The app randomly generates diagrams of parallel lines cut by a transversal and asks users to classify the relationship between two highlighted angles.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/angle-pair-relationship-quiz](https://www.sieu.io.vn/github/angle-pair-relationship-quiz)

## ✨ Features

- **Randomly Generated Diagrams** – Each question displays a fresh diagram of two parallel lines intersected by a transversal, with two angles highlighted
- **Multiple-Choice Questions** – Four answer options are provided for each question, covering common angle pair relationships
- **Angle Relationship Types** – Practice classifying:
  - Corresponding Angles
  - Alternate Interior Angles
  - Alternate Exterior Angles
  - Consecutive (Same-Side) Interior Angles
  - Vertical Angles
  - Linear Pair
- **Instant Feedback** – Users are informed immediately whether their selected answer is correct
- **Score Tracking** – Keeps track of correct answers, total questions attempted, and accuracy percentage
- **Clean Interface** – Simple, user-friendly design with a clear layout
- **Responsive** – Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **HTML5** – Provides the interface structure
- **CSS3** – Handles styling and layout
- **JavaScript (Vanilla)** – Powers the quiz logic and diagram rendering
- **HTML5 Canvas / SVG** – Used to draw the geometric diagrams (depending on your implementation)

## 📁 Project Structure

```
angle-pair-relationship-quiz/
├── index.html                # Main HTML file
├── style.css                 # Stylesheet
├── script.js                 # JavaScript quiz logic and diagram rendering
└── README.md                 # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/angle-pair-relationship-quiz.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd angle-pair-relationship-quiz
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **Start the quiz** – Click the start button to generate the first question
2. **Observe the diagram** – A diagram shows two parallel lines cut by a transversal, with two angles highlighted
3. **Read the question** – The question asks you to identify the relationship between the two highlighted angles
4. **Choose an answer** – Select one of the four multiple-choice options
5. **Submit your answer** – Click the check button to see if you are correct
6. **View your score** – The score display shows:
   - Number of correct answers
   - Total number of questions attempted
   - Accuracy percentage
7. **Continue** – Click the "Next Question" button to generate a new random diagram and question

**How questions are generated:**

The quiz generator:

- Randomly selects a pair of angles from the diagram (e.g., one interior and one exterior angle, or two interior angles on the same side)
- Determines the correct relationship between the selected angles
- Generates three plausible distractors from other angle relationship types
- Displays the diagram with the selected angles highlighted and presents the four options

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.
