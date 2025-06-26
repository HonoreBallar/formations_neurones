// PARTIE 1 : Sélection des éléments du DOM
const persistentTaskForm = document.getElementById('task-form');
const persistentNewTaskInput = document.getElementById('new-task-input');
const persistentTaskList = document.getElementById('task-list');
const submitBtn = document.getElementById('submit');
// PARTIE 2 : Fonction pour ajouter une tâche

const LOCAL_STORAGE_KEY = 'tasks';

// function loadTasks() {
//     const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

//     if (storedTasks) {
//         const tasks = JSON.parse(storedTasks);

//         tasks.forEach(task => addPersistentTaskToDOM(task.text, task.completed));
//     }
// }

// function addPersistentTaskToDOM(taskText, isCompleted = false) {
//     const listItem = document.createElement('li');
//     listItem.textContent = taskText;

//     if (isCompleted) {
//         listItem.classList.add('completed');
//     }

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Supprimer';
//     deleteButton.classList.add('delete-btn');

//     deleteButton.addEventListener('click', function() {
//         taskList.removeChild(listItem);
//         saveTasks(); // Sauvegarder après suppression
//     });

//     listItem.addEventListener('click', function() {
//         listItem.classList.toggle('completed');
//         saveTasks(); // Sauvegarder après changement de statut
//     });

//     listItem.appendChild(deleteButton);
//     taskList.appendChild(listItem);
// }

// function saveTasks() {
//     const taskElements = taskList.querySelectorAll('li');
//     const tasksToSave = [];

//     taskElements.forEach(taskElement => {
//         tasksToSave.push({
//             text: taskElement.firstChild.textContent,
//             completed: taskElement.classList.contains('completed')
//         });
//     });

//     const tasksJSON = JSON.stringify(tasksToSave);
//     console.log(tasksJSON);

//     localStorage.setItem(LOCAL_STORAGE_KEY, tasksJSON);
// }

// Cette fonction prend en paramètre le texte de la tâche et crée un nouvel élément <li>

// function addTask(taskText) {
//     // 1. Créer un nouvel élément <li>
//     const listItem = document.createElement('li');
//     listItem.textContent = taskText; // Ajouter le texte de la tâche
//     // 2. Ajouter un bouton de suppression à l'élément <li>
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Supprimer';
//     deleteButton.classList.add('delete-btn'); // Ajouter une classe pour le style
//     // 3. Ajouter un écouteur d'événement 'click' au bouton de suppression
//     // Quand on clique, cela doit supprimer le parent (l'élément <li>)
//     deleteButton.addEventListener('click', function() {
//         taskList.removeChild(listItem); // Supprime l'élément <li> de la liste
//     });
//     // 4. Ajouter un écouteur d'événement 'click' à l'élément <li> lui-même
//     // Quand on clique sur la tâche, cela doit alterner la classe 'completed'
//     listItem.addEventListener('click', function() {
//         listItem.classList.toggle('completed'); // Ajoute ou supprime la classe 'completed'
//     });
//     // 5. Ajouter le bouton de suppression à l'élément <li>
//     listItem.appendChild(deleteButton);
//     // 6. Ajouter le nouvel élément <li> à la liste des tâches (<ul>)
//     taskList.appendChild(listItem);
// }


// PARTIE 3 : Gérer l'événement de soumission du formulaire
// Ajouter un écouteur d'événement 'submit' au formulaire
// taskForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Empêcher le rechargement de la page par défaut du formulaire
//     // 1. Récupérer la valeur de l'input
//     const taskText = newTaskInput.value.trim(); // .trim() pour enlever les espaces inutiles
//     // 2. Vérifier si l'input n'est pas vide
//     if (taskText !== '') {
//         // 3. Appeler la fonction addTask avec le texte de la tâche
//         // addTask(taskText);
//         saveTasks();
//         // 4. Vider l'input après avoir ajouté la tâche
//         newTaskInput.value = '';
//     } else {
//         alert('Veuillez entrer une tâche !'); // Message d'alerte si l'input est vide
//     }
// });

// const clearAllTasksBtn = document.getElementById('clear-all-tasks-btn');

// Clé pour stocker les tâches dans localStorage

