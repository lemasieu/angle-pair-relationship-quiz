let stats = { correct: 0, total: 0 };
let currentPair = null, currentType = null;
let lang = 'en'; // 'en' or 'vi'

const labels = {
  en: {
    title: "Angle Pair Relationship Quiz",
    question: "What is the relationship of the highlighted angle pair?",
    correct: "Correct! 🎉",
    wrong: "Wrong! The answer is: ",
    newQuestion: "New Question",
    toggleTheme: "Dark Theme",
    toggleLang: "Tiếng Việt",
    stats: (c, t, r) => `Correct: ${c}, Total: ${t}, Accuracy: ${r}%`,
    choices: {
      alt_in: "Alternate Interior",
      corresp: "Corresponding",
      alt_ex: "Alternate Exterior",
      same_ex: "Same-side Exterior",
      same_in: "Same-side Interior",
      vert: "Vertical Angles"
    }
  },
  vi: {
    title: "Quiz Nhận Diện Cặp Góc",
    question: "Cặp góc được tô sáng thuộc loại quan hệ nào?",
    correct: "Chính xác! 🎉",
    wrong: "Sai! Đáp án đúng là: ",
    newQuestion: "Câu hỏi mới",
    toggleTheme: "Nền tối",
    toggleLang: "English",
    stats: (c, t, r) => `Đúng: ${c}, Tổng: ${t}, Chính xác: ${r}%`,
    choices: {
      alt_in: "So le trong",
      corresp: "Đồng vị",
      alt_ex: "So le ngoài",
      same_ex: "Ngoài cùng phía",
      same_in: "Trong cùng phía",
      vert: "Đối đỉnh"
    }
  }
};

let answerTypes = [
  { key: "alt_in" },
  { key: "corresp" },
  { key: "alt_ex" },
  { key: "same_ex" },
  { key: "same_in" },
  { key: "vert" }
];
let pairsByType = {};

function setup() {
  let c = createCanvas(400, 400);
  c.parent('sketch-holder');
  noLoop();
  document.body.classList.add('dark');
  updateLangUI();
  generateQuestion();
}

function draw() {
  background(document.body.classList.contains('dark') ? 30 : 240);
  drawParallelCut();
}

function updateStats() {
  let ratio = stats.total > 0 ? (stats.correct / stats.total * 100).toFixed(1) : 0;
  document.getElementById('stats').innerText =
    labels[lang].stats(stats.correct, stats.total, ratio);
}

function setFeedback(msg, color) {
  let fb = document.getElementById('feedback');
  fb.innerText = msg;
  fb.style.color = color;
}

function updateLangUI() {
  document.querySelector('h1').innerText = labels[lang].title;
  document.getElementById('newQuestionBtn').innerText = labels[lang].newQuestion;
  document.getElementById('toggleThemeBtn').innerText = labels[lang].toggleTheme;
  document.getElementById('toggleLangBtn').innerText = labels[lang].toggleLang;
  // Cập nhật lại các lựa chọn
  let chDiv = document.getElementById('choices');
  let buttons = chDiv.querySelectorAll('button');
  buttons.forEach(btn => {
    let key = btn.dataset.key;
    btn.innerText = labels[lang].choices[key];
  });
}

function generateQuestion() {
  setFeedback('', '');
  document.getElementById('newQuestionBtn').disabled = true;
  let geom = randomParallelCut();
  pairsByType = getAllPairs(geom);
  let typeKeys = Object.keys(pairsByType).filter(k => pairsByType[k].length > 0);
  currentType = random(typeKeys);
  currentPair = random(pairsByType[currentType]);
  window._geom = geom;
  redraw();
  document.getElementById('question').innerHTML = labels[lang].question;
  let chDiv = document.getElementById('choices');
  chDiv.innerHTML = '';
  let shuffled = shuffle([...answerTypes]);
  shuffled.forEach(t => {
    let btn = document.createElement('button');
    btn.innerText = labels[lang].choices[t.key];
    btn.dataset.key = t.key;
    btn.onclick = () => checkAnswer(t.key);
    chDiv.appendChild(btn);
  });
  updateStats();
}

function checkAnswer(selectedKey) {
  stats.total++;
  if (selectedKey === currentType) {
    stats.correct++;
    setFeedback(labels[lang].correct, 'green');
  } else {
    let label = labels[lang].choices[currentType];
    setFeedback(labels[lang].wrong + label + '.', 'red');
  }
  document.getElementById('newQuestionBtn').disabled = false;
  updateStats();
}

