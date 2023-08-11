document.addEventListener("DOMContentLoaded", function () 
{
    //grille de depart
    var tab =   [   ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','t','s','s','s','m','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','s','s','m','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','m','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','b','s','s','s','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','s','s','s','s','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','m','m','m','s','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','s','s','m','s','m','m','m','s','m','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','t','s','s','s','s','m','m','m','s','s','m','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','s','s','s','m','m','m','m','m','s','s','s','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','b','s','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','m','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','s','s','j','m','m','m'],
                    ['m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m','m']   
                ];
    const tab2 = tab;
    let positionJoueur = [13,21];
    let positionMonstre2 = [19,19];
    let nombreMonstres = 2;
    let nombretresors = 2;
    let score = 0;


    //Creation de la grille de jeu de depart
    function CreerTable() 
    {
        const gridContainer = document.getElementById("gridContainer");
        for (let i = 0; i < tab.length; i++)
        {
            for (let j = 0; j < tab[i].length; j++) 
            {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");
                // Définir la couleur en fonction de la lettre dans le tableau
                switch (tab[i][j]) 
                {
                    case 'j':
                        gridItem.style.backgroundColor = "green";
                        break;
                    case 's':
                        gridItem.style.backgroundColor = "rgba(129, 129, 129, 0.579)";
                        break;
                    case 'b':
                        gridItem.style.backgroundColor = "red";
                        break;
                    case 't':gridItem.style.backgroundColor="yellow"
                      
                        break;
                    default:
                        gridItem.style.backgroundColor = "rgba(255, 106, 0, 0.859)"; 
                }
                gridContainer.appendChild(gridItem);
            
            }
        }
    }

    //Mise a jour de la grille et des differents parametres
    function Update()
    {
        const gridContainer = document.getElementById("gridContainer");
        
    
        // Supprimer tous les éléments enfants de la grille
        while (gridContainer.firstChild)
        {
            gridContainer.removeChild(gridContainer.firstChild);
        }
     CreerTable();
     const updateScore = document.getElementById("Score");
     updateScore.textContent ="Score = " + score;
        
    }

 CreerTable();
    //reinitialisation du jeu
    function Reinitialiser()
    {
        location.reload();  
    }

    //Partie perdue
    function GameOver()
    {

        alert("Vous avez perdu !");
        
        Reinitialiser();
    }


    //Partie Gagnée
    function Gagner(){
        if (score>=2){
            alert("Vous avez Gagner!");
            
        alert(score);
        }
        
        
    }

    //Deplacement du monstre
    function BougerMonstres() 
    {
        // Pour chaque case rouge (représentée par 'b') sur la grille
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab[i].length; j++) {
                if (tab[i][j] === 'b') {
                    // Générer un nombre aléatoire entre 1 et 4 pour déterminer la direction du mouvement
                    const direction = Math.floor(Math.random() * 4) + 1;
    
                    // Effectuer le déplacement en fonction de la direction aléatoire
                    switch (direction) {
                        case 1: // Déplacement vers le haut
                            if (i > 0 && tab[i - 1][j] === 's') {
                                tab[i][j] = 's';
                                tab[i - 1][j] = 'b';
                            }
                            break;
                        case 2: // Déplacement vers le bas
                            if (i < tab.length - 1 && tab[i + 1][j] === 's') {
                                tab[i][j] = 's';
                                tab[i + 1][j] = 'b';
                            }
                            break;
                        case 3: // Déplacement vers la gauche
                            if (j > 0 && tab[i][j - 1] === 's') {
                                tab[i][j] = 's';
                                tab[i][j - 1] = 'b';
                            }
                            break;
                        case 4: // Déplacement vers la droite
                            if (j < tab[i].length - 1 && tab[i][j + 1] === 's') {
                                tab[i][j] = 's';
                                tab[i][j + 1] = 'b';
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    

    //Deplacement vers le haut du joueur
    function DeplacerJoueurHaut()
    {
        if(tab[positionJoueur[0]-1][positionJoueur[1]] == 's')
        {
            tab[positionJoueur[0]-1][positionJoueur[1]] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            positionJoueur[0] -= 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]-1][positionJoueur[1]] == 't')
        {
            tab[positionJoueur[0]-1][positionJoueur[1]] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            score +=1;
            Gagner();
            nombretresors -= 1;
            positionJoueur[0] -= 1;
         BougerMonstres();
         
            Update();
        }
        else if(tab[positionJoueur[0]-1][positionJoueur[1]] == 'b')
        {
            GameOver();
        }
    }

    function DeplacerJoueurBas()
    {
        if(tab[positionJoueur[0]+1][positionJoueur[1]] == 's')
        {
            tab[positionJoueur[0]+1][positionJoueur[1]] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            positionJoueur[0] += 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]+1][positionJoueur[1]] == 't')
        {
            tab[positionJoueur[0]+1][positionJoueur[1]] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            score +=1;
            Gagner();
            nombretresors -= 1;
            positionJoueur[0] += 1;
            Gagner();
         BougerMonstres();
         
            Update();
            
        }
        else if(tab[positionJoueur[0]+1][positionJoueur[1]] == 'b')
        {
            GameOver();
        }
    }
    
    function DeplacerJoueurGauche()
    {
        if(tab[positionJoueur[0]][positionJoueur[1]-1] == 's')
        {
            tab[positionJoueur[0]][positionJoueur[1]-1] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            positionJoueur[1] -= 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]][positionJoueur[1]-1] == 't')
        {
            tab[positionJoueur[0]][positionJoueur[1]-1] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            nombretresors -= 1;
            score +=1;
            Gagner();
            positionJoueur[1] -= 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]][positionJoueur[1]-1] == 'b')
        {
            GameOver();
        }
    }

    function DeplacerJoueurDroite()
    {
        if(tab[positionJoueur[0]][positionJoueur[1]+1] == 's')
        {
            tab[positionJoueur[0]][positionJoueur[1]+1] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            positionJoueur[1] += 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]][positionJoueur[1]+1] == 't')
        {
            tab[positionJoueur[0]][positionJoueur[1]+1] = 'j';
            tab[positionJoueur[0]][positionJoueur[1]] = 's';
            score +=1;
            Gagner();
            nombreCoups += 1;
            nombretresors -= 1;
            positionJoueur[1] += 1;
         BougerMonstres();
            Update();
        }
        else if(tab[positionJoueur[0]][positionJoueur[1]+1] == 'b')
        {
            GameOver();
        }
    }


    //Gestion des evenements des boutons
    document.getElementById("Up").addEventListener("click", DeplacerJoueurHaut);
    document.getElementById("Down").addEventListener("click", DeplacerJoueurBas);
    document.getElementById("Left").addEventListener("click", DeplacerJoueurGauche);
    document.getElementById("Right").addEventListener("click", DeplacerJoueurDroite);
    document.getElementById("Reinitialiser").addEventListener("click", Reinitialiser);


                
});