# angle-pair-relationship-quiz
This is an interactive educational tool built with p5.js that helps users learn and test their understanding of angle pair relationships (e.g., alternate interior, corresponding, alternate exterior, etc.) when a transversal intersects two parallel lines. The application generates random diagrams and quizzes users on identifying the correct angle pair relationships.</br></br>
Demo: https://xn--msiu-goa8b.vn/github/angle-pair-relationship-quiz/</br>

Features</br>

Randomly generates parallel lines and a transversal with labeled intersection points (P and Q).</br>
Highlights angle pairs with red arcs for visual identification.</br>
Provides multiple-choice questions with feedback (correct/wrong answers).</br>
Supports English and Vietnamese language toggling.</br>
Includes a dark theme option.</br>
Tracks user progress with accuracy statistics.</br>

Prerequisites</br>

A web browser with JavaScript support (e.g., Chrome, Firefox, Safari).</br>
p5.js library (included via CDN in the code).</br>

Usage</br>

The quiz starts automatically with a randomly generated diagram.</br>
Click on the multiple-choice buttons to select an answer.</br>
Receive immediate feedback (green for correct, red for wrong).</br>
Click "New Question" to generate a new diagram and question.</br>
Toggle between dark theme and light theme using the "Dark Theme" button.</br>
Switch languages (English/Vietnamese) using the language toggle button.</br>
View your progress (correct answers, total attempts, accuracy) at the top.</br>

Project Structure</br>

index.html: The main HTML file that loads the p5.js sketch.</br>
quiz.js: Contains the JavaScript code for the quiz logic and p5.js sketch.</br>
style.css: Styles for the user interface (optional, can be customized).</br>

How It Works</br>

The application uses p5.js to draw two parallel lines and a transversal, labeling angles at intersection points P and Q with indices (0, 1, 2, 3).</br>
Angle pairs are defined based on geometric relationships (e.g., alternate interior, corresponding) and randomly selected for quizzing.</br>
User interactions are handled via button clicks, with feedback and statistics updated dynamically.</br>

Contributing</br>

Contributions are welcome! To contribute:</br>
Fork the repository.</br>
Create a new branch (git checkout -b feature-branch).</br>
Make your changes and commit them (git commit -m "Add new feature").</br>
Push to the branch (git push origin feature-branch).</br>
Open a pull request with a description of your changes.</br>

License</br>

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.</br>

Acknowledgments</br>

Built using p5.js, a JavaScript library for creative coding.</br>
Inspired by educational tools for geometry learning.</br>
