let myGlass;
let particles = [];
let lastMouseX = 0;

function setup() {
  // Dimensions fixes selon tes spécifications
  createCanvas(600, 400);
  
  // Initialisation du verre avec une position fixe sur le plan
  myGlass = new Glass(width / 2, height - 50, 70, 110);
}

function draw() {
  background(240); // Couleur de fond de ta palette

  // 1. Calcul de la vitesse de la souris pour détecter les secousses
  let mouseSpeed = abs(mouseX - lastMouseX);
  
  // 2. Mise à jour de la physique et affichage du verre
  myGlass.update(mouseX, mouseSpeed);
  myGlass.display();

  // 3. Gestion du cycle de vie des particules (éclaboussures)
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
    this.initialWaterLevel = 85; // Niveau d'eau au repos (agrandi)
    this.waterLevel = 85;        // Niveau d'eau actuel
  }

  update(mX, speed) {
    // Calcul de l'inclinaison cible
    let targetAngle = map(mX, 0, width, -PI/2, PI/2);
    this.angle = lerp(this.angle, targetAngle, 0.15);

    // SÉCURITÉ : On bloque l'angle à 30° maximum (PI/6)
    let limit = PI/6; 
    this.angle = constrain(this.angle, -limit, limit);

    // Déclenchement des éclaboussures si on secoue
    if (speed > 25) {
      for (let i = 0; i < 5; i++) {
        // Les particules partent du haut de l'eau actuelle
        particles.push(new Particle(this.x + random(-20, 20), this.y - this.waterLevel, this.x, this.w));
        
        // L'eau descend quand on secoue (consommation)
        this.waterLevel = max(10, this.waterLevel - 0.4); 
      }
    } else {
      // L'eau remonte doucement vers son état initial quand on s'arrête
      this.waterLevel = lerp(this.waterLevel, this.initialWaterLevel, 0.05);
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
    rotate(-this.angle); // Contre-rotation pour garder l'eau à plat
    fill(0, 120, 255, 200); // Couleur bleue de ta palette
    noStroke();
    rectMode(CENTER);
    
    // Rectangle d'eau 
    rect(0, -this.waterLevel / 2, this.w * 3, this.waterLevel);
    // Bloc de remplissage pour le fond du verre
    rect(0, 0, this.w * 4, this.waterLevel * 2); 
    pop();

    drawingContext.restore();

    // --- Dessin des parois du verre ---
    stroke(80); // Couleur anthracite [cite: 28]
    strokeWeight(5);
    noFill();
    line(-this.w/2, 0, -this.w/2, -this.h); // Paroi gauche
    line(this.w/2, 0, this.w/2, -this.h);   // Paroi droite
    line(-this.w/2, 0, this.w/2, 0);         // Fond
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
    // Vitesse de projection avec une part de hasard
    this.vel = createVector(random(-3, 3), random(-8, -14));
    this.gravity = createVector(0, 0.4);
    this.lifespan = 255; // Opacité qui diminue [cite: 32]
    this.gX = gX;
    this.gW = gW;
  }

  update() {
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.lifespan -= 5;
    
    // Collision simple pour forcer les gouttes à rester "dans l'axe" du verre au départ
    if (this.pos.x < this.gX - this.gW/2 || this.pos.x > this.gX + this.gW/2) {
      this.vel.x *= -0.5;
    }
  }

  display() {
    noStroke();
    fill(0, 120, 255, this.lifespan); // Utilise l'opacité variable
    ellipse(this.pos.x, this.pos.y, random(4, 8));
  }

  isDead() {
    return this.lifespan < 0 || this.pos.y > height;
  }
}