document.getElementById('newQuestionBtn').onclick = generateQuestion;
document.getElementById('toggleThemeBtn').onclick = () => {
  document.body.classList.toggle('dark');
  let isDark = document.body.classList.contains('dark');
  document.getElementById('toggleThemeBtn').innerText = isDark ? labels[lang].toggleTheme : "Light Theme";
  redraw();
};
document.getElementById('toggleLangBtn').onclick = () => {
  lang = (lang === 'en' ? 'vi' : 'en');
  updateLangUI();
  generateQuestion();
};

// =================== GEOMETRY LOGIC ===================

function randomParallelCut() {
  let theta = random(-PI/4, PI/4);
  let d = random(80, 120);
  let cx = width/2, cy = height/2;
  let dx = cos(theta), dy = sin(theta);
  let perp = createVector(-dy, dx);
  let A = createVector(cx, cy).add(perp.copy().mult(-d/2));
  let B = createVector(cx, cy).add(perp.copy().mult(d/2));
  let phi = theta + random([PI/2, -PI/2]) + random(-PI/8, PI/8);
  let cutDir = createVector(cos(phi), sin(phi));
  let t1 = random(-80, 80);
  let P = A.copy().add(createVector(dx, dy).mult(t1));
  let denom = cutDir.y*dx - cutDir.x*dy;
  let t2 = ((P.x - B.x)*cutDir.y - (P.y - B.y)*cutDir.x) / denom;
  let Q = B.copy().add(createVector(dx, dy).mult(t2));
  return { A, B, dx, dy, P, Q, cutDir, theta, phi };
}

/**
 * Hàm mới được sửa để xác định vị trí các góc một cách nhất quán cho cả P và Q.
 * @param {p5.Vector} center Điểm trung tâm (P hoặc Q).
 * @param {object} geom Đối tượng hình học chứa các vector đường thẳng.
 * @returns {Array} Mảng các đối tượng góc đã được đánh số nhất quán.
 */
function getAnglePositionsForPoint(center, geom) {
  let vecS = createVector(geom.dx, geom.dy).normalize(); // Vector đường song song
  let vecC = geom.cutDir.normalize();              // Vector đường chéo

  // Vector pháp tuyến cho đường song song và đường chéo để xác định vị trí tương đối (trên/dưới, trái/phải)
  let perpS = createVector(-vecS.y, vecS.x);
  let perpC = createVector(-vecC.y, vecC.x);

  let rayPairs = [
    { u1: vecS.copy().mult(-1), u2: vecC.copy().mult(-1) },
    { u1: vecS.copy().mult(-1), u2: vecC },
    { u1: vecS, u2: vecC },
    { u1: vecS, u2: vecC.copy().mult(-1) }
  ];

  let arr = [];
  let r = 32;

  // Lặp qua các cặp tia và gán chỉ số dựa trên vị trí tương đối của góc
  for (let pair of rayPairs) {
    let u1 = pair.u1.normalize();
    let u2 = pair.u2.normalize();
    let bisector = u1.copy().add(u2).normalize();
    let ang1 = atan2(u1.y, u1.x);
    let ang2 = atan2(u2.y, u2.x);
    let pos = center.copy().add(bisector.mult(r));

    // Dùng dot product để xác định vị trí góc một cách nhất quán, không bị hoán đổi
    let isAboveParallel = bisector.dot(perpS) > 0;
    let isRightOfTransversal = bisector.dot(perpC) > 0;

    let idx;
    if (isAboveParallel && !isRightOfTransversal) {
      idx = 0; // Trên-trái
    } else if (isAboveParallel && isRightOfTransversal) {
      idx = 1; // Trên-phải
    } else if (!isAboveParallel && isRightOfTransversal) {
      idx = 2; // Dưới-phải
    } else {
      idx = 3; // Dưới-trái
    }

    arr[idx] = { pos, idx, ang1, ang2 };
  }
  return arr;
}

// Hàm này giờ chỉ cần gọi hàm đã sửa cho cả P và Q
function getAnglePositions(geom) {
  return {
    P: getAnglePositionsForPoint(geom.P, geom),
    Q: getAnglePositionsForPoint(geom.Q, geom)
  };
}