// Fonction pour charger les tâches depuis localStorage et les afficher
function loadTasks() {
    // 1. Récupérer les tâches stockées dans localStorage
    // localStorage.getItem(clé) retourne une chaîne de caractères ou null
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTasks) {
        // 2. Parser la chaîne JSON en tableau JavaScript
        const tasks = JSON.parse(storedTasks);

        // 3. Pour chaque tâche, l'ajouter à la liste persistante
        tasks.forEach(task => addPersistentTaskToDOM(task.text, task.completed));
    }
}

function lengthTasks(){
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTasks) {
        // 2. Parser la chaîne JSON en tableau JavaScript
        const tasks = JSON.parse(storedTasks);

        return tasks.length;
    }
    return 0;
}

// Fonction pour sauvegarder les tâches actuelles dans localStorage
function saveTasks() {
    // 1. Récupérer tous les éléments <li> de la liste des tâches
    const taskElements = persistentTaskList.querySelectorAll('li');
    const tasksToSave = [];

    // 2. Parcourir les éléments et créer un tableau d'objets (texte et statut complété)
    taskElements.forEach(taskElement => {
        tasksToSave.push({
            id: parseInt(tasksToSave.length + 1),
            text: taskElement.firstChild.textContent, // Le texte est le premier nœud enfant (avant le bouton)
            completed: taskElement.classList.contains('completed')
        });
    });

    // 3. Convertir le tableau d'objets en chaîne JSON
    const tasksJSON = JSON.stringify(tasksToSave);

    // 4. Stocker la chaîne JSON dans localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, tasksJSON);
}

function saveLocal(AllTasks){
    const tasksJSON = JSON.stringify(AllTasks);

    // 4. Stocker la chaîne JSON dans localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, tasksJSON);

    persistentTaskList.textContent = '';

    loadTasks();

}

function editTasks(value, id){

    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTasks) {
        // 2. Parser la chaîne JSON en tableau JavaScript
        const tasks = JSON.parse(storedTasks);

        tasks.map(task=>{
            if(task.id === id){
                task.text = value;
            }
        })

        saveLocal(tasks);
        // loadTasks();
    }

}



// Fonction pour ajouter une tâche persistante au DOM
function addPersistentTaskToDOM(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    const spanItem = document.createElement('span');
    // spanItem.classList.add('completed')
    spanItem.textContent = taskText;
    listItem.appendChild(spanItem);
    // listItem.textContent = taskText;

    if (isCompleted) {
        spanItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.classList.add('edit-btn');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function() {
        persistentTaskList.removeChild(listItem);
        saveTasks(); // Sauvegarder après suppression
    });

    editButton.addEventListener('click',function(){
        // alert('modifier');
        submitBtn.textContent = 'Modifier';
        submitBtn.setAttribute('data-id', lengthTasks());
        persistentNewTaskInput.value = taskText;
    });

    spanItem.addEventListener('click', function() {
        spanItem.classList.toggle('completed');
        saveTasks(); // Sauvegarder après changement de statut
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    persistentTaskList.appendChild(listItem);
}

// Gérer la soumission du formulaire pour ajouter une tâche persistante
persistentTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = persistentNewTaskInput.value.trim();

    if (taskText !== '') {
        const textSubmit = submitBtn.textContent;
        if(textSubmit == 'Modifier'){
            const id = parseInt(submitBtn.getAttribute('data-id'));
            submitBtn.textContent = 'Ajouter'; 
            editTasks(taskText, id);
        }else{
            addPersistentTaskToDOM(taskText);
            saveTasks(); // Sauvegarder après ajout
        }
        persistentNewTaskInput.value = '';
    } else {
        alert('Veuillez entrer une tâche !');
    }
});

// Gérer le bouton "Effacer toutes les tâches"
// clearAllTasksBtn.addEventListener('click', function() {
//     if (confirm('Voulez-vous vraiment effacer toutes les tâches ?')) {
//         localStorage.removeItem(LOCAL_STORAGE_KEY); // Supprimer l'entrée de localStorage
//         persistentTaskList.innerHTML = ''; // Vider la liste affichée dans le DOM
//     }
// });

// Charger les tâches au chargement de la page
document.addEventListener('DOMContentLoaded', loadTasks);
