<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index()
    {
        // Récupérer toutes les tâches depuis la base de données
        $tasks = \App\Models\Task::all();

        // Retourner la vue avec les tâches
        return view('tasks.index', ['tasks' => $tasks ?? []]);

    }

    public function create(){
        return view('tasks.create');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable',
            'is_completed' => 'nullable|in:0,1',
        ]);

        $task = new \App\Models\Task();
        $task->uuid = \Illuminate\Support\Str::uuid();
        $task->title = $validated['title'];
        $task->description = $validated['description'] ?? '';
        $task->is_completed = isset($validated['is_completed']) && $validated['is_completed'] ? true : false;
        $task->save();

        return redirect('/tasks');
    }

    public function show($id){
        $task = \App\Models\Task::findOrFail($id);
        return view('tasks.show', ['task' => $task]);
    }

    public function edit($id){
        $task = \App\Models\Task::findOrFail($id);
        return view('tasks.edit', ['task' => $task]);
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable',
            'is_completed' => 'nullable|in:0,1',
        ]);

        $task = \App\Models\Task::findOrFail($id);
        $task->title = $validated['title'];
        $task->description = $validated['description'] ?? '';
        $task->is_completed = isset($validated['is_completed']) && $validated['is_completed'] ? true : false;
        $task->save();

        return redirect('/tasks');
    }

    public function destroy($id){
        $task = \App\Models\Task::findOrFail($id);
        $task->delete();
        return redirect('/tasks');
    }
}
