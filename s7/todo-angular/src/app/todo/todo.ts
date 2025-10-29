import { Component, OnInit } from '@angular/core';
import { Task } from '../task'; // Importez l'interface Task

@Component({
  selector: 'app-todo', // Le sélecteur HTML pour utiliser ce composant
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})

export class Todo implements OnInit {
  tasks: Task[] = []; // Tableau pour stocker nos tâches
  newTaskDescription: string = ''; // Pour le champ de saisie d'une nouvelle tâche
  nextId: number = 0; // Pour générer des IDs uniques

  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire, par exemple charger des tâches depuis un stockage local
    this.loadTasks();
  }

  // Méthode pour ajouter une nouvelle tâche
  addTask(): void {
    if (this.newTaskDescription.trim().length === 0) {
      return; // Ne rien faire si la description est vide
    }

    const newTask: Task = {
      id: this.nextId++,
      description: this.newTaskDescription.trim(),
      completed: false
    };

    this.tasks.push(newTask);
    this.newTaskDescription = ''; // Réinitialise le champ de saisie
    this.saveTasks();
  }

  // Méthode pour basculer le statut 'terminé' d'une tâche
  toggleCompleted(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  // Méthode pour supprimer une tâche
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  // Méthode pour sauvegarder les tâches dans le stockage local du navigateur
  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Méthode pour charger les tâches depuis le stockage local du navigateur
  private loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      // Trouver l'ID le plus élevé pour éviter les conflits d'ID si des tâches existantes
      if (this.tasks.length > 0) {
        this.nextId = Math.max(...this.tasks.map(task => task.id)) + 1;
      }
    }
  }
}