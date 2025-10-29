@extends('layouts.master')

@section('title', 'Accueil')

@section('content')
    <div class="text-center">
        <h2 class="text-3xl font-bold text-primary mb-4">Bienvenue sur mon application</h2>
        <p class="text-gray-700 mb-4">Ceci est la page d’accueil, propulsée par Laravel et Tailwind CDN.</p>

        <form action="{{ route('tasks.store') }}" method="POST" class="flex mb-6">
            @csrf
            <input type="text" name="description" placeholder="Ajouter une nouvelle tâche..."
                   class="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button type="submit"
                    class="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
                Ajouter
            </button>
        </form>

        <div class="space-y-4">
            @forelse ($tasks as $task)
                <div class="flex items-center justify-between p-4 rounded-lg
                            {{ $task->completed ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-gray-300' }}">

                    <div class="flex items-center">
                        <form action="{{ route('tasks.update', $task) }}" method="POST" class="mr-4">
                            @csrf
                            @method('PUT')
                            <input type="checkbox" name="completed" onchange="this.form.submit()" {{ $task->completed ? 'checked' : '' }}
                                class="form-checkbox h-5 w-5 text-blue-600 rounded-full cursor-pointer border-gray-300" value="{{ $task->completed ? '0' : '1' }}">
                        </form>

                        <p class="text-lg {{ $task->completed ? 'line-through text-gray-500' : '' }}">{{ $task->description }}</p>
                    </div>

                    <form action="{{ route('tasks.destroy', $task) }}" method="POST" class="flex-shrink-0">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')"
                                class="text-red-500 hover:text-red-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </form>
                </div>
            @empty
                <p class="text-center text-gray-500">Aucune tâche pour le moment.</p>
            @endforelse
        </div>
        
    </div>
@endsection
