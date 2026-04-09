let myGlass;
let particles = [];
let lastMouseX = 0;

function setup() {
  // Initialisation du canvas selon tes spécifications [cite: 14]
  createCanvas(600, 400);
  
  // Création d'une instance unique de notre classe Glass
  myGlass = new Glass(width / 2, height - 50, 70, 110);
}

function draw() {
  background(240); // Couleur de fond de ta palette [cite: 18]

  // 1. Calcul de la vitesse pour les éclaboussures
  let mouseSpeed = abs(mouseX - lastMouseX);
  
  // 2. Mise à jour et affichage du verre
  myGlass.update(mouseX, mouseSpeed);
  myGlass.display();

  // 3. Gestion des particules (Éclaboussures) [cite: 22, 36]
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  lastMouseX = mouseX;
}

// --- CLASSE GLASS (LE VERRE) ---
class Glass {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = 0;
    this.waterLevel = 60;
  }

  update(mX, speed) {
    // Calcul de l'inclinaison fluide [cite: 43]
    let targetAngle = map(mX, 0, width, -PI/4, PI/4);
    this.angle = lerp(this.angle, targetAngle, 0.15);

    // Déclenchement des éclaboussures si on secoue [cite: 6, 7]
    if (speed > 25) {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(this.x + random(-20, 20), this.y - this.waterLevel, this.x, this.w));
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // --- Dessin de l'eau avec masque ---
    drawingContext.save();
    this.drawMask();
    drawingContext.clip();

    push();
    rotate(-this.angle); // Contre-rotation pour l'eau horizontale
    fill(0, 120, 255, 200); // Couleur de ta palette [cite: 28]
    noStroke();
    rectMode(CENTER);
    // On dessine large pour ne pas voir les bords [cite: 60]
    rect(0, -this.waterLevel / 2, this.w * 3, this.waterLevel);
    rect(0, 0, this.w * 3, this.waterLevel * 2); 
    pop();

    drawingContext.restore();

    // --- Dessin des parois ---
    stroke(80);
    strokeWeight(5);
    noFill();
    line(-this.w/2, 0, -this.w/2, -this.h);
    line(this.w/2, 0, this.w/2, -this.h);
    line(-this.w/2, 0, this.w/2, 0);
    pop();
  }

  drawMask() {
    beginShape();
    vertex(-this.w/2 + 2, 0);
    vertex(-this.w/2 + 2, -this.h);
    vertex(this.w/2 - 2, -this.h);
    vertex(this.w/2 - 2, 0);
    endShape(CLOSE);
  }
}

// --- CLASSE PARTICLE (L'EAU QUI SORT) ---
class Particle {
  constructor(x, y, gX, gW) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-3, 3), random(-8, -14));
    this.gravity = createVector(0, 0.4);
    this.lifespan = 255; // Opacité variable [cite: 32]
    this.gX = gX;
    this.gW = gW;
  }

  update() {
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.lifespan -= 5;
    
    // Collision simple avec les parois virtuelles
    if (this.pos.x < this.gX - this.gW/2 || this.pos.x > this.gX + this.gW/2) {
      this.vel.x *= -0.5;
    }
  }

  display() {
    noStroke();
    fill(0, 120, 255, this.lifespan);
    ellipse(this.pos.x, this.pos.y, random(4, 8));
  }

  isDead() {
    return this.lifespan < 0 || this.pos.y > height;
  }
}