function getAllPairs(geom) {
  let pos = getAnglePositions(geom);
  let out = {
    alt_in: [],
    corresp: [],
    alt_ex: [],
    same_in: [],
    same_ex: [],
    vert: []
  };

  // Cặp góc cơ bản (P trước, Q sau)
  let basePairs = {
    alt_in: [
      { P: pos.P[1], Q: pos.Q[3], idxP: 1, idxQ: 3 },
      { P: pos.P[0], Q: pos.Q[2], idxP: 0, idxQ: 2 }
    ],
    corresp: [
      { P: pos.P[0], Q: pos.Q[0], idxP: 0, idxQ: 0 },
      { P: pos.P[1], Q: pos.Q[1], idxP: 1, idxQ: 1 },
      { P: pos.P[2], Q: pos.Q[2], idxP: 2, idxQ: 2 },
      { P: pos.P[3], Q: pos.Q[3], idxP: 3, idxQ: 3 }
    ],
    alt_ex: [
      { P: pos.P[2], Q: pos.Q[0], idxP: 2, idxQ: 0 },
      { P: pos.P[3], Q: pos.Q[1], idxP: 3, idxQ: 1 }
    ],
    same_in: [
      { P: pos.P[1], Q: pos.Q[2], idxP: 1, idxQ: 2 },
      { P: pos.P[0], Q: pos.Q[3], idxP: 0, idxQ: 3 }
    ],
    same_ex: [
      { P: pos.P[2], Q: pos.Q[1], idxP: 2, idxQ: 1 },
      { P: pos.P[3], Q: pos.Q[0], idxP: 3, idxQ: 0 }
    ]
  };

  for (let type in basePairs) {
    out[type] = [];
    for (let pair of basePairs[type]) {
      // Đảm bảo P luôn đứng trước Q
      out[type].push({ P: pair.P, Q: pair.Q, idxP: pair.idxP, idxQ: pair.idxQ, at: 'PQ' });
    }
  }

  // Góc đối đỉnh (vertical angles)
  out.vert.push({ P: pos.P[0], Q: pos.P[2], at: 'P' });
  out.vert.push({ P: pos.P[1], Q: pos.P[3], at: 'P' });
  out.vert.push({ P: pos.Q[0], Q: pos.Q[2], at: 'Q' });
  out.vert.push({ P: pos.Q[1], Q: pos.Q[3], at: 'Q' });

  return out;
}

// =================== DRAWING ===================

function drawParallelCut() {
  let geom = window._geom;
  if (!geom) return;
  strokeWeight(3);
  stroke(0, 180, 255);
  line(geom.A.x - 200*geom.dx, geom.A.y - 200*geom.dy,
       geom.A.x + 200*geom.dx, geom.A.y + 200*geom.dy);
  stroke(0, 180, 255);
  line(geom.B.x - 200*geom.dx, geom.B.y - 200*geom.dy,
       geom.B.x + 200*geom.dx, geom.B.y + 200*geom.dy);
  stroke(255, 140, 0);
  line(geom.P.x - 200*geom.cutDir.x, geom.P.y - 200*geom.cutDir.y,
       geom.P.x + 200*geom.cutDir.x, geom.P.y + 200*geom.cutDir.y);
  fill(255); stroke(0); strokeWeight(2);
  ellipse(geom.P.x, geom.P.y, 12, 12);
  ellipse(geom.Q.x, geom.Q.y, 12, 12);

  // Lấy vị trí các góc tại P và Q
  let pos = getAnglePositions(geom);
  let anglesP = pos.P;
  let anglesQ = pos.Q;
  
  if (currentPair) {
    if (currentPair.at === 'PQ') {
      drawAngleArc(geom.P, currentPair.P);
      drawAngleArc(geom.Q, currentPair.Q);
    } else if (currentPair.at === 'P') {
      drawAngleArc(geom.P, currentPair.P);
      drawAngleArc(geom.P, currentPair.Q);
    } else if (currentPair.at === 'Q') {
      drawAngleArc(geom.Q, currentPair.P);
      drawAngleArc(geom.Q, currentPair.Q);
    }
  }
}

function drawAngleArc(center, angleObj) {
  let r = 30;
  let ang1 = angleObj.ang1;
  let ang2 = angleObj.ang2;

  // Điều chỉnh để luôn vẽ cung nhỏ nhất
  let delta = ang2 - ang1;
  if (abs(delta) > PI) {
    if (delta > 0) {
      ang1 += TWO_PI;
    } else {
      ang2 += TWO_PI;
    }
  }
  
  if (ang1 > ang2) {
    [ang1, ang2] = [ang2, ang1];
  }

  stroke('red');
  strokeWeight(3);
  noFill();
  arc(center.x, center.y, r * 2, r * 2, ang1, ang2, OPEN);

  let ray1 = p5.Vector.fromAngle(ang1).mult(r * 0.8);
  let ray2 = p5.Vector.fromAngle(ang2).mult(r * 0.8);
  strokeWeight(1);
  stroke(255, 0, 0, 100);
  line(center.x, center.y, center.x + ray1.x, center.y + ray1.y);
  line(center.x, center.y, center.x + ray2.x, center.y + ray2.y);
}